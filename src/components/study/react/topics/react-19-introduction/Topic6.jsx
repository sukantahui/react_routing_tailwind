import { useState } from 'react';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import roadmapData from "../../react19-roadmap.json";
import { useNavigate } from "react-router-dom";

const Topic6 = () => {
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

  const comparisonData = [
    {
      category: "Development Speed",
      vite: { score: 5, description: "Instant server start, ~50ms" },
      cra: { score: 2, description: "Slow server start, ~20s" },
      impact: "Tuhina spends less time waiting, more time coding"
    },
    {
      category: "Build Performance",
      vite: { score: 5, description: "ESM-based, extremely fast" },
      cra: { score: 3, description: "Webpack-based, slow builds" },
      impact: "Debangshu's school portal builds in seconds, not minutes"
    },
    {
      category: "Configuration",
      vite: { score: 4, description: "Sensible defaults, easy to configure" },
      cra: { score: 2, description: "Complex eject process, hard to customize" },
      impact: "Swadeep can customize build without ejecting"
    },
    {
      category: "Modern Features",
      vite: { score: 5, description: "Built-in TypeScript, CSS Modules, etc." },
      cra: { score: 3, description: "Requires additional setup" },
      impact: "Abhronila gets modern features out of the box"
    },
    {
      category: "Bundle Size",
      vite: { score: 4, description: "Optimized code splitting" },
      cra: { score: 3, description: "Larger initial bundles" },
      impact: "Faster loading for Ichapur students with slow internet"
    },
    {
      category: "Learning Curve",
      vite: { score: 4, description: "Simple configuration" },
      cra: { score: 3, description: "Complex Webpack config" },
      impact: "Easier for Barrackpore beginners to understand"
    }
  ];

  const viteFeatures = [
    {
      feature: "ES Module Native",
      icon: "⚡",
      color: "from-blue-600 to-cyan-600",
      description: "Uses native browser ES modules during development",
      benefit: "No bundling during dev = instant updates"
    },
    {
      feature: "Hot Module Replacement",
      icon: "🔥",
      color: "from-red-600 to-orange-600",
      description: "Updates modules without full page reload",
      benefit: "See changes instantly while coding"
    },
    {
      feature: "Pre-configured",
      icon: "📦",
      color: "from-green-600 to-emerald-700",
      description: "TypeScript, PostCSS, JSX, CSS Modules ready",
      benefit: "Start coding immediately, no setup needed"
    },
    {
      feature: "Optimized Production",
      icon: "🚀",
      color: "from-purple-600 to-pink-600",
      description: "Rollup-based production builds",
      benefit: "Smaller, faster production bundles"
    }
  ];

  const migrationSteps = [
    {
      step: 1,
      title: "Create New Vite Project",
      command: "npm create vite@latest my-school-portal -- --template react-ts",
      note: "Start fresh - don't try to migrate existing CRA projects"
    },
    {
      step: 2,
      title: "Copy Source Code",
      command: "cp -r old-cra-project/src/* new-vite-project/src/",
      note: "Move your components, but not configuration files"
    },
    {
      step: 3,
      title: "Update Dependencies",
      command: "Check package.json for compatibility",
      note: "Some CRA-specific packages won't be needed"
    },
    {
      step: 4,
      title: "Test & Deploy",
      command: "npm run dev && npm run build",
      note: "Verify everything works, then deploy as usual"
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
                <p className="text-sm text-gray-500 dark:text-gray-400">Topic 6: Vite vs Create React App</p>
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
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-green-600 flex items-center justify-center text-3xl text-white mr-6">
                  ⚡
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    Vite vs Create React App
                  </h2>
                  <p className="text-xl text-gray-300">
                    Why modern React development switched to Vite
                  </p>
                </div>
              </div>
              
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                Think of CRA as an old, reliable school bus and Vite as a high-speed bullet train. 
                Both get Swadeep to school, but one is faster, more efficient, and designed for today's needs. 
                CRA served us well, but Vite is the future.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-red-900/30 text-red-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  CRA: Legacy Tool
                </span>
                <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Vite: Modern Solution
                </span>
                <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Official Recommendation
                </span>
              </div>
            </div>
            
            {/* Animated Speed Comparison */}
            <div className="absolute right-8 top-8 opacity-10">
              <svg width="200" height="150" viewBox="0 0 200 150" className="animate-[float_6s_ease-in-out_infinite]">
                {/* Slow bus (CRA) */}
                <rect x="20" y="80" width="50" height="25" rx="5" fill="#EF4444" opacity="0.8">
                  <animate attributeName="x" from="20" to="130" dur="8s" repeatCount="indefinite" />
                </rect>
                <circle cx="30" cy="105" r="8" fill="#991B1B">
                  <animate attributeName="cx" from="30" to="140" dur="8s" repeatCount="indefinite" />
                </circle>
                <circle cx="60" cy="105" r="8" fill="#991B1B">
                  <animate attributeName="cx" from="60" to="170" dur="8s" repeatCount="indefinite" />
                </circle>
                <text x="45" y="75" textAnchor="middle" fontSize="10" fill="#EF4444">CRA</text>
                
                {/* Fast train (Vite) */}
                <rect x="20" y="40" width="40" height="20" rx="5" fill="#10B981" opacity="0.8">
                  <animate attributeName="x" from="20" to="160" dur="2s" repeatCount="indefinite" />
                </rect>
                <circle cx="30" cy="60" r="6" fill="#047857">
                  <animate attributeName="cx" from="30" to="170" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="50" cy="60" r="6" fill="#047857">
                  <animate attributeName="cx" from="50" to="190" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="40" y="35" textAnchor="middle" fontSize="10" fill="#10B981">Vite</text>
              </svg>
            </div>
          </div>
        </section>

        {/* The CRA Legacy Story */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-red-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">📜</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Create React App: The Legacy Story
              </h2>
              <p className="text-gray-400 mt-2">
                Understanding why CRA was great, and why it's being retired
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* The Good Times */}
            <div className={clsx(
              "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
              "border border-green-800",
              "bg-gradient-to-br from-gray-800 to-gray-900",
              "hover:shadow-xl hover:shadow-green-900/20"
            )}>
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-xl bg-green-900/30 flex items-center justify-center text-2xl mr-4">
                  👍
                </div>
                <h3 className="text-xl font-semibold text-green-300">Why CRA Was Revolutionary (2016-2020)</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <span className="text-sm text-green-300">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-1">Zero Configuration</h4>
                    <p className="text-gray-400 text-sm">
                      Beginners in Barrackpore could start React without learning Webpack
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <span className="text-sm text-green-300">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-1">Official Tooling</h4>
                    <p className="text-gray-400 text-sm">
                      Backed by Facebook (Meta), gave confidence to enterprise teams
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <span className="text-sm text-green-300">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-1">Community Standard</h4>
                    <p className="text-gray-400 text-sm">
                      Everyone used it, so tutorials and help were readily available
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                <p className="text-gray-400 text-sm">
                  <strong>For Tuhina in 2018:</strong> CRA was perfect. It hid complexity so she could focus on learning React basics.
                </p>
              </div>
            </div>

            {/* The Problems Emerge */}
            <div className={clsx(
              "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
              "border border-red-800",
              "bg-gradient-to-br from-gray-800 to-gray-900",
              "hover:shadow-xl hover:shadow-red-900/20"
            )}>
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-xl bg-red-900/30 flex items-center justify-center text-2xl mr-4">
                  ⚠️
                </div>
                <h3 className="text-xl font-semibold text-red-300">Why CRA Became Problematic (2021-2024)</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <span className="text-sm text-red-300">✗</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-1">Slow Development Server</h4>
                    <p className="text-gray-400 text-sm">
                      Waiting 20-30 seconds for dev server to start frustrated Debangshu
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <span className="text-sm text-red-300">✗</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-1">Outdated Dependencies</h4>
                    <p className="text-gray-400 text-sm">
                      Webpack 4 when Webpack 5 was available, causing compatibility issues
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                    <span className="text-sm text-red-300">✗</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-1">Maintenance Issues</h4>
                    <p className="text-gray-400 text-sm">
                      Meta stopped active development, leaving security vulnerabilities
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                <p className="text-gray-400 text-sm">
                  <strong>For Swadeep in 2024:</strong> CRA causes more problems than it solves. It's like using Windows XP today.
                </p>
              </div>
            </div>
          </div>

          {/* Official Status */}
          <div className={clsx(
            "mt-8 rounded-xl p-6",
            "border border-yellow-800",
            "bg-gradient-to-br from-gray-800 to-gray-900"
          )}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-900/30 flex items-center justify-center text-2xl mr-4">
                🚨
              </div>
              <h3 className="text-xl font-semibold text-yellow-300">Official Status (2024)</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-red-900/20 border border-red-800">
                <h4 className="font-semibold text-red-300 mb-2">CRA Status:</h4>
                <p className="text-gray-400 text-sm">Officially in maintenance mode only</p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-900/20 border border-yellow-800">
                <h4 className="font-semibold text-yellow-300 mb-2">Security:</h4>
                <p className="text-gray-400 text-sm">Critical vulnerabilities may not be fixed</p>
              </div>
              <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                <h4 className="font-semibold text-green-300 mb-2">Recommendation:</h4>
                <p className="text-gray-400 text-sm">Use Vite for all new React projects</p>
              </div>
            </div>
          </div>
        </section>

        {/* Vite: The Modern Solution */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">🚀</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Vite: The Modern React Experience
              </h2>
              <p className="text-gray-400 mt-2">
                Why Vite became the new standard for React development
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {viteFeatures.map((feature, index) => (
              <div 
                key={index}
                className={clsx(
                  "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
                  "border border-gray-700",
                  "bg-gradient-to-br from-gray-800 to-gray-900",
                  "hover:shadow-xl"
                )}
              >
                <div className={clsx(
                  "w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-4",
                  `bg-gradient-to-br ${feature.color} text-white`
                )}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-100">
                  {feature.feature}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {feature.description}
                </p>
                <div className="mt-4 p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                  <p className="text-sm text-gray-500">
                    <strong>Benefit:</strong> {feature.benefit}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Speed Demonstration */}
          <div className={clsx(
            "rounded-xl p-6",
            "border border-green-800",
            "bg-gradient-to-br from-gray-800 to-gray-900"
          )}>
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 rounded-xl bg-green-900/30 flex items-center justify-center text-2xl mr-4">
                ⏱️
              </div>
              <h3 className="text-xl font-semibold text-green-300">The Speed Difference in Action</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-red-900/20 border border-red-800">
                <h4 className="font-semibold text-red-300 mb-2">CRA Experience:</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-gray-400 text-sm">Type: npx create-react-app</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-gray-400 text-sm">Wait 2-3 minutes for installation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-gray-400 text-sm">Type: npm start</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-gray-400 text-sm">Wait 20-30 seconds for dev server</span>
                  </div>
                  <div className="mt-2 p-2 rounded bg-gray-900">
                    <p className="text-gray-400 text-sm"><strong>Total wait:</strong> ~3.5 minutes</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                <h4 className="font-semibold text-green-300 mb-2">Vite Experience:</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-gray-400 text-sm">Type: npm create vite@latest</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-gray-400 text-sm">Wait 30-45 seconds for installation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-gray-400 text-sm">Type: npm run dev</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-gray-400 text-sm">Wait &lt;1 second for dev server</span>
                  </div>
                  <div className="mt-2 p-2 rounded bg-gray-900">
                    <p className="text-gray-400 text-sm"><strong>Total wait:</strong> ~45 seconds</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 rounded-lg bg-blue-900/20 border border-blue-800">
              <h4 className="font-semibold text-blue-300 mb-2">What This Means for Students:</h4>
              <p className="text-gray-400">
                Abhronila in Ichapur gets to start coding <strong>5x faster</strong> with Vite. 
                When the dev server starts instantly, she maintains focus and learns more effectively.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Comparison Table */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">📊</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Side-by-Side Comparison
              </h2>
              <p className="text-gray-400 mt-2">
                Detailed comparison for technical decision making
              </p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-700">
            <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-gray-200">
                Vite vs Create React App: Feature Comparison
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-4 font-semibold text-gray-300">Category</th>
                    <th className="text-left p-4 font-semibold text-green-300">Vite</th>
                    <th className="text-left p-4 font-semibold text-red-300">Create React App</th>
                    <th className="text-left p-4 font-semibold text-blue-300">Impact on Students</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr 
                      key={index}
                      className={clsx(
                        "border-b border-gray-800",
                        "transition-all duration-300 hover:bg-gray-800/50"
                      )}
                    >
                      <td className="p-4 font-medium text-gray-200">{row.category}</td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center text-green-300 font-bold text-lg mr-3">
                            {row.vite.score}/5
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">{row.vite.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-red-900/30 flex items-center justify-center text-red-300 font-bold text-lg mr-3">
                            {row.cra.score}/5
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">{row.cra.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-gray-400">{row.impact}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendation Summary */}
          <div className={clsx(
            "mt-8 rounded-xl p-6",
            "border border-green-800",
            "bg-gradient-to-br from-gray-800 to-gray-900"
          )}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-900/30 flex items-center justify-center text-2xl mr-4">
                🎯
              </div>
              <h3 className="text-xl font-semibold text-green-300">Clear Recommendation for Students</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 rounded-lg bg-red-900/20 border border-red-800">
                <h4 className="font-semibold text-red-300 mb-2">For Existing CRA Projects:</h4>
                <p className="text-gray-400 text-sm">
                  If it works, don't break it. But don't add new features to CRA projects.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                <h4 className="font-semibold text-green-300 mb-2">For New Projects:</h4>
                <p className="text-gray-400 text-sm">
                  Always use Vite. This includes school portals, personal projects, assignments.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                <h4 className="font-semibold text-blue-300 mb-2">For Learning:</h4>
                <p className="text-gray-400 text-sm">
                  Learn Vite setup. Old CRA tutorials still teach React concepts, but use Vite for practice.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Migration Guide */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.8s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-yellow-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">🔄</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Migration Guide for Students
              </h2>
              <p className="text-gray-400 mt-2">
                What to do if you have existing CRA projects or find old tutorials
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {migrationSteps.map((step, index) => (
              <div 
                key={index}
                className={clsx(
                  "rounded-xl p-6 transition-all duration-300 hover:scale-[1.01]",
                  "border border-gray-700",
                  "bg-gradient-to-br from-gray-800 to-gray-900"
                )}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-4">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold text-blue-300">{step.title}</h3>
                </div>
                
                <div className="ml-14">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-200 mb-2">Command:</h4>
                    <div className="font-mono text-sm text-green-300 bg-black/30 p-3 rounded">
                      {step.command}
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                    <h4 className="font-semibold text-yellow-300 mb-2">Important Note:</h4>
                    <p className="text-gray-400 text-sm">{step.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Working with Old Tutorials */}
          <div className={clsx(
            "mt-8 rounded-xl p-6",
            "border border-purple-800",
            "bg-gradient-to-br from-gray-800 to-gray-900"
          )}>
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 rounded-xl bg-purple-900/30 flex items-center justify-center text-2xl mr-4">
                📚
              </div>
              <h3 className="text-xl font-semibold text-purple-300">Working with Old CRA Tutorials</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-200 mb-3">Problem:</h4>
                <p className="text-gray-400 mb-4">
                  Most React tutorials from 2018-2022 use CRA. Students in Shyamnagar 
                  follow them and get stuck with outdated setup.
                </p>
                <div className="p-4 rounded-lg bg-red-900/20 border border-red-800">
                  <p className="text-gray-400 text-sm">
                    <strong>Example:</strong> Tutorial says "npx create-react-app" but that gives deprecated warnings.
                  </p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-200 mb-3">Solution:</h4>
                <p className="text-gray-400 mb-4">
                  Follow the React concepts, but use Vite commands instead of CRA commands.
                </p>
                <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                  <p className="text-gray-400 text-sm">
                    <strong>Instead of:</strong> npx create-react-app my-app<br/>
                    <strong>Use:</strong> npm create vite@latest my-app -- --template react
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 rounded-lg bg-blue-900/20 border border-blue-800">
              <h4 className="font-semibold text-blue-300 mb-2">Key Insight for Debangshu:</h4>
              <p className="text-gray-400">
                The tutorial content (components, props, state) is still valid. Only the 
                setup commands are outdated. Create project with Vite, then follow the tutorial.
              </p>
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
                      The Tooling Evolution Lesson:
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      CRA to Vite transition teaches students an important lesson about technology evolution. 
                      Tools that were revolutionary (like CRA in 2016) become legacy. Tuhina must learn not 
                      just React, but how to evaluate and adopt new tools. This skill is more valuable than 
                      memorizing any specific tool's commands.
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
                          <span>Show live comparison - create both projects side by side</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">2</span>
                          </div>
                          <span>Explain the "why" - not just "use Vite because I said so"</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">3</span>
                          </div>
                          <span>Provide migration path for students with existing CRA projects</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center mr-3">⚠️</span>
                        Common Student Confusions:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"But the tutorial uses CRA!" → Concepts transfer, commands update</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"My old project works fine" → Don't break it, but don't extend it</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"Vite looks different" → It's better organized, not worse</span>
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
                      I've taught through many tooling transitions: jQuery to React, Webpack 1 to 2 to 3 to 4 to 5, 
                      and now CRA to Vite. The pattern is always the same. Early adopters benefit from new features, 
                      late adopters struggle with deprecated tools. My advice to students in Barrackpore and Naihati: 
                      Learn to recognize when a tool is becoming legacy. Vite today is where CRA was in 2016 - 
                      the exciting new standard. In 3-4 years, something else will replace Vite. Learn the skill 
                      of tool evaluation, not just tool usage.
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-500">
                      <p>📧 sukantahui@codernaccotax.co.in | 📱 7003756860</p>
                      <p>Teaching tool evolution and adoption strategies since 1997</p>
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
              📋 Topic 6 Checklist
            </h3>
            
            <div className="space-y-4">
              {[
                "Understand why Create React App is now legacy/deprecated",
                "Know the key advantages of Vite over CRA",
                "Be able to create a React project using Vite",
                "Understand the speed difference in development experience",
                "Know how to handle old CRA tutorials with Vite",
                "Recognize when to migrate from CRA to Vite",
                "Understand the security implications of using deprecated tools",
                "Be confident recommending Vite for new React projects"
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
                Next: Creating a React 19 project using Vite
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-400">
            <p>© 2024 React Foundations Course. Topic 6: Vite vs Create React App</p>
            <p className="mt-2 text-sm">Understanding the modern React tooling landscape</p>
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

export default Topic6;