// 25 Authentic CBSE Board Examination Questions for Topic 3
const questions = [
  {
    "id": 1,
    "question": "What is a positional argument in Python?",
    "options": [
      "An argument passed by name",
      "An argument mapped to a formal parameter strictly based on its relative left-to-right position",
      "An argument with a default value",
      "A global variable"
    ],
    "correctAnswer": 1,
    "explanation": "Positional arguments bind to formal parameters in order from left to right.",
    "hint": "Order-based mapping."
  },
  {
    "id": 2,
    "question": "What is a keyword (named) argument?",
    "options": [
      "An argument passed using the syntax `parameter_name = value`",
      "An argument that is a Python reserved keyword",
      "A positional argument",
      "A function docstring"
    ],
    "correctAnswer": 0,
    "explanation": "Keyword arguments explicitly name the target formal parameter during the function call.",
    "hint": "Name = value syntax."
  },
  {
    "id": 3,
    "question": "What error occurs if you call `func(a=10, 20)`?",
    "options": [
      "SyntaxError: positional argument follows keyword argument",
      "TypeError",
      "ValueError",
      "NameError"
    ],
    "correctAnswer": 0,
    "explanation": "Python syntax strictly requires all positional arguments to appear BEFORE any keyword arguments.",
    "hint": "Positional after keyword error."
  },
  {
    "id": 4,
    "question": "Given `def f(a, b): return a - b`, what is the output of `f(b=10, a=30)`?",
    "options": [
      "20",
      "-20",
      "TypeError",
      "30"
    ],
    "correctAnswer": 0,
    "explanation": "Keyword arguments bind by name regardless of order: `a=30` and `b=10`. Thus `30 - 10 = 20`.",
    "hint": "Order independence of keyword arguments."
  },
  {
    "id": 5,
    "question": "What error is raised by `def f(x, y): pass; f(10, x=20)`?",
    "options": [
      "TypeError: f() got multiple values for argument 'x'",
      "SyntaxError",
      "ValueError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`10` is assigned positionally to `x`, and `x=20` attempts to re-assign `x`, raising TypeError.",
    "hint": "Duplicate assignment to single parameter."
  },
  {
    "id": 6,
    "question": "Can keyword arguments be passed in any arbitrary order during a function call?",
    "options": [
      "Yes, keyword arguments are bound by parameter name, so order is irrelevant",
      "No, they must match header order",
      "Only if all values are integers",
      "Only in Python 2"
    ],
    "correctAnswer": 0,
    "explanation": "Because the parameter name is explicitly stated, the caller can specify keyword arguments in any order.",
    "hint": "Order independence."
  },
  {
    "id": 7,
    "question": "In `def bill(item, qty, rate): ...`, which call is valid?",
    "options": [
      "bill('Pen', rate=15, qty=5)",
      "bill(qty=5, rate=15, 'Pen')",
      "bill(item='Pen', 5, 15)",
      "bill('Pen', rate=15, 5)"
    ],
    "correctAnswer": 0,
    "explanation": "In `bill('Pen', rate=15, qty=5)`, positional argument `'Pen'` comes first, followed by keyword arguments.",
    "hint": "Positional first, then keywords."
  },
  {
    "id": 8,
    "question": "What will `def greet(first, last): return f'{first} {last}'; print(greet('Roy', 'Amit'))` vs `greet(last='Roy', first='Amit')` demonstrate?",
    "options": [
      "Positional arguments depend on order; keyword arguments bind by name",
      "They produce identical outputs",
      "Keyword arguments raise TypeError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Positional call yields 'Roy Amit'; keyword call yields 'Amit Roy' because `first='Amit'`.",
    "hint": "Positional order dependence."
  },
  {
    "id": 9,
    "question": "Can a function call use both positional and keyword arguments simultaneously?",
    "options": [
      "Yes, provided all positional arguments precede keyword arguments",
      "No, a call must be 100% positional or 100% keyword",
      "Only if there are 3+ arguments",
      "Only with lambda"
    ],
    "correctAnswer": 0,
    "explanation": "Mixing positional and keyword arguments is completely valid as long as positional arguments come first.",
    "hint": "Valid mixing rules."
  },
  {
    "id": 10,
    "question": "What is the output of: `def f(a, b=2): return a * b; print(f(b=3, a=4))`?",
    "options": [
      "12",
      "8",
      "TypeError",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Both `a` and `b` are passed as keyword arguments: `4 * 3 = 12`.",
    "hint": "Keyword call with default parameter."
  },
  {
    "id": 11,
    "question": "What error occurs if a required positional parameter is omitted and not provided as a keyword argument?",
    "options": [
      "TypeError: missing required argument",
      "IndexError",
      "ValueError",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Any formal parameter without a default value that does not receive an argument raises TypeError.",
    "hint": "Missing argument error."
  },
  {
    "id": 12,
    "question": "What will `def add(x, y=5): return x + y; print(add(x=10))` output?",
    "options": [
      "15",
      "10",
      "TypeError",
      "5"
    ],
    "correctAnswer": 0,
    "explanation": "`x=10` is provided as keyword; `y` defaults to 5: `10 + 5 = 15`.",
    "hint": "Keyword call using default value."
  },
  {
    "id": 13,
    "question": "In `print('A', 'B', sep='-', end='!')`, what are `'A'` and `'B'` vs `sep` and `end`?",
    "options": [
      "'A' and 'B' are positional arguments; sep and end are keyword arguments",
      "All are positional arguments",
      "All are keyword arguments",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "`'A'` and `'B'` are positional arguments, while `sep='-'` and `end='!'` are keyword arguments modifying print formatting.",
    "hint": "Print function arguments."
  },
  {
    "id": 14,
    "question": "What happens if you pass an unknown keyword argument (e.g. `def f(a): pass; f(unknown=5)`)?",
    "options": [
      "TypeError: f() got an unexpected keyword argument 'unknown'",
      "It is ignored silently",
      "Added as a global variable",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Passing a keyword argument that does not match any formal parameter raises `TypeError`.",
    "hint": "Unexpected keyword argument."
  },
  {
    "id": 15,
    "question": "Can a keyword argument name be passed as a variable without quotes (e.g. `f(x=10)`)?",
    "options": [
      "Yes, the keyword identifier on the left of '=' is an unquoted parameter name",
      "No, it must be a string 'x'=10",
      "Only with getattr",
      "Raises NameError"
    ],
    "correctAnswer": 0,
    "explanation": "In keyword argument syntax, the parameter name is written bare without quotation marks.",
    "hint": "Bare identifier syntax."
  },
  {
    "id": 16,
    "question": "What will `def f(a, b, c): return a + b + c; print(f(1, c=3, b=2))` output?",
    "options": [
      "6",
      "TypeError",
      "SyntaxError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Positional argument `1` binds to `a`. Keyword arguments `b=2` and `c=3` bind by name. Sum = 6.",
    "hint": "Mixed positional and keyword call."
  },
  {
    "id": 17,
    "question": "What is the output of: `def f(p, q): return p / q; print(f(q=2, p=10))`?",
    "options": [
      "5.0",
      "0.2",
      "TypeError",
      "5"
    ],
    "correctAnswer": 0,
    "explanation": "p=10 and q=2; 10 / 2 = 5.0.",
    "hint": "Float division."
  },
  {
    "id": 18,
    "question": "Why do keyword arguments enhance code readability?",
    "options": [
      "They explicitly document what each argument represents directly at the call site",
      "They compress bytecode",
      "They eliminate function overhead",
      "They prevent exceptions"
    ],
    "correctAnswer": 0,
    "explanation": "Keyword arguments make function invocations self-documenting, eliminating ambiguity in multi-argument functions.",
    "hint": "Self-documenting code."
  },
  {
    "id": 19,
    "question": "What is the output of: `def f(a, b): return a; print(f(a=1, b=2))`?",
    "options": [
      "1",
      "2",
      "3",
      "TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "Function returns `a`, which is 1.",
    "hint": "Returns parameter a."
  },
  {
    "id": 20,
    "question": "Which of the following function calls is INVALID for `def test(a, b, c): pass`?",
    "options": [
      "test(a=1, 2, 3)",
      "test(1, 2, 3)",
      "test(1, b=2, c=3)",
      "test(c=3, b=2, a=1)"
    ],
    "correctAnswer": 0,
    "explanation": "`test(a=1, 2, 3)` has positional arguments following a keyword argument, violating Python grammar.",
    "hint": "Positional argument following keyword."
  },
  {
    "id": 21,
    "question": "What is the return of `def f(x, y): return x, y; print(f(y='World', x='Hello'))`?",
    "options": [
      "('Hello', 'World')",
      "('World', 'Hello')",
      "['Hello', 'World']",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Returns tuple `(x, y)`: x is 'Hello' and y is 'World', so `('Hello', 'World')`.",
    "hint": "Tuple of bound parameters."
  },
  {
    "id": 22,
    "question": "Can a function enforce keyword-only arguments using `*` (e.g. `def f(*, key):`)?",
    "options": [
      "Yes, parameters after an asterisk `*` MUST be passed as keyword arguments",
      "No, syntax is invalid",
      "Only in Python 2",
      "Causes TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "An isolated `*` in the parameter list marks all subsequent parameters as keyword-only.",
    "hint": "Keyword-only delimiter."
  },
  {
    "id": 23,
    "question": "What error occurs if you call `def f(*, x): pass` with `f(10)`?",
    "options": [
      "TypeError: f() takes 0 positional arguments but 1 was given",
      "SyntaxError",
      "ValueError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`x` is keyword-only; passing it positionally raises `TypeError`.",
    "hint": "Keyword-only argument violation."
  },
  {
    "id": 24,
    "question": "What will `def f(a, b): return a * b; print(f(*(3, 4)))` do?",
    "options": [
      "Unpacks tuple (3, 4) into positional arguments a=3, b=4, returning 12",
      "Passes tuple as a",
      "SyntaxError",
      "TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "The `*` unpacking operator expands `(3, 4)` into positional arguments `a=3, b=4`.",
    "hint": "Argument unpacking with *."
  },
  {
    "id": 25,
    "question": "In CBSE board questions, what is the most common error students make regarding keyword arguments?",
    "options": [
      "Placing a positional argument after a keyword argument",
      "Using numbers in values",
      "Returning a string",
      "Calling functions twice"
    ],
    "correctAnswer": 0,
    "explanation": "Writing `func(x=10, 20)` instead of `func(20, x=10)` is the most common board examination syntax trap.",
    "hint": "Positional after keyword."
  }
];

export default questions;
