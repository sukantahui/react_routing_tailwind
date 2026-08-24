// src/components/study/python/topics/002_009_modules-packages/topic0_files/topic0_questions.js
// Comprehensive Master Review Questions for Topic 0: import & from-import syntax variations

const questions = [
  {
    question: "What is the difference between 'import math' and 'from math import sqrt' in Python?",
    shortAnswer: "'import math' imports the entire module object requiring 'math.sqrt()' to access functions; 'from math import sqrt' binds 'sqrt' directly into the current namespace.",
    explanation: "'import math' maintains a clear namespace boundary preventing naming collisions. 'from math import sqrt' allows calling 'sqrt()' directly without the 'math.' prefix.",
    hint: "'import math' requires prefix; 'from math import sqrt' gives direct access.",
    level: "basic",
    codeExample: "import math\nprint(math.sqrt(16))  # 4.0\n\nfrom math import sqrt\nprint(sqrt(16))       # 4.0"
  },
  {
    question: "Why is 'from module import *' (wildcard import) considered a serious anti-pattern in production Python code?",
    shortAnswer: "It causes namespace pollution, silent variable shadowing, degrades code readability, and confuses static analysis linters and IDEs.",
    explanation: "If two modules both define a function with the same name, the second wildcard import silently overwrites the first. Additionally, it becomes impossible for developers to determine where a function originated.",
    hint: "Pollutes the namespace and silently shadows variables.",
    level: "basic",
    codeExample: "# BAD (Wildcard):\nfrom math import *\n# GOOD (Explicit):\nfrom math import pi, sqrt"
  },
  {
    question: "What does the 'as' keyword do during an import?",
    shortAnswer: "It assigns a custom local alias to the imported module or symbol: e.g. 'import datetime as dt' or 'from math import sqrt as square_root'.",
    explanation: "Aliasing is standard practice for shortening long module names (e.g. np, pd, plt) or resolving naming collisions between local variables and imported functions.",
    hint: "'as' creates a local alias name.",
    level: "basic",
    codeExample: "import datetime as dt\nprint(dt.date.today())"
  },
  {
    question: "What is the 4-step lifecycle Python executes when an 'import my_module' statement runs?",
    shortAnswer: "1. Checks sys.modules in-memory cache -> 2. Searches sys.path directories -> 3. Compiles source into bytecode (.pyc in __pycache__/) -> 4. Executes module code in a new namespace.",
    explanation: "If the module is already present in sys.modules, Python immediately returns the cached module object without searching disk or recompiling.",
    hint: "Cache check -> path search -> bytecode compilation -> execution.",
    level: "moderate",
    codeExample: "import sys\n# Check if math is cached:\nprint('math' in sys.modules)  # True"
  },
  {
    question: "What is the global sys.modules dictionary in Python?",
    shortAnswer: "It is an in-memory cache mapping loaded module name strings to their corresponding module objects.",
    explanation: "Whenever any module is imported anywhere in the application, Python registers it in sys.modules to guarantee that each module is executed only once per process.",
    hint: "The internal runtime cache of all imported modules.",
    level: "moderate",
    codeExample: "import sys, math\nprint(sys.modules['math'] is math)  # True"
  },
  {
    question: "What are .pyc files and why does Python create a __pycache__ directory?",
    shortAnswer: ".pyc files contain compiled CPython bytecode; __pycache__ stores them to accelerate startup times by skipping the parsing phase on subsequent runs.",
    explanation: "If the source .py file hasn't changed since the .pyc file was generated, Python loads the bytecode directly, drastically reducing import latency.",
    hint: "Stores pre-compiled bytecode to speed up program startup.",
    level: "basic",
    codeExample: "# Automatically managed by CPython interpreter in __pycache__/"
  },
  {
    question: "How can you dynamically import a module whose name is stored in a string variable at runtime?",
    shortAnswer: "Use importlib.import_module(module_name_string)",
    explanation: "The standard library 'importlib' provides programmatic import tools ideal for plugin architectures and configuration-driven loading.",
    hint: "Use importlib.import_module('module_name').",
    level: "moderate",
    codeExample: "import importlib\nmod_name = 'json'\njson_lib = importlib.import_module(mod_name)\nprint(json_lib.dumps({'status': 'ok'}))"
  },
  {
    question: "What is a Circular Import in Python and why does it cause an ImportError?",
    shortAnswer: "When module A imports module B, and module B simultaneously imports module A at top-level, creating a circular dependency cycle where attributes are referenced before initialization.",
    explanation: "Python pauses module A midway to initialize module B. When module B attempts to import a symbol from module A that hasn't executed yet, Python raises 'ImportError: cannot import name from partially initialized module'.",
    hint: "Mutual top-level import dependency creates an uninitialized cycle.",
    level: "moderate",
    codeExample: "# module_a.py: from module_b import func_b\n# module_b.py: from module_a import func_a"
  },
  {
    question: "What are the three standard solutions to resolve a circular import in Python?",
    shortAnswer: "1. Deferred/local imports inside functions; 2. Architectural refactoring (extracting shared models into a common module); 3. Importing the module instead of specific symbols.",
    explanation: "Extracting shared data structures and types into a standalone 'models.py' or 'common.py' transforms circular dependencies into a clean Directed Acyclic Graph (DAG).",
    hint: "Local imports, common module extraction, or full module imports.",
    level: "moderate",
    codeExample: "# Solution 1 (Deferred import inside function):\ndef my_function():\n    import service_b\n    service_b.do_work()"
  },
  {
    question: "How do you reload a module at runtime after modifying its source file on disk?",
    shortAnswer: "Use importlib.reload(module_object)",
    explanation: "Calling 'import module' again will only return the existing cached object in sys.modules. importlib.reload() forces CPython to re-read and re-execute the file from disk.",
    hint: "Use importlib.reload(mod).",
    level: "moderate",
    codeExample: "import importlib, math\nimportlib.reload(math)"
  },
  {
    question: "What is the recommended import ordering convention according to PEP 8?",
    shortAnswer: "1. Standard library imports -> 2. Related third-party imports -> 3. Local application/library specific imports, separated by blank lines.",
    explanation: "Grouping imports into these three distinct blocks makes dependencies transparent and avoids coupling standard modules with third-party packages.",
    hint: "Standard library -> Third-party -> Local modules.",
    level: "basic",
    codeExample: "# 1. Standard Library\nimport sys\nimport os\n\n# 2. Third-Party\n# import requests\n# import pandas as pd\n\n# 3. Local Application\n# from my_project import utils"
  },
  {
    question: "Does importing a module multiple times execute its top-level code multiple times?",
    shortAnswer: "No. Python executes a module's top-level statements only once per process when it is first loaded.",
    explanation: "Subsequent import statements retrieve the module object directly from the in-memory sys.modules dictionary.",
    hint: "Module top-level code executes only once per process.",
    level: "basic",
    codeExample: "# First import executes module; subsequent imports fetch from cache"
  },
  {
    question: "How do you import multiple symbols from a single module across multiple lines?",
    shortAnswer: "Enclose the imported symbols in parentheses: from module import (Symbol1, Symbol2, Symbol3)",
    explanation: "Parentheses allow multi-line PEP-8 compliant imports without needing backslash line continuation characters.",
    hint: "Use parentheses around the imported symbols.",
    level: "basic",
    codeExample: "from decimal import (\n    Decimal,\n    ROUND_HALF_UP,\n    ROUND_DOWN\n)"
  },
  {
    question: "What error is raised if you attempt to import a module that does not exist on sys.path?",
    shortAnswer: "ModuleNotFoundError: No module named 'xyz'",
    explanation: "In Python 3.6+, ModuleNotFoundError is a specific subclass of ImportError raised when a module cannot be found.",
    hint: "Raises ModuleNotFoundError.",
    level: "basic",
    codeExample: "try:\n    import non_existent_module_9402\nexcept ModuleNotFoundError as e:\n    print(e)  # No module named 'non_existent_module_9402'"
  },
  {
    question: "What happens if a module has an unhandled exception in its top-level code during import?",
    shortAnswer: "The import statement fails, the exception propagates, and the module is NOT successfully registered in sys.modules.",
    explanation: "Any code at the global module level executes during import. If it crashes, the importing script crashes immediately unless wrapped in a try/except block.",
    hint: "Top-level errors crash the import process.",
    level: "basic",
    codeExample: "# Top-level runtime errors abort the import"
  },
  {
    question: "How do you check all available attributes, classes, and functions inside an imported module?",
    shortAnswer: "dir(module_name)",
    explanation: "The built-in dir() function returns a sorted list of all valid attribute names defined in the module's namespace.",
    hint: "Use dir(module).",
    level: "basic",
    codeExample: "import math\nprint(dir(math)[:5])  # ['__doc__', '__loader__', '__name__', '__package__', '__spec__']"
  },
  {
    question: "Can you import a function and rename it to resolve a naming collision with a local function?",
    shortAnswer: "Yes: from module import function_name as custom_name",
    explanation: "Aliasing allows you to integrate functions with conflicting names into the same script seamlessly.",
    hint: "Use 'as' to rename the imported function.",
    level: "basic",
    codeExample: "from statistics import mean as calc_avg\nfrom numpy import mean as np_avg"
  },
  {
    question: "What is a module namespace in Python?",
    shortAnswer: "A dictionary (__dict__) containing all variables, functions, classes, and constants defined inside the module.",
    explanation: "Every module object owns an isolated namespace preventing variable names from colliding with other modules.",
    hint: "An isolated dictionary of all symbols defined in the module.",
    level: "moderate",
    codeExample: "import math\nprint(math.__dict__['pi'])  # 3.141592653589793"
  },
  {
    question: "Why should you never name a custom Python file 'math.py', 'random.py', or 'json.py'?",
    shortAnswer: "Because the current directory is first in sys.path, Python will import your custom file instead of the standard library module (Module Shadowing).",
    explanation: "This causes standard library functions to disappear, causing confusing AttributeError exceptions when other modules try to use 'math.sqrt' or 'random.randint'.",
    hint: "Custom files shadow standard library modules of the same name.",
    level: "basic",
    codeExample: "# If you create math.py in project root, 'import math' loads YOUR file!"
  },
  {
    question: "What does the __file__ attribute on a module contain?",
    shortAnswer: "The absolute or relative file path to the module's source code file on disk.",
    explanation: "module.__file__ allows inspecting where Python loaded the module from (except for built-in C extension modules which may have None).",
    hint: "Contains the file path of the loaded module.",
    level: "basic",
    codeExample: "import os\nprint(os.__file__)  # Path to os.py"
  },
  {
    question: "What is the difference between an absolute import and a relative import?",
    shortAnswer: "Absolute imports specify the full path from the project root (e.g. from app.services import user); relative imports use dots relative to current module (e.g. from . import models).",
    explanation: "PEP 8 strongly recommends absolute imports for clarity and portability across package structures.",
    hint: "Absolute imports use full path; relative imports use leading dots.",
    level: "moderate",
    codeExample: "# Absolute: from my_package.utils import helper\n# Relative: from .utils import helper"
  },
  {
    question: "How do you conditionally import a module (e.g. fallback to an alternative library if not installed)?",
    shortAnswer: "Wrap the import in a try/except ModuleNotFoundError block.",
    explanation: "This pattern allows graceful degradation or using faster C libraries when available (e.g. try: import ujson as json except ImportError: import json).",
    hint: "Use try: import x except ModuleNotFoundError: import y.",
    level: "basic",
    codeExample: "try:\n    import ujson as json\nexcept ModuleNotFoundError:\n    import json"
  },
  {
    question: "Can an import statement be placed inside an 'if' condition?",
    shortAnswer: "Yes. Python executes imports at runtime, so conditional imports execute only when the condition evaluates to True.",
    explanation: "Useful for platform-specific code (e.g. if sys.platform == 'win32': import winreg).",
    hint: "Imports can be placed inside if blocks.",
    level: "basic",
    codeExample: "import sys\nif sys.platform == 'win32':\n    # Windows-specific import\n    pass"
  },
  {
    question: "What is the __name__ attribute of an imported module?",
    shortAnswer: "The string name of the module (e.g. 'math', 'my_module').",
    explanation: "When a module is imported, its __name__ is its module name. When run directly as the main script, __name__ is '__main__'.",
    hint: "Equals the module name when imported.",
    level: "basic",
    codeExample: "import math\nprint(math.__name__)  # 'math'"
  },
  {
    question: "How do you prevent certain private helper functions from being imported when someone uses 'from module import *'?",
    shortAnswer: "Define the __all__ list in the module, or prefix private function names with a leading underscore (_helper).",
    explanation: "__all__ = ['public_func'] defines an explicit public export whitelist. Symbols not in __all__ or starting with '_' are excluded from wildcard imports.",
    hint: "Define __all__ = ['func1'] or use leading underscore _private.",
    level: "complex",
    codeExample: "# In module.py:\n__all__ = ['public_api']\ndef public_api(): pass\ndef _private_helper(): pass"
  }
];

export default questions;
