// 25 Authentic CBSE Board Examination Questions for Topic 10
const questions = [
  {
    "id": 1,
    "question": "What is a module in Python?",
    "options": [
      "Any Python source file (.py) containing functions, classes, and statements",
      "A compiled binary file",
      "A special hardware device",
      "A database server"
    ],
    "correctAnswer": 0,
    "explanation": "A module is a file containing Python definitions and statements intended for reuse.",
    "hint": ".py file definition."
  },
  {
    "id": 2,
    "question": "Which statement imports the entire `math` module requiring dot notation for its members?",
    "options": [
      "import math",
      "from math import *",
      "load math",
      "require math"
    ],
    "correctAnswer": 0,
    "explanation": "`import math` imports the module object, requiring prefix `math.sqrt()` to access functions.",
    "hint": "Standard import statement."
  },
  {
    "id": 3,
    "question": "What is the primary danger of using `from module import *` (wildcard import)?",
    "options": [
      "Pollutes current namespace and can overwrite existing variables/functions with identical names",
      "Slows down CPU",
      "Causes hardware damage",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Wildcard imports pollute the namespace, causing unexpected variable shadowing and namespace collisions.",
    "hint": "Namespace pollution."
  },
  {
    "id": 4,
    "question": "What keyword provides a short alias for an imported module (e.g. `import pandas ___ pd`)?",
    "options": [
      "as",
      "alias",
      "like",
      "to"
    ],
    "correctAnswer": 0,
    "explanation": "`as` keyword binds an imported module or function to an alternative alias identifier.",
    "hint": "as keyword."
  },
  {
    "id": 5,
    "question": "What is the value of `__name__` when a Python script is executed directly from the terminal?",
    "options": [
      "'__main__'",
      "'main'",
      "'__module__'",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "When executed directly, Python automatically sets the special built-in variable `__name__` to `'__main__'`.",
    "hint": "Dunder main."
  },
  {
    "id": 6,
    "question": "What is the value of `__name__` when a file `utils.py` is imported into another script?",
    "options": [
      "'utils'",
      "'__main__'",
      "'module'",
      "1"
    ],
    "correctAnswer": 0,
    "explanation": "When imported, `__name__` is set to the module's file name (excluding the `.py` extension), i.e. `'utils'`.",
    "hint": "Module file name."
  },
  {
    "id": 7,
    "question": "What is the purpose of `if __name__ == '__main__':`?",
    "options": [
      "Prevents test or execution code from running when the file is imported as a module",
      "Makes functions run faster",
      "Mandatory for Python to compile",
      "Deletes temporary files"
    ],
    "correctAnswer": 0,
    "explanation": "The `__name__ == '__main__'` guard ensures that enclosed code only executes when the script is run directly.",
    "hint": "Execution guard."
  },
  {
    "id": 8,
    "question": "Which built-in function returns a list of all defined attributes and functions in a module?",
    "options": [
      "dir(module)",
      "list(module)",
      "help(module)",
      "show(module)"
    ],
    "correctAnswer": 0,
    "explanation": "`dir(module)` returns a list of all valid attribute identifiers in the specified module.",
    "hint": "dir function."
  },
  {
    "id": 9,
    "question": "What extension must a user-defined module file possess?",
    "options": [
      ".py",
      ".mod",
      ".pym",
      ".txt"
    ],
    "correctAnswer": 0,
    "explanation": "Standard Python source modules must have the `.py` file extension.",
    "hint": "Standard Python extension."
  },
  {
    "id": 10,
    "question": "Where does Python look for modules when an `import` statement is executed?",
    "options": [
      "Current directory, then directories in `sys.path` (including standard library and site-packages)",
      "Only on the Internet",
      "Only in C:\\Windows",
      "In the recycle bin"
    ],
    "correctAnswer": 0,
    "explanation": "Python searches the current directory followed by the paths listed in `sys.path`.",
    "hint": "sys.path search order."
  },
  {
    "id": 11,
    "question": "What error occurs if you attempt to import a module that does not exist?",
    "options": [
      "ModuleNotFoundError (subclass of ImportError)",
      "FileNotFoundError",
      "NameError",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "`ModuleNotFoundError` is raised when the specified module cannot be located.",
    "hint": "Module not found error."
  },
  {
    "id": 12,
    "question": "If you import a module twice using `import math; import math`, how many times is the module code executed?",
    "options": [
      "Only once; Python caches loaded modules in `sys.modules`",
      "Twice",
      "Raises DuplicateImportError",
      "Causes crash"
    ],
    "correctAnswer": 0,
    "explanation": "Python executes module code on first import and caches it in `sys.modules`; subsequent imports reuse the cached module.",
    "hint": "Module caching in sys.modules."
  },
  {
    "id": 13,
    "question": "What function in `importlib` forces re-executing an already imported module?",
    "options": [
      "importlib.reload(module)",
      "importlib.refresh(module)",
      "importlib.reimport(module)",
      "importlib.update(module)"
    ],
    "correctAnswer": 0,
    "explanation": "`importlib.reload()` re-executes and reloads a previously imported module.",
    "hint": "reload function."
  },
  {
    "id": 14,
    "question": "What is a Python package?",
    "options": [
      "A directory containing Python module files and an `__init__.py` file",
      "A zip file only",
      "A single function",
      "A text document"
    ],
    "correctAnswer": 0,
    "explanation": "A package is a hierarchical directory structure holding multiple modules with an `__init__.py` marker.",
    "hint": "Directory of modules."
  },
  {
    "id": 15,
    "question": "What will `from math import pi; pi = 3.0; print(pi)` output?",
    "options": [
      "3.0",
      "3.14159...",
      "TypeError",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Assigning `pi = 3.0` overwrites the local identifier `pi` in the current namespace.",
    "hint": "Local name rebinding."
  },
  {
    "id": 16,
    "question": "Which standard module provides pseudorandom number generators?",
    "options": [
      "random",
      "rand",
      "math",
      "numbers"
    ],
    "correctAnswer": 0,
    "explanation": "The `random` module implements pseudo-random generators for various distributions.",
    "hint": "random module."
  },
  {
    "id": 17,
    "question": "What is the output of `math.ceil(4.2)` and `math.floor(4.8)`?",
    "options": [
      "5 and 4",
      "4 and 5",
      "5 and 5",
      "4 and 4"
    ],
    "correctAnswer": 0,
    "explanation": "`ceil(4.2)` rounds UP to 5; `floor(4.8)` rounds DOWN to 4.",
    "hint": "Ceil and Floor functions."
  },
  {
    "id": 18,
    "question": "What does `random.randint(1, 6)` do?",
    "options": [
      "Returns a random integer N such that 1 <= N <= 6 (BOTH endpoints inclusive!)",
      "Returns integer from 1 to 5",
      "Returns a float",
      "Returns a list"
    ],
    "correctAnswer": 0,
    "explanation": "Unlike `range()`, `random.randint(a, b)` INCLUDES both endpoints `a` and `b`.",
    "hint": "randint includes both bounds."
  },
  {
    "id": 19,
    "question": "What does `random.random()` return?",
    "options": [
      "A floating-point number in the semi-open range [0.0, 1.0)",
      "An integer 0 or 1",
      "A random string",
      "Any float"
    ],
    "correctAnswer": 0,
    "explanation": "`random.random()` returns a float in `[0.0, 1.0)`.",
    "hint": "Range [0.0, 1.0)."
  },
  {
    "id": 20,
    "question": "What does `random.choice(['Red', 'Green', 'Blue'])` return?",
    "options": [
      "A random single element from the non-empty sequence",
      "The entire list shuffled",
      "An integer index",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`random.choice(seq)` picks a random element from the provided sequence.",
    "hint": "Random item picker."
  },
  {
    "id": 21,
    "question": "What does `random.shuffle(L)` do?",
    "options": [
      "Shuffles the list L in-place and returns None",
      "Returns a new shuffled list",
      "Shuffles strings",
      "Raises TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "`random.shuffle()` mutates the list in-place and returns `None`.",
    "hint": "In-place shuffle."
  },
  {
    "id": 22,
    "question": "What is `__file__` attribute of a module?",
    "options": [
      "The absolute or relative filesystem path of the module source file",
      "The file size",
      "The date created",
      "The author name"
    ],
    "correctAnswer": 0,
    "explanation": "`module.__file__` holds the path to the loaded module file on disk.",
    "hint": "File path attribute."
  },
  {
    "id": 23,
    "question": "Can a module import another module that imports the first module (circular import)?",
    "options": [
      "Yes, but circular dependencies can cause AttributeError if attributes are accessed before fully initialized",
      "Strictly forbidden by Python compiler",
      "Crashes the OS",
      "Runs infinitely"
    ],
    "correctAnswer": 0,
    "explanation": "Circular imports are supported but can result in partial initialization errors.",
    "hint": "Circular import caution."
  },
  {
    "id": 24,
    "question": "What happens if a user script is named `math.py` and attempts to `import math`?",
    "options": [
      "It imports itself, shadowing the standard library math module and failing with AttributeError",
      "It uses standard library",
      "Renames file",
      "Works normally"
    ],
    "correctAnswer": 0,
    "explanation": "Because the current directory is first in `sys.path`, a local `math.py` shadows the standard `math` module.",
    "hint": "Shadowing standard library modules."
  },
  {
    "id": 25,
    "question": "In CBSE board questions, what is the #1 question on module importing?",
    "options": [
      "Differentiating `import math` (requires `math.sqrt()`) vs `from math import sqrt` (uses direct `sqrt()`)",
      "How to delete modules",
      "Writing C extensions",
      "Installing pip"
    ],
    "correctAnswer": 0,
    "explanation": "CBSE board exams frequently test namespace prefix requirements between `import module` and `from module import func`.",
    "hint": "Namespace qualification."
  }
];

export default questions;
