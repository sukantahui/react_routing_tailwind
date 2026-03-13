import { useState, useEffect } from 'react';
import clsx from 'clsx';
import ReactCodeBlock from "../../../../../common/ReactCodeBlock"

const Topic21 = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [activeTab, setActiveTab] = useState('default');
  const [componentConfig, setComponentConfig] = useState({
    showName: true,
    showAge: true,
    showCity: true,
    isStudent: true,
    rating: 4
  });
  const [validationErrors, setValidationErrors] = useState([]);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]';

  // Component with default props
  const UserCard = ({ 
    name = 'Swadeep',
    age = 25,
    city = 'Barrackpore',
    isStudent = true,
    rating = 5,
    onRatingChange
  }) => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {name.charAt(0)}
          </div>
          <div>
            {componentConfig.showName && (
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{name}</h3>
            )}
            {componentConfig.showAge && (
              <p className="text-gray-600 dark:text-gray-400">Age: {age}</p>
            )}
            {componentConfig.showCity && (
              <p className="text-gray-600 dark:text-gray-400">From: {city}</p>
            )}
            <p className="text-gray-600 dark:text-gray-400">
              Status: {isStudent ? 'Student 🎓' : 'Professional 💼'}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-gray-600 dark:text-gray-400 mr-2">Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => onRatingChange && onRatingChange(star)}
                  className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            This card uses <strong>default props</strong> when values are not provided.
          </p>
        </div>
      </div>
    );
  };

  // Validated component
  const ValidatedUserCard = ({ name, age, city, isStudent, rating }) => {
    // Manual prop validation (conceptual - real apps use PropTypes or TypeScript)
    const errors = [];
    
    if (!name || typeof name !== 'string') {
      errors.push('Name must be a non-empty string');
    }
    
    if (typeof age !== 'number' || age < 0 || age > 150) {
      errors.push('Age must be a number between 0 and 150');
    }
    
    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      errors.push('Rating must be a number between 1 and 5');
    }
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      return (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
          <h4 className="text-lg font-bold text-red-700 dark:text-red-300 mb-2">
            ❌ Prop Validation Failed
          </h4>
          <ul className="text-sm space-y-1">
            {errors.map((error, idx) => (
              <li key={idx} className="flex items-start">
                <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-1 mr-2"></span>
                {error}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    
    setValidationErrors([]);
    return <UserCard name={name} age={age} city={city} isStudent={isStudent} rating={rating} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-6 md:p-8">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-12">
        <div className={`${animationClass} opacity-0`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Default Props & Basic Prop Validation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Making components robust and developer-friendly with sensible defaults and validation
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full">
            <span className="text-lg">🛡️</span>
            <span className="font-medium">Component Safety - Prevent bugs before they happen</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Why Default Props & Validation Matter */}
        <section className={`mb-12 ${animationClass} opacity-0`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300 flex items-center gap-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
              </svg>
              The Importance of Component Safety
            </h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">
                    The Problem: Fragile Components
                  </h3>
                  <p className="mb-4">
                    Without defaults and validation, components break easily:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                      <span>Missing props cause errors</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                      <span>Wrong data types break rendering</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                      <span>Debugging takes hours</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-300">
                    Real-World Analogy: Barrackpore Restaurant Menu
                  </h3>
                  <p className="mb-4">
                    Think of components as restaurant menu items:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-600 dark:text-purple-400">🍛</span>
                      </span>
                      <span><strong>Default Props</strong> = Standard meal (comes with rice, dal)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-600 dark:text-purple-400">📋</span>
                      </span>
                      <span><strong>Prop Validation</strong> = Kitchen checks order (no chicken in veg order)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-600 dark:text-purple-400">✅</span>
                      </span>
                      <span><strong>Result</strong> = Happy customers, no wrong orders</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 p-6 rounded-xl border-l-4 border-emerald-500">
                <h3 className="text-xl font-bold mb-3 text-emerald-800 dark:text-emerald-300">
                  Local Developer Story: The Ichapur College Portal Bug
                </h3>
                <p>
                  <strong>Tuhina</strong> built a StudentCard component without defaults. When 
                  <strong>Abhronila</strong> used it without providing 'courses' prop, the entire 
                  portal crashed. Adding default props fixed it instantly.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-red-600 dark:text-red-400">Before:</h4>
                    <code className="text-sm">courses.map() // TypeError if courses is undefined</code>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-green-600 dark:text-green-400">After:</h4>
                    <code className="text-sm">courses = [] // Default empty array</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Default Props Deep Dive */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[100ms]`}>
          <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                Default Props: The Safety Net
              </h2>
              
              <div className="flex space-x-2">
                {['default', 'examples', 'live'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={clsx(
                      'px-4 py-2 rounded-lg font-medium transition-all duration-300 capitalize',
                      activeTab === tab
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    )}
                  >
                    {tab === 'default' ? 'Concepts' : 
                     tab === 'examples' ? 'Examples' : 
                     'Live Demo'}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              {activeTab === 'default' && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                      What Are Default Props?
                    </h3>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300">
                      Default props are <strong>fallback values</strong> that a component uses 
                      when props are not provided by the parent. They make components more 
                      resilient and easier to use.
                    </p>
                    
                    <div className="bg-gray-900 text-gray-100 p-6 rounded-xl mb-6">
                      <pre className="text-sm">
{`// Component WITH default props
function Button({ 
  label = "Click Me",  // Default value
  variant = "primary", // Default value
  onClick 
}) {
  return (
    <button className={\`btn btn-\${variant}\`} onClick={onClick}>
      {label}
    </button>
  );
}

// Usage - both work!
<Button />                     // Uses defaults: "Click Me", "primary"
<Button label="Submit" />      // Uses: "Submit", "primary"
<Button variant="secondary" /> // Uses: "Click Me", "secondary"`}
                      </pre>
                    </div>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-bold mb-2 text-blue-800 dark:text-blue-300">Key Benefit:</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Components work even when developers forget to provide all props. 
                        This is especially useful in large teams.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                      <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">When to Use Default Props</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                          <span><strong>Optional props</strong> that have sensible defaults</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                          <span><strong>Configuration props</strong> (size, variant, theme)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                          <span><strong>Empty state defaults</strong> (empty arrays, objects)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                          <span><strong>Team collaboration</strong> to prevent breaking changes</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                      <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">When NOT to Use Default Props</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="inline-block w-3 h-3 bg-red-500 rounded-full mt-1 mr-3"></span>
                          <span><strong>Required props</strong> (use validation instead)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-3 h-3 bg-red-500 rounded-full mt=1 mr-3"></span>
                          <span><strong>Complex business logic</strong> that needs explicit data</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-3 h-3 bg-red-500 rounded-full mt-1 mr-3"></span>
                          <span><strong>Performance-critical</strong> components</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'examples' && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                        Common Default Prop Patterns
                      </h3>
                      
                      <div className="space-y-4">
                        {[
                          {
                            type: 'Primitive Values',
                            example: 'size = "medium", count = 0, isActive = false',
                            use: 'Simple configuration'
                          },
                          {
                            type: 'Empty Collections',
                            example: 'items = [], data = {}',
                            use: 'Prevent "undefined" errors'
                          },
                          {
                            type: 'Function Placeholders',
                            example: 'onClick = () => {}, onSubmit = () => console.warn(...)',
                            use: 'Safe event handling'
                          },
                          {
                            type: 'Complex Objects',
                            example: 'config = { theme: "light", locale: "en" }',
                            use: 'Configuration objects'
                          }
                        ].map((item, index) => (
                          <div 
                            key={index}
                            className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                          >
                            <div className="font-bold mb-2">{item.type}</div>
                            <code className="text-sm block mb-2">{item.example}</code>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{item.use}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                        Naihati Business Directory Example
                      </h3>
                      
                      <div className="bg-gray-900 text-gray-100 p-6 rounded-xl mb-6">
                        <pre className="text-sm">
{`// BusinessCard with sensible defaults
function BusinessCard({
  name = "New Business",
  category = "General",
  address = { street: "", city: "Naihati" },
  contact = { phone: "Not provided", email: "" },
  rating = 0,
  reviews = []
}) {
  // Component can safely use all props
  return (
    <div className="business-card">
      <h3>{name}</h3>
      <p>Category: {category}</p>
      <p>Address: {address.street}, {address.city}</p>
      {/* Safe to map even if no reviews */}
      {reviews.map((review, idx) => (
        <div key={idx}>{review.text}</div>
      ))}
    </div>
  );
}`}
                        </pre>
                      </div>
                      
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h4 className="font-bold mb-2 text-green-800 dark:text-green-300">Benefits:</h4>
                        <ul className="text-sm space-y-1">
                          <li>• New businesses can be added quickly</li>
                          <li>• Missing data doesn't crash the app</li>
                          <li>• Different team members can use it safely</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 p-6 rounded-xl">
                    <h4 className="text-xl font-bold mb-3 text-amber-800 dark:text-amber-300">
                      Pitfall: Mutable Default Values
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <h5 className="font-bold mb-2 text-red-600 dark:text-red-400">❌ DANGER:</h5>
                        <code className="text-sm">
                          function Cart({ items = [] }) {'{'} ... {'}'}
                        </code>
                        <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
                          Same array shared across all Cart instances!
                        </p>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                        <h5 className="font-bold mb-2 text-green-600 dark:text-green-400">✅ SAFE:</h5>
                        <code className="text-sm">
                          function Cart({ items }) {'{'}<br/>
                          &nbsp;&nbsp;const safeItems = items || [];<br/>
                          &nbsp;&nbsp;...<br/>
                          {'}'}
                        </code>
                        <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
                          Fresh array for each component instance
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'live' && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                        Configure Default Props
                      </h3>
                      
                      <div className="space-y-4 mb-6">
                        {Object.entries(componentConfig).map(([key, value]) => (
                          <div key={key} className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
                            <label className="flex items-center justify-between">
                              <span className="font-medium capitalize">
                                {key.replace('show', 'Show ').replace('is', 'Is ')}
                              </span>
                              {typeof value === 'boolean' ? (
                                <button
                                  onClick={() => setComponentConfig({...componentConfig, [key]: !value})}
                                  className={`px-4 py-2 rounded ${value ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
                                >
                                  {value ? 'ON' : 'OFF'}
                                </button>
                              ) : (
                                <input
                                  type="range"
                                  min="1"
                                  max="5"
                                  value={value}
                                  onChange={(e) => setComponentConfig({...componentConfig, [key]: parseInt(e.target.value)})}
                                  className="w-32"
                                />
                              )}
                            </label>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="font-bold mb-2 text-blue-800 dark:text-blue-300">Current Configuration:</h4>
                        <code className="text-sm">
                          {JSON.stringify(componentConfig, null, 2)}
                        </code>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                        Live Component Output
                      </h3>
                      <p className="mb-4 text-gray-600 dark:text-gray-400">
                        This UserCard uses default props when values are missing:
                      </p>
                      
                      <UserCard 
                        name={componentConfig.showName ? "Swadeep" : undefined}
                        age={componentConfig.showAge ? 25 : undefined}
                        city={componentConfig.showCity ? "Barrackpore" : undefined}
                        isStudent={componentConfig.isStudent}
                        rating={componentConfig.rating}
                        onRatingChange={(newRating) => setComponentConfig({...componentConfig, rating: newRating})}
                      />
                      
                      <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <h4 className="font-bold mb-2 text-emerald-800 dark:text-emerald-300">What's Happening:</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          When you turn OFF a field, we pass <code>undefined</code>. The component 
                          uses its default prop value instead.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-6 rounded-xl">
                    <h4 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-300">
                      Code Behind This Demo
                    </h4>
                    <div className="bg-gray-900 text-gray-100 p-6 rounded-xl">
                      <pre className="text-sm">
{`// The UserCard component with default props
function UserCard({ 
  name = 'Swadeep',      // Default name
  age = 25,              // Default age
  city = 'Barrackpore',  // Default city
  isStudent = true,      // Default status
  rating = 5,            // Default rating
  onRatingChange
}) {
  return (
    <div>
      <h3>{name}</h3>     {/* Uses default if undefined */}
      <p>Age: {age}</p>   {/* Uses default if undefined */}
      {/* ... rest of component */}
    </div>
  );
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Prop Validation */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[200ms]`}>
          <h2 className="text-3xl font-bold mb-8 text-red-700 dark:text-red-300">
            Prop Validation: Catching Errors Early
          </h2>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    Why Validate Props?
                  </h3>
                  <p className="mb-6 text-gray-700 dark:text-gray-300">
                    Validation catches errors during <strong>development</strong>, not in production. 
                    It's like having a spell-checker for your component usage.
                  </p>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg mb-6">
                    <h4 className="font-bold mb-2 text-green-600 dark:text-green-400">Development Benefits:</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1 mr-2"></span>
                        <span>Catch bugs during development</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1 mr-2"></span>
                        <span>Self-documenting component APIs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt=1 mr-2"></span>
                        <span>Better IDE autocomplete and hints</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-bold mb-2 text-blue-600 dark:text-blue-400">Team Benefits:</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1 mr-2"></span>
                        <span>Clear component contracts</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1 mr-2"></span>
                        <span>Onboarding new developers faster</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-1 mr-2"></span>
                        <span>Prevent breaking changes</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    Shyamnagar Municipality Example
                  </h3>
                  
                  <div className="bg-gray-900 text-gray-100 p-6 rounded-xl mb-6">
                    <pre className="text-sm">
{`// ComplaintForm without validation
function ComplaintForm({ onSubmit }) {
  // What if onSubmit is not a function?
  // What if required fields are missing?
  return <form>...</form>;
}

// ComplaintForm WITH validation
function ComplaintForm({ onSubmit }) {
  // Early validation
  if (typeof onSubmit !== 'function') {
    console.error('ComplaintForm: onSubmit must be a function');
    return <div>Error: Invalid form configuration</div>;
  }
  
  return <form onSubmit={onSubmit}>...</form>;
}`}
                    </pre>
                  </div>
                  
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                    <h4 className="font-bold mb-2 text-amber-800 dark:text-amber-300">Impact:</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Without validation, form submissions would fail silently. 
                      With validation, developers get clear error messages immediately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Validation Techniques */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                Validation Techniques (Conceptual Overview)
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    technique: "Runtime Validation",
                    description: "Check props inside component",
                    example: "if (typeof name !== 'string') return <Error />",
                    pros: "Simple, works anywhere",
                    cons: "Runs on every render"
                  },
                  {
                    technique: "PropTypes Library",
                    description: "React's built-in type checking",
                    example: "Button.propTypes = { size: PropTypes.string }",
                    pros: "Standard, good error messages",
                    cons: "Development only, not type-safe"
                  },
                  {
                    technique: "TypeScript",
                    description: "Static type checking",
                    example: "interface Props { name: string; age?: number }",
                    pros: "Compile-time, excellent tooling",
                    cons: "Learning curve, setup required"
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 p-6 rounded-xl"
                  >
                    <h4 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">
                      {item.technique}
                    </h4>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">{item.description}</p>
                    
                    <div className="mb-4 p-3 bg-white dark:bg-gray-800 rounded">
                      <div className="font-semibold mb-1">Example:</div>
                      <code className="text-xs">{item.example}</code>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                        <div className="font-semibold">✅ Pros</div>
                        <div className="text-xs">{item.pros}</div>
                      </div>
                      <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
                        <div className="font-semibold">❌ Cons</div>
                        <div className="text-xs">{item.cons}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-xl">
                <h4 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-300">
                  Live Validation Demo
                </h4>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h5 className="font-bold mb-3 text-gray-700 dark:text-gray-300">Test Invalid Props:</h5>
                    <div className="space-y-4">
                      <button
                        onClick={() => {
                          setValidationErrors([]);
                          // Simulate using component with invalid props
                          setTimeout(() => {
                            setValidationErrors([
                              'Name must be a non-empty string',
                              'Age must be a number between 0 and 150'
                            ]);
                          }, 100);
                        }}
                        className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold"
                      >
                        Test: Invalid Name & Age
                      </button>
                      
                      <button
                        onClick={() => {
                          setValidationErrors([]);
                          setTimeout(() => {
                            setValidationErrors([
                              'Rating must be a number between 1 and 5'
                            ]);
                          }, 100);
                        }}
                        className="w-full px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold"
                      >
                        Test: Invalid Rating
                      </button>
                      
                      <button
                        onClick={() => setValidationErrors([])}
                        className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold"
                      >
                        Test: Valid Props
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="font-bold mb-3 text-gray-700 dark:text-gray-300">Validation Output:</h5>
                    
                    {validationErrors.length > 0 ? (
                      <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                        <h6 className="font-bold text-red-700 dark:text-red-300 mb-3">
                          ❌ Validation Failed ({validationErrors.length} errors)
                        </h6>
                        <ul className="space-y-2">
                          {validationErrors.map((error, idx) => (
                            <li key={idx} className="flex items-start text-sm">
                              <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-1 mr-2"></span>
                              {error}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <div className="p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                        <h6 className="font-bold text-green-700 dark:text-green-300 mb-3">
                          ✅ All Props Valid
                        </h6>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          The component would render successfully with these props.
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      <strong>Note:</strong> This is conceptual validation. Real apps use 
                      PropTypes or TypeScript for better developer experience.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[300ms]`}>
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-emerald-700 dark:text-emerald-300">
              Best Practices for Local Projects
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Default Props Guidelines
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded">
                      <span>Use for optional configuration</span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded text-xs">
                        ✅ Do
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded">
                      <span>Avoid mutable default values</span>
                      <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 rounded text-xs">
                        ❌ Don't
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded">
                      <span>Document default values</span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded text-xs">
                        ✅ Do
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Project-Specific Recommendations
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mt-1 mr-3"></span>
                      <span><strong>Barrackpore small apps:</strong> Manual validation in component</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mt-1 mr-3"></span>
                      <span><strong>Naihati medium apps:</strong> PropTypes for all components</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mt-1 mr-3"></span>
                      <span><strong>Ichapur large apps:</strong> TypeScript with strict mode</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mt-1 mr-3"></span>
                      <span><strong>Shyamnagar teams:</strong> Code reviews check prop validation</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Validation Guidelines
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                      <div className="font-bold text-sm">Validate Early</div>
                      <code className="text-xs">Check props at start</code>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded">
                      <div className="font-bold text-sm">Don't Validate Everything</div>
                      <code className="text-xs">Focus on critical props</code>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <div className="font-bold text-sm">Clear Error Messages</div>
                      <code className="text-xs">Help developers fix</code>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                      <div className="font-bold text-sm">Development Only</div>
                      <code className="text-xs">Strip in production</code>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Common Validation Rules
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                      <span>Required vs optional props</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                      <span>Type checking (string, number, boolean)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                      <span>Range validation (min/max values)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                      <span>Enum values (specific allowed values)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[400ms]`}>
          <h2 className="text-3xl font-bold mb-6 text-red-700 dark:text-red-300">
            Common Pitfalls & How to Avoid Them
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                pitfall: "Shared Mutable Defaults",
                problem: "Arrays/objects as defaults get shared between instances",
                solution: "Use functions or inline defaults for mutable values",
                example: "❌ items = [] → ✅ items = props.items || []"
              },
              {
                pitfall: "Over-Validation",
                problem: "Validating everything slows development",
                solution: "Validate only critical, complex, or public API props",
                example: "❌ Validate every string → ✅ Validate user input only"
              },
              {
                pitfall: "Silent Defaults",
                problem: "Defaults hide missing required data",
                solution: "Use validation for required props, defaults for optional",
                example: "❌ name = 'Unknown' (hides bug) → ✅ Validate name required"
              },
              {
                pitfall: "Production Validation",
                problem: "Validation code runs in production, hurting performance",
                solution: "Use PropTypes (stripped in prod) or build-time TypeScript",
                example: "❌ if (typeof x !== 'string') in production"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 border border-red-200 dark:border-red-800 rounded-xl p-5 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                    <span className="text-red-600 dark:text-red-400 font-bold">⚠️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200">{item.pitfall}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.problem}</p>
                  </div>
                </div>
                
                <div className="mb-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="font-semibold text-green-700 dark:text-green-300">Solution: {item.solution}</p>
                </div>
                
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg">
                  <code className="text-sm">{item.example}</code>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 p-6 rounded-xl">
            <h4 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">
              Debugging Tip for Local Teams
            </h4>
            <p className="mb-3">
              When components behave unexpectedly:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Check if props are missing (use defaults as safety net)</li>
              <li>Verify prop types match expectations (add validation)</li>
              <li>Look for shared mutable defaults between instances</li>
              <li>Test component with minimal props (does it work?)</li>
              <li>Add PropTypes/TypeScript for early error detection</li>
            </ol>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[500ms]`}>
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 border-l-4 border-amber-500 dark:border-amber-400 rounded-r-xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-2xl">👨‍🏫</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-amber-800 dark:text-amber-300">Teacher's Note</h3>
                  <span className="text-sm bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 px-3 py-1 rounded-full">
                    Sukanta Hui
                  </span>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-bold text-lg mb-2 text-gray-800 dark:text-gray-200">
                      The Professional Mindset
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Beginners think: <strong>"My component works when I use it"</strong>
                      <br/>
                      Professionals think: <strong>"Will other developers use this correctly?"</strong>
                      <br/>
                      When <strong>Debangshu</strong> added prop validation to his Barrackpore app, 
                      new team members made 80% fewer mistakes using his components.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <h5 className="font-bold mb-1 text-red-600 dark:text-red-400">Remember:</h5>
                      <p className="text-sm">Defaults make components friendly, validation makes them robust.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <h5 className="font-bold mb-1 text-green-600 dark:text-green-400">Pro Tip:</h5>
                      <p className="text-sm">Start with PropTypes, graduate to TypeScript as team grows.</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-amber-200 dark:border-amber-800">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Contact:</strong> sukantahui@codernaccotax.co.in | 7003756860<br/>
                      <strong>Experience:</strong> 27 years in Programming Language, RDBMs, Operating System, Web Development
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practice & Checklist */}
        <section className={`${animationClass} opacity-0 motion-safe:animate-delay-[600ms]`}>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-indigo-700 dark:text-indigo-300">
              Practice Exercise & Checklist
            </h2>
            
            <div className="grid md:grid-cols-1 gap-8">
              <div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl mb-6">
                  <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    📝 Exercise: Enhance ProductCard Component
                  </h4>
                  
                  <div className="space-y-4 mb-6">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                      <h5 className="font-bold mb-1">Current Component:</h5>
                      
                        <ReactCodeBlock
                          title="Simple React Component"
                          code={
                          `function ProductCard({ name, price, category, onAddToCart }) {
                      return (
                            <div>
                              <h3>{name}</h3>
                              <p>Price: ₹{price}</p>
                              <p>Category: {category}</p>
                              <button onClick={onAddToCart}>Add to Cart</button>
                            </div>
                          );
                        }`}
                        >
                        </ReactCodeBlock>
                 
                    </div>
                    
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h5 className="font-bold mb-1">Your Task:</h5>
                      <ol className="text-sm space-y-1 pl-5">
                        <li>1. Add sensible default props</li>
                        <li>2. Add prop validation (conceptual)</li>
                        <li>3. Handle edge cases gracefully</li>
                        <li>4. Make component robust for team use</li>
                      </ol>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => alert('Start with defaults: category = "General", onAddToCart = () => console.warn(...). Add validation: if (!name || typeof price !== "number") return <Error />')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Click for Starter Solution
                  </button>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h5 className="font-bold mb-3 text-gray-800 dark:text-gray-200">💡 Hint Section</h5>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Think about:</strong> Which props are truly required vs optional?
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Observe carefully:</strong> What happens when price is undefined or negative?
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Try changing:</strong> Make onAddToCart optional. How does the component behave?
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                  ✅ Default Props & Validation Checklist
                </h4>
                
                <div className="space-y-4">
                  {[
                    "Default props for optional configuration",
                    "No mutable defaults (arrays/objects)",
                    "Required props validated early",
                    "Clear error messages for invalid props",
                    "Type checking for critical props",
                    "Range validation where applicable",
                    "Sensible fallback values",
                    "Documentation for expected props",
                    "Development-only validation",
                    "Team agreement on validation strategy"
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-4">
                        <span className="text-gray-500 dark:text-gray-400">{index + 1}</span>
                      </div>
                      <span className="flex-1 text-sm">{`{item}`}</span>
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-5 rounded-xl">
                  <h5 className="font-bold mb-2 text-emerald-800 dark:text-emerald-300">Next Steps:</h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    With props basics covered, you're ready to understand React's rendering 
                    engine at a conceptual level. Next, we'll explore the 
                    <strong> Virtual DOM and reconciliation process</strong> - how React 
                    efficiently updates the UI.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full">
                    <span>🎯</span>
                    <span className="font-medium">Coming Next: Understanding Virtual DOM at a conceptual level</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Inline Styles for Animations */}
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
        
        @media (prefers-reduced-motion: reduce) {
          .motion-safe\\:animate-\\[fadeInUp_0\\.6s_ease-out_forwards\\] {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }
        
        /* Smooth transitions for validation messages */
        .validation-transition {
          transition: all 0.3s ease;
        }
        
        pre {
          transition: all 0.3s ease;
        }
        
        pre:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};

export default Topic21;