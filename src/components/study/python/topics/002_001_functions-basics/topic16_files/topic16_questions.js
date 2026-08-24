const questions = [
  {
    question: "What is the most important principle when writing clean functions?",
    shortAnswer: "Single Responsibility Principle – each function should do one thing and do it well.",
    explanation: "A function that does one thing is easier to understand, test, and reuse. If you find yourself using 'and' in the function name, split it.",
    hint: "One function, one task.",
    level: "basic",
    codeExample: "# Bad: def process_and_validate(data)\n# Good: def validate(data); def process(data)"
  },
  {
    question: "How long should a function ideally be?",
    shortAnswer: "Typically less than 20 lines, often 5-10 lines. If it's longer, consider breaking it down.",
    explanation: "Short functions are easier to read, test, and debug. They also promote reusability.",
    hint: "If you need to scroll, it's probably too long.",
    level: "basic",
    codeExample: "# A function that spans 50 lines is a code smell."
  },
  {
    question: "What naming convention should be used for functions in Python?",
    shortAnswer: "Snake_case with lowercase letters and underscores, using verb phrases.",
    explanation: "PEP 8 recommends `calculate_average`, not `calculateAverage` or `CALCULATE_AVERAGE`.",
    hint: "Use verbs like `get_`, `set_`, `calculate_`, `validate_`.",
    level: "basic",
    codeExample: "def get_student_name(): return name"
  },
  {
    question: "What is a docstring and why is it important?",
    shortAnswer: "A multi-line string at the beginning of a function describing its purpose, parameters, and return value.",
    explanation: "Docstrings are accessed via `help()` and are essential for documentation and code maintenance.",
    hint: "Triple quotes right after the function definition.",
    level: "basic",
    codeExample: "def add(a, b):\n    \"\"\"Return the sum of a and b.\"\"\"\n    return a + b"
  },
  {
    question: "What is the single responsibility principle in functions?",
    shortAnswer: "A function should have exactly one reason to change, meaning it does one specific task.",
    explanation: "Functions that do multiple things are harder to test, reuse, and understand.",
    hint: "If you can describe the function using 'and', it's doing too much.",
    level: "intermediate",
    codeExample: "# Bad: fetch_and_parse_and_save()\n# Good: fetch(), parse(), save()"
  },
  {
    question: "Why should you avoid using global variables inside functions?",
    shortAnswer: "They create hidden dependencies and make functions impure, harder to test and debug.",
    explanation: "Functions that rely on global variables are not self-contained and can produce unexpected side effects.",
    hint: "Pass values as parameters instead.",
    level: "intermediate",
    codeExample: "# Bad: use global config\n# Good: def process(data, config)"
  },
  {
    question: "What is a pure function?",
    shortAnswer: "A function that always produces the same output for the same input and has no side effects.",
    explanation: "Pure functions are easier to test, reason about, and parallelize.",
    hint: "No global variables, no I/O, no mutation of arguments.",
    level: "intermediate",
    codeExample: "def square(x): return x * x  # pure"
  },
  {
    question: "What is the benefit of using type hints in function definitions?",
    shortAnswer: "They improve code readability and enable static type checking (e.g., with mypy).",
    explanation: "Type hints document expected argument and return types, helping other developers and catching errors early.",
    hint: "Use `def func(x: int) -> str:`",
    level: "intermediate",
    codeExample: "def greet(name: str) -> str:\n    return f'Hello, {name}'"
  },
  {
    question: "Why should you avoid using mutable default arguments (e.g., `def f(lst=[]`)`)?",
    shortAnswer: "The default list is created once and shared across all calls, leading to unexpected accumulation.",
    explanation: "Use `None` as default and create a new mutable inside the function.",
    hint: "Mutable defaults persist between calls.",
    level: "intermediate",
    codeExample: "# Bad: def add(item, lst=[])\n# Good: def add(item, lst=None); if lst is None: lst = []"
  },
  {
    question: "What is the maximum recommended number of arguments for a function?",
    shortAnswer: "Typically 3-4. More than that suggests the function does too much or you need a data class.",
    explanation: "Many arguments make calls hard to read and increase coupling.",
    hint: "Use named tuples, dataclasses, or dictionaries for many parameters.",
    level: "intermediate",
    codeExample: "# Better: def create_user(name, email, age)\n# Than: def create_user(name, email, age, city, country, phone, ...)"
  },
  {
    question: "What is the purpose of raising exceptions instead of returning error codes?",
    shortAnswer: "Exceptions separate error handling from normal flow and make code cleaner.",
    explanation: "Returning error codes (e.g., -1, None) requires checking after every call; exceptions propagate automatically.",
    hint: "Use `raise` for exceptional cases.",
    level: "intermediate",
    codeExample: "def divide(a, b):\n    if b == 0: raise ValueError('Cannot divide by zero')\n    return a / b"
  },
  {
    question: "Why should functions be small enough to fit on one screen?",
    shortAnswer: "It improves readability and reduces cognitive load.",
    explanation: "When a function is short, you can see its entire logic at once without scrolling.",
    hint: "If you need to scroll, consider refactoring.",
    level: "basic",
    codeExample: "A function longer than 20-30 lines is a candidate for splitting."
  },
  {
    question: "What is the 'Don't Repeat Yourself' (DRY) principle?",
    shortAnswer: "Avoid duplicating code; extract repeated logic into reusable functions.",
    explanation: "DRY reduces maintenance effort and bugs because changes are made in one place.",
    hint: "If you copy-paste code, you probably need a function.",
    level: "basic",
    codeExample: "# Instead of same calculation in multiple places, write a function."
  },
  {
    question: "What is defensive programming in functions?",
    shortAnswer: "Validating inputs and handling edge cases to prevent unexpected behavior.",
    explanation: "Check argument types, ranges, and existence before using them. Raise meaningful exceptions.",
    hint: "Assume the caller might pass bad data.",
    level: "intermediate",
    codeExample: "def set_age(age):\n    if not isinstance(age, int): raise TypeError('Age must be integer')\n    if age < 0 or age > 150: raise ValueError('Invalid age')"
  },
  {
    question: "Why should you prefer returning early over nested conditionals?",
    shortAnswer: "Early returns reduce nesting, making code flatter and easier to read.",
    explanation: "Handle error cases first, then proceed with the main logic.",
    hint: "Guard clauses.",
    level: "intermediate",
    codeExample: "def divide(a, b):\n    if b == 0: return None\n    return a / b"
  },
  {
    question: "What is the benefit of using `enumerate()` instead of `range(len())`?",
    shortAnswer: "`enumerate()` is more readable and Pythonic, providing both index and value.",
    explanation: "It avoids the need to index into the list, reducing errors.",
    hint: "Use `for i, item in enumerate(items):`",
    level: "basic",
    codeExample: "# Better: for i, val in enumerate(lst): print(i, val)\n# Worse: for i in range(len(lst)): print(i, lst[i])"
  },
  {
    question: "Why should you avoid using `*args` and `**kwargs` unless necessary?",
    shortAnswer: "They make function signatures less explicit, reducing readability and type safety.",
    explanation: "Use explicit parameters when you know them; `*args`/`**kwargs` are for wrappers and variable arguments.",
    hint: "Explicit is better than implicit.",
    level: "advanced",
    codeExample: "# Better: def connect(host, port, timeout)\n# Avoid: def connect(**kwargs) unless you need flexibility."
  },
  {
    question: "What is the purpose of using `if __name__ == '__main__':`?",
    shortAnswer: "It allows a module to be both imported and run as a script, with the main code executing only when run directly.",
    explanation: "This prevents code from running when the module is imported elsewhere.",
    hint: "Put test or demo code inside this block.",
    level: "basic",
    codeExample: "if __name__ == '__main__':\n    print('This runs only when script is executed directly')"
  },
  {
    question: "What is the advantage of using list comprehensions over `map()` with lambda?",
    shortAnswer: "List comprehensions are usually more readable and can include filtering.",
    explanation: "`[x*2 for x in data if x>0]` is clearer than `list(map(lambda x: x*2, filter(lambda x: x>0, data)))`.",
    hint: "Pythonic and expressive.",
    level: "intermediate",
    codeExample: "squares = [x**2 for x in numbers if x % 2 == 0]"
  },
  {
    question: "What is the best way to handle multiple return values?",
    shortAnswer: "Return a tuple and unpack it, or use a named tuple/dataclass for clarity.",
    explanation: "Returning a tuple is fine for two values; for more, use a class or named tuple to document the fields.",
    hint: "`return a, b` then `x, y = func()`.",
    level: "basic",
    codeExample: "def get_stats(data): return min(data), max(data), sum(data)/len(data)"
  },
  {
    question: "Why should you avoid `from module import *`?",
    shortAnswer: "It pollutes the namespace, making it unclear which names come from where, and can cause name collisions.",
    explanation: "Explicit imports like `from math import sqrt` are clearer and safer.",
    hint: "Explicit is better than implicit.",
    level: "basic",
    codeExample: "# Avoid: from math import *\n# Prefer: from math import sqrt, pi"
  },
  {
    question: "What is the purpose of adding a `_` prefix to a function name?",
    shortAnswer: "It indicates that the function is internal/private and should not be used outside the module.",
    explanation: "This is a convention, not enforced by Python. It signals intent to other developers.",
    hint: "One underscore for 'protected', two for name mangling.",
    level: "intermediate",
    codeExample: "def _internal_helper(): pass"
  },
  {
    question: "Why is it good practice to keep functions idempotent when possible?",
    shortAnswer: "An idempotent function can be called multiple times without changing the result beyond the first call.",
    explanation: "It simplifies reasoning and retry logic. Pure functions are naturally idempotent.",
    hint: "Calling it once or twice should have the same effect.",
    level: "advanced",
    codeExample: "def set_value(obj, value): obj.value = value  # idempotent"
  },
  {
    question: "What is the benefit of using `@staticmethod` or `@classmethod`?",
    shortAnswer: "They indicate that a method does not depend on instance state (`@staticmethod`) or that it operates on the class (`@classmethod`).",
    explanation: "These improve clarity and can be used without instantiating the class.",
    hint: "Use `@staticmethod` for utility functions related to the class.",
    level: "intermediate",
    codeExample: "class MathUtils:\n    @staticmethod\n    def add(a, b): return a + b"
  },
  {
    question: "Why should you avoid side effects in functions when possible?",
    shortAnswer: "Side effects (modifying globals, printing, file I/O) make functions harder to test and reuse.",
    explanation: "Prefer functions that take inputs and return outputs without altering external state.",
    hint: "Pure functions are easier to test.",
    level: "intermediate",
    codeExample: "# Bad: def update_and_return(x): global counter; counter += 1; return x + counter\n# Good: def add(x, y): return x + y"
  },
  {
    question: "What is the advantage of using `functools.wraps` in decorators?",
    shortAnswer: "It preserves the original function's metadata (name, docstring) when wrapping.",
    explanation: "Without `wraps`, the decorated function loses its identity, hurting debugging and documentation.",
    hint: "Always use `@wraps(func)` inside decorators.",
    level: "advanced",
    codeExample: "from functools import wraps\ndef timer(func):\n    @wraps(func)\n    def wrapper(*args, **kwargs): ..."
  },
  {
    question: "Why should you raise specific exceptions instead of generic `Exception`?",
    shortAnswer: "Specific exceptions (e.g., `ValueError`, `TypeError`) allow callers to handle different errors appropriately.",
    explanation: "Catching `Exception` can hide bugs; specific exceptions make error handling precise.",
    hint: "Be precise: `raise ValueError('Invalid input')`.",
    level: "intermediate",
    codeExample: "if age < 0: raise ValueError('Age cannot be negative')"
  },
  {
    question: "What is the best practice for handling function arguments that are optional?",
    shortAnswer: "Use default parameter values, but avoid mutable defaults. Use `None` as a sentinel.",
    explanation: "Default values make functions easier to use for common cases.",
    hint: "`def func(x, y=None): y = y or default`",
    level: "basic",
    codeExample: "def connect(timeout=None): timeout = timeout or 30"
  },
  {
    question: "What is the most important rule for writing reusable functions?",
    shortAnswer: "Functions should be generic enough to be useful in different contexts but specific enough to be clear.",
    explanation: "Avoid hard‑coding values that might change. Pass them as parameters.",
    hint: "Don't hardcode; parameterize.",
    level: "intermediate",
    codeExample: "# Bad: def greet(): print('Hello, Swadeep')\n# Good: def greet(name): print(f'Hello, {name}')"
  },
  {
    question: "What is the final best practice summary for functions?",
    shortAnswer: "Keep functions small, pure, well‑named, documented, and focused on a single task.",
    explanation: "These principles lead to code that is easy to read, test, and maintain.",
    hint: "The Zen of Python: Simple is better than complex.",
    level: "basic",
    codeExample: "Apply all the practices from this topic."
  }
];

export default questions;