import React from 'react';

export default class Topic13 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            activeSection: 'basic'
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isVisible: true });
        }, 50);
    }

    handleSectionChange = (section) => {
        this.setState({ activeSection: section });
    }

    render() {
        const { isVisible, activeSection } = this.state;

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-violet-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
                <div className="max-w-3xl mx-auto">

                    {/* Header */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-3 h-12 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full animate-pulse"></div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100">
                                Using <code>stat</code> to Inspect File Details
                            </h1>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                Mastering the <code>stat</code> command for complete file system analysis —
                                the Swiss Army knife for file metadata inspection, debugging, and forensic investigation.
                            </p>
                            <div className="p-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    When <span className="font-semibold text-violet-600 dark:text-violet-400">Debangshu</span> at Naihati Server Farm
                                    needs to investigate why a backup script failed, <code>stat</code> reveals the complete story.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Why stat Matters */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Why <code>stat</code> is Essential</h2>

                        <div className="bg-gradient-to-br from-white to-violet-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                                While <code>ls -l</code> shows basic information, <code>stat</code> provides complete metadata —
                                from inode numbers and hard link counts to nanosecond timestamps and file system blocks.
                            </p>

                            <div className="space-y-4">
                                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-xl border-l-4 border-blue-500">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center">
                                            <span className="text-blue-600 dark:text-blue-300 font-bold">🔍</span>
                                        </div>
                                        <h3 className="font-bold text-gray-800 dark:text-gray-200">Debugging Tool</h3>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Identify permission issues, broken symlinks, and file ownership problems.
                                    </p>
                                </div>

                                <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-xl border-l-4 border-green-500">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                                            <span className="text-green-600 dark:text-green-300 font-bold">📊</span>
                                        </div>
                                        <h3 className="font-bold text-gray-800 dark:text-gray-200">Forensic Analysis</h3>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Examine exact timestamps to reconstruct file access patterns and modifications.
                                    </p>
                                </div>

                                <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-xl border-l-4 border-purple-500">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center">
                                            <span className="text-purple-600 dark:text-purple-300 font-bold">⚙️</span>
                                        </div>
                                        <h3 className="font-bold text-gray-800 dark:text-gray-200">Scripting Foundation</h3>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        <span className="font-semibold">Tuhina</span> at Ichapur Tech uses <code>stat</code> output
                                        in scripts for automated file management.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Basic stat Command */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Basic <code>stat</code> Usage</h2>

                        <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Prototype & Purpose</h3>
                                <div className="bg-gray-800 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono">
                                    <div className="text-cyan-400">Command:</div>
                                    <div>stat [OPTION]... FILE...</div>
                                    <div className="text-cyan-400 mt-2">Return Type:</div>
                                    <div>Formatted text output with file metadata</div>
                                    <div className="text-cyan-400 mt-2">Purpose:</div>
                                    <div>Display file or file system status</div>
                                </div>
                            </div>

                            <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl mb-6">
                                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Basic Example</h4>
                                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                                    $ stat important_document.txt<br />
                                    &nbsp;File: important_document.txt<br />
                                    &nbsp;Size: 4096        Blocks: 8          IO Block: 4096   regular file<br />
                                    &nbsp;Device: 801h/2049d  Inode: 1234567     Links: 1<br />
                                    &nbsp;Access: (0644/-rw-r--r--)  Uid: ( 1000/   tuhina)   Gid: ( 1000/   students)<br />
                                    &nbsp;Access: 2024-01-15 14:30:45.123456789 +0530<br />
                                    &nbsp;Modify: 2024-01-15 14:25:30.987654321 +0530<br />
                                    &nbsp;Change: 2024-01-15 14:25:30.987654321 +0530<br />
                                    &nbsp;Birth: 2024-01-15 14:20:15.000000000 +0530
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 text-sm mt-3">
                                    This shows comprehensive metadata including birth time (if supported by filesystem).
                                </p>
                            </div>

                            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border-l-4 border-yellow-500">
                                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Key Insight</h4>
                                <p className="text-gray-700 dark:text-gray-300">
                                    <code>stat</code> reads from the file's inode, not just directory entries.
                                    This makes it more accurate than tools that might cache information.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Menu for stat Sections */}
                    <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {[
                                { id: 'basic', label: 'Basic Output' },
                                { id: 'timestamps', label: 'Timestamps' },
                                { id: 'format', label: 'Format Strings' },
                                { id: 'filesystem', label: 'Filesystem Info' },
                                { id: 'comparison', label: 'vs ls -l' }
                            ].map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => this.handleSectionChange(section.id)}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${activeSection === section.id
                                        ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {section.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Content Based on Selection */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
                        {activeSection === 'basic' && (
                            <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Understanding Basic Output</h3>

                                <div className="space-y-6">
                                    <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">File Information</h4>
                                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3">
                                            File: important_document.txt      # File name<br />
                                            Size: 4096                        # Size in bytes<br />
                                            Blocks: 8                         # Blocks allocated (usually 512B each)<br />
                                            IO Block: 4096                    # Filesystem block size
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                                            Note: Size vs Blocks — files can take more disk space than their actual size due to block allocation.
                                        </p>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Inode and Device</h4>
                                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3">
                                            Device: 801h/2049d                # Device ID (hex/decimal)<br />
                                            Inode: 1234567                    # Inode number<br />
                                            Links: 1                          # Hard link count
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                                            <span className="font-semibold">Swadeep</span> uses inode numbers at Barrackpore University
                                            to track files across backups.
                                        </p>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Permissions and Ownership</h4>
                                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3">
                                            Access: (0644/-rw-r--r--)         # Octal and symbolic permissions<br />
                                            Uid: ( 1000/   tuhina)           # User ID and name<br />
                                            Gid: ( 1000/   students)         # Group ID and name
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                                            Both numeric and symbolic permissions are shown — useful for scripting and manual inspection.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'timestamps' && (
                            <div className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Timestamp Analysis</h3>

                                <div className="space-y-6">
                                    <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Nanosecond Precision</h4>
                                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3">
                                            Access: 2024-01-15 14:30:45.<span className="text-yellow-400">123456789</span> +0530<br />
                                            Modify: 2024-01-15 14:25:30.<span className="text-yellow-400">987654321</span> +0530<br />
                                            Change: 2024-01-15 14:25:30.<span className="text-yellow-400">987654321</span> +0530<br />
                                            Birth: 2024-01-15 14:20:15.<span className="text-yellow-400">000000000</span> +0530
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                                            Nanosecond precision is crucial for forensic analysis and debugging race conditions.
                                        </p>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Birth Time (btime)</h4>
                                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3">
                                            # Not all filesystems support birth time<br />
                                            $ stat -c '%w' file.txt  # Show birth time<br />
                                            2024-01-15 14:20:15.000000000 +0530<br /><br />
                                            # If not supported:<br />
                                            $ stat -c '%w' file.txt<br />
                                            -
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                                            ext4, XFS, Btrfs support birth time. FAT32 and older ext3 do not.
                                        </p>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Timestamp Comparison</h4>
                                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3">
                                            # Check if file was modified after backup<br />
                                            if [ $(stat -c '%Y' file.txt) -gt $(stat -c '%Y' backup/file.txt) ]; then<br />
                                            &nbsp;&nbsp;echo "File changed, needs backup"<br />
                                            fi
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                                            <span className="font-semibold">Abhronila</span> uses this at Shyamnagar Lab for incremental backups.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'format' && (
                            <div className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Format Strings for Scripting</h3>

                                <div className="space-y-6">
                                    <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Custom Output Format</h4>
                                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3">
                                            $ stat -c "File: %n Size: %s bytes" file.txt<br />
                                            File: file.txt Size: 4096 bytes<br /><br />
                                            $ stat -c "%A %U %G %s %n" *.txt<br />
                                            -rw-r--r-- tuhina students 4096 notes.txt<br />
                                            -rwxr-xr-x swadeep faculty 8192 script.txt
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                                            <code>-c</code> or <code>--format</code> allows custom output — perfect for scripting.
                                        </p>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Common Format Sequences</h4>
                                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3">
                                            %n - File name<br />
                                            %s - Size in bytes<br />
                                            %U - User name of owner<br />
                                            %G - Group name of owner<br />
                                            %i - Inode number<br />
                                            %h - Hard link count<br />
                                            %a - Access rights in octal<br />
                                            %A - Access rights in human readable<br />
                                            %w - Birth time (or - if unknown)<br />
                                            %x - Last access time (atime)<br />
                                            %y - Last modification time (mtime)<br />
                                            %z - Last change time (ctime)
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                                            Combine these to create exactly the output you need for your scripts.
                                        </p>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Practical Script Example</h4>
                                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3">
                                            #!/bin/bash<br />
                                            # Audit script by Tuhina<br />
                                            for file in /data/*; do<br />
                                            &nbsp;&nbsp;stat -c "%n %U %G %a %s %y" "$file"<br />
                                            done | column -t<br /><br />
                                            # Output:<br />
                                            # file1.txt  tuhina  students  644  4096  2024-01-15 14:25:30.987654321<br />
                                            # file2.txt  swadeep faculty   755  8192  2024-01-15 13:20:15.123456789
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                                            This creates a clean, tabular audit report of all files.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'filesystem' && (
                            <div className="bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Filesystem Information</h3>

                                <div className="space-y-6">
                                    <div className="p-5 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">File System Statistics</h4>
                                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3">
                                            $ stat -f /home/tuhina<br />
                                            &nbsp;File: "/home/tuhina"<br />
                                            &nbsp;ID: 4a3b2c1d0e9f8a7b Namelen: 255     Type: ext4<br />
                                            &nbsp;Block size: 4096       Fundamental block size: 4096<br />
                                            &nbsp;Blocks: Total: 10485760   Free: 5242880    Available: 4718592<br />
                                            &nbsp;Inodes: Total: 2621440    Free: 1310720
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                                            <code>stat -f</code> shows filesystem information, not file information.
                                        </p>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Checking Disk Usage</h4>
                                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3">
                                            # Blocks vs Size<br />
                                            $ stat -c "%n: Size=%s bytes, Blocks=%b (each %B bytes)" file.txt<br />
                                            file.txt: Size=1024 bytes, Blocks=8 (each 512 bytes)<br /><br />
                                            # Actual disk usage<br />
                                            $ echo "Disk usage: $(( $(stat -c '%b * %B' file.txt) )) bytes"<br />
                                            Disk usage: 4096 bytes
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                                            A 1KB file can use 4KB of disk space due to block allocation.
                                        </p>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Device and Inode Information</h4>
                                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3">
                                            # Check if two files are the same (hard links)<br />
                                            file1_dev=$(stat -c '%d' file1)<br />
                                            file1_ino=$(stat -c '%i' file1)<br />
                                            file2_dev=$(stat -c '%d' file2)<br />
                                            file2_ino=$(stat -c '%i' file2)<br /><br />
                                            if [ "$file1_dev" = "$file2_dev" ] && [ "$file1_ino" = "$file2_ino" ]; then<br />
                                            &nbsp;&nbsp;echo "Files are hard links to the same inode"<br />
                                            fi
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                                            <span className="font-semibold">Debangshu</span> uses this to detect duplicate files across backups.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'comparison' && (
                            <div className="bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6"><code>stat</code> vs <code>ls -l</code></h3>

                                <div className="space-y-6">
                                    <div className="p-5 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">What <code>ls -l</code> Shows</h4>
                                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3">
                                            $ ls -l important_document.txt<br />
                                            -rw-r--r-- 1 tuhina students 4096 Jan 15 14:25 important_document.txt
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                                            Basic info: permissions, links, owner, group, size, mtime, filename.
                                        </p>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">What <code>stat</code> Adds</h4>
                                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3">
                                            • Inode number and device ID<br />
                                            • Block count and allocation details<br />
                                            • All three timestamps (atime, mtime, ctime)<br />
                                            • Birth time (if supported)<br />
                                            • Nanosecond precision<br />
                                            • Filesystem block size<br />
                                            • Access rights in both octal and symbolic
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                                            <code>stat</code> provides complete metadata for debugging and analysis.
                                        </p>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">When to Use Which</h4>
                                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-3">
                                            # Quick look at multiple files:<br />
                                            $ ls -l *.txt<br /><br />
                                            # Detailed analysis of specific file:<br />
                                            $ stat suspicious_file.txt<br /><br />
                                            # Scripting with precise data:<br />
                                            $ stat -c '%i %s %Y' file.txt
                                        </div>
                                        <p className="text-gray-700 dark:text-gray-300 text-sm">
                                            Use <code>ls -l</code> for browsing, <code>stat</code> for investigation and scripting.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Common Pitfalls */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '500ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Common Pitfalls</h2>

                        <div className="bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="space-y-6">
                                <div className="p-5 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border-l-4 border-red-500">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                                            <span className="text-red-600 dark:text-red-300 font-bold">✗</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Assuming Birth Time Always Exists</h3>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                Many filesystems don't store birth time. Always check with <code>stat -c '%w'</code>
                                                and handle the <code>-</code> output in scripts.
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
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Confusing Blocks and Size</h3>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                File size ≠ disk usage. A 1-byte file can use 4KB on disk.
                                                Use <code>stat -c '%b * %B'</code> to calculate actual disk usage.
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
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Assuming <code>stat</code> Works on All Systems</h3>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                BSD and GNU <code>stat</code> have different options.
                                                Scripts should check which version is available or use portable alternatives.
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
                                                Always use <code>stat -c</code> (GNU) or <code>stat -f</code> (BSD) explicitly in scripts,
                                                and test on target systems.
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
                                <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">The Power of <code>stat</code></h4>
                                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                                    I've seen junior administrators spend hours debugging permission issues that
                                    <code>stat</code> would have revealed in seconds. When
                                    <span className="font-semibold"> Tuhina</span> couldn't understand why her backup script
                                    was skipping files at Ichapur Tech, <code>stat -c '%a'</code> showed the files had 000 permissions
                                    — a classic case of a buggy umask in a cron job.
                                </p>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mt-1">
                                            <span className="text-indigo-600 dark:text-indigo-300 font-bold">1</span>
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300">For debugging: Always check all three timestamps — they tell different stories.</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mt-1">
                                            <span className="text-indigo-600 dark:text-indigo-300 font-bold">2</span>
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300">For scripting: Use format strings (<code>-c</code>) for reliable, parseable output.</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mt-1">
                                            <span className="text-indigo-600 dark:text-indigo-300 font-bold">3</span>
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300">Remember: <code>stat</code> reads from the inode, so it always shows current reality, not cached views.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-3 p-4 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/30 dark:to-purple-900/30 rounded-lg">
                                <svg className="w-6 h-6 text-violet-600 dark:text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                                <span className="text-gray-700 dark:text-gray-300">
                                    Pro tip: Create alias <code>alias st='stat -c "File: %n\\nSize: %s\\nOwner: %U\\nModified: %y"'</code>
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
                                    "stat shows complete file metadata, ls -l shows summary",
                                    "Use -c for custom format strings in scripts",
                                    "Blocks * Block size = actual disk usage, not file size",
                                    "Three timestamps: atime (access), mtime (modify), ctime (change)",
                                    "Birth time may not exist on all filesystems",
                                    "Inode + device ID uniquely identifies a file",
                                    "stat -f shows filesystem information, not file information"
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
                                    <span className="font-semibold">Swadeep</span> at Barrackpore University uses this audit script:
                                </p>
                                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm">
                                    # File system audit<br />
                                    <code>{'stat -c "%n %U %G %a %i %b %B %s %y" /important/*'}</code><br />
                                    <code>{'| awk \'{print $0, $8/$7*512 " disk efficiency"}\''}</code><br />
                                    <code>{'| sort -k10 -n'}</code>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                                    This identifies files with poor disk space utilization.
                                </p>
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
                                        Create two hard links to the same file and compare their <code>stat</code> output:
                                    </p>
                                    <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                        <code>{'echo "test" > original.txt'}</code><br />
                                        <code>{'ln original.txt link1.txt'}</code><br />
                                        <code>{'ln original.txt link2.txt'}</code><br />
                                        <code>{'stat original.txt link1.txt link2.txt'}</code>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                        What fields are identical? What fields differ? Why would this matter to
                                        <span className="font-semibold"> Abhronila</span> at Shyamnagar Lab?
                                    </p>
                                </div>

                                <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Try changing this...</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        How would you write a script that finds all files modified in the last hour,
                                        but only if they're over 1MB in size?
                                    </p>
                                    <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                        # Hint: Use find with -mmin and -size, then stat for precise checking<br />
                                        find . -type f -mmin -60 -size +1M -exec stat _____
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl">
                                <p className="text-gray-700 dark:text-gray-300 text-center">
                                    Remember <span className="font-semibold">Debangshu</span>'s discovery: A "1GB" file was actually
                                    using 2GB of disk space due to sparse file detection with <code>stat</code>.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Professional Tips */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '900ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Professional Tips & Tricks</h2>

                        <div className="space-y-6">
                            <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-purple-200 dark:border-purple-800">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Performance Monitoring</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Use <code>stat</code> to track file growth and detect anomalies.
                                </p>
                                <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                    # Monitor log file growth<br />
                                    while true; do<br />
                                    &nbsp;&nbsp;stat -c "%s %y" /var/log/app.log<br />
                                    &nbsp;&nbsp;sleep 60<br />
                                    done | tee growth.log
                                </div>
                            </div>

                            <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-blue-200 dark:border-blue-800">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Security Audit</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Check for suspicious file permissions and ownership.
                                </p>
                                <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                    <code>{'# Find world-writable files'}</code><br />
                                    <code>{'find / -type f -perm /o+w -exec stat -c "%a %U %G %n" {} \\; 2>/dev/null'}</code>
                                    <br /><br />
                                    <code>{'# Find files owned by deleted users'}</code><br />
                                    <code>{'find / -nouser -exec stat -c "%U %G %n" {} \\; 2>/dev/null'}</code>
                                </div>
                            </div>

                            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-green-200 dark:border-green-800">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Alias for Daily Use</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Add these to your <code>~/.bashrc</code>:
                                </p>
                                <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                    <code>{'# Quick stat with most useful info'}</code><br />
                                    <code>
                                        {'alias qstat=\'stat -c "Name: %n\\nSize: %s bytes (%b blocks)\\nOwner: %U:%G (%u:%g)\\nPerms: %A (%a)\\nModify: %y"\''}
                                    </code>
                                    <br /><br />
                                    <code>{'# Compare two files'}</code><br />
                                    <code>
                                        {'alias statcmp=\'f1=$1; f2=$2; diff <(stat -c "%n %s %i %Y" "$f1") <(stat -c "%n %s %i %Y" "$f2")\''}
                                    </code>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '1000ms' }}>
                        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                            <div className="text-center">
                                <div className="text-gray-600 dark:text-gray-400 mb-4">
                                    Topic 9: Using stat to Inspect File Details
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-500">
                                    Next: Practical lab: Organize a messy folder into structured directories
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
