import React from 'react';
import clsx from 'clsx';

export default class Topic0 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDarkMode: false
        };
    }

    componentDidMount() {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        this.setState({ isDarkMode: darkModeMediaQuery.matches });

        this.handleColorSchemeChange = (e) => {
            this.setState({ isDarkMode: e.matches });
        };

        if (darkModeMediaQuery.addEventListener) {
            darkModeMediaQuery.addEventListener('change', this.handleColorSchemeChange);
        } else {
            darkModeMediaQuery.addListener(this.handleColorSchemeChange); // fallback
        }
    }

    componentWillUnmount() {
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        if (darkModeMediaQuery.removeEventListener) {
            darkModeMediaQuery.removeEventListener('change', this.handleColorSchemeChange);
        } else {
            darkModeMediaQuery.removeListener(this.handleColorSchemeChange);
        }
    }

    render() {
        const { isDarkMode } = this.state;

        return (
            <div className={clsx(
                "min-h-screen px-4 py-8 transition-colors duration-300",
                isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
            )}>
                {/* Header Section */}
                <header className="max-w-6xl mx-auto mb-12">
                    <div className="animate-[fadeInUp_0.8s_ease-out]">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-relaxed">
                            Topic 1: Pattern Searching with grep, egrep, fgrep
                        </h1>
                        <p className="text-xl opacity-80 leading-relaxed">
                            Mastering text search tools in Unix/Linux command line
                        </p>
                    </div>
                </header>

                <main className="max-w-6xl mx-auto">
                    {/* Introduction Card */}
                    <section className="mb-16 animate-[fadeInUp_0.8s_ease-out_0.2s]">
                        <div className={clsx(
                            "rounded-2xl p-8 transition-all duration-300",
                            "hover:shadow-xl hover:scale-[1.01]",
                            isDarkMode
                                ? "bg-gray-800 hover:bg-gray-750"
                                : "bg-white hover:bg-gray-50"
                        )}>
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                                    🔍
                                </span>
                                What are grep, egrep, and fgrep?
                            </h2>

                            <div className="space-y-4 leading-relaxed">
                                <p>
                                    These are command-line utilities for searching text using patterns.
                                    Think of them as <strong>powerful search engines for your terminal</strong>.
                                </p>

                                <div className="grid md:grid-cols-3 gap-6 mt-8">
                                    {/* grep Card */}
                                    <div className={clsx(
                                        "p-6 rounded-xl transition-all duration-300",
                                        "hover:shadow-lg hover:translate-y-[-4px]",
                                        isDarkMode ? "bg-gray-750" : "bg-blue-50"
                                    )}>
                                        <h3 className="text-xl font-bold mb-3 text-blue-600 dark:text-blue-400">grep</h3>
                                        <p className="mb-2"><strong>Global Regular Expression Print</strong></p>
                                        <p className="text-sm opacity-90">Basic pattern search using regular expressions</p>
                                    </div>

                                    {/* egrep Card */}
                                    <div className={clsx(
                                        "p-6 rounded-xl transition-all duration-300",
                                        "hover:shadow-lg hover:translate-y-[-4px]",
                                        isDarkMode ? "bg-gray-750" : "bg-green-50"
                                    )}>
                                        <h3 className="text-xl font-bold mb-3 text-green-600 dark:text-green-400">egrep</h3>
                                        <p className="mb-2"><strong>Extended grep</strong></p>
                                        <p className="text-sm opacity-90">Supports extended regex patterns (+, ?, |, groups)</p>
                                    </div>

                                    {/* fgrep Card */}
                                    <div className={clsx(
                                        "p-6 rounded-xl transition-all duration-300",
                                        "hover:shadow-lg hover:translate-y-[-4px]",
                                        isDarkMode ? "bg-gray-750" : "bg-purple-50"
                                    )}>
                                        <h3 className="text-xl font-bold mb-3 text-purple-600 dark:text-purple-400">fgrep</h3>
                                        <p className="mb-2"><strong>Fixed-string grep</strong></p>
                                        <p className="text-sm opacity-90">Fast search for literal strings (no regex)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Prototype & Signature Section */}
                    <section className="mb-16 animate-[fadeInUp_0.8s_ease-out_0.4s]">
                        <div className={clsx(
                            "rounded-2xl p-8 transition-all duration-300",
                            "hover:shadow-xl hover:scale-[1.01]",
                            isDarkMode
                                ? "bg-gray-800 hover:bg-gray-750"
                                : "bg-white hover:bg-gray-50"
                        )}>
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                                    📋
                                </span>
                                Prototype & Signature
                            </h2>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold mb-3">Basic Syntax</h3>
                                    <pre className={clsx(
                                        "p-6 rounded-lg overflow-x-auto text-sm leading-relaxed",
                                        isDarkMode ? "bg-gray-900" : "bg-gray-100"
                                    )}>
                                        {`grep [OPTIONS] PATTERN [FILE...]
egrep [OPTIONS] PATTERN [FILE...]
fgrep [OPTIONS] PATTERN [FILE...]`}
                                    </pre>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold mb-3">Return Type</h3>
                                    <p className="leading-relaxed">
                                        All three commands return:
                                    </p>
                                    <ul className="list-disc pl-6 mt-2 space-y-2">
                                        <li><strong>Exit code 0</strong>: Pattern found in at least one line</li>
                                        <li><strong>Exit code 1</strong>: Pattern not found</li>
                                        <li><strong>Exit code 2</strong>: Error occurred (invalid syntax, file not found)</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold mb-3">Purpose & When to Use</h3>
                                    <div className="space-y-4">
                                        <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                                            <p className="font-medium">grep → When you need basic regex search</p>
                                            <p className="text-sm opacity-90 mt-1">Example: Finding error messages in logs</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/30">
                                            <p className="font-medium">egrep → When you need complex pattern matching</p>
                                            <p className="text-sm opacity-90 mt-1">Example: Searching for multiple patterns at once</p>
                                        </div>
                                        <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/30">
                                            <p className="font-medium">fgrep → When you need fast literal string search</p>
                                            <p className="text-sm opacity-90 mt-1">Example: Searching for specific IP addresses</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Real-World Examples */}
                    <section className="mb-16 animate-[fadeInUp_0.8s_ease-out_0.6s]">
                        <div className={clsx(
                            "rounded-2xl p-8 transition-all duration-300",
                            "hover:shadow-xl hover:scale-[1.01]",
                            isDarkMode
                                ? "bg-gray-800 hover:bg-gray-750"
                                : "bg-white hover:bg-gray-50"
                        )}>
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-300">
                                    🌍
                                </span>
                                Real-World Usage Examples
                            </h2>

                            <div className="space-y-8">
                                {/* Example 1 */}
                                <div>
                                    <h3 className="text-xl font-semibold mb-4">School Scenario: Finding Student Records</h3>
                                    <p className="mb-4 leading-relaxed">
                                        Imagine <strong>Swadeep</strong> is the class teacher at Barrackpore High School.
                                        He needs to find all records of students named "Tuhina" in multiple attendance files.
                                    </p>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="font-medium mb-2">With basic grep:</p>
                                            <pre className={clsx(
                                                "p-4 rounded-lg text-sm",
                                                isDarkMode ? "bg-gray-900" : "bg-gray-100"
                                            )}>
                                                {`$ grep "Tuhina" attendance_jan.txt attendance_feb.txt
attendance_jan.txt:Tuhina Sharma - Present
attendance_feb.txt:Tuhina Sharma - Absent`}</pre>
                                        </div>
                                        <div>
                                            <p className="font-medium mb-2">With case-insensitive search:</p>
                                            <pre className={clsx(
                                                "p-4 rounded-lg text-sm",
                                                isDarkMode ? "bg-gray-900" : "bg-gray-100"
                                            )}>
                                                {`$ grep -i "tuhina" *.txt  # Finds TUHINA, tuhina, Tuhina`}</pre>
                                        </div>
                                    </div>
                                </div>

                                {/* Example 2 */}
                                <div>
                                    <h3 className="text-xl font-semibold mb-4">System Administration: Log Analysis</h3>
                                    <p className="mb-4 leading-relaxed">
                                        <strong>Abhronila</strong>, the system admin at Naihati Data Center, needs to find
                                        all "ERROR" entries in server logs from the last hour.
                                    </p>
                                    <pre className={clsx(
                                        "p-4 rounded-lg text-sm",
                                        isDarkMode ? "bg-gray-900" : "bg-gray-100"
                                    )}>
                                        {`$ grep "ERROR" /var/log/syslog | grep "Mar 15 14:" 
Mar 15 14:30:22 server ERROR: Disk full
Mar 15 14:45:10 server ERROR: Connection timeout`}</pre>
                                </div>

                                {/* Example 3 */}
                                <div>
                                    <h3 className="text-xl font-semibold mb-4">Using egrep for Complex Patterns</h3>
                                    <p className="mb-4 leading-relaxed">
                                        <strong>Debangshu</strong> needs to find phone numbers in multiple formats
                                        (7003756860, 700-375-6860, or 700 375 6860) from a contact list.
                                    </p>
                                    <pre className={clsx(
                                        "p-4 rounded-lg text-sm",
                                        isDarkMode ? "bg-gray-900" : "bg-gray-100"
                                    )}>
                                        {`$ egrep "700[- ]?375[- ]?6860" contacts.txt
Sukanta Hui: 7003756860
Swadeep Das: 700-375-6860
Tuhina Sharma: 700 375 6860`}</pre>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Professional Tips & Tricks */}
                    <section className="mb-16 animate-[fadeInUp_0.8s_ease-out_0.8s]">
                        <div className={clsx(
                            "rounded-2xl p-8 transition-all duration-300",
                            "hover:shadow-xl hover:scale-[1.01]",
                            isDarkMode
                                ? "bg-gray-800 hover:bg-gray-750"
                                : "bg-white hover:bg-gray-50"
                        )}>
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
                                    💡
                                </span>
                                Professional Tips & Tricks
                            </h2>

                            <div className="space-y-6">
                                <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500">
                                    <h4 className="font-bold text-lg mb-2">1. Always Use --color=auto</h4>
                                    <p className="leading-relaxed">
                                        Add <code>alias grep='grep --color=auto'</code> to your <code>.bashrc</code>.
                                        This highlights matches in color, making them instantly visible.
                                    </p>
                                </div>

                                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500">
                                    <h4 className="font-bold text-lg mb-2">2. Count Matches Efficiently</h4>
                                    <p className="leading-relaxed">
                                        Instead of piping to <code>wc -l</code>, use <code>grep -c</code> which is faster:
                                        <pre className="mt-2 p-2 rounded bg-gray-100 dark:bg-gray-900">
                                            {`$ grep -c "pattern" file.txt  # Returns count of matching lines`}
                                        </pre>
                                    </p>
                                </div>

                                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500">
                                    <h4 className="font-bold text-lg mb-2">3. Search Recursively with Context</h4>
                                    <p className="leading-relaxed">
                                        When debugging, show context around matches:
                                        <pre className="mt-2 p-2 rounded bg-gray-100 dark:bg-gray-900">
                                            {`$ grep -r -B2 -A2 "ERROR" /var/log/  
# Shows 2 lines before and after each match`}
                                        </pre>
                                    </p>
                                </div>

                                <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500">
                                    <h4 className="font-bold text-lg mb-2">4. Use fgrep for Literal Strings with Regex Metacharacters</h4>
                                    <p className="leading-relaxed">
                                        If searching for strings containing <code>.*[]^$</code>, use fgrep to avoid regex interpretation:
                                        <pre className="mt-2 p-2 rounded bg-gray-100 dark:bg-gray-900">
                                            {`$ fgrep "price[10]" data.txt  # Searches for literal "[10]"`}
                                        </pre>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Common Pitfalls */}
                    <section className="mb-16 animate-[fadeInUp_0.8s_ease-out_1s]">
                        <div className={clsx(
                            "rounded-2xl p-8 transition-all duration-300",
                            "hover:shadow-xl hover:scale-[1.01]",
                            isDarkMode
                                ? "bg-gray-800 hover:bg-gray-750"
                                : "bg-white hover:bg-gray-50"
                        )}>
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300">
                                    ⚠️
                                </span>
                                Common Pitfalls & Beginner Mistakes
                            </h2>

                            <div className="space-y-6">
                                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
                                    <h4 className="font-bold text-lg mb-2 text-red-600 dark:text-red-400">1. Forgetting to Quote Patterns</h4>
                                    <p className="mb-2 leading-relaxed"><strong>Wrong:</strong></p>
                                    <pre className="mb-3 p-2 rounded bg-gray-100 dark:bg-gray-900 text-red-600">
                                        {`$ grep error message log.txt  # Shell interprets as separate arguments`}
                                    </pre>
                                    <p className="mb-2 leading-relaxed"><strong>Right:</strong></p>
                                    <pre className="p-2 rounded bg-gray-100 dark:bg-gray-900 text-green-600">
                                        {`$ grep "error message" log.txt  # Single pattern argument`}
                                    </pre>
                                </div>

                                <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20">
                                    <h4 className="font-bold text-lg mb-2 text-orange-600 dark:text-orange-400">2. Confusing grep with egrep Syntax</h4>
                                    <p className="leading-relaxed">
                                        Beginners often use <code>+</code> or <code>|</code> in grep without escaping:
                                        <pre className="mt-2 p-2 rounded bg-gray-100 dark:bg-gray-900">
                                            {`$ grep "error|warning" file.txt    # Won't work in basic grep
$ egrep "error|warning" file.txt  # Works in egrep
$ grep "error\|warning" file.txt  # Works with escaping`}
                                        </pre>
                                    </p>
                                </div>

                                <div className="p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                                    <h4 className="font-bold text-lg mb-2 text-yellow-600 dark:text-yellow-400">3. Not Handling Special Characters</h4>
                                    <p className="leading-relaxed">
                                        Searching for patterns with dots (.) matches any character:
                                        <pre className="mt-2 p-2 rounded bg-gray-100 dark:bg-gray-900">
                                            {`$ grep "192.168.1." log.txt  # Matches 192x168y1z too!
$ grep "192\\.168\\.1\\." log.txt  # Correct for literal dots`}
                                        </pre>
                                    </p>
                                </div>

                                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                    <h4 className="font-bold text-lg mb-2 text-blue-600 dark:text-blue-400">4. Missing Files with Spaces</h4>
                                    <p className="leading-relaxed">
                                        When files have spaces in names:
                                        <pre className="mt-2 p-2 rounded bg-gray-100 dark:bg-gray-900">
                                            {`$ grep pattern "student records.txt"  # Use quotes
$ grep pattern student\\ records.txt   # Or escape space`}
                                        </pre>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Best Practices */}
                    <section className="mb-16 animate-[fadeInUp_0.8s_ease-out_1.2s]">
                        <div className={clsx(
                            "rounded-2xl p-8 transition-all duration-300",
                            "hover:shadow-xl hover:scale-[1.01]",
                            isDarkMode
                                ? "bg-gray-800 hover:bg-gray-750"
                                : "bg-white hover:bg-gray-50"
                        )}>
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-teal-100 text-teal-600 dark:bg-teal-900 dark:text-teal-300">
                                    ✅
                                </span>
                                Best Practices
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-6 rounded-xl bg-green-50 dark:bg-green-900/20">
                                    <h4 className="font-bold text-lg mb-3">1. Readability First</h4>
                                    <ul className="space-y-2">
                                        <li>• Use descriptive pattern names</li>
                                        <li>• Comment complex regex patterns</li>
                                        <li>• Break long grep commands into variables</li>
                                    </ul>
                                </div>

                                <div className="p-6 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                                    <h4 className="font-bold text-lg mb-3">2. Maintainability</h4>
                                    <ul className="space-y-2">
                                        <li>• Store common patterns in separate files</li>
                                        <li>• Use <code>grep -f pattern_file.txt</code></li>
                                        <li>• Version control your search patterns</li>
                                    </ul>
                                </div>

                                <div className="p-6 rounded-xl bg-purple-50 dark:bg-purple-900/20">
                                    <h4 className="font-bold text-lg mb-3">3. Performance</h4>
                                    <ul className="space-y-2">
                                        <li>• Use <code>fgrep</code> for literal strings</li>
                                        <li>• Limit recursive search depth when possible</li>
                                        <li>• Combine with <code>head</code> for quick testing</li>
                                    </ul>
                                </div>

                                <div className="p-6 rounded-xl bg-yellow-50 dark:bg-yellow-900/20">
                                    <h4 className="font-bold text-lg mb-3">4. Beginner-Safe Habits</h4>
                                    <ul className="space-y-2">
                                        <li>• Always test patterns with <code>echo</code> first</li>
                                        <li>• Use <code>grep -n</code> to see line numbers</li>
                                        <li>• Start with simple patterns, then complex</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Mini Checklist */}
                    <section className="mb-16 animate-[fadeInUp_0.8s_ease-out_1.4s]">
                        <div className={clsx(
                            "rounded-2xl p-8 transition-all duration-300",
                            "hover:shadow-xl hover:scale-[1.01]",
                            isDarkMode
                                ? "bg-gray-800 hover:bg-gray-750"
                                : "bg-white hover:bg-gray-50"
                        )}>
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                                    📝
                                </span>
                                Mini Checklist (What to Remember)
                            </h2>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                                    <input type="checkbox" className="mt-1" />
                                    <div>
                                        <p className="font-medium">grep for basic regex, egrep for extended regex</p>
                                        <p className="text-sm opacity-90 mt-1">Remember: egrep = grep -E</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                                    <input type="checkbox" className="mt-1" />
                                    <div>
                                        <p className="font-medium">Always quote patterns with spaces or special chars</p>
                                        <p className="text-sm opacity-90 mt-1">Prevents shell interpretation</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                                    <input type="checkbox" className="mt-1" />
                                    <div>
                                        <p className="font-medium">Use -i for case-insensitive search</p>
                                        <p className="text-sm opacity-90 mt-1">Matches ERROR, error, Error</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                                    <input type="checkbox" className="mt-1" />
                                    <div>
                                        <p className="font-medium">fgrep is fastest for literal strings</p>
                                        <p className="text-sm opacity-90 mt-1">No regex overhead</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                                    <input type="checkbox" className="mt-1" />
                                    <div>
                                        <p className="font-medium">Check exit codes in scripts</p>
                                        <p className="text-sm opacity-90 mt-1">0=found, 1=not found, 2=error</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Hint Section */}
                    <section className="mb-16 animate-[fadeInUp_0.8s_ease-out_1.6s]">
                        <div className={clsx(
                            "rounded-2xl p-8 transition-all duration-300",
                            "hover:shadow-xl hover:scale-[1.01]",
                            "border-2 border-dashed",
                            isDarkMode
                                ? "bg-gray-800 border-blue-500/30 hover:bg-gray-750"
                                : "bg-blue-50 border-blue-200 hover:bg-blue-100"
                        )}>
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                                    🤔
                                </span>
                                Hint Section
                            </h2>

                            <div className="space-y-6">
                                <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-700/50">
                                    <p className="text-lg italic mb-2">"Think about..."</p>
                                    <p className="leading-relaxed">
                                        What happens when you search for a pattern that appears multiple times
                                        on the same line? How does grep handle this?
                                    </p>
                                </div>

                                <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-700/50">
                                    <p className="text-lg italic mb-2">"Observe carefully..."</p>
                                    <p className="leading-relaxed">
                                        The difference in speed between <code>grep "ERROR" large.log</code> and
                                        <code>fgrep "ERROR" large.log</code>. When would this matter most?
                                    </p>
                                </div>

                                <div className="p-4 rounded-lg bg-white/50 dark:bg-gray-700/50">
                                    <p className="text-lg italic mb-2">"Try changing this..."</p>
                                    <p className="leading-relaxed">
                                        Experiment with <code>grep -v</code> (invert match). How can this be useful
                                        for filtering out unwanted lines, like comments in config files?
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Teacher's Note */}
                    <section className="animate-[fadeInUp_0.8s_ease-out_1.8s]">
                        <div className={clsx(
                            "rounded-2xl p-8 transition-all duration-300",
                            "hover:shadow-xl hover:scale-[1.01]",
                            "border-l-4 border-purple-500",
                            isDarkMode
                                ? "bg-gray-800 hover:bg-gray-750"
                                : "bg-purple-50 hover:bg-purple-100"
                        )}>
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                                    <span className="text-2xl">👨‍🏫</span>
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-3xl font-bold mb-4">Teacher's Note</h2>

                                    <div className="mb-6 p-4 rounded-lg bg-white/50 dark:bg-gray-700/50">
                                        <p className="leading-relaxed">
                                            <strong>Remember:</strong> grep is not just a search tool—it's a filter.
                                            In the Unix philosophy, it transforms input (text) into output (matching lines).
                                            This thinking will help you master pipelines later.
                                        </p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-bold text-lg mb-3">Key Insight</h4>
                                            <p className="leading-relaxed">
                                                When teaching students from Shyamnagar or Ichapur, I emphasize that
                                                <strong> grep patterns are like fishing nets</strong>—the tighter the pattern
                                                (more specific), the fewer unwanted matches you catch.
                                            </p>
                                        </div>

                                        <div>
                                            <h4 className="font-bold text-lg mb-3">Classroom Tip</h4>
                                            <p className="leading-relaxed">
                                                Start students with concrete examples from their environment—search for
                                                their own names in files, then progress to abstract patterns. This builds
                                                intuitive understanding.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-700">
                                        <div className="flex flex-wrap gap-4 items-center">
                                            <div>
                                                <p className="font-bold">Sukanta Hui</p>
                                                <p className="text-sm opacity-90">27+ years experience</p>
                                            </div>
                                            <div className="text-sm">
                                                <p>📧 sukantahui@codernaccotax.co.in</p>
                                                <p>📱 7003756860</p>
                                            </div>
                                            <div className="text-sm">
                                                <p className="opacity-90">Expertise: Programming Languages, RDBMS, OS, Web Development</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Examples by Category */}
                    <section className="mb-16 animate-[fadeInUp_0.8s_ease-out_0.7s]">
                        <div className={clsx(
                            "rounded-2xl p-8 transition-all duration-300",
                            "hover:shadow-xl hover:scale-[1.01]",
                            isDarkMode
                                ? "bg-gray-800 hover:bg-gray-750"
                                : "bg-white hover:bg-gray-50"
                        )}>
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <span className="p-2 rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                                    📂
                                </span>
                                Examples by Category
                            </h2>

                            <div className="space-y-10">

                                {/* Example Category 1 */}
                                <div>
                                    <h3 className="text-2xl font-semibold mb-4 text-blue-500">
                                        1️⃣ Academic / School Examples
                                    </h3>

                                    <div className="space-y-4">
                                        <p>
                                            Used in schools and colleges for searching records, attendance,
                                            and result data stored in text files.
                                        </p>

                                        <pre className={clsx(
                                            "p-4 rounded-lg text-sm",
                                            isDarkMode ? "bg-gray-900" : "bg-gray-100"
                                        )}>
                                            {`# Find all students who scored more than 80
$ grep "Marks: 8[0-9]\\|Marks: 9[0-9]" results.txt

# Find absentee students
$ grep "Absent" attendance.txt`}
                                        </pre>
                                    </div>
                                </div>

                                {/* Example Category 2 */}
                                <div>
                                    <h3 className="text-2xl font-semibold mb-4 text-green-500">
                                        2️⃣ System Administration Examples
                                    </h3>

                                    <p>
                                        System administrators rely heavily on grep for monitoring
                                        system health and diagnosing problems.
                                    </p>

                                    <pre className={clsx(
                                        "p-4 rounded-lg text-sm",
                                        isDarkMode ? "bg-gray-900" : "bg-gray-100"
                                    )}>
                                        {`# Find failed login attempts
$ grep "Failed password" /var/log/auth.log

# Find kernel errors
$ grep -i "error" /var/log/syslog`}
                                    </pre>
                                </div>

                                {/* Example Category 3 */}
                                <div>
                                    <h3 className="text-2xl font-semibold mb-4 text-purple-500">
                                        3️⃣ Web Development Examples
                                    </h3>

                                    <p>
                                        Developers use grep to search through source code and configuration files.
                                    </p>

                                    <pre className={clsx(
                                        "p-4 rounded-lg text-sm",
                                        isDarkMode ? "bg-gray-900" : "bg-gray-100"
                                    )}>
                                        {`# Find database configuration
$ grep "DB_HOST" .env

# Find deprecated function usage
$ grep -R "mysql_query" src/`}
                                    </pre>
                                </div>

                                {/* Example Category 4 */}
                                <div>
                                    <h3 className="text-2xl font-semibold mb-4 text-orange-500">
                                        4️⃣ Networking & Security Examples
                                    </h3>

                                    <p>
                                        grep is widely used for log inspection and intrusion detection.
                                    </p>

                                    <pre className={clsx(
                                        "p-4 rounded-lg text-sm",
                                        isDarkMode ? "bg-gray-900" : "bg-gray-100"
                                    )}>
                                        {`# Find suspicious IP addresses
$ grep "192.168.1.100" access.log

# Find HTTP 404 errors
$ grep " 404 " access.log`}
                                    </pre>
                                </div>

                                {/* Example Category 5 */}
                                <div>
                                    <h3 className="text-2xl font-semibold mb-4 text-red-500">
                                        5️⃣ Examination-Oriented Examples (Very Important)
                                    </h3>

                                    <p>
                                        These examples are frequently asked in practical exams and viva.
                                    </p>

                                    <pre className={clsx(
                                        "p-4 rounded-lg text-sm",
                                        isDarkMode ? "bg-gray-900" : "bg-gray-100"
                                    )}>
                                        {`# Count number of matching lines
$ grep -c "pass" result.txt

# Display line numbers of matches
$ grep -n "main" program.c

# Exclude commented lines
$ grep -v "^#" config.conf`}
                                    </pre>
                                </div>

                                {/* Example Category 6 */}
                                <div>
                                    <h3 className="text-2xl font-semibold mb-4 text-cyan-500">
                                        6️⃣ Performance-Based Examples
                                    </h3>

                                    <p>
                                        Choosing the correct grep variant improves speed on large files.
                                    </p>

                                    <pre className={clsx(
                                        "p-4 rounded-lg text-sm",
                                        isDarkMode ? "bg-gray-900" : "bg-gray-100"
                                    )}>
                                        {`# Faster literal search
$ fgrep "ERROR_CODE_504" huge.log

# Multiple patterns from file
$ grep -f patterns.txt data.log`}
                                    </pre>
                                </div>

                            </div>
                        </div>
                    </section>


                </main>

                {/* Animation Keyframes */}
                <style>{`
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
          
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}</style>
            </div>
        );
    }
}

