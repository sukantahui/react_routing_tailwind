import React from 'react';

export default class Topic6 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            activeTool: 'cat'
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isVisible: true });
        }, 50);
    }

    handleToolChange = (tool) => {
        this.setState({ activeTool: tool });
    }

    render() {
        const { isVisible, activeTool } = this.state;

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
                <div className="max-w-3xl mx-auto">

                    {/* Header */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-3 h-12 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100">
                                Viewing Files: cat, less, more, head, tail
                            </h1>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                Mastering file viewing commands for different scenarios — from quick peeks to 
                                navigating massive log files efficiently.
                            </p>
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    When <span className="font-semibold text-blue-600 dark:text-blue-400">Swadeep</span> at Barrackpore CNAT 
                                    needs to check a 2GB log file, choosing the right tool makes all the difference.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tool Comparison */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">When to Use Which Tool</h2>

                        <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                {[
                                    { tool: 'cat', desc: 'Concatenate - Quick viewing of small files', color: 'from-blue-500 to-cyan-500' },
                                    { tool: 'less', desc: 'Advanced pager - Best for large files', color: 'from-green-500 to-emerald-500' },
                                    { tool: 'more', desc: 'Basic pager - Simple page-by-page viewing', color: 'from-yellow-500 to-amber-500' },
                                    { tool: 'head', desc: 'View beginning of files', color: 'from-purple-500 to-pink-500' },
                                    { tool: 'tail', desc: 'View end of files, follow logs', color: 'from-red-500 to-orange-500' }
                                ].map((item) => (
                                    <button
                                        key={item.tool}
                                        onClick={() => this.handleToolChange(item.tool)}
                                        className={`p-4 rounded-xl text-left transition-all duration-300 ${activeTool === item.tool
                                            ? 'ring-2 ring-offset-2 ring-blue-500 transform scale-105'
                                            : 'hover:shadow-md'
                                            } bg-gradient-to-br ${item.color} text-white`}
                                    >
                                        <div className="font-bold text-xl mb-1">{item.tool}</div>
                                        <div className="text-sm opacity-90">{item.desc}</div>
                                    </button>
                                ))}
                            </div>

                            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                                <p className="text-gray-700 dark:text-gray-300 text-center">
                                    <span className="font-semibold">Rule of thumb:</span> Use <code>cat</code> for small files, 
                                    <code> less</code> for large files, <code>head/tail</code> for partial views.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Tool Details */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
                        {activeTool === 'cat' && (
                            <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-xl">cat</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">cat - Concatenate Files</h3>
                                        <p className="text-gray-600 dark:text-gray-400">For quick viewing of small files</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Prototype & Purpose</h4>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono">
                                            <div className="text-cyan-400">Command:</div>
                                            <div>cat [OPTION]... [FILE]...</div>
                                            <div className="text-cyan-400 mt-2">Return Type:</div>
                                            <div>Outputs entire file content to stdout</div>
                                            <div className="text-cyan-400 mt-2">When to use:</div>
                                            <div>Small files (&lt;100 lines), concatenation, redirection</div>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Common Usage</h4>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'# View a file'}</code><br />
                                            <code>{'cat config.txt'}</code><br /><br />
                                            <code>{'# View with line numbers'}</code><br />
                                            <code>{'cat -n server.log'}</code><br /><br />
                                            <code>{'# Concatenate multiple files'}</code><br />
                                            <code>{'cat file1.txt file2.txt > combined.txt'}</code><br /><br />
                                            <code>{'# Create quick file'}</code><br />
                                            <code>{'cat > newfile.txt << EOF'}</code><br />
                                            <code>{'Line 1'}</code><br />
                                            <code>{'Line 2'}</code><br />
                                            <code>{'EOF'}</code>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                            <span className="font-semibold">Tuhina</span> at Ichapur Tech uses <code>cat -n</code> to debug scripts with line numbers.
                                        </p>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">⚠️ Warning: Don't cat Large Files!</h4>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'# BAD: Freezes terminal with large file'}</code><br />
                                            <code>{'cat huge_log_file.log'}</code><br /><br />
                                            <code>{'# GOOD: Use less instead'}</code><br />
                                            <code>{'less huge_log_file.log'}</code>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                            <code>cat</code> loads entire file into memory. A 2GB file can crash your terminal!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTool === 'less' && (
                            <div className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-xl">less</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">less - The Superior Pager</h3>
                                        <p className="text-gray-600 dark:text-gray-400">For efficient viewing of large files</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Why "less is more"</h4>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                                            <code>less</code> loads file content on-demand, making it perfect for huge files.
                                        </p>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'# Open a file'}</code><br />
                                            <code>{'less server.log'}</code><br /><br />
                                            <code>{'# Search within less (press / then type pattern)'}</code><br />
                                            <code>{'/error'}</code><br /><br />
                                            <code>{'# Navigation shortcuts:'}</code><br />
                                            <code>{'Space  - Next page'}</code><br />
                                            <code>{'b      - Previous page'}</code><br />
                                            <code>{'g      - Go to beginning'}</code><br />
                                            <code>{'G      - Go to end'}</code><br />
                                            <code>{'q      - Quit'}</code>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Advanced Features</h4>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'# View with line numbers'}</code><br />
                                            <code>{'less -N access.log'}</code><br /><br />
                                            <code>{'# Follow mode (like tail -f)'}</code><br />
                                            <code>{'less +F /var/log/syslog'}</code><br /><br />
                                            <code>{'# Open at specific line'}</code><br />
                                            <code>{'less +1000 error.log'}</code><br /><br />
                                            <code>{'# Pipe output through less'}</code><br />
                                            <code>{'dmesg | less'}</code>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                            <span className="font-semibold">Abhronila</span> at Shyamnagar Lab uses <code>less +F</code> to monitor live logs.
                                        </p>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Professional Tip</h4>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'# Set less as default pager'}</code><br />
                                            <code>{'export PAGER=less'}</code><br />
                                            <code>{'export LESS="-i -R -X -F"'}</code><br /><br />
                                            <code>{'# Options explained:'}</code><br />
                                            <code>{'-i  : Ignore case in searches'}</code><br />
                                            <code>{'-R  : Allow ANSI color codes'}</code><br />
                                            <code>{'-X  : Keep output on screen after exit'}</code><br />
                                            <code>{'-F  : Exit if file fits on one screen'}</code>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                            Add these to your <code>~/.bashrc</code> for a better <code>less</code> experience.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTool === 'more' && (
                            <div className="bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-xl">more</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">more - The Classic Pager</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Simple page-by-page viewing</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-5 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Basic Usage</h4>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                                            <code>more</code> is simpler than <code>less</code> but has fewer features.
                                        </p>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'# View file page by page'}</code><br />
                                            <code>{'more document.txt'}</code><br /><br />
                                            <code>{'# Navigation:'}</code><br />
                                            <code>{'Space  - Next page'}</code><br />
                                            <code>{'Enter  - Next line'}</code><br />
                                            <code>{'b      - Previous page'}</code><br />
                                            <code>{'q      - Quit'}</code><br />
                                            <code>{'/pattern - Search forward'}</code>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">When to Use more vs less</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                                                <div className="font-bold text-green-600 dark:text-green-400 mb-2">Use more when:</div>
                                                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                                    <li>• Simple page viewing needed</li>
                                                    <li>• Backward compatibility required</li>
                                                    <li>• Minimal learning curve desired</li>
                                                </ul>
                                            </div>
                                            <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                                                <div className="font-bold text-purple-600 dark:text-purple-400 mb-2">Use less when:</div>
                                                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                                    <li>• Need backward scrolling</li>
                                                    <li>• Advanced search features</li>
                                                    <li>• Large file viewing</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Historical Note</h4>
                                        <p className="text-gray-700 dark:text-gray-300">
                                            The name <code>less</code> is a pun: "less is more" (more features than <code>more</code>). 
                                            <code>more</code> was created first in 1978, <code>less</code> in 1984 with backward scrolling.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTool === 'head' && (
                            <div className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-xl">head</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">head - View Beginning of Files</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Quick peeks at file starts</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Essential for Large Files</h4>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'# View first 10 lines (default)'}</code><br />
                                            <code>{'head access.log'}</code><br /><br />
                                            <code>{'# View first N lines'}</code><br />
                                            <code>{'head -20 config.txt'}</code><br />
                                            <code>{'head -n 50 data.csv'}</code><br /><br />
                                            <code>{'# View first N bytes'}</code><br />
                                            <code>{'head -c 100 binary_file'}</code><br /><br />
                                            <code>{'# Multiple files'}</code><br />
                                            <code>{'head -5 file1.txt file2.txt'}</code>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                            Perfect for checking file format or structure without loading entire file.
                                        </p>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Real-world Use Cases</h4>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'# Check CSV header'}</code><br />
                                            <code>{'head -1 large_dataset.csv'}</code><br /><br />
                                            <code>{'# Verify script syntax'}</code><br />
                                            <code>{'head -20 script.sh | grep -n "#!/" '}</code><br /><br />
                                            <code>{'# Pipeline safety check'}</code><br />
                                            <code>{'find . -name "*.log" -exec head -5 {} \\;'}</code><br /><br />
                                            <code>{'# Combined with other commands'}</code><br />
                                            <code>{'ps aux | head -10'}</code>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                            <span className="font-semibold">Debangshu</span> at Naihati Server Farm uses <code>head</code> 
                                            to preview files before processing.
                                        </p>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Pro Tip: Combine with tail</h4>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'# View lines 11-20 of a file'}</code><br />
                                            <code>{'head -20 file.txt | tail -10'}</code><br /><br />
                                            <code>{'# Skip first N lines'}</code><br />
                                            <code>{'tail -n +11 file.txt | head -10'}</code>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                            This pattern lets you view any section of a file efficiently.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTool === 'tail' && (
                            <div className="bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-xl">tail</span>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">tail - View End of Files</h3>
                                        <p className="text-gray-600 dark:text-gray-400">Essential for log monitoring</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-5 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">The Most Important Feature: -f</h4>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'# Follow mode - monitor live logs'}</code><br />
                                            <code>{'tail -f /var/log/syslog'}</code><br /><br />
                                            <code>{'# Follow with line numbers'}</code><br />
                                            <code>{'tail -fn 20 application.log'}</code><br /><br />
                                            <code>{'# Follow multiple files'}</code><br />
                                            <code>{'tail -f log1.log log2.log'}</code><br /><br />
                                            <code>{'# Stop after process dies'}</code><br />
                                            <code>{'tail -F --pid=$$ /tmp/debug.log'}</code>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                            <code>tail -f</code> is indispensable for real-time debugging and monitoring.
                                        </p>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Basic and Advanced Usage</h4>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'# Last 10 lines (default)'}</code><br />
                                            <code>{'tail error.log'}</code><br /><br />
                                            <code>{'# Last N lines'}</code><br />
                                            <code>{'tail -50 access.log'}</code><br />
                                            <code>{'tail -n 100 debug.log'}</code><br /><br />
                                            <code>{'# Last N bytes'}</code><br />
                                            <code>{'tail -c 500 binary.data'}</code><br /><br />
                                            <code>{'# Skip first N lines'}</code><br />
                                            <code>{'tail -n +101 data.txt  # Lines 101 to end'}</code>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Professional Log Monitoring</h4>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'# Monitor and filter logs'}</code><br />
                                            <code>{'tail -f /var/log/nginx/access.log | grep "404"'}</code><br /><br />
                                            <code>{'# Monitor with timestamps'}</code><br />
                                            <code>{'tail -f /var/log/syslog | while read line; do'}</code><br />
                                            <code>&nbsp;&nbsp;{'echo "$(date): $line"'}</code><br />
                                            <code>{'done'}</code><br /><br />
                                            <code>{'# Rotating log monitoring'}</code><br />
                                            <code>{'tail -F /var/log/service.log'}</code><br />
                                            <code>{'# -F (capital) follows by filename, handles log rotation'}</code>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                            <span className="font-semibold">Swadeep</span> uses <code>tail -F</code> for production log monitoring 
                                            at Barrackpore CNAT servers.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Comparison Table */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Quick Comparison Guide</h2>

                        <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 dark:bg-gray-800">
                                        <tr>
                                            <th className="p-3 font-bold">Command</th>
                                            <th className="p-3 font-bold">Best For</th>
                                            <th className="p-3 font-bold">File Size</th>
                                            <th className="p-3 font-bold">Memory Use</th>
                                            <th className="p-3 font-bold">Can Scroll Back?</th>
                                            <th className="p-3 font-bold">Live Follow?</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            { cmd: 'cat', best: 'Small files, concatenation', size: '&lt;100KB', mem: 'High', scroll: 'No', follow: 'No' },
                                            { cmd: 'less', best: 'Large files, reading', size: 'Any', mem: 'Low', scroll: 'Yes', follow: 'Yes (-F)' },
                                            { cmd: 'more', best: 'Simple paging', size: 'Medium', mem: 'Medium', scroll: 'Forward only', follow: 'No' },
                                            { cmd: 'head', best: 'File beginnings', size: 'Any', mem: 'Low', scroll: 'No', follow: 'No' },
                                            { cmd: 'tail', best: 'File ends, logs', size: 'Any', mem: 'Low', scroll: 'No', follow: 'Yes (-f)' }
                                        ].map((row, index) => (
                                            <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                                                <td className="p-3 font-mono font-bold">{row.cmd}</td>
                                                <td className="p-3">{row.best}</td>
                                                <td className="p-3">{row.size}</td>
                                                <td className="p-3">{row.mem}</td>
                                                <td className="p-3">{row.scroll}</td>
                                                <td className="p-3">{row.follow}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-xl">
                                <p className="text-gray-700 dark:text-gray-300 text-center">
                                    <span className="font-semibold">Golden Rule:</span> When in doubt, use <code>less</code>. 
                                    It's the Swiss Army knife of file viewing.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Common Pitfalls */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Common Pitfalls & Solutions</h2>

                        <div className="bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="space-y-6">
                                <div className="p-5 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border-l-4 border-red-500">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                                            <span className="text-red-600 dark:text-red-300 font-bold">✗</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Using cat on Large Files</h3>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                Freezes terminal, consumes memory. <span className="font-semibold">Solution:</span> Use 
                                                <code> less</code> or <code>head/tail</code> for large files.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border-l-4 border-red-500">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                                            <span className="text-red-600 dark:text-red-300 font-bold">✗</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Not Escaping tail -f</h3>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                Forgetting to press <code>Ctrl+C</code> keeps terminal locked. 
                                                <span className="font-semibold">Solution:</span> Remember <code>Ctrl+C</code> stops following.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border-l-4 border-red-500">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                                            <span className="text-red-600 dark:text-red-300 font-bold">✗</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Binary File Viewing</h3>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                Using text viewers on binary files shows garbage. 
                                                <span className="font-semibold">Solution:</span> Use <code>hexdump</code>, 
                                                <code> od</code>, or <code>xxd</code> for binaries.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border-l-4 border-green-500">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                            <span className="text-green-600 dark:text-green-300 font-bold">✓</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Best Practice</h3>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                Always preview with <code>head</code> before using <code>cat</code> or <code>less</code>. 
                                                Set <code>alias less='less -R'</code> for color support.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Teacher's Note */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '500ms' }}>
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
                                <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Choosing the Right Tool</h4>
                                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                                    I've seen students like <span className="font-semibold">Tuhina</span> waste hours because they used 
                                    <code> cat</code> on a 1GB log file. The terminal froze, she lost her work, and had to restart. 
                                    Meanwhile, <span className="font-semibold">Abhronila</span> at Shyamnagar Lab uses 
                                    <code> less +F</code> to monitor live logs while keeping her terminal responsive for other tasks.
                                </p>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mt-1">
                                            <span className="text-indigo-600 dark:text-indigo-300 font-bold">1</span>
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300">For quick looks: <code>head -20</code> or <code>tail -20</code></span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mt-1">
                                            <span className="text-indigo-600 dark:text-indigo-300 font-bold">2</span>
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300">For reading: <code>less</code> (always, for files {'>'} 100 lines)</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mt-1">
                                            <span className="text-indigo-600 dark:text-indigo-300 font-bold">3</span>
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300">For monitoring: <code>tail -f</code> or <code>less +F</code></span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg">
                                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-700 dark:text-gray-300">
                                    Pro tip: Create alias <code>alias view='less -R'</code> and use <code>view</code> instead of <code>cat</code> for everything.
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Mini Checklist */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">What to Remember</h2>

                        <div className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="space-y-3">
                                {[
                                    "cat: For small files only (< 100KB)",
                                    "less: Default choice for reading files",
                                    "more: Simpler alternative to less",
                                    "head: View beginning of files",
                                    "tail: View end, use -f for live monitoring",
                                    "Never cat large files - use less instead",
                                    "tail -F (capital F) handles log rotation"
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
                                    <span className="font-semibold">Swadeep</span>'s debugging workflow at Barrackpore CNAT:
                                </p>
                                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm">
                                    <code>{'# 1. Quick check: Is this the right file?'}</code><br />
                                    <code>{'head -5 suspect.log'}</code><br /><br />
                                    <code>{'# 2. Check recent errors'}</code><br />
                                    <code>{'tail -100 suspect.log | grep -i error'}</code><br /><br />
                                    <code>{'# 3. Monitor live if needed'}</code><br />
                                    <code>{'tail -f suspect.log | grep --color -E "error|fail|warn"'}</code><br /><br />
                                    <code>{'# 4. Deep dive if necessary'}</code><br />
                                    <code>{'less +G suspect.log  # Go to end, then search backward'}</code>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hint Section */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '700ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Think About This...</h2>

                        <div className="bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="space-y-6">
                                <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Observe carefully...</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        Create a test file and try these commands:
                                    </p>
                                    <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                        <code>{'seq 1 1000 > test.txt'}</code><br />
                                        <code>{'time cat test.txt > /dev/null'}</code><br />
                                        <code>{'time less test.txt < /dev/null'}</code><br />
                                        <code>{'time head -10 test.txt > /dev/null'}</code>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                        Which is fastest? Which uses most memory? Why does this matter for 
                                        <span className="font-semibold"> Debangshu</span> at Naihati Server Farm?
                                    </p>
                                </div>

                                <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Try changing this...</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        How would you monitor a log file but only show lines containing "ERROR"?
                                    </p>
                                    <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                        <code>{'# Hint: Combine tail -f with grep'}</code><br />
                                        <code>{'tail -f application.log | _____'}</code>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                        Now make it show timestamps too. How would <span className="font-semibold">Abhronila</span> 
                                        add color to highlight different error levels?
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl">
                                <p className="text-gray-700 dark:text-gray-300 text-center">
                                    Remember: The right tool not only saves time but prevents crashes and data loss.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Professional Tips */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '800ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Professional Tips & Tricks</h2>

                        <div className="space-y-6">
                            <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-purple-200 dark:border-purple-800">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Custom less Configuration</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Add to <code>~/.lesskey</code> or set environment variables:
                                </p>
                                <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                    <code>{'# In ~/.bashrc or ~/.zshrc'}</code><br />
                                    <code>{'export LESS="-i -J -R -X -F"'}</code><br />
                                    <code>{'export LESSHISTFILE="-"'}</code><br /><br />
                                    <code>{'# Options explained:'}</code><br />
                                    <code>{'-i : Ignore case in searches (smart)'}</code><br />
                                    <code>{'-J : Show status column'}</code><br />
                                    <code>{'-R : Output raw control chars (colors)'}</code><br />
                                    <code>{'-X : Keep output on screen after exit'}</code><br />
                                    <code>{'-F : Exit if file fits on one screen'}</code>
                                </div>
                            </div>

                            <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-blue-200 dark:border-blue-800">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Alias Collection</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Add these to your shell configuration:
                                </p>
                                <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                    <code>{'# Better defaults'}</code><br />
                                    <code>{'alias less=\'less -R\'          # Support colors'}</code><br />
                                    <code>{'alias tailf=\'tail -f\'         # Shorter follow'}</code><br />
                                    <code>{'alias tf=\'tail -f\'            # Even shorter'}</code><br /><br />
                                    <code>{'# Quick previews'}</code><br />
                                    <code>{'alias peek=\'head -20\'         # Quick file preview'}</code><br />
                                    <code>{'alias ends=\'tail -20\'         # See file end'}</code><br /><br />
                                    <code>{'# Combined utilities'}</code><br />
                                    <code>{'alias errors=\'tail -100 | grep -i error\''}</code><br />
                                    <code>{'alias follow-errors=\'tail -f | grep --color -E \"ERROR|WARN|FAIL\"\''}</code>
                                </div>
                            </div>

                            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-green-200 dark:border-green-800">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Scripting with These Commands</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Use in scripts for reliable file handling:
                                </p>
                                <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                    <code>{'#!/bin/bash'}</code><br />
                                    <code>{'# Safe file reading in scripts'}</code><br />
                                    <code>{'if [ -s \"$LOGFILE\" ]; then'}</code><br />
                                    <code>&nbsp;&nbsp;{'# Get last error without loading whole file'}</code><br />
                                    <code>&nbsp;&nbsp;{'LAST_ERROR=$(tail -100 \"$LOGFILE\" | grep -i error | tail -1)'}</code><br />
                                    <code>&nbsp;&nbsp;{'echo \"Last error: $LAST_ERROR\"'}</code><br />
                                    <code>{'else'}</code><br />
                                    <code>&nbsp;&nbsp;{'echo \"Log file empty or missing\"'}</code><br />
                                    <code>{'fi'}</code><br /><br />
                                    <code>{'# Check file non-empty before cat'}</code><br />
                                    <code>{'[ -s config.txt ] && cat config.txt || echo \"Config missing\"'}</code>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '900ms' }}>
                        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                            <div className="text-center">
                                <div className="text-gray-600 dark:text-gray-400 mb-4">
                                    Topic 6: Viewing Files - cat, less, more, head, tail
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-500">
                                    Next: tail -f – monitoring live log files
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

