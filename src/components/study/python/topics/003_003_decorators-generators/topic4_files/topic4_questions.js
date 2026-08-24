// src/components/study/python/topics/003_003_decorators-generators/topic4_files/topic4_questions.js
// Comprehensive Master Review Questions for Topic 4: Decorators with arguments & functools.wraps preservation

const questions = [
  {
    question: "Why do Decorators with Arguments require a 3-tier nested function architecture?",
    shortAnswer: "Because Python must first call the outermost Factory function with the custom arguments to generate the actual Decorator function (middle tier), which in turn accepts the target function and returns the Wrapper function (inner tier).",
    explanation: "Evaluates as: func = factory(args)(func).",
    hint: "Factory (Tier 1) -> Decorator (Tier 2) -> Wrapper (Tier 3).",
    level: "basic",
    codeExample: "def factory(arg):\n    def decorator(fn):\n        def wrapper(*a, **kw): ...\n        return wrapper\n    return decorator"
  },
  {
    question: "What does '@repeat(num_times=3)' evaluate to under the hood?",
    shortAnswer: "It is evaluated in 2 distinct steps: first 'dec = repeat(num_times=3)' (returns the decorator), then 'func = dec(func)'.",
    explanation: "Two successive function call evaluations.",
    hint: "func = repeat(num_times=3)(func).",
    level: "basic",
    codeExample: "# @repeat(3)\n# def foo(): pass\n# Equivalent to: foo = repeat(3)(foo)"
  },
  {
    question: "Where should '@functools.wraps(func)' be placed in a 3-tier decorator factory?",
    shortAnswer: "Directly above the innermost 'wrapper' function (Tier 3), passing the target function 'func' from Tier 2.",
    explanation: "Preserves the target function's metadata onto the returned wrapper.",
    hint: "Above the innermost wrapper function in Tier 3.",
    level: "basic",
    codeExample: "def decorator(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs): ..."
  },
  {
    question: "What happens if a decorator factory forgets to 'return decorator' from its outermost body?",
    shortAnswer: "The factory returns 'None', and when Python tries to apply the decorator via 'None(func)', a 'TypeError: 'NoneType' object is not callable' is immediately raised at import time!",
    explanation: "A frequent bug when writing 3-tier decorator factories.",
    hint: "Raises 'TypeError: NoneType object is not callable' at import time.",
    level: "moderate",
    codeExample: "# TypeError: 'NoneType' object is not callable"
  },
  {
    question: "How does a Parameterized Retry decorator implement Exponential Backoff?",
    shortAnswer: "By starting with an initial delay (e.g. 0.1s) and multiplying the delay by a backoff factor (e.g. 2.0x) on each caught retryable exception ('delay *= backoff_factor') before sleeping.",
    explanation: "Standard resilience pattern for distributed microservices.",
    hint: "Multiplies delay by backoff factor (e.g. 2x) on each retry attempt.",
    level: "moderate",
    codeExample: "time.sleep(current_delay)\ncurrent_delay *= backoff_factor"
  },
  {
    question: "Can a decorator factory accept optional arguments with default values?",
    shortAnswer: "Yes. By providing default parameter values in the outermost factory function: 'def repeat(num=3, prefix=\"LOG\"):'.",
    explanation: "Allows users to write '@repeat(num=5)' or '@repeat()'.",
    hint: "Yes, by defining default parameter values in the factory definition.",
    level: "basic",
    codeExample: "def repeat(num_times=3):\n    ..."
  },
  {
    question: "What is the difference between writing '@my_dec' and '@my_dec()'?",
    shortAnswer: "'@my_dec' passes the function directly to 'my_dec' (a standard 2-tier decorator); '@my_dec()' first invokes 'my_dec()' to obtain the decorator function (a 3-tier factory).",
    explanation: "Mixing these two syntax styles without designing a dual decorator causes TypeErrors.",
    hint: "@my_dec passes function directly; @my_dec() executes the factory first.",
    level: "moderate",
    codeExample: "# 2-tier: @my_dec\n# 3-tier: @my_dec()"
  },
  {
    question: "How can you design a 'Dual Decorator' that works both WITH and WITHOUT parentheses (e.g. both '@dec' and '@dec(arg=val)')?",
    shortAnswer: "By checking if the first argument is callable: if callable, treat it as the target function and wrap immediately; otherwise return the decorator factory.",
    explanation: "Used extensively in libraries like Click and Pytest.",
    hint: "Check if the first argument is callable (isinstance/callable(arg)).",
    level: "complex",
    codeExample: "def smart_dec(func=None, *, option=1):\n    if func is not None: return decorator(func)\n    return decorator"
  },
  {
    question: "How does a TTL (Time-To-Live) caching decorator determine when a cached item has expired?",
    shortAnswer: "By storing a timestamp '(time.time(), result)' alongside the result in the cache dictionary and checking if 'current_time - cached_time > ttl_seconds'.",
    explanation: "Invalidates stale cache entries automatically on read.",
    hint: "Compares current timestamp with stored timestamp against TTL seconds.",
    level: "moderate",
    codeExample: "if time.time() - timestamp > ttl: recompute()"
  },
  {
    question: "How does '@functools.lru_cache' in Python's standard library handle decorator arguments?",
    shortAnswer: "'@functools.lru_cache(maxsize=128, typed=False)' is a 3-tier decorator factory that builds an LRU cache with configured capacity.",
    explanation: "Standard library implementation of parameterized memoization.",
    hint: "It is a standard 3-tier decorator factory from the functools module.",
    level: "basic",
    codeExample: "@functools.lru_cache(maxsize=256)\ndef fib(n): ..."
  },
  {
    question: "What key is used in caching decorators to store results for parameterized functions?",
    shortAnswer: "A hashable tuple containing positional 'args' and sorted keyword arguments: '(args, tuple(sorted(kwargs.items())))'.",
    explanation: "Ensures dictionary keys are immutable and order-independent.",
    hint: "A hashable tuple of args and sorted kwargs items.",
    level: "moderate",
    codeExample: "key = (args, tuple(sorted(kwargs.items())))"
  },
  {
    question: "Can a decorator factory accept complex objects like database connections or logger instances as arguments?",
    shortAnswer: "Yes. Decorator factories can accept any valid Python objects (instances, classes, strings, callables, configs) as arguments.",
    explanation: "Enables dependency injection into decorator wrappers.",
    hint: "Yes, decorator factories can accept any Python objects.",
    level: "basic",
    codeExample: "@inject_db(db_engine=prod_engine)\ndef get_student(): pass"
  },
  {
    question: "How can a decorator with arguments attach helper methods to the returned wrapper?",
    shortAnswer: "By defining helper functions inside Tier 2 (the middle decorator) and binding them as attributes on the wrapper object before returning (e.g. 'wrapper.cache_info = cache_info').",
    explanation: "Allows runtime inspection and cache clearing.",
    hint: "Attach helper functions directly to wrapper object attributes.",
    level: "moderate",
    codeExample: "wrapper.cache_info = cache_info\nwrapper.cache_clear = cache_clear"
  },
  {
    question: "Why should mutable objects (like empty lists '[]' or dicts '{}') be avoided as default arguments in decorator factories?",
    shortAnswer: "Because default mutable arguments are instantiated once at module definition time, meaning all decorated functions would unintentionally share the same mutable object across scopes!",
    explanation: "The classic Python mutable default argument trap.",
    hint: "Use None as default and initialize a new list inside the factory body.",
    level: "moderate",
    codeExample: "# AVOID: def factory(tags=[])\n# USE: def factory(tags=None): if tags is None: tags = []"
  },
  {
    question: "What happens if a decorated function raises an unhandled exception inside a retry decorator?",
    shortAnswer: "If retries are exhausted or the raised exception is not listed in 'retryable_exceptions', the decorator lets the exception propagate upward to the caller.",
    explanation: "Preserves transparent exception handling.",
    hint: "The exception propagates upward to the caller.",
    level: "basic",
    codeExample: "if attempt == max_retries: raise"
  },
  {
    question: "How do class-based decorators with arguments work (using '__init__' and '__call__')?",
    shortAnswer: "'__init__(self, *dec_args)' captures the decorator arguments, and '__call__(self, func)' accepts the target function and returns the wrapper.",
    explanation: "An alternative OOP approach to 3-tier function factories.",
    hint: "__init__ takes decorator arguments; __call__ takes the function.",
    level: "complex",
    codeExample: "class Repeat:\n    def __init__(self, n): self.n = n\n    def __call__(self, fn): ..."
  },
  {
    question: "Can multiple decorator factories be chained on a single function?",
    shortAnswer: "Yes. Python evaluates all factory calls from top to bottom at definition time to generate the middle decorator functions, then wraps the target function from bottom to top.",
    explanation: "Seamlessly stacks parameterized decorators.",
    hint: "Yes, Python evaluates all factory arguments and wraps the decorators.",
    level: "basic",
    codeExample: "@retry(max=3)\n@memoize(ttl=60)\n@audit(code='PAY')\ndef process(): pass"
  },
  {
    question: "How does '@pytest.mark.parametrize' utilize decorators with arguments?",
    shortAnswer: "It acts as a decorator factory accepting parameter names and a list of test tuples, generating parameterized test cases for each data row.",
    explanation: "Central feature of pytest testing framework.",
    hint: "It is a decorator factory generating parameterized test runs.",
    level: "moderate",
    codeExample: "@pytest.mark.parametrize('x,y', [(1,2), (3,4)])\ndef test_add(x, y): pass"
  },
  {
    question: "What is the memory impact of enclosing arguments in Tier 1 of a decorator factory?",
    shortAnswer: "The arguments are captured in heap 'cell' objects referenced in 'wrapper.__closure__', occupying a tiny memory footprint (~64 bytes per cell) that persists for the lifetime of the wrapper.",
    explanation: "Extremely efficient memory footprint.",
    hint: "Negligible footprint (~64 bytes) preserved in closure cells.",
    level: "complex",
    codeExample: "print(wrapper.__closure__)"
  },
  {
    question: "Can a decorator factory validate its own configuration arguments?",
    shortAnswer: "Yes. The outermost factory function can perform validation (e.g. checking that 'max_retries > 0') and raise ValueError immediately at module definition time.",
    explanation: "Fails fast before the application even starts serving requests.",
    hint: "Yes, validate parameters in the Tier 1 factory body before returning Tier 2.",
    level: "basic",
    codeExample: "if max_retries < 1: raise ValueError('max_retries must be >= 1')"
  },
  {
    question: "How can a decorator factory dynamically alter behavior based on environment variables (e.g. DEV vs PROD)?",
    shortAnswer: "By inspecting 'os.environ.get(\"ENV\")' inside the factory body and configuring decorator options (e.g. disabling caching or reducing retry timeouts in DEV) accordingly.",
    explanation: "Common pattern for environment-aware middleware.",
    hint: "Inspect os.environ inside the factory to adjust decorator behavior.",
    level: "moderate",
    codeExample: "if os.getenv('ENV') == 'DEV': return func # Bypass in DEV"
  },
  {
    question: "Why should '@functools.wraps(func)' always be used when writing decorator factories for web APIs?",
    shortAnswer: "Because modern web frameworks (FastAPI, Flask, Celery) inspect 'func.__name__', 'func.__doc__', and 'func.__annotations__' to generate OpenAPI docs and route tables; without wraps, routes collide as 'wrapper'!",
    explanation: "Route collision disaster in web frameworks without wraps.",
    hint: "Prevents endpoint name collisions and broken OpenAPI schema docs.",
    level: "moderate",
    codeExample: "# Crucial for FastAPI OpenAPI schema generation"
  },
  {
    question: "How do you unit-test a decorator factory with arguments?",
    shortAnswer: "Instantiate the factory with test arguments, pass a mock function, invoke the resulting wrapper with test arguments, and assert on expected side-effects and return values.",
    explanation: "Standard unit testing pattern for higher-order factories.",
    hint: "Test factory invocation -> wrapper generation -> wrapper execution.",
    level: "moderate",
    codeExample: "dec = repeat(3); wrapped = dec(mock_fn); wrapped()"
  },
  {
    question: "What is the primary difference between Decorators with Arguments and Decorators without Arguments?",
    shortAnswer: "Decorators without arguments have 2 tiers (decorator -> wrapper) and take the function directly; Decorators with arguments have 3 tiers (factory -> decorator -> wrapper) where the factory accepts configuration first.",
    explanation: "2 tiers vs 3 tiers.",
    hint: "2 tiers (func -> wrapper) vs 3 tiers (args -> func -> wrapper).",
    level: "basic",
    codeExample: "# No args: 2 tiers\n# With args: 3 tiers"
  },
  {
    question: "What is the ultimate golden rule for writing Decorators with Arguments in Python?",
    shortAnswer: "Master the 3-Tier Factory Architecture, always apply '@functools.wraps(func)' on the innermost wrapper, validate factory inputs upfront, forward '*args, **kwargs' transparently, and return the computed result.",
    explanation: "The blueprint for building world-class Python libraries and middleware.",
    hint: "Follow the 3-tier blueprint, use @functools.wraps, and validate factory inputs.",
    level: "basic",
    codeExample: "# World-class decorator engineering in Python"
  }
];

export default questions;
