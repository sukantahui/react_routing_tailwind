// src/components/study/python/topics/002_009_modules-packages/topic1_files/topic1_questions.js
// Comprehensive Master Review Questions for Topic 1: Module search path (sys.path) and module namespace

const questions = [
  {
    question: "What is sys.path in Python?",
    shortAnswer: "A list of directory string paths where Python searches for modules when an 'import' statement is executed.",
    explanation: "When you import a module, Python iterates sequentially through the paths in sys.path until it finds a matching .py, .pyc, or package directory.",
    hint: "The list of directories Python searches during import.",
    level: "basic",
    codeExample: "import sys\nfor path in sys.path:\n    print(path)"
  },
  {
    question: "What is the exact search precedence order of directories in sys.path?",
    shortAnswer: "1. The directory containing the running script (sys.path[0]) -> 2. PYTHONPATH directories -> 3. Standard library directories -> 4. Third-party site-packages directories.",
    explanation: "Because the script's directory is checked first, any local file with the same name as a library module will take priority.",
    hint: "Script directory -> PYTHONPATH -> Stdlib -> site-packages.",
    level: "moderate",
    codeExample: "import sys\nprint('Script Dir:', sys.path[0])"
  },
  {
    question: "What is the PYTHONPATH environment variable used for?",
    shortAnswer: "It is an operating system environment variable used to augment Python's default module search path with custom project directories.",
    explanation: "Directories specified in PYTHONPATH are automatically inserted into sys.path right after the current script directory.",
    hint: "An environment variable to add custom directories to sys.path.",
    level: "basic",
    codeExample: "# In terminal / bash: export PYTHONPATH='/path/to/my/custom_libs'"
  },
  {
    question: "Why does sys.path.insert(0, '/custom/path') take higher priority than sys.path.append('/custom/path')?",
    shortAnswer: "Because Python searches sys.path sequentially from index 0 to the end; inserting at index 0 makes the custom directory the very first location searched.",
    explanation: "Using append puts the path at the end, meaning any standard or third-party module with the same name will be matched first.",
    hint: "Index 0 is searched first before any other directory.",
    level: "moderate",
    codeExample: "import sys\nsys.path.insert(0, '/app/custom_modules')"
  },
  {
    question: "What is a Module Namespace in Python?",
    shortAnswer: "A dictionary (__dict__) containing all variables, functions, classes, and imported symbols defined inside that specific module.",
    explanation: "Every module owns an isolated namespace instance of types.ModuleType, preventing variable names in one file from colliding with another.",
    hint: "An isolated dictionary of all symbols defined in a module.",
    level: "basic",
    codeExample: "import math\nprint(math.__dict__['pi'])  # 3.141592653589793"
  },
  {
    question: "What is Module Shadowing and what causes it?",
    shortAnswer: "When a local script in your project directory has the same name as a Python standard library module (e.g. creating math.py, random.py, or json.py), causing Python to load your local file instead.",
    explanation: "Because sys.path[0] (current directory) has higher priority than the standard library, Python loads the local file, breaking standard functions and causing AttributeError.",
    hint: "Local file names shadowing standard library modules.",
    level: "basic",
    codeExample: "# If you name your file random.py:\nimport random\nprint(random.randint(1, 10))  # AttributeError: has no attribute 'randint'"
  },
  {
    question: "How can you programmatically verify where a module was loaded from on disk?",
    shortAnswer: "Inspect the module's __file__ attribute: print(module_name.__file__)",
    explanation: "module.__file__ returns the absolute file system path to the source file that was imported.",
    hint: "Use module.__file__.",
    level: "basic",
    codeExample: "import json\nprint(json.__file__)  # e.g., C:\\Python313\\Lib\\json\\__init__.py"
  },
  {
    question: "Why do built-in C extension modules like 'sys' or 'builtins' lack a __file__ attribute or return None?",
    shortAnswer: "Because they are compiled directly into the CPython executable binary itself rather than loaded from an external .py file on disk.",
    explanation: "Modules written in C and compiled into the core Python interpreter do not have a physical .py file path.",
    hint: "Compiled directly into the CPython binary.",
    level: "moderate",
    codeExample: "import sys\nprint(getattr(sys, '__file__', 'No file - Built-in C module'))"
  },
  {
    question: "What is the difference between globals() and locals() at the module level?",
    shortAnswer: "At the top module level outside of any functions or classes, globals() and locals() refer to the exact same module namespace dictionary.",
    explanation: "Inside a function, locals() returns a dictionary of the function's local variables, while globals() still returns the module-level dictionary.",
    hint: "At module root, globals() is locals(). Inside functions, they differ.",
    level: "moderate",
    codeExample: "# At top-level of a module:\nprint(globals() is locals())  # True"
  },
  {
    question: "What does the __name__ attribute contain when a module is imported versus when run directly?",
    shortAnswer: "When imported, __name__ equals the module's name string (e.g. 'math'); when executed directly as the entry point, __name__ equals '__main__'.",
    explanation: "This mechanism enables the standard if __name__ == '__main__': boilerplate for test execution.",
    hint: "'module_name' when imported, '__main__' when run directly.",
    level: "basic",
    codeExample: "if __name__ == '__main__':\n    print('Running as main program!')"
  },
  {
    question: "What is the __doc__ attribute of a module?",
    shortAnswer: "The string content of the module-level docstring defined at the very top of the .py file.",
    explanation: "Python assigns the first unassigned string literal in the file to module.__doc__.",
    hint: "Contains the top-level module docstring.",
    level: "basic",
    codeExample: "import math\nprint(math.__doc__[:40])"
  },
  {
    question: "What is the site-packages directory in Python?",
    shortAnswer: "The target directory where third-party packages installed via 'pip install' are placed.",
    explanation: "Every Python environment (system or virtual environment) has a site-packages folder included in sys.path.",
    hint: "The directory where pip installs external packages.",
    level: "basic",
    codeExample: "import sys\nprint([p for p in sys.path if 'site-packages' in p])"
  },
  {
    question: "How can you create a custom module object dynamically in Python memory without creating a .py file on disk?",
    shortAnswer: "Use types.ModuleType('module_name')",
    explanation: "You can instantiate a module object directly from the types module and populate its __dict__ dynamically.",
    hint: "Use types.ModuleType('my_mod').",
    level: "complex",
    codeExample: "import types\nmy_mod = types.ModuleType('dynamic_mod')\nmy_mod.greeting = 'Hello from memory!'\nprint(my_mod.greeting)"
  },
  {
    question: "What is the __package__ attribute of a module?",
    shortAnswer: "A string representing the parent package name to which the module belongs (empty string or None for top-level scripts).",
    explanation: "It is used by Python's import system to resolve relative imports (e.g. 'from . import sibling').",
    hint: "Contains the parent package name.",
    level: "moderate",
    codeExample: "print(__package__)  # '' for top-level script"
  },
  {
    question: "What happens if you remove an entry from sys.path while your program is running?",
    shortAnswer: "Python will no longer search that removed directory for any subsequent import statements.",
    explanation: "Already loaded modules remain cached in sys.modules and unaffected, but new imports will not check that directory.",
    hint: "Future imports will skip that removed directory.",
    level: "moderate",
    codeExample: "# Already loaded modules stay in memory; future imports won't find that path"
  },
  {
    question: "How does Python resolve sub-module imports like 'import xml.etree.ElementTree'?",
    shortAnswer: "It imports 'xml', checks for the 'etree' subpackage, and loads 'ElementTree', binding 'xml' to the local namespace while populating intermediate namespaces.",
    explanation: "Each dot level represents a directory or module within the parent package hierarchy.",
    hint: "Hierarchically traverses packages and binds the top-level name.",
    level: "moderate",
    codeExample: "import xml.etree.ElementTree as ET"
  },
  {
    question: "What is the purpose of the __spec__ attribute on a module?",
    shortAnswer: "A ModuleSpec object containing the import-related metadata used by the import system (such as loader, origin, and submodule search locations).",
    explanation: "Introduced in PEP 451 to unify import machinery metadata across all module loaders.",
    hint: "Contains ModuleSpec import system metadata.",
    level: "complex",
    codeExample: "import math\nprint(math.__spec__)"
  },
  {
    question: "Why is modifying sys.path considered risky in production libraries?",
    shortAnswer: "Because sys.path is a global mutable list shared across the entire process, mutating it can cause unexpected module resolution bugs in other third-party dependencies.",
    explanation: "Libraries should avoid mutating sys.path globally; instead, packaging tools (pip, pyproject.toml, virtualenv) should configure paths cleanly.",
    hint: "Global list mutations can break other libraries in the same process.",
    level: "moderate",
    codeExample: "# Best practice: Use virtual environments and proper packaging rather than sys.path hacking"
  },
  {
    question: "How do you list all built-in modules compiled directly into your CPython interpreter?",
    shortAnswer: "sys.builtin_module_names",
    explanation: "A tuple of strings containing the names of all built-in C extension modules (e.g. '_ast', '_io', 'builtins', 'sys', 'time').",
    hint: "Use sys.builtin_module_names.",
    level: "basic",
    codeExample: "import sys\nprint(sys.builtin_module_names[:5])"
  },
  {
    question: "What happens if two directories in sys.path both contain a file named 'utils.py'?",
    shortAnswer: "Python imports the 'utils.py' from whichever directory appears first in sys.path and ignores the second.",
    explanation: "The import finder terminates its search immediately upon finding the first valid match.",
    hint: "First match in sys.path wins; subsequent duplicates are ignored.",
    level: "basic",
    codeExample: "# sys.path order dictates precedence"
  },
  {
    question: "How do you detect if a module was imported from a virtual environment vs global system Python?",
    shortAnswer: "Check if the module's __file__ path begins with sys.prefix or sys.base_prefix.",
    explanation: "In a virtual environment, sys.prefix points to the virtualenv directory, whereas sys.base_prefix points to the system base Python.",
    hint: "Compare module.__file__ against sys.prefix.",
    level: "moderate",
    codeExample: "import sys\nprint('In VirtualEnv:', sys.prefix != sys.base_prefix)"
  },
  {
    question: "Can two different modules share variables directly without importing each other?",
    shortAnswer: "No, module namespaces are strictly isolated; sharing state requires importing or passing objects via arguments or shared state singletons.",
    explanation: "Module isolation is a core design principle in Python preventing side effects.",
    hint: "Namespaces are isolated by default.",
    level: "basic",
    codeExample: "# Isolation prevents accidental cross-file state mutation"
  },
  {
    question: "What is the return type of dir(module)?",
    shortAnswer: "A sorted list of string attribute names defined inside the module.",
    explanation: "dir() lists functions, classes, constants, variables, and dunder attributes in the module.",
    hint: "A sorted list of strings.",
    level: "basic",
    codeExample: "import math\nattrs = dir(math)\nprint(type(attrs), 'pi' in attrs)  # <class 'list'> True"
  },
  {
    question: "What is an import finder in CPython?",
    shortAnswer: "An object implementing find_spec() that locates module source files or bytecode on sys.path or inside zip archives.",
    explanation: "CPython uses PathFinder, BuiltinImporter, and FrozenImporter as standard finders.",
    hint: "Locates module source files on the file system.",
    level: "complex",
    codeExample: "import sys\nprint(sys.meta_path)"
  },
  {
    question: "How do you safely reset sys.path back to its original state after a temporary injection?",
    shortAnswer: "Save a copy of sys.path before modifying it and restore it in a finally block: original = list(sys.path); ... finally: sys.path[:] = original",
    explanation: "Restoring the slice in a finally block guarantees the search path is never corrupted if an exception occurs.",
    hint: "Save and restore sys.path in a try/finally block.",
    level: "moderate",
    codeExample: "import sys\norig_path = list(sys.path)\ntry:\n    sys.path.insert(0, '/temp/dir')\nfinally:\n    sys.path[:] = orig_path"
  }
];

export default questions;
