import { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic20 = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [activeTab, setActiveTab] = useState('immutability');
  const [userData, setUserData] = useState({
    name: 'Swadeep',
    age: 25,
    city: 'Barrackpore',
    isStudent: true
  });
  const [attemptedMutation, setAttemptedMutation] = useState('');
  const [showError, setShowError] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]';

  // Child component that receives props
  const UserProfile = ({ user, onUpdate }) => {
    // Attempt to mutate props (WRONG!)
    const attemptMutation = () => {
      setShowError(true);
      setAttemptedMutation('props.user.name = "Tuhina"');
      setTimeout(() => setShowError(false), 3000);
    };

    // Correct way: Call parent function
    const correctUpdate = () => {
      onUpdate({ ...user, name: 'Tuhina', city: 'Ichapur' });
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{user.name}</h3>
            <p className="text-gray-600 dark:text-gray-400">Age: {user.age}</p>
            <p className="text-gray-600 dark:text-gray-400">City: {user.city}</p>
            <p className="text-gray-600 dark:text-gray-400">
              Status: {user.isStudent ? 'Student 🎓' : 'Professional 💼'}
            </p>
          </div>
        </div>
        
        <div className="space-y-3">
          <button
            onClick={attemptMutation}
            className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors duration-300"
          >
            ❌ Try to Mutate Props (WRONG!)
          </button>
          
          <button
            onClick={correctUpdate}
            className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-colors duration-300"
          >
            ✅ Request Update via Callback (CORRECT!)
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-6 md:p-8">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-12">
        <div className={`${animationClass} opacity-0`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-400 dark:to-orange-400">
            Props Immutability & Read-Only Behavior
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Understanding why React props are immutable and how to work with them correctly
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full">
            <span className="text-lg">🔒</span>
            <span className="font-medium">The Golden Rule: Props are READ-ONLY!</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* The Immutability Concept */}
        <section className={`mb-12 ${animationClass} opacity-0`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300 flex items-center gap-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              What Does "Props are Immutable" Mean?
            </h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">
                    The Technical Definition
                  </h3>
                  <p className="mb-4">
                    <strong>Immutability</strong> means "cannot be changed." In React, props are 
                    <strong> read-only</strong> - once a parent component passes props to a child, 
                    the child cannot modify them.
                  </p>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <code className="text-sm">
                      // ❌ This will NOT work (and might break your app!)
                      <br/>
                      props.name = "New Name";
                    </code>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-300">
                    Real-World Analogy: Barrackpore Library Books
                  </h3>
                  <p className="mb-4">
                    Think of props as <strong>library books</strong>:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-600 dark:text-purple-400">📚</span>
                      </span>
                      <span><strong>Parent</strong> = Librarian (owns the book)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-600 dark:text-purple-400">📖</span>
                      </span>
                      <span><strong>Props</strong> = Library book (can be borrowed)</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-600 dark:text-purple-400">✍️</span>
                      </span>
                      <span><strong>Child</strong> = Reader (can read, but CANNOT write in the book)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 p-6 rounded-xl border-l-4 border-red-500">
                <h3 className="text-xl font-bold mb-3 text-red-800 dark:text-red-300">
                  Why React Enforces Prop Immutability
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-200">Predictability</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                        <span>Components behave consistently</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                        <span>Easier to reason about data flow</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt=2 mr-3"></span>
                        <span>No hidden side effects</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-200">Performance</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></span>
                        <span>React can optimize re-renders</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></span>
                        <span>Shallow comparison works reliably</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></span>
                        <span>Memoization becomes effective</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Demonstration */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[100ms]`}>
          <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                Live Demonstration: Mutating vs Immutable Patterns
              </h2>
              
              <div className="flex space-x-2">
                {['immutability', 'wrong', 'right'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={clsx(
                      'px-4 py-2 rounded-lg font-medium transition-all duration-300 capitalize',
                      activeTab === tab
                        ? tab === 'wrong' 
                          ? 'bg-red-600 text-white'
                          : tab === 'right'
                          ? 'bg-green-600 text-white'
                          : 'bg-purple-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    )}
                  >
                    {tab === 'immutability' ? 'Concept' : 
                     tab === 'wrong' ? 'Wrong Way' : 
                     'Right Way'}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              {activeTab === 'immutability' && (
                <div className="grid md:grid-cols-1 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                      The Data Flow in React
                    </h3>
                    
                    <div className="relative py-8">
                      {/* Data flow visualization */}
                      <div className="absolute left-0 right-0 top-1/2 h-2 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transform -translate-y-1/2"></div>
                      
                      <div className="relative flex justify-between">
                        {[
                          { name: 'Parent', role: 'Data Owner', color: 'bg-green-500' },
                          { name: 'Props', role: 'Data Channel', color: 'bg-blue-500' },
                          { name: 'Child', role: 'Data Reader', color: 'bg-purple-500' }
                        ].map((item, index) => (
                          <div key={index} className="relative z-10 text-center">
                            <div className={`${item.color} w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-white`}>
                              {index === 0 && '🏠'}
                              {index === 1 && '📤'}
                              {index === 2 && '👶'}
                            </div>
                            <div className="font-bold">{item.name}</div>
                            <div className="text-xs mt-1 opacity-80">{item.role}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-8 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-full">
                          <span className="text-2xl">➡️</span>
                          <span className="font-medium">One-way data flow: Parent → Props → Child</span>
                          <span className="text-2xl">⬅️</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                          Data flows down, events flow up (via callbacks)
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-bold mb-2 text-blue-800 dark:text-blue-300">Local Example</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        In <strong>Swadeep's</strong> Barrackpore business directory:
                        <br/>
                        • Parent: BusinessList (owns business data)
                        <br/>
                        • Props: business info (name, address, phone)
                        <br/>
                        • Child: BusinessCard (displays but cannot modify)
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                      <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">The Contract</h4>
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-lg">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <strong>Props are a contract</strong> between parent and child:
                          <br/><br/>
                          Parent: "Here's some data. You can read it, but don't change it."
                          <br/><br/>
                          Child: "I promise to only read this data. If I need changes, I'll ask via callbacks."
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                      <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">Consequences of Mutation</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                          <span>React won't detect the change (no re-render)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                          <span>Other components see inconsistent data</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                          <span>Hard-to-find bugs appear</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'wrong' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold mb-4 text-red-800 dark:text-red-300">
                      ❌ The WRONG Way: Mutating Props
                    </h3>
                    
                    <div className="grid md:grid-cols-1 gap-8">
                      <div>
                        <div className="bg-gray-900 text-gray-100 p-6 rounded-xl mb-6">
                          <pre className="text-sm">
{`// WRONG: Child component trying to mutate props
function UserProfile(props) {
  // ❌ Attempting to mutate props directly
  props.user.name = "Tuhina";  // SILENT FAILURE!
  props.user.age = 26;         // React won't detect this
  
  return (
    <div>
      <h2>{props.user.name}</h2>
      <p>Age: {props.user.age}</p>
    </div>
  );
}`}
                          </pre>
                        </div>
                        
                        <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-lg">
                          <h4 className="font-bold mb-2 text-red-800 dark:text-red-300">What Happens:</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Mutation happens but React doesn't know</li>
                            <li>• No re-render triggered</li>
                            <li>• Other components see old data</li>
                            <li>• Bug is silent and hard to debug</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl mb-6">
                          <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">Common Mutation Mistakes</h4>
                          <div className="space-y-4">
                            {[
                              "props.item.price = 100",
                              "props.list.push('new item')",
                              "props.user.address.city = 'Ichapur'",
                              "delete props.user.email"
                            ].map((mistake, idx) => (
                              <div key={idx} className="p-3 bg-red-50 dark:bg-red-900/20 rounded">
                                <code className="text-sm text-red-600 dark:text-red-400">{mistake}</code>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                          <h4 className="font-bold mb-2 text-amber-800 dark:text-amber-300">Naihati Project Example</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            <strong>Abhronila</strong> tried to update product prices in ProductCard.
                            The UI didn't update, but console showed changed prices. 
                            Hours wasted debugging!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {showError && (
                    <div className="animate-pulse">
                      <div className="p-6 bg-red-900 text-red-100 rounded-xl border-2 border-red-500">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl">🚨</span>
                          <h4 className="text-xl font-bold">Mutation Attempt Detected!</h4>
                        </div>
                        <p className="mb-2">
                          You tried to execute: <code className="bg-red-800 px-2 py-1 rounded">{attemptedMutation}</code>
                        </p>
                        <p className="text-sm opacity-90">
                          In React, props are read-only. This mutation would fail silently in production!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'right' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold mb-4 text-green-800 dark:text-green-300">
                      ✅ The RIGHT Way: Immutable Patterns
                    </h3>
                    
                    <div className="grid md:grid-cols-1 gap-8">
                      <div>
                        <div className="bg-gray-900 text-gray-100 p-6 rounded-xl mb-6">
                          <pre className="text-sm">
{`// RIGHT: Child requests changes via callback
function UserProfile({ user, onUpdateUser }) {
  const handleUpdate = () => {
    // ✅ Create NEW object with changes
    const updatedUser = {
      ...user,           // Copy existing properties
      name: "Tuhina",    // Override name
      city: "Ichapur"    // Override city
    };
    
    // ✅ Send update request to parent
    onUpdateUser(updatedUser);
  };
  
  return (
    <div>
      <h2>{user.name}</h2>
      <p>City: {user.city}</p>
      <button onClick={handleUpdate}>
        Update City
      </button>
    </div>
  );
}`}
                          </pre>
                        </div>
                        
                        <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <h4 className="font-bold mb-2 text-green-800 dark:text-green-300">What Happens:</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Child creates new data object</li>
                            <li>• Requests parent to update via callback</li>
                            <li>• Parent updates its state</li>
                            <li>• React re-renders with new props</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl mb-6">
                          <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">Correct Patterns</h4>
                          <div className="space-y-4">
                            {[
                              {
                                pattern: "Callback Props",
                                example: "onUpdate={handleUpdate}",
                                use: "Child → parent communication"
                              },
                              {
                                pattern: "Immutable Updates",
                                example: "const newObj = { ...oldObj, key: value }",
                                use: "Creating new objects/arrays"
                              },
                              {
                                pattern: "Lifting State Up",
                                example: "Move state to common ancestor",
                                use: "Shared state between siblings"
                              },
                              {
                                pattern: "Controlled Components",
                                example: "value={prop} onChange={callback}",
                                use: "Form inputs with prop control"
                              }
                            ].map((item, idx) => (
                              <div key={idx} className="p-4 bg-green-50 dark:bg-green-900/10 rounded border border-green-200 dark:border-green-800">
                                <div className="font-bold mb-1">{item.pattern}</div>
                                <code className="text-sm block mb-1">{item.example}</code>
                                <div className="text-xs text-gray-600 dark:text-gray-400">{item.use}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                    <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                      Live Example: Try Both Approaches
                    </h4>
                    
                    <div className="grid md:grid-cols-1 gap-8">
                      <div>
                        <h5 className="font-bold mb-3 text-gray-700 dark:text-gray-300">Current User Data (in Parent):</h5>
                        <div className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg mb-4">
                          <pre className="text-sm">
{JSON.stringify(userData, null, 2)}
                          </pre>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          This data is owned by the parent component (this page).
                        </p>
                      </div>
                      
                      <div>
                        <h5 className="font-bold mb-3 text-gray-700 dark:text-gray-300">Child Component:</h5>
                        <UserProfile 
                          user={userData} 
                          onUpdate={(updatedUser) => {
                            setUserData(updatedUser);
                            alert('✅ Parent received update request and updated state!');
                          }}
                        />
                        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                          The child can request changes but cannot modify props directly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Deep vs Shallow Immutability */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[200ms]`}>
          <h2 className="text-3xl font-bold mb-8 text-amber-700 dark:text-amber-300">
            Deep vs Shallow Immutability
          </h2>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-1 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    The Pitfall: Nested Object Mutation
                  </h3>
                  <p className="mb-6 text-gray-700 dark:text-gray-300">
                    React only checks <strong>shallow equality</strong> of props. 
                    Mutating nested objects bypasses React's change detection.
                  </p>
                  
                  <div className="bg-gray-900 text-gray-100 p-6 rounded-xl mb-6">
                    <pre className="text-sm">
{`// ❌ DANGER: Mutating nested objects
function UserCard({ user }) {
  // This WORKS but is WRONG!
  user.address.city = "Shyamnagar";  // Nested mutation
  user.skills.push("React");         // Array mutation
  
  // React won't detect these changes!
  return <div>{user.name}</div>;
}`}
                    </pre>
                  </div>
                  
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <h4 className="font-bold mb-2 text-red-800 dark:text-red-300">The Problem:</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      React compares <code>user</code> reference. Since it's the same object 
                      reference, React thinks nothing changed. But the nested data DID change!
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                    <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">Shallow vs Deep Comparison</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h5 className="font-bold mb-2 text-blue-800 dark:text-blue-300">Shallow</h5>
                        <div className="text-sm">
                          <code>prevProps.user === nextProps.user</code>
                          <p className="mt-2 text-xs">Checks object reference only</p>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h5 className="font-bold mb-2 text-green-800 dark:text-green-300">Deep</h5>
                        <div className="text-sm">
                          <code>deepEqual(prevProps.user, nextProps.user)</code>
                          <p className="mt-2 text-xs">Checks all nested properties</p>
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      React uses shallow comparison for performance. Deep comparison is expensive.
                    </p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                    <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">Ichapur Project Bug</h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Tuhina</strong> had a bug where student grades updated in database 
                      but UI didn't refresh. She was mutating <code>student.grades.push(newGrade)</code> 
                      instead of creating a new array.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Proper Deep Updates */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                How to Properly Update Nested Data
              </h3>
              
              <div className="grid md:grid-cols-1 gap-6">
                {[
                  {
                    scenario: "Nested Object",
                    wrong: "user.address.city = 'New City'",
                    right: `const updated = {
  ...user,
  address: {
    ...user.address,
    city: 'New City'
  }
}`,
                    tip: "Spread operator at each level"
                  },
                  {
                    scenario: "Array in Object",
                    wrong: "user.skills.push('React')",
                    right: `const updated = {
  ...user,
  skills: [...user.skills, 'React']
}`,
                    tip: "Create new array with spread or map/filter"
                  },
                  {
                    scenario: "Object in Array",
                    wrong: "users[0].name = 'New Name'",
                    right: `const updated = users.map((user, index) => 
  index === 0 
    ? { ...user, name: 'New Name' }
    : user
)`,
                    tip: "map() creates new array with updated item"
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 p-6 rounded-xl"
                  >
                    <h4 className="text-lg font-bold mb-3 text-blue-800 dark:text-blue-300">
                      {item.scenario}
                    </h4>
                    
                    <div className="mb-4">
                      <div className="text-sm font-semibold mb-1 text-red-600 dark:text-red-400">❌ Wrong:</div>
                      <code className="text-xs bg-red-50 dark:bg-red-900/20 p-2 rounded block">{item.wrong}</code>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm font-semibold mb-1 text-green-600 dark:text-green-400">✅ Right:</div>
                      <code className="text-xs bg-green-50 dark:bg-green-900/20 p-2 rounded block">{item.right}</code>
                    </div>
                    
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      💡 {item.tip}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-xl">
                <h4 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-300">
                  Shyamnagar Municipality Example
                </h4>
                <p className="mb-4">
                  The complaint tracking system needed to update nested data:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-bold mb-2 text-red-600 dark:text-red-400">Initial Bug:</h5>
                    <code className="text-sm">
                      complaint.comments.push(newComment) // UI didn't update
                    </code>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-bold mb-2 text-green-600 dark:text-green-400">Fixed:</h5>
                    <code className="text-sm">
                      {`setComplaint(prev => ({<br/>
                      &nbsp;&nbsp;...prev,<br/>
                      &nbsp;&nbsp;comments: [...prev.comments, newComment]<br/>
                      }))`}
                    </code>
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
              Immutability Best Practices
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Mental Models for Local Developers
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-900 rounded">
                      <span className="text-2xl mr-3">📜</span>
                      <div>
                        <div className="font-bold">Treat props as contracts</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">You can read, not write</div>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-900 rounded">
                      <span className="text-2xl mr-3">🔄</span>
                      <div>
                        <div className="font-bold">Create new, don't modify</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Always return new objects/arrays</div>
                      </div>
                    </div>
                    <div className="flex items-start p-3 bg-gray-50 dark:bg-gray-900 rounded">
                      <span className="text-2xl mr-3">📞</span>
                      <div>
                        <div className="font-bold">Use callbacks to communicate up</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Child → parent via function props</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Tools & Techniques
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <div className="font-bold text-sm">Spread Operator</div>
                      <code className="text-xs">{`{...obj, key: value}`}</code>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                      <div className="font-bold text-sm">Array Methods</div>
                      <code className="text-xs">map, filter, slice</code>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                      <div className="font-bold text-sm">Immer Library</div>
                      <code className="text-xs">{`produce(draft => draft.x = 1)`}</code>
                    </div>
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded">
                      <div className="font-bold text-sm">TypeScript</div>
                      <code className="text-xs">{`Readonly<Type>`}</code>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Local Project Guidelines
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mt-1 mr-3"></span>
                      <span><strong>Barrackpore small apps:</strong> Manual spread operators</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mt=1 mr-3"></span>
                      <span><strong>Naihati medium apps:</strong> Use Immer for complex updates</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mt-1 mr-3"></span>
                      <span><strong>Ichapur large apps:</strong> TypeScript with Readonly types</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mt-1 mr-3"></span>
                      <span><strong>Shyamnagar teams:</strong> Code reviews check for mutations</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Performance Considerations
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                      <span>Shallow copies are cheap for small data</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-amber-500 rounded-full mr-3"></span>
                      <span>Deep copies can be expensive</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                      <span>React.memo() works well with immutability</span>
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
            Common Immutability Pitfalls
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                pitfall: "Accidental Mutation in Callbacks",
                problem: "Mutating props inside useEffect or event handlers",
                solution: "Always create new objects in callbacks",
                example: "❌ useEffect(() => { props.data.items.push(item) }, [])"
              },
              {
                pitfall: "Forgetting Nested Updates",
                problem: "Updating top-level but forgetting nested objects",
                solution: "Spread operator at each nesting level",
                example: "❌ { ...user, address: { city: 'New' } } // Lost other address fields"
              },
              {
                pitfall: "Mutable Default Props",
                problem: "Using mutable objects/arrays as default props",
                solution: "Use functions to create fresh defaults",
                example: "❌ defaultProps = { items: [] } // Shared array!"
              },
              {
                pitfall: "Confusing Const with Immutability",
                problem: "Thinking const makes objects immutable",
                solution: "const prevents reassignment, not mutation",
                example: "❌ const obj = {x: 1}; obj.x = 2 // This works!"
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
              When props seem to change but UI doesn't update:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Check if you're mutating instead of creating new objects</li>
              <li>Use Object.freeze() in development to catch mutations</li>
              <li>Check React DevTools for prop changes</li>
              <li>Look for array.push() or object.property = value patterns</li>
              <li>Test with simple data first, then complex nested data</li>
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
                      The Immutability Mindset Shift
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Beginners think: <strong>"How do I change this data?"</strong>
                      <br/>
                      Experts think: <strong>"How do I create new data with these changes?"</strong>
                      <br/>
                      When <strong>Debangshu</strong> adopted the immutability mindset, his Barrackpore app's 
                      bugs reduced by 70%. The data flow became predictable and debuggable.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <h5 className="font-bold mb-1 text-red-600 dark:text-red-400">Remember:</h5>
                      <p className="text-sm">const prevents reassignment, Object.freeze() prevents mutation (in dev).</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <h5 className="font-bold mb-1 text-green-600 dark:text-green-400">Pro Tip:</h5>
                      <p className="text-sm">Use Immer library for complex updates. It feels like mutation but creates new data.</p>
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
                    📝 Exercise: Fix Mutation Bugs
                  </h4>
                  
                  <div className="space-y-4 mb-6">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <h5 className="font-bold mb-1">Buggy Code:</h5>
                      <div className="font-mono text-xs bg-gray-900 text-gray-100 p-3 rounded">
                        <code>
{`function StudentList({ students, onUpdateStudent }) {
  const addGrade = (studentId, grade) => {
    // ❌ BUG: Mutating props directly
    const student = students.find(s => s.id === studentId);
    student.grades.push(grade);  // Mutation!
    
    // This won't trigger re-render
    onUpdateStudent(students);
  };
  
  return <div>...</div>;
}`}
</code>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h5 className="font-bold mb-1">Your Task:</h5>
                      <ol className="text-sm space-y-1 pl-5">
                        <li>1. Identify all mutation bugs in the code</li>
                        <li>2. Rewrite using immutable patterns</li>
                        <li>3. Handle nested updates correctly</li>
                        <li>4. Ensure React can detect all changes</li>
                      </ol>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => alert('Start by creating a new array with map(): students.map(student => student.id === studentId ? { ...student, grades: [...student.grades, grade] } : student)')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Click for Hint
                  </button>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h5 className="font-bold mb-3 text-gray-800 dark:text-gray-200">💡 Hint Section</h5>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Think about:</strong> How does React detect that students array has changed?
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Observe carefully:</strong> What happens when you mutate nested objects vs creating new ones?
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Try changing:</strong> Add Object.freeze(students) at the beginning. Does it catch the bug?
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                  ✅ Immutability Checklist
                </h4>
                
                <div className="space-y-4">
                  {[
                    "Never assign to props directly (props.x = value)",
                    "Never mutate arrays (push, pop, splice) on props",
                    "Never mutate nested objects in props",
                    "Always create new objects/arrays for updates",
                    "Use spread operator for shallow copies",
                    "Handle nested updates with multi-level spreading",
                    "Use array methods that return new arrays (map, filter)",
                    "Consider Immer library for complex updates",
                    "Use TypeScript Readonly types when possible",
                    "Test with Object.freeze() in development"
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-4">
                        <span className="text-gray-500 dark:text-gray-400">{index + 1}</span>
                      </div>
                      <span className="flex-1 text-sm">{item}</span>
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-5 rounded-xl">
                  <h5 className="font-bold mb-2 text-emerald-800 dark:text-emerald-300">Next Steps:</h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Now that you understand props immutability, you should learn about 
                    <strong> default props and basic prop validation</strong> - how to make 
                    your components more robust and developer-friendly.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full">
                    <span>🎯</span>
                    <span className="font-medium">Coming Next: Default props and basic prop validation (conceptual)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Inline Styles for Animations */}
      <style jsx="true">{`
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
        
        /* Smooth transitions for mutation warnings */
        .mutation-warning {
          animation: pulse 2s ease-in-out;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
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

export default Topic20;