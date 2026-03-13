import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import clsx from 'clsx';

const Topic34 = () => {
  // State for specific dependency examples
  const [counter, setCounter] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState({ 
    name: 'Swadeep', 
    age: 21, 
    city: 'Barrackpore',
    active: true 
  });
  const [filter, setFilter] = useState('all');
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', category: 'fruit', price: 1.2 },
    { id: 2, name: 'Bread', category: 'bakery', price: 2.5 },
    { id: 3, name: 'Milk', category: 'dairy', price: 1.8 },
    { id: 4, name: 'Eggs', category: 'dairy', price: 3.2 },
    { id: 5, name: 'Banana', category: 'fruit', price: 0.8 },
  ]);
  const [effectLog, setEffectLog] = useState([]);
  const [dependencyMode, setDependencyMode] = useState('single');
  const [validationError, setValidationError] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [apiCallCount, setApiCallCount] = useState(0);
  const [dependencyVisualization, setDependencyVisualization] = useState({
    prev: [],
    current: [],
    changed: []
  });

  // Refs for tracking
  const effectRunCountRef = useRef(0);
  const prevDependenciesRef = useRef({});
  const debounceTimerRef = useRef(null);
  const renderCountRef = useRef(0);

  // Log function for effects
  const logEffect = (deps, description, color = 'blue') => {
    effectRunCountRef.current += 1;
    
    // Track dependency changes
    const prevDeps = prevDependenciesRef.current[dependencyMode] || [];
    const currentDeps = deps || [];
    const changedDeps = [];
    
    // Compare dependencies
    if (prevDeps.length === currentDeps.length) {
      currentDeps.forEach((dep, index) => {
        if (prevDeps[index] !== dep) {
          changedDeps.push({ index, prev: prevDeps[index], current: dep });
        }
      });
    }
    
    setDependencyVisualization({
      prev: prevDeps,
      current: currentDeps,
      changed: changedDeps
    });
    
    prevDependenciesRef.current[dependencyMode] = currentDeps;
    
    setEffectLog(prev => [
      ...prev,
      {
        id: Date.now(),
        run: effectRunCountRef.current,
        mode: dependencyMode,
        deps: JSON.stringify(currentDeps),
        description,
        color,
        render: renderCountRef.current,
        timestamp: new Date().toLocaleTimeString(),
        changedCount: changedDeps.length
      }
    ].slice(-8));
  };

  // Track render count
  useEffect(() => {
    renderCountRef.current += 1;
  });

  // ============ EXAMPLE 1: Single Dependency [counter] ============
  useEffect(() => {
    if (dependencyMode === 'single') {
      logEffect([counter], `Effect ran because counter changed to ${counter}`, 'green');
      
      // This effect runs every time counter changes
      document.title = `Counter: ${counter} | Dependency Demo`;
    }
  }, [counter]);

  // ============ EXAMPLE 2: Multiple Dependencies [searchTerm, filter] ============
  useEffect(() => {
    if (dependencyMode === 'multiple') {
      logEffect([searchTerm, filter], `Effect ran because searchTerm or filter changed`, 'purple');
      
      // This would be where you'd update search results
      const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || item.category === filter;
        return matchesSearch && matchesFilter;
      });
      
      // In a real app, you might set state with filtered results
    }
  }, [searchTerm, filter, items]);

  // ============ EXAMPLE 3: Object Dependency [user] ============
  useEffect(() => {
    if (dependencyMode === 'object') {
      logEffect([user], `Effect ran because user object changed`, 'orange');
      
      // This effect runs when user object reference changes
      // Be careful - it runs even if content is the same but reference is different
    }
  }, [user]);

  // ============ EXAMPLE 4: Specific Object Property [user.name, user.age] ============
  useEffect(() => {
    if (dependencyMode === 'properties') {
      logEffect([user.name, user.age], `Effect ran because user.name or user.age changed`, 'blue');
      
      // This effect only runs when specific properties change
      // More efficient than watching the entire object
    }
  }, [user.name, user.age]);

  // ============ EXAMPLE 5: Debounced Search Effect ============
  useEffect(() => {
    if (dependencyMode === 'debounced') {
      logEffect([searchTerm], `Effect scheduled for debounced search: "${searchTerm}"`, 'yellow');
      
      // Clear existing timer
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      
      // Set new timer
      debounceTimerRef.current = setTimeout(() => {
        setDebouncedSearch(searchTerm);
        logEffect([], `Debounced effect executed for: "${searchTerm}"`, 'green');
      }, 500);
      
      // Cleanup timer
      return () => {
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
      };
    }
  }, [searchTerm, dependencyMode]);

  // ============ EXAMPLE 6: API Call with Dependencies ============
  useEffect(() => {
    if (dependencyMode === 'api' && searchTerm.trim()) {
      logEffect([searchTerm], `API effect triggered for search: "${searchTerm}"`, 'pink');
      
      // Simulate API call
      const fetchData = async () => {
        try {
          // Simulate network delay
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Mock API response
          const mockResults = items.filter(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
          
          setApiCallCount(prev => prev + 1);
          logEffect([], `API call #${apiCallCount + 1} completed for: "${searchTerm}"`, 'green');
        } catch (error) {
          logEffect([], `API call failed for: "${searchTerm}"`, 'red');
        }
      };
      
      fetchData();
    }
  }, [searchTerm, dependencyMode]);

  // ============ EXAMPLE 7: Validation Effect ============
  useEffect(() => {
    if (dependencyMode === 'validation') {
      logEffect([user.name, user.age], `Validation effect ran`, 'red');
      
      // Validate user data
      let error = '';
      if (user.name.length < 2) {
        error = 'Name must be at least 2 characters';
      } else if (user.age < 18) {
        error = 'Must be at least 18 years old';
      } else if (user.age > 100) {
        error = 'Age must be less than 100';
      }
      
      setValidationError(error);
    }
  }, [user.name, user.age, dependencyMode]);

  // ============ EXAMPLE 8: Derived State with useMemo ============
  const filteredItems = useMemo(() => {
    if (dependencyMode === 'derived') {
      logEffect([searchTerm, filter], `useMemo recalculated filtered items`, 'teal');
    }
    
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === 'all' || item.category === filter;
      return matchesSearch && matchesFilter;
    });
  }, [items, searchTerm, filter, dependencyMode]);

  // Helper functions
  const updateCounter = () => {
    setCounter(prev => prev + 1);
  };

  const updateUserName = () => {
    const names = ['Swadeep', 'Tuhina', 'Abhronila', 'Debangshu', 'Rohit'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    setUser(prev => ({ ...prev, name: randomName }));
  };

  const updateUserAge = () => {
    setUser(prev => ({ ...prev, age: prev.age + 1 }));
  };

  const createNewUserObject = () => {
    // Creates new object with same values - will trigger object dependency
    setUser({ ...user, timestamp: Date.now() });
  };

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      name: `Item ${items.length + 1}`,
      category: ['fruit', 'bakery', 'dairy'][Math.floor(Math.random() * 3)],
      price: Math.random() * 5 + 0.5
    };
    setItems(prev => [...prev, newItem]);
  };

  const resetLogs = () => {
    setEffectLog([]);
    effectRunCountRef.current = 0;
    prevDependenciesRef.current = {};
  };

  const clearSearch = () => {
    setSearchTerm('');
    setDebouncedSearch('');
  };

  // Dependency mode configurations
  const dependencyModes = [
    {
      id: 'single',
      name: 'Single Dependency',
      description: 'Effect runs when one specific value changes',
      example: '[counter]',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
      border: 'border-green-300 dark:border-green-700'
    },
    {
      id: 'multiple',
      name: 'Multiple Dependencies',
      description: 'Effect runs when any of the listed values change',
      example: '[searchTerm, filter]',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
      border: 'border-purple-300 dark:border-purple-700'
    },
    {
      id: 'object',
      name: 'Object Dependency',
      description: 'Effect runs when object reference changes',
      example: '[user]',
      color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
      border: 'border-orange-300 dark:border-orange-700'
    },
    {
      id: 'properties',
      name: 'Object Properties',
      description: 'Effect runs when specific object properties change',
      example: '[user.name, user.age]',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
      border: 'border-blue-300 dark:border-blue-700'
    },
    {
      id: 'debounced',
      name: 'Debounced Effect',
      description: 'Effect runs after delay when dependencies stabilize',
      example: '[searchTerm] (with debounce)',
      color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
      border: 'border-yellow-300 dark:border-yellow-700'
    },
    {
      id: 'api',
      name: 'API Call',
      description: 'Effect triggers API call when dependencies change',
      example: '[searchTerm] (triggers API)',
      color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300',
      border: 'border-pink-300 dark:border-pink-700'
    },
    {
      id: 'validation',
      name: 'Form Validation',
      description: 'Effect validates form fields when they change',
      example: '[user.name, user.age] (validates)',
      color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
      border: 'border-red-300 dark:border-red-700'
    },
    {
      id: 'derived',
      name: 'Derived State',
      description: 'useMemo calculates derived value from dependencies',
      example: 'useMemo(() => ..., [searchTerm, filter])',
      color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300',
      border: 'border-teal-300 dark:border-teal-700'
    }
  ];

  // Comparison of dependency strategies
  const dependencyStrategies = [
    {
      strategy: 'Specific Properties',
      code: '[user.name, user.age]',
      pros: ['Efficient', 'Runs only when needed', 'Clear dependencies'],
      cons: ['More verbose', 'Need to list each property']
    },
    {
      strategy: 'Entire Object',
      code: '[user]',
      pros: ['Simple', 'Catches all changes'],
      cons: ['Runs on any change', 'Even if irrelevant properties change', 'Can cause unnecessary re-runs']
    },
    {
      strategy: 'useMemo for Derived',
      code: 'useMemo(() => compute(user), [user])',
      pros: ['Memoized result', 'Efficient recomputation'],
      cons: ['Extra hook', 'Overhead for simple cases']
    },
    {
      strategy: 'Custom Comparison',
      code: 'useEffect(() => {}, [user.id])',
      pros: ['Fine-grained control', 'Very efficient'],
      cons: ['Manual tracking', 'Easy to miss changes']
    }
  ];

  // Common dependency mistakes
  const commonMistakes = [
    {
      mistake: 'Missing Dependencies',
      problem: 'Stale closures, effects don\'t re-run when needed',
      example: 'useEffect(() => {\n  console.log(counter);\n}, []); // ❌ Missing [counter]',
      fix: 'Add all values that effect uses to dependencies'
    },
    {
      mistake: 'Unnecessary Dependencies',
      problem: 'Effects re-run too often, performance issues',
      example: 'useEffect(() => {\n  // Only uses user.name\n}, [user]); // ❌ Should be [user.name]',
      fix: 'Only include values that effect actually uses'
    },
    {
      mistake: 'Inline Functions',
      problem: 'Effect re-runs every render due to new function reference',
      example: 'useEffect(() => {\n  fetchData();\n}, [fetchData]); // ❌ fetchData created inline',
      fix: 'Memoize function with useCallback or define outside component'
    },
    {
      mistake: 'Object/Array Literals',
      problem: 'Effect re-runs every render due to new reference',
      example: 'useEffect(() => {\n  // ...\n}, [{ id: user.id }]); // ❌ New object every render',
      fix: 'Use primitives or memoize with useMemo'
    }
  ];

  // Get current mode details
  const currentMode = dependencyModes.find(m => m.id === dependencyMode) || dependencyModes[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 animate-[fadeInUp_0.8s_ease-out]">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 mb-4">
            <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">
              Topic 30/46
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            useEffect with Specific Dependencies
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Master precision effect control—learn to run side effects exactly when specific values change, 
            optimize performance, and avoid common dependency pitfalls with surgical precision.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Theory & Explanation */}
          <div className="space-y-8">
            {/* Dependency Array Theory */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_0.9s_ease-out]">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                  <span className="text-xl">🎯</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Specific Dependencies Explained
                </h2>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Specific dependencies</strong> tell React exactly <em>which values</em> your effect depends on. 
                  When any of these values change, the effect re-runs. When none change, the effect skips.
                </p>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-5 rounded-xl my-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">🎯 Core Principle</h4>
                  <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2 italic text-gray-700 dark:text-gray-300">
                    "Specific dependencies synchronize your effect with precise values. 
                    List everything your effect uses from outside its scope, and React will run it 
                    only when those specific values change."
                  </blockquote>
                </div>
                
                {/* Dependency Comparison Visualization */}
                <div className="my-8">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-center">
                    Dependency Precision Spectrum
                  </h4>
                  
                  <div className="relative">
                    {/* Spectrum Line */}
                    <div className="h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full"></div>
                    
                    {/* Markers */}
                    <div className="flex justify-between mt-4">
                      <div className="text-center">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-2">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <div className="text-xs font-semibold">Too Specific</div>
                        <div className="text-xs text-gray-500">Missing deps</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center mx-auto mb-2">
                          <span className="text-white text-sm">⚖️</span>
                        </div>
                        <div className="text-xs font-semibold">Just Right</div>
                        <div className="text-xs text-gray-500">Exact deps</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mx-auto mb-2">
                          <span className="text-white text-sm">⚠️</span>
                        </div>
                        <div className="text-xs font-semibold">Too Broad</div>
                        <div className="text-xs text-gray-500">Extra deps</div>
                      </div>
                    </div>
                    
                    {/* Examples */}
                    <div className="grid grid-cols-3 gap-4 mt-8">
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-xs text-green-700 dark:text-green-300 mb-1">❌ Problem:</div>
                        <pre className="text-xs bg-gray-900 text-gray-100 p-2 rounded">
                          {`useEffect(() => {
  console.log(counter);
}, []);`}
                        </pre>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          Missing dependency - stale closure
                        </div>
                      </div>
                      
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div className="text-xs text-yellow-700 dark:text-yellow-300 mb-1">✅ Perfect:</div>
                        <pre className="text-xs bg-gray-900 text-gray-100 p-2 rounded">
                          {`useEffect(() => {
  console.log(counter);
}, [counter]);`}
                        </pre>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          Exact dependency - runs when needed
                        </div>
                      </div>
                      
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <div className="text-xs text-red-700 dark:text-red-300 mb-1">⚠️ Problem:</div>
                        <pre className="text-xs bg-gray-900 text-gray-100 p-2 rounded">
                          {`useEffect(() => {
  console.log(counter);
}, [counter, unrelated]);`}
                        </pre>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          Extra dependency - unnecessary re-runs
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Real-World Analogy</h4>
                  <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                    <p className="text-gray-700 dark:text-gray-300">
                      Think of Tuhina managing the Barrackpore classroom lights:
                    </p>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300 mt-2">
                      <li className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span><strong>Missing dependency:</strong> Lights turn on only at 9 AM, even if class starts earlier</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-yellow-500 mr-2">•</span>
                        <span><strong>Exact dependency:</strong> Lights turn on when first student arrives</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2">•</span>
                        <span><strong>Extra dependency:</strong> Lights turn on every time anyone enters, even if just passing by</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Dependency Strategy Comparison */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.0s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mr-3">
                  <span className="text-lg">⚖️</span>
                </span>
                Dependency Strategy Comparison
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-900">
                      <th className="p-3 text-left text-gray-900 dark:text-white font-semibold">Strategy</th>
                      <th className="p-3 text-left text-gray-900 dark:text-white font-semibold">Code</th>
                      <th className="p-3 text-left text-gray-900 dark:text-white font-semibold">Pros</th>
                      <th className="p-3 text-left text-gray-900 dark:text-white font-semibold">Cons</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dependencyStrategies.map((strategy, index) => (
                      <tr 
                        key={index}
                        className={clsx(
                          "border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors",
                          index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-900/30"
                        )}
                      >
                        <td className="p-3 font-semibold text-gray-900 dark:text-white">
                          {strategy.strategy}
                        </td>
                        <td className="p-3">
                          <code className="text-sm bg-gray-900 text-gray-100 px-2 py-1 rounded">
                            {strategy.code}
                          </code>
                        </td>
                        <td className="p-3">
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {strategy.pros.map((pro, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-green-500 mr-2">✓</span>
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="p-3">
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            {strategy.cons.map((con, i) => (
                              <li key={i} className="flex items-start">
                                <span className="text-red-500 mr-2">✗</span>
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Professional Rule</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Always use the ESLint exhaustive-deps rule.</strong> It will tell you exactly 
                  which dependencies you're missing. Follow its suggestions unless you have a very good reason not to.
                </p>
              </div>
            </section>

            {/* Common Dependency Mistakes */}
            <section className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.1s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-3">
                  <span className="text-lg">⚠️</span>
                </span>
                Common Dependency Mistakes
              </h3>
              
              <div className="space-y-4">
                {commonMistakes.map((mistake, index) => (
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
                        <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded-lg mb-3 overflow-x-auto">
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
              
              <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-2">
                  Tip from Ichapur Classroom
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">
                  When Debangshu's search was making too many API calls, we discovered he had 
                  <code>[searchTerm]</code> without debouncing. The fix? Add a 500ms delay before 
                  calling the API.
                </p>
              </div>
            </section>
          </div>

          {/* Right Column - Interactive Examples */}
          <div className="space-y-8">
            {/* Dependency Mode Selector */}
            <section className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.0s_ease-out]">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Dependency Mode Playground
              </h3>
              
              {/* Mode Selector */}
              <div className="mb-8">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Select Dependency Mode</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {dependencyModes.map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setDependencyMode(mode.id)}
                      className={clsx(
                        "p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105",
                        dependencyMode === mode.id 
                          ? "scale-105 ring-2 ring-offset-2 ring-blue-500 bg-white dark:bg-gray-800"
                          : "hover:shadow-md",
                        mode.border,
                        dependencyMode === mode.id ? "" : mode.color
                      )}
                    >
                      <div className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                        {mode.name}
                      </div>
                      <div className="text-[10px] text-gray-600 dark:text-gray-400 mt-1 truncate">
                        {mode.example}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Current State Display */}
              <div className="mb-8 p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Current State Values</h4>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">{counter}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Counter</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {searchTerm || '(empty)'}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Search Term</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{filter}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Filter</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl">
                    <div className="text-center">
                      <div className="text-lg font-bold text-orange-600 dark:text-orange-400">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">User Name</div>
                    </div>
                  </div>
                </div>
                
                {/* Control Buttons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button
                    onClick={updateCounter}
                    className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    Increment Counter
                  </button>
                  
                  <button
                    onClick={updateUserName}
                    className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-300"
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
                    onClick={createNewUserObject}
                    className="py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    New User Object
                  </button>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    onClick={addItem}
                    className="py-2 px-4 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    Add Item
                  </button>
                  
                  <button
                    onClick={resetLogs}
                    className="py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    Reset Logs
                  </button>
                </div>
              </div>
              
              {/* Search and Filter Controls */}
              <div className="mb-8 p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">Search & Filter</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Search Term
                    </label>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Type to search..."
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex justify-between mt-2">
                      <button
                        onClick={clearSearch}
                        className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                      >
                        Clear Search
                      </button>
                      {dependencyMode === 'debounced' && (
                        <div className="text-sm text-yellow-600 dark:text-yellow-400">
                          Debounced: {debouncedSearch || '(none)'}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Filter by Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['all', 'fruit', 'bakery', 'dairy'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setFilter(cat)}
                          className={clsx(
                            "px-3 py-1 rounded-lg transition-colors",
                            filter === cat
                              ? "bg-purple-500 text-white"
                              : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200"
                          )}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Validation Display */}
                  {dependencyMode === 'validation' && validationError && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-700">
                      <div className="text-sm font-semibold text-red-700 dark:text-red-400">
                        Validation Error:
                      </div>
                      <div className="text-sm text-red-600 dark:text-red-400">
                        {validationError}
                      </div>
                    </div>
                  )}
                  
                  {/* Derived State Display */}
                  {dependencyMode === 'derived' && (
                    <div className="p-3 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-700">
                      <div className="text-sm font-semibold text-teal-700 dark:text-teal-400 mb-2">
                        Filtered Items (useMemo):
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {filteredItems.length} items match search & filter
                      </div>
                      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Memoized value recalculates when searchTerm or filter changes
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Current Mode Details */}
              <div className="p-6 bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4">
                  {currentMode.name} Details
                </h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Description:
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {currentMode.description}
                    </p>
                  </div>
                  
                  <div>
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Code Example:
                    </div>
                    <pre className="text-sm bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
{`useEffect(() => {
  // Effect logic here
  console.log('Effect running...');
  
  return () => {
    // Cleanup logic (optional)
  };
}, ${currentMode.example}); // Dependencies listed here`}
                    </pre>
                  </div>
                  
                  <div>
                    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      When Effect Runs:
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      This effect runs when any value in {currentMode.example} changes.
                      {dependencyMode === 'object' && " (Compares object reference)"}
                      {dependencyMode === 'debounced' && " (With 500ms debounce delay)"}
                      {dependencyMode === 'api' && " (And triggers API call)"}
                    </p>
                  </div>
                </div>
              </div>
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
                              log.color === 'purple' && "bg-purple-500",
                              log.color === 'orange' && "bg-orange-500",
                              log.color === 'blue' && "bg-blue-500",
                              log.color === 'yellow' && "bg-yellow-500",
                              log.color === 'pink' && "bg-pink-500",
                              log.color === 'red' && "bg-red-500",
                              log.color === 'teal' && "bg-teal-500"
                            )}></div>
                            <div>
                              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {log.mode}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                                Run #{log.run}
                              </span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {log.timestamp}
                          </div>
                        </div>
                        
                        <div className="ml-6">
                          <div className="text-sm text-gray-700 dark:text-gray-300">
                            {log.description}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            Dependencies: <code>{log.deps}</code>
                            {log.changedCount > 0 && (
                              <span className="ml-2 text-green-600 dark:text-green-400">
                                ({log.changedCount} changed)
                              </span>
                            )}
                          </div>
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
                <div>
                  Mode: <span className="font-semibold">{dependencyMode}</span>
                </div>
              </div>
            </section>

            {/* Dependency Visualization */}
            <section className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-[fadeInUp_1.2s_ease-out]">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Dependency Change Detection
              </h3>
              
              <div className="space-y-6">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">How React Compares Dependencies</h4>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-100 dark:bg-gray-900/50 rounded-lg">
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Previous Dependencies
                        </div>
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400">
                          {dependencyVisualization.prev.length > 0 
                            ? JSON.stringify(dependencyVisualization.prev)
                            : '(none)'
                          }
                        </div>
                      </div>
                      
                      <div className="p-3 bg-gray-100 dark:bg-gray-900/50 rounded-lg">
                        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Current Dependencies
                        </div>
                        <div className="text-xs font-mono text-gray-600 dark:text-gray-400">
                          {dependencyVisualization.current.length > 0 
                            ? JSON.stringify(dependencyVisualization.current)
                            : '(none)'
                          }
                        </div>
                      </div>
                    </div>
                    
                    {dependencyVisualization.changed.length > 0 && (
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div className="text-sm font-semibold text-yellow-700 dark:text-yellow-400 mb-2">
                          Changed Dependencies ({dependencyVisualization.changed.length})
                        </div>
                        <div className="space-y-2">
                          {dependencyVisualization.changed.map((change, index) => (
                            <div key={index} className="text-xs text-gray-600 dark:text-gray-400">
                              Index {change.index}: 
                              <span className="line-through text-red-500 dark:text-red-400 ml-2">
                                {JSON.stringify(change.prev)}
                              </span>
                              <span className="mx-2">→</span>
                              <span className="text-green-500 dark:text-green-400">
                                {JSON.stringify(change.current)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-sm font-semibold text-blue-700 dark:text-blue-400 mb-2">
                        React's Comparison Logic
                      </div>
                      <pre className="text-xs bg-gray-900 text-gray-100 p-3 rounded overflow-x-auto">
{`// Simplified version of React's dependency comparison
function areDependenciesEqual(prevDeps, nextDeps) {
  if (prevDeps.length !== nextDeps.length) return false;
  
  for (let i = 0; i < prevDeps.length; i++) {
    // Uses Object.is() for comparison
    if (!Object.is(prevDeps[i], nextDeps[i])) {
      return false; // Effect will run
    }
  }
  
  return true; // Effect will skip
}`}
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">Object.is() Comparison</h4>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div>
                      <div className="font-semibold mb-2">Same values:</div>
                      <div className="space-y-1">
                        <div><code>Object.is(5, 5)</code> → true</div>
                        <div><code>Object.is('hi', 'hi')</code> → true</div>
                        <div><code>Object.is(true, true)</code> → true</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-semibold mb-2">Different references:</div>
                      <div className="space-y-1">
                        <div><code>Object.is({}, {})</code> → false</div>
                        <div><code>Object.is([], [])</code> → false</div>
                        <div><code>Object.is(() => {}, () => {})</code> → false</div>
                      </div>
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
                    The Dependency Mindset Shift:
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    When Swadeep from Ichapur asked why his form validation was running on every keystroke, 
                    we discovered he was watching the entire form object. The fix? Watch only 
                    <code>[form.name, form.email]</code> instead of <code>[form]</code>.
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                    Remember: <strong>Be specific about what you depend on.</strong> Don't watch everything when you only need a few things.
                  </p>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  After 27 years of optimizing applications, I can tell you that precise dependency 
                  management is the #1 performance optimization in React. The student from Barrackpore 
                  who made their app 10x faster? They learned to use specific dependencies.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  <strong>Professional Insight:</strong> In enterprise applications, we follow these rules:
                </p>
                
                <ul className="space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">1.</span>
                    <span><strong>Use the ESLint rule religiously</strong> - it's your safety net</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">2.</span>
                    <span><strong>Watch specific properties, not entire objects</strong> - unless you need everything</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">3.</span>
                    <span><strong>Memoize with useCallback/useMemo</strong> for stable references</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-500 mr-2">4.</span>
                    <span><strong>Debounce expensive operations</strong> like search and validation</span>
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
              <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Dependency Comparison Exercise</h5>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Compare these two modes to understand the difference:
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-900/50 rounded-lg">
                  <div className="font-semibold text-gray-900 dark:text-white mb-2">
                    1. Object Mode
                  </div>
                  <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li>Select "Object Dependency" mode</li>
                    <li>Click "New User Object"</li>
                    <li>Watch effect run (new reference)</li>
                    <li>Click "Change User Name"</li>
                    <li>Watch effect run (new reference again)</li>
                  </ol>
                </div>
                
                <div className="p-3 bg-gray-100 dark:bg-gray-900/50 rounded-lg">
                  <div className="font-semibold text-gray-900 dark:text-white mb-2">
                    2. Properties Mode
                  </div>
                  <ol className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                    <li>Select "Object Properties" mode</li>
                    <li>Click "New User Object"</li>
                    <li>Watch effect skip (same name/age)</li>
                    <li>Click "Change User Name"</li>
                    <li>Watch effect run (name changed)</li>
                  </ol>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Critical Question:</strong> In "Debounced Effect" mode, type quickly in the search box. 
                What happens to the effect runs?
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1">
                <li>• Does it run on every keystroke?</li>
                <li>• Or does it wait until you stop typing?</li>
                <li>• How many API calls would this save?</li>
              </ul>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Try this:</strong> Switch to "API Call" mode and type in the search box. 
              Notice how each keystroke triggers a (simulated) API call. Now switch to "Debounced Effect" 
              mode and type again. See the difference?
            </p>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 animate-[fadeInUp_1.5s_ease-out]">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <span className="text-green-600 dark:text-green-400">✅</span>
            </div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-3">When to Use Specific Dependencies</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Data fetching when search term changes</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Form validation when fields change</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Updating UI when filters change</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>Synchronizing with external data</span>
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
                <span>List all values effect uses (ESLint rule)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Prefer specific properties over entire objects</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Memoize objects/functions with useMemo/useCallback</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Debounce expensive operations</span>
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
                <span>Missing dependencies (stale closures)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Extra dependencies (unnecessary re-runs)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Inline functions/objects (new references)</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>No debouncing for frequent updates</span>
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

export default Topic34;