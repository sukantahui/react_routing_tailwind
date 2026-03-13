import { useState } from 'react';
import clsx from 'clsx';

const Topic43 = () => {
  // Example 1: Temperature Converter (Sibling Components)
  const [celsius, setCelsius] = useState(0);
  
  // Example 2: Theme Switcher (Parent-Child)
  const [theme, setTheme] = useState('light');
  
  // Example 3: Shopping Cart (Multiple Children)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'React Book', price: 1299, quantity: 1 },
    { id: 2, name: 'JavaScript Guide', price: 899, quantity: 2 },
  ]);
  
  // Example 4: Form with Validation (Complex Form)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    subscription: 'basic',
  });
  
  const [activeExample, setActiveExample] = useState('temperature');
  const [showDiagram, setShowDiagram] = useState(true);

  // Temperature Converter Functions
  const handleCelsiusChange = (value) => {
    setCelsius(value);
  };

  const handleFahrenheitChange = (value) => {
    setCelsius((value - 32) * 5/9);
  };

  const celsiusToFahrenheit = (c) => (c * 9/5) + 32;
  const fahrenheit = celsiusToFahrenheit(celsius);

  // Cart Functions
  const addToCart = (item) => {
    setCartItems([...cartItems, { ...item, id: cartItems.length + 1, quantity: 1 }]);
  };

  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Form Functions
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form submitted:\nName: ${formData.name}\nEmail: ${formData.email}\nAge: ${formData.age}\nSubscription: ${formData.subscription}`);
  };

  // Reset all examples
  const resetExamples = () => {
    setCelsius(0);
    setTheme('light');
    setCartItems([
      { id: 1, name: 'React Book', price: 1299, quantity: 1 },
      { id: 2, name: 'JavaScript Guide', price: 899, quantity: 2 },
    ]);
    setFormData({
      name: '',
      email: '',
      age: '',
      subscription: 'basic',
    });
  };

  // Available products for cart
  const availableProducts = [
    { id: 3, name: 'TypeScript Course', price: 1999 },
    { id: 4, name: 'Node.js Handbook', price: 1499 },
    { id: 5, name: 'CSS Masterclass', price: 999 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div 
          className="mb-8 animate-[fadeIn_0.8s_ease-out]"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Intro to <span className="text-blue-600 dark:text-blue-400">Lifting State Up</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Sharing state between React components through their closest common ancestor
          </p>
        </div>

        {/* Concept Explanation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Theory */}
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 animate-[slideUp_0.6s_ease-out]"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
              <span className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">🔼</span>
              What is Lifting State Up?
            </h2>
            
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Lifting state up is the process of moving shared state from child components to their closest common parent component. This allows multiple components to access and update the same state.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-4">
                <strong className="block mb-2 text-blue-800 dark:text-blue-300">Key Concept:</strong>
                <p>"When several components need to share the same changing data, lift the shared state up to their closest common ancestor." - React Documentation</p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 dark:border-green-400 p-4">
                <strong className="block mb-2 text-green-800 dark:text-green-300">Why Lift State Up?</strong>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Maintain a single source of truth</li>
                  <li>Keep components in sync</li>
                  <li>Avoid prop drilling through many levels</li>
                  <li>Simplify data flow</li>
                  <li>Make state easier to debug</li>
                </ul>
              </div>
            </div>

            {/* When to Lift State */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">When to Lift State Up:</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">Sibling Components</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    When siblings need to share data
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">Multiple Consumers</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    When multiple components need the same data
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">Coordinated Updates</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    When updates need to be synchronized
                  </div>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="font-bold text-sm mb-1">Shared Forms</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    When form data is used across components
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Diagram */}
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 animate-[slideUp_0.6s_ease-out_0.2s]"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
                <span className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3">📊</span>
                State Flow Visualization
              </h2>
              <button
                onClick={() => setShowDiagram(!showDiagram)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 text-sm"
              >
                {showDiagram ? 'Hide Diagram' : 'Show Diagram'}
              </button>
            </div>
            
            {showDiagram && (
              <div className="relative h-64 mb-6">
                {/* State Flow Diagram */}
                <svg width="100%" height="100%" viewBox="0 0 600 240" className="overflow-visible">
                  {/* Parent Component */}
                  <g className="hover:scale-105 transition-transform duration-300">
                    <rect x="250" y="30" width="100" height="50" rx="8" 
                      fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2" />
                    <text x="300" y="60" textAnchor="middle" className="text-sm font-semibold fill-gray-800 dark:fill-gray-100">
                      Parent
                    </text>
                    <text x="300" y="75" textAnchor="middle" className="text-xs fill-blue-600">
                      State Lives Here
                    </text>
                  </g>
                  
                  {/* State Container */}
                  <g className="hover:scale-105 transition-transform duration-300">
                    <rect x="275" y="85" width="50" height="30" rx="4" 
                      fill="#F59E0B" fillOpacity="0.3" stroke="#F59E0B" strokeWidth="2" />
                    <text x="300" y="105" textAnchor="middle" className="text-xs font-semibold fill-gray-800 dark:fill-gray-100">
                      State
                    </text>
                  </g>
                  
                  {/* Arrows from Parent to Children */}
                  <path d="M 300 115 L 300 140" stroke="#9CA3AF" strokeWidth="2" />
                  <path d="M 300 140 L 180 140 L 180 185" stroke="#9CA3AF" strokeWidth="2" />
                  <path d="M 300 140 L 420 140 L 420 185" stroke="#9CA3AF" strokeWidth="2" />
                  
                  {/* Child 1 */}
                  <g className="hover:scale-105 transition-transform duration-300">
                    <rect x="130" y="185" width="100" height="50" rx="8" 
                      fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2" />
                    <text x="180" y="215" textAnchor="middle" className="text-sm font-semibold fill-gray-800 dark:fill-gray-100">
                      Child A
                    </text>
                    <text x="180" y="230" textAnchor="middle" className="text-xs fill-green-600">
                      Receives State
                    </text>
                  </g>
                  
                  {/* Child 2 */}
                  <g className="hover:scale-105 transition-transform duration-300">
                    <rect x="370" y="185" width="100" height="50" rx="8" 
                      fill="#10B981" fillOpacity="0.3" stroke="#10B981" strokeWidth="2" />
                    <text x="420" y="215" textAnchor="middle" className="text-sm font-semibold fill-gray-800 dark:fill-gray-100">
                      Child B
                    </text>
                    <text x="420" y="230" textAnchor="middle" className="text-xs fill-green-600">
                      Receives State
                    </text>
                  </g>
                  
                  {/* Update Callbacks */}
                  <g>
                    <path d="M 180 235 L 180 260 L 300 260 L 300 150" 
                      stroke="#EF4444" strokeWidth="2" strokeDasharray="4,4" fill="none" />
                    <text x="240" y="255" textAnchor="middle" className="text-xs fill-red-500 font-medium">
                      Callback to Update
                    </text>
                  </g>
                  
                  <g>
                    <path d="M 420 235 L 420 260 L 300 260" 
                      stroke="#EF4444" strokeWidth="2" strokeDasharray="4,4" fill="none" />
                  </g>
                  
                  {/* Legend */}
                  <g>
                    <rect x="20" y="30" width="180" height="60" rx="8" 
                      fill="#374151" fillOpacity="0.8" stroke="#4B5563" strokeWidth="1" />
                    <text x="30" y="50" className="text-xs fill-white font-medium">Data Flow:</text>
                    <text x="30" y="65" className="text-[10px] fill-gray-300">State defined in parent</text>
                    <text x="30" y="80" className="text-[10px] fill-gray-300">Passed down as props</text>
                  </g>
                  
                  {/* Current Example Indicator */}
                  <g>
                    <circle 
                      cx={
                        activeExample === 'temperature' ? 180 :
                        activeExample === 'theme' ? 300 :
                        activeExample === 'cart' ? 420 :
                        activeExample === 'form' ? 300 : 300
                      }
                      cy={
                        activeExample === 'temperature' ? 210 :
                        activeExample === 'theme' ? 60 :
                        activeExample === 'cart' ? 210 :
                        activeExample === 'form' ? 210 : 210
                      }
                      r="8"
                      fill="#8B5CF6"
                      className="animate-pulse"
                    />
                  </g>
                </svg>
              </div>
            )}
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">State Location</div>
                <div className="font-bold">Parent Component</div>
              </div>
              
              <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-sm font-medium text-green-700 dark:text-green-300 mb-1">Data Flow</div>
                <div className="font-bold">Top-Down</div>
              </div>
              
              <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-sm font-medium text-red-700 dark:text-red-300 mb-1">Updates Flow</div>
                <div className="font-bold">Bottom-Up</div>
              </div>
            </div>
          </div>
        </div>

        {/* Examples Tabs */}
        <div className="mb-8">
          <div className="flex space-x-2 mb-6 overflow-x-auto">
            {['temperature', 'theme', 'cart', 'form'].map((tab) => (
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
                {tab === 'temperature' && '🌡️ Temperature Converter'}
                {tab === 'theme' && '🎨 Theme Switcher'}
                {tab === 'cart' && '🛒 Shopping Cart'}
                {tab === 'form' && '📝 Shared Form'}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            {activeExample === 'temperature' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                  🌡️ Temperature Converter (Sibling Components)
                </h3>
                
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-blue-700 dark:text-blue-300">
                    <strong>Scenario:</strong> Two input fields (Celsius and Fahrenheit) that need to stay in sync. 
                    When one changes, the other should update automatically.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Celsius Component */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Celsius Input</h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Celsius:
                        </label>
                        <input
                          type="range"
                          min="-100"
                          max="100"
                          value={celsius}
                          onChange={(e) => handleCelsiusChange(parseFloat(e.target.value))}
                          className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <span>-100°C</span>
                          <span>0°C</span>
                          <span>100°C</span>
                        </div>
                        <div className="mt-4 text-center">
                          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                            {celsius.toFixed(1)}°C
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                            Water {celsius >= 100 ? 'Boils' : celsius <= 0 ? 'Freezes' : 'Liquid'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-sm text-green-700 dark:text-green-300">
                          This component receives <code>celsius</code> as prop and calls <code>onCelsiusChange</code> when value changes.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Fahrenheit Component */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Fahrenheit Input</h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Fahrenheit:
                        </label>
                        <input
                          type="range"
                          min="-148"
                          max="212"
                          value={fahrenheit}
                          onChange={(e) => handleFahrenheitChange(parseFloat(e.target.value))}
                          className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <span>-148°F</span>
                          <span>32°F</span>
                          <span>212°F</span>
                        </div>
                        <div className="mt-4 text-center">
                          <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                            {fahrenheit.toFixed(1)}°F
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                            Water {fahrenheit >= 212 ? 'Boils' : fahrenheit <= 32 ? 'Freezes' : 'Liquid'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-sm text-green-700 dark:text-green-300">
                          This component receives <code>fahrenheit</code> as prop and calls <code>onFahrenheitChange</code> when value changes.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">How State is Lifted:</h4>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="font-bold text-blue-600 dark:text-blue-400">State Location</div>
                      <div className="mt-1">Parent Component</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="font-bold text-green-600 dark:text-green-400">Shared State</div>
                      <div className="mt-1"><code>celsius</code></div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="font-bold text-purple-600 dark:text-purple-400">Update Flow</div>
                      <div className="mt-1">Child → Parent → Child</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeExample === 'theme' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                  🎨 Theme Switcher (Parent-Child Components)
                </h3>
                
                <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-purple-700 dark:text-purple-300">
                    <strong>Scenario:</strong> A theme switcher that affects multiple child components. 
                    The theme state is lifted to the parent so all children can access it.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Theme Controls */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Theme Controls</h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <h5 className="font-medium mb-3">Select Theme:</h5>
                        <div className="space-y-2">
                          {['light', 'dark', 'blue', 'green'].map(t => (
                            <label key={t} className="flex items-center space-x-3 cursor-pointer">
                              <input
                                type="radio"
                                name="theme"
                                value={t}
                                checked={theme === t}
                                onChange={(e) => setTheme(e.target.value)}
                                className="text-blue-500"
                              />
                              <span className="capitalize">{t} theme</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="text-sm text-purple-700 dark:text-purple-300">
                          This control updates the shared <code>theme</code> state in the parent component.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Header Component */}
                  <div className={clsx(
                    "rounded-xl p-6 transition-colors duration-300",
                    theme === 'light' && "bg-white text-gray-800 border border-gray-200",
                    theme === 'dark' && "bg-gray-800 text-gray-100",
                    theme === 'blue' && "bg-blue-600 text-white",
                    theme === 'green' && "bg-green-600 text-white"
                  )}>
                    <h4 className="font-bold mb-4">Header Component</h4>
                    <div className="space-y-3">
                      <div className="text-lg font-bold">My Application</div>
                      <div className="text-sm opacity-80">
                        Current theme: <span className="font-bold capitalize">{theme}</span>
                      </div>
                      <div className="mt-4 p-3 bg-black/10 rounded-lg">
                        <div className="text-sm">
                          This component receives <code>theme</code> as a prop and styles itself accordingly.
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Component */}
                  <div className={clsx(
                    "rounded-xl p-6 transition-colors duration-300",
                    theme === 'light' && "bg-gray-100 text-gray-800 border border-gray-300",
                    theme === 'dark' && "bg-gray-700 text-gray-100",
                    theme === 'blue' && "bg-blue-500 text-white",
                    theme === 'green' && "bg-green-500 text-white"
                  )}>
                    <h4 className="font-bold mb-4">Content Component</h4>
                    <div className="space-y-3">
                      <p>Welcome to the application! The current theme affects how this content appears.</p>
                      <div className="p-3 bg-black/10 rounded-lg">
                        <div className="text-sm">
                          This component also receives <code>theme</code> as a prop. Both components stay in sync because they share the same parent state.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Benefits of Lifted State:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="font-bold text-green-600 dark:text-green-400">Single Source</div>
                      <div className="mt-1">One theme state</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="font-bold text-blue-600 dark:text-blue-400">Consistency</div>
                      <div className="mt-1">All components match</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="font-bold text-purple-600 dark:text-purple-400">Easy Updates</div>
                      <div className="mt-1">Change once, update everywhere</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="font-bold text-yellow-600 dark:text-yellow-400">Simplified Logic</div>
                      <div className="mt-1">No duplicate state</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeExample === 'cart' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                  🛒 Shopping Cart (Multiple Children)
                </h3>
                
                <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <p className="text-yellow-700 dark:text-yellow-300">
                    <strong>Scenario:</strong> An e-commerce interface with product list, cart display, and cart summary. 
                    All components need access to the same cart state.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Product List */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Product List</h4>
                    <div className="space-y-3">
                      {availableProducts.map(product => (
                        <div 
                          key={product.id}
                          className="p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-bold text-gray-800 dark:text-gray-200">{product.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                ₹{product.price.toLocaleString()}
                              </div>
                            </div>
                            <button
                              onClick={() => addToCart(product)}
                              className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 text-sm"
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="text-sm text-yellow-700 dark:text-yellow-300">
                        This component calls <code>addToCart</code> function from parent to update shared cart state.
                      </div>
                    </div>
                  </div>
                  
                  {/* Cart Display */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Cart Items</h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {cartItems.map(item => (
                        <div 
                          key={item.id}
                          className="p-3 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-bold text-gray-800 dark:text-gray-200">{item.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                ₹{item.price.toLocaleString()} × {item.quantity}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                              >
                                -
                              </button>
                              <span className="font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-6 h-6 flex items-center justify-center bg-gray-200 dark:bg-gray-600 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                              >
                                +
                              </button>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="ml-2 text-red-500 hover:text-red-700"
                              >
                                🗑️
                              </button>
                            </div>
                          </div>
                          <div className="mt-2 text-right font-medium">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      ))}
                      
                      {cartItems.length === 0 && (
                        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                          <div className="text-2xl mb-2">🛒</div>
                          Your cart is empty
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="text-sm text-yellow-700 dark:text-yellow-300">
                        This component receives <code>cartItems</code> as prop and calls update/remove functions from parent.
                      </div>
                    </div>
                  </div>
                  
                  {/* Cart Summary */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Cart Summary</h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>₹{cartTotal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span className={cartTotal > 3000 ? "text-green-500" : ""}>
                              {cartTotal > 3000 ? "FREE" : "₹99"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Tax (18%):</span>
                            <span>₹{(cartTotal * 0.18).toFixed(2)}</span>
                          </div>
                          <div className="border-t border-gray-300 dark:border-gray-600 pt-2 mt-2">
                            <div className="flex justify-between font-bold text-lg">
                              <span>Total:</span>
                              <span className="text-blue-600 dark:text-blue-400">
                                ₹{(cartTotal + (cartTotal > 3000 ? 0 : 99) + (cartTotal * 0.18)).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <button className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors duration-300 font-medium">
                        Checkout ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)
                      </button>
                      
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div className="text-sm text-yellow-700 dark:text-yellow-300">
                          This component reads <code>cartItems</code> from parent and calculates totals.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Shared Cart State:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="font-bold text-blue-600 dark:text-blue-400">State Owner</div>
                      <div className="mt-1">Parent Component</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="font-bold text-green-600 dark:text-green-400">Shared With</div>
                      <div className="mt-1">3 Child Components</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="font-bold text-purple-600 dark:text-purple-400">Update Methods</div>
                      <div className="mt-1">add/update/remove</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="font-bold text-red-600 dark:text-red-400">Data Consistency</div>
                      <div className="mt-1">Guaranteed</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeExample === 'form' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">
                  📝 Shared Form (Complex Form State)
                </h3>
                
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-green-700 dark:text-green-300">
                    <strong>Scenario:</strong> A complex form with multiple input components that need to share and validate form data collectively.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Form Inputs */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Form Components</h4>
                    
                    <div className="space-y-4">
                      {/* Name Input */}
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name:
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          placeholder="Enter your name"
                        />
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {formData.name ? `${formData.name.length}/50 characters` : 'Required field'}
                        </div>
                      </div>
                      
                      {/* Email Input */}
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email Address:
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                          placeholder="user@example.com"
                        />
                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {formData.email.includes('@') ? '✓ Valid email format' : 'Enter valid email'}
                        </div>
                      </div>
                      
                      {/* Age Input */}
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Age: {formData.age || 0}
                        </label>
                        <input
                          type="range"
                          min="18"
                          max="80"
                          value={formData.age || 18}
                          onChange={(e) => handleInputChange('age', e.target.value)}
                          className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span>18</span>
                          <span>49</span>
                          <span>80</span>
                        </div>
                      </div>
                      
                      {/* Subscription Select */}
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Subscription Plan:
                        </label>
                        <select
                          value={formData.subscription}
                          onChange={(e) => handleInputChange('subscription', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        >
                          <option value="basic">Basic (Free)</option>
                          <option value="pro">Pro (₹499/month)</option>
                          <option value="enterprise">Enterprise (₹1999/month)</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-sm text-green-700 dark:text-green-300">
                        Each form component calls <code>handleInputChange</code> to update the shared form state in parent.
                      </div>
                    </div>
                  </div>
                  
                  {/* Form Preview & Validation */}
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Form Preview & Validation</h4>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <h5 className="font-medium mb-3">Form Data Preview:</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Name:</span>
                            <span className="font-medium">{formData.name || 'Not provided'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Email:</span>
                            <span className="font-medium">{formData.email || 'Not provided'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Age:</span>
                            <span className="font-medium">{formData.age || 'Not provided'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Subscription:</span>
                            <span className="font-medium capitalize">{formData.subscription}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <h5 className="font-medium mb-3">Validation Status:</h5>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <div className={clsx(
                              "w-3 h-3 rounded-full mr-2",
                              formData.name.length >= 3 ? "bg-green-500" : "bg-red-500"
                            )}></div>
                            <span>Name must be at least 3 characters</span>
                          </div>
                          <div className="flex items-center">
                            <div className={clsx(
                              "w-3 h-3 rounded-full mr-2",
                              formData.email.includes('@') ? "bg-green-500" : "bg-red-500"
                            )}></div>
                            <span>Email must contain '@'</span>
                          </div>
                          <div className="flex items-center">
                            <div className={clsx(
                              "w-3 h-3 rounded-full mr-2",
                              formData.age >= 18 ? "bg-green-500" : "bg-red-500"
                            )}></div>
                            <span>Age must be 18 or older</span>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleSubmit}
                        disabled={!formData.name || !formData.email || !formData.age}
                        className={clsx(
                          "w-full py-3 rounded-lg font-medium transition-colors duration-300",
                          formData.name && formData.email && formData.age
                            ? "bg-green-500 hover:bg-green-600 text-white"
                            : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
                        )}
                      >
                        Submit Form
                      </button>
                      
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-sm text-green-700 dark:text-green-300">
                          This preview component reads the shared form state and validates all fields together.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Centralized Form State:</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="font-bold text-blue-600 dark:text-blue-400">Single Object</div>
                      <div className="mt-1">All form data in one state</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="font-bold text-green-600 dark:text-green-400">Shared Validation</div>
                      <div className="mt-1">Components validate together</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="font-bold text-purple-600 dark:text-purple-400">Real-time Preview</div>
                      <div className="mt-1">Instant feedback</div>
                    </div>
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="font-bold text-yellow-600 dark:text-yellow-400">Clean Submission</div>
                      <div className="mt-1">Submit complete data object</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Comparison: Before vs After Lifting */}
        <div className="mb-12 bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
            <span className="bg-gradient-to-r from-red-500 to-green-500 p-3 rounded-xl mr-4 text-white">⚖️</span>
            Before vs After Lifting State
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Before Lifting */}
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
              <h3 className="text-xl font-bold text-red-700 dark:text-red-300 mb-4">❌ Before Lifting State</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Problems:</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>State duplicated in multiple components</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Components can get out of sync</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Complex synchronization logic needed</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Hard to debug state inconsistencies</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-500 mr-2">✗</span>
                      <span>Prop drilling through many levels</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <pre className="text-sm text-red-800 dark:text-red-300 overflow-x-auto">
{`// ❌ Duplicate state in siblings
function ComponentA() {
  const [value, setValue] = useState(0);
  // ... uses value
}

function ComponentB() {
  const [value, setValue] = useState(0);
  // ... uses same value but separate copy!
}`}
                  </pre>
                </div>
              </div>
            </div>
            
            {/* After Lifting */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
              <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-4">✅ After Lifting State</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Benefits:</h4>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Single source of truth</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Components always in sync</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Simplified update logic</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Easier to debug and test</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>Clean data flow (top-down)</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <pre className="text-sm text-green-800 dark:text-green-300 overflow-x-auto">
{`// ✅ Single state in parent
function ParentComponent() {
  const [value, setValue] = useState(0);
  
  return (
    <>
      <ComponentA value={value} onChange={setValue} />
      <ComponentB value={value} onChange={setValue} />
    </>
  );
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Common Pitfalls */}
        <div className="mb-12 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-2xl p-6 animate-[fadeIn_0.8s_ease-out_0.8s]">
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-300 mb-4 flex items-center">
            <span className="bg-red-100 dark:bg-red-900 p-3 rounded-xl mr-4">🚫</span>
            Common Lifting State Mistakes
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">1. Lifting Too High (Prop Drilling)</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Swadeep lifts state to the top-level app component even though only two sibling components need it, forcing props through many intermediate components.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">2. Not Lifting Enough (Duplication)</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Tuhina keeps separate state in sibling components that should share data, causing them to get out of sync when users interact.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">3. Complex Callback Chains</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Debangshu creates deep chains of callbacks through multiple components instead of lifting state to the appropriate common ancestor.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
              <h4 className="font-bold text-red-600 dark:text-red-400 mb-2">4. Mixing Local and Shared State</h4>
              <p className="text-gray-700 dark:text-gray-300">
                Abhronila mixes truly local UI state (like "isDropdownOpen") with shared application state, overcomplicating the component tree.
              </p>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="mb-12 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-2xl p-6 animate-[fadeIn_0.8s_ease-out_1s]">
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-300 mb-4 flex items-center">
            <span className="bg-green-100 dark:bg-green-900 p-3 rounded-xl mr-4">✅</span>
            Best Practices for Lifting State
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100">When to Lift:</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">🎯</span>
                  When sibling components need to share data
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">🎯</span>
                  When components need to stay synchronized
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">🎯</span>
                  When you find duplicate state that should be the same
                </li>
                <li className="flex items-start">
                  <span className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full p-1 mr-3">🎯</span>
                  When callbacks are getting too deep or complex
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-100">How to Lift:</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">🔧</span>
                  Identify the closest common ancestor
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">🔧</span>
                  Move state to that ancestor component
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">🔧</span>
                  Pass state down as props
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300 rounded-full p-1 mr-3">🔧</span>
                  Pass callbacks for updating state
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
                  <strong>Lifting state is like having a family WhatsApp group!</strong> Instead of Swadeep in Barrackpore texting Tuhina in Shyamnagar individually, then Tuhina texting Abhronila, then Abhronila texting Debangshu... everyone gets the same message at once from the group chat.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  Think of it this way: When you have components that need to know about the same thing (like cart items, theme, or form data), don't make them text each other. Create a "group chat" (lift state to parent) where everyone can see the same information.
                </p>
                
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Remember:</strong> Lift state to the closest common ancestor—not too high (prop drilling), not too low (duplication). Like Goldilocks, find the "just right" spot!
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <div className="font-bold text-blue-600 dark:text-blue-400 mb-1">Professional Insight:</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    In 27 years, I've refactored countless applications by lifting state. The pattern is simple: find duplicate state, find common ancestor, move state up, pass down as props. This single change fixes so many bugs!
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                  <div className="font-bold text-green-600 dark:text-green-400 mb-1">Debugging Tip:</div>
                  <p className="text-gray-600 dark:text-gray-400">
                    When debugging: "Which components need this state?" If answer > 1, lift it. "What's their closest common parent?" That's where the state should live.
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
              <strong>Observe carefully:</strong> In the temperature converter, change the Celsius slider. Notice how Fahrenheit updates instantly. Now imagine if each input had its own separate state—how would you keep them in sync?
            </p>
            
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Try changing this:</strong> Add an item to the cart. Notice how all three cart components update. What would happen if each component managed its own cart state?
            </p>
            
            <p className="text-gray-700 dark:text-gray-300">
              <strong>Think about:</strong> In a real app with 100+ components, how would you decide when to lift state vs when to use other state management solutions (like Context or Redux)?
            </p>
          </div>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl p-6 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">📋 Lifting State Checklist</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-700/50 rounded-xl">
              <div className="text-3xl mb-3">🔍</div>
              <h4 className="font-bold mb-2">Identify Need</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Multiple components need same data</li>
                <li>Components getting out of sync</li>
                <li>Duplicate state found</li>
                <li>Complex callback chains</li>
              </ul>
            </div>
            
            <div className="text-center p-4 bg-gray-700/50 rounded-xl">
              <div className="text-3xl mb-3">🔼</div>
              <h4 className="font-bold mb-2">Lift State</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Find closest common ancestor</li>
                <li>Move state to that component</li>
                <li>Pass data down as props</li>
                <li>Pass callbacks for updates</li>
              </ul>
            </div>
            
            <div className="text-center p-4 bg-gray-700/50 rounded-xl">
              <div className="text-3xl mb-3">✅</div>
              <h4 className="font-bold mb-2">Verify Results</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>Single source of truth</li>
                <li>Components stay in sync</li>
                <li>Simplified data flow</li>
                <li>Easier to debug</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <button
              onClick={resetExamples}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-300 font-medium"
            >
              🔄 Reset All Examples
            </button>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              <strong>Golden Rule:</strong> Lift state to the closest common ancestor of all components that need it.
            </p>
          </div>
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
          
          .animate-pulse {
            animation: none;
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

export default Topic43;