import React, { useState } from 'react';
import clsx from 'clsx';

const Topic24 = () => {
  const [activeSection, setActiveSection] = useState(1);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(true);
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(false);
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [showPremiumContent, setShowPremiumContent] = useState(false);
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  
  const [userData, setUserData] = useState({
    name: "Swadeep",
    isLoggedIn: true,
    role: "student",
    email: "swadeep@barrackpore.edu",
    points: 85,
    permissions: ["read", "write"]
  });

  const productCode =`// Product inventory with multiple && conditions
const ProductItem = ({ product }) => {
  return (
    <div className="product-item">
      <h3>{product.name}</h3>
      <p>Price: \\${'{'}product.price{'}'}</p>
      
      {/* Single condition */}
      {product.inStock && (
        <span className="in-stock">✅ In Stock</span>
      )}
      
      {/* Multiple conditions */}
      {product.name === "React Course" && 
       product.inStock && 
       product.price > 1000 && (
        <span className="discount">🔥 20% Discount!</span>
      )}
      
      {/* With function call */}
      {product.lowStock && showLowStockWarning(product)}
      
      {/* Complex condition */}
      {user.isAdmin && 
       product.needsRestock && 
       !product.onOrder && (
        <button onClick={() => reorderProduct(product.id)}>
          Reorder Now
        </button>
      )}
    </div>
  );
};`
  
  const [products, setProducts] = useState([
    { id: 1, name: "JavaScript Book", price: 499, inStock: true },
    { id: 2, name: "React Course", price: 1299, inStock: false },
    { id: 3, name: "Node.js Guide", price: 799, inStock: true },
    { id: 4, name: "CSS Masterclass", price: 299, inStock: true },
  ]);
  
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello, welcome!", type: "info" },
    { id: 2, text: "Your assignment is due tomorrow", type: "warning" },
  ]);
  
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductStock, setNewProductStock] = useState(true);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Simulated loading state
  const simulateLoading = () => {
    setShowLoadingIndicator(true);
    setTimeout(() => {
      setShowLoadingIndicator(false);
      setProducts([
        ...products,
        { 
          id: products.length + 1, 
          name: newProductName, 
          price: parseInt(newProductPrice), 
          inStock: newProductStock 
        }
      ]);
      setNewProductName("");
      setNewProductPrice("");
    }, 1500);
  };
  
  const toggleUserRole = () => {
    setUserData(prev => ({
      ...prev,
      role: prev.role === "student" ? "teacher" : "student",
      permissions: prev.role === "student" 
        ? ["read", "write", "delete", "admin"] 
        : ["read", "write"]
    }));
  };
  
  const toggleLoginStatus = () => {
    setUserData(prev => ({ ...prev, isLoggedIn: !prev.isLoggedIn }));
  };
  
  const toggleProductStock = (id) => {
    setProducts(prev => prev.map(product =>
      product.id === id ? { ...product, inStock: !product.inStock } : product
    ));
  };
  
  const handleAddProduct = () => {
    if (!newProductName || !newProductPrice) {
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 2000);
      return;
    }
    simulateLoading();
  };
  
  const removeProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
    if (products.length === 1) {
      setShowEmptyState(true);
    }
  };
  
  const resetDemo = () => {
    setShowWelcome(true);
    setShowErrorMessage(false);
    setShowUserProfile(true);
    setShowLoadingIndicator(false);
    setShowEmptyState(false);
    setShowPremiumContent(false);
    setShowDebugInfo(false);
    
    setUserData({
      name: "Swadeep",
      isLoggedIn: true,
      role: "student",
      email: "swadeep@barrackpore.edu",
      points: 85,
      permissions: ["read", "write"]
    });
    
    setProducts([
      { id: 1, name: "JavaScript Book", price: 499, inStock: true },
      { id: 2, name: "React Course", price: 1299, inStock: false },
      { id: 3, name: "Node.js Guide", price: 799, inStock: true },
      { id: 4, name: "CSS Masterclass", price: 299, inStock: true },
    ]);
    
    setNewProductName("");
    setNewProductPrice("");
    setNewProductStock(true);
  };
  
  const sections = [
    { id: 1, title: "Introduction", icon: "🎯" },
    { id: 2, title: "Basic Examples", icon: "🔄" },
    { id: 3, title: "Real-World Scenarios", icon: "🌐" },
    { id: 4, title: "Common Mistakes", icon: "⚠️" },
    { id: 5, title: "Best Practices", icon: "✅" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 md:mb-12 text-center animate-[fadeIn_0.8s_ease-out]">
          <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white">
            <span className="text-xl">&&</span>
            <h1 className="text-2xl md:text-4xl font-bold">
              Conditional Rendering Using Logical AND (&&)
            </h1>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master the concise way to conditionally render elements in React
          </p>
        </header>

        {/* Navigation */}
        <nav className="mb-8 md:mb-12 animate-[slideUp_0.8s_ease-out_0.2s]">
          <div className="flex overflow-x-auto pb-2 space-x-2 scrollbar-hide">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={clsx(
                  "flex-shrink-0 px-4 md:px-6 py-3 rounded-xl border transition-all duration-300 transform hover:scale-[1.02]",
                  activeSection === section.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg border-transparent"
                    : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="text-lg">{section.icon}</span>
                  <span className="font-medium whitespace-nowrap">{section.title}</span>
                </div>
              </button>
            ))}
          </div>
        </nav>

        {/* Introduction Section */}
        {activeSection === 1 && (
          <section className="space-y-8 animate-[slideUp_0.8s_ease-out_0.4s]">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-2xl text-white">🎯</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    What is Logical AND (&&) in React?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    The logical AND (&&) operator is JavaScript's concise way to conditionally render elements.
                    It returns the right-hand operand if the left-hand operand is truthy, otherwise it returns the left-hand operand.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-4">How It Works</h3>
                    <div className="space-y-4">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                        <p className="font-mono text-blue-700 dark:text-blue-400">
                          {`condition && <Component />`}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          If <code>condition</code> is truthy, renders <code>&lt;Component /&gt;</code>
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                          <p className="text-sm font-medium text-green-700 dark:text-green-400">Truthy Condition</p>
                          <p className="font-mono text-green-600 dark:text-green-500 mt-1">true && "Hello" → "Hello"</p>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                          <p className="text-sm font-medium text-red-700 dark:text-red-400">Falsy Condition</p>
                          <p className="font-mono text-red-600 dark:text-red-500 mt-1">false && "Hello" → false</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
                    <h3 className="font-bold text-yellow-800 dark:text-yellow-300 mb-4">Key Advantage</h3>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                        <span className="text-yellow-600 dark:text-yellow-400">✓</span>
                      </div>
                      <div>
                        <p className="text-yellow-700 dark:text-yellow-400">
                          <span className="font-semibold">Clean, concise syntax</span> - Perfect for simple show/hide conditions
                          without the need for if-else blocks or ternary operators.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-4">Quick Comparison</h3>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Using if-else</h4>
                        <pre className="text-sm bg-gray-900 text-gray-300 p-3 rounded overflow-x-auto">
{`if (isLoggedIn) {
  return <WelcomeMessage />;
} else {
  return null;
}`}
                        </pre>
                      </div>
                      
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Using && (Better)</h4>
                        <pre className="text-sm bg-blue-900/20 text-blue-700 dark:text-blue-400 p-3 rounded overflow-x-auto">
{`{isLoggedIn && <WelcomeMessage />}`}
                        </pre>
                      </div>
                      
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-800">
                        <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">Using Ternary</h4>
                        <pre className="text-sm bg-green-900/20 text-green-700 dark:text-green-400 p-3 rounded overflow-x-auto">
{`{isLoggedIn ? <WelcomeMessage /> : null}`}
                        </pre>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-blue-700 dark:text-blue-400">
                        <span className="font-semibold">Rule of thumb:</span> Use <code>&&</code> when you want to render something or nothing.
                        Use ternary when you need to choose between two different things.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Explanation */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Visual Flow of && Operator</h2>
              
              <div className="flex flex-col items-center">
                <div className="w-full max-w-2xl">
                  {/* Step 1 */}
                  <div className="flex items-center justify-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      1
                    </div>
                    <div className="ml-6 flex-1">
                      <h3 className="font-bold text-gray-800 dark:text-white">Evaluate Condition</h3>
                      <p className="text-gray-600 dark:text-gray-400">Check if the left side is truthy or falsy</p>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="flex justify-center mb-8">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600"></div>
                  </div>
                  
                  {/* Decision */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">✅</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-green-800 dark:text-green-300">Condition is Truthy</h4>
                          <p className="text-green-700 dark:text-green-400">e.g., true, "text", 1, [ ], {`{ }`}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="font-mono text-green-600 dark:text-green-500 bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                          → Returns right-hand side
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">❌</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-red-800 dark:text-red-300">Condition is Falsy</h4>
                          <p className="text-red-700 dark:text-red-400">e.g., false, 0, "", null, undefined</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="font-mono text-red-600 dark:text-red-500 bg-red-100 dark:bg-red-900 p-3 rounded-lg">
                          → Returns left-hand side (falsy value)
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="flex justify-center mb-8">
                    <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600"></div>
                  </div>
                  
                  {/* Step 2 */}
                  <div className="flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      2
                    </div>
                    <div className="ml-6 flex-1">
                      <h3 className="font-bold text-gray-800 dark:text-white">Render Result</h3>
                      <p className="text-gray-600 dark:text-gray-400">React renders the returned value (or nothing for falsy values)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Basic Examples Section */}
        {activeSection === 2 && (
          <section className="space-y-8 animate-[slideUp_0.8s_ease-out_0.4s]">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-blue-500 mr-2">🔄</span> Basic Examples
              </h2>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left: Interactive Examples */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-4">Interactive Examples</h3>
                    
                    <div className="space-y-6">
                      {/* Example 1: Welcome Message */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-gray-700 dark:text-gray-300">1. Welcome Message</h4>
                          <button
                            onClick={() => setShowWelcome(!showWelcome)}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-400 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-blue-800"
                          >
                            Toggle
                          </button>
                        </div>
                        
                        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                          <div className="font-mono text-sm text-gray-700 dark:text-gray-300">
                            {`{showWelcome && (`}<br />
                            <div className="ml-4">
                              <span className="text-blue-600 dark:text-blue-400">&lt;div</span>{` className="p-3 bg-green-100 dark:bg-green-900 rounded-lg"`}<span className="text-blue-600 dark:text-blue-400">&gt;</span><br />
                              <div className="ml-8">
                                Welcome back, <span className="text-green-600 dark:text-green-400">Swadeep</span>!<br />
                                How are things in Barrackpore today?
                              </div>
                              <span className="text-blue-600 dark:text-blue-400">&lt;/div&gt;</span>
                            </div>
                            {`)}`}
                          </div>
                        </div>
                        
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                          <h5 className="font-medium text-gray-600 dark:text-gray-400 mb-2">Result:</h5>
                          {showWelcome && (
                            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                              Welcome back, <span className="font-semibold text-green-600 dark:text-green-400">Swadeep</span>!<br />
                              How are things in Barrackpore today?
                            </div>
                          )}
                          {!showWelcome && (
                            <div className="text-gray-500 dark:text-gray-500 italic">(Message is hidden)</div>
                          )}
                        </div>
                      </div>

                      {/* Example 2: Error Message */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-gray-700 dark:text-gray-300">2. Error Message</h4>
                          <button
                            onClick={() => setShowErrorMessage(!showErrorMessage)}
                            className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-400 rounded-lg text-sm hover:bg-red-200 dark:hover:bg-red-800"
                          >
                            Toggle Error
                          </button>
                        </div>
                        
                        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                          <div className="font-mono text-sm text-gray-700 dark:text-gray-300">
                            {`{showErrorMessage && (`}<br />
                            <div className="ml-4">
                              <span className="text-blue-600 dark:text-blue-400">&lt;div</span>{` className="p-3 bg-red-100 dark:bg-red-900 rounded-lg"`}<span className="text-blue-600 dark:text-blue-400">&gt;</span><br />
                              <div className="ml-8">
                                ⚠️ Please fill in all required fields!
                              </div>
                              <span className="text-blue-600 dark:text-blue-400">&lt;/div&gt;</span>
                            </div>
                            {`)}`}
                          </div>
                        </div>
                        
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                          <h5 className="font-medium text-gray-600 dark:text-gray-400 mb-2">Result:</h5>
                          {showErrorMessage && (
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                              <div className="flex items-center gap-2">
                                <span className="text-red-600 dark:text-red-400">⚠️</span>
                                <span className="text-red-700 dark:text-red-300">Please fill in all required fields!</span>
                              </div>
                            </div>
                          )}
                          {!showErrorMessage && (
                            <div className="text-gray-500 dark:text-gray-500 italic">(No errors to display)</div>
                          )}
                        </div>
                      </div>

                      {/* Example 3: Loading Indicator */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium text-gray-700 dark:text-gray-300">3. Loading Indicator</h4>
                          <button
                            onClick={() => setShowLoadingIndicator(!showLoadingIndicator)}
                            className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-400 rounded-lg text-sm hover:bg-yellow-200 dark:hover:bg-yellow-800"
                          >
                            Toggle Loading
                          </button>
                        </div>
                        
                        <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                          <div className="font-mono text-sm text-gray-700 dark:text-gray-300">
                            {`{showLoadingIndicator && (`}<br />
                            <div className="ml-4">
                              <span className="text-blue-600 dark:text-blue-400">&lt;div</span>{` className="flex items-center gap-2 p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg"`}<span className="text-blue-600 dark:text-blue-400">&gt;</span><br />
                              <div className="ml-8">
                                <span className="text-yellow-600 dark:text-yellow-400">⏳</span> Loading data...
                              </div>
                              <span className="text-blue-600 dark:text-blue-400">&lt;/div&gt;</span>
                            </div>
                            {`)}`}
                          </div>
                        </div>
                        
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                          <h5 className="font-medium text-gray-600 dark:text-gray-400 mb-2">Result:</h5>
                          {showLoadingIndicator && (
                            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                              <div className="flex items-center gap-3">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
                                <span className="text-yellow-700 dark:text-yellow-400">Loading data...</span>
                              </div>
                            </div>
                          )}
                          {!showLoadingIndicator && (
                            <div className="text-gray-500 dark:text-gray-500 italic">(Not loading)</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Code Explanation */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-4">How && Works in Practice</h3>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Simple Condition</h4>
                        <pre className="text-sm bg-gray-900 text-gray-300 p-3 rounded overflow-x-auto">
{`// When showWelcome is true:
{showWelcome && <Message />}
→ true && <Message /> 
→ <Message /> (rendered)

// When showWelcome is false:
{showWelcome && <Message />}
→ false && <Message /> 
→ false (not rendered)`}
                        </pre>
                      </div>
                      
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Multiple Conditions</h4>
                        <pre className="text-sm bg-gray-900 text-gray-300 p-3 rounded overflow-x-auto">
{`// All conditions must be truthy
{isLoggedIn && hasPermission && isActive && (
  <AdminPanel />
)}

// Equivalent to:
if (isLoggedIn && hasPermission && isActive) {
  return <AdminPanel />;
}`}
                        </pre>
                      </div>
                      
                      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">With Function Calls</h4>
                        <pre className="text-sm bg-gray-900 text-gray-300 p-3 rounded overflow-x-auto">
{`// Only call function if data exists
{userData && renderUserProfile(userData)}

// Safer than:
renderUserProfile(userData) // Might error if userData is undefined`}
                        </pre>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-800/20 rounded-lg border border-green-200 dark:border-green-800">
                      <h4 className="font-bold text-green-800 dark:text-emerald-300 mb-2">Why Use && Instead of if?</h4>
                      <ul className="space-y-2 text-sm text-green-700 dark:text-emerald-400">
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 dark:text-emerald-500">✓</span>
                          <span>Can be used inline within JSX</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 dark:text-emerald-500">✓</span>
                          <span>More concise and readable</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 dark:text-emerald-500">✓</span>
                          <span>Perfect for simple show/hide logic</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600 dark:text-emerald-500">✓</span>
                          <span>No need for separate variables or early returns</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                    <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-4">Classroom Analogy</h3>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                        <span className="text-xl">👨‍🏫</span>
                      </div>
                      <div>
                        <p className="text-purple-700 dark:text-purple-400">
                          When <span className="font-semibold">Tuhina</span> wants to distribute sweets in her Shyamnagar classroom, 
                          she uses logical AND thinking:
                        </p>
                        <div className="mt-3 p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                          <p className="font-mono text-purple-700 dark:text-purple-400 text-sm">
                            {`{studentsFinishedAssignment && distributeSweets()}`}
                          </p>
                          <p className="text-sm text-purple-600 dark:text-purple-500 mt-1">
                            Only distributes sweets IF all students finished their assignment
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Real-World Scenarios Section */}
        {activeSection === 3 && (
          <section className="space-y-8 animate-[slideUp_0.8s_ease-out_0.4s]">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-green-500 mr-2">🌐</span> Real-World Scenarios
              </h2>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left: E-commerce Product List */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-4">E-commerce Dashboard</h3>
                    
                    <div className="space-y-4">
                      {/* Product List */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Product Inventory</h4>
                        
                        {showEmptyState ? (
                          <div className="text-center py-8">
                            <div className="text-4xl mb-3">📭</div>
                            <p className="text-gray-500 dark:text-gray-400">No products available</p>
                            <button
                              onClick={() => {
                                setShowEmptyState(false);
                                resetDemo();
                              }}
                              className="mt-4 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800"
                            >
                              Reset Products
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            {products.map(product => (
                              <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <div>
                                  <p className="font-medium">{product.name}</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">₹{product.price}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                  {/* Stock Status */}
                                  {product.inStock && (
                                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded text-xs">
                                      In Stock
                                    </span>
                                  )}
                                  {!product.inStock && (
                                    <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 rounded text-xs">
                                      Out of Stock
                                    </span>
                                  )}
                                  
                                  {/* Discount for React Course */}
                                  {product.name === "React Course" && product.inStock && (
                                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 rounded text-xs">
                                      🔥 20% Off
                                    </span>
                                  )}
                                  
                                  <button
                                    onClick={() => toggleProductStock(product.id)}
                                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
                                  >
                                    Toggle Stock
                                  </button>
                                  
                                  <button
                                    onClick={() => removeProduct(product.id)}
                                    className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded text-sm hover:bg-red-200 dark:hover:bg-red-800"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {/* Admin Controls (only for teachers) */}
                        {userData.role === "teacher" && (
                          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-3">Admin Controls</h4>
                            <div className="space-y-3">
                              <input
                                type="text"
                                value={newProductName}
                                onChange={(e) => setNewProductName(e.target.value)}
                                placeholder="Product name"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                              />
                              <input
                                type="number"
                                value={newProductPrice}
                                onChange={(e) => setNewProductPrice(e.target.value)}
                                placeholder="Price"
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800"
                              />
                              <div className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={newProductStock}
                                  onChange={(e) => setNewProductStock(e.target.checked)}
                                  id="stock"
                                />
                                <label htmlFor="stock" className="text-sm text-gray-600 dark:text-gray-400">
                                  In Stock
                                </label>
                              </div>
                              <button
                                onClick={handleAddProduct}
                                className="w-full py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg"
                              >
                                Add Product
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Summary Stats */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Total Products</p>
                          <p className="text-2xl font-bold">{products.length}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-500 dark:text-gray-400">In Stock</p>
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {products.filter(p => p.inStock).length}
                          </p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Out of Stock</p>
                          <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                            {products.filter(p => !p.inStock).length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: User Profile & Permissions */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-4">User Profile & Permissions</h3>
                    
                    <div className="space-y-4">
                      {/* User Profile Card */}
                      {showUserProfile && userData.isLoggedIn && (
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                              <span className="text-2xl">👤</span>
                            </div>
                            <div>
                              <h4 className="text-xl font-bold">{userData.name}</h4>
                              <p className="text-blue-200">{userData.email}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="px-2 py-1 bg-white/20 rounded text-sm">
                                  {userData.role}
                                </span>
                                <span className="px-2 py-1 bg-white/20 rounded text-sm">
                                  {userData.points} points
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Premium Badge */}
                          {userData.points > 80 && (
                            <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg mb-4">
                              <span className="text-xl">⭐</span>
                              <span className="font-medium">Premium Student</span>
                            </div>
                          )}
                          
                          {/* Permissions */}
                          <div className="space-y-2">
                            <p className="font-medium">Permissions:</p>
                            <div className="flex flex-wrap gap-2">
                              {userData.permissions.map((perm, index) => (
                                <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                                  {perm}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Control Panel */}
                      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3">Control Panel</h4>
                        
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span>User is logged in</span>
                            <button
                              onClick={toggleLoginStatus}
                              className={clsx(
                                "px-3 py-1 rounded text-sm",
                                userData.isLoggedIn
                                  ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                                  : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"
                              )}
                            >
                              {userData.isLoggedIn ? "Yes ✅" : "No ❌"}
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span>User role</span>
                            <button
                              onClick={toggleUserRole}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-800"
                            >
                              Switch to {userData.role === "student" ? "Teacher" : "Student"}
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span>Show profile</span>
                            <button
                              onClick={() => setShowUserProfile(!showUserProfile)}
                              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
                            >
                              {showUserProfile ? "Hide" : "Show"}
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span>Debug mode</span>
                            <button
                              onClick={() => setShowDebugInfo(!showDebugInfo)}
                              className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded text-sm hover:bg-purple-200 dark:hover:bg-purple-800"
                            >
                              {showDebugInfo ? "On" : "Off"}
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Debug Information */}
                      {showDebugInfo && (
                        <div className="bg-gray-900 rounded-lg p-4">
                          <h4 className="font-medium text-gray-300 mb-2">Debug Info</h4>
                          <pre className="text-xs text-gray-400 overflow-x-auto">
{`Current State:
- showUserProfile: ${showUserProfile}
- userData.isLoggedIn: ${userData.isLoggedIn}
- userData.role: ${userData.role}
- userData.points: ${userData.points}
- Total products: ${products.length}
- Products in stock: ${products.filter(p => p.inStock).length}

Condition being evaluated:
{showUserProfile && userData.isLoggedIn && <ProfileCard />}

Evaluation:
${showUserProfile} && ${userData.isLoggedIn} && <ProfileCard />
→ ${showUserProfile && userData.isLoggedIn} && <ProfileCard />
→ ${showUserProfile && userData.isLoggedIn ? '<ProfileCard />' : 'false'}`}
                          </pre>
                        </div>
                      )}
                      
                      {/* Conditional Messages */}
                      <div className="space-y-2">
                        {/* Admin Only Message */}
                        {userData.role === "teacher" && (
                          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                            <p className="text-blue-700 dark:text-blue-400">
                              👋 Welcome, teacher! You have admin privileges.
                            </p>
                          </div>
                        )}
                        
                        {/* High Points Message */}
                        {userData.points > 70 && userData.role === "student" && (
                          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                            <p className="text-green-700 dark:text-green-400">
                              🎉 Excellent work! You're in the top 10% of students.
                            </p>
                          </div>
                        )}
                        
                        {/* Low Stock Warning */}
                        {products.filter(p => !p.inStock).length > 0 && (
                          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                            <p className="text-yellow-700 dark:text-yellow-400">
                              ⚠️ Some products are out of stock. Consider restocking.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Examples */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Code Examples from Scenarios</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-900 rounded-xl overflow-hidden">
                  <div className="bg-gray-800 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="ml-4 font-mono">ProductItem.jsx</span>
                    </div>
                  </div>
                  <div className="p-4 overflow-x-auto">
                    <pre className="text-gray-300 text-sm font-mono">
                        <code>{productCode}</code>
                    </pre>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-xl overflow-hidden">
                  <div className="bg-gray-800 px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="ml-4 font-mono">UserProfile.jsx</span>
                    </div>
                  </div>
                  <div className="p-4 overflow-x-auto">
                    <pre className="text-gray-300 text-sm font-mono">
{`// User profile with permission checks
const UserProfile = ({ user }) => {
  return (
    <div>
      {/* Basic profile - only show if user exists */}
      {user && (
        <div className="profile-card">
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          
          {/* Premium badge for high scores */}
          {user.points > 80 && (
            <div className="premium-badge">⭐ Premium User</div>
          )}
          
          {/* Admin features */}
          {user.role === 'teacher' && (
            <div className="admin-panel">
              <h3>Admin Controls</h3>
              <button>Manage Users</button>
              <button>View Reports</button>
            </div>
          )}
          
          {/* Warning messages */}
          {user.lastLogin && 
           daysSince(user.lastLogin) > 30 && (
            <div className="warning">
              ⚠️ You haven't logged in for a while
            </div>
          )}
          
          {/* Complex permission check */}
          {user.isActive && 
           user.hasSubscription && 
           user.permissions.includes('write') && (
            <button onClick={startAdvancedMode}>
              Enter Advanced Mode
            </button>
          )}
        </div>
      )}
    </div>
  );
};`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Common Mistakes Section */}
        {activeSection === 4 && (
          <section className="space-y-8 animate-[slideUp_0.8s_ease-out_0.4s]">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-red-500 mr-2">⚠️</span> Common Mistakes & Pitfalls
              </h2>

              <div className="space-y-6">
                {/* Mistake 1: Rendering Zero */}
                <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-red-200 dark:border-red-800">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                      <span className="text-2xl text-red-600 dark:text-red-400">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-red-800 dark:text-red-300">Mistake: Rendering Zero (0)</h3>
                      <p className="text-red-700 dark:text-red-400 mt-2">
                        When the left-hand side is <code>0</code>, React will render <code>0</code> instead of nothing.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-red-700 dark:text-red-400 mb-2">❌ Problem Code</h4>
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-sm text-red-400 font-mono">
{`const items = []; // Empty array

// This will render 0!
return (
  <div>
    {items.length && <ItemList items={items} />}
  </div>
);

// Renders: <div>0</div>`}
                        </pre>
                      </div>
                      <p className="text-sm text-red-600 dark:text-red-500 mt-2">
                        Since <code>items.length</code> is 0 (falsy), the && operator returns 0, and React renders it.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">✅ Solution</h4>
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-sm text-green-400 font-mono">
{`const items = []; // Empty array

// Convert to boolean explicitly
return (
  <div>
    {items.length > 0 && <ItemList items={items} />}
  </div>
);

// Or use double negation
{!!items.length && <ItemList items={items} />}

// Renders: <div></div> (nothing)`}
                        </pre>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-500 mt-2">
                        Use comparison operators or convert to boolean to avoid rendering 0.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mistake 2: Side Effects in Conditions */}
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-800/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                      <span className="text-2xl text-yellow-600 dark:text-yellow-400">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-300">Mistake: Side Effects in Conditions</h3>
                      <p className="text-yellow-700 dark:text-yellow-400 mt-2">
                        Putting side effects (like function calls with side effects) in && conditions.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-red-700 dark:text-red-400 mb-2">❌ Problem Code</h4>
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-sm text-red-400 font-mono">
{`// ❌ DANGER: Function runs on every render!
{isLoggedIn && fetchUserData()}

// ❌ DANGER: setState in condition!
{shouldUpdate && setCount(count + 1)}`}
                        </pre>
                      </div>
                      <p className="text-sm text-red-600 dark:text-red-500 mt-2">
                        These functions run during render, causing infinite loops and unexpected behavior.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">✅ Solution</h4>
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-sm text-green-400 font-mono">
{`// ✅ Use useEffect for side effects
useEffect(() => {
  if (isLoggedIn) {
    fetchUserData();
  }
}, [isLoggedIn]);

// ✅ Use event handlers for updates
const handleUpdate = () => {
  if (shouldUpdate) {
    setCount(prev => prev + 1);
  }
};`}
                        </pre>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-500 mt-2">
                        Keep side effects out of render logic. Use useEffect or event handlers instead.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mistake 3: Over-Nesting */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                      <span className="text-2xl text-purple-600 dark:text-purple-400">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300">Mistake: Over-Nesting && Operators</h3>
                      <p className="text-purple-700 dark:text-purple-400 mt-2">
                        Creating deeply nested && conditions that are hard to read and maintain.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-red-700 dark:text-red-400 mb-2">❌ Problem Code</h4>
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-sm text-red-400 font-mono">
{`// ❌ Hard to read and debug
{user && 
 user.profile && 
 user.profile.settings && 
 user.profile.settings.notifications && 
 user.profile.settings.notifications.email && (
  <EmailSettings />
)}`}
                        </pre>
                      </div>
                      <p className="text-sm text-red-600 dark:text-red-500 mt-2">
                        Too many conditions make the code hard to read and maintain.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-green-700 dark:text-green-400 mb-2">✅ Solution</h4>
                      <div className="bg-gray-900 p-4 rounded-lg">
                        <pre className="text-sm text-green-400 font-mono">
{`// ✅ Use optional chaining
{user?.profile?.settings?.notifications?.email && (
  <EmailSettings />
)}

// ✅ Extract to variable
const shouldShowEmailSettings = 
  user?.profile?.settings?.notifications?.email;

{shouldShowEmailSettings && <EmailSettings />}

// ✅ Use early return pattern
if (!user?.profile?.settings?.notifications?.email) {
  return null;
}
return <EmailSettings />;`}
                        </pre>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-500 mt-2">
                        Use optional chaining or extract complex conditions to improve readability.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Common Mistakes */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-3">⚠️ Forgetting Parentheses</h4>
                    <div className="space-y-3">
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        <pre className="text-sm text-red-700 dark:text-red-400">
{`// ❌ Missing parentheses
{condition && 
  <Component1 />
  <Component2 /> // Syntax error!`}
                        </pre>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <pre className="text-sm text-green-700 dark:text-green-400">
{`// ✅ Wrap in fragment or div
{condition && (
  <>
    <Component1 />
    <Component2 />
  </>
)}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-gray-800 dark:text-white mb-3">⚠️ Using && for if-else</h4>
                    <div className="space-y-3">
                      <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                        <pre className="text-sm text-red-700 dark:text-red-400">
{`// ❌ Wrong tool for the job
{isLoading && <Spinner />}
{!isLoading && <Content />}`}
                        </pre>
                      </div>
                      <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                        <pre className="text-sm text-green-700 dark:text-green-400">
{`// ✅ Use ternary for if-else
{isLoading ? (
  <Spinner />
) : (
  <Content />
)}`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Best Practices Section */}
        {activeSection === 5 && (
          <section className="space-y-8 animate-[slideUp_0.8s_ease-out_0.4s]">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                <span className="text-green-500 mr-2">✅</span> Best Practices
              </h2>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left: Best Practices */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
                    <h3 className="font-bold text-green-800 dark:text-emerald-300 mb-4">Do's and Don'ts</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <span className="text-green-600 dark:text-emerald-500">✓</span>
                        </div>
                        <div>
                          <p className="font-medium text-green-700 dark:text-emerald-400">Do use for simple show/hide</p>
                          <p className="text-sm text-green-600 dark:text-emerald-500">Perfect for toggling single elements</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                          <span className="text-red-600 dark:text-red-500">✗</span>
                        </div>
                        <div>
                          <p className="font-medium text-red-700 dark:text-red-400">Don't use for if-else logic</p>
                          <p className="text-sm text-red-600 dark:text-red-500">Use ternary operator instead</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <span className="text-green-600 dark:text-emerald-500">✓</span>
                        </div>
                        <div>
                          <p className="font-medium text-green-700 dark:text-emerald-400">Do convert numbers to booleans</p>
                          <p className="text-sm text-green-600 dark:text-emerald-500">Use <code>&gt; 0</code> or <code>!!value</code></p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                          <span className="text-red-600 dark:text-red-500">✗</span>
                        </div>
                        <div>
                          <p className="font-medium text-red-700 dark:text-red-400">Don't put side effects in conditions</p>
                          <p className="text-sm text-red-600 dark:text-red-500">Use useEffect for side effects</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                          <span className="text-green-600 dark:text-emerald-500">✓</span>
                        </div>
                        <div>
                          <p className="font-medium text-green-700 dark:text-emerald-400">Do use optional chaining for nested objects</p>
                          <p className="text-sm text-green-600 dark:text-emerald-500"><code>user?.profile?.name</code></p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                          <span className="text-red-600 dark:text-red-500">✗</span>
                        </div>
                        <div>
                          <p className="font-medium text-red-700 dark:text-red-400">Don't create deeply nested && chains</p>
                          <p className="text-sm text-red-600 dark:text-red-500">Extract complex conditions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                    <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-4">When to Use && vs Other Methods</h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-blue-200 dark:border-blue-800">
                            <th className="py-3 px-4 text-left font-semibold text-blue-700 dark:text-blue-400">Use Case</th>
                            <th className="py-3 px-4 text-left font-semibold text-green-700 dark:text-green-400">Best Choice</th>
                            <th className="py-3 px-4 text-left font-semibold text-purple-700 dark:text-purple-400">Example</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-blue-100 dark:border-blue-900">
                            <td className="py-3 px-4">Show element or nothing</td>
                            <td className="py-3 px-4 text-green-600 dark:text-green-400">Logical AND (&&)</td>
                            <td className="py-3 px-4 font-mono text-purple-600 dark:text-purple-400">
                              {`{isLoggedIn && <Welcome />}`}
                            </td>
                          </tr>
                          <tr className="border-b border-blue-100 dark:border-blue-900">
                            <td className="py-3 px-4">Choose between A or B</td>
                            <td className="py-3 px-4 text-green-600 dark:text-green-400">Ternary Operator</td>
                            <td className="py-3 px-4 font-mono text-purple-600 dark:text-purple-400">
                              {`{isLoading ? <Spinner /> : <Content />}`}
                            </td>
                          </tr>
                          <tr className="border-b border-blue-100 dark:border-blue-900">
                            <td className="py-3 px-4">Multiple branches</td>
                            <td className="py-3 px-4 text-green-600 dark:text-green-400">if-else or switch</td>
                            <td className="py-3 px-4 font-mono text-purple-600 dark:text-purple-400">
                              {`if (role === 'admin') { ... }`}
                            </td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4">Complex conditions</td>
                            <td className="py-3 px-4 text-green-600 dark:text-green-400">Extract to variable</td>
                            <td className="py-3 px-4 font-mono text-purple-600 dark:text-purple-400">
                              {`const canEdit = user && user.isAdmin`}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Right: Code Quality Examples */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-4">Improving Code Quality</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Before: Messy Conditions</h4>
                        <div className="bg-gray-900 p-4 rounded-lg">
                          <pre className="text-sm text-red-400 font-mono">
{`// ❌ Hard to read
{user && user.profile && user.profile.settings && 
 user.profile.settings.notifications && 
 user.profile.settings.notifications.email && 
 user.profile.settings.notifications.email.enabled && (
  <EmailPreferences />
)}`}
                          </pre>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">After: Clean and Readable</h4>
                        <div className="bg-gray-900 p-4 rounded-lg">
                          <pre className="text-sm text-green-400 font-mono">
{`// ✅ Using optional chaining
const emailEnabled = 
  user?.profile?.settings?.notifications?.email?.enabled;

// ✅ Extract complex condition
{emailEnabled && <EmailPreferences />}

// Or using early return
if (!emailEnabled) {
  return null;
}
return <EmailPreferences />;`}
                          </pre>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-800/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <h4 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2">Pro Tip</h4>
                      <p className="text-yellow-700 dark:text-yellow-400 text-sm">
                        Use TypeScript or PropTypes to catch undefined errors at compile time, 
                        reducing the need for excessive null checks in your JSX.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
                    <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-4">Performance Considerations</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 dark:text-purple-500">⚡</span>
                        </div>
                        <div>
                          <p className="font-medium text-purple-700 dark:text-purple-400">Short-circuit evaluation</p>
                          <p className="text-sm text-purple-600 dark:text-purple-500">
                            && stops evaluating as soon as it encounters a falsy value
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 dark:text-purple-500">📦</span>
                        </div>
                        <div>
                          <p className="font-medium text-purple-700 dark:text-purple-400">Component extraction</p>
                          <p className="text-sm text-purple-600 dark:text-purple-500">
                            Extract complex conditional logic into separate components
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 dark:text-purple-500">🧠</span>
                        </div>
                        <div>
                          <p className="font-medium text-purple-700 dark:text-purple-400">Memoization</p>
                          <p className="text-sm text-purple-600 dark:text-purple-500">
                            Use useMemo for expensive calculations in conditions
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Teacher's Note */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl overflow-hidden animate-[slideUp_0.8s_ease-out_0.6s]">
              <div className="p-6 md:p-8 text-white">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-2xl md:text-3xl">👨‍🏫</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h3 className="text-2xl font-bold">Teacher's Note</h3>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                        Sukanta Hui | 27 years experience
                      </span>
                    </div>
                    <div className="space-y-4">
                      <p className="text-white/90 leading-relaxed">
                        In my 27 years of teaching programming from Ichapur to Naihati, I've seen that mastering && 
                        conditional rendering is a milestone in every student's React journey. It's the point where 
                        they move from verbose if-else statements to elegant, declarative code.
                      </p>
                      <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                        <h4 className="font-bold mb-2">Golden Rule to Remember:</h4>
                        <p className="text-white/90">
                          "Use && when you want to show something or nothing. Use ternary when you need to choose 
                          between two different somethings. Extract to variables when the condition gets complex."
                        </p>
                      </div>
                      <p className="text-white/90">
                        When <span className="font-semibold">Abhronila</span> was learning this, I had her practice 
                        by converting all her if-else statements to && and ternary operators. After a week, her code 
                        was 40% shorter and much more readable. The key is knowing which tool to use for which job.
                      </p>
                      <div className="pt-4 border-t border-white/20">
                        <p className="text-sm text-white/80">
                          Email: sukantahui@codernaccotax.co.in | Mobile: 7003756860
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Learning Checklist</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Understanding Check</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <input type="checkbox" className="w-5 h-5 mt-0.5 text-blue-600 rounded" />
                      <div>
                        <p className="font-medium">I understand how && short-circuit evaluation works</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Returns right side only if left is truthy</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <input type="checkbox" className="w-5 h-5 mt-0.5 text-blue-600 rounded" />
                      <div>
                        <p className="font-medium">I can identify when to use && vs ternary vs if-else</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Different tools for different jobs</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <input type="checkbox" className="w-5 h-5 mt-0.5 text-blue-600 rounded" />
                      <div>
                        <p className="font-medium">I know the common pitfalls with && rendering</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Zero rendering, side effects, etc.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Skill Practice</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <input type="checkbox" className="w-5 h-5 mt-0.5 text-green-600 rounded" />
                      <div>
                        <p className="font-medium">I can refactor if-else statements to use &&</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">For simple show/hide cases</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <input type="checkbox" className="w-5 h-5 mt-0.5 text-green-600 rounded" />
                      <div>
                        <p className="font-medium">I can handle the zero rendering problem</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Using comparisons or !! operator</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <input type="checkbox" className="w-5 h-5 mt-0.5 text-green-600 rounded" />
                      <div>
                        <p className="font-medium">I can create clean, readable conditional logic</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Using optional chaining and extraction</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">Hint Section</h3>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-800/20 rounded-lg p-4">
                  <p className="text-blue-800 dark:text-blue-300 italic">
                    Think about: What happens when Debangshu's product list is empty? 
                    Observe carefully how the zero rendering problem manifests in the e-commerce demo.
                    Try converting the user profile's role check from && to ternary and see if it improves readability.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Inline styles for animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
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
        
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeIn_0\\.8s_ease-out\\],
          .animate-\\[slideUp_0\\.8s_ease-out\\],
          .animate-\\[slideUp_0\\.8s_ease-out_0\\.2s\\],
          .animate-\\[slideUp_0\\.8s_ease-out_0\\.4s\\],
          .animate-\\[slideUp_0\\.8s_ease-out_0\\.6s\\] {
            animation: none !important;
            opacity: 1;
            transform: none !important;
          }
        }
        
        /* Hide scrollbar for navigation */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Topic24;