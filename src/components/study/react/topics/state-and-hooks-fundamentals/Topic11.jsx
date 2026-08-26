import { useState } from 'react';
import clsx from 'clsx';

const Topic11 = () => {
  // Example 1: Basic functional updates
  const [counter, setCounter] = useState(0);
  const [history, setHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Example 2: Multiple state dependencies
  const [complexState, setComplexState] = useState({
    value: 10,
    multiplier: 2,
    result: 20
  });

  // Example 3: Queue demonstration
  const [queue, setQueue] = useState([]);
  const [queueProcessing, setQueueProcessing] = useState(false);

  // Track history of updates
  const addHistoryEntry = (operation, prevValue, newValue, type = 'info') => {
    setHistory(prev => [
      {
        id: Date.now(),
        operation,
        prevValue,
        newValue,
        type,
        timestamp: new Date().toLocaleTimeString()
      },
      ...prev.slice(0, 9) // Keep only last 10 entries
    ]);
  };

  // ===== DEMONSTRATION 1: Basic Functional Updates =====
  const demonstrateBasicFunctional = () => {
    addHistoryEntry('Starting basic functional update', counter, counter, 'info');
    
    // Using functional update
    setCounter(prevCounter => {
      const newValue = prevCounter + 1;
      addHistoryEntry(`prev => prev + 1`, prevCounter, newValue, 'functional');
      return newValue;
    });
  };

  // ===== DEMONSTRATION 2: Multiple Sequential Updates =====
  const demonstrateSequentialUpdates = () => {
    addHistoryEntry('Starting sequential updates', counter, counter, 'info');
    
    // These will queue and process sequentially
    setCounter(prev => {
      const step1 = prev + 5;
      addHistoryEntry('Step 1: +5', prev, step1, 'step');
      return step1;
    });
    
    setCounter(prev => {
      const step2 = prev * 2;
      addHistoryEntry('Step 2: ×2', prev, step2, 'step');
      return step2;
    });
    
    setCounter(prev => {
      const step3 = prev - 3;
      addHistoryEntry('Step 3: -3', prev, step3, 'step');
      return step3;
    });
    
    setCounter(prev => {
      const step4 = Math.floor(prev / 2);
      addHistoryEntry('Step 4: ÷2', prev, step4, 'step');
      return step4;
    });
  };

  // ===== DEMONSTRATION 3: Problem with Non-Functional Updates =====
  const demonstrateNonFunctionalProblem = () => {
    addHistoryEntry('Starting NON-functional updates (problem)', counter, counter, 'warning');
    
    // These all use the SAME stale counter value
    setCounter(counter + 1);
    addHistoryEntry(`setCounter(${counter + 1})`, counter, counter + 1, 'stale');
    
    setCounter(counter + 1);
    addHistoryEntry(`setCounter(${counter + 1})`, counter, counter + 1, 'stale');
    
    setCounter(counter + 1);
    addHistoryEntry(`setCounter(${counter + 1})`, counter, counter + 1, 'stale');
    
    addHistoryEntry('All used same stale value!', counter, counter, 'error');
  };

  // ===== DEMONSTRATION 4: Functional Solution to Same Problem =====
  const demonstrateFunctionalSolution = () => {
    addHistoryEntry('Starting functional solution', counter, counter, 'info');
    
    // These process sequentially with updated values
    setCounter(prev => {
      const newVal = prev + 1;
      addHistoryEntry(`prev => prev + 1`, prev, newVal, 'functional');
      return newVal;
    });
    
    setCounter(prev => {
      const newVal = prev + 1;
      addHistoryEntry(`prev => prev + 1`, prev, newVal, 'functional');
      return newVal;
    });
    
    setCounter(prev => {
      const newVal = prev + 1;
      addHistoryEntry(`prev => prev + 1`, prev, newVal, 'functional');
      return newVal;
    });
  };

  // ===== DEMONSTRATION 5: Complex State with Dependencies =====
  const updateComplexState = () => {
    setComplexState(prev => {
      const newValue = prev.value + 5;
      const newResult = newValue * prev.multiplier;
      
      addHistoryEntry(
        `Complex: value=${prev.value}→${newValue}, result=${prev.result}→${newResult}`,
        prev.value,
        newValue,
        'complex'
      );
      
      return {
        ...prev,
        value: newValue,
        result: newResult
      };
    });
  };

  const updateMultiplier = () => {
    setComplexState(prev => {
      const newMultiplier = prev.multiplier === 2 ? 3 : 2;
      const newResult = prev.value * newMultiplier;
      
      addHistoryEntry(
        `Multiplier: ${prev.multiplier}→${newMultiplier}, result=${prev.result}→${newResult}`,
        prev.multiplier,
        newMultiplier,
        'complex'
      );
      
      return {
        ...prev,
        multiplier: newMultiplier,
        result: newResult
      };
    });
  };

  // ===== DEMONSTRATION 6: Async Operations with Functional Updates =====
  const simulateAsyncOperation = () => {
    setIsProcessing(true);
    addHistoryEntry('Starting async simulation', counter, counter, 'async');
    
    // Simulate API call
    setTimeout(() => {
      // Using functional update to get latest state
      setCounter(prev => {
        const newValue = prev + 10;
        addHistoryEntry('Async timeout completed', prev, newValue, 'async');
        return newValue;
      });
      setIsProcessing(false);
    }, 1000);
  };

  // ===== DEMONSTRATION 7: Queue Processing Simulation =====
  const addToQueue = () => {
    const operationId = queue.length + 1;
    const newQueue = [...queue, { id: operationId, value: operationId * 10 }];
    setQueue(newQueue);
    addHistoryEntry(`Added operation ${operationId} to queue`, queue.length, newQueue.length, 'queue');
  };

  const processQueue = () => {
    if (queue.length === 0 || queueProcessing) return;
    
    setQueueProcessing(true);
    addHistoryEntry('Starting queue processing', 0, 0, 'queue');
    
    // Process queue items one by one using functional updates
    const processNext = (currentCounter) => {
      if (queue.length === 0) {
        setQueueProcessing(false);
        return;
      }
      
      const [nextItem, ...remainingQueue] = queue;
      
      // Update counter with functional update
      setCounter(prev => {
        const newValue = prev + nextItem.value;
        addHistoryEntry(`Processed queue item ${nextItem.id} (+${nextItem.value})`, prev, newValue, 'queue');
        return newValue;
      });
      
      // Update queue
      setQueue(remainingQueue);
      
      // Process next item after delay
      setTimeout(() => processNext(currentCounter + nextItem.value), 500);
    };
    
    processNext(counter);
  };

  // ===== DEMONSTRATION 8: Toggle/Flip Operations =====
  const demonstrateToggle = () => {
    setCounter(prev => {
      const newValue = prev === 0 ? 100 : 0;
      addHistoryEntry(`Toggle: ${prev} → ${newValue}`, prev, newValue, 'toggle');
      return newValue;
    });
  };

  const demonstrateFlip = () => {
    setCounter(prev => {
      const newValue = -prev;
      addHistoryEntry(`Flip sign: ${prev} → ${newValue}`, prev, newValue, 'toggle');
      return newValue;
    });
  };

  // ===== DEMONSTRATION 9: Conditional Updates =====
  const demonstrateConditionalUpdate = () => {
    setCounter(prev => {
      if (prev > 50) {
        const newValue = Math.floor(prev / 2);
        addHistoryEntry(`Conditional (prev>50): ${prev} → ${newValue}`, prev, newValue, 'conditional');
        return newValue;
      } else {
        const newValue = prev * 3;
        addHistoryEntry(`Conditional (else): ${prev} → ${newValue}`, prev, newValue, 'conditional');
        return newValue;
      }
    });
  };

  // ===== DEMONSTRATION 10: Reset Operations =====
  const resetCounter = () => {
    setCounter(0);
    addHistoryEntry('Reset counter to 0', counter, 0, 'reset');
  };

  const resetAll = () => {
    setCounter(0);
    setComplexState({
      value: 10,
      multiplier: 2,
      result: 20
    });
    setQueue([]);
    setQueueProcessing(false);
    setHistory([]);
    addHistoryEntry('Reset all demonstrations', 0, 0, 'reset');
  };

  // ===== DEMONSTRATION 11: Mathematical Operations =====
  const demonstrateMathOperations = () => {
    addHistoryEntry('Starting math operations', counter, counter, 'info');
    
    setCounter(prev => {
      const squared = prev * prev;
      addHistoryEntry(`Square: ${prev} → ${squared}`, prev, squared, 'math');
      return squared;
    });
    
    setCounter(prev => {
      const sqrt = Math.floor(Math.sqrt(prev));
      addHistoryEntry(`Square root: ${prev} → ${sqrt}`, prev, sqrt, 'math');
      return sqrt;
    });
    
    setCounter(prev => {
      const doubled = prev * 2;
      addHistoryEntry(`Double: ${prev} → ${doubled}`, prev, doubled, 'math');
      return doubled;
    });
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
        
        @keyframes pulseFunctional {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
            border-color: rgba(34, 197, 94, 0.3);
          }
          50% { 
            box-shadow: 0 0 0 10px rgba(34, 197, 94, 0);
            border-color: rgba(34, 197, 94, 0.7);
          }
        }
        
        @keyframes pulseQueue {
          0%, 100% { 
            transform: translateY(0);
            background-color: rgba(139, 92, 246, 0.1);
          }
          50% { 
            transform: translateY(-2px);
            background-color: rgba(139, 92, 246, 0.2);
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
        
        .history-entry {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>

      {/* Header Section */}
      <div 
        className="max-w-6xl mx-auto mb-12 animate-[fadeSlideUp_0.8s_ease-out]"
        style={{ animation: 'fadeSlideUp 0.8s ease-out' }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 tracking-tight">
          Functional Updates with useState
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Master the pattern for reliable state updates, especially when dealing with sequential or async operations
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Theory Card */}
        <div 
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 
                     border border-gray-200 dark:border-gray-700
                     hover:shadow-xl hover:border-green-200 dark:hover:border-green-700
                     transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.1s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.1s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 
                           rounded-lg p-2 mr-3 text-xl">📘</span>
            What Are Functional Updates?
          </h2>
          
          <div className="space-y-6">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-bold text-green-700 dark:text-green-300 mb-2">Definition</h3>
              <p className="text-gray-700 dark:text-gray-300">
                A <strong>functional update</strong> is when you pass a <strong>function</strong> to the state setter 
                instead of a direct value. This function receives the <strong>pending state value</strong> as its 
                argument and returns the <strong>new state value</strong>.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Syntax</h3>
                <div className="font-mono text-sm bg-gray-900 text-green-300 p-3 rounded">
                  {`// Regular update (direct value)\nsetCounter(newValue);\n\n`}
                  {`// Functional update (function)\nsetCounter(previousValue => {\n`}
                  {`  return previousValue + 1;\n`}
                  {`});`}
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">When to Use</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Multiple sequential updates
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Updates based on previous state
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Async operations (setTimeout, promises)
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    Event handlers with closures
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    When state might be stale
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
              <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Key Insight</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Functional updates solve the "stale state" problem by ensuring you always work with the 
                <strong> most recent pending state value</strong>, not the potentially stale value from the current render.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Comparison */}
        <div 
          className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-blue-100 dark:border-blue-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.2s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.2s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">⚖️</span>
            Problem vs Solution
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Problem Side */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400">The Problem</h3>
                <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-sm">
                  Stale State
                </span>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">Code Example</h4>
                <div className="font-mono text-sm bg-gray-900 text-red-300 p-3 rounded">
                  {`const [count, setCount] = useState(0);\n\n`}
                  {`const handleClick = () => {\n`}
                  <span className="text-yellow-300">  // All use same stale count value (0)</span><br/>
                  {`  setCount(count + 1);  // 0 + 1 = 1\n`}
                  {`  setCount(count + 1);  // 0 + 1 = 1 (not 2!)\n`}
                  {`  setCount(count + 1);  // 0 + 1 = 1 (not 3!)\n`}
                  <span className="text-yellow-300">  // Result: count = 1, not 3!</span><br/>
                  {`};`}
                </div>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">Why This Happens</h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    React state updates are asynchronous
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    <code>count</code> variable is captured in closure
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    All three calls use the same captured value
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span>
                    Updates overwrite each other
                  </li>
                </ul>
              </div>
              
              <button
                onClick={demonstrateNonFunctionalProblem}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium
                         transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Demonstrate Problem
              </button>
            </div>
            
            {/* Solution Side */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-green-600 dark:text-green-400">The Solution</h3>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm">
                  Functional Update
                </span>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">Code Example</h4>
                <div className="font-mono text-sm bg-gray-900 text-green-300 p-3 rounded">
                  {`const [count, setCount] = useState(0);\n\n`}
                  {`const handleClick = () => {\n`}
                  <span className="text-yellow-300">  // Each receives pending state</span><br/>
                  {`  setCount(prev => prev + 1);  // 0 + 1 = 1\n`}
                  {`  setCount(prev => prev + 1);  // 1 + 1 = 2\n`}
                  {`  setCount(prev => prev + 1);  // 2 + 1 = 3\n`}
                  <span className="text-yellow-300">  // Result: count = 3 ✓</span><br/>
                  {`};`}
                </div>
              </div>
              
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h4 className="font-bold text-green-700 dark:text-green-300 mb-2">How It Works</h4>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Function receives pending state value
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Each update sees result of previous update
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    No stale closure problems
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Updates chain correctly
                  </li>
                </ul>
              </div>
              
              <button
                onClick={demonstrateFunctionalSolution}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium
                         transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
                         motion-safe:animate-[pulseFunctional_2s_ease-in-out_infinite]"
              >
                Demonstrate Solution
              </button>
            </div>
          </div>
        </div>

        {/* Current State & Interactive Demos */}
        <div 
          className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-purple-100 dark:border-purple-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.3s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.3s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">🎮</span>
            Interactive Demonstrations
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Current State Display */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Current State Values</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                    <div className="text-sm text-blue-700 dark:text-blue-300 mb-1">Counter</div>
                    <div className="text-4xl font-bold text-gray-800 dark:text-white">{counter}</div>
                    <div className="text-xs text-gray-500 mt-1">Functional updates demo</div>
                  </div>
                  
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                    <div className="text-sm text-purple-700 dark:text-purple-300 mb-2">Complex State</div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Value:</span>
                        <span className="font-bold">{complexState.value}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Multiplier:</span>
                        <span className="font-bold text-green-600 dark:text-green-400">{complexState.multiplier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Result:</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400">{complexState.result}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/30 rounded-lg">
                    <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">Queue Status</div>
                    <div className="flex justify-between items-center">
                      <span>Items in queue:</span>
                      <span className="font-bold">{queue.length}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span>Processing:</span>
                      <span className={`font-bold ${queueProcessing ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'}`}>
                        {queueProcessing ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-gray-800 dark:text-white mb-3">Quick Operations</h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={demonstrateBasicFunctional}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm
                             transition-all duration-300 hover:scale-[1.02]"
                  >
                    +1 (Functional)
                  </button>
                  <button
                    onClick={demonstrateToggle}
                    className="bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg text-sm
                             transition-all duration-300 hover:scale-[1.02]"
                  >
                    Toggle 0/100
                  </button>
                  <button
                    onClick={demonstrateFlip}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg text-sm
                             transition-all duration-300 hover:scale-[1.02]"
                  >
                    Flip Sign
                  </button>
                  <button
                    onClick={demonstrateConditionalUpdate}
                    className="bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg text-sm
                             transition-all duration-300 hover:scale-[1.02]"
                  >
                    Conditional
                  </button>
                </div>
              </div>
            </div>
            
            {/* Demonstration Buttons */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Run Demonstrations</h3>
              
              <div className="space-y-3">
                <button
                  onClick={demonstrateSequentialUpdates}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium
                           transition-all duration-300 hover:scale-[1.02]"
                >
                  Sequential Updates (+5, ×2, -3, ÷2)
                </button>
                
                <button
                  onClick={demonstrateMathOperations}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg font-medium
                           transition-all duration-300 hover:scale-[1.02]"
                >
                  Math Operations (Square, √, ×2)
                </button>
                
                <button
                  onClick={simulateAsyncOperation}
                  disabled={isProcessing}
                  className={clsx(
                    "w-full py-3 rounded-lg font-medium transition-all duration-300",
                    isProcessing
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-purple-500 hover:bg-purple-600 hover:scale-[1.02] text-white"
                  )}
                >
                  {isProcessing ? 'Processing...' : 'Simulate Async Operation (+10)'}
                </button>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={addToQueue}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg font-medium
                             transition-all duration-300 hover:scale-[1.02]"
                  >
                    Add to Queue
                  </button>
                  <button
                    onClick={processQueue}
                    disabled={queueProcessing || queue.length === 0}
                    className={clsx(
                      "py-2 rounded-lg font-medium transition-all duration-300",
                      queueProcessing || queue.length === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-pink-500 hover:bg-pink-600 hover:scale-[1.02] text-white"
                    )}
                  >
                    Process Queue
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={updateComplexState}
                    className="bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-medium
                             transition-all duration-300 hover:scale-[1.02]"
                  >
                    Update Complex State
                  </button>
                  <button
                    onClick={updateMultiplier}
                    className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium
                             transition-all duration-300 hover:scale-[1.02]"
                  >
                    Toggle Multiplier
                  </button>
                </div>
              </div>
              
              {/* Queue Display */}
              {queue.length > 0 && (
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Queue Items</h4>
                  <div className="flex flex-wrap gap-2">
                    {queue.map((item, index) => (
                      <div
                        key={item.id}
                        className={clsx(
                          "px-3 py-2 rounded-lg border transition-all duration-300",
                          index === 0 && queueProcessing
                            ? "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700 animate-[pulseQueue_1s_ease-in-out_infinite]"
                            : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
                        )}
                      >
                        <div className="text-xs text-gray-500">Item {item.id}</div>
                        <div className="font-bold">+{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Update History */}
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
              Update History
            </h2>
            <button
              onClick={() => setHistory([])}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 
                       text-gray-800 dark:text-white rounded-lg transition-all duration-300"
            >
              Clear History
            </button>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto p-2">
            {history.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <div className="text-4xl mb-4">📝</div>
                <p>Run demonstrations to see functional updates in action</p>
                <p className="text-sm mt-2">Each update shows previous value → new value</p>
              </div>
            ) : (
              history.map(entry => (
                <div
                  key={entry.id}
                  className={clsx(
                    "history-entry p-4 rounded-lg border transition-all duration-300",
                    entry.type === 'functional' && "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
                    entry.type === 'step' && "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
                    entry.type === 'stale' && "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
                    entry.type === 'error' && "bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700",
                    entry.type === 'info' && "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700",
                    entry.type === 'async' && "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
                    entry.type === 'queue' && "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800",
                    entry.type === 'toggle' && "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800",
                    entry.type === 'conditional' && "bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800",
                    entry.type === 'complex' && "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
                    entry.type === 'math' && "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
                    entry.type === 'reset' && "bg-gray-100 dark:bg-gray-900 border-gray-300 dark:border-gray-700",
                    entry.type === 'warning' && "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700"
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 dark:text-white">{entry.operation}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {entry.prevValue} → {entry.newValue}
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xs text-gray-500 dark:text-gray-400">{entry.timestamp}</div>
                      <span className={clsx(
                        "text-xs font-medium px-2 py-1 rounded-full mt-1 inline-block",
                        entry.type === 'functional' && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
                        entry.type === 'step' && "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
                        entry.type === 'stale' && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
                        entry.type === 'error' && "bg-red-200 text-red-900 dark:bg-red-900/40 dark:text-red-300",
                        entry.type === 'info' && "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
                        entry.type === 'async' && "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
                        entry.type === 'queue' && "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
                        entry.type === 'toggle' && "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
                        entry.type === 'conditional' && "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
                        entry.type === 'complex' && "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
                        entry.type === 'math' && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
                        entry.type === 'reset' && "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-300",
                        entry.type === 'warning' && "bg-yellow-200 text-yellow-900 dark:bg-yellow-900/40 dark:text-yellow-300"
                      )}>
                        {entry.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Common Use Cases */}
        <div 
          className="bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-teal-100 dark:border-teal-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.5s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.5s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">🎯</span>
            Common Use Cases & Patterns
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">1. Counters & Incrementors</h3>
              <div className="font-mono text-xs bg-gray-900 text-green-300 p-3 rounded">
                {`// Multiple increments\nsetCount(prev => prev + 1);\nsetCount(prev => prev + 1);\nsetCount(prev => prev + 1);`}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Each gets the updated value from previous
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">2. Toggles & Switches</h3>
              <div className="font-mono text-xs bg-gray-900 text-green-300 p-3 rounded">
                {`// Toggle boolean\nsetEnabled(prev => !prev);\n\n`}
                {`// Cycle through options\nsetMode(prev => \n  prev === 'light' ? 'dark' : 'light'\n);`}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Always works with current state
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">3. Async Operations</h3>
              <div className="font-mono text-xs bg-gray-900 text-green-300 p-3 rounded">
                {`// In setTimeout\nsetTimeout(() => {\n  setCount(prev => prev + 1);\n}, 1000);\n\n`}
                {`// In promise\nfetchData().then(() => {\n  setLoading(prev => !prev);\n});`}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Avoids stale closures
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">4. Complex Calculations</h3>
              <div className="font-mono text-xs bg-gray-900 text-green-300 p-3 rounded">
                {`// Chain calculations\nsetValue(prev => prev * 2);\nsetValue(prev => prev + 10);\nsetValue(prev => prev / 3);`}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Sequential transformations
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">5. Conditional Updates</h3>
              <div className="font-mono text-xs bg-gray-900 text-green-300 p-3 rounded">
                {`// Based on current state\nsetScore(prev => {\n  if (prev > 90) return 100;\n  return prev + 10;\n});`}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Decisions based on current value
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3">6. Batch Processing</h3>
              <div className="font-mono text-xs bg-gray-900 text-green-300 p-3 rounded">
                {`// Process queue items\nitems.forEach(item => {\n  setResult(prev => \n    processItem(prev, item)\n  );\n});`}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Sequential processing of items
              </p>
            </div>
          </div>
        </div>

        {/* Syntax Variations */}
        <div 
          className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-indigo-100 dark:border-indigo-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.6s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.6s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">📝</span>
            Syntax Variations
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Explicit Return</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Multi-line function</div>
                  <div className="font-mono text-green-300 text-sm">
                    {`setCounter(prevCounter => {\n`}
                    {`  const newValue = prevCounter + 1;\n`}
                    {`  // Additional logic here\n`}
                    {`  console.log('Updating:', newValue);\n`}
                    {`  return newValue;\n`}
                    {`});`}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Use when you need multiple statements
                  </p>
                </div>
                
                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">With conditionals</div>
                  <div className="font-mono text-green-300 text-sm">
                    {`setValue(prev => {\n`}
                    {`  if (prev > 100) {\n`}
                    {`    return 100;\n`}
                    {`  }\n`}
                    {`  return prev + 10;\n`}
                    {`});`}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Implicit Return</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Arrow function (concise)</div>
                  <div className="font-mono text-green-300 text-sm">
                    {`// Single expression\nsetCounter(prev => prev + 1);\n\n`}
                    {`// With parentheses\nsetCounter(prev => (prev + 1));\n\n`}
                    {`// Object return (needs parentheses)\nsetUser(prev => ({\n  ...prev,\n  active: !prev.active\n}));`}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Clean syntax for simple updates
                  </p>
                </div>
                
                <div className="p-4 bg-gray-900 rounded-lg">
                  <div className="text-sm text-gray-400 mb-2">Naming Convention</div>
                  <div className="font-mono text-green-300 text-sm">
                    {`// Common patterns:\nsetCount(prev => prev + 1);\nsetCount(previous => previous + 1);\nsetCount(oldValue => oldValue + 1);\nsetCount(current => current + 1);\n\n`}
                    {`// For objects:\nsetUser(prevUser => ({ ... }));\nsetState(prevState => ({ ... }));`}
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    Use descriptive parameter names
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div 
          className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-red-100 dark:border-red-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.7s_both]"
          style={{ animation: 'fadeSlideUp 0.8s ease-out 0.7s both' }}
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
            <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white 
                           rounded-lg p-2 mr-3 text-xl">⚠️</span>
            Common Mistakes & Pitfalls
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">Forgetting Return</h3>
                <div className="font-mono text-xs bg-gray-900 text-red-300 p-2 rounded">
                  {`// WRONG: No return statement\nsetCounter(prev => {\n`}
                  {`  prev + 1; // No return!\n`}
                  {`});\n`}
                  <span className="text-yellow-300">// Result: undefined, counter becomes NaN</span>
                </div>
                <div className="font-mono text-xs bg-gray-900 text-green-300 p-2 rounded mt-2">
                  {`// CORRECT\nsetCounter(prev => {\n`}
                  {`  return prev + 1;\n`}
                  {`});`}
                </div>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                <h3 className="font-bold text-red-700 dark:text-red-300 mb-2">Mutating State in Function</h3>
                <div className="font-mono text-xs bg-gray-900 text-red-300 p-2 rounded">
                  {`// WRONG: Mutating parameter\nsetUser(prev => {\n`}
                  {`  prev.name = 'Swadeep'; // Mutation!\n`}
                  {`  return prev; // Returns same object\n`}
                  {`});\n`}
                  <span className="text-yellow-300">// React won't detect change</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-bold text-yellow-700 dark:text-yellow-300 mb-2">Overusing Functional Updates</h3>
                <div className="font-mono text-xs bg-gray-900 text-yellow-300 p-2 rounded">
                  {`// Unnecessary functional update\nsetName(prev => 'Swadeep');\n\n`}
                  {`// Simpler direct update\nsetName('Swadeep'); // Better`}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Use direct updates for simple value assignments
                </p>
              </div>
              
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Performance Considerations</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Functional updates are optimized by React, but creating many functions 
                  in a loop can impact performance. For bulk updates, consider alternative 
                  patterns or useReducer.
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
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Use for Sequences</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                When updates depend on previous state
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">2.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Keep Functions Pure</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Don't mutate the parameter
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">3.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Descriptive Names</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Use <code>prev</code>, <code>previous</code>, etc.
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
              <div className="text-3xl mb-2">4.</div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Know When Not To</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Direct updates for simple assignments
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Functional Updates Checklist</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Using functional update for sequential operations
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Not mutating the parameter object
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Always returning a value from the function
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Using descriptive parameter name (prev, previous)
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Considering direct updates for simple assignments
              </li>
              <li className="flex items-center">
                <input type="checkbox" checked className="mr-2" />
                Testing with async scenarios (setTimeout, promises)
              </li>
            </ul>
          </div>
        </div>

        {/* Teacher's Note */}
        <div 
          className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 
                     rounded-2xl shadow-lg p-6 md:p-8 border border-yellow-200 dark:border-yellow-900
                     hover:shadow-xl transition-all duration-300 animate-[fadeSlideUp_0.8s_ease-out_0.9s_both]
                     motion-safe:animate-[pulseFunctional_3s_ease-in-out_infinite]"
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
                  <strong>Think of functional updates as a conversation:</strong> When Swadeep from Barrackpore 
                  asks for updates on his project, he doesn't ask once and assume nothing changed. He asks 
                  repeatedly, each time getting the latest status. Functional updates work the same way - 
                  each update asks "what's the current value?" and works with that.
                </p>
                
                <div className="p-4 bg-white dark:bg-gray-800/50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-2">Pro Tips:</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Default to functional:</strong> When in doubt, use functional updates
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Test with async:</strong> Always test updates in setTimeout scenarios
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Keep it simple:</strong> Use concise syntax for simple operations
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <strong>Watch for mutations:</strong> Even in functional updates, don't mutate!
                    </li>
                  </ul>
                </div>
                
                <p className="text-sm italic text-gray-600 dark:text-gray-400">
                  "When Tuhina from Shyamnagar tracks student attendance, she doesn't just mark one student 
                  and assume the count is correct. She updates the total after each mark. Functional updates 
                  ensure your state is always accurate, no matter how many changes happen."
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
                Why does React provide functional updates as an option? 
                What problems would developers face if only direct updates were available?
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Observe carefully...</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Run the queue processing demo and watch the history. Notice how each queue item 
                processes sequentially. What would happen if we used direct updates instead?
              </p>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Try implementing...</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Create a timer that increments every second, but pauses at 60 and resets. 
                Use functional updates to ensure it works correctly even if buttons are clicked rapidly.
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
          Next: Learn about Updating Object State Using Spread Operator
        </p>
      </div>
    </div>
  );
};

export default Topic11;