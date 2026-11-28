// 25 Authentic CBSE Board Examination Questions for Topic 1
const questions = [
  {
    "id": 1,
    "question": "What are the variables declared in the function header called?",
    "options": [
      "Formal Parameters",
      "Actual Arguments",
      "Global Constants",
      "Literal Constants"
    ],
    "correctAnswer": 0,
    "explanation": "Variables declared in the function definition header are formal parameters (or parameters).",
    "hint": "Placeholders in def line."
  },
  {
    "id": 2,
    "question": "What are the values or expressions passed to a function during its call called?",
    "options": [
      "Formal Parameters",
      "Actual Arguments",
      "Signatures",
      "Placeholders"
    ],
    "correctAnswer": 1,
    "explanation": "Values, variables, or expressions supplied during function invocation are actual arguments (or arguments).",
    "hint": "Supplied during call."
  },
  {
    "id": 3,
    "question": "In `def calc(x, y): return x * y; res = calc(10, 20)`, what are `10` and `20`?",
    "options": [
      "Formal Parameters",
      "Actual Arguments",
      "Global Variables",
      "Data Types"
    ],
    "correctAnswer": 1,
    "explanation": "`10` and `20` are actual arguments passed in the function invocation.",
    "hint": "Passed in call."
  },
  {
    "id": 4,
    "question": "What error occurs if you call `def add(a, b): return a + b` with only one argument `add(5)`?",
    "options": [
      "IndexError",
      "TypeError: add() missing 1 required positional argument: 'b'",
      "ValueError",
      "SyntaxError"
    ],
    "correctAnswer": 1,
    "explanation": "Missing required positional arguments raises `TypeError`.",
    "hint": "Missing argument error."
  },
  {
    "id": 5,
    "question": "What error occurs if you call `def add(a, b): return a + b` with three arguments `add(1, 2, 3)`?",
    "options": [
      "TypeError: add() takes 2 positional arguments but 3 were given",
      "ValueError",
      "OverflowError",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Passing more arguments than formal parameters declared raises `TypeError`.",
    "hint": "Too many arguments error."
  },
  {
    "id": 6,
    "question": "Can an arithmetic expression be used as an actual argument in a function call?",
    "options": [
      "Yes, Python evaluates the expression first and passes the resulting value",
      "No, only variables can be arguments",
      "Only if enclosed in quotes",
      "Only in Python 3.12+"
    ],
    "correctAnswer": 0,
    "explanation": "Python evaluates expressions (e.g. `add(2 * 5, 10 + 4)`) to objects before binding them to parameters.",
    "hint": "Expression evaluation."
  },
  {
    "id": 7,
    "question": "Can another function call be used as an actual argument (e.g. `calc(len('test'), 10)`)?",
    "options": [
      "Yes, the inner function executes first and its return value is passed as the argument",
      "No, nested calls are prohibited",
      "Only with lambda",
      "Raises SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Inner function calls are evaluated first, and their return values serve as actual arguments.",
    "hint": "Nested function call evaluation."
  },
  {
    "id": 8,
    "question": "Where are formal parameters stored in memory during function execution?",
    "options": [
      "In the local stack frame / local namespace of the function",
      "In the global namespace",
      "In ROM",
      "On the hard disk"
    ],
    "correctAnswer": 0,
    "explanation": "Formal parameters reside in the local stack frame allocated for that specific function call invocation.",
    "hint": "Local stack frame."
  },
  {
    "id": 9,
    "question": "What happens to formal parameters once the function finishes execution and returns?",
    "options": [
      "They are retained permanently",
      "Their local namespace is destroyed and memory reclaimed by garbage collection",
      "They become global variables",
      "They are written to a log file"
    ],
    "correctAnswer": 1,
    "explanation": "When the function returns, its local stack frame is destroyed and local variable references are reclaimed.",
    "hint": "Local lifetime expiration."
  },
  {
    "id": 10,
    "question": "In `def greet(name): print('Hello', name)`, what is `name`?",
    "options": [
      "Formal parameter",
      "Actual argument",
      "Keyword",
      "Module"
    ],
    "correctAnswer": 0,
    "explanation": "`name` is a formal parameter specified in the function signature.",
    "hint": "Header variable identifier."
  },
  {
    "id": 11,
    "question": "Are formal parameters accessible outside the function body?",
    "options": [
      "Yes, anywhere in the program",
      "No, they have local scope and raise NameError if referenced outside",
      "Only in the main block",
      "Only if declared with def"
    ],
    "correctAnswer": 1,
    "explanation": "Formal parameters exist strictly within the local scope of the function.",
    "hint": "Scope boundary."
  },
  {
    "id": 12,
    "question": "What is the output of: `def f(a): a = 100; x = 50; f(x); print(x)`?",
    "options": [
      "100",
      "50",
      "150",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "Integers are immutable. Inside `f`, reassigning formal parameter `a = 100` binds local `a` to 100 without affecting outer variable `x`.",
    "hint": "Immutable argument rebinding."
  },
  {
    "id": 13,
    "question": "Can a formal parameter have the same name as an existing global variable?",
    "options": [
      "Yes, the local parameter shadows (hides) the global variable within the function",
      "No, raises DuplicateNameError",
      "Only if the global is empty",
      "Raises SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Local parameters shadow global variables with the same name during function execution.",
    "hint": "Variable shadowing."
  },
  {
    "id": 14,
    "question": "What is a function signature in Python?",
    "options": [
      "The function name and its parameter specification in the header line",
      "The digital cryptographic certificate of the file",
      "The return type only",
      "The docstring"
    ],
    "correctAnswer": 0,
    "explanation": "A function signature comprises the function name, its parameter list, and default values.",
    "hint": "Header specification."
  },
  {
    "id": 15,
    "question": "Which module in Python allows inspecting function signatures dynamically?",
    "options": [
      "inspect",
      "sys",
      "os",
      "types"
    ],
    "correctAnswer": 0,
    "explanation": "`inspect.signature(func)` returns the signature object for a function.",
    "hint": "inspect module."
  },
  {
    "id": 16,
    "question": "Can formal parameters have type annotations (e.g. `def add(a: int, b: int) -> int:`)?",
    "options": [
      "Yes, type hints are valid syntax in Python 3 for documentation and tooling",
      "No, causes SyntaxError",
      "Type hints make Python statically typed",
      "Only in comments"
    ],
    "correctAnswer": 0,
    "explanation": "PEP 484 type annotations are optional metadata that do not enforce runtime type checks.",
    "hint": "Type hinting syntax."
  },
  {
    "id": 17,
    "question": "What will `def show(msg): print(msg); show(show)` output?",
    "options": [
      "<function show at 0x...>",
      "SyntaxError",
      "TypeError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "The function `show` itself is passed as an actual argument, so its string representation `<function show at ...>` is printed.",
    "hint": "Function passed as argument."
  },
  {
    "id": 18,
    "question": "Can literal numbers like `5` be declared as formal parameters (e.g. `def f(5):`)?",
    "options": [
      "No, formal parameters must be valid Python identifiers, raising SyntaxError",
      "Yes, in Python 3",
      "Only for constant functions",
      "Treated as default value"
    ],
    "correctAnswer": 0,
    "explanation": "Formal parameters must be valid variable identifiers; using literals causes a `SyntaxError: invalid syntax`.",
    "hint": "Parameters must be identifiers."
  },
  {
    "id": 19,
    "question": "What is the relationship between the number of formal parameters and actual arguments in standard positional calls?",
    "options": [
      "They must be equal in number (1-to-1 mapping)",
      "Parameters must exceed arguments",
      "Arguments must exceed parameters",
      "Number does not matter"
    ],
    "correctAnswer": 0,
    "explanation": "In mandatory positional calling, every formal parameter must receive exactly one actual argument.",
    "hint": "One-to-one positional mapping."
  },
  {
    "id": 20,
    "question": "What does `def f(*args):` indicate about formal parameters?",
    "options": [
      "Accepts a variable number of positional arguments as a tuple",
      "Only accepts pointers",
      "Requires multiplication",
      "Deletes arguments"
    ],
    "correctAnswer": 0,
    "explanation": "`*args` collects any arbitrary number of positional arguments into a tuple.",
    "hint": "Variable positional arguments."
  },
  {
    "id": 21,
    "question": "What does `def f(**kwargs):` indicate?",
    "options": [
      "Accepts arbitrary keyword arguments as a dictionary",
      "Requires 2 arguments",
      "Squares the arguments",
      "Raises TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "`**kwargs` collects arbitrary keyword arguments into a dictionary.",
    "hint": "Keyword arguments dictionary."
  },
  {
    "id": 22,
    "question": "What will `def f(x): return x; print(f(None))` output?",
    "options": [
      "None",
      "SyntaxError",
      "TypeError",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "`None` is passed as the actual argument, bound to `x`, and returned.",
    "hint": "Passing None literal."
  },
  {
    "id": 23,
    "question": "What will `def f(a, b): return a; print(f(b=20, a=10))` output?",
    "options": [
      "10",
      "20",
      "TypeError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Arguments passed by keyword bind by parameter name, regardless of order: `a=10` is returned.",
    "hint": "Named keyword binding."
  },
  {
    "id": 24,
    "question": "Why does Python evaluate actual arguments from left to right?",
    "options": [
      "Standardized deterministic expression evaluation order",
      "By random chance",
      "To reverse execution",
      "Hardware restriction"
    ],
    "correctAnswer": 0,
    "explanation": "Python language specifications dictate left-to-right argument evaluation before invoking the callable.",
    "hint": "Deterministic evaluation."
  },
  {
    "id": 25,
    "question": "In CBSE board marking, what is the mark deduction if a student confuses parameters with arguments?",
    "options": [
      "Examiners deduct marks if 'parameters' and 'arguments' are used interchangeably in technical definitions",
      "No deduction",
      "Full paper canceled",
      "Extra marks awarded"
    ],
    "correctAnswer": 0,
    "explanation": "Board marking schemes require precise distinction: parameters are in the header; arguments are passed in the call.",
    "hint": "Formal vs actual precision."
  }
];

export default questions;
