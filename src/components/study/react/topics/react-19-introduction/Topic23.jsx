import { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic23 = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [reconciliationStep, setReconciliationStep] = useState(0);
  const [nodeUpdates, setNodeUpdates] = useState(0);
  const [showAnimation, setShowAnimation] = useState(true);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]';

  // Component tree visualization
  const ComponentTree = ({ step }) => {
    const trees = [
      {
        title: "Initial Render",
        components: [
          { id: 1, name: "App", children: [2, 3], color: "bg-purple-500", updated: false },
          { id: 2, name: "Header", children: [4], color: "bg-blue-500", updated: false },
          { id: 3, name: "Content", children: [5, 6], color: "bg-green-500", updated: false },
          { id: 4, name: "Logo", children: [], color: "bg-cyan-500", updated: false },
          { id: 5, name: "UserCard", children: [7, 8], color: "bg-amber-500", updated: false },
          { id: 6, name: "NewsFeed", children: [], color: "bg-red-500", updated: false },
          { id: 7, name: "Avatar", children: [], color: "bg-pink-500", updated: false },
          { id: 8, name: "UserInfo", children: [], color: "bg-indigo-500", updated: false }
        ],
        description: "All components rendered for the first time"
      },
      {
        title: "State Update in UserCard",
        components: [
          { id: 1, name: "App", children: [2, 3], color: "bg-purple-500", updated: false },
          { id: 2, name: "Header", children: [4], color: "bg-blue-500", updated: false },
          { id: 3, name: "Content", children: [5, 6], color: "bg-green-500", updated: true },
          { id: 4, name: "Logo", children: [], color: "bg-cyan-500", updated: false },
          { id: 5, name: "UserCard", children: [7, 8], color: "bg-amber-500", updated: true },
          { id: 6, name: "NewsFeed", children: [], color: "bg-red-500", updated: false },
          { id: 7, name: "Avatar", children: [], color: "bg-pink-500", updated: true },
          { id: 8, name: "UserInfo", children: [], color: "bg-indigo-500", updated: true }
        ],
        description: "UserCard state changed, triggering re-render"
      },
      {
        title: "Virtual DOM Diffing",
        components: [
          { id: 1, name: "App", children: [2, 3], color: "bg-purple-500", updated: false, diff: "same" },
          { id: 2, name: "Header", children: [4], color: "bg-blue-500", updated: false, diff: "same" },
          { id: 3, name: "Content", children: [5, 6], color: "bg-green-500", updated: true, diff: "same" },
          { id: 4, name: "Logo", children: [], color: "bg-cyan-500", updated: false, diff: "same" },
          { id: 5, name: "UserCard", children: [7, 8], color: "bg-amber-500", updated: true, diff: "props-changed" },
          { id: 6, name: "NewsFeed", children: [], color: "bg-red-500", updated: false, diff: "same" },
          { id: 7, name: "Avatar", children: [], color: "bg-pink-500", updated: true, diff: "props-changed" },
          { id: 8, name: "UserInfo", children: [], color: "bg-indigo-500", updated: true, diff: "props-changed" }
        ],
        description: "React compares old and new Virtual DOM trees"
      },
      {
        title: "Reconciliation: Apply Changes",
        components: [
          { id: 1, name: "App", children: [2, 3], color: "bg-purple-500", updated: false, reconciled: false },
          { id: 2, name: "Header", children: [4], color: "bg-blue-500", updated: false, reconciled: false },
          { id: 3, name: "Content", children: [5, 6], color: "bg-green-500", updated: true, reconciled: true },
          { id: 4, name: "Logo", children: [], color: "bg-cyan-500", updated: false, reconciled: false },
          { id: 5, name: "UserCard", children: [7, 8], color: "bg-amber-500", updated: true, reconciled: true },
          { id: 6, name: "NewsFeed", children: [], color: "bg-red-500", updated: false, reconciled: false },
          { id: 7, name: "Avatar", children: [], color: "bg-pink-500", updated: true, reconciled: true },
          { id: 8, name: "UserInfo", children: [], color: "bg-indigo-500", updated: true, reconciled: true }
        ],
        description: "Only changed components update the Real DOM"
      }
    ];

    const currentTree = trees[step];
    
    const renderNode = (node, level = 0) => {
      const isUpdated = node.updated || step === 3;
      const hasDiff = node.diff && node.diff !== 'same';
      const isReconciled = node.reconciled;
      
      return (
        <div key={node.id} className="mb-4">
          <div 
            className={clsx(
              "flex items-center p-4 rounded-lg text-white transition-all duration-500",
              node.color,
              isUpdated && step >= 1 && "ring-2 ring-yellow-400",
              hasDiff && step === 2 && "ring-2 ring-orange-400 animate-pulse",
              isReconciled && step === 3 && "ring-2 ring-green-400",
              showAnimation && !isReducedMotion && "motion-safe:hover:scale-105"
            )}
            style={{ marginLeft: `${level * 40}px` }}
          >
            <div className="font-bold mr-3">{node.name}</div>
            
            {step === 2 && hasDiff && (
              <span className="ml-auto px-2 py-1 bg-orange-700 rounded text-xs">
                {node.diff === 'props-changed' ? 'Props Changed' : node.diff}
              </span>
            )}
            
            {step === 3 && isReconciled && (
              <span className="ml-auto px-2 py-1 bg-green-700 rounded text-xs animate-pulse">
                ✓ Updated
              </span>
            )}
            
            {isUpdated && step === 1 && (
              <span className="ml-auto animate-pulse">⚡</span>
            )}
          </div>
          
          {node.children.map(childId => {
            const child = currentTree.components.find(c => c.id === childId);
            return renderNode(child, level + 1);
          })}
        </div>
      );
    };

    return (
      <div className="p-6 bg-gray-900 rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h4 className="text-xl font-bold text-white">Component Tree</h4>
            <p className="text-gray-300 text-sm">{currentTree.description}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowAnimation(!showAnimation)}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded text-sm"
            >
              {showAnimation ? 'Pause Animations' : 'Resume Animations'}
            </button>
            
            <div className="text-right">
              <div className="text-sm text-gray-300">DOM Updates</div>
              <div className="text-2xl font-bold text-green-400">{nodeUpdates}</div>
            </div>
          </div>
        </div>

        <div className="h-[400px] overflow-y-auto p-4 bg-gray-800 rounded-lg">
          {renderNode(currentTree.components[0])}
        </div>

        <div className="mt-6 grid grid-cols-4 gap-4">
          {trees.map((tree, idx) => (
            <button
              key={idx}
              onClick={() => {
                setReconciliationStep(idx);
                if (idx === 3) {
                  setNodeUpdates(4); // Simulate 4 components updated
                } else if (idx === 2) {
                  setNodeUpdates(0); // Diffing stage, no DOM updates yet
                }
              }}
              className={clsx(
                'p-3 rounded-lg text-center transition-all duration-300',
                reconciliationStep === idx
                  ? 'bg-purple-600 text-white transform scale-105'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              )}
            >
              <div className="font-bold">Step {idx + 1}</div>
              <div className="text-xs mt-1">{tree.title}</div>
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">
              {step === 0 && '🏗️'}
              {step === 1 && '⚡'}
              {step === 2 && '🔍'}
              {step === 3 && '✅'}
            </span>
            <div>
              <h5 className="font-bold text-white">{currentTree.title}</h5>
              <p className="text-sm text-gray-300">{currentTree.description}</p>
            </div>
          </div>
          
          {step === 2 && (
            <div className="mt-3 p-3 bg-blue-900/30 border border-blue-700 rounded">
              <div className="text-blue-300 text-sm">
                🔍 <strong>Diffing Result:</strong> Found 3 components with changed props
              </div>
            </div>
          )}
          
          {step === 3 && (
            <div className="mt-3 p-3 bg-green-900/30 border border-green-700 rounded">
              <div className="text-green-300 text-sm">
                ✅ <strong>Performance Win:</strong> Only 4 components updated instead of 8!
              </div>
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
            The Reconciliation Process
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            How React efficiently updates the browser DOM with minimal changes
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full">
            <span className="text-lg">🔧</span>
            <span className="font-medium">React's Update Engine - Smart, efficient DOM updates</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* What is Reconciliation? */}
        <section className={`mb-12 ${animationClass} opacity-0`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-300 flex items-center gap-3">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
                What is Reconciliation?
              </h2>
              
              <div className="flex space-x-2">
                {['overview', 'analogy', 'importance'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={clsx(
                      'px-4 py-2 rounded-lg font-medium transition-all duration-300 capitalize',
                      activeTab === tab
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    )}
                  >
                    {tab === 'overview' ? 'Overview' : 
                     tab === 'analogy' ? 'Analogy' : 
                     'Importance'}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              {activeTab === 'overview' && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                      The Reconciliation Definition
                    </h3>
                    
                    <p className="mb-6 text-gray-700 dark:text-gray-300">
                      <strong>Reconciliation</strong> is the process through which React updates 
                      the browser DOM to match the latest Virtual DOM representation. It's the 
                      bridge between React's declarative programming model and the imperative 
                      browser DOM.
                    </p>
                    
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-lg mb-6">
                      <h4 className="font-bold mb-2 text-blue-800 dark:text-blue-300">Simple Definition:</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        Reconciliation = Diffing + DOM Updates
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">1. Diffing</span>
                        <span className="text-xl">+</span>
                        <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm">2. DOM Updates</span>
                        <span className="text-xl">=</span>
                        <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm">Reconciliation</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-bold mb-2 text-blue-800 dark:text-blue-300">Key Insight:</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Reconciliation is React's answer to: <strong>"How do I update the real webpage 
                        with minimal work?"</strong>
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                      <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">
                        The Two-Phase Process
                      </h4>
                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-lg">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">🔍</span>
                            <h5 className="font-bold">Phase 1: Render & Diff</h5>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            React creates new Virtual DOM, compares with previous, 
                            identifies what changed.
                          </p>
                        </div>
                        
                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-lg">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">⚡</span>
                            <h5 className="font-bold">Phase 2: Commit & Update</h5>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            React applies minimal changes to real DOM, updates refs, 
                            calls lifecycle methods.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                      <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">
                        Barrackpore Municipality Example
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        When a new complaint arrives, React doesn't rebuild the entire 
                        dashboard. It:
                      </p>
                      <ol className="text-sm mt-2 space-y-1 pl-5">
                        <li>1. Adds one row to complaints list</li>
                        <li>2. Updates counter badge</li>
                        <li>3. Leaves everything else unchanged</li>
                      </ol>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'analogy' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold mb-4 text-purple-800 dark:text-purple-300">
                      Real-World Analogy: Barrackpore Construction Site
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <p className="mb-6 text-gray-700 dark:text-gray-300">
                          Imagine building a house (webpage) in Barrackpore:
                        </p>
                        
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                              <span className="text-purple-600 dark:text-purple-400">🏗️</span>
                            </span>
                            <div>
                              <div className="font-bold">Old Way (jQuery):</div>
                              <div className="text-sm">Demolish house, rebuild from scratch for every change</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                              <span className="text-purple-600 dark:text-purple-400">🏠</span>
                            </span>
                            <div>
                              <div className="font-bold">React Way:</div>
                              <div className="text-sm">Keep blueprint (Virtual DOM), only fix what's broken</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center">
                            <span className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                              <span className="text-purple-600 dark:text-purple-400">👷</span>
                            </span>
                            <div>
                              <div className="font-bold">Reconciliation:</div>
                              <div className="text-sm">Smart foreman who knows exactly what needs fixing</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                          <h5 className="font-bold mb-2 text-gray-800 dark:text-gray-200">Construction Scenario:</h5>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                            Client wants to change window color from blue to green:
                          </p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <span className="w-4 h-4 bg-red-500 rounded-full mr-2"></span>
                              <span className="text-sm">Without React: Rebuild entire house</span>
                            </div>
                            <div className="flex items-center">
                              <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                              <span className="text-sm">With React: Just repaint the windows</span>
                            </div>
                          </div>
                          
                          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded">
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                              <strong>Savings:</strong> 95% less work, 90% faster, same result!
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                    <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">
                      Naihati E-commerce Comparison
                    </h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <h5 className="font-bold mb-2 text-red-600 dark:text-red-400">Traditional Update:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• User adds item to cart</li>
                          <li>• Entire page re-renders</li>
                          <li>• Flash of white screen</li>
                          <li>• 2+ second delay</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <h5 className="font-bold mb-2 text-green-600 dark:text-green-400">React Reconciliation:</h5>
                        <ul className="text-sm space-y-1">
                          <li>• User adds item to cart</li>
                          <li>• Only cart icon and total update</li>
                          <li>• No page flash</li>
                          <li>• 50ms update</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'importance' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold mb-4 text-amber-800 dark:text-amber-300">
                      Why Reconciliation Matters
                    </h3>
                    
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          title: "Performance",
                          description: "Minimal DOM operations = faster apps",
                          impact: "10-100x faster updates in complex UIs",
                          icon: "⚡"
                        },
                        {
                          title: "Battery Life",
                          description: "Less CPU/GPU work = longer battery",
                          impact: "Critical for mobile devices",
                          icon: "🔋"
                        },
                        {
                          title: "User Experience",
                          description: "Smooth, jank-free interactions",
                          impact: "Higher engagement, fewer bounces",
                          icon: "😊"
                        }
                      ].map((item, index) => (
                        <div 
                          key={index}
                          className="bg-white dark:bg-gray-800 p-5 rounded-xl"
                        >
                          <div className="text-3xl mb-3">{item.icon}</div>
                          <h4 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">{item.title}</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{item.description}</p>
                          <div className="text-xs px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 rounded-full">
                            {item.impact}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                    <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">
                      Shyamnagar Municipality: Before & After
                    </h4>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                            <th className="py-3 px-4 text-left">Metric</th>
                            <th className="py-3 px-4 text-left bg-red-50 dark:bg-red-900/20">Before React</th>
                            <th className="py-3 px-4 text-left bg-green-50 dark:bg-green-900/20">After React</th>
                            <th className="py-3 px-4 text-left">Improvement</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              metric: "Complaint List Update",
                              before: "3.2 seconds",
                              after: "0.2 seconds",
                              improvement: "16x faster"
                            },
                            {
                              metric: "Form Submission",
                              before: "Full page reload",
                              after: "Instant feedback",
                              improvement: "No reload needed"
                            },
                            {
                              metric: "Mobile Performance",
                              before: "Laggy, unresponsive",
                              after: "Smooth, native-feel",
                              improvement: "User satisfaction ↑ 80%"
                            },
                            {
                              metric: "Developer Speed",
                              before: "Days for new features",
                              after: "Hours for new features",
                              improvement: "10x faster development"
                            }
                          ].map((row, index) => (
                            <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                              <td className="py-3 px-4 font-semibold">{row.metric}</td>
                              <td className="py-3 px-4 bg-red-50/50 dark:bg-red-900/10">{row.before}</td>
                              <td className="py-3 px-4 bg-green-50/50 dark:bg-green-900/10">{row.after}</td>
                              <td className="py-3 px-4">
                                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-sm">
                                  {row.improvement}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Reconciliation Process Visualization */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[100ms]`}>
          <h2 className="text-3xl font-bold mb-8 text-purple-700 dark:text-purple-300">
            Reconciliation Process: Visual Walkthrough
          </h2>
          
          <ComponentTree step={reconciliationStep} />
          
          {/* Process Details */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {[
              {
                step: 1,
                title: "Trigger Re-render",
                description: "State or props change in a component",
                example: "User clicks 'Like' button",
                icon: "⚡",
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: 2,
                title: "Create New Virtual DOM",
                description: "React renders component tree to Virtual DOM",
                example: "Generate updated UI representation",
                icon: "💭",
                color: "from-purple-500 to-pink-500"
              },
              {
                step: 3,
                title: "Diffing (Reconciliation)",
                description: "Compare new and old Virtual DOM trees",
                example: "Find what actually changed",
                icon: "🔍",
                color: "from-amber-500 to-orange-500"
              },
              {
                step: 4,
                title: "Apply Changes to Real DOM",
                description: "Update only changed elements in browser",
                example: "Update like count, leave rest unchanged",
                icon: "✅",
                color: "from-green-500 to-emerald-500"
              }
            ].map((item) => (
              <div 
                key={item.step}
                className={clsx(
                  "bg-gradient-to-br p-6 rounded-xl text-white transform transition-all duration-300",
                  item.color,
                  reconciliationStep + 1 === item.step 
                    ? "ring-4 ring-yellow-400 scale-105" 
                    : "opacity-90 hover:opacity-100"
                )}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">{item.icon}</div>
                  <div>
                    <div className="text-xs opacity-80">Step {item.step}</div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                </div>
                
                <p className="mb-4 opacity-90">{item.description}</p>
                
                <div className="text-sm bg-white/20 p-3 rounded">
                  <span className="font-semibold">Example:</span> {item.example}
                </div>
                
                {reconciliationStep + 1 === item.step && (
                  <div className="mt-4 p-2 bg-white/30 rounded text-center animate-pulse">
                    ⬅ Currently showing this step
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Smart Diffing Strategies */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[200ms]`}>
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-emerald-700 dark:text-emerald-300">
              React's Smart Diffing Strategies
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    The Key Principles
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-lg">
                      <h4 className="font-bold mb-2 text-blue-800 dark:text-blue-300">1. Same-Type Elements</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        If element type is same (div → div), React updates attributes. 
                        If different (div → span), React replaces entire element.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-lg">
                      <h4 className="font-bold mb-2 text-purple-800 dark:text-purple-300">2. Keys for Lists</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Keys help React identify which items changed, were added, or removed.
                        Without keys, React might re-render entire list.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-lg">
                      <h4 className="font-bold mb-2 text-green-800 dark:text-green-300">3. Component Type</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Different component types cause full re-render. 
                        Same component type updates with new props.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Ichapur College Portal Example
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    When displaying student grades:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                      <span className="text-sm">With keys: Only updated grades re-render</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-red-500 rounded-full mr-3"></span>
                      <span className="text-sm">Without keys: Entire list re-renders</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                      <span className="text-sm">Performance difference: 50ms vs 500ms</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Visual Diffing Example
                  </h3>
                  
                  <div className="bg-gray-900 text-gray-100 p-6 rounded-xl">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <div className="text-sm font-semibold text-amber-300 mb-2">Old Tree</div>
                        <div className="font-mono text-xs">
                          <div>&lt;div className="card"&gt;</div>
                          <div className="ml-4">&lt;Header title="Students" /&gt;</div>
                          <div className="ml-4">&lt;StudentList students={"{[...]}"} /&gt;</div>
                          <div>&lt;/div&gt;</div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm font-semibold text-green-300 mb-2">New Tree</div>
                        <div className="font-mono text-xs">
                          <div>&lt;div className="card"&gt;</div>
                          <div className="ml-4">&lt;Header title="Students" /&gt;</div>
                          <div className="ml-4">&lt;StudentList students={"{[...+1]}"} /&gt;</div>
                          <div>&lt;/div&gt;</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-3 bg-gray-800 rounded">
                      <div className="text-sm font-semibold text-cyan-300 mb-2">React's Analysis:</div>
                      <ul className="text-xs space-y-1">
                        <li className="flex items-center">
                          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                          <span>div → div: Same type, update attributes if changed</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                          <span>Header → Header: Same component, props unchanged</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                          <span>StudentList → StudentList: Same component, props changed</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                          <span>Result: Only StudentList needs update</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Developer Takeaways
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                      <div className="font-bold text-sm">Use Keys</div>
                      <code className="text-xs">key="unique-id"</code>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                      <div className="font-bold text-sm">Keep Types Stable</div>
                      <code className="text-xs">div → div not div → span</code>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded">
                      <div className="font-bold text-sm">Memo Expensive Components</div>
                      <code className="text-xs">React.memo()</code>
                    </div>
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded">
                      <div className="font-bold text-sm">Avoid Inline Functions</div>
                      <code className="text-xs">useCallback()</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Misconceptions */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[300ms]`}>
          <h2 className="text-3xl font-bold mb-6 text-red-700 dark:text-red-300">
            Reconciliation Myths & Realities
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                myth: "React updates the entire DOM on every change",
                reality: "React updates ONLY what changed, often just text nodes",
                example: "Changing user name updates only that text, not the entire page",
                impact: "95% fewer DOM operations"
              },
              {
                myth: "Virtual DOM re-renders are expensive",
                reality: "Virtual DOM re-renders are cheap JavaScript operations",
                example: "Re-rendering 1000 Virtual DOM elements ≈ 1ms JavaScript",
                impact: "Real DOM updates are expensive, not Virtual DOM"
              },
              {
                myth: "You need to manually optimize everything",
                reality: "React's reconciliation is smart enough for most cases",
                example: "Trust React's diffing, optimize only proven bottlenecks",
                impact: "Premature optimization wastes development time"
              },
              {
                myth: "Reconciliation works the same everywhere",
                reality: "Different React versions improve reconciliation",
                example: "React 18 introduced concurrent features for smarter updates",
                impact: "Always use latest React for best performance"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-orange-900/10 border border-red-200 dark:border-red-800 rounded-xl p-5 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                    <span className="text-red-600 dark:text-red-400 font-bold">❌</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200">Myth: {item.myth}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Reality: {item.reality}</p>
                  </div>
                </div>
                
                <div className="mb-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="font-semibold text-blue-700 dark:text-blue-300">Example:</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{item.example}</p>
                </div>
                
                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg">
                  <div className="text-sm font-semibold text-green-300 mb-1">Impact:</div>
                  <div className="text-sm">{item.impact}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 p-6 rounded-xl">
            <h4 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">
              Naihati Developer Team Learning
            </h4>
            <p className="mb-3">
              The e-commerce team spent 2 weeks optimizing components, only to find:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-bold mb-2 text-red-600 dark:text-red-400">Before:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Overused React.memo() everywhere</li>
                  <li>• Complex useCallback() dependencies</li>
                  <li>• 40% more code for 2% performance gain</li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h5 className="font-bold mb-2 text-green-600 dark:text-green-400">After:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Trust React's reconciliation</li>
                  <li>• Optimize only proven bottlenecks</li>
                  <li>• Cleaner, more maintainable code</li>
                </ul>
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
                      The Trust Principle
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Beginners think: <strong>"I need to help React update efficiently"</strong>
                      <br/>
                      Experts think: <strong>"React knows better than me how to update the DOM"</strong>
                      <br/>
                      When <strong>Swadeep</strong> stopped micromanaging updates and trusted 
                      React's reconciliation, his Barrackpore app became both faster and 
                      easier to maintain.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <h5 className="font-bold mb-1 text-red-600 dark:text-red-400">Remember:</h5>
                      <p className="text-sm">Reconciliation is React's job. Your job is declaring UI.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <h5 className="font-bold mb-1 text-green-600 dark:text-green-400">Pro Tip:</h5>
                      <p className="text-sm">Use React DevTools to see what actually re-renders, then optimize.</p>
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
        <section className={`${animationClass} opacity-0 motion-safe:animate-delay-[500ms]`}>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-indigo-700 dark:text-indigo-300">
              Practice Exercise & Checklist
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl mb-6">
                  <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    📝 Exercise: Analyze Reconciliation
                  </h4>
                  
                  <div className="space-y-4 mb-6">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                      <h5 className="font-bold mb-1">Scenario:</h5>
                      <p className="text-sm">
                        A Shyamnagar complaint dashboard has performance issues
                      </p>
                      <ul className="text-xs mt-2 space-y-1">
                        <li>• Complaint list re-renders entirely when one item updates</li>
                        <li>• Form inputs feel laggy on every keystroke</li>
                        <li>• Dashboard becomes slow with 100+ complaints</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h5 className="font-bold mb-1">Your Task:</h5>
                      <ol className="text-sm space-y-1 pl-5">
                        <li>1. Identify reconciliation problems</li>
                        <li>2. Suggest fixes using reconciliation principles</li>
                        <li>3. Explain how each fix helps React diff better</li>
                        <li>4. Prioritize fixes by impact</li>
                      </ol>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => alert('Start with keys for complaint list. Add React.memo() to ComplaintItem. Use useCallback for event handlers. Consider virtualization for 100+ items.')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Click for Analysis Hints
                  </button>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h5 className="font-bold mb-3 text-gray-800 dark:text-gray-200">💡 Hint Section</h5>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Think about:</strong> How does React know which complaint changed?
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Observe carefully:</strong> What triggers re-renders on each keystroke?
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Try changing:</strong> Add console.log to see what actually re-renders.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                  ✅ Reconciliation Understanding Checklist
                </h4>
                
                <div className="space-y-4">
                  {[
                    "Can explain reconciliation in simple terms",
                    "Understand the two-phase process (render & commit)",
                    "Know how React diffs Virtual DOM trees",
                    "Understand the importance of keys for lists",
                    "Can identify when reconciliation happens",
                    "Know common reconciliation optimizations",
                    "Understand difference between Virtual DOM and Real DOM updates",
                    "Can use React DevTools to analyze re-renders",
                    "Know when to trust React vs when to optimize",
                    "Can explain reconciliation benefits to team members"
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
                    Now that you understand reconciliation conceptually, you're ready to 
                    use tools to inspect and debug React applications. Next, we'll explore 
                    <strong> React Developer Tools</strong> - your window into React's 
                    internal workings.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 rounded-full">
                    <span>🎯</span>
                    <span className="font-medium">Coming Next: React Developer Tools: installation and basic usage</span>
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
        
        /* Smooth transitions for component tree */
        .component-node {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .highlight-update {
          animation: pulse-highlight 1s ease-in-out;
        }
        
        @keyframes pulse-highlight {
          0%, 100% { 
            box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7);
          }
          50% { 
            box-shadow: 0 0 0 10px rgba(251, 191, 36, 0);
          }
        }
        
        .tree-connector {
          position: relative;
        }
        
        .tree-connector::before {
          content: '';
          position: absolute;
          left: -20px;
          top: 50%;
          width: 20px;
          height: 2px;
          background: #4b5563;
        }
      `}</style>
    </div>
  );
};

export default Topic23;