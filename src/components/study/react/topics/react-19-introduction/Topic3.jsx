import { useState } from 'react';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import roadmapData from "../../react19-roadmap.json";

const Topic3 = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Dark mode as default
  const { moduleSlug, topicIndex } = useParams();
  const currentIndex = Number(topicIndex);
  const folder = roadmapData.folder;

  // find the current module
  const currentModule = roadmapData.segments
    .flatMap(segment => segment.modules)
    .find(module => module.slug === moduleSlug);

  // safety guard
  if (!currentModule) return null;
  const totalTopics = currentModule.topics.length;
  const hasNext = currentIndex < totalTopics - 1;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const react19Features = [
    {
      title: "Actions",
      icon: "⚡",
      color: "from-blue-600 to-cyan-600",
      description: "Handle form submissions and data mutations with built-in pending states",
      before: "Manual loading states, error handling, optimistic updates with libraries",
      after: "Built-in pending, error, and optimistic update states",
      example: "Like Swadeep getting instant feedback when submitting test answers"
    },
    {
      title: "Document Metadata",
      icon: "📄",
      color: "from-purple-600 to-pink-600",
      description: "Set title, meta tags, and links directly from components",
      before: "react-helmet or similar libraries needed for SEO management",
      after: "Native support for SEO optimization within components",
      example: "Barrackpore school portal having proper page titles for each section"
    },
    {
      title: "Asset Loading",
      icon: "📦",
      color: "from-green-600 to-emerald-700",
      description: "Optimized loading for fonts, stylesheets, and external scripts",
      before: "Manual script loading, font flash issues, performance optimization needed",
      after: "Automatic resource prioritization and loading states",
      example: "Tuhina's study materials loading in optimal order"
    },
    {
      title: "Web Components",
      icon: "🧩",
      color: "from-yellow-600 to-orange-600",
      description: "Better integration with custom elements and web components",
      before: "Complex wrappers and workarounds for web component integration",
      after: "First-class support for custom elements",
      example: "Using existing UI libraries seamlessly in Ichapur projects"
    }
  ];

  const practicalExamples = [
    {
      scenario: "Student Registration Form",
      problem: "Need loading states, error handling, success messages",
      oldSolution: "Multiple useState hooks, manual promise handling, complex logic",
      newSolution: "Single useActionState hook handles everything",
      benefit: "70% less code, better UX"
    },
    {
      scenario: "School Portal SEO",
      problem: "Each page needs unique titles and meta descriptions",
      oldSolution: "Install react-helmet, manage helmet components",
      newSolution: "Use built-in title and meta tags in components",
      benefit: "No external dependencies, simpler code"
    },
    {
      scenario: "Image Gallery",
      problem: "Images load at different times, causing layout shifts",
      oldSolution: "Implement lazy loading, preloading, error states manually",
      newSolution: "Built-in image optimization with loading states",
      benefit: "Better performance out of the box"
    }
  ];

  return (
    <div className={clsx(
      "min-h-screen transition-colors duration-500",
      isDarkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
    )}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="font-bold text-white">R</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  React Foundations
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Topic 3: React 19 Changes</p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-300 dark:border-gray-600"
            >
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <section className="mb-16 animate-[fadeIn_0.8s_ease-out]">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12 border border-gray-700">
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-3xl text-white mr-6">
                  🎉
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Welcome to React 19
                  </h2>
                  <p className="text-xl text-gray-300">
                    The biggest developer experience upgrade since Hooks
                  </p>
                </div>
              </div>
              
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                React 19 is like getting a new, organized study system for Debangshu. 
                Instead of managing notebooks, timers, and reminders separately, everything 
                now works together seamlessly. Less setup time, more learning time.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Less Boilerplate
                </span>
                <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Better Performance
                </span>
                <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Built-in Solutions
                </span>
                <span className="px-4 py-2 bg-yellow-900/30 text-yellow-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Easier Learning
                </span>
              </div>
            </div>
            
            {/* Animated React 19 Badge */}
            <div className="absolute right-8 top-8 opacity-10">
              <svg width="180" height="180" viewBox="0 0 200 200" className="animate-[spin_20s_linear_infinite]">
                <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3" />
                <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.2" />
                <text x="100" y="100" textAnchor="middle" dy=".3em" fontSize="24" fill="currentColor" opacity="0.5">
                  React 19
                </text>
                <circle cx="140" cy="80" r="8" fill="#3B82F6">
                  <animate attributeName="r" from="8" to="12" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="80" cy="120" r="8" fill="#8B5CF6">
                  <animate attributeName="r" from="8" to="12" dur="2s" repeatCount="indefinite" begin="0.5s" />
                </circle>
                <circle cx="120" cy="140" r="8" fill="#10B981">
                  <animate attributeName="r" from="8" to="12" dur="2s" repeatCount="indefinite" begin="1s" />
                </circle>
              </svg>
            </div>
          </div>
        </section>

        {/* React 19 Philosophy */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                The React 19 Philosophy
              </h2>
              <p className="text-gray-400 mt-2">
                Why React 19 exists and what problems it solves
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className={clsx(
              "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
              "border border-blue-800",
              "bg-gradient-to-br from-gray-800 to-gray-900",
              "hover:shadow-xl hover:shadow-blue-900/20"
            )}>
              <div className="w-14 h-14 rounded-xl bg-blue-900/30 flex items-center justify-center text-2xl mb-4">
                🧹
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-300">
                Reduce Boilerplate
              </h3>
              <p className="text-gray-400 mb-4">
                Common patterns that required libraries or custom code are now built-in.
                Like Tuhina using pre-made study templates instead of creating them from scratch.
              </p>
              <div className="text-sm text-gray-500 p-3 rounded-lg bg-gray-800">
                <strong>Example:</strong> Form handling used to need 50+ lines, now just 10.
              </div>
            </div>

            {/* Card 2 */}
            <div className={clsx(
              "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
              "border border-purple-800",
              "bg-gradient-to-br from-gray-800 to-gray-900",
              "hover:shadow-xl hover:shadow-purple-900/20"
            )}>
              <div className="w-14 h-14 rounded-xl bg-purple-900/30 flex items-center justify-center text-2xl mb-4">
                🚀
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-300">
                Improve Performance
              </h3>
              <p className="text-gray-400 mb-4">
                Built-in optimizations that developers previously had to implement manually.
                Like Debangshu getting a faster school portal without extra optimization work.
              </p>
              <div className="text-sm text-gray-500 p-3 rounded-lg bg-gray-800">
                <strong>Example:</strong> Automatic resource loading optimization.
              </div>
            </div>

            {/* Card 3 */}
            <div className={clsx(
              "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
              "border border-green-800",
              "bg-gradient-to-br from-gray-800 to-gray-900",
              "hover:shadow-xl hover:shadow-green-900/20"
            )}>
              <div className="w-14 h-14 rounded-xl bg-green-900/30 flex items-center justify-center text-2xl mb-4">
                🎓
              </div>
              <h3 className="text-xl font-semibold mb-3 text-green-300">
                Enhance Learning
              </h3>
              <p className="text-gray-400 mb-4">
                Fewer concepts to learn upfront. Beginners in Barrackpore can build 
                real applications faster with less "magic" to understand.
              </p>
              <div className="text-sm text-gray-500 p-3 rounded-lg bg-gray-800">
                <strong>Example:</strong> SEO management without learning external libraries.
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className={clsx(
            "mt-8 rounded-xl p-6",
            "border border-gray-700",
            "bg-gray-800"
          )}>
            <h3 className="text-xl font-semibold mb-4 text-gray-200">In Simple Terms:</h3>
            <p className="text-gray-400">
              React 19 is like upgrading from manual car transmission to automatic. 
              You still need to know how to drive (React fundamentals), but you spend 
              less time shifting gears (managing boilerplate) and more time focusing 
              on the road (building features).
            </p>
          </div>
        </section>

        {/* Key Features Overview */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">✨</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Key Features of React 19
              </h2>
              <p className="text-gray-400 mt-2">
                What's new and why it matters to you
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {react19Features.map((feature, index) => (
              <div 
                key={index}
                className={clsx(
                  "rounded-xl p-6 transition-all duration-300 hover:scale-[1.01]",
                  "border border-gray-700",
                  "bg-gradient-to-br from-gray-800 to-gray-900",
                  "hover:shadow-xl"
                )}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-6">
                  <div className="flex items-start mb-4 md:mb-0">
                    <div className={clsx(
                      "w-16 h-16 rounded-xl flex items-center justify-center text-2xl mr-4",
                      `bg-gradient-to-br ${feature.color} text-white`
                    )}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-100">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                  
                  <div className="px-4 py-2 rounded-full bg-gray-700 text-gray-300 text-sm font-medium">
                    Feature {index + 1}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-lg bg-red-900/20 border border-red-800">
                    <h4 className="font-semibold text-red-300 mb-2">Before React 19:</h4>
                    <p className="text-gray-400 text-sm">{feature.before}</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                    <h4 className="font-semibold text-green-300 mb-2">After React 19:</h4>
                    <p className="text-gray-400 text-sm">{feature.after}</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                    <h4 className="font-semibold text-blue-300 mb-2">Real Example:</h4>
                    <p className="text-gray-400 text-sm">{feature.example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Code Comparison */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-yellow-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">💻</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Before vs After: Code Examples
              </h2>
              <p className="text-gray-400 mt-2">
                See how React 19 reduces code and improves readability
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Example 1: Form Handling */}
            <div className="rounded-xl overflow-hidden border border-gray-700">
              <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
                <h3 className="text-xl font-semibold text-gray-200">
                  Example 1: Student Registration Form
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Handling form submission with loading, error, and success states
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-0">
                {/* Before React 19 */}
                <div className="bg-gray-900 p-6 border-r border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-red-300">Before React 19</h4>
                    <span className="px-3 py-1 rounded-full bg-red-900/30 text-red-300 text-sm">
                      Complex
                    </span>
                  </div>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
{`// StudentRegistrationForm.jsx
import { useState } from 'react';

function StudentRegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    class: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Registration failed');
      
      setSuccess(true);
      setFormData({ name: '', email: '', class: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <form onSubmit={handleSubmit}>
    // Form fields
    <button disabled={isLoading}>
      Register
    </button>
  </form>
);
}`}</pre>
                  <div className="mt-4 p-3 rounded-lg bg-red-900/20 border border-red-800">
                    <p className="text-sm text-gray-400">
                      <strong>Issues:</strong> 30+ lines of state management, manual error handling, 
                      no optimistic updates
                    </p>
                  </div>
                </div>

                {/* After React 19 */}
                <div className="bg-gray-900 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-green-300">After React 19</h4>
                    <span className="px-3 py-1 rounded-full bg-green-900/30 text-green-300 text-sm">
                      Simplified
                    </span>
                  </div>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
{`// StudentRegistrationForm.jsx
import { useActionState } from 'react';

async function registerStudent(prevState, formData) {
  // Server action
  const response = await fetch('/api/students', {
    method: 'POST',
    body: formData
  });
  
  if (!response.ok) {
    return { error: 'Registration failed' };
  }
  
  return { success: true, data: await response.json() };
}

function StudentRegistrationForm() {
  const [state, formAction, isPending] = useActionState(
    registerStudent,
    null
  );

  return (
    <form action={formAction}>
      {/* Form fields */}
      <button disabled={isPending}>
        {isPending ? 'Registering...' : 'Register'}
      </button>
      {state?.error && <p>{state.error}</p>}
      {state?.success && <p>Registered {state.data.name}!</p>}
    </form>
  );
}`}</pre>
                  <div className="mt-4 p-3 rounded-lg bg-green-900/20 border border-green-800">
                    <p className="text-sm text-gray-400">
                      <strong>Benefits:</strong> 60% less code, built-in pending state, 
                      automatic form data handling
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Example 2: Document Metadata */}
            <div className="rounded-xl overflow-hidden border border-gray-700">
              <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
                <h3 className="text-xl font-semibold text-gray-200">
                  Example 2: Page Title & SEO Management
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  Setting document metadata for better SEO and user experience
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-0">
                {/* Before React 19 */}
                <div className="bg-gray-900 p-6 border-r border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-red-300">Before React 19</h4>
                    <span className="px-3 py-1 rounded-full bg-red-900/30 text-red-300 text-sm">
                      External Library
                    </span>
                  </div>
                <pre className="text-sm text-gray-300 overflow-x-auto">
                    {`// StudentProfilePage.jsx
                    import { Helmet } from 'react-helmet';

                    function StudentProfilePage(student) {
                    return (
                        <>
                        <Helmet>
                            <title>STUDENT_NAME - Barrackpore School Portal</title>
                            <meta
                            name="description"
                            content="Profile of STUDENT_NAME, studying in CLASS_NAME"
                            />
                        </Helmet>

                        <div className="profile">
                            <h1>STUDENT_NAME's Profile</h1>
                            // Profile content
                        </div>
                        </>
                    );
                    }
                    `}
                </pre>
                  <div className="mt-4 p-3 rounded-lg bg-red-900/20 border border-red-800">
                    <p className="text-sm text-gray-400">
                      <strong>Issues:</strong> Need to install and configure react-helmet, 
                      extra bundle size, learning curve
                    </p>
                  </div>
                </div>

                {/* After React 19 */}
                <div className="bg-gray-900 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-green-300">After React 19</h4>
                    <span className="px-3 py-1 rounded-full bg-green-900/30 text-green-300 text-sm">
                      Built-in
                    </span>
                  </div>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
{`// StudentProfilePage.jsx
function StudentProfilePage(student) {
  return (
    <>
      <title>STUDENT_NAME - Barrackpore School Portal</title>
      <meta
        name="description"
        content="Profile of STUDENT_NAME, studying in CLASS_NAME"
      />

      <div className="profile">
        <h1>STUDENT_NAME's Profile</h1>
        // Profile content
      </div>
    </>
  );
}
`}
</pre>
                  <div className="mt-4 p-3 rounded-lg bg-green-900/20 border border-green-800">
                    <p className="text-sm text-gray-400">
                      <strong>Benefits:</strong> No external dependencies, simpler syntax, 
                      works out of the box
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Practical Scenarios */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.8s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">🏫</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Practical Scenarios for Students
              </h2>
              <p className="text-gray-400 mt-2">
                How React 19 helps with real school portal projects
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {practicalExamples.map((example, index) => (
              <div 
                key={index}
                className={clsx(
                  "rounded-xl p-6 transition-all duration-300 hover:scale-[1.01]",
                  "border border-gray-700",
                  "bg-gradient-to-br from-gray-800 to-gray-900",
                  "hover:shadow-xl"
                )}
              >
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white mr-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-blue-300">{example.scenario}</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">The Problem:</h4>
                    <p className="text-gray-400">{example.problem}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">The Benefit:</h4>
                    <div className="px-4 py-2 rounded-lg bg-green-900/20 border border-green-800">
                      <p className="text-green-300 font-semibold">{example.benefit}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 rounded-lg bg-red-900/20 border border-red-800">
                    <h4 className="font-semibold text-red-300 mb-2">Old Solution:</h4>
                    <p className="text-gray-400 text-sm">{example.oldSolution}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                    <h4 className="font-semibold text-green-300 mb-2">New Solution:</h4>
                    <p className="text-gray-400 text-sm">{example.newSolution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Box */}
          <div className={clsx(
            "mt-8 rounded-xl p-6",
            "border border-purple-800",
            "bg-gradient-to-br from-gray-800 to-gray-900"
          )}>
            <h3 className="text-xl font-semibold mb-4 text-purple-300">Key Takeaway for Beginners:</h3>
            <p className="text-gray-400">
              React 19 doesn't change how you <em>think</em> about React - components, props, 
              and state are still core concepts. It just removes the repetitive parts so 
              Abhronila can focus on building features instead of boilerplate.
            </p>
          </div>
        </section>

        {/* Migration Advice */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_1s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-yellow-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">🔄</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                What Should You Do?
              </h2>
              <p className="text-gray-400 mt-2">
                Practical advice for students and beginners
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* For New Projects */}
            <div className={clsx(
              "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
              "border border-green-800",
              "bg-gradient-to-br from-gray-800 to-gray-900",
              "hover:shadow-xl hover:shadow-green-900/20"
            )}>
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-xl bg-green-900/30 flex items-center justify-center text-2xl mr-4">
                  🚀
                </div>
                <h3 className="text-xl font-semibold text-green-300">Starting New Projects</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <span className="text-sm text-green-300">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-1">Use React 19 from Day 1</h4>
                    <p className="text-gray-400 text-sm">
                      All new school portal projects in Ichapur should use React 19
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <span className="text-sm text-green-300">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-1">Learn Modern Patterns</h4>
                    <p className="text-gray-400 text-sm">
                      Focus on Actions, built-in SEO, and modern asset loading
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <span className="text-sm text-green-300">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-1">Skip Old Libraries</h4>
                    <p className="text-gray-400 text-sm">
                      Don't learn react-helmet or complex form libraries initially
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* For Learning */}
            <div className={clsx(
              "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
              "border border-blue-800",
              "bg-gradient-to-br from-gray-800 to-gray-900",
              "hover:shadow-xl hover:shadow-blue-900/20"
            )}>
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-xl bg-blue-900/30 flex items-center justify-center text-2xl mr-4">
                  🎓
                </div>
                <h3 className="text-xl font-semibold text-blue-300">Learning React</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <span className="text-sm text-blue-300">①</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-1">Master Fundamentals First</h4>
                    <p className="text-gray-400 text-sm">
                      Components, props, state, hooks - these haven't changed
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <span className="text-sm text-blue-300">②</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-1">Then Learn React 19 Features</h4>
                    <p className="text-gray-400 text-sm">
                      Add Actions, metadata, and asset loading to your toolkit
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <span className="text-sm text-blue-300">③</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-1">Update Old Knowledge</h4>
                    <p className="text-gray-400 text-sm">
                      When you see old tutorials, translate concepts to React 19
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_1.2s] opacity-0 [animation-fill-mode:forwards]">
          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl",
            "border-l-4 border-blue-500",
            "bg-gradient-to-r from-gray-800 to-gray-900",
            "hover:from-gray-700 hover:to-gray-800"
          )}>
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-2xl text-white">👨‍🏫</span>
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-100 mr-4">
                    Teacher's Note
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-blue-900/30 text-blue-300 text-sm font-medium">
                    Sukanta Hui
                  </span>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                      <span className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center mr-3">🎯</span>
                      The React 19 Mindset for Students:
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      Think of React 19 as getting a better school bag. You still need to 
                      carry books (components), notes (state), and assignments (props). 
                      But now the bag has better compartments (Actions), a built-in 
                      organizer (metadata), and it's easier to carry (less boilerplate).
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-yellow-900/30 flex items-center justify-center mr-3">💡</span>
                        Teaching Strategy:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">1</span>
                          </div>
                          <span>Teach fundamentals first - React 19 features build on them</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">2</span>
                          </div>
                          <span>Show before/after comparisons - helps students in Shyamnagar see the value</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">3</span>
                          </div>
                          <span>Focus on practical benefits - less code means faster project completion</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center mr-3">⚠️</span>
                        Common Confusions:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"Do I need to relearn React?" → No, it's an addition, not a replacement</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"Should I wait to learn React?" → Start now, learn modern patterns</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"What about old tutorials?" → Concepts transfer, syntax updates</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-5 rounded-xl bg-gray-800/50 border border-gray-700">
                    <h5 className="font-semibold text-gray-200 mb-3 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3">📚</span>
                      27 Years Experience Insight:
                    </h5>
                    <p className="text-gray-400">
                      I've seen many framework updates. React 19 is special because it 
                      focuses on <em>developer happiness</em>. When Tuhina spends less time 
                      on boilerplate and more time building features, she stays motivated. 
                      That's the secret to becoming a great developer - enjoying the process.
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-500">
                      <p>📧 sukantahui@codernaccotax.co.in | 📱 7003756860</p>
                      <p>Teaching modern web development with practical focus</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[slideUp_0.8s_ease-out_1.4s] opacity-0 [animation-fill-mode:forwards]">
          <div className={clsx(
            "rounded-2xl p-8",
            "bg-gradient-to-br from-gray-800 to-gray-900",
            "border border-gray-700"
          )}>
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-100">
              📋 Topic 3 Checklist
            </h3>
            
            <div className="space-y-4">
              {[
                "Understand React 19's philosophy: less boilerplate, better DX",
                "Know what Actions are and how they simplify form handling",
                "Understand built-in document metadata for SEO",
                "Recognize asset loading improvements",
                "Know why React 19 matters for beginners",
                "Be able to explain React 19 benefits in simple terms",
                "Understand that core React concepts remain unchanged",
                "Know when to use React 19 features in projects"
              ].map((item, index) => (
                <div
                  key={index}
                  className={clsx(
                    "flex items-start p-4 rounded-lg transition-all duration-300",
                    "border border-gray-700",
                    "hover:bg-gray-800",
                    "hover:shadow-md hover:border-indigo-700"
                  )}
                >
                  <div className="w-8 h-8 rounded-full bg-indigo-900/30 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-indigo-300">{index + 1}</span>
                  </div>
                  <span className="text-gray-300 pt-1">{item}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center">
              {hasNext ? (
                <Link
                  to={`/${folder}/topic/${moduleSlug}/${currentIndex + 1}`}
                  className="inline-flex items-center gap-2
                 px-6 py-3 rounded-lg
                 bg-gradient-to-r from-blue-500 to-purple-600
                 text-white font-medium"
                >
                  Ready for Topic {currentIndex + 2}
                  <ArrowRight size={18} />
                </Link>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center gap-2
                   px-6 py-3 rounded-lg
                   bg-slate-900 text-slate-500
                   border border-slate-800
                   cursor-not-allowed"
                >
                  No More Topics
                  <ArrowRight size={18} />
                </button>
              )}

              <p className="mt-4 text-sm text-gray-400">
                Next: Modern React philosophy: UI as a function of state
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-400">
            <p>© 2024 React Foundations Course. Topic 3: React 19 Changes</p>
            <p className="mt-2 text-sm">Beginner-friendly overview of what's new and why it matters</p>
          </div>
        </div>
      </footer>

      {/* Inline Styles for Animations */}
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
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        /* Respect reduced motion preferences */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        .motion-safe {
          animation-duration: 0.8s;
          animation-timing-function: ease-out;
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
};

export default Topic3;