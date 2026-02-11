// Topic45.jsx
import React from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// ----------------------------------------------------------------------
// Inline raw XONSH medium examples – 10 self‑contained scripts
// Each script demonstrates intermediate XONSH features.
// In a real project, these would be separate .xsh files imported via `?raw`.
// ----------------------------------------------------------------------
const example01Json = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 01: Read and write JSON files
# ----------------------------------------------------------------------
import json

# Sample student data (Tuhina's grades)
grades = {
    "Tuhina": [88, 92, 79],
    "Swadeep": [95, 91, 88],
    "Abhronila": [100, 98, 97]
}

# Write to JSON file
with open('grades.json', 'w') as f:
    json.dump(grades, f, indent=2)
echo "✅ grades.json written"

# Read back and compute average
with open('grades.json') as f:
    data = json.load(f)

for student, scores in data.items():
    avg = sum(scores) / len(scores)
    print(f"{student:10} average: {avg:.2f}")`;

const example02Subprocess = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 02: Advanced subprocess – capture stdout, stderr, and return code
# ----------------------------------------------------------------------
import subprocess

def run_cmd(cmd):
    """Run shell command, capture output and return code."""
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    return {
        'stdout': result.stdout.strip(),
        'stderr': result.stderr.strip(),
        'returncode': result.returncode
    }

# Try a successful command
res = run_cmd('ls -la')
echo "✅ ls success, stdout lines: @(len(res['stdout'].splitlines()))"

# Try a failing command
res = run_cmd('ls /nonexistent')
if res['returncode'] != 0:
    echo "❌ Command failed: @(res['stderr'])"

# Mix with xonsh $( ) – but here we have full Python control.`;

const example03Prompt = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 03: Customize the XONSH prompt (requires xonsh session)
# This script is meant to be sourced or run interactively.
# ----------------------------------------------------------------------
# Save current prompt
old_prompt = $PROMPT

# Create a dynamic prompt with git branch, time, and custom colors
$PROMPT = '{hostname} {user} {cwd} {git_branch} {time} > '

# You can also define a function to set prompt conditionally
def git_branch():
    branch = $(git branch --show-current 2>/dev/null).strip()
    return f"[{branch}]" if branch else ""

# To test in current session, source this file:
# source example03.xsh
echo "Prompt updated. Try it in interactive mode."`;

const example04Aliases = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 04: Programmatically manage aliases
# ----------------------------------------------------------------------
# Add an alias that uses Python
aliases['weather'] = 'curl wttr.in/Barrackpore?format=3'

# Add an alias as a Python function
def ssh_ichapur(args):
    """Quick ssh to Ichapur server"""
    host = args[0] if args else 'lab.ichapur.edu'
    cmd = f'ssh {host}'
    return $(@(cmd))

aliases['ssh-ich'] = ssh_ichapur

echo "Aliases added:"
echo @(aliases.keys())

# Usage (in interactive mode):
# $ weather
# $ ssh-ich swadeep@server`;  // Note: backtick escaped in raw string

const example05DotEnv = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 05: Load environment variables from .env file
# ----------------------------------------------------------------------
import os
from pathlib import Path

def load_dotenv(dotenv_path='.env'):
    """Load .env file into environment variables."""
    if not Path(dotenv_path).exists():
        echo "⚠️ .env file not found"
        return
    with open(dotenv_path) as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#'):
                continue
            key, val = line.split('=', 1)
            os.environ[key] = val
            # Also set in xonsh environment
            __xonsh__.env[key] = val
    echo "✅ Environment variables loaded"

load_dotenv()
echo "DATABASE_URL = @(__xonsh__.env.get('DATABASE_URL', 'not set'))"`;

const example06ExitStatus = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 06: Capture and use exit status of commands
# ----------------------------------------------------------------------
# In XONSH, $? is a special variable representing last command status
echo "Testing exit status:"
ls / > /dev/null
echo "ls / → $?"  # Should be 0

ls /nonexistent 2>/dev/null
echo "ls /nonexistent → $?"  # Should be non-zero

# You can also use Python's subprocess for more control
import subprocess
proc = subprocess.run(['ls', '/nonexistent'], capture_output=True)
print(f"subprocess exit code: {proc.returncode}")

# Conditional execution
if $(which python3 2>/dev/null):
    echo "🐍 Python3 is installed"
else:
    echo "❌ Python3 not found"`;

const example07Parallel = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 07: Process files in parallel (using Python's concurrent.futures)
# ----------------------------------------------------------------------
import glob
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

def count_lines(filename):
    """Count lines in a single file."""
    with open(filename, 'r', errors='ignore') as f:
        return filename, sum(1 for _ in f)

# Find all .log files recursively
log_files = glob.glob('**/*.log', recursive=True)

if not log_files:
    echo "No log files found, using .sh files for demo"
    log_files = glob.glob('**/*.sh', recursive=True)[:5]

echo "Processing @(len(log_files)) files in parallel..."

with ThreadPoolExecutor(max_workers=4) as executor:
    results = executor.map(count_lines, log_files)

for fname, lines in results:
    print(f"{fname:30} {lines:6} lines")`;

const example08ConfigParser = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 08: Parse INI configuration files (common in school labs)
# ----------------------------------------------------------------------
import configparser

# Create a sample config
config = configparser.ConfigParser()
config['NETWORK'] = {
    'host': 'lab.ichapur.edu',
    'port': '22',
    'timeout': '30'
}
config['BACKUP'] = {
    'source': '/home/students',
    'destination': '/mnt/backup',
    'schedule': 'daily'
}

with open('lab_config.ini', 'w') as f:
    config.write(f)
echo "✅ lab_config.ini written"

# Read it back
config.read('lab_config.ini')
host = config['NETWORK']['host']
port = config['NETWORK'].getint('port')
timeout = config['NETWORK'].getint('timeout')
echo f"Backup will connect to {host}:{port} (timeout={timeout}s)"`;

const example09Requests = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 09: Fetch data from a REST API using requests
# ----------------------------------------------------------------------
import requests

# Fetch weather for Naihati (free API)
try:
    response = requests.get('https://wttr.in/Naihati?format=%t+%w+%c')
    if response.status_code == 200:
        weather = response.text.strip()
        echo "🌤️ Naihati weather: @(weather)"
    else:
        echo "⚠️ API error: @(response.status_code)"
except Exception as e:
    echo "❌ Failed to fetch weather: @(e)"

# Fetch random joke
try:
    joke = requests.get('https://official-joke-api.appspot.com/random_joke').json()
    echo f"😂 {joke['setup']} – {joke['punchline']}"
except:
    echo "No joke today"`;

const example10InteractiveMenu = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 10: Simple interactive menu (Python inside XONSH)
# ----------------------------------------------------------------------
import sys

def show_menu():
    print("\n=== Student Lab Menu ===")
    print("1. Show current directory")
    print("2. List Python files")
    print("3. Check disk usage")
    print("4. Exit")
    choice = input("Choose (1-4): ")
    return choice

while True:
    choice = show_menu()
    if choice == '1':
        $(pwd)
    elif choice == '2':
        $(ls -la *.py)
    elif choice == '3':
        $(df -h .)
    elif choice == '4':
        echo "Goodbye!"
        break
    else:
        echo "Invalid choice, try again."`;

// ----------------------------------------------------------------------
// Teacher's experience calculation (from 1998)
// ----------------------------------------------------------------------
const currentYear = new Date().getFullYear();
const teachingYears = currentYear - 1998;

// ----------------------------------------------------------------------
// Inline keyframes for zero‑config Tailwind animations
// ----------------------------------------------------------------------
const animationStyles = `
  @keyframes fadeSlideUp {
    0% { opacity: 0; transform: translateY(12px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes gentlePulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.75; }
  }
  .animate-fadeSlideUp {
    animation: fadeSlideUp 0.6s cubic-bezier(0.2, 0.9, 0.3, 1) forwards;
  }
  .animate-gentlePulse {
    animation: gentlePulse 3s ease-in-out infinite;
  }
`;

// ----------------------------------------------------------------------
// Main component
// ----------------------------------------------------------------------
const Topic45 = () => {
  return (
    <>
      <style>{animationStyles}</style>

      <div
        className={clsx(
          "max-w-7xl mx-auto px-4 py-8 md:px-6 lg:px-8",
          "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100",
          "transition-colors duration-300"
        )}
      >
        {/* ----- HEADER (staggered) ----- */}
        <div className="space-y-3 mb-10 animate-fadeSlideUp [animation-delay:0ms]">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-mono bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full border border-indigo-200 dark:border-indigo-700">
              Topic 45
            </span>
            <span className="px-3 py-1 text-xs font-mono bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full border border-amber-200 dark:border-amber-700">
              XONSH Medium Examples
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            XONSH:{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              10 Intermediate‑Level Scripts
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            You know the basics. Now it's time to integrate XONSH into real‑world
            workflows: configuration files, API calls, parallel processing, and
            interactive tools. These ten examples mirror tasks from the labs at
            <strong> Barrackpore</strong> and <strong>Shyamnagar</strong>.
          </p>
        </div>

        {/* ----- CONCEPTUAL ILLUSTRATION (staggered) ----- */}
        <section
          className={clsx(
            "mb-12 p-6 rounded-xl",
            "bg-gray-50 dark:bg-gray-800/50",
            "border border-gray-200 dark:border-gray-700",
            "animate-fadeSlideUp [animation-delay:100ms]"
          )}
        >
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-3xl">⚙️</span> Where XONSH outshines pure Bash
          </h2>

          <div className="grid md:grid-cols-1 gap-8">
            <div className="space-y-4">
              <p className="leading-relaxed">
                Pure Bash struggles with structured data (JSON, YAML, INI) and
                parallel execution. XONSH brings Python's entire standard library
                and ecosystem to your terminal. <strong>Abhronila</strong> uses
                Example 07 to process thousands of log files in seconds.
                <strong> Debangshu</strong> built a lab inventory system with
                Example 08 + 09.
              </p>
              <p className="leading-relaxed">
                The ten scripts on the right are production‑ready snippets you
                can adapt immediately. Pay special attention to the subprocess
                and parallel patterns – they save hours.
              </p>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded border-l-4 border-indigo-400">
                <span className="font-semibold">🧠 Think like a pro</span>
                <p className="text-sm mt-1">
                  XONSH is not just "Bash with Python". It's a hybrid where you
                  choose the best tool for each line. Use shell for simple
                  pipelines, Python for logic. Know when to drop into{' '}
                  <code>subprocess</code> for full control.
                </p>
              </div>
            </div>

            {/* SVG illustrating XONSH as a bridge */}
            <div className="flex items-center justify-center p-2 group">
              <svg
                width="280"
                height="160"
                viewBox="0 0 280 160"
                className="w-full max-w-xs"
                aria-label="XONSH intermediate capabilities"
              >
                <rect
                  x="10"
                  y="30"
                  width="80"
                  height="60"
                  rx="8"
                  fill="#374151"
                  className="dark:fill-gray-700 group-hover:fill-indigo-800/50 transition-all"
                />
                <text x="22" y="60" fill="#E5E7EB" fontSize="10">
                  JSON / API
                </text>

                <rect
                  x="190"
                  y="30"
                  width="80"
                  height="60"
                  rx="8"
                  fill="#374151"
                  className="dark:fill-gray-700 group-hover:fill-amber-800/50 transition-all"
                />
                <text x="202" y="60" fill="#E5E7EB" fontSize="10">
                  Parallel
                </text>

                <path
                  d="M100 60 L180 60"
                  stroke="#6B7280"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                >
                  <animate
                    attributeName="d"
                    values="M100 60 L180 60; M90 60 L190 60; M100 60 L180 60"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </path>

                <rect
                  x="90"
                  y="100"
                  width="100"
                  height="30"
                  rx="8"
                  fill="#4F46E5"
                  className="dark:fill-indigo-600 group-hover:fill-indigo-500 transition-all"
                />
                <text x="125" y="122" fill="white" fontSize="12" fontWeight="bold">
                  XONSH
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* ----- 10 MEDIUM EXAMPLES (2x5 grid) ----- */}
        <section className="space-y-8 mb-12">
          <h2 className="text-2xl font-semibold mb-2 animate-fadeSlideUp [animation-delay:200ms]">
            🧪 Real‑world XONSH patterns
          </h2>

          {/* Row 1: Examples 1-2 */}
          <div className="grid md:grid-cols-1 gap-6 animate-fadeSlideUp [animation-delay:250ms]">
            <ShellFileLoader
              fileModule={example01Json}
              title="01. JSON processing"
              highlightLines={[12, 17]}
            />
            <ShellFileLoader
              fileModule={example02Subprocess}
              title="02. Subprocess with capture"
              highlightLines={[5, 16]}
            />
          </div>
          {/* Row 2: Examples 3-4 */}
          <div className="grid md:grid-cols-1 gap-6 animate-fadeSlideUp [animation-delay:300ms]">
            <ShellFileLoader
              fileModule={example03Prompt}
              title="03. Custom prompt"
              highlightLines={[8, 14]}
            />
            <ShellFileLoader
              fileModule={example04Aliases}
              title="04. Dynamic aliases"
              highlightLines={[6, 14]}
            />
          </div>
          {/* Row 3: Examples 5-6 */}
          <div className="grid md:grid-cols-1 gap-6 animate-fadeSlideUp [animation-delay:350ms]">
            <ShellFileLoader
              fileModule={example05DotEnv}
              title="05. Load .env file"
              highlightLines={[7, 19]}
            />
            <ShellFileLoader
              fileModule={example06ExitStatus}
              title="06. Exit status"
              highlightLines={[4, 12]}
            />
          </div>
          {/* Row 4: Examples 7-8 */}
          <div className="grid md:grid-cols-1 gap-6 animate-fadeSlideUp [animation-delay:400ms]">
            <ShellFileLoader
              fileModule={example07Parallel}
              title="07. Parallel processing"
              highlightLines={[9, 19]}
            />
            <ShellFileLoader
              fileModule={example08ConfigParser}
              title="08. INI config parser"
              highlightLines={[8, 20]}
            />
          </div>
          {/* Row 5: Examples 9-10 */}
          <div className="grid md:grid-cols-1 gap-6 animate-fadeSlideUp [animation-delay:450ms]">
            <ShellFileLoader
              fileModule={example09Requests}
              title="09. REST API call"
              highlightLines={[5, 14]}
            />
            <ShellFileLoader
              fileModule={example10InteractiveMenu}
              title="10. Interactive menu"
              highlightLines={[10, 25]}
            />
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400 italic">
            💡 Most examples require additional Python packages (requests,
            configparser is built‑in). Install them with{' '}
            <code>pip install --user requests</code> if needed.
          </div>
        </section>

        {/* ----- TIPS, PITFALLS, BEST PRACTICES (cards) ----- */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div
            className={clsx(
              "p-5 rounded-xl border",
              "bg-white dark:bg-gray-800",
              "border-gray-200 dark:border-gray-700",
              "hover:shadow-lg hover:scale-[1.02] transition-all duration-300",
              "animate-fadeSlideUp [animation-delay:500ms]"
            )}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">💡</span>
              <h3 className="font-semibold text-lg">Pro Tips</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span>
                  Use <code>__xonsh__.env</code> to access and modify environment
                  variables from Python.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span>
                  Prefer <code>subprocess.run()</code> with <code>capture_output</code>
                  when you need both stdout and stderr.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span>
                  For long‑running XONSH sessions, store configuration in{' '}
                  <code>~/.xonshrc</code> – same syntax as scripts.
                </span>
              </li>
            </ul>
          </div>

          <div
            className={clsx(
              "p-5 rounded-xl border",
              "bg-white dark:bg-gray-800",
              "border-gray-200 dark:border-gray-700",
              "hover:shadow-lg hover:scale-[1.02] transition-all duration-300",
              "animate-fadeSlideUp [animation-delay:600ms]"
            )}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">⚠️</span>
              <h3 className="font-semibold text-lg">Common Pitfalls</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-rose-500">•</span>
                <span>
                  <strong>Missing imports</strong> – Python modules must be
                  installed in the same environment where XONSH runs.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500">•</span>
                <span>
                  <strong>Subprocess vs $()</strong> – <code>$(cmd)</code> blocks
                  and returns string; <code>subprocess</code> gives more control.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500">•</span>
                <span>
                  <strong>Alias functions</strong> receive arguments as list;
                  don't forget to handle <code>args[0]</code> safely.
                </span>
              </li>
            </ul>
          </div>

          <div
            className={clsx(
              "p-5 rounded-xl border",
              "bg-white dark:bg-gray-800",
              "border-gray-200 dark:border-gray-700",
              "hover:shadow-lg hover:scale-[1.02] transition-all duration-300",
              "animate-fadeSlideUp [animation-delay:700ms]"
            )}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">✅</span>
              <h3 className="font-semibold text-lg">Best Practices</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>
                  Always check <code>returncode</code> when calling external
                  commands – don't assume success.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>
                  Use <code>pathlib</code> for file paths; it's cross‑platform and
                  readable.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>
                  Keep interactive features (prompt, aliases) in your xonshrc;
                  keep batch jobs in standalone <code>.xsh</code> files.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* ----- MINI CHECKLIST ----- */}
        <section
          className={clsx(
            "mb-12 p-6 rounded-xl",
            "bg-indigo-50 dark:bg-indigo-900/20",
            "border border-indigo-200 dark:border-indigo-800",
            "animate-fadeSlideUp [animation-delay:800ms]"
          )}
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">📋</span> Mini Checklist – Intermediate XONSH
          </h3>
          <div className="grid sm:grid-cols-1 gap-3">
            {[
              "I can read/write JSON files and manipulate data.",
              "I can capture stdout/stderr and exit codes from external commands.",
              "I have customized my XONSH prompt with git branch.",
              "I have added a Python‑function alias.",
              "I can load environment variables from a .env file.",
              "I can process multiple files in parallel using threads.",
              "I can parse an INI configuration file.",
              "I have made an HTTP request from a shell script.",
              "I can build a simple interactive menu.",
              "I know when to use subprocess vs $( ) vs Python functions."
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm">
                <span className="text-indigo-500 dark:text-indigo-300 mt-0.5">
                  ◻️
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ----- TEACHER'S NOTE ----- */}
        <section
          className={clsx(
            "mb-10 p-6 rounded-xl",
            "bg-amber-50 dark:bg-amber-900/20",
            "border border-amber-200 dark:border-amber-800",
            "hover:shadow-md hover:bg-amber-100/50 dark:hover:bg-amber-900/30",
            "transition-all duration-300",
            "animate-fadeSlideUp [animation-delay:900ms]"
          )}
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">🧑‍🏫</div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Teacher's Note</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                <strong>Sukanta Hui</strong> • {teachingYears} years of programming
                & systems education (since 1998)
                <br />
                <span className="font-mono text-xs">
                  sukantahui@codernaccotax.co.in • 📱 7003756860
                </span>
              </p>
              <p className="leading-relaxed">
                In the <strong>Ichapur</strong> lab, students often ask, “Why not
                just write a Python script?” The answer: because XONSH gives you
                the shell's interactive feel and seamless command execution while
                keeping Python's expressive power. Example 07 (parallel log
                processing) is a favourite – we run it on the lab server and watch
                CPU usage spike (safely). Remind students that with great power
                comes responsibility: an accidental <code>subprocess.run('rm -rf', shell=True)</code>{' '}
                is still dangerous. Always sanitise input!
              </p>
            </div>
          </div>
        </section>

        {/* ----- HINT SECTION ----- */}
        <div
          className={clsx(
            "text-sm p-5 rounded-lg",
            "bg-gray-100 dark:bg-gray-800/60",
            "border border-gray-300 dark:border-gray-600",
            "animate-fadeSlideUp [animation-delay:1000ms]"
          )}
        >
          <span className="font-semibold block mb-1">🔍 Observe carefully…</span>
          <p>
            In Example 04, the alias function <code>ssh_ichapur</code> receives
            arguments as a list. Try modifying it to accept flags like{' '}
            <code>-p 2222</code>. How would you pass those to the ssh command?
          </p>
          <p className="mt-2">
            In Example 07, we used <code>ThreadPoolExecutor</code>. What would you
            change to limit the number of concurrent processes instead of threads?
          </p>
        </div>

        {/* ----- FOOTER ----- */}
        <div className="mt-12 pt-6 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 text-center">
          <p>
            Next: <strong>Topic 46 – XONSH Expert Examples (10 examples)</strong>:
            macros, custom transformers, and embedding XONSH.
          </p>
        </div>
      </div>
    </>
  );
};

export default Topic45;