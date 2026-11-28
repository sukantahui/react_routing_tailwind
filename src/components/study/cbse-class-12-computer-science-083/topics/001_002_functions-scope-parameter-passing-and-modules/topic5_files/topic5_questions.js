// 25 Authentic CBSE Board Examination Questions for Topic 5
const questions = [
  {
    "id": 1,
    "question": "What is the underlying data structure returned when a Python function writes `return a, b, c`?",
    "options": [
      "list",
      "tuple",
      "set",
      "dict"
    ],
    "correctAnswer": 1,
    "explanation": "Returning multiple comma-separated values triggers implicit tuple packing, returning a `<class 'tuple'>`.",
    "hint": "Tuple packing on return."
  },
  {
    "id": 2,
    "question": "What error occurs if a function returns 3 values but the caller writes `x, y = func()`?",
    "options": [
      "ValueError: too many values to unpack (expected 2)",
      "TypeError",
      "IndexError",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Unpacking 3 tuple elements into only 2 variables raises `ValueError`.",
    "hint": "Unpacking count mismatch."
  },
  {
    "id": 3,
    "question": "What is the output of: `def f(): return 1, 2; res = f(); print(type(res))`?",
    "options": [
      "<class 'tuple'>",
      "<class 'list'>",
      "<class 'int'>",
      "<class 'NoneType'>"
    ],
    "correctAnswer": 0,
    "explanation": "The comma-separated values `1, 2` are returned as a tuple.",
    "hint": "Tuple type."
  },
  {
    "id": 4,
    "question": "What will `def swap(x, y): return y, x; a, b = swap(10, 20); print(a, b)` output?",
    "options": [
      "20 10",
      "10 20",
      "(20, 10)",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`swap` returns `(20, 10)`, which unpacks into `a = 20, b = 10`.",
    "hint": "Swapping with return unpacking."
  },
  {
    "id": 5,
    "question": "What is the output of: `def calc(x): return x*2, x*3; p, q = calc(4); print(p + q)`?",
    "options": [
      "20",
      "8",
      "12",
      "24"
    ],
    "correctAnswer": 0,
    "explanation": "`calc(4)` returns `(8, 12)`. Unpacking gives `p=8, q=12`; `8 + 12 = 20`.",
    "hint": "Sum of unpacked values."
  },
  {
    "id": 6,
    "question": "Can a function return a dictionary?",
    "options": [
      "Yes, functions can return any data structure including dicts, lists, and sets",
      "No, only tuples can be returned",
      "Only if keys are integers",
      "Only empty dicts"
    ],
    "correctAnswer": 0,
    "explanation": "Python functions can return any valid object.",
    "hint": "Arbitrary object return."
  },
  {
    "id": 7,
    "question": "What does `def f(): return [1, 2]; a, b = f(); print(a, b)` do?",
    "options": [
      "Unpacks the returned list into a=1 and b=2",
      "Raises TypeError",
      "Prints [1, 2]",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Any iterable sequence (including lists) can be unpacked into multiple variables.",
    "hint": "Sequence unpacking."
  },
  {
    "id": 8,
    "question": "What is the output of: `def f(): return (10, 20, 30); x, *y = f(); print(y)`?",
    "options": [
      "[20, 30]",
      "(20, 30)",
      "20",
      "30"
    ],
    "correctAnswer": 0,
    "explanation": "Extended unpacking with `*y` collects remaining elements into a list: `[20, 30]`.",
    "hint": "Extended starred unpacking."
  },
  {
    "id": 9,
    "question": "What is the return value of `def f(): return (10)` (note no comma inside parentheses)?",
    "options": [
      "10 (an integer, NOT a tuple)",
      "(10,)",
      "tuple",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Parentheses without a trailing comma evaluate as integer grouping: returns `10` of type `int`.",
    "hint": "Parentheses grouping."
  },
  {
    "id": 10,
    "question": "What is the output of: `def f(): return 1, 2, 3; print(f()[1])`?",
    "options": [
      "2",
      "1",
      "3",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`f()` returns `(1, 2, 3)`. Accessing index 1 retrieves the second element, 2.",
    "hint": "Direct indexing of returned tuple."
  },
  {
    "id": 11,
    "question": "How does C++ or Java handle returning multiple values compared to Python?",
    "options": [
      "They require structs, classes, or pointer parameters; Python does it natively via tuples",
      "They work identically to Python",
      "They cannot return anything",
      "Python is slower"
    ],
    "correctAnswer": 0,
    "explanation": "Languages like C/Java require packaging objects or passing references; Python natively packs tuples.",
    "hint": "Language comparison."
  },
  {
    "id": 12,
    "question": "What is the output of: `def f(a, b): return a+b, a-b; r = f(10, 5); print(r[0] * r[1])`?",
    "options": [
      "75",
      "15",
      "5",
      "50"
    ],
    "correctAnswer": 0,
    "explanation": "`f(10, 5)` returns `(15, 5)`. `r[0] * r[1]` is `15 * 5 = 75`.",
    "hint": "Tuple indexing arithmetic."
  },
  {
    "id": 13,
    "question": "What error occurs if `a, b, c = func()` is called on a function that returns `(10, 20)`?",
    "options": [
      "ValueError: not enough values to unpack (expected 3, got 2)",
      "TypeError",
      "IndexError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Expecting 3 variables from a 2-element tuple raises `ValueError`.",
    "hint": "Not enough values to unpack."
  },
  {
    "id": 14,
    "question": "What will `def f(): return 'A', 'B'; print(len(f()))` output?",
    "options": [
      "2",
      "1",
      "Error",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "The returned tuple `('A', 'B')` has length 2.",
    "hint": "Length of returned tuple."
  },
  {
    "id": 15,
    "question": "Can a function return multiple values conditionally (e.g. `return 1, 2` in if, and `return 0` in else)?",
    "options": [
      "Yes, but caller must handle different return types/lengths appropriately",
      "No, return signatures must have identical count",
      "Causes SyntaxError",
      "Only in Python 2"
    ],
    "correctAnswer": 0,
    "explanation": "Python is dynamically typed; functions can return different numbers or types of objects from different branches.",
    "hint": "Dynamic return signatures."
  },
  {
    "id": 16,
    "question": "What is the output of: `def f(): return True, 'Passed'; ok, msg = f(); print(msg if ok else 'Failed')`?",
    "options": [
      "Passed",
      "Failed",
      "True",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`ok` is True, so `'Passed'` is printed.",
    "hint": "Status tuple pattern."
  },
  {
    "id": 17,
    "question": "What is the output of: `def f(x): return x, x**2, x**3; print(f(2))`?",
    "options": [
      "(2, 4, 8)",
      "[2, 4, 8]",
      "2 4 8",
      "8"
    ],
    "correctAnswer": 0,
    "explanation": "Returns tuple `(2, 4, 8)`.",
    "hint": "Powers tuple."
  },
  {
    "id": 18,
    "question": "Can parentheses be used explicitly in the return statement (e.g. `return (a, b)`)?",
    "options": [
      "Yes, `return a, b` and `return (a, b)` are completely identical",
      "No, parentheses cause SyntaxError",
      "Explicit parentheses create a list",
      "Only in tuples"
    ],
    "correctAnswer": 0,
    "explanation": "Parentheses are optional in tuple packing; `return a, b` and `return (a, b)` produce the identical tuple.",
    "hint": "Optional parentheses in tuple return."
  },
  {
    "id": 19,
    "question": "What is the output of: `def f(): return 1, (2, 3); a, b = f(); print(b)`?",
    "options": [
      "(2, 3)",
      "2",
      "3",
      "[2, 3]"
    ],
    "correctAnswer": 0,
    "explanation": "`a` receives 1, and `b` receives the nested tuple `(2, 3)`.",
    "hint": "Nested tuple unpacking."
  },
  {
    "id": 20,
    "question": "What will `def f(): return; a = f(); print(a)` output?",
    "options": [
      "None",
      "()",
      "0",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "A bare `return` returns `None`, not an empty tuple.",
    "hint": "Bare return is None."
  },
  {
    "id": 21,
    "question": "What is the output of: `def min_max(L): return min(L), max(L); low, high = min_max([4, 1, 9, 2]); print(high - low)`?",
    "options": [
      "8",
      "9",
      "1",
      "7"
    ],
    "correctAnswer": 0,
    "explanation": "`low = 1, high = 9`; `9 - 1 = 8`.",
    "hint": "Min-max range calculation."
  },
  {
    "id": 22,
    "question": "What happens if a function returns `return ()`?",
    "options": [
      "It returns an empty tuple",
      "It returns None",
      "SyntaxError",
      "Raises EmptyTupleError"
    ],
    "correctAnswer": 0,
    "explanation": "`()` explicitly constructs and returns an empty tuple.",
    "hint": "Explicit empty tuple return."
  },
  {
    "id": 23,
    "question": "What is the output of: `def f(): return 10, 20; print(f() == (10, 20))`?",
    "options": [
      "True",
      "False",
      "Error",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`f()` returns `(10, 20)`, so `(10, 20) == (10, 20)` evaluates to True.",
    "hint": "Equality check with tuple."
  },
  {
    "id": 24,
    "question": "Can the returned tuple be iterated over with a for loop directly (e.g. `for val in f():`)?",
    "options": [
      "Yes, tuples are standard iterables",
      "No, must be assigned to variable first",
      "Only with enumerate",
      "Causes TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "Tuples are iterable sequences and can be traversed directly by a for loop.",
    "hint": "Direct iteration."
  },
  {
    "id": 25,
    "question": "In CBSE board marking, what is the most important concept to state when asked how Python returns multiple values?",
    "options": [
      "State that Python packages multiple comma-separated return values into a single TUPLE",
      "State that Python uses an array",
      "State that Python converts to string",
      "State that Python writes to memory"
    ],
    "correctAnswer": 0,
    "explanation": "The board mark scheme explicitly awards marks for mentioning 'Tuple Packing' as the mechanism.",
    "hint": "Mention tuple packing."
  }
];

export default questions;
