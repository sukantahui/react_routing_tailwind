// 25 Authentic CBSE Board Examination Questions for Topic 12
const questions = [
  {
    "id": 1,
    "question": "Which keyword initiates a user-defined function in Python?",
    "options": [
      "function",
      "def",
      "fun",
      "define"
    ],
    "correctAnswer": 1,
    "explanation": "Python functions are defined using the `def` keyword.",
    "hint": "Three-letter keyword."
  },
  {
    "id": 2,
    "question": "What is the return value of a void function that has no return statement?",
    "options": [
      "0",
      "False",
      "None",
      "Empty string"
    ],
    "correctAnswer": 2,
    "explanation": "Python functions return `None` by default when no explicit return statement exists.",
    "hint": "Default None return."
  },
  {
    "id": 3,
    "question": "Where are formal parameters declared?",
    "options": [
      "In the function header inside parentheses",
      "In the function call",
      "In the global scope",
      "In comments"
    ],
    "correctAnswer": 0,
    "explanation": "Formal parameters are declared in the function definition header line.",
    "hint": "Header placeholders."
  },
  {
    "id": 4,
    "question": "What error occurs if positional arguments follow keyword arguments (e.g. `f(a=1, 2)`)?",
    "options": [
      "SyntaxError: positional argument follows keyword argument",
      "TypeError",
      "ValueError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Python grammar forbids positional arguments after keyword arguments.",
    "hint": "Positional after keyword."
  },
  {
    "id": 5,
    "question": "Which function header violates default parameter placement rules?",
    "options": [
      "def f(a=1, b):",
      "def f(a, b=1):",
      "def f(a=1, b=2):",
      "def f(a, b, c=3):"
    ],
    "correctAnswer": 0,
    "explanation": "Non-default argument `b` cannot follow default argument `a=1`.",
    "hint": "Non-default follows default."
  },
  {
    "id": 6,
    "question": "What data structure is returned when a function writes `return x, y, z`?",
    "options": [
      "<class 'tuple'>",
      "<class 'list'>",
      "<class 'set'>",
      "<class 'dict'>"
    ],
    "correctAnswer": 0,
    "explanation": "Comma-separated return values trigger implicit tuple packing.",
    "hint": "Tuple packing on return."
  },
  {
    "id": 7,
    "question": "What is the lifetime of a local variable inside a function?",
    "options": [
      "Created when function is called; destroyed when function returns",
      "Permanent",
      "Entire script runtime",
      "10 seconds"
    ],
    "correctAnswer": 0,
    "explanation": "Local variables exist only during the active invocation of their enclosing function.",
    "hint": "Invocation duration."
  },
  {
    "id": 8,
    "question": "In what sequential order does Python look up identifiers per the LEGB rule?",
    "options": [
      "Local -> Enclosing -> Global -> Built-in",
      "Built-in -> Global -> Enclosing -> Local",
      "Global -> Local -> Enclosing -> Built-in",
      "Local -> Global -> Enclosing -> Built-in"
    ],
    "correctAnswer": 0,
    "explanation": "LEGB: Local -> Enclosing -> Global -> Built-in.",
    "hint": "LEGB acronym."
  },
  {
    "id": 9,
    "question": "Which keyword allows modifying a global variable from inside a function?",
    "options": [
      "global",
      "nonlocal",
      "extern",
      "share"
    ],
    "correctAnswer": 0,
    "explanation": "The `global` statement allows rebinding global variables from within a local function suite.",
    "hint": "global keyword."
  },
  {
    "id": 10,
    "question": "What happens when an actual argument is a mutable list and is modified via `append()` inside a function?",
    "options": [
      "The caller's original list is modified in-place",
      "The caller is unaffected",
      "Raises TypeError",
      "List becomes None"
    ],
    "correctAnswer": 0,
    "explanation": "In-place modifications mutate the shared object in memory, visible to the caller.",
    "hint": "In-place mutable modification."
  },
  {
    "id": 11,
    "question": "What happens when an actual argument is an immutable integer and is incremented with `+= 1` inside a function?",
    "options": [
      "The caller's original integer remains completely unchanged",
      "The caller's variable increments",
      "Raises TypeError",
      "Memory is freed"
    ],
    "correctAnswer": 0,
    "explanation": "Integers are immutable; `+= 1` rebinds local parameter only, leaving caller unchanged.",
    "hint": "Immutable integer parameter."
  },
  {
    "id": 12,
    "question": "What is the value of `__name__` when a Python file is run directly?",
    "options": [
      "'__main__'",
      "'main'",
      "'module'",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Direct execution sets `__name__` to `'__main__'`.",
    "hint": "Dunder main."
  },
  {
    "id": 13,
    "question": "What error occurs if an identifier is not found in ANY of the LEGB scopes?",
    "options": [
      "NameError: name '...' is not defined",
      "KeyError",
      "ValueError",
      "LookupError"
    ],
    "correctAnswer": 0,
    "explanation": "Exhausting all 4 LEGB namespaces results in `NameError`.",
    "hint": "Undefined name error."
  },
  {
    "id": 14,
    "question": "What will `a = 10; def f(): a = 20; f(); print(a)` output?",
    "options": [
      "10",
      "20",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Inside `f()`, `a = 20` assigns to a local variable. Global `a` remains 10.",
    "hint": "Local shadowing."
  },
  {
    "id": 15,
    "question": "What is the output of: `def f(a, b=5): return a * b; print(f(3, 2))`?",
    "options": [
      "6",
      "15",
      "TypeError",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Argument 2 overrides default 5: `3 * 2 = 6`.",
    "hint": "Override default argument."
  },
  {
    "id": 16,
    "question": "What will `def f(): return 1, 2; x, y = f(); print(x + y)` output?",
    "options": [
      "3",
      "(1, 2)",
      "TypeError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Unpacks into `x=1, y=2`; `1 + 2 = 3`.",
    "hint": "Unpacking arithmetic."
  },
  {
    "id": 17,
    "question": "What error occurs if you write `def f(x=5, y): pass`?",
    "options": [
      "SyntaxError: non-default argument follows default argument",
      "TypeError",
      "ValueError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Non-default `y` follows default `x=5`, raising SyntaxError.",
    "hint": "Header placement error."
  },
  {
    "id": 18,
    "question": "What will `x = 5; def f(): global x; x += 10; f(); print(x)` output?",
    "options": [
      "15",
      "5",
      "10",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`global x` allows modifying the global variable directly: `5 + 10 = 15`.",
    "hint": "Global modification."
  },
  {
    "id": 19,
    "question": "What does `math.floor(3.9)` return?",
    "options": [
      "3",
      "4",
      "3.0",
      "3.9"
    ],
    "correctAnswer": 0,
    "explanation": "`floor()` rounds down to the nearest lower integer: 3.",
    "hint": "Floor function."
  },
  {
    "id": 20,
    "question": "What does `random.randint(1, 4)` produce?",
    "options": [
      "A random integer between 1 and 4 inclusive",
      "An integer up to 3",
      "A float",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`randint` includes both 1 and 4.",
    "hint": "Inclusive bounds."
  },
  {
    "id": 21,
    "question": "What error occurs in: `x = 10; def f(): print(x); x = 5; f()`?",
    "options": [
      "UnboundLocalError",
      "10",
      "5",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Local assignment `x = 5` marks `x` as local; reading it in `print(x)` before assignment raises `UnboundLocalError`.",
    "hint": "Unbound local variable."
  },
  {
    "id": 22,
    "question": "What will `def f(L): L = [1, 2]; data = [10]; f(data); print(data)` output?",
    "options": [
      "[10]",
      "[1, 2]",
      "[10, 1, 2]",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Rebinding `L = [1, 2]` alters local reference only; caller's `data` remains `[10]`.",
    "hint": "Rebinding does not affect caller."
  },
  {
    "id": 23,
    "question": "What does `importlib.reload(module)` do?",
    "options": [
      "Reloads and re-executes a previously imported module",
      "Deletes module",
      "Installs from internet",
      "Raises Error"
    ],
    "correctAnswer": 0,
    "explanation": "`reload()` refreshes an already loaded module from disk.",
    "hint": "Reload function."
  },
  {
    "id": 24,
    "question": "What will `def f(a, b): return a - b; print(f(b=5, a=15))` output?",
    "options": [
      "10",
      "-10",
      "TypeError",
      "5"
    ],
    "correctAnswer": 0,
    "explanation": "Keyword arguments bind by name: `15 - 5 = 10`.",
    "hint": "Keyword order independence."
  },
  {
    "id": 25,
    "question": "What is the key takeaway of Python's parameter passing mechanism?",
    "options": [
      "It is Pass-by-Object-Reference: in-place changes on mutable arguments affect the caller, while rebinding or immutable changes do not",
      "It is purely Pass-by-Value",
      "It is purely Pass-by-Reference",
      "Arguments cannot be changed"
    ],
    "correctAnswer": 0,
    "explanation": "Pass-by-Object-Reference passes object references; mutable objects mutate in-place, while immutable objects cannot be mutated.",
    "hint": "Pass-by-Object-Reference essence."
  }
];

export default questions;
