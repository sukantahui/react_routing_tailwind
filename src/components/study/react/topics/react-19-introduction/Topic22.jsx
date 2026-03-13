import { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic22 = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [activeTab, setActiveTab] = useState('problem');
  const [renderStep, setRenderStep] = useState(0);
  const [domUpdateCount, setDomUpdateCount] = useState(0);
  const [virtualDomUpdateCount, setVirtualDomUpdateCount] = useState(0);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]';

  // Virtual DOM visualization
  const VirtualDOMVisualization = () => {
    const steps = [
      {
        title: "Initial Render",
        realDOM: ["<div id='app'>", "  <h1>Hello, Swadeep!</h1>", "  <p>From: Barrackpore</p>", "</div>"],
        virtualDOM: ["<div id='app'>", "  <h1>Hello, Swadeep!</h1>", "  <p>From: Barrackpore</p>", "</div>"],
        status: "Both DOMs are identical"
      },
      {
        title: "State Update",
        realDOM: ["<div id='app'>", "  <h1>Hello, Swadeep!</h1>", "  <p>From: Barrackpore</p>", "</div>"],
        virtualDOM: ["<div id='app'>", "  <h1>Hello, Tuhina!</h1>", "  <p>From: Ichapur</p>", "</div>"],
        status: "Virtual DOM updated, Real DOM unchanged"
      },
      {
        title: "Diffing",
        realDOM: ["<div id='app'>", "  <h1>Hello, Swadeep!</h1>", "  <p>From: Barrackpore</p>", "</div>"],
        virtualDOM: ["<div id='app'>", "  <h1>Hello, Tuhina!</h1>", "  <p>From: Ichapur</p>", "</div>"],
        changes: ["h1 text changed", "p text changed"],
        status: "React finds differences"
      },
      {
        title: "Reconciliation",
        realDOM: ["<div id='app'>", "  <h1>Hello, Tuhina!</h1>", "  <p>From: Ichapur</p>", "</div>"],
        virtualDOM: ["<div id='app'>", "  <h1>Hello, Tuhina!</h1>", "  <p>From: Ichapur</p>", "</div>"],
        status: "Only changed elements updated in Real DOM"
      }
    ];

    const currentStep = steps[renderStep];

    return (
      <div className="p-6 bg-gray-900 rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-bold text-white">Virtual DOM Process Visualization</h4>
          <div className="flex gap-2">
            <button
              onClick={() => setRenderStep(Math.max(0, renderStep - 1))}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded"
            >
              ← Previous
            </button>
            <span className="px-4 py-1 bg-purple-600 text-white rounded">
              Step {renderStep + 1}: {currentStep.title}
            </span>
            <button
              onClick={() => setRenderStep(Math.min(steps.length - 1, renderStep + 1))}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded"
            >
              Next →
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-bold mb-3 text-blue-400 flex items-center gap-2">
              <span className="text-2xl">🖥️</span>
              Real DOM (Browser)
            </h5>
            <div className="p-4 bg-gray-800 rounded-lg min-h-[200px]">
              <div className="font-mono text-sm text-green-400">
                {currentStep.realDOM.map((line, idx) => (
                  <div key={idx} className="mb-1">{line}</div>
                ))}
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-300">
              <span className="font-semibold">Updates:</span> {domUpdateCount}
            </div>
          </div>
          
          <div>
            <h5 className="font-bold mb-3 text-purple-400 flex items-center gap-2">
              <span className="text-2xl">💭</span>
              Virtual DOM (React Memory)
            </h5>
            <div className="p-4 bg-gray-800 rounded-lg min-h-[200px]">
              <div className="font-mono text-sm text-cyan-400">
                {currentStep.virtualDOM.map((line, idx) => (
                  <div key={idx} className="mb-1">{line}</div>
                ))}
              </div>
            </div>
            <div className="mt-3 text-sm text-gray-300">
              <span className="font-semibold">Updates:</span> {virtualDomUpdateCount}
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">⚡</span>
            <h5 className="font-bold text-white">Current Status: {currentStep.status}</h5>
          </div>
          
          {currentStep.changes && (
            <div className="mt-3">
              <div className="text-sm font-semibold text-amber-300 mb-2">Changes Detected:</div>
              <div className="flex flex-wrap gap-2">
                {currentStep.changes.map((change, idx) => (
                  <span key={idx} className="px-3 py-1 bg-amber-900/30 text-amber-300 rounded-full text-sm">
                    {change}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {renderStep === 3 && (
            <div className="mt-4 p-3 bg-green-900/30 border border-green-700 rounded">
              <div className="text-green-300 text-sm">
                ✅ <strong>Performance Win:</strong> Only 2 DOM updates instead of recreating entire tree!
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => {
              setDomUpdateCount(domUpdateCount + 1);
              setVirtualDomUpdateCount(virtualDomUpdateCount + 1);
              setRenderStep(1);
              setTimeout(() => setRenderStep(2), 500);
              setTimeout(() => setRenderStep(3), 1000);
            }}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-300"
          >
            Simulate State Update
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
            Understanding Virtual DOM
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            React's secret sauce for high-performance UI updates
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full">
            <span className="text-lg">⚡</span>
            <span className="font-medium">Performance Magic - How React makes UI updates fast</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* The Problem Virtual DOM Solves */}
        <section className={`mb-12 ${animationClass} opacity-0`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-red-700 dark:text-red-300 flex items-center gap-3">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
                The Problem: Direct DOM Manipulation
              </h2>
              
              <div className="flex space-x-2">
                {['problem', 'solution'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={clsx(
                      'px-4 py-2 rounded-lg font-medium transition-all duration-300 capitalize',
                      activeTab === tab
                        ? tab === 'problem' 
                          ? 'bg-red-600 text-white'
                          : 'bg-green-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    )}
                  >
                    {tab === 'problem' ? 'The Problem' : 'The Solution'}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              {activeTab === 'problem' && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                      Before Virtual DOM: The jQuery Era
                    </h3>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300">
                      In traditional web development (jQuery era), developers manipulated the 
                      DOM directly. This caused performance issues in complex applications.
                    </p>
                    
                    <div className="bg-gray-900 text-gray-100 p-6 rounded-xl mb-6">
                      <pre className="text-sm">
{`// Traditional DOM manipulation (SLOW!)
function updateUserProfile(user) {
  // Each line causes DOM reflow/repaint
  $('#user-name').text(user.name);
  $('#user-age').text(user.age);
  $('#user-city').text(user.city);
  $('#user-status').text(user.isStudent ? 'Student' : 'Professional');
  
  // Complex updates require more manual DOM operations
  if (user.isPremium) {
    $('#user-card').addClass('premium');
    $('#badge').show();
  } else {
    $('#user-card').removeClass('premium');
    $('#badge').hide();
  }
}`}
                      </pre>
                    </div>
                    
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <h4 className="font-bold mb-2 text-red-800 dark:text-red-300">Performance Issues:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Each DOM update causes browser reflow/repaint</li>
                        <li>• Manual DOM operations are error-prone</li>
                        <li>• Complex UIs become slow and hard to maintain</li>
                        <li>• No batching of updates</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                      <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">
                        Real-World Example: Barrackpore Municipality Website
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                        The old website used jQuery. When displaying 100+ complaints:
                      </p>
                      <div className="space-y-3">
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded">
                          <div className="font-bold text-red-700 dark:text-red-300">Performance:</div>
                          <div className="text-sm">3+ seconds to update complaint list</div>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded">
                          <div className="font-bold text-red-700 dark:text-red-300">Code Complexity:</div>
                          <div className="text-sm">500+ lines of DOM manipulation code</div>
                        </div>
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded">
                          <div className="font-bold text-red-700 dark:text-red-300">Maintenance:</div>
                          <div className="text-sm">Hard to add new features</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                      <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">
                        The DOM is Expensive
                      </h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                          <span><strong>Reflow:</strong> Browser recalculates element positions</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                          <span><strong>Repaint:</strong> Browser redraws pixels on screen</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt=2 mr-3"></span>
                          <span><strong>Costly:</strong> 1000 DOM updates ≠ 1000× virtual updates</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'solution' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold mb-4 text-green-800 dark:text-green-300">
                      React's Solution: The Virtual DOM
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <p className="mb-6 text-gray-700 dark:text-gray-300">
                          React introduced the <strong>Virtual DOM</strong> - a lightweight 
                          JavaScript representation of the actual DOM. Instead of updating 
                          the real DOM directly, React:
                        </p>
                        
                        <ol className="space-y-4">
                          <li className="flex items-start">
                            <span className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                              <span className="text-green-600 dark:text-green-400 font-bold">1</span>
                            </span>
                            <span>Creates virtual representation in memory</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                              <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                            </span>
                            <span>Compares new virtual DOM with previous version</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                              <span className="text-green-600 dark:text-green-400 font-bold">3</span>
                            </span>
                            <span>Calculates minimal set of changes needed</span>
                          </li>
                          <li className="flex items-start">
                            <span className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                              <span className="text-green-600 dark:text-green-400 font-bold">4</span>
                            </span>
                            <span>Updates only those elements in real DOM</span>
                          </li>
                        </ol>
                      </div>
                      
                      <div>
                        <div className="bg-gray-900 text-gray-100 p-6 rounded-xl mb-6">
                          <pre className="text-sm">
{`// React with Virtual DOM (FAST!)
function UserProfile({ user }) {
  // Declarative UI - Describe WHAT, not HOW
  return (
    <div className={\`card \${user.isPremium ? 'premium' : ''}\`}>
      <h2>{user.name}</h2>
      <p>Age: {user.age}</p>
      <p>City: {user.city}</p>
      <p>Status: {user.isStudent ? 'Student' : 'Professional'}</p>
      {user.isPremium && <span className="badge">Premium</span>}
    </div>
  );
}

// React handles ALL DOM updates automatically!
// No manual DOM manipulation needed.`}
                          </pre>
                        </div>
                        
                        <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <h4 className="font-bold mb-2 text-green-800 dark:text-green-300">Benefits:</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Minimal real DOM updates</li>
                            <li>• Batched updates for performance</li>
                            <li>• Declarative programming model</li>
                            <li>• Easier to reason about</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                    <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">
                      Naihati E-commerce Performance Improvement
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <h5 className="font-bold mb-2 text-red-600 dark:text-red-400">Before (jQuery):</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Product filter: 2+ seconds</li>
                          <li>• Cart updates: 500ms each</li>
                          <li>• Page load: 8+ seconds</li>
                          <li>• Code: 2000+ lines jQuery</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h5 className="font-bold mb-2 text-green-600 dark:text-green-400">After (React):</h5>
                        <ul className="text-sm space-y-1">
                          <li>• Product filter: 200ms</li>
                          <li>• Cart updates: 50ms</li>
                          <li>• Page load: 2 seconds</li>
                          <li>• Code: 800 lines React</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Virtual DOM Visualization */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[100ms]`}>
          <h2 className="text-3xl font-bold mb-8 text-blue-700 dark:text-blue-300">
            How Virtual DOM Works: Step-by-Step
          </h2>
          
          <div className="space-y-8">
            <VirtualDOMVisualization />
            
            {/* The Diffing Algorithm */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                The Diffing Algorithm: React's Secret Sauce
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold mb-4 text-purple-700 dark:text-purple-300">
                    What is Diffing?
                  </h4>
                  <p className="mb-6 text-gray-700 dark:text-gray-300">
                    Diffing is the process of comparing two virtual DOM trees to find 
                    the minimal set of changes needed to update the real DOM.
                  </p>
                  
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-lg">
                    <h5 className="font-bold mb-2 text-blue-800 dark:text-blue-300">Key Diffing Strategies:</h5>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                        <span><strong>Same-level comparison:</strong> Elements at same position are compared</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt=2 mr-3"></span>
                        <span><strong>Keys for lists:</strong> Help React identify which items changed</span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></span>
                        <span><strong>Component type matching:</strong> Different component types cause full re-render</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold mb-4 text-green-700 dark:text-green-300">
                    Diffing Example
                  </h4>
                  
                  <div className="bg-gray-900 text-gray-100 p-6 rounded-xl">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm font-semibold text-amber-300 mb-2">Old Virtual DOM</div>
                        <div className="font-mono text-xs">
                          <div>&lt;ul&gt;</div>
                          <div className="ml-4">&lt;li key="1"&gt;Swadeep&lt;/li&gt;</div>
                          <div className="ml-4">&lt;li key="2"&gt;Tuhina&lt;/li&gt;</div>
                          <div className="ml-4">&lt;li key="3"&gt;Abhronila&lt;/li&gt;</div>
                          <div>&lt;/ul&gt;</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-semibold text-green-300 mb-2">New Virtual DOM</div>
                        <div className="font-mono text-xs">
                          <div>&lt;ul&gt;</div>
                          <div className="ml-4">&lt;li key="1"&gt;Swadeep&lt;/li&gt;</div>
                          <div className="ml-4">&lt;li key="2"&gt;Tuhina (Updated)&lt;/li&gt;</div>
                          <div className="ml-4">&lt;li key="4"&gt;Debangshu&lt;/li&gt;</div>
                          <div>&lt;/ul&gt;</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-3 bg-gray-800 rounded">
                      <div className="text-sm font-semibold text-cyan-300 mb-2">Diff Result:</div>
                      <ul className="text-xs space-y-1">
                        <li className="flex items-center">
                          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                          <span>Update li key="2" text content</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                          <span>Remove li key="3"</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                          <span>Add li key="4"</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-xl">
                <h4 className="text-xl font-bold mb-3 text-amber-800 dark:text-amber-300">
                  Real-World Impact: Shyamnagar Complaint List
                </h4>
                <p className="mb-4">
                  The complaint dashboard shows 100+ items. With Virtual DOM:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">95%</div>
                    <div className="text-sm">Fewer DOM operations</div>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">10×</div>
                    <div className="text-sm">Faster updates</div>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">60%</div>
                    <div className="text-sm">Less code</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Virtual DOM vs Real DOM */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[200ms]`}>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-purple-700 dark:text-purple-300">
              Virtual DOM vs Real DOM: Key Differences
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-purple-300 dark:border-purple-700">
                    <th className="py-4 px-6 text-left">Aspect</th>
                    <th className="py-4 px-6 text-left bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300">
                      Real DOM
                    </th>
                    <th className="py-4 px-6 text-left bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300">
                      Virtual DOM
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      aspect: "Location",
                      realDOM: "Browser memory (actual webpage)",
                      virtualDOM: "JavaScript memory (React's representation)",
                      realColor: "text-blue-600 dark:text-blue-400",
                      virtualColor: "text-purple-600 dark:text-purple-400"
                    },
                    {
                      aspect: "Updates",
                      realDOM: "Expensive (causes reflow/repaint)",
                      virtualDOM: "Cheap (just JavaScript objects)",
                      realColor: "text-red-600 dark:text-red-400",
                      virtualColor: "text-green-600 dark:text-green-400"
                    },
                    {
                      aspect: "Manipulation",
                      realDOM: "Manual (document.getElementById, etc.)",
                      virtualDOM: "Automatic (React handles everything)",
                      realColor: "text-amber-600 dark:text-amber-400",
                      virtualColor: "text-green-600 dark:text-green-400"
                    },
                    {
                      aspect: "Performance",
                      realDOM: "Slow for frequent updates",
                      virtualDOM: "Fast (batched, minimal updates)",
                      realColor: "text-red-600 dark:text-red-400",
                      virtualColor: "text-green-600 dark:text-green-400"
                    },
                    {
                      aspect: "Memory",
                      realDOM: "Browser manages",
                      virtualDOM: "React manages (additional memory)",
                      realColor: "text-blue-600 dark:text-blue-400",
                      virtualColor: "text-purple-600 dark:text-purple-400"
                    },
                    {
                      aspect: "Best For",
                      realDOM: "Simple pages, static content",
                      virtualDOM: "Complex apps, dynamic UIs",
                      realColor: "text-gray-600 dark:text-gray-400",
                      virtualColor: "text-purple-600 dark:text-purple-400"
                    }
                  ].map((row, index) => (
                    <tr 
                      key={index}
                      className="border-b border-purple-100 dark:border-purple-900 hover:bg-white/50 dark:hover:bg-gray-800/50"
                    >
                      <td className="py-4 px-6 font-semibold">{row.aspect}</td>
                      <td className={`py-4 px-6 ${row.realColor} bg-blue-50/50 dark:bg-blue-900/10`}>
                        {row.realDOM}
                      </td>
                      <td className={`py-4 px-6 ${row.virtualColor} bg-purple-50/50 dark:bg-purple-900/10`}>
                        {row.virtualDOM}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
                <h4 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">
                  When Virtual DOM Shines
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                    <span>Complex, data-driven applications</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                    <span>Frequent UI updates (dashboards, chats)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt=2 mr-3"></span>
                    <span>Team projects with reusable components</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                    <span>Cross-platform apps (React Native)</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl">
                <h4 className="text-xl font-bold mb-3 text-red-800 dark:text-red-300">
                  When Virtual DOM Might Be Overkill
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                    <span>Static websites (brochure sites)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                    <span>Simple forms with minimal interaction</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                    <span>Performance-critical animations (use CSS/WebGL)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                    <span>Extremely simple widgets</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Common Misconceptions */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[300ms]`}>
          <h2 className="text-3xl font-bold mb-6 text-amber-700 dark:text-amber-300">
            Common Misconceptions About Virtual DOM
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                myth: "Virtual DOM is faster than Real DOM",
                truth: "Virtual DOM is SLOWER for single updates, but FASTER for complex apps",
                explanation: "The overhead of diffing is worth it for minimizing real DOM updates",
                example: "Updating one button: Real DOM wins. Updating 1000 list items: Virtual DOM wins."
              },
              {
                myth: "React re-renders the entire component tree",
                truth: "React re-renders virtual DOM, but updates only changed parts of real DOM",
                explanation: "Virtual DOM re-render is cheap JavaScript. Real DOM updates are minimal.",
                example: "Changing a user's name only updates that text node, not the entire page."
              },
              {
                myth: "Virtual DOM eliminates all performance issues",
                truth: "Virtual DOM helps, but poor component design can still cause performance problems",
                explanation: "Unnecessary re-renders, large component trees, and complex diffs can still slow things down",
                example: "A component re-rendering on every keystroke needs optimization (useMemo, useCallback)"
              },
              {
                myth: "Virtual DOM is unique to React",
                truth: "Concept existed before React (Ember, Meteor), but React popularized it",
                explanation: "React's implementation and developer experience made Virtual DOM mainstream",
                example: "Vue.js also uses Virtual DOM, but with different implementation details"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border border-amber-200 dark:border-amber-800 rounded-xl p-5 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">💭</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200">Myth: {item.myth}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.truth}</p>
                  </div>
                </div>
                
                <div className="mb-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="font-semibold text-blue-700 dark:text-blue-300">Explanation:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{item.explanation}</p>
                </div>
                
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg">
                  <div className="text-sm font-semibold text-amber-300 mb-1">Example:</div>
                  <div className="text-sm">{item.example}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 p-6 rounded-xl">
            <h4 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">
              Ichapur College Portal: Learning From Mistakes
            </h4>
            <p className="mb-3">
              When <strong>Tuhina</strong> first learned React, she thought:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-bold mb-2 text-red-600 dark:text-red-400">Wrong Assumption:</h5>
                <p className="text-sm">"Virtual DOM means I don't need to optimize my code"</p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-bold mb-2 text-green-600 dark:text-green-400">Reality Learned:</h5>
                <p className="text-sm">"Virtual DOM helps, but I still need React.memo() for expensive components"</p>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[400ms]`}>
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-emerald-700 dark:text-emerald-300">
              Working Efficiently With Virtual DOM
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Performance Optimization Tips
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded">
                      <span>Use keys for lists</span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded text-xs">
                        ✅ Do
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded">
                      <span>Avoid inline function creation in render</span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded text-xs">
                        ✅ Do
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded">
                      <span>Use React.memo() for expensive components</span>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded text-xs">
                        ✅ Do
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Local Project Guidelines
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mt-1 mr-3"></span>
                      <span><strong>Barrackpore small apps:</strong> Basic Virtual DOM understanding sufficient</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mt-1 mr-3"></span>
                      <span><strong>Naihati medium apps:</strong> Use keys, avoid unnecessary re-renders</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mt=1 mr-3"></span>
                      <span><strong>Ichapur large apps:</strong> Implement React.memo(), useCallback patterns</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-3 h-3 bg-emerald-500 rounded-full mt-1 mr-3"></span>
                      <span><strong>Shyamnagar teams:</strong> Code reviews check for performance anti-patterns</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Key Optimization Patterns
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <div className="font-bold text-sm">React.memo()</div>
                      <code className="text-xs">Memo(ExpensiveComponent)</code>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                      <div className="font-bold text-sm">useCallback</div>
                      <code className="text-xs">useCallback(fn, deps)</code>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                      <div className="font-bold text-sm">useMemo</div>
                      <code className="text-xs">useMemo(compute, deps)</code>
                    </div>
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded">
                      <div className="font-bold text-sm">Key Prop</div>
                      <code className="text-xs">key="unique-id"</code>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Debugging Virtual DOM Issues
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                      <span>Use React DevTools to see re-renders</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                      <span>Check for missing keys in lists</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                      <span>Look for unnecessary prop changes</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                      <span>Monitor component render counts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                      The Mental Model Shift
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Beginners think: <strong>"How do I update this element?"</strong>
                      <br/>
                      React developers think: <strong>"What should the UI look like in this state?"</strong>
                      <br/>
                      When <strong>Debangshu</strong> stopped thinking about DOM manipulation and started 
                      thinking about state → UI mapping, his Barrackpore app became 10x more maintainable.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <h5 className="font-bold mb-1 text-red-600 dark:text-red-400">Remember:</h5>
                      <p className="text-sm">Virtual DOM is a means to an end, not React's primary value.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <h5 className="font-bold mb-1 text-green-600 dark:text-green-400">Pro Tip:</h5>
                      <p className="text-sm">Trust React's diffing. Focus on declaring UI, not optimizing updates.</p>
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
                    📝 Exercise: Optimize a Student List
                  </h4>
                  
                  <div className="space-y-4 mb-6">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <h5 className="font-bold mb-1">Problem Code:</h5>
                      <div className="font-mono text-xs bg-gray-900 text-gray-100 p-3 rounded">
{`function StudentList({ students, onSelect }) {
  // Inline function created on every render
  return (
    <ul>
      {students.map((student, index) => (
        <li onClick={() => onSelect(student)}> {/* Missing key! */}
          {student.name} - {student.city}
        </li>
      ))}
    </ul>
  );
}`}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h5 className="font-bold mb-1">Your Task:</h5>
                      <ol className="text-sm space-y-1 pl-5">
                        <li>1. Add proper keys to prevent unnecessary re-renders</li>
                        <li>2. Optimize click handler to avoid inline functions</li>
                        <li>3. Consider if React.memo() would help</li>
                        <li>4. Explain how Virtual DOM helps here</li>
                      </ol>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => alert('Start by adding key={student.id}. Extract click handler: const handleClick = useCallback((student) => () => onSelect(student), [onSelect]). Consider wrapping StudentList with React.memo.')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Click for Optimization Tips
                  </button>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h5 className="font-bold mb-3 text-gray-800 dark:text-gray-200">💡 Hint Section</h5>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Think about:</strong> How does React know which list items changed?
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Observe carefully:</strong> What triggers Virtual DOM diffs vs Real DOM updates?
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Try changing:</strong> Remove keys and see how React behaves differently.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                  ✅ Virtual DOM Understanding Checklist
                </h4>
                
                <div className="space-y-4">
                  {[
                    "Understand why direct DOM manipulation is expensive",
                    "Can explain Virtual DOM in simple terms",
                    "Know the diffing and reconciliation process",
                    "Understand keys and their importance for lists",
                    "Can differentiate Virtual DOM updates vs Real DOM updates",
                    "Know when Virtual DOM helps vs when it doesn't",
                    "Understand common misconceptions about Virtual DOM",
                    "Can identify performance optimization opportunities",
                    "Know how to use React DevTools to debug renders",
                    "Can explain Virtual DOM to another developer"
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
                    Now that you understand the Virtual DOM conceptually, you're ready to 
                    learn about the <strong>reconciliation process</strong> - how React 
                    actually applies those Virtual DOM diffs to the real browser DOM.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full">
                    <span>🎯</span>
                    <span className="font-medium">Coming Next: Reconciliation process explained visually</span>
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
        
        /* Smooth transitions for Virtual DOM visualization */
        .dom-transition {
          transition: all 0.5s ease;
        }
        
        .highlight-change {
          animation: highlight 1s ease;
        }
        
        @keyframes highlight {
          0%, 100% { background: transparent; }
          50% { background: rgba(251, 191, 36, 0.3); }
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

export default Topic22;