import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

const Topic1 = () => {
  // State for dark mode
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // State for interactive hook examples
  const [counter, setCounter] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isOnline, setIsOnline] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [renderCount, setRenderCount] = useState(0);
  const [selectedHook, setSelectedHook] = useState('useState');
  
  // Refs for direct DOM manipulation
  const inputRef = useRef(null);
  const previousValueRef = useRef('');
  
  // Track render count
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  });
  
  // Track mouse position (demonstrates useEffect)
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Track window size (demonstrates useEffect with cleanup)
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ 
        width: window.innerWidth, 
        height: window.innerHeight 
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Simulate network status (demonstrates multiple effects)
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly toggle online status for demo
      setIsOnline(Math.random() > 0.3);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Focus input on mount (demonstrates useRef)
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Track previous value (demonstrates useRef for persistence)
  useEffect(() => {
    previousValueRef.current = userInput;
  }, [userInput]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form submitted with: ${userInput}`);
    setUserInput('');
  };

  // Hook descriptions data
  const hooksData = [
    {
      id: 'useState',
      name: 'useState',
      description: 'Adds state to functional components',
      example: 'const [count, setCount] = useState(0)',
      icon: '📊',
      color: 'blue'
    },
    {
      id: 'useEffect',
      name: 'useEffect',
      description: 'Handles side effects in components',
      example: 'useEffect(() => { /* effect */ }, [])',
      icon: '🔄',
      color: 'green'
    },
    {
      id: 'useRef',
      name: 'useRef',
      description: 'Persists values across renders without re-renders',
      example: 'const ref = useRef(initialValue)',
      icon: '🎯',
      color: 'purple'
    },
    {
      id: 'useContext',
      name: 'useContext',
      description: 'Accesses React context without prop drilling',
      example: 'const value = useContext(MyContext)',
      icon: '📡',
      color: 'orange'
    },
    {
      id: 'useReducer',
      name: 'useReducer',
      description: 'Manages complex state logic with reducers',
      example: 'const [state, dispatch] = useReducer(reducer, initialState)',
      icon: '⚙️',
      color: 'red'
    }
  ];

  return (
    <div className={clsx(
      "min-h-screen transition-colors duration-500",
      isDarkMode 
        ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100" 
        : "bg-gradient-to-br from-blue-50 to-gray-100 text-gray-900"
    )}>
      {/* Header */}
      <header className={clsx(
        "sticky top-0 z-50 border-b transition-all duration-500",
        isDarkMode 
          ? "bg-gray-800/80 backdrop-blur-md border-gray-700" 
          : "bg-white/80 backdrop-blur-md border-gray-200"
      )}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-teal-300 bg-clip-text text-transparent animate-[pulse_3s_ease-in-out_infinite]">
                React Hooks: The Modern Way
              </h1>
              <p className={clsx(
                "mt-1 text-sm transition-all duration-500",
                isDarkMode ? "text-gray-400" : "text-gray-600"
              )}>
                Topic 1: What are Hooks in React?
              </p>
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={clsx(
                "px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105",
                isDarkMode 
                  ? "bg-gray-700 hover:bg-gray-600 text-gray-200 shadow-lg hover:shadow-xl" 
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-md hover:shadow-lg"
              )}
            >
              {isDarkMode ? '🌙 Dark' : '☀️ Light'}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out]">
          <div className={clsx(
            "rounded-2xl p-8 mb-8 transition-all duration-500",
            isDarkMode 
              ? "bg-gradient-to-r from-gray-800 to-gray-700 shadow-2xl" 
              : "bg-gradient-to-r from-white to-green-50 shadow-xl"
          )}>
            <h2 className="text-4xl font-bold mb-4 animate-[slideUp_1s_ease-out]">
              What are Hooks in React? 🪝
            </h2>
            <p className={clsx(
              "text-lg mb-6 leading-relaxed transition-colors duration-500",
              isDarkMode ? "text-gray-300" : "text-gray-700"
            )}>
              Hooks are <span className="font-bold text-green-400">special functions</span> that let you "hook into" React features like state and lifecycle from functional components. They were introduced in React 16.8 to solve problems with class components.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {/* Before Hooks Card */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-500 hover:scale-[1.02]",
                "transform-gpu border-l-4 border-red-500 animate-[slideUp_1.2s_ease-out]",
                isDarkMode 
                  ? "bg-gray-800/50 hover:bg-gray-800/80" 
                  : "bg-white hover:bg-red-50"
              )}>
                <div className="text-4xl mb-4">🏛️</div>
                <h3 className="text-xl font-bold mb-3">Life Before Hooks</h3>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Complex class components with <code className="px-1 rounded bg-gray-800 text-red-300">this</code>, lifecycle methods, and wrapper hell.
                </p>
              </div>

              {/* Hook Solution Card */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-500 hover:scale-[1.02]",
                "transform-gpu border-l-4 border-green-500 animate-[slideUp_1.4s_ease-out]",
                isDarkMode 
                  ? "bg-gray-800/50 hover:bg-gray-800/80" 
                  : "bg-white hover:bg-green-50"
              )}>
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-bold mb-3">Hooks Solution</h3>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Reuse stateful logic without changing component hierarchy. Clean, readable functional components.
                </p>
              </div>

              {/* Rules Card */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-500 hover:scale-[1.02]",
                "transform-gpu border-l-4 border-yellow-500 animate-[slideUp_1.6s_ease-out]",
                isDarkMode 
                  ? "bg-gray-800/50 hover:bg-gray-800/80" 
                  : "bg-white hover:bg-yellow-50"
              )}>
                <div className="text-4xl mb-4">📜</div>
                <h3 className="text-xl font-bold mb-3">Rules of Hooks</h3>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Only call Hooks at the top level and from React functions. Follow these strictly!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hook Comparison Timeline */}
        <section className="mb-16 animate-[slideUp_1s_ease-out]">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Evolution Timeline ⏳
          </h2>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className={clsx(
              "absolute left-1/2 transform -translate-x-1/2 h-full w-1",
              isDarkMode ? "bg-gradient-to-b from-gray-600 to-gray-700" : "bg-gradient-to-b from-gray-300 to-gray-400"
            )}></div>
            
            {/* Timeline Items */}
            <div className="space-y-16 relative">
              {/* Class Components Era */}
              <div className={clsx(
                "w-full md:w-5/12 ml-auto p-6 rounded-xl transition-all duration-500",
                "hover:scale-[1.02] transform-gpu",
                isDarkMode 
                  ? "bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600" 
                  : "bg-gradient-to-r from-red-50 to-white border border-red-200"
              )}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={clsx(
                    "p-3 rounded-full text-2xl",
                    isDarkMode ? "bg-red-700" : "bg-red-100"
                  )}>
                    🏛️
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-red-400">Class Components Era</h3>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}>
                      Before 2018
                    </p>
                  </div>
                </div>
                <ul className={clsx(
                  "space-y-2 ml-4 list-disc transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  <li>Complex <code className="px-1 rounded bg-gray-800 text-red-300">this</code> binding issues</li>
                  <li>Hard to reuse logic between components</li>
                  <li>"Wrapper hell" with HOCs and render props</li>
                  <li>Difficult for beginners to understand</li>
                </ul>
              </div>

              {/* Hooks Introduction */}
              <div className={clsx(
                "w-full md:w-5/12 p-6 rounded-xl transition-all duration-500",
                "hover:scale-[1.02] transform-gpu",
                isDarkMode 
                  ? "bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600" 
                  : "bg-gradient-to-r from-green-50 to-white border border-green-200"
              )}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={clsx(
                    "p-3 rounded-full text-2xl animate-[pulse_2s_ease-in-out_infinite]",
                    isDarkMode ? "bg-green-700" : "bg-green-100"
                  )}>
                    🎉
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-green-400">Hooks Revolution</h3>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}>
                      React 16.8 (February 2019)
                    </p>
                  </div>
                </div>
                <ul className={clsx(
                  "space-y-2 ml-4 list-disc transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  <li>Use state and lifecycle in functional components</li>
                  <li>Extract and reuse stateful logic easily</li>
                  <li>No more complex class hierarchies</li>
                  <li>Cleaner, more readable code</li>
                </ul>
              </div>

              {/* Modern Era */}
              <div className={clsx(
                "w-full md:w-5/12 ml-auto p-6 rounded-xl transition-all duration-500",
                "hover:scale-[1.02] transform-gpu",
                isDarkMode 
                  ? "bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600" 
                  : "bg-gradient-to-r from-blue-50 to-white border border-blue-200"
              )}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={clsx(
                    "p-3 rounded-full text-2xl",
                    isDarkMode ? "bg-blue-700" : "bg-blue-100"
                  )}>
                    🚀
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-blue-400">Modern React</h3>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    )}>
                      Today
                    </p>
                  </div>
                </div>
                <ul className={clsx(
                  "space-y-2 ml-4 list-disc transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  <li>Functional components are standard</li>
                  <li>Custom hooks for reusable logic</li>
                  <li>Better performance optimization</li>
                  <li>Easier testing and maintenance</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Core Hooks Showcase */}
        <section className="mb-16 animate-[slideUp_1.2s_ease-out]">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Core Hooks Showcase 🛠️
          </h2>
          
          <div className={clsx(
            "rounded-2xl p-8 mb-8 transition-all duration-500",
            isDarkMode 
              ? "bg-gradient-to-br from-gray-800 to-gray-700" 
              : "bg-gradient-to-br from-white to-green-50"
          )}>
            {/* Hook Selection */}
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              {hooksData.map((hook) => (
                <button
                  key={hook.id}
                  onClick={() => setSelectedHook(hook.id)}
                  className={clsx(
                    "px-4 py-2 rounded-lg font-medium transition-all duration-300",
                    "transform hover:scale-105",
                    selectedHook === hook.id
                      ? isDarkMode 
                        ? `bg-${hook.color}-600 text-white` 
                        : `bg-${hook.color}-500 text-white`
                      : isDarkMode 
                        ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                        : "bg-gray-200 hover:bg-gray-300 text-gray-700"
                  )}
                >
                  {hook.icon} {hook.name}
                </button>
              ))}
            </div>
            
            {/* Hook Details */}
            <div className={clsx(
              "rounded-xl p-6 transition-all duration-500",
              isDarkMode ? "bg-gray-800/50" : "bg-white"
            )}>
              {hooksData.map((hook) => (
                selectedHook === hook.id && (
                  <div key={hook.id} className="animate-[slideUp_0.5s_ease-out]">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={clsx(
                        "p-4 rounded-full text-3xl",
                        isDarkMode ? `bg-${hook.color}-700` : `bg-${hook.color}-100`
                      )}>
                        {hook.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">
                          <span className={clsx(
                            "transition-colors duration-500",
                            isDarkMode ? `text-${hook.color}-300` : `text-${hook.color}-600`
                          )}>
                            {hook.name}
                          </span>
                        </h3>
                        <p className={clsx(
                          "transition-colors duration-500",
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        )}>
                          {hook.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className={clsx(
                      "p-4 rounded-lg mb-6 font-mono",
                      isDarkMode ? "bg-gray-900" : "bg-gray-100"
                    )}>
                      <code className={clsx(
                        "transition-colors duration-500",
                        isDarkMode ? `text-${hook.color}-300` : `text-${hook.color}-600`
                      )}>
                        {`{hook.example}`}
                      </code>
                    </div>
                    
                    <div className={clsx(
                      "p-4 rounded-lg",
                      isDarkMode ? "bg-gray-900/30" : "bg-gray-100/50"
                    )}>
                      <h4 className="font-bold mb-2">Real-world Usage:</h4>
                      <p className={clsx(
                        "transition-colors duration-500",
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      )}>
                        {hook.id === 'useState' && "Managing form inputs, toggle states, counters"}
                        {hook.id === 'useEffect' && "API calls, event listeners, subscriptions"}
                        {hook.id === 'useRef' && "Accessing DOM elements, storing previous values"}
                        {hook.id === 'useContext' && "Theme switching, user authentication"}
                        {hook.id === 'useReducer' && "Complex form states, shopping carts"}
                      </p>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Examples Section */}
        <section className="mb-16 animate-[slideUp_1.4s_ease-out]">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Interactive Hook Demos 🎮
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* useState & useEffect Demo */}
            <div className={clsx(
              "rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl",
              isDarkMode 
                ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                : "bg-gradient-to-br from-white to-blue-50"
            )}>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-3xl">📊</span> useState + useEffect
              </h3>
              <p className={clsx(
                "mb-6 transition-colors duration-500",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                Track how many times this component has rendered and monitor your network status.
              </p>
              
              <div className="space-y-6">
                {/* Render Counter */}
                <div className={clsx(
                  "p-4 rounded-xl transition-all duration-300",
                  isDarkMode ? "bg-gray-700/50" : "bg-blue-100/50"
                )}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Render Count</span>
                    <span className={clsx(
                      "text-2xl font-bold animate-[pulse_1s_ease-in-out]",
                      isDarkMode ? "text-blue-300" : "text-blue-600"
                    )}>
                      {renderCount}
                    </span>
                  </div>
                  <p className={clsx(
                    "text-sm transition-colors duration-500",
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>
                    useEffect runs after every render, updating this counter
                  </p>
                </div>

                {/* Network Status */}
                <div className={clsx(
                  "p-4 rounded-xl transition-all duration-300",
                  isDarkMode ? "bg-gray-700/50" : "bg-green-100/50"
                )}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Network Status</span>
                    <div className="flex items-center gap-2">
                      <div className={clsx(
                        "w-3 h-3 rounded-full animate-[pulse_2s_ease-in-out_infinite]",
                        isOnline ? "bg-green-500" : "bg-red-500"
                      )} />
                      <span className={clsx(
                        "font-bold",
                        isOnline 
                          ? isDarkMode ? "text-green-300" : "text-green-600" 
                          : isDarkMode ? "text-red-300" : "text-red-600"
                      )}>
                        {isOnline ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                  <p className={clsx(
                    "text-sm transition-colors duration-500",
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>
                    useEffect with setInterval simulates network changes
                  </p>
                </div>

                {/* Mouse Position */}
                <div className={clsx(
                  "p-4 rounded-xl transition-all duration-300",
                  isDarkMode ? "bg-gray-700/50" : "bg-purple-100/50"
                )}>
                  <div className="mb-2">
                    <span className="font-medium">Mouse Position</span>
                  </div>
                  <div className="flex gap-4">
                    <div>
                      <span className="text-sm opacity-70">X:</span>
                      <span className={clsx(
                        "ml-2 font-bold",
                        isDarkMode ? "text-purple-300" : "text-purple-600"
                      )}>
                        {mousePosition.x}px
                      </span>
                    </div>
                    <div>
                      <span className="text-sm opacity-70">Y:</span>
                      <span className={clsx(
                        "ml-2 font-bold",
                        isDarkMode ? "text-purple-300" : "text-purple-600"
                      )}>
                        {mousePosition.y}px
                      </span>
                    </div>
                  </div>
                  <p className={clsx(
                    "text-sm mt-2 transition-colors duration-500",
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>
                    useEffect adds/removes mousemove event listener
                  </p>
                </div>
              </div>
            </div>

            {/* useRef & Form Demo */}
            <div className={clsx(
              "rounded-2xl p-6 transition-all duration-500 hover:shadow-2xl",
              isDarkMode 
                ? "bg-gradient-to-br from-gray-800 to-gray-700" 
                : "bg-gradient-to-br from-white to-green-50"
            )}>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="text-3xl">🎯</span> useRef + Form Handling
              </h3>
              <p className={clsx(
                "mb-6 transition-colors duration-500",
                isDarkMode ? "text-gray-300" : "text-gray-600"
              )}>
                See how useRef can persist values and access DOM elements without re-renders.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input with useRef focus */}
                <div>
                  <label className={clsx(
                    "block mb-2 font-medium transition-colors duration-500",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    Student Name (Auto-focused with useRef)
                  </label>
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    className={clsx(
                      "w-full px-4 py-3 rounded-lg border transition-all duration-300",
                      "focus:outline-none focus:ring-2 focus:ring-blue-500",
                      isDarkMode 
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-500" 
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-400"
                    )}
                    placeholder="Type something..."
                  />
                </div>

                {/* Current & Previous Value Display */}
                <div className="grid grid-cols-2 gap-4">
                  <div className={clsx(
                    "p-4 rounded-xl text-center transition-all duration-300",
                    isDarkMode ? "bg-blue-900/20" : "bg-blue-100/50"
                  )}>
                    <div className="text-sm opacity-70">Current Value</div>
                    <div className={clsx(
                      "text-xl font-bold mt-2 truncate",
                      isDarkMode ? "text-blue-300" : "text-blue-600"
                    )}>
                      {userInput || '(empty)'}
                    </div>
                  </div>
                  <div className={clsx(
                    "p-4 rounded-xl text-center transition-all duration-300",
                    isDarkMode ? "bg-purple-900/20" : "bg-purple-100/50"
                  )}>
                    <div className="text-sm opacity-70">Previous Value</div>
                    <div className={clsx(
                      "text-xl font-bold mt-2 truncate",
                      isDarkMode ? "text-purple-300" : "text-purple-600"
                    )}>
                      {previousValueRef.current || '(empty)'}
                    </div>
                  </div>
                </div>

                {/* Character Counter */}
                <div className={clsx(
                  "p-4 rounded-xl transition-all duration-300",
                  isDarkMode ? "bg-gray-700/50" : "bg-gray-100/50"
                )}>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Character Count</span>
                    <span className={clsx(
                      "text-2xl font-bold",
                      isDarkMode ? "text-teal-300" : "text-teal-600"
                    )}>
                      {userInput.length}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!userInput.trim()}
                  className={clsx(
                    "w-full py-3 rounded-lg font-bold transition-all duration-300",
                    "transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed",
                    isDarkMode 
                      ? "bg-green-600 hover:bg-green-500 text-white" 
                      : "bg-green-500 hover:bg-green-400 text-white"
                  )}
                >
                  Submit Form
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Visual Hook Flow Diagram */}
        <section className="mb-16 animate-[slideUp_1.6s_ease-out]">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Hook Flow Visualization 🔄
          </h2>
          
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-500",
            isDarkMode 
              ? "bg-gradient-to-br from-gray-800 to-gray-700" 
              : "bg-gradient-to-br from-white to-blue-50"
          )}>
            {/* SVG Diagram */}
            <div className="relative mb-8 overflow-hidden rounded-xl">
              <svg 
                viewBox="0 0 800 400" 
                className="w-full h-auto"
              >
                {/* Functional Component Box */}
                <rect 
                  x="50" 
                  y="50" 
                  width="700" 
                  height="300" 
                  rx="15"
                  className={clsx(
                    "transition-all duration-500",
                    isDarkMode 
                      ? "fill-gray-700 stroke-gray-600" 
                      : "fill-white stroke-gray-300"
                  )}
                  strokeWidth="2"
                />
                
                <text 
                  x="400" 
                  y="90" 
                  textAnchor="middle"
                  className={clsx(
                    "text-2xl font-bold transition-colors duration-500",
                    isDarkMode ? "fill-green-300" : "fill-green-600"
                  )}
                >
                  Functional Component
                </text>
                
                {/* Hooks Inside */}
                <g>
                  {/* useState Hook */}
                  <rect 
                    x="100" 
                    y="130" 
                    width="180" 
                    height="60" 
                    rx="8"
                    className={clsx(
                      "transition-all duration-500",
                      isDarkMode 
                        ? "fill-blue-900/30 stroke-blue-500" 
                        : "fill-blue-100 stroke-blue-400"
                    )}
                    strokeWidth="2"
                  >
                    <animate
                      attributeName="fill"
                      values={
                        isDarkMode 
                          ? "#1e3a8a30;#1e40af30;#1e3a8a30" 
                          : "#dbeafe;#93c5fd;#dbeafe"
                      }
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  
                  <text 
                    x="190" 
                    y="165" 
                    textAnchor="middle"
                    className={clsx(
                      "font-bold transition-colors duration-500",
                      isDarkMode ? "fill-blue-300" : "fill-blue-700"
                    )}
                  >
                    useState()
                  </text>
                  
                  {/* useEffect Hook */}
                  <rect 
                    x="310" 
                    y="130" 
                    width="180" 
                    height="60" 
                    rx="8"
                    className={clsx(
                      "transition-all duration-500",
                      isDarkMode 
                        ? "fill-green-900/30 stroke-green-500" 
                        : "fill-green-100 stroke-green-400"
                    )}
                    strokeWidth="2"
                  >
                    <animate
                      attributeName="fill"
                      values={
                        isDarkMode 
                          ? "#14532d30;#15803d30;#14532d30" 
                          : "#dcfce7;#86efac;#dcfce7"
                      }
                      dur="3s"
                      repeatCount="indefinite"
                      begin="1s"
                    />
                  </rect>
                  
                  <text 
                    x="400" 
                    y="165" 
                    textAnchor="middle"
                    className={clsx(
                      "font-bold transition-colors duration-500",
                      isDarkMode ? "fill-green-300" : "fill-green-700"
                    )}
                  >
                    useEffect()
                  </text>
                  
                  {/* useRef Hook */}
                  <rect 
                    x="520" 
                    y="130" 
                    width="180" 
                    height="60" 
                    rx="8"
                    className={clsx(
                      "transition-all duration-500",
                      isDarkMode 
                        ? "fill-purple-900/30 stroke-purple-500" 
                        : "fill-purple-100 stroke-purple-400"
                    )}
                    strokeWidth="2"
                  >
                    <animate
                      attributeName="fill"
                      values={
                        isDarkMode 
                          ? "#581c8730;#7c3aed30;#581c8730" 
                          : "#f3e8ff;#d8b4fe;#f3e8ff"
                      }
                      dur="3s"
                      repeatCount="indefinite"
                      begin="2s"
                    />
                  </rect>
                  
                  <text 
                    x="610" 
                    y="165" 
                    textAnchor="middle"
                    className={clsx(
                      "font-bold transition-colors duration-500",
                      isDarkMode ? "fill-purple-300" : "fill-purple-700"
                    )}
                  >
                    useRef()
                  </text>
                </g>
                
                {/* React Core Connection */}
                <path 
                  d="M400,220 L400,280" 
                  fill="none"
                  className={clsx(
                    "transition-all duration-500",
                    isDarkMode ? "stroke-yellow-400" : "stroke-yellow-500"
                  )}
                  strokeWidth="3"
                  strokeDasharray="5,5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="20"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </path>
                
                <text 
                  x="400" 
                  y="310" 
                  textAnchor="middle"
                  className={clsx(
                    "font-bold transition-colors duration-500",
                    isDarkMode ? "fill-yellow-300" : "fill-yellow-600"
                  )}
                >
                  React Core Features
                </text>
              </svg>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-2xl mb-2">🪝</div>
                <h4 className="font-bold mb-2">Hook Into Features</h4>
                <p className={clsx(
                  "text-sm transition-colors duration-500",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Hooks connect functional components to React features
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">⚡</div>
                <h4 className="font-bold mb-2">No Classes Needed</h4>
                <p className={clsx(
                  "text-sm transition-colors duration-500",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Use state and lifecycle without class components
                </p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">♻️</div>
                <h4 className="font-bold mb-2">Reusable Logic</h4>
                <p className={clsx(
                  "text-sm transition-colors duration-500",
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                )}>
                  Extract and share logic with custom hooks
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rules of Hooks */}
        <section className="mb-16 animate-[slideUp_1.8s_ease-out]">
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-500",
            "border-l-4 border-r-4 border-red-500",
            isDarkMode 
              ? "bg-gradient-to-r from-red-900/20 to-red-800/20" 
              : "bg-gradient-to-r from-red-50 to-orange-50"
          )}>
            <h3 className="text-3xl font-bold mb-6 text-red-400">📜 Rules of Hooks</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">1️⃣</div>
                  <div>
                    <h4 className="font-bold mb-2 text-red-300">Only Call Hooks at Top Level</h4>
                    <p className={clsx(
                      "transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    )}>
                      Never call Hooks inside loops, conditions, or nested functions.
                    </p>
                    <div className={clsx(
                      "mt-3 p-3 rounded font-mono text-sm",
                      isDarkMode ? "bg-gray-800" : "bg-gray-100"
                    )}>
                      <code className="text-red-300">❌ if (condition) useState()</code>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">2️⃣</div>
                  <div>
                    <h4 className="font-bold mb-2 text-red-300">Only Call from React Functions</h4>
                    <p className={clsx(
                      "transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    )}>
                      Call Hooks from React functional components or custom Hooks.
                    </p>
                    <div className={clsx(
                      "mt-3 p-3 rounded font-mono text-sm",
                      isDarkMode ? "bg-gray-800" : "bg-gray-100"
                    )}>
                      <code className="text-green-300">✅ function MyComponent()</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={clsx(
              "mt-6 p-5 rounded-xl",
              isDarkMode ? "bg-yellow-900/20" : "bg-yellow-100/50"
            )}>
              <div className="flex items-start gap-3">
                <div className="text-2xl">💡</div>
                <div>
                  <h4 className="font-bold mb-2 text-yellow-300">Why These Rules?</h4>
                  <p className={clsx(
                    "transition-colors duration-500",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    React relies on the order in which Hooks are called. Breaking these rules leads to bugs!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className="mb-16 animate-[slideUp_2s_ease-out]">
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-500",
            isDarkMode 
              ? "bg-gradient-to-br from-orange-900/20 to-red-800/20 border border-orange-800/30" 
              : "bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200"
          )}>
            <h3 className="text-3xl font-bold mb-6 text-orange-400">⚠️ Common Pitfalls with Hooks</h3>
            
            <div className="space-y-6">
              <div className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <h4 className="font-bold mb-2 text-red-300">Stale Closures ❌</h4>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  useEffect callbacks capturing old state values. Use dependency arrays correctly.
                </p>
                <div className={clsx(
                  "mt-2 p-2 rounded font-mono text-sm",
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                )}>
                <code className="text-red-300">
                    {`useEffect(() => { console.log(count) }, []) // Missing dependency`}
                </code>
                </div>
              </div>
              
              <div className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <h4 className="font-bold mb-2 text-red-300">Infinite Loops 🔄</h4>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  useEffect updating state without proper dependency array.
                </p>
                <div className={clsx(
                  "mt-2 p-2 rounded font-mono text-sm",
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                )}>
                <code className="text-red-300">
                    
                    {`useEffect(() => { setCount(count + 1) }) // No dependencies = infinite loop!`}
                </code>
                </div>
              </div>
              
              <div className={clsx(
                "p-4 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                isDarkMode ? "bg-red-900/20" : "bg-red-100/50"
              )}>
                <h4 className="font-bold mb-2 text-red-300">Conditional Hooks 🎣</h4>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  Calling hooks conditionally breaks the rules and leads to bugs.
                </p>
                <div className={clsx(
                  "mt-2 p-2 rounded font-mono text-sm",
                  isDarkMode ? "bg-gray-800" : "bg-gray-100"
                )}>
                  <code className="text-red-300">
                    if (isLoggedIn) {`{`} useEffect(() ={`>`} {`{`}{`}`}) {`}`} // ❌</code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-16 animate-[slideUp_2.2s_ease-out]">
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-500",
            isDarkMode 
              ? "bg-gradient-to-br from-green-900/20 to-teal-800/20 border border-green-800/30" 
              : "bg-gradient-to-br from-green-50 to-teal-50 border border-green-200"
          )}>
            <h3 className="text-3xl font-bold mb-6 text-green-400">✅ Best Practices with Hooks</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <h4 className="font-bold mb-2">Custom Hooks</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Extract reusable logic into custom hooks. Name them starting with "use".
                    </p>
                    <div className={clsx(
                      "mt-3 p-2 rounded font-mono text-sm",
                      isDarkMode ? "bg-gray-800" : "bg-gray-100"
                    )}>
                      <code className="text-green-300">useLocalStorage, useFetch, useWindowSize</code>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🧹</div>
                  <div>
                    <h4 className="font-bold mb-2">Cleanup Effects</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Always return cleanup functions from useEffect to prevent memory leaks.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">⚡</div>
                  <div>
                    <h4 className="font-bold mb-2">Optimize Dependencies</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Be specific with dependency arrays. Empty [] for mount/unmount effects.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className={clsx(
                "p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]",
                isDarkMode ? "bg-green-900/20" : "bg-green-100/50"
              )}>
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🎯</div>
                  <div>
                    <h4 className="font-bold mb-2">One Hook, One Purpose</h4>
                    <p className={clsx(
                      "text-sm transition-colors duration-500",
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    )}>
                      Each useState should manage one concern. Split complex state into multiple hooks.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hint Section */}
        <section className="mb-16 animate-[slideUp_2.4s_ease-out]">
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-500",
            "border-l-4 border-r-4 border-blue-500/50",
            isDarkMode 
              ? "bg-gradient-to-r from-blue-900/20 to-cyan-900/20" 
              : "bg-gradient-to-r from-blue-50 to-cyan-50"
          )}>
            <h3 className="text-3xl font-bold mb-6 text-blue-400">💭 Hint Section</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-900/10">
                <div className="text-2xl">🤔</div>
                <div>
                  <h4 className="font-bold mb-2">Think about...</h4>
                  <p className={clsx(
                    "transition-colors duration-500",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    How would <span className="font-semibold">Swadeep</span> track his coding practice hours using hooks? What state would he need?
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-900/10">
                <div className="text-2xl">👀</div>
                <div>
                  <h4 className="font-bold mb-2">Observe carefully...</h4>
                  <p className={clsx(
                    "transition-colors duration-500",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    Watch how the render count increases when you type. Which hook causes this re-render?
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 p-4 rounded-lg bg-blue-900/10">
                <div className="text-2xl">🔧</div>
                <div>
                  <h4 className="font-bold mb-2">Try changing...</h4>
                  <p className={clsx(
                    "transition-colors duration-500",
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  )}>
                    What if <span className="font-semibold">Tuhina</span> wanted to save form data even after page refresh? Which hook could help?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className="animate-[slideUp_2.6s_ease-out]">
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-500",
            "border-l-4 border-purple-500",
            "hover:scale-[1.005] transform-gpu",
            isDarkMode 
              ? "bg-gradient-to-br from-purple-900/20 to-gray-800" 
              : "bg-gradient-to-br from-purple-50 to-gray-100"
          )}>
            <div className="flex items-start gap-4 mb-6">
              <div className={clsx(
                "p-3 rounded-full text-2xl transition-all duration-500",
                "animate-[bounce_2s_ease-in-out_infinite]",
                isDarkMode ? "bg-purple-700" : "bg-purple-200"
              )}>
                👨‍🏫
              </div>
              <div>
                <h3 className="text-2xl font-bold text-purple-400">Teacher's Note</h3>
                <p className={clsx(
                  "transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                )}>
                  Hooks are React's way of giving superpowers to functional components. Master them and you'll write cleaner, more maintainable code.
                </p>
              </div>
            </div>
            
            <div className={clsx(
              "p-6 rounded-xl transition-all duration-500",
              isDarkMode ? "bg-gray-800/50" : "bg-white/50"
            )}>
              <div className="mb-4">
                <h4 className="font-bold text-lg mb-2 text-purple-300">💡 Professional Tips:</h4>
                <ul className={clsx(
                  "space-y-2 ml-6 list-disc transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  <li>Always follow the Rules of Hooks - ESLint can help enforce them</li>
                  <li>Create custom hooks for logic you use in multiple places</li>
                  <li>useEffect dependency arrays are your friend - use them wisely</li>
                  <li>Start with useState and useEffect, then learn useContext and useReducer</li>
                </ul>
              </div>
              
              <div className="mb-4">
                <h4 className="font-bold text-lg mb-2 text-purple-300">🎯 Remember from 27 Years Experience:</h4>
                <ul className={clsx(
                  "space-y-2 ml-6 list-disc transition-colors duration-500",
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                )}>
                  <li>Hooks make testing easier - logic is separated from UI</li>
                  <li>Class components still work, but hooks are the future</li>
                  <li>The learning curve is steep but worth it</li>
                  <li>Practice with real projects at <span className="font-semibold">Barrackpore Coder & AccoTax</span></li>
                </ul>
              </div>
              
              <div className={clsx(
                "mt-6 pt-6 border-t transition-colors duration-500",
                isDarkMode ? "border-gray-700" : "border-gray-300"
              )}>
                <p className="text-sm italic flex items-center gap-2">
                  <span className="text-purple-400">From:</span>
                  <span className={clsx(
                    "transition-colors duration-500",
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  )}>
                    Sukanta Hui | 27 years experience | sukantahui@codernaccotax.co.in
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={clsx(
        "mt-12 py-8 border-t transition-colors duration-500",
        isDarkMode ? "border-gray-800 bg-gray-900/50" : "border-gray-200 bg-gray-50"
      )}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h4 className="font-bold mb-2">React Hooks Mastery</h4>
              <p className={clsx(
                "text-sm transition-colors duration-500",
                isDarkMode ? "text-gray-500" : "text-gray-600"
              )}>
                Topic 1: What are Hooks in React
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className={clsx(
                "text-sm mb-2 transition-colors duration-500",
                isDarkMode ? "text-gray-500" : "text-gray-600"
              )}>
                Previous: <span className="font-semibold text-blue-400">What is State in React</span>
              </div>
              <div className={clsx(
                "text-sm transition-colors duration-500",
                isDarkMode ? "text-gray-500" : "text-gray-600"
              )}>
                Next: <span className="font-semibold text-green-400">Why Hooks Exist</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Inline CSS for animations */}
      <style jsx="true">{`
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
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        /* Respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Topic1;