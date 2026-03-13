// Topic18.jsx - Practice Lab: Build your own directory tree for a project
import React from 'react';

export default class Topic17 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoveredElement: null,
      isReducedMotion: false,
      activeProject: 'web',
      currentPath: '/home/student/project',
      directoryTree: {
        name: 'project',
        type: 'directory',
        children: [
          { name: 'src', type: 'directory', children: [] },
          { name: 'docs', type: 'directory', children: [] },
          { name: 'tests', type: 'directory', children: [] },
          { name: 'README.md', type: 'file' },
          { name: '.gitignore', type: 'file' }
        ]
      },
      commands: [
        { cmd: 'mkdir project', desc: 'Create main project directory' },
        { cmd: 'cd project', desc: 'Enter the project directory' },
        { cmd: 'mkdir src docs tests', desc: 'Create subdirectories' }
      ],
      commandInput: '',
      commandHistory: [],
      isDragging: false,
      dragItem: null,
      feedback: null
    };
  }

  componentDidMount() {
    this.checkReducedMotion();
    this.initializeProjectTemplates();
  }

  checkReducedMotion = () => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.setState({ isReducedMotion: mediaQuery.matches });
    
    mediaQuery.addEventListener('change', (e) => {
      this.setState({ isReducedMotion: e.matches });
    });
  };

  initializeProjectTemplates = () => {
    this.projectTemplates = {
      web: {
        name: 'Web Application',
        structure: {
          name: 'web-app',
          type: 'directory',
          children: [
            {
              name: 'public',
              type: 'directory',
              children: [
                { name: 'index.html', type: 'file' },
                { name: 'favicon.ico', type: 'file' },
                { name: 'robots.txt', type: 'file' }
              ]
            },
            {
              name: 'src',
              type: 'directory',
              children: [
                { name: 'components', type: 'directory', children: [] },
                { name: 'styles', type: 'directory', children: [] },
                { name: 'utils', type: 'directory', children: [] },
                { name: 'App.jsx', type: 'file' },
                { name: 'index.js', type: 'file' }
              ]
            },
            {
              name: 'config',
              type: 'directory',
              children: [
                { name: 'webpack.config.js', type: 'file' },
                { name: 'babel.config.json', type: 'file' }
              ]
            },
            { name: 'package.json', type: 'file' },
            { name: 'README.md', type: 'file' },
            { name: '.gitignore', type: 'file' }
          ]
        },
        description: 'Modern web application with React, build tools, and configuration'
      },
      python: {
        name: 'Python Package',
        structure: {
          name: 'mypackage',
          type: 'directory',
          children: [
            {
              name: 'mypackage',
              type: 'directory',
              children: [
                { name: '__init__.py', type: 'file' },
                { name: 'core.py', type: 'file' },
                { name: 'utils.py', type: 'file' },
                {
                  name: 'submodule',
                  type: 'directory',
                  children: [
                    { name: '__init__.py', type: 'file' },
                    { name: 'helpers.py', type: 'file' }
                  ]
                }
              ]
            },
            {
              name: 'tests',
              type: 'directory',
              children: [
                { name: '__init__.py', type: 'file' },
                { name: 'test_core.py', type: 'file' },
                { name: 'test_utils.py', type: 'file' }
              ]
            },
            {
              name: 'docs',
              type: 'directory',
              children: [
                { name: 'conf.py', type: 'file' },
                { name: 'index.rst', type: 'file' }
              ]
            },
            { name: 'setup.py', type: 'file' },
            { name: 'requirements.txt', type: 'file' },
            { name: 'README.md', type: 'file' },
            { name: '.gitignore', type: 'file' }
          ]
        },
        description: 'Python package with modules, tests, documentation, and setup'
      },
      data: {
        name: 'Data Science',
        structure: {
          name: 'data-project',
          type: 'directory',
          children: [
            {
              name: 'data',
              type: 'directory',
              children: [
                { name: 'raw', type: 'directory', children: [] },
                { name: 'processed', type: 'directory', children: [] },
                { name: 'external', type: 'directory', children: [] }
              ]
            },
            {
              name: 'notebooks',
              type: 'directory',
              children: [
                { name: '01-exploration.ipynb', type: 'file' },
                { name: '02-analysis.ipynb', type: 'file' },
                { name: '03-visualization.ipynb', type: 'file' }
              ]
            },
            {
              name: 'src',
              type: 'directory',
              children: [
                { name: 'data_processing.py', type: 'file' },
                { name: 'models.py', type: 'file' },
                { name: 'visualization.py', type: 'file' }
              ]
            },
            {
              name: 'reports',
              type: 'directory',
              children: [
                { name: 'figures', type: 'directory', children: [] },
                { name: 'tables', type: 'directory', children: [] }
              ]
            },
            { name: 'environment.yml', type: 'file' },
            { name: 'README.md', type: 'file' },
            { name: '.gitignore', type: 'file' }
          ]
        },
        description: 'Data science project with notebooks, data pipelines, and reports'
      }
    };
  };

  handleProjectChange = (project) => {
    this.setState({ 
      activeProject: project,
      directoryTree: JSON.parse(JSON.stringify(this.projectTemplates[project].structure)),
      feedback: {
        type: 'info',
        message: `Loaded ${this.projectTemplates[project].name} template`
      }
    });
    
    // Clear feedback after 3 seconds
    setTimeout(() => {
      this.setState({ feedback: null });
    }, 3000);
  };

  handleElementHover = (path) => {
    this.setState({ hoveredElement: path });
  };

  handleElementClick = (path) => {
    this.setState({ currentPath: path });
  };

  handleCommandSubmit = (e) => {
    e.preventDefault();
    const { commandInput, commandHistory } = this.state;
    
    if (!commandInput.trim()) return;
    
    const newHistory = [...commandHistory, { cmd: commandInput, output: this.executeCommand(commandInput) }];
    
    this.setState({ 
      commandInput: '',
      commandHistory: newHistory.slice(-10) // Keep last 10 commands
    });
  };

  executeCommand = (command) => {
    const parts = command.trim().split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);
    
    switch(cmd) {
      case 'mkdir':
        return this.createDirectory(args);
      case 'touch':
        return this.createFile(args);
      case 'rm':
      case 'rmdir':
        return this.removeItem(args);
      case 'ls':
        return this.listDirectory(args);
      case 'cd':
        return this.changeDirectory(args);
      case 'pwd':
        return this.state.currentPath;
      case 'tree':
        return this.showTree();
      case 'clear':
        this.setState({ commandHistory: [] });
        return 'Terminal cleared';
      case 'help':
        return 'Available commands: mkdir, touch, rm, rmdir, ls, cd, pwd, tree, clear, help';
      default:
        return `Command not found: ${cmd}. Type 'help' for available commands.`;
    }
  };

  createDirectory = (dirNames) => {
    if (dirNames.length === 0) {
      return 'Usage: mkdir <directory_name> [directory_name2 ...]';
    }
    
    const newTree = JSON.parse(JSON.stringify(this.state.directoryTree));
    const created = [];
    
    dirNames.forEach(dirName => {
      if (this.findNode(newTree, this.state.currentPath, dirName)) {
        created.push(`${dirName}: Already exists`);
      } else {
        const parentNode = this.findNode(newTree, this.state.currentPath);
        if (parentNode && parentNode.type === 'directory') {
          parentNode.children.push({
            name: dirName,
            type: 'directory',
            children: []
          });
          created.push(`${dirName}: Created`);
        }
      }
    });
    
    this.setState({ directoryTree: newTree });
    return created.join('\n');
  };

  createFile = (fileNames) => {
    if (fileNames.length === 0) {
      return 'Usage: touch <file_name> [file_name2 ...]';
    }
    
    const newTree = JSON.parse(JSON.stringify(this.state.directoryTree));
    const created = [];
    
    fileNames.forEach(fileName => {
      if (this.findNode(newTree, this.state.currentPath, fileName)) {
        created.push(`${fileName}: Already exists`);
      } else {
        const parentNode = this.findNode(newTree, this.state.currentPath);
        if (parentNode && parentNode.type === 'directory') {
          parentNode.children.push({
            name: fileName,
            type: 'file'
          });
          created.push(`${fileName}: Created`);
        }
      }
    });
    
    this.setState({ directoryTree: newTree });
    return created.join('\n');
  };

  removeItem = (args) => {
    if (args.length === 0) {
      return 'Usage: rm <file_name> OR rmdir <directory_name>';
    }
    
    const newTree = JSON.parse(JSON.stringify(this.state.directoryTree));
    const removed = [];
    
    args.forEach(itemName => {
      const node = this.findNode(newTree, this.state.currentPath, itemName);
      if (node) {
        const parentNode = this.findParent(newTree, this.state.currentPath, itemName);
        if (parentNode) {
          parentNode.children = parentNode.children.filter(child => child.name !== itemName);
          removed.push(`${itemName}: Removed`);
        }
      } else {
        removed.push(`${itemName}: No such file or directory`);
      }
    });
    
    this.setState({ directoryTree: newTree });
    return removed.join('\n');
  };

  listDirectory = (args) => {
    const node = this.findNode(this.state.directoryTree, this.state.currentPath);
    if (node && node.type === 'directory') {
      return node.children.map(child => 
        child.type === 'directory' ? `${child.name}/` : child.name
      ).join('  ');
    }
    return '';
  };

  changeDirectory = (args) => {
    if (args.length === 0) {
      return 'Usage: cd <directory>';
    }
    
    const target = args[0];
    let newPath = this.state.currentPath;
    
    if (target === '..') {
      // Go up one directory
      const parts = newPath.split('/').filter(p => p);
      parts.pop();
      newPath = '/' + parts.join('/');
      if (newPath === '') newPath = '/';
    } else if (target === '/') {
      newPath = '/';
    } else if (target === '~') {
      newPath = '/home/student';
    } else {
      const node = this.findNode(this.state.directoryTree, this.state.currentPath, target);
      if (node && node.type === 'directory') {
        newPath = this.state.currentPath === '/' 
          ? `/${target}` 
          : `${this.state.currentPath}/${target}`;
      } else {
        return `cd: ${target}: No such directory`;
      }
    }
    
    this.setState({ currentPath: newPath });
    return '';
  };

  showTree = () => {
    const formatTree = (node, prefix = '', isLast = true) => {
      let result = prefix + (isLast ? '└── ' : '├── ') + node.name;
      if (node.type === 'directory') result += '/';
      result += '\n';
      
      if (node.children) {
        node.children.forEach((child, index) => {
          const childPrefix = prefix + (isLast ? '    ' : '│   ');
          result += formatTree(child, childPrefix, index === node.children.length - 1);
        });
      }
      
      return result;
    };
    
    return formatTree(this.state.directoryTree);
  };

  findNode = (node, path, targetName = null) => {
    if (path === '/') {
      if (targetName) {
        return node.children.find(child => child.name === targetName);
      }
      return node;
    }
    
    const parts = path.split('/').filter(p => p);
    let currentNode = node;
    
    for (const part of parts) {
      if (currentNode.children) {
        const nextNode = currentNode.children.find(child => child.name === part);
        if (!nextNode) return null;
        currentNode = nextNode;
      }
    }
    
    if (targetName) {
      return currentNode.children ? currentNode.children.find(child => child.name === targetName) : null;
    }
    
    return currentNode;
  };

  findParent = (node, path, targetName) => {
    if (path === '/') {
      return node;
    }
    
    const parts = path.split('/').filter(p => p);
    let currentNode = node;
    
    for (const part of parts) {
      if (currentNode.children) {
        const nextNode = currentNode.children.find(child => child.name === part);
        if (!nextNode) return null;
        currentNode = nextNode;
      }
    }
    
    return currentNode;
  };

  renderDirectoryTree = (node, depth = 0, path = '') => {
    const { hoveredElement, currentPath } = this.state;
    const currentFullPath = path ? `${path}/${node.name}` : node.name;
    const isCurrent = currentPath === currentFullPath || currentPath === `/${currentFullPath}`;
    const isHovered = hoveredElement === currentFullPath;
    
    return (
      <div 
        key={currentFullPath}
        className={`transition-all duration-200 ${isCurrent ? 'bg-blue-50 dark:bg-blue-900/20' : ''} ${isHovered ? 'bg-gray-50 dark:bg-gray-700' : ''}`}
        onMouseEnter={() => this.handleElementHover(currentFullPath)}
        onMouseLeave={() => this.handleElementHover(null)}
        onClick={() => this.handleElementClick(currentFullPath)}
      >
        <div 
          className={`flex items-center gap-2 py-1 px-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 ${depth === 0 ? 'font-bold' : ''}`}
          style={{ marginLeft: `${depth * 20}px` }}
        >
          {node.type === 'directory' ? (
            <svg className={`w-4 h-4 ${isCurrent ? 'text-blue-500' : 'text-yellow-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          ) : (
            <svg className={`w-4 h-4 ${isCurrent ? 'text-blue-500' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          )}
          
          <span className={`font-mono text-sm ${isCurrent ? 'text-blue-600 dark:text-blue-300 font-bold' : 'text-gray-700 dark:text-gray-300'}`}>
            {node.name}
            {node.type === 'directory' && '/'}
          </span>
          
          {isCurrent && (
            <span className="text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded ml-2">
              cd
            </span>
          )}
        </div>
        
        {node.children && node.children.map(child => 
          this.renderDirectoryTree(child, depth + 1, currentFullPath)
        )}
      </div>
    );
  };

  renderFileIcon = (filename) => {
    if (filename.endsWith('.py')) return '🐍';
    if (filename.endsWith('.js') || filename.endsWith('.jsx')) return '📜';
    if (filename.endsWith('.json')) return '📄';
    if (filename.endsWith('.html')) return '🌐';
    if (filename.endsWith('.css')) return '🎨';
    if (filename.endsWith('.md')) return '📖';
    if (filename.endsWith('.txt')) return '📝';
    if (filename.endsWith('.ipynb')) return '📓';
    return '📄';
  };

  render() {
    const { 
      hoveredElement, 
      isReducedMotion, 
      activeProject, 
      currentPath, 
      directoryTree, 
      commands, 
      commandInput, 
      commandHistory,
      feedback
    } = this.state;
    
    const animationClass = isReducedMotion ? '' : 'motion-safe:animate-[fadeInUp_0.8s_ease-out_forwards]';
    const staggerClass = (delay) => 
      isReducedMotion ? '' : `motion-safe:animate-[fadeInUp_0.8s_ease-out_forwards] motion-safe:animation-delay-[${delay}ms]`;
    
    const keyframesStyle = `
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
      
      @keyframes nodePulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
      }
      
      @keyframes commandTyping {
        from { width: 0; }
        to { width: 100%; }
      }
      
      @keyframes successFlash {
        0%, 100% { background-color: transparent; }
        50% { background-color: rgba(34, 197, 94, 0.2); }
      }
    `;

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-violet-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
        <style>{keyframesStyle}</style>
        
        {/* Header Section */}
        <header className={`max-w-6xl mx-auto mb-12 ${animationClass}`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-violet-100 dark:bg-violet-900 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-violet-200 dark:hover:bg-violet-800">
              <svg className="w-6 h-6 text-violet-600 dark:text-violet-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
                Topic 18: Practice Lab - Build Your Own Directory Tree
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                Hands-on practice creating organized project structures
              </p>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto">
          {/* Lab Introduction */}
          <section className={`mb-16 ${staggerClass(100)}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:translate-y-[-4px]">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
                <svg className="w-7 h-7 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Lab Overview: Why Structure Matters
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
                    <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Learning Objectives</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      In this interactive lab, you'll practice creating well-organized directory structures 
                      for different types of projects. You'll learn how professionals organize code, data, 
                      and documentation to maintain clean, scalable projects.
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Real-World Context</h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      When Swadeep from Barrackpore started his web project, he put everything in one folder. 
                      Two weeks later, he couldn't find his CSS files among 50 other files. A proper structure 
                      prevents this chaos and makes collaboration easier.
                    </p>
                    
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-violet-500">
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        <strong>Key Insight:</strong> Good structure is like a well-organized library. 
                        Tuhina knows exactly where to find physics books (src/physics/), chemistry notes (docs/chem/), 
                        and lab reports (reports/).
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="bg-gray-900 text-gray-100 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-gray-400 text-sm ml-auto">Lab Instructions</span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs">1</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-100">Choose a Project Template</h4>
                          <p className="text-sm text-gray-400">Web, Python, or Data Science project</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs">2</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-100">Explore the Structure</h4>
                          <p className="text-sm text-gray-400">Click directories to navigate, see what professionals use</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs">3</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-100">Practice Commands</h4>
                          <p className="text-sm text-gray-400">Use terminal to create, modify, and explore</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-violet-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs">4</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-100">Build Your Own</h4>
                          <p className="text-sm text-gray-400">Create custom structure for your project idea</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-3 bg-gray-800 rounded-lg">
                      <p className="text-sm text-violet-300">
                        <strong>Tip:</strong> Think about Abhronila's science project organization. 
                        Each experiment has its own folder with data, analysis, and results.
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-violet-100 dark:bg-violet-900 rounded-full flex items-center justify-center">
                    <span className="text-violet-600 dark:text-violet-300 font-bold text-xl">📁</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Lab Section */}
          <section className={`mb-16 ${staggerClass(200)}`}>
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Column - Project Templates */}
                <div className="lg:w-1/3 space-y-6">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
                      Project Templates
                    </h3>
                    
                    <div className="space-y-4">
                      {Object.entries(this.projectTemplates || {}).map(([key, project]) => (
                        <div 
                          key={key}
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-md transform hover:translate-x-1
                            ${activeProject === key ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                          onClick={() => this.handleProjectChange(key)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-gray-800 dark:text-gray-100">{project.name}</h4>
                            {activeProject === key && (
                              <span className="text-xs px-2 py-1 bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-200 rounded">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            {project.description}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Click to load template
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Quick Commands</h4>
                      <div className="space-y-2">
                        {commands.map((command, index) => (
                          <div key={index} className="p-2 bg-gray-100 dark:bg-gray-800 rounded">
                            <code className="text-sm text-gray-800 dark:text-gray-200">{command.cmd}</code>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{command.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {feedback && (
                    <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      feedback.type === 'success' 
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                        : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    }`}>
                      <div className="flex items-center gap-2">
                        {feedback.type === 'success' ? (
                          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        <span className="text-sm text-gray-800 dark:text-gray-100">{feedback.message}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Middle Column - Directory Tree Visualization */}
                <div className="lg:w-1/3">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 h-full">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                        Directory Tree
                      </h3>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Click to navigate
                      </div>
                    </div>
                    
                    <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="text-sm text-gray-600 dark:text-gray-300">Current path:</span>
                        <code className="text-sm font-bold text-blue-600 dark:text-blue-300 truncate">
                          {currentPath}
                        </code>
                      </div>
                    </div>
                    
                    <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-4 h-[400px] overflow-y-auto bg-gray-50 dark:bg-gray-800">
                      {this.renderDirectoryTree(directoryTree)}
                      
                      {hoveredElement && (
                        <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                          <div className="text-xs text-gray-500 dark:text-gray-400">Hovering:</div>
                          <div className="text-sm font-mono text-gray-800 dark:text-gray-100">{hoveredElement}</div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 text-center">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="text-yellow-500">📁</span> = Directory
                        <span className="mx-4">|</span>
                        <span className="text-gray-500">📄</span> = File
                        <span className="mx-4">|</span>
                        <span className="text-blue-500">cd</span> = Current directory
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Right Column - Interactive Terminal */}
                <div className="lg:w-1/3">
                  <div className="bg-gray-900 text-gray-100 rounded-xl p-6 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-gray-400 text-sm ml-auto">Practice Terminal</span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm text-green-400 mb-2">Available commands:</div>
                      <div className="text-xs text-gray-400 grid grid-cols-2 gap-1">
                        <code>mkdir</code> <code>touch</code>
                        <code>rm</code> <code>rmdir</code>
                        <code>ls</code> <code>cd</code>
                        <code>pwd</code> <code>tree</code>
                        <code>clear</code> <code>help</code>
                      </div>
                    </div>
                    
                    {/* Terminal Output */}
                    <div className="bg-black/50 rounded-lg p-4 h-64 overflow-y-auto mb-4 font-mono text-sm">
                      <div className="text-cyan-300 mb-2"># Welcome to Directory Tree Lab!</div>
                      <div className="text-gray-400 mb-2"># Try: mkdir src, touch README.md, ls, cd src</div>
                      
                      {commandHistory.map((item, index) => (
                        <div key={index} className="mb-2">
                          <div className="text-green-400">$ {item.cmd}</div>
                          {item.output && (
                            <div className="text-gray-300 mt-1 whitespace-pre-wrap">{item.output}</div>
                          )}
                        </div>
                      ))}
                      
                      {commandHistory.length === 0 && (
                        <div className="text-gray-500 italic">
                          # Type commands below to start building...
                        </div>
                      )}
                    </div>
                    
                    {/* Command Input */}
                    <form onSubmit={this.handleCommandSubmit}>
                      <div className="flex gap-2">
                        <div className="text-green-400 font-mono">$</div>
                        <input
                          type="text"
                          value={commandInput}
                          onChange={(e) => this.setState({ commandInput: e.target.value })}
                          className="flex-1 bg-transparent border-none text-gray-100 font-mono focus:outline-none focus:ring-0"
                          placeholder="Type command here..."
                          autoFocus
                        />
                      </div>
                      <div className="h-px bg-gray-700 mt-2 mb-4"></div>
                      
                      <div className="flex justify-between">
                        <button
                          type="submit"
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                        >
                          Execute
                        </button>
                        <button
                          type="button"
                          onClick={() => this.setState({ commandHistory: [] })}
                          className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors duration-300"
                        >
                          Clear Terminal
                        </button>
                      </div>
                    </form>
                    
                    <div className="mt-6 p-3 bg-gray-800 rounded-lg">
                      <div className="text-sm text-violet-300 mb-2">Lab Challenge:</div>
                      <div className="text-xs text-gray-400">
                        Create a structure for Debangshu's school project with:
                        <ul className="mt-1 ml-4 list-disc">
                          <li>Data collection folder</li>
                          <li>Analysis scripts</li>
                          <li>Report document</li>
                          <li>Presentation slides</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Structure Analysis Section */}
          <section className={`mb-16 ${staggerClass(300)}`}>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-3">
                <svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Analyzing Project Structures: Best Practices
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-lg transition-all duration-500 hover:translate-y-[-4px]">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
                    <span className="text-blue-600 dark:text-blue-300 text-xl">📁</span>
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Separation of Concerns</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Keep source code, tests, documentation, and assets in separate directories. 
                    Like Shyamnagar library separates fiction, non-fiction, and reference sections.
                  </p>
                  <div className="mt-4">
                    <code className="text-xs text-gray-700 dark:text-gray-300">src/ tests/ docs/ assets/</code>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-lg transition-all duration-500 hover:translate-y-[-4px]">
                  <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                    <span className="text-green-600 dark:text-green-300 text-xl">🔧</span>
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Configuration Files</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Keep config files at root level for easy access. Version control ignores 
                    (.gitignore) and dependency files (package.json) should be immediately visible.
                  </p>
                  <div className="mt-4">
                    <code className="text-xs text-gray-700 dark:text-gray-300">.gitignore package.json README.md</code>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:shadow-lg transition-all duration-500 hover:translate-y-[-4px]">
                  <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mb-4">
                    <span className="text-purple-600 dark:text-purple-300 text-xl">📚</span>
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Documentation Hierarchy</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Organize docs by purpose: user guides, API references, tutorials. 
                    Like Ichapur college organizes course materials by year and subject.
                  </p>
                  <div className="mt-4">
                    <code className="text-xs text-gray-700 dark:text-gray-300">docs/ guides/ api/ tutorials/</code>
                  </div>
                </div>
              </div>
              
              {/* Real Project Examples */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6">Real Project Structures</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                      <span className="text-green-500">📊</span> Data Analysis Project
                    </h4>
                    <div className="font-mono text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <div>project/</div>
                      <div className="ml-4">├── data/</div>
                      <div className="ml-8">├── raw/          # Original data</div>
                      <div className="ml-8">├── processed/    # Cleaned data</div>
                      <div className="ml-8">└── external/     # Third-party data</div>
                      <div className="ml-4">├── notebooks/     # Jupyter notebooks</div>
                      <div className="ml-4">├── src/          # Python scripts</div>
                      <div className="ml-4">├── reports/      # PDFs, presentations</div>
                      <div className="ml-4">└── environment.yml</div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                      <span className="text-blue-500">🌐</span> Web Application
                    </h4>
                    <div className="font-mono text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <div>webapp/</div>
                      <div className="ml-4">├── public/        # Static assets</div>
                      <div className="ml-4">├── src/</div>
                      <div className="ml-8">├── components/   # React components</div>
                      <div className="ml-8">├── pages/        # Page components</div>
                      <div className="ml-8">├── styles/       # CSS/Sass files</div>
                      <div className="ml-8">└── utils/        # Helper functions</div>
                      <div className="ml-4">├── tests/         # Test files</div>
                      <div className="ml-4">├── config/       # Build config</div>
                      <div className="ml-4">└── package.json</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Naihati Lab Tip:</strong> Abhronila uses consistent naming: lowercase, hyphens for spaces, 
                    no special characters. <code>my-project</code> not <code>My Project!!!</code>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Common Mistakes & Solutions */}
          <section className={`mb-16 ${staggerClass(400)}`}>
            <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-3">
                <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                Common Structure Mistakes & How to Avoid Them
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">1. Flat Structure Chaos</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      All files in one directory. Swadeep had 150 files in his project root - impossible to navigate.
                    </p>
                    <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs">
                      <span className="text-green-600">✓ Solution:</span> Group by function: <code>src/</code>, <code>tests/</code>, <code>docs/</code>, <code>data/</code>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">2. Over-Nesting</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Too many levels: <code>src/java/com/company/project/module/submodule/file.java</code>
                    </p>
                    <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs">
                      <span className="text-green-600">✓ Solution:</span> Keep max 3-4 levels deep. Use packages/modules instead.
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">3. Inconsistent Naming</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <code>SourceCode/</code>, <code>test_files/</code>, <code>DOCS/</code> - hard to remember patterns.
                    </p>
                    <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs">
                      <span className="text-green-600">✓ Solution:</span> Choose one style: lowercase with hyphens or camelCase. Be consistent.
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">4. Missing Essential Files</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Forgetting <code>README.md</code>, <code>.gitignore</code>, license files. Others can't use the project.
                    </p>
                    <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs">
                      <span className="text-green-600">✓ Solution:</span> Use project templates. Always include basic documentation.
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">5. Mixing Config with Code</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Configuration files scattered among source files. Hard to find and manage.
                    </p>
                    <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs">
                      <span className="text-green-600">✓ Solution:</span> Keep config in <code>config/</code> or root. Separate environment configs.
                    </div>
                  </div>
                  
                  <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">6. No Version Control Setup</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Starting without <code>.gitignore</code>. Committing temporary files, binaries, secrets.
                    </p>
                    <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs">
                      <span className="text-green-600">✓ Solution:</span> Initialize git first. Use standard .gitignore for your language.
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <h4 className="font-bold text-green-700 dark:text-green-300 mb-3">Structure Checklist</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 dark:text-gray-100">Separate concerns</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Code, tests, docs, assets in different dirs</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 dark:text-gray-100">Consistent naming</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">Pick a style and stick to it</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 dark:text-gray-100">Essential files at root</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">README, .gitignore, license, config</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">✓</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 dark:text-gray-100">Reasonable depth</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">3-4 levels max, avoid excessive nesting</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Hint Section */}
          <section className={`mb-16 ${staggerClass(500)}`}>
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-8 border-2 border-yellow-200 dark:border-yellow-800">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
                <svg className="w-7 h-7 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Lab Challenges & Thinking Exercises
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 dark:text-yellow-300 text-lg">🏗️</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-100">Build Challenge 1</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Create a structure for Tuhina's science fair project with experimental data, 
                        analysis scripts, presentation slides, and reference materials.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 dark:text-yellow-300 text-lg">🔍</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-100">Analysis Exercise</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Examine open-source projects on GitHub. What common patterns do you see? 
                        How do they organize tests, docs, and examples?
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 dark:text-yellow-300 text-lg">💡</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-100">Optimization Task</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Take Debangshu's messy project (all files in root) and reorganize it properly. 
                        What criteria would you use to group files?
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300">
                    <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0">
                      <span className="text-yellow-600 dark:text-yellow-300 text-lg">🎯</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 dark:text-gray-100">Collaboration Scenario</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Design a structure for a group project where 4 students work together. 
                        How would you separate individual work from shared components?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <section className={`${staggerClass(600)}`}>
            <div className="bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-2xl p-8 border-l-4 border-violet-500 hover:border-violet-600 transition-all duration-500 hover:shadow-lg">
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Teacher's Note</h3>
                  
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      In Barrackpore's computer lab, I've seen brilliant projects fail because of poor organization. 
                      Abhronila spent more time searching for files than coding. Remember these key principles:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <h4 className="font-semibold text-violet-700 dark:text-violet-300 mb-1">Start with Structure</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Plan directories before writing code. Like building a house - blueprint first.
                        </p>
                      </div>
                      
                      <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <h4 className="font-semibold text-violet-700 dark:text-violet-300 mb-1">Think About Others</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Structure should be intuitive for collaborators. Use common conventions.
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-4 mt-4">
                      <p className="text-violet-700 dark:text-violet-300 text-sm italic">
                        "Swadeep asked: 'Why not just use search to find files?' 
                        Imagine Naihati's library with books randomly placed. Yes, you could search, 
                        but organization lets you browse, discover relationships, and work efficiently."
                      </p>
                    </div>
                    
                    <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                      <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Pro Tip</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Use the <code>tree</code> command to visualize your structure: <code>tree -I 'node_modules|.git'</code>
                        This shows your project layout clearly, helping identify organization issues.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Quick Reference Footer */}
        <footer className={`max-w-6xl mx-auto mt-16 ${staggerClass(700)}`}>
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Directory Structure Quick Reference
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                <h4 className="font-bold text-blue-300 mb-2">Essential Commands</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <code className="block">mkdir dir1 dir2</code>
                  <code className="block">touch file.txt</code>
                  <code className="block">rm file</code>
                  <code className="block">rmdir dir</code>
                  <code className="block">cd path</code>
                </div>
              </div>
              
              <div className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                <h4 className="font-bold text-green-300 mb-2">Common Directories</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <div>src/ - Source code</div>
                  <div>tests/ - Test files</div>
                  <div>docs/ - Documentation</div>
                  <div>data/ - Data files</div>
                  <div>config/ - Configuration</div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                <h4 className="font-bold text-yellow-300 mb-2">Root Files</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <div>README.md</div>
                  <div>.gitignore</div>
                  <div>LICENSE</div>
                  <div>package.json</div>
                  <div>requirements.txt</div>
                </div>
              </div>
              
              <div className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                <h4 className="font-bold text-purple-300 mb-2">Best Practices</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Group by function</li>
                  <li>• Consistent naming</li>
                  <li>• 3-4 levels max</li>
                  <li>• Separate config</li>
                  <li>• Include README</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="text-center">
                <p className="text-gray-400 mb-2">Remember the organization philosophy:</p>
                <p className="text-xl font-bold text-violet-300">
                  "A place for everything, and everything in its place"
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Like Tuhina's perfectly organized study desk in Shyamnagar - efficient and stress-free.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

