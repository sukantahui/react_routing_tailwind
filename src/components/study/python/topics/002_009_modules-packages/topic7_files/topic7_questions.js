// src/components/study/python/topics/002_009_modules-packages/topic7_files/topic7_questions.js
// Comprehensive Master Review Questions for Topic 7: Third-party packages and pip package manager

const questions = [
  {
    question: "What is PyPI (Python Package Index)?",
    shortAnswer: "The official public repository for third-party open-source Python packages, hosting over 500,000+ libraries.",
    explanation: "When you run 'pip install requests', pip connects to PyPI (pypi.org), resolves dependencies, and downloads the package.",
    hint: "The official online software repository for Python packages (pypi.org).",
    level: "basic",
    codeExample: "# pip downloads packages directly from PyPI (pypi.org)"
  },
  {
    question: "Why should developers use 'python -m pip install' instead of bare 'pip install'?",
    shortAnswer: "Because 'python -m pip' explicitly binds pip to the active Python interpreter executing the command, eliminating multi-version installation mix-ups.",
    explanation: "If multiple Python versions exist on a system, bare 'pip' might point to Python 3.10 while 'python' runs Python 3.13, causing ModuleNotFoundError.",
    hint: "Guarantees installation into the exact Python environment being executed.",
    level: "basic",
    codeExample: "# Best practice:\npython -m pip install requests"
  },
  {
    question: "What is the difference between a Wheel (.whl) and a Source Distribution (.tar.gz / sdist)?",
    shortAnswer: "A Wheel is a pre-compiled, ready-to-extract binary ZIP archive requiring no compiler; an sdist contains uncompiled source code requiring a local C compiler for native extensions.",
    explanation: "Wheels install in milliseconds and eliminate compilation errors on end-user machines.",
    hint: "Wheel = pre-compiled binary; sdist = uncompiled source code.",
    level: "moderate",
    codeExample: "# Wheel:  numpy-2.1.0-cp313-cp313-win_amd64.whl (Instant)\n# sdist:  numpy-2.1.0.tar.gz (Requires C compiler)"
  },
  {
    question: "How do you install an exact pinned version of a package using pip?",
    shortAnswer: "python -m pip install package_name==1.2.3",
    explanation: "The double equals sign (==) pins the installation to that specific release.",
    hint: "Use == for exact version pinning.",
    level: "basic",
    codeExample: "python -m pip install requests==2.31.0"
  },
  {
    question: "What does the compatible release operator (~=) mean in pip version specifiers?",
    shortAnswer: "'~= 2.2' means '>= 2.2, == 2.*' (allows minor updates and bug fixes but forbids breaking major version jumps).",
    explanation: "For example, 'requests ~= 2.31.0' accepts version 2.31.1, 2.31.2, but rejects 2.32.0 or 3.0.0.",
    hint: "Allows compatible patch/minor updates while preventing breaking major changes.",
    level: "moderate",
    codeExample: "python -m pip install 'requests~=2.31.0'"
  },
  {
    question: "How do you upgrade an already installed package to its latest release?",
    shortAnswer: "python -m pip install --upgrade package_name (or -U)",
    explanation: "Checks PyPI for newer versions and replaces the existing package.",
    hint: "Use --upgrade or -U flag.",
    level: "basic",
    codeExample: "python -m pip install --upgrade pandas"
  },
  {
    question: "How do you uninstall a package cleanly without prompting for interactive confirmation?",
    shortAnswer: "python -m pip uninstall package_name -y",
    explanation: "The -y flag automatically confirms uninstallation.",
    hint: "Use -y flag to skip confirmation prompt.",
    level: "basic",
    codeExample: "python -m pip uninstall colorama -y"
  },
  {
    question: "What does 'python -m pip list' do?",
    shortAnswer: "Displays a tabular list of all third-party and built-in distributions installed in the current environment along with their version numbers.",
    explanation: "Provides a quick overview of what packages are available in the active environment.",
    hint: "Lists all installed packages and their versions.",
    level: "basic",
    codeExample: "python -m pip list"
  },
  {
    question: "What does 'python -m pip show package_name' display?",
    shortAnswer: "Detailed metadata including package version, summary, author, license, location on disk, and dependencies (Requires / Required-by).",
    explanation: "Useful for checking where a package is installed and what other packages depend on it.",
    hint: "Displays detailed metadata, license, location, and dependencies.",
    level: "basic",
    codeExample: "python -m pip show requests"
  },
  {
    question: "Where are third-party packages installed on disk by default?",
    shortAnswer: "Inside the 'site-packages' directory within the Python installation or virtual environment.",
    explanation: "Python includes site-packages in sys.path automatically at startup.",
    hint: "Inside the 'site-packages' folder.",
    level: "basic",
    codeExample: "# Path: <python_dir>/Lib/site-packages"
  },
  {
    question: "What is the pip download cache and how does it speed up installations?",
    shortAnswer: "Pip saves downloaded .whl files to a local cache directory so repeated installations (e.g. across new virtualenvs) install locally in 0.1s without internet downloads.",
    explanation: "You can inspect cached wheels with 'python -m pip cache list' and clear them with 'pip cache purge'.",
    hint: "Caches downloaded wheels locally for instant reinstallation.",
    level: "moderate",
    codeExample: "python -m pip cache list\npython -m pip cache purge"
  },
  {
    question: "How do you programmatically check the version of an installed package using Python code?",
    shortAnswer: "importlib.metadata.version('package_name')",
    explanation: "Standard library function in Python 3.8+ that reads package metadata without requiring you to import the package itself.",
    hint: "Use importlib.metadata.version('name').",
    level: "moderate",
    codeExample: "import importlib.metadata\nprint(importlib.metadata.version('pip'))"
  },
  {
    question: "What is a Pure Python Wheel vs a Platform-Specific Wheel?",
    shortAnswer: "Pure Python wheels (py3-none-any.whl) contain only Python code and run on any OS; Platform wheels (e.g. win_amd64.whl) contain pre-compiled C/C++ binaries for a specific OS and CPU architecture.",
    explanation: "Platform wheels must match the consumer's exact OS, CPython ABI, and bitness (64-bit).",
    hint: "Pure Python works on any OS; Platform wheels are pre-compiled for specific OS/CPUs.",
    level: "moderate",
    codeExample: "# Pure:     requests-2.31.0-py3-none-any.whl\n# Platform: numpy-2.1.0-cp313-cp313-win_amd64.whl"
  },
  {
    question: "How do you install multiple packages listed inside a text file using pip?",
    shortAnswer: "python -m pip install -r requirements.txt",
    explanation: "The -r flag reads package names and version pins line-by-line from the specified file.",
    hint: "Use -r requirements.txt.",
    level: "basic",
    codeExample: "python -m pip install -r requirements.txt"
  },
  {
    question: "How do you export all currently installed packages in requirements.txt format?",
    shortAnswer: "python -m pip freeze > requirements.txt",
    explanation: "'pip freeze' outputs all non-standard installed packages with their exact pinned versions (package==1.0.0).",
    hint: "Use python -m pip freeze.",
    level: "basic",
    codeExample: "python -m pip freeze > requirements.txt"
  },
  {
    question: "What is the defensive optional import pattern in Python?",
    shortAnswer: "Wrapping third-party imports in a try...except ImportError block and providing standard library fallbacks if missing.",
    explanation: "Ensures libraries don't crash when optional speed-up or formatting packages are not installed.",
    hint: "Use try...except ImportError with standard library fallback.",
    level: "moderate",
    codeExample: "try:\n    import orjson as json  # Ultra-fast C library\nexcept ImportError:\n    import json  # Standard library fallback"
  },
  {
    question: "What is the difference between 'pip list' and 'pip freeze'?",
    shortAnswer: "'pip list' formats packages into a human-readable table; 'pip freeze' outputs exact pinned dependency strings (pkg==1.0.0) intended for requirements.txt files.",
    explanation: "'pip freeze' also excludes pip itself and setuptools by default to maintain clean requirement files.",
    hint: "list is for human reading; freeze is for machine requirement files.",
    level: "basic",
    codeExample: "# list:   requests     2.31.0\n# freeze: requests==2.31.0"
  },
  {
    question: "How do you install a package directly from a GitHub repository using pip?",
    shortAnswer: "python -m pip install git+https://github.com/user/repo.git",
    explanation: "pip clones the git repository, builds the package, and installs it into site-packages.",
    hint: "Use git+https:// URL syntax.",
    level: "moderate",
    codeExample: "python -m pip install git+https://github.com/psf/requests.git"
  },
  {
    question: "What happens if two installed packages require conflicting versions of the same dependency?",
    shortAnswer: "pip's modern backtracking resolver attempts to find a mutually compatible version; if none exists, pip raises a ResolutionImpossible error.",
    explanation: "Pip's dependency resolver prevents broken dependency states.",
    hint: "Raises ResolutionImpossible error if no mutually compatible version exists.",
    level: "complex",
    codeExample: "# Pip backtracking resolver detects conflicting dependencies"
  },
  {
    question: "What is the purpose of the '--no-deps' flag in pip?",
    shortAnswer: "Installs only the specified package while skipping the automatic installation of its dependencies.",
    explanation: "Useful in specialized container builds or debugging dependency trees.",
    hint: "Skips installing package dependencies.",
    level: "moderate",
    codeExample: "python -m pip install --no-deps my_package"
  },
  {
    question: "How do you install a local Wheel file (.whl) directly without downloading from PyPI?",
    shortAnswer: "python -m pip install path/to/package_name.whl",
    explanation: "pip directly extracts the local wheel archive into site-packages.",
    hint: "Provide the direct file path to the .whl file.",
    level: "basic",
    codeExample: "python -m pip install ./dist/my_lib-1.0.0-py3-none-any.whl"
  },
  {
    question: "How do you check for known security vulnerabilities in installed Python packages?",
    shortAnswer: "Use tools like 'pip-audit' or 'safety' (e.g. 'pip-audit' scans site-packages against the PyPI Vulnerability Database).",
    explanation: "Automated vulnerability scanning is an essential step in modern CI/CD pipelines.",
    hint: "Use pip-audit or safety to scan for CVE vulnerabilities.",
    level: "moderate",
    codeExample: "python -m pip install pip-audit\npip-audit"
  },
  {
    question: "Can pip install packages in editable mode for active development?",
    shortAnswer: "Yes: python -m pip install -e . (or --editable .)",
    explanation: "Creates an editable link directly to the source code folder so code edits take effect immediately without re-installing.",
    hint: "Use -e . for editable development mode.",
    level: "moderate",
    codeExample: "python -m pip install -e ."
  },
  {
    question: "What is the danger of running 'pip install --user' inside a virtual environment?",
    shortAnswer: "It installs packages into the global user home folder instead of the active virtual environment, polluting global state.",
    explanation: "Inside virtual environments, never pass --user; let pip install directly into the virtual environment's site-packages.",
    hint: "Installs globally to user home instead of active virtualenv.",
    level: "complex",
    codeExample: "# Avoid --user inside virtualenvs"
  },
  {
    question: "Why should developers always use Virtual Environments instead of installing packages into the global Python installation?",
    shortAnswer: "To isolate project dependencies, prevent version conflicts between projects, avoid breaking operating system tools, and ensure reproducible deployments.",
    explanation: "Virtual environments create isolated sandbox environments for each project.",
    hint: "Prevents version conflicts and insulates projects from global package pollution.",
    level: "basic",
    codeExample: "# Always use virtual environments: python -m venv .venv"
  }
];

export default questions;
