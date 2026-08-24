const questions = [
  {
    question: "What is a SyntaxError?",
    shortAnswer: "An error that occurs when Python code violates the language's grammar rules.",
    explanation: "Syntax errors are detected before the program runs. Examples: missing colon, unmatched parentheses, invalid indentation.",
    hint: "Check the line number in the error message.",
    level: "basic",
    codeExample: "def f() print('hi')  # missing colon after ()"
  },
  {
    question: "What is a NameError?",
    shortAnswer: "An error raised when a variable or function name is not defined.",
    explanation: "This happens when you try to use a name that hasn't been assigned or imported.",
    hint: "Check spelling and scope.",
    level: "basic",
    codeExample: "print(undefined_variable)  # NameError"
  },
  {
    question: "What is a TypeError?",
    shortAnswer: "An error raised when an operation is applied to an object of inappropriate type.",
    explanation: "Examples: adding string and integer, calling a non-callable object, wrong number of arguments.",
    hint: "Check types using `type()`.",
    level: "basic",
    codeExample: "len(42)  # TypeError: object of type 'int' has no len()"
  },
  {
    question: "What is an UnboundLocalError?",
    shortAnswer: "An error raised when a local variable is referenced before it has been assigned a value.",
    explanation: "Often occurs when you assign to a variable inside a function, making it local, but then try to read it before assignment.",
    hint: "Use `global` if you meant to modify a global variable.",
    level: "intermediate",
    codeExample: "x = 5\ndef f(): print(x); x = 10  # UnboundLocalError"
  },
  {
    question: "What is an IndentationError?",
    shortAnswer: "An error raised when code blocks are not indented consistently.",
    explanation: "Python uses indentation to define blocks. Mixing tabs and spaces or incorrect indentation causes this error.",
    hint: "Use 4 spaces consistently.",
    level: "basic",
    codeExample: "def f():\nprint('no indent')  # IndentationError"
  },
  {
    question: "What is a RecursionError?",
    shortAnswer: "An error raised when the maximum recursion depth is exceeded.",
    explanation: "This happens when a function calls itself recursively without a proper base case.",
    hint: "Check for infinite recursion.",
    level: "intermediate",
    codeExample: "def infinite(): return infinite()  # RecursionError"
  },
  {
    question: "What is the most common cause of UnboundLocalError in functions?",
    shortAnswer: "Assigning a value to a variable that is also read in the same function, without declaring it global.",
    explanation: "Python treats any assignment inside a function as creating a local variable, even if a global exists.",
    hint: "Use `global variable_name` to fix.",
    level: "intermediate",
    codeExample: "count = 0; def inc(): count += 1  # UnboundLocalError"
  },
  {
    question: "What does `pdb.set_trace()` do?",
    shortAnswer: "It starts an interactive debugger at that point in the code.",
    explanation: "You can inspect variables, step through code, and continue execution.",
    hint: "Type 'help' in the debugger for commands.",
    level: "advanced",
    codeExample: "import pdb; pdb.set_trace()"
  },
  {
    question: "How can you see the call stack when an error occurs?",
    shortAnswer: "The traceback printed by Python shows the call stack from the error point back to the start.",
    explanation: "Each line shows the file, line number, and function where the call occurred.",
    hint: "Read from bottom to top to see the sequence.",
    level: "basic",
    codeExample: "Traceback (most recent call last):\n  File 'script.py', line 5, in <module>\n    f()\n  ..."
  },
  {
    question: "What is the purpose of `assert` statements in debugging?",
    shortAnswer: "To check that a condition is true; if false, raise AssertionError.",
    explanation: "Assertions help catch logical errors early by verifying invariants.",
    hint: "Use for sanity checks, not for data validation.",
    level: "intermediate",
    codeExample: "def divide(a, b): assert b != 0, 'Division by zero'; return a/b"
  },
  {
    question: "Why does `def add_item(item, basket=[])` cause problems?",
    shortAnswer: "The default list is created once and shared across all calls, leading to unexpected accumulation.",
    explanation: "Each call modifies the same list. Use `None` as default and create a new list inside.",
    hint: "Mutable defaults are a common gotcha.",
    level: "intermediate",
    codeExample: "def f(lst=[]): lst.append(1); return lst  # accumulates"
  },
  {
    question: "What is the difference between `print()` debugging and using a debugger?",
    shortAnswer: "Print debugging adds output statements; a debugger allows interactive inspection and stepping.",
    explanation: "Print is simple but requires modifying code; a debugger is more powerful for complex issues.",
    hint: "Use print for quick checks, debugger for deep investigation.",
    level: "intermediate",
    codeExample: "# print(f'x={x}') vs pdb.set_trace()"
  },
  {
    question: "What does `try`/`except` do?",
    shortAnswer: "It catches and handles exceptions, preventing the program from crashing.",
    explanation: "Code in `try` block is executed; if an exception occurs, `except` block runs.",
    hint: "Use to handle expected errors gracefully.",
    level: "basic",
    codeExample: "try: x = int(input()) except ValueError: print('Not a number')"
  },
  {
    question: "How do you raise a custom error in a function?",
    shortAnswer: "Use `raise ValueError('message')` or another exception type.",
    explanation: "Raising exceptions allows you to signal error conditions to the caller.",
    hint: "Raise specific exceptions, not generic `Exception`.",
    level: "intermediate",
    codeExample: "def set_age(age):\n    if age < 0: raise ValueError('Age cannot be negative')"
  },
  {
    question: "What is a stack trace?",
    shortAnswer: "A report of the active stack frames at the point an exception occurred.",
    explanation: "It shows the sequence of function calls that led to the error.",
    hint: "Use it to trace the flow of execution.",
    level: "basic",
    codeExample: "The traceback printed by Python."
  },
  {
    question: "How can you debug a function that works for some inputs but fails for others?",
    shortAnswer: "Test with edge cases (empty list, zero, None, large numbers) and use print statements or assertions.",
    explanation: "Often the bug is in handling boundary conditions.",
    hint: "Write small test functions.",
    level: "intermediate",
    codeExample: "if not data: return 0  # handle empty case"
  },
  {
    question: "What is the `logging` module and why is it better than `print()`?",
    shortAnswer: "It provides configurable logging levels, timestamps, and output to files, making debugging in production easier.",
    explanation: "You can keep logs even after deployment, and control verbosity without code changes.",
    hint: "Use `logging.debug()`, `logging.info()`, etc.",
    level: "advanced",
    codeExample: "import logging; logging.basicConfig(level=logging.DEBUG)"
  },
  {
    question: "What is an off-by-one error?",
    shortAnswer: "An error where a loop iterates one too many or one too few times.",
    explanation: "Common with `range(n)` vs `range(1, n+1)` and indexing.",
    hint: "Check loop boundaries carefully.",
    level: "basic",
    codeExample: "for i in range(len(lst)): print(lst[i+1])  # IndexError on last"
  },
  {
    question: "How do you inspect variables in `pdb`?",
    shortAnswer: "Type the variable name at the `(Pdb)` prompt.",
    explanation: "You can also use `p variable` or `pp variable` for pretty printing.",
    hint: "Type `help` to see all commands.",
    level: "advanced",
    codeExample: "(Pdb) x\n(Pdb) p y"
  },
  {
    question: "What does `pdb` command `n` do?",
    shortAnswer: "Step to the next line in the current function (step over).",
    explanation: "It executes the current line and stops at the next line within the same function.",
    hint: "Use `s` to step into function calls.",
    level: "advanced",
    codeExample: "n  # next line"
  },
  {
    question: "What is a common cause of `AttributeError: 'NoneType' object has no attribute ...`?",
    shortAnswer: "A function returned `None` instead of an object, and you tried to call a method on it.",
    explanation: "Check that the function has a `return` statement and that it returns the expected object.",
    hint: "Add `return` or handle `None` cases.",
    level: "intermediate",
    codeExample: "def get_data(): pass  # returns None\nresult = get_data(); result.append(5)  # AttributeError"
  },
  {
    question: "What is a logic error?",
    shortAnswer: "An error where the code runs but produces incorrect results.",
    explanation: "No exception is raised; you must deduce the mistake by reasoning or testing.",
    hint: "Use print statements or a debugger to trace values.",
    level: "basic",
    codeExample: "def add(a,b): return a - b  # wrong operator"
  },
  {
    question: "How can you use `dir()` for debugging?",
    shortAnswer: "It lists the attributes and methods of an object, helping you see what's available.",
    explanation: "Useful when you forget what methods an object has.",
    hint: "`print(dir(my_object))`",
    level: "intermediate",
    codeExample: "print(dir([]))  # shows list methods"
  },
  {
    question: "What is the purpose of `finally` in exception handling?",
    shortAnswer: "It defines a block that runs whether an exception occurred or not, often for cleanup.",
    explanation: "Useful for closing files, releasing resources.",
    hint: "`finally` always executes.",
    level: "intermediate",
    codeExample: "try: f = open('file.txt'); ... finally: f.close()"
  },
  {
    question: "Why does `if x = 5:` cause a SyntaxError?",
    shortAnswer: "Assignment (`=`) is not allowed in conditionals; use comparison (`==`).",
    explanation: "Python forbids assignment in `if` to prevent accidental mistakes.",
    hint: "Use `==` for equality.",
    level: "basic",
    codeExample: "if x == 5:  # correct"
  },
  {
    question: "How can you debug a recursive function?",
    shortAnswer: "Add print statements showing the argument values at each call, and ensure base case is reached.",
    explanation: "Also use `pdb` to step through recursion levels.",
    hint: "Watch for infinite recursion.",
    level: "advanced",
    codeExample: "def fact(n): print(f'fact({n})'); return 1 if n<=1 else n*fact(n-1)"
  },
  {
    question: "What is an `IndexError`?",
    shortAnswer: "Raised when trying to access an index that is out of range for a sequence (list, tuple, string).",
    explanation: "Example: `lst[5]` when list has only 3 elements.",
    hint: "Check `len(lst)` before indexing.",
    level: "basic",
    codeExample: "lst = [1,2,3]; print(lst[5])  # IndexError"
  },
  {
    question: "What is a `KeyError`?",
    shortAnswer: "Raised when trying to access a dictionary key that does not exist.",
    explanation: "Use `dict.get(key, default)` to avoid.",
    hint: "Check if key exists with `if key in dict:`",
    level: "basic",
    codeExample: "d = {'a':1}; print(d['b'])  # KeyError"
  },
  {
    question: "How do you get the line number of an error in a traceback?",
    shortAnswer: "The traceback shows the file name and line number for each frame.",
    explanation: "Look for the line that says `File '...', line X`.",
    hint: "Start debugging at the last line before the error type.",
    level: "basic",
    codeExample: "File 'script.py', line 10, in <module>"
  },
  {
    question: "What is the difference between `breakpoint()` and `pdb.set_trace()`?",
    shortAnswer: "`breakpoint()` is a built-in function in Python 3.7+ that calls `pdb.set_trace()` by default, but can be customized.",
    explanation: "It's more flexible because you can change the debugger via `sys.breakpointhook()`.",
    hint: "Use `breakpoint()` for modern Python.",
    level: "advanced",
    codeExample: "breakpoint()  # same as pdb.set_trace()"
  },
  {
    question: "What is the most effective debugging strategy for beginners?",
    shortAnswer: "Add print statements to show variable values at different points, and read error messages carefully.",
    explanation: "Start simple: print inputs and outputs, check conditions, verify assumptions.",
    hint: "Don't guess – test each hypothesis.",
    level: "basic",
    codeExample: "print(f'Before loop: {var}')"
  }
];

export default questions;