// 25 Authentic CBSE Board Examination Questions for Topic 2
const questions = [
  {
    "id": 1,
    "question": "What happens to the program control flow when a function is called?",
    "options": [
      "The program terminates",
      "Control jumps to the function definition, executes its body, and returns to the calling point upon completion",
      "Control loops indefinitely",
      "The CPU skips the next 10 lines"
    ],
    "correctAnswer": 1,
    "explanation": "Function invocation suspends the caller, jumps to execute the function, and resumes execution in the caller when the function returns.",
    "hint": "Jump and return flow."
  },
  {
    "id": 2,
    "question": "What data structure does Python use internally to manage active function calls and nested invocations?",
    "options": [
      "Call Stack (LIFO)",
      "Queue (FIFO)",
      "Binary Tree",
      "Hash Table"
    ],
    "correctAnswer": 0,
    "explanation": "Python uses a Call Stack (Last-In-First-Out) to push active stack frames during calls and pop them upon return.",
    "hint": "LIFO execution stack."
  },
  {
    "id": 3,
    "question": "What occurs immediately when a `return` statement is executed inside a function?",
    "options": [
      "The function pauses for 1 second",
      "The function terminates immediately, passing control and the specified value back to the caller",
      "The next loop iteration begins",
      "The function restarts"
    ],
    "correctAnswer": 1,
    "explanation": "Executing `return` immediately exits the function, abandoning any subsequent statements in the function body.",
    "hint": "Immediate function termination."
  },
  {
    "id": 4,
    "question": "What is printed by: `def f(): print('A'); return; print('B'); f()`?",
    "options": [
      "A",
      "A B",
      "B",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "'A' is printed. Then `return` immediately exits the function, so `print('B')` is dead code and never executes.",
    "hint": "Unreachable code after return."
  },
  {
    "id": 5,
    "question": "What is unreachable code?",
    "options": [
      "Code stored on an encrypted drive",
      "Statements positioned after an unconditional return statement that can never execute",
      "Code written in another language",
      "Syntax errors"
    ],
    "correctAnswer": 1,
    "explanation": "Statements placed after a `return`, `break`, or `raise` in the same execution block can never be reached.",
    "hint": "Dead/unreachable statements."
  },
  {
    "id": 6,
    "question": "What will `def f(): x = 10; res = f(); print(res)` output?",
    "options": [
      "10",
      "None",
      "NameError",
      "SyntaxError"
    ],
    "correctAnswer": 1,
    "explanation": "The function assigns local `x = 10` but has no return statement. Hence it implicitly returns `None`.",
    "hint": "Implicit None return."
  },
  {
    "id": 7,
    "question": "Can a function call be part of an expression (e.g. `total = 5 + calc()`)?",
    "options": [
      "Yes, if calc() returns a numeric value, it evaluates and participates in arithmetic",
      "No, function calls must stand alone",
      "Only with print()",
      "Causes TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "Fruitful functions produce values that seamlessly participate in surrounding expressions.",
    "hint": "Fruitful expression participation."
  },
  {
    "id": 8,
    "question": "What error occurs if recursive function calls exceed the maximum call stack depth?",
    "options": [
      "RecursionError: maximum recursion depth exceeded",
      "StackOverflowError",
      "MemoryError",
      "IndexError"
    ],
    "correctAnswer": 0,
    "explanation": "Exceeding the call stack limit (default 1000 in CPython) raises `RecursionError`.",
    "hint": "Python recursion depth limit error."
  },
  {
    "id": 9,
    "question": "What function in `sys` module checks the current recursion depth limit?",
    "options": [
      "sys.getrecursionlimit()",
      "sys.max_stack()",
      "sys.limit()",
      "sys.call_depth()"
    ],
    "correctAnswer": 0,
    "explanation": "`sys.getrecursionlimit()` returns the maximum active call stack depth.",
    "hint": "getrecursionlimit function."
  },
  {
    "id": 10,
    "question": "What is the output of: `def f(n): if n == 0: return 'Zero'; return 'Non-Zero'; print(f(0))`?",
    "options": [
      "Zero",
      "Non-Zero",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Because `n == 0` is True, `return 'Zero'` executes immediately and exits the function.",
    "hint": "Early return on condition."
  },
  {
    "id": 11,
    "question": "Can a `return` statement be placed inside a loop inside a function?",
    "options": [
      "Yes, executing return terminates both the loop AND the function immediately",
      "No, return can only be outside loops",
      "Only while loops",
      "Raises SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "A `return` inside a loop immediately terminates the loop and exits the enclosing function.",
    "hint": "Return exits loop and function."
  },
  {
    "id": 12,
    "question": "What is the output of: `def f(): return 1, 2; a = f(); print(type(a))`?",
    "options": [
      "<class 'tuple'>",
      "<class 'list'>",
      "<class 'int'>",
      "<class 'set'>"
    ],
    "correctAnswer": 0,
    "explanation": "Returning multiple comma-separated values packages them into a `tuple`.",
    "hint": "Tuple packing on return."
  },
  {
    "id": 13,
    "question": "What is printed by: `def add(a, b): return a + b; print(add(add(1, 2), add(3, 4)))`?",
    "options": [
      "10",
      "7",
      "21",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`add(1, 2)` returns 3; `add(3, 4)` returns 7. Then outer `add(3, 7)` returns 10.",
    "hint": "Composition of function calls."
  },
  {
    "id": 14,
    "question": "What does a stack frame contain?",
    "options": [
      "Local variables, parameters, and return address of an active function invocation",
      "Global operating system data",
      "All strings in Python",
      "Source code text"
    ],
    "correctAnswer": 0,
    "explanation": "A stack frame encapsulates local execution state, formal parameters, and the return address.",
    "hint": "Activation record / stack frame."
  },
  {
    "id": 15,
    "question": "What is the output of: `def check(x): return True if x > 0 else False; print(check(-5))`?",
    "options": [
      "False",
      "True",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Because `-5 > 0` is False, the ternary expression returns `False`.",
    "hint": "Ternary return."
  },
  {
    "id": 16,
    "question": "What will `print(print('Hi'))` output?",
    "options": [
      "Hi then None",
      "Hi Hi",
      "None Hi",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "The inner `print('Hi')` outputs `'Hi'` and returns `None`. The outer `print` then outputs `None`.",
    "hint": "Inner print output and return value."
  },
  {
    "id": 17,
    "question": "Can a function return another function object?",
    "options": [
      "Yes, functions are first-class objects and can be returned by higher-order functions",
      "No, only primitive types can be returned",
      "Only if converted to lambda",
      "Only in classes"
    ],
    "correctAnswer": 0,
    "explanation": "Higher-order functions in Python can construct and return function objects.",
    "hint": "Higher-order functions."
  },
  {
    "id": 18,
    "question": "What is the output of: `def f(): pass; print(f() is None)`?",
    "options": [
      "True",
      "False",
      "Error",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`f()` returns `None`, so `None is None` evaluates to `True`.",
    "hint": "Identity test of None return."
  },
  {
    "id": 19,
    "question": "What is the output of: `def cube(x): return x ** 3; print(cube(3))`?",
    "options": [
      "27",
      "9",
      "81",
      "6"
    ],
    "correctAnswer": 0,
    "explanation": "`3 ** 3 = 27`.",
    "hint": "Exponent calculation."
  },
  {
    "id": 20,
    "question": "If a function definition has no arguments, how must it be called?",
    "options": [
      "With empty parentheses `func()`",
      "Without parentheses `func`",
      "With None `func(None)`",
      "With void `func(void)`"
    ],
    "correctAnswer": 0,
    "explanation": "Parentheses `()` are the invocation operator; without them, you reference the function object itself.",
    "hint": "Invocation operator."
  },
  {
    "id": 21,
    "question": "What is the difference between `f` and `f()` in Python?",
    "options": [
      "`f` references the function object; `f()` executes/invokes the function",
      "They are identical",
      "`f` calls the function; `f()` defines it",
      "`f` is illegal"
    ],
    "correctAnswer": 0,
    "explanation": "Writing `f` refers to the function object in memory; appending parentheses `f()` executes it.",
    "hint": "Object reference vs execution."
  },
  {
    "id": 22,
    "question": "What is the output of: `def f(x): return x * 2; print(f(f(2)))`?",
    "options": [
      "8",
      "4",
      "16",
      "2"
    ],
    "correctAnswer": 0,
    "explanation": "Inner `f(2)` returns 4; outer `f(4)` returns 8.",
    "hint": "Nested function evaluation."
  },
  {
    "id": 23,
    "question": "What happens if an exception occurs inside a function and is not caught?",
    "options": [
      "It propagates up the call stack to the caller, terminating execution if unhandled",
      "The function restarts automatically",
      "The function returns 0",
      "The error is silenced"
    ],
    "correctAnswer": 0,
    "explanation": "Unhandled exceptions unwind the call stack until caught or causing a crash with a traceback.",
    "hint": "Exception propagation up call stack."
  },
  {
    "id": 24,
    "question": "Can a function return a list?",
    "options": [
      "Yes, functions can return any valid Python object including lists, dicts, and tuples",
      "No, only numbers and strings",
      "Only empty lists",
      "Only tuples"
    ],
    "correctAnswer": 0,
    "explanation": "Python functions have no return type constraints and can return any object.",
    "hint": "Arbitrary object return."
  },
  {
    "id": 25,
    "question": "In CBSE board marking, why must students trace return values carefully in multi-function questions?",
    "options": [
      "Because return values often feed directly into subsequent function calls in Section A and B questions",
      "Examiners do not care about return values",
      "Because print cannot be used",
      "Because variables are global"
    ],
    "correctAnswer": 0,
    "explanation": "Exam questions chain functions (`funcA(funcB(x))`), where an error in the first return cascades through the entire answer.",
    "hint": "Chained call tracing."
  }
];

export default questions;
