import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

const Topic30 = () => {
  // Example states to demonstrate side effects
  const [timer, setTimer] = useState(0);
  const [subscriptionCount, setSubscriptionCount] = useState(0);
  const [userAction, setUserAction] = useState(null);
  const [domMutation, setDomMutation] = useState(false);
  const [externalApiCall, setExternalApiCall] = useState(null);
  const [logEntries, setLogEntries] = useState([]);
  const [pureResult, setPureResult] = useState(0);
  const [impureResult, setImpureResult] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  
  // Refs for DOM manipulation
  const titleRef = useRef(null);
  const externalDivRef = useRef(null);
  
  // Log function to track side effects
  const logSideEffect = (type, description) => {
    setLogEntries(prev => [
      ...prev,
      {
        id: Date.now(),
        type,
        description,
        timestamp: new Date().toLocaleTimeString()
      }
    ].slice(-10)); // Keep only last 10 entries
  };

  // Example 1: Timer (Side Effect)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
      logSideEffect('timer', 'Timer tick - interval running');
    }, 1000);
    
    return () => {
      clearInterval(interval);
      logSideEffect('cleanup', 'Timer interval cleared');
    };
  }, []);

  // Example 2: Window event listener
  useEffect(() => {
    const handleKeyPress = (e) => {
      setUserAction(`Key pressed: ${e.key}`);
      logSideEffect('event', `Keyboard event: ${e.key}`);
    };
    
    const handleClick = () => {
      setUserAction('Window clicked');
      logSideEffect('event', 'Window click event');
    };
    
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('click', handleClick);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('click', handleClick);
      logSideEffect('cleanup', 'Event listeners removed');
    };
  }, []);

  // Example 3: DOM Manipulation (Direct - Impure)
  const manipulateDomDirectly = () => {
    // This is a side effect - directly manipulating DOM
    if (titleRef.current) {
      titleRef.current.style.color = '#ef4444';
      titleRef.current.textContent = 'DOM Manipulated Directly!';
    }
    setDomMutation(true);
    logSideEffect('dom', 'Direct DOM manipulation (impure)');
  };

  // Example 4: DOM Manipulation (React way - Pure)
  const manipulateDomReactWay = () => {
    // This is pure - we update state, React updates DOM
    setDomMutation(false);
    if (titleRef.current) {
      titleRef.current.style.color = '#10b981';
      titleRef.current.textContent = 'Understanding Side Effects in React';
    }
    logSideEffect('react', 'DOM updated via React state (pure)');
  };

  // Example 5: External API Simulation
  const callExternalApi = () => {
    // Simulating API call
    logSideEffect('api', 'Starting external API call...');
    
    setTimeout(() => {
      const mockData = {
        status: 'success',
        data: `Response from server at ${new Date().toLocaleTimeString()}`
      };
      setExternalApiCall(mockData);
      logSideEffect('api', 'API call completed successfully');
    }, 1500);
  };

  // Example 6: LocalStorage (Side Effect)
  useEffect(() => {
    const saved = localStorage.getItem('react-side-effect-demo');
    if (saved) {
      setSubscriptionCount(parseInt(saved));
      logSideEffect('storage', 'Loaded from localStorage');
    }
  }, []);

  const updateLocalStorage = () => {
    const newCount = subscriptionCount + 1;
    setSubscriptionCount(newCount);
    localStorage.setItem('react-side-effect-demo', newCount.toString());
    logSideEffect('storage', 'Saved to localStorage');
  };

  // Example 7: Pure vs Impure functions demonstration
  const pureFunction = (a, b) => {
    // Pure function - same input always gives same output
    logSideEffect('pure', `Pure function called with ${a}, ${b}`);
    return a + b;
  };

  const impureFunction = () => {
    // Impure function - depends on external state (timer)
    logSideEffect('impure', `Impure function called, depends on timer: ${timer}`);
    return timer + Math.random();
  };

  // Example 8: Date/Time dependency (Impure)
  const updateTime = () => {
    const now = new Date().toLocaleTimeString();
    setCurrentTime(now);
    logSideEffect('time', `Time updated: ${now}`);
  };

  // Example 9: Direct external library integration (hypothetical)
  const integrateExternalLibrary = () => {
    if (externalDivRef.current) {
      // Simulating jQuery-like manipulation (impure side effect)
      externalDivRef.current.innerHTML = `
        <div class="p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
          <h4 class="font-bold text-yellow-800 dark:text-yellow-300">External Library Output</h4>
          <p class="text-sm text-yellow-700 dark:text-yellow-400">This content was injected directly by external code</p>
          <p class="text-xs text-yellow-600 dark:text-yellow-500 mt-2">Timestamp: ${new Date().toLocaleTimeString()}</p>
        </div>
      `;
      logSideEffect('external', 'External library integration (direct DOM manipulation)');
    }
  };

  // Run pure and impure functions
  const runFunctionComparison = () => {
    const pureResultValue = pureFunction(5, 10);
    setPureResult(pureResultValue);
    
    const impureResultValue = impureFunction();
    setImpureResult(impureResultValue);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 animate-[fadeInUp_0.8s_ease-out]">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
            <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
              Topic 26/46
            </span>
          </div>
          
          <h1 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-500"
          >
            Understanding Side Effects in React
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Discover what makes your React components "impure", learn to identify side effects in the wild, 
            and master the art of controlling them—from API calls to DOM manipulations.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Theory & Explanation */}
          <div className="space-y-8">
            {/* What Are Side Effects? */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_0.9s_ease-out]">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
                  <span className="text-xl">⚠️</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  What Are Side Effects?
                </h2>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  A <strong>side effect</strong> is any operation that interacts with the world outside of your function. 
                  In React, this means anything that reaches beyond the component's render logic.
                </p>
                
                <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 p-5 rounded-xl my-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">🎯 Core Definition</h4>
                  <blockquote className="border-l-4 border-red-500 dark:border-red-400 pl-4 py-2 italic text-gray-700 dark:text-gray-300">
                    "A side effect is when a function does something beyond returning a value—it changes something outside itself."
                  </blockquote>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center mr-3">
                        <span className="text-sm">✓</span>
                      </div>
                      <h5 className="font-bold text-gray-900 dark:text-white">Pure Function</h5>
                    </div>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Same input → Same output</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>No external dependencies</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span>Predictable</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-700">
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center mr-3">
                        <span className="text-sm">⚡</span>
                      </div>
                      <h5 className="font-bold text-gray-900 dark:text-white">Side Effect</h5>
                    </div>
                    <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <span>Changes external state</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <span>Depends on external factors</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <span>Unpredictable timing</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Real-World Analogy</h4>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <p className="text-gray-700 dark:text-gray-300">
                      <strong>Pure Function:</strong> Like Swadeep calculating marks - same inputs (answers) always produce same output (score).
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mt-2">
                      <strong>Side Effect:</strong> Like Tuhina updating the class notice board - she's changing something outside her notebook.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Side Effects Taxonomy */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.0s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                  <span className="text-lg">📊</span>
                </span>
                Side Effects Taxonomy
              </h3>
              
              {/* Interactive Side Effects Map */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-xl"></div>
                
                <div className="relative p-6">
                  <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        <span className="text-white text-2xl">⚛️</span>
                      </div>
                    </div>
                    <h4 className="mt-4 font-bold text-gray-900 dark:text-white">React Component</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pure render logic</p>
                  </div>
                  
                  {/* Side Effects Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { icon: '🌐', label: 'API Calls', color: 'bg-purple-100 dark:bg-purple-900/30', border: 'border-purple-300 dark:border-purple-700' },
                      { icon: '💾', label: 'LocalStorage', color: 'bg-green-100 dark:bg-green-900/30', border: 'border-green-300 dark:border-green-700' },
                      { icon: '⌚', label: 'Timers', color: 'bg-yellow-100 dark:bg-yellow-900/30', border: 'border-yellow-300 dark:border-yellow-700' },
                      { icon: '🔔', label: 'Event Listeners', color: 'bg-red-100 dark:bg-red-900/30', border: 'border-red-300 dark:border-red-700' },
                      { icon: '📝', label: 'DOM Manipulation', color: 'bg-pink-100 dark:bg-pink-900/30', border: 'border-pink-300 dark:border-pink-700' },
                      { icon: '🔗', label: 'WebSockets', color: 'bg-indigo-100 dark:bg-indigo-900/30', border: 'border-indigo-300 dark:border-indigo-700' },
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className={clsx(
                          "p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 cursor-default",
                          item.color,
                          item.border
                        )}
                      >
                        <div className="text-2xl mb-2">{item.icon}</div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{item.label}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Side Effect</div>
                      </div>
                    ))}
                  </div>
                  
                  {/* SVG Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                      </marker>
                    </defs>
                    {/* Lines from center to each box */}
                    <line x1="50%" y1="100" x2="25%" y2="200" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
                    <line x1="50%" y1="100" x2="50%" y2="200" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
                    <line x1="50%" y1="100" x2="75%" y2="200" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
                    <line x1="50%" y1="100" x2="25%" y2="300" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
                    <line x1="50%" y1="100" x2="50%" y2="300" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
                    <line x1="50%" y1="100" x2="75%" y2="300" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow)" />
                  </svg>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Insight</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  React components should be <strong>pure during rendering</strong>. All side effects must be 
                  pushed into <code className="px-1 bg-gray-200 dark:bg-gray-700 rounded">useEffect</code> 
                  hooks or event handlers.
                </p>
              </div>
            </section>

            {/* Common Misconceptions */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.1s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mr-3">
                  <span className="text-lg">❓</span>
                </span>
                Common Misconceptions
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    myth: "Side effects are bad and should be avoided",
                    truth: "Side effects are necessary—they're how your app interacts with the world. The goal is to manage them properly."
                  },
                  {
                    myth: "Only API calls are side effects",
                    truth: "Setting timers, modifying DOM, logging, localStorage—all are side effects."
                  },
                  {
                    myth: "Pure functions have no side effects by definition",
                    truth: "Correct! Pure functions only compute and return values without changing anything outside."
                  },
                  {
                    myth: "Side effects only happen in useEffect",
                    truth: "Event handlers (onClick, onChange) also contain side effects. useEffect is for synchronization."
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3 mt-1">
                        <span className="text-red-600 dark:text-red-400 text-sm">✗</span>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 dark:text-white mb-1">Myth: {item.myth}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="text-green-600 dark:text-green-400 font-medium">Truth:</span> {item.truth}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">Remember from Ichapur Classroom</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  When Abhronila asked "Is console.log() a side effect?"—Yes! It reaches outside React to the browser's console. 
                  That's why debugging logs should be removed in production.
                </p>
              </div>
            </section>
          </div>

          {/* Right Column - Interactive Examples */}
          <div className="space-y-8">
            {/* Live Side Effects Dashboard */}
            <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.0s_ease-out]">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Live Side Effects Dashboard
              </h3>
              
              {/* Timer Side Effect */}
              <div className="mb-8 p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">⌚ Timer Side Effect</h4>
                  <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                    setInterval
                  </span>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                  <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2 font-mono">
                    {timer}s
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Automatically updates every second (side effect)
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    The Side Effect:
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <code>setInterval</code> reaches outside React to the browser's timer system. 
                    This is a side effect because it changes over time independently of React's render cycle.
                  </p>
                </div>
              </div>
              
              {/* Event Listener Side Effect */}
              <div className="mb-8 p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">🔔 Event Listener Side Effect</h4>
                  <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">
                    window.addEventListener
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Try These Actions:
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center">
                          <div className="text-2xl mb-2">⌨️</div>
                          <div className="text-sm font-medium">Press any key</div>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center">
                          <div className="text-2xl mb-2">🖱️</div>
                          <div className="text-sm font-medium">Click anywhere</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {userAction && (
                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-700">
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Latest Action:</div>
                      <div className="font-semibold text-green-600 dark:text-green-400">{userAction}</div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    The Side Effect:
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Event listeners attach to the global <code>window</code> object outside React. 
                    They listen for browser events and trigger React state updates.
                  </p>
                </div>
              </div>
              
              {/* Pure vs Impure Function Demo */}
              <div className="p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-gray-900 dark:text-white">⚖️ Pure vs Impure Functions</h4>
                  <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded">
                    Functional Purity
                  </span>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                      <h5 className="font-bold text-gray-900 dark:text-white mb-2">Pure Function</h5>
                      <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400">{pureResult}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">5 + 10 = {pureResult}</div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
                        Same input (5, 10) always produces same output (15)
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl">
                      <h5 className="font-bold text-gray-900 dark:text-white mb-2">Impure Function</h5>
                      <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="text-3xl font-bold text-red-600 dark:text-red-400">{impureResult.toFixed(2)}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">timer + random</div>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-3">
                        Depends on external timer and random value
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={runFunctionComparison}
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95"
                  >
                    Run Function Comparison
                  </button>
                  
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                      Key Difference:
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Pure functions are predictable and testable. Impure functions are unpredictable 
                      but necessary for interacting with the real world.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Side Effects Playground */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.1s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Side Effects Playground
              </h3>
              
              <div className="space-y-6">
                {/* DOM Manipulation */}
                <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">📝 DOM Manipulation</h4>
                  <div className="space-y-3">
                    <div className="flex space-x-3">
                      <button
                        onClick={manipulateDomDirectly}
                        className="flex-1 py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors duration-300"
                      >
                        Direct DOM Manipulation (Impure)
                      </button>
                      <button
                        onClick={manipulateDomReactWay}
                        className="flex-1 py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-300"
                      >
                        React State Update (Pure)
                      </button>
                    </div>
                    
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Impure:</strong> Directly modifies DOM, bypassing React<br />
                        <strong>Pure:</strong> Updates state, React updates DOM
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* External API Call */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">🌐 External API Call</h4>
                  <div className="space-y-3">
                    <button
                      onClick={callExternalApi}
                      className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-300"
                    >
                      Simulate API Call
                    </button>
                    
                    {externalApiCall && (
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-700">
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">API Response:</div>
                        <div className="font-semibold text-blue-600 dark:text-blue-400">{externalApiCall.data}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          Status: <span className="text-green-600 dark:text-green-400">{externalApiCall.status}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        API calls are side effects because they reach outside your app to external servers.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* LocalStorage */}
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">💾 Browser Storage</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400">{subscriptionCount}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Saved in localStorage</div>
                      </div>
                      <button
                        onClick={updateLocalStorage}
                        className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-300"
                      >
                        Increment & Save
                      </button>
                    </div>
                    
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        localStorage is a side effect—it persists data outside React's memory to browser storage.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* External Library Integration */}
                <div 
                  ref={externalDivRef}
                  className="p-4 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl"
                >
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">🔗 External Library</h4>
                  <div className="space-y-3">
                    <button
                      onClick={integrateExternalLibrary}
                      className="w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors duration-300"
                    >
                      Simulate jQuery Integration
                    </button>
                    
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Integrating with jQuery or other libraries often involves direct DOM manipulation, 
                        which is a side effect.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Side Effects Log */}
        <section className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.2s_ease-out]">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900/30 flex items-center justify-center mr-3">
              <span className="text-lg">📋</span>
            </span>
            Side Effects Activity Log
          </h3>
          
          <div className="h-64 overflow-y-auto bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
            {logEntries.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                No side effects logged yet. Interact with the examples above.
              </div>
            ) : (
              <div className="space-y-3">
                {[...logEntries].reverse().map((log) => (
                  <div 
                    key={log.id}
                    className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={clsx(
                          "px-2 py-1 rounded text-xs font-semibold mr-3",
                          log.type === 'timer' && "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
                          log.type === 'event' && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
                          log.type === 'dom' && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
                          log.type === 'api' && "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
                          log.type === 'storage' && "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
                          log.type === 'cleanup' && "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300"
                        )}>
                          {log.type.toUpperCase()}
                        </span>
                        <span className="text-sm text-gray-700 dark:text-gray-300">{log.description}</span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{log.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div>
              Total side effects logged: <span className="font-semibold">{logEntries.length}</span>
            </div>
            <button
              onClick={() => setLogEntries([])}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors duration-300"
            >
              Clear Log
            </button>
          </div>
        </section>

        {/* Teacher's Note Section */}
        <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 shadow-lg border-l-4 border-purple-500 dark:border-purple-400 animate-[fadeInUp_1.3s_ease-out]">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
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
                
                <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg mb-4 border border-purple-200 dark:border-purple-700">
                  <h4 className="font-semibold text-purple-700 dark:text-purple-400 mb-2">
                    The Golden Rule of Side Effects:
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>"Render should be pure, effects should be predictable."</strong>
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    When Swadeep submits his assignment, the form submission (side effect) happens 
                    <em> after</em> validation (pure calculation), not during it.
                  </p>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  After 27 years of debugging applications, I can tell you that 80% of bugs come from 
                  unmanaged side effects. The student from Ichapur who kept getting inconsistent timer 
                  values? That was a side effect timing issue.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  <strong>Professional Insight:</strong> In enterprise applications, we categorize side effects:
                </p>
                
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span><strong>Essential:</strong> API calls, authentication</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span><strong>Observational:</strong> Analytics, logging</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span><strong>Synchronization:</strong> WebSockets, real-time updates</span>
                  </li>
                </ul>
                
                <div className="mt-4 pt-4 border-t border-purple-200 dark:border-purple-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Sukanta Hui</strong> · 27 years experience · 
                    <a href="mailto:sukantahui@codernaccotax.co.in" className="text-purple-600 dark:text-purple-400 hover:underline ml-1">
                      sukantahui@codernaccotax.co.in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hint Section */}
        <div className="mt-8 p-6 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl border border-cyan-200 dark:border-cyan-700 animate-[fadeInUp_1.4s_ease-out]">
          <h4 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center">
            <span className="w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mr-3">
              <span className="text-cyan-600 dark:text-cyan-400">💭</span>
            </span>
            Critical Thinking Exercise
          </h4>
          
          <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Scenario Analysis</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Debangshu is building a weather app for Barrackpore. Which of these are side effects?
              </p>
              
              <div className="space-y-3">
                {[
                  "Fetching weather data from API",
                  "Calculating temperature in Celsius from Kelvin",
                  "Saving user's location preference to browser storage",
                  "Rendering temperature on screen",
                  "Updating document title with current temperature",
                  "Formatting date string for display"
                ].map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center mr-3 cursor-pointer hover:border-cyan-500 transition-colors">
                      <div className="w-3 h-3 rounded-full bg-cyan-500 opacity-0"></div>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Observe carefully:</strong> Look at the activity log above. Notice how many different 
                types of side effects occur. Which ones require cleanup? Why?
              </p>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Try this:</strong> Open your browser's console (F12 → Console tab) and watch what happens 
              when you interact with the examples. You'll see React's warnings about side effects during render.
            </p>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-[fadeInUp_1.5s_ease-out]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <span className="text-green-600 dark:text-green-400">✓</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Pure Functions</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Same input → Same output</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>No external dependencies</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Predictable & testable</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Ideal for render logic</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4">
              <span className="text-red-600 dark:text-red-400">⚡</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Common Side Effects</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>API calls & data fetching</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Timers & intervals</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>DOM manipulation</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Browser storage</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <span className="text-blue-600 dark:text-blue-400">🎯</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Management Strategy</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Keep render pure</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Use useEffect for effects</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Always cleanup</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Test side effects</span>
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

export default Topic30;