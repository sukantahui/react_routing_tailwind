// 25 Authentic CBSE Board Examination Questions for Topic 0
const questions = [
  {
    "id": 1,
    "question": "Which keyword is used to define a user-defined function in Python?",
    "options": [
      "function",
      "def",
      "fun",
      "define"
    ],
    "correctAnswer": 1,
    "explanation": "Python uses the reserved keyword `def` to initiate function definitions.",
    "hint": "Three-letter keyword."
  },
  {
    "id": 2,
    "question": "What is the return value of a Python function that does NOT have an explicit `return` statement?",
    "options": [
      "0",
      "False",
      "None",
      "Empty string ''"
    ],
    "correctAnswer": 2,
    "explanation": "In Python, a function without an explicit return statement implicitly returns the special literal `None`.",
    "hint": "Null object in Python."
  },
  {
    "id": 3,
    "question": "What is the primary architectural advantage of decomposing a large program into functions?",
    "options": [
      "Reduces memory consumption to zero",
      "Eliminates syntax errors automatically",
      "Improves code reusability, modularity, readability, and isolates debugging",
      "Makes programs compile to binary machine code"
    ],
    "correctAnswer": 2,
    "explanation": "Functions divide a complex program into modular components, enabling code reuse, better maintenance, and localized debugging.",
    "hint": "Modularity & code reuse."
  },
  {
    "id": 4,
    "question": "What token MUST end the function header line in Python?",
    "options": [
      "Semicolon (;)",
      "Colon (:)",
      "Arrow (->)",
      "Curly brace ({)"
    ],
    "correctAnswer": 1,
    "explanation": "The function header line must terminate with a colon (`:`) to indicate the start of the indented block.",
    "hint": "Block introducer."
  },
  {
    "id": 5,
    "question": "What is a string placed immediately as the first statement inside a function called?",
    "options": [
      "Comment",
      "Docstring (Documentation String)",
      "Header note",
      "Annotation"
    ],
    "correctAnswer": 1,
    "explanation": "A string literal placed at the very start of a function is its docstring, accessible via `func.__doc__`.",
    "hint": "Documentation string."
  },
  {
    "id": 6,
    "question": "Which attribute is used to access the documentation string of a function?",
    "options": [
      "func.doc",
      "func.__doc__",
      "func.help",
      "func.__info__"
    ],
    "correctAnswer": 1,
    "explanation": "Python functions expose their docstrings through the `__doc__` dunder attribute.",
    "hint": "Double underscore doc."
  },
  {
    "id": 7,
    "question": "What happens when a function definition `def calc(): ...` is encountered by the interpreter?",
    "options": [
      "The function executes immediately",
      "A function object is created and bound to the name 'calc', but its body is NOT executed until called",
      "The program terminates",
      "All variables inside it are allocated memory"
    ],
    "correctAnswer": 1,
    "explanation": "`def` is an executable statement that creates the function object. Its internal suite is only executed when invoked.",
    "hint": "Definition vs Execution."
  },
  {
    "id": 8,
    "question": "What will `print(type(def))` output?",
    "options": [
      "<class 'keyword'>",
      "SyntaxError",
      "<class 'function'>",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "`def` is a reserved keyword and cannot be passed as an argument to a function; doing so raises `SyntaxError`.",
    "hint": "Keywords cannot be expressions."
  },
  {
    "id": 9,
    "question": "Which of the following is a built-in Python function?",
    "options": [
      "sqrt()",
      "randint()",
      "len()",
      "factorial()"
    ],
    "correctAnswer": 2,
    "explanation": "`len()` is built-in. `sqrt()` and `factorial()` belong to module `math`, and `randint()` belongs to module `random`.",
    "hint": "Available without any import."
  },
  {
    "id": 10,
    "question": "What will `def test(): pass; print(test())` output?",
    "options": [
      "pass",
      "None",
      "0",
      "SyntaxError"
    ],
    "correctAnswer": 1,
    "explanation": "The function `test()` executes `pass` and reaches the end without a return statement, implicitly returning `None`.",
    "hint": "Default function return value."
  },
  {
    "id": 11,
    "question": "What is a function that computes and returns a result to the caller known as?",
    "options": [
      "Void function",
      "Fruitful (value-returning) function",
      "Abstract function",
      "Static function"
    ],
    "correctAnswer": 1,
    "explanation": "Functions returning computed results via `return` are referred to as fruitful functions.",
    "hint": "Value-returning function."
  },
  {
    "id": 12,
    "question": "Can a function call another function inside its body?",
    "options": [
      "Yes, functions can call other functions, enabling nested execution",
      "No, Python only allows flat execution",
      "Only if both functions have the same name",
      "Only inside a loop"
    ],
    "correctAnswer": 0,
    "explanation": "Functions can freely call other functions, fostering hierarchical procedural decomposition.",
    "hint": "Nested function calls."
  },
  {
    "id": 13,
    "question": "What is a function calling itself known as?",
    "options": [
      "Iteration",
      "Recursion",
      "Inversion",
      "Reflection"
    ],
    "correctAnswer": 1,
    "explanation": "Recursion is the programming technique where a function calls itself directly or indirectly.",
    "hint": "Self-referential function."
  },
  {
    "id": 14,
    "question": "What error occurs if you call a function before it is defined in the script?",
    "options": [
      "SyntaxError",
      "NameError: name '...' is not defined",
      "TypeError",
      "AttributeError"
    ],
    "correctAnswer": 1,
    "explanation": "Python interprets scripts top-to-bottom. Calling a function before its `def` line executes raises `NameError`.",
    "hint": "Unbound identifier error."
  },
  {
    "id": 15,
    "question": "Which statement about Python function names is TRUE?",
    "options": [
      "Function names follow the exact same rules as variable identifiers",
      "Function names must start with a dollar sign ($)",
      "Function names can contain spaces",
      "Function names cannot exceed 10 characters"
    ],
    "correctAnswer": 0,
    "explanation": "Function identifiers must follow standard Python identifier naming rules (letters, digits, underscores; cannot start with a digit).",
    "hint": "Identifier naming rules."
  },
  {
    "id": 16,
    "question": "What is the output of `def f(): return; print(f())`?",
    "options": [
      "None",
      "0",
      "SyntaxError",
      "No output"
    ],
    "correctAnswer": 0,
    "explanation": "A bare `return` statement immediately exits the function and returns `None`.",
    "hint": "Bare return returns None."
  },
  {
    "id": 17,
    "question": "How many times can a user-defined function be called in a script?",
    "options": [
      "Only once",
      "Up to 100 times",
      "As many times as needed",
      "Only inside the main module"
    ],
    "correctAnswer": 2,
    "explanation": "Code reusability allows functions to be called arbitrarily many times.",
    "hint": "Reusability principle."
  },
  {
    "id": 18,
    "question": "What is the return type of `print('Hello')`?",
    "options": [
      "str",
      "NoneType",
      "int",
      "bool"
    ],
    "correctAnswer": 1,
    "explanation": "`print()` displays output to stdout and returns `None` (which is of type `NoneType`).",
    "hint": "Built-in print return value."
  },
  {
    "id": 19,
    "question": "Can a function definition contain multiple `return` statements?",
    "options": [
      "Yes, conditional branching can have multiple return paths",
      "No, Python only permits one return per function",
      "Only in Python 3.12+",
      "Only inside a while loop"
    ],
    "correctAnswer": 0,
    "explanation": "A function can have multiple `return` statements inside `if-elif-else` branches; execution ends upon reaching the first active return.",
    "hint": "Multiple return branches."
  },
  {
    "id": 20,
    "question": "What statement terminates the execution of a function immediately?",
    "options": [
      "break",
      "exit",
      "return",
      "stop"
    ],
    "correctAnswer": 2,
    "explanation": "The `return` statement immediately halts function execution and passes control back to the caller.",
    "hint": "Function exit statement."
  },
  {
    "id": 21,
    "question": "What will `def add(a, b): return a + b; print(add('Py', 'thon'))` output?",
    "options": [
      "TypeError",
      "Python",
      "'Py' + 'thon'",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "The `+` operator concatenates strings when both operands are strings, yielding `'Python'`.",
    "hint": "Polymorphic addition."
  },
  {
    "id": 22,
    "question": "Which function inspects whether an object is callable (such as a function)?",
    "options": [
      "is_function()",
      "callable()",
      "is_callable()",
      "type() == func"
    ],
    "correctAnswer": 1,
    "explanation": "`callable(obj)` returns True if the argument is a callable function, method, or class.",
    "hint": "Built-in callable check."
  },
  {
    "id": 23,
    "question": "Can a function be passed as an argument to another function in Python?",
    "options": [
      "Yes, functions are first-class citizens in Python",
      "No, only primitives can be passed",
      "Only if converted to a string",
      "Only lambda functions"
    ],
    "correctAnswer": 0,
    "explanation": "In Python, functions are first-class objects: they can be assigned to variables, passed as arguments, and returned from other functions.",
    "hint": "First-class citizen."
  },
  {
    "id": 24,
    "question": "What will `def f(): return 10; g = f; print(g())` output?",
    "options": [
      "10",
      "TypeError",
      "None",
      "NameError"
    ],
    "correctAnswer": 0,
    "explanation": "Assigning `g = f` binds the name `g` to the same function object. Calling `g()` executes `f()`, returning 10.",
    "hint": "Function reference aliasing."
  },
  {
    "id": 25,
    "question": "In CBSE marking, what is the key distinction between a function definition and a function call?",
    "options": [
      "A definition defines the template using 'def'; a call invokes the function with parentheses '()' to execute it",
      "They are identical terms",
      "Definition takes arguments; call does not",
      "Calls can only happen in other files"
    ],
    "correctAnswer": 0,
    "explanation": "The function definition constructs the code blueprint (`def name(): ...`), while the function call invokes execution (`name()`).",
    "hint": "Blueprint vs invocation."
  }
];

export default questions;
