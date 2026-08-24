// src/components/study/python/topics/002_009_modules-packages/topic5_files/topic5_questions.js
// Comprehensive Master Review Questions for Topic 5: Concept of packages & __init__.py files

const questions = [
  {
    question: "What is the primary difference between a Python module and a Python package?",
    shortAnswer: "A module is a single Python file (.py); a package is a directory containing an __init__.py file and multiple modules/subpackages.",
    explanation: "Packages allow grouping related modules together into a structured, dot-separated namespace hierarchy (e.g. package.module).",
    hint: "Module = single .py file; Package = directory with __init__.py.",
    level: "basic",
    codeExample: "# Module: math_utils.py\n# Package: accounting/ (__init__.py, gst.py, invoice.py)"
  },
  {
    question: "What are the three essential roles of the __init__.py file in a Python package?",
    shortAnswer: "1. Package Identifier (marks directory as a package); 2. Package Initialization (runs setup code on import); 3. API Elevation Facade (exposes internal functions at package root).",
    explanation: "While Python 3.3+ allows implicit namespace packages without __init__.py, regular packages use __init__.py to elevate APIs and initialize settings.",
    hint: "Identification, initialization execution, and API elevation facade.",
    level: "basic",
    codeExample: "# Inside my_pkg/__init__.py:\nfrom .calculator import TaxCalculator\n__all__ = ['TaxCalculator']"
  },
  {
    question: "What is 'API Elevation' (the Facade Pattern) in Python package design?",
    shortAnswer: "Importing key classes and functions from internal submodules into __init__.py so consumers can import directly from the top-level package instead of deep subpaths.",
    explanation: "Allows users to write 'from my_pkg import Calculator' instead of 'from my_pkg.services.engines.calc_module import Calculator', hiding internal refactorings.",
    hint: "Exposing internal classes directly at the package root level.",
    level: "moderate",
    codeExample: "# Inside my_package/__init__.py:\nfrom .engine import ProcessEngine\n\n# Consumer can simply write:\n# from my_package import ProcessEngine"
  },
  {
    question: "What is an Implicit Namespace Package (PEP 420) introduced in Python 3.3?",
    shortAnswer: "A package directory that does NOT contain an __init__.py file, allowing a single package namespace to be split across multiple separate directories or physical paths on disk.",
    explanation: "Useful for large monorepos or plugin architectures where different teams deploy components into a shared top-level namespace (e.g. company.auth and company.billing).",
    hint: "A package without __init__.py that can span multiple directories.",
    level: "moderate",
    codeExample: "# Directory 1: /opt/lib1/company/auth.py\n# Directory 2: /opt/lib2/company/billing.py\n# Both share the 'company' namespace without __init__.py"
  },
  {
    question: "When does the code inside a package's __init__.py file execute?",
    shortAnswer: "Exactly once when the package (or any submodule within the package) is first imported into memory during a Python process.",
    explanation: "Subsequent imports retrieve the cached module from sys.modules without re-executing __init__.py.",
    hint: "Executes once upon the first import of the package.",
    level: "basic",
    codeExample: "# First 'import my_pkg' executes __init__.py once"
  },
  {
    question: "How does the __all__ list work when defined inside a package's __init__.py file?",
    shortAnswer: "It defines which submodules, classes, and functions are imported into the local namespace when someone runs 'from my_package import *'.",
    explanation: "Without __all__, 'from my_package import *' does not automatically import submodules unless explicitly imported in __init__.py.",
    hint: "Controls what 'from package import *' exports into the caller namespace.",
    level: "basic",
    codeExample: "# Inside my_package/__init__.py:\n__all__ = ['ClientManager', 'InvoiceEngine']"
  },
  {
    question: "What is a Subpackage in Python?",
    shortAnswer: "A package directory nested inside another package directory, containing its own __init__.py file (e.g. app/services/__init__.py).",
    explanation: "Subpackages enable multi-tier hierarchical architectures: app.services.billing.calculator.",
    hint: "A nested package folder inside a parent package folder.",
    level: "basic",
    codeExample: "# my_app/accounting/gst.py -> from my_app.accounting import gst"
  },
  {
    question: "How do subpackages prevent identifier naming collisions across large development teams?",
    shortAnswer: "By isolating functions inside distinct domain namespaces (e.g. app.accounting.generate_report() vs app.academics.generate_report()).",
    explanation: "Different feature teams can use standard function names without risking accidental overwrites.",
    hint: "Isolates identical function names in separate domain namespaces.",
    level: "basic",
    codeExample: "# app.accounting.get_data() vs app.users.get_data()"
  },
  {
    question: "Can an __init__.py file be completely empty?",
    shortAnswer: "Yes. An empty __init__.py is entirely valid and simply signals to Python that the directory should be treated as a regular package.",
    explanation: "Leaving __init__.py empty is common when submodules are intended to be imported directly without top-level elevation.",
    hint: "An empty __init__.py is completely valid.",
    level: "basic",
    codeExample: "# An empty __init__.py marks the folder as a regular package"
  },
  {
    question: "How do you define a package version string in a standard Python package?",
    shortAnswer: "Set __version__ = '1.0.0' inside the top-level __init__.py file.",
    explanation: "Allows users to inspect package.__version__ at runtime.",
    hint: "Set __version__ = '1.0.0' in __init__.py.",
    level: "basic",
    codeExample: "# In __init__.py:\n__version__ = '2.4.0'"
  },
  {
    question: "How can you implement lazy submodule loading in a package's __init__.py using PEP 562?",
    shortAnswer: "Define a module-level __getattr__(name) function inside __init__.py to import heavy submodules dynamically only when they are accessed.",
    explanation: "Drastically speeds up package import time by deferring heavy imports until the specific submodule is actually called.",
    hint: "Use module-level __getattr__(name) in __init__.py.",
    level: "complex",
    codeExample: "import importlib\ndef __getattr__(name):\n    if name == 'heavy_module':\n        return importlib.import_module('.heavy_module', __name__)\n    raise AttributeError"
  },
  {
    question: "What is the __path__ attribute of a package?",
    shortAnswer: "A list of directory paths that Python searches when looking for submodules within that package.",
    explanation: "Regular packages have a __path__ list containing the package directory; namespace packages have multiple directories listed.",
    hint: "A list of directory paths where the package's submodules live.",
    level: "moderate",
    codeExample: "import json\nprint(json.__path__)  # ['C:\\...\\Lib\\json']"
  },
  {
    question: "Why is importing everything in __init__.py sometimes considered an anti-pattern in massive frameworks?",
    shortAnswer: "Because it forces Python to load and execute every single submodule on initial import, leading to slow startup times and high memory usage.",
    explanation: "In large frameworks, elevate only core public interfaces or use lazy loading for rarely used submodules.",
    hint: "Eagerly loading everything causes slow startup latency.",
    level: "moderate",
    codeExample: "# Elevate only core APIs; don't import all 100 submodules in __init__.py"
  },
  {
    question: "What happens if a directory contains Python files but no __init__.py in Python 3.3+?",
    shortAnswer: "Python treats it as an Implicit Namespace Package.",
    explanation: "Submodules can still be imported (e.g. import my_folder.my_module), but the folder lacks package initialization code.",
    hint: "Treated as a namespace package in Python 3.3+.",
    level: "moderate",
    codeExample: "# Folder without __init__.py functions as a namespace package"
  },
  {
    question: "How do you structure a package to support both 'import my_pkg' and running it from the terminal with 'python -m my_pkg'?",
    shortAnswer: "Place an __init__.py file (for library imports) AND a __main__.py file (for terminal execution) inside the package directory.",
    explanation: "'python -m my_pkg' automatically executes the package's __main__.py file.",
    hint: "Include both __init__.py and __main__.py.",
    level: "moderate",
    codeExample: "# my_pkg/\n# ├── __init__.py\n# └── __main__.py  <- Runs on: python -m my_pkg"
  },
  {
    question: "Can a package contain binary compiled extensions (.pyd or .so files) alongside .py files?",
    shortAnswer: "Yes. CPython imports compiled C extension modules (.pyd on Windows, .so on Linux) within packages just like .py files.",
    explanation: "Libraries like NumPy and OpenCV package compiled C/C++ binaries inside Python package directories for maximum speed.",
    hint: "Yes, packages can bundle compiled C extension modules.",
    level: "basic",
    codeExample: "# my_pkg/fast_math.pyd (Windows) or fast_math.so (Linux)"
  },
  {
    question: "What is the recommended directory structure for a production-ready Python package using modern packaging standards?",
    shortAnswer: "The 'src-layout': project_root/src/my_package/__init__.py, pyproject.toml, README.md, tests/.",
    explanation: "The src-layout prevents local import shadowing during development and guarantees that tests run against the installed package.",
    hint: "Use src/package_name/ with pyproject.toml.",
    level: "moderate",
    codeExample: "# root/\n# ├── pyproject.toml\n# ├── src/\n# │   └── my_pkg/\n# │       └── __init__.py\n# └── tests/"
  },
  {
    question: "How does a package's __file__ attribute differ between regular packages and namespace packages?",
    shortAnswer: "Regular packages have a __file__ pointing to the __init__.py path; namespace packages have __file__ = None.",
    explanation: "Because namespace packages do not have an __init__.py file, they have no single file origin on disk.",
    hint: "Regular has path to __init__.py; namespace has None.",
    level: "complex",
    codeExample: "import json\nprint(json.__file__)  # Ends in __init__.py"
  },
  {
    question: "What is the difference between relative imports inside a package (. vs ..)?",
    shortAnswer: "'.' refers to the current subpackage/directory; '..' refers to the parent package directory one level up.",
    explanation: "'from .module import func' imports from same folder; 'from ..other_pkg import func' goes one folder up.",
    hint: "'.' = current directory, '..' = parent directory.",
    level: "basic",
    codeExample: "# In app/services/billing.py:\n# from .models import Invoice (same folder)\n# from ..auth import verify_user (parent folder)"
  },
  {
    question: "Why does running a script that uses relative imports directly from the terminal (python my_pkg/sub/file.py) raise an ImportError?",
    shortAnswer: "Because Python does not know the parent package context when a script is executed directly (ImportError: attempted relative import with no known parent package).",
    explanation: "To execute a module inside a package with relative imports, run from project root with 'python -m my_pkg.sub.file'.",
    hint: "Run with python -m my_pkg.sub.file to maintain package context.",
    level: "complex",
    codeExample: "# Terminal: python -m my_pkg.sub.file"
  },
  {
    question: "Can an __init__.py file export variables from multiple submodules under different alias names?",
    shortAnswer: "Yes: from .submodule_a import Engine as CoreEngine",
    explanation: "Aliasing inside __init__.py allows creating clean public interfaces while keeping internal file names descriptive.",
    hint: "Use 'from .sub import Symbol as PublicAlias' in __init__.py.",
    level: "basic",
    codeExample: "# In __init__.py:\nfrom .internal_tax_calc import TaxEngine as GSTCalculator"
  },
  {
    question: "What is a Circular Package Dependency and how is it resolved?",
    shortAnswer: "When package A imports package B and package B imports package A; resolved by refactoring shared models into a common base package or using deferred imports.",
    explanation: "Maintaining a Directed Acyclic Graph (DAG) between packages is a core principle of clean architecture.",
    hint: "Break package cycles by extracting shared types into common.",
    level: "moderate",
    codeExample: "# Refactor shared entities into core/ or common/"
  },
  {
    question: "How do you verify if a loaded module object is a package vs a standalone module in Python code?",
    shortAnswer: "Check if hasattr(module, '__path__') is True (packages always have a __path__ attribute).",
    explanation: "Standalone modules do not have __path__, whereas packages (regular and namespace) always do.",
    hint: "Packages have hasattr(mod, '__path__') == True.",
    level: "moderate",
    codeExample: "import json, math\nprint(hasattr(json, '__path__'))  # True (Package)\nprint(hasattr(math, '__path__'))  # False (Module)"
  },
  {
    question: "Why should developers avoid putting complex business logic directly inside __init__.py files?",
    shortAnswer: "Because __init__.py should remain a clean configuration and API elevation facade; placing business logic inside it makes testing and maintenance difficult.",
    explanation: "Place business logic inside dedicated modules (e.g. calculator.py, service.py) and use __init__.py strictly for exports.",
    hint: "Keep __init__.py lean; put logic in dedicated submodules.",
    level: "basic",
    codeExample: "# Keep __init__.py lean (facade only)"
  },
  {
    question: "How does Python handle circular imports when symbols are elevated in __init__.py?",
    shortAnswer: "If submodules import each other from the top-level package while __init__.py is still executing, circular import errors occur; use explicit relative imports from specific sibling files instead.",
    explanation: "Submodules should import from sibling files ('from .sibling import x') rather than importing from the parent package facade ('from my_pkg import x') during initialization.",
    hint: "Submodules should use relative sibling imports rather than importing parent facade.",
    level: "complex",
    codeExample: "# Inside my_pkg/module_a.py:\n# GOOD: from .module_b import func_b\n# BAD:  from my_pkg import func_b"
  }
];

export default questions;
