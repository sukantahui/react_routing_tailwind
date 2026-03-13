import { useState } from 'react';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import roadmapData from "../../react19-roadmap.json";

const Topic2 = () => {
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

  const reactVersions = [
    {
      version: "React 0.3.0",
      year: "2013",
      icon: "🚀",
      color: "from-gray-600 to-gray-700",
      features: ["Initial release", "JSX syntax", "Basic components"],
      significance: "Birth of React - Facebook releases it to solve their own UI problems"
    },
    {
      version: "React 0.14",
      year: "2015",
      icon: "⚡",
      color: "from-blue-600 to-cyan-600",
      features: ["Package split", "React DOM separate", "Better performance"],
      significance: "React becomes more modular - foundation for web and native"
    },
    {
      version: "React 16",
      year: "2017",
      icon: "🎯",
      color: "from-purple-600 to-pink-600",
      features: ["Fiber architecture", "Error boundaries", "Portals", "Fragments"],
      significance: "Complete rewrite - Fiber enables async rendering and better UX"
    },
    {
      version: "React 16.8",
      year: "2019",
      icon: "🔧",
      color: "from-green-600 to-emerald-700",
      features: ["Hooks introduced", "useState", "useEffect", "Custom hooks"],
      significance: "Revolutionary shift - Functional components become mainstream"
    },
    {
      version: "React 18",
      year: "2022",
      icon: "🚀",
      color: "from-yellow-600 to-orange-600",
      features: ["Concurrent features", "Automatic batching", "Suspense for data", "New root API"],
      significance: "Performance leap - Concurrent rendering for smoother UIs"
    },
    {
      version: "React 19",
      year: "2024",
      icon: "🌟",
      color: "from-indigo-600 to-purple-700",
      features: ["Actions", "Document Metadata", "Asset Loading", "Web Components"],
      significance: "Developer experience focus - Less boilerplate, more features"
    }
  ];

  const classVsFunction = [
    {
      aspect: "State Management",
      class: "this.state and this.setState()",
      function: "useState() hook",
      advantage: "Function components: Cleaner, no 'this' binding issues"
    },
    {
      aspect: "Lifecycle Methods",
      class: "componentDidMount, componentDidUpdate, componentWillUnmount",
      function: "useEffect() hook",
      advantage: "Function components: Logic organized by concern, not lifecycle"
    },
    {
      aspect: "Code Reusability",
      class: "Higher-Order Components (HOCs), Render Props",
      function: "Custom Hooks",
      advantage: "Custom hooks: More intuitive, less wrapper hell"
    },
    {
      aspect: "Learning Curve",
      class: "Requires understanding 'this', binding, lifecycle phases",
      function: "Simpler mental model, functional programming concepts",
      advantage: "Easier for beginners like Tuhina from Barrackpore"
    },
    {
      aspect: "Performance",
      class: "Can be optimized with PureComponent, shouldComponentUpdate",
      function: "React.memo, useMemo, useCallback",
      advantage: "Similar performance, but hooks offer more granular control"
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
                <p className="text-sm text-gray-500 dark:text-gray-400">Topic 2: Evolution of React</p>
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
                The React Evolution Journey
              </h2>
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                From class components in 2013 to React 19 in 2024 - watch how React transformed from 
                a Facebook internal tool to the world's most popular UI library. Think of it like 
                Swadeep's journey from learning basic HTML to mastering modern web development.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  2013: Class Components Era
                </span>
                <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  2019: Hooks Revolution
                </span>
                <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  2024: React 19 Modern Era
                </span>
              </div>
            </div>
            
            {/* Evolution Timeline SVG */}
            <div className="absolute right-8 top-8 opacity-10">
              <svg width="200" height="150" viewBox="0 0 200 150" className="animate-[float_8s_ease-in-out_infinite]">
                {/* Timeline */}
                <line x1="20" y1="75" x2="180" y2="75" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
                
                {/* Milestone 1 */}
                <circle cx="30" cy="75" r="8" fill="#3B82F6">
                  <animate attributeName="r" from="8" to="12" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="30" y="60" textAnchor="middle" fontSize="10" fill="currentColor">2013</text>
                
                {/* Milestone 2 */}
                <circle cx="70" cy="75" r="8" fill="#8B5CF6">
                  <animate attributeName="r" from="8" to="12" dur="2s" repeatCount="indefinite" begin="0.3s" />
                </circle>
                <text x="70" y="60" textAnchor="middle" fontSize="10" fill="currentColor">2015</text>
                
                {/* Milestone 3 */}
                <circle cx="110" cy="75" r="8" fill="#10B981">
                  <animate attributeName="r" from="8" to="12" dur="2s" repeatCount="indefinite" begin="0.6s" />
                </circle>
                <text x="110" y="60" textAnchor="middle" fontSize="10" fill="currentColor">2019</text>
                
                {/* Milestone 4 */}
                <circle cx="150" cy="75" r="8" fill="#F59E0B">
                  <animate attributeName="r" from="8" to="12" dur="2s" repeatCount="indefinite" begin="0.9s" />
                </circle>
                <text x="150" y="60" textAnchor="middle" fontSize="10" fill="currentColor">2022</text>
                
                {/* Milestone 5 */}
                <circle cx="180" cy="75" r="10" fill="#EC4899">
                  <animate attributeName="r" from="10" to="15" dur="2s" repeatCount="indefinite" begin="1.2s" />
                </circle>
                <text x="180" y="60" textAnchor="middle" fontSize="10" fill="currentColor">2024</text>
              </svg>
            </div>
          </div>
        </section>

        {/* React Evolution Timeline */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">📅</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                React Evolution Timeline
              </h2>
              <p className="text-gray-400 mt-2">
                A decade of innovation - Each version brought significant improvements
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {reactVersions.map((version, index) => (
              <div 
                key={index}
                className={clsx(
                  "rounded-xl p-6 transition-all duration-300 hover:scale-[1.01]",
                  "border border-gray-700",
                  "bg-gradient-to-br from-gray-800 to-gray-900",
                  "hover:shadow-xl",
                  index === 5 && "ring-2 ring-purple-500 ring-opacity-50"
                )}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    <div className={clsx(
                      "w-14 h-14 rounded-xl flex items-center justify-center text-2xl mr-4",
                      `bg-gradient-to-br ${version.color}`
                    )}>
                      {version.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-100">{version.version}</h3>
                      <p className="text-gray-400">{version.year}</p>
                    </div>
                  </div>
                  
                  <div className={clsx(
                    "px-4 py-2 rounded-full text-sm font-medium",
                    index === 5 ? "bg-purple-900/30 text-purple-300" : "bg-gray-700 text-gray-300"
                  )}>
                    {version.significance}
                  </div>
                </div>
                
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {version.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs text-blue-300">✓</span>
                          </div>
                          <span className="text-gray-400">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-3">Impact:</h4>
                    <p className="text-gray-400">
                      {index === 0 && "React solved Facebook's UI update problems. Like Tuhina needing a better way to track student grades."}
                      {index === 1 && "Separating React DOM enabled React Native. Similar to Debangshu learning both web and mobile."}
                      {index === 2 && "Fiber made UIs smoother. Like improving Barrackpore school's attendance system for speed."}
                      {index === 3 && "Hooks made React more intuitive. Like Abhronila switching from textbook notes to digital flashcards."}
                      {index === 4 && "Concurrent features for better UX. Like a school portal that loads instantly in Shyamnagar."}
                      {index === 5 && "Focus on developer happiness. Less code, more results - perfect for startups in Ichapur."}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Class Components vs Function Components */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">⚔️</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Class Components vs Function Components
              </h2>
              <p className="text-gray-400 mt-2">
                The great transformation in React development patterns
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Comparison Table */}
            <div className="rounded-xl overflow-hidden border border-gray-700">
              <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
                <h3 className="text-xl font-semibold text-gray-200">
                  Detailed Feature Comparison
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-4 font-semibold text-gray-300">Aspect</th>
                      <th className="text-left p-4 font-semibold text-red-300">Class Components</th>
                      <th className="text-left p-4 font-semibold text-green-300">Function Components</th>
                      <th className="text-left p-4 font-semibold text-blue-300">Advantage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classVsFunction.map((row, index) => (
                      <tr 
                        key={index}
                        className={clsx(
                          "border-b border-gray-800",
                          "transition-all duration-300 hover:bg-gray-800/50"
                        )}
                      >
                        <td className="p-4 font-medium text-gray-200">{row.aspect}</td>
                        <td className="p-4">
                          <div className="font-mono text-sm text-red-400 bg-red-900/20 p-2 rounded">
                            {row.class}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-mono text-sm text-green-400 bg-green-900/20 p-2 rounded">
                            {row.function}
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-400">{row.advantage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Code Comparison */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Class Component Example */}
              <div className={clsx(
                "rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01]",
                "border border-red-800",
                "hover:shadow-xl hover:shadow-red-900/20"
              )}>
                <div className="bg-red-900/50 px-6 py-4 border-b border-red-800">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-red-300">Class Component (Legacy)</h3>
                    <span className="px-3 py-1 rounded-full bg-red-900/30 text-red-300 text-sm">
                      Pre-2019 Style
                    </span>
                  </div>
                </div>
                <div className="bg-gray-900 p-6">
                  <pre className="text-sm text-gray-300 overflow-x-auto">
{`import React from 'react';

class StudentCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      studentName: 'Swadeep'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log('Component mounted');
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log('Count updated');
    }
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <h2>{this.state.studentName}: {this.state.count}</h2>
        <button onClick={this.handleClick}>
          Increment Attendance
        </button>
      </div>
    );
  }
}`}</pre>
                  <div className="mt-4 p-4 rounded-lg bg-red-900/20 border border-red-800">
                    <h4 className="font-semibold text-red-300 mb-2">Class Component Characteristics:</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• Requires constructor and super() calls</li>
                      <li>• Manual binding of 'this' for event handlers</li>
                      <li>• Lifecycle methods split logic</li>
                      <li>• More boilerplate code</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Function Component Example */}
              <div className={clsx(
                "rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.01]",
                "border border-green-800",
                "hover:shadow-xl hover:shadow-green-900/20"
              )}>
                <div className="bg-green-900/50 px-6 py-4 border-b border-green-800">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-green-300">Function Component (Modern)</h3>
                    <span className="px-3 py-1 rounded-full bg-green-900/30 text-green-300 text-sm">
                      React 19 Style
                    </span>
                  </div>
                </div>
                <div className="bg-gray-900 p-6">
                  <pre className="text-sm text-gray-300 overflow-x-auto">
{`import { useState, useEffect } from 'react';

function StudentCounter() {
  const [count, setCount] = useState(0);
  const [studentName, setStudentName] = useState('Swadeep');

  useEffect(() => {
    console.log('Component mounted');
    
    return () => {
      console.log('Component cleanup');
    };
  }, []);

  useEffect(() => {
    console.log('Count updated:', count);
  }, [count]);

  const handleClick = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <h2>{studentName}: {count}</h2>
      <button onClick={handleClick}>
        Increment Attendance
      </button>
    </div>
  );
}`}</pre>
                  <div className="mt-4 p-4 rounded-lg bg-green-900/20 border border-green-800">
                    <h4 className="font-semibold text-green-300 mb-2">Function Component Advantages:</h4>
                    <ul className="text-sm text-gray-400 space-y-1">
                      <li>• No 'this' binding issues</li>
                      <li>• Logic organized by concern with hooks</li>
                      <li>• Less boilerplate, more readable</li>
                      <li>• Easier to test and reuse</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why the Shift Happened */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-yellow-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">🔍</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Why the Shift from Class to Function Components?
              </h2>
              <p className="text-gray-400 mt-2">
                Understanding the technical and practical reasons behind this evolution
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Problems with Class Components */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-300 hover:scale-[1.01]",
                "border border-red-800",
                "bg-gradient-to-br from-gray-800 to-gray-900",
                "hover:shadow-xl hover:shadow-red-900/20"
              )}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-red-900/30 flex items-center justify-center text-2xl mr-4">
                    ⚠️
                  </div>
                  <h3 className="text-xl font-semibold text-red-300">Problems with Class Components</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-sm text-red-300">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-1">Wrapper Hell</h4>
                      <p className="text-gray-400 text-sm">
                        HOCs and render props created deep nesting. Like Abhronila's notes inside folders inside drawers.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-sm text-red-300">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-1">'this' Confusion</h4>
                      <p className="text-gray-400 text-sm">
                        Beginners in Barrackpore struggled with binding. Which 'this' refers to what? Constant confusion.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-sm text-red-300">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-1">Lifecycle Spaghetti</h4>
                      <p className="text-gray-400 text-sm">
                        Related logic scattered across different methods. Like Tuhina's study schedule split across multiple notebooks.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Solutions with Function Components */}
              <div className={clsx(
                "rounded-xl p-6 transition-all duration-300 hover:scale-[1.01]",
                "border border-green-800",
                "bg-gradient-to-br from-gray-800 to-gray-900",
                "hover:shadow-xl hover:shadow-green-900/20"
              )}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-900/30 flex items-center justify-center text-2xl mr-4">
                    ✅
                  </div>
                  <h3 className="text-xl font-semibold text-green-300">Solutions with Function Components</h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-sm text-green-300">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-1">Custom Hooks</h4>
                      <p className="text-gray-400 text-sm">
                        Extract and reuse logic easily. Like Swadeep creating reusable study templates for different subjects.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-sm text-green-300">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-1">No 'this' Binding</h4>
                      <p className="text-gray-400 text-sm">
                        Functions close over values naturally. What you see is what you get - simpler mental model.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-sm text-green-300">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-1">Logic Colocation</h4>
                      <p className="text-gray-400 text-sm">
                        Related code stays together with useEffect. All attendance logic in one place, not scattered.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Real World Analogy */}
            <div className={clsx(
              "rounded-xl p-6 transition-all duration-300",
              "border border-blue-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center text-2xl mr-4">
                  🏫
                </div>
                <h3 className="text-xl font-semibold text-blue-300">School System Analogy</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">Old System (Class Components):</h4>
                  <p className="text-gray-400">
                    Each classroom (component) had separate registers for attendance, marks, and notes. 
                    Teachers needed to check multiple books (lifecycle methods) and remember which book was for what.
                    Moving students between classes was complicated.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-200 mb-3">New System (Function Components):</h4>
                  <p className="text-gray-400">
                    One digital system tracks everything. Custom hooks let teachers create templates for 
                    different subjects. All information about a student is in one place. Debangshu can easily 
                    share attendance patterns between classrooms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* React 19 Preview */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.8s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-indigo-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">🚀</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                React 19: The Modern Era
              </h2>
              <p className="text-gray-400 mt-2">
                Where React is headed - Less boilerplate, more power
              </p>
            </div>
          </div>

          <div className={clsx(
            "rounded-2xl p-8 transition-all duration-300",
            "border border-purple-800",
            "bg-gradient-to-br from-gray-800 to-gray-900",
            "hover:shadow-xl hover:shadow-purple-900/20"
          )}>
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-3xl text-white mr-6">
                ⚡
              </div>
              <div>
                <h3 className="text-2xl font-bold text-purple-400">React 19 - What's New</h3>
                <p className="text-gray-400">Focus on developer experience and performance</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-200 mb-4">Key Innovations:</h4>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-purple-300">①</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-purple-300">Actions</h5>
                      <p className="text-gray-400 text-sm">
                        Handle form submissions and data mutations with built-in pending states. 
                        Like automatic loading indicators for Ichapur school portal submissions.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-purple-300">②</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-purple-300">Document Metadata</h5>
                      <p className="text-gray-400 text-sm">
                        Set title, meta tags from components. No more external libraries for SEO in Shyamnagar business sites.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-purple-300">③</span>
                    </div>
                    <div>
                      <h5 className="font-semibold text-purple-300">Asset Loading</h5>
                      <p className="text-gray-400 text-sm">
                        Fonts, stylesheets, and scripts load optimally. Like pre-loading study materials before class starts.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-200 mb-4">What It Means for You:</h4>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-purple-900/20 border border-purple-800">
                    <h5 className="font-semibold text-purple-300 mb-2">For Beginners:</h5>
                    <p className="text-gray-400 text-sm">
                      Start with function components and hooks - that's the modern React. Class components are legacy knowledge.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                    <h5 className="font-semibold text-blue-300 mb-2">For Professionals:</h5>
                    <p className="text-gray-400 text-sm">
                      Understand the evolution to make better architectural decisions and mentor junior developers effectively.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                    <h5 className="font-semibold text-green-300 mb-2">For Career Growth:</h5>
                    <p className="text-gray-400 text-sm">
                      Knowing React's evolution shows deep understanding - valuable in Kolkata/Naihati tech interviews.
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
                      Why Understanding Evolution Matters:
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      When I teach students in Barrackpore or Shyamnagar, I emphasize that learning React's evolution 
                      is like understanding a language's history. You don't need to speak Old English, but knowing how 
                      English evolved helps you use it better today.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-yellow-900/30 flex items-center justify-center mr-3">💡</span>
                        Professional Advice:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">1</span>
                          </div>
                          <span>Learn modern React (hooks) but understand class components to maintain legacy code</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">2</span>
                          </div>
                          <span>When you see class components in old tutorials, mentally translate them to hooks</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">3</span>
                          </div>
                          <span>React's evolution shows the importance of adapting - a crucial skill in tech</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center mr-3">⚠️</span>
                        Common Pitfalls:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>Don't learn class components in depth - they're legacy. Focus time on hooks.</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>Don't ignore React's evolution - it explains "why" things work the way they do</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>Don't assume old tutorials are useless - understand the concepts, update the syntax</span>
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
                      I've watched programming languages and frameworks evolve for decades. React's journey from 
                      class to function components is one of the cleanest transitions I've seen. It shows how 
                      good engineering prioritizes developer experience. When Abhronila asks "why hooks?", 
                      I show her the evolution - the "why" becomes clear.
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-500">
                      <p>📧 sukantahui@codernaccotax.co.in | 📱 7003756860</p>
                      <p>Teaching evolution of technology since 1997</p>
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
              📋 Topic 2 Checklist
            </h3>
            
            <div className="space-y-4">
              {[
                "Understand React's evolution from 2013 to 2024",
                "Know why class components were replaced by function components",
                "Recognize key React versions and their significance",
                "Understand the problems hooks solved (wrapper hell, 'this' binding)",
                "Be able to convert simple class components to function components",
                "Know React 19's key features and direction",
                "Understand that class components are legacy but still exist in old codebases",
                "Appreciate how React's evolution improves developer experience"
              ].map((item, index) => (
                <div
                  key={index}
                  className={clsx(
                    "flex items-start p-4 rounded-lg transition-all duration-300",
                    "border border-gray-700",
                    "hover:bg-gray-800",
                    "hover:shadow-md hover:border-purple-700"
                  )}
                >
                  <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-purple-300">{index + 1}</span>
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
                Next: What changed in React 19 (high-level, beginner-friendly overview)
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-400">
            <p>© 2024 React Foundations Course. Topic 2: Evolution of React</p>
            <p className="mt-2 text-sm">From Class Components to React 19 - The Complete Journey</p>
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

export default Topic2;