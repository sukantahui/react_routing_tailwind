// Topic46.jsx
import React from "react";
import clsx from "clsx";
import ShellFileLoader from "../../../../../common/ShellFileLoader";

// ----------------------------------------------------------------------
// Inline raw XONSH expert examples – 10 advanced, production‑ready scripts
// In a real project, these would be separate .xsh / .py files imported via `?raw`.
// ----------------------------------------------------------------------
const example01Xontrib = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 01: Creating a minimal xontrib (XONSH extension)
# Save as ~/.xonsh/xontrib/hello_world.py
# ----------------------------------------------------------------------
import xonsh.lazyasd as lazy

def _load_xontrib_(xsh, **kwargs):
    """Load the xontrib – adds a new alias and environment variable."""
    xsh.aliases['hello'] = 'echo "Hello from Ichapur lab!"'
    xsh.env['XONTRIB_LOADED'] = 'hello_world'
    print("✅ xontrib 'hello_world' loaded")

# To load it interactively:
# xontrib load hello_world
# hello
# echo $XONTRIB_LOADED
`;

const example02Macro = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 02: Macros – delay execution using @() and macros
# ----------------------------------------------------------------------
from xonsh.macros import Macro

# Define a macro that runs a command only if a condition is true
def run_if(condition, cmd):
    return Macro(f"if {condition}:\\n    $( {cmd} )")

# Create a macro
check = run_if('__xonsh__.env.get("DEBUG")', 'ls -la')

# Later, evaluate it
__xonsh__.env['DEBUG'] = '1'
result = check()   # Actually runs 'ls -la'
echo "Macro executed with DEBUG set"

# Macros are powerful for lazy evaluation and templating
`;

const example03AsyncPrompt = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 03: Asynchronous prompt with coroutines (requires Python 3.7+)
# Place in ~/.xonshrc or load as script
# ----------------------------------------------------------------------
import asyncio
from xonsh.prompt.base import Prompt

async def async_git_branch():
    """Fetch git branch asynchronously – won't block prompt."""
    proc = await asyncio.create_subprocess_shell(
        'git branch --show-current 2>/dev/null',
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.DEVNULL
    )
    stdout, _ = await proc.communicate()
    branch = stdout.decode().strip()
    return f"[{branch}]" if branch else ""

# Replace the git_branch field with our async version
from xonsh.prompt import gitstatus
gitstatus.async_git_branch = async_git_branch

$PROMPT = '{user}@{hostname}:{cwd}{async_git_branch} > '
echo "Asynchronous prompt enabled"
`;

const example04Embedding = `#!/usr/bin/env python3
# ----------------------------------------------------------------------
# Example 04: Embed XONSH inside a Python script
# ----------------------------------------------------------------------
import xonsh.main
from xonsh.execer import Execer

# Create an execer to run xonsh code
execer = Execer()

# Run a xonsh one-liner
code = 'echo "This is @("XONSH") running from Python!"'
result = execer.eval(code, glbs={}, locls={})
print(f"Result: {result}")

# Run a multi-line xonsh script
script = '''
files = $(ls -la)
print(f"Number of files: {len(files.splitlines())}")
'''
execer.exec(script, glbs={}, locls={})
`;

const example05EventHooks = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 05: Event hooks – react to directory changes, command execution
# ----------------------------------------------------------------------
from xonsh.events import events

@events.on_chdir
def chdir_handler(olddir, newdir, **kw):
    print(f"📂 Moved from {olddir} to {newdir}")
    if 'ichapur' in newdir:
        print("  Welcome to the Ichapur lab!")

@events.on_precommand
def pre_cmd_handler(cmd, **kw):
    print(f"⚡ About to run: {cmd}")

@events.on_postcommand
def post_cmd_handler(cmd, rtn, **kw):
    print(f"✅ Command finished with exit code {rtn}")

echo "Event handlers installed. Try 'cd /tmp' or run 'ls'."
`;

const example06CustomTransformer = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 06: Custom command transformer – auto‑alias typos
# ----------------------------------------------------------------------
from xonsh.ast import pipeline_to_tokens

def fix_typos(cmd):
    """If user types 'sl' (common mistake), run 'ls'."""
    tokens = pipeline_to_tokens(cmd)
    if tokens and tokens[0].value == 'sl':
        tokens[0].value = 'ls'
    return cmd

# Register transformer
from xonsh.commands_cache import CommandsCache
CommandsCache().transformer = fix_typos

echo "Transformer installed – try typing 'sl -la'"
`;

const example07Profiling = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 07: Profile command execution time
# ----------------------------------------------------------------------
import time
from xonsh.events import events

@events.on_precommand
def profile_start(cmd, **kw):
    __xonsh__.env['_PROFILE_START'] = time.perf_counter()

@events.on_postcommand
def profile_end(cmd, rtn, **kw):
    start = __xonsh__.env.get('_PROFILE_START')
    if start:
        elapsed = time.perf_counter() - start
        print(f"⏱️  '{cmd}' took {elapsed:.3f} seconds")

echo "Profiler active. Run any command to see its duration."
`;

const example08CustomCompletion = `#!/usr/bin/env xonsh
# ----------------------------------------------------------------------
# Example 08: Custom tab completion for student names
# ----------------------------------------------------------------------
from xonsh.completers import Completer
from prompt_toolkit.completion import Completion

class StudentCompleter(Completer):
    def complete(self, command, prefix, line, **kwargs):
        students = ['tuhina', 'swadeep', 'abhronila', 'debangshu']
        for name in students:
            if name.startswith(prefix.lower()):
                yield Completion(name, start_position=-len(prefix))

# Register completer for commands starting with 'greet '
from xonsh.completers import add_one_completer
add_one_completer('student-greet', StudentCompleter(), '<')

# Usage: type 'greet tu' and press Tab → expands to 'tuhina'
echo "Custom completer installed. Try: greet tu<tab>"
`;

const example09XonshAsLibrary = `#!/usr/bin/env python3
# ----------------------------------------------------------------------
# Example 09: Use XONSH parser as a library in a Python tool
# ----------------------------------------------------------------------
from xonsh.parser import Parser
from xonsh.ast import pretty_print

def parse_and_show(code):
    parser = Parser()
    tree = parser.parse(code, filename='<string>')
    print("Abstract Syntax Tree:")
    pretty_print(tree)

# Parse a mixed xonsh line
parse_and_show('ls -l @(myvar) | grep txt')

# Output: AST representation – shows how xonsh merges shell and Python
`;

const example10JupyterKernel = `#!/usr/bin/env bash
# ----------------------------------------------------------------------
# Example 10: Install XONSH Jupyter kernel (run once)
# ----------------------------------------------------------------------
# This registers xonsh as a kernel in Jupyter / JupyterLab
python -m pip install --user xonsh[jupyter]

# Verify installation
jupyter kernelspec list | grep xonsh

# Now launch Jupyter and choose "Xonsh" as the kernel.
# Cells can mix shell and Python seamlessly.

echo "✅ Xonsh Jupyter kernel installed.
Try: 
  !ls -la
  print("Hello from xonsh!")
  files = !ls
  print(f"Found {len(files)} files")
`;

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
const Topic46 = () => {
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
              Topic 46
            </span>
            <span className="px-3 py-1 text-xs font-mono bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full border border-amber-200 dark:border-amber-700">
              XONSH Expert Examples
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            XONSH:{" "}
            <span className="text-indigo-600 dark:text-indigo-400">
              10 Expert‑Level Scripts
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            You've mastered the basics and intermediate patterns. Now we explore
            the true power of XONSH: extending the shell itself. Write your own
            xontribs, embed XONSH in Python applications, create asynchronous
            prompts, and even use XONSH as a Jupyter kernel. These scripts are
            what separate advanced users from experts.
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
            <span className="text-3xl">🚀</span> Why go expert?
          </h2>

          <div className="grid md:grid-cols-1 gap-8">
            <div className="space-y-4">
              <p className="leading-relaxed">
                XONSH is not just a shell – it's a platform. At{" "}
                <strong>Naihati</strong> and <strong>Shyamnagar</strong>, senior
                students and IT staff have built internal tools using XONSH
                extensions. They've created custom completers for their domain‑
                specific commands, profiled long‑running data pipelines, and even
                embedded XONSH inside Flask applications to give admins a
                web‑based shell.
              </p>
              <p className="leading-relaxed">
                The ten examples on the right are the "graduation" level. They
                assume you are comfortable with Python and XONSH's internals.
                Each example is self‑contained but many are meant to be placed in
                <code>~/.xonshrc</code> or installed as permanent extensions.
              </p>
              <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded border-l-4 border-indigo-400">
                <span className="font-semibold">🧑‍🔬 The expert mindset</span>
                <p className="text-sm mt-1">
                  You no longer ask "Can XONSH do this?" – you ask "How do I
                  teach XONSH to do this?" The event system, macro system, and
                  AST transformers give you unlimited control.
                </p>
              </div>
            </div>

            {/* SVG illustrating XONSH extensibility */}
            <div className="flex items-center justify-center p-2 group">
              <svg
                width="280"
                height="160"
                viewBox="0 0 280 160"
                className="w-full max-w-xs"
                aria-label="XONSH expert capabilities"
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
                <text x="22" y="60" fill="#E5E7EB" fontSize="12">
                  xontrib
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
                <text x="202" y="60" fill="#E5E7EB" fontSize="12">
                  event hooks
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
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </path>

                <rect
                  x="100"
                  y="110"
                  width="80"
                  height="30"
                  rx="8"
                  fill="#4F46E5"
                  className="dark:fill-indigo-600 group-hover:fill-indigo-500 transition-all"
                />
                <text x="110" y="132" fill="white" fontSize="10" fontWeight="bold">
                  Jupyter · Embed
                </text>
              </svg>
            </div>
          </div>
        </section>

        {/* ----- 10 EXPERT EXAMPLES (5x2 grid) ----- */}
        <section className="space-y-8 mb-12">
          <h2 className="text-2xl font-semibold mb-2 animate-fadeSlideUp [animation-delay:200ms]">
            ⚙️ XONSH internals & extensibility
          </h2>

          <div className="grid md:grid-cols-1 gap-6 animate-fadeSlideUp [animation-delay:250ms]">
            <ShellFileLoader
              fileModule={example01Xontrib}
              title="01. Minimal xontrib (extension)"
              highlightLines={[6, 10]}
            />
            <ShellFileLoader
              fileModule={example02Macro}
              title="02. Macros – lazy execution"
              highlightLines={[5, 13]}
            />
          </div>
          <div className="grid md:grid-cols-1 gap-6 animate-fadeSlideUp [animation-delay:300ms]">
            <ShellFileLoader
              fileModule={example03AsyncPrompt}
              title="03. Asynchronous prompt"
              highlightLines={[9, 19]}
            />
            <ShellFileLoader
              fileModule={example04Embedding}
              title="04. Embed XONSH in Python"
              highlightLines={[5, 17]}
            />
          </div>
          <div className="grid md:grid-cols-1 gap-6 animate-fadeSlideUp [animation-delay:350ms]">
            <ShellFileLoader
              fileModule={example05EventHooks}
              title="05. Event hooks (cd, pre/post command)"
              highlightLines={[5, 18]}
            />
            <ShellFileLoader
              fileModule={example06CustomTransformer}
              title="06. Custom command transformer"
              highlightLines={[8, 15]}
            />
          </div>
          <div className="grid md:grid-cols-1 gap-6 animate-fadeSlideUp [animation-delay:400ms]">
            <ShellFileLoader
              fileModule={example07Profiling}
              title="07. Command profiling"
              highlightLines={[5, 16]}
            />
            <ShellFileLoader
              fileModule={example08CustomCompletion}
              title="08. Custom tab completion"
              highlightLines={[7, 19]}
            />
          </div>
          <div className="grid md:grid-cols-1 gap-6 animate-fadeSlideUp [animation-delay:450ms]">
            <ShellFileLoader
              fileModule={example09XonshAsLibrary}
              title="09. XONSH parser as a library"
              highlightLines={[6, 13]}
            />
            <ShellFileLoader
              fileModule={example10JupyterKernel}
              title="10. Jupyter kernel integration"
              highlightLines={[4, 10]}
            />
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400 italic">
            💡 Many of these examples touch the internals of XONSH. They are most
            useful when placed in <code>~/.xonshrc</code> or installed as proper
            xontribs. For embedding and Jupyter, ensure you have the required
            Python packages installed (<code>xonsh[jupyter]</code>).
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
                  Use <code>lazyasd</code> to delay imports in xontribs – faster
                  shell startup.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span>
                  Profile your <code>.xonshrc</code> with{' '}
                  <code>xonsh --timing</code>.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-500">•</span>
                <span>
                  Debug transformers with <code>print</code> or logging – they
                  receive the AST node.
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
                  <strong>Modifying built‑in completers</strong> – always use
                  <code>add_one_completer</code> instead of directly manipulating
                  the list.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500">•</span>
                <span>
                  <strong>Event handler exceptions</strong> – wrap in try/except;
                  unhandled exceptions can break the prompt.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500">•</span>
                <span>
                  <strong>Asynchronous prompt functions</strong> must be
                  coroutines; regular functions will block.
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
                  Package reusable extensions as proper xontribs with setup.py.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>
                  Document event handlers with docstrings – other users will
                  thank you.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500">•</span>
                <span>
                  Test transformers with both simple and complex command lines.
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
            <span className="text-2xl">📋</span> Mini Checklist – XONSH Expert
          </h3>
          <div className="grid sm:grid-cols-1 gap-3">
            {[
              "I have written and loaded a custom xontrib.",
              "I understand how macros can delay command execution.",
              "I can create an asynchronous prompt that doesn't block.",
              "I have embedded XONSH inside another Python application.",
              "I use event hooks to react to directory changes and commands.",
              "I can write a transformer to modify commands before execution.",
              "I have profiled command execution times with custom hooks.",
              "I added a domain‑specific tab completer.",
              "I used the XONSH parser to analyse shell scripts.",
              "I have tried the XONSH Jupyter kernel."
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
                At this stage, students like <strong>Debangshu</strong> and{" "}
                <strong>Abhronila</strong> often ask: "Is this still shell
                scripting?" The answer is yes – it's the future of shell
                scripting. XONSH exposes its internals responsibly; you're not
                hacking, you're extending. I encourage my advanced students to
                publish their xontribs on GitHub. One former student from{" "}
                <strong>Barrackpore</strong> created a xontrib that integrates
                with the school's LDAP system – now used by the entire IT
                department. That's the power of an extensible shell.
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
          <span className="font-semibold block mb-1">🔍 Think about…</span>
          <p>
            In Example 06, we replace the entire command transformer. What if we
            wanted to chain multiple transformers? How would you design a pipeline
            of transformers? (Hint: look at the <code>CommandsCache</code> source).
          </p>
          <p className="mt-2">
            Example 03 uses <code>asyncio.create_subprocess_shell</code>. Why is
            this better than <code>$(git ...)</code> for a prompt component?
          </p>
        </div>

        {/* ----- FOOTER / CONTINUATION ----- */}
        <div className="mt-12 pt-6 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 text-center">
          <p>
            Congratulations! You've completed the XONSH deep‑dive (Topics 42–46).
            The remaining topics (47+) will revisit traditional shell scripting
            with best practices, mini projects, and reference scripts.
          </p>
        </div>
      </div>
    </>
  );
};

export default Topic46;