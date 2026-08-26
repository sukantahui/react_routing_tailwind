// src/components/study/python/topics/004_004_capstone-projects/topic0_files/topic0_questions.js
// Comprehensive Master Review Questions for Topic 0: End-to-End project architecture & clean directory layout

const questions = [
  {
    question: "What is the 'src/ layout' in Python project architecture and why is it superior to a flat layout?",
    shortAnswer: "The 'src/ layout' places all source packages inside a 'src/' subfolder (e.g. 'src/my_pkg/'), which prevents Python from accidentally importing local uninstalled development files when running test runners or CLI tools from the repository root, guaranteeing import parity with production installations.",
    explanation: "Import isolation and package testing parity provided by src/ layout.",
    hint: "Puts code inside src/ to prevent tests from accidentally importing local uninstalled modules.",
    level: "basic",
    codeExample: "# Project root:\nmy_project/src/my_app/__init__.py\nmy_project/tests/test_app.py"
  },
  {
    question: "What is the purpose of 'pyproject.toml' in modern Python development (PEP 517/518/621)?",
    shortAnswer: "'pyproject.toml' is the standardized, unified configuration file for Python packaging, specifying build backends (Hatch, Flit, Setuptools), project metadata (name, version, dependencies), entrypoint CLI scripts, and tool configurations (pytest, ruff, black, mypy, coverage).",
    explanation: "Modern centralized Python packaging and tooling standard.",
    hint: "Replaces setup.py, setup.cfg, and requirements.txt with a single standardized TOML manifest.",
    level: "basic",
    codeExample: "[project]\nname = 'campus-manager'\nversion = '1.0.0'\ndependencies = ['pydantic>=2.0']"
  },
  {
    question: "What is the function of '__all__' inside a package's '__init__.py' file?",
    shortAnswer: "'__all__' is a list of strings that explicitly defines the public API of the package, controlling exactly which symbols and classes are exported when a user writes 'from my_package import *'.",
    explanation: "Explicit public namespace export control via __all__.",
    hint: "__all__ = ['Student', 'AdmissionEngine'] defines the public exports for wildcard imports.",
    level: "basic",
    codeExample: "# src/my_package/__init__.py\n__all__ = ['StudentProfile', 'calculate_fee']"
  },
  {
    question: "What does '__main__.py' do inside a Python package directory?",
    shortAnswer: "'__main__.py' serves as the default entry point when a package is executed directly via Python's module flag: 'python -m <package_name>'.",
    explanation: "Executable package entry point convention.",
    hint: "Allows executing the package directly from terminal using python -m my_package.",
    level: "basic",
    codeExample: "# Allows: python -m my_app"
  },
  {
    question: "Why should you separate 'repositories/' (data persistence) from 'services/' (business logic) in layered architecture?",
    shortAnswer: "Separation of concerns allows business calculation rules (services) to remain pure and independent of database choices (repositories), enabling easy unit testing without database dependencies and effortless swapping of storage engines (e.g. SQLite to PostgreSQL).",
    explanation: "Architectural decoupling and repository pattern benefits.",
    hint: "Services handle business calculations; repositories handle database reading/writing.",
    level: "moderate",
    codeExample: "# Service: calculates discount | Repository: saves student to SQLite table"
  },
  {
    question: "What essential files must be present at the root of every professional Python repository?",
    shortAnswer: "1. 'pyproject.toml' (build/metadata), 2. 'README.md' (documentation/quickstart), 3. 'LICENSE' (open source legal license), 4. '.gitignore' (ignoring virtual environments, pycache, .env), and 5. '.env.example' (template for environment variables).",
    explanation: "Standard root repository manifest artifacts.",
    hint: "pyproject.toml, README.md, LICENSE, .gitignore, and .env.example.",
    level: "basic",
    codeExample: "# Root manifest files for open-source and enterprise repositories"
  },
  {
    question: "How does the 12-Factor App methodology recommend handling environment configuration in Python?",
    shortAnswer: "Store configuration that varies across deployment environments (database URLs, API keys, secret tokens, debug flags) in Environment Variables rather than hardcoding them in Python source code.",
    explanation: "Decoupling configuration from code according to 12-Factor principles.",
    hint: "Use environment variables (loaded via .env or os.environ) instead of hardcoding secrets.",
    level: "moderate",
    codeExample: "DATABASE_URL = os.environ.get('DATABASE_URL', 'sqlite:///dev.db')"
  },
  {
    question: "What is the difference between relative imports ('from .models import Student') and absolute imports ('from my_pkg.models import Student')?",
    shortAnswer: "Relative imports navigate based on current module location in the package hierarchy (using dots '.'); absolute imports specify the full path starting from the package root, which is generally preferred for clarity and refactoring stability.",
    explanation: "Relative vs absolute import semantics in Python packages.",
    hint: "Absolute imports specify the full package path; relative imports use dot notation.",
    level: "moderate",
    codeExample: "from my_package.models.student import Student # Absolute (Preferred)"
  },
  {
    question: "What entries should always be included in a Python '.gitignore' file?",
    shortAnswer: "'.venv/', 'venv/', '__pycache__/', '*.pyc', '.pytest_cache/', '.coverage', 'htmlcov/', '.mypy_cache/', '.ruff_cache/', 'dist/', 'build/', and '.env' (to prevent secret leaks).",
    explanation: "Standard gitignore entries for Python repositories.",
    hint: "Virtual environments, bytecode pycache, test coverage caches, and sensitive .env files.",
    level: "basic",
    codeExample: "# .gitignore\n__pycache__/\n.venv/\n.env\n.coverage"
  },
  {
    question: "How do you create an editable install of your local package for development?",
    shortAnswer: "Run 'pip install -e .' (or 'pip install --editable .') from the project root containing 'pyproject.toml', which links the package to your virtual environment so code edits take effect immediately without reinstalling.",
    explanation: "Editable development mode installation.",
    hint: "pip install -e . installs the current project in editable mode.",
    level: "basic",
    codeExample: "pip install -e ."
  },
  {
    question: "What is the purpose of configuring '[project.scripts]' in 'pyproject.toml'?",
    shortAnswer: "It defines command-line console scripts (CLI commands) that pip automatically installs into the environment's bin/Scripts path (e.g. 'campus-cli = \"my_pkg.cli:main\"').",
    explanation: "Automated CLI executable entrypoint generation.",
    hint: "Creates terminal commands that run Python functions directly (e.g. campus-cli).",
    level: "moderate",
    codeExample: "[project.scripts]\ncampus-cli = 'my_package.cli.main:run_cli'"
  },
  {
    question: "Why should you never commit your '.env' file containing real API keys or passwords to Git?",
    shortAnswer: "Committing '.env' leaks sensitive credentials (database passwords, payment API tokens) into Git history, creating severe security vulnerabilities and credential compromise.",
    explanation: "Secret protection and git security hygiene.",
    hint: "Committing .env leaks passwords to Git history; always add .env to .gitignore.",
    level: "basic",
    codeExample: "# Add .env to .gitignore and commit .env.example with dummy placeholders"
  },
  {
    question: "What is the role of a 'dataclass' in structuring application configuration?",
    shortAnswer: "A frozen dataclass (e.g. '@dataclass(frozen=True)') provides a strongly-typed, immutable, self-documenting configuration container that validates and holds parsed environment variables.",
    explanation: "Type-safe immutable configuration container pattern.",
    hint: "Provides a strongly typed, immutable container for environment variables.",
    level: "moderate",
    codeExample: "@dataclass(frozen=True)\nclass AppConfig:\n    db_path: str\n    debug_mode: bool = False"
  },
  {
    question: "How should the 'tests/' directory be structured in relation to the 'src/' directory?",
    shortAnswer: "'tests/' should sit alongside 'src/' at the project root, mirroring the sub-package structure of 'src/' and separated into 'unit/' (fast, isolated tests) and 'integration/' (database/API tests).",
    explanation: "Test directory organization mirroring source code packages.",
    hint: "tests/ sits at the root next to src/ with conftest.py and unit/integration folders.",
    level: "basic",
    codeExample: "tests/unit/test_models.py\ntests/integration/test_db.py"
  },
  {
    question: "What is the difference between 'requirements.txt' and dependencies in 'pyproject.toml'?",
    shortAnswer: "'pyproject.toml' declares abstract library dependencies (e.g. 'requests>=2.31.0') required for the package to function; 'requirements.txt' (or lockfiles like poetry.lock/Pipfile.lock) pins exact concrete versions for reproducible deployment environments.",
    explanation: "Abstract library dependencies vs concrete deployment pins.",
    hint: "pyproject.toml defines minimum package requirements; requirements.txt pins exact build versions.",
    level: "moderate",
    codeExample: "# pyproject.toml: requests>=2.30 | requirements.txt: requests==2.31.0"
  },
  {
    question: "What is a 'Virtual Environment' (.venv) and why must every project have its own isolated environment?",
    shortAnswer: "A virtual environment isolates project dependencies, preventing version conflicts between different Python projects and avoiding polluting the global system Python installation.",
    explanation: "Dependency isolation via virtual environments.",
    hint: "Prevents dependency version conflicts between different projects.",
    level: "basic",
    codeExample: "python -m venv .venv && source .venv/bin/activate"
  },
  {
    question: "What is the purpose of 'conftest.py' in the root of the 'tests/' directory?",
    shortAnswer: "It acts as the central fixture configuration root for PyTest, automatically sharing global test fixtures (e.g. mock databases, test clients) across all test subdirectories without requiring explicit imports.",
    explanation: "Central fixture sharing root in tests.",
    hint: "Provides shared fixtures to all test files across the tests/ directory.",
    level: "basic",
    codeExample: "# tests/conftest.py\n@pytest.fixture\ndef mock_db(): return MemoryDB()"
  },
  {
    question: "How do you define optional dependency groups (extras) in 'pyproject.toml' (e.g. dev, test, docs)?",
    shortAnswer: "Under the '[project.optional-dependencies]' table, defining groups like 'dev = [\"pytest\", \"ruff\", \"mypy\", \"pytest-cov\"]', which users can install via 'pip install -e .[dev]'.",
    explanation: "Optional extras and development dependency grouping in pyproject.toml.",
    hint: "Use [project.optional-dependencies] with groups like dev = ['pytest', 'ruff'].",
    level: "moderate",
    codeExample: "[project.optional-dependencies]\ndev = ['pytest>=8.0', 'pytest-cov>=5.0']"
  },
  {
    question: "What is 'Circular Import' in Python and how does clean architecture prevent it?",
    shortAnswer: "A circular import occurs when Module A imports Module B while Module B imports Module A during module initialization; clean layered architecture prevents this by enforcing strict one-directional dependency flows (e.g. Services -> Repositories -> Models).",
    explanation: "Circular dependency hazards and strict one-directional layering.",
    hint: "When module A imports B and B imports A; prevented by strict one-way layer dependencies.",
    level: "complex",
    codeExample: "# Enforce: controllers -> services -> repositories -> models (Never backwards!)"
  },
  {
    question: "What is the ultimate golden rule of professional Python project architecture?",
    shortAnswer: "Use the 'src/' layout, centralize configuration in 'pyproject.toml', enforce strict one-directional tiered layering (models -> repositories -> services -> interfaces), isolate secrets in '.env', and test continuously in editable mode.",
    explanation: "The complete enterprise Python project architecture standard.",
    hint: "src/ layout + pyproject.toml + layered architecture + .env secret isolation.",
    level: "basic",
    codeExample: "# Enterprise Python Architecture Standard"
  }
];

export default questions;
