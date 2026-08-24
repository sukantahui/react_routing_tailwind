const questions = [
  {
    question: "What does the `return` statement do in a Python function?",
    shortAnswer: "It exits the function and optionally sends a value back to the caller.",
    explanation: "`return` stops the function immediately and the value after `return` becomes the result of the function call.",
    hint: "It's how a function gives an answer.",
    level: "basic",
    codeExample: "def add(a,b): return a+b; result = add(2,3)  # result = 5"
  },
  {
    question: "What happens if a function has no `return` statement?",
    shortAnswer: "It returns `None` implicitly.",
    explanation: "Every Python function returns something; if no `return` is present, `None` is returned.",
    hint: "`None` represents 'no value'.",
    level: "basic",
    codeExample: "def say_hello(): print('Hi'); result = say_hello()  # None"
  },
  {
    question: "Can a function return multiple values?",
    shortAnswer: "Yes, by separating them with commas, which returns a tuple.",
    explanation: "`return a, b, c` is syntactic sugar for `return (a, b, c)`. The caller can unpack the tuple.",
    hint: "Multiple return values are packed into a tuple.",
    level: "basic",
    codeExample: "def swap(a,b): return b,a; x,y = swap(1,2)"
  },
  {
    question: "What is the difference between `print` and `return`?",
    shortAnswer: "`print` displays output to the console; `return` sends a value back to the caller for further use.",
    explanation: "`print` is for user‑facing output; `return` is for computation results. A function can do both.",
    hint: "`print` → screen; `return` → variable.",
    level: "basic",
    codeExample: "def f(): print(5); return 10; x = f()  # prints 5, x becomes 10"
  },
  {
    question: "Can you have multiple `return` statements in a function?",
    shortAnswer: "Yes, but only the first one encountered will execute; the function exits immediately.",
    explanation: "This is often used for conditional early exits (guard clauses).",
    hint: "Use early returns to simplify logic.",
    level: "intermediate",
    codeExample: "def absolute(x): if x<0: return -x; return x"
  },
  {
    question: "What type of values can be returned?",
    shortAnswer: "Any Python object: int, float, str, list, dict, tuple, None, custom objects, even functions.",
    explanation: "There is no restriction; `return` is very flexible.",
    hint: "Anything you can assign to a variable can be returned.",
    level: "basic",
    codeExample: "def get_list(): return [1,2,3]; def get_func(): return lambda x: x*2"
  },
  {
    question: "What is an early return pattern?",
    shortAnswer: "Using `return` before the end of the function to exit early, often after validation or error checking.",
    explanation: "It avoids deep nesting and makes code more readable.",
    hint: "Guard clauses.",
    level: "intermediate",
    codeExample: "def divide(a,b): if b==0: return None; return a/b"
  },
  {
    question: "What does `return` without a value (e.g., `return`) do?",
    shortAnswer: "It exits the function and returns `None`.",
    explanation: "It's equivalent to `return None` but shorter. Often used to exit early when no meaningful value is available.",
    hint: "Implicitly returns None.",
    level: "intermediate",
    codeExample: "def process(data): if not data: return; # continue processing"
  },
  {
    question: "Can I return a value and also print inside the same function?",
    shortAnswer: "Yes, a function can both print and return. They are independent operations.",
    explanation: "`print` sends output to console; `return` sends value to caller. They can coexist.",
    hint: "Not mutually exclusive.",
    level: "basic",
    codeExample: "def f(x): print(f'Calculating {x}'); return x*2"
  },
  {
    question: "How do you capture multiple return values?",
    shortAnswer: "By unpacking them into variables: `a, b = func()` or by storing the tuple and indexing.",
    explanation: "If you assign to a single variable, you get a tuple; multiple variables unpack the tuple.",
    hint: "Use comma‑separated variables on the left.",
    level: "basic",
    codeExample: "def stats(lst): return min(lst), max(lst); lo, hi = stats([1,2,3])"
  },
  {
    question: "What is the return type of a function that returns nothing?",
    shortAnswer: "`None` (of type `NoneType`).",
    explanation: "All functions that don't explicitly return a value return `None`.",
    hint: "`None` is a singleton.",
    level: "basic",
    codeExample: "def no_return(): pass; print(type(no_return()))  # <class 'NoneType'>"
  },
  {
    question: "Can I return a value after a loop?",
    shortAnswer: "Yes, the loop can run and then `return` after it finishes.",
    explanation: "The function exits only when `return` is reached.",
    hint: "Loop doesn't affect `return`.",
    level: "basic",
    codeExample: "def sum_all(lst): total=0; for n in lst: total+=n; return total"
  },
  {
    question: "What happens if I put code after a `return`?",
    shortAnswer: "It will never execute (unreachable code).",
    explanation: "Python ignores anything after a `return` within the same block because the function has already exited.",
    hint: "Dead code – usually a mistake.",
    level: "basic",
    codeExample: "def f(): return 5; print('Never runs')"
  },
  {
    question: "Can I return a value from a function and also modify a global variable?",
    shortAnswer: "Yes, but modifying globals is generally discouraged. Prefer to return the value.",
    explanation: "Functions can have side effects (like printing or modifying globals) and still return a value.",
    hint: "Return is usually cleaner.",
    level: "intermediate",
    codeExample: "counter=0; def inc(): global counter; counter+=1; return counter"
  },
  {
    question: "What is the difference between `return None` and just `return`?",
    shortAnswer: "They are functionally identical; `return` alone is shorter.",
    explanation: "PEP 8 recommends using `return` for early exits and `return None` for explicit intent at the end of a function.",
    hint: "Style preference.",
    level: "basic",
    codeExample: "def f(): return; def g(): return None"
  },
  {
    question: "Can a function return another function?",
    shortAnswer: "Yes, functions are first‑class citizens and can be returned.",
    explanation: "This is used in closures and decorators.",
    hint: "Higher‑order functions.",
    level: "advanced",
    codeExample: "def make_multiplier(n): return lambda x: x * n; double = make_multiplier(2)"
  },
  {
    question: "How do you indicate the return type in a docstring?",
    shortAnswer: "Use `:return:` or `:rtype:` in the docstring, or use type hints with `->`.",
    explanation: "Example: `def add(a: int, b: int) -> int:`.",
    hint: "Type hints are preferred in modern Python.",
    level: "intermediate",
    codeExample: "def add(a,b): \"\"\"Return sum. :rtype: int\"\"\" return a+b"
  },
  {
    question: "What is the result of calling `print(returning_function())`?",
    shortAnswer: "The function's return value is printed (if not None).",
    explanation: "First the function is called and returns a value; then `print` displays that value.",
    hint: "Nested evaluation.",
    level: "basic",
    codeExample: "def f(): return 42; print(f())  # prints 42"
  },
  {
    question: "Can I return a value from inside a nested function?",
    shortAnswer: "Yes, but that only returns from the inner function, not the outer one.",
    explanation: "Each `return` exits only its immediate function.",
    hint: "Return doesn't cross function boundaries.",
    level: "intermediate",
    codeExample: "def outer(): def inner(): return 5; inner(); return 10  # returns 10, not 5"
  },
  {
    question: "What is the default return value of a function that ends without a `return`?",
    shortAnswer: "`None`.",
    explanation: "Python implicitly adds `return None` at the end of every function if no explicit return exists.",
    hint: "Every function returns something.",
    level: "basic",
    codeExample: "def f(): pass; print(f())  # None"
  },
  {
    question: "How does `return` interact with `try`/`except`?",
    shortAnswer: "A `return` inside a `try` block will execute, and the `finally` block (if present) will still run before returning.",
    explanation: "`finally` always executes, even if `return` is encountered.",
    hint: "`finally` is special.",
    level: "advanced",
    codeExample: "def f(): try: return 1; finally: print('cleanup')"
  },
  {
    question: "Can I return a value and also raise an exception?",
    shortAnswer: "No, `return` and `raise` are mutually exclusive; `raise` exits the function with an exception, not a return value.",
    explanation: "If an exception is raised, the function does not return normally.",
    hint: "Exception overrides return.",
    level: "advanced",
    codeExample: "def f(): if error: raise ValueError; return 42  # not reached if error"
  },
  {
    question: "What is a common real‑world use of returning multiple values?",
    shortAnswer: "Returning status codes or multiple statistics (e.g., min, max, average) from a single function call.",
    explanation: "It avoids creating small classes or out‑parameters.",
    hint: "Convenient for related data.",
    level: "intermediate",
    codeExample: "def get_bounds(data): return min(data), max(data)"
  },
  {
    question: "Can I use `return` inside a lambda?",
    shortAnswer: "No, lambdas implicitly return the result of the expression; they cannot contain statements like `return`.",
    explanation: "Lambda body is a single expression, and that expression's value is automatically returned.",
    hint: "No `return` keyword needed in lambda.",
    level: "advanced",
    codeExample: "add = lambda a,b: a+b  # returns a+b"
  },
  {
    question: "What is the difference between `return` and `yield`?",
    shortAnswer: "`return` sends a single value and ends the function; `yield` produces a generator that can yield multiple values over time.",
    explanation: "`yield` is for generators; `return` is for regular functions.",
    hint: "`yield` is for sequences.",
    level: "advanced",
    codeExample: "def gen(): yield 1; yield 2  # generator"
  },
  {
    question: "Can I return a value from a `finally` block?",
    shortAnswer: "Yes, but it will override any previous `return` in the `try` block, which is usually undesirable.",
    explanation: "`finally` executes after `try`; if `finally` has `return`, that value is returned instead.",
    hint: "Avoid returning in `finally`.",
    level: "expert",
    codeExample: "def f(): try: return 1; finally: return 2  # returns 2"
  },
  {
    question: "How do I return a value from a recursive function?",
    shortAnswer: "Use `return` with the recursive call; the base case must return a value that propagates up.",
    explanation: "Each recursive call must pass the value back up the call stack.",
    hint: "Base case returns; recursive case returns function call.",
    level: "intermediate",
    codeExample: "def factorial(n): if n<=1: return 1; return n * factorial(n-1)"
  },
  {
    question: "What is the purpose of `->` in function definition?",
    shortAnswer: "It is a type hint indicating the return type (ignored at runtime).",
    explanation: "It helps developers and tools understand what the function returns.",
    hint: "Not enforced, but good practice.",
    level: "intermediate",
    codeExample: "def greet(name: str) -> str: return f'Hello {name}'"
  },
  {
    question: "Can I return a value from a function that is called inside another function?",
    shortAnswer: "Yes, the inner function's return goes to the caller of that inner function, which can then use or return it further.",
    explanation: "Return values propagate outward as needed.",
    hint: "Chain returns.",
    level: "intermediate",
    codeExample: "def outer(): def inner(): return 5; return inner()  # returns 5"
  },
  {
    question: "What happens if I forget to assign the return value?",
    shortAnswer: "The returned value is discarded (garbage collected). The function still executes, but the result is lost.",
    explanation: "This is fine for functions that have side effects (e.g., printing), but wasteful for pure computation.",
    hint: "If you need the result, assign it.",
    level: "basic",
    codeExample: "def square(x): return x*x; square(5)  # 25 computed and lost"
  },
  {
    question: "How do I return a value that is the result of a conditional expression?",
    shortAnswer: "Use `return value_if_true if condition else value_if_false`.",
    explanation: "The ternary operator works directly with `return`.",
    hint: "One‑liner.",
    level: "intermediate",
    codeExample: "def max(a,b): return a if a>b else b"
  }
];

export default questions;