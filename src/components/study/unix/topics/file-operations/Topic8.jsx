import React from 'react';
import clsx from "clsx";

export default class Topic8 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDarkMode: false,
            currentPattern: '*.txt',
            patternType: 'asterisk',
            exampleMatches: [
                'document.txt',
                'notes.txt',
                'report.txt',
                'image.jpg',
                'data.csv'
            ],
            userPattern: '',
            userTestInput: '',
            userResults: [],
            isPatternValid: true,
            showPatternDetails: false
        };
        this.logInterval = null;
    }

    componentDidMount() {
        // Set initial pattern matches
        this.updateMatches('*.txt', 'asterisk');
        // Check for reduced motion preference
        this.checkReducedMotion();
        
        // Check initial dark mode from localStorage or system preference
        const savedDarkMode = localStorage.getItem('darkMode');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedDarkMode !== null) {
            this.setState({ isDarkMode: savedDarkMode === 'true' }, this.applyDarkMode);
        } else if (prefersDark) {
            this.setState({ isDarkMode: true }, this.applyDarkMode);
        }
    }

    componentWillUnmount() {
        if (this.logInterval) {
            clearInterval(this.logInterval);
            this.logInterval = null;
        }
    }

    applyDarkMode = () => {
        const { isDarkMode } = this.state;
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', isDarkMode);
    }

    checkReducedMotion = () => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            // Disable animations for reduced motion users
            document.body.classList.add('motion-reduce-safe');
        }
    }

    toggleDarkMode = () => {
        this.setState(
            prevState => ({ 
                isDarkMode: !prevState.isDarkMode,
                userResults: [] // Clear results when toggling
            }),
            this.applyDarkMode
        );
    };

    handlePatternChange = (pattern, type) => {
        this.setState({ 
            currentPattern: pattern,
            patternType: type,
            userPattern: pattern,
            showPatternDetails: true
        }, () => {
            this.updateMatches(pattern, type);
        });
    }

    updateMatches = (pattern, type) => {
        let matches = [];
        
        // Sample files for demonstration
        const allFiles = [
            'notes.txt', 'report.txt', 'document.txt', 'data.txt',
            'image.jpg', 'photo.jpg', 'picture.png', 'graphic.gif',
            'data.csv', 'users.csv', 'products.csv',
            'file1.doc', 'file2.doc', 'file3.doc',
            'archive.tar.gz', 'backup.tar.gz',
            'config.yml', 'settings.json',
            'script.sh', 'program.py', 'app.js',
            'readme.md', 'license.txt',
            'temp.log', 'error.log', 'access.log'
        ];

        // Simplified pattern matching for demonstration
        const patternRegex = this.patternToRegex(pattern);
        
        matches = allFiles.filter(file => {
            try {
                return patternRegex.test(file);
            } catch {
                return false;
            }
        }).slice(0, 8); // Show top 8 matches

        this.setState({ 
            exampleMatches: matches,
            isPatternValid: true
        });
    }

    patternToRegex = (pattern) => {
        // Convert wildcard pattern to regex
        let regexPattern = pattern
            .replace(/\./g, '\\.') // Escape dots
            .replace(/\*/g, '.*')  // * -> any characters
            .replace(/\?/g, '.')   // ? -> single character
            .replace(/\[([^\]]+)\]/g, (match, chars) => {
                // Character classes
                return `[${chars}]`;
            });
        
        return new RegExp(`^${regexPattern}$`);
    }

    handleUserPatternChange = (e) => {
        const pattern = e.target.value;
        this.setState({ 
            userPattern: pattern,
            isPatternValid: this.validatePattern(pattern)
        }, () => {
            if (pattern) {
                this.updateMatches(pattern, 'custom');
            }
        });
    }

    handleUserTestInputChange = (e) => {
        this.setState({ userTestInput: e.target.value });
    }

    testUserPattern = () => {
        const { userPattern, userTestInput } = this.state;
        
        if (!userPattern || !userTestInput) {
            this.setState({ userResults: [] });
            return;
        }

        try {
            const regex = this.patternToRegex(userPattern);
            const matches = regex.test(userTestInput);
            
            this.setState({
                userResults: [{
                    pattern: userPattern,
                    input: userTestInput,
                    matches: matches,
                    explanation: this.getPatternExplanation(userPattern, userTestInput)
                }]
            });
        } catch (error) {
            this.setState({ 
                userResults: [{
                    pattern: userPattern,
                    input: userTestInput,
                    matches: false,
                    explanation: 'Invalid pattern syntax'
                }],
                isPatternValid: false
            });
        }
    }

    validatePattern = (pattern) => {
        try {
            this.patternToRegex(pattern);
            return true;
        } catch {
            return false;
        }
    }

    getPatternExplanation = (pattern, input) => {
        const explanations = {
            '*': 'Matches any sequence of characters (including empty)',
            '?': 'Matches exactly one character',
            '[]': 'Matches any one character from the set'
        };
        
        if (pattern.includes('*')) {
            return explanations['*'];
        } else if (pattern.includes('?')) {
            return explanations['?'];
        } else if (pattern.includes('[') && pattern.includes(']')) {
            return explanations['[]'];
        }
        
        return 'Literal string match';
    }

    render() {
        const { 
            isDarkMode, 
            currentPattern, 
            patternType,
            exampleMatches,
            userPattern,
            userTestInput,
            userResults,
            isPatternValid,
            showPatternDetails
        } = this.state;
        
        const themeClasses = isDarkMode 
            ? 'dark:bg-gray-900 dark:text-gray-100' 
            : 'bg-gray-50 text-gray-800';
        
        const cardClasses = isDarkMode
            ? 'dark:bg-gray-800 dark:border-gray-700'
            : 'bg-white border-gray-200';

        const accentColor = isDarkMode ? 'dark:text-blue-400' : 'text-blue-600';
        const successColor = isDarkMode ? 'dark:text-green-400' : 'text-green-600';

        // Pattern examples
        const patternExamples = [
            {
                type: 'asterisk',
                pattern: '*.txt',
                name: 'Asterisk (*)',
                description: 'Matches any sequence of characters',
                examples: ['*.txt', 'report*', '*data*', '*.{jpg,png}']
            },
            {
                type: 'question',
                pattern: 'file?.txt',
                name: 'Question Mark (?)',
                description: 'Matches exactly one character',
                examples: ['file?.txt', 'image-??.jpg', 'doc_?.pdf']
            },
            {
                type: 'brackets',
                pattern: 'file[0-9].txt',
                name: 'Square Brackets ([])',
                description: 'Matches any one character from set',
                examples: ['file[0-9].txt', '[abc]*.txt', 'image-[A-Z].jpg']
            },
            {
                type: 'combined',
                pattern: '*[0-9]?.txt',
                name: 'Combined Patterns',
                description: 'Mix wildcards for complex matching',
                examples: ['*[0-9]?.txt', 'file_*[a-z].???', '[A-Z]*[0-9]*']
            }
        ];

        return (
            <div className={`min-h-screen transition-colors duration-500 ${themeClasses}`}>
                {/* Global styles for animations */}
                <style>
                    {`
                    @keyframes fadeSlideUp {
                        0% {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    @keyframes patternHighlight {
                        0%, 100% {
                            background-color: transparent;
                        }
                        50% {
                            background-color: rgba(59, 130, 246, 0.2);
                        }
                    }
                    
                    .motion-safe-fade-slide-up {
                        animation: fadeSlideUp 0.6s ease-out forwards;
                    }
                    
                    .fade-slide-up-0-2s {
                        animation: fadeSlideUp 0.8s ease-out 0.2s forwards;
                    }
                    
                    .fade-slide-up-0-4s {
                        animation: fadeSlideUp 0.8s ease-out 0.4s forwards;
                    }
                    
                    .fade-slide-up-0-6s {
                        animation: fadeSlideUp 0.8s ease-out 0.6s forwards;
                    }
                    
                    .fade-slide-up-0-8s {
                        animation: fadeSlideUp 0.8s ease-out 0.8s forwards;
                    }
                    
                    .fade-slide-up-1s {
                        animation: fadeSlideUp 0.8s ease-out 1s forwards;
                    }
                    
                    .fade-slide-up-1-2s {
                        animation: fadeSlideUp 0.8s ease-out 1.2s forwards;
                    }
                    
                    .fade-slide-up-1-4s {
                        animation: fadeSlideUp 0.8s ease-out 1.4s forwards;
                    }
                    
                    .motion-reduce-safe {
                        animation: none !important;
                        transition: none !important;
                    }
                    
                    .pattern-highlight {
                        animation: patternHighlight 2s ease-in-out infinite;
                    }
                    `}
                </style>

                {/* Header - Fixed height */}
                <header className={clsx(
                    "sticky top-0 z-50 transition-all duration-300 shadow-sm backdrop-blur-sm h-16",
                    isDarkMode ? "dark:bg-gray-800/90" : "bg-white/90"
                )}>
                    <div className="container mx-auto px-6 h-full">
                        <div className="flex justify-between items-center h-full">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={this.toggleDarkMode}
                                    className={clsx(
                                        "p-2 rounded-lg transition-all duration-300 hover:scale-105",
                                        isDarkMode ? "dark:bg-gray-700 dark:hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
                                    )}
                                    aria-label="Toggle dark mode"
                                >
                                    {isDarkMode ? '🌙' : '☀️'}
                                </button>
                                <h1 className="text-xl md:text-2xl font-bold motion-safe-fade-slide-up">
                                    Topic 9: <span className={accentColor}>Wildcards: *, ?, []</span>
                                </h1>
                            </div>
                            <div className={clsx(
                                "px-3 py-1 rounded-full text-sm",
                                isPatternValid ? "bg-green-500/20 text-green-600 dark:text-green-400" : "bg-red-500/20 text-red-600 dark:text-red-400"
                            )}>
                                {isPatternValid ? 'Valid Pattern' : 'Invalid Pattern'}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content with fixed structure */}
                <main className="container mx-auto px-4 md:px-6 py-6">
                    {/* Concept Explanation Section - Compact */}
                    <section className="mb-8 motion-safe-fade-slide-up">
                        <div className={clsx(
                            "rounded-xl p-4 md:p-6 shadow-lg transition-all duration-300 hover:shadow-xl border",
                            cardClasses
                        )}>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4 flex items-center gap-2">
                                <span className="p-2 rounded-lg bg-blue-500/10">🎯</span>
                                Wildcard Pattern Fundamentals
                            </h2>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
                                            Prototype / Signature
                                        </h3>
                                        <div className={clsx(
                                            "p-3 rounded-lg font-mono text-sm",
                                            isDarkMode ? "dark:bg-gray-900" : "bg-gray-100"
                                        )}>
                                            <code>command *pattern* [options]</code>
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
                                            Purpose
                                        </h3>
                                        <p className="text-sm leading-relaxed">
                                            Select multiple files/directories using pattern matching rather than specifying each individually. Essential for batch operations and automation.
                                        </p>
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
                                        When & Why It's Used
                                    </h3>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-start gap-2">
                                            <span className={clsx("p-1 rounded mt-0.5", successColor)}>✓</span>
                                            <span>Batch file operations: Move/copy/delete groups</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className={clsx("p-1 rounded mt-0.5", successColor)}>✓</span>
                                            <span>Log file management: Process all <code>*.log</code> files</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className={clsx("p-1 rounded mt-0.5", successColor)}>✓</span>
                                            <span>Data processing: Import all <code>*.csv</code> files</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Interactive Pattern Explorer - More compact */}
                    <section className="mb-8 fade-slide-up-0-2s">
                        <div className={clsx(
                            "rounded-xl p-4 md:p-6 shadow-lg transition-all duration-300 hover:shadow-xl border",
                            cardClasses
                        )}>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                                    <span className="p-2 rounded-lg bg-green-500/10">🔍</span>
                                    Pattern Explorer
                                </h2>
                                <div className="text-sm text-gray-500">
                                    Current: <code className="font-bold ml-1">{currentPattern}</code>
                                </div>
                            </div>
                            
                            <div className="space-y-4">
                                {/* Pattern Selector */}
                                <div>
                                    <h3 className="font-semibold mb-3">Select Pattern Type</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {patternExamples.map((example, index) => (
                                            <button
                                                key={example.type}
                                                onClick={() => this.handlePatternChange(example.pattern, example.type)}
                                                className={clsx(
                                                    "p-3 rounded-lg transition-all duration-300 hover:scale-105 flex flex-col items-center justify-center border",
                                                    patternType === example.type 
                                                    ? clsx(
                                                        isDarkMode ? "dark:bg-blue-900/20 dark:border-blue-500" : "bg-blue-50 border-blue-500"
                                                    ) 
                                                    : clsx(
                                                        isDarkMode ? "dark:bg-gray-700/50 dark:hover:bg-gray-700 dark:border-gray-600" : 
                                                        "bg-gray-100 hover:bg-gray-200 border-gray-300"
                                                    )
                                                )}
                                                style={{ animationDelay: `${index * 100 + 200}ms` }}
                                            >
                                                <code className="text-sm md:text-base font-bold mb-1">{example.pattern}</code>
                                                <div className="text-xs text-center">{example.name}</div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                {/* Pattern Matches Display */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold">Matching Files</h3>
                                        <span className="text-xs text-gray-500">
                                            {exampleMatches.length} matches
                                        </span>
                                    </div>
                                    <div className={clsx(
                                        "p-3 rounded-lg h-48 overflow-y-auto",
                                        isDarkMode ? "dark:bg-gray-900" : "bg-gray-100"
                                    )}>
                                        {exampleMatches.length > 0 ? (
                                            <div className="space-y-1.5">
                                                {exampleMatches.map((file, index) => (
                                                    <div 
                                                        key={file}
                                                        className={clsx(
                                                            "p-2 rounded flex items-center justify-between transition-all duration-300 hover:scale-[1.01]",
                                                            isDarkMode ? "dark:bg-gray-800 dark:hover:bg-gray-700" : "bg-white hover:bg-gray-50"
                                                        )}
                                                        style={{ animationDelay: `${index * 50 + 300}ms` }}
                                                    >
                                                        <code className="font-mono text-sm">{file}</code>
                                                        <span className={clsx(
                                                            "px-1.5 py-0.5 rounded text-xs",
                                                            successColor,
                                                            isDarkMode ? "dark:bg-green-900/30" : "bg-green-100"
                                                        )}>
                                                            ✓
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="h-full flex items-center justify-center">
                                                <div className="text-center">
                                                    <div className="text-2xl mb-1">🔍</div>
                                                    <p className="text-gray-500 text-sm">No files match</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Pattern Testing Playground - More compact */}
                    <section className="mb-8 fade-slide-up-0-4s">
                        <div className={clsx(
                            "rounded-xl p-4 md:p-6 shadow-lg transition-all duration-300 hover:shadow-xl border",
                            cardClasses
                        )}>
                            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
                                <span className="p-2 rounded-lg bg-yellow-500/10">🧪</span>
                                Pattern Testing
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    {/* Input Section */}
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                Enter Pattern:
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={userPattern}
                                                    onChange={this.handleUserPatternChange}
                                                    className={clsx(
                                                        "w-full p-3 rounded-lg font-mono text-sm border-2 transition-all duration-300",
                                                        isPatternValid 
                                                        ? clsx(
                                                            isDarkMode ? "dark:border-green-500/50 dark:bg-gray-900" : "border-green-500/50 bg-gray-100"
                                                        ) 
                                                        : clsx(
                                                            isDarkMode ? "dark:border-red-500/50 dark:bg-gray-900" : "border-red-500/50 bg-gray-100"
                                                        )
                                                    )}
                                                    placeholder="e.g., *.txt"
                                                />
                                                <div className="absolute right-2 top-2.5">
                                                    {isPatternValid ? (
                                                        <span className="text-green-500 text-sm">✓</span>
                                                    ) : (
                                                        <span className="text-red-500 text-sm">✗</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-medium mb-1">
                                                Test Input:
                                            </label>
                                            <input
                                                type="text"
                                                value={userTestInput}
                                                onChange={this.handleUserTestInputChange}
                                                className={clsx(
                                                    "w-full p-3 rounded-lg font-mono border transition-all duration-300 text-sm",
                                                    isDarkMode ? "dark:bg-gray-900 dark:border-gray-700" : "bg-gray-100 border-gray-300"
                                                )}
                                                placeholder="e.g., file.txt"
                                            />
                                        </div>
                                        
                                        <button
                                            onClick={this.testUserPattern}
                                            disabled={!userPattern || !userTestInput}
                                            className={clsx(
                                                "w-full py-2.5 rounded-lg font-medium transition-all duration-300 text-sm",
                                                (!userPattern || !userTestInput)
                                                ? "bg-gray-300 cursor-not-allowed dark:bg-gray-700"
                                                : "bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.02]"
                                            )}
                                        >
                                            Test Pattern Match
                                        </button>
                                    </div>
                                    
                                    {/* Results Section */}
                                    <div>
                                        <h3 className="font-semibold mb-2">Test Results</h3>
                                        
                                        {userResults.length > 0 ? (
                                            <div className="space-y-3">
                                                {userResults.map((result, index) => (
                                                    <div 
                                                        key={index}
                                                        className={clsx(
                                                            "p-3 rounded-lg border transition-all duration-300",
                                                            result.matches
                                                            ? clsx(
                                                                isDarkMode ? "dark:border-green-500/30 dark:bg-green-500/5" : "border-green-500/30 bg-green-50"
                                                            )
                                                            : clsx(
                                                                isDarkMode ? "dark:border-red-500/30 dark:bg-red-500/5" : "border-red-500/30 bg-red-50"
                                                            )
                                                        )}
                                                        style={{ animationDelay: `${index * 100 + 400}ms` }}
                                                    >
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="font-mono text-sm">
                                                                Pattern: <code className="font-bold">{result.pattern}</code>
                                                            </div>
                                                            <div className={clsx(
                                                                "px-2 py-0.5 rounded-full font-medium text-xs",
                                                                result.matches
                                                                ? clsx(
                                                                    isDarkMode ? "dark:bg-green-900/30 dark:text-green-400" : "bg-green-100 text-green-700"
                                                                )
                                                                : clsx(
                                                                    isDarkMode ? "dark:bg-red-900/30 dark:text-red-400" : "bg-red-100 text-red-700"
                                                                )
                                                            )}>
                                                                {result.matches ? 'MATCH' : 'NO MATCH'}
                                                            </div>
                                                        </div>
                                                        
                                                        <div className={clsx(
                                                            "p-2 rounded text-sm",
                                                            isDarkMode ? "dark:bg-gray-800" : "bg-gray-200"
                                                        )}>
                                                            <div className="font-medium mb-0.5">Explanation:</div>
                                                            <div className="text-xs">{result.explanation}</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className={clsx(
                                                "h-32 flex items-center justify-center rounded-lg",
                                                isDarkMode ? "dark:bg-gray-900" : "bg-gray-100"
                                            )}>
                                                <div className="text-center">
                                                    <div className="text-2xl mb-1">🔎</div>
                                                    <p className="text-gray-500 text-xs">No test results yet</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Real-World Scenarios - More compact */}
                    <section className="mb-8 fade-slide-up-0-6s">
                        <div className={clsx(
                            "rounded-xl p-4 md:p-6 shadow-lg transition-all duration-300 hover:shadow-xl border",
                            cardClasses
                        )}>
                            <h2 className="text-xl md:text-2xl font-bold mb-4 flex items-center gap-2">
                                <span className="p-2 rounded-lg bg-purple-500/10">🌍</span>
                                Real-World Examples
                            </h2>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                                {[
                                    {
                                        scenario: "School Lab Cleanup",
                                        location: "Barrackpore High School",
                                        solution: "mv *_{Swadeep,Abhronila}_* archive/",
                                        pattern: "*_{Swadeep,Abhronila}_*"
                                    },
                                    {
                                        scenario: "Log Rotation",
                                        location: "Shyamnagar College",
                                        solution: "gzip access_log.[0-9][0-9][0-9][0-9]-*.log",
                                        pattern: "access_log.[0-9][0-9][0-9][0-9]-*.log"
                                    },
                                    {
                                        scenario: "Photo Organization",
                                        location: "Ichapur Center",
                                        solution: "mv *event*[0-9][0-9][0-9][0-9][0-9][0-9]*.jpg events/",
                                        pattern: "*event*[0-9][0-9][0-9][0-9][0-9][0-9]*.jpg"
                                    },
                                    {
                                        scenario: "Backup Management",
                                        location: "Naihati IT",
                                        solution: "rm backup_????-??-??_??.bak",
                                        pattern: "backup_????-??-??_??.bak"
                                    }
                                ].map((example, index) => (
                                    <div 
                                        key={index}
                                        className={clsx(
                                            "p-3 rounded-lg transition-all duration-300 hover:scale-[1.01]",
                                            isDarkMode ? "dark:bg-gray-700/50 dark:hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"
                                        )}
                                        style={{ animationDelay: `${index * 100 + 600}ms` }}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-semibold text-sm text-blue-600 dark:text-blue-400">
                                                {example.scenario}
                                            </h3>
                                            <span className={clsx(
                                                "px-1.5 py-0.5 rounded text-xs",
                                                isDarkMode ? "dark:bg-purple-900/30" : "bg-purple-100"
                                            )}>
                                                {example.location}
                                            </span>
                                        </div>
                                        <div className="mb-2">
                                            <div className="text-xs text-gray-500 mb-0.5">Solution:</div>
                                            <div className={clsx(
                                                "p-2 rounded font-mono text-xs",
                                                isDarkMode ? "dark:bg-gray-900" : "bg-gray-900 text-gray-100"
                                            )}>
                                                {example.solution}
                                            </div>
                                        </div>
                                        <div className="text-xs">
                                            <span className="text-gray-500">Pattern: </span>
                                            <code className="font-bold">{example.pattern}</code>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Common Pitfalls & Best Practices - More compact */}
                    <section className="mb-8 fade-slide-up-0-8s">
                        <div className={clsx(
                            "rounded-xl p-4 md:p-6 shadow-lg transition-all duration-300 hover:shadow-xl border",
                            cardClasses
                        )}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-red-600 dark:text-red-400">
                                        <span className="p-1 rounded-lg bg-red-500/10">⚠️</span>
                                        Common Pitfalls
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        {[
                                            {
                                                issue: "Hidden Files",
                                                solution: "Use shopt -s dotglob",
                                                example: "*.txt doesn't match .hidden.txt"
                                            },
                                            {
                                                issue: "Space in Names",
                                                solution: "Use quotes: rm \"*.txt\"",
                                                example: "rm *.txt fails with 'my file.txt'"
                                            },
                                            {
                                                issue: "No Matches",
                                                solution: "Use shopt -s nullglob",
                                                example: "ls *.xyz shows '*.xyz' file"
                                            }
                                        ].map((pitfall, index) => (
                                            <div 
                                                key={index}
                                                className={clsx(
                                                    "p-3 rounded-lg border transition-all duration-300 hover:scale-[1.01]",
                                                    isDarkMode 
                                                    ? "dark:border-red-500/20 dark:bg-red-500/5 dark:hover:bg-red-500/10" 
                                                    : "border-red-200 bg-red-50 hover:bg-red-100"
                                                )}
                                            >
                                                <h4 className="font-medium text-sm mb-1">{pitfall.issue}</h4>
                                                <div className={clsx(
                                                    "p-1.5 rounded text-xs font-mono mb-1",
                                                    isDarkMode ? "dark:bg-gray-900" : "bg-gray-100"
                                                )}>
                                                    {pitfall.example}
                                                </div>
                                                <div className={clsx(
                                                    "text-xs p-1.5 rounded",
                                                    isDarkMode ? "dark:bg-green-900/20" : "bg-green-100"
                                                )}>
                                                    <strong className="text-xs">Fix:</strong> {pitfall.solution}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-green-600 dark:text-green-400">
                                        <span className="p-1 rounded-lg bg-green-500/10">✅</span>
                                        Best Practices
                                    </h3>
                                    
                                    <div className="space-y-3">
                                        {[
                                            {
                                                practice: "Test First",
                                                tip: "echo rm *.log before actually deleting"
                                            },
                                            {
                                                practice: "Quote Carefully",
                                                tip: 'tar czf "backup-*.tar.gz" *'
                                            },
                                            {
                                                practice: "Use find for Complex",
                                                tip: "find . -name '*.log' -mtime +30 -delete"
                                            }
                                        ].map((practice, index) => (
                                            <div 
                                                key={index}
                                                className="flex items-start gap-2 p-2 rounded-lg hover:bg-blue-500/5 transition-all duration-300"
                                            >
                                                <span className={clsx(
                                                    "p-1.5 rounded-full text-xs",
                                                    isDarkMode ? "dark:bg-green-500/20" : "bg-green-100"
                                                )}>
                                                    {index + 1}
                                                </span>
                                                <div>
                                                    <strong className="font-medium text-sm block mb-0.5">{practice.practice}</strong>
                                                    <div className={clsx(
                                                        "text-xs p-1.5 rounded",
                                                        isDarkMode ? "dark:bg-gray-800" : "bg-gray-200"
                                                    )}>
                                                        💡 {practice.tip}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Teacher's Note - More compact */}
                    <section className="mb-8 fade-slide-up-1s">
                        <div className={clsx(
                            "rounded-xl p-4 md:p-6 shadow-lg transition-all duration-300 hover:shadow-xl border",
                            isDarkMode 
                            ? "dark:border-yellow-500/20 dark:bg-yellow-500/5 dark:hover:bg-yellow-500/10" 
                            : "border-yellow-200 bg-yellow-50 hover:bg-yellow-100"
                        )}>
                            <div className="flex items-start gap-3">
                                <div className={clsx(
                                    "p-2 rounded-full",
                                    isDarkMode ? "dark:bg-yellow-500/20" : "bg-yellow-100"
                                )}>
                                    <span className="text-xl">👨‍🏫</span>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-lg font-bold mb-2 text-yellow-600 dark:text-yellow-400">
                                        Teacher's Note
                                    </h2>
                                    <div className="space-y-3">
                                        <p className="text-sm leading-relaxed">
                                            <strong>Key Insight:</strong> Wildcards are expanded by the shell, not by individual commands. <code>ls *.txt</code> becomes <code>ls file1.txt file2.txt</code> <em>before</em> ls executes.
                                        </p>
                                        
                                        <div className={clsx(
                                            "p-2.5 rounded-lg text-sm",
                                            isDarkMode ? "dark:bg-gray-800" : "bg-white"
                                        )}>
                                            <strong className="block mb-1">Classroom Tip:</strong>
                                            <p>
                                                Start with literal matches (<code>file.txt</code>), add one wildcard (<code>*.txt</code>), then combine (<code>*[0-9].txt</code>). Gradual approach builds confidence.
                                            </p>
                                        </div>
                                        
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="font-medium text-sm">— Sukanta Hui</span>
                                            <span className={clsx(
                                                "px-2 py-0.5 rounded-full text-xs",
                                                isDarkMode ? "dark:bg-blue-500/20" : "bg-blue-100"
                                            )}>
                                                Shell Scripting Expert
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Mini Checklist - More compact */}
                    <section className="fade-slide-up-1-2s motion-reduce-safe">
                        <div className={clsx("rounded-xl p-4 md:p-6 shadow-lg border", cardClasses)}>
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <span className="p-1.5 rounded-lg bg-green-500/10">✅</span>
                                Pattern Checklist
                            </h2>
                            
                            <div className="grid md:grid-cols-2 gap-3">
                                {[
                                    "* matches any sequence (including empty)",
                                    "? matches exactly one character",
                                    "[] matches character sets/ranges",
                                    "[abc] matches a, b, or c",
                                    "[!abc] excludes characters",
                                    "Combine wildcards: *[0-9]?.txt",
                                    "Quote patterns with spaces/special chars",
                                    "Test with ls or echo before destructive ops",
                                    "Consider extended globbing for complex patterns",
                                    "Use find for recursive matching",
                                    "Hidden files start with .",
                                    "Shell expands patterns before commands"
                                ].map((item, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-500/5 transition-all duration-300"
                                        style={{ animationDelay: `${index * 30 + 1200}ms` }}
                                    >
                                        <input 
                                            type="checkbox" 
                                            id={`check-${index}`}
                                            className="w-4 h-4 rounded border-gray-300"
                                        />
                                        <label htmlFor={`check-${index}`} className="text-xs cursor-pointer flex-1">
                                            {item}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* How Shell Expands Wildcards */}
<section className="mt-8 fade-slide-up-1-4s motion-reduce-safe">
    <div className={clsx(
        "rounded-xl p-4 md:p-6 shadow-lg transition-all duration-300 hover:shadow-xl border",
        cardClasses
    )}>
        <h2 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
            <span className="p-2 rounded-lg bg-indigo-500/10">🧠</span>
            How the Shell Expands Wildcards (Step-by-Step)
        </h2>

        <div className="space-y-4 text-sm leading-relaxed">
            <p>
                One of the most important concepts to understand is that
                <strong className="mx-1">wildcards are expanded by the shell</strong>,
                not by the command itself.
            </p>

            <div className={clsx(
                "p-3 rounded-lg font-mono text-xs",
                isDarkMode ? "dark:bg-gray-900" : "bg-gray-100"
            )}>
                ls *.txt
            </div>

            <p className="font-medium">Internally, the shell performs these steps:</p>

            <ol className="list-decimal list-inside space-y-2">
                <li>
                    The shell scans the current directory.
                </li>
                <li>
                    It finds all filenames matching <code>*.txt</code>.
                </li>
                <li>
                    It replaces the wildcard with actual filenames.
                </li>
                <li>
                    The final command is executed.
                </li>
            </ol>

            <div className={clsx(
                "p-3 rounded-lg font-mono text-xs",
                isDarkMode ? "dark:bg-gray-900" : "bg-gray-100"
            )}>
                ls notes.txt report.txt document.txt
            </div>

            <div className={clsx(
                "p-3 rounded-lg border text-xs",
                isDarkMode
                    ? "dark:border-blue-500/30 dark:bg-blue-500/5"
                    : "border-blue-200 bg-blue-50"
            )}>
                <strong>Important:</strong>  
                If no files match the pattern, the shell may pass the pattern
                <em>as-is</em> to the command (unless <code>nullglob</code> is enabled).
            </div>
        </div>
    </div>
</section>
{/* ================= Worked Examples ================= */}
<section className="mb-8 fade-slide-up-0-4s">
    <div className={clsx(
        "rounded-xl p-4 md:p-6 shadow-lg border",
        cardClasses
    )}>
        <h2 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="p-2 rounded-lg bg-indigo-500/10">📘</span>
            Worked Examples (Command → Output)
        </h2>

        <div className="space-y-6">

            {/* Example 1 */}
            <div className={clsx(
                "p-4 rounded-lg border",
                isDarkMode ? "dark:bg-gray-800 dark:border-gray-700" : "bg-gray-100 border-gray-300"
            )}>
                <h3 className="font-semibold mb-2">Example 1: Match all text files</h3>

                <p className="text-sm mb-3">
                    This command lists all files ending with <code>.txt</code> in the current directory.
                </p>

                <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">Command:</div>
                    <pre className="p-3 rounded bg-black text-green-400 text-sm overflow-x-auto">
ls *.txt
                    </pre>
                </div>

                <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">Sample Output:</div>
                    <pre className="p-3 rounded bg-black text-gray-100 text-sm overflow-x-auto">
notes.txt
report.txt
summary.txt
                    </pre>
                </div>

                <p className="text-sm">
                    <strong>Explanation:</strong> The <code>*</code> wildcard matches any sequence of characters before
                    <code>.txt</code>, so all text files are selected.
                </p>
            </div>

            {/* Example 2 */}
            <div className={clsx(
                "p-4 rounded-lg border",
                isDarkMode ? "dark:bg-gray-800 dark:border-gray-700" : "bg-gray-100 border-gray-300"
            )}>
                <h3 className="font-semibold mb-2">Example 2: Match files with exactly one character</h3>

                <p className="text-sm mb-3">
                    This pattern matches files where exactly one character appears in place of <code>?</code>.
                </p>

                <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">Command:</div>
                    <pre className="p-3 rounded bg-black text-green-400 text-sm overflow-x-auto">
ls file?.txt
                    </pre>
                </div>

                <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">Sample Output:</div>
                    <pre className="p-3 rounded bg-black text-gray-100 text-sm overflow-x-auto">
file1.txt
file2.txt
                    </pre>
                </div>

                <p className="text-sm">
                    <strong>Explanation:</strong> The <code>?</code> wildcard matches exactly one character.
                    Files like <code>file10.txt</code> are not matched.
                </p>
            </div>

            {/* Example 3 */}
            <div className={clsx(
                "p-4 rounded-lg border",
                isDarkMode ? "dark:bg-gray-800 dark:border-gray-700" : "bg-gray-100 border-gray-300"
            )}>
                <h3 className="font-semibold mb-2">Example 3: Match numeric filenames</h3>

                <p className="text-sm mb-3">
                    Character classes allow matching only specific characters.
                </p>

                <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">Command:</div>
                    <pre className="p-3 rounded bg-black text-green-400 text-sm overflow-x-auto">
ls file[0-9].txt
                    </pre>
                </div>

                <div className="mb-3">
                    <div className="text-xs text-gray-500 mb-1">Sample Output:</div>
                    <pre className="p-3 rounded bg-black text-gray-100 text-sm overflow-x-auto">
file1.txt
file2.txt
file9.txt
                    </pre>
                </div>

                <p className="text-sm">
                    <strong>Explanation:</strong> <code>[0-9]</code> matches any single digit from 0 to 9.
                </p>
            </div>

        </div>
    </div>
</section>

                </main>

                {/* Footer - Fixed height */}
                <footer className={clsx(
                    "py-4 border-t",
                    isDarkMode ? "dark:border-gray-800" : "border-gray-200"
                )}>
                    <div className="container mx-auto px-6 text-center text-gray-500 text-xs">
                        <p>Topic 9: Wildcards Pattern Matching | Next: Topic 10: Regular Expressions</p>
                        <p className="mt-1">Interactive Learning Module • Pattern Matching</p>
                    </div>
                </footer>
            </div>
        );
    }
}

