const questions = [
  {
    id: 1,
    question: "Which category of error occurs when Python's formal grammatical rules are violated (e.g., missing colon at the end of an `if` header)?",
    options: ["Syntax Error (Compile-time Error)", "Logical Error", "Runtime Error", "Hardware Error"],
    correctAnswer: 0,
    explanation: "A Syntax Error occurs when the code violates the grammatical and structural rules of the Python language. It is detected by the parser before any program execution begins.",
    hint: "Violation of language grammar rules detected before execution."
  },
  {
    id: 2,
    question: "What type of error is present in the code below?\n```python\n# Calculating average of two marks\nmark1 = 80\nmark2 = 90\navg = mark1 + mark2 / 2\nprint('Average:', avg)\n```",
    options: [
      "Logical Error (Semantic Bug)",
      "Syntax Error",
      "ZeroDivisionError",
      "IndentationError"
    ],
    correctAnswer: 0,
    explanation: "This is a Logical Error. The program runs smoothly without crashing, but because `/` has higher precedence than `+`, it calculates $80 + (90/2) = 125$ instead of $(80 + 90) / 2 = 85$. The logic/formula is flawed.",
    hint: "The program runs without crashing but produces incorrect math results."
  },
  {
    id: 3,
    question: "Which type of error occurs during active program execution when an illegal operation is attempted (e.g., dividing a number by zero)?",
    options: [
      "Runtime Error (Exception)",
      "Syntax Error",
      "Compile-time Error",
      "Grammatical Error"
    ],
    correctAnswer: 0,
    explanation: "A Runtime Error (or Exception) occurs while the program is actively executing, causing abnormal program termination unless intercepted by an exception handler (`try-except`).",
    hint: "Errors that occur during execution like ZeroDivisionError."
  },
  {
    id: 4,
    question: "What exception is raised when you attempt to access an element at index 5 in a list of 3 items (`lst = [10, 20, 30]; print(lst[5])`)?",
    options: ["IndexError", "ValueError", "KeyError", "TypeError"],
    correctAnswer: 0,
    explanation: "`IndexError: list index out of range` is raised when trying to access a sequence subscript that exceeds valid index bounds.",
    hint: "Accessing an invalid list index raises IndexError."
  },
  {
    id: 5,
    question: "What exception is raised when executing `int('Barrackpore')`?",
    options: ["ValueError", "TypeError", "NameError", "SyntaxError"],
    correctAnswer: 0,
    explanation: "`ValueError: invalid literal for int() with base 10` is raised because the argument has the correct data type (`str`), but its content value cannot be parsed as a base-10 integer.",
    hint: "Right type (str), but wrong value content for integer conversion."
  },
  {
    id: 6,
    question: "What exception is raised when executing `'Python' + 10`?",
    options: ["TypeError", "ValueError", "IndexError", "SyntaxError"],
    correctAnswer: 0,
    explanation: "`TypeError: can only concatenate str (not 'int') to str` is raised because binary operator `+` cannot combine incompatible data types (`str` and `int`).",
    hint: "Incompatible data types in operation raise TypeError."
  },
  {
    id: 7,
    question: "What exception is raised when using a variable name before assigning any value to it (`print(unassigned_score)`)?",
    options: ["NameError", "TypeError", "ValueError", "AttributeError"],
    correctAnswer: 0,
    explanation: "`NameError: name 'unassigned_score' is not defined` is raised when a local or global identifier name cannot be resolved in current scope dictionaries.",
    hint: "Undefined variable names raise NameError."
  },
  {
    id: 8,
    question: "What exception is raised when looking up a non-existent key in a Python dictionary (`d = {'a': 1}; print(d['b'])`)?",
    options: ["KeyError", "IndexError", "ValueError", "NameError"],
    correctAnswer: 0,
    explanation: "`KeyError: 'b'` is raised when attempting to access a dictionary key that does not exist in the mapping.",
    hint: "Missing dictionary keys raise KeyError."
  },
  {
    id: 9,
    question: "What is an `IndentationError` in Python?",
    options: [
      "A subclass of SyntaxError caused by incorrect leading whitespace or mixing tabs and spaces in code blocks",
      "A runtime hardware memory error",
      "An error when printing text with tabs",
      "A keyboard input malfunction"
    ],
    correctAnswer: 0,
    explanation: "`IndentationError` is a SyntaxError raised when code block indentation levels (e.g. inside `if`, `for`, `def`) are inconsistent or incorrectly aligned.",
    hint: "Incorrect whitespace alignment of code blocks."
  },
  {
    id: 10,
    question: "What is the primary purpose of a Python 'Traceback' report displayed during an unhandled exception?",
    options: [
      "To trace the sequence of nested function calls, exact file names, and line numbers where the error originated",
      "To delete faulty lines of code automatically",
      "To restart the computer",
      "To encrypt the crash log"
    ],
    correctAnswer: 0,
    explanation: "A Traceback shows the active call stack at the moment the exception was raised, pointing directly to the exact file, line number, code line, and exception type.",
    hint: "Call stack showing file and line number where error occurred."
  },
  {
    id: 11,
    question: "Which Python statement block is used to gracefully catch and handle runtime exceptions to prevent program crashes?",
    options: [
      "`try ... except`",
      "`catch ... throw`",
      "`test ... error`",
      "`if ... error`"
    ],
    correctAnswer: 0,
    explanation: "Python uses `try ... except` blocks. Code that might raise an exception is placed inside `try:`, and fallback recovery logic is placed inside `except <ErrorType>:`.",
    hint: "try ... except block."
  },
  {
    id: 12,
    question: "What is the output of the following code?\n```python\ntry:\n    res = 10 / 0\nexcept ZeroDivisionError:\n    res = -1\nprint(res)\n```",
    options: ["-1", "0", "ZeroDivisionError crash", "10"],
    correctAnswer: 0,
    explanation: "The division `10 / 0` raises `ZeroDivisionError`, which is immediately caught by the `except ZeroDivisionError:` block, assigning `res = -1`. The program prints `-1` without crashing.",
    hint: "Exception is intercepted and -1 is printed."
  },
  {
    id: 13,
    question: "What is 'Print Debugging'?",
    options: [
      "Inserting temporary `print()` statements at critical execution points to inspect intermediate variable values and execution flow",
      "Printing code onto physical paper and reading it with a magnifying glass",
      "Fixing printer hardware",
      "Printing comments only"
    ],
    correctAnswer: 0,
    explanation: "Print debugging involves placing `print()` logs throughout the code to monitor variable transformations and trace branch executions.",
    hint: "Using print() statements to inspect intermediate states."
  },
  {
    id: 14,
    question: "Which of the following is an example of a Syntax Error?",
    options: [
      "`if x == 10` (missing trailing colon)",
      "`num = 10 / 0`",
      "`lst = [1, 2]; x = lst[10]`",
      "`area = length + width` (when area requires `length * width`)"
    ],
    correctAnswer: 0,
    explanation: "`if x == 10` is missing the mandatory terminating colon `:`, which violates Python grammar rules and causes a compile-time `SyntaxError: expected ':'`.",
    hint: "Missing colon is a syntax violation."
  },
  {
    id: 15,
    question: "Which error is typically the hardest to identify and debug?",
    options: [
      "Logical Error",
      "Syntax Error",
      "Runtime Error",
      "IndentationError"
    ],
    correctAnswer: 0,
    explanation: "Logical Errors are the most difficult because the interpreter gives no error message, line number, or crash traceback. The program runs normally but silently produces incorrect results.",
    hint: "No error messages or crashes are generated for logical errors."
  },
  {
    id: 16,
    question: "What error occurs when you write `for i in range(5) print(i)` on a single line without a colon?",
    options: ["SyntaxError: invalid syntax", "RuntimeError", "TypeError", "ValueError"],
    correctAnswer: 0,
    explanation: "Omitting the colon after `range(5)` violates Python's compound statement syntax, raising `SyntaxError: invalid syntax`.",
    hint: "Missing colon raises SyntaxError."
  },
  {
    id: 17,
    question: "What exception is raised by the expression `math.sqrt(-25)` when using standard Python `math` module?",
    options: ["ValueError: math domain error", "TypeError", "ZeroDivisionError", "ComplexError"],
    correctAnswer: 0,
    explanation: "The standard `math.sqrt()` function only operates on non-negative real numbers. Passing a negative number raises `ValueError: math domain error`.",
    hint: "math.sqrt() on negatives raises ValueError (math domain error)."
  },
  {
    id: 18,
    question: "What is the optional `finally` block in Python exception handling used for?",
    options: [
      "To execute cleanup code (e.g., closing files, releasing network sockets) that MUST run regardless of whether an exception occurred or was handled",
      "To run code only if an exception is raised",
      "To stop the program immediately",
      "To compile code to bytecode"
    ],
    correctAnswer: 0,
    explanation: "The `finally` clause always executes before exiting the `try` statement, regardless of whether exceptions were raised or handled, making it ideal for resource cleanup.",
    hint: "finally block always runs for cleanup."
  },
  {
    id: 19,
    question: "What type of error is caused by misspelling a variable name in code (e.g. assigning `total_marks = 100` and then printing `print(totel_marks)`)?",
    options: [
      "Runtime Error (`NameError`)",
      "Syntax Error",
      "Logical Error",
      "IndentationError"
    ],
    correctAnswer: 0,
    explanation: "Misspelling a variable name does not violate grammar, but at runtime when Python tries to look up `totel_marks`, it raises a `NameError` (Runtime Error).",
    hint: "Looking up misspelled variables raises NameError at runtime."
  },
  {
    id: 20,
    question: "What exception is raised when attempting to open a non-existent file in read mode (`open('missing_file.txt', 'r')`)?",
    options: ["FileNotFoundError (subclass of OSError)", "KeyError", "IndexError", "ValueError"],
    correctAnswer: 0,
    explanation: "`FileNotFoundError` is raised at runtime when the requested file path does not exist on the storage drive.",
    hint: "Missing files raise FileNotFoundError."
  },
  {
    id: 21,
    question: "What error occurs if you attempt to modify an element in a tuple (`t = (1, 2, 3); t[0] = 99`)?",
    options: [
      "TypeError: 'tuple' object does not support item assignment",
      "IndexError",
      "ValueError",
      "SyntaxError"
    ],
    correctAnswer: 0,
    explanation: "Tuples are immutable data structures. Attempting item assignment raises a `TypeError`.",
    hint: "Tuple item assignment raises TypeError."
  },
  {
    id: 22,
    question: "Which of the following describes the difference between a bug and an exception?",
    options: [
      "A bug is a flaw in program logic or code; an exception is a runtime event/object signaling an error condition that disrupts normal program execution.",
      "They are identical terms.",
      "Exceptions only happen on Windows.",
      "Bugs are hardware errors."
    ],
    correctAnswer: 0,
    explanation: "A 'bug' is a defect in the source code; an 'exception' is the runtime anomalous condition/signal generated when an error occurs during execution.",
    hint: "Bug is the defect; exception is the runtime error signal."
  },
  {
    id: 23,
    question: "What happens if a runtime error is NOT caught inside a `try-except` block?",
    options: [
      "The program terminates abnormally (crashes) and displays a Traceback error message on stderr",
      "The program skips the error line and continues silently",
      "The CPU resets automatically",
      "The operating system deletes the file"
    ],
    correctAnswer: 0,
    explanation: "Unhandled exceptions propagate up the call stack until reaching top-level, halting execution and printing the full Traceback crash dump.",
    hint: "Unhandled exceptions crash the program."
  },
  {
    id: 24,
    question: "What is an `AssertionError` in Python?",
    options: [
      "An exception raised when an `assert condition` statement evaluates to `False`",
      "A syntax error in imports",
      "A network timeout",
      "An error when printing strings"
    ],
    correctAnswer: 0,
    explanation: "The `assert condition, message` statement is an internal debugging aid. If the condition is `False`, Python immediately raises an `AssertionError`.",
    hint: "assert condition raises AssertionError when false."
  },
  {
    id: 25,
    question: "Case Study: Tuhina is writing a program to calculate the perimeter of a rectangle. Her code is:\n```python\nlength = 10\nwidth = 5\nperimeter = 2 * length + width\nprint('Perimeter:', perimeter)\n```\nThe program outputs `25` instead of `30`. What type of error is this, and what is the fix?",
    options: [
      "Logical Error; Fix: Add parentheses: `perimeter = 2 * (length + width)`",
      "Syntax Error; Fix: Remove the `*` symbol",
      "Runtime Error; Fix: Use `float()`",
      "IndentationError; Fix: Add 4 spaces"
    ],
    correctAnswer: 0,
    explanation: "This is a Logical Error caused by operator precedence. `2 * length + width` evaluates as $(2 \times 10) + 5 = 25$. The correct formula requires grouping: `2 * (length + width) = 30`.",
    hint: "Operator precedence caused logical error; use parentheses 2 * (length + width)."
  }
];

export default questions;
