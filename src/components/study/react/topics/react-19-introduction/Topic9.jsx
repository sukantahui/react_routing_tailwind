import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { ArrowRight, Code, Zap, GitBranch, Cpu, Layers, Link as LinkIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { useNavigate } from "react-router-dom";

const Topic9 = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
    const navigate = useNavigate();
    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };
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

  useEffect(() => {
    // Simulate hydration completion for visualization
    const timer = setTimeout(() => setIsHydrationComplete(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const nextFlowStep = () => {
    setFlowStep(prev => Math.min(prev + 1, 6));
  };

  const prevFlowStep = () => {
    setFlowStep(prev => Math.max(prev - 1, 1));
  };

  const entryPoints = {
    main: {
      title: "main.tsx / main.jsx",
      icon: "🎯",
      color: "from-blue-600 to-cyan-600",
      description: "The React application entry point",
      purpose: "Connects React to the DOM and starts the application",
      analogy: "Like turning the key in a car's ignition",
      code: `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 1. Find the HTML element with id="root"
const rootElement = document.getElementById('root')

// 2. Create a React root for that element
const root = createRoot(rootElement!)

// 3. Render the App component inside React's StrictMode
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)`,
      explanation: [
        "Finds the <div id='root'> element in your HTML",
        "Creates a React root using createRoot()",
        "Renders your App component inside StrictMode",
        "This happens ONCE when the page loads"
      ]
    },
    app: {
      title: "App.tsx / App.jsx",
      icon: "🚀",
      color: "from-purple-600 to-pink-600",
      description: "The main component of your application",
      purpose: "Root component that contains your entire app",
      analogy: "Like the main stage where all actors perform",
      code: `import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import StudentList from './components/StudentList'

function App() {
  const [students, setStudents] = useState(['Swadeep', 'Tuhina'])
  const [theme, setTheme] = useState('dark')

  return (
    <div className="app theme-dark">
      <Header 
        title="Barrackpore School Portal"
        onThemeToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
      <main>
        <StudentList 
          students={students}
          onAddStudent={(name) => setStudents([...students, name])}
        />
      </main>
      <footer>
        <p>Welcome to React development!</p>
      </footer>
    </div>
  )
}

export default App`,
      explanation: [
        "Defines the structure of your application",
        "Manages top-level state and data flow",
        "Composes other components together",
        "Re-renders when state changes"
      ]
    },
    index: {
      title: "index.html",
      icon: "🏠",
      color: "from-green-600 to-emerald-700",
      description: "HTML entry point that loads everything",
      purpose: "The HTML file that browsers load first",
      analogy: "Like the foundation of a building",
      code: `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>School Portal - Barrackpore</title>
  </head>
  <body>
    <!-- This is where React takes over -->
    <div id="root"></div>
    
    <!-- Vite injects the script tag here during development -->
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`,
      explanation: [
        "Basic HTML structure that browsers understand",
        "Contains the <div id='root'> element",
        "Links to the main.tsx file via script tag",
        "Vite handles the script injection automatically"
      ]
    }
  };

  const flowSteps = [
    {
      id: 1,
      title: "Browser Requests HTML",
      icon: "🌐",
      color: "from-blue-600 to-cyan-600",
      description: "User navigates to your React app",
      details: "Browser loads index.html from your server",
      visual: "index.html → Browser",
      studentTip: "This happens when Swadeep types localhost:5173 in his browser"
    },
    {
      id: 2,
      title: "HTML Parses & Loads Script",
      icon: "📄",
      color: "from-green-600 to-emerald-700",
      description: "Browser finds and loads main.tsx",
      details: "<script src='/src/main.tsx'> triggers download",
      visual: "Browser → main.tsx",
      studentTip: "The script tag in index.html points to your React entry"
    },
    {
      id: 3,
      title: "React Initializes",
      icon: "⚛️",
      color: "from-purple-600 to-pink-600",
      description: "createRoot() creates React root",
      details: "React takes control of the #root div",
      visual: "main.tsx → createRoot(#root)",
      studentTip: "This is where React 'hooks into' your HTML"
    },
    {
      id: 4,
      title: "App Component Renders",
      icon: "🚀",
      color: "from-yellow-600 to-orange-600",
      description: "Root renders the App component",
      details: "App.tsx executes and returns JSX",
      visual: "createRoot() → <App />",
      studentTip: "Tuhina's App.tsx starts building the UI here"
    },
    {
      id: 5,
      title: "Virtual DOM Created",
      icon: "🌳",
      color: "from-red-600 to-pink-600",
      description: "React builds component tree",
      details: "App renders child components recursively",
      visual: "<App /> → <Header /> → <StudentList /> → ...",
      studentTip: "Each component returns JSX, building a tree"
    },
    {
      id: 6,
      title: "DOM Updated & Hydration",
      icon: "💧",
      color: "from-indigo-600 to-purple-600",
      description: "React updates actual browser DOM",
      details: "Virtual DOM changes applied to real DOM",
      visual: "Virtual DOM → Real DOM (Hydration)",
      studentTip: "The screen updates! Students in Ichapur see the app"
    }
  ];

  const hydrationStages = [
    {
      stage: "Initial HTML",
      content: `<div id="root"></div>`,
      state: "Empty container waiting for React"
    },
    {
      stage: "React Mounts",
      content: `<div id="root">
  <!-- React creating components -->
</div>`,
      state: "React takes control, starts rendering"
    },
    {
      stage: "Components Render",
      content: `<div id="root">
  <div class="app theme-dark">
    <header>School Portal</header>
    <!-- More components -->
  </div>
</div>`,
      state: "App component returns JSX structure"
    },
    {
      stage: "Complete Hydration",
      content: `<div id="root" data-reactroot="">
  <div class="app theme-dark">
    <header>School Portal - Barrackpore</header>
    <main>
      <ul>
        <li>Swadeep</li>
        <li>Tuhina</li>
      </ul>
    </main>
  </div>
</div>`,
      state: "Full interactive UI with event handlers"
    }
  ];

  const commonMistakes = [
    {
      mistake: "Multiple createRoot() calls",
      error: "Warning: You are calling createRoot() on a container that has already been passed to createRoot()",
      cause: "Trying to render React app twice",
      solution: "Call createRoot() only once, store the root variable"
    },
    {
      mistake: "Missing #root element",
      error: "Target container is not a DOM element.",
      cause: "No element with id='root' in index.html",
      solution: "Add <div id='root'></div> to your HTML"
    },
    {
      mistake: "Forgetting to export App",
      error: "'App' is not defined",
      cause: "Missing export default App in App.jsx",
      solution: "Add export default App at end of App.jsx"
    },
    {
      mistake: "Circular imports",
      error: "Cannot access 'ComponentA' before initialization",
      cause: "App imports Header, Header imports App",
      solution: "Break circular dependency, use better architecture"
    }
  ];

  const studentExamples = [
    {
      name: "Swadeep's Attendance System",
      location: "Naihati",
      mainStructure: `createRoot(document.getElementById('root')!).render(
  <AttendanceProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </AttendanceProvider>
)`,
      appStructure: `function App() {
  return (
    <Layout>
      <Dashboard />
      <AttendanceTracker />
      <Reports />
    </Layout>
  )
}`,
      pattern: "Providers wrap App for context"
    },
    {
      name: "Tuhina's Library Portal",
      location: "Shyamnagar",
      mainStructure: `const root = createRoot(document.getElementById('root')!)
root.render(
  <ErrorBoundary>
    <Suspense fallback={<LoadingScreen />}>
      <App />
    </Suspense>
  </ErrorBoundary>
)`,
      appStructure: `function App() {
  const { user } = useAuth()
  
  return user ? (
    <AuthenticatedApp />
  ) : (
    <LoginScreen />
  )
}`,
      pattern: "Conditional rendering in App"
    },
    {
      name: "Abhronila's Quiz Platform",
      location: "Barrackpore",
      mainStructure: `createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)`,
      appStructure: `function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  )
}`,
      pattern: "Router wraps App for navigation"
    }
  ];

  const bestPractices = [
    {
      practice: "Keep main.tsx simple",
      reason: "It should only handle React initialization",
      example: "No components, no logic, just createRoot() and render()",
      tip: "Think of main.tsx as the 'bootstrap' file"
    },
    {
      practice: "App.tsx as composition root",
      reason: "App should compose providers and top-level components",
      example: "Combine ThemeProvider, Router, Layout in App",
      tip: "App is the director, components are actors"
    },
    {
      practice: "Use StrictMode in development",
      reason: "Catches potential problems early",
      example: "<StrictMode> wraps <App /> in main.tsx",
      tip: "Like training wheels for React development"
    },
    {
      practice: "Separate concerns early",
      reason: "Prevents App.tsx from becoming massive",
      example: "Move logic to custom hooks, UI to components",
      tip: "Start with folders: components/, hooks/, utils/"
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
                <Code size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  React Foundations
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Topic 9: Entry Points - main.jsx and App.jsx</p>
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
                  🎯
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    Where React Begins
                  </h2>
                  <p className="text-xl text-gray-300">
                    Understanding main.jsx and App.jsx - The heartbeat of every React application
                  </p>
                </div>
              </div>
              
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                When Debangshu from Naihati runs his React app, two files work together like a relay race: 
                <strong className="text-blue-300"> main.tsx</strong> starts React, then passes the baton to 
                <strong className="text-purple-300"> App.tsx</strong> which builds the entire interface. 
                Today, you'll master this critical handoff.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Entry Point Mastery
                </span>
                <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Visual Flow Diagrams
                </span>
                <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Real Student Code
                </span>
              </div>
            </div>
            
            {/* Animated Entry Points */}
            <div className="absolute right-8 top-8 opacity-10">
              <svg width="200" height="150" viewBox="0 0 200 150" className="animate-[float_6s_ease-in-out_infinite]">
                <rect x="30" y="40" width="60" height="30" rx="5" fill="none" stroke="#3B82F6" strokeWidth="2">
                  <animate attributeName="x" from="30" to="50" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="60" y="58" textAnchor="middle" fontSize="10" fill="#3B82F6">main.tsx</text>
                
                <rect x="110" y="40" width="60" height="30" rx="5" fill="none" stroke="#8B5CF6" strokeWidth="2">
                  <animate attributeName="x" from="110" to="90" dur="2s" repeatCount="indefinite" />
                </rect>
                <text x="140" y="58" textAnchor="middle" fontSize="10" fill="#8B5CF6">App.tsx</text>
                
                <path d="M90,55 L110,55" stroke="#10B981" strokeWidth="2">
                  <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
                </path>
                <polygon points="110,55 105,50 105,60" fill="#10B981">
                  <animate attributeName="points" from="110,55 105,50 105,60" to="110,55 105,50 105,60" dur="1s" repeatCount="indefinite" />
                </polygon>
              </svg>
            </div>
          </div>
        </section>

        {/* Entry Points Comparison */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center mr-4">
              <Zap size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                The Two Entry Points Explained
              </h2>
              <p className="text-gray-400 mt-2">
                main.jsx starts React, App.jsx builds your UI. They have different but complementary roles.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-1 gap-6 mb-8">
            {Object.entries(entryPoints).map(([key, file]) => (
              <div 
                key={key}
                onClick={() => setActiveTab(key)}
                className={clsx(
                  "rounded-xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02]",
                  "border",
                  activeTab === key 
                    ? "border-blue-500 bg-blue-900/20 ring-2 ring-blue-500 ring-opacity-50" 
                    : "border-gray-700 hover:border-gray-600",
                  "bg-gradient-to-br from-gray-800 to-gray-900",
                  "hover:shadow-lg"
                )}
              >
                <div className="flex items-center mb-4">
                  <div className={clsx(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-2xl mr-4",
                    `bg-gradient-to-br ${file.color}`
                  )}>
                    {file.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-100">{file.title}</h3>
                    <p className="text-gray-500">{file.description}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">Purpose:</h4>
                    <p className="text-gray-400 text-sm">{file.purpose}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">Analogy:</h4>
                    <p className="text-gray-400 text-sm italic">"{file.analogy}"</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                    <h4 className="font-semibold text-gray-200 mb-2">Key Responsibilities:</h4>
                    <ul className="space-y-1">
                      {file.explanation.map((item, idx) => (
                        <li key={idx} className="flex items-start text-gray-400 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-2 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* File Content Display */}
          <div className={clsx(
            "rounded-xl p-6",
            "border border-gray-700",
            "bg-gradient-to-br from-gray-800 to-gray-900"
          )}>
            <div className="flex items-center mb-6">
              <div className={clsx(
                "w-10 h-10 rounded-lg flex items-center justify-center mr-3",
                `bg-gradient-to-br ${entryPoints[activeTab].color}`
              )}>
                <span className="text-lg">{entryPoints[activeTab].icon}</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-100">{entryPoints[activeTab].title}</h3>
                <p className="text-gray-500">Complete code with annotations</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-1 gap-6">
              <div>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-200">Code:</h4>
                    <span className="px-2 py-1 rounded bg-gray-800 text-gray-400 text-xs">
                      {activeTab === 'main' ? 'TypeScript' : activeTab === 'app' ? 'React + TypeScript' : 'HTML'}
                    </span>
                  </div>
                  <pre className="text-sm text-gray-300 bg-black p-4 rounded overflow-x-auto max-h-[300px]">
                    {entryPoints[activeTab].code}
                  </pre>
                </div>
              </div>
              
              <div>
                <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700 mb-6">
                  <h4 className="font-semibold text-gray-200 mb-3">Line-by-Line Explanation:</h4>
                  <div className="space-y-3">
                    {activeTab === 'main' && (
                      <>
                        <div className="p-3 rounded bg-gray-800">
                          <div className="font-mono text-green-300 text-sm">import { createRoot } from 'react-dom/client'</div>
                          <p className="text-gray-400 text-xs mt-1">Imports the function that connects React to DOM</p>
                        </div>
                        <div className="p-3 rounded bg-gray-800">
                          <div className="font-mono text-green-300 text-sm">const root = createRoot(rootElement!)</div>
                          <p className="text-gray-400 text-xs mt-1">Creates React root for the #root div (! means non-null assertion)</p>
                        </div>
                        <div className="p-3 rounded bg-gray-800">
                          <div className="font-mono text-green-300 text-sm">{`root.render(<StrictMode><App /></StrictMode>)`}</div>
                          <p className="text-gray-400 text-xs mt-1">Renders App inside StrictMode (catches potential problems)</p>
                        </div>
                      </>
                    )}
                    {activeTab === 'app' && (
                      <>
                        <div className="p-3 rounded bg-gray-800">
                          <div className="font-mono text-green-300 text-sm">function App() {`{ ... }`}</div>
                          <p className="text-gray-400 text-xs mt-1">The App component function - returns JSX</p>
                        </div>
                        <div className="p-3 rounded bg-gray-800">
                          <div className="font-mono text-green-300 text-sm">const [students, setStudents] = useState([])</div>
                          <p className="text-gray-400 text-xs mt-1">State hook - manages data that changes over time</p>
                        </div>
                        <div className="p-3 rounded bg-gray-800">
                          <div className="font-mono text-green-300 text-sm">{"return ( ... )"}</div>
                          <p className="text-gray-400 text-xs mt-1">Returns JSX that describes the UI structure</p>
                        </div>
                      </>
                    )}
                    {activeTab === 'index' && (
                      <>
                        <div className="p-3 rounded bg-gray-800">
                          <div className="font-mono text-green-300 text-sm">{`<div id="root"></div>`}</div>
                          <p className="text-gray-400 text-xs mt-1">The mount point where React takes over</p>
                        </div>
                        <div className="p-3 rounded bg-gray-800">
                          <div className="font-mono text-green-300 text-sm">{`<script type="module" src="/src/main.tsx"></script>`}</div>
                          <p className="text-gray-400 text-xs mt-1">Loads the main.tsx file (handled by Vite)</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                  <h4 className="font-semibold text-blue-300 mb-2">Student Exercise:</h4>
                  <p className="text-gray-400 text-sm">
                    Open your project's {entryPoints[activeTab].title}. Try adding a console.log() at the top. 
                    For main.tsx: <code className="text-green-300">console.log('React is starting!')</code>. 
                    Check browser console after refresh.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The React Boot Process */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center mr-4">
              <GitBranch size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                The React Boot Process Visualized
              </h2>
              <p className="text-gray-400 mt-2">
                Follow the exact sequence from HTML to fully interactive React app
              </p>
            </div>
          </div>

          {/* Flow Navigation */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                {flowSteps.map((step) => (
                  <button
                    key={step.id}
                    onClick={() => setFlowStep(step.id)}
                    className={clsx(
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                      flowStep === step.id
                        ? "bg-blue-600 text-white scale-110"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    )}
                  >
                    {step.id}
                  </button>
                ))}
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={prevFlowStep}
                  disabled={flowStep === 1}
                  className={clsx(
                    "px-4 py-2 rounded-lg font-medium",
                    flowStep === 1
                      ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  )}
                >
                  Previous
                </button>
                <button
                  onClick={nextFlowStep}
                  disabled={flowStep === 6}
                  className={clsx(
                    "px-4 py-2 rounded-lg font-medium",
                    flowStep === 6
                      ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  )}
                >
                  Next Step
                </button>
              </div>
            </div>
          </div>

          {/* Flow Visualization */}
          <div className={clsx(
            "rounded-xl p-6 mb-8",
            "border border-gray-700",
            "bg-gradient-to-br from-gray-800 to-gray-900"
          )}>
            <div className="flex items-center mb-6">
              <div className={clsx(
                "w-16 h-16 rounded-xl flex items-center justify-center text-2xl mr-6",
                `bg-gradient-to-br ${flowSteps[flowStep - 1].color}`
              )}>
                {flowSteps[flowStep - 1].icon}
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <span className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-sm font-medium mr-3">
                    Step {flowStep}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-100">{flowSteps[flowStep - 1].title}</h3>
                </div>
                <p className="text-gray-400">{flowSteps[flowStep - 1].description}</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                <h4 className="font-semibold text-gray-200 mb-2">Technical Details:</h4>
                <p className="text-gray-400 text-sm">{flowSteps[flowStep - 1].details}</p>
              </div>
              
              <div className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                <h4 className="font-semibold text-gray-200 mb-2">Visual Flow:</h4>
                <div className="font-mono text-sm text-green-300 bg-black/30 p-3 rounded">
                  {flowSteps[flowStep - 1].visual}
                </div>
              </div>
              
              <div className="md:col-span-2 p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                <h4 className="font-semibold text-blue-300 mb-2">Student Connection:</h4>
                <p className="text-gray-400 text-sm">{flowSteps[flowStep - 1].studentTip}</p>
              </div>
            </div>
            
            {/* Visual Diagram */}
            <div className="mt-8 p-6 rounded-lg bg-gray-900 border border-gray-700">
              <h4 className="font-semibold text-gray-200 mb-4 text-center">Process Flow Diagram</h4>
              
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
                {/* Step 1 */}
                <div className={clsx(
                  "flex flex-col items-center",
                  flowStep >= 1 ? "opacity-100" : "opacity-50"
                )}>
                  <div className={clsx(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-2",
                    flowStep >= 1 ? "bg-blue-600" : "bg-gray-700"
                  )}>
                    <span className="text-white">1</span>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Browser</div>
                    <div className="text-sm text-gray-300">Loads HTML</div>
                  </div>
                </div>
                
                {/* Arrow */}
                <div className={clsx(
                  "hidden md:block w-16 h-1",
                  flowStep >= 2 ? "bg-green-500" : "bg-gray-700"
                )}></div>
                
                {/* Step 2 */}
                <div className={clsx(
                  "flex flex-col items-center",
                  flowStep >= 2 ? "opacity-100" : "opacity-50"
                )}>
                  <div className={clsx(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-2",
                    flowStep >= 2 ? "bg-green-600" : "bg-gray-700"
                  )}>
                    <span className="text-white">2</span>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Script</div>
                    <div className="text-sm text-gray-300">Loads main.tsx</div>
                  </div>
                </div>
                
                {/* Arrow */}
                <div className={clsx(
                  "hidden md:block w-16 h-1",
                  flowStep >= 3 ? "bg-purple-500" : "bg-gray-700"
                )}></div>
                
                {/* Step 3 */}
                <div className={clsx(
                  "flex flex-col items-center",
                  flowStep >= 3 ? "opacity-100" : "opacity-50"
                )}>
                  <div className={clsx(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-2",
                    flowStep >= 3 ? "bg-purple-600" : "bg-gray-700"
                  )}>
                    <span className="text-white">3</span>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400">React</div>
                    <div className="text-sm text-gray-300">createRoot()</div>
                  </div>
                </div>
                
                {/* Arrow */}
                <div className={clsx(
                  "hidden md:block w-16 h-1",
                  flowStep >= 4 ? "bg-yellow-500" : "bg-gray-700"
                )}></div>
                
                {/* Step 4 */}
                <div className={clsx(
                  "flex flex-col items-center",
                  flowStep >= 4 ? "opacity-100" : "opacity-50"
                )}>
                  <div className={clsx(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-2",
                    flowStep >= 4 ? "bg-yellow-600" : "bg-gray-700"
                  )}>
                    <span className="text-white">4</span>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Render</div>
                    <div className="text-sm text-gray-300">App Component</div>
                  </div>
                </div>
                
                {/* Arrow */}
                <div className={clsx(
                  "hidden md:block w-16 h-1",
                  flowStep >= 5 ? "bg-red-500" : "bg-gray-700"
                )}></div>
                
                {/* Step 5 */}
                <div className={clsx(
                  "flex flex-col items-center",
                  flowStep >= 5 ? "opacity-100" : "opacity-50"
                )}>
                  <div className={clsx(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-2",
                    flowStep >= 5 ? "bg-red-600" : "bg-gray-700"
                  )}>
                    <span className="text-white">5</span>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Build</div>
                    <div className="text-sm text-gray-300">Component Tree</div>
                  </div>
                </div>
                
                {/* Arrow */}
                <div className={clsx(
                  "hidden md:block w-16 h-1",
                  flowStep >= 6 ? "bg-indigo-500" : "bg-gray-700"
                )}></div>
                
                {/* Step 6 */}
                <div className={clsx(
                  "flex flex-col items-center",
                  flowStep >= 6 ? "opacity-100" : "opacity-50"
                )}>
                  <div className={clsx(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-2",
                    flowStep >= 6 ? "bg-indigo-600" : "bg-gray-700"
                  )}>
                    <span className="text-white">6</span>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-400">Update</div>
                    <div className="text-sm text-gray-300">DOM & Hydrate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hydration Visualization */}
          <div className={clsx(
            "rounded-xl p-6",
            "border border-green-800",
            "bg-gradient-to-br from-gray-800 to-gray-900"
          )}>
            <h3 className="text-xl font-semibold mb-6 text-green-300">Hydration Process: From Empty to Interactive</h3>
            
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              {hydrationStages.map((stage, index) => (
                <div 
                  key={index}
                  className={clsx(
                    "rounded-lg p-4 transition-all duration-300",
                    "border",
                    isHydrationComplete && index === 3 
                      ? "border-green-500 bg-green-900/20" 
                      : index <= (isHydrationComplete ? 3 : flowStep - 1)
                      ? "border-gray-700 bg-gray-900/50"
                      : "border-gray-800 bg-gray-900/30 opacity-50"
                  )}
                >
                  <div className="flex items-center mb-3">
                    <div className={clsx(
                      "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                      isHydrationComplete && index === 3 
                        ? "bg-green-600" 
                        : index <= (isHydrationComplete ? 3 : flowStep - 1)
                        ? "bg-blue-600"
                        : "bg-gray-700"
                    )}>
                      <span className="text-white text-sm">{index + 1}</span>
                    </div>
                    <h4 className="font-semibold text-gray-200">{stage.stage}</h4>
                  </div>
                  
                  <pre className="text-xs text-gray-300 bg-black p-3 rounded mb-2 overflow-x-auto">
                    {stage.content}
                  </pre>
                  
                  <p className="text-gray-500 text-xs">{stage.state}</p>
                </div>
              ))}
            </div>
            
            <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
              <h4 className="font-semibold text-green-300 mb-2">Hydration Explained:</h4>
              <p className="text-gray-400 text-sm">
                Hydration is React's process of attaching event listeners and making the initial HTML interactive. 
                When Tuhina clicks a button in her app, hydration made that possible. The #root div starts empty, 
                React fills it, then adds interactivity.
              </p>
            </div>
          </div>
        </section>

        {/* Real Student Examples */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-yellow-900/30 flex items-center justify-center mr-4">
              <Cpu size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                How Students Structure Entry Points
              </h2>
              <p className="text-gray-400 mt-2">
                See real examples from students in Naihati, Shyamnagar, and Barrackpore
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {studentExamples.map((student, index) => (
              <div 
                key={index}
                className={clsx(
                  "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
                  "border border-gray-700",
                  "bg-gradient-to-br from-gray-800 to-gray-900",
                  "hover:shadow-xl"
                )}
              >
                <div className="flex items-center mb-6">
                  <div className={clsx(
                    "w-12 h-12 rounded-xl flex items-center justify-center text-xl mr-4",
                    index === 0 ? "bg-gradient-to-br from-blue-600 to-cyan-600" :
                    index === 1 ? "bg-gradient-to-br from-purple-600 to-pink-600" :
                    "bg-gradient-to-br from-green-600 to-emerald-700"
                  )}>
                    {index === 0 ? "🏫" : index === 1 ? "📚" : "🎯"}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-100">{student.name}</h3>
                    <p className="text-gray-500">{student.location}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">main.tsx Pattern:</h4>
                    <pre className="text-xs text-gray-300 bg-black p-3 rounded overflow-x-auto">
                      {student.mainStructure}
                    </pre>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">App.tsx Pattern:</h4>
                    <pre className="text-xs text-gray-300 bg-black p-3 rounded overflow-x-auto">
                      {student.appStructure}
                    </pre>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-gray-900/50 border border-gray-700">
                    <h4 className="font-semibold text-gray-200 mb-1">Architecture:</h4>
                    <p className="text-gray-400 text-sm">{student.pattern}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Entry Point Patterns */}
          <div className={clsx(
            "mt-8 rounded-xl p-6",
            "border border-purple-800",
            "bg-gradient-to-br from-gray-800 to-gray-900"
          )}>
            <h3 className="text-xl font-semibold mb-4 text-purple-300">Common Entry Point Patterns</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-200 mb-3">Simple Pattern (Beginner):</h4>
                <pre className="text-sm text-gray-300 bg-black p-4 rounded overflow-x-auto">
{`// main.tsx
createRoot(document.getElementById('root')!).render(<App />)

// App.tsx
function App() {
  return <h1>My App</h1>
}`}</pre>
                <p className="text-gray-400 text-sm mt-2">Good for learning, prototypes, small projects</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-200 mb-3">Advanced Pattern (Production):</h4>
                <pre className="text-sm text-gray-300 bg-black p-4 rounded overflow-x-auto">
{`// main.tsx
const root = createRoot(document.getElementById('root')!)
root.render(
  <ErrorBoundary>
    <StrictMode>
      <Providers>
        <App />
      </Providers>
    </StrictMode>
  </ErrorBoundary>
)

// App.tsx
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  )
}`}</pre>
                <p className="text-gray-400 text-sm mt-2">Error handling, providers, routing, strict mode</p>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes & Best Practices */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.8s] opacity-0 [animation-fill-mode:forwards]">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Common Mistakes */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-lg bg-red-900/30 flex items-center justify-center mr-3">
                  <span className="text-red-300">⚠️</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-100">
                    Common Entry Point Mistakes
                  </h3>
                  <p className="text-gray-400">Errors students in Ichapur frequently encounter</p>
                </div>
              </div>

              <div className="space-y-4">
                {commonMistakes.map((mistake, index) => (
                  <div 
                    key={index}
                    className={clsx(
                      "rounded-lg p-4 transition-all duration-300",
                      "border border-red-800",
                      "bg-gradient-to-br from-gray-800 to-gray-900",
                      "hover:shadow-lg hover:border-red-700"
                    )}
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white font-bold mr-3">
                        {index + 1}
                      </div>
                      <h4 className="text-lg font-semibold text-red-300">{mistake.mistake}</h4>
                    </div>
                    
                    <div className="ml-11 space-y-3">
                      <div>
                        <h5 className="font-semibold text-gray-200 mb-1">Error Message:</h5>
                        <code className="text-sm text-red-300 bg-gray-900 px-2 py-1 rounded">
                          {mistake.error}
                        </code>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-200 mb-1">Cause:</h5>
                        <p className="text-gray-400 text-sm">{mistake.cause}</p>
                      </div>
                      
                      <div className="p-3 rounded bg-gray-900 border border-gray-700">
                        <h5 className="font-semibold text-green-300 mb-1">Solution:</h5>
                        <p className="text-gray-400 text-sm">{mistake.solution}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Practices */}
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-lg bg-green-900/30 flex items-center justify-center mr-3">
                  <span className="text-green-300">✅</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-100">
                    Best Practices
                  </h3>
                  <p className="text-gray-400">Professional habits for entry points</p>
                </div>
              </div>

              <div className="space-y-4">
                {bestPractices.map((practice, index) => (
                  <div 
                    key={index}
                    className={clsx(
                      "rounded-lg p-4 transition-all duration-300 hover:scale-[1.02]",
                      "border border-green-800",
                      "bg-gradient-to-br from-gray-800 to-gray-900",
                      "hover:shadow-lg hover:border-green-700"
                    )}
                  >
                    <div className="flex items-center mb-3">
                      <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold mr-3">
                        {index + 1}
                      </div>
                      <h4 className="text-lg font-semibold text-green-300">{practice.practice}</h4>
                    </div>
                    
                    <div className="ml-11 space-y-3">
                      <div>
                        <h5 className="font-semibold text-gray-200 mb-1">Why:</h5>
                        <p className="text-gray-400 text-sm">{practice.reason}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-200 mb-1">Example:</h5>
                        <p className="text-gray-400 text-sm italic">{practice.example}</p>
                      </div>
                      
                      <div className="p-3 rounded bg-gray-900 border border-gray-700">
                        <h5 className="font-semibold text-blue-300 mb-1">Teaching Tip:</h5>
                        <p className="text-gray-400 text-sm">{practice.tip}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hint Section */}
          <div className={clsx(
            "mt-8 rounded-xl p-6",
            "border border-blue-800",
            "bg-gradient-to-br from-gray-800 to-gray-900"
          )}>
            <h3 className="text-xl font-semibold mb-4 text-blue-300">💡 Hint Section</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                <h4 className="font-semibold text-blue-300 mb-2">Think about...</h4>
                <p className="text-gray-400">
                  What happens if you move the createRoot() call inside a useEffect hook? 
                  Would the app still work? Why or why not? Consider the timing of DOM availability.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-purple-900/20 border border-purple-800">
                <h4 className="font-semibold text-purple-300 mb-2">Observe carefully...</h4>
                <p className="text-gray-400">
                  Open your browser's Developer Tools (F12) and look at the Elements tab. 
                  Find the <code className="text-purple-300">{"<div id='root'>"}</code> element. 
                  Watch how it changes when your React app loads. This visualization helps understand hydration.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                <h4 className="font-semibold text-green-300 mb-2">Try changing...</h4>
                <p className="text-gray-400">
                  In your App.tsx, add a setTimeout that updates state after 3 seconds. 
                  Observe how the component re-renders. Now add console.log() in both 
                  main.tsx and App.tsx - which logs appear first? This shows the execution order.
                </p>
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
                      The Entry Point Mindset Shift:
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      When Swadeep first sees main.tsx and App.tsx, he sees two files. 
                      When he understands them, he sees a handoff. main.tsx says "React, start here." 
                      App.tsx says "React, build this." This understanding transforms how students 
                      think about React architecture. They stop seeing files and start seeing processes.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-yellow-900/30 flex items-center justify-center mr-3">💡</span>
                        Teaching the Handoff:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">1</span>
                          </div>
                          <span>Use the relay race analogy - main.tsx runs first, passes to App.tsx</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">2</span>
                          </div>
                          <span>Show console.log() in both files - demonstrate execution order</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">3</span>
                          </div>
                          <span>Break it - remove export default App, show the error, fix it together</span>
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
                          <span>"Why two files? Can't we just have App.tsx?"</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"What if I put my components in main.tsx?"</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>"Why StrictMode? My app works without it"</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-5 rounded-xl bg-gray-800/50 border border-gray-700">
                    <h5 className="font-semibold text-gray-200 mb-3 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3">📚</span>
                      27 Years of Entry Points:
                    </h5>
                    <p className="text-gray-400">
                      I've taught programming since 1997. Every framework has entry points. 
                      In C, it's main(). In Java, it's public static void main(). In React, 
                      it's main.tsx → App.tsx. The concept never changes: somewhere, something 
                      has to start. Teaching entry points isn't just teaching React - it's 
                      teaching a fundamental programming concept. When Abhronila understands 
                      that main.tsx is React's "main()", she suddenly understands all frameworks 
                      better. She sees patterns. That pattern recognition is what makes a 
                      developer grow. Entry points seem simple, but understanding them deeply 
                      creates a foundation that supports everything else.
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-500">
                      <p>📧 sukantahui@codernaccotax.co.in | 📱 7003756860</p>
                      <p>Teaching programming fundamentals and architectural thinking since 1997</p>
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
              📋 Topic 9 Checklist
            </h3>
            
            <div className="space-y-4">
              {[
                "Understand the difference between main.tsx and App.tsx",
                "Explain the React boot process step by step",
                "Identify the #root element in index.html",
                "Create a basic App component with JSX",
                "Use createRoot() correctly in main.tsx",
                "Add console.log() to trace execution order",
                "Recognize common entry point errors and solutions",
                "Apply best practices for organizing entry points",
                "Explain hydration and why it matters",
                "Structure a real project with proper entry points"
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
              <Link
                 to={`/${folder}/topic/${moduleSlug}/${currentIndex + 1}`}
                className="inline-flex items-center gap-2
               px-6 py-3 rounded-lg
               bg-gradient-to-r from-blue-500 to-purple-600
               text-white font-medium"
              >
                Ready for Topic 10
                <ArrowRight size={18} />
              </Link>

              <p className="mt-4 text-sm text-gray-400">
                Next: JSX fundamentals: syntax rules and limitations
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-400">
            <p>© 2024 React Foundations Course. Topic 9: Entry Points - main.jsx and App.jsx</p>
            <p className="mt-2 text-sm">Mastering the React application bootstrap process</p>
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

export default Topic9;