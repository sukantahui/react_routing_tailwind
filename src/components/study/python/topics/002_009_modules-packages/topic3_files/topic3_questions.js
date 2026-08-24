// src/components/study/python/topics/002_009_modules-packages/topic3_files/topic3_questions.js
// Comprehensive Master Review Questions for Topic 3: Creating and structuring custom user-defined modules

const questions = [
  {
    question: "What is a custom user-defined module in Python?",
    shortAnswer: "Any standard Python source file (.py) containing functions, classes, or variables that can be imported into other Python programs.",
    explanation: "Creating custom modules enables code reusability, maintainability, and clean separation of concerns across projects.",
    hint: "Any .py file that is imported into another script.",
    level: "basic",
    codeExample: "# In math_helpers.py:\ndef square(x): return x * x\n\n# In main.py:\nimport math_helpers\nprint(math_helpers.square(5))  # 25"
  },
  {
    question: "What is the canonical PEP 8 layout order for elements within a custom Python module?",
    shortAnswer: "1. Module docstring -> 2. Grouped imports -> 3. __all__ declaration -> 4. Module constants -> 5. Classes & functions -> 6. if __name__ == '__main__': execution guard.",
    explanation: "Adhering to this canonical structure makes Python codebases immediately recognizable and easy to navigate for team members.",
    hint: "Docstring -> Imports -> __all__ -> Constants -> Classes/Functions -> Main Guard.",
    level: "basic",
    codeExample: '"""Module Docstring."""\nimport os\n\n__all__ = ["my_func"]\n\nMY_CONST = 100\n\ndef my_func(): pass\n\nif __name__ == "__main__":\n    my_func()'
  },
  {
    question: "What is the purpose of defining __all__ in a custom module?",
    shortAnswer: "It acts as a public API whitelist defining exactly which symbols are imported when someone executes 'from module import *'.",
    explanation: "If __all__ = ['func_a'], only 'func_a' will be exported on wildcard imports. Internal helper functions and unlisted constants remain hidden from the consumer's namespace.",
    hint: "Controls the public export whitelist for wildcard imports.",
    level: "basic",
    codeExample: "__all__ = ['public_function']\n\ndef public_function(): return 'Public'\ndef internal_helper(): return 'Internal'"
  },
  {
    question: "What happens if a module does NOT define an __all__ list when 'from module import *' is used?",
    shortAnswer: "Python imports all names defined in the module EXCEPT those starting with a leading underscore (_).",
    explanation: "While omitting __all__ respects leading underscores, explicitly defining __all__ is considered best practice for professional libraries.",
    hint: "Imports all symbols except those starting with '_'.",
    level: "moderate",
    codeExample: "# Without __all__:\n# 'func' will be exported, but '_secret' will be ignored by wildcard imports."
  },
  {
    question: "What is the convention for indicating that a function or variable in a module is private and intended for internal use only?",
    shortAnswer: "Prefix the identifier name with a single leading underscore: e.g. _internal_database_connect().",
    explanation: "In Python, privacy is enforced by developer convention ('We are all consenting adults here'). Leading underscores signal to other developers and IDEs that the symbol is private.",
    hint: "Prefix the name with a leading underscore (_name).",
    level: "basic",
    codeExample: "def _validate_student_id(sid):\n    if sid <= 0: raise ValueError('Invalid ID')"
  },
  {
    question: "Can another module still import a private function starting with an underscore using explicit import syntax?",
    shortAnswer: "Yes. Writing 'from module import _private_func' or calling 'module._private_func()' will still work.",
    explanation: "Python does not have hard access modifiers like private/protected in Java or C++. The underscore is an advisory convention.",
    hint: "Explicit imports bypass the underscore convention.",
    level: "basic",
    codeExample: "from my_module import _internal_calc  # Works, but violates intended encapsulation"
  },
  {
    question: "How should module-level constants be named according to PEP 8?",
    shortAnswer: "In UPPERCASE_WITH_UNDERSCORES: e.g. DEFAULT_GST_RATE = 0.18 or MAX_RETRIES = 5.",
    explanation: "Uppercase naming signals that the value is a fixed configuration constant that should not be mutated at runtime.",
    hint: "All uppercase letters with underscores.",
    level: "basic",
    codeExample: "STANDARD_GST_RATE = 0.18\nDEFAULT_TIMEOUT_SECONDS = 30"
  },
  {
    question: "Why is separating an application into Configuration, Business Logic, and Presentation layers beneficial?",
    shortAnswer: "It achieves Single Responsibility: configuration can change without breaking algorithms, and business logic can be tested independently of CLI or UI presentation.",
    explanation: "Layered architecture prevents tight coupling and makes unit testing straightforward.",
    hint: "Enforces single responsibility and eases testing.",
    level: "moderate",
    codeExample: "# config.py (Settings) -> logic.py (Math) -> presentation.py (Formatting)"
  },
  {
    question: "What is the purpose of the 'if __name__ == \"__main__\":' block in a custom module?",
    shortAnswer: "It allows the file to serve dual purposes: as an importable library module AND as a standalone executable script with self-testing demo code.",
    explanation: "When imported, __name__ is the module name, skipping the block; when run directly from the terminal, __name__ is '__main__', executing the block.",
    hint: "Executes only when the file is run directly, not when imported.",
    level: "basic",
    codeExample: "if __name__ == '__main__':\n    print('Running self-tests for module...')"
  },
  {
    question: "How do you access the top-level docstring of a custom module programmatically?",
    shortAnswer: "module_name.__doc__ or help(module_name)",
    explanation: "Python stores the initial unassigned string literal in the module's __doc__ attribute.",
    hint: "Use module.__doc__ or help(module).",
    level: "basic",
    codeExample: "import math\nprint(math.__doc__)"
  },
  {
    question: "What is the recommended way to group import statements at the top of a custom module?",
    shortAnswer: "Three distinct blocks separated by a blank line: 1. Standard library -> 2. Related third-party -> 3. Local application/package imports.",
    explanation: "PEP 8 prescribes this structure to make module dependencies immediately transparent.",
    hint: "Standard -> Third-party -> Local modules.",
    level: "basic",
    codeExample: "import sys\nimport os\n\nimport requests\n\nfrom . import config"
  },
  {
    question: "How do you provide type hints for function arguments and return types in a custom module?",
    shortAnswer: "def calculate_fee(base: float, discount: float = 0.0) -> dict:",
    explanation: "Type annotations clarify expected data types, enable static analysis in mypy, and power IDE autocompletion.",
    hint: "Use : type for args and -> return_type for return values.",
    level: "basic",
    codeExample: "def format_name(first: str, last: str) -> str:\n    return f'{last}, {first}'"
  },
  {
    question: "What happens if a symbol listed in __all__ does not actually exist in the module?",
    shortAnswer: "An AttributeError is raised when a consumer attempts to run 'from module import *'.",
    explanation: "Python verifies that every identifier listed in __all__ exists in the module's namespace upon wildcard import.",
    hint: "Raises AttributeError on wildcard import.",
    level: "moderate",
    codeExample: "__all__ = ['non_existent_function']\n# 'from my_module import *' crashes with AttributeError"
  },
  {
    question: "How can you prevent a custom module from executing slow initialization tasks during import?",
    shortAnswer: "Keep top-level module code free of heavy computations or database connections; encapsulate them inside functions or lazy initialization patterns.",
    explanation: "Heavy top-level execution slows down application startup for every file that imports the module.",
    hint: "Avoid heavy top-level work; use functions or lazy initialization.",
    level: "moderate",
    codeExample: "# BAD: db_conn = connect_slow_database()\n# GOOD: def get_db_conn(): ..."
  },
  {
    question: "Can a custom module define its own custom Exception classes?",
    shortAnswer: "Yes. Defining custom exceptions inheriting from Exception creates clean, domain-specific error handling for the module.",
    explanation: "For example, a billing module can define FeeValidationError(Exception) for invalid payments.",
    hint: "Create custom subclasses of Exception: class MyError(Exception): pass.",
    level: "basic",
    codeExample: "class InvalidFeeError(Exception):\n    """Raised when fee is negative."""\n    pass"
  },
  {
    question: "What is the difference between a module and a script in Python?",
    shortAnswer: "A module is designed to be imported and reused by other files; a script is designed to be executed directly from the command line as an entry point.",
    explanation: "A well-structured file can function as both by using if __name__ == '__main__':.",
    hint: "Modules are imported; scripts are executed.",
    level: "basic",
    codeExample: "# Both can be unified using if __name__ == '__main__':"
  },
  {
    question: "How do you validate function input arguments defensively inside a custom module function?",
    shortAnswer: "Use explicit conditional checks raising ValueError or TypeError with informative error messages.",
    explanation: "Defensive validation prevents invalid data from propagating deeply into business logic.",
    hint: "Check conditions and raise ValueError or TypeError.",
    level: "basic",
    codeExample: "def set_discount(pct: float):\n    if not (0 <= pct <= 100):\n        raise ValueError(f'Discount must be 0-100%! Got: {pct}')"
  },
  {
    question: "What is the __file__ attribute inside a custom module?",
    shortAnswer: "A string containing the file path of that custom module on disk.",
    explanation: "Allows locating configuration files or resources relative to the module: os.path.dirname(__file__).",
    hint: "Contains the module file path on disk.",
    level: "basic",
    codeExample: "import os\nBASE_DIR = os.path.dirname(os.path.abspath(__file__))"
  },
  {
    question: "Why should custom modules avoid mutating global state across functions?",
    shortAnswer: "Because shared mutable global state causes concurrency race conditions, unpredictable side effects, and makes unit testing fragile.",
    explanation: "Prefer pure functions that take inputs and return outputs without modifying global variables.",
    hint: "Global state leads to side effects and testing difficulties.",
    level: "moderate",
    codeExample: "# Prefer pure functions over global variable modifications"
  },
  {
    question: "How do you document function arguments and return types in Google/Sphinx style docstrings?",
    shortAnswer: "Use structured sections: Args: ... Returns: ... Raises: ...",
    explanation: "Structured docstrings allow automated documentation generators (like Sphinx) to generate professional HTML documentation.",
    hint: "Use Args:, Returns:, and Raises: docstring sections.",
    level: "basic",
    codeExample: '"""\nArgs:\n    amount (float): The gross amount.\nReturns:\n    dict: Breakdown breakdown.\n"""'
  },
  {
    question: "What is the recommended file naming convention for custom modules in Python?",
    shortAnswer: "Short, all-lowercase names with underscores for readability (e.g. fee_calculator.py, student_records.py).",
    explanation: "PEP 8 advises lowercase alphanumeric names with underscores, avoiding special characters and PascalCase for file names.",
    hint: "snake_case lowercase with underscores.",
    level: "basic",
    codeExample: "# Good: student_service.py\n# Bad: StudentService.py, student-service.py"
  },
  {
    question: "Can a custom module import another custom module located in the same directory?",
    shortAnswer: "Yes. In Python 3, write 'import sibling_module' or 'from . import sibling_module' if part of a package.",
    explanation: "Because the script's directory is in sys.path, sibling modules can be imported directly.",
    hint: "Sibling files in the same directory can be imported directly.",
    level: "basic",
    codeExample: "# In main.py: import helper_module"
  },
  {
    question: "What is the danger of writing circular dependencies between two custom modules?",
    shortAnswer: "One module will attempt to access attributes of the other before initialization finishes, raising 'ImportError: cannot import name from partially initialized module'.",
    explanation: "Break cycles by creating a third common module or using function-level local imports.",
    hint: "Creates partially initialized module errors.",
    level: "moderate",
    codeExample: "# Refactor shared types into common.py"
  },
  {
    question: "How do you package and distribute a custom module for installation via pip?",
    shortAnswer: "Create a pyproject.toml or setup.py file defining package metadata, entry points, and dependencies, then build with 'python -m build'.",
    explanation: "Packaging standardizes custom modules for local development ('pip install -e .') and PyPI distribution.",
    hint: "Use pyproject.toml with build tools.",
    level: "moderate",
    codeExample: "# [project]\n# name = 'my_toolkit'\n# version = '1.0.0'"
  },
  {
    question: "What is the role of the __version__ attribute in a custom module?",
    shortAnswer: "A string constant specifying the semantic version of the module (e.g. __version__ = '2.4.0').",
    explanation: "Allows users and diagnostic tools to programmatically check which version of your module is running in production.",
    hint: "Defines the semantic version string of the module.",
    level: "basic",
    codeExample: "__version__ = '2.4.0'"
  }
];

export default questions;
