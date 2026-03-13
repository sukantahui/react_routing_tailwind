import { useState } from 'react';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import roadmapData from "../../react19-roadmap.json";

const Topic5 = () => {
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

  const setupSteps = [
    {
      step: 1,
      title: "Install Node.js & npm",
      icon: "📦",
      color: "from-blue-600 to-cyan-600",
      description: "The foundation for all JavaScript development",
      details: "Node.js includes npm (Node Package Manager) for installing libraries",
      command: "node --version  # Check installation",
      tip: "Students in Barrackpore should download the LTS (Long Term Support) version"
    },
    {
      step: 2,
      title: "Choose a Package Manager",
      icon: "⚡",
      color: "from-purple-600 to-pink-600",
      description: "npm, yarn, or pnpm for managing dependencies",
      details: "npm comes with Node.js, but others might be faster",
      command: "npm --version   # or yarn --version or pnpm --version",
      tip: "Start with npm, explore others once comfortable"
    },
    {
      step: 3,
      title: "Select a Build Tool",
      icon: "🔨",
      color: "from-green-600 to-emerald-700",
      description: "Vite (recommended) or Create React App (legacy)",
      details: "Vite is modern and faster, CRA is being phased out",
      command: "npm create vite@latest",
      tip: "Tuhina from Shyamnagar should use Vite for new projects"
    },
    {
      step: 4,
      title: "Project Setup",
      icon: "🚀",
      color: "from-yellow-600 to-orange-600",
      description: "Create and configure your React project",
      details: "Follow the interactive prompts to set up your project",
      command: "npm create vite@latest my-react-app",
      tip: "Choose React + TypeScript for better development experience"
    },
    {
      step: 5,
      title: "Install Dependencies",
      icon: "📚",
      color: "from-red-600 to-pink-600",
      description: "Download required packages and libraries",
      details: "This creates node_modules folder with all dependencies",
      command: "cd my-react-app && npm install",
      tip: "First install might take a minute - perfect time for a break!"
    },
    {
      step: 6,
      title: "Start Development Server",
      icon: "💻",
      color: "from-indigo-600 to-purple-700",
      description: "Launch your React application locally",
      details: "This runs a local server with hot reloading",
      command: "npm run dev",
      tip: "Keep this terminal open while developing"
    }
  ];

  const packageManagers = [
    {
      name: "npm",
      icon: "📦",
      color: "bg-red-900/30 text-red-300 border-red-800",
      pros: ["Comes with Node.js", "No extra installation", "Great for beginners"],
      cons: ["Can be slower", "Larger node_modules", "Flat dependency tree issues"],
      command: "npm install package-name"
    },
    {
      name: "yarn",
      icon: "🧶",
      color: "bg-blue-900/30 text-blue-300 border-blue-800",
      pros: ["Faster installs", "Deterministic installs", "Workspaces feature"],
      cons: ["Extra installation", "Different commands", "Two lock files possible"],
      command: "yarn add package-name"
    },
    {
      name: "pnpm",
      icon: "⚡",
      color: "bg-yellow-900/30 text-yellow-300 border-yellow-800",
      pros: ["Extremely fast", "Disk space efficient", "Strict package isolation"],
      cons: ["Newer, less adoption", "Different structure", "Learning curve"],
      command: "pnpm add package-name"
    }
  ];

  const commonIssues = [
    {
      problem: "Node.js not found",
      solution: "Download and install Node.js from official website",
      fix: "Restart terminal after installation"
    },
    {
      problem: "Permission errors",
      solution: "Run commands without sudo or fix permissions",
      fix: "Use nvm (Node Version Manager) for better permission management"
    },
    {
      problem: "Slow npm install",
      solution: "Clear npm cache or use different package manager",
      fix: "npm cache clean --force"
    },
    {
      problem: "Port already in use",
      solution: "Change development server port",
      fix: "Modify package.json scripts or use --port flag"
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
                <p className="text-sm text-gray-500 dark:text-gray-400">Topic 5: Setting up React Environment</p>
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
                  ⚙️
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    Your React Workshop
                  </h2>
                  <p className="text-xl text-gray-300">
                    Setting up the perfect development environment
                  </p>
                </div>
              </div>
              
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                Think of setting up React like preparing a science lab for Debangshu. 
                You need the right tools (Node.js), proper setup (Vite), and organized 
                workspace (project structure). Get this right, and building becomes smooth.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Node.js Foundation
                </span>
                <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Vite Modern Tooling
                </span>
                <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Professional Setup
                </span>
              </div>
            </div>
            
            {/* Animated Setup SVG */}
            <div className="absolute right-8 top-8 opacity-10">
              <svg width="180" height="180" viewBox="0 0 200 200" className="animate-[float_6s_ease-in-out_infinite]">
                <rect x="50" y="50" width="100" height="100" rx="10" stroke="currentColor" strokeWidth="2" fill="none" />
                <circle cx="100" cy="70" r="8" fill="#3B82F6">
                  <animate attributeName="cy" from="70" to="130" dur="3s" repeatCount="indefinite" />
                </circle>
                <rect x="70" y="80" width="60" height="40" rx="5" fill="#10B981" opacity="0.7">
                  <animate attributeName="width" from="60" to="40" dur="2s" repeatCount="indefinite" />
                </rect>
                <path d="M60,140 L140,140" stroke="#8B5CF6" strokeWidth="2">
                  <animate attributeName="d" from="M60,140 L140,140" to="M60,140 L140,120" dur="2.5s" repeatCount="indefinite" />
                </path>
              </svg>
            </div>
          </div>
        </section>

        {/* Complete Setup Guide */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">📋</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Complete Setup Guide
              </h2>
              <p className="text-gray-400 mt-2">
                Step-by-step instructions for students in Barrackpore, Shyamnagar, Ichapur
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {setupSteps.map((step, index) => (
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
                      `bg-gradient-to-br ${step.color} text-white`
                    )}>
                      {step.icon}
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <span className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-sm font-medium mr-3">
                          Step {step.step}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-100">{step.title}</h3>
                      </div>
                      <p className="text-gray-400">{step.description}</p>
                    </div>
                  </div>
                  
                  <div className="px-4 py-2 rounded-full bg-gray-700 text-gray-300 text-sm font-medium">
                    {index === 0 ? "Foundation" : index === 5 ? "Launch" : "Setup"}
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                    <h4 className="font-semibold text-gray-200 mb-2">Details:</h4>
                    <p className="text-gray-400 text-sm">{step.details}</p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                    <h4 className="font-semibold text-gray-200 mb-2">Command:</h4>
                    <div className="font-mono text-sm text-green-300 bg-black/30 p-2 rounded">
                      {step.command}
                    </div>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                    <h4 className="font-semibold text-blue-300 mb-2">Student Tip:</h4>
                    <p className="text-gray-400 text-sm">{step.tip}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Package Manager Comparison */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Package Manager Showdown
              </h2>
              <p className="text-gray-400 mt-2">
                npm vs yarn vs pnpm - Which should Abhronila choose?
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {packageManagers.map((pm, index) => (
              <div 
                key={index}
                className={clsx(
                  "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
                  "border",
                  pm.color,
                  "bg-gradient-to-br from-gray-800 to-gray-900",
                  "hover:shadow-xl"
                )}
              >
                <div className="flex items-center mb-6">
                  <div className="text-3xl mr-4">{pm.icon}</div>
                  <h3 className="text-2xl font-bold">{pm.name}</h3>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-200 mb-2">Install Command:</h4>
                  <div className="font-mono text-sm bg-black/30 p-2 rounded text-green-300">
                    {pm.command}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-green-300 mb-2">Pros:</h4>
                    <ul className="space-y-1">
                      {pm.pros.map((pro, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-400">
                          <span className="text-green-400 mr-2">✓</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-300 mb-2">Cons:</h4>
                    <ul className="space-y-1">
                      {pm.cons.map((con, i) => (
                        <li key={i} className="flex items-start text-sm text-gray-400">
                          <span className="text-red-400 mr-2">✗</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendation */}
          <div className={clsx(
            "rounded-xl p-6",
            "border border-green-800",
            "bg-gradient-to-br from-gray-800 to-gray-900"
          )}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-900/30 flex items-center justify-center text-2xl mr-4">
                🎯
              </div>
              <h3 className="text-xl font-semibold text-green-300">Recommendation for Students</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-200 mb-2">For Beginners:</h4>
                <p className="text-gray-400">
                  Start with <strong className="text-blue-300">npm</strong>. It comes with Node.js, has the most tutorials, 
                  and works everywhere. Focus on learning React, not package manager nuances.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-200 mb-2">For Advanced Projects:</h4>
                <p className="text-gray-400">
                  Consider <strong className="text-yellow-300">pnpm</strong> for speed and disk space. Especially useful 
                  for Ichapur students with limited SSD space or multiple projects.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Project Structure Explained */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-yellow-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">📁</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Understanding Project Structure
              </h2>
              <p className="text-gray-400 mt-2">
                What all those files and folders mean for Tuhina's school portal
              </p>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-gray-700">
            <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-gray-200">
                Vite React Project Structure
              </h3>
              <p className="text-gray-400 text-sm mt-1">
                After running: <code className="text-green-300">npm create vite@latest school-portal -- --template react-ts</code>
              </p>
            </div>
            <div className="bg-gray-900 p-6">
              <div className="font-mono text-sm">
                <div className="flex items-center text-gray-300 mb-2">
                  <span className="text-blue-300">📁</span>
                  <span className="ml-2">school-portal/</span>
                  <span className="ml-2 text-gray-500 text-xs"># Root project folder</span>
                </div>
                
                <div className="ml-4 space-y-1">
                  <div className="flex items-center text-gray-400">
                    <span className="text-green-300">📄</span>
                    <span className="ml-2">package.json</span>
                    <span className="ml-2 text-gray-500 text-xs"># Project configuration and dependencies</span>
                  </div>
                  
                  <div className="flex items-center text-gray-400">
                    <span className="text-green-300">📄</span>
                    <span className="ml-2">tsconfig.json</span>
                    <span className="ml-2 text-gray-500 text-xs"># TypeScript configuration</span>
                  </div>
                  
                  <div className="flex items-center text-gray-400">
                    <span className="text-green-300">📄</span>
                    <span className="ml-2">vite.config.ts</span>
                    <span className="ml-2 text-gray-500 text-xs"># Vite build tool configuration</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300 mt-2">
                    <span className="text-blue-300">📁</span>
                    <span className="ml-2">node_modules/</span>
                    <span className="ml-2 text-gray-500 text-xs"># DON'T TOUCH - auto-generated dependencies</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300 mt-2">
                    <span className="text-blue-300">📁</span>
                    <span className="ml-2">public/</span>
                    <span className="ml-2 text-gray-500 text-xs"># Static assets (images, icons, fonts)</span>
                  </div>
                  
                  <div className="flex items-center text-gray-300">
                    <span className="text-blue-300">📁</span>
                    <span className="ml-2">src/</span>
                    <span className="ml-2 text-gray-500 text-xs"># YOUR CODE GOES HERE!</span>
                  </div>
                  
                  <div className="ml-4 space-y-1">
                    <div className="flex items-center text-gray-400">
                      <span className="text-yellow-300">📄</span>
                      <span className="ml-2">main.tsx</span>
                      <span className="ml-2 text-gray-500 text-xs"># Application entry point</span>
                    </div>
                    
                    <div className="flex items-center text-gray-400">
                      <span className="text-yellow-300">📄</span>
                      <span className="ml-2">App.tsx</span>
                      <span className="ml-2 text-gray-500 text-xs"># Root React component</span>
                    </div>
                    
                    <div className="flex items-center text-gray-400">
                      <span className="text-yellow-300">📄</span>
                      <span className="ml-2">App.css</span>
                      <span className="ml-2 text-gray-500 text-xs"># Styles for App component</span>
                    </div>
                    
                    <div className="flex items-center text-gray-400">
                      <span className="text-yellow-300">📄</span>
                      <span className="ml-2">index.css</span>
                      <span className="ml-2 text-gray-500 text-xs"># Global styles</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Files Explained */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className={clsx(
              "rounded-xl p-6",
              "border border-blue-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-4 text-blue-300">Key Files for Students</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-1">package.json</h4>
                  <p className="text-gray-400 text-sm">
                    Contains project name, version, dependencies, and scripts. 
                    Like the "instruction manual" for your project.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-200 mb-1">src/App.tsx</h4>
                  <p className="text-gray-400 text-sm">
                    Your main React component. This is where Swadeep builds his school portal UI.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-200 mb-1">vite.config.ts</h4>
                  <p className="text-gray-400 text-sm">
                    Configuration for the build tool. Don't modify unless needed for advanced features.
                  </p>
                </div>
              </div>
            </div>

            <div className={clsx(
              "rounded-xl p-6",
              "border border-green-800",
              "bg-gradient-to-br from-gray-800 to-gray-900"
            )}>
              <h3 className="text-xl font-semibold mb-4 text-green-300">What Students Should Do</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-200 mb-1">Work in src/ folder</h4>
                  <p className="text-gray-400 text-sm">
                    Create your components here. Organize with subfolders like components/, pages/, utils/
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-200 mb-1">Ignore node_modules/</h4>
                  <p className="text-gray-400 text-sm">
                    Never edit files here. They're auto-generated. If there's an issue, delete and re-run npm install.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-200 mb-1">Use public/ for assets</h4>
                  <p className="text-gray-400 text-sm">
                    Place images, fonts, icons here. Reference them as /logo.png in your code.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Issues & Solutions */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.8s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-red-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Common Setup Issues
              </h2>
              <p className="text-gray-400 mt-2">
                Problems students face and how to solve them
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {commonIssues.map((issue, index) => (
              <div 
                key={index}
                className={clsx(
                  "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
                  "border border-red-800",
                  "bg-gradient-to-br from-gray-800 to-gray-900",
                  "hover:shadow-xl hover:shadow-red-900/20"
                )}
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-4">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-red-300">{issue.problem}</h3>
                </div>
                
                <div className="ml-14">
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-200 mb-2">Solution:</h4>
                    <p className="text-gray-400">{issue.solution}</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-gray-900 border border-gray-700">
                    <h4 className="font-semibold text-green-300 mb-1">Quick Fix:</h4>
                    <p className="text-gray-400 text-sm">{issue.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Prevention Tips */}
          <div className={clsx(
            "mt-8 rounded-xl p-6",
            "border border-green-800",
            "bg-gradient-to-br from-gray-800 to-gray-900"
          )}>
            <h3 className="text-xl font-semibold mb-4 text-green-300">Prevention Tips for Students</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                <h4 className="font-semibold text-green-300 mb-2">1. Use nvm</h4>
                <p className="text-gray-400 text-sm">
                  Node Version Manager lets you switch Node.js versions easily. Prevents version conflicts.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                <h4 className="font-semibold text-blue-300 mb-2">2. Read Errors Carefully</h4>
                <p className="text-gray-400 text-sm">
                  Error messages usually tell you exactly what's wrong. Don't panic - read them.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-purple-900/20 border border-purple-800">
                <h4 className="font-semibold text-purple-300 mb-2">3. Google is Your Friend</h4>
                <p className="text-gray-400 text-sm">
                  Someone has solved your problem before. Copy-paste error messages into search.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Verification Checklist */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_1s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-green-900/30 flex items-center justify-center mr-4">
              <span className="text-2xl">✅</span>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Setup Verification Checklist
              </h2>
              <p className="text-gray-400 mt-2">
                Is Debangshu's React environment ready? Let's check!
              </p>
            </div>
          </div>

          <div className={clsx(
            "rounded-xl p-6",
            "border border-blue-800",
            "bg-gradient-to-br from-gray-800 to-gray-900"
          )}>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-300">Terminal Verification</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                    <h4 className="font-semibold text-gray-200 mb-2">1. Check Node.js</h4>
                    <div className="font-mono text-sm text-green-300 mb-2">node --version</div>
                    <p className="text-gray-400 text-sm">
                      Should show v18.x or v20.x (LTS versions)
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                    <h4 className="font-semibold text-gray-200 mb-2">2. Check npm</h4>
                    <div className="font-mono text-sm text-green-300 mb-2">npm --version</div>
                    <p className="text-gray-400 text-sm">
                      Should show version 9.x or 10.x
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                    <h4 className="font-semibold text-gray-200 mb-2">3. Create Test Project</h4>
                    <div className="font-mono text-sm text-green-300 mb-2">npm create vite@latest test-app -- --template react</div>
                    <p className="text-gray-400 text-sm">
                      Should create project without errors
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 text-green-300">Browser Verification</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                    <h4 className="font-semibold text-gray-200 mb-2">4. Start Development Server</h4>
                    <div className="font-mono text-sm text-green-300 mb-2">cd test-app && npm run dev</div>
                    <p className="text-gray-400 text-sm">
                      Should show "Local: http://localhost:5173"
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                    <h4 className="font-semibold text-gray-200 mb-2">5. Open in Browser</h4>
                    <div className="font-mono text-sm text-green-300 mb-2">Open http://localhost:5173</div>
                    <p className="text-gray-400 text-sm">
                      Should show React logo and "Hello World" message
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                    <h4 className="font-semibold text-gray-200 mb-2">6. Test Hot Reload</h4>
                    <p className="text-gray-400 text-sm">
                      Edit src/App.tsx, save, browser should update automatically
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 rounded-lg bg-green-900/20 border border-green-800">
              <h4 className="font-semibold text-green-300 mb-2">✅ All Good? Congratulations!</h4>
              <p className="text-gray-400">
                Your React environment is properly set up. Students in Naihati can now start building 
                their school portal projects. If any step fails, revisit the "Common Issues" section.
              </p>
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
                      The Setup Mindset for Students:
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      Setting up React is like preparing a cooking station before making biryani. 
                      Tuhina wouldn't start cooking without having all ingredients and tools ready. 
                      Similarly, proper setup prevents countless errors later. A well-set environment 
                      lets students focus on learning React, not fighting with tools.
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
                          <span>Do live setup demos - students learn by watching</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">2</span>
                          </div>
                          <span>Create setup videos for students in Shyamnagar to follow</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">3</span>
                          </div>
                          <span>Emphasize that setup is a one-time investment</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center mr-3">⚠️</span>
                        Common Student Frustrations:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"It works on teacher's computer but not mine" → Usually Node.js version mismatch</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"Too many errors" → Often due to skipping setup steps</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"Where do I write code?" → Confusion about project structure</span>
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
                      I've seen students spend weeks stuck because of poor setup. Abhronila once 
                      spent 3 days debugging only to find she had Node.js v12 instead of v18. 
                      That's why I emphasize verification. A proper setup is like a well-tuned 
                      instrument - it makes learning music (React) possible. Take time to set up 
                      correctly, and the rest of the journey becomes smoother.
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-500">
                      <p>📧 sukantahui@codernaccotax.co.in | 📱 7003756860</p>
                      <p>Teaching development environment setup since 1997</p>
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
              📋 Topic 5 Checklist
            </h3>
            
            <div className="space-y-4">
              {[
                "Install Node.js LTS version and verify with node --version",
                "Understand the difference between npm, yarn, and pnpm",
                "Create a React project using Vite (not Create React App)",
                "Navigate and understand the project structure",
                "Start development server with npm run dev",
                "Verify setup by seeing React app in browser",
                "Know common issues and their solutions",
                "Understand which files/folders to work in vs ignore"
              ].map((item, index) => (
                <div
                  key={index}
                  className={clsx(
                    "flex items-start p-4 rounded-lg transition-all duration-300",
                    "border border-gray-700",
                    "hover:bg-gray-800",
                    "hover:shadow-md hover:border-green-700"
                  )}
                >
                  <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <span className="text-green-300">{index + 1}</span>
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
                Next: Why Vite is preferred over Create React App (CRA status explained)
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-400">
            <p>© 2024 React Foundations Course. Topic 5: Setting up React Environment</p>
            <p className="mt-2 text-sm">Complete guide for students to set up their development workspace</p>
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

export default Topic5;