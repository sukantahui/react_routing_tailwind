import { useState, useEffect, useMemo, useCallback } from 'react';
import clsx from 'clsx';

const Topic42 = () => {
  // Stored State Examples
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'React Course', price: 2999, quantity: 1 },
    { id: 2, name: 'JavaScript Book', price: 899, quantity: 2 },
    { id: 3, name: 'TypeScript Guide', price: 499, quantity: 1 },
  ]);
  
  const [userPreferences, setUserPreferences] = useState({
    theme: 'dark',
    fontSize: 'medium',
    notifications: true,
    autoSave: false,
  });
  
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 5000],
    rating: 0,
    inStock: false,
  });
  
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React Hooks', completed: true, priority: 'high' },
    { id: 2, text: 'Master State Management', completed: false, priority: 'medium' },
    { id: 3, text: 'Practice Conditional Rendering', completed: false, priority: 'high' },
    { id: 4, text: 'Study useEffect Patterns', completed: true, priority: 'low' },
    { id: 5, text: 'Build Real Project', completed: false, priority: 'high' },
  ]);
  
  const [newTodo, setNewTodo] = useState('');
  const [activeExample, setActiveExample] = useState('cart');
  const [shouldRecompute, setShouldRecompute] = useState(false);

  // Derived State Examples (Computed from stored state)
  
  // 1. Cart Totals - Derived from cartItems
  const cartTotals = useMemo(() => {
    console.log('🔄 Recomputing cart totals...');
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.18; // 18% GST
    const shipping = subtotal > 2000 ? 0 : 99;
    const total = subtotal + tax + shipping;
    
    return {
      subtotal,
      tax,
      shipping,
      total,
      itemCount: cartItems.reduce((count, item) => count + item.quantity, 0),
      uniqueItems: cartItems.length,
    };
  }, [cartItems, shouldRecompute]); // Only recompute when cartItems change

  // 2. Filtered Todos - Derived from todos and filters
  const filteredTodos = useMemo(() => {
    console.log('🔄 Filtering todos...');
    let result = [...todos];
    
    if (filters.category !== 'all') {
      result = result.filter(todo => todo.priority === filters.category);
    }
    
    if (filters.rating > 0) {
      // Simulating rating filter (not used in todos, just for demo)
      result = result.filter(todo => todo.id % 2 === 0); // Mock logic
    }
    
    if (filters.inStock) {
      // Simulating inStock filter
      result = result.filter(todo => !todo.completed); // Only show incomplete
    }
    
    return result;
  }, [todos, filters, shouldRecompute]);

  // 3. User Stats - Derived from todos
  const todoStats = useMemo(() => {
    console.log('🔄 Computing todo statistics...');
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? (completed / total) * 100 : 0;
    
    // Priority distribution
    const highPriority = todos.filter(t => t.priority === 'high').length;
    const mediumPriority = todos.filter(t => t.priority === 'medium').length;
    const lowPriority = todos.filter(t => t.priority === 'low').length;
    
    return {
      total,
      completed,
      pending,
      completionRate: Math.round(completionRate),
      highPriority,
      mediumPriority,
      lowPriority,
    };
  }, [todos, shouldRecompute]);

  // 4. Formatted Preferences - Derived from userPreferences
  const formattedPreferences = useMemo(() => {
    console.log('🔄 Formatting preferences...');
    return {
      theme: userPreferences.theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode',
      fontSize: userPreferences.fontSize === 'small' ? 'Small (12px)' : 
                userPreferences.fontSize === 'medium' ? 'Medium (16px)' : 'Large (20px)',
      notifications: userPreferences.notifications ? '🔔 Enabled' : '🔕 Disabled',
      autoSave: userPreferences.autoSave ? '💾 Auto-save ON' : '💾 Auto-save OFF',
    };
  }, [userPreferences, shouldRecompute]);

  // 5. Expensive Calculation (simulated)
  const expensiveCalculation = useMemo(() => {
    console.log('🧮 Performing expensive calculation...');
    // Simulate expensive computation
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(i) * Math.random();
    }
    return {
      computedValue: Math.round(result % 1000),
      timestamp: new Date().toLocaleTimeString(),
    };
  }, [todos.length, shouldRecompute]); // Only depends on todo count

  // Bad Practice: Storing derived state (anti-pattern)
  const [storedTotal, setStoredTotal] = useState(0);
  const [storedCompletedCount, setStoredCompletedCount] = useState(0);

  // This effect demonstrates the anti-pattern of syncing derived state
  useEffect(() => {
    console.log('⚠️ Anti-pattern: Syncing derived state to stored state');
    const completedCount = todos.filter(t => t.completed).length;
    setStoredCompletedCount(completedCount);
    
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setStoredTotal(total);
  }, [todos, cartItems]);

  // Helper functions
  const addToCart = () => {
    const newItem = {
      id: cartItems.length + 1,
      name: `Item ${cartItems.length + 1}`,
      price: Math.floor(Math.random() * 1000) + 100,
      quantity: 1,
    };
    setCartItems([...cartItems, newItem]);
  };

  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const addTodo = () => {
    if (!newTodo.trim()) return;
    
    const newTodoItem = {
      id: todos.length + 1,
      text: newTodo,
      completed: false,
      priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
    };
    
    setTodos([...todos, newTodoItem]);
    setNewTodo('');
  };

  const updatePreference = (key, value) => {
    setUserPreferences(prev => ({ ...prev, [key]: value }));
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const forceRecompute = () => {
    setShouldRecompute(!shouldRecompute);
  };

  const resetExamples = () => {
    setCartItems([
      { id: 1, name: 'React Course', price: 2999, quantity: 1 },
      { id: 2, name: 'JavaScript Book', price: 899, quantity: 2 },
      { id: 3, name: 'TypeScript Guide', price: 499, quantity: 1 },
    ]);
    setTodos([
      { id: 1, text: 'Learn React Hooks', completed: true, priority: 'high' },
      { id: 2, text: 'Master State Management', completed: false, priority: 'medium' },
      { id: 3, text: 'Practice Conditional Rendering', completed: false, priority: 'high' },
      { id: 4, text: 'Study useEffect Patterns', completed: true, priority: 'low' },
      { id: 5, text: 'Build Real Project', completed: false, priority: 'high' },
    ]);
    setUserPreferences({
      theme: 'dark',
      fontSize: 'medium',
      notifications: true,
      autoSave: false,
    });
    setFilters({
      category: 'all',
      priceRange: [0, 5000],
      rating: 0,
      inStock: false,
    });
    setNewTodo('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div 
          className="mb-8 animate-[fadeIn_0.8s_ease-out]"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            <span className="text-blue-600 dark:text-blue-400">Derived</span> vs{" "}
            <span className="text-green-600 dark:text-green-400">Stored</span> State
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Understanding when to compute values vs when to store them in React
          </p>
        </div>

        {/* Concept Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Stored State */}
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 animate-[slideUp_0.6s_ease-out]"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
              <span className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-3">💾</span>
              Stored State
            </h2>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                State that you explicitly manage using <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">useState</code> or <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">useReducer</code>. It represents the "source of truth" in your component.
              </p>
              
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 p-4">
                <strong className="block mb-2 text-green-800 dark:text-green-300">When to Store:</strong>
                <ul className="list-disc pl-4 space-y-1">
                  <li>User input (form fields, selections)</li>
                  <li>Data fetched from APIs</li>
                  <li>Application settings/preferences</li>
                  <li>Items in a list (todos, cart items)</li>
                  <li>Anything that changes via user interaction</li>
                </ul>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <strong className="block mb-2">Characteristics:</strong>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Directly mutable via setState
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Triggers re-renders when updated
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    Source of truth for the component
                  </li>
                </ul>
              </div>
            </div>

            {/* Examples */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">Examples:</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">Form Inputs</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <code>const [email, setEmail] = useState('')</code>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">API Data</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <code>const [users, setUsers] = useState([])</code>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">UI State</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <code>const [isOpen, setIsOpen] = useState(false)</code>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">Cart Items</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <code>const [cart, setCart] = useState([])</code>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Derived State */}
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 animate-[slideUp_0.6s_ease-out_0.2s]"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
              <span className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">🧮</span>
              Derived State
            </h2>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Values computed from existing state or props, typically using <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">useMemo</code> or computed during render.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4">
                <strong className="block mb-2 text-blue-800 dark:text-blue-300">When to Derive:</strong>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Calculations (totals, averages, counts)</li>
                  <li>Filtered/sorted lists</li>
                  <li>Formatted/transformed data</li>
                  <li>Boolean flags based on state</li>
                  <li>Any value that can be computed from existing state</li>
                </ul>
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <strong className="block mb-2">Characteristics:</strong>
                <ul className="space-y-1 text-sm">
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">⚡</span>
                    Computed from existing state/props
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">⚡</span>
                    Should be cached with useMemo for expensive calculations
                  </li>
                  <li className="flex items-center">
                    <span className="text-blue-500 mr-2">⚡</span>
                    Automatically stays in sync with source state
                  </li>
                </ul>
              </div>
            </div>

            {/* Examples */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">Examples:</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">Cart Total</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <code>const total = cart.reduce(...)</code>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">Filtered List</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <code>const filtered = todos.filter(...)</code>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">Formatted Date</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <code>const formatted = format(date)</code>
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">Boolean Flag</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    <code>const isEmpty = items.length === 0</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Comparison */}
        <div className="mb-12 bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center animate-[fadeIn_0.8s_ease-out_0.4s]">
            <span className="bg-gradient-to-r from-blue-500 to-green-500 p-3 rounded-xl mr-4 text-white">📊</span>
            State Flow Visualization
          </h2>
          
          <div className="relative h-48 mb-6">
            {/* Flow Diagram */}
            <svg width="100%" height="100%" viewBox="0 0 600 180" className="overflow-visible">
              {/* Stored State */}
              <g className="hover:scale-105 transition-transform duration-300">
                <rect x="50" y="60" width="120" height="60" rx="8" 
                  fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="2" />
                <text x="110" y="90" textAnchor="middle" className="text-sm font-semibold fill-gray-800 dark:fill-gray-100">
                  Stored State
                </text>
                <text x="110" y="105" textAnchor="middle" className="text-xs fill-green-600">
                  cartItems, todos
                </text>
              </g>
              
              {/* Arrow to Derived */}
              <path d="M 175 90 L 225 90" stroke="#9CA3AF" strokeWidth="2" />
              <polygon points="225,90 215,85 215,95" fill="#9CA3AF" />
              <text x="200" y="85" textAnchor="middle" className="text-xs fill-gray-500">
                Computed
              </text>
              
              {/* Derived State */}
              <g className="hover:scale-105 transition-transform duration-300">
                <rect x="250" y="60" width="120" height="60" rx="8" 
                  fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="2" />
                <text x="310" y="90" textAnchor="middle" className="text-sm font-semibold fill-gray-800 dark:fill-gray-100">
                  Derived State
                </text>
                <text x="310" y="105" textAnchor="middle" className="text-xs fill-blue-600">
                  totals, filtered
                </text>
              </g>
              
              {/* Arrow to UI */}
              <path d="M 375 90 L 425 90" stroke="#9CA3AF" strokeWidth="2" />
              <polygon points="425,90 415,85 415,95" fill="#9CA3AF" />
              <text x="400" y="85" textAnchor="middle" className="text-xs fill-gray-500">
                Rendered
              </text>
              
              {/* UI Display */}
              <g className="hover:scale-105 transition-transform duration-300">
                <rect x="450" y="60" width="120" height="60" rx="8" 
                  fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="2" />
                <text x="510" y="90" textAnchor="middle" className="text-sm font-semibold fill-gray-800 dark:fill-gray-100">
                  UI Display
                </text>
                <text x="510" y="105" textAnchor="middle" className="text-xs fill-yellow-600">
                  Components
                </text>
              </g>
              
              {/* Anti-pattern Arrow */}
              <g>
                <path d="M 510 125 L 510 150 L 110 150 L 110 125" 
                  stroke="#EF4444" strokeWidth="2" strokeDasharray="4,4" fill="none" />
                <text x="310" y="145" textAnchor="middle" className="text-xs fill-red-500 font-medium">
                  Anti-pattern: Storing derived values
                </text>
              </g>
              
              {/* Update Triggers */}
              <g>
                <circle cx="110" cy="30" r="15" fill="#8B5CF6" fillOpacity="0.3" stroke="#8B5CF6" strokeWidth="2" />
                <text x="110" y="35" textAnchor="middle" className="text-xs font-semibold fill-gray-800 dark:fill-gray-100">
                  Update
                </text>
                
                <path d="M 110 45 L 110 55" stroke="#8B5CF6" strokeWidth="2" />
                <text x="110" y="50" textAnchor="middle" className="text-[10px] fill-purple-500">
                  setState()
                </text>
              </g>
              
              {/* Re-render Trigger */}
              <g>
                <path d="M 310 125 L 310 150 L 510 150 L 510 125" 
                  stroke="#10B981" strokeWidth="2" strokeDasharray="4,4" fill="none" />
                <text x="410" y="145" textAnchor="middle" className="text-xs fill-green-500 font-medium">
                  Automatic re-computation
                </text>
              </g>
            </svg>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">Source of Truth</div>
              <div className="font-bold text-lg">{cartItems.length + todos.length} items</div>
            </div>
            
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Derived Values</div>
              <div className="font-bold text-lg">6 calculations</div>
            </div>
            
            <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-sm font-medium text-yellow-700 dark:text-yellow-300 mb-1">Performance</div>
              <div className="font-bold text-lg">
                {expensiveCalculation.timestamp.split(':')[2]}
              </div>
            </div>
          </div>
        </div>

        {/* Examples Tabs */}
        <div className="mb-8">
          <div className="flex space-x-2 mb-6 overflow-x-auto">
            {['cart', 'todos', 'preferences', 'anti-pattern'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveExample(tab)}
                className={clsx(
                  "px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap",
                  activeExample === tab
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
              >
                {tab === 'cart' && '🛒 Cart Example'}
                {tab === 'todos' && '📝 Todos Example'}
                {tab === 'preferences' && '⚙️ Preferences'}
                {tab === 'anti-pattern' && '🚫 Anti-Pattern'}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            {activeExample === 'cart' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    🛒 Shopping Cart Example
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={addToCart}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300"
                    >
                      + Add Item
                    </button>
                    <button
                      onClick={clearCart}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-300"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Cart Items (Stored State) */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                      <span className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-2">💾</span>
                      Stored State: Cart Items
                    </h4>
                    
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {cartItems.map(item => (
                        <div 
                          key={item.id}
                          className="p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-bold text-gray-800 dark:text-gray-200">{item.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                ₹{item.price.toLocaleString()}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
                              >
                                -
                              </button>
                              <span className="font-bold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {cartItems.length === 0 && (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                          <div className="text-2xl mb-2">🛒</div>
                          Cart is empty
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Cart Totals (Derived State) */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                      <span className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-2">🧮</span>
                      Derived State: Cart Totals
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-sm text-gray-500 dark:text-gray-500">Items</div>
                          <div className="font-bold text-lg">{cartTotals.itemCount}</div>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                          <div className="text-sm text-gray-500 dark:text-gray-500">Unique</div>
                          <div className="font-bold text-lg">{cartTotals.uniqueItems}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span className="font-bold">₹{cartTotals.subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>GST (18%):</span>
                          <span>₹{cartTotals.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping:</span>
                          <span className={cartTotals.shipping === 0 ? "text-green-500" : ""}>
                            {cartTotals.shipping === 0 ? "FREE" : `₹${cartTotals.shipping}`}
                          </span>
                        </div>
                        <div className="border-t border-gray-300 dark:border-gray-600 pt-2 mt-2">
                          <div className="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span className="text-blue-600 dark:text-blue-400">
                              ₹{cartTotals.total.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-sm text-blue-700 dark:text-blue-300">
                          💡 These values are computed from cartItems. If cartItems change, totals automatically update.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeExample === 'todos' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    📝 Todo List Example
                  </h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                      placeholder="Add new todo..."
                      className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    />
                    <button
                      onClick={addTodo}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-300"
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Todo List (Stored State) */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                      <span className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-2">💾</span>
                      Stored State: Todos
                    </h4>
                    
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {todos.map(todo => (
                        <div 
                          key={todo.id}
                          className="p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={todo.completed}
                              onChange={() => toggleTodo(todo.id)}
                              className="mr-3 h-5 w-5 rounded border-gray-300"
                            />
                            <div>
                              <div className={clsx(
                                "font-medium",
                                todo.completed 
                                  ? "text-gray-500 dark:text-gray-500 line-through"
                                  : "text-gray-800 dark:text-gray-200"
                              )}>
                                {todo.text}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-500">
                                Priority: {todo.priority}
                              </div>
                            </div>
                          </div>
                          <span className={clsx(
                            "px-2 py-1 text-xs rounded-full",
                            todo.priority === 'high' && "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300",
                            todo.priority === 'medium' && "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300",
                            todo.priority === 'low' && "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                          )}>
                            {todo.priority}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Todo Stats (Derived State) */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                      <span className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-2">📊</span>
                      Derived State: Statistics
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center">
                          <div className="text-2xl font-bold">{todoStats.total}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-500">Total</div>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center">
                          <div className="text-2xl font-bold text-green-500">{todoStats.completed}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-500">Completed</div>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center">
                          <div className="text-2xl font-bold text-yellow-500">{todoStats.pending}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-500">Pending</div>
                        </div>
                        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg text-center">
                          <div className="text-2xl font-bold">{todoStats.completionRate}%</div>
                          <div className="text-sm text-gray-500 dark:text-gray-500">Done</div>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h5 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Priority Distribution:</h5>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <div className="w-24 text-sm text-gray-600 dark:text-gray-400">High:</div>
                            <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div 
                                className="bg-red-500 h-2 rounded-full"
                                style={{ width: `${(todoStats.highPriority / todoStats.total) * 100}%` }}
                              ></div>
                            </div>
                            <div className="ml-2 text-sm font-medium">{todoStats.highPriority}</div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-24 text-sm text-gray-600 dark:text-gray-400">Medium:</div>
                            <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div 
                                className="bg-yellow-500 h-2 rounded-full"
                                style={{ width: `${(todoStats.mediumPriority / todoStats.total) * 100}%` }}
                              ></div>
                            </div>
                            <div className="ml-2 text-sm font-medium">{todoStats.mediumPriority}</div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-24 text-sm text-gray-600 dark:text-gray-400">Low:</div>
                            <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${(todoStats.lowPriority / todoStats.total) * 100}%` }}
                              ></div>
                            </div>
                            <div className="ml-2 text-sm font-medium">{todoStats.lowPriority}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Filters & Filtered Todos (Derived) */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                      <span className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-2">🔍</span>
                      Derived State: Filtered Todos
                    </h4>
                    
                    <div className="mb-4">
                      <h5 className="font-medium mb-2 text-gray-800 dark:text-gray-200">Filters:</h5>
                      <div className="space-y-2">
                        <select
                          value={filters.category}
                          onChange={(e) => updateFilter('category', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                        >
                          <option value="all">All Priorities</option>
                          <option value="high">High Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="low">Low Priority</option>
                        </select>
                        
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={filters.inStock}
                            onChange={(e) => updateFilter('inStock', e.target.checked)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Show only incomplete</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h5 className="font-medium mb-2 text-gray-800 dark:text-gray-200">
                        Filtered Results: {filteredTodos.length} items
                      </h5>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {filteredTodos.map(todo => (
                          <div 
                            key={todo.id}
                            className="p-2 bg-white dark:bg-gray-800 rounded-lg text-sm"
                          >
                            <div className="flex items-center justify-between">
                              <span className={todo.completed ? "line-through text-gray-500" : ""}>
                                {todo.text}
                              </span>
                              <span className="text-xs text-gray-500">{todo.priority}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeExample === 'preferences' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                  ⚙️ User Preferences Example
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Preferences Editor (Stored State) */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                      <span className="bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-2">💾</span>
                      Stored State: Raw Preferences
                    </h4>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Theme:
                        </label>
                        <div className="flex space-x-2">
                          {['light', 'dark', 'auto'].map(theme => (
                            <button
                              key={theme}
                              onClick={() => updatePreference('theme', theme)}
                              className={clsx(
                                "px-4 py-2 rounded-lg transition-colors duration-300",
                                userPreferences.theme === theme
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
                              )}
                            >
                              {theme}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Font Size:
                        </label>
                        <div className="flex space-x-2">
                          {['small', 'medium', 'large'].map(size => (
                            <button
                              key={size}
                              onClick={() => updatePreference('fontSize', size)}
                              className={clsx(
                                "px-4 py-2 rounded-lg transition-colors duration-300",
                                userPreferences.fontSize === size
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
                              )}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={userPreferences.notifications}
                            onChange={(e) => updatePreference('notifications', e.target.checked)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-gray-700 dark:text-gray-300">Enable Notifications</span>
                        </label>
                        
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={userPreferences.autoSave}
                            onChange={(e) => updatePreference('autoSave', e.target.checked)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-gray-700 dark:text-gray-300">Auto-save Changes</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Formatted Display (Derived State) */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                      <span className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-2">🎨</span>
                      Derived State: Formatted Display
                    </h4>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <h5 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Current Settings:</h5>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <div className="w-32 text-gray-600 dark:text-gray-400">Theme:</div>
                            <div className="font-medium">{formattedPreferences.theme}</div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-32 text-gray-600 dark:text-gray-400">Font Size:</div>
                            <div className="font-medium">{formattedPreferences.fontSize}</div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-32 text-gray-600 dark:text-gray-400">Notifications:</div>
                            <div className={clsx(
                              "font-medium",
                              userPreferences.notifications ? "text-green-500" : "text-gray-500"
                            )}>
                              {formattedPreferences.notifications}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-32 text-gray-600 dark:text-gray-400">Auto-save:</div>
                            <div className={clsx(
                              "font-medium",
                              userPreferences.autoSave ? "text-green-500" : "text-gray-500"
                            )}>
                              {formattedPreferences.autoSave}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-sm text-blue-700 dark:text-blue-300">
                          💡 The formatted display is derived from raw preferences. If preferences change, the display automatically updates without additional state.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeExample === 'anti-pattern' && (
              <div>
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-6">
                  🚫 Anti-Pattern: Storing Derived State
                </h3>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* The Problem */}
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-4 flex items-center">
                      ⚠️ The Problem
                    </h4>
                    
                    <div className="space-y-4">
                      <p className="text-red-600 dark:text-red-400">
                        Storing derived values in state creates synchronization issues. When source state changes, you must remember to update the derived state too.
                      </p>
                      
                      <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current anti-pattern in this component:</div>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <span className="text-red-500 mr-2">❌</span>
                            <code className="text-sm">storedCompletedCount: {storedCompletedCount}</code>
                            <span className="ml-2 text-xs text-gray-500">
                              (Should be: {todos.filter(t => t.completed).length})
                            </span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-500 mr-2">❌</span>
                            <code className="text-sm">storedTotal: {storedTotal}</code>
                            <span className="ml-2 text-xs text-gray-500">
                              (Should be: {cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)})
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <p className="text-sm text-yellow-700 dark:text-yellow-300">
                          These values are stored in state but computed from other state. They risk getting out of sync!
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* The Solution */}
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                    <h4 className="font-bold text-green-700 dark:text-green-300 mb-4 flex items-center">
                      ✅ The Solution
                    </h4>
                    
                    <div className="space-y-4">
                      <p className="text-green-600 dark:text-green-400">
                        Use <code>useMemo</code> to compute derived values. They automatically stay in sync with source state.
                      </p>
                      
                      <div className="bg-gray-800 rounded-lg p-4">
                        <pre className="text-sm text-gray-100 overflow-x-auto">
{`// ❌ ANTI-PATTERN: Storing derived state
const [completedCount, setCompletedCount] = useState(0);

useEffect(() => {
  // Need to sync manually
  setCompletedCount(todos.filter(t => t.completed).length);
}, [todos]);

// ✅ CORRECT: Computing derived value
const completedCount = useMemo(() => {
  return todos.filter(t => t.completed).length;
}, [todos]);`}
                        </pre>
                      </div>
                      
                      <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <div className="text-sm text-green-700 dark:text-green-300">
                          💡 Derived values should be computed, not stored. Use <code>useMemo</code> for expensive calculations.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Performance Section */}
        <div className="mb-12 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
            <span className="bg-purple-100 dark:bg-purple-900 p-3 rounded-xl mr-4">⚡</span>
            Performance Optimization
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Expensive Calculation</h4>
              <div className="space-y-3">
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400">Computed Value:</div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {expensiveCalculation.computedValue}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    Last computed: {expensiveCalculation.timestamp}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    This expensive calculation is memoized with <code>useMemo</code>
                  </div>
                  <button
                    onClick={forceRecompute}
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-300 text-sm"
                  >
                    Force Recompute
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
              <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">When to use useMemo</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full p-1 mr-3 mt-1">1</span>
                  <div>
                    <div className="font-medium">Expensive calculations</div>
                    <div className="text-sm text-gray-500 dark:text-gray-500">Avoid recomputing on every render</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full p-1 mr-3 mt-1">2</span>
                  <div>
                    <div className="font-medium">Referential equality</div>
                    <div className="text-sm text-gray-500 dark:text-gray-500">When passing to child components</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full p-1 mr-3 mt-1">3</span>
                  <div>
                    <div className="font-medium">Derived arrays/objects</div>
                    <div className="text-sm text-gray-500 dark:text-gray-500">Avoid creating new references</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="mb-12 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl p-6 animate-[fadeIn_0.8s_ease-out_0.8s]">
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-4 flex items-center">
            <span className="bg-red-100 dark:bg-red-900 p-3 rounded-xl mr-4">🚫</span>
            Common Derived State Mistakes
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">1. Storing Computed Values</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Swadeep stores <code>cartTotal</code> in state alongside <code>cartItems</code>. When he adds an item, he must update both states, risking inconsistency.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">2. Forgetting useMemo for Expensive Calculations</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Tuhina computes a complex statistical analysis during every render, slowing down her app unnecessarily.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">3. Overusing useMemo</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Debangshu wraps every calculation in <code>useMemo</code>, even simple ones like <code>items.length</code>, adding unnecessary overhead.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">4. Derived State Based on Derived State</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Abhronila creates complex chains of derived states, making the code hard to debug and understand.
              </p>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-12 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-2xl p-6 animate-[fadeIn_0.8s_ease-out_1s]">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-4 flex items-center">
            <span className="bg-green-100 dark:bg-green-900 p-3 rounded-xl mr-4">✅</span>
            Best Practices for State Management
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100">Store State When:</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">💾</span>
                  Data comes from user input (forms, clicks)
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">💾</span>
                  Data is fetched from API/server
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">💾</span>
                  Values need to be mutated independently
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">💾</span>
                  It's the source of truth for the component
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100">Derive State When:</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">🧮</span>
                  Values can be computed from existing state
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">🧮</span>
                  Calculations are expensive (use useMemo)
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">🧮</span>
                  Formatting/transforming data for display
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">🧮</span>
                  Creating filtered/sorted versions of arrays
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Teacher's Note */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 border-l-8 border-blue-500 dark:border-blue-400 rounded-2xl p-6 mb-12 hover:shadow-2xl transition-all duration-500 group">
          <div className="flex items-start">
            <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-xl mr-6 group-hover:rotate-12 transition-transform duration-300">
              <span className="text-3xl">👨‍🏫</span>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                Teacher's Note
              </h3>
              
              <div className="mb-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  <strong>Think of stored state as your raw ingredients and derived state as the prepared dish!</strong> Just like how Swadeep in Barrackpore doesn't store both vegetables AND curry separately, you shouldn't store both data AND its computed form.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  When Tuhina manages her todo list, she stores the todos (ingredients). She doesn't also store "completed count" separately—she counts completed todos whenever she needs that information (preparing the dish).
                </p>
                
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Remember:</strong> Every piece of stored state is a responsibility. More state means more things to keep in sync. Derive whenever possible—your future self will thank you when debugging!
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <div className="font-bold text-blue-600 dark:text-blue-400 mb-1">Professional Insight:</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    In 27 years, I've fixed countless bugs caused by storing derived state. The single most common bug: "Why is my total wrong?" Answer: Someone forgot to update the stored total when items changed.
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <div className="font-bold text-green-600 dark:text-green-400 mb-1">Debugging Tip:</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    When debugging state inconsistencies, ask: "Is this stored or derived?" If it's stored but computed from other state, you've found the problem.
                  </p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
                <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400">
                  <span className="mr-4"><strong>Sukanta Hui</strong></span>
                  <span className="mr-4">27 years experience</span>
                  <span>Web Development Expert</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hint Section */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800 mb-12">
          <h3 className="text-xl font-bold text-purple-700 dark:text-purple-300 mb-4 flex items-center">
            <span className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg mr-4">💡</span>
            Thinking Exercise
          </h3>
          
          <div className="space-y-4">
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Observe carefully:</strong> Check the console when you interact with the examples. Notice when derived values recompute. Why do they recompute only when specific dependencies change?
            </p>
            
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Try changing this:</strong> Go to the anti-pattern example and add a new todo. Does the stored completed count update? Why or why not?
            </p>
            
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Think about:</strong> In a real e-commerce app, what would be stored state (in database) vs derived state (computed on the fly)? List 5 examples of each.
            </p>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl p-6 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">📋 State Management Checklist</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-700/50 rounded-xl">
              <div className="text-3xl mb-3">💾</div>
              <h4 className="font-bold mb-2">Store When...</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>User provides input</li>
                <li>Data from API</li>
                <li>Independent values</li>
                <li>Source of truth</li>
              </ul>
            </div>
            
            <div className="text-center p-4 bg-gray-700/50 rounded-xl">
              <div className="text-3xl mb-3">🧮</div>
              <h4 className="font-bold mb-2">Derive When...</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Calculated from state</li>
                <li>Expensive computation</li>
                <li>Formatting display</li>
                <li>Filtering/sorting</li>
              </ul>
            </div>
            
            <div className="text-center p-4 bg-gray-700/50 rounded-xl">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-bold mb-2">Optimize With</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>useMemo for expensive</li>
                <li>useCallback for functions</li>
                <li>Memo for components</li>
                <li>Clean dependency arrays</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              <strong>Golden Rule:</strong> Store the minimum, derive the rest!
            </p>
          </div>
        </div>
        
        {/* Control Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={resetExamples}
            className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 font-medium"
          >
            🔄 Reset All Examples
          </button>
          <button
            onClick={forceRecompute}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors duration-300 font-medium"
          >
            ⚡ Force Recompute All
          </button>
        </div>
      </div>

      {/* Inline CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeIn_0\\.8s_ease-out\\],
          .animate-\\[slideUp_0\\.6s_ease-out\\],
          .animate-\\[slideUp_0\\.6s_ease-out_0\\.2s\\],
          .animate-\\[fadeIn_0\\.8s_ease-out_0\\.4s\\],
          .animate-\\[fadeIn_0\\.8s_ease-out_0\\.6s\\],
          .animate-\\[fadeIn_0\\.8s_ease-out_0\\.8s\\],
          .animate-\\[fadeIn_0\\.8s_ease-out_1s\\] {
            animation: none;
            opacity: 1;
            transform: none;
          }
          
          .group-hover\\:scale-110,
          .hover\\:scale-105,
          .group-hover\\:rotate-12 {
            transform: none;
          }
        }
        
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      `}</style>
    </div>
  );
};

export default Topic42;