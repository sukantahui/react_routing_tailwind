import { useState } from 'react';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { ArrowRight, FolderOpen, FileText, Package, Settings, GitBranch, Code, Terminal } from "lucide-react";
import { useParams } from "react-router-dom";
import roadmapData from "../../react19-roadmap.json";
import { useNavigate } from "react-router-dom";

const Topic8 = () => {
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

    const [expandedFolder, setExpandedFolder] = useState('');
const [selectedFile, setSelectedFile] = useState('');

  const folderStructure = {
    'school-portal': {
      type: 'folder',
      icon: '📁',
      color: 'from-blue-600 to-cyan-600',
      children: {
        'node_modules': {
          type: 'folder',
          icon: '📦',
          color: 'from-gray-600 to-gray-700',
          description: 'All installed packages (auto-generated, never edit)',
          warning: true
        },
        'public': {
          type: 'folder',
          icon: '🌐',
          color: 'from-green-600 to-emerald-700',
          children: {
            'vite.svg': {
              type: 'file',
              icon: '⚡',
              language: 'svg',
              description: 'Vite logo displayed in default app'
            },
            'index.html': {
              type: 'file',
              icon: '📄',
              language: 'html',
              description: 'Main HTML entry point for the application'
            }
          }
        },
        'src': {
          type: 'folder',
          icon: '📝',
          color: 'from-purple-600 to-pink-600',
          description: 'Source code - where you spend 90% of your time',
          children: {
            'assets': {
              type: 'folder',
              icon: '🖼️',
              color: 'from-yellow-600 to-orange-600',
              children: {
                'react.svg': {
                  type: 'file',
                  icon: '⚛️',
                  language: 'svg',
                  description: 'React logo for the default app'
                }
              }
            },
            'App.css': {
              type: 'file',
              icon: '🎨',
              language: 'css',
              description: 'Global styles for the main App component'
            },
            'App.tsx': {
              type: 'file',
              icon: '🚀',
              language: 'typescript',
              description: 'Main React component - starting point for development'
            },
            'index.css': {
              type: 'file',
              icon: '📋',
              language: 'css',
              description: 'Global styles applied to entire application'
            },
            'main.tsx': {
              type: 'file',
              icon: '🎯',
              language: 'typescript',
              description: 'Entry point where React mounts to the DOM'
            },
            'vite-env.d.ts': {
              type: 'file',
              icon: '📚',
              language: 'typescript',
              description: 'TypeScript definitions for Vite'
            }
          }
        },
        '.gitignore': {
          type: 'file',
          icon: '🔒',
          language: 'git',
          description: 'Specifies files Git should ignore (node_modules, etc.)'
        },
        'eslint.config.js': {
          type: 'file',
          icon: '✅',
          language: 'javascript',
          description: 'Code linting configuration for maintaining code quality'
        },
        'index.html': {
          type: 'file',
          icon: '🌍',
          language: 'html',
          description: 'Root HTML file (points to public/index.html in dev)'
        },
        'package.json': {
          type: 'file',
          icon: '📦',
          language: 'json',
          description: 'Project manifest with dependencies and scripts',
          important: true
        },
        'package-lock.json': {
          type: 'file',
          icon: '🔒',
          language: 'json',
          description: 'Exact version tree of installed packages'
        },
        'README.md': {
          type: 'file',
          icon: '📖',
          language: 'markdown',
          description: 'Project documentation'
        },
        'tsconfig.json': {
          type: 'file',
          icon: '⚙️',
          language: 'json',
          description: 'TypeScript configuration for the project'
        },
        'tsconfig.app.json': {
          type: 'file',
          icon: '📱',
          language: 'json',
          description: 'TypeScript config for application code'
        },
        'tsconfig.node.json': {
          type: 'file',
          icon: '🖥️',
          language: 'json',
          description: 'TypeScript config for Node.js tooling'
        },
        'vite.config.ts': {
          type: 'file',
          icon: '⚡',
          language: 'typescript',
          description: 'Vite build tool configuration',
          important: true
        }
      }
    }
  };

  const fileContents = {
    'package.json': {
      content: `{
  "name": "school-portal",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@typescript-eslint/eslint-plugin": "^8.0.0",
    "@typescript-eslint/parser": "^8.0.0",
    "eslint": "^9.0.0",
    "typescript": "~5.6.0",
    "vite": "^6.0.0"
  }
}`,
      explanation: "This is your project's blueprint. It tells npm what packages to install and what scripts to run. For Abhronila's school project, she might add Tailwind CSS or a chart library here."
    },
    'vite.config.ts': {
      content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  }
})`,
      explanation: "This is your build system configuration. When Swadeep wants to change the development server port or add plugins, this is where he does it."
    },
    'src/main.tsx': {
      content: `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)`,
      explanation: "This is where React starts. It finds the <div id='root'> in index.html and mounts your App component there. Think of it as the 'main()' function for your React app."
    },
    'src/App.tsx': {
      content: `import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  )
}

export default App`,
      explanation: "This is your main component. When Tuhina builds her school portal, she'll replace this default content with her own components."
    },
    '.gitignore': {
      content: `# Logs
logs
*.log

# Runtime data
pids
*.pid
*.seed

# Directory for instrumented libs generated by jscoverage/JSCover
lib-cov

# Coverage directory used by tools like istanbul
coverage

# node-waf configuration
.lock-wscript

# Compiled binary addons (http://nodejs.org/api/addons.html)
build/Release

# Dependency directories
node_modules/
jspm_packages/

# Typescript v1 declaration files
typings/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# dotenv environment variable files
.env

# parcel-bundler cache (https://parceljs.org/)
.cache

# Next.js build output
.next

# Nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless/

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port`,
      explanation: "This file tells Git which files to ignore. It's important for students in Barrackpore to understand this so they don't accidentally commit node_modules (which can be hundreds of MB)."
    }
  };

  const fileCategories = [
    {
      category: 'Configuration Files',
      icon: '⚙️',
      color: 'from-blue-600 to-cyan-600',
      files: ['package.json', 'vite.config.ts', 'tsconfig.json', 'eslint.config.js'],
      purpose: 'Define how your project works'
    },
    {
      category: 'Source Code',
      icon: '💻',
      color: 'from-purple-600 to-pink-600',
      files: ['src/', 'src/App.tsx', 'src/main.tsx', 'src/index.css'],
      purpose: 'Where you write your React components'
    },
    {
      category: 'Build Output',
      icon: '🏗️',
      color: 'from-green-600 to-emerald-700',
      files: ['node_modules/', 'dist/', 'package-lock.json'],
      purpose: 'Auto-generated, never edit manually'
    },
    {
      category: 'Static Assets',
      icon: '🖼️',
      color: 'from-yellow-600 to-orange-600',
      files: ['public/', 'src/assets/', 'index.html'],
      purpose: 'Images, fonts, and HTML files'
    }
  ];

  const studentProjects = [
    {
      name: "Swadeep's School Portal",
      location: "Naihati",
      structure: {
        'src/components/': ['Header.tsx', 'StudentCard.tsx', 'AttendanceTable.tsx'],
        'src/pages/': ['Dashboard.tsx', 'Grades.tsx', 'Schedule.tsx'],
        'src/utils/': ['api.ts', 'helpers.ts'],
        'src/hooks/': ['useStudents.ts', 'useAttendance.ts']
      }
    },
    {
      name: "Tuhina's Library System",
      location: "Shyamnagar",
      structure: {
        'src/features/': ['books/', 'members/', 'transactions/'],
        'src/lib/': ['database.ts', 'auth.ts'],
        'src/styles/': ['global.css', 'components.css']
      }
    },
    {
      name: "Abhronila's Quiz App",
      location: "Barrackpore",
      structure: {
        'src/quiz/': ['questions.ts', 'timer.tsx', 'results.tsx'],
        'src/admin/': ['create-quiz.tsx', 'analytics.tsx'],
        'public/': ['quiz-background.png', 'sounds/']
      }
    }
  ];

  const renderTree = (node, path = '', depth = 0) => {
    return Object.entries(node).map(([name, data]) => {
      const currentPath = path ? `${path}/${name}` : name;
      const isExpanded = expandedFolder === currentPath;
      const isSelected = selectedFile === currentPath;
      
      if (data.type === 'folder') {
        return (
          <div key={currentPath} className="mb-1">
            <div
              onClick={() => setExpandedFolder(isExpanded ? '' : currentPath)}
              className={clsx(
                "flex items-center p-2 rounded-lg cursor-pointer transition-all duration-300",
                "hover:bg-gray-800/50",
                isExpanded && "bg-gray-800/70",
                depth === 0 && "ml-0",
                depth === 1 && "ml-4",
                depth === 2 && "ml-8"
              )}
            >
              <div className={clsx(
                "w-8 h-8 rounded mr-3 flex items-center justify-center",
                `bg-gradient-to-br ${data.color}`
              )}>
                <span className="text-sm">{data.icon}</span>
              </div>
              <div className="flex-grow">
                <div className="flex items-center">
                  <span className="font-mono text-gray-300">{name}</span>
                  {data.warning && (
                    <span className="ml-2 px-2 py-0.5 rounded-full bg-yellow-900/30 text-yellow-300 text-xs">
                      auto
                    </span>
                  )}
                </div>
                {data.description && (
                  <p className="text-gray-500 text-xs mt-1">{data.description}</p>
                )}
              </div>
              <div className={clsx(
                "transform transition-transform duration-300",
                isExpanded ? "rotate-90" : "rotate-0"
              )}>
                ▶
              </div>
            </div>
            
            {isExpanded && data.children && (
              <div className="ml-4 border-l border-gray-700 pl-2">
                {renderTree(data.children, currentPath, depth + 1)}
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div
            key={currentPath}
            onClick={() => setSelectedFile(currentPath)}
            className={clsx(
              "flex items-center p-2 rounded-lg cursor-pointer transition-all duration-300",
              "hover:bg-gray-800/50",
              isSelected && "bg-blue-900/20 border border-blue-800",
              depth === 0 && "ml-0",
              depth === 1 && "ml-4",
              depth === 2 && "ml-8"
            )}
          >
            <div className={clsx(
              "w-8 h-8 rounded mr-3 flex items-center justify-center",
              data.important ? "bg-gradient-to-br from-red-600 to-pink-600" : "bg-gray-700"
            )}>
              <span className="text-sm">{data.icon}</span>
            </div>
            <div className="flex-grow">
              <div className="flex items-center">
                <span className="font-mono text-gray-300">{name}</span>
                {data.language && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 text-xs">
                    {data.language}
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-xs mt-1">{data.description}</p>
            </div>
          </div>
        );
      }
    });
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
                <FolderOpen size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  React Foundations
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Topic 8: Understanding React Project Structure</p>
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
                  📁
                </div>
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    Navigating Your React Project
                  </h2>
                  <p className="text-xl text-gray-300">
                    Understanding the folder structure is like reading a map before building a city
                  </p>
                </div>
              </div>
              
              <p className="text-xl mb-8 text-gray-300 leading-relaxed">
                When Swadeep from Naihati opened his React project for the first time, 
                he saw dozens of files and folders. Today, you'll learn what each file does, 
                where to put your code, and how to organize projects like a professional.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Interactive Explorer
                </span>
                <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  File-by-File Guide
                </span>
                <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105">
                  Real Student Projects
                </span>
              </div>
            </div>
            
            {/* Animated Folder Structure */}
            <div className="absolute right-8 top-8 opacity-10">
              <svg width="180" height="150" viewBox="0 0 200 150" className="animate-[float_6s_ease-in-out_infinite]">
                <rect x="30" y="20" width="40" height="30" rx="3" fill="#1E40AF" opacity="0.3" />
                <rect x="80" y="20" width="40" height="30" rx="3" fill="#10B981" opacity="0.3" />
                <rect x="130" y="20" width="40" height="30" rx="3" fill="#8B5CF6" opacity="0.3" />
                <rect x="30" y="60" width="40" height="30" rx="3" fill="#F59E0B" opacity="0.3" />
                <rect x="80" y="60" width="40" height="30" rx="3" fill="#EF4444" opacity="0.3" />
                <rect x="130" y="60" width="40" height="30" rx="3" fill="#6B7280" opacity="0.3" />
                <text x="50" y="38" textAnchor="middle" fontSize="8" fill="currentColor">src</text>
                <text x="100" y="38" textAnchor="middle" fontSize="8" fill="currentColor">public</text>
                <text x="150" y="38" textAnchor="middle" fontSize="8" fill="currentColor">node</text>
                <text x="50" y="78" textAnchor="middle" fontSize="8" fill="currentColor">config</text>
                <text x="100" y="78" textAnchor="middle" fontSize="8" fill="currentColor">pkg</text>
                <text x="150" y="78" textAnchor="middle" fontSize="8" fill="currentColor">git</text>
              </svg>
            </div>
          </div>
        </section>

        {/* Interactive File Explorer */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.2s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-blue-900/30 flex items-center justify-center mr-4">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Interactive Project Explorer
              </h2>
              <p className="text-gray-400 mt-2">
                Click on folders and files to explore. Think of this as your project's anatomy lesson.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-1 gap-8">
            {/* File Tree */}
            <div className="lg:col-span-1">
              <div className={clsx(
                "rounded-xl p-6 h-full",
                "border border-blue-800",
                "bg-gradient-to-br from-gray-800 to-gray-900"
              )}>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center mr-3">
                    <FolderOpen size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-300">Project Structure</h3>
                    <p className="text-gray-500 text-sm">school-portal/</p>
                  </div>
                </div>
                
                <div className="mt-4 max-h-[500px] overflow-y-auto">
                  {renderTree(folderStructure)}
                </div>
                
                <div className="mt-6 p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                  <h4 className="font-semibold text-blue-300 mb-2">Pro Tip:</h4>
                  <p className="text-gray-400 text-sm">
                    Right-click folders in VS Code to create new files. For Debangshu's project, 
                    he'll create <code className="text-blue-300">src/components/</code> and 
                    <code className="text-blue-300">src/pages/</code> folders.
                  </p>
                </div>
              </div>
            </div>

            {/* File Content */}
            <div className="lg:col-span-2">
              <div className={clsx(
                "rounded-xl p-6 h-full",
                "border border-purple-800",
                "bg-gradient-to-br from-gray-800 to-gray-900"
              )}>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center mr-3">
                    <Code size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-purple-300">
                      {selectedFile.split('/').pop()}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {fileContents[selectedFile.split('/').pop()] ? 'Click file in tree to view' : 'Select a file to view contents'}
                    </p>
                  </div>
                </div>
                
                {fileContents[selectedFile.split('/').pop()] ? (
                  <>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-200">File Content:</h4>
                        <span className="px-2 py-1 rounded bg-gray-800 text-gray-400 text-xs">
                          {selectedFile.endsWith('.tsx') ? 'TypeScript React' : 
                           selectedFile.endsWith('.ts') ? 'TypeScript' :
                           selectedFile.endsWith('.json') ? 'JSON' : 'Text'}
                        </span>
                      </div>
                      <pre className="text-sm text-gray-300 bg-black p-4 rounded overflow-x-auto max-h-[300px]">
                        {fileContents[selectedFile.split('/').pop()].content}
                      </pre>
                    </div>
                    
                    <div className="p-4 rounded-lg bg-purple-900/20 border border-purple-800">
                      <h4 className="font-semibold text-purple-300 mb-2">Understanding this file:</h4>
                      <p className="text-gray-400">
                        {fileContents[selectedFile.split('/').pop()].explanation}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                      <FileText size={32} className="text-gray-500" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-300 mb-2">Select a File</h4>
                    <p className="text-gray-500">
                      Click on any file in the project tree to view its contents and purpose.
                      Start with <span className="text-blue-300 cursor-pointer" onClick={() => setSelectedFile('package.json')}>package.json</span> 
                      or <span className="text-blue-300 cursor-pointer" onClick={() => setSelectedFile('src/App.tsx')}>src/App.tsx</span>.
                    </p>
                  </div>
                )}
                
                {/* File Categories */}
                <div className="mt-8">
                  <h4 className="font-semibold text-gray-200 mb-4">File Categories at a Glance:</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {fileCategories.map((category, index) => (
                      <div 
                        key={index}
                        className={clsx(
                          "p-4 rounded-lg transition-all duration-300 hover:scale-[1.02]",
                          "border border-gray-700",
                          "bg-gray-900/50",
                          "hover:shadow-lg"
                        )}
                      >
                        <div className="flex items-center mb-3">
                          <div className={clsx(
                            "w-10 h-10 rounded-lg flex items-center justify-center mr-3",
                            `bg-gradient-to-br ${category.color}`
                          )}>
                            <span className="text-lg">{category.icon}</span>
                          </div>
                          <h5 className="font-semibold text-gray-200">{category.category}</h5>
                        </div>
                        <p className="text-gray-400 text-sm mb-3">{category.purpose}</p>
                        <div className="space-y-1">
                          {category.files.map((file, idx) => (
                            <div key={idx} className="flex items-center text-gray-500 text-sm">
                              <div className="w-1 h-1 rounded-full bg-gray-600 mr-2"></div>
                              <span className="font-mono">{file}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Real Student Projects */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.4s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-green-900/30 flex items-center justify-center mr-4">
              <GitBranch size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                How Real Students Organize Projects
              </h2>
              <p className="text-gray-400 mt-2">
                See how students from Barrackpore, Shyamnagar, and Ichapur structure their React applications
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {studentProjects.map((project, index) => (
              <div 
                key={index}
                className={clsx(
                  "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
                  "border border-gray-700",
                  "bg-gradient-to-br from-gray-800 to-gray-900",
                  "hover:shadow-xl hover:border-green-700"
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
                    <h3 className="text-xl font-semibold text-gray-100">{project.name}</h3>
                    <p className="text-gray-500">{project.location}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {Object.entries(project.structure).map(([folder, files]) => (
                    <div key={folder}>
                      <div className="flex items-center mb-2">
                        <FolderOpen size={16} className="text-gray-500 mr-2" />
                        <span className="font-mono text-sm text-gray-300">{folder}</span>
                      </div>
                      <div className="ml-6 space-y-1">
                        {files.map((file, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-gray-600 mr-3"></div>
                            <span className="font-mono text-xs text-gray-500">{file}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className={clsx(
                  "mt-6 p-4 rounded-lg border",
                  index === 0 ? "border-blue-800 bg-blue-900/20" :
                  index === 1 ? "border-purple-800 bg-purple-900/20" :
                  "border-green-800 bg-green-900/20"
                )}>
                  <h4 className="font-semibold mb-2 text-gray-200">Organization Strategy:</h4>
                  <p className="text-gray-400 text-sm">
                    {index === 0 
                      ? "Components grouped by feature, utilities separated, hooks for reusable logic"
                      : index === 1
                      ? "Feature-based structure with shared libraries and separate style management"
                      : "Domain-driven organization with clear separation between quiz logic and admin"}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Best Practices */}
          <div className={clsx(
            "mt-8 rounded-xl p-6",
            "border border-yellow-800",
            "bg-gradient-to-br from-gray-800 to-gray-900"
          )}>
            <h3 className="text-xl font-semibold mb-4 text-yellow-300">Folder Structure Best Practices</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-200 mb-3">✅ Do:</h4>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-green-300 text-sm">✓</span>
                    </div>
                    <span>Create <code className="text-green-300">src/components/</code> for reusable UI pieces</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-green-300 text-sm">✓</span>
                    </div>
                    <span>Use <code className="text-green-300">src/hooks/</code> for custom React hooks</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-green-300 text-sm">✓</span>
                    </div>
                    <span>Keep <code className="text-green-300">src/utils/</code> for helper functions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-green-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-green-300 text-sm">✓</span>
                    </div>
                    <span>Group related files in feature folders (e.g., <code className="text-green-300">src/features/auth/</code>)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-200 mb-3">❌ Don't:</h4>
                <ul className="space-y-3 text-gray-400">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-red-300 text-sm">✗</span>
                    </div>
                    <span>Modify files in <code className="text-red-300">node_modules/</code> (they'll be overwritten)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-red-300 text-sm">✗</span>
                    </div>
                    <span>Put everything in <code className="text-red-300">src/App.tsx</code> (split into components)</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-red-300 text-sm">✗</span>
                    </div>
                    <span>Commit <code className="text-red-300">.env</code> files with secrets to Git</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                      <span className="text-red-300 text-sm">✗</span>
                    </div>
                    <span>Create deeply nested folders (max 3-4 levels deep)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Critical Files Deep Dive */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.6s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-red-900/30 flex items-center justify-center mr-4">
              <Package size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Critical Files You MUST Understand
              </h2>
              <p className="text-gray-400 mt-2">
                These files control your entire project. Master them and you master React development.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                file: 'package.json',
                icon: '📦',
                color: 'from-red-600 to-pink-600',
                importance: 'HIGH',
                description: 'Project manifest and dependency manager',
                keySections: ['dependencies', 'devDependencies', 'scripts'],
                tip: "When Tuhina wants to add Tailwind CSS, she adds it here"
              },
              {
                file: 'vite.config.ts',
                icon: '⚡',
                color: 'from-purple-600 to-pink-600',
                importance: 'MEDIUM',
                description: 'Build tool configuration',
                keySections: ['plugins', 'server', 'build'],
                tip: "Change development server port or add plugins here"
              },
              {
                file: 'tsconfig.json',
                icon: '⚙️',
                color: 'from-blue-600 to-cyan-600',
                importance: 'MEDIUM',
                description: 'TypeScript compiler options',
                keySections: ['compilerOptions', 'include', 'exclude'],
                tip: "Controls strictness of TypeScript checking"
              },
              {
                file: 'src/main.tsx',
                icon: '🎯',
                color: 'from-green-600 to-emerald-700',
                importance: 'HIGH',
                description: 'React application entry point',
                keySections: ['createRoot', 'StrictMode', 'render'],
                tip: "This is where React connects to your HTML"
              }
            ].map((criticalFile, index) => (
              <div 
                key={index}
                className={clsx(
                  "rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]",
                  "border border-gray-700",
                  "bg-gradient-to-br from-gray-800 to-gray-900",
                  "hover:shadow-xl"
                )}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className={clsx(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-xl mr-4",
                      `bg-gradient-to-br ${criticalFile.color}`
                    )}>
                      {criticalFile.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-100">{criticalFile.file}</h3>
                      <span className={clsx(
                        "px-2 py-1 rounded-full text-xs font-medium",
                        criticalFile.importance === 'HIGH' 
                          ? "bg-red-900/30 text-red-300"
                          : "bg-yellow-900/30 text-yellow-300"
                      )}>
                        {criticalFile.importance} Priority
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-400 mb-4">{criticalFile.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-200 mb-2">Key Sections:</h4>
                  <div className="flex flex-wrap gap-2">
                    {criticalFile.keySections.map((section, idx) => (
                      <span key={idx} className="px-3 py-1 rounded-full bg-gray-800 text-gray-400 text-sm">
                        {section}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                  <h4 className="font-semibold text-gray-200 mb-2">Student Tip:</h4>
                  <p className="text-gray-400 text-sm">{criticalFile.tip}</p>
                </div>
                
                <button
                  onClick={() => setSelectedFile(criticalFile.file)}
                  className="mt-4 w-full px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
                >
                  View File Contents
                </button>
              </div>
            ))}
          </div>

          {/* File Modification Exercise */}
          <div className={clsx(
            "mt-8 rounded-xl p-6",
            "border border-blue-800",
            "bg-gradient-to-br from-gray-800 to-gray-900"
          )}>
            <h3 className="text-xl font-semibold mb-4 text-blue-300">Hands-On Exercise: Customize package.json</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-200 mb-3">Before (Default):</h4>
                <pre className="text-sm text-gray-300 bg-black p-4 rounded overflow-x-auto">
{`"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}`}</pre>
              </div>
              <div>
                <h4 className="font-semibold text-gray-200 mb-3">After (Enhanced for Swadeep's School Portal):</h4>
                <pre className="text-sm text-gray-300 bg-black p-4 rounded overflow-x-auto">
{`"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview",
  "deploy": "npm run build && firebase deploy",
  "test": "vitest",
  "format": "prettier --write src/",
  "storybook": "storybook dev -p 6006"
}`}</pre>
              </div>
            </div>
            <div className="mt-4 p-4 rounded-lg bg-green-900/20 border border-green-800">
              <p className="text-gray-400">
                <strong>Try this:</strong> Open your project's package.json and add a custom script. 
                For example, add <code className="text-green-300">"start": "npm run dev"</code> to 
                make <code className="text-green-300">npm start</code> work. Then run it in terminal to see the change!
              </p>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-16 animate-[slideUp_0.8s_ease-out_0.8s] opacity-0 [animation-fill-mode:forwards]">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-yellow-900/30 flex items-center justify-center mr-4">
              <Terminal size={24} />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-100">
                Common Folder Structure Mistakes
              </h2>
              <p className="text-gray-400 mt-2">
                Problems students in Barrackpore and Ichapur face (and how to fix them)
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                mistake: "Putting everything in src/App.tsx",
                symptom: "3000+ lines in one file, impossible to maintain",
                solution: "Split into components in src/components/",
                example: "Move <Header />, <StudentList /> to separate files"
              },
              {
                mistake: "Editing node_modules/ files",
                symptom: "Changes disappear after npm install",
                solution: "Never edit node_modules. Use package.json to install correct versions",
                example: "npm install exact-version@1.2.3 instead of modifying files"
              },
              {
                mistake: "Forgetting .gitignore",
                symptom: "Git repo becomes 500MB+ with node_modules",
                solution: "Always check .gitignore includes node_modules/, dist/, .env",
                example: "Run git status before commit to see what's being tracked"
              },
              {
                mistake: "Deeply nested folders",
                symptom: "../../../../components/Button pain",
                solution: "Keep structure flat, use aliases in vite.config.ts",
                example: "import Button from '@/components/Button' with path alias"
              }
            ].map((error, index) => (
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
                  <h3 className="text-xl font-semibold text-red-300">{error.mistake}</h3>
                </div>
                
                <div className="ml-14 space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">Symptom:</h4>
                    <p className="text-gray-400">{error.symptom}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-200 mb-2">Solution:</h4>
                    <p className="text-gray-400">{error.solution}</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-gray-900 border border-gray-700">
                    <h4 className="font-semibold text-green-300 mb-1">Example:</h4>
                    <p className="text-gray-400 text-sm">{error.example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Hint Section */}
          <div className={clsx(
            "mt-8 rounded-xl p-6",
            "border border-purple-800",
            "bg-gradient-to-br from-gray-800 to-gray-900"
          )}>
            <h3 className="text-xl font-semibold mb-4 text-purple-300">💡 Hint Section</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-purple-900/20 border border-purple-800">
                <h4 className="font-semibold text-purple-300 mb-2">Think about...</h4>
                <p className="text-gray-400">
                  How would you organize a school project with 20+ components? 
                  Would you group by feature (attendance, grades, schedule) or by type (components, pages, layouts)?
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-blue-900/20 border border-blue-800">
                <h4 className="font-semibold text-blue-300 mb-2">Observe carefully...</h4>
                <p className="text-gray-400">
                  Open your actual React project in VS Code. Notice the color coding of files. 
                  .tsx files are TypeScript React, .ts files are TypeScript, .json files are configuration. 
                  This visual coding helps you understand file purposes at a glance.
                </p>
              </div>
              
              <div className="p-4 rounded-lg bg-green-900/20 border border-green-800">
                <h4 className="font-semibold text-green-300 mb-2">Try changing...</h4>
                <p className="text-gray-400">
                  Open vite.config.ts and change the server port from 5173 to 3000. 
                  Save and restart your dev server. What happens? Understanding config files 
                  gives you control over your development environment.
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
                      The Psychology of Project Structure:
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
                      When Abhronila sees a well-organized project, she feels in control. 
                      When she sees a messy src/ folder with 50 files at the root, she feels overwhelmed. 
                      Structure isn't just technical - it's psychological. A good structure gives students 
                      confidence. They know where to find things. They know where to put new things. 
                      That confidence translates to faster development and better code.
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-yellow-900/30 flex items-center justify-center mr-3">💡</span>
                        27 Years of Structure Patterns:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">1</span>
                          </div>
                          <span><strong>Beginner pattern:</strong> Everything in src/ (ok for first 2 weeks)</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">2</span>
                          </div>
                          <span><strong>Intermediate pattern:</strong> src/components/, src/pages/, src/utils/</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-blue-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">3</span>
                          </div>
                          <span><strong>Advanced pattern:</strong> Feature-based folders with domain logic</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-200 mb-3 flex items-center">
                        <span className="w-8 h-8 rounded-full bg-red-900/30 flex items-center justify-center mr-3">⚠️</span>
                        Teaching Structure Effectively:
                      </h4>
                      <ul className="space-y-2 text-gray-400">
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>Show real student projects from Barrackpore, Naihati</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>Use analogies: "components/ is like Lego bricks"</span>
                        </li>
                        <li className="flex items-start">
                          <div className="w-5 h-5 rounded-full bg-red-900/30 flex items-center justify-center mt-1 mr-3 flex-shrink-0">
                            <span className="text-xs">!</span>
                          </div>
                          <span>Emphasize: Bad structure becomes technical debt</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-5 rounded-xl bg-gray-800/50 border border-gray-700">
                    <h5 className="font-semibold text-gray-200 mb-3 flex items-center">
                      <span className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3">📚</span>
                      The Folder Structure Mindset:
                    </h5>
                    <p className="text-gray-400">
                      In my 27 years of teaching, I've seen this pattern: students who understand 
                      project structure early become better developers faster. Why? Because they 
                      develop architectural thinking. They don't just write code - they organize systems. 
                      When Swadeep creates src/components/ui/ for reusable buttons and inputs, 
                      he's thinking like an architect, not just a coder. That architectural mindset 
                      is what separates junior from senior developers. It's not about memorizing 
                      where package.json goes - it's about understanding why it goes there and 
                      how all the pieces fit together into a coherent whole.
                    </p>
                    <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-500">
                      <p>📧 sukantahui@codernaccotax.co.in | 📱 7003756860</p>
                      <p>Teaching project architecture and developer mindset since 1997</p>
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
              📋 Topic 8 Checklist
            </h3>
            
            <div className="space-y-4">
              {[
                "Navigate your React project structure confidently",
                "Understand the purpose of package.json and node_modules/",
                "Differentiate between src/ (your code) and public/ (static assets)",
                "Identify critical configuration files (vite.config.ts, tsconfig.json)",
                "Know which files should NEVER be edited (node_modules/, package-lock.json)",
                "Organize components logically in src/components/",
                "Modify package.json scripts for custom workflows",
                "Use .gitignore correctly to avoid committing large files",
                "Plan a folder structure for your own school project",
                "Feel comfortable exploring any React project's structure"
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
                Ready for Topic 9
                <ArrowRight size={18} />
              </Link>

              <p className="mt-4 text-sm text-gray-400">
                Next: Entry points explained: main.jsx and App.jsx
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6">
          <div className="text-center text-gray-400">
            <p>© 2024 React Foundations Course. Topic 8: Understanding React Project Structure</p>
            <p className="mt-2 text-sm">Interactive guide to navigating and organizing React projects</p>
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

export default Topic8;