import { useState, useEffect } from 'react';
import clsx from 'clsx';

const Topic16 = () => {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [activeExample, setActiveExample] = useState('good');
  const [selectedCategory, setSelectedCategory] = useState('atomic');

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.6s_ease-out_forwards]';

  // Component naming examples
  const namingExamples = {
    good: [
      { name: 'UserProfileCard', reason: 'Clear purpose, PascalCase', score: '10/10' },
      { name: 'PrimaryButton', reason: 'Describes type and purpose', score: '9/10' },
      { name: 'NavigationMenu', reason: 'Noun first, descriptive', score: '9/10' },
      { name: 'ProductList', reason: 'What it is + what it does', score: '8/10' }
    ],
    bad: [
      { name: 'userProfileCard', reason: 'camelCase (should be PascalCase)', score: '3/10' },
      { name: 'Card', reason: 'Too generic, ambiguous', score: '2/10' },
      { name: 'MyComponent', reason: 'Uninformative, personal', score: '1/10' },
      { name: 'Comp1', reason: 'Cryptic, non-descriptive', score: '0/10' }
    ],
    context: [
      { name: 'AdminUserList', reason: 'Prefixed with context', score: '8/10' },
      { name: 'DashboardHeader', reason: 'Scope included in name', score: '9/10' },
      { name: 'SettingsPageForm', reason: 'Hierarchy in name', score: '7/10' }
    ]
  };

  // Project structure examples
  const projectStructures = {
    atomic: {
      name: 'Atomic Design',
      description: 'Organize by component complexity (Atoms → Molecules → Organisms)',
      structure: [
        'src/components/atoms/Button.jsx',
        'src/components/atoms/Input.jsx',
        'src/components/molecules/SearchBar.jsx',
        'src/components/molecules/UserCard.jsx',
        'src/components/organisms/Navigation.jsx',
        'src/components/organisms/ProductGrid.jsx',
        'src/components/templates/Dashboard.jsx',
        'src/components/templates/ProductPage.jsx'
      ],
      bestFor: 'Large design systems, enterprise apps'
    },
    feature: {
      name: 'Feature-Based',
      description: 'Group by feature/domain (Auth, Dashboard, Products)',
      structure: [
        'src/features/auth/components/LoginForm.jsx',
        'src/features/auth/components/RegisterForm.jsx',
        'src/features/dashboard/components/StatsCard.jsx',
        'src/features/dashboard/components/Chart.jsx',
        'src/features/products/components/ProductCard.jsx',
        'src/features/products/components/ProductList.jsx',
        'src/shared/components/Button.jsx',
        'src/shared/components/Modal.jsx'
      ],
      bestFor: 'Large applications, team collaboration'
    },
    flat: {
      name: 'Flat Structure',
      description: 'All components in one folder, organized by naming',
      structure: [
        'src/components/Button.jsx',
        'src/components/ButtonGroup.jsx',
        'src/components/Card.jsx',
        'src/components/CardHeader.jsx',
        'src/components/CardBody.jsx',
        'src/components/Modal.jsx',
        'src/components/UserProfileCard.jsx',
        'src/components/ProductGrid.jsx'
      ],
      bestFor: 'Small to medium projects, prototypes'
    },
    hybrid: {
      name: 'Hybrid Approach',
      description: 'Common components in shared, feature-specific in features',
      structure: [
        'src/components/common/Button.jsx',
        'src/components/common/Input.jsx',
        'src/components/common/Modal.jsx',
        'src/components/features/auth/LoginForm.jsx',
        'src/components/features/dashboard/Chart.jsx',
        'src/components/features/products/ProductCard.jsx',
        'src/components/layout/Header.jsx',
        'src/components/layout/Footer.jsx'
      ],
      bestFor: 'Most real-world projects, scalable approach'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200 p-6 md:p-8">
      {/* Header Section */}
      <header className="max-w-6xl mx-auto mb-12">
        <div className={`${animationClass} opacity-0`}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
            Component Naming & File Structure
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Professional patterns for organizing and naming React components at scale
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full">
            <span className="text-lg">🏗️</span>
            <span className="font-medium">Architecture Focus - Building scalable foundations</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* Importance of Good Naming */}
        <section className={`mb-12 ${animationClass} opacity-0`}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
            <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300 flex items-center gap-3">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10.9 2.1l9.9 1.9 1.9 9.9-9.9 1.9-1.9 9.9-1.9-9.9L.1 13.9l1.9-9.9 9.9-1.9z"/>
              </svg>
              Why Naming Matters: The 5-Second Rule
            </h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-blue-800 dark:text-blue-300">For Your Future Self</h3>
                  <p className="mb-4">
                    In 6 months, will you remember what <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">Comp1</code> does?
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                      <span>Good names are self-documenting</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                      <span>Reduce cognitive load when debugging</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                      <span>Make imports predictable</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-3 text-purple-800 dark:text-purple-300">For Team Collaboration</h3>
                  <p className="mb-4">
                    When <strong>Abhronila</strong> and <strong>Debangshu</strong> work together:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                      <span>Consistent naming = faster onboarding</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                      <span>Clear communication about components</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                      <span>Prevent duplicate components</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 p-6 rounded-xl border-l-4 border-amber-500">
                <h3 className="text-xl font-bold mb-3 text-amber-800 dark:text-amber-300">
                  Real-World Impact in Local Projects
                </h3>
                <p>
                  Imagine a <strong>Barrackpore municipality website</strong> with 50+ components. 
                  Without consistent naming:
                </p>
                <ul className="mt-3 space-y-2 pl-5">
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                    <span>Developers waste time finding components</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                    <span>New features take 2x longer to implement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-2 mr-3"></span>
                    <span>Bug fixes become treasure hunts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Naming Convention Showdown */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[100ms]`}>
          <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-green-700 dark:text-green-300">
                Naming Convention Showdown
              </h2>
              
              <div className="flex space-x-2">
                {['good', 'bad', 'context'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveExample(tab)}
                    className={clsx(
                      'px-4 py-2 rounded-lg font-medium transition-all duration-300 capitalize',
                      activeExample === tab
                        ? tab === 'good' 
                          ? 'bg-green-600 text-white'
                          : tab === 'bad'
                          ? 'bg-red-600 text-white'
                          : 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    )}
                  >
                    {tab} Examples
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    {activeExample === 'good' ? '✅ Good Patterns' : 
                     activeExample === 'bad' ? '❌ Bad Patterns' : 
                     '🎯 Contextual Patterns'}
                  </h3>
                  
                  <div className="space-y-4">
                    {namingExamples[activeExample].map((example, index) => (
                      <div 
                        key={index}
                        className={clsx(
                          "p-4 rounded-xl border transform hover:scale-[1.02] transition-all duration-300",
                          activeExample === 'good' 
                            ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10" 
                            : activeExample === 'bad'
                            ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/10"
                            : "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10"
                        )}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <code className="text-lg font-bold font-mono">{example.name}</code>
                          <span className={clsx(
                            "px-3 py-1 rounded-full text-sm font-bold",
                            activeExample === 'good' 
                              ? "bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300" 
                              : activeExample === 'bad'
                              ? "bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-300"
                              : "bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-300"
                          )}>
                            {example.score}
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300">{example.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    {activeExample === 'good' ? 'Rules for Good Names' :
                     activeExample === 'bad' ? 'Why These Are Bad' :
                     'When to Use Context'}
                  </h3>
                  
                  {activeExample === 'good' && (
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="inline-block w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-green-600 dark:text-green-400 font-bold">1</span>
                        </span>
                        <span><strong>Use PascalCase:</strong> <code>UserProfile</code> not <code>userProfile</code></span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                        </span>
                        <span><strong>Be descriptive:</strong> <code>ProductImageGallery</code> not <code>ImageList</code></span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-green-600 dark:text-green-400 font-bold">3</span>
                        </span>
                        <span><strong>Noun-first:</strong> <code>UserCard</code> not <code>CardForUser</code></span>
                      </li>
                      <li className="flex items-start">
                        <span className="inline-block w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-green-600 dark:text-green-400 font-bold">4</span>
                        </span>
                        <span><strong>Avoid abbreviations:</strong> <code>Configuration</code> not <code>Config</code></span>
                      </li>
                    </ul>
                  )}
                  
                  {activeExample === 'bad' && (
                    <div className="space-y-4">
                      <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <h4 className="font-bold mb-1 text-red-700 dark:text-red-300">The Maintenance Nightmare</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Bad names force developers to:
                        </p>
                        <ul className="mt-2 text-sm space-y-1">
                          <li>• Open files to understand purpose</li>
                          <li>• Guess component relationships</li>
                          <li>• Create duplicate components</li>
                          <li>• Waste time in code reviews</li>
                        </ul>
                      </div>
                      
                      <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                        <h4 className="font-bold mb-1 text-amber-700 dark:text-amber-300">Local Example</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          <strong>Tuhina</strong> from Ichapur inherits a project with <code>Comp1</code>, <code>Comp2</code>, etc.
                          She spends days just mapping names to functionality.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {activeExample === 'context' && (
                    <div className="space-y-4">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <h4 className="font-bold mb-1 text-blue-700 dark:text-blue-300">When Context Matters</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          Prefix when component scope is important:
                        </p>
                        <ul className="mt-2 text-sm space-y-1">
                          <li>• <code>Admin</code> vs <code>User</code> components</li>
                          <li>• <code>Dashboard</code> vs <code>Settings</code> sections</li>
                          <li>• <code>Mobile</code> vs <code>Desktop</code> variants</li>
                        </ul>
                      </div>
                      
                      <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <h4 className="font-bold mb-1 text-purple-700 dark:text-purple-300">Naihati College Example</h4>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          A college website needs:
                          <br/>
                          <code>StudentProfileCard</code> (student view)
                          <br/>
                          <code>AdminStudentProfileCard</code> (admin view)
                          <br/>
                          Same component, different contexts.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 p-6 rounded-xl">
                <h4 className="text-xl font-bold mb-3 text-emerald-800 dark:text-emerald-300">
                  Quick Reference: Naming Decision Tree
                </h4>
                <div className="grid md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl mb-2">1️⃣</div>
                    <div className="font-bold">Is it reusable?</div>
                    <div className="text-sm mt-1">Generic names: Button, Input</div>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl mb-2">2️⃣</div>
                    <div className="font-bold">Is it specific?</div>
                    <div className="text-sm mt-1">Descriptive: UserProfileCard</div>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl mb-2">3️⃣</div>
                    <div className="font-bold">Need context?</div>
                    <div className="text-sm mt-1">Prefixed: AdminDashboard</div>
                  </div>
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="text-2xl mb-2">4️⃣</div>
                    <div className="font-bold">Team understands?</div>
                    <div className="text-sm mt-1">Clear to all members</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Structure Patterns */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[200ms]`}>
          <h2 className="text-3xl font-bold mb-8 text-purple-700 dark:text-purple-300">
            Project Structure Patterns
          </h2>
          
          <div className="space-y-8">
            {/* Structure Selection */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.keys(projectStructures).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key)}
                  className={clsx(
                    'p-4 rounded-xl text-center transition-all duration-300',
                    selectedCategory === key
                      ? 'bg-purple-600 text-white transform scale-105'
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                  )}
                >
                  <div className="font-bold mb-1">{projectStructures[key].name}</div>
                  <div className="text-xs opacity-80">Click to explore</div>
                </button>
              ))}
            </div>
            
            {/* Structure Details */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-indigo-800 dark:text-indigo-300">
                    {projectStructures[selectedCategory].name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {projectStructures[selectedCategory].description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-200">Best For:</h4>
                    <div className="inline-block px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full">
                      {projectStructures[selectedCategory].bestFor}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-200">Local Application:</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedCategory === 'atomic' && 
                        "Barrackpore College website with consistent design system"}
                      {selectedCategory === 'feature' && 
                        "Shyamnagar e-commerce platform with separate teams"}
                      {selectedCategory === 'flat' && 
                        "Ichapur community portal prototype"}
                      {selectedCategory === 'hybrid' && 
                        "Naihati business management app (recommended)"}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold mb-3 text-gray-800 dark:text-gray-200">Example Structure:</h4>
                  <div className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto">
                    <pre className="text-sm font-mono">
{projectStructures[selectedCategory].structure.map((path, idx) => (
  <div key={idx} className={clsx(
    "py-1",
    idx % 2 === 0 ? "text-emerald-400" : "text-cyan-400"
  )}>
    {path}
  </div>
))}
                    </pre>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-lg">
                    <h5 className="font-bold mb-2 text-green-800 dark:text-green-300">Key Insight:</h5>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      The structure should match your team size and project complexity. 
                      Start simple, refactor as needed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Comparison Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                Structure Comparison
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                      <th className="py-4 px-6 text-left">Structure</th>
                      <th className="py-4 px-6 text-left">Pros</th>
                      <th className="py-4 px-6 text-left">Cons</th>
                      <th className="py-4 px-6 text-left">When to Choose</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(projectStructures).map(([key, structure], index) => (
                      <tr 
                        key={key}
                        className={clsx(
                          "border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800",
                          selectedCategory === key && "bg-purple-50 dark:bg-purple-900/10"
                        )}
                      >
                        <td className="py-4 px-6 font-semibold">{structure.name}</td>
                        <td className="py-4 px-6">
                          <ul className="text-sm space-y-1">
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1 mr-2"></span>
                              {key === 'atomic' && 'Design consistency'}
                              {key === 'feature' && 'Team autonomy'}
                              {key === 'flat' && 'Simple to start'}
                              {key === 'hybrid' && 'Balanced approach'}
                            </li>
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-1 mr-2"></span>
                              {key === 'atomic' && 'Reusability'}
                              {key === 'feature' && 'Clear boundaries'}
                              {key === 'flat' && 'Easy navigation'}
                              {key === 'hybrid' && 'Scalable'}
                            </li>
                          </ul>
                        </td>
                        <td className="py-4 px-6">
                          <ul className="text-sm space-y-1">
                            <li className="flex items-start">
                              <span className="inline-block w-2 h-2 bg-red-500 rounded-full mt-1 mr-2"></span>
                              {key === 'atomic' && 'Steep learning curve'}
                              {key === 'feature' && 'Duplicate components'}
                              {key === 'flat' && 'Gets messy at scale'}
                              {key === 'hybrid' && 'More setup needed'}
                            </li>
                          </ul>
                        </td>
                        <td className="py-4 px-6">
                          <div className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full inline-block">
                            {structure.bestFor}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* File Naming Conventions */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[300ms]`}>
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-amber-800 dark:text-amber-300">
              File Naming Conventions & Patterns
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    File Extension Rules
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <code className="font-bold">Component.jsx</code>
                        <span className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-300 rounded-full text-sm">
                          ✅ Recommended
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Use .jsx for files containing JSX. Clear visual indicator.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <code className="font-bold">Component.js</code>
                        <span className="px-3 py-1 bg-amber-100 dark:bg-amber-800 text-amber-800 dark:text-amber-300 rounded-full text-sm">
                          ⚠️ Acceptable
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Modern tools handle JSX in .js files, but .jsx is clearer.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <code className="font-bold">component.jsx</code>
                        <span className="px-3 py-1 bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-300 rounded-full text-sm">
                          ❌ Avoid
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Component files should match component name (PascalCase).
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    Special File Patterns
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div>
                        <code className="font-mono">index.js</code>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Barrel exports</div>
                      </div>
                      <span className="text-green-600 dark:text-green-400">✅</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div>
                        <code className="font-mono">Component.styles.js</code>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Styled-components</div>
                      </div>
                      <span className="text-green-600 dark:text-green-400">✅</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div>
                        <code className="font-mono">useCustomHook.js</code>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Custom hooks</div>
                      </div>
                      <span className="text-green-600 dark:text-green-400">✅</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div>
                        <code className="font-mono">constants.js</code>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Shared constants</div>
                      </div>
                      <span className="text-green-600 dark:text-green-400">✅</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    Import/Export Patterns
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-bold mb-2 text-blue-800 dark:text-blue-300">Default Export (Common)</h4>
                      <div className="bg-gray-900 text-gray-100 p-3 rounded">
                        <pre className="text-sm">export default ComponentName;</pre>
                      </div>
                      <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                        One component per file. Clean imports.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <h4 className="font-bold mb-2 text-purple-800 dark:text-purple-300">Named Exports (Multiple)</h4>
                      <div className="bg-gray-900 text-gray-100 p-3 rounded">
                        <pre className="text-sm">
                            {`export { Button, Input, Card };`}
                        </pre>
                      </div>
                      <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                        For utility components or related components.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-bold mb-2 text-green-800 dark:text-green-300">Barrel File Pattern</h4>
                      <div className="bg-gray-900 text-gray-100 p-3 rounded">
                        <pre className="text-sm">
{`// index.js in folder
export { default as Button } from './Button';
export { default as Input } from './Input';
export { default as Card } from './Card';`}
                        </pre>
                      </div>
                      <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                        Clean imports: 
                        <code>
                            {`import { Button, Input } from './components'`}
                        </code>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                  <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                    Local Project Example
                  </h3>
                  
                  <div className="font-mono text-sm bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <div className="text-emerald-400">src/</div>
                    <div className="ml-4 text-emerald-400">components/</div>
                    <div className="ml-8 text-cyan-400">common/</div>
                    <div className="ml-12">Button.jsx</div>
                    <div className="ml-12">Input.jsx</div>
                    <div className="ml-12">Card.jsx</div>
                    <div className="ml-12 text-amber-400">index.js ← Barrel file</div>
                    <div className="ml-8 text-cyan-400">layout/</div>
                    <div className="ml-12">Header.jsx</div>
                    <div className="ml-12">Footer.jsx</div>
                    <div className="ml-8 text-cyan-400">features/</div>
                    <div className="ml-12">auth/</div>
                    <div className="ml-16">LoginForm.jsx</div>
                    <div className="ml-16">RegisterForm.jsx</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Pitfalls */}
        <section className={`mb-12 ${animationClass} opacity-0 motion-safe:animate-delay-[400ms]`}>
          <h2 className="text-3xl font-bold mb-6 text-red-700 dark:text-red-300">
            Common Pitfalls & Anti-Patterns
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                issue: "Inconsistent Naming",
                problem: "Mix of PascalCase, camelCase, snake_case",
                solution: "Establish and document naming conventions",
                example: "❌ Button.jsx, userProfile.jsx, product_card.jsx"
              },
              {
                issue: "Overly Generic Names",
                problem: "Names like 'Component', 'Widget', 'Helper'",
                solution: "Be specific about purpose and context",
                example: "❌ Container.jsx (→ ❓What does it contain?)"
              },
              {
                issue: "Deep Nesting",
                problem: "src/components/ui/buttons/primary/main/Button.jsx",
                solution: "Keep folder structure flat (max 3-4 levels)",
                example: "❌ Too deep: 6+ folder levels"
              },
              {
                issue: "File Location Confusion",
                problem: "Similar components scattered across folders",
                solution: "Group by feature or type, not both",
                example: "❌ Button in /common, /ui, /forms"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/10 dark:to-pink-900/10 border border-red-200 dark:border-red-800 rounded-xl p-5 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                    <span className="text-red-600 dark:text-red-400 font-bold">⚠️</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-800 dark:text-gray-200">{item.issue}</h4>
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
              Debugging Tip for Shyamnagar Teams
            </h4>
            <p className="mb-3">
              When you can't find a component:
            </p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Search by component name in IDE (Ctrl+Shift+F)</li>
              <li>Check barrel exports in index.js files</li>
              <li>Look for similar names (typos are common)</li>
              <li>Verify import paths match file structure</li>
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
                      The 80/20 Rule of Naming
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Spend 20% more time on naming upfront, save 80% time later. 
                      When <strong>Swadeep from Barrackpore</strong> named his components well, 
                      he could onboard <strong>Tuhina from Ichapur</strong> in hours, not days.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <h5 className="font-bold mb-1 text-red-600 dark:text-red-400">Golden Rule:</h5>
                      <p className="text-sm">If you need comments to explain a component name, the name is wrong.</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <h5 className="font-bold mb-1 text-green-600 dark:text-green-400">Pro Tip:</h5>
                      <p className="text-sm">Test names by explaining them to a non-technical friend.</p>
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
                    📝 Exercise: Refactor a Messy Project
                  </h4>
                  
                  <div className="space-y-4 mb-6">
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <h5 className="font-bold mb-1">Scenario:</h5>
                      <p className="text-sm">
                        You inherit a Naihati business directory app with poor naming:
                      </p>
                      <ul className="text-xs mt-2 space-y-1">
                        <li><code>comp1.jsx</code> - User registration form</li>
                        <li><code>myCard.jsx</code> - Business listing card</li>
                        <li><code>List.jsx</code> - Search results list</li>
                        <li><code>page_header.jsx</code> - Main navigation</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h5 className="font-bold mb-1">Your Task:</h5>
                      <ol className="text-sm space-y-1 pl-5">
                        <li>1. Rename each file appropriately</li>
                        <li>2. Choose a folder structure</li>
                        <li>3. Create barrel exports</li>
                        <li>4. Update import statements</li>
                      </ol>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => alert('Great! Start by renaming comp1.jsx to UserRegistrationForm.jsx. Place it in src/features/auth/components/')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Click for Starter Solution
                  </button>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl">
                  <h5 className="font-bold mb-3 text-gray-800 dark:text-gray-200">💡 Hint Section</h5>
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Think about:</strong> What information would help a new developer understand each component?
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Observe carefully:</strong> How do component names relate to their folder locations?
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Try changing:</strong> The folder structure and see how imports need to change.
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                  ✅ Naming & Structure Checklist
                </h4>
                
                <div className="space-y-4">
                  {[
                    "Component names use PascalCase (UserCard)",
                    "File names match component names (UserCard.jsx)",
                    "One component per file (except related utilities)",
                    "Folder structure matches project scale",
                    "Barrel exports for cleaner imports",
                    "Names are descriptive, not generic",
                    "Consistent naming across project",
                    "No cryptic abbreviations",
                    "Context included when needed (AdminUserCard)",
                    "Team agrees on conventions"
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
                    With proper naming and structure in place, you're ready for <strong>component composition</strong> 
                    (combining components) and <strong>props</strong> (passing data between components).
                  </p>
                  <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full">
                    <span>🎯</span>
                    <span className="font-medium">Coming Next: One component per file - best practices</span>
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
        
        /* Custom styling for file tree */
        .font-mono pre div {
          transition: color 0.3s ease;
        }
        
        .font-mono pre div:hover {
          color: #fff;
          background: rgba(255,255,255,0.1);
          padding-left: 4px;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default Topic16;