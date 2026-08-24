// src/components/study/python/topics/002_009_modules-packages/topic9_files/topic9_questions.js
// Comprehensive Master Review Questions for Topic 9: requirements.txt generation and dependency management

const questions = [
  {
    question: "What is a requirements.txt file in Python?",
    shortAnswer: "A standard text file containing a list of third-party package names, version constraints, and optional environment markers required to run a Python project.",
    explanation: "Allows developers and CI/CD pipelines to recreate the exact environment on any computer using 'pip install -r requirements.txt'.",
    hint: "Text file listing project package dependencies and version pins.",
    level: "basic",
    codeExample: "# requirements.txt:\nrequests==2.31.0\npandas>=2.0.0"
  },
  {
    question: "How do you generate a requirements.txt file from an active virtual environment?",
    shortAnswer: "python -m pip freeze > requirements.txt",
    explanation: "'pip freeze' inspects the active environment and redirects the pinned package list to the specified text file.",
    hint: "Use python -m pip freeze > requirements.txt.",
    level: "basic",
    codeExample: "python -m pip freeze > requirements.txt"
  },
  {
    question: "How do you install all packages listed in a requirements.txt file?",
    shortAnswer: "python -m pip install -r requirements.txt",
    explanation: "The -r (or --requirement) flag instructs pip to read and install dependencies from the file.",
    hint: "Use python -m pip install -r requirements.txt.",
    level: "basic",
    codeExample: "python -m pip install -r requirements.txt"
  },
  {
    question: "What does the compatible release operator (~=) mean in requirements.txt?",
    shortAnswer: "Compatible release (e.g. pydantic~=2.6.0 means >=2.6.0, ==2.6.*) allowing bug-fix patch updates while forbidding breaking minor/major releases.",
    explanation: "Helps projects stay secure with automated patch updates without risking breaking API changes.",
    hint: "Allows compatible patch updates (>=2.6.0, ==2.6.*).",
    level: "moderate",
    codeExample: "fastapi~=0.110.0  # Accepts 0.110.1, 0.110.2; rejects 0.111.0"
  },
  {
    question: "What are Environment Markers in requirements.txt?",
    shortAnswer: "Conditional clauses appended to a requirement (separated by a semicolon) that install the package only on specific OS platforms or Python versions.",
    explanation: "For example, 'colorama>=0.4.6; sys_platform == \"win32\"' installs colorama only on Windows machines.",
    hint: "Conditional rules like '; sys_platform == \"win32\"'.",
    level: "moderate",
    codeExample: "colorama>=0.4.6; sys_platform == 'win32'\nuvloop>=0.19.0; sys_platform != 'win32'"
  },
  {
    question: "What is Layered Requirements Architecture and why is it considered an industry best practice?",
    shortAnswer: "Splitting dependencies into modular files (base.txt, dev.txt, prod.txt) using '-r base.txt' to include shared packages.",
    explanation: "Prevents heavy local testing tools (like pytest, black, flake8) from bloating lightweight production Docker containers.",
    hint: "Separates base, dev, and prod dependencies using '-r base.txt'.",
    level: "moderate",
    codeExample: "# requirements/dev.txt:\n-r base.txt\npytest==8.0.2\nblack==24.2.0"
  },
  {
    question: "What is the '-r' directive inside a requirements file?",
    shortAnswer: "A recursive include directive that loads and appends another requirements file into the current file.",
    explanation: "Allows dev.txt to inherit everything from base.txt without duplicating package entries.",
    hint: "Includes another requirements file: -r base.txt.",
    level: "basic",
    codeExample: "-r base.txt"
  },
  {
    question: "What is the main limitation of relying solely on 'pip freeze' for requirement generation?",
    shortAnswer: "It dumps all transitive (sub-)dependencies into a single flat list, losing track of direct project dependencies and making future upgrades difficult.",
    explanation: "It also captures unrelated packages if run outside a clean virtual environment.",
    hint: "Mixes direct and transitive dependencies and captures global clutter.",
    level: "moderate",
    codeExample: "# Loss of intent: is 'idna' your dependency or requests' sub-dependency?"
  },
  {
    question: "What is pip-tools (pip-compile) and how does it solve the limitations of pip freeze?",
    shortAnswer: "pip-compile takes a high-level requirements.in file (with direct dependencies) and generates a fully pinned, annotated requirements.txt showing why every sub-dependency was installed.",
    explanation: "Provides deterministic, reproducible lockfiles while keeping direct dependencies crystal clear.",
    hint: "Compiles requirements.in into a deterministic, annotated lockfile.",
    level: "complex",
    codeExample: "# In requirements.in: requests\n# Run: pip-compile requirements.in -> Generates requirements.txt with hashes & sub-deps"
  },
  {
    question: "What is 'pipreqs' and when should you use it instead of pip freeze?",
    shortAnswer: "'pipreqs' scans only the 'import' statements in your project's .py files and generates a clean requirements.txt containing only packages actually imported by your code.",
    explanation: "Ideal for cleaning up messy environments or generating requirements for an inherited legacy codebase.",
    hint: "Scans project source code imports to generate requirements.",
    level: "moderate",
    codeExample: "$ pipreqs ./"
  },
  {
    question: "How do you verify if all installed packages in your environment satisfy their dependency requirements without conflicts?",
    shortAnswer: "python -m pip check",
    explanation: "Scans all installed distributions and reports broken dependencies or incompatible version requirements.",
    hint: "Run python -m pip check.",
    level: "basic",
    codeExample: "python -m pip check\n# Output: 'No broken requirements found.'"
  },
  {
    question: "How do you specify an excluded version in requirements.txt (e.g. a version with a known bug)?",
    shortAnswer: "package_name>=1.0.0,!=1.2.3",
    explanation: "The '!=' operator explicitly skips the buggy release while allowing all other valid versions.",
    hint: "Use != to exclude a specific version: !=1.2.3.",
    level: "basic",
    codeExample: "pydantic>=2.0.0,!=2.5.0"
  },
  {
    question: "Can you include comments inside a requirements.txt file?",
    shortAnswer: "Yes. Any line starting with a hash symbol (#) is treated as a comment and ignored by pip.",
    explanation: "Useful for documenting why a package was pinned or who requested it.",
    hint: "Lines starting with # are comments.",
    level: "basic",
    codeExample: "# Core Database Driver for PostgreSQL\npsycopg2-binary==2.9.9"
  },
  {
    question: "How do you install a package directly from a private Git repository inside requirements.txt?",
    shortAnswer: "package-name @ git+https://github.com/org/repo.git@tag_or_branch",
    explanation: "pip clones and builds the private repository during installation.",
    hint: "Use 'pkg @ git+https://...' syntax.",
    level: "moderate",
    codeExample: "accotax-core @ git+https://github.com/accotax/core.git@v2.1.0"
  },
  {
    question: "What does the '--no-cache-dir' flag do during 'pip install -r requirements.txt' in Docker containers?",
    shortAnswer: "Disables saving downloaded wheel files to disk cache, keeping the final Docker container image size as small as possible.",
    explanation: "In Docker, cached wheels waste image disk space since container layers are immutable.",
    hint: "Prevents storing wheel cache to minimize Docker image size.",
    level: "moderate",
    codeExample: "RUN pip install --no-cache-dir -r requirements.txt"
  },
  {
    question: "What is pyproject.toml (PEP 621) in modern Python dependency management?",
    shortAnswer: "The modern unified standard for defining project metadata, build systems, and dependencies in a single standardized TOML configuration file.",
    explanation: "Replaces setup.py and requirements.txt in modern packaging tools like Poetry, Flit, Hatch, and modern Setuptools.",
    hint: "Modern standardized TOML configuration for dependencies (PEP 621).",
    level: "moderate",
    codeExample: "# [project]\n# dependencies = ['fastapi>=0.110.0', 'pydantic>=2.6.0']"
  },
  {
    question: "How do you generate SHA-256 package hashes in requirements.txt for tamper-proof security?",
    shortAnswer: "python -m pip hash package.whl or using 'pip-compile --generate-hashes'",
    explanation: "Hashes guarantee that the exact binary downloaded in CI matches the tested package byte-for-byte.",
    hint: "Use pip-compile --generate-hashes.",
    level: "complex",
    codeExample: "requests==2.31.0 --hash=sha256:942c5a53f693d4..."
  },
  {
    question: "What happens if a package in requirements.txt specifies conflicting version constraints with another package?",
    shortAnswer: "pip's backtracking resolver attempts to find a compatible combination or raises 'ResolutionImpossible' if no solution exists.",
    explanation: "Prevents installing broken dependency trees.",
    hint: "Backtracking resolver resolves or raises ResolutionImpossible.",
    level: "complex",
    codeExample: "# Pip catches version conflicts during resolution"
  },
  {
    question: "Why should production requirements files always use exact version pinning (==)?",
    shortAnswer: "To guarantee 100% deterministic, reproducible builds and prevent an unexpected third-party update from crashing live production servers.",
    explanation: "Unpinned versions can silently pull new breaking changes during server restarts.",
    hint: "Guarantees reproducible deployments and prevents unexpected breaking changes.",
    level: "basic",
    codeExample: "requests==2.31.0  # Exact pin"
  },
  {
    question: "Can requirements.txt specify extra optional feature sets of a package (e.g. 'uvicorn[standard]')?",
    shortAnswer: "Yes: package_name[extra_name]==1.0.0",
    explanation: "Extras install optional companion dependencies (e.g. uvicorn[standard] installs uvloop, httptools, and websockets).",
    hint: "Use brackets for optional extras: package[extra].",
    level: "basic",
    codeExample: "uvicorn[standard]==0.27.1\nfastapi[all]==0.110.0"
  },
  {
    question: "How do you ignore package dependencies already installed globally when installing from requirements.txt?",
    shortAnswer: "python -m pip install --ignore-installed -r requirements.txt (or -I)",
    explanation: "Forces re-installation of all requirements into the current location regardless of existing versions.",
    hint: "Use --ignore-installed or -I flag.",
    level: "moderate",
    codeExample: "python -m pip install --ignore-installed -r requirements.txt"
  },
  {
    question: "What is the difference between a Lockfile (like poetry.lock) and a simple requirements.txt?",
    shortAnswer: "A lockfile pins every single direct AND transitive dependency with exact versions, cryptographic hashes, and platform markers for 100% byte-exact reproducibility.",
    explanation: "Lockfiles eliminate any ambiguity during automated deployment.",
    hint: "Lockfiles contain exact dependency graphs with hashes.",
    level: "moderate",
    codeExample: "# Lockfiles guarantee byte-for-byte identical installations"
  },
  {
    question: "How can you programmatically parse a requirements.txt file in Python code?",
    shortAnswer: "Use standard regex/string parsing or the 'pkg_resources.parse_requirements' / 'packaging.requirements.Requirement' library.",
    explanation: "The standard 'packaging' library provides a robust parser for PEP 508 dependency strings.",
    hint: "Use packaging.requirements.Requirement(line).",
    level: "complex",
    codeExample: "from packaging.requirements import Requirement\nreq = Requirement('requests>=2.0.0; sys_platform == \"win32\"')\nprint(req.name, req.specifier, req.marker)"
  },
  {
    question: "How do you upgrade all packages in a requirements.txt file to their latest allowed versions?",
    shortAnswer: "python -m pip install --upgrade -r requirements.txt",
    explanation: "Evaluates constraints in the file and installs the highest matching version from PyPI.",
    hint: "Use python -m pip install --upgrade -r requirements.txt.",
    level: "basic",
    codeExample: "python -m pip install --upgrade -r requirements.txt"
  },
  {
    question: "What is the complete end-to-end industry standard workflow for dependency management?",
    shortAnswer: "1. Maintain direct dependencies in requirements.in (or pyproject.toml); 2. Compile locked requirements.txt via pip-compile; 3. Install in isolated venv; 4. Verify in CI with pip check & pip-audit.",
    explanation: "Combines human-readable intent with machine-deterministic security.",
    hint: "Author requirements.in -> Compile with pip-tools -> Install in venv -> Audit in CI.",
    level: "basic",
    codeExample: "# requirements.in -> pip-compile -> requirements.txt -> pip install -> pip-audit"
  }
];

export default questions;
