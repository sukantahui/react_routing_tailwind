import { useState } from 'react';
import clsx from 'clsx';

const Topic10 = () => {
  // Example 1: Async state updates demonstration
  const [counter, setCounter] = useState(0);
  const [logEntries, setLogEntries] = useState([]);
  const [batchCounter, setBatchCounter] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  // Track render count (for demonstration)
  useState(() => {
    setRenderCount(prev => prev + 1);
  });

  const addLogEntry = (message, value, type = 'info') => {
    setLogEntries(prev => [
      {
        id: Date.now(),
        message,
        value,
        type,
        timestamp: new Date().toLocaleTimeString(),
        renderCount: renderCount
      },
      ...prev.slice(0, 9) // Keep only last 10 entries
    ]);
  };

  // ===== DEMONSTRATION 1: Async Nature =====
  const demonstrateAsyncUpdate = () => {
    addLogEntry('Starting async demonstration...', counter, 'info');
    
    // This won't show updated value immediately
    setCounter(counter + 1);
    addLogEntry(`Called setCounter(${counter + 1})`, counter, 'call');
    addLogEntry(`counter value immediately after setCounter: ${counter}`, counter, 'warning');
    
    // Another update
    setCounter(counter + 2);
    addLogEntry(`Called setCounter(${counter + 2})`, counter, 'call');
    addLogEntry(`counter value immediately after second setCounter: ${counter}`, counter, 'warning');
    
    // Log after a timeout (simulates when React actually updates)
    setTimeout(() => {
      addLogEntry(`counter value after timeout (re-render complete): ${counter}`, counter, 'success');
    }, 0);
  };

  // ===== DEMONSTRATION 2: Batching =====
  const demonstrateBatching = () => {
    addLogEntry('Starting batching demonstration...', batchCounter, 'info');
    
    // React batches these updates
    setBatchCounter(prev => {
      addLogEntry('First updater function executing', prev, 'internal');
      return prev + 1;
    });
    
    setBatchCounter(prev => {
      addLogEntry('Second updater function executing', prev, 'internal');
      return prev + 2;
    });
    
    setBatchCounter(prev => {
      addLogEntry('Third updater function executing', prev, 'internal');
      return prev + 3;
    });
    
    addLogEntry(`Called 3 setBatchCounter updates`, batchCounter, 'call');
    addLogEntry(`batchCounter value immediately after calls: ${batchCounter}`, batchCounter, 'warning');
  };

  // ===== DEMONSTRATION 3: Multiple Sync Updates =====
  const demonstrateMultipleUpdates = () => {
    const initialValue = counter;
    addLogEntry(`Starting with counter: ${initialValue}`, initialValue, 'info');
    
    // These all use the same stale value
    setCounter(counter + 1);
    setCounter(counter + 1);
    setCounter(counter + 1);
    
    addLogEntry(`Called setCounter 3 times with counter + 1`, counter, 'call');
    addLogEntry(`Expected: ${initialValue + 3}, Actual after sync code: ${counter}`, counter, 'warning');
  };

  // ===== DEMONSTRATION 4: Functional Updates (Solution) =====
  const demonstrateFunctionalUpdates = () => {
    addLogEntry('Starting functional updates demonstration...', counter, 'info');
    
    // Correct way: using functional updates
    setCounter(prev => {
      const newValue = prev + 1;
      addLogEntry(`First updater: prev=${prev}, returning ${newValue}`, prev, 'internal');
      return newValue;
    });
    
    setCounter(prev => {
      const newValue = prev + 1;
      addLogEntry(`Second updater: prev=${prev}, returning ${newValue}`, prev, 'internal');
      return newValue;
    });
    
    setCounter(prev => {
      const newValue = prev + 1;
      addLogEntry(`Third updater: prev=${prev}, returning ${newValue}`, prev, 'internal');
      return newValue;
    });
    
    addLogEntry(`Called 3 functional updates`, counter, 'call');
  };

  // ===== DEMONSTRATION 5: Event Handler Batching =====
  const demonstrateEventHandlerBatching = () => {
    addLogEntry('Starting event handler batching demo...', counter, 'info');
    
    // These get batched in React 18+
    setCounter(prev => prev + 10);
    setCounter(prev => prev + 20);
    setCounter(prev => prev + 30);
    
    addLogEntry('All updates batched in single re-render', counter, 'info');
  };

  // ===== DEMONSTRATION 6: setTimeout vs sync updates =====
  const demonstrateSetTimeoutUpdate = () => {
    addLogEntry('Starting setTimeout vs sync comparison...', counter, 'info');
    
    // This update is batched (if in React 18+ with createRoot)
    setCounter(counter + 100);
    addLogEntry('Sync update scheduled', counter, 'call');
    
    // This update is NOT batched (runs outside React's event handler)
    setTimeout(() => {
      setCounter(prev => prev + 200);
      addLogEntry('setTimeout update executed (not batched)', counter, 'async');
    }, 100);
  };

  // ===== DEMONSTRATION 7: State dependency chain =====
  const demonstrateStateChain = () => {
    addLogEntry('Starting state dependency chain...', counter, 'info');
    
    // Chain of state updates that depend on each other
    setCounter(prev => {
      const step1 = prev + 5;
      addLogEntry(`Step 1: ${prev} + 5 = ${step1}`, step1, 'chain');
      return step1;
    });
    
    setCounter(prev => {
      const step2 = prev * 2;
      addLogEntry(`Step 2: ${prev} * 2 = ${step2}`, step2, 'chain');
      return step2;
    });
    
    setCounter(prev => {
      const step3 = prev - 10;
      addLogEntry(`Step 3: ${prev} - 10 = ${step3}`, step3, 'chain');
      return step3;
    });
  };

  // Reset all demonstrations
  const resetAll = () => {
    setCounter(0);
    setBatchCounter(0);
    setLogEntries([]);
    addLogEntry('Reset all demonstrations', 0, 'reset');
  };

  // Clear log only
  const clearLog = () => {
    setLogEntries([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-500">
      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulseAsync {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.4);
            border-color: rgba(139, 92, 246, 0.3);
          }
          50% { 
            box-shadow: 0 0 0 10px rgba(139, 92, 246, 0);
            border-color: rgba(139, 92, 246, 0.7);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes highlight {
          0% { background-color: rgba(59, 130, 246, 0.2); }
          100% { background-color: transparent; }
        }
        
        .log-entry {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>

      {/* Header Section */}
      <div 
        className="max-w-6xl mx-auto mb-12 animate-[fadeSlideUp_0.8s_ease-out]"
        style={{ animation: 'fadeSlideUp 0.8s ease-out' }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 tracking-tight">
          Why State Updates Are Asynchronous
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Understanding React's update mechanism, batching, and the importance of functional updates
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Theory Card */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 
                     border border-gray-200 dark:border-gray-700
                     hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-700
                     transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.1s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.1s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 
                           rounded-lg p-2 mr-3 text-xl">📘</span>
            Conceptual Foundation
          </h2>
          
          <div className="space-y-6">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-2">What Does "Asynchronous" Mean?</h3>
              <p className="text-gray-700 dark:text-gray-300">
                When you call a state setter function (<code className="bg-gray-100 dark:bg-gray-700 px-1">setCounter</code>), 
                React <strong>doesn't immediately update the state and re-render</strong>. Instead, it schedules 
                the update to happen later. This is why you can't read the updated value right after calling the setter.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Performance Optimization</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Batch multiple updates together
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Avoid unnecessary re-renders
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    Schedule updates efficiently
                  </li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">Batching</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Multiple setState calls in one event
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Single re-render for batch
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Better performance
                  </li>
                </ul>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h3 className="font-semibold text-red-700 dark:text-red-300 mb-2">Common Pitfall</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Reading state immediately after setter
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Multiple updates with stale values
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Expecting sync behavior
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Key Insight</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Think of state setters as <strong>scheduling a state change</strong>, not immediately changing state. 
                React processes these scheduled changes later, often batching multiple updates together for efficiency.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Timeline */}
        <div 
          className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-purple-100 dark:border-purple-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.2s_both]
                     motion-safe:animate-[pulseAsync_3s_ease-in-out_infinite]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.2s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">⏱️</span>
            State Update Timeline
          </h2>
          
          <div className="relative">
            {/* Timeline */}
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-400 to-blue-400 dark:from-purple-600 dark:to-blue-600"></div>
            
            <div className="ml-12 space-y-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-purple-500 border-4 border-white dark:border-gray-800"></div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-2">1. Event Occurs</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    User clicks button, form submits, timer fires, etc.
                  </p>
                  <div className="mt-2 font-mono text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
                    onClick, onChange, useEffect, etc.
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-gray-800"></div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-2">2. State Setter Called</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <code className="bg-gray-100 dark:bg-gray-700 px-1">setState()</code> is invoked. 
                    React <strong>schedules</strong> the update but doesn't execute it immediately.
                  </p>
                  <div className="mt-2 font-mono text-xs bg-gray-900 text-green-300 p-2 rounded">
                    setCounter(value) // schedules update
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-green-500 border-4 border-white dark:border-gray-800"></div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-2">3. Batching (If Applicable)</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Multiple state updates in the same event are grouped together. 
                    In React 18+, most updates are automatically batched.
                  </p>
                  <div className="mt-2 font-mono text-xs bg-gray-900 text-green-300 p-2 rounded">
                    // All these updates get batched:<br/>
                    setCounter(c + 1);<br/>
                    setCounter(c + 2);<br/>
                    setCounter(c + 3);
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative">
                <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-yellow-500 border-4 border-white dark:border-gray-800"></div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-2">4. Reconciliation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    React processes scheduled updates, calculates new state values, 
                    and prepares for re-render.
                  </p>
                  <div className="mt-2 font-mono text-xs bg-gray-900 text-green-300 p-2 rounded">
                    // React processes queued updates<br/>
                    // Applies state changes<br/>
                    // Triggers re-render
                  </div>
                </div>
              </div>
              
              {/* Step 5 */}
              <div className="relative">
                <div className="absolute -left-8 top-0 w-4 h-4 rounded-full bg-red-500 border-4 border-white dark:border-gray-800"></div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-gray-800 dark:text-white mb-2">5. Component Re-renders</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Component function executes again with new state values. 
                    This is when you see the updated state.
                  </p>
                  <div className="mt-2 font-mono text-xs bg-gray-900 text-green-300 p-2 rounded">
                    function Component() {"{"}<br/>
                    &nbsp;&nbsp;const [counter, setCounter] = useState(0);<br/>
                    &nbsp;&nbsp;// Now counter has new value<br/>
                    {"}"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Demonstrations */}
        <div 
          className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-blue-100 dark:border-blue-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.3s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.3s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">🎮</span>
            Interactive Demonstrations
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Current State Display */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Current State Values</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <div className="text-sm text-blue-700 dark:text-blue-300 mb-1">Counter</div>
                  <div className="text-3xl font-bold text-gray-800 dark:text-white">{counter}</div>
                  <div className="text-xs text-gray-500 mt-1">Updated asynchronously</div>
                </div>
                
                <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                  <div className="text-sm text-purple-700 dark:text-purple-300 mb-1">Batch Counter</div>
                  <div className="text-3xl font-bold text-gray-800 dark:text-white">{batchCounter}</div>
                  <div className="text-xs text-gray-500 mt-1">Demonstrates batching</div>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-1">Render Count</div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">{renderCount}</div>
                  <div className="text-xs text-gray-500 mt-1">Times component rendered</div>
                </div>
              </div>
            </div>
            
            {/* Demonstration Buttons */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Run Demonstrations</h3>
              
              <div className="space-y-3">
                <button
                  onClick={demonstrateAsyncUpdate}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg font-medium
                           transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Demo: Async Nature
                </button>
                
                <button
                  onClick={demonstrateBatching}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium
                           transition-all duration-300 hover:scale-[1.02]"
                >
                  Demo: Batching
                </button>
                
                <button
                  onClick={demonstrateMultipleUpdates}
                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium
                           transition-all duration-300 hover:scale-[1.02]"
                >
                  Demo: Multiple Sync Updates (Problem)
                </button>
                
                <button
                  onClick={demonstrateFunctionalUpdates}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium
                           transition-all duration-300 hover:scale-[1.02]"
                >
                  Demo: Functional Updates (Solution)
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  onClick={demonstrateEventHandlerBatching}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg font-medium
                           transition-all duration-300"
                >
                  Event Batching
                </button>
                
                <button
                  onClick={demonstrateSetTimeoutUpdate}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium
                           transition-all duration-300"
                >
                  setTimeout vs Sync
                </button>
                
                <button
                  onClick={demonstrateStateChain}
                  className="bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-medium
                           transition-all duration-300"
                >
                  State Chain
                </button>
                
                <button
                  onClick={resetAll}
                  className="bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg font-medium
                           transition-all duration-300"
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>
          
          {/* Code Comparison */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <h4 className="font-bold text-red-700 dark:text-red-300 mb-3">❌ Problem: Stale State</h4>
              <div className="font-mono text-sm bg-gray-900 text-red-300 p-3 rounded">
                {`const handleClick = () => {\n`}
                <span className="text-yellow-300">  // All these use the SAME counter value</span><br/>
                {`  setCounter(counter + 1);\n`}
                {`  setCounter(counter + 1);\n`}
                {`  setCounter(counter + 1);\n`}
                <span className="text-yellow-300">  // Result: counter increases by 1, not 3!</span><br/>
                {`  console.log(counter); // Still old value!\n`}
                {`};`}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Each <code>setCounter</code> uses the same stale <code>counter</code> value
              </p>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-bold text-green-700 dark:text-green-300 mb-3">✅ Solution: Functional Updates</h4>
              <div className="font-mono text-sm bg-gray-900 text-green-300 p-3 rounded">
                {`const handleClick = () => {\n`}
                <span className="text-yellow-300">  // Each gets the previous state</span><br/>
                {`  setCounter(prev => prev + 1);\n`}
                {`  setCounter(prev => prev + 1);\n`}
                {`  setCounter(prev => prev + 1);\n`}
                <span className="text-yellow-300">  // Result: counter increases by 3 ✓</span><br/>
                {`  // console.log still shows old value\n`}
                {`  // Updated value available on next render\n`}
                {`};`}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Functional updates receive the pending state value
              </p>
            </div>
          </div>
        </div>

        {/* Event Log */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 
                     border border-gray-200 dark:border-gray-700
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.4s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.4s both' }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 
                             rounded-lg p-2 mr-3 text-xl">📊</span>
              Event Log
            </h2>
            <button
              onClick={clearLog}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 
                       text-gray-800 dark:text-white rounded-lg transition-all duration-300"
            >
              Clear Log
            </button>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto p-2">
            {logEntries.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <div className="text-4xl mb-4">📝</div>
                <p>Run demonstrations to see state update logs</p>
                <p className="text-sm mt-2">The log will show what happens during async updates</p>
              </div>
            ) : (
              logEntries.map(entry => (
                <div
                  key={entry.id}
                  className={clsx(
                    "log-entry p-4 rounded-lg border transition-all duration-300",
                    entry.type === 'success' && "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
                    entry.type === 'warning' && "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
                    entry.type === 'error' && "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
                    entry.type === 'info' && "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
                    entry.type === 'call' && "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
                    entry.type === 'internal' && "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700",
                    entry.type === 'chain' && "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800",
                    entry.type === 'async' && "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800",
                    entry.type === 'reset' && "bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 dark:text-white">{entry.message}</div>
                      {entry.value !== undefined && (
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Value: <span className="font-mono">{entry.value}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400">{entry.timestamp}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Render: {entry.renderCount}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className={clsx(
                      "w-3 h-3 rounded-full mr-2",
                      entry.type === 'success' && "bg-green-500",
                      entry.type === 'warning' && "bg-yellow-500",
                      entry.type === 'error' && "bg-red-500",
                      entry.type === 'info' && "bg-blue-500",
                      entry.type === 'call' && "bg-purple-500",
                      entry.type === 'internal' && "bg-gray-500",
                      entry.type === 'chain' && "bg-teal-500",
                      entry.type === 'async' && "bg-indigo-500",
                      entry.type === 'reset' && "bg-gray-600"
                    )} />
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-white dark:bg-gray-800">
                      {entry.type.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex flex-wrap gap-2">
              <span className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                Success
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                Warning
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                Info
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-500 mr-1"></div>
                Function Call
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-500 mr-1"></div>
                Internal
              </span>
            </div>
          </div>
        </div>

        {/* Batching Deep Dive */}
        <div 
          className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-green-100 dark:border-green-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.5s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.5s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">🔄</span>
            Batching Deep Dive
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">React 17 vs React 18+</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <h4 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">React 17 & Earlier</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Only batched inside React event handlers</li>
                    <li>• setTimeout, promises, native events: no batching</li>
                    <li>• Multiple re-renders for async code</li>
                    <li>• Less performant</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">React 18+</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Automatic batching by default</li>
                    <li>• Batches all updates (mostly)</li>
                    <li>• setTimeout, promises: also batched</li>
                    <li>• Single re-render for multiple updates</li>
                    <li>• Better performance</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Batching Examples</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Batched in React 18+</div>
                  <div className="font-mono text-green-300 text-sm">
                    {`// All batched together\nsetTimeout(() => {\n`}
                    {`  setCount(c => c + 1);\n`}
                    {`  setName('Swadeep');\n`}
                    {`  setActive(true);\n`}
                    {`}, 1000);`}
                  </div>
                </div>
                
                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Opt-out of Batching</div>
                  <div className="font-mono text-green-300 text-sm">
                    {`import { flushSync } from 'react-dom';\n\n`}
                    {`flushSync(() => {\n`}
                    {`  setCount(c => c + 1); // Immediate re-render\n`}
                    {`});\n`}
                    {`setName('Tuhina'); // Batched with next update`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Patterns & Solutions */}
        <div 
          className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-orange-100 dark:border-orange-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.6s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.6s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">💡</span>
            Patterns & Solutions
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">When to Use Functional Updates</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Multiple sequential updates
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Updates based on previous state
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  In closures (event handlers, timeouts)
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  When state might be stale
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">When Direct Updates Work</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Single update in event handler
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Setting to fixed value (not derived)
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Independent state updates
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Form resets, clear operations
                </li>
              </ul>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">Debugging Async State</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Use useEffect to log state changes
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Check React DevTools profiler
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Add console.log before/after setState
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Use functional updates to avoid staleness
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div 
          className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-red-100 dark:border-red-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.7s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.7s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">🚫</span>
            Common Pitfalls & Misconceptions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">Reading State Immediately</h3>
                <div className="font-mono text-xs bg-gray-900 text-red-300 p-2 rounded">
                  {`const handleClick = () => {\n`}
                  {`  setCounter(counter + 1);\n`}
                  {`  console.log(counter); // OLD value!\n`}
                  {`  sendToAPI(counter); // Sends OLD value!\n`}
                  {`};`}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Solution: Use <code>useEffect</code> or read in next render
                </p>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">Multiple Updates with Same Value</h3>
                <div className="font-mono text-xs bg-gray-900 text-red-300 p-2 rounded">
                  {`// Supposed to increment by 3\n`}
                  {`setCounter(counter + 1);\n`}
                  {`setCounter(counter + 1); // Same as above!\n`}
                  {`setCounter(counter + 1); // Same as above!\n`}
                  {`// Result: +1 not +3`}
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Async/Await Confusion</h3>
                <div className="font-mono text-xs bg-gray-900 text-red-300 p-2 rounded">
                  {`const handleClick = async () => {\n`}
                  {`  await fetchData();\n`}
                  {`  setCounter(counter + 1); // Uses STALE counter!\n`}
                  {`};`}
                </div>
                <div className="font-mono text-xs bg-gray-900 text-green-300 p-2 rounded mt-2">
                  {`// Solution: use functional update\n`}
                  {`setCounter(prev => prev + 1);`}
                </div>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">setTimeout/setInterval</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Timer callbacks create closures that capture stale state. 
                  Always use functional updates or refs in timers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div 
          className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-emerald-100 dark:border-emerald-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.8s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.8s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-300 
                           rounded-lg p-2 mr-3 text-xl">🏆</span>
            Best Practices
          </h2>
          
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">1.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Default to Functional</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Use functional updates by default
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">2.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Expect Async</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Never rely on immediate state updates
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">3.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Use useEffect</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                For side effects after state changes
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">4.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Trust Batching</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Let React optimize re-renders
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Async State Checklist</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Remember state updates are asynchronous
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Use functional updates for sequential changes
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Never read state immediately after setState
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Use useEffect for side effects after updates
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Understand React 18+ batching behavior
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Use refs for values needed in callbacks
              </li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div 
          className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-yellow-200 dark:border-yellow-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.9s_both]
                     motion-safe:animate-[pulseAsync_3s_ease-in-out_infinite]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.9s both' }}
        >
          <div className="flex items-start">
            <div className="bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 
                          rounded-full p-3 mr-4 text-2xl">
              👨‍🏫
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Teacher's Note</h2>
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Sukanta Hui • 27 years experience • sukantahui@codernaccotax.co.in
              </div>
              
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>Think of it this way:</strong> When Swadeep from Barrackpore submits his assignment, 
                  the teacher doesn't grade it immediately. The teacher collects all assignments, 
                  then grades them in batches. React does the same with state updates - collects them, 
                  then processes efficiently.
                </p>
                
                <div className="p-4 bg-white dark:bg-gray-800/50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Pro Tips:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Functional updates are your friend:</strong> They solve 90% of async state problems
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Embrace the async model:</strong> It's what makes React performant
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Debug with useEffect:</strong> Perfect for logging state changes
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Remember closures:</strong> Event handlers capture state at creation time
                    </li>
                  </ul>
                </div>
                
                <p className="text-sm italic text-gray-600 dark:text-gray-400">
                  "When Tuhina from Shyamnagar clicks a button three times quickly, 
                  React doesn't re-render three times. It batches the updates and re-renders once. 
                  This is smart engineering, not a bug. Understanding this will save you hours of debugging!"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hint Section */}
        <div 
          className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-indigo-100 dark:border-indigo-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_1s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 1s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 
                           rounded-lg p-2 mr-3 text-xl">💡</span>
            Thinking Exercises
          </h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Think about...</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Why would React choose async updates? What performance benefits does batching provide 
                in a complex application?
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Observe carefully...</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Run the "Multiple Sync Updates" demo and watch the render count. 
                How many re-renders occur? Now run the "Functional Updates" demo. Any difference?
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Try implementing...</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Create a counter that increments every second using setInterval. 
                Notice how it behaves. Now fix it using functional updates or refs.
              </p>
            </div>
          </div>
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <button
            onClick={resetAll}
            className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 
                     text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl
                     transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Reset All Demonstrations
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm">
          Next: Learn about Functional Updates with useState in Detail
        </p>
      </div>
    </div>
  );
};

export default Topic10;