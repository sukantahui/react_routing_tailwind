// Topic44.jsx
import React from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// ----------------------------------------------------------------------
// Inline raw XONSH basic examples – 10 self‑contained scripts
// Each script demonstrates a fundamental XONSH feature.
// In a real project, these would be separate .xsh files imported via `?raw`.
// ----------------------------------------------------------------------
const example01Hello = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 01: Hello, XONSH – mixing echo and Python print
# ----------------------------------------------------------------------
echo "Welcome to XONSH, the Python-powered shell!"

# Pure Python
print("This line comes from Python's print()")

# Shell command inside Python string
print(f"Current directory: {$(pwd).strip()}")`;

const example02Arithmetic = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 02: Python arithmetic in the shell
# ----------------------------------------------------------------------
# No need for expr or $(( )), just Python expressions
a = 15
b = 7
result = a * b + 42
echo "Result of 15 * 7 + 42 = @(result)"

# Works with floating point too
pi = 3.14159
radius = 5.3
area = pi * radius ** 2
print(f"Circle area: {area:.2f}")`;

const example03CommandSubstitution = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 03: Capturing shell command output into Python variables
# ----------------------------------------------------------------------
# $(command) returns the stdout as a string (stripped by default)
files_list = $(ls -la)
print(f"Number of lines in 'ls -la': {len(files_list.splitlines())}")

# Get the first 3 lines
first_three = $(ls -la | head -3)
print("First three lines:")
print(first_three)

# Use the output in a Python loop
for line in files_list.splitlines()[:3]:
    print(f"  {line}")`;

const example04EnvPath = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 04: $PATH is a Python list – manipulate it easily
# ----------------------------------------------------------------------
echo "Original PATH entries: @(len($PATH))"

# Add a directory (persists only for this session)
$PATH.append('/home/tuhina/my_scripts')
echo "Now PATH has @(len($PATH)) entries"

# Check if a directory is in PATH
if '/usr/local/bin' in $PATH:
    print("✓ /usr/local/bin is in PATH")

# Remove an entry (if you must)
$PATH.remove('/home/tuhina/my_scripts')`;

const example05ListComprehension = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 05: Python list comprehension inside a shell script
# ----------------------------------------------------------------------
# Imagine Swadeep wants to find all .txt files larger than 1KB
from pathlib import Path

txt_files = list(Path('.').glob('*.txt'))
large_files = [f for f in txt_files if f.stat().st_size > 1024]
print(f"Found {len(large_files)} .txt files larger than 1KB")
for f in large_files:
    print(f"  {f.name}")`;

const example06OsInteraction = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 06: Using Python's os module alongside shell commands
# ----------------------------------------------------------------------
import os

# Python way
cwd_py = os.getcwd()
echo "Python says current directory is @(cwd_py)"

# Shell way
cwd_sh = $(pwd).strip()
echo "Shell says current directory is @(cwd_sh)"

# Get username
user = os.environ.get('USER', 'unknown')
print(f"Hello, {user}!")

# List directory contents with both methods
print("Python glob:")
for f in os.listdir('.'):
    print(f"  {f}")

echo "Shell glob:"
ls -la | head -5`;

const example07IfElse = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 07: Python if-else (no test, [ ], or [[ ]] needed)
# ----------------------------------------------------------------------
import random

# Abhronila's lottery number
ticket = random.randint(1, 100)
echo "Your ticket number is @(ticket)"

if ticket > 70:
    print("🎉 You win a prize!")
elif ticket > 30:
    print("😐 Better luck next time")
else:
    print("❌ No prize")

# File existence check – pure Python
from pathlib import Path
config = Path('/etc/hosts')
if config.exists():
    print(f"✓ {config} exists")`;

const example08ForLoop = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 08: For loop over files (Python style)
# ----------------------------------------------------------------------
# Debangshu needs to check permissions of all .sh files
from pathlib import Path

for script in Path('.').glob('*.sh'):
    size = script.stat().st_size
    perm = oct(script.stat().st_mode)[-3:]
    print(f"{script.name:20} {size:8} bytes  perm: {perm}")

# Traditional shell loop is also available
echo "--- shell loop ---"
for f in *.sh:
    ls -l @(f)`;

const example09Function = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 09: Defining and using functions (Python syntax)
# ----------------------------------------------------------------------
def greet(name, greeting="Hello"):
    """Return a personalized greeting."""
    return f"{greeting}, {name}!"

# Call the function
msg = greet("Tuhina", "Namaste")
echo @(msg)

# Function can also run shell commands
def count_lines(filename):
    result = $(wc -l @(filename))
    return int(result.split()[0])

total = count_lines("/etc/passwd")
print(f"/etc/passwd has {total} lines")`;

const example10Regex = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 10: Using Python regex to extract patterns
# ----------------------------------------------------------------------
import re

# Sample log line (from Naihati server)
log_line = "192.168.1.45 - - [12/Feb/2026:10:15:32] GET /index.html 200 4523"

# Extract IP and HTTP status
ip = re.search(r'^[\\d.]+', log_line).group()
status = re.search(r'\\s(\\d{3})\\s', log_line).group(1)

print(f"IP: {ip}, Status: {status}")

# Process multiple files
import glob
for fname in glob.glob('/var/log/*.log'):
    content = $(cat @(fname))
    errors = re.findall(r'ERROR|Failed', content)
    if errors:
        print(f"{fname}: {len(errors)} errors")`;

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
const Topic44 = () => {
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
              Topic 44
            </span>
            <span className="px-3 py-1 text-xs font-mono bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full border border-amber-200 dark:border-amber-700">
              XONSH Basic Examples
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            XONSH in Action:{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              10 Fundamental Examples
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            Now that XONSH is installed, let's write some real scripts. These ten
            examples cover the most common patterns: mixing Python and shell,
            list comprehensions, environment tweaks, and more. Each example is
            self‑contained and ready to run.
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
            <span className="text-3xl">🧩</span> What makes XONSH different?
          </h2>

          <div className="grid md:grid-cols-1 gap-8">
            <div className="space-y-4">
              <p className="leading-relaxed">
                Traditional shell scripting forces you to spawn external commands
                (awk, sed, cut) for text processing. With XONSH, you bring the
                full power of Python into your command line.{" "}
                <strong>Tuhina</strong> can now write loops and conditions using
                the same language she uses for data analysis.
              </p>
              <p className="leading-relaxed">
                The ten examples on the right demonstrate the most frequent
                operations: arithmetic, environment, file iteration, and regular
                expressions – all without leaving the shell.
              </p>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded border-l-4 border-indigo-400">
                <span className="font-semibold">⚡ Pro insight</span>
                <p className="text-sm mt-1">
                  XONSH parses each line <em>both</em> as shell and Python. If a
                  line is valid Python, it runs as Python; otherwise it's passed
                  to the shell. This hybrid parsing is why you can freely mix
                  <code>echo</code> and <code>print()</code>.
                </p>
              </div>
            </div>

            {/* SVG illustrating Python + Shell = XONSH */}
            <div className="flex items-center justify-center p-2 group">
              <svg
                width="280"
                height="160"
                viewBox="0 0 280 160"
                className="w-full max-w-xs"
                aria-label="XONSH hybrid parsing"
              >
                {/* Python side */}
                <rect
                  x="10"
                  y="30"
                  width="80"
                  height="60"
                  rx="8"
                  fill="#374151"
                  className="dark:fill-gray-700 group-hover:fill-indigo-800/50 transition-all duration-300"
                />
                <text x="22" y="60" fill="#E5E7EB" fontSize="12">
                  print("Hi")
                </text>
                <text x="22" y="80" fill="#E5E7EB" fontSize="12">
                  [x**2 for x]
                </text>

                {/* Shell side */}
                <rect
                  x="190"
                  y="30"
                  width="80"
                  height="60"
                  rx="8"
                  fill="#374151"
                  className="dark:fill-gray-700 group-hover:fill-amber-800/50 transition-all duration-300"
                />
                <text x="202" y="60" fill="#E5E7EB" fontSize="12">
                  ls -la
                </text>
                <text x="202" y="80" fill="#E5E7EB" fontSize="12">
                  echo $PATH
                </text>

                {/* XONSH magic: both work */}
                <text
                  x="130"
                  y="60"
                  fontSize="28"
                  fill="#818CF8"
                  className="dark:fill-indigo-400 animate-gentlePulse"
                >
                  ⇄
                </text>

                {/* Result box */}
                <rect
                  x="90"
                  y="110"
                  width="100"
                  height="30"
                  rx="8"
                  fill="#4F46E5"
                  className="dark:fill-indigo-600 group-hover:fill-indigo-500 transition-all"
                />
                <text x="125" y="132" fill="white" fontSize="12" fontWeight="bold">
                  XONSH
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* ----- 10 BASIC EXAMPLES (5+5 grid) ----- */}
        <section className="space-y-8 mb-12">
          <h2 className="text-2xl font-semibold mb-2 animate-fadeSlideUp [animation-delay:200ms]">
            📘 Example scripts – run each with <code>xonsh example.xsh</code>
          </h2>

          {/* Row 1: Examples 1‑5 */}
          <div
            className={clsx(
              "grid md:grid-cols-1 gap-6",
              "animate-fadeSlideUp [animation-delay:300ms]"
            )}
          >
            <ShellFileLoader
              fileModule={example01Hello}
              title="01. Hello XONSH"
              highlightLines={[6, 9]}
            />
            <ShellFileLoader
              fileModule={example02Arithmetic}
              title="02. Python arithmetic"
              highlightLines={[5, 11]}
            />
          </div>
          <div
            className={clsx(
              "grid md:grid-cols-1 gap-6",
              "animate-fadeSlideUp [animation-delay:350ms]"
            )}
          >
            <ShellFileLoader
              fileModule={example03CommandSubstitution}
              title="03. Command substitution $()"
              highlightLines={[4, 12]}
            />
            <ShellFileLoader
              fileModule={example04EnvPath}
              title="04. $PATH as Python list"
              highlightLines={[4, 8]}
            />
          </div>
          <div
            className={clsx(
              "grid md:grid-cols-1 gap-6",
              "animate-fadeSlideUp [animation-delay:400ms]"
            )}
          >
            <ShellFileLoader
              fileModule={example05ListComprehension}
              title="05. List comprehension"
              highlightLines={[6, 9]}
            />
            <ShellFileLoader
              fileModule={example06OsInteraction}
              title="06. Python os + shell"
              highlightLines={[6, 15]}
            />
          </div>

          {/* Row 2: Examples 7‑10 */}
          <div
            className={clsx(
              "grid md:grid-cols-1 gap-6",
              "animate-fadeSlideUp [animation-delay:450ms]"
            )}
          >
            <ShellFileLoader
              fileModule={example07IfElse}
              title="07. Python if‑else"
              highlightLines={[7, 12]}
            />
            <ShellFileLoader
              fileModule={example08ForLoop}
              title="08. For loop over files"
              highlightLines={[5, 12]}
            />
          </div>
          <div
            className={clsx(
              "grid md:grid-cols-1 gap-6",
              "animate-fadeSlideUp [animation-delay:500ms]"
            )}
          >
            <ShellFileLoader
              fileModule={example09Function}
              title="09. Functions"
              highlightLines={[4, 14]}
            />
            <ShellFileLoader
              fileModule={example10Regex}
              title="10. Regex pattern matching"
              highlightLines={[7, 14]}
            />
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400 italic">
            💡 All examples assume XONSH is installed (Topic 43) and available in
            <code className="mx-1">$PATH</code>. Save each as <code>.xsh</code> and
            run with <code>xonsh filename.xsh</code>.
          </div>
        </section>

        {/* ----- TIPS, PITFALLS, BEST PRACTICES (cards) ----- */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Tips card */}
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
              <span className="text-2xl">💡</span>
              <h3 className="font-semibold text-lg">Pro Tips</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span>
                  Use <code>@(expr)</code> to interpolate Python expressions inside
                  shell commands: <code>ls -l @(myfile)</code>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span>
                  <code>$(cmd)</code> returns stdout as a string – strip newlines
                  with <code>.strip()</code>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span>
                  For performance, prefer Python loops over shell loops when
                  processing many files.
                </span>
              </li>
            </ul>
          </div>

          {/* Common pitfalls card */}
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
              <span className="text-2xl">⚠️</span>
              <h3 className="font-semibold text-lg">Common Pitfalls</h3>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-rose-500">•</span>
                <span>
                  <strong>Forgetting @() in shell commands</strong> – if you write
                  <code>ls $myvar</code>, XONSH tries to expand <code>$myvar</code>
                  as an environment variable. Use <code>@(myvar)</code> for Python
                  variables.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500">•</span>
                <span>
                  <strong>Subshell confusion</strong> – <code>$(cmd)</code> is not
                  the same as <code>$var</code>. The former captures output, the
                  latter reads an environment variable.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500">•</span>
                <span>
                  <strong>Indentation errors</strong> – XONSH uses Python's
                  indentation rules. Mixing tabs and spaces will break your script.
                </span>
              </li>
            </ul>
          </div>

          {/* Best practices card */}
          <div
            className={clsx(
              "p-5 rounded-xl border",
              "bg-white dark:bg-gray-800",
              "border-gray-200 dark:border-gray-700",
              "hover:shadow-lg hover:scale-[1.02] transition-all duration-300",
              "animate-fadeSlideUp [animation-delay:800ms]"
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
                  Start every script with <code>#!/usr/bin/env xonsh</code>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>
                  Keep Python code and shell commands visually separated with
                  comments.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>
                  Use <code>from pathlib import Path</code> for file operations –
                  it's more readable than <code>os.path</code>.
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
            "animate-fadeSlideUp [animation-delay:900ms]"
          )}
        >
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="text-2xl">📋</span> Mini Checklist – Basic XONSH
            Proficiency
          </h3>
          <div className="grid sm:grid-cols-1 gap-3">
            {[
              "I can run Python expressions directly in the terminal.",
              "I know the difference between $(cmd) and @(var).",
              "I can add and remove directories from $PATH as a Python list.",
              "I can use a list comprehension to filter files.",
              "I have defined and called a Python function inside a .xsh script.",
              "I have used a regular expression to parse a log line.",
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

        {/* ----- TEACHER'S NOTE (with hover effect) ----- */}
        <section
          className={clsx(
            "mb-10 p-6 rounded-xl",
            "bg-amber-50 dark:bg-amber-900/20",
            "border border-amber-200 dark:border-amber-800",
            "hover:shadow-md hover:bg-amber-100/50 dark:hover:bg-amber-900/30",
            "transition-all duration-300",
            "animate-fadeSlideUp [animation-delay:1000ms]"
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
                I often let students like <strong>Swadeep</strong> and{" "}
                <strong>Debangshu</strong> spend 20 minutes with these ten
                examples. The "aha!" moment usually comes with Example 05 – list
                comprehension on files. They realise they don't need to remember
                <code>find</code> or <code>wc</code> flags; they can just write
                Python. From there, they start migrating their old Bash loops to
                XONSH. A gentle reminder: XONSH is not always faster than pure
                Bash for tiny commands, but for any data processing, it's a
                game‑changer.
              </p>
            </div>
          </div>
        </section>

        {/* ----- HINT SECTION (subtle) ----- */}
        <div
          className={clsx(
            "text-sm p-5 rounded-lg",
            "bg-gray-100 dark:bg-gray-800/60",
            "border border-gray-300 dark:border-gray-600",
            "animate-fadeSlideUp [animation-delay:1100ms]"
          )}
        >
          <span className="font-semibold block mb-1">🔍 Try changing this…</span>
          <p>
            In Example 05, modify the glob pattern to <code>'**/*.py'</code> and
            add a condition to count lines of code. See how Python's
            <code>Path.rglob()</code> works. What happens if you remove the
            <code>.strip()</code> in Example 03?
          </p>
        </div>

        {/* ----- FOOTER / CONTINUATION ----- */}
        <div className="mt-12 pt-6 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 text-center">
          <p>
            Next: <strong>Topic 45 – XONSH Medium Examples (10 examples)</strong>:
            working with JSON, subprocesses, and custom prompts.
          </p>
        </div>
      </div>
    </>
  );
};

export default Topic44;