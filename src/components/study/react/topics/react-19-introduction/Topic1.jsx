import { useState } from 'react';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import roadmapData from "../../react19-roadmap.json";

const Topic1 = () => {
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

  const frameworks = {
    react: {
      name: 'React',
      type: 'Library',
      color: 'from-blue-500 to-cyan-500',
      darkColor: 'from-blue-600 to-cyan-600',
      textColor: 'text-blue-400',
      bgColor: 'bg-blue-900/20',
      borderColor: 'border-blue-800',
      icon: '⚛️',
      description: 'A JavaScript library for building user interfaces'
    },
    angular: {
      name: 'Angular',
      type: 'Framework',
      color: 'from-red-500 to-red-700',
      darkColor: 'from-red-600 to-red-800',
      textColor: 'text-red-400',
      bgColor: 'bg-red-900/20',
      borderColor: 'border-red-800',
      icon: '🅰️',
      description: 'A platform and framework for building single-page applications'
    },
    vue: {
      name: 'Vue',
      type: 'Framework',
      color: 'from-green-500 to-emerald-600',
      darkColor: 'from-green-600 to-emerald-700',
      textColor: 'text-green-400',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-800',
      icon: '🖖',
      description: 'A progressive framework for building user interfaces'
    }
  };

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
                <p className="text-sm text-gray-500 dark:text-gray-400">Topic 1: React vs Angular vs Vue</p>
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
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                The Great Debate: Library vs Framework
              </h2>
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                Should you learn React (library), Angular (full framework), or Vue (progressive framework)?
                Think of it like choosing transportation for your Naihati school trip: 
                React gives you a car to build as you like, Angular provides a ready-made bus with driver, 
                and Vue offers a custom tour van.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Library = Freedom + Responsibility
                </span>
                <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Framework = Convention + Speed
                </span>
                <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Choose Wisely for Your Project
                </span>
              </div>
            </div>
            
            {/* Animated transportation SVG */}
            <div className="absolute right-8 top-8 opacity-10">
              <svg width="180" height="140" viewBox="0 0 200 100" className="animate-[float_6s_ease-in-out_infinite]">
                <rect x="20" y="60" width="40" height="20" rx="5" fill="#3B82F6" opacity="0.8">
                  <animate attributeName="x" from="20" to="140" dur="4s" repeatCount="indefinite" />
                </rect>
                <circle cx="30" cy="80" r="6" fill="#1E40AF">
                  <animate attributeName="cx" from="30" to="150" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="50" cy="80" r="6" fill="#1E40AF">
                  <animate attributeName="cx" from="50" to="170" dur="4s" repeatCount="indefinite" />
                </circle>
                
                <rect x="40" y="30" width="60" height="25" rx="5" fill="#EF4444" opacity="0.8">
                  <animate attributeName="x" from="40" to="100" dur="5s" repeatCount="indefinite" begin="0.5s" />
                </rect>
                <circle cx="50" cy="55" r="7" fill="#991B1B">
                  <animate attributeName="cx" from="50" to="110" dur="5s" repeatCount="indefinite" begin="0.5s" />
                </circle>
                <circle cx="90" cy="55" r="7" fill="#991B1B">
                  <animate attributeName="cx" from="90" to="150" dur="5s" repeatCount="indefinite" begin="0.5s" />
                </circle>
                
                <rect x="100" y="10" width="35" height="20" rx="5" fill="#10B981" opacity="0.8">
                  <animate attributeName="x" from="100" to="150" dur="3s" repeatCount="indefinite" begin="1s" />
                </rect>
                <circle cx="110" cy="30" r="5" fill="#047857">
                  <animate attributeName="cx" from="110" to="160" dur="3s" repeatCount="indefinite" begin="1s" />
                </circle>
                <circle cx="125" cy="30" r="5" fill="#047857">
                  <animate attributeName="cx" from="125" to="175" dur="3s" repeatCount="indefinite" begin="1s" />
                </circle>
              </svg>
            </div>
          </div>
        </section>

        {/* Key Differences Card */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">⚖️</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Fundamental Difference: Library vs Framework
              </h2>
              <p className="text-gray-400 mt-2">
                Understanding this distinction is crucial for making the right choice
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* React Card */}
            <div className={clsx(
              "rounded-2xl p-8 transition-all duration-300 hover:scale-[1.01]",
              "border border-blue-800",
              "bg-gradient-to-br from-gray-800 to-gray-900",
              "hover:shadow-xl hover:shadow-blue-900/20"
            )}>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-3xl text-white mr-6">
                  ⚛️
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-400">
                    React - A Library
                  </h3>
                  <p className="text-gray-400">"You call the library"</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <span className="text-sm text-blue-400">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-1">Architectural Freedom</h4>
                    <p className="text-gray-400">
                      React focuses only on the view layer. You choose routing (React Router), state management (Redux/Zustand), 
                      and other tools. Like Swadeep choosing his own study materials for each subject.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <span className="text-sm text-blue-400">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-1">Learning Path</h4>
                    <p className="text-gray-400">
                      Start with React basics, then learn complementary libraries. This modular approach helps 
                      students in Barrackpore understand each concept deeply before combining them.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                  <h4 className="font-semibold text-blue-300 mb-2">Real World Analogy</h4>
                  <p className="text-gray-400">
                    React is like a <strong>toolkit</strong> - You get hammers, screws, and nails, but you design and build 
                    the furniture yourself. Great for custom solutions but requires more planning.
                  </p>
                </div>
              </div>
            </div>

            {/* Angular & Vue Card */}
            <div className={clsx(
              "rounded-2xl p-8 transition-all duration-300 hover:scale-[1.01]",
              "border border-purple-800",
              "bg-gradient-to-br from-gray-800 to-gray-900",
              "hover:shadow-xl hover:shadow-purple-900/20"
            )}>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-pink-600 flex items-center justify-center text-3xl text-white mr-4">
                  🅰️
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center text-3xl text-white mr-6">
                  🖖
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-purple-400">
                    Angular & Vue - Frameworks
                  </h3>
                  <p className="text-gray-400">"The framework calls you"</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-purple-900/30 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <span className="text-sm text-purple-400">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-1">Batteries-Included</h4>
                    <p className="text-gray-400">
                      Angular provides everything: routing, HTTP client, forms, testing. Vue offers official solutions 
                      for most needs. Like Tuhina getting a complete study package with textbooks, notes, and practice tests.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-purple-900/30 flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                    <span className="text-sm text-purple-400">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-1">Convention Over Configuration</h4>
                    <p className="text-gray-400">
                      Frameworks enforce structure and patterns. This consistency helps teams in Shyamnagar tech companies 
                      maintain large codebases with multiple developers.
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 p-4 rounded-lg bg-purple-900/20 border border-purple-800">
                  <h4 className="font-semibold text-purple-300 mb-2">Real World Analogy</h4>
                  <p className="text-gray-400">
                    Frameworks are like <strong>furniture kits</strong> - You get pre-cut pieces with instructions. 
                    Faster to assemble, less flexible in design, but ensures consistency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Comparison */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Technical Comparison
              </h2>
              <p className="text-gray-400 mt-2">
                How React, Angular, and Vue differ in implementation
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Row 1: Language & Syntax */}
            <div className={clsx(
              "rounded-xl p-6 transition-all duration-300",
              "border border-gray-700",
              "bg-gray-800",
              "hover:shadow-lg"
            )}>
              <h3 className="text-xl font-semibold mb-4 text-gray-200 flex items-center">
                <span className="mr-3">1.</span> Language & Syntax
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                  <h4 className="font-semibold text-blue-300 mb-2">React</h4>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• JavaScript or TypeScript</li>
                    <li>• JSX syntax (HTML in JS)</li>
                    <li>• Functional components with hooks</li>
                    <li>• Unidirectional data flow</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-red-900/20 border border-red-800">
                  <h4 className="font-semibold text-red-300 mb-2">Angular</h4>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• TypeScript (required)</li>
                    <li>• Templates with special syntax</li>
                    <li>• Class-based components</li>
                    <li>• Two-way data binding</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                  <h4 className="font-semibold text-green-300 mb-2">Vue</h4>
                  <ul className="space-y-1 text-sm text-gray-400">
                    <li>• JavaScript or TypeScript</li>
                    <li>• Single File Components (.vue)</li>
                    <li>• Options API or Composition API</li>
                    <li>• Reactive data system</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Row 2: Learning Curve */}
            <div className={clsx(
              "rounded-xl p-6 transition-all duration-300",
              "border border-gray-700",
              "bg-gray-800",
              "hover:shadow-lg"
            )}>
              <h3 className="text-xl font-semibold mb-4 text-gray-200 flex items-center">
                <span className="mr-3">2.</span> Learning Curve & Ecosystem
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                  <h4 className="font-semibold text-blue-300 mb-2">React</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Beginner Friendly</span>
                        <span className="text-blue-300">★★★☆☆</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-3/5"></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      Easy to start, deep to master. Abhronila can build basics in days, but needs months for advanced patterns.
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-red-900/20 border border-red-800">
                  <h4 className="font-semibold text-red-300 mb-2">Angular</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Beginner Friendly</span>
                        <span className="text-red-300">★☆☆☆☆</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 w-2/5"></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      Steep learning curve. Debangshu needs to learn TypeScript, RxJS, and Angular-specific concepts together.
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                  <h4 className="font-semibold text-green-300 mb-2">Vue</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Beginner Friendly</span>
                        <span className="text-green-300">★★★★☆</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 w-4/5"></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 mt-2">
                      Gentle learning curve. Tuhina can understand basics quickly with excellent documentation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3: Use Cases */}
            <div className={clsx(
              "rounded-xl p-6 transition-all duration-300",
              "border border-gray-700",
              "bg-gray-800",
              "hover:shadow-lg"
            )}>
              <h3 className="text-xl font-semibold mb-4 text-gray-200 flex items-center">
                <span className="mr-3">3.</span> Ideal Use Cases
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                  <h4 className="font-semibold text-blue-300 mb-2">Choose React When:</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded-full bg-blue-900/50 flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                        <span className="text-xs text-blue-300">✓</span>
                      </div>
                      <span>Building complex, dynamic SPAs</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded-full bg-blue-900/50 flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                        <span className="text-xs text-blue-300">✓</span>
                      </div>
                      <span>Team values flexibility and choice</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded-full bg-blue-900/50 flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                        <span className="text-xs text-blue-300">✓</span>
                      </div>
                      <span>Planning React Native for mobile</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-red-900/20 border border-red-800">
                  <h4 className="font-semibold text-red-300 mb-2">Choose Angular When:</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded-full bg-red-900/50 flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                        <span className="text-xs text-red-300">✓</span>
                      </div>
                      <span>Enterprise-scale applications</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded-full bg-red-900/50 flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                        <span className="text-xs text-red-300">✓</span>
                      </div>
                      <span>Large teams need consistency</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded-full bg-red-900/50 flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                        <span className="text-xs text-red-300">✓</span>
                      </div>
                      <span>TypeScript expertise available</span>
                    </li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                  <h4 className="font-semibold text-green-300 mb-2">Choose Vue When:</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded-full bg-green-900/50 flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                        <span className="text-xs text-green-300">✓</span>
                      </div>
                      <span>Small to medium projects</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded-full bg-green-900/50 flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                        <span className="text-xs text-green-300">✓</span>
                      </div>
                      <span>Team includes designers</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-4 h-4 rounded-full bg-green-900/50 flex items-center justify-center mt-1 mr-2 flex-shrink-0">
                        <span className="text-xs text-green-300">✓</span>
                      </div>
                      <span>Need gradual adoption</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-yellow-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">💻</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Code Comparison: Simple Counter Component
              </h2>
              <p className="text-gray-400 mt-2">
                Same functionality implemented in three different ways
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* React Code */}
            <div className={clsx(
              "rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01]",
              "border border-blue-800",
              "hover:shadow-xl hover:shadow-blue-900/20"
            )}>
              <div className="bg-blue-900/50 px-6 py-4 border-b border-blue-800">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white mr-3">
                    ⚛️
                  </div>
                  <h3 className="text-xl font-semibold text-blue-300">React Implementation</h3>
                  <span className="ml-4 px-3 py-1 rounded-full bg-blue-900/30 text-blue-300 text-sm">
                    Function Component with Hooks
                  </span>
                </div>
              </div>
              <div className="bg-gray-900 p-6">
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}`}</pre>
                <div className="mt-4 p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                  <h4 className="font-semibold text-blue-300 mb-2">React Characteristics:</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Uses useState hook for state management</li>
                    <li>• JSX syntax for rendering</li>
                    <li>• Event handlers as inline functions</li>
                    <li>• Functional component pattern</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Angular Code */}
            <div className={clsx(
              "rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01]",
              "border border-red-800",
              "hover:shadow-xl hover:shadow-red-900/20"
            )}>
              <div className="bg-red-900/50 px-6 py-4 border-b border-red-800">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white mr-3">
                    🅰️
                  </div>
                  <h3 className="text-xl font-semibold text-red-300">Angular Implementation</h3>
                  <span className="ml-4 px-3 py-1 rounded-full bg-red-900/30 text-red-300 text-sm">
                    Class Component with Decorators
                  </span>
                </div>
              </div>
              <div className="bg-gray-900 p-6">
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: \`
    <div class="counter">
      <h2>Count: {{ count }}</h2>
      <button (click)="increment()">Increment</button>
      <button (click)="decrement()">Decrement</button>
    </div>
  \`
})
export class CounterComponent {
  count = 0;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}`}</pre>
                <div className="mt-4 p-4 rounded-lg bg-red-900/20 border border-red-800">
                  <h4 className="font-semibold text-red-300 mb-2">Angular Characteristics:</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• TypeScript class with @Component decorator</li>
                    <li>• Template in separate file or inline string</li>
                    <li>• Event binding with (click) syntax</li>
                    <li>• Two-way data binding available</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Vue Code */}
            <div className={clsx(
              "rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01]",
              "border border-green-800",
              "hover:shadow-xl hover:shadow-green-900/20"
            )}>
              <div className="bg-green-900/50 px-6 py-4 border-b border-green-800">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white mr-3">
                    🖖
                  </div>
                  <h3 className="text-xl font-semibold text-green-300">Vue Implementation</h3>
                  <span className="ml-4 px-3 py-1 rounded-full bg-green-900/30 text-green-300 text-sm">
                    Single File Component
                  </span>
                </div>
              </div>
              <div className="bg-gray-900 p-6">
                <pre className="text-sm text-gray-300 overflow-x-auto">
{`<template>
  <div class="counter">
    <h2>Count: {{ count }}</h2>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  },
  methods: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    }
  }
}
</script>`}</pre>
                <div className="mt-4 p-4 rounded-lg bg-green-900/20 border border-green-800">
                  <h4 className="font-semibold text-green-300 mb-2">Vue Characteristics:</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Single File Component (.vue) structure</li>
                    <li>• Options API with data() and methods</li>
                    <li>• Template syntax similar to HTML</li>
                    <li>• Event handling with @click directive</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Decision Guide */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.8s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Practical Decision Guide
              </h2>
              <p className="text-gray-400 mt-2">
                Which technology fits your specific needs?
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Scenario 1 */}
            <div className={clsx(
              "rounded-xl p-6 transition-all duration-300 hover:scale-[1.01]",
              "border border-blue-800",
              "bg-gradient-to-br from-gray-800 to-gray-900",
              "hover:shadow-xl hover:shadow-blue-900/20"
            )}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white mr-4">
                  🎓
                </div>
                <h3 className="text-xl font-semibold text-blue-300">Scenario 1: Student Learning Web Development</h3>
              </div>
              <div className="ml-14">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-200 mb-2">Situation:</h4>
                  <p className="text-gray-400">
                    Swadeep from Naihati wants to learn modern web development. He knows HTML, CSS, and basic JavaScript.
                    He wants maximum job opportunities and the ability to build various types of applications.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                    <h4 className="font-semibold text-blue-300 mb-2">React</h4>
                    <p className="text-sm text-gray-400">
                      <strong>Best Choice</strong> - Most job opportunities, transferable skills to React Native,
                      large community for support.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                    <h4 className="font-semibold text-gray-400 mb-2">Vue</h4>
                    <p className="text-sm text-gray-400">
                      Good alternative if focusing on smaller projects or design-heavy applications.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                    <h4 className="font-semibold text-gray-400 mb-2">Angular</h4>
                    <p className="text-sm text-gray-400">
                      Not recommended initially - steep learning curve, better after mastering fundamentals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scenario 2 */}
            <div className={clsx(
              "rounded-xl p-6 transition-all duration-300 hover:scale-[1.01]",
              "border border-red-800",
              "bg-gradient-to-br from-gray-800 to-gray-900",
              "hover:shadow-xl hover:shadow-red-900/20"
            )}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white mr-4">
                  🏢
                </div>
                <h3 className="text-xl font-semibold text-red-300">Scenario 2: Enterprise Banking Application</h3>
              </div>
              <div className="ml-14">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-200 mb-2">Situation:</h4>
                  <p className="text-gray-400">
                    A large bank in Kolkata needs a secure, maintainable application with strict coding standards.
                    Team of 50+ developers, need TypeScript, strong testing, and long-term maintainability.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                    <h4 className="font-semibold text-gray-400 mb-2">React</h4>
                    <p className="text-sm text-gray-400">
                      Possible with strict architecture, but requires many decisions and custom implementations.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-red-900/20 border border-red-800">
                    <h4 className="font-semibold text-red-300 mb-2">Angular</h4>
                    <p className="text-sm text-gray-400">
                      <strong>Best Choice</strong> - Built for enterprise, TypeScript-first, comprehensive tooling,
                      strong testing support.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                    <h4 className="font-semibold text-gray-400 mb-2">Vue</h4>
                    <p className="text-sm text-gray-400">
                      Less common in large enterprises, though adoption is growing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scenario 3 */}
            <div className={clsx(
              "rounded-xl p-6 transition-all duration-300 hover:scale-[1.01]",
              "border border-green-800",
              "bg-gradient-to-br from-gray-800 to-gray-900",
              "hover:shadow-xl hover:shadow-green-900/20"
            )}>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white mr-4">
                  🚀
                </div>
                <h3 className="text-xl font-semibold text-green-300">Scenario 3: Startup Prototype</h3>
              </div>
              <div className="ml-14">
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-200 mb-2">Situation:</h4>
                  <p className="text-gray-400">
                    A startup in Ichapur needs to build a prototype quickly to show investors. Small team with 
                    mixed skills (some designers, some developers). Need fast iteration and easy learning curve.
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                    <h4 className="font-semibold text-gray-400 mb-2">React</h4>
                    <p className="text-sm text-gray-400">
                      Good choice if team has React experience, otherwise decision fatigue can slow progress.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                    <h4 className="font-semibold text-gray-400 mb-2">Angular</h4>
                    <p className="text-sm text-gray-400">
                      Too heavy for rapid prototyping, learning curve too steep for quick iteration.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                    <h4 className="font-semibold text-green-300 mb-2">Vue</h4>
                    <p className="text-sm text-gray-400">
                      <strong>Best Choice</strong> - Gentle learning curve, excellent documentation, 
                      designers can understand templates easily.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Teacher's Note */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_1s] opacity-0 [animation-fill-mode:forwards]">
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
                      The Bottom Line for Students:
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      If you're learning in Barrackpore, Shyamnagar, or Ichapur and want <strong>maximum career opportunities</strong>, 
                      start with <strong>React</strong>. It teaches fundamental concepts that apply to all frameworks. 
                      After mastering React, learning Vue or Angular becomes much easier.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-yellow-900/30 flex items-center justify-center mr-3">💡</span>
                        Professional Tip:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">1</span>
                          </div>
                          <span>Learn <strong>principles</strong>, not just syntax. Component architecture, state management, and reactivity patterns work across all three.</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">2</span>
                          </div>
                          <span>Most companies in Kolkata/Naihati tech parks use React. Angular is common in banking/finance sectors.</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center mr-3">⚠️</span>
                        Common Mistakes to Avoid:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>Don't argue "which is better" - understand "which is better <em>for this specific project</em>"</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>Don't switch frameworks mid-project without strong technical reasons</span>
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
                      I've taught thousands of students from basic HTML to advanced frameworks. The pattern is clear: 
                      Those who understand <em>why</em> React is a library and Angular is a framework make better architectural decisions. 
                      They don't just follow tutorials - they understand trade-offs and make informed choices.
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-500">
                      <p>📧 sukantahui@codernaccotax.co.in | 📱 7003756860</p>
                      <p>Experience: Web Development, RDBMS, Operating Systems</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mini Checklist */}
        <section className="animate-[slideUp_0.8s_ease-out_1.2s] opacity-0 [animation-fill-mode:forwards]">
          <div className={clsx(
            "rounded-2xl p-8",
            "bg-gradient-to-br from-gray-800 to-gray-900",
            "border border-gray-700"
          )}>
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-100">
              📋 Topic 1 Checklist
            </h3>
            
            <div className="space-y-4">
              {[
                "Understand React is a library (you call it), Angular/Vue are frameworks (they call you)",
                "Know when to choose each: React for flexibility, Angular for enterprise, Vue for progressive adoption",
                "Recognize syntax differences: JSX vs Templates vs Single File Components",
                "Understand learning curve implications for beginners",
                "Know job market realities in Kolkata/Naihati area",
                "Be able to explain the difference to a non-technical person",
                "Understand that all three solve similar problems with different philosophies",
                "Know that React skills are highly transferable to React Native"
              ].map((item, index) => (
                <div
                  key={index}
                  className={clsx(
                    "flex items-start p-4 rounded-lg transition-all duration-300",
                    "border border-gray-700",
                    "hover:bg-gray-800",
                    "hover:shadow-md hover:border-blue-700"
                  )}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-blue-300">{index + 1}</span>
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
                Next: Evolution of React - From Class Components to React 19
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-400">
            <p>© 2024 React Foundations Course. Topic 1: React vs Angular vs Vue</p>
            <p className="mt-2 text-sm">Practical comparison for real-world decision making</p>
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

export default Topic1;