import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import clsx from 'clsx';

const Topic35 = () => {
  // State for demonstrating dependency array mistakes
  const [counter, setCounter] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState({ 
    name: 'Swadeep', 
    age: 21,
    city: 'Barrackpore'
  });
  const [items, setItems] = useState([1, 2, 3]);
  const [mistakeType, setMistakeType] = useState('missing');
  const [effectRuns, setEffectRuns] = useState(0);
  const [infiniteLoopActive, setInfiniteLoopActive] = useState(false);
  const [staleValue, setStaleValue] = useState(0);
  const [performanceLog, setPerformanceLog] = useState([]);
  const [memoryLeakActive, setMemoryLeakActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [mounted, setMounted] = useState(true);
  const [renderCount, setRenderCount] = useState(0);

  // Refs for tracking
  const effectRunCountRef = useRef(0);
  const infiniteLoopRef = useRef(false);
  const memoryLeakIntervalRef = useRef(null);
  const staleValueRef = useRef(counter);
  const performanceStartTime = useRef(0);

  // Track render count
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  },[]);

  // Start performance measurement
  const startPerformanceMeasurement = () => {
    performanceStartTime.current = performance.now();
  };

  // Log performance
  const logPerformance = (description) => {
    const endTime = performance.now();
    const duration = endTime - performanceStartTime.current;
    setPerformanceLog(prev => [
      ...prev,
      {
        id: Date.now(),
        description,
        duration: duration.toFixed(2),
        timestamp: new Date().toLocaleTimeString()
      }
    ].slice(-10));
  };

  // ============ MISTAKE 1: Missing Dependencies ============
  useEffect(() => {
  if (mistakeType !== 'missing') return;

  const id = setTimeout(() => {
    setStaleValue(counter); // stale on purpose
  }, 3000);

  return () => clearTimeout(id); // ✅ prevents stacking
}, [mistakeType]); // ❌ Missing [counter] dependency

  // ============ MISTAKE 2: Infinite Loop ============
  useEffect(() => {
    if (mistakeType === 'infinite' && !infiniteLoopRef.current) {
      console.log('Infinite loop effect running...');
      
      // This creates infinite loop: updates state, triggers re-render, effect runs again...
      if (!infiniteLoopActive) {
        setInfiniteLoopActive(true);
        infiniteLoopRef.current = true;
        
        // This would normally create infinite loop
        // setCounter(prev => prev + 1);
        
        // Instead, we'll simulate it with a controlled example
        const id = setInterval(() => {
          console.log('Infinite loop simulation - would update counter here');
        }, 1000);
        
        setIntervalId(id);
        
        return () => {
          clearInterval(id);
          infiniteLoopRef.current = false;
        };
      }
    }
  }, [counter, mistakeType]); // ❌ Dependent on counter that it updates

  // ============ MISTAKE 3: Unnecessary Dependencies ============
  useEffect(() => {
    if (mistakeType === 'unnecessary') {
      startPerformanceMeasurement();
      
      // This effect only uses searchTerm, but includes user (which changes often)
      console.log('Unnecessary dependency: Effect runs because user changed:', user);
      
      // Simulate expensive computation
      let sum = 0;
      for (let i = 0; i < 1000000; i++) {
        sum += Math.random();
      }
      
      logPerformance('Effect with unnecessary dependency ran');
      effectRunCountRef.current += 1;
      setEffectRuns(effectRunCountRef.current);
    }
  }, [searchTerm, user]); // ❌ user is unnecessary dependency

  // ============ MISTAKE 4: Object/Array Reference ============
  useEffect(() => {
    if (mistakeType === 'reference') {
      console.log('Object reference effect running...');
      effectRunCountRef.current += 1;
      setEffectRuns(effectRunCountRef.current);
      
      // This effect runs every time because we create a new object/array
    }
  }, [user]); // ❌ New object reference every time user state updates

  // ============ MISTAKE 5: Function Reference ============
  const handleClick = () => {
    console.log('Button clicked!');
  };

  useEffect(() => {
    if (mistakeType === 'function') {
      console.log('Function reference effect running...');
      effectRunCountRef.current += 1;
      setEffectRuns(effectRunCountRef.current);
      
      // This effect runs every render because handleClick is recreated
    }
  }, [handleClick]); // ❌ New function reference every render

  // ============ MISTAKE 6: Conditional Hook ============
  // This would be a mistake, but we can't actually write it in React
  // Instead, we'll demonstrate the concept
  const [showConditionalEffect, setShowConditionalEffect] = useState(false);
  
  useEffect(() => {
    if (mistakeType === 'conditional' && showConditionalEffect) {
      console.log('Conditional effect running...');
      effectRunCountRef.current += 1;
      setEffectRuns(effectRunCountRef.current);
    }
  }, [showConditionalEffect, mistakeType]);

  // ============ MISTAKE 7: Memory Leak ============
  useEffect(() => {
    if (mistakeType === 'memory' && !memoryLeakActive) {
      console.log('Setting up memory leak...');
      setMemoryLeakActive(true);
      
      // Create interval that never gets cleaned up
      memoryLeakIntervalRef.current = setInterval(() => {
        console.log('Memory leak interval running...');
      }, 1000);
      
      // ❌ No cleanup function!
    }
  }, [mistakeType]);

  // ============ MISTAKE 8: Async Effect without Cleanup ============
  useEffect(() => {
    if (mistakeType === 'async') {
      console.log('Async effect starting...');
      
      // Simulate async operation
      const fetchData = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Async operation completed');
        
        // Update state after component might unmount
        if (mounted) {
          setCounter(prev => prev + 1);
        }
      };
      
      fetchData();
      
      // ❌ No cleanup to prevent state updates after unmount
    }
  }, [mistakeType]);

  // ============ CORRECT IMPLEMENTATIONS ============
  
  // Correct: Proper dependencies
  useEffect(() => {
    if (mistakeType === 'correct-missing') {
      console.log('Correct: Counter value in effect:', counter);
      
      // Timer with current value
      setTimeout(() => {
        console.log('Correct: Current counter after timeout:', counter);
      }, 3000);
    }
  }, [counter]); // ✅ Correct dependency

  // Correct: Memoized function
  const handleClickMemoized = useCallback(() => {
    console.log('Memoized button clicked!');
  }, []); // ✅ No dependencies needed

  useEffect(() => {
    if (mistakeType === 'correct-function') {
      console.log('Function effect with useCallback');
      effectRunCountRef.current += 1;
      setEffectRuns(effectRunCountRef.current);
    }
  }, [handleClickMemoized]); // ✅ Stable reference

  // Correct: Specific properties
  useEffect(() => {
    if (mistakeType === 'correct-reference') {
      console.log('Effect runs only when user.name changes:', user.name);
      effectRunCountRef.current += 1;
      setEffectRuns(effectRunCountRef.current);
    }
  }, [user.name]); // ✅ Specific property, not entire object

  // Correct: Cleanup for memory leak
  useEffect(() => {
    if (mistakeType === 'correct-memory') {
      console.log('Setting up interval with cleanup...');
      
      const id = setInterval(() => {
        console.log('Interval running (will be cleaned up)');
      }, 1000);
      
      return () => {
        console.log('Cleaning up interval');
        clearInterval(id);
      };
    }
  }, [mistakeType]);

  // Correct: Async effect with cleanup
  useEffect(() => {
    if (mistakeType === 'correct-async') {
      console.log('Async effect with cleanup starting...');
      
      let isMounted = true;
      
      const fetchData = async () => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        if (isMounted) {
          console.log('Async operation completed safely');
          setCounter(prev => prev + 1);
        }
      };
      
      fetchData();
      
      return () => {
        isMounted = false;
        console.log('Async cleanup - preventing state update');
      };
    }
  }, [mistakeType]);

  // Helper functions
  const resetCounters = () => {
    effectRunCountRef.current = 0;
    setEffectRuns(0);
    setPerformanceLog([]);
  };

  const triggerUpdate = () => {
    // Update user with new reference (same values)
    setUser({ ...user, timestamp: Date.now() });
  };

  const updateUserName = () => {
    setUser(prev => ({ ...prev, name: 'Tuhina' }));
  };

  const simulateUnmount = () => {
    setMounted(false);
    setTimeout(() => setMounted(true), 1000);
  };

  const cleanupMemoryLeak = () => {
    if (memoryLeakIntervalRef.current) {
      clearInterval(memoryLeakIntervalRef.current);
      memoryLeakIntervalRef.current = null;
      setMemoryLeakActive(false);
      console.log('Manually cleaned up memory leak');
    }
  };

  const stopInfiniteLoop = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setInfiniteLoopActive(false);
      infiniteLoopRef.current = false;
      console.log('Stopped infinite loop simulation');
    }
  };

  // Mistake examples data
  const mistakeExamples = [
    {
      id: 'missing',
      name: 'Missing Dependencies',
      description: 'Forgetting to list dependencies that the effect uses',
      problem: 'Stale closures, effects use outdated values',
      example: `useEffect(() => {\n  console.log(counter);\n}, []); // ❌ Missing [counter]`,
      fix: 'Add all used values to dependencies',
      severity: 'high',
      color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
    },
    {
      id: 'infinite',
      name: 'Infinite Loops',
      description: 'Effect updates its own dependency, causing endless re-runs',
      problem: 'Browser freezes, performance crashes',
      example: `useEffect(() => {\n  setCounter(counter + 1);\n}, [counter]); // ❌ Updates dependency`,
      fix: 'Use conditions or functional updates',
      severity: 'critical',
      color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
    },
    {
      id: 'unnecessary',
      name: 'Unnecessary Dependencies',
      description: 'Including values that effect doesn\'t actually use',
      problem: 'Performance issues, unnecessary re-runs',
      example: `useEffect(() => {\n  console.log(searchTerm);\n}, [searchTerm, user]); // ❌ user not used`,
      fix: 'Remove unused dependencies',
      severity: 'medium',
      color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
    },
    {
      id: 'reference',
      name: 'Object/Array References',
      description: 'Using objects/arrays as dependencies without memoization',
      problem: 'Effect runs on every render (new reference)',
      example: `useEffect(() => {\n  // ...\n}, [user]); // ❌ New object every render`,
      fix: 'Use specific properties or useMemo',
      severity: 'medium',
      color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
    },
    {
      id: 'function',
      name: 'Function References',
      description: 'Using inline functions as dependencies',
      problem: 'Effect runs on every render (new function)',
      example: `useEffect(() => {\n  // ...\n}, [() => {}]); // ❌ New function every render`,
      fix: 'Memoize with useCallback or define outside',
      severity: 'medium',
      color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
    },
    {
      id: 'conditional',
      name: 'Conditional Hooks',
      description: 'Calling hooks conditionally (breaks Rules of Hooks)',
      problem: 'React can\'t track hooks properly',
      example: `if (condition) {\n  useEffect(() => {}); // ❌ Conditional hook\n}`,
      fix: 'Move condition inside effect',
      severity: 'critical',
      color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
    },
    {
      id: 'memory',
      name: 'Memory Leaks',
      description: 'Forgetting cleanup for subscriptions/intervals',
      problem: 'Memory consumption grows, abandoned callbacks',
      example: `useEffect(() => {\n  setInterval(() => {}, 1000);\n  // ❌ No cleanup\n}, []);`,
      fix: 'Always return cleanup function',
      severity: 'high',
      color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
    },
    {
      id: 'async',
      name: 'Async Effects',
      description: 'Async operations without cleanup/cancellation',
      problem: 'State updates after unmount, race conditions',
      example: `useEffect(() => {\n  fetchData().then(setData);\n  // ❌ No cleanup\n}, []);`,
      fix: 'Use cleanup flag or AbortController',
      severity: 'medium',
      color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
    }
  ];

  const correctExamples = [
    {
      id: 'correct-missing',
      name: 'Proper Dependencies',
      description: 'All used values listed in dependencies',
      example: `useEffect(() => {\n  console.log(counter);\n}, [counter]); // ✅`,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
    },
    {
      id: 'correct-function',
      name: 'Memoized Function',
      description: 'Function memoized with useCallback',
      example: `const fn = useCallback(() => {}, []);\nuseEffect(() => {}, [fn]); // ✅`,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
    },
    {
      id: 'correct-reference',
      name: 'Specific Properties',
      description: 'Watching specific properties, not entire object',
      example: `useEffect(() => {\n  // ...\n}, [user.name]); // ✅`,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
    },
    {
      id: 'correct-memory',
      name: 'Proper Cleanup',
      description: 'Cleanup function for intervals/listeners',
      example: `useEffect(() => {\n  const id = setInterval(...);\n  return () => clearInterval(id);\n}, []); // ✅`,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
    },
    {
      id: 'correct-async',
      name: 'Async Cleanup',
      description: 'Cleanup prevents state updates after unmount',
      example: `useEffect(() => {\n  let isMounted = true;\n  fetch().then(() => {\n    if (isMounted) setData();\n  });\n  return () => { isMounted = false; };\n}, []); // ✅`,
      color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
    }
  ];

  // Debugging tips
  const debuggingTips = [
    {
      tip: 'Use React DevTools',
      description: 'Inspect hooks, see dependency changes',
      action: 'Open Components tab in DevTools'
    },
    {
      tip: 'Console.log Dependencies',
      description: 'Log dependencies to see when they change',
      action: 'console.log([dep1, dep2])'
    },
    {
      tip: 'Use useWhyDidYouUpdate',
      description: 'Custom hook to track prop/state changes',
      action: 'npm install why-did-you-update'
    },
    {
      tip: 'Check ESLint Warnings',
      description: 'exhaustive-deps rule catches most issues',
      action: 'Fix all ESLint warnings'
    },
    {
      tip: 'Profile Performance',
      description: 'Use React Profiler to find expensive effects',
      action: 'Record performance in DevTools'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 animate-[fadeInUp_0.8s_ease-out]">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 mb-4">
            <span className="text-sm font-semibold text-red-700 dark:text-red-300">
              Topic 31/46
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Common Dependency Array Mistakes
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Identify, debug, and fix the most common dependency array pitfalls—from infinite loops 
            to memory leaks. Learn to write bulletproof effects that perform well and don't crash your apps.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Theory & Examples */}
          <div className="space-y-8">
            {/* Common Mistakes Overview */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_0.9s_ease-out]">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
                  <span className="text-xl">⚠️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Common Dependency Mistakes
                </h2>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Dependency array mistakes are the #1 source of bugs in React applications. 
                  They can cause everything from subtle stale data issues to complete browser crashes.
                </p>
                
                {/* Mistake Severity Chart */}
                <div className="my-8">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-center">
                    Mistake Severity Levels
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-24">
                        <span className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs font-semibold rounded-full">
                          Critical
                        </span>
                      </div>
                      <div className="flex-1 h-3 bg-gradient-to-r from-red-500 to-red-300 rounded-full"></div>
                      <div className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                        Crashes, infinite loops
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-24">
                        <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 text-xs font-semibold rounded-full">
                          High
                        </span>
                      </div>
                      <div className="flex-1 h-3 bg-gradient-to-r from-orange-500 to-orange-300 rounded-full"></div>
                      <div className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                        Memory leaks, stale data
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-24">
                        <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-semibold rounded-full">
                          Medium
                        </span>
                      </div>
                      <div className="flex-1 h-3 bg-gradient-to-r from-yellow-500 to-yellow-300 rounded-full"></div>
                      <div className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                        Performance issues
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-24">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-semibold rounded-full">
                          Low
                        </span>
                      </div>
                      <div className="flex-1 h-3 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full"></div>
                      <div className="ml-4 text-sm text-gray-600 dark:text-gray-400">
                        Minor inefficiencies
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 p-5 rounded-xl my-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">🎯 The Golden Rule</h4>
                  <blockquote className="border-l-4 border-red-500 dark:border-red-400 pl-4 py-2 italic text-gray-700 dark:text-gray-300">
                    "Always use the ESLint exhaustive-deps rule. It catches 95% of dependency mistakes. 
                    If you think you need to disable it, you're probably making the other 5%."
                  </blockquote>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Real-World Impact</h4>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <p className="text-gray-700 dark:text-gray-300">
                      When Abhronila from Ichapur deployed her app, it crashed browsers after 10 minutes. 
                      Why? A missing cleanup function created thousands of abandoned intervals.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      When Debangshu from Barrackpore's search showed old results, it was a stale closure 
                      from missing <code>[searchTerm]</code> dependency.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Correct Patterns */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.0s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                  <span className="text-lg">✅</span>
                </span>
                Correct Patterns & Fixes
              </h3>
              
              <div className="space-y-4">
                {correctExamples.map((example, index) => (
                  <div 
                    key={example.id}
                    className={clsx(
                      "p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02]",
                      example.color.replace('text-', 'border-').replace('100', '300').replace('900/30', '700')
                    )}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-1">
                        <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {example.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {example.description}
                        </p>
                        <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto">
                          {example.example}
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Professional Checklist</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>ESLint exhaustive-deps enabled and passing</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>All used values in dependencies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Cleanup function for subscriptions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Memoized object/function references</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Async operations with cancellation</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Debugging Tips */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.1s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                  <span className="text-lg">🔧</span>
                </span>
                Debugging Tips & Tools
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {debuggingTips.map((tip, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                        <span className="text-blue-600 dark:text-blue-400 text-sm">{index + 1}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {tip.tip}
                      </h4>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {tip.description}
                    </p>
                    
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      <strong>Action:</strong> {tip.action}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  Quick Debug Recipe
                </h4>
                <ol className="text-sm text-blue-700 dark:text-blue-400 space-y-2">
                  <li>1. Open browser console (F12)</li>
                  <li>2. Add <code>console.log(deps)</code> to effect</li>
                  <li>3. Watch what changes trigger effect</li>
                  <li>4. Use React DevTools → Components tab</li>
                  <li>5. Profile with React Profiler</li>
                </ol>
              </div>
            </section>
          </div>

          {/* Right Column - Interactive Playground */}
          <div className="space-y-8">
            {/* Mistake Selector */}
            <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.0s_ease-out]">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Mistake Playground
              </h3>
              
              {/* Mistake Selector */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Select Mistake Type</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {mistakeExamples.map((mistake) => (
                    <button
                      key={mistake.id}
                      onClick={() => {
                        setMistakeType(mistake.id);
                        resetCounters();
                        if (mistake.id === 'infinite') stopInfiniteLoop();
                        if (mistake.id === 'memory') cleanupMemoryLeak();
                      }}
                      className={clsx(
                        "p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105",
                        mistakeType === mistake.id 
                          ? "scale-105 ring-2 ring-offset-2 ring-red-500 bg-white dark:bg-gray-800"
                          : "hover:shadow-md",
                        mistake.severity === 'critical' ? "border-red-300 dark:border-red-700" :
                        mistake.severity === 'high' ? "border-red-200 dark:border-red-600" :
                        mistake.severity === 'medium' ? "border-yellow-300 dark:border-yellow-700" :
                        "border-blue-300 dark:border-blue-700",
                        mistakeType === mistake.id ? "" : mistake.color
                      )}
                    >
                      <div className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                        {mistake.name}
                      </div>
                      <div className={clsx(
                        "text-[10px] mt-1 truncate",
                        mistake.severity === 'critical' ? "text-red-600 dark:text-red-400" :
                        mistake.severity === 'high' ? "text-red-500 dark:text-red-300" :
                        mistake.severity === 'medium' ? "text-yellow-600 dark:text-yellow-400" :
                        "text-blue-600 dark:text-blue-400"
                      )}>
                        {mistake.severity.toUpperCase()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Current State Display */}
              <div className="mb-8 p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Current State</h4>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">{counter}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Counter</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                    <div className="text-center">
                      <div className="text-xl font-bold text-blue-600 dark:text-blue-400">{effectRuns}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Effect Runs</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-600 dark:text-purple-400">{renderCount}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Render Count</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl">
                    <div className="text-center">
                      <div className="text-xl font-bold text-orange-600 dark:text-orange-400">
                        {mounted ? '✅' : '❌'}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Mounted</div>
                    </div>
                  </div>
                </div>
                
                {/* Control Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    onClick={() => setCounter(prev => prev + 1)}
                    className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    Increment Counter
                  </button>
                  
                  <button
                    onClick={triggerUpdate}
                    className="py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    Update User (New Ref)
                  </button>
                  
                  <button
                    onClick={updateUserName}
                    className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    Change User Name
                  </button>
                  
                  <button
                    onClick={resetCounters}
                    className="py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    Reset Counters
                  </button>
                </div>
                
                {mistakeType === 'memory' && memoryLeakActive && (
                  <div className="mt-4">
                    <button
                      onClick={cleanupMemoryLeak}
                      className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-300"
                    >
                      🔥 Clean Up Memory Leak (Manually)
                    </button>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-2 text-center">
                      Interval running without cleanup! Check browser console.
                    </p>
                  </div>
                )}
                
                {mistakeType === 'infinite' && infiniteLoopActive && (
                  <div className="mt-4">
                    <button
                      onClick={stopInfiniteLoop}
                      className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-300"
                    >
                      ⚠️ Stop Infinite Loop Simulation
                    </button>
                    <p className="text-xs text-red-600 dark:text-red-400 mt-2 text-center">
                      Simulating infinite loop pattern
                    </p>
                  </div>
                )}
                
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Current Mistake: <span className="text-red-600 dark:text-red-400">
                      {mistakeExamples.find(m => m.id === mistakeType)?.name}
                    </span>
                  </div>
                  {mistakeType === 'missing' && staleValue > 0 && (
                    <div className="text-sm text-red-600 dark:text-red-400 mt-1">
                      Stale value captured: {staleValue} (should be {counter})
                    </div>
                  )}
                </div>
              </div>
              
              {/* Current Mistake Details */}
              {mistakeExamples.find(m => m.id === mistakeType) && (
                <div className="mb-8 p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                    {mistakeExamples.find(m => m.id === mistakeType).name}
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Description:
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {mistakeExamples.find(m => m.id === mistakeType).description}
                      </p>
                    </div>
                    
                    <div>
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Problem:
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {mistakeExamples.find(m => m.id === mistakeType).problem}
                      </p>
                    </div>
                    
                    <div>
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Buggy Code:
                      </div>
                      <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                        {mistakeExamples.find(m => m.id === mistakeType).example}
                      </pre>
                    </div>
                    
                    <div>
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Fix:
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {mistakeExamples.find(m => m.id === mistakeType).fix}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Performance & Debug Info */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.1s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Performance & Debug Information
              </h3>
              
              <div className="space-y-6">
                {/* Console Instructions */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Open Browser Console</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Press <code className="px-2 py-1 bg-gray-800 text-gray-100 rounded">F12</code> → Console tab to see:
                  </p>
                  
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Effect execution logs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Stale closure demonstrations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Memory leak intervals</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Infinite loop warnings</span>
                    </li>
                  </ul>
                </div>
                
                {/* Performance Log */}
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Performance Log</h4>
                  
                  <div className="h-40 overflow-y-auto bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                    {performanceLog.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                        Performance data will appear here
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {[...performanceLog].reverse().map((log) => (
                          <div 
                            key={log.id}
                            className="p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700"
                          >
                            <div className="flex items-center justify-between">
                              <div className="text-sm text-gray-700 dark:text-gray-300">
                                {log.description}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {log.duration}ms
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              {log.timestamp}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* ESLint Rule Demonstration */}
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">ESLint Rule: exhaustive-deps</h4>
                  
                  <div className="space-y-3">
                    <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto">
{`// ESLint will warn about missing dependencies
useEffect(() => {
  console.log(counter);
}, []); // ⚠️ React Hook useEffect has missing dependency: 'counter'

// ESLint will warn about unnecessary dependencies  
useEffect(() => {
  console.log(counter);
}, [counter, user]); // ⚠️ 'user' is unnecessary

// Correct version (no warnings)
useEffect(() => {
  console.log(counter);
}, [counter]); // ✅`}
                    </pre>
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Install:</strong> <code className="px-2 py-1 bg-gray-800 text-gray-100 rounded">npm install eslint-plugin-react-hooks</code>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Prevention Strategies */}
            <section className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.2s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Prevention Strategies
              </h3>
              
              <div className="space-y-6">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Before You Write useEffect</h4>
                  
                  <div className="space-y-3">
                    {[
                      "1. Do I really need an effect? (Can this be done during render?)",
                      "2. What values does this effect read from props/state?",
                      "3. Should this run on mount, cleanup, or when dependencies change?",
                      "4. Do I need to clean up anything? (timers, subscriptions)",
                      "5. Can this effect cause infinite loops?",
                      "6. Should I debounce or throttle this effect?"
                    ].map((question, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3 mt-1">
                          <span className="text-purple-600 dark:text-purple-400 text-xs">?</span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {question}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Code Review Checklist</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">✅ Look For</div>
                      <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                        <li>• ESLint warnings addressed</li>
                        <li>• Cleanup functions</li>
                        <li>• Specific dependencies</li>
                        <li>• Memoized references</li>
                        <li>• Debounced effects</li>
                      </ul>
                    </div>
                    
                    <div>
                      <div className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">🚫 Flag These</div>
                      <ul className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                        <li>• Missing dependencies</li>
                        <li>• setState in effects without conditions</li>
                        <li>• No cleanup for subscriptions</li>
                        <li>• Object/array literals in deps</li>
                        <li>• Async effects without cleanup</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-xl">
                  <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                    Production Tip
                  </h4>
                  <p className="text-sm text-purple-700 dark:text-purple-400">
                    In production, use error boundaries to catch effect errors and monitoring 
                    to track effect execution times. Effects that take more than 100ms to run 
                    should be optimized or broken up.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Teacher's Note Section */}
        <div className="mt-8 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-6 shadow-lg border-l-4 border-orange-500 dark:border-orange-400 animate-[fadeInUp_1.3s_ease-out]">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 flex items-center justify-center">
                <span className="text-white text-xl font-bold">SH</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Teacher's Note
              </h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  <strong>Dear students from Shyamnagar, Ichapur, and Barrackpore,</strong>
                </p>
                
                <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg mb-4 border border-orange-200 dark:border-orange-700">
                  <h4 className="font-semibold text-orange-700 dark:text-orange-400 mb-2">
                    The Debugging Mindset:
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    When Tuhina's app kept showing old search results, we spent hours debugging. 
                    Finally, we opened the console and saw the effect running with stale values. 
                    The missing <code>[searchTerm]</code> dependency was the culprit.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    <strong>Always debug with console open.</strong> See what values your effects 
                    actually receive, not what you think they receive.
                  </p>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  After 27 years of debugging applications, I can tell you that dependency mistakes 
                  follow patterns. The student from Naihati who fixed 10 bugs in one day? They learned 
                  the patterns and knew what to look for.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  <strong>Professional Insight:</strong> In enterprise teams, we use these practices:
                </p>
                
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">1.</span>
                    <span><strong>Mandatory ESLint</strong> - CI fails on exhaustive-deps warnings</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">2.</span>
                    <span><strong>Code review checklist</strong> - Every useEffect gets reviewed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">3.</span>
                    <span><strong>Performance budgets</strong> - Effects over 16ms get flagged</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-500 mr-2">4.</span>
                    <span><strong>Automated testing</strong> - Test effect cleanup and re-runs</span>
                  </li>
                </ul>
                
                <div className="mt-4 pt-4 border-t border-orange-200 dark:border-orange-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Sukanta Hui</strong> · 27 years experience · 
                    <a href="mailto:sukantahui@codernaccotax.co.in" className="text-orange-600 dark:text-orange-400 hover:underline ml-1">
                      sukantahui@codernaccotax.co.in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hint Section */}
        <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-2xl border border-red-200 dark:border-red-700 animate-[fadeInUp_1.4s_ease-out]">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
              <span className="text-red-600 dark:text-red-400">🔍</span>
            </span>
            Debugging Challenge
          </h4>
          
          <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Find the Bug</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Study this code and identify all dependency mistakes:
              </p>
              
              <pre className="text-xs bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
{`function BuggyComponent() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: 'Swadeep' });
  const [items, setItems] = useState([]);
  
  // Mistake 1
  useEffect(() => {
    console.log('Count is:', count);
  }, []);
  
  // Mistake 2  
  useEffect(() => {
    setCount(count + 1);
  }, [count]);
  
  // Mistake 3
  useEffect(() => {
    const id = setInterval(() => {
      console.log('Tick');
    }, 1000);
  }, []);
  
  // Mistake 4
  useEffect(() => {
    fetch('/api/data').then(setItems);
  }, []);
  
  // Mistake 5
  useEffect(() => {
    console.log(user);
  }, [user]);
  
  return <div>Count: {count}</div>;
}`}
              </pre>
              
              <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                How many mistakes can you find? Check your answers in the playground above.
              </div>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Practical Exercise:</strong> In the playground above, try this sequence:
              </p>
              <ol className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                <li>1. Select "Missing Dependencies" mode</li>
                <li>2. Click "Increment Counter" 5 times</li>
                <li>3. Wait 3 seconds</li>
                <li>4. Check what value gets logged (stale vs current)</li>
              </ol>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Now switch to "Proper Dependencies" mode and repeat. See the difference?
              </p>
            </div>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-[fadeInUp_1.5s_ease-out]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
              <span className="text-red-600 dark:text-red-400">🚫</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Critical Mistakes</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Missing dependencies (stale closures)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Infinite loops (updates own deps)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>No cleanup (memory leaks)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Conditional hooks (breaks React)</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <span className="text-green-600 dark:text-green-400">✅</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Correct Patterns</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>All used values in deps</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Cleanup for subscriptions</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Memoized object/function refs</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Async cleanup with flags</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <span className="text-blue-600 dark:text-blue-400">🔧</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Debugging Tools</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>ESLint exhaustive-deps rule</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>React DevTools Components tab</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Console.log dependencies</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Performance profiling</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
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

export default Topic35;