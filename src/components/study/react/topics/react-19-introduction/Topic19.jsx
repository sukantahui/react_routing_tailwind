import { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic19 = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [liveProps, setLiveProps] = useState({
    name: 'Swadeep',
    age: 25,
    city: 'Barrackpore',
    isStudent: true
  });
  const [propDrillingLevel, setPropDrillingLevel] = useState(1);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]';

  // Live props example component
  const LiveUserCard = ({ user, onUpdate }) => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{user.name}</h3>
            <p className="text-gray-600 dark:text-gray-400">Age: {user.age}</p>
            <p className="text-gray-600 dark:text-gray-400">From: {user.city}</p>
            <p className="text-gray-600 dark:text-gray-400">
              Status: {user.isStudent ? 'Student 🎓' : 'Professional 💼'}
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            This card receives all data via <strong>props</strong> from its parent component.
          </p>
        </div>
      </div>
    );
  };

  // Prop drilling visualization
  const PropDrillingVisualization = ({ level }) => {
    const components = [
      { name: 'App', props: ['userData'] },
      { name: 'Dashboard', props: ['user'] },
      { name: 'UserSection', props: ['user'] },
      { name: 'UserProfile', props: ['user'] },
      { name: 'UserCard', props: ['name', 'age', 'city', 'isStudent'] }
    ];

    const visibleComponents = components.slice(0, Math.min(level + 1, 5));

    return (
      <div className="p-6 bg-gray-900 rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-bold text-white">Prop Drilling Visualization</h4>
          <div className="flex gap-2">
            <button
              onClick={() => setPropDrillingLevel(Math.max(1, propDrillingLevel - 1))}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded"
            >
              -
            </button>
            <span className="px-4 py-1 bg-purple-600 text-white rounded">
              Levels: {propDrillingLevel}
            </span>
            <button
              onClick={() => setPropDrillingLevel(Math.min(4, propDrillingLevel + 1))}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded"
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {visibleComponents.map((comp, index) => (
            <div 
              key={index}
              className={`p-4 ${index === 0 ? 'bg-purple-600' : index === visibleComponents.length - 1 ? 'bg-green-600' : 'bg-blue-600'} text-white rounded-lg transform transition-all duration-300 ${
                isReducedMotion ? '' : 'hover:scale-[1.02]'
              }`}
              style={{ marginLeft: `${index * 20}px` }}
            >
              <div className="font-bold">{comp.name}</div>
              <div className="text-sm opacity-90 mt-2">
                Props: {comp.props.join(', ')}
              </div>
              {index < visibleComponents.length - 1 && (
                <div className="text-xs mt-2 opacity-75">
                  ↓ Passes props to {components[index + 1].name}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <div className="text-sm">
            <span className="text-red-400">⚠️ Problem: </span>
            <span className="text-gray-300">
              {propDrillingLevel >= 3 
                ? "Props passed through intermediate components that don't use them"
                : "Acceptable prop passing between directly related components"}
            </span>
          </div>
          {propDrillingLevel >= 3 && (
            <div className="mt-3 text-sm text-amber-300">
              💡 Solution: Use Context API or composition to avoid drilling
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-6 md:p-8">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-12">
        <div className={`${animationClass} opacity-0`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
            Props: Passing Data from Parent to Child
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            The communication channel that makes React components dynamic and reusable
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
            <span className="text-lg">📡</span>
            <span className="font-medium">Component Communication - The React way</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* What are Props? */}
        <section className={`mb-12 ${animationClass} opacity-0`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300 flex items-center gap-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              What Are Props in React?
            </h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">
                    The Formal Definition
                  </h3>
                  <p className="mb-4">
                    <strong>Props</strong> (short for properties) are <strong>read-only data</strong> passed from 
                    parent components to child components. They are React's mechanism for component communication.
                  </p>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <code className="text-sm">
                      &lt;Component propName="propValue" /&gt;
                    </code>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-300">
                    Real-World Analogy: Barrackpore Post Office
                  </h3>
                  <p className="mb-4">
                    Think of props as <strong>packages</strong> sent between post offices:
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-600 dark:text-purple-400">📦</span>
                      </span>
                      <span><strong>Parent</strong> = Sender post office</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-600 dark:text-purple-400">📬</span>
                      </span>
                      <span><strong>Props</strong> = Packages with addresses</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-600 dark:text-purple-400">🏣</span>
                      </span>
                      <span><strong>Child</strong> = Receiver post office</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 p-6 rounded-xl border-l-4 border-emerald-500">
                <h3 className="text-xl font-bold mb-3 text-emerald-800 dark:text-emerald-300">
                  Key Characteristics of Props
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-200">✅ What Props ARE:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                        <span>Read-only (immutable)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                        <span>Passed from parent to child</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                        <span>Can be any JavaScript type</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-200">❌ What Props are NOT:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                        <span>Not mutable by child</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                        <span>Not passed from child to parent</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                        <span>Not internal component state</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Props in Action */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[100ms]`}>
          <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                Props in Action: Live Example
              </h2>
              
              <div className="flex space-x-2">
                {['basic', 'types', 'live'].map((tab) => (
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
                    {tab === 'basic' ? 'Basic Syntax' : 
                     tab === 'types' ? 'Prop Types' : 
                     'Live Demo'}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              {activeTab === 'basic' && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                      Basic Props Syntax
                    </h3>
                    
                    <div className="bg-gray-900 text-gray-100 p-6 rounded-xl mb-6">
                      <pre className="text-sm">
{`// Parent Component (Sender)
function ParentComponent() {
  const userName = "Swadeep";
  const userAge = 25;
  
  return (
    <ChildComponent 
      name={userName} 
      age={userAge} 
      city="Barrackpore"
    />
  );
}

// Child Component (Receiver)
function ChildComponent(props) {
  return (
    <div>
      <h2>Hello, {props.name}!</h2>
      <p>Age: {props.age}</p>
      <p>City: {props.city}</p>
    </div>
  );
}`}
                      </pre>
                    </div>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-bold mb-2 text-blue-800 dark:text-blue-300">Key Points:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Props passed as attributes in JSX</li>
                        <li>• Can pass variables (name) or literals ("Barrackpore")</li>
                        <li>• Child receives props as function parameter</li>
                        <li>• Access props using props.propertyName</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                      <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">Destructuring Props</h4>
                      <div className="bg-gray-900 text-gray-100 p-4 rounded mb-4">
                        <pre className="text-sm">
{`// Cleaner syntax with destructuring
function ChildComponent({ name, age, city }) {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>Age: {age}</p>
      <p>City: {city}</p>
    </div>
  );
}`}
                        </pre>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Destructuring makes code cleaner and shows required props clearly.
                      </p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                      <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">Local Example</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Tuhina's</strong> Ichapur recipe app:
                        <br/>
                        <code>&lt;RecipeCard title="Biriyani" cookTime="60min" servings="4" /&gt;</code>
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'types' && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                      Different Prop Types
                    </h3>
                    
                    <div className="space-y-4">
                      {[
                        {
                          type: 'String',
                          example: 'title="React Tutorial"',
                          usage: 'Text content, labels'
                        },
                        {
                          type: 'Number',
                          example: 'age={25}',
                          usage: 'Counts, ages, quantities'
                        },
                        {
                          type: 'Boolean',
                          example: 'isStudent={true}',
                          usage: 'Flags, toggles, conditions'
                        },
                        {
                          type: 'Array',
                          example: 'items={["apple", "banana"]}',
                          usage: 'Lists, collections'
                        },
                        {
                          type: 'Object',
                          example: 'user={{name: "Swadeep", age: 25}}',
                          usage: 'Complex data structures'
                        },
                        {
                          type: 'Function',
                          example: 'onClick={handleClick}',
                          usage: 'Event handlers, callbacks'
                        }
                      ].map((item, index) => (
                        <div 
                          key={index}
                          className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold">{item.type}</span>
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded text-xs">
                              {item.usage}
                            </span>
                          </div>
                          <code className="text-sm">{item.example}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                      <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">Complex Prop Example</h4>
                      <div className="bg-gray-900 text-gray-100 p-4 rounded">
                        <pre className="text-sm">
{`// Passing complex data as props
function StudentDashboard() {
  const student = {
    name: "Abhronila",
    grades: [85, 92, 78],
    attendance: 95.5,
    isActive: true,
    updateGrade: (subject, score) => {
      // Update logic
    }
  };
  
  return <StudentCard student={student} />;
}`}
                        </pre>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                      <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">Naihati College System</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Passing student data through props:
                        <br/>
                        • String: student name
                        <br/>
                        • Number: roll number, marks
                        <br/>
                        • Array: subject list
                        <br/>
                        • Object: complete student record
                        <br/>
                        • Function: update marks handler
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'live' && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                        Live Props Editor
                      </h3>
                      
                      <div className="space-y-4">
                        {Object.entries(liveProps).map(([key, value]) => (
                          <div key={key} className="p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
                            <label className="block mb-2 font-medium capitalize">{key}:</label>
                            {typeof value === 'string' ? (
                              <input
                                type="text"
                                value={value}
                                onChange={(e) => setLiveProps({...liveProps, [key]: e.target.value})}
                                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
                              />
                            ) : typeof value === 'number' ? (
                              <input
                                type="number"
                                value={value}
                                onChange={(e) => setLiveProps({...liveProps, [key]: parseInt(e.target.value) || 0})}
                                className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
                              />
                            ) : typeof value === 'boolean' ? (
                              <div className="flex items-center">
                                <button
                                  onClick={() => setLiveProps({...liveProps, [key]: !value})}
                                  className={`px-4 py-2 rounded-lg ${value ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
                                >
                                  {value ? 'Yes' : 'No'}
                                </button>
                                <span className="ml-3">{value ? 'Student 🎓' : 'Professional 💼'}</span>
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                        Live Component Output
                      </h3>
                      <p className="mb-4 text-gray-600 dark:text-gray-400">
                        This UserCard component receives all its data via props:
                      </p>
                      <LiveUserCard user={liveProps} />
                      
                      <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <h4 className="font-bold mb-2 text-emerald-800 dark:text-emerald-300">What's Happening:</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          The parent component (this page) passes <code>liveProps</code> to the 
                          <code>LiveUserCard</code> component. When you edit the props above, the 
                          card updates instantly.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 p-6 rounded-xl">
                    <h4 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">
                      Code Behind This Demo
                    </h4>
                    <div className="bg-gray-900 text-gray-100 p-6 rounded-xl">
                      <pre className="text-sm">
{`// Parent Component (This Page)
function ParentComponent() {
  const [liveProps, setLiveProps] = useState({
    name: "Swadeep",
    age: 25,
    city: "Barrackpore",
    isStudent: true
  });

  return <LiveUserCard user={liveProps} />;
}

// Child Component
function LiveUserCard({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
      <p>City: {user.city}</p>
      <p>Status: {user.isStudent ? 'Student' : 'Professional'}</p>
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

        {/* Prop Drilling */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[200ms]`}>
          <h2 className="text-3xl font-bold mb-8 text-amber-700 dark:text-amber-300">
            Prop Drilling: The Good, The Bad, and The Solutions
          </h2>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    What is Prop Drilling?
                  </h3>
                  <p className="mb-6 text-gray-700 dark:text-gray-300">
                    Prop drilling occurs when you pass props through multiple levels of 
                    components, even though intermediate components don't use those props.
                  </p>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg mb-6">
                    <h4 className="font-bold mb-2 text-red-600 dark:text-red-400">The Problem:</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-1 mr-2"></span>
                        <span>Components become tightly coupled</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-1 mr-2"></span>
                        <span>Hard to refactor or change data flow</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-1 mr-2"></span>
                        <span>Makes components less reusable</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-bold mb-2 text-green-600 dark:text-green-400">When It's Acceptable:</h4>
                    <ul className="text-sm space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1 mr-2"></span>
                        <span>Passing through 1-2 levels</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1 mr-2"></span>
                        <span>Intermediate components actually use the props</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1 mr-2"></span>
                        <span>Small applications with simple data flow</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <PropDrillingVisualization level={propDrillingLevel} />
                </div>
              </div>
            </div>
            
            {/* Solutions to Prop Drilling */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                Solutions to Prop Drilling
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    solution: "Context API",
                    description: "Global state management for app-wide data",
                    when: "Data needed by many unrelated components",
                    example: "User authentication, theme preferences"
                  },
                  {
                    solution: "Component Composition",
                    description: "Restructure components to avoid deep nesting",
                    when: "Components can be reorganized logically",
                    example: "Pass components as props (render props pattern)"
                  },
                  {
                    solution: "State Management Library",
                    description: "Redux, Zustand, or MobX for complex state",
                    when: "Large apps with complex state interactions",
                    example: "E-commerce cart, form wizards"
                  }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 p-6 rounded-xl"
                  >
                    <h4 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">
                      {item.solution}
                    </h4>
                    <p className="mb-4 text-gray-700 dark:text-gray-300">{item.description}</p>
                    
                    <div className="mb-4 p-3 bg-white dark:bg-gray-800 rounded">
                      <div className="font-semibold mb-1">When to use:</div>
                      <div className="text-sm">{item.when}</div>
                    </div>
                    
                    <div className="text-sm">
                      <span className="font-semibold">Example:</span> {item.example}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-xl">
                <h4 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-300">
                  Shyamnagar Municipality Example
                </h4>
                <p className="mb-4">
                  The complaint tracking system had prop drilling:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-bold mb-2 text-red-600 dark:text-red-400">Before (Prop Drilling):</h5>
                    <ul className="text-sm space-y-1">
                      <li>• App → Dashboard → ComplaintList → ComplaintItem</li>
                      <li>• User data passed through all levels</li>
                      <li>• Hard to add new features</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-bold mb-2 text-green-600 dark:text-green-400">After (Context API):</h5>
                    <ul className="text-sm space-y-1">
                      <li>• User context created</li>
                      <li>• Any component can access user data</li>
                      <li>• Clean, maintainable code</li>
                    </ul>
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
              Props Best Practices
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Naming Conventions
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded">
                      <span>Use camelCase for prop names</span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded text-xs">
                        ✅ Good
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded">
                      <span>Use descriptive, clear names</span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded text-xs">
                        ✅ Good
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded">
                      <span>Avoid single-letter prop names</span>
                      <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 rounded text-xs">
                        ❌ Avoid
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Prop Validation
                  </h3>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded">
                    <pre className="text-sm">
{`// PropTypes (for type checking)
UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  isStudent: PropTypes.bool
};

// TypeScript (better alternative)
interface UserCardProps {
  name: string;
  age?: number;
  isStudent: boolean;
}`}
                    </pre>
                  </div>
                  <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                    Always validate props to catch errors early.
                  </p>
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
                      <span><strong>Barrackpore small projects:</strong> Simple props with destructuring</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mt-1 mr-3"></span>
                      <span><strong>Naihati medium projects:</strong> Add PropTypes for safety</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mt-1 mr-3"></span>
                      <span><strong>Ichapur large projects:</strong> Use TypeScript for strict typing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mt=1 mr-3"></span>
                      <span><strong>Shyamnagar teams:</strong> Document props in README or Storybook</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Performance Tips
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                      <span>Avoid passing large objects unnecessarily</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                      <span>Use React.memo() for expensive components</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                      <span>Pass primitives instead of objects when possible</span>
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
            Common Props Pitfalls
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                pitfall: "Mutating Props",
                problem: "Trying to change props directly in child component",
                solution: "Props are read-only. Lift state up or use callbacks",
                example: "❌ props.name = 'New Name' (Error!)"
              },
              {
                pitfall: "Missing Required Props",
                problem: "Not passing required props to component",
                solution: "Use PropTypes.isRequired or TypeScript",
                example: "❌ <UserCard /> (name prop missing)"
              },
              {
                pitfall: "Passing Too Many Props",
                problem: "Component receives 20+ props, becomes hard to use",
                solution: "Group related props into objects, use composition",
                example: "❌ <Form field1=... field2=... field20=... />"
              },
              {
                pitfall: "Inline Function Creation",
                problem: "Creating new function on every render causing re-renders",
                solution: "Use useCallback or define function outside component",
                example: "❌ onClick={() => handleClick()} (creates new function each time)"
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
              When props aren't working as expected:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Check React DevTools to see what props are actually passed</li>
              <li>Verify prop names match between parent and child</li>
              <li>Use console.log(props) in child component</li>
              <li>Check for typos in prop names (camelCase matters!)</li>
              <li>Ensure you're not trying to mutate props</li>
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
                      The Props Mindset
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Beginners think: <strong>"How do I get data into this component?"</strong>
                      <br/>
                      Experts think: <strong>"What data does this component need to be reusable?"</strong>
                      <br/>
                      When <strong>Debangshu</strong> designed his Barrackpore app components with clear prop 
                      interfaces, other developers could use them without reading the implementation.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <h5 className="font-bold mb-1 text-red-600 dark:text-red-400">Remember:</h5>
                      <p className="text-sm">Props are one-way (parent → child). For child → parent, use callbacks.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <h5 className="font-bold mb-1 text-green-600 dark:text-green-400">Pro Tip:</h5>
                      <p className="text-sm">Design props first, then implement components. It's like an API contract.</p>
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
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl mb-6">
                  <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    📝 Exercise: Build a ProductCard Component
                  </h4>
                  
                  <div className="space-y-4 mb-6">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                      <h5 className="font-bold mb-1">Scenario:</h5>
                      <p className="text-sm">
                        Build a ProductCard for a Naihati e-commerce site with proper props
                      </p>
                      <ul className="text-xs mt-2 space-y-1">
                        <li>• Required props: name, price, imageUrl</li>
                        <li>• Optional props: description, discount, rating</li>
                        <li>• Function prop: onAddToCart (callback)</li>
                        <li>• Object prop: seller (with name, rating, location)</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h5 className="font-bold mb-1">Your Task:</h5>
                      <ol className="text-sm space-y-1 pl-5">
                        <li>1. Define the ProductCard component with destructured props</li>
                        <li>2. Implement prop validation with PropTypes</li>
                        <li>3. Create a parent component that uses ProductCard</li>
                        <li>4. Handle the onAddToCart callback</li>
                      </ol>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => alert('Start by defining the ProductCard component signature: function ProductCard({ name, price, imageUrl, description, onAddToCart, seller })')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Click for Starter Code
                  </button>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h5 className="font-bold mb-3 text-gray-800 dark:text-gray-200">💡 Hint Section</h5>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Think about:</strong> Which props should be required vs optional?
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Observe carefully:</strong> How does the callback prop connect parent and child?
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Try changing:</strong> Make some props optional and see how the component adapts.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                  ✅ Props Best Practices Checklist
                </h4>
                
                <div className="space-y-4">
                  {[
                    "Props are read-only (never mutate them)",
                    "Use destructuring for cleaner code",
                    "Validate props with PropTypes or TypeScript",
                    "Keep prop count reasonable (≤ 10 ideally)",
                    "Use descriptive, camelCase prop names",
                    "Document props with comments or Storybook",
                    "Avoid prop drilling beyond 2-3 levels",
                    "Use callbacks for child-to-parent communication",
                    "Default values for optional props",
                    "Group related props into objects when appropriate"
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
                    Now that you understand props for passing data, you need to understand 
                    <strong> props immutability and read-only behavior</strong> - why you can't 
                    change props and what to do instead.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full">
                    <span>🎯</span>
                    <span className="font-medium">Coming Next: Props immutability and read-only behavior</span>
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
        
        /* Smooth transitions for prop drilling visualization */
        .prop-level {
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

export default Topic19;