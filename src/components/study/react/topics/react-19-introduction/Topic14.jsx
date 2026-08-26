import { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic14 = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [showLegacyExample, setShowLegacyExample] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-6 md:p-8">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-12">
        <div className={`${animationClass} opacity-0`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400">
            Why Class Components Are Legacy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Understanding the evolution from class-based to function-based components in React
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-full">
            <span className="text-lg">⚠️</span>
            <span className="font-medium">Conceptual Awareness Only - You don't need to write class components</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Historical Context */}
        <section className={`mb-12 ${animationClass} opacity-0`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300 flex items-center gap-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
              The Historical Journey: Class Components Era (2015-2018)
            </h2>
            
            <div className="space-y-6 leading-relaxed">
              <p className="text-lg">
                From React's inception until 2018, <strong className="text-blue-600 dark:text-blue-400">class components were the only way</strong> 
                to create stateful components. They were modeled after ES6 classes and followed object-oriented programming principles.
              </p>
              
              {/* Timeline SVG */}
              <div className="relative py-8">
                <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transform -translate-y-1/2"></div>
                
                <div className="relative flex justify-between">
                  {[
                    { year: "2015", title: "Class Era", color: "bg-blue-500", desc: "React introduces ES6 class components" },
                    { year: "2017", title: "Hooks Born", color: "bg-purple-500", desc: "React team experiments with Hooks" },
                    { year: "2018", title: "Hooks Release", color: "bg-green-500", desc: "React 16.8 introduces Hooks officially" },
                    { year: "2024+", title: "Function Era", color: "bg-emerald-500", desc: "Class components considered legacy" }
                  ].map((item, index) => (
                    <div key={index} className="relative z-10 text-center">
                      <div className={`${item.color} w-6 h-6 rounded-full mx-auto mb-2 transform hover:scale-125 transition-transform duration-300`}></div>
                      <div className="text-sm font-bold">{item.year}</div>
                      <div className="text-xs mt-1 opacity-80">{item.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border-l-4 border-blue-500">
                <h3 className="text-xl font-semibold mb-3 text-blue-700 dark:text-blue-300">
                  Why Were Class Components Created?
                </h3>
                <p>
                  Class components were a natural evolution from React's early days when JavaScript didn't have 
                  modern features. They provided:
                </p>
                <ul className="mt-3 space-y-2 pl-5">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                    <span>A familiar OOP pattern for developers coming from Java/C# backgrounds</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                    <span>Lifecycle methods for controlling component behavior</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                    <span>State management through <code>this.state</code> and <code>this.setState()</code></span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* The Problems with Class Components */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[100ms]`}>
          <h2 className="text-3xl font-bold mb-8 text-red-700 dark:text-red-300">
            The Challenges That Led to Change
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Complexity & Verbosity",
                description: "Class components required lots of boilerplate code (constructors, binding methods, etc.)",
                example: "Imagine Swadeep writing 20 lines just to initialize a simple counter",
                icon: "📝",
                color: "from-red-500 to-pink-600"
              },
              {
                title: "'this' Confusion",
                description: "JavaScript's 'this' keyword caused endless bugs and required explicit binding",
                example: "Tuhina spending hours debugging why 'this.setState' is undefined",
                icon: "❓",
                color: "from-orange-500 to-yellow-600"
              },
              {
                title: "Lifecycle Spaghetti",
                description: "Related logic scattered across different lifecycle methods (componentDidMount, componentDidUpdate, etc.)",
                example: "Abhronila's data fetching logic spread across 3 different methods",
                icon: "🍝",
                color: "from-purple-500 to-indigo-600"
              },
              {
                title: "Reusability Issues",
                description: "Hard to reuse stateful logic between components (required HOCs or render props)",
                example: "Debangshu duplicating the same authentication logic in 5 different components",
                icon: "♻️",
                color: "from-cyan-500 to-blue-600"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className={clsx(
                  "bg-gradient-to-br p-6 rounded-xl text-white transform hover:scale-[1.02] transition-all duration-300",
                  `hover:shadow-2xl ${item.color}`,
                  isReducedMotion ? '' : 'motion-safe:hover:-translate-y-1'
                )}
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="mb-4 opacity-90">{item.description}</p>
                <div className="text-sm bg-white/20 p-2 rounded">
                  <span className="font-semibold">Example:</span> {item.example}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Class vs Function Comparison */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[200ms]`}>
          <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-green-700 dark:text-green-300">
              Side-by-Side Comparison
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                    <th className="py-4 px-6 text-left">Aspect</th>
                    <th className="py-4 px-6 text-left bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300">
                      Class Component (Legacy)
                    </th>
                    <th className="py-4 px-6 text-left bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300">
                      Function Component (Modern)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      aspect: "State Management",
                      class: "this.state & this.setState()",
                      function: "useState() hook",
                      classColor: "text-amber-600 dark:text-amber-400",
                      functionColor: "text-emerald-600 dark:text-emerald-400"
                    },
                    {
                      aspect: "Lifecycle",
                      class: "componentDidMount, componentDidUpdate, etc.",
                      function: "useEffect() hook",
                      classColor: "text-amber-600 dark:text-amber-400",
                      functionColor: "text-emerald-600 dark:text-emerald-400"
                    },
                    {
                      aspect: "Code Length",
                      class: "~20 lines minimum",
                      function: "~5 lines minimum",
                      classColor: "text-amber-600 dark:text-amber-400",
                      functionColor: "text-emerald-600 dark:text-emerald-400"
                    },
                    {
                      aspect: "'this' Keyword",
                      class: "Required, causes confusion",
                      function: "Not used at all",
                      classColor: "text-amber-600 dark:text-amber-amber-400",
                      functionColor: "text-emerald-600 dark:text-emerald-400"
                    },
                    {
                      aspect: "Learning Curve",
                      class: "Steep (OOP + React concepts)",
                      function: "Gentler (functional programming)",
                      classColor: "text-amber-600 dark:text-amber-400",
                      functionColor: "text-emerald-600 dark:text-emerald-400"
                    }
                  ].map((row, index) => (
                    <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-4 px-6 font-semibold">{row.aspect}</td>
                      <td className={`py-4 px-6 ${row.classColor} bg-amber-50/50 dark:bg-amber-900/10`}>
                        {row.class}
                      </td>
                      <td className={`py-4 px-6 ${row.functionColor} bg-emerald-50/50 dark:bg-emerald-900/10`}>
                        {row.function}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legacy Example Toggle */}
            <div className="mt-8">
              <button
                onClick={() => setShowLegacyExample(!showLegacyExample)}
                className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-300"
              >
                <span className="text-xl">{showLegacyExample ? '▼' : '▶'}</span>
                <span className="font-medium">
                  {showLegacyExample ? 'Hide' : 'Show'} Legacy Class Component Example
                </span>
              </button>

              {showLegacyExample && (
                <div className="mt-4 p-6 bg-gray-900 text-gray-100 rounded-xl overflow-x-auto">
                  <pre className="text-sm">
{`// 🚨 LEGACY CODE - For Historical Understanding Only
import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this); // Required binding!
  }

  componentDidMount() {
    console.log('Component mounted');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log('Count changed');
    }
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 }); // 'this' confusion!
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>
          Increment
        </button>
      </div>
    );
  }
}

// Compare with modern function component:
function CounterModern() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`}
                  </pre>
                  <div className="mt-4 p-3 bg-amber-900/30 border-l-4 border-amber-500">
                    <p className="text-amber-300">
                      <strong>Notice:</strong> The class version is <strong>3x longer</strong>, uses confusing <code>this</code> keyword, 
                      requires explicit binding, and scatters logic across multiple methods.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Why Functions Won - Hooks Revolution */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[300ms]`}>
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-emerald-700 dark:text-emerald-300">
              The Hooks Revolution (React 16.8 - February 2019)
            </h2>
            
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                  What Changed Everything?
                </h3>
                <p className="text-lg mb-4">
                  React Hooks allowed function components to do everything class components could do, but with:
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <h4 className="font-bold">Simplicity</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">No more 'this', constructors, or binding</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <span className="text-2xl">🧩</span>
                      <div>
                        <h4 className="font-bold">Reusable Logic</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Custom hooks for logic sharing</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <span className="text-2xl">📊</span>
                      <div>
                        <h4 className="font-bold">Better Organization</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Related logic stays together</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                      <span className="text-2xl">⚡</span>
                      <div>
                        <h4 className="font-bold">Performance</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Less memory overhead, better optimizations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Real-World Impact */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-6 rounded-xl">
                <h4 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-300">
                  Real-World Impact in Local Development
                </h4>
                <p className="mb-4">
                  Consider a Barrackpore-based startup building an inventory management system:
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-bold mb-2 text-amber-600 dark:text-amber-400">Before Hooks (2018):</h5>
                    <ul className="text-sm space-y-1">
                      <li>• 5000+ lines of class component boilerplate</li>
                      <li>• Multiple 'this' binding bugs reported</li>
                      <li>• New developers need 2 weeks training</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h5 className="font-bold mb-2 text-emerald-600 dark:text-emerald-400">After Hooks (2020+):</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Codebase reduced by 40%</li>
                      <li>• Bugs reduced by 60%</li>
                      <li>• New developers productive in 2 days</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Pitfalls & Misconceptions */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[400ms]`}>
          <h2 className="text-3xl font-bold mb-6 text-red-700 dark:text-red-300">
            Common Misconceptions About Class Components
          </h2>
          
          <div className="space-y-4">
            {[
              {
                myth: "Class components are faster",
                truth: "Modern function components with hooks are equally performant, often better due to React's optimizations",
                clarification: "React team optimized function components specifically in recent versions"
              },
              {
                myth: "You need to know class components for legacy code",
                truth: "You can read them, but new code should always use function components",
                clarification: "Like learning old Bengali script - useful for historical documents, but you write in modern Bengali"
              },
              {
                myth: "Class components are more 'professional'",
                truth: "The React team itself writes all new code in function components",
                clarification: "Facebook/Meta's codebase migrated entirely to function components"
              },
              {
                myth: "Error boundaries require class components",
                truth: "True, but this is the ONLY exception (and React team is working on a hook for this)",
                clarification: "This special case affects < 0.1% of components"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 border border-red-200 dark:border-red-800 rounded-xl p-5 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                    <span className="text-red-600 dark:text-red-400 font-bold">💭</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1 text-red-700 dark:text-red-300">Myth: {item.myth}</h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                      <strong className="text-green-600 dark:text-green-400">Truth:</strong> {item.truth}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic border-l-3 border-gray-400 dark:border-gray-600 pl-3">
                      {item.clarification}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Current Status & Best Practices */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[500ms]`}>
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-purple-700 dark:text-purple-300">
              Current Industry Status & Best Practices
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  status: "New Projects",
                  recommendation: "100% function components",
                  icon: "🚀",
                  color: "bg-emerald-500",
                  details: "Never start new projects with class components"
                },
                {
                  status: "Existing Codebases",
                  recommendation: "Migrate gradually",
                  icon: "🔄",
                  color: "bg-amber-500",
                  details: "Convert classes to functions during maintenance"
                },
                {
                  status: "Learning Path",
                  recommendation: "Focus on functions",
                  icon: "📚",
                  color: "bg-blue-500",
                  details: "Learn classes only to read legacy code"
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className={`${item.color} w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl mb-4`}>
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-xl mb-2">{item.status}</h3>
                  <p className="font-semibold text-lg mb-2 text-gray-800 dark:text-gray-200">{item.recommendation}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.details}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 p-6 rounded-xl">
              <h4 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">For Naihati & Ichapur Tech Scene</h4>
              <p className="mb-3">
                Local companies and freelancers should adopt this modern approach because:
              </p>
              <ul className="space-y-2 pl-5">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                  <span>New developers expect to work with modern React</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                  <span>Client projects stay maintainable for years</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                  <span>Easier to hire and train developers</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[600ms]`}>
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
                      Why We Still Teach This (Briefly)
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      You'll encounter class components in: <strong>older tutorials, legacy codebases, and job interviews</strong>. 
                      Knowing they exist helps you understand React's evolution, but invest 95% of your time mastering function components.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <h5 className="font-bold mb-1 text-red-600 dark:text-red-400">Warning:</h5>
                      <p className="text-sm">Don't write new class components - it's like using a typewriter in 2024</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <h5 className="font-bold mb-1 text-green-600 dark:text-green-400">Pro Tip:</h5>
                      <p className="text-sm">When reading legacy code, mentally translate classes to functions</p>
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

        {/* Mini Checklist */}
        <section className={`${animationClass} opacity-0 motion-safe:animate-delay-[700ms]`}>
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-emerald-700 dark:text-emerald-300">
              What You Should Remember
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">✅ Key Takeaways</h4>
                <ul className="space-y-3">
                  {[
                    "Class components are legacy (2015-2018 era)",
                    "Function components with hooks replaced them",
                    "Class components had 'this' confusion and boilerplate",
                    "Hooks provide simpler, more reusable code",
                    "You only need to READ class components, not WRITE them"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="inline-block w-5 h-5 bg-emerald-500 rounded-full mr-3 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">🤔 Think About...</h4>
                <ul className="space-y-3">
                  {[
                    "Why did JavaScript's 'this' cause so many problems?",
                    "How do hooks organize code better than lifecycle methods?",
                    "What would migrating a class component to function component involve?",
                    "Why did React team create hooks instead of improving classes?"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-5 h-5 bg-blue-100 dark:bg-blue-900 rounded-full mr-3 mt-1 flex-shrink-0 flex items-center justify-center">
                        <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">?</span>
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-emerald-200 dark:border-emerald-800">
              <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                <h5 className="font-bold text-lg mb-2 text-purple-600 dark:text-purple-400">Moving Forward:</h5>
                <p className="text-gray-700 dark:text-gray-300">
                  Now that you understand why class components are legacy, you can confidently focus 100% on 
                  mastering function components. In the next topics, we'll dive deep into creating modern 
                  React components the right way.
                </p>
                <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full">
                  <span>🎯</span>
                  <span className="font-medium">Next: Creating your first function-based React component</span>
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
        
        /* Syntax highlighting for code */
        pre {
          font-family: 'Courier New', monospace;
          line-height: 1.5;
        }
        
        code {
          font-family: 'Courier New', monospace;
          background: rgba(0,0,0,0.1);
          padding: 2px 4px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};

export default Topic14;