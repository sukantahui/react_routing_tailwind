// src/components/study/python/topics/002_009_modules-packages/topic6_files/topic6_questions.js
// Comprehensive Master Review Questions for Topic 6: Relative vs absolute imports in packages

const questions = [
  {
    question: "What is the core syntactic difference between an absolute import and an explicit relative import?",
    shortAnswer: "Absolute imports specify the full path starting from the project root (e.g. from app.services.billing import calc); explicit relative imports use leading dots based on current location (e.g. from . import calc).",
    explanation: "Absolute imports resolve from sys.path root; relative imports resolve relative to the current module's package location.",
    hint: "Absolute uses full project path; Relative uses leading dots (., ..).",
    level: "basic",
    codeExample: "# Absolute: from my_app.core.config import SETTINGS\n# Relative: from ..core.config import SETTINGS"
  },
  {
    question: "What do single dot (.), double dot (..), and triple dot (...) mean in explicit relative imports?",
    shortAnswer: "'.' represents the current package directory; '..' represents the parent package directory (1 level up); '...' represents the grandparent directory (2 levels up).",
    explanation: "Each additional dot moves one level up the package directory hierarchy.",
    hint: ". = current folder, .. = parent folder, ... = grandparent folder.",
    level: "basic",
    codeExample: "# from . import sibling\n# from ..auth import login\n# from ...core import settings"
  },
  {
    question: "Why were implicit relative imports (e.g. 'import sibling_module' without a dot) removed in Python 3?",
    shortAnswer: "Because they caused confusing shadowing bugs where a local file (e.g. string.py) silently overrode a standard library module of the same name.",
    explanation: "Python 3 mandates explicit dots for relative imports (from . import sibling) to ensure local files are never imported by mistake.",
    hint: "To prevent local files from silently shadowing standard library modules.",
    level: "moderate",
    codeExample: "# Python 2 (Implicit): import helper\n# Python 3 (Explicit): from . import helper"
  },
  {
    question: "Why does running 'python pkg/sub/module.py' directly from the terminal cause 'ImportError: attempted relative import with no known parent package'?",
    shortAnswer: "Because direct execution sets __name__ = '__main__' and __package__ = None; Python has no knowledge of the module's parent package context.",
    explanation: "Relative imports require __package__ to determine which folder '..' refers to. When __package__ is None, relative imports fail immediately.",
    hint: "__package__ is None during direct script execution.",
    level: "complex",
    codeExample: "# Direct run fails: python my_pkg/sub/file.py\n# Fix with -m:      python -m my_pkg.sub.file"
  },
  {
    question: "How does the '-m' flag (python -m pkg.sub.module) solve the relative import error?",
    shortAnswer: "It executes the module from the project root while preserving its full package context, setting __package__ = 'pkg.sub' so relative imports resolve correctly.",
    explanation: "Running with -m allows files with relative imports to function as executable CLI entry points without crashing.",
    hint: "Preserves package context and populates __package__ properly.",
    level: "moderate",
    codeExample: "# Terminal from project root:\n# python -m app.services.billing.calculator"
  },
  {
    question: "What is PEP 8's recommendation regarding absolute vs relative imports?",
    shortAnswer: "PEP 8 recommends absolute imports for clarity and better error messages, but accepts explicit relative imports for complex internal package layouts.",
    explanation: "Absolute imports are unambiguous and immediately tell developers where the module resides in the codebase.",
    hint: "Absolute imports are preferred by PEP 8, but explicit relative imports are accepted.",
    level: "basic",
    codeExample: "# PEP 8 preferred:\nfrom my_app.services.auth import verify_token"
  },
  {
    question: "Why do standalone reusable library authors often prefer explicit relative imports for internal package references?",
    shortAnswer: "Because relative imports make the library self-contained; if the library is renamed (e.g. from toolkit_v1 to toolkit_v2), zero internal import statements need to be changed.",
    explanation: "Internal relative imports provide complete refactoring portability across different environments and packaging namespaces.",
    hint: "Allows renaming the top-level package without breaking internal imports.",
    level: "moderate",
    codeExample: "# Inside library:\nfrom ..core.math_utils import fast_gcd  # Completely portable!"
  },
  {
    question: "What is the 'Dot Madness' anti-pattern in relative imports?",
    shortAnswer: "Using excessively deep relative imports with 4 or more dots (e.g. from .....core.models import User), which is fragile and hard to count.",
    explanation: "If you need to navigate more than 2 levels up, use an absolute import for readability.",
    hint: "Excessive dots (.....) make code unreadable and fragile.",
    level: "basic",
    codeExample: "# BAD:  from .....shared.models import User\n# GOOD: from my_app.shared.models import User"
  },
  {
    question: "Can you use relative imports from within a top-level script (a script that is not inside any package)?",
    shortAnswer: "No. Relative imports can ONLY be used inside modules that reside within a package.",
    explanation: "A top-level script has no parent package to navigate relative to.",
    hint: "No, relative imports require a package context.",
    level: "basic",
    codeExample: "# In main.py (root level):\n# from . import utils  <- Crashes with ImportError!"
  },
  {
    question: "How does the PYTHONPATH environment variable affect absolute import resolution?",
    shortAnswer: "PYTHONPATH adds additional directory paths to sys.path, allowing absolute imports from those directories regardless of the current working directory.",
    explanation: "Setting PYTHONPATH to the project root ensures all 'from app.services import ...' statements resolve anywhere.",
    hint: "Adds project directories to sys.path for absolute import resolution.",
    level: "basic",
    codeExample: "# export PYTHONPATH=/path/to/project_root"
  },
  {
    question: "Can an __init__.py file use explicit relative imports to elevate submodule APIs?",
    shortAnswer: "Yes. Using 'from .submodule import ClassName' inside __init__.py is standard industry best practice for API elevation.",
    explanation: "Relative imports inside __init__.py ensure the package remains portable even if renamed.",
    hint: "Yes, 'from .submodule import Class' is standard in __init__.py.",
    level: "basic",
    codeExample: "# In my_pkg/__init__.py:\nfrom .calculator import TaxCalculator\nfrom .invoices import generate_pdf"
  },
  {
    question: "What happens if a relative import tries to navigate beyond the top-level package (e.g. 'from .... import x' when only 2 levels exist)?",
    shortAnswer: "Raises 'ImportError: attempted relative import beyond top-level package'.",
    explanation: "Python prevents relative imports from escaping the top-level package boundaries.",
    hint: "Raises 'attempted relative import beyond top-level package'.",
    level: "moderate",
    codeExample: "# If package is only 2 levels deep, 4 dots crashes"
  },
  {
    question: "Is 'import .module' valid Python syntax?",
    shortAnswer: "No. Relative import syntax requires the 'from .module import ...' form (SyntaxError: invalid syntax).",
    explanation: "The 'import .module' form is syntactically disallowed in Python.",
    hint: "Must use 'from .module import ...' instead of 'import .module'.",
    level: "basic",
    codeExample: "# INVALID: import .helper\n# VALID:   from . import helper"
  },
  {
    question: "How do IDEs and refactoring tools handle relative vs absolute imports during directory restructuring?",
    shortAnswer: "Moving a file often breaks relative dot imports (.. changes to ...), whereas absolute imports remain valid unless the package name itself changes.",
    explanation: "Modern IDEs (VS Code, PyCharm) can automatically rewrite both, but absolute imports are less prone to manual error during file reorganization.",
    hint: "Absolute imports remain stable when files move within the same package structure.",
    level: "moderate",
    codeExample: "# Absolute imports don't need dot count adjustments"
  },
  {
    question: "What is the __package__ attribute of a module in Python?",
    shortAnswer: "A string containing the dot-separated package hierarchy of the module (e.g. 'app.services.billing').",
    explanation: "CPython uses __package__ to calculate the target directory for relative imports.",
    hint: "Stores the package hierarchy string used for relative imports.",
    level: "complex",
    codeExample: "import sys\nprint(__package__)  # e.g. 'app.services.billing'"
  },
  {
    question: "Can relative imports be used to import functions, classes, and variables equally?",
    shortAnswer: "Yes. 'from .module import func, MyClass, MY_CONSTANT' imports all identifier types identically.",
    explanation: "Relative imports work for any symbol in the target module's global namespace.",
    hint: "Yes, functions, classes, and constants are all supported.",
    level: "basic",
    codeExample: "from .models import Student, DEFAULT_FEE, calculate_gpa"
  },
  {
    question: "Why do application frameworks like FastAPI and Django overwhelmingly favor absolute imports?",
    shortAnswer: "Because application code is usually deployed under a known fixed project root where clarity, grep-searchability, and tooling support are prioritized over library portability.",
    explanation: "Grep-searching 'from app.models.user import User' finds every usage across a million-line enterprise codebase instantly.",
    hint: "Provides grep-searchability and unambiguous clarity in large enterprise codebases.",
    level: "moderate",
    codeExample: "# from my_django_app.users.models import UserProfile"
  },
  {
    question: "How do you import everything from a sibling module using relative syntax?",
    shortAnswer: "from .sibling import *",
    explanation: "Imports all symbols (governed by __all__) from the sibling file in the same directory.",
    hint: "from .sibling import *",
    level: "basic",
    codeExample: "from .constants import *"
  },
  {
    question: "What is the difference between 'from . import sibling' vs 'from .sibling import my_func'?",
    shortAnswer: "'from . import sibling' imports the module object 'sibling' into local scope; 'from .sibling import my_func' imports the specific function 'my_func' directly.",
    explanation: "Importing the module object requires calling 'sibling.my_func()', which can prevent circular import deadlocks.",
    hint: "First imports module object; second imports specific function.",
    level: "basic",
    codeExample: "# Option 1: from . import billing; billing.calc()\n# Option 2: from .billing import calc; calc()"
  },
  {
    question: "Can you alias imported symbols in relative imports?",
    shortAnswer: "Yes: from ..auth import verify_token as check_auth",
    explanation: "The 'as' keyword works identically for both relative and absolute imports.",
    hint: "Use 'as' for aliasing in relative imports.",
    level: "basic",
    codeExample: "from .legacy_calc import compute as fast_compute"
  },
  {
    question: "Why should developers never manually append sys.path.append('..') to work around relative import issues?",
    shortAnswer: "Because hacking sys.path destroys module search determinism, causes duplicate module loading in sys.modules, and breaks production packaging.",
    explanation: "Use proper package execution ('python -m') or standard absolute imports instead of sys.path mutations.",
    hint: "sys.path hacking creates duplicate module instances and breaks deployment.",
    level: "moderate",
    codeExample: "# ANTI-PATTERN: sys.path.append('..')\n# BEST PRACTICE: python -m app.sub.file"
  },
  {
    question: "What does 'from .. import *' do?",
    shortAnswer: "It imports all public symbols from the parent package's __init__.py file into the current module.",
    explanation: "Evaluates the parent package's __init__.py and imports its __all__ exports.",
    hint: "Imports all symbols from parent package's __init__.py.",
    level: "moderate",
    codeExample: "from .. import *"
  },
  {
    question: "How do pytest test runners handle relative imports inside package test directories?",
    shortAnswer: "pytest automatically adds the project root to sys.path, allowing tests to use both absolute and relative imports cleanly.",
    explanation: "Running 'pytest' from the project root maintains full package context across all test files.",
    hint: "pytest auto-configures sys.path from the project root.",
    level: "basic",
    codeExample: "# Running 'pytest' executes tests with proper package context"
  },
  {
    question: "Can relative imports cause circular dependencies?",
    shortAnswer: "Yes, exactly like absolute imports if two sibling modules import each other at the top level.",
    explanation: "Relative syntax does not change Python's import execution lifecycle; circular imports must still be broken via deferred imports or shared common modules.",
    hint: "Yes, circular import rules apply equally to relative imports.",
    level: "moderate",
    codeExample: "# Resolve circular imports by moving shared symbols to common.py"
  },
  {
    question: "What is the definitive rule of thumb for choosing between relative and absolute imports in a project?",
    shortAnswer: "Use explicit relative imports for sibling/parent files within self-contained reusable libraries; use absolute imports for cross-domain features in application projects and web backends.",
    explanation: "This rule gives libraries maximum portability while giving applications maximum clarity and maintainability.",
    hint: "Relative for self-contained libraries; Absolute for application code.",
    level: "basic",
    codeExample: "# Libraries: from . import models\n# Applications: from app.services.users import UserService"
  }
];

export default questions;
