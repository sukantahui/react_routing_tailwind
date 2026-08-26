import React, { useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';

const Topic32 = () => {
  // State for dependency array examples
  const [counter, setCounter] = useState(0);
  const [user, setUser] = useState({ name: 'Swadeep', age: 21 });
  const [posts, setPosts] = useState(['Post 1', 'Post 2']);
  const [filter, setFilter] = useState('all');
  const [effectLog, setEffectLog] = useState([]);
  const [selectedMode, setSelectedMode] = useState('empty');
  const [staleValue, setStaleValue] = useState(0);
  const [mounted, setMounted] = useState(true);
  const [dependencyExample, setDependencyExample] = useState(1);
  
  // Refs for tracking
  const renderCountRef = useRef(0);
  const effectRunCountRef = useRef(0);
  const previousDepsRef = useRef([]);

  // Log function for effects
  const logEffect = (deps, description, color = 'blue') => {
    effectRunCountRef.current += 1;
    setEffectLog(prev => [
      ...prev,
      {
        id: Date.now(),
        run: effectRunCountRef.current,
        deps: JSON.stringify(deps),
        description,
        color,
        render: renderCountRef.current,
        timestamp: new Date().toLocaleTimeString()
      }
    ].slice(-10)); // Keep last 10 entries
  };

  // Track render count
  useEffect(() => {
    renderCountRef.current += 1;
  });

  // Example 1: Empty dependency array []
  useEffect(() => {
    if (selectedMode === 'empty') {
      logEffect([], 'Empty [] - Runs ONCE on mount', 'green');
      // This would be for setup code that should run once
    }
  }, []); // Empty array - only on mount

  // Example 2: No dependency array (runs on every render)
  useEffect(() => {
    if (selectedMode === 'none') {
      logEffect(null, 'No deps - Runs on EVERY render', 'red');
      // Be careful - can cause infinite loops if you set state here
    }
  }); // No dependency array - runs after every render

  // Example 3: With specific dependencies [counter]
  useEffect(() => {
    if (selectedMode === 'specific') {
      logEffect([counter], `[counter] - Runs when counter changes (${counter})`, 'purple');
    }
  }, [counter]); // Only when counter changes

  // Example 4: With multiple dependencies
  useEffect(() => {
    if (selectedMode === 'multiple') {
      logEffect([user.name, user.age], `[user.name, user.age] - Runs when user changes`, 'orange');
    }
  }, [user.name, user.age]); // When either user.name or user.age changes

  // Example 5: With object dependency (careful!)
  useEffect(() => {
    if (selectedMode === 'object') {
      logEffect([user], `[user] - Runs when user object changes`, 'yellow');
    }
  }, [user]); // When user object changes (reference equality)

  // Example 6: With function dependency
  const fetchUserData = useCallback(() => {
    console.log('Fetching user data...');
    return `User: ${user.name}`;
  }, [user.name]);

  useEffect(() => {
    if (selectedMode === 'function') {
      logEffect([fetchUserData], `[fetchUserData] - Runs when function changes`, 'pink');
    }
  }, [fetchUserData]);

  // Example 7: Stale closure demonstration
  useEffect(() => {
    if (selectedMode === 'stale') {
      const timer = setTimeout(() => {
        // This will log the stale value if counter changes during timer
        setStaleValue(prev => {
          logEffect([], `Stale closure: captured counter = ${counter}, actual = ???`, 'red');
          return prev + 1;
        });
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [selectedMode]); // Only re-run when selectedMode changes

  // Example 8: Deep vs shallow comparison
  useEffect(() => {
    if (selectedMode === 'comparison') {
      logEffect([{ name: user.name }], `[{name: "${user.name}"}] - New object every render, always runs`, 'gray');
    }
  }, [{ name: user.name }]); // New object every time - always runs!

  // Function to update user
  const updateUserName = () => {
    setUser(prev => ({ ...prev, name: `User${Math.floor(Math.random() * 100)}` }));
  };

  const updateUserAge = () => {
    setUser(prev => ({ ...prev, age: prev.age + 1 }));
  };

  const updateUserObject = () => {
    // Creates new object reference
    setUser({ ...user, updated: Date.now() });
  };

  const addPost = () => {
    setPosts(prev => [...prev, `Post ${prev.length + 1}`]);
  };

  // Reset logs
  const resetLogs = () => {
    setEffectLog([]);
    effectRunCountRef.current = 0;
  };

  // Dependency visualization data
  const dependencyExamples = [
    {
      id: 'empty',
      name: 'Empty Array []',
      code: 'useEffect(() => {\n  // Runs once on mount\n}, []);',
      description: 'Runs only once when component mounts',
      useCase: 'Data fetching on mount, event listener setup',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      border: 'border-green-300 dark:border-green-700'
    },
    {
      id: 'none',
      name: 'No Array',
      code: 'useEffect(() => {\n  // Runs after every render\n});',
      description: 'Runs after every render (dangerous!)',
      useCase: 'Rare - debugging, analytics on every render',
      color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
      border: 'border-red-300 dark:border-red-700'
    },
    {
      id: 'specific',
      name: 'Specific [state]',
      code: 'useEffect(() => {\n  // Runs when state changes\n}, [state]);',
      description: 'Runs when specific state/prop changes',
      useCase: 'Reacting to state changes, form validation',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
      border: 'border-purple-300 dark:border-purple-700'
    },
    {
      id: 'multiple',
      name: 'Multiple [a, b]',
      code: 'useEffect(() => {\n  // Runs when a OR b changes\n}, [a, b]);',
      description: 'Runs when any dependency changes',
      useCase: 'Multiple dependencies, combined effects',
      color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
      border: 'border-orange-300 dark:border-orange-700'
    },
    {
      id: 'object',
      name: 'Object [obj]',
      code: 'useEffect(() => {\n  // Runs when obj reference changes\n}, [obj]);',
      description: 'Runs when object reference changes',
      useCase: 'Object dependencies, careful with mutations',
      color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
      border: 'border-yellow-300 dark:border-yellow-700'
    },
    {
      id: 'function',
      name: 'Function [fn]',
      code: 'useEffect(() => {\n  // Runs when function changes\n}, [fn]);',
      description: 'Runs when function reference changes',
      useCase: 'Callback functions, event handlers',
      color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300',
      border: 'border-pink-300 dark:border-pink-700'
    }
  ];

  // Dependency comparison examples
  const comparisonExamples = [
    {
      name: 'Primitive Value',
      code: 'const [count, setCount] = useState(0);',
      comparison: 'count === count // true if same number',
      behavior: 'Works as expected',
      safe: true
    },
    {
      name: 'Object Reference',
      code: 'const [user, setUser] = useState({ name: "John" });',
      comparison: 'user === user // true only if same reference',
      behavior: 'New object every render triggers effect',
      safe: false
    },
    {
      name: 'Array Reference',
      code: 'const [items, setItems] = useState([]);',
      comparison: 'items === items // true only if same reference',
      behavior: 'New array every render triggers effect',
      safe: false
    },
    {
      name: 'Function Reference',
      code: 'const fn = () => {};',
      comparison: 'fn === fn // true only if same reference',
      behavior: 'New function every render triggers effect',
      safe: false
    }
  ];

  // ESLint rules examples
  const eslintRules = [
    {
      rule: 'exhaustive-deps',
      description: 'Warns about missing dependencies',
      example: 'useEffect(() => {\n  console.log(count);\n}, []); // ❌ Missing [count]',
      fix: 'Add all referenced values to dependencies'
    },
    {
      rule: 'no-unused-vars',
      description: 'Warns about unused dependencies',
      example: 'useEffect(() => {\n  // Only uses a\n}, [a, b]); // ❌ b is unused',
      fix: 'Remove unused dependencies'
    },
    {
      rule: 'react-hooks/rules-of-hooks',
      description: 'Enforces hooks rules',
      example: 'if (condition) {\n  useEffect(...); // ❌ Conditional hook\n}',
      fix: 'Move hooks to top level'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 animate-[fadeInUp_0.8s_ease-out]">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
            <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
              Topic 28/46
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Dependency Array Fundamentals
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Master the art of dependency arrays—the key to controlling when your effects run. 
            Learn to avoid infinite loops, stale closures, and performance pitfalls with precise dependency management.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Theory & Explanation */}
          <div className="space-y-8">
            {/* What are Dependency Arrays? */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_0.9s_ease-out]">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                  <span className="text-xl">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  What Are Dependency Arrays?
                </h2>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  The <strong>dependency array</strong> is the second argument to <code>useEffect</code> that 
                  tells React <em>when</em> your effect should re-run. It's a list of values that the effect depends on.
                </p>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-5 rounded-xl my-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">🎯 Core Principle</h4>
                  <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2 italic text-gray-700 dark:text-gray-300">
                    "The dependency array synchronizes your effect with the values it uses. 
                    When a dependency changes, the effect re-runs. When dependencies stay the same, the effect skips."
                  </blockquote>
                </div>
                
                {/* Visual Dependency Flow */}
                <div className="my-8">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-center">
                    How Dependency Arrays Work
                  </h4>
                  
                  <div className="relative">
                    {/* Flow Diagram */}
                    <div className="flex flex-col items-center space-y-6">
                      {/* State/Props */}
                      <div className="w-full max-w-md p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border-2 border-green-300 dark:border-green-700">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3">
                            <span className="text-white text-sm">S/P</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">State & Props</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Values that might change</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Arrow */}
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white">↓</span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Render happens</div>
                      </div>
                      
                      {/* Dependency Array Check */}
                      <div className="w-full max-w-md p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-300 dark:border-purple-700">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center mr-3">
                            <span className="text-white text-sm">?</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">Dependency Check</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Did any dependencies change?</div>
                          </div>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <div className="p-2 bg-white dark:bg-gray-800 rounded text-center">
                            <div className="text-green-600 dark:text-green-400 font-bold">Yes</div>
                            <div className="text-xs">Run effect</div>
                          </div>
                          <div className="p-2 bg-white dark:bg-gray-800 rounded text-center">
                            <div className="text-red-600 dark:text-red-400 font-bold">No</div>
                            <div className="text-xs">Skip effect</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Effect Execution */}
                      <div className="w-full max-w-md p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl border-2 border-orange-300 dark:border-orange-700">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center mr-3">
                            <span className="text-white text-sm">⚡</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">Effect Execution</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Side effects run here</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* SVG Connection Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" fill="#3b82f6" />
                        </marker>
                      </defs>
                      <line x1="50%" y1="80" x2="50%" y2="140" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
                      <line x1="50%" y1="200" x2="50%" y2="260" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
                    </svg>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Real-World Analogy</h4>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <p className="text-gray-700 dark:text-gray-300">
                      Think of Tuhina from Barrackpore managing class attendance:
                    </p>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                      <li className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span><strong>Empty []:</strong> Take attendance once at start of day</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span><strong>[students]:</strong> Update attendance when student list changes</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <span><strong>No array:</strong> Take attendance after every single activity (exhausting!)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Dependency Comparison Types */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.0s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                  <span className="text-lg">🔍</span>
                </span>
                Dependency Comparison Types
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-900">
                      <th className="p-3 text-left text-gray-900 dark:text-white font-semibold">Type</th>
                      <th className="p-3 text-left text-gray-900 dark:text-white font-semibold">Comparison</th>
                      <th className="p-3 text-left text-gray-900 dark:text-white font-semibold">Behavior</th>
                      <th className="p-3 text-left text-gray-900 dark:text-white font-semibold">Safe?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonExamples.map((item, index) => (
                      <tr 
                        key={index}
                        className={clsx(
                          "border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors",
                          index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-900/30"
                        )}
                      >
                        <td className="p-3 font-semibold text-gray-900 dark:text-white">
                          {item.name}
                        </td>
                        <td className="p-3">
                          <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                            {item.comparison}
                          </code>
                        </td>
                        <td className="p-3 text-sm text-gray-600 dark:text-gray-400">
                          {item.behavior}
                        </td>
                        <td className="p-3">
                          <span className={clsx(
                            "px-2 py-1 rounded text-xs font-semibold",
                            item.safe 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          )}>
                            {item.safe ? '✅ Safe' : '⚠️ Careful'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Insight</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  React uses <strong>reference equality</strong> (===) to compare dependencies. 
                  For objects, arrays, and functions, a new reference means "changed" even if content is the same.
                </p>
              </div>
            </section>

            {/* ESLint Rules & Best Practices */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.1s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                  <span className="text-lg">📏</span>
                </span>
                ESLint Rules & Best Practices
              </h3>
              
              <div className="space-y-4">
                {eslintRules.map((rule, index) => (
                  <div 
                    key={index}
                    className="p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700 transition-all duration-300"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-1">
                        <span className="text-green-600 dark:text-green-400 text-sm">✓</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {rule.rule}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {rule.description}
                        </p>
                        <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded-lg mt-2 overflow-x-auto">
                          {rule.example}
                        </pre>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                          <strong>Fix:</strong> {rule.fix}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                  Professional Tip from Ichapur Classroom
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  When Abhronila asked why her effect kept re-running, we discovered she was creating 
                  a new function inside the component body every render. The fix? <code>useCallback</code>.
                </p>
              </div>
            </section>
          </div>

          {/* Right Column - Interactive Examples */}
          <div className="space-y-8">
            {/* Dependency Array Playground */}
            <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.0s_ease-out]">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Dependency Array Playground
              </h3>
              
              {/* Mode Selector */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Select Dependency Mode</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {dependencyExamples.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setSelectedMode(mode.id)}
                      className={clsx(
                        "p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105",
                        selectedMode === mode.id 
                          ? "scale-105 ring-2 ring-offset-2 ring-blue-500"
                          : "hover:shadow-md",
                        mode.border,
                        selectedMode === mode.id ? "bg-white dark:bg-gray-800" : mode.color
                      )}
                    >
                      <div className="font-semibold text-gray-900 dark:text-white">{mode.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 truncate">
                        {mode.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Current State Display */}
              <div className="mb-8 p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Current State Values</h4>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{counter}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Counter</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">User Name</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {user.age}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">User Age</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {posts.length}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Posts Count</div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    onClick={() => setCounter(prev => prev + 1)}
                    className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    Increment Counter
                  </button>
                  
                  <button
                    onClick={updateUserName}
                    className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    Change User Name
                  </button>
                  
                  <button
                    onClick={updateUserAge}
                    className="py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    Increment Age
                  </button>
                  
                  <button
                    onClick={addPost}
                    className="py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    Add Post
                  </button>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    onClick={updateUserObject}
                    className="py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    New User Object
                  </button>
                  
                  <button
                    onClick={resetLogs}
                    className="py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    Reset Logs
                  </button>
                </div>
              </div>
              
              {/* Selected Mode Details */}
              {dependencyExamples.find(m => m.id === selectedMode) && (
                <div className="mb-8 p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                    {dependencyExamples.find(m => m.id === selectedMode).name} Details
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Code:
                      </div>
                      <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                        {dependencyExamples.find(m => m.id === selectedMode).code}
                      </pre>
                    </div>
                    
                    <div>
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Description:
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {dependencyExamples.find(m => m.id === selectedMode).description}
                      </p>
                    </div>
                    
                    <div>
                      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Common Use Case:
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {dependencyExamples.find(m => m.id === selectedMode).useCase}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Effect Execution Log */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.1s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Effect Execution Log
              </h3>
              
              <div className="h-64 overflow-y-auto bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 mb-4">
                {effectLog.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                    Effects will be logged here as they run. Try changing states above.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[...effectLog].reverse().map((log) => (
                      <div 
                        key={log.id}
                        className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className={clsx(
                              "w-3 h-3 rounded-full mr-3",
                              log.color === 'green' && "bg-green-500",
                              log.color === 'red' && "bg-red-500",
                              log.color === 'purple' && "bg-purple-500",
                              log.color === 'orange' && "bg-orange-500",
                              log.color === 'yellow' && "bg-yellow-500",
                              log.color === 'pink' && "bg-pink-500",
                              log.color === 'blue' && "bg-blue-500"
                            )}></div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                              Run #{log.run}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Render #{log.render} • {log.timestamp}
                          </div>
                        </div>
                        
                        <div className="ml-6">
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            {log.description}
                          </div>
                          {log.deps !== 'null' && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              Dependencies: <code>{log.deps}</code>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <div>
                  Total effect runs: <span className="font-semibold">{effectRunCountRef.current}</span>
                </div>
                <div>
                  Current render: <span className="font-semibold">{renderCountRef.current}</span>
                </div>
              </div>
            </section>

            {/* Common Pitfalls Section */}
            <section className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.2s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Common Dependency Pitfalls
              </h3>
              
              <div className="space-y-6">
                {/* Stale Closures */}
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">1. Stale Closures</h4>
                  
                  <div className="space-y-3">
                    <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
{`// ❌ Problem: Captures initial counter value
useEffect(() => {
  const timer = setTimeout(() => {
    console.log(counter); // Always logs 0!
  }, 3000);
}, []); // Empty array

// ✅ Solution: Use functional update or include dependency
useEffect(() => {
  const timer = setTimeout(() => {
    console.log(counter); // Logs current value
  }, 3000);
}, [counter]); // Include counter`}
                    </pre>
                    
                    <div className="p-3 bg-red-50 dark:bg-red-900/10 rounded-lg">
                      <p className="text-sm text-red-700 dark:text-red-400">
                        <strong>Watch out:</strong> When selected mode is "stale", a timer captures the counter 
                        value at effect creation. If counter changes before timer fires, it logs the stale value.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Infinite Loops */}
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">2. Infinite Loops</h4>
                  
                  <div className="space-y-3">
                    <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
{`// ❌ Infinite loop: sets state without dependency
useEffect(() => {
  setCounter(counter + 1); // Triggers re-render
}); // No dependency array = runs every render

// ✅ Solution: Add proper dependencies or conditions
useEffect(() => {
  if (shouldUpdate) {
    setCounter(prev => prev + 1);
  }
}, [shouldUpdate]);`}
                    </pre>
                    
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg">
                      <p className="text-sm text-yellow-700 dark:text-yellow-400">
                        <strong>Tip:</strong> If your effect sets state that it depends on, you'll create an infinite loop. 
                        Use conditions or functional updates to break the cycle.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Object/Array References */}
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">3. Object & Array References</h4>
                  
                  <div className="space-y-3">
                    <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
{`// ❌ Always runs: new object every render
useEffect(() => {
  // This effect runs every render!
}, [{ name: user.name }]);

// ❌ Always runs: new array every render  
useEffect(() => {
  // This effect runs every render!
}, [[...posts]]);

// ✅ Solution: Use primitives or memoize
useEffect(() => {
  // Only runs when user.name changes
}, [user.name]);`}
                    </pre>
                    
                    <div className="p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                      <p className="text-sm text-green-700 dark:text-green-400">
                        <strong>Remember:</strong> React compares dependencies by reference (===). 
                        If you create a new object/array/function every render, the effect will always run.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Teacher's Note Section */}
        <div className="mt-8 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-6 shadow-lg border-l-4 border-emerald-500 dark:border-emerald-400 animate-[fadeInUp_1.3s_ease-out]">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
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
                
                <div className="bg-white dark:bg-gray-800/50 p-4 rounded-lg mb-4 border border-emerald-200 dark:border-emerald-700">
                  <h4 className="font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                    The Dependency Mindset:
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    When Debangshu from Ichapur couldn't figure out why his search wasn't updating, 
                    we discovered he had <code>[searchTerm]</code> but was using <code>currentSearch</code> 
                    inside the effect. The names must match!
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Always ask: "What values does this effect use from outside its scope?"
                  </p>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  After 27 years of debugging React applications, I can tell you that 90% of effect-related 
                  bugs come from incorrect dependency arrays. The student from Barrackpore who fixed their 
                  app's memory leak? They learned to include all dependencies.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  <strong>Professional Insight:</strong> In enterprise applications, we use these rules:
                </p>
                
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">1.</span>
                    <span><strong>Always use the ESLint plugin</strong> - it catches 95% of dependency mistakes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">2.</span>
                    <span><strong>Keep dependencies minimal</strong> - only include what the effect actually uses</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">3.</span>
                    <span><strong>Use useCallback/useMemo</strong> for stable function/object references</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">4.</span>
                    <span><strong>Test effect behavior</strong> when dependencies change</span>
                  </li>
                </ul>
                
                <div className="mt-4 pt-4 border-t border-emerald-200 dark:border-emerald-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Sukanta Hui</strong> · 27 years experience · 
                    <a href="mailto:sukantahui@codernaccotax.co.in" className="text-emerald-600 dark:text-emerald-400 hover:underline ml-1">
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
              <span className="text-cyan-600 dark:text-cyan-400">🧪</span>
            </span>
            Experiment & Observe
          </h4>
          
          <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Exercise Plan</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Follow this sequence and observe the effect log:
              </p>
              
              <ol className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3 mt-1 text-xs">1</span>
                  <div>
                    <span>Select "Empty Array []" mode</span>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Notice effect runs once on mount, then never again
                    </div>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3 mt-1 text-xs">2</span>
                  <div>
                    <span>Select "No Array" mode</span>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Effect runs after every state change and render
                    </div>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3 mt-1 text-xs">3</span>
                  <div>
                    <span>Select "Specific [counter]" and click "Increment Counter"</span>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Effect runs only when counter changes
                    </div>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <span className="w-6 h-6 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mr-3 mt-1 text-xs">4</span>
                  <div>
                    <span>Select "Object [user]" and click "New User Object"</span>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      New object reference triggers effect even with same content
                    </div>
                  </div>
                </li>
              </ol>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Critical Question:</strong> Look at the "Stale Closures" example. 
                What happens if you:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                <li>1. Select "Stale" mode</li>
                <li>2. Click "Increment Counter" multiple times quickly</li>
                <li>3. Wait 3 seconds</li>
              </ul>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                Which counter value gets logged? The one when the effect ran, or the current one?
              </p>
            </div>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-[fadeInUp_1.5s_ease-out]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <span className="text-green-600 dark:text-green-400">✓</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Dependency Rules</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>[] = Run once on mount</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>[dep] = Run when dep changes</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>No array = Run every render</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Include all values effect uses</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <span className="text-blue-600 dark:text-blue-400">🎯</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">Best Practices</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Use ESLint exhaustive-deps rule</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Keep dependencies minimal</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Memoize objects/functions with useMemo/useCallback</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Test effect re-runs</span>
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
                <span>Forgetting dependencies (stale closures)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Including unnecessary dependencies</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Creating new objects/arrays every render</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Setting state without breaking cycles</span>
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

export default Topic32;