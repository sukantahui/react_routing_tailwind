import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

const Topic31 = () => {
  // State for tracking render cycles and timing
  const [renderCount, setRenderCount] = useState(0);
  const [effectCount, setEffectCount] = useState(0);
  const [phase, setPhase] = useState('initial');
  const [timeline, setTimeline] = useState([]);
  const [dependency, setDependency] = useState(0);
  const [showLifecycleComparison, setShowLifecycleComparison] = useState(false);
  const [componentType, setComponentType] = useState('functional');
  const [mountTime, setMountTime] = useState(null);
  const [updateTime, setUpdateTime] = useState(null);
  const [cleanupLog, setCleanupLog] = useState([]);
  
  // Refs for timing measurements
  const renderStartTime = useRef(null);
  const effectStartTime = useRef(null);
  const mountStartTime = useRef(null);

  // Log function for timeline
  const logTimeline = (stage, description, color = 'gray') => {
    const timestamp = performance.now().toFixed(2);
    setTimeline(prev => [
      ...prev,
      {
        id: Date.now(),
        stage,
        description,
        timestamp: parseFloat(timestamp),
        color,
        componentType
      }
    ].slice(-15)); // Keep last 15 entries
  };

  // Effect 1: Empty dependency array (mount)
  useEffect(() => {
    const now = performance.now();
    const renderDuration = renderStartTime.current ? (now - renderStartTime.current).toFixed(2) : 'N/A';
    
    logTimeline('effect', `useEffect with [] ran (mount) - ${renderDuration}ms after render`, 'green');
    setEffectCount(prev => prev + 1);
    setPhase('mounted');
    
    if (mountStartTime.current) {
      const mountDuration = (now - mountStartTime.current).toFixed(2);
      setMountTime(mountDuration);
      logTimeline('complete', `Component fully mounted in ${mountDuration}ms`, 'blue');
    }
    
    // Cleanup function (will run on unmount)
    return () => {
      logTimeline('cleanup', 'Cleanup from mount effect ran (unmount)', 'red');
      setCleanupLog(prev => [...prev, 'Mount effect cleanup']);
    };
  }, []);

  // Effect 2: Dependency array with state
  useEffect(() => {
    const now = performance.now();
    const renderDuration = renderStartTime.current ? (now - renderStartTime.current).toFixed(2) : 'N/A';
    
    logTimeline('effect', `useEffect with [dependency] ran - ${renderDuration}ms after render`, 'purple');
    setEffectCount(prev => prev + 1);
    
    // This simulates a side effect that depends on dependency
    document.title = `Dependency: ${dependency} | Timing Demo`;
    
    // Cleanup function
    return () => {
      logTimeline('cleanup', 'Cleanup from dependency effect ran', 'orange');
      setCleanupLog(prev => [...prev, `Dependency ${dependency} cleanup`]);
      document.title = 'React App'; // Reset title
    };
  }, [dependency]);

  // Effect 3: No dependency array (runs on every render)
  useEffect(() => {
    const now = performance.now();
    const renderDuration = renderStartTime.current ? (now - renderStartTime.current).toFixed(2) : 'N/A';
    
    logTimeline('effect', `useEffect without deps ran - ${renderDuration}ms after render`, 'yellow');
    
    // Cleanup function
    return () => {
      logTimeline('cleanup', 'Cleanup from no-deps effect ran', 'pink');
    };
  });

  // Track render timing
  useEffect(() => {
    // This runs after every render to update render count
    if (renderStartTime.current) {
      const renderDuration = (performance.now() - renderStartTime.current).toFixed(2);
      logTimeline('render', `Render #${renderCount} completed in ${renderDuration}ms`, 'blue');
    }
  });

  // Handle component mount timing
  useEffect(() => {
    mountStartTime.current = performance.now();
    logTimeline('start', 'Component started mounting', 'green');
    
    return () => {
      logTimeline('unmount', 'Component unmounting started', 'red');
    };
  }, []);

  // Function to trigger re-render
  const triggerRender = () => {
    renderStartTime.current = performance.now();
    setRenderCount(prev => prev + 1);
    setPhase('updating');
    logTimeline('trigger', 'Render triggered via button click', 'indigo');
  };

  // Function to update dependency
  const updateDependency = () => {
    setDependency(prev => prev + 1);
    logTimeline('state', `State updated: dependency = ${dependency + 1}`, 'teal');
  };

  // Function to reset everything
  const resetTimeline = () => {
    setTimeline([]);
    setRenderCount(0);
    setEffectCount(0);
    setDependency(0);
    setCleanupLog([]);
    setMountTime(null);
    setUpdateTime(null);
    setPhase('initial');
    logTimeline('reset', 'Timeline reset to initial state', 'gray');
  };

  // Function to simulate unmount/remount
  const toggleComponent = () => {
    setComponentType(prev => prev === 'functional' ? 'unmounted' : 'functional');
    if (componentType === 'functional') {
      logTimeline('unmount', 'Component unmounted (simulated)', 'red');
    } else {
      logTimeline('mount', 'Component mounted (simulated)', 'green');
      mountStartTime.current = performance.now();
    }
  };

  // Lifecycle phases visualization
  const lifecyclePhases = [
    { phase: 'Render', description: 'React calls your component function', color: 'bg-blue-500', timing: 'Synchronous' },
    { phase: 'Commit', description: 'React updates the DOM', color: 'bg-green-500', timing: 'Synchronous' },
    { phase: 'Layout Effects', description: 'useLayoutEffect runs here', color: 'bg-yellow-500', timing: 'Synchronous' },
    { phase: 'Browser Paint', description: 'Browser paints the screen', color: 'bg-purple-500', timing: 'Async' },
    { phase: 'Effects', description: 'useEffect runs here', color: 'bg-red-500', timing: 'Async' },
  ];

  // Class vs Functional comparison
  const lifecycleComparison = [
    { classMethod: 'constructor()', functionalEquivalent: 'useState initializer', timing: 'Mount' },
    { classMethod: 'render()', functionalEquivalent: 'Function body return', timing: 'Mount/Update' },
    { classMethod: 'componentDidMount()', functionalEquivalent: 'useEffect with []', timing: 'After mount' },
    { classMethod: 'componentDidUpdate()', functionalEquivalent: 'useEffect with deps', timing: 'After update' },
    { classMethod: 'componentWillUnmount()', functionalEquivalent: 'useEffect cleanup', timing: 'Before unmount' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 animate-[fadeInUp_0.8s_ease-out]">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
            <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
              Topic 27/46
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            useEffect Execution Timing Explained
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Unravel the mystery of when useEffect runs in the React lifecycle. Learn how effects are scheduled, 
            when cleanup happens, and master the precise timing of your side effects.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Theory & Explanation */}
          <div className="space-y-8">
            {/* The React Lifecycle Timeline */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_0.9s_ease-out]">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                  <span className="text-xl">⏱️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  React's Execution Timeline
                </h2>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Understanding when <code>useEffect</code> runs is crucial for predictable behavior. 
                  Effects run <strong>asynchronously</strong> after the browser has painted the screen.
                </p>
                
                {/* Timeline Visualization */}
                <div className="my-8">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-center">
                    React Component Lifecycle Flow
                  </h4>
                  
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 transform -translate-y-1/2"></div>
                    
                    {/* Phase Markers */}
                    <div className="relative flex justify-between items-center">
                      {lifecyclePhases.map((phase, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div className={clsx(
                            "w-6 h-6 rounded-full flex items-center justify-center mb-2 transform hover:scale-125 transition-transform duration-300",
                            phase.color
                          )}>
                            <span className="text-white text-xs">{index + 1}</span>
                          </div>
                          <div className="text-center max-w-[100px]">
                            <div className="text-xs font-semibold text-gray-900 dark:text-white">
                              {phase.phase}
                            </div>
                            <div className="text-[10px] text-gray-600 dark:text-gray-400 mt-1">
                              {phase.timing}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Description Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
                      {lifecyclePhases.map((phase, index) => (
                        <div 
                          key={index}
                          className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
                        >
                          <div className="flex items-center mb-2">
                            <div className={clsx("w-3 h-3 rounded-full mr-2", phase.color)}></div>
                            <h5 className="font-semibold text-gray-900 dark:text-white">
                              {phase.phase}
                            </h5>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {phase.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-5 rounded-xl my-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">🎯 Key Timing Insight</h4>
                  <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2 italic text-gray-700 dark:text-gray-300">
                    "useEffect runs after the render is committed to the screen and the browser has painted. 
                    This prevents side effects from blocking visual updates."
                  </blockquote>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Real-World Analogy</h4>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <p className="text-gray-700 dark:text-gray-300">
                      Think of Tuhina from Barrackpore organizing a classroom:
                    </p>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">1.</span>
                        <span><strong>Render:</strong> She writes the lesson plan (what to teach)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">2.</span>
                        <span><strong>Commit:</strong> She writes on the blackboard</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-purple-500 mr-2">3.</span>
                        <span><strong>Paint:</strong> Students read the blackboard</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">4.</span>
                        <span><strong>useEffect:</strong> She updates the attendance register (after class)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Class vs Functional Comparison */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.0s_ease-out]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                  <span className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-3">
                    <span className="text-lg">🔄</span>
                  </span>
                  Class vs Functional Lifecycle
                </h3>
                <button
                  onClick={() => setShowLifecycleComparison(!showLifecycleComparison)}
                  className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:hover:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300 rounded-lg transition-colors duration-300"
                >
                  {showLifecycleComparison ? 'Hide' : 'Show'} Comparison
                </button>
              </div>
              
              {showLifecycleComparison && (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-900">
                        <th className="p-3 text-left text-gray-900 dark:text-white font-semibold">Class Method</th>
                        <th className="p-3 text-left text-gray-900 dark:text-white font-semibold">Functional Equivalent</th>
                        <th className="p-3 text-left text-gray-900 dark:text-white font-semibold">Timing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lifecycleComparison.map((item, index) => (
                        <tr 
                          key={index}
                          className={clsx(
                            "border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors",
                            index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-900/30"
                          )}
                        >
                          <td className="p-3 font-mono text-sm text-blue-600 dark:text-blue-400">
                            {item.classMethod}
                          </td>
                          <td className="p-3 font-mono text-sm text-green-600 dark:text-green-400">
                            {item.functionalEquivalent}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                              {item.timing}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Important Difference</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Class components:</strong> Lifecycle methods run during specific phases<br />
                  <strong>Function components:</strong> Effects run after paint, cleanup runs before next effect or unmount
                </p>
              </div>
            </section>

            {/* Common Timing Pitfalls */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.1s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
                  <span className="text-lg">⚠️</span>
                </span>
                Common Timing Pitfalls
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    issue: "Assuming effects run synchronously",
                    problem: "Trying to measure DOM elements immediately after setting state",
                    solution: "Use useLayoutEffect for synchronous side effects, or useEffect with proper timing",
                    code: `// ❌ DOM might not be updated yet
useEffect(() => {
  const height = elementRef.current.offsetHeight;
  // Might be old value
}, [state]);`
                  },
                  {
                    issue: "Multiple effects with unclear order",
                    problem: "Effects depending on each other's execution order",
                    solution: "Combine related effects into one useEffect, or use proper dependencies",
                    code: `// ❌ Which effect runs first?
useEffect(() => { /* Effect A */ }, []);
useEffect(() => { /* Effect B */ }, []);

// ✅ Combine if order matters
useEffect(() => {
  // Effect A
  // Effect B (after A completes)
}, []);`
                  },
                  {
                    issue: "Cleanup timing confusion",
                    problem: "Assuming cleanup runs only on unmount",
                    solution: "Cleanup runs before every re-run of the effect (if dependencies change)",
                    code: `// ❌ Thinking cleanup only happens on unmount
useEffect(() => {
  const subscription = subscribe();
  
  return () => {
    // This runs before next effect, not just unmount!
    unsubscribe(subscription);
  };
}, [dependency]); // Cleanup runs when dependency changes`
                  }
                ].map((item, index) => (
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
                          {item.issue}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <strong>Problem:</strong> {item.problem}
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400 mb-3">
                          <strong>Solution:</strong> {item.solution}
                        </p>
                        <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto">
                          {item.code}
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
            {/* Live Timing Dashboard */}
            <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.0s_ease-out]">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Live Timing Dashboard
              </h3>
              
              {/* Current Status */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{renderCount}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Render Count</div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">{effectCount}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Effect Runs</div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">{dependency}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Dependency Value</div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">{cleanupLog.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Cleanup Runs</div>
                  </div>
                </div>
              </div>
              
              {/* Control Panel */}
              <div className="mb-8 p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Control Panel</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={triggerRender}
                    className="py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Trigger Re-render
                  </button>
                  
                  <button
                    onClick={updateDependency}
                    className="py-3 px-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Update Dependency (+1)
                  </button>
                  
                  <button
                    onClick={toggleComponent}
                    className={clsx(
                      "py-3 px-4 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95",
                      componentType === 'functional' 
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    )}
                  >
                    {componentType === 'functional' ? 'Simulate Unmount' : 'Simulate Mount'}
                  </button>
                  
                  <button
                    onClick={resetTimeline}
                    className="py-3 px-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Reset Timeline
                  </button>
                </div>
                
                <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Current Phase: <span className="text-blue-600 dark:text-blue-400">{phase.toUpperCase()}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Component Type: <span className="font-mono">{componentType}</span>
                  </div>
                  {mountTime && (
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Initial Mount Time: <span className="text-green-600 dark:text-green-400">{mountTime}ms</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Active Effects Display */}
              <div className="mb-8 p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Active Effects Tracking</h4>
                
                <div className="space-y-4">
                  {[
                    {
                      name: 'useEffect with []',
                      description: 'Runs once on mount, cleanup on unmount',
                      status: renderCount > 0 ? 'Active (mounted)' : 'Inactive',
                      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    },
                    {
                      name: 'useEffect with [dependency]',
                      description: `Runs when dependency changes (current: ${dependency})`,
                      status: 'Active',
                      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                    },
                    {
                      name: 'useEffect without deps',
                      description: 'Runs after every render',
                      status: 'Active',
                      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }
                  ].map((effect, index) => (
                    <div 
                      key={index}
                      className="p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-gray-900 dark:text-white">{effect.name}</div>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${effect.color}`}>
                          {effect.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {effect.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Timeline Visualization */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.1s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Execution Timeline
              </h3>
              
              <div className="h-64 overflow-y-auto bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 mb-4">
                {timeline.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    Timeline will appear as you interact with the component
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[...timeline].reverse().map((event, index) => (
                      <div 
                        key={event.id}
                        className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={clsx(
                              "w-3 h-3 rounded-full mr-3",
                              event.color === 'green' && "bg-green-500",
                              event.color === 'blue' && "bg-blue-500",
                              event.color === 'red' && "bg-red-500",
                              event.color === 'purple' && "bg-purple-500",
                              event.color === 'yellow' && "bg-yellow-500",
                              event.color === 'gray' && "bg-gray-500"
                            )}></div>
                            <div>
                              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                                {event.stage.toUpperCase()}
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">
                                {event.description}
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {event.timestamp}ms
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Timing Analysis</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Observe how effects run <strong>after</strong> render completes. Notice cleanup functions 
                  running before the next effect execution when dependencies change.
                </p>
              </div>
            </section>

            {/* Cleanup Timing Section */}
            <section className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/10 dark:to-amber-900/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.2s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Cleanup Function Timing
              </h3>
              
              <div className="space-y-6">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">When Cleanup Runs</h4>
                  
                  <div className="space-y-4">
                    {[
                      {
                        scenario: 'On unmount',
                        timing: 'When component is removed from DOM',
                        example: 'Closing a modal, navigating away'
                      },
                      {
                        scenario: 'Before effect re-run',
                        timing: 'When dependencies change and effect will run again',
                        example: 'Changing filter criteria that triggers new API call'
                      },
                      {
                        scenario: 'On dependency array change',
                        timing: 'Immediately before the next effect with same dependencies',
                        example: 'Search term changes, cleanup old subscription'
                      }
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
                      >
                        <div className="flex items-center mb-2">
                          <div className="w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-3">
                            <span className="text-orange-600 dark:text-orange-400 text-sm">{index + 1}</span>
                          </div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {item.scenario}
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 ml-9">
                          <strong>Timing:</strong> {item.timing}<br />
                          <strong>Example:</strong> {item.example}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Cleanup Log */}
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Cleanup Log</h4>
                  
                  <div className="h-32 overflow-y-auto bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3">
                    {cleanupLog.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                        No cleanup events yet
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
                </div>
                
                <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-xl">
                  <h4 className="font-semibold text-orange-800 dark:text-orange-300 mb-2">
                    Professional Insight
                  </h4>
                  <p className="text-sm text-orange-700 dark:text-orange-400">
                    In production apps, we use cleanup functions to prevent memory leaks from 
                    abandoned subscriptions, timers, and event listeners. Always clean up what you set up.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Teacher's Note Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 shadow-lg border-l-4 border-blue-500 dark:border-blue-400 animate-[fadeInUp_1.3s_ease-out]">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                <span className="text-white text-xl font-bold">SH</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Teacher's Note
              </h3>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  <strong>Dear students from Barrackpore, Shyamnagar, and Ichapur,</strong>
                </p>
                
                <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg mb-4 border border-blue-200 dark:border-blue-700">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-400 mb-2">
                    The Timing Mindset Shift:
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    When Debangshu from Naihati asked why his animation was janky, we discovered he was 
                    doing DOM measurements in useEffect. The fix? Move it to useLayoutEffect.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Remember: <strong>useEffect = after paint</strong>, <strong>useLayoutEffect = before paint</strong>
                  </p>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  After 27 years of performance optimization, I can tell you that understanding effect timing 
                  is what separates junior from senior React developers. The student from Barrackpore who 
                  fixed their app's loading indicator? They learned to time their effects properly.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  <strong>Professional Insight:</strong> In enterprise applications, we monitor effect execution 
                  times. If an effect takes more than 16ms (one frame at 60fps), it can cause jank. 
                  We use performance monitoring tools to track this.
                </p>
                
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><strong>Rule 1:</strong> Effects should be fast (under 16ms)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><strong>Rule 2:</strong> Cleanup should be idempotent (safe to run multiple times)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span><strong>Rule 3:</strong> Order effects by priority (data fetching before analytics)</span>
                  </li>
                </ul>
                
                <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Sukanta Hui</strong> · 27 years experience · 
                    <a href="mailto:sukantahui@codernaccotax.co.in" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
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
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Watch the Timeline</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Perform these actions in order and observe the timeline:
              </p>
              
              <ol className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3 text-xs">1</span>
                  <span>Click "Trigger Re-render" 3 times</span>
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3 text-xs">2</span>
                  <span>Click "Update Dependency" 2 times</span>
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3 text-xs">3</span>
                  <span>Click "Simulate Unmount", then "Simulate Mount"</span>
                </li>
              </ol>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Critical Question:</strong> Notice when cleanup runs. Does it run:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                <li>• Only when the component unmounts?</li>
                <li>• Before every effect re-run?</li>
                <li>• Both?</li>
              </ul>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Try this:</strong> Open Chrome DevTools → Performance tab. Record a timeline while 
              clicking the buttons. You'll see the actual browser painting and when React effects run.
            </p>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-[fadeInUp_1.5s_ease-out]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <span className="text-blue-600 dark:text-blue-400">⏱️</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Timing Rules</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Effects run after paint</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Render → Commit → Paint → Effects</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Cleanup runs before next effect</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Multiple effects run in order</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <span className="text-green-600 dark:text-green-400">🎯</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">When to Use</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>useEffect: Data fetching, subscriptions</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>useLayoutEffect: DOM measurements</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>[]: Mount-only effects</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>[deps]: Effect synchronization</span>
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
                <span>Assuming synchronous execution</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Forgetting cleanup on unmount</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Effect order dependencies</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Blocking paint with slow effects</span>
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