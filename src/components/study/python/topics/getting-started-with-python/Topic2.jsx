import React, { Component } from "react";
import EditablePythonCodeBlock from "../../../../../common/EditablePythonCodeBlock";

export default class Topic2 extends Component {
  render() {
    return (
      <div className="space-y-8">

        {/* ========================= HEADER ========================= */}
        <header className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold text-sky-300">
            Python Installation on Windows, macOS & Linux
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Learn how to install Python properly on your system and configure the
            environment for smooth development.
          </p>
        </header>

        {/* ========================= SECTION 1 ========================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-300">
            1. Installing Python on Windows
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Windows users can download Python from the official 
            <strong> python.org </strong> website.
            The installer includes IDLE, pip, documentation, and standard libraries.
          </p>

          <ul className="text-slate-400 text-sm list-disc pl-5 space-y-1">
            <li>Visit <strong>python.org/downloads</strong></li>
            <li>Download latest stable version (recommended: Python 3.12+)</li>
            <li>Check the box <strong>"Add Python to PATH"</strong></li>
            <li>Click <strong>Install Now</strong></li>
          </ul>

          <p className="text-slate-400 text-sm mt-2">
            After installation, verify Python:
          </p>

          <EditablePythonCodeBlock
            initialCode={`# Check Python version
python --version

# Or
python3 --version`}
          />
        </section>

        {/* ========================= SECTION 2 ========================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-300">
            2. Installing Python on macOS
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            macOS systems ship with an older Python version.  
            Install the latest version manually or using Homebrew.
          </p>

          <h3 className="text-slate-200 font-semibold">Option A: Using official installer</h3>
          <ul className="text-slate-400 text-sm list-disc pl-5 space-y-1">
            <li>Go to python.org/downloads/mac-osx</li>
            <li>Download macOS 64-bit installer</li>
            <li>Run `.pkg` file → Install Python</li>
          </ul>

          <h3 className="text-slate-200 font-semibold mt-3">Option B: Using Homebrew</h3>
          <EditablePythonCodeBlock
            initialCode={`# Install using Homebrew
brew install python3

# Verify
python3 --version`}
          />
        </section>

        {/* ========================= SECTION 3 ========================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-300">
            3. Installing Python on Linux
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            Most Linux distributions come with Python preinstalled.  
            Still, you can install or update using package managers.
          </p>

          <h3 className="text-slate-200 font-semibold">Ubuntu / Debian</h3>
          <EditablePythonCodeBlock
            initialCode={`sudo apt update
sudo apt install python3 python3-pip

python3 --version`}
          />

          <h3 className="text-slate-200 font-semibold mt-3">Fedora</h3>
          <EditablePythonCodeBlock
            initialCode={`sudo dnf install python3

python3 --version`}
          />

          <h3 className="text-slate-200 font-semibold mt-3">Arch Linux</h3>
          <EditablePythonCodeBlock
            initialCode={`sudo pacman -S python

python --version`}
          />
        </section>

        {/* ========================= ENVIRONMENT VARIABLES ========================= */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-sky-300">
            4. Setting Up Environment Variables (PATH)
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            PATH allows you to run Python from any folder in your terminal.
            Windows users must ensure the <strong>Add to PATH</strong> option is checked.
          </p>

          <p className="text-slate-400 text-sm">
            To test PATH:
          </p>

          <EditablePythonCodeBlock
            initialCode={`python --version
# or
python3 --version`}
          />
        </section>

        {/* ========================= TEACHER'S TIPS ========================= */}
        <section className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl">
          <h2 className="text-lg font-bold text-purple-300">Teacher’s Tips</h2>
          <ul className="text-slate-300 text-sm list-disc pl-5 mt-2 space-y-1">
            <li>Python 3.x is mandatory. Never install Python 2.x for learning.</li>
            <li>Always verify installation using <strong>python --version</strong>.</li>
            <li>Install VS Code or PyCharm immediately after Python for easier development.</li>
            <li>If PATH errors occur, reinstall Python and enable “Add Python to PATH”.</li>
          </ul>
        </section>

        {/* ========================= REMEMBER POINTS ========================= */}
        <section className="p-5 bg-slate-900/50 border border-slate-800 rounded-2xl">
          <h2 className="text-lg font-bold text-emerald-300">
            Points to Remember
          </h2>

          <ul className="text-slate-300 text-sm list-disc pl-5 mt-2 space-y-1">
            <li>Python installation includes pip (package manager).</li>
            <li>macOS/Linux may require <strong>python3</strong> instead of <strong>python</strong>.</li>
            <li>Windows users must ensure PATH is set during installation.</li>
            <li>You can install multiple Python versions side-by-side.</li>
          </ul>
        </section>
      </div>
    );
  }
}
