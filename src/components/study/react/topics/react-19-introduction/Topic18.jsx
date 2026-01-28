import { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic18 = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [activeExample, setActiveExample] = useState('simple');
  const [showLiveComposition, setShowLiveComposition] = useState(false);
  const [compositionLevel, setCompositionLevel] = useState(1);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]';

  // Live composition example
  const LiveCompositionExample = () => {
    const components = [
      { name: 'App', color: 'bg-purple-500' },
      { name: 'Header', color: 'bg-blue-500' },
      { name: 'Navigation', color: 'bg-green-500' },
      { name: 'MainContent', color: 'bg-amber-500' },
      { name: 'Sidebar', color: 'bg-red-500' },
      { name: 'Footer', color: 'bg-indigo-500' }
    ];

    const visibleComponents = components.slice(0, compositionLevel);

    return (
      <div className="p-6 bg-gray-900 rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-bold text-white">Live Composition Tree</h4>
          <div className="flex gap-2">
            <button
              onClick={() => setCompositionLevel(Math.max(1, compositionLevel - 1))}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white rounded"
            >
              -
            </button>
            <span className="px-4 py-1 bg-purple-600 text-white rounded">
              Level: {compositionLevel}
            </span>
            <button
              onClick={() => setCompositionLevel(Math.min(6, compositionLevel + 1))}
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
              className={`p-4 ${comp.color} text-white rounded-lg transform transition-all duration-300 ${
                isReducedMotion ? '' : 'hover:scale-[1.02]'
              }`}
              style={{ marginLeft: `${index * 20}px` }}
            >
              <div className="font-bold">{comp.name}</div>
              <div className="text-sm opacity-90">
                {index < visibleComponents.length - 1 ? (
                  <span>← Contains {components[index + 1].name}</span>
                ) : (
                  <span>← Leaf component</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-gray-800 rounded-lg">
          <pre className="text-sm text-green-400">
{`// Composition Code (Level ${compositionLevel})
${visibleComponents.map((comp, i) => 
  `<${comp.name}>${i < visibleComponents.length - 1 ? '\n  ' : ''}`
).join('')}
${'</'.repeat(visibleComponents.length)}`}
          </pre>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-6 md:p-8">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-12">
        <div className={`${animationClass} opacity-0`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
            Component Composition: Nesting Components Correctly
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            The art of building complex UIs by combining simple, reusable pieces
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full">
            <span className="text-lg">🧩</span>
            <span className="font-medium">Building Blocks - Combine components like LEGO</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Core Concept */}
        <section className={`mb-12 ${animationClass} opacity-0`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300 flex items-center gap-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
              </svg>
              What is Component Composition?
            </h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">
                    The LEGO Analogy
                  </h3>
                  <p className="mb-4">
                    Just like LEGO bricks, React components are designed to be:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 dark:text-blue-400">🧱</span>
                      </span>
                      <span><strong>Self-contained:</strong> Each has a clear purpose</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 dark:text-blue-400">🔗</span>
                      </span>
                      <span><strong>Connectable:</strong> Designed to fit together</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 dark:text-blue-400">🏗️</span>
                      </span>
                      <span><strong>Composable:</strong> Can build complex structures</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-300">
                    Real-World Example: Barrackpore College Website
                  </h3>
                  <p className="mb-4">
                    The college homepage is built by composing:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded">
                      <span>Header + Navigation</span>
                      <span className="text-green-600 dark:text-green-400">→</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded">
                      <span>HeroSection + NewsFeed</span>
                      <span className="text-green-600 dark:text-green-400">→</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded">
                      <span>CourseGrid + FacultyCards</span>
                      <span className="text-green-600 dark:text-green-400">→</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-800 rounded">
                      <span>Footer + ContactInfo</span>
                      <span className="text-green-600 dark:text-green-400">→</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 p-6 rounded-xl border-l-4 border-emerald-500">
                <h3 className="text-xl font-bold mb-3 text-emerald-800 dark:text-emerald-300">
                  The Composition Mindset
                </h3>
                <p>
                  Instead of building monolithic components, think: <strong>"What smaller pieces can I combine?"</strong>
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-red-600 dark:text-red-400">Monolithic Approach</h4>
                    <ul className="text-sm space-y-1">
                      <li>• One giant 500-line component</li>
                      <li>• Hard to maintain</li>
                      <li>• Difficult to reuse parts</li>
                      <li>• Testing is challenging</li>
                    </ul>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-green-600 dark:text-green-400">Composition Approach</h4>
                    <ul className="text-sm space-y-1">
                      <li>• 10 small 50-line components</li>
                      <li>• Easy to maintain</li>
                      <li>• Highly reusable</li>
                      <li>• Easy to test</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Composition Techniques */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[100ms]`}>
          <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300">
                Composition Techniques
              </h2>
              
              <div className="flex space-x-2">
                {['simple', 'children', 'slots'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveExample(tab)}
                    className={clsx(
                      'px-4 py-2 rounded-lg font-medium transition-all duration-300 capitalize',
                      activeExample === tab
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    )}
                  >
                    {tab === 'simple' ? 'Simple Nesting' : 
                     tab === 'children' ? 'Children Prop' : 
                     'Slot Pattern'}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              {activeExample === 'simple' && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                      Simple Component Nesting
                    </h3>
                    <p className="mb-6 text-gray-700 dark:text-gray-300">
                      The most basic form of composition: one component containing another.
                    </p>
                    
                    <div className="bg-gray-900 text-gray-100 p-6 rounded-xl mb-6">
                      <pre className="text-sm">
{`// Parent component using child components
function UserProfile() {
  return (
    <div className="user-profile">
      <ProfileHeader />
      <ProfileDetails />
      <ProfileActions />
    </div>
  );
}

// Each child is a separate, reusable component`}
                      </pre>
                    </div>
                    
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-bold mb-2 text-blue-800 dark:text-blue-300">Local Example</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Swadeep's</strong> Barrackpore business card app:
                        <br/>
                        <code>BusinessCard</code> contains <code>ContactInfo</code>, <code>SocialLinks</code>, and <code>MapPreview</code>
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                      <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">Benefits</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                          <span>Clear separation of concerns</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                          <span>Reusable child components</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                          <span>Easy to test individually</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                      <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">When to Use</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mt-1 mr-3"></span>
                          <span>Parent-child relationships are fixed</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mt-1 mr-3"></span>
                          <span>Layout structure is consistent</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-3 h-3 bg-blue-500 rounded-full mt-1 mr-3"></span>
                          <span>Components are tightly related</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {activeExample === 'children' && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                      Children Prop Pattern
                    </h3>
                    <p className="mb-6 text-gray-700 dark:text-gray-300">
                      Using the special <code>children</code> prop to pass components as content.
                    </p>
                    
                    <div className="bg-gray-900 text-gray-100 p-6 rounded-xl mb-6">
                      <pre className="text-sm">
{`// Container component accepting children
function Card({ children }) {
  return (
    <div className="card">
      {children}  {/* Render passed content here */}
    </div>
  );
}

// Usage with children
function UserProfile() {
  return (
    <Card>
      <ProfileHeader />
      <ProfileDetails />
      <ProfileActions />
    </Card>
  );
}`}
                      </pre>
                    </div>
                    
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <h4 className="font-bold mb-2 text-purple-800 dark:text-purple-300">Local Example</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Tuhina's</strong> Ichapur recipe app:
                        <br/>
                        <code>RecipeCard</code> accepts any children: ingredients, instructions, or images
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                      <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">Benefits</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                          <span>Highly flexible content</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                          <span>Container components reusable</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                          <span>Clean, readable JSX</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                      <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">When to Use</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mt-1 mr-3"></span>
                          <span>Wrapper/container components</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mt-1 mr-3"></span>
                          <span>Layout components</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-3 h-3 bg-purple-500 rounded-full mt-1 mr-3"></span>
                          <span>When content varies significantly</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              {activeExample === 'slots' && (
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                      Slot Pattern (Named Children)
                    </h3>
                    <p className="mb-6 text-gray-700 dark:text-gray-300">
                      Passing multiple component "slots" as props for complex layouts.
                    </p>
                    
                    <div className="bg-gray-900 text-gray-100 p-6 rounded-xl mb-6">
                      <pre className="text-sm">
{`// Component with multiple slots
function PageLayout({ header, sidebar, content, footer }) {
  return (
    <div className="page-layout">
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{content}</main>
      <footer>{footer}</footer>
    </div>
  );
}

// Usage with slot props
function Dashboard() {
  return (
    <PageLayout
      header={<DashboardHeader />}
      sidebar={<DashboardSidebar />}
      content={<DashboardContent />}
      footer={<DashboardFooter />}
    />
  );
}`}
                      </pre>
                    </div>
                    
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <h4 className="font-bold mb-2 text-amber-800 dark:text-amber-300">Local Example</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Abhronila's</strong> Naihati dashboard:
                        <br/>
                        <code>DashboardLayout</code> has slots for header, charts, tables, and controls
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                      <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">Benefits</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                          <span>Maximum flexibility</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                          <span>Clear slot responsibilities</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></span>
                          <span>Complex layouts manageable</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                      <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">When to Use</h4>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="inline-block w-3 h-3 bg-amber-500 rounded-full mt-1 mr-3"></span>
                          <span>Complex layout components</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-3 h-3 bg-amber-500 rounded-full mt-1 mr-3"></span>
                          <span>When different slots need different data</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-3 h-3 bg-amber-500 rounded-full mt-1 mr-3"></span>
                          <span>Template-like components</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/10 dark:to-blue-900/10 p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-cyan-800 dark:text-cyan-300">
                      Try Live Composition
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Experiment with component nesting levels
                    </p>
                  </div>
                  <button
                    onClick={() => setShowLiveComposition(!showLiveComposition)}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold rounded-lg transition-all duration-300"
                  >
                    {showLiveComposition ? 'Hide Live Example' : 'Show Live Example'}
                  </button>
                </div>
                
                {showLiveComposition && (
                  <div className="mt-6">
                    <LiveCompositionExample />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Composition Patterns */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[200ms]`}>
          <h2 className="text-3xl font-bold mb-8 text-emerald-700 dark:text-emerald-300">
            Common Composition Patterns
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                pattern: "Container-Presentational",
                description: "Container handles logic, Presentational handles UI",
                example: "UserListContainer → UserList → UserCard",
                benefit: "Separation of concerns, reusable UI",
                color: "from-blue-500 to-cyan-500"
              },
              {
                pattern: "Layout Components",
                description: "Components that arrange other components",
                example: "Grid → GridItem, FlexContainer → FlexItem",
                benefit: "Consistent layouts, responsive design",
                color: "from-purple-500 to-pink-500"
              },
              {
                pattern: "Wrapper Components",
                description: "Add functionality to existing components",
                example: "withLoading(Component), withError(Component)",
                benefit: "Reusable behaviors, code reuse",
                color: "from-green-500 to-emerald-500"
              },
              {
                pattern: "Compound Components",
                description: "Components that work together as a group",
                example: "Tabs → TabList + Tab + TabPanel",
                benefit: "Implicit state sharing, clean API",
                color: "from-orange-500 to-red-500"
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
                <h3 className="text-xl font-bold mb-3">{item.pattern}</h3>
                <p className="mb-4 opacity-90">{item.description}</p>
                
                <div className="mb-4 p-3 bg-white/20 rounded">
                  <div className="font-semibold mb-1">Example:</div>
                  <code className="text-sm">{item.example}</code>
                </div>
                
                <div className="text-sm">
                  <span className="font-semibold">Benefit:</span> {item.benefit}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Shyamnagar Municipality Project Example
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="font-mono text-sm bg-gray-900 text-gray-100 p-4 rounded-lg">
{`// ServiceRequestPage.jsx
function ServiceRequestPage() {
  return (
    <PageLayout
      header={<MunicipalityHeader />}
      sidebar={<ServiceCategories />}
      content={
        <Card>
          <ServiceRequestForm />
          <RecentRequests />
        </Card>
      }
      footer={<MunicipalityFooter />}
    />
  );
}

// Each component is reusable:
// - MunicipalityHeader used on all pages
// - Card used throughout application
// - ServiceRequestForm can be embedded elsewhere`}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <h4 className="font-bold mb-2 text-green-800 dark:text-green-300">Composition Benefits</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1 mr-2"></span>
                      <span>Reusable header/footer across all pages</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1 mr-2"></span>
                      <span>Card component used in 20+ places</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1 mr-2"></span>
                      <span>Form can be embedded in modal or standalone</span>
                    </li>
                  </ul>
                </div>
                
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h4 className="font-bold mb-2 text-blue-800 dark:text-blue-300">Team Collaboration</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Swadeep</strong> builds Card, <strong>Tuhina</strong> builds Form, 
                    <strong>Abhronila</strong> composes them together. Parallel development!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[300ms]`}>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-amber-800 dark:text-amber-300">
              Best Practices for Effective Composition
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Keep Components Small & Focused
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded">
                      <span>Aim for 50-150 lines per component</span>
                      <span className={clsx(
                        "px-2 py-1 rounded text-xs font-bold",
                        "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                      )}>
                        ✅ Good
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded">
                      <span>Avoid 500+ line components</span>
                      <span className={clsx(
                        "px-2 py-1 rounded text-xs font-bold",
                        "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"
                      )}>
                        ❌ Avoid
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Use Meaningful Component Names
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded">
                      <div className="font-mono text-sm">UserProfileCard</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">✅ Clear purpose</div>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded">
                      <div className="font-mono text-sm">Container</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">❌ Too generic</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Limit Nesting Depth
                  </h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-bold mb-1 text-blue-800 dark:text-blue-300">Rule of Thumb:</h4>
                      <p className="text-sm">Maximum 3-4 levels of nesting</p>
                    </div>
                    
                    <div className="text-sm space-y-2">
                      <div className="flex items-center">
                        <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
                        <span>App → Page → Section → Component ✅</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-4 h-4 bg-red-500 rounded-full mr-3"></span>
                        <span>App → Page → Section → Component → Sub → Detail → Item ❌</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                    Local Project Guidelines
                  </h3>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-1 mr-2"></span>
                      <span>Barrackpore projects: Start with simple nesting</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-1 mr-2"></span>
                      <span>Naihati teams: Use children prop for flexibility</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-amber-500 rounded-full mt-1 mr-2"></span>
                      <span>Ichapur complex apps: Consider slot pattern</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[400ms]`}>
          <h2 className="text-3xl font-bold mb-6 text-red-700 dark:text-red-300">
            Common Composition Pitfalls
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                pitfall: "Prop Drilling",
                problem: "Passing props through multiple levels unnecessarily",
                solution: "Use Context API or composition to avoid deep passing",
                example: "App → Page → Section → Component → Child (prop passed through 4 levels)"
              },
              {
                pitfall: "Over-Nesting",
                problem: "Too many levels make debugging hard",
                solution: "Flatten component hierarchy where possible",
                example: "Instead of Card → CardBody → CardContent, use Card with children"
              },
              {
                pitfall: "Tight Coupling",
                problem: "Components depend too much on each other's internals",
                solution: "Use props and children for loose coupling",
                example: "Header shouldn't know about Footer's implementation"
              },
              {
                pitfall: "Ignoring Reusability",
                problem: "Creating components that are too specific",
                solution: "Design components to be reusable in different contexts",
                example: "UserCard should work for students, teachers, and admins"
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
          
          <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-6 rounded-xl">
            <h4 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-300">
              Debugging Tip for Local Teams
            </h4>
            <p className="mb-3">
              When composition feels wrong:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Check React DevTools component tree</li>
              <li>Count nesting levels (should be ≤ 4)</li>
              <li>Look for prop drilling (props passed but not used)</li>
              <li>Ask: "Could this component be used elsewhere?"</li>
              <li>Simplify: Break complex components into smaller ones</li>
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
                      The Composition Mindset Shift
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Beginners think: <strong>"What should this component do?"</strong>
                      <br/>
                      Experts think: <strong>"What smaller pieces can compose this?"</strong>
                      <br/>
                      When <strong>Debangshu</strong> started thinking in composition, his Barrackpore app went from 
                      3 huge components to 20 small, reusable ones. Maintenance became 10x easier.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <h5 className="font-bold mb-1 text-red-600 dark:text-red-400">Remember:</h5>
                      <p className="text-sm">Composition is about relationships, not just nesting.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <h5 className="font-bold mb-1 text-green-600 dark:text-green-400">Pro Tip:</h5>
                      <p className="text-sm">Sketch component relationships on paper before coding.</p>
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
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-emerald-700 dark:text-emerald-300">
              Practice Exercise & Checklist
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl mb-6">
                  <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    📝 Exercise: Compose a Product Page
                  </h4>
                  
                  <div className="space-y-4 mb-6">
                    <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                      <h5 className="font-bold mb-1">Scenario:</h5>
                      <p className="text-sm">
                        Build a Naihati e-commerce product page using composition
                      </p>
                      <ul className="text-xs mt-2 space-y-1">
                        <li>• Use: PageLayout (header, content, footer slots)</li>
                        <li>• Compose: ProductCard + ProductImages + ProductDetails</li>
                        <li>• Include: RelatedProducts + ReviewsSection</li>
                        <li>• Apply: Children prop and slot patterns</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h5 className="font-bold mb-1">Your Task:</h5>
                      <ol className="text-sm space-y-1 pl-5">
                        <li>1. Create small, focused components</li>
                        <li>2. Compose them using different patterns</li>
                        <li>3. Ensure each component is reusable</li>
                        <li>4. Limit nesting to 3-4 levels max</li>
                      </ol>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => alert('Start by sketching the component tree. Create PageLayout first, then ProductCard, then smaller components like ProductImage, ProductTitle, etc.')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Click for Starter Approach
                  </button>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h5 className="font-bold mb-3 text-gray-800 dark:text-gray-200">💡 Hint Section</h5>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Think about:</strong> Which components might be reused on other pages?
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Observe carefully:</strong> How do data flow between composed components?
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Try changing:</strong> The composition pattern (children vs slots) and see how flexibility changes.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                  ✅ Composition Checklist
                </h4>
                
                <div className="space-y-4">
                  {[
                    "Components are small and focused (≤ 150 lines)",
                    "Nesting depth is reasonable (≤ 4 levels)",
                    "Children prop used for flexible content",
                    "Slot pattern used for complex layouts",
                    "No prop drilling (use Context if needed)",
                    "Components are loosely coupled",
                    "Each component is potentially reusable",
                    "Component names reflect relationships",
                    "Composition tree is clear in DevTools",
                    "Team follows consistent composition patterns"
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
                
                <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-5 rounded-xl">
                  <h5 className="font-bold mb-2 text-purple-800 dark:text-purple-300">Next Steps:</h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Now that you understand component composition, you're ready to learn about 
                    <strong> props</strong> - how to pass data between your composed components 
                    to make them dynamic and interactive.
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full">
                    <span>🎯</span>
                    <span className="font-medium">Coming Next: Props: passing data from parent to child</span>
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
        
        /* Smooth transitions for composition visualization */
        .composition-level {
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

export default Topic18;