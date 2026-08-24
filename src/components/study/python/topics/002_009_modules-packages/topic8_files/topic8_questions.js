// src/components/study/python/topics/002_009_modules-packages/topic8_files/topic8_questions.js
// Comprehensive Master Review Questions for Topic 8: Creating and managing Virtual Environments (venv)

const questions = [
  {
    question: "What is a Python Virtual Environment?",
    shortAnswer: "A self-contained directory tree containing a specific Python interpreter and an isolated set of installed packages separate from the global system Python.",
    explanation: "Virtual environments allow different projects on the same machine to maintain conflicting dependency versions (e.g. Project A requires Django 4.2 while Project B requires Django 5.0).",
    hint: "An isolated directory tree with its own Python interpreter and site-packages.",
    level: "basic",
    codeExample: "# Create a virtual environment named '.venv':\npython -m venv .venv"
  },
  {
    question: "How do you create a virtual environment named '.venv' using the standard library?",
    shortAnswer: "python -m venv .venv",
    explanation: "The standard 'venv' module creates the folder, copies binary executables, and writes the pyvenv.cfg configuration file.",
    hint: "Use python -m venv <env_name>.",
    level: "basic",
    codeExample: "python -m venv .venv"
  },
  {
    question: "What is the command to activate a virtual environment in Windows PowerShell vs Linux/macOS?",
    shortAnswer: "Windows PowerShell: .\\.venv\\Scripts\\Activate.ps1; Linux/macOS: source .venv/bin/activate",
    explanation: "On Windows, the activation scripts reside in 'Scripts'; on POSIX systems, they reside in 'bin'.",
    hint: "Windows: .venv\\Scripts\\Activate.ps1; POSIX: source .venv/bin/activate.",
    level: "basic",
    codeExample: "# Windows PowerShell:  .\\.venv\\Scripts\\Activate.ps1\n# macOS / Linux Bash:  source .venv/bin/activate"
  },
  {
    question: "How do you resolve the Windows PowerShell error: 'running scripts is disabled on this system' when activating a venv?",
    shortAnswer: "Run: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process",
    explanation: "PowerShell by default blocks unsigned script execution; setting RemoteSigned for the current process scope allows the activation script to run safely without compromising system-wide security.",
    hint: "Use Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process.",
    level: "basic",
    codeExample: "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process\n.\\.venv\\Scripts\\Activate.ps1"
  },
  {
    question: "What does the activation script actually do to your operating system environment under the hood?",
    shortAnswer: "It prepends the virtual environment's Scripts/ or bin/ directory to the very beginning of the OS PATH environment variable and sets VIRTUAL_ENV.",
    explanation: "Because the venv folder is first in PATH, any subsequent 'python' or 'pip' terminal command immediately executes the virtualenv's binaries.",
    hint: "Prepends venv binary folder to PATH and sets VIRTUAL_ENV.",
    level: "moderate",
    codeExample: "# Under the hood: PATH = '/path/to/.venv/bin:' + PATH"
  },
  {
    question: "How do you exit/deactivate a virtual environment?",
    shortAnswer: "Type 'deactivate' in your terminal.",
    explanation: "The deactivate shell function restores the original PATH environment variable and removes VIRTUAL_ENV.",
    hint: "Type 'deactivate'.",
    level: "basic",
    codeExample: "$ deactivate"
  },
  {
    question: "What is the role of the pyvenv.cfg file located inside the root of a virtual environment?",
    shortAnswer: "It tells CPython where the base standard library installation lives (home = ...) and whether system-wide site-packages should be accessible.",
    explanation: "When python.exe launches, it reads pyvenv.cfg to configure sys.prefix and site-packages locations.",
    hint: "Configuration file that points CPython to the base installation and isolates site-packages.",
    level: "moderate",
    codeExample: "# pyvenv.cfg contents:\n# home = C:\\Python313\n# include-system-site-packages = false"
  },
  {
    question: "How can Python code programmatically detect if it is running inside an active virtual environment?",
    shortAnswer: "sys.prefix != sys.base_prefix (True inside venv, False in global Python).",
    explanation: "In base Python, sys.prefix equals sys.base_prefix; in a virtualenv, sys.prefix points to the venv directory while sys.base_prefix points to the base install.",
    hint: "Check sys.prefix != sys.base_prefix.",
    level: "moderate",
    codeExample: "import sys\nis_venv = sys.prefix != sys.base_prefix\nprint('In venv:', is_venv)"
  },
  {
    question: "Why should you NEVER commit the virtual environment directory (.venv/) to Git / version control?",
    shortAnswer: "Because virtual environments contain machine-specific absolute file paths and platform-specific binaries that will fail on any other computer; commit requirements.txt instead.",
    explanation: "Virtual environments should always be ephemeral and recreated fresh on each target machine from requirements.txt or pyproject.toml.",
    hint: "They contain machine-specific absolute paths; add .venv/ to .gitignore.",
    level: "basic",
    codeExample: "# In .gitignore:\n.venv/\nvenv/\nenv/"
  },
  {
    question: "What happens if you run a Python script with the full path to the venv binary (e.g. .venv\\Scripts\\python.exe script.py) without activating first?",
    shortAnswer: "It executes perfectly inside the virtual environment without needing manual shell activation.",
    explanation: "CPython discovers pyvenv.cfg next to its executable and configures the virtual environment automatically.",
    hint: "Directly invoking .venv/bin/python runs in the venv without manual activation.",
    level: "complex",
    codeExample: "# Cron / Task Scheduler automation:\n/opt/app/.venv/bin/python /opt/app/main.py"
  },
  {
    question: "What is the difference between the standard library 'venv' module and the third-party 'virtualenv' tool?",
    shortAnswer: "'venv' is built into Python standard library (since 3.3); 'virtualenv' is a third-party tool that offers speed improvements and supports older Python versions.",
    explanation: "For modern Python 3 development, the standard 'venv' module is universally available and recommended.",
    hint: "venv is built-in; virtualenv is a third-party package.",
    level: "basic",
    codeExample: "# Standard built-in:\npython -m venv .venv"
  },
  {
    question: "How does Conda differ from standard Python venv?",
    shortAnswer: "Conda is a cross-language package and environment manager that manages C libraries, CUDA drivers, and Python versions; venv only manages Python packages on top of an existing Python installation.",
    explanation: "Conda is popular in scientific computing and AI; venv is the lightweight standard for pure Python development.",
    hint: "Conda manages binaries and C libraries across languages; venv manages Python packages.",
    level: "moderate",
    codeExample: "# Conda: conda create -n myenv python=3.11\n# venv:  python -m venv .venv"
  },
  {
    question: "What does the '--system-site-packages' flag do when creating a virtual environment?",
    shortAnswer: "Allows the virtual environment to access packages installed in the global base Python site-packages while still allowing new packages to be installed locally in the venv.",
    explanation: "Sets include-system-site-packages = true in pyvenv.cfg.",
    hint: "Gives the venv access to global system packages.",
    level: "moderate",
    codeExample: "python -m venv --system-site-packages .venv"
  },
  {
    question: "How do you delete / completely remove a virtual environment?",
    shortAnswer: "Simply delete the virtual environment folder (.venv) from your file system.",
    explanation: "Because a virtual environment is completely self-contained within its folder, deleting the folder leaves zero residue on the system.",
    hint: "Delete the .venv folder directly.",
    level: "basic",
    codeExample: "# Windows PowerShell: Remove-Item -Recurse -Force .venv\n# Linux / macOS:      rm -rf .venv"
  },
  {
    question: "What is the environment variable that stores the path of the currently activated virtual environment?",
    shortAnswer: "VIRTUAL_ENV",
    explanation: "Activation scripts export VIRTUAL_ENV so CLI tools, IDEs, and prompt formatters know the active environment path.",
    hint: "The VIRTUAL_ENV environment variable.",
    level: "basic",
    codeExample: "import os\nprint(os.environ.get('VIRTUAL_ENV'))"
  },
  {
    question: "How does VS Code automatically detect and select a virtual environment in a workspace?",
    shortAnswer: "VS Code scans workspace folders for common venv names like .venv, venv, or env and sets the Python Interpreter path automatically.",
    explanation: "You can also manually select it via 'Python: Select Interpreter' in the Command Palette (Ctrl+Shift+P).",
    hint: "VS Code looks for .venv folders in workspace root.",
    level: "basic",
    codeExample: "# .vscode/settings.json:\n# { \"python.defaultInterpreterPath\": \"${workspaceFolder}/.venv/Scripts/python.exe\" }"
  },
  {
    question: "Can a virtual environment use a different Python version than the one that created it?",
    shortAnswer: "No. A virtual environment is bound to the exact Python version that invoked 'python -m venv'.",
    explanation: "To create a Python 3.11 venv when multiple versions exist, run 'py -3.11 -m venv .venv'.",
    hint: "Bound to the Python interpreter version that created it.",
    level: "moderate",
    codeExample: "# Windows py launcher with specific version:\npy -3.11 -m venv .venv_py311"
  },
  {
    question: "What does the '--clear' flag do when running 'python -m venv'?",
    shortAnswer: "Deletes the contents of an existing virtual environment directory before creating a fresh new environment in its place.",
    explanation: "Useful for wiping and re-initializing an existing environment without deleting the folder manually.",
    hint: "Clears existing directory contents before creation.",
    level: "moderate",
    codeExample: "python -m venv --clear .venv"
  },
  {
    question: "What does 'python -m venv --upgrade' do?",
    shortAnswer: "Upgrades an existing virtual environment directory to use the active Python interpreter version in place.",
    explanation: "Useful after upgrading your system Python version to update existing venv pointers.",
    hint: "Upgrades venv to current Python version.",
    level: "complex",
    codeExample: "python -m venv --upgrade .venv"
  },
  {
    question: "Where are packages installed when you run 'pip install' inside an activated virtual environment?",
    shortAnswer: "Inside '.venv/Lib/site-packages' (Windows) or '.venv/lib/python3.x/site-packages' (Linux/macOS).",
    explanation: "Completely isolated from the system Python's site-packages.",
    hint: "Inside the venv's local site-packages directory.",
    level: "basic",
    codeExample: "# Windows: .venv\\Lib\\site-packages\\<pkg>"
  },
  {
    question: "What happens if you activate a virtual environment and then move / rename the project folder?",
    shortAnswer: "The virtual environment will break because the activation scripts and pyvenv.cfg contain hardcoded absolute paths.",
    explanation: "If you move the folder, delete .venv and recreate it with 'python -m venv .venv && pip install -r requirements.txt'.",
    hint: "Hardcoded absolute paths break; delete and recreate the venv.",
    level: "complex",
    codeExample: "# Delete and recreate venv if project folder is moved"
  },
  {
    question: "How do you verify which pip and python executables are being used in terminal?",
    shortAnswer: "Windows: 'where python'; Linux/macOS: 'which python'",
    explanation: "The active virtualenv's executable path should appear at the very top of the output.",
    hint: "Use 'where python' on Windows or 'which python' on Linux.",
    level: "basic",
    codeExample: "# Windows PowerShell: where.exe python\n# macOS / Linux:      which python"
  },
  {
    question: "What is Poetry / Pipenv compared to basic venv?",
    shortAnswer: "Modern higher-level dependency management tools that automatically manage virtual environments, deterministic lockfiles (poetry.lock), and pyproject.toml dependencies.",
    explanation: "They build on top of venv primitives to provide unified dependency resolution and packaging workflows.",
    hint: "Higher-level tools with automatic lockfiles and dependency management.",
    level: "moderate",
    codeExample: "# poetry run python app.py"
  },
  {
    question: "Can multiple virtual environments share the same cached wheel downloads?",
    shortAnswer: "Yes. Pip's user-level wheel cache is global across all virtual environments on the machine.",
    explanation: "Installing a package into a second virtualenv reuses the cached wheel from the first virtualenv in 0.1s.",
    hint: "Yes, pip wheel cache is shared globally across environments.",
    level: "basic",
    codeExample: "# Shared wheel cache speeds up repeated installs"
  },
  {
    question: "What is the definitive production workflow for managing Python project dependencies?",
    shortAnswer: "1. Create venv ($ python -m venv .venv); 2. Activate ($ source .venv/bin/activate); 3. Install dependencies ($ pip install -r requirements.txt); 4. Pin exports ($ pip freeze > requirements.txt).",
    explanation: "Guarantees reproducible local development and zero deployment surprises across production servers.",
    hint: "Create -> Activate -> Install -> Freeze.",
    level: "basic",
    codeExample: "# 1. python -m venv .venv\n# 2. .\\.venv\\Scripts\\Activate.ps1\n# 3. python -m pip install -r requirements.txt"
  }
];

export default questions;
