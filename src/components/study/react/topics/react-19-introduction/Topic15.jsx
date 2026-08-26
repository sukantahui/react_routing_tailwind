import { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic15 = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [activeTab, setActiveTab] = useState('structure');
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [componentName, setComponentName] = useState('ProfileCard');

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]';

  // Sample component for live preview
  const LiveProfileCard = ({ name, title, location }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
          {name.charAt(0)}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{name}</h3>
          <p className="text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">{location}</p>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
        <p className="text-gray-700 dark:text-gray-300">
          This is a live preview of your first React component! You can see how props change the output.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-6 md:p-8">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-12">
        <div className={`${animationClass} opacity-0`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
            Creating Your First Function-Based React Component
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            From theory to practice: Building reusable UI pieces with modern React
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
            <span className="text-lg">🎯</span>
            <span className="font-medium">Hands-on Learning - You'll write your first component in this lesson</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* The Component Anatomy */}
        <section className={`mb-12 ${animationClass} opacity-0`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300 flex items-center gap-3">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                </svg>
                Anatomy of a Function Component
              </h2>
              
              {/* Tabs */}
              <div className="flex space-x-2">
                {['structure', 'example', 'live'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={clsx(
                      'px-4 py-2 rounded-lg font-medium transition-all duration-300',
                      activeTab === tab
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    )}
                  >
                    {tab === 'structure' ? 'Structure' : tab === 'example' ? 'Example' : 'Live'}
                  </button>
                ))}
              </div>
            </div>
            
            {activeTab === 'structure' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    {
                      part: "Import",
                      desc: "Bring React into scope",
                      code: "import React from 'react';",
                      color: "from-purple-500 to-pink-600"
                    },
                    {
                      part: "Function Declaration",
                      desc: "Define component as JavaScript function",
                      code: "function ComponentName() {",
                      color: "from-blue-500 to-cyan-600"
                    },
                    {
                      part: "Return Statement",
                      desc: "Returns JSX describing UI",
                      code: "return (<div>...</div>);",
                      color: "from-green-500 to-emerald-600"
                    },
                    {
                      part: "Export",
                      desc: "Make component available",
                      code: "export default ComponentName;",
                      color: "from-orange-500 to-red-600"
                    }
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className={clsx(
                        "bg-gradient-to-br p-5 rounded-xl text-white transform hover:scale-[1.02] transition-all duration-300",
                        `hover:shadow-2xl ${item.color}`,
                        isReducedMotion ? '' : 'motion-safe:hover:-translate-y-1'
                      )}
                    >
                      <div className="text-xs font-semibold uppercase tracking-wider opacity-80 mb-2">
                        Part {index + 1}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{item.part}</h3>
                      <p className="text-sm opacity-90 mb-3">{item.desc}</p>
                      <div className="bg-black/30 p-3 rounded font-mono text-sm">
                        {item.code}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border-l-4 border-blue-500">
                  <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                    Real-World Analogy: Barrackpore Library System
                  </h3>
                  <p className="mb-3">
                    Think of a component like a <strong>book registration card</strong> in Barrackpore Public Library:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-bold text-green-600 dark:text-green-400 mb-2">Library Card</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Template (Function structure)</li>
                        <li>• Filled details (Props)</li>
                        <li>• Reusable (Multiple copies)</li>
                        <li>• Self-contained (All info in one place)</li>
                      </ul>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-bold text-blue-600 dark:text-blue-400 mb-2">React Component</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Function structure</li>
                        <li>• Receives props</li>
                        <li>• Reusable UI</li>
                        <li>• Encapsulated logic</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'example' && (
              <div className="space-y-6">
                <div className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto">
                  <pre className="text-sm">
{`// 📁 ProfileCard.jsx
import React from 'react';

// Step 1: Function declaration with PascalCase name
function ProfileCard() {
  // Step 2: Component logic can go here
  const userName = "Swadeep";
  const userLocation = "Barrackpore";
  const userTitle = "Web Developer";

  // Step 3: Return JSX describing the UI
  return (
    <div className="profile-card">
      <div className="avatar">
        <div className="initials">{userName.charAt(0)}</div>
      </div>
      <div className="details">
        <h3>{userName}</h3>
        <p>{userTitle}</p>
        <small>{userLocation}</small>
      </div>
      <div className="bio">
        <p>A passionate developer learning React!</p>
      </div>
    </div>
  );
}

// Step 4: Export the component
export default ProfileCard;`}
                  </pre>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl">
                  <h4 className="font-bold text-lg mb-2 text-green-700 dark:text-green-300">
                    Breaking It Down For Naihati Students:
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold mb-1 text-gray-800 dark:text-gray-200">Function Naming Rule:</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Always use <strong>PascalCase</strong> (ProfileCard, not profileCard or profile_card)
                      </p>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-1 text-gray-800 dark:text-gray-200">File Extension:</h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Use <strong>.jsx</strong> for files containing JSX (not .js)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'live' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    Live Component Preview
                  </h3>
                  <button
                    onClick={() => setShowLivePreview(!showLivePreview)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300"
                  >
                    {showLivePreview ? 'Hide Preview' : 'Show Preview'}
                  </button>
                </div>
                
                {showLivePreview && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl">
                        <label className="block mb-2 font-medium">Component Name:</label>
                        <input
                          type="text"
                          value={componentName}
                          onChange={(e) => setComponentName(e.target.value)}
                          className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg"
                          placeholder="Enter component name"
                        />
                      </div>
                      
                      <LiveProfileCard 
                        name="Swadeep" 
                        title="Web Developer"
                        location="Barrackpore, West Bengal"
                      />
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl">
                      <h4 className="font-bold text-lg mb-3 text-gray-800 dark:text-gray-200">
                        What's Happening:
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                          <span>The <strong>LiveProfileCard</strong> component is a real React component</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                          <span>It receives data through <strong>props</strong> (name, title, location)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></span>
                          <span>It returns <strong>JSX</strong> that describes the UI structure</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3"></span>
                          <span>This same component could be reused for Tuhina, Abhronila, Debangshu...</span>
                        </li>
                      </ul>
                      
                      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <strong>Try this:</strong> Imagine how you'd create components for a Shyamnagar college website:
                          StudentCard, CourseCard, TeacherCard, etc. Each follows the same pattern!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Step-by-Step Guide */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[100ms]`}>
          <h2 className="text-3xl font-bold mb-8 text-purple-700 dark:text-purple-300">
            Your First Component: Step-by-Step Guide
          </h2>
          
          <div className="space-y-8">
            {[
              {
                step: 1,
                title: "Create the File",
                description: "Create a new file with .jsx extension in your src/components folder",
                code: "ProfileCard.jsx",
                tip: "Keep components organized in folders. Eg: src/components/ProfileCard.jsx",
                color: "border-purple-500 bg-purple-50 dark:bg-purple-900/10"
              },
              {
                step: 2,
                title: "Import React",
                description: "Always import React at the top (required for JSX)",
                code: "import React from 'react';",
                tip: "In React 17+, you can skip this for function components, but it's good practice",
                color: "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
              },
              {
                step: 3,
                title: "Write Function Component",
                description: "Define your component using PascalCase naming convention",
                code: "function ProfileCard() {\n  // Component logic here\n}",
                tip: "Arrow functions also work: const ProfileCard = () => {}",
                color: "border-green-500 bg-green-50 dark:bg-green-900/10"
              },
              {
                step: 4,
                title: "Return JSX",
                description: "Return JSX that describes your component's UI",
                code: "return (\n  <div>\n    <h1>Hello World!</h1>\n  </div>\n);",
                tip: "Wrap multiple elements in a parent div or React Fragment <></>",
                color: "border-amber-500 bg-amber-50 dark:bg-amber-900/10"
              },
              {
                step: 5,
                title: "Export Component",
                description: "Export your component so other files can use it",
                code: "export default ProfileCard;",
                tip: "Use named exports for multiple components from one file",
                color: "border-red-500 bg-red-50 dark:bg-red-900/10"
              }
            ].map((item) => (
              <div 
                key={item.step}
                className={clsx(
                  "border-l-4 p-6 rounded-r-xl transform hover:scale-[1.005] transition-all duration-300",
                  item.color,
                  isReducedMotion ? '' : 'motion-safe:hover:-translate-x-1'
                )}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-xl">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                        Step {item.step}: {item.title}
                      </h3>
                      <span className="text-sm font-mono px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                        {item.code.split('\n')[0]}
                      </span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{item.description}</p>
                    
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                      <pre className="text-sm">{item.code}</pre>
                    </div>
                    
                    <div className="mt-4 flex items-start gap-2 p-3 bg-white dark:bg-gray-800 rounded-lg">
                      <span className="text-yellow-500 text-lg">💡</span>
                      <div>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">Pro Tip:</span>
                        <span className="ml-2 text-gray-600 dark:text-gray-400">{item.tip}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common Beginner Mistakes */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[200ms]`}>
          <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-red-700 dark:text-red-300 flex items-center gap-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
              </svg>
              Common Beginner Mistakes & How to Avoid Them
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  mistake: "Forgetting to return JSX",
                  error: "Component returns undefined",
                  fix: "Always include return statement",
                  example: `// ❌ Wrong\nfunction Card() {\n  <div>Hello</div>\n}\n\n// ✅ Correct\nfunction Card() {\n  return <div>Hello</div>;\n}`
                },
                {
                  mistake: "Using lowercase component names",
                  error: "React treats lowercase as HTML tags",
                  fix: "Always use PascalCase",
                  example: `// ❌ Wrong\nfunction mycard() { ... }\n\n// ✅ Correct\nfunction MyCard() { ... }`
                },
                {
                  mistake: "Missing parent wrapper",
                  error: "Adjacent JSX elements must be wrapped",
                  fix: "Wrap in div or React Fragment",
                  example: `// ❌ Wrong\nreturn (\n  <h1>Title</h1>\n  <p>Content</p>\n);\n\n// ✅ Correct\nreturn (\n  <div>\n    <h1>Title</h1>\n    <p>Content</p>\n  </div>\n);`
                },
                {
                  mistake: "Saving as .js instead of .jsx",
                  error: "IDE might not highlight JSX properly",
                  fix: "Always use .jsx extension for JSX files",
                  example: `// ❌ Avoid\nProfileCard.js\n\n// ✅ Preferred\nProfileCard.jsx`
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                      <span className="text-red-600 dark:text-red-400 font-bold">✗</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200">{item.mistake}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{item.error}</p>
                    </div>
                  </div>
                  
                  <div className="mb-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="font-semibold text-green-700 dark:text-green-300">Fix: {item.fix}</p>
                  </div>
                  
                  <div className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto">
                    <pre className="text-xs">{item.example}</pre>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 p-6 rounded-xl">
              <h4 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">
                Debugging Tips for Ichapur & Shyamnagar Students:
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-bold mb-2 text-gray-800 dark:text-gray-200">If component doesn't render:</h5>
                  <ul className="text-sm space-y-1">
                    <li>1. Check console for errors</li>
                    <li>2. Verify component is exported</li>
                    <li>3. Check import path is correct</li>
                    <li>4. Look for JSX syntax errors</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-bold mb-2 text-gray-800 dark:text-gray-200">If styling looks wrong:</h5>
                  <ul className="text-sm space-y-1">
                    <li>1. Check Tailwind class names</li>
                    <li>2. Verify dark mode classes</li>
                    <li>3. Inspect with browser DevTools</li>
                    <li>4. Check for conflicting styles</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices & Professional Habits */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[300ms]`}>
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-emerald-700 dark:text-emerald-300">
              Best Practices & Professional Habits
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    File Organization
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <span>One component per file</span>
                      <span className="text-green-600 dark:text-green-400">✅</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <span>Group related components in folders</span>
                      <span className="text-green-600 dark:text-green-400">✅</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <span>Use index.js for cleaner imports</span>
                      <span className="text-green-600 dark:text-green-400">✅</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Code Structure
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      <span>Keep components small and focused</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      <span>Extract repeated logic into custom hooks</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                      <span>Use TypeScript/PropTypes for type safety</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Naming Conventions
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="font-mono text-sm">Button.jsx</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">✅ Good</div>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="font-mono text-sm">button.jsx</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">❌ Avoid</div>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="font-mono text-sm">UserProfileCard.jsx</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">✅ Good</div>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="font-mono text-sm">User_Profile_Card.jsx</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">❌ Avoid</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Local Project Structure Example
                  </h3>
                  <div className="font-mono text-sm bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <div>src/</div>
                    <div className="ml-4">components/</div>
                    <div className="ml-8">Profile/</div>
                    <div className="ml-12 text-emerald-400">ProfileCard.jsx</div>
                    <div className="ml-12 text-emerald-400">ProfileHeader.jsx</div>
                    <div className="ml-12 text-emerald-400">index.js</div>
                    <div className="ml-8">Common/</div>
                    <div className="ml-12 text-emerald-400">Button.jsx</div>
                    <div className="ml-12 text-emerald-400">Input.jsx</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[400ms]`}>
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
                      The "Aha!" Moment
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      When <strong>Swadeep from Barrackpore</strong> first created his ProfileCard component, 
                      he realized: "This is like making a custom HTML tag!" That's exactly right. Components 
                      are <strong>custom, reusable UI elements</strong> that you define once and use everywhere.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <h5 className="font-bold mb-1 text-red-600 dark:text-red-400">Common Pitfall:</h5>
                      <p className="text-sm">Students try to make components do too much. Start small!</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <h5 className="font-bold mb-1 text-green-600 dark:text-green-400">Success Tip:</h5>
                      <p className="text-sm">Name components by their purpose, not their content.</p>
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

        {/* Practice Exercise & Checklist */}
        <section className={`${animationClass} opacity-0 motion-safe:animate-delay-[500ms]`}>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-indigo-700 dark:text-indigo-300">
              Your Turn: Practice Exercise
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl mb-6">
                  <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    📝 Exercise: Create a StudentCard Component
                  </h4>
                  
                  <div className="space-y-4 mb-6">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                      <h5 className="font-bold mb-1">Requirements:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Component name: <code>StudentCard</code></li>
                        <li>• File name: <code>StudentCard.jsx</code></li>
                        <li>• Display student name, course, and college</li>
                        <li>• Include a profile image placeholder</li>
                        <li>• Add a "View Profile" button</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h5 className="font-bold mb-1">Use Local Examples:</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Name: Tuhina (from Ichapur)</li>
                        <li>• Course: B.Sc Computer Science</li>
                        <li>• College: Barrackpore College</li>
                      </ul>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => alert('Great! Now create this component in your project. Start by creating StudentCard.jsx in src/components/')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Click When Ready to Start Coding
                  </button>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h5 className="font-bold mb-3 text-gray-800 dark:text-gray-200">💡 Hint Section</h5>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Think about:</strong> What information should be hard-coded vs. received as props?
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Observe carefully:</strong> How does the component structure mirror the visual layout?
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Try changing:</strong> The component name and see what breaks (learning through breaking!)
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                  ✅ Quick Checklist Before Exporting
                </h4>
                
                <div className="space-y-4">
                  {[
                    "File name uses PascalCase with .jsx extension",
                    "Component function uses PascalCase naming",
                    "Component returns JSX (has return statement)",
                    "JSX is wrapped in a single parent element",
                    "Component is exported (export default)",
                    "No console errors when importing",
                    "Component renders without errors"
                  ].map((item, index) => (
                    <div 
                      key={index}
                      className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-4">
                        <span className="text-gray-500 dark:text-gray-400">{index + 1}</span>
                      </div>
                      <span className="flex-1">{item}</span>
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600"></div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-5 rounded-xl">
                  <h5 className="font-bold mb-2 text-blue-800 dark:text-blue-300">Next Steps:</h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Once you've created your first component, you'll learn about <strong>props</strong> 
                    (passing data to components) and <strong>component composition</strong> (combining 
                    components to build complex UIs).
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                    <span>🎯</span>
                    <span className="font-medium">Coming Next: Props - Making components dynamic</span>
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
        
        /* Custom styling for code blocks */
        pre {
          font-family: 'Fira Code', 'Courier New', monospace;
          line-height: 1.5;
          tab-size: 2;
        }
        
        .profile-card {
          transition: all 0.3s ease;
        }
        
        .profile-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Topic15;