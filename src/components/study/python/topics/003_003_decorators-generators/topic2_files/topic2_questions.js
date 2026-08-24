// src/components/study/python/topics/003_003_decorators-generators/topic2_files/topic2_questions.js
// Comprehensive Master Review Questions for Topic 2: Understanding Decorators: Concept and @decorator syntax

const questions = [
  {
    question: "What is a Decorator in Python?",
    shortAnswer: "A higher-order function that takes another function as an argument, extends or alters its behavior without modifying its source code, and returns a new callable wrapper function object.",
    explanation: "A clean implementation of the structural Decorator Pattern.",
    hint: "A function that takes a function, adds functionality, and returns a wrapper.",
    level: "basic",
    codeExample: "@my_decorator\ndef greet(): print('Hello')"
  },
  {
    question: "What is the '@decorator' syntax equivalent to in standard Python code?",
    shortAnswer: "Writing '@dec' above 'def foo(): ...' is 100% equivalent to 'foo = dec(foo)'.",
    explanation: "Syntactic sugar introduced in PEP 318.",
    hint: "It is equivalent to: target_func = decorator(target_func).",
    level: "basic",
    codeExample: "# @my_dec\n# def foo(): ...\n# Equivalent to: foo = my_dec(foo)"
  },
  {
    question: "Why should wrapper functions in decorators almost always accept '*args, **kwargs'?",
    shortAnswer: "To make the decorator universal, allowing it to wrap functions that accept any number of positional or keyword arguments without raising TypeError signature mismatch errors.",
    explanation: "Ensures reusable decorator design.",
    hint: "To support decorating any function regardless of its argument signature.",
    level: "basic",
    codeExample: "def wrapper(*args, **kwargs):\n    return func(*args, **kwargs)"
  },
  {
    question: "What happens if a decorator wrapper executes 'func(*args, **kwargs)' but forgets to 'return' the result?",
    shortAnswer: "The decorated function will execute correctly, but will silently return 'None' to its caller instead of its actual computed return value!",
    explanation: "One of the most frequent beginner decorator bugs.",
    hint: "The caller will receive None instead of the real return value.",
    level: "basic",
    codeExample: "# BUG: def wrapper(): func()  # Returns None!\n# FIX: def wrapper(): return func()"
  },
  {
    question: "What is the 'Metadata Erasure Trap' in Python decorators?",
    shortAnswer: "When a function is decorated without '@functools.wraps', its '__name__', '__doc__', and '__annotations__' attributes are overwritten by the generic inner 'wrapper' function's attributes, breaking help(), docstrings, and IDE introspection.",
    explanation: "Erases the identity of the original function.",
    hint: "The decorated function's __name__ becomes 'wrapper' and __doc__ is lost.",
    level: "moderate",
    codeExample: "# Without wraps: print(add.__name__) -> 'wrapper'"
  },
  {
    question: "How does '@functools.wraps(func)' solve the metadata erasure problem?",
    shortAnswer: "It copies the original function's '__name__', '__doc__', '__module__', '__annotations__', and sets '__wrapped__' onto the inner wrapper function, preserving its true identity.",
    explanation: "Standard library utility for writing professional decorators.",
    hint: "It copies the original function's metadata onto the wrapper.",
    level: "basic",
    codeExample: "import functools\n@functools.wraps(func)\ndef wrapper(*args, **kwargs): ..."
  },
  {
    question: "What does the '__wrapped__' attribute on a decorated function provide?",
    shortAnswer: "It points directly to the original primordial un-decorated function object, allowing developers and test suites to bypass the decorator wrapper and invoke the raw function directly.",
    explanation: "Populated automatically by @functools.wraps.",
    hint: "Provides direct access to the original un-wrapped function object.",
    level: "moderate",
    codeExample: "raw_result = decorated_func.__wrapped__(*args)"
  },
  {
    question: "In what order do stacked decorators execute?",
    shortAnswer: "Decorators wrap from BOTTOM to TOP (closest to function first), but during runtime invocation, they execute from TOP to BOTTOM (outermost decorator runs first).",
    explanation: "@A @B def f() -> f = A(B(f)). A wraps the result of B.",
    hint: "Wrap bottom-to-top; execute top-to-bottom.",
    level: "moderate",
    codeExample: "# @dec_a\n# @dec_b\n# def f(): -> A runs first, then B, then f"
  },
  {
    question: "Can a decorator modify the arguments passed into the decorated function?",
    shortAnswer: "Yes. The wrapper function can sanitize, validate, or transform the arguments in 'args' and 'kwargs' before passing them into 'func(*args, **kwargs)'.",
    explanation: "Commonly used for argument casting, stripping whitespace, or security validation.",
    hint: "Yes, by modifying args/kwargs before calling the original function.",
    level: "basic",
    codeExample: "clean_args = [x.strip() for x in args]\nreturn func(*clean_args, **kwargs)"
  },
  {
    question: "Can a decorator alter or post-process the return value of a function?",
    shortAnswer: "Yes. The wrapper can capture 'res = func(*args, **kwargs)', apply transformations (e.g. converting to JSON, rounding decimals, encrypting), and return the modified result.",
    explanation: "Enables output formatting and response post-processing.",
    hint: "Yes, capture result = func() and transform it before returning.",
    level: "basic",
    codeExample: "res = func(*args)\nreturn round(res, 2)"
  },
  {
    question: "Can a decorator prevent the decorated function from executing entirely?",
    shortAnswer: "Yes. If an authorization check or rate limit fails inside the wrapper, the wrapper can raise an exception or return an error response without ever calling 'func()'.",
    explanation: "Core mechanism for authentication guards and caching.",
    hint: "Yes, by raising an error or returning early without calling func().",
    level: "basic",
    codeExample: "if not user.is_authenticated: raise PermissionError\nreturn func(*args)"
  },
  {
    question: "When is the decorator function itself executed?",
    shortAnswer: "At module IMPORT / DEFINITION time (when the function is defined), NOT at function invocation time; only the returned wrapper function executes on each call.",
    explanation: "A critical distinction between setup-time and runtime.",
    hint: "The decorator runs once at definition time; the wrapper runs on every call.",
    level: "complex",
    codeExample: "# Decorator outer body runs when module loads"
  },
  {
    question: "Can a class method inside an OOP class be decorated with a standard decorator?",
    shortAnswer: "Yes. The method's 'self' reference will simply be passed as the very first argument in '*args' to the wrapper function.",
    explanation: "Standard decorators work seamlessly on instance methods.",
    hint: "Yes, 'self' is passed as the first positional argument in args.",
    level: "moderate",
    codeExample: "class Account:\n    @timer\n    def pay(self, amt): ..."
  },
  {
    question: "What is the difference between a function decorator and a class decorator?",
    shortAnswer: "A function decorator wraps and returns a callable function; a class decorator takes a class object ('cls') as input, modifies its attributes/methods, and returns the modified class.",
    explanation: "Both use the @ syntax but target different constructs.",
    hint: "Function decorators wrap functions; class decorators modify entire classes.",
    level: "moderate",
    codeExample: "@dataclass\nclass Student: ..."
  },
  {
    question: "What built-in decorators are commonly used in standard Python?",
    shortAnswer: "'@property', '@classmethod', '@staticmethod', '@functools.lru_cache', and '@dataclasses.dataclass'.",
    explanation: "Standard library tools implemented as decorators.",
    hint: "@property, @classmethod, @staticmethod, @lru_cache.",
    level: "basic",
    codeExample: "@classmethod\ndef from_string(cls, s): ..."
  },
  {
    question: "Why is a decorator preferred over manually placing logging code inside 20 different functions?",
    shortAnswer: "Because decorators adhere to the DRY (Don't Repeat Yourself) principle and Single Responsibility Principle, separating cross-cutting concerns (logging, timing, auth) from core business logic.",
    explanation: "Eliminates duplicate boilerplate across the entire codebase.",
    hint: "Adheres to DRY and separates cross-cutting concerns from business logic.",
    level: "basic",
    codeExample: "# Write logging once in @logger; apply to 20 functions"
  },
  {
    question: "How can a decorator implement basic caching / memoization?",
    shortAnswer: "By storing a dictionary in the enclosing closure scope, using 'args' as a dictionary key, and returning the cached value if the key already exists before calling 'func()'.",
    explanation: "The foundation of functools.lru_cache.",
    hint: "Using a closure dictionary to store previous results by argument tuple key.",
    level: "moderate",
    codeExample: "cache = {}\nif args in cache: return cache[args]"
  },
  {
    question: "Can a decorator catch and handle exceptions raised by the decorated function?",
    shortAnswer: "Yes. The wrapper can wrap the 'func(*args, **kwargs)' call inside a 'try...except' block to log errors, retry failed network calls, or return safe default fallbacks.",
    explanation: "Commonly used in resilience decorators (retry, fallback).",
    hint: "Yes, by placing a try...except around the func() call in the wrapper.",
    level: "basic",
    codeExample: "try: return func(*args)\nexcept TimeoutError: return fallback()"
  },
  {
    question: "What is an 'Identity Decorator'?",
    shortAnswer: "A decorator that simply registers or inspects a function and returns the original function unaltered ('return func') without creating an inner wrapper.",
    explanation: "Often used for route registration in web frameworks (e.g. Flask/FastAPI @app.route).",
    hint: "A decorator that registers the function and returns it without wrapping.",
    level: "complex",
    codeExample: "def register(func):\n    REGISTRY.append(func)\n    return func"
  },
  {
    question: "How does 'pytest.fixture' use decorators?",
    shortAnswer: "It decorates setup functions to mark them as dependency injection fixtures, providing test data and resources to test functions automatically.",
    explanation: "Core pattern in modern test frameworks.",
    hint: "Marks setup functions for dependency injection in tests.",
    level: "moderate",
    codeExample: "@pytest.fixture\ndef student_db(): return DB()"
  },
  {
    question: "Can a decorator accept custom arguments (e.g. '@retry(max_attempts=3)')?",
    shortAnswer: "Yes. This requires a 3-layer nested decorator factory: the outermost function takes the arguments, the middle function takes the target function, and the innermost function is the wrapper.",
    explanation: "Topic 4 will explore decorators with arguments in depth.",
    hint: "Yes, via a 3-layer decorator factory function.",
    level: "moderate",
    codeExample: "def repeat(num):\n    def decorator(fn):\n        def wrapper(): ...\n        return wrapper\n    return decorator"
  },
  {
    question: "What is the performance overhead of calling a decorated function?",
    shortAnswer: "It introduces one extra Python function call frame overhead (~100-200 nanoseconds), which is negligible for 99.9% of real-world applications.",
    explanation: "Extremely lightweight abstraction.",
    hint: "One extra frame call (~100-200 ns), negligible in practice.",
    level: "basic",
    codeExample: "# Negligible microsecond overhead"
  },
  {
    question: "How does Python inspect function signatures through decorators using the 'inspect' module?",
    shortAnswer: "'inspect.signature(decorated_func)' follows the '__wrapped__' chain established by '@functools.wraps', accurately extracting the original function's parameter names and type annotations.",
    explanation: "Crucial for frameworks like FastAPI and Pydantic.",
    hint: "inspect.signature() follows __wrapped__ to read original parameters.",
    level: "complex",
    codeExample: "import inspect\nsig = inspect.signature(func)"
  },
  {
    question: "Why should you never write 'def wrapper(args, kwargs):' without stars '*'? ",
    shortAnswer: "Without stars, 'wrapper' expects exactly 2 positional arguments named 'args' and 'kwargs', crashing immediately when called with normal function arguments!",
    explanation: "Must always use *args and **kwargs with asterisks.",
    hint: "Missing stars treats args and kwargs as 2 ordinary positional parameters.",
    level: "basic",
    codeExample: "# WRONG: def wrapper(args, kwargs)\n# RIGHT: def wrapper(*args, **kwargs)"
  },
  {
    question: "What is the ultimate golden rule for writing Python Decorators?",
    shortAnswer: "Always use '@functools.wraps(func)' on your wrapper, accept '*args, **kwargs' for universality, and always return the evaluated result of 'func(*args, **kwargs)'.",
    explanation: "The hallmark of robust, professional Python decorator engineering.",
    hint: "Use @functools.wraps, accept *args/**kwargs, and return the result.",
    level: "basic",
    codeExample: "# Professional, production-grade Python decorator"
  }
];

export default questions;
