import React from 'react';
import clsx from 'clsx';

export default class Topic12 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            activeTab: 'atime'
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isVisible: true });
        }, 50);
    }

    handleTabChange = (tab) => {
        this.setState({ activeTab: tab });
    }

    render() {
        const { isVisible, activeTab } = this.state;

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
                <div className="max-w-3xl mx-auto">

                    {/* Header */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-3 h-12 bg-gradient-to-b from-orange-500 to-red-600 rounded-full animate-pulse"></div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100">
                                Understanding File Timestamps
                            </h1>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                Mastering the three timestamps every Unix file has: access time (atime),
                                modification time (mtime), and change time (ctime) — crucial for debugging,
                                forensics, and system administration.
                            </p>
                            <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    When <span className="font-semibold text-orange-600 dark:text-orange-400">Swadeep</span> investigates
                                    a security incident at Barrackpore CNAT, timestamps tell the story of what happened.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* The Three Timestamps */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">The Three Timestamps</h2>

                        <div className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                                Every file and directory in Unix/Linux has three distinct timestamps stored in its inode.
                                Understanding their differences is essential for system analysis.
                            </p>

                            {/* Interactive Tabs */}
                            <div className="mb-8">
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {['atime', 'mtime', 'ctime'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => this.handleTabChange(tab)}
                                            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${activeTab === tab
                                                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                                }`}
                                        >
                                            {tab.toUpperCase()}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Content */}
                                <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 rounded-xl">
                                    {activeTab === 'atime' && (
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Access Time (atime)</h3>
                                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                                Last time the file's <span className="font-semibold text-blue-600 dark:text-blue-400">contents</span> were read.
                                            </p>
                                            <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                                # Updated when:<br />
                                                cat file.txt      # File read<br />
                                                grep "pattern" file.txt<br />
                                                less file.txt
                                            </div>
                                            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                                    <span className="font-semibold">Note:</span> Can be disabled with <code>noatime</code> mount option for performance.
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'mtime' && (
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                                                Modification Time (mtime)
                                            </h3>

                                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                                Last time the file's{" "}
                                                <span className="font-semibold text-green-600 dark:text-green-400">
                                                    contents
                                                </span>{" "}
                                                were modified.
                                            </p>

                                            <pre
                                                className={clsx(
                                                    "p-4 rounded-lg font-mono text-sm overflow-x-auto",
                                                    "bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300"
                                                )}
                                            >
                                                <code>
                                                    {`# Updated when:
                                                    echo "text" >> file.txt   # Content changed
                                                    vi file.txt              # edit & save
                                                    cp newfile file.txt      # overwrite file`}
                                                </code>
                                            </pre>

                                            <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                                    <span className="font-semibold">Tip:</span>{" "}
                                                    This is what <code>ls -l</code> shows by default.
                                                </p>
                                            </div>
                                        </div>
                                    )}


                                    {activeTab === 'ctime' && (
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Change Time (ctime)</h3>
                                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                                Last time the file's <span className="font-semibold text-purple-600 dark:text-purple-400">metadata</span> or contents were changed.
                                            </p>
                                            <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                                # Updated when:<br />
                                                chmod 755 file.txt    # Permissions changed<br />
                                                chown user file.txt   # Ownership changed<br />
                                                mv file.txt newname   # Rename (inode change)<br />
                                                Also when mtime changes!
                                            </div>
                                            <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                                                <p className="text-gray-700 dark:text-gray-300 text-sm">
                                                    <span className="font-semibold">Important:</span> ctime cannot be changed manually (except by root).
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Quick Reference</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                                        <div className="font-bold text-blue-600 dark:text-blue-400">atime</div>
                                        <div className="text-gray-600 dark:text-gray-400">Last read</div>
                                    </div>
                                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                                        <div className="font-bold text-green-600 dark:text-green-400">mtime</div>
                                        <div className="text-gray-600 dark:text-gray-400">Last content change</div>
                                    </div>
                                    <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                                        <div className="font-bold text-purple-600 dark:text-purple-400">ctime</div>
                                        <div className="text-gray-600 dark:text-gray-400">Last metadata change</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timestamp Visualization */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">How Timestamps Change</h2>

                        <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <style>
                                {`
                                    @keyframes pulseTimestamp {
                                        0% { opacity: 0.5; }
                                        50% { opacity: 1; }
                                        100% { opacity: 0.5; }
                                    }
                                    @keyframes updateTime {
                                        0% { transform: scale(1); }
                                        50% { transform: scale(1.1); }
                                        100% { transform: scale(1); }
                                    }
                                `}
                            </style>

                            <div className="h-64 overflow-hidden rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6 mb-6">
                                <svg className="w-full h-full" viewBox="0 0 400 200">
                                    {/* File representation */}
                                    <rect x="50" y="50" width="100" height="60" rx="8" fill="#fbbf24" className="dark:fill-yellow-800" />
                                    <text x="100" y="85" textAnchor="middle" fill="#92400e" className="dark:fill-yellow-300 text-sm font-semibold">file.txt</text>

                                    {/* Timestamps */}
                                    <g style={{ animation: 'pulseTimestamp 3s infinite' }}>
                                        <rect x="180" y="30" width="70" height="30" rx="4" fill="#93c5fd" className="dark:fill-blue-900" />
                                        <text x="215" y="50" textAnchor="middle" fill="#1e3a8a" className="dark:fill-blue-300 text-xs font-bold">atime</text>
                                        <text x="215" y="65" textAnchor="middle" fill="#4b5563" className="dark:fill-gray-400 text-xs">10:30 AM</text>
                                    </g>

                                    <g style={{ animation: 'pulseTimestamp 3s infinite', animationDelay: '1s' }}>
                                        <rect x="180" y="80" width="70" height="30" rx="4" fill="#86efac" className="dark:fill-green-900" />
                                        <text x="215" y="100" textAnchor="middle" fill="#166534" className="dark:fill-green-300 text-xs font-bold">mtime</text>
                                        <text x="215" y="115" textAnchor="middle" fill="#4b5563" className="dark:fill-gray-400 text-xs">10:15 AM</text>
                                    </g>

                                    <g style={{ animation: 'pulseTimestamp 3s infinite', animationDelay: '2s' }}>
                                        <rect x="180" y="130" width="70" height="30" rx="4" fill="#d8b4fe" className="dark:fill-purple-900" />
                                        <text x="215" y="150" textAnchor="middle" fill="#6b21a8" className="dark:fill-purple-300 text-xs font-bold">ctime</text>
                                        <text x="215" y="165" textAnchor="middle" fill="#4b5563" className="dark:fill-gray-400 text-xs">10:00 AM</text>
                                    </g>

                                    {/* Action: Reading the file */}
                                    <g>
                                        <rect x="280" y="40" width="90" height="25" rx="4" fill="#fca5a5" className="dark:fill-red-800" />
                                        <text x="325" y="57" textAnchor="middle" fill="#7f1d1d" className="dark:fill-red-300 text-xs">cat file.txt</text>
                                        <path d="M155,65 L275,65" stroke="#3b82f6" strokeWidth="2" fill="none" markerEnd="url(#arrowBlue)" />
                                    </g>

                                    {/* Action: Modifying the file */}
                                    <g>
                                        <rect x="280" y="90" width="90" height="25" rx="4" fill="#86efac" className="dark:fill-green-800" />
                                        <text x="325" y="107" textAnchor="middle" fill="#166534" className="dark:fill-green-300 text-xs">{'echo >> file'}</text>
                                        <path d="M155,100 L275,100" stroke="#10b981" strokeWidth="2" fill="none" markerEnd="url(#arrowGreen)" />
                                    </g>

                                    {/* Action: Changing permissions */}
                                    <g>
                                        <rect x="280" y="140" width="90" height="25" rx="4" fill="#d8b4fe" className="dark:fill-purple-800" />
                                        <text x="325" y="157" textAnchor="middle" fill="#6b21a8" className="dark:fill-purple-300 text-xs">chmod 755</text>
                                        <path d="M155,135 L275,135" stroke="#8b5cf6" strokeWidth="2" fill="none" markerEnd="url(#arrowPurple)" />
                                    </g>

                                    <defs>
                                        <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                            <path d="M0,0 L0,6 L9,3 z" fill="#3b82f6" />
                                        </marker>
                                        <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                            <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
                                        </marker>
                                        <marker id="arrowPurple" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                            <path d="M0,0 L0,6 L9,3 z" fill="#8b5cf6" />
                                        </marker>
                                    </defs>
                                </svg>
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                The visualization shows how different operations affect each timestamp.
                                <span className="font-semibold"> Tuhina</span> at Ichapur Tech uses this understanding to debug file synchronization issues.
                            </p>
                        </div>
                    </div>

                    {/* Viewing Timestamps */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Viewing Timestamps</h2>

                        <div className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="space-y-6">
                                <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Using <code>ls</code> Command</h3>
                                    <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm mb-3">
                                        $ ls -l file.txt<br />
                                        -rw-r--r-- 1 user group 1234 <span className="text-yellow-400">Jan 15 10:15</span> file.txt<br /><br />
                                        $ ls -lu file.txt  # Show atime<br />
                                        -rw-r--r-- 1 user group 1234 <span className="text-blue-400">Jan 15 10:30</span> file.txt<br /><br />
                                        $ ls -lc file.txt  # Show ctime<br />
                                        -rw-r--r-- 1 user group 1234 <span className="text-purple-400">Jan 15 10:00</span> file.txt
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        <code>ls -l</code> shows mtime by default. Use <code>-u</code> for atime, <code>-c</code> for ctime.
                                    </p>
                                </div>

                                <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Using <code>stat</code> Command</h3>
                                    <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm mb-3">
                                        $ stat file.txt<br />
                                        &nbsp;File: file.txt<br />
                                        &nbsp;Size: 1234       Blocks: 8     IO Block: 4096   regular file<br />
                                        &nbsp;Device: 801h/2049d  Inode: 1234567  Links: 1<br />
                                        &nbsp;Access: (0644/-rw-r--r--)  Uid: ( 1000/   user)   Gid: ( 1000/   group)<br />
                                        &nbsp;Access: <span className="text-blue-400">2024-01-15 10:30:00.000000000 +0530</span><br />
                                        &nbsp;Modify: <span className="text-green-400">2024-01-15 10:15:00.000000000 +0530</span><br />
                                        &nbsp;Change: <span className="text-purple-400">2024-01-15 10:00:00.000000000 +0530</span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        <code>stat</code> shows all three timestamps with nanosecond precision. Essential for forensic analysis.
                                    </p>
                                </div>

                                <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Find Files by Timestamp</h3>
                                    <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm mb-3">
                                        # Files modified in last 24 hours<br />
                                        $ find . -mtime -1<br /><br />
                                        # Files accessed more than 30 days ago<br />
                                        $ find . -atime +30<br /><br />
                                        # Files whose metadata changed today<br />
                                        $ find . -ctime 0
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        <span className="font-semibold">Abhronila</span> at Shyamnagar Lab uses these to clean up old cache files.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modifying Timestamps */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Modifying Timestamps</h2>

                        <div className="bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">The <code>touch</code> Command</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    <code>touch</code> is primarily used to update timestamps, not just create empty files.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="p-5 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Update to Current Time</h4>
                                    <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm mb-3">
                                        $ touch file.txt           # Updates atime and mtime to now<br />
                                        $ touch -a file.txt        # Update only atime<br />
                                        $ touch -m file.txt        # Update only mtime
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        Note: <code>touch</code> always updates ctime because it modifies file metadata.
                                    </p>
                                </div>

                                <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Set Specific Timestamp</h4>
                                    <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm mb-3">
                                        # Set to specific date/time<br />
                                        $ touch -t 202401151030.00 file.txt<br /><br />
                                        # Copy timestamp from another file<br />
                                        $ touch -r source.txt target.txt
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                        Useful for backup systems or when migrating files between servers.
                                    </p>
                                </div>

                                <div className="p-5 bg-gradient-to-r from-red-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                    <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">⚠️ Important Limitations</h4>
                                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                                        What you <span className="font-semibold text-red-600 dark:text-red-400">cannot</span> do with touch:
                                    </p>
                                    <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-3 rounded-lg font-mono text-sm">
                                        # Cannot set ctime directly<br />
                                        $ touch -c file.txt  # This doesn't set ctime!<br /><br />
                                        # touch -c means "do not create file"
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                        ctime can only be changed by the kernel when metadata changes.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Common Pitfalls */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '500ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Common Pitfalls & Misconceptions</h2>

                        <div className="bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="space-y-6">
                                <div className="p-5 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border-l-4 border-red-500">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                                            <span className="text-red-600 dark:text-red-300 font-bold">✗</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">"ctime is creation time"</h3>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                Wrong! ctime is <span className="font-semibold">change time</span>, not creation time.
                                                Unix doesn't store creation time (birth time) except on some filesystems like ext4.
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
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">"mv doesn't change timestamps"</h3>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                Moving within same filesystem updates ctime (inode changes).
                                                Cross-filesystem move is copy+delete, so all timestamps change.
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
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">"cp preserves all timestamps"</h3>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                <code>cp</code> preserves mtime but sets new atime and ctime.
                                                Use <code>cp -p</code> to preserve timestamps (if possible).
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
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Correct Understanding</h3>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                ctime ≥ mtime always. When mtime changes, ctime also changes because
                                                file size (metadata) changed.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Teacher's Note */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '600ms' }}>
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
                                <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Forensic Insight</h4>
                                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                                    In security investigations, timestamps tell a story. I once helped
                                    <span className="font-semibold"> Debangshu</span> at Naihati Server Farm investigate a breach.
                                    The attacker modified a file, but the ctime didn't match the mtime —
                                    revealing they had restored from backup to cover tracks.
                                </p>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mt-1">
                                            <span className="text-indigo-600 dark:text-indigo-300 font-bold">1</span>
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300">Always check all three timestamps with <code>stat</code>, not just <code>ls -l</code></span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mt-1">
                                            <span className="text-indigo-600 dark:text-indigo-300 font-bold">2</span>
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300">ctime cannot be forged (easily). It's the most trustworthy timestamp.</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mt-1">
                                            <span className="text-indigo-600 dark:text-indigo-300 font-bold">3</span>
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300">Remember: atime updates on read, but many systems disable it for performance.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg">
                                <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-gray-700 dark:text-gray-300">
                                    Pro tip: When debugging, create a timeline: <code>find . -type f -exec stat --format='%n %x %y %z' { } \;</code>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Mini Checklist */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '700ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">What to Remember</h2>

                        <div className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="space-y-3">
                                {[
                                    "atime = last read, mtime = last content change, ctime = last metadata change",
                                    "ls -l shows mtime, ls -lu shows atime, ls -lc shows ctime",
                                    "stat shows all three with nanosecond precision",
                                    "touch updates atime and mtime, always updates ctime",
                                    "ctime cannot be set manually (kernel controlled)",
                                    "cp -p preserves timestamps, cp without -p doesn't",
                                    "ctime ≥ mtime always (metadata changes when content changes)"
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
                                    <span className="font-semibold">Tuhina</span> at Ichapur Tech uses this script to audit file changes:
                                </p>
                                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm">
                                    # Audit recently changed files<br />
                                    find /important -type f -mtime -1 -exec stat --format='%n %y' { } \;<br />
                                    find /important -type f -ctime -1 -exec stat --format='%n %z' { } \;
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hint Section */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '800ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Think About This...</h2>

                        <div className="bg-gradient-to-br from-white to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="space-y-6">
                                <div className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Observe carefully...</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        Create a file, check its timestamps, then run these commands in order:
                                    </p>
                                    <pre className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                                        <code>
                                        {`$ echo "test" > file.txt
                                        $ stat file.txt  # Note all timestamps
                                        $ cat file.txt
                                        $ stat file.txt  # What changed?
                                        $ chmod 644 file.txt
                                        $ stat file.txt  # What changed now?`}
                                        </code>
                                        </pre>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                        Predict which timestamps will change at each step. Why?
                                    </p>
                                </div>

                                <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Try changing this...</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        How would you find files that were accessed but not modified in the last week?
                                    </p>
                                    <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                        # Hint: Use find with -atime and -mtime<br />
                                        find . -type f -atime -7 _____ -mtime _____
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                        This helps <span className="font-semibold">Abhronila</span> identify which old files are still being used.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl">
                                <p className="text-gray-700 dark:text-gray-300 text-center">
                                    Remember <span className="font-semibold">Swadeep</span>'s investigation: Attackers can modify mtime but ctime reveals the truth.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Professional Tips */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '900ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Professional Tips & Tricks</h2>

                        <div className="space-y-6">
                            <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-purple-200 dark:border-purple-800">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Backup Strategy</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Use mtime for incremental backups, ctime for detecting permission/ownership changes.
                                </p>
                                <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                    # Backup only files modified since last backup<br />
                                    find /data -type f -newer /var/backup/last_backup -exec cp { } /backup/ \;
                                </div>
                            </div>

                            <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-blue-200 dark:border-blue-800">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Performance Tuning</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Disable atime updates on busy servers to reduce disk I/O.
                                </p>
                                <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                    # In /etc/fstab<br />
                                    /dev/sda1  /data  ext4  defaults,noatime  0  2
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                    <span className="font-semibold">Debangshu</span> did this at Naihati Server Farm, improving performance by 15%.
                                </p>
                            </div>

                            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-green-200 dark:border-green-800">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Forensic Analysis</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Create timeline of all file activities for security investigations.
                                </p>
                                <pre className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                                    <code>
                                    {`# Create investigation timeline
                                    find / -type f -exec stat --format='%Y %n' { } \\; 2>/dev/null | sort -n |
                                    while read time file; do
                                    date -d @$time +"%F %T"
                                    echo "  $file"
                                    done > timeline.txt`}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '1000ms' }}>
                        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                            <div className="text-center">
                                <div className="text-gray-600 dark:text-gray-400 mb-4">
                                    Topic 8: Understanding File Timestamps (atime, mtime, ctime)
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-500">
                                    Next: Using stat to inspect file details
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

