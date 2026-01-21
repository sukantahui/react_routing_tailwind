import { useState } from 'react';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import roadmapData from "../../react19-roadmap.json";
import { useNavigate } from "react-router-dom";

const Topic7 = () => {
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

    const [currentStep, setCurrentStep] = useState(1);
    const [selectedTemplate, setSelectedTemplate] = useState('react-ts');
    const [projectName, setProjectName] = useState('school-portal');

    const nextStep = () => {
        setCurrentStep(prev => Math.min(prev + 1, 6));
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const templates = [
        {
            id: 'react',
            name: 'React',
            icon: '⚛️',
            color: 'from-blue-600 to-cyan-600',
            description: 'Basic React with JavaScript',
            command: '--template react',
            recommended: false
        },
        {
            id: 'react-ts',
            name: 'React + TypeScript',
            icon: '📘',
            color: 'from-purple-600 to-pink-600',
            description: 'React with TypeScript (Recommended)',
            command: '--template react-ts',
            recommended: true
        },
        {
            id: 'react-swc',
            name: 'React + SWC',
            icon: '⚡',
            color: 'from-green-600 to-emerald-700',
            description: 'React with faster SWC compiler',
            command: '--template react-swc',
            recommended: false
        }
    ];

    const steps = [
        {
            id: 1,
            title: "Open Terminal",
            icon: "💻",
            color: "from-gray-600 to-gray-700",
            description: "Launch your command line interface",
            details: "Windows: PowerShell or Command Prompt, Mac/Linux: Terminal",
            command: "# No command needed, just open terminal",
            tip: "Students in Barrackpore: Use VS Code's built-in terminal for convenience"
        },
        {
            id: 2,
            title: "Navigate to Projects Folder",
            icon: "📁",
            color: "from-blue-600 to-cyan-600",
            description: "Go to where you want to create your project",
            details: "Choose an organized location for all your React projects",
            command: "cd Documents/React-Projects",
            tip: "Create a dedicated folder like 'school-projects' for all your work"
        },
        {
            id: 3,
            title: "Create Vite Project",
            icon: "🚀",
            color: "from-purple-600 to-pink-600",
            description: "Run the Vite creation command",
            details: "This downloads and sets up everything automatically",
            command: `npm create vite@latest ${projectName} -- --template ${selectedTemplate}`,
            tip: "The '--' separates npm arguments from Vite arguments"
        },
        {
            id: 4,
            title: "Install Dependencies",
            icon: "📦",
            color: "from-green-600 to-emerald-700",
            description: "Download required packages",
            details: "Creates node_modules folder with all dependencies",
            command: `cd ${projectName} && npm install`,
            tip: "First install might take a minute - perfect time for a short break!"
        },
        {
            id: 5,
            title: "Start Development Server",
            icon: "🔥",
            color: "from-yellow-600 to-orange-600",
            description: "Launch your React application",
            details: "This runs a local server with hot reloading",
            command: "npm run dev",
            tip: "Keep this terminal open while developing"
        },
        {
            id: 6,
            title: "Open in Browser",
            icon: "🌐",
            color: "from-red-600 to-pink-600",
            description: "View your React app",
            details: "Usually opens automatically, but you can manually navigate",
            command: "Open http://localhost:5173",
            tip: "Bookmark this address for quick access during development"
        }
    ];

    const verificationChecks = [
        {
            check: "Vite Logo Visible",
            description: "You should see the Vite + React logo",
            success: "✅ Build tool working correctly",
            failure: "❌ Check terminal for errors"
        },
        {
            check: "Counter Works",
            description: "Click the count button - should increment",
            success: "✅ React state management working",
            failure: "❌ JavaScript might be disabled"
        },
        {
            check: "Edit and Save",
            description: "Edit App.tsx, save, see instant update",
            success: "✅ Hot Module Replacement working",
            failure: "❌ Check file save location"
        },
        {
            check: "No Errors in Console",
            description: "Browser console should be clean",
            success: "✅ Clean setup, no configuration issues",
            failure: "❌ Check terminal output for clues"
        }
    ];

    const commonIssues = [
        {
            issue: "Command not found: npm",
            cause: "Node.js not installed or not in PATH",
            solution: "Install Node.js from official website and restart terminal"
        },
        {
            issue: "Port 5173 already in use",
            cause: "Another application using the same port",
            solution: "Use different port: npm run dev -- --port 3000"
        },
        {
            issue: "Template not found",
            cause: "Typo in template name or outdated Vite",
            solution: "Use exact template name: react, react-ts, or react-swc"
        },
        {
            issue: "Slow npm install",
            cause: "Network issues or first-time setup",
            solution: "Wait it out or use --verbose flag to see progress"
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
                                <p className="text-sm text-gray-500 dark:text-gray-400">Topic 7: Creating React 19 Project with Vite</p>
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
                                    🛠️
                                </div>
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                                        Hands-On Project Creation
                                    </h2>
                                    <p className="text-xl text-gray-300">
                                        Step-by-step guide to create your first React 19 project
                                    </p>
                                </div>
                            </div>

                            <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                                Today, Swadeep from Naihati will create his school portal project.
                                Follow along - by the end of this lesson, you'll have a working React 19
                                application running on your computer, ready for customization.
                            </p>

                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                                    Interactive Guide
                                </span>
                                <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                                    Live Terminal Commands
                                </span>
                                <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                                    Real-Time Feedback
                                </span>
                            </div>
                        </div>

                        {/* Animated Terminal */}
                        <div className="absolute right-8 top-8 opacity-10">
                            <svg width="180" height="150" viewBox="0 0 200 150" className="animate-[float_6s_ease-in-out_infinite]">
                                <rect x="20" y="20" width="160" height="110" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                                <rect x="25" y="25" width="150" height="20" rx="3" fill="#1E40AF" opacity="0.7" />
                                <text x="100" y="38" textAnchor="middle" fontSize="10" fill="white">terminal</text>
                                <text x="30" y="60" fontSize="10" fill="#10B981">$ npm create vite@latest</text>
                                <text x="30" y="80" fontSize="10" fill="#10B981">$ cd my-app</text>
                                <text x="30" y="100" fontSize="10" fill="#10B981">$ npm run dev</text>
                                <rect x="30" y="110" width="80" height="5" rx="2" fill="#3B82F6" opacity="0.8">
                                    <animate attributeName="width" from="80" to="140" dur="2s" repeatCount="indefinite" />
                                </rect>
                            </svg>
                        </div>
                    </div>
                </section>

                {/* Project Setup Wizard */}
                <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
                    <div className="flex items-center mb-8">
                        <div className="w-12 h-12 rounded-xl bg-purple-900/30 flex items-center justify-center mr-4">
                            <span className="text-2xl">🎯</span>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-100">
                                Project Configuration
                            </h2>
                            <p className="text-gray-400 mt-2">
                                Customize your React project before creation
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Template Selection */}
                        <div className={clsx(
                            "rounded-xl p-6",
                            "border border-blue-800",
                            "bg-gradient-to-br from-gray-800 to-gray-900"
                        )}>
                            <h3 className="text-xl font-semibold mb-6 text-blue-300">Choose Your Template</h3>

                            <div className="space-y-4">
                                {templates.map((template) => (
                                    <div
                                        key={template.id}
                                        onClick={() => setSelectedTemplate(template.id)}
                                        className={clsx(
                                            "rounded-lg p-4 cursor-pointer transition-all duration-300",
                                            "border",
                                            selectedTemplate === template.id
                                                ? "border-purple-500 bg-purple-900/20"
                                                : "border-gray-700 hover:border-gray-600",
                                            selectedTemplate === template.id && "ring-2 ring-purple-500 ring-opacity-50"
                                        )}
                                    >
                                        <div className="flex items-center">
                                            <div className={clsx(
                                                "w-12 h-12 rounded-lg flex items-center justify-center text-xl mr-4",
                                                `bg-gradient-to-br ${template.color}`
                                            )}>
                                                {template.icon}
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center">
                                                    <h4 className="font-semibold text-gray-200">{template.name}</h4>
                                                    {template.recommended && (
                                                        <span className="ml-3 px-2 py-1 rounded-full bg-green-900/30 text-green-300 text-xs">
                                                            Recommended
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-gray-400 text-sm mt-1">{template.description}</p>
                                            </div>
                                        </div>

                                        {selectedTemplate === template.id && (
                                            <div className="mt-4 p-3 rounded bg-gray-900">
                                                <div className="font-mono text-sm text-green-300">
                                                    npm create vite@latest my-app -- --template {template.id}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                                <h4 className="font-semibold text-blue-300 mb-2">Recommendation for Students:</h4>
                                <p className="text-gray-400 text-sm">
                                    Choose <strong className="text-purple-300">React + TypeScript</strong>. TypeScript helps catch
                                    errors early and is industry standard. The learning curve is worth it for
                                    students in Shyamnagar aiming for professional roles.
                                </p>
                            </div>
                        </div>

                        {/* Project Name */}
                        <div className={clsx(
                            "rounded-xl p-6",
                            "border border-green-800",
                            "bg-gradient-to-br from-gray-800 to-gray-900"
                        )}>
                            <h3 className="text-xl font-semibold mb-6 text-green-300">Project Details</h3>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-gray-300 mb-2">
                                        Project Name (for Tuhina's school portal):
                                    </label>
                                    <input
                                        type="text"
                                        value={projectName}
                                        onChange={(e) => setProjectName(e.target.value)}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 text-gray-300 focus:outline-none focus:border-blue-500"
                                        placeholder="e.g., school-portal, student-management"
                                    />
                                    <p className="text-gray-500 text-sm mt-2">
                                        Use lowercase with hyphens. No spaces or special characters.
                                    </p>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-gray-200 mb-3">Final Command Preview:</h4>
                                    <div className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                                        <div className="font-mono text-sm text-green-300">
                                            npm create vite@latest {projectName} -- --template {selectedTemplate}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                                    <h4 className="font-semibold text-green-300 mb-2">Naming Tips:</h4>
                                    <ul className="text-gray-400 text-sm space-y-1">
                                        <li>• Use descriptive names: school-portal, student-attendance</li>
                                        <li>• Keep it short but meaningful</li>
                                        <li>• Avoid special characters (@, #, $, etc.)</li>
                                        <li>• Use kebab-case (dashes) not camelCase</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Step-by-Step Guide */}
                <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
                    <div className="flex items-center mb-8">
                        <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center mr-4">
                            <span className="text-2xl">📝</span>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-100">
                                Step-by-Step Creation Guide
                            </h2>
                            <p className="text-gray-400 mt-2">
                                Follow these steps exactly as shown
                            </p>
                        </div>
                    </div>

                    {/* Step Navigation */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex space-x-2">
                                {steps.map((step) => (
                                    <button
                                        key={step.id}
                                        onClick={() => setCurrentStep(step.id)}
                                        className={clsx(
                                            "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                                            currentStep === step.id
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
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                    className={clsx(
                                        "px-4 py-2 rounded-lg font-medium",
                                        currentStep === 1
                                            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    )}
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={nextStep}
                                    disabled={currentStep === 6}
                                    className={clsx(
                                        "px-4 py-2 rounded-lg font-medium",
                                        currentStep === 6
                                            ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                                            : "bg-blue-600 text-white hover:bg-blue-700"
                                    )}
                                >
                                    Next Step
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Current Step Display */}
                    <div className={clsx(
                        "rounded-xl p-6 transition-all duration-300",
                        "border border-gray-700",
                        "bg-gradient-to-br from-gray-800 to-gray-900"
                    )}>
                        <div className="flex items-center mb-6">
                            <div className={clsx(
                                "w-16 h-16 rounded-xl flex items-center justify-center text-2xl mr-6",
                                `bg-gradient-to-br ${steps[currentStep - 1].color}`
                            )}>
                                {steps[currentStep - 1].icon}
                            </div>
                            <div>
                                <div className="flex items-center mb-2">
                                    <span className="px-3 py-1 rounded-full bg-gray-700 text-gray-300 text-sm font-medium mr-3">
                                        Step {currentStep}
                                    </span>
                                    <h3 className="text-2xl font-bold text-gray-100">{steps[currentStep - 1].title}</h3>
                                </div>
                                <p className="text-gray-400">{steps[currentStep - 1].description}</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                                <h4 className="font-semibold text-gray-200 mb-2">Details:</h4>
                                <p className="text-gray-400 text-sm">{steps[currentStep - 1].details}</p>
                            </div>

                            <div className="p-4 rounded-lg bg-gray-900 border border-gray-700">
                                <h4 className="font-semibold text-gray-200 mb-2">Command:</h4>
                                <div className="font-mono text-sm text-green-300 bg-black/30 p-3 rounded">
                                    {steps[currentStep - 1].command}
                                </div>
                            </div>

                            <div className="md:col-span-2 p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                                <h4 className="font-semibold text-blue-300 mb-2">Student Tip:</h4>
                                <p className="text-gray-400 text-sm">{steps[currentStep - 1].tip}</p>
                            </div>
                        </div>

                        {/* Visual Guide for Current Step */}
                        {currentStep === 3 && (
                            <div className="mt-6 p-4 rounded-lg bg-gray-900 border border-gray-700">
                                <h4 className="font-semibold text-gray-200 mb-2">Interactive Prompt Preview:</h4>
                                <div className="font-mono text-sm text-gray-300 bg-black p-4 rounded">
                                    <div className="text-green-300">$ npm create vite@latest {projectName}</div>
                                    <div className="text-yellow-300 mt-2">✔ Select a framework: › React</div>
                                    <div className="text-yellow-300">✔ Select a variant: › TypeScript</div>
                                    <div className="text-green-300 mt-2">Scaffolding project in ./{projectName}...</div>
                                    <div className="text-green-300">Done. Now run:</div>
                                    <div className="text-blue-300 mt-2">  cd {projectName}</div>
                                    <div className="text-blue-300">  npm install</div>
                                    <div className="text-blue-300">  npm run dev</div>
                                </div>
                            </div>
                        )}

                        {currentStep === 5 && (
                            <div className="mt-6 p-4 rounded-lg bg-gray-900 border border-gray-700">
                                <h4 className="font-semibold text-gray-200 mb-2">Expected Terminal Output:</h4>
                                <div className="font-mono text-sm text-gray-300 bg-black p-4 rounded">
                                    <div className="text-green-300">$ npm run dev</div>
                                    <div className="text-gray-400 mt-2">  VITE v5.0.0  ready in 320 ms</div>
                                    <div className="text-gray-400">  ➜  Local:   <span className="text-blue-300">http://localhost:5173/</span></div>
                                    <div className="text-gray-400">  ➜  Network: <span className="text-blue-300">http://192.168.1.x:5173</span></div>
                                    <div className="text-gray-400">  ➜  press h to show help</div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* Project Verification */}
                <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
                    <div className="flex items-center mb-8">
                        <div className="w-12 h-12 rounded-xl bg-green-900/30 flex items-center justify-center mr-4">
                            <span className="text-2xl">✅</span>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-100">
                                Project Verification
                            </h2>
                            <p className="text-gray-400 mt-2">
                                Is Debangshu's React project working correctly?
                            </p>
                        </div>
                    </div>

                    <div className={clsx(
                        "rounded-xl p-6",
                        "border border-green-800",
                        "bg-gradient-to-br from-gray-800 to-gray-900"
                    )}>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-green-300">What You Should See</h3>
                                <div className="p-4 rounded-lg bg-gray-900 border border-gray-700 mb-6">
                                    <div className="text-center">
                                        <div className="inline-block mb-4">
                                            {/* Vite + React Logo */}
                                            <div className="relative w-32 h-32 mx-auto">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="text-4xl">⚡</div>
                                                </div>
                                                <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                                                    <div className="text-4xl">⚛️</div>
                                                </div>
                                            </div>
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-200 mb-2">Vite + React</h4>
                                        <div className="space-y-3">
                                            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
                                                Count is: 0
                                            </button>
                                            <p className="text-gray-400 text-sm">
                                                Edit <code className="text-blue-300">src/App.tsx</code> and save to test HMR
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                                    <h4 className="font-semibold text-green-300 mb-2">Congratulations!</h4>
                                    <p className="text-gray-400 text-sm">
                                        If you see something similar, your React 19 project with Vite is working perfectly.
                                        Students in Ichapur can now start customizing this template for their school projects.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-4 text-blue-300">Verification Checklist</h3>
                                <div className="space-y-4">
                                    {verificationChecks.map((check, index) => (
                                        <div
                                            key={index}
                                            className={clsx(
                                                "rounded-lg p-4",
                                                "border border-gray-700",
                                                "bg-gray-900/50"
                                            )}
                                        >
                                            <div className="flex items-start">
                                                <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                                                    {index + 1}
                                                </div>
                                                <div className="flex-grow">
                                                    <h4 className="font-semibold text-gray-200 mb-1">{check.check}</h4>
                                                    <p className="text-gray-400 text-sm mb-2">{check.description}</p>
                                                    <div className="flex items-center">
                                                        <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center mr-2">
                                                            <span className="text-green-300 text-xs">✓</span>
                                                        </div>
                                                        <span className="text-green-300 text-sm">{check.success}</span>
                                                    </div>
                                                    <div className="flex items-center mt-2">
                                                        <div className="w-6 h-6 rounded-full bg-red-900/30 flex items-center justify-center mr-2">
                                                            <span className="text-red-300 text-xs">✗</span>
                                                        </div>
                                                        <span className="text-red-300 text-sm">{check.failure}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
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
                                Troubleshooting Guide
                            </h2>
                            <p className="text-gray-400 mt-2">
                                What to do if something goes wrong
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-8">
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
                                    <h3 className="text-xl font-semibold text-red-300">{issue.issue}</h3>
                                </div>

                                <div className="ml-14">
                                    <div className="mb-4">
                                        <h4 className="font-semibold text-gray-200 mb-2">Likely Cause:</h4>
                                        <p className="text-gray-400">{issue.cause}</p>
                                    </div>

                                    <div className="p-3 rounded-lg bg-gray-900 border border-gray-700">
                                        <h4 className="font-semibold text-green-300 mb-1">Solution:</h4>
                                        <p className="text-gray-400 text-sm">{issue.solution}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Debugging Tips */}
                    <div className={clsx(
                        "rounded-xl p-6",
                        "border border-blue-800",
                        "bg-gradient-to-br from-gray-800 to-gray-900"
                    )}>
                        <h3 className="text-xl font-semibold mb-4 text-blue-300">Debugging Tips for Students</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                                <h4 className="font-semibold text-blue-300 mb-2">1. Read Error Messages</h4>
                                <p className="text-gray-400 text-sm">
                                    Terminal errors usually tell you exactly what's wrong. Don't panic - read carefully.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-purple-900/20 border border-purple-800">
                                <h4 className="font-semibold text-purple-300 mb-2">2. Check Node Version</h4>
                                <p className="text-gray-400 text-sm">
                                    Run <code className="text-green-300">node --version</code>. Should be 18.x or 20.x.
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                                <h4 className="font-semibold text-green-300 mb-2">3. Clear npm Cache</h4>
                                <p className="text-gray-400 text-sm">
                                    Sometimes fixes weird issues: <code className="text-green-300">npm cache clean --force</code>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Next Steps */}
                <section className="mb-16 animate-[slideUp_0.8s_ease-out_1s] opacity-0 [animation-fill-mode:forwards]">
                    <div className="flex items-center mb-8">
                        <div className="w-12 h-12 rounded-xl bg-yellow-900/30 flex items-center justify-center mr-4">
                            <span className="text-2xl">🚀</span>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-100">
                                What's Next for Your Project?
                            </h2>
                            <p className="text-gray-400 mt-2">
                                Now that Tuhina has a working React project, what should she do?
                            </p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className={clsx(
                            "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
                            "border border-blue-800",
                            "bg-gradient-to-br from-gray-800 to-gray-900",
                            "hover:shadow-xl hover:shadow-blue-900/20"
                        )}>
                            <div className="w-14 h-14 rounded-xl bg-blue-900/30 flex items-center justify-center text-2xl mb-4">
                                📁
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-blue-300">Explore Structure</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li>• Open <code className="text-blue-300">src/App.tsx</code> in your editor</li>
                                <li>• Understand the default component</li>
                                <li>• Check <code className="text-blue-300">package.json</code> for dependencies</li>
                                <li>• Look at <code className="text-blue-300">vite.config.ts</code> configuration</li>
                            </ul>
                        </div>

                        <div className={clsx(
                            "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
                            "border border-green-800",
                            "bg-gradient-to-br from-gray-800 to-gray-900",
                            "hover:shadow-xl hover:shadow-green-900/20"
                        )}>
                            <div className="w-14 h-14 rounded-xl bg-green-900/30 flex items-center justify-center text-2xl mb-4">
                                ✏️
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-green-300">Make First Changes</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li>• Change "Vite + React" to your project name</li>
                                <li>• Modify the counter button text</li>
                                <li>• Add a new component in <code className="text-green-300">src/components/</code></li>
                                <li>• See changes update instantly (HMR)</li>
                            </ul>
                        </div>

                        <div className={clsx(
                            "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
                            "border border-purple-800",
                            "bg-gradient-to-br from-gray-800 to-gray-900",
                            "hover:shadow-xl hover:shadow-purple-900/20"
                        )}>
                            <div className="w-14 h-14 rounded-xl bg-purple-900/30 flex items-center justify-center text-2xl mb-4">
                                🎯
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-purple-300">Plan Your Project</h3>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li>• What features for school portal?</li>
                                <li>• Create component structure</li>
                                <li>• Choose color scheme and design</li>
                                <li>• Set up version control (git)</li>
                            </ul>
                        </div>
                    </div>

                    {/* Quick Customization Example */}
                    <div className={clsx(
                        "mt-8 rounded-xl p-6",
                        "border border-purple-800",
                        "bg-gradient-to-br from-gray-800 to-gray-900"
                    )}>
                        <h3 className="text-xl font-semibold mb-4 text-purple-300">Quick Customization for Students</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-gray-200 mb-2">Before (Default App.tsx):</h4>
                                <pre className="text-sm text-gray-300 bg-black p-4 rounded overflow-x-auto">
                                    {`function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  )
}`}</pre>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-200 mb-2">After (School Portal):</h4>
                                <pre className="text-sm text-gray-300 bg-black p-4 rounded overflow-x-auto">
                                    {`function App() {
  const [students, setStudents] = useState(['Swadeep', 'Tuhina'])
  
  return (
    <>
      <h1>Barrackpore School Portal</h1>
      <div className="student-list">
        {students.map(student => (
          <div key={student}>{student}</div>
        ))}
      </div>
      <button onClick={() => setCount((count) => count + 1)}>
        Total Students: {students.length}
      </button>
    </>
  )
}`}</pre>
                            </div>
                        </div>
                        <div className="mt-4 p-4 rounded-lg bg-green-900/20 border border-green-800">
                            <p className="text-gray-400 text-sm">
                                <strong>Try this:</strong> Replace the default App.tsx code with the school portal version.
                                Save the file and watch your browser update instantly. That's Hot Module Replacement in action!
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
                                            The "Aha!" Moment in Setup:
                                        </h4>
                                        <p className="text-gray-400 leading-relaxed">
                                            When Abhronila sees her React app running in the browser for the first time,
                                            that's a pivotal moment. The setup process can be intimidating, but success
                                            here builds confidence. That's why I emphasize verification - students need
                                            to know they did it right before moving forward.
                                        </p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                                                <span className="w-8 h-8 rounded-full bg-yellow-900/30 flex items-center justify-center mr-3">💡</span>
                                                Teaching This Process:
                                            </h4>
                                            <ul className="space-y-2 text-gray-400">
                                                <li className="flex items-start">
                                                    <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                                                        <span className="text-xs">1</span>
                                                    </div>
                                                    <span>Do live demos - students follow along in real-time</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                                                        <span className="text-xs">2</span>
                                                    </div>
                                                    <span>Record setup videos for students to review later</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                                                        <span className="text-xs">3</span>
                                                    </div>
                                                    <span>Create troubleshooting guides for common issues</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                                                <span className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center mr-3">⚠️</span>
                                                Setup Psychology:
                                            </h4>
                                            <ul className="space-y-2 text-gray-400">
                                                <li className="flex items-start">
                                                    <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                                                        <span className="text-xs">!</span>
                                                    </div>
                                                    <span>Fear of terminal commands is common - normalize it</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                                                        <span className="text-xs">!</span>
                                                    </div>
                                                    <span>Students think they broke something - usually just small mistakes</span>
                                                </li>
                                                <li className="flex items-start">
                                                    <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                                                        <span className="text-xs">!</span>
                                                    </div>
                                                    <span>The satisfaction of fixing setup issues builds problem-solving skills</span>
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
                                            I've taught setup processes for countless technologies. The pattern is always
                                            the same: students who successfully complete setup feel empowered. They've
                                            conquered the "scary" terminal and made something work. That confidence carries
                                            through the entire learning journey. That's why I make setup a dedicated topic
                                            - it's not just technical, it's psychological. When Debangshu from Naihati
                                            sees his React app running, he thinks "I can do this." And that belief is
                                            more important than any specific technical skill.
                                        </p>
                                        <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-500">
                                            <p>📧 sukantahui@codernaccotax.co.in | 📱 7003756860</p>
                                            <p>Teaching project setup and confidence building since 1997</p>
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
                            📋 Topic 7 Checklist
                        </h3>

                        <div className="space-y-4">
                            {[
                                "Successfully create a React 19 project using Vite",
                                "Choose appropriate template (React + TypeScript recommended)",
                                "Navigate through all setup steps without errors",
                                "Start development server and see React app in browser",
                                "Verify project is working with all verification checks",
                                "Understand common issues and their solutions",
                                "Make at least one customization to the default app",
                                "Feel confident creating new React projects independently"
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
                                Next: Understanding the React project folder structure
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="mt-16 border-t border-gray-800 py-8">
                <div className="container mx-auto px-6">
                    <div className="text-center text-gray-400">
                        <p>© 2024 React Foundations Course. Topic 7: Creating React 19 Project with Vite</p>
                        <p className="mt-2 text-sm">Hands-on, interactive guide to project creation and verification</p>
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

export default Topic7;