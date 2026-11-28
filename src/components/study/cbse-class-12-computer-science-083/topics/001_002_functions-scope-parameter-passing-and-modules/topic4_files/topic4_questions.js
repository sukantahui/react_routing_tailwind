// 25 Authentic CBSE Board Examination Questions for Topic 4
const questions = [
  {
    "id": 1,
    "question": "Which of the following function headers violates Python's default parameter placement rules?",
    "options": [
      "def calc(a, b=10):",
      "def calc(a=5, b=10):",
      "def calc(a=5, b):",
      "def calc(a, b, c=20):"
    ],
    "correctAnswer": 2,
    "explanation": "Non-default argument `b` follows default argument `a=5`, raising `SyntaxError: non-default argument follows default argument`.",
    "hint": "Non-default cannot follow default."
  },
  {
    "id": 2,
    "question": "What error is raised by `def f(x=10, y): pass`?",
    "options": [
      "SyntaxError: non-default argument follows default argument",
      "TypeError",
      "ValueError",
      "NameError"
    ],
    "correctAnswer": 0,
    "explanation": "Placing a non-default parameter after a default parameter is a syntax error in Python.",
    "hint": "Header syntax error."
  },
  {
    "id": 3,
    "question": "When are default parameter values evaluated in Python?",
    "options": [
      "Each time the function is called",
      "Once, when the function definition `def` statement is executed",
      "At compile time only",
      "When the script terminates"
    ],
    "correctAnswer": 1,
    "explanation": "Default parameter expressions are evaluated once at the moment of function definition.",
    "hint": "Evaluation at definition time."
  },
  {
    "id": 4,
    "question": "Given `def interest(p, r=0.05, t=1): return p*r*t`, what is returned by `interest(1000, t=2)`?",
    "options": [
      "50.0",
      "100.0",
      "1000.0",
      "TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "p=1000, default r=0.05, t=2. Calculation: `1000 * 0.05 * 2 = 100.0`.",
    "hint": "Overriding t while keeping default r."
  },
  {
    "id": 5,
    "question": "What is the output of: `def f(a, b=2, c=3): return a + b + c; print(f(5))`?",
    "options": [
      "10",
      "5",
      "TypeError",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "a=5, b defaults to 2, c defaults to 3: `5 + 2 + 3 = 10`.",
    "hint": "Using multiple defaults."
  },
  {
    "id": 6,
    "question": "What will `def add_item(x, L=[]): L.append(x); return L; print(add_item(1)); print(add_item(2))` output?",
    "options": [
      "[1] then [2]",
      "[1] then [1, 2]",
      "[1, 2] then [1, 2]",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "Default list `L` is instantiated once. The second call appends to the same list object, yielding `[1, 2]`.",
    "hint": "Mutable default trap."
  },
  {
    "id": 7,
    "question": "How can you safely write a function with a default empty list parameter to avoid shared mutable state?",
    "options": [
      "Use `def f(item, L=None): if L is None: L = []`",
      "Use `def f(item, L=list):`",
      "Use `def f(item, L=()):`",
      "Use `def f(item, L=[0]):`"
    ],
    "correctAnswer": 0,
    "explanation": "Setting default to `None` and instantiating `L = []` inside the function ensures a fresh list on each call.",
    "hint": "Idiomatic None default pattern."
  },
  {
    "id": 8,
    "question": "Which function header is syntactically VALID?",
    "options": [
      "def show(p=10, q, r=20):",
      "def show(p, q=10, r=20):",
      "def show(p=10, q=20, r):",
      "def show(p, q=10, r):"
    ],
    "correctAnswer": 1,
    "explanation": "`def show(p, q=10, r=20):` has non-default parameter `p` first, followed by default parameters `q` and `r`.",
    "hint": "All defaults at the end."
  },
  {
    "id": 9,
    "question": "Can a function have ALL its parameters declared with default values (e.g. `def f(a=1, b=2):`)?",
    "options": [
      "Yes, such a function can be called with 0, 1, or 2 arguments",
      "No, at least one parameter must be non-default",
      "Only in Python 2",
      "Raises SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "All parameters can have defaults; calling `f()` invokes the function using all defaults.",
    "hint": "All default parameters."
  },
  {
    "id": 10,
    "question": "What will `def greet(name, title='Mr.'): return f'{title} {name}'; print(greet('Sharma', 'Dr.'))` output?",
    "options": [
      "'Dr. Sharma'",
      "'Mr. Sharma'",
      "'Sharma Dr.'",
      "TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "Passing `'Dr.'` as the second argument overrides the default `'Mr.'`, returning `'Dr. Sharma'`.",
    "hint": "Overriding default string."
  },
  {
    "id": 11,
    "question": "What will `def f(a, b=5): return a * b; print(f(3, 4))` output?",
    "options": [
      "12",
      "15",
      "TypeError",
      "20"
    ],
    "correctAnswer": 0,
    "explanation": "The argument 4 overrides default 5: `3 * 4 = 12`.",
    "hint": "Positional override of default."
  },
  {
    "id": 12,
    "question": "What error occurs if you call `def f(a, b=2): return a + b` without any arguments `f()`?",
    "options": [
      "TypeError: f() missing 1 required positional argument: 'a'",
      "ValueError",
      "None",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "Parameter `a` has no default value and is mandatory; omitting it raises `TypeError`.",
    "hint": "Missing required argument."
  },
  {
    "id": 13,
    "question": "What is the output of: `def f(x, y=10, z=20): return x + y + z; print(f(1, z=5))`?",
    "options": [
      "16",
      "31",
      "TypeError",
      "26"
    ],
    "correctAnswer": 0,
    "explanation": "x=1, y uses default 10, z=5 (keyword override): `1 + 10 + 5 = 16`.",
    "hint": "Keyword override of second default."
  },
  {
    "id": 14,
    "question": "Can a default parameter value be an expression (e.g. `def f(x, y=2*3):`)?",
    "options": [
      "Yes, the expression is evaluated once when def executes",
      "No, only literals are allowed",
      "Only functions can be used",
      "Causes SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Expressions are valid as default values and evaluate when the function definition is loaded.",
    "hint": "Expression as default."
  },
  {
    "id": 15,
    "question": "What happens if a default parameter expression references a global variable that is modified later?",
    "options": [
      "The default parameter retains the value from when def was executed",
      "The default parameter changes automatically",
      "Raises NameError",
      "Function is deleted"
    ],
    "correctAnswer": 0,
    "explanation": "Default expressions are evaluated only once at definition time, so later global mutations do not change the default object.",
    "hint": "Single evaluation at definition time."
  },
  {
    "id": 16,
    "question": "In CBSE examination questions, why are default parameters used?",
    "options": [
      "To make certain function arguments optional",
      "To speed up execution",
      "To avoid writing docstrings",
      "To enforce type safety"
    ],
    "correctAnswer": 0,
    "explanation": "Default arguments provide sensible defaults, making parameters optional for callers.",
    "hint": "Optional arguments."
  },
  {
    "id": 17,
    "question": "What is the output of: `def p(a, b=10): return a - b; print(p(b=5, a=20))`?",
    "options": [
      "15",
      "10",
      "-15",
      "25"
    ],
    "correctAnswer": 0,
    "explanation": "a=20, b=5; `20 - 5 = 15`.",
    "hint": "Keyword override."
  },
  {
    "id": 18,
    "question": "Which statement about default arguments is FALSE?",
    "options": [
      "Default arguments can be placed anywhere in the parameter list",
      "Default arguments must follow non-default arguments",
      "Default arguments are optional in the function call",
      "None is often used as a safe default for mutable types"
    ],
    "correctAnswer": 0,
    "explanation": "Statement A is false: default arguments CANNOT be placed before non-default arguments.",
    "hint": "Placement restriction."
  },
  {
    "id": 19,
    "question": "What is the output of: `def f(a=1, b=2, c=3): return a*b*c; print(f())`?",
    "options": [
      "6",
      "0",
      "TypeError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "With no arguments, all defaults are used: `1 * 2 * 3 = 6`.",
    "hint": "Zero argument call."
  },
  {
    "id": 20,
    "question": "What will `def calc(x, y=x): return x + y` do if written directly?",
    "options": [
      "Raises NameError: name 'x' is not defined because parameter 'x' is not yet in scope when header evaluates",
      "Works normally",
      "y becomes equal to x",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Default expressions cannot reference earlier parameters in the same header because they evaluate before the local scope is formed.",
    "hint": "Header parameter referencing error."
  },
  {
    "id": 21,
    "question": "What is the output of: `def f(a, b=2): return a ** b; print(f(3))`?",
    "options": [
      "9",
      "6",
      "5",
      "TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "3 ** 2 = 9.",
    "hint": "Exponentiation with default."
  },
  {
    "id": 22,
    "question": "How many arguments can be passed to `def f(a, b=10, c=20):`?",
    "options": [
      "1, 2, or 3 arguments",
      "Strictly 3 arguments",
      "Only 1 argument",
      "Unlimited"
    ],
    "correctAnswer": 0,
    "explanation": "Requires at least 1 argument (for `a`), and at most 3 arguments.",
    "hint": "Argument count range."
  },
  {
    "id": 23,
    "question": "What will `def f(a=None): return 'Set' if a is not None else 'Empty'; print(f())` output?",
    "options": [
      "Empty",
      "Set",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "No argument is passed, so `a` defaults to `None`, returning `'Empty'`.",
    "hint": "Default None check."
  },
  {
    "id": 24,
    "question": "What error occurs if `def f(a=2, b): return a + b` is executed?",
    "options": [
      "SyntaxError: non-default argument follows default argument",
      "TypeError",
      "ValueError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`b` is non-default following default `a=2`, raising SyntaxError.",
    "hint": "SyntaxError on placement."
  },
  {
    "id": 25,
    "question": "In CBSE board marking, what is the statutory answer to: 'Can default arguments follow non-default arguments?'",
    "options": [
      "NO, non-default arguments cannot follow default arguments; all defaults must reside at the end",
      "YES, always",
      "Only for integers",
      "Depends on OS"
    ],
    "correctAnswer": 0,
    "explanation": "CBSE board marking keys explicitly state that default arguments must appear after all non-default arguments.",
    "hint": "Statutory CBSE marking rule."
  }
];

export default questions;
