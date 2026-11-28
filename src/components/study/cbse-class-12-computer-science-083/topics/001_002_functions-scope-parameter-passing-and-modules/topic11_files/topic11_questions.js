// 25 Authentic CBSE Board Examination Questions for Topic 11
const questions = [
  {
    "id": 1,
    "question": "Which document provides the consolidated cheatsheet for Module 2?",
    "options": [
      "topic11_note.txt",
      "README.txt",
      "package.json",
      "index.html"
    ],
    "correctAnswer": 0,
    "explanation": "`topic11_note.txt` is the master consolidation document for Functions and Scope.",
    "hint": "Topic 11 note file."
  },
  {
    "id": 2,
    "question": "What is the script name of the master Python lab suite for Module 2?",
    "options": [
      "module2_functions_scope_master_lab.py",
      "test.py",
      "run.py",
      "main.py"
    ],
    "correctAnswer": 0,
    "explanation": "`module2_functions_scope_master_lab.py` contains all runnable test modules for Module 2.",
    "hint": "Module 2 master script."
  },
  {
    "id": 3,
    "question": "Why is modularity using user-defined modules encouraged in CBSE software projects?",
    "options": [
      "Promotes code reuse, enables parallel team development, and keeps files clean and organized",
      "Required to run Python",
      "Eliminates syntax errors",
      "Makes files smaller than 1KB"
    ],
    "correctAnswer": 0,
    "explanation": "User-defined modules separate concerns, allowing functions to be maintained and reused across projects.",
    "hint": "Modularity advantages."
  },
  {
    "id": 4,
    "question": "What is the official subject code for CBSE Class 12 Computer Science?",
    "options": [
      "083",
      "165",
      "402",
      "802"
    ],
    "correctAnswer": 0,
    "explanation": "083 is the subject code for Computer Science.",
    "hint": "Subject code 083."
  },
  {
    "id": 5,
    "question": "What does `import math; print(dir(math))` output?",
    "options": [
      "A list of all mathematical constants and functions available in the math module",
      "A description of math",
      "A syntax error",
      "Memory address"
    ],
    "correctAnswer": 0,
    "explanation": "`dir()` returns all attribute and function names exposed by the module.",
    "hint": "dir function output."
  },
  {
    "id": 6,
    "question": "What character encoding is used in standard Python plain text files?",
    "options": [
      "UTF-8",
      "ASCII",
      "ISO-8859",
      "UTF-16"
    ],
    "correctAnswer": 0,
    "explanation": "UTF-8 is the universal standard encoding for Python 3 text files and code.",
    "hint": "Universal UTF-8."
  },
  {
    "id": 7,
    "question": "Which button allows copying the entire master Python lab script directly to your clipboard?",
    "options": [
      "Copy Full Code Button",
      "Export",
      "Save As",
      "Inspect"
    ],
    "correctAnswer": 0,
    "explanation": "The interface features a dedicated Copy button with instant confirmation feedback.",
    "hint": "Built-in Copy button."
  },
  {
    "id": 8,
    "question": "What is the default return value of any Python function if `return` is omitted?",
    "options": [
      "None",
      "0",
      "False",
      "Empty string"
    ],
    "correctAnswer": 0,
    "explanation": "Functions without an explicit return statement return `None`.",
    "hint": "Implicit return value."
  },
  {
    "id": 9,
    "question": "What is the execution guard used to run unit tests only when a module file is executed directly?",
    "options": [
      "if __name__ == '__main__':",
      "if __main__ == True:",
      "if run():",
      "if main:"
    ],
    "correctAnswer": 0,
    "explanation": "`if __name__ == '__main__':` is the standard Python execution guard idiom.",
    "hint": "Standard execution guard."
  },
  {
    "id": 10,
    "question": "Which module must be imported to generate random floating-point values?",
    "options": [
      "random",
      "math",
      "sys",
      "os"
    ],
    "correctAnswer": 0,
    "explanation": "The `random` module provides `random.random()`, `random.uniform()`, etc.",
    "hint": "random module."
  },
  {
    "id": 11,
    "question": "What is the difference between `import random` and `from random import randint`?",
    "options": [
      "`import random` requires `random.randint()`; `from random import randint` enables direct `randint()` calls",
      "They are identical",
      "One is deprecated",
      "One raises TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "Direct import places the function name in the local namespace, eliminating the module prefix.",
    "hint": "Namespace qualification."
  },
  {
    "id": 12,
    "question": "Can a user-defined function share the same name as a built-in function (e.g. `def len(x):`)?",
    "options": [
      "Yes, but it shadows the built-in function in that module's scope",
      "No, Python forbids it with SyntaxError",
      "Only in classes",
      "Causes crash"
    ],
    "correctAnswer": 0,
    "explanation": "Due to the LEGB rule, a module-level definition shadows the built-in name in that scope.",
    "hint": "LEGB shadowing."
  },
  {
    "id": 13,
    "question": "What keyword is used to modify a global variable from inside a function?",
    "options": [
      "global",
      "nonlocal",
      "extern",
      "var"
    ],
    "correctAnswer": 0,
    "explanation": "The `global` keyword declares that an identifier refers to the module-level global namespace.",
    "hint": "global keyword."
  },
  {
    "id": 14,
    "question": "What happens when an actual argument is an immutable integer?",
    "options": [
      "The function cannot modify the caller's variable",
      "The caller's variable is mutated in-place",
      "Raises TypeError",
      "Memory is cleared"
    ],
    "correctAnswer": 0,
    "explanation": "Immutable arguments simulate pass-by-value semantics; the caller's object is protected.",
    "hint": "Immutable protection."
  },
  {
    "id": 15,
    "question": "What happens when an actual argument is a mutable list and is modified in-place?",
    "options": [
      "The caller's original list is modified directly in memory",
      "The caller is unaffected",
      "Raises ReferenceError",
      "List is deleted"
    ],
    "correctAnswer": 0,
    "explanation": "In-place modifications mutate the shared object, immediately visible to the caller.",
    "hint": "Mutable shared modification."
  },
  {
    "id": 16,
    "question": "What error occurs if positional arguments follow keyword arguments?",
    "options": [
      "SyntaxError: positional argument follows keyword argument",
      "TypeError",
      "ValueError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Positional arguments must strictly precede all keyword arguments in a function call.",
    "hint": "Positional after keyword."
  },
  {
    "id": 17,
    "question": "What error occurs if default parameters are placed before non-default parameters in the header?",
    "options": [
      "SyntaxError: non-default argument follows default argument",
      "TypeError",
      "ValueError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Default parameters must strictly follow all non-default parameters in the function definition.",
    "hint": "Default placement error."
  },
  {
    "id": 18,
    "question": "What is the type of the object returned by `return 10, 20`?",
    "options": [
      "<class 'tuple'>",
      "<class 'list'>",
      "<class 'int'>",
      "<class 'set'>"
    ],
    "correctAnswer": 0,
    "explanation": "Comma-separated return values are packaged into a tuple.",
    "hint": "Tuple packing."
  },
  {
    "id": 19,
    "question": "What is the output of `math.sqrt(49)` in Python?",
    "options": [
      "7.0",
      "7",
      "49",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`math.sqrt()` returns a floating-point result: `7.0`.",
    "hint": "sqrt returns float."
  },
  {
    "id": 20,
    "question": "What does `random.randint(1, 10)` return?",
    "options": [
      "An integer N where 1 <= N <= 10 (both endpoints inclusive)",
      "An integer up to 9",
      "A float",
      "A list"
    ],
    "correctAnswer": 0,
    "explanation": "`randint` includes both lower and upper endpoints.",
    "hint": "Both bounds inclusive."
  },
  {
    "id": 21,
    "question": "What is the lifetime of a function's local variables?",
    "options": [
      "Duration of the function call execution",
      "Permanent",
      "Until script terminates",
      "1 minute"
    ],
    "correctAnswer": 0,
    "explanation": "Local variables are allocated when called and deallocated upon return.",
    "hint": "Function call duration."
  },
  {
    "id": 22,
    "question": "What is the order of the LEGB rule?",
    "options": [
      "Local, Enclosing, Global, Built-in",
      "Logical, External, Global, Binary",
      "List, Element, Global, Byte",
      "Local, Extended, Global, Basic"
    ],
    "correctAnswer": 0,
    "explanation": "LEGB: Local -> Enclosing -> Global -> Built-in.",
    "hint": "LEGB acronym."
  },
  {
    "id": 23,
    "question": "What error is raised if a local variable is referenced before local assignment?",
    "options": [
      "UnboundLocalError",
      "NameError",
      "SyntaxError",
      "TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "Accessing a locally assigned variable before assignment raises `UnboundLocalError`.",
    "hint": "Unbound local error."
  },
  {
    "id": 24,
    "question": "Where should user-authored reusable `.py` files be stored for easy import?",
    "options": [
      "In the same working directory as the importing script or in a directory in sys.path",
      "On the Desktop only",
      "In Windows System32",
      "In Temp folder"
    ],
    "correctAnswer": 0,
    "explanation": "Python automatically searches the current script directory first.",
    "hint": "Current directory import."
  },
  {
    "id": 25,
    "question": "What is the final step after reviewing downloadable documents in Module 2?",
    "options": [
      "Proceed to Topic 12 to test mastery via the diagnostic examination simulator",
      "Close IDE",
      "Delete script",
      "Skip to Unit III"
    ],
    "correctAnswer": 0,
    "explanation": "Topic 12 provides the comprehensive 25-question diagnostic board examination simulator to test your understanding.",
    "hint": "Diagnostic quiz."
  }
];

export default questions;
