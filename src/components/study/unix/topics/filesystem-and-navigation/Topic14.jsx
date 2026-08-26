// Topic17.jsx - Globbing patterns and pathname expansion
import React from 'react';

export default class Topic14 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hoveredPattern: null,
            isReducedMotion: false,
            activeExample: 'basic',
            searchPattern: '*.txt',
            matchedFiles: [
                'document.txt',
                'notes.txt',
                'report.txt',
                'image.jpg',
                'data.csv',
                'backup.txt',
                'config.xml'
            ],
            globResults: [],
            currentDirectory: '/home/student/projects'
        };
    }

    componentDidMount() {
        this.checkReducedMotion();
        this.performGlob(this.state.searchPattern);
    }

    componentWillUnmount() {
        // Clean up event listener
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (this.mediaQueryListener) {
            mediaQuery.removeEventListener('change', this.mediaQueryListener);
        }
    }

    checkReducedMotion = () => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.setState({ isReducedMotion: mediaQuery.matches });

        this.mediaQueryListener = (e) => {
            this.setState({ isReducedMotion: e.matches });
        };
        
        mediaQuery.addEventListener('change', this.mediaQueryListener);
    };

    handlePatternHover = (patternId) => {
        this.setState({ hoveredPattern: patternId });
    };

    handleExampleChange = (example) => {
        this.setState({ activeExample: example });
    };

    handleSearchChange = (pattern) => {
        this.setState({ searchPattern: pattern }, () => {
            this.performGlob(pattern);
        });
    };

    performGlob = (pattern) => {
        const { matchedFiles } = this.state;
        const globResults = matchedFiles.filter(file => {
            // Simple glob pattern matching for demonstration
            if (pattern === '*.txt') return file.endsWith('.txt');
            if (pattern === 'file?.txt') return /^file.\.txt$/.test(file);
            if (pattern === 'file[0-9].txt') return /^file[0-9]\.txt$/.test(file);
            if (pattern === '*.{txt,jpg}') return file.endsWith('.txt') || file.endsWith('.jpg');
            if (pattern === 'file{1..3}.txt') {
                return ['file1.txt', 'file2.txt', 'file3.txt'].includes(file);
            }
            if (pattern === '**/*.txt') return file.endsWith('.txt'); // Simplified for demo
            if (pattern === '[a-z]*.txt') return /^[a-z].*\.txt$/.test(file);
            return file.includes(pattern.replace('*', ''));
        });

        this.setState({ globResults });
    };

    render() {
        const { hoveredPattern, isReducedMotion, activeExample, searchPattern, globResults, currentDirectory } = this.state;

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
            
            @keyframes patternPulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }
            
            @keyframes fileMatch {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
            
            @keyframes textReveal {
                from { width: 0; }
                to { width: 100%; }
            }
        `;

        const examples = {
            basic: {
                title: "Basic Wildcards",
                patterns: [
                    { pattern: '*.txt', description: 'All .txt files', example: 'ls *.txt' },
                    { pattern: 'file*', description: 'Files starting with "file"', example: 'rm file*' },
                    { pattern: '*data*', description: 'Files containing "data" anywhere', example: 'find *data* -type f' }
                ]
            },
            advanced: {
                title: "Advanced Patterns",
                patterns: [
                    { pattern: 'file?.txt', description: 'Single character wildcard', example: 'cp file?.txt backup/' },
                    { pattern: 'file[0-9].txt', description: 'Character range', example: 'cat file[0-9].txt' },
                    { pattern: '*.{txt,jpg}', description: 'Multiple extensions', example: 'ls *.{txt,jpg}' }
                ]
            },
            recursive: {
                title: "Recursive & Special",
                patterns: [
                    { pattern: '**/*.txt', description: 'Recursive search', example: 'find . -name "*.txt"' },
                    { pattern: 'file{1..3}.txt', description: 'Brace expansion', example: 'touch file{1..3}.txt' },
                    { pattern: '[!a]*.txt', description: 'Negation pattern', example: 'ls [!a]*.txt' }
                ]
            }
        };

        const fileStructure = {
            '/home/student/projects': {
                'document.txt': 'text/plain',
                'report.txt': 'text/plain',
                'notes.txt': 'text/plain',
                'image.jpg': 'image/jpeg',
                'data.csv': 'text/csv',
                'config.xml': 'application/xml',
                'script.sh': 'application/x-shellscript',
                'archive.zip': 'application/zip',
                'backup.txt': 'text/plain',
                'presentation.pdf': 'application/pdf'
            },
            'subdir': {
                'log1.txt': 'text/plain',
                'log2.txt': 'text/plain',
                'photo.jpg': 'image/jpeg'
            }
        };

        // Safe render function for code with curly braces
        const renderCode = (text) => {
            if (!text) return '';
            return String(text).replace(/{/g, '&#123;').replace(/}/g, '&#125;');
        };

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
                <style>{keyframesStyle}</style>

                {/* Header Section */}
                <header className={`max-w-6xl mx-auto mb-12 ${animationClass}`}>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-lg bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-emerald-200 dark:hover:bg-emerald-800">
                            <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
                                Topic 15: Globbing Patterns & Pathname Expansion
                            </h1>
                            <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                                Master the art of matching multiple files with powerful pattern matching
                            </p>
                        </div>
                    </div>
                </header>

                <main className="max-w-6xl mx-auto">
                    {/* Conceptual Foundation */}
                    <section className={`mb-16 ${staggerClass(100)}`}>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:translate-y-[-4px]">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
                                <svg className="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                What is Globbing? The Magic of Pattern Matching
                            </h2>

                            <div className="grid lg:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                                        <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2">Core Concept</h3>
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                            <strong>Globbing</strong> (from "global" command) is the shell's way of expanding wildcard patterns
                                            into matching filenames. Think of it as a powerful search tool that turns <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded">*.txt</code> into
                                            <code className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded mx-1">document.txt notes.txt report.txt</code> automatically.
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Real-World Analogy</h3>
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                            In Barrackpore's library, Tuhina doesn't ask for each book individually. She asks for
                                            "All books by Tagore" - that's globbing! The librarian (shell) finds all matching books (files).
                                        </p>

                                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border-l-4 border-emerald-500">
                                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                                <strong>Key Insight:</strong> The shell expands patterns <em>before</em> commands run.
                                                <code className="bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded mx-1">rm *.tmp</code> becomes 
                                                <code className="bg-gray-100 dark:bg-gray-600 px-1 py-0.5 rounded mx-1">rm file1.tmp file2.tmp backup.tmp</code> before deletion.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                        <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-2">Prototype & Purpose</h4>
                                        <div className="font-mono text-sm bg-gray-900 text-gray-100 rounded-lg p-3">
                                            <div className="text-cyan-300"># Shell automatically expands:</div>
                                            <div className="text-green-400">command</div>
                                            <div className="text-yellow-300">[pattern]</div>
                                            <div className="text-gray-400">→ command file1 file2 file3 ...</div>
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                            <strong>When used:</strong> Whenever you need to operate on multiple files without typing each name.
                                        </p>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="bg-gray-900 text-gray-100 rounded-xl p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                            <span className="text-gray-400 text-sm ml-auto">Terminal - Globbing Demo</span>
                                        </div>

                                        <div className="font-mono text-sm space-y-4">
                                            <div>
                                                <span className="text-green-400">student@barrackpore:~$</span> <span className="text-blue-300">ls -l</span>
                                                <div className="ml-4 mt-2 text-gray-300">
                                                    document.txt&nbsp;&nbsp;image.jpg&nbsp;&nbsp;notes.txt<br />
                                                    report.txt&nbsp;&nbsp;&nbsp;data.csv&nbsp;&nbsp;&nbsp;backup.txt
                                                </div>
                                            </div>

                                            <div>
                                                <span className="text-green-400">student@barrackpore:~$</span> <span className="text-blue-300">ls</span> <span className="text-yellow-300">*.txt</span>
                                                <div className="ml-4 mt-2 text-gray-300">
                                                    <span className="text-emerald-300"># Shell expands *.txt to:</span><br />
                                                    document.txt&nbsp;&nbsp;notes.txt<br />
                                                    report.txt&nbsp;&nbsp;&nbsp;backup.txt
                                                </div>
                                            </div>

                                            <div>
                                                <span className="text-green-400">student@barrackpore:~$</span> <span className="text-blue-300">rm</span> <span className="text-yellow-300">*backup*</span>
                                                <div className="ml-4 mt-2 text-gray-300">
                                                    <span className="text-emerald-300"># Expands to backup.txt (only match)</span><br />
                                                    <span className="text-red-300">removed 'backup.txt'</span>
                                                </div>
                                            </div>

                                            <div>
                                                <span className="text-green-400">student@barrackpore:~$</span>{' '}
                                                <span className="text-blue-300">cp</span> <span className="text-yellow-300">file&#123;1..3&#125;.txt</span> <span className="text-cyan-300">archive/</span>
                                                <div className="ml-4 mt-2 text-gray-300">
                                                    <span className="text-emerald-300"># Brace expansion creates:</span><br />
                                                    cp file1.txt file2.txt file3.txt archive/
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                                        <span className="text-emerald-600 dark:text-emerald-300 font-bold text-xl">*</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Interactive Globbing Visualizer */}
                    <section className={`mb-16 ${staggerClass(200)}`}>
                        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-3">
                                    <svg className="w-7 h-7 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Interactive Pattern Matcher
                                </h2>

                                <div className="flex gap-2">
                                    {Object.keys(examples).map((key) => (
                                        <button
                                            key={key}
                                            onClick={() => this.handleExampleChange(key)}
                                            className={`px-4 py-2 rounded-lg transition-all duration-300 ${activeExample === key ? 'bg-teal-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
                                        >
                                            {examples[key].title}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid lg:grid-cols-3 gap-8">
                                {/* Pattern Selector */}
                                <div className="space-y-6">
                                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
                                            {examples[activeExample].title}
                                        </h3>

                                        <div className="space-y-4">
                                            {examples[activeExample].patterns.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-md
                                                        ${hoveredPattern === index ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20' : 'border-gray-200 dark:border-gray-700'}`}
                                                    onMouseEnter={() => this.handlePatternHover(index)}
                                                    onMouseLeave={() => this.handlePatternHover(null)}
                                                    onClick={() => this.handleSearchChange(item.pattern)}
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <code className="text-lg font-bold text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                                            {item.pattern}
                                                        </code>
                                                        {searchPattern === item.pattern && (
                                                            <span className="text-xs px-2 py-1 bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200 rounded">
                                                                Active
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                                        {item.description}
                                                    </p>
                                                    <div className="text-xs font-mono text-gray-500 dark:text-gray-400">
                                                        {item.example}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Custom Pattern</h4>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={searchPattern}
                                                onChange={(e) => this.handleSearchChange(e.target.value)}
                                                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
                                                placeholder="Enter glob pattern..."
                                            />
                                            <button
                                                onClick={() => this.performGlob(searchPattern)}
                                                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors duration-300"
                                            >
                                                Test
                                            </button>
                                        </div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                            Try: <button 
                                                className="cursor-pointer hover:text-teal-600 text-blue-500 dark:text-blue-300 underline" 
                                                onClick={() => this.handleSearchChange('*.{txt,jpg}')}
                                            >*.txt,.jpg</button>,
                                            <button 
                                                className="cursor-pointer hover:text-teal-600 text-blue-500 dark:text-blue-300 underline ml-2" 
                                                onClick={() => this.handleSearchChange('file?.*')}
                                            >file?.txt</button>
                                        </p>
                                    </div>
                                </div>

                                {/* File System Visualization */}
                                <div className="lg:col-span-2">
                                    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 h-full">
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                                                Directory: <span className="text-teal-600 dark:text-teal-400">{currentDirectory}</span>
                                            </h3>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {globResults.length} matches
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <div className="flex items-center gap-4 mb-4">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">Pattern:</div>
                                                <div className="flex-1">
                                                    <div className="relative">
                                                        <div className="font-mono text-lg bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg border-2 border-teal-500">
                                                            {searchPattern}
                                                        </div>
                                                        {!isReducedMotion && (
                                                            <div
                                                                className="absolute top-0 left-0 h-full bg-teal-500/20 rounded-lg"
                                                                style={{ animation: 'textReveal 1s ease-out forwards' }}
                                                            ></div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* File Grid */}
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {Object.entries(fileStructure['/home/student/projects']).map(([filename, filetype]) => {
                                                const isMatch = globResults.includes(filename);
                                                const isText = filename.endsWith('.txt');
                                                const isImage = filename.endsWith('.jpg') || filename.endsWith('.png');
                                                const isArchive = filename.endsWith('.zip') || filename.endsWith('.tar');

                                                return (
                                                    <div
                                                        key={filename}
                                                        className={`p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 cursor-pointer
                                                            ${isMatch
                                                                ? 'border-teal-500 bg-teal-50 dark:bg-teal-900/20 shadow-md'
                                                                : 'border-gray-200 dark:border-gray-700 opacity-50'
                                                            }`}
                                                        onClick={() => isMatch && console.log(`Selected: ${filename}`)}
                                                    >
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center
                                                                ${isText ? 'bg-blue-100 dark:bg-blue-900' :
                                                                    isImage ? 'bg-pink-100 dark:bg-pink-900' :
                                                                        isArchive ? 'bg-yellow-100 dark:bg-yellow-900' :
                                                                            'bg-gray-100 dark:bg-gray-700'
                                                                }`}
                                                            >
                                                                {isText ? (
                                                                    <span className="text-blue-600 dark:text-blue-300 font-bold">T</span>
                                                                ) : isImage ? (
                                                                    <span className="text-pink-600 dark:text-pink-300 font-bold">IMG</span>
                                                                ) : (
                                                                    <span className="text-gray-600 dark:text-gray-300 font-bold">F</span>
                                                                )}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="font-mono text-sm truncate text-gray-800 dark:text-gray-100">
                                                                    {filename}
                                                                </div>
                                                                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                                    {filetype}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {isMatch && !isReducedMotion && (
                                                            <div className="mt-2">
                                                                <div className="h-1 bg-teal-500 rounded-full"
                                                                    style={{ animation: 'fileMatch 0.5s ease-in-out' }}
                                                                ></div>
                                                                <div className="text-xs text-teal-600 dark:text-teal-400 mt-1 text-center">
                                                                    ✓ Matched
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Match Results */}
                                        <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Shell Expansion Result</h4>
                                            <div className="font-mono text-sm bg-gray-900 text-gray-100 rounded-lg p-3">
                                                <span className="text-green-400">$ command</span> <span className="text-yellow-300">{searchPattern}</span>
                                                <div className="mt-2 text-cyan-300">
                                                    # Expands to:
                                                </div>
                                                <div className="mt-1 text-gray-300">
                                                    {globResults.length > 0 ? (
                                                        <div className="flex flex-wrap gap-2">
                                                            {globResults.map((file, index) => (
                                                                <span key={index} className="px-2 py-1 bg-gray-800 rounded">
                                                                    {file}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <span className="text-red-400">No matches found</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Globbing Patterns Deep Dive */}
                    <section className={`mb-16 ${staggerClass(300)}`}>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-3">
                                <svg className="w-7 h-7 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Complete Globbing Reference & Syntax
                            </h2>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Pattern</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Meaning</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Matches</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Doesn't Match</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Example Command</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <code className="text-sm font-bold text-purple-600 dark:text-purple-400">*</code>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-800 dark:text-gray-100">Any string (including empty)</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">file.txt, .txt, abc.txt</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">files starting with dot (.*)</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <code className="text-xs text-gray-700 dark:text-gray-300">ls *.txt</code>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <code className="text-sm font-bold text-purple-600 dark:text-purple-400">?</code>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-800 dark:text-gray-100">Any single character</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">file1.txt, fileA.txt</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">file.txt, file10.txt</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <code className="text-xs text-gray-700 dark:text-gray-300">rm file?.txt</code>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <code className="text-sm font-bold text-purple-600 dark:text-purple-400">[abc]</code>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-800 dark:text-gray-100">Any one of a, b, or c</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">filea.txt, fileb.txt</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">filed.txt, file.txt</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <code className="text-xs text-gray-700 dark:text-gray-300">ls file[abc].txt</code>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <code className="text-sm font-bold text-purple-600 dark:text-purple-400">[a-z]</code>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-800 dark:text-gray-100">Any character in range a to z</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">filea.txt, filem.txt</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">file1.txt, file_.txt</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <code className="text-xs text-gray-700 dark:text-gray-300">cp [a-z]* backup/</code>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <code className="text-sm font-bold text-purple-600 dark:text-purple-400">[!abc]</code>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-800 dark:text-gray-100">Any character except a, b, c</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">filed.txt, file1.txt</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">filea.txt, fileb.txt</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <code className="text-xs text-gray-700 dark:text-gray-300">ls file[!abc].txt</code>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <code className="text-sm font-bold text-purple-600 dark:text-purple-400">
                                                    {'{}'}
                                                </code>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-800 dark:text-gray-100">Brace expansion (not globbing)</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                                    file&#123;1,2,3&#125;.txt → file1.txt file2.txt file3.txt
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">—</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <code className="text-xs text-gray-700 dark:text-gray-300">touch file&#123;1..3&#125;.txt</code>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <code className="text-sm font-bold text-purple-600 dark:text-purple-400">**/</code>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-800 dark:text-gray-100">Recursive directory matching</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">./a.txt, ./dir/b.txt</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600 dark:text-gray-300">—</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <code className="text-xs text-gray-700 dark:text-gray-300">find . -name "*.txt"</code>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-8 grid md:grid-cols-2 gap-6">
                                <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                    <h4 className="font-bold text-blue-700 dark:text-blue-300 mb-3">Important Notes</h4>
                                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                        <li className="flex items-start gap-2">
                                            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-white text-xs">!</span>
                                            </div>
                                            <span>Globbing happens in shell, <strong>not</strong> in commands like <code>ls</code></span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-white text-xs">*</span>
                                            </div>
                                            <span>Patterns starting with <code>.</code> don't match hidden files by default</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-white text-xs">~</span>
                                            </div>
                                            <span>Use quotes to prevent glob expansion: <code>echo "*.txt"</code> prints literally</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                                    <h4 className="font-bold text-green-700 dark:text-green-300 mb-3">Powerful Combinations</h4>
                                    <div className="space-y-3">
                                        <div>
                                            <code className="text-sm font-bold text-gray-800 dark:text-gray-100">*[0-9]*.txt</code>
                                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Files with digits and .txt extension</p>
                                        </div>
                                        <div>
                                            <code className="text-sm font-bold text-gray-800 dark:text-gray-100">backup-????-??-??.tar.gz</code>
                                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Date-stamped backups (e.g., backup-2023-12-01.tar.gz)</p>
                                        </div>
                                        <div>
                                            <code className="text-sm font-bold text-gray-800 dark:text-gray-100">*.[!.]*</code>
                                            <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">Files with extensions but not hidden</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Common Pitfalls & Mistakes */}
                    <section className={`mb-16 ${staggerClass(400)}`}>
                        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-3">
                                <svg className="w-7 h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.346 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                                Common Globbing Pitfalls & Solutions
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                                        <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">1. No matches = Literal pattern</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            If <code>*.xyz</code> matches nothing, shell passes <code>*.xyz</code> literally to command.
                                            <strong>Abhronila from Shyamnagar</strong> deleted a file named <code>*.tmp</code> accidentally!
                                        </p>
                                        <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs font-mono">
                                            <span className="text-red-400">$ rm *.tmp</span><br />
                                            <span className="text-gray-500"># If no .tmp files, tries to delete file named "*.tmp"</span>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                                        <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">2. Spaces in filenames</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            <code>my file.txt</code> expands to two arguments: <code>my</code> and <code>file.txt</code>.
                                            Breaks commands expecting single filename.
                                        </p>
                                        <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs">
                                            <span className="text-green-600">✓ Solution:</span> Use quotes: <code>mv "my file.txt" backup/</code>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                                        <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">3. Hidden file oversight</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            <code>*</code> doesn't match hidden files (<code>.bashrc</code>). Beginners think glob is broken.
                                        </p>
                                        <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs">
                                            <span className="text-green-600">✓ Solution:</span> Use <code>.*</code> for hidden files, or <code>ls -a</code>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                                        <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">4. Overly broad patterns</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            <code>rm *</code> deletes everything! <strong>Debangshu in Naihati lab</strong> lost his project this way.
                                        </p>
                                        <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs">
                                            <span className="text-green-600">✓ Solution:</span> Test with <code>echo *</code> or <code>ls *</code> first
                                        </div>
                                    </div>

                                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                                        <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">5. Case sensitivity confusion</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            On Linux, <code>*.TXT</code> ≠ <code>*.txt</code>. On macOS/Windows, they might match.
                                        </p>
                                        <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs">
                                            <span className="text-green-600">✓ Solution:</span> Use <code>[Tt][Xx][Tt]</code> for case-insensitive
                                        </div>
                                    </div>

                                    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border-l-4 border-red-500">
                                        <h4 className="font-bold text-red-700 dark:text-red-300 mb-2">6. Order of expansion matters</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            Brace expansion happens before globbing. <code>&#123;*.txt,*.jpg&#125;</code> expands then globs.
                                        </p>
                                        <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-900 rounded text-xs font-mono">
                                            <span className="text-gray-500"># Brace → Glob: *.txt *.jpg → file1.txt file2.txt photo.jpg</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                                <h4 className="font-bold text-yellow-700 dark:text-yellow-300 mb-3">Safety Checklist</h4>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-xs">1</span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800 dark:text-gray-100">Test first with echo</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-300"><code>echo rm *</code> shows what would be deleted</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-xs">2</span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800 dark:text-gray-100">Use -i flag for safety</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-300"><code>rm -i *.tmp</code> asks for confirmation</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-xs">3</span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800 dark:text-gray-100">Check for no-match case</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-300">Use <code>shopt -s nullglob</code> to return empty</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-xs">4</span>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800 dark:text-gray-100">Be specific with patterns</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-300"><code>project-2023-*.txt</code> better than <code>*.txt</code></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Best Practices & Professional Tips */}
                    <section className={`mb-16 ${staggerClass(500)}`}>
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 flex items-center gap-3">
                                <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Best Practices & Professional Globbing Techniques
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                                        <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4">Professional Workflow</h3>

                                        <div className="space-y-4">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-blue-600 dark:text-blue-300 text-sm">1</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-800 dark:text-gray-100">Check what matches</h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        <code>echo *.pattern</code> or <code>ls *.pattern</code> before destructive commands
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-green-600 dark:text-green-300 text-sm">2</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-800 dark:text-gray-100">Use find for complex patterns</h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        <code>find . -name "*.txt" -size +1M</code> for size filtering
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-purple-600 dark:text-purple-300 text-sm">3</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-800 dark:text-gray-100">Create naming conventions</h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300">
                                                        <code>project-YYYY-MM-DD-backup.tar.gz</code> is easily globbable
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                            <p className="text-sm text-blue-700 dark:text-blue-300">
                                                <strong>Barrackpore Lab Example:</strong> <code>student-&#123;Swadeep,Tuhina,Abhronila&#125;-.pdf</code>
                                                matches all PDF submissions from specific students.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Useful Bash Options</h4>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <code className="text-sm text-gray-700 dark:text-gray-300">shopt -s nullglob</code>
                                                <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">Recommended</span>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">No matches returns empty, not literal pattern</p>

                                            <div className="flex justify-between items-center">
                                                <code className="text-sm text-gray-700 dark:text-gray-300">shopt -s dotglob</code>
                                                <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">Useful</span>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">* matches hidden files too</p>

                                            <div className="flex justify-between items-center">
                                                <code className="text-sm text-gray-700 dark:text-gray-300">shopt -s extglob</code>
                                                <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded">Advanced</span>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Enables <code>@(pattern|list)</code> syntax</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                                        <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-4">Real-World Scenarios</h3>

                                        <div className="space-y-4">
                                            <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Backup all documents</h4>
                                                <code className="text-sm text-gray-700 dark:text-gray-300 block mb-1">
                                                    tar -czf backup-$(date +%Y%m%d).tar.gz *.&#123;txt,md,pdf,docx&#125;
                                                </code>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Creates dated backup of common document types
                                                </p>
                                            </div>

                                            <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Clean temporary files</h4>
                                                <code className="text-sm text-gray-700 dark:text-gray-300 block mb-1">
                                                    rm -f *.&#123;tmp,log,bak&#125; 2&gt;/dev/null
                                                </code>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Silently remove common temp file types
                                                </p>
                                            </div>

                                            <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Rename batch files</h4>
                                                <code className="text-sm text-gray-700 dark:text-gray-300 block mb-1">
                                                    for file in *.jpg; do mv &quot;$file&quot; &quot;photo-{'{file}'}&quot;; done
                                                </code>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Adds prefix to all JPEG files
                                                </p>
                                            </div>

                                            <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                                <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Find configuration files</h4>
                                                <code className="text-sm text-gray-700 dark:text-gray-300 block mb-1">
                                                    ls -la .*rc .*conf 2&gt;/dev/null
                                                </code>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    Lists common config files (bashrc, vimrc, etc.)
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-3">Performance Tips</h4>
                                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                            <li className="flex items-start gap-2">
                                                <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <span className="text-white text-xs">⚡</span>
                                                </div>
                                                <span>
                                                    <code>*/*/*.txt</code> is faster than <code>**/*.txt</code> if depth known
                                                </span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <span className="text-white text-xs">📁</span>
                                                </div>
                                                <span>Be specific: <code>project/data/*.csv</code> better than searching everywhere</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <span className="text-white text-xs">🔍</span>
                                                </div>
                                                <span>Use <code>find</code> for complex criteria (size, date, permissions)</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Hint Section */}
                    <section className={`mb-16 ${staggerClass(600)}`}>
                        <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-8 border-2 border-yellow-200 dark:border-yellow-800">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center gap-3">
                                <svg className="w-7 h-7 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Thinking Hints & Exploration Exercises
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300">
                                        <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0">
                                            <span className="text-yellow-600 dark:text-yellow-300 text-lg">🤔</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 dark:text-gray-100">Think about...</h4>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                Why does <code>rm * .txt</code> (with space) delete everything?
                                                Hint: Shell expands <code>*</code> first, then passes arguments.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300">
                                        <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0">
                                            <span className="text-yellow-600 dark:text-yellow-300 text-lg">🔍</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 dark:text-gray-100">Observe carefully...</h4>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                Create files: <code>touch a.txt b.txt "c d.txt"</code>.
                                                Now run <code>ls *.txt</code> and <code>ls *txt</code>. Notice the difference?
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
                                            <h4 className="font-bold text-gray-800 dark:text-gray-100">Try changing this...</h4>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                Experiment with <code>shopt -s extglob</code> enabled. Try patterns like
                                                <code className="ml-1">!(notthis).txt</code> or <code className="ml-1">+(one|two).txt</code>.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4 p-4 bg-white/70 dark:bg-gray-800/70 rounded-lg hover:bg-white dark:hover:bg-gray-800 transition-colors duration-300">
                                        <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center flex-shrink-0">
                                            <span className="text-yellow-600 dark:text-yellow-300 text-lg">🎯</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 dark:text-gray-100">Debugging exercise...</h4>
                                            <p className="text-gray-600 dark:text-gray-300">
                                                Tuhina can't find her <code>.project</code> file with <code>ls *project*</code>.
                                                What should she use instead? Why doesn't it work?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Teacher's Note */}
                    <section className={`${staggerClass(700)}`}>
                        <div className="bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl p-8 border-l-4 border-emerald-500 hover:border-emerald-600 transition-all duration-500 hover:shadow-lg">
                            <div className="flex items-start gap-6">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 transition-transform duration-300 hover:scale-110">
                                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Teacher's Note</h3>

                                    <div className="space-y-4">
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                            In Ichapur's computer lab, I emphasize that globbing is one of the most powerful
                                            yet dangerous shell features. Students like Swadeep get excited about <code>rm *</code>
                                            until they learn the hard way. Remember these key principles:
                                        </p>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                                <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-1">Globbing vs Regex</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    Globbing is for filenames, regex for text. <code>*.txt</code> vs <code>.*\.txt$</code>
                                                </p>
                                            </div>

                                            <div className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                                                <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-1">Quote Strategy</h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                                    Single quotes prevent <strong>all</strong> expansion, double quotes allow <code>$VAR</code>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 mt-4">
                                            <p className="text-emerald-700 dark:text-emerald-300 text-sm italic">
                                                "Debangshu asked: 'Why learn globbing when I can use GUI file managers?'
                                                Think about Naihati's library catalog system. Manual searching works, but knowing
                                                the catalog codes (globbing patterns) lets you find exactly what you need instantly."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Quick Reference Footer */}
                <footer className={`max-w-6xl mx-auto mt-16 ${staggerClass(800)}`}>
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black rounded-2xl p-8 text-white">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Globbing Quick Reference
                        </h3>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                                <h4 className="font-bold text-blue-300 mb-2">Basic Patterns</h4>
                                <div className="text-sm text-gray-300 space-y-1">
                                    <code className="block">* - Any string</code>
                                    <code className="block">? - Single char</code>
                                    <code className="block">[abc] - Char set</code>
                                    <code className="block">[a-z] - Range</code>
                                    <code className="block">[!a] - Not a</code>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                                <h4 className="font-bold text-green-300 mb-2">Advanced Features</h4>
                                <div className="text-sm text-gray-300 space-y-1">
                                    <code className="block">*.&#123;txt,jpg&#125;</code>
                                    <code className="block">file&#123;1..3&#125;.txt</code>
                                    <code className="block">**/*.txt</code>
                                    <code className="block">@(a|b).txt</code>
                                    <code className="block">+(ab).txt</code>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                                <h4 className="font-bold text-yellow-300 mb-2">Safety Commands</h4>
                                <div className="text-sm text-gray-300 space-y-1">
                                    <code className="block">echo rm *</code>
                                    <code className="block">ls *.tmp</code>
                                    <code className="block">shopt -s nullglob</code>
                                    <code className="block">rm -i *.old</code>
                                    <code className="block">find . -name "*.txt"</code>
                                </div>
                            </div>

                            <div className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                                <h4 className="font-bold text-purple-300 mb-2">Common Uses</h4>
                                <ul className="text-sm text-gray-300 space-y-1">
                                    <li>• Cleanup: <code>rm *.log</code></li>
                                    <li>• Backup: <code>cp *.txt backup/</code></li>
                                    <li>• Batch rename</li>
                                    <li>• Find files</li>
                                    <li>• Archive groups</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-700">
                            <div className="text-center">
                                <p className="text-gray-400 mb-2">Remember the globbing philosophy:</p>
                                <p className="text-xl font-bold text-emerald-300">
                                    "Test before you trust, be specific, and always have an escape route"
                                </p>
                                <p className="text-gray-500 text-sm mt-2">
                                    Like Abhronila's methodical approach in Shyamnagar lab—verify each pattern before running.
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

