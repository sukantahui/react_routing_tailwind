import React from 'react';

export default class Topic11 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isVisible: true });
        }, 50);
    }

    render() {
        const { isVisible } = this.state;

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
                <div className="max-w-3xl mx-auto">

                    {/* Header */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-3 h-12 bg-gradient-to-b from-emerald-500 to-cyan-600 rounded-full animate-pulse"></div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100">
                                Counting Files and Directories Using Shell Tools
                            </h1>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                Mastering the art of accurately counting files, directories, and understanding disk usage
                                — essential skills for system analysis and monitoring.
                            </p>
                            <div className="p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    Imagine <span className="font-semibold text-emerald-600 dark:text-emerald-400">Debangshu</span> at Naihati Server Farm needing to count
                                    how many log files were generated overnight across hundreds of directories.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Core Concept */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Why Counting Matters</h2>

                        <div className="bg-gradient-to-br from-white to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                                Counting isn't just about numbers — it's about understanding system state, monitoring growth,
                                identifying anomalies, and managing resources effectively.
                            </p>

                            <div className="space-y-4">
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border-l-4 border-blue-500">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                                            <span className="text-blue-600 dark:text-blue-300 font-bold">📊</span>
                                        </div>
                                        <h3 className="font-bold text-gray-800 dark:text-gray-200">System Monitoring</h3>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Track file growth to predict storage needs and prevent disk full scenarios.
                                    </p>
                                </div>

                                <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl border-l-4 border-purple-500">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center">
                                            <span className="text-purple-600 dark:text-purple-300 font-bold">🔍</span>
                                        </div>
                                        <h3 className="font-bold text-gray-800 dark:text-gray-200">Debugging</h3>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Unexpected file counts can indicate application issues or security breaches.
                                    </p>
                                </div>

                                <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border-l-4 border-green-500">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                                            <span className="text-green-600 dark:text-green-300 font-bold">📁</span>
                                        </div>
                                        <h3 className="font-bold text-gray-800 dark:text-gray-200">Cleanup Decisions</h3>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        <span className="font-semibold">Tuhina</span> at Ichapur Tech uses counts to decide which directories to archive.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* The Basic: wc -l */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">The Foundation: <code>wc -l</code></h2>

                        <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <style>
                                {`
                                    @keyframes countUp {
                                        0% { opacity: 0; transform: translateY(10px); }
                                        100% { opacity: 1; transform: translateY(0); }
                                    }
                                `}
                            </style>

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Prototype & Purpose</h3>
                                <h4>wc stands for Word Count</h4>
                                <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono">
                                    <div className="text-cyan-400">Command:</div>
                                    <div>wc -l [file]</div>
                                    <div className="text-cyan-400 mt-2">Return Type:</div>
                                    <div>Integer count</div>
                                    <div className="text-cyan-400 mt-2">Purpose:</div>
                                    <div>Count lines in a file or from stdin</div>
                                </div>
                            </div>

                            <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl mb-6">
                                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Real-world Usage</h4>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    When <span className="font-semibold">Swadeep</span> at Barrackpore University analyzes CSV files, he uses:
                                </p>
                                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                                    # Count rows in data.csv (excluding header)<br />
                                    $ wc -l data.csv<br />
                                    <span className="text-green-400" style={{ animation: 'countUp 0.5s ease-out' }}>100000 data.csv</span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                    This shows 100,000 lines including the header row. For pure data rows: <code>{'wc -l data.csv | awk \'{print $1-1}\''}</code>
                                </p>
                            </div>

                            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border-l-4 border-yellow-500">
                                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Common Beginner Mistake</h4>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Using <code>wc</code> without <code>-l</code> gives three numbers: lines, words, characters.
                                    Beginners often get confused which is which.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Counting Files with find and wc */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Counting Files: The <code>find | wc -l</code> Pattern</h2>

                        <div className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">The Standard Pattern</h3>
                                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                                    find [directory] [options] | wc -l
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 mt-3">
                                    This pipeline is the bread and butter of file counting in Unix/Linux.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-green-200 dark:border-green-800">
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Example 1: Count All Files Recursively</h4>
                                    <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm mb-3">
                                        $ find . -type f | wc -l<br />
                                        <span className="text-green-400">8472</span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        Counts all regular files starting from current directory.
                                    </p>
                                </div>

                                <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-blue-200 dark:border-blue-800">
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Example 2: Count Directories Only</h4>
                                    <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm mb-3">
                                        $ find . -type d | wc -l<br />
                                        <span className="text-green-400">243</span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        Useful for understanding directory structure complexity.
                                    </p>
                                </div>

                                <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-purple-200 dark:border-purple-800">
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Example 3: Count by File Type</h4>
                                    <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm mb-3">
                                        $ find . -name "*.log" -type f | wc -l<br />
                                        <span className="text-green-400">156</span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        <span className="font-semibold">Abhronila</span> uses this at Shyamnagar Lab to count log files.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border-l-4 border-red-500">
                                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">⚠ Critical Pitfall</h4>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Files with newlines in their names will be counted incorrectly! <code>find</code> outputs one filename per line.
                                </p>
                                <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-3 rounded-lg font-mono text-sm mt-2">
                                    # Problematic:<br />
                                    file with<br />newline.txt  # Counts as 2 files!
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* The find -exec Technique */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Robust Counting with <code>find -exec</code></h2>

                        <div className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Handling Special Characters</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    For production systems where filenames may contain newlines or special characters,
                                    use <code>find -exec</code> with <code>printf</code>.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Safe Counting Method</h4>
                                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3">
                                        $ find . -type f -exec printf '.' \; | wc -c<br />
                                        <span className="text-green-400">8472</span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        Prints one dot per file, then counts characters. Works with any filename.
                                    </p>
                                </div>

                                <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Alternative: Using find with -print0</h4>
                                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3">
                                        $ find . -type f -print0 | tr -cd '\\0' | wc -c<br />
                                        <span className="text-green-400">8472</span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        Null-terminated filenames, counts null bytes. Most robust method.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Professional Insight</h4>
                                <p className="text-gray-700 dark:text-gray-300">
                                    <span className="font-semibold">Debangshu</span> at Naihati Server Farm always uses the <code>-print0</code> method
                                    for production scripts because it handles all edge cases.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Using ls and awk */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '500ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Quick Counts with <code>ls</code> and <code>awk</code></h2>

                        <div className="bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">For Small to Medium Directories</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    When you know the directory isn't huge, these quick methods are convenient.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="p-5 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Count Visible Files</h4>
                                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3">
                                        $ ls -1 | wc -l<br />
                                        <span className="text-green-400">42</span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        <code>-1</code> ensures one file per line format. Excludes dotfiles.
                                    </p>
                                </div>

                                <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Count All Files (Including Hidden)</h4>
                                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3">
                                        $ ls -1A | wc -l<br />
                                        <span className="text-green-400">57</span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        <code>-A</code> shows all files except . and ..
                                    </p>
                                </div>

                                <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Using awk for Complex Counting</h4>
                                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3">
                                        <code>{'ls -l | awk \'NR>1 && !/^d/ {count++} END {print count}\''}</code>
                                        <span className="text-green-400">35</span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        Counts only regular files (not directories). <span className="font-semibold">Tuhina</span> uses this at Ichapur Tech.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border-l-4 border-red-500">
                                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">⚠️ Important Warning</h4>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Never use <code>ls | wc -l</code> without <code>-1</code>!
                                    The output format varies by terminal width, giving incorrect counts.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Counting with tree command */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">The <code>tree</code> Command: Visual Counting</h2>

                        <div className="bg-gradient-to-br from-white to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">When You Need Both Count and Structure</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    <code>tree</code> provides a beautiful visual representation with automatic counts.
                                </p>
                            </div>

                            <div className="p-5 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl mb-6">
                                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Basic Usage</h4>
                                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3">
                                    $ tree<br />
                                    .<br />
                                    ├── dir1<br />
                                    │&nbsp;&nbsp;├── file1.txt<br />
                                    │&nbsp;&nbsp;└── file2.txt<br />
                                    ├── dir2<br />
                                    │&nbsp;&nbsp;└── file3.txt<br />
                                    └── file4.txt<br /><br />
                                    <span className="text-green-400">3 directories, 4 files</span>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                    Shows both the structure and gives you the count at the end.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Just Get the Count</h4>
                                    <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm">
                                        $ tree -a | tail -1<br />
                                        <span className="text-green-400">7 directories, 42 files</span>
                                    </div>
                                </div>

                                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Count Files Only</h4>
                                    <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm">
                                        $ find . -type f | wc -l && tree -d | tail -1<br />
                                        <span className="text-green-400">42 files, 7 directories</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
                                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Note</h4>
                                <p className="text-gray-700 dark:text-gray-300">
                                    <code>tree</code> might need to be installed: <code>sudo apt install tree</code> or <code>brew install tree</code>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Teacher's Note */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '700ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Teacher's Note</h2>

                        <div className="bg-gradient-to-br from-white to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative">
                                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                                        <span className="text-white text-2xl font-bold">SH</span>
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-gray-800"></div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Sukanta Hui</h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        [Teacher's professional description will be loaded from JSON file]
                                    </p>
                                </div>
                            </div>

                            <div className="p-5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-xl border-l-4 border-indigo-500">
                                <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Key Insight for Counting</h4>
                                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                                    The most common mistake I see is assuming all counting methods are equal.
                                    <span className="font-semibold text-purple-600 dark:text-purple-400"> Context matters</span>.
                                    What works for a home directory fails spectacularly in production with millions of files.
                                </p>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mt-1">
                                            <span className="text-indigo-600 dark:text-indigo-300 font-bold">1</span>
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300">For scripts: Always use <code>{'find . -type f -print0 | tr -cd "\\0" | wc -c'}</code></span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mt-1">
                                            <span className="text-indigo-600 dark:text-indigo-300 font-bold">2</span>
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300">For interactive use: <code>ls -1A | wc -l</code> is fine for small dirs</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mt-1">
                                            <span className="text-indigo-600 dark:text-indigo-300 font-bold">3</span>
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300">Remember <span className="font-semibold">Swadeep</span>'s project: 2M files broke simple counting methods</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-emerald-900/30 dark:to-cyan-900/30 rounded-lg">
                                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                <span className="text-gray-700 dark:text-gray-300">
                                    Rule of thumb: If you're writing a script, assume the worst filenames possible.
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Mini Checklist */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '800ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">What to Remember</h2>

                        <div className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="space-y-3">
                                {[
                                    "wc -l counts lines, not necessarily files",
                                    "find | wc -l breaks with newlines in filenames",
                                    "For safety: use find -print0 methods",
                                    "ls | wc -l needs -1 flag for accuracy",
                                    "tree gives visual count + structure",
                                    "For scripts, handle all edge cases",
                                    "Count before and after operations"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-shadow duration-300">
                                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                            <svg className="w-4 h-4 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-xl">
                                <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Professional Workflow</h3>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                                    <span className="font-semibold">Abhronila</span> at Shyamnagar Lab uses this pattern:
                                </p>
                                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm">
                                    # Count before and after cleanup<br />
                                    <code>{'BEFORE=$(find . -name "*.tmp" -print0 | tr -cd "\\0" | wc -c)'}</code><br />
                                    # ... cleanup operations ...<br />
                                    <code>{'AFTER=$(find . -name "*.tmp" -print0 | tr -cd "\\0" | wc -c)'}</code><br />
                                    <code>{'echo "Removed $((BEFORE - AFTER)) files"'}</code>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hint Section */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '900ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Think About This...</h2>

                        <div className="bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="space-y-6">
                                <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Observe carefully...</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        What's the difference between these two counts?
                                    </p>
                                    <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                        $ ls -1 | wc -l<br />
                                        42<br />
                                        $ ls -1A | wc -l<br />
                                        57
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                        Why would <span className="font-semibold">Tuhina</span> care about this difference at Ichapur Tech?
                                    </p>
                                </div>

                                <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Try changing this...</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        How would you count only empty directories?
                                    </p>
                                    <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                        # Hint: find has options for empty files/directories<br />
                                        find . -type d _____
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl">
                                <p className="text-gray-700 dark:text-gray-300 text-center">
                                    Remember <span className="font-semibold">Debangshu</span>'s experience: A backup script failed because it counted files incorrectly.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Professional Tips */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '1000ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Professional Tips & Tricks</h2>

                        <div className="space-y-6">
                            <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-purple-200 dark:border-purple-800">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Performance Tip</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    For very large directories, <code>find</code> with <code>-maxdepth</code> is much faster than full recursion.
                                </p>
                                <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                    # Fast: limit depth<br />
                                    find . -maxdepth 2 -type f | wc -l<br /><br />
                                    # Slow: full recursion<br />
                                    find . -type f | wc -l
                                </div>
                            </div>

                            <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-blue-200 dark:border-blue-800">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Monitoring Growth</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Create a cron job to track file count growth over time.
                                </p>
                                <pre className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                                    <code>{`# Daily count tracker
                                    date >> ~/file_counts.log
                                    find /data -type f -print0 | tr -cd '\\0' | wc -c >> ~/file_counts.log`}
                                    </code>
                                </pre>
                            </div>

                            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-green-200 dark:border-green-800">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Alias for Quick Counting</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Add this to your <code>~/.bashrc</code>:
                                </p>
                                <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                    # Count files in current directory<br />
                                    alias countfiles='find . -maxdepth 1 -type f -print0 | tr -cd "\\\\0" | wc -c'<br />
                                    alias countall='find . -type f -print0 | tr -cd "\\\\0" | wc -c'
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '1100ms' }}>
                        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                            <div className="text-center">
                                <div className="text-gray-600 dark:text-gray-400 mb-4">
                                    Topic 7: Counting Files and Directories Using Shell Tools
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-500">
                                    Next: Understanding file timestamps: access, modify, change time
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Reduced motion support */}
                <style>
                    {`
                        @media (prefers-reduced-motion: reduce) {
                            * {
                                animation-duration: 0.01ms !important;
                                animation-iteration-count: 1 !important;
                                transition-duration: 0.01ms !important;
                            }
                        }
                    `}
                </style>
            </div>
        );
    }
}

