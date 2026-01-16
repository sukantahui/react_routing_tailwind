import React from 'react';

export default class Topic14 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            activeStep: 1
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isVisible: true });
        }, 50);
    }

    handleStepChange = (step) => {
        this.setState({ activeStep: step });
    }

    render() {
        const { isVisible, activeStep } = this.state;

        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8 transition-colors duration-300">
                <div className="max-w-3xl mx-auto">

                    {/* Header */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-3 h-12 bg-gradient-to-b from-teal-500 to-emerald-600 rounded-full animate-pulse"></div>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100">
                                Practical Lab: Organize a Messy Folder
                            </h1>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                Hands-on exercise: Transform a chaotic directory with hundreds of mixed files 
                                into a clean, structured organization using shell commands and scripting.
                            </p>
                            <div className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-lg">
                                <p className="text-gray-700 dark:text-gray-300">
                                    <span className="font-semibold text-teal-600 dark:text-teal-400">Swadeep</span> at Barrackpore University 
                                    has a "Downloads" folder with 500+ files of all types — let's help him organize it professionally.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Lab Overview */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Lab Overview</h2>

                        <div className="bg-gradient-to-br from-white to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">The Problem</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    You have a directory called <code>messy_folder/</code> containing:
                                </p>
                                <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                    messy_folder/<br />
                                    ├── photo1.jpg<br />
                                    ├── document.pdf<br />
                                    ├── code.py<br />
                                    ├── data.csv<br />
                                    ├── music.mp3<br />
                                    ├── archive.zip<br />
                                    ├── notes.txt<br />
                                    ├── screenshot.png<br />
                                    ├── backup.tar.gz<br />
                                    ├── script.sh<br />
                                    └── ... 500+ more files
                                </div>
                            </div>

                            <div className="p-5 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl">
                                <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Learning Objectives</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                                            <span className="text-teal-600 dark:text-teal-300 text-sm">1</span>
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">Use pattern matching to identify file types</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                                            <span className="text-teal-600 dark:text-teal-300 text-sm">2</span>
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">Create directories and move files safely</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                                            <span className="text-teal-600 dark:text-teal-300 text-sm">3</span>
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">Write shell scripts for automation</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                                            <span className="text-teal-600 dark:text-teal-300 text-sm">4</span>
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300">Handle edge cases and errors</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step Navigation */}
                    <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {[1, 2, 3, 4, 5, 6].map((step) => (
                                <button
                                    key={step}
                                    onClick={() => this.handleStepChange(step)}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${activeStep === step
                                        ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    Step {step}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Step Content */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
                        
                        {/* Step 1: Assessment */}
                        {activeStep === 1 && (
                            <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-xl">1</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Step 1: Assess the Situation</h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">First, Understand What You Have</h4>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                                            Before organizing, analyze the directory structure and file types.
                                        </p>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'# Count total files'}</code><br />
                                            <code>{'find messy_folder -type f | wc -l'}</code><br /><br />
                                            <code>{'# List unique file extensions'}</code><br />
                                            <code>{'find messy_folder -type f -name "*.*" | sed \'s/.*\\.//\' | sort | uniq -c | sort -rn'}</code><br /><br />
                                            <code>{'# See file distribution by type'}</code><br />
                                            <code>{'ls -la messy_folder | head -20'}</code>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                            <span className="font-semibold">Tuhina</span> at Ichapur Tech always starts with assessment — 
                                            you can't organize what you don't understand.
                                        </p>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Expected Output</h4>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            543 total files<br />
                                            156 jpg<br />
                                            98 pdf<br />
                                            87 txt<br />
                                            65 png<br />
                                            43 zip<br />
                                            32 mp3<br />
                                            62 others
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                            This tells us we need directories for Images, Documents, Archives, Media, etc.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Planning Structure */}
                        {activeStep === 2 && (
                            <div className="bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-xl">2</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Step 2: Plan Your Structure</h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Design the Target Structure</h4>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                                            Based on file types identified, create a logical directory structure.
                                        </p>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            organized_folder/<br />
                                            ├── Images/<br />
                                            │&nbsp;&nbsp;├── jpg/<br />
                                            │&nbsp;&nbsp;├── png/<br />
                                            │&nbsp;&nbsp;└── gif/<br />
                                            ├── Documents/<br />
                                            │&nbsp;&nbsp;├── pdf/<br />
                                            │&nbsp;&nbsp;├── txt/<br />
                                            │&nbsp;&nbsp;└── doc/<br />
                                            ├── Archives/<br />
                                            │&nbsp;&nbsp;├── zip/<br />
                                            │&nbsp;&nbsp;├── tar.gz/<br />
                                            │&nbsp;&nbsp;└── rar/<br />
                                            ├── Media/<br />
                                            │&nbsp;&nbsp;├── mp3/<br />
                                            │&nbsp;&nbsp;├── mp4/<br />
                                            │&nbsp;&nbsp;└── avi/<br />
                                            ├── Code/<br />
                                            │&nbsp;&nbsp;├── py/<br />
                                            │&nbsp;&nbsp;├── sh/<br />
                                            │&nbsp;&nbsp;└── js/<br />
                                            └── Data/<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;├── csv/<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;├── json/<br />
                                            &nbsp;&nbsp;&nbsp;&nbsp;└── xml/
                                        </div>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Create the Structure</h4>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'# Create main organized folder'}</code><br />
                                            <code>{'mkdir -p organized_folder'}</code><br /><br />
                                            <code>{'# Create subdirectories'}</code><br />
                                            <code>{'mkdir -p organized_folder/{Images/{jpg,png,gif},Documents/{pdf,txt,doc},Archives/{zip,tar.gz,rar},Media/{mp3,mp4,avi},Code/{py,sh,js},Data/{csv,json,xml}}'}</code><br /><br />
                                            <code>{'# Verify creation'}</code><br />
                                            <code>{'tree organized_folder -d'}</code>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                            Brace expansion <code>{'{}'}</code> creates multiple directories at once — a powerful shell feature.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Manual Organization */}
                        {activeStep === 3 && (
                            <div className="bg-gradient-to-br from-white to-yellow-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-xl">3</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Step 3: Manual Organization (Learning)</h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-5 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Move Files by Pattern</h4>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                                            Learn the pattern before automation. Move files one type at a time.
                                        </p>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'# Move all JPG files'}</code><br />
                                            <code>{'mv messy_folder/*.jpg organized_folder/Images/jpg/'}</code><br /><br />
                                            <code>{'# Move all PDF files'}</code><br />
                                            <code>{'mv messy_folder/*.pdf organized_folder/Documents/pdf/'}</code><br /><br />
                                            <code>{'# Check what moved'}</code><br />
                                            <code>{'ls -la organized_folder/Images/jpg/ | wc -l'}</code><br />
                                            <code>{'ls -la messy_folder/*.jpg 2>/dev/null | wc -l'}</code>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                            <span className="font-semibold">Abhronila</span> at Shyamnagar Lab always checks 
                                            before and after counts to ensure nothing is lost.
                                        </p>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">⚠️ Important Safety Notes</h4>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'# ALWAYS use -i for interactive mode when learning'}</code><br />
                                            <code>{'mv -i messy_folder/*.jpg organized_folder/Images/jpg/'}</code><br /><br />
                                            <code>{'# Or use -n for no-clobber (won\'t overwrite)'}</code><br />
                                            <code>{'mv -n messy_folder/*.pdf organized_folder/Documents/pdf/'}</code><br /><br />
                                            <code>{'# Test with echo first'}</code><br />
                                            <code>{'echo mv messy_folder/*.txt organized_folder/Documents/txt/'}</code>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                            Never run mass moves without testing! Use <code>echo</code> to preview commands.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Script Automation */}
                        {activeStep === 4 && (
                            <div className="bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-xl">4</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Step 4: Create Automation Script</h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">The Organizer Script</h4>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                                            Create a reusable script that can organize any messy folder.
                                        </p>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'#!/bin/bash'}</code><br />
                                            <code>{'# organizer.sh - Organize files by type'}</code><br /><br />
                                            <code>{'SOURCE_DIR=${1:-"."}'}</code><br />
                                            <code>{'TARGET_DIR=${2:-"organized"}'}</code><br /><br />
                                            <code>{'# Create directory structure'}</code><br />
                                            <code>{'mkdir -p "$TARGET_DIR"/{Images/{jpg,png,gif},Documents/{pdf,txt,doc},Archives/{zip,tar.gz,rar},Media/{mp3,mp4,avi},Code/{py,sh,js},Data/{csv,json,xml}}'}</code><br /><br />
                                            <code>{'# Move files with safety checks'}</code><br />
                                            <code>{'organize_files() {'}</code><br />
                                            <code>&nbsp;&nbsp;{'local pattern=$1'}</code><br />
                                            <code>&nbsp;&nbsp;{'local target=$2'}</code><br />
                                            <code>&nbsp;&nbsp;{'for file in "$SOURCE_DIR"/$pattern; do'}</code><br />
                                            <code>&nbsp;&nbsp;&nbsp;&nbsp;{'if [ -f "$file" ]; then'}</code><br />
                                            <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'mv -n "$file" "$target"'}</code><br />
                                            <code>&nbsp;&nbsp;&nbsp;&nbsp;{'fi'}</code><br />
                                            <code>&nbsp;&nbsp;{'done'}</code><br />
                                            <code>{'}'}</code><br /><br />
                                            <code>{'# Organize by file type'}</code><br />
                                            <code>{'organize_files "*.jpg" "$TARGET_DIR/Images/jpg"'}</code><br />
                                            <code>{'organize_files "*.png" "$TARGET_DIR/Images/png"'}</code><br />
                                            <code>{'# ... add more patterns ...'}</code>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Run the Script Safely</h4>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'# Make script executable'}</code><br />
                                            <code>{'chmod +x organizer.sh'}</code><br /><br />
                                            <code>{'# Dry run (test without moving)'}</code><br />
                                            <code>{'./organizer.sh messy_folder test_organized'}</code><br />
                                            <code>{'ls test_organized/'}</code><br /><br />
                                            <code>{'# Actual run'}</code><br />
                                            <code>{'./organizer.sh messy_folder organized_folder'}</code><br /><br />
                                            <code>{'# Verify results'}</code><br />
                                            <code>{'tree organized_folder'}</code>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                            Always test with a copy or dry run first! 
                                            <span className="font-semibold"> Debangshu</span> learned this the hard way at Naihati Server Farm.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 5: Handle Edge Cases */}
                        {activeStep === 5 && (
                            <div className="bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-xl">5</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Step 5: Handle Edge Cases</h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-5 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Common Problems & Solutions</h4>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                                            Real-world files have edge cases you must handle.
                                        </p>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'# Problem 1: Files with spaces in names'}</code><br />
                                            <code>{'for file in "$SOURCE_DIR"/*.txt; do'}</code><br />
                                            <code>&nbsp;&nbsp;{'mv "$file" "$TARGET_DIR/Documents/txt/"'}</code><br />
                                            <code>{'done'}</code><br /><br />
                                            <code>{'# Problem 2: Case-insensitive matching'}</code><br />
                                            <code>{'shopt -s nocaseglob  # Enable case-insensitive globbing'}</code><br />
                                            <code>{'mv "$SOURCE_DIR"/*.JPG "$TARGET_DIR/Images/jpg/"'}</code><br /><br />
                                            <code>{'# Problem 3: Files with no extension'}</code><br />
                                            <code>{'file --mime-type "$file" | grep -q "text/"'}</code><br />
                                            <code>{'# Use file command to detect type'}</code>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Advanced: File Type Detection</h4>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'# Detect file type using \'file\' command'}</code><br />
                                            <code>{'organize_by_mime() {'}</code><br />
                                            <code>&nbsp;&nbsp;{'for file in "$SOURCE_DIR"/*; do'}</code><br />
                                            <code>&nbsp;&nbsp;&nbsp;&nbsp;{'mime=$(file --mime-type -b "$file")'}</code><br />
                                            <code>&nbsp;&nbsp;&nbsp;&nbsp;{'case $mime in'}</code><br />
                                            <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'image/*) mv "$file" "$TARGET_DIR/Images/" ;;'}</code><br />
                                            <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'text/*) mv "$file" "$TARGET_DIR/Documents/" ;;'}</code><br />
                                            <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'application/pdf*) mv "$file" "$TARGET_DIR/Documents/pdf/" ;;'}</code><br />
                                            <code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'*) mv "$file" "$TARGET_DIR/Others/" ;;'}</code><br />
                                            <code>&nbsp;&nbsp;&nbsp;&nbsp;{'esac'}</code><br />
                                            <code>&nbsp;&nbsp;{'done'}</code><br />
                                            <code>{'}'}</code>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                            This handles files without extensions or incorrectly named files.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 6: Verification & Cleanup */}
                        {activeStep === 6 && (
                            <div className="bg-gradient-to-br from-white to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-xl">6</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Step 6: Verify & Document</h3>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-5 bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Verify Organization</h4>
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                                            Ensure all files were moved correctly and nothing was lost.
                                        </p>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'# Count files before and after'}</code><br />
                                            <code>{'before=$(find messy_folder -type f | wc -l)'}</code><br />
                                            <code>{'after=$(find organized_folder -type f | wc -l)'}</code><br />
                                            <code>{'echo "Files before: $before, Files after: $after"'}</code><br /><br />
                                            <code>{'# Check for empty source directory'}</code><br />
                                            <code>{'if [ $(find messy_folder -maxdepth 1 -type f | wc -l) -eq 0 ]; then'}</code><br />
                                            <code>&nbsp;&nbsp;{'echo "All files moved successfully!"'}</code><br />
                                            <code>{'else'}</code><br />
                                            <code>&nbsp;&nbsp;{'echo "Some files remain in source:"'}</code><br />
                                            <code>&nbsp;&nbsp;{'find messy_folder -type f'}</code><br />
                                            <code>{'fi'}</code><br /><br />
                                            <code>{'# Generate organization report'}</code><br />
                                            <code>{'tree organized_folder > organization_report.txt'}</code>
                                        </div>
                                    </div>

                                    <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                        <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-3">Create Documentation</h4>
                                        <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                            <code>{'#!/bin/bash'}</code><br />
                                            <code>{'# Generate README for the organized folder'}</code><br />
                                            <code>{'cat > organized_folder/README.txt << EOF'}</code><br />
                                            <code>{'ORGANIZED FOLDER STRUCTURE'}</code><br />
                                            <code>{'============================'}</code><br />
                                            <code>{'Date: $(date)'}</code><br />
                                            <code>{'Original: messy_folder/'}</code><br />
                                            <code>{'Organized: organized_folder/'}</code><br /><br />
                                            <code>{'Directory Structure:'}</code><br />
                                            <code>{'$(tree organized_folder -d)'}</code><br /><br />
                                            <code>{'File Counts by Type:'}</code><br />
                                            <code>{'$(find organized_folder -type f | sed \'s/.*\\.//\' | sort | uniq -c | sort -rn)'}</code><br />
                                            <code>{'EOF'}</code>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                            Good documentation helps others understand your organization system.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Common Pitfalls */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Common Pitfalls in File Organization</h2>

                        <div className="bg-gradient-to-br from-white to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                            <div className="space-y-6">
                                <div className="p-5 bg-gradient-to-r from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border-l-4 border-red-500">
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                                            <span className="text-red-600 dark:text-red-300 font-bold">✗</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Using <code>mv *</code> Without Testing</h3>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                Moving all files at once can overwrite existing files. Always test with 
                                                <code> echo</code> or <code>mv -i</code> first.
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
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Not Handling Spaces in Filenames</h3>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                <code>mv *.txt</code> breaks on <code>"my file.txt"</code>. Always quote variables: 
                                                <code> mv "$file"</code>.
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
                                            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-2">Forgetting Hidden Files</h3>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                <code>mv *</code> doesn't move dotfiles. Use <code>shopt -s dotglob</code> or 
                                                <code> mv .[!.]*</code> for hidden files.
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
                                                Always work on a copy first: 
                                                <code> cp -r messy_folder messy_folder_backup</code>. 
                                                Test scripts on the backup.
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
                                <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">The Art of Organization</h4>
                                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                                    I've seen students like <span className="font-semibold">Tuhina</span> spend days manually 
                                    organizing files, only to make mistakes. The key is <span className="font-semibold text-purple-600 dark:text-purple-400">systematic thinking</span>. 
                                    When <span className="font-semibold">Swadeep</span> showed me his 2000-file Downloads folder at Barrackpore University, 
                                    we wrote a 20-line script that organized it in seconds. The script still runs weekly!
                                </p>

                                <div className="space-y-3">
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mt-1">
                                            <span className="text-indigo-600 dark:text-indigo-300 font-bold">1</span>
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300">Always analyze before acting. Know what you have before deciding where it goes.</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mt-1">
                                            <span className="text-indigo-600 dark:text-indigo-300 font-bold">2</span>
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300">Test on copies, never on originals until you're 100% confident.</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mt-1">
                                            <span className="text-indigo-600 dark:text-indigo-300 font-bold">3</span>
                                        </span>
                                        <span className="text-gray-700 dark:text-gray-300">Document your process. What works today should work tomorrow.</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center gap-3 p-4 bg-gradient-to-r from-teal-50 to-emerald-50 dark:from-teal-900/30 dark:to-emerald-900/30 rounded-lg">
                                <svg className="w-6 h-6 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span className="text-gray-700 dark:text-gray-300">
                                    Pro tip: Create <code>organize.sh</code> in your <code>~/bin/</code> and alias it: 
                                    <code> alias organize='~/bin/organize.sh'</code>
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
                                    "Always analyze before organizing: find | wc -l, ls -la",
                                    "Use brace expansion for creating directory structures",
                                    "Test commands with echo before executing",
                                    "Handle spaces in filenames with quotes: \"$file\"",
                                    "Create backups before mass file operations",
                                    "Use case statements for different file types",
                                    "Document your organization structure"
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
                                    <span className="font-semibold">Abhronila</span> at Shyamnagar Lab uses this weekly cleanup script:
                                </p>
                                <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm">
                                    <code>{'#!/bin/bash'}</code><br />
                                    <code>{'# Weekly Downloads organizer'}</code><br />
                                    <code>{'BACKUP_DIR="$HOME/Downloads/backup_$(date +%Y%m%d)"'}</code><br />
                                    <code>{'mkdir -p "$BACKUP_DIR"'}</code><br />
                                    <code>{'cp -r "$HOME/Downloads/"* "$BACKUP_DIR/" 2>/dev/null'}</code><br />
                                    <code>{'~/bin/organize.sh "$HOME/Downloads" "$HOME/Downloads_organized"'}</code><br />
                                    <code>{'echo "Weekly cleanup complete. Backup at: $BACKUP_DIR"'}</code>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                                    Runs every Monday via cron, keeps 4 weeks of backups.
                                </p>
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
                                        What happens when you run these commands in sequence?
                                    </p>
                                    <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                        <code>{'mkdir test && cd test'}</code><br />
                                        <code>{'touch {a,b,c}.txt {1,2,3}.jpg'}</code><br />
                                        <code>{'mkdir txt jpg'}</code><br />
                                        <code>{'mv *.txt txt/'}</code><br />
                                        <code>{'mv *.jpg jpg/'}</code><br />
                                        <code>{'tree'}</code>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                        Now try with files containing spaces: <code>touch "my file.txt"</code>. What breaks and why?
                                    </p>
                                </div>

                                <div className="p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Try changing this...</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        How would you modify the organizer script to handle files modified in the last 7 days differently?
                                    </p>
                                    <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                        <code>{'# Hint: Use find with -mtime'}</code><br />
                                        <code>{'find "$SOURCE_DIR" -type f -mtime -7 -exec _____'}</code>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-3">
                                        <span className="font-semibold">Debangshu</span> uses this to keep recent files accessible 
                                        while archiving older ones.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl">
                                <p className="text-gray-700 dark:text-gray-300 text-center">
                                    Remember: The best organization system is one you'll actually use. 
                                    Keep it simple and automated!
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Professional Tips */}
                    <div className={`mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '800ms' }}>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">Professional Tips & Tricks</h2>

                        <div className="space-y-6">
                            <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-purple-200 dark:border-purple-800">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Cron Automation</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Schedule regular organization with cron.
                                </p>
                                <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                    <code>{'# Add to crontab -e'}</code><br />
                                    <code>{'# Weekly cleanup every Sunday at 2 AM'}</code><br />
                                    <code>{'0 2 * * 0 /home/user/bin/organize.sh /home/user/Downloads /home/user/Downloads_organized >> /home/user/organize.log 2>&1'}</code>
                                </div>
                            </div>

                            <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-blue-200 dark:border-blue-800">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Version Control for Scripts</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Keep your organizer scripts in Git for tracking changes.
                                </p>
                                <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                    <code>{'mkdir ~/scripts && cd ~/scripts'}</code><br />
                                    <code>{'git init'}</code><br />
                                    <code>{'cp ~/bin/organize.sh .'}</code><br />
                                    <code>{'git add organize.sh'}</code><br />
                                    <code>{'git commit -m "Initial organizer script"'}</code><br />
                                    <code>{'# Later, after improvements:'}</code><br />
                                    <code>{'git diff'}</code><br />
                                    <code>{'git commit -am "Added case-insensitive matching"'}</code>
                                </div>
                            </div>

                            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl border border-green-200 dark:border-green-800">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">Alias for Daily Use</h3>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Add these to your <code>~/.bashrc</code>:
                                </p>
                                <div className="bg-gray-900 text-gray-100 dark:bg-gray-900 dark:text-gray-300 p-4 rounded-lg font-mono text-sm">
                                    <code>{'# Quick organize current directory'}</code><br />
                                    <code>{'alias organize-here=\'~/bin/organize.sh . organized\''}</code><br /><br />
                                    <code>{'# Count files by type'}</code><br />
                                    <code>{'alias count-types=\'find . -type f -name "*.*" | sed "s/.*\\.//" | sort | uniq -c | sort -rn\''}</code><br /><br />
                                    <code>{'# Find duplicates by content'}</code><br />
                                    <code>{'alias find-dupes=\'find . -type f -exec md5sum {} \\; | sort | uniq -w32 -dD\''}</code>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '900ms' }}>
                        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                            <div className="text-center">
                                <div className="text-gray-600 dark:text-gray-400 mb-4">
                                    Topic 10: Practical Lab - Organize a Messy Folder into Structured Directories
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-500">
                                    Next: Common mistakes in file deletion and how to recover mindset
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

