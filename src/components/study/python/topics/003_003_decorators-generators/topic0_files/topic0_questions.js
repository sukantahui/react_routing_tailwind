// src/components/study/python/topics/003_003_decorators-generators/topic0_files/topic0_questions.js
// Comprehensive Master Review Questions for Topic 0: First-Class Functions: Passing and returning functions

const questions = [
  {
    question: "What does it mean that functions are 'First-Class Citizens' in Python?",
    shortAnswer: "It means functions are treated like any other standard object in Python: they can be assigned to variables, passed as arguments to other functions, returned from functions, and stored in data structures like lists and dicts.",
    explanation: "Core foundation of functional programming in Python.",
    hint: "Functions are treated as first-class objects just like integers, strings, or lists.",
    level: "basic",
    codeExample: "f = print\nf('Hello World')  # Aliasing function object"
  },
  {
    question: "What is the critical syntax difference between 'func' and 'func()' in Python?",
    shortAnswer: "'func' is a reference to the function object itself in memory; 'func()' invokes (calls) the function and evaluates to its return value.",
    explanation: "Passing 'func' passes the callable; passing 'func()' passes its evaluated result.",
    hint: "func is the function object; func() executes the function.",
    level: "basic",
    codeExample: "# Pass reference: button.on_click(handle_click)\n# Mistake: button.on_click(handle_click())"
  },
  {
    question: "What is a 'Higher-Order Function' (HOF)?",
    shortAnswer: "A function that takes one or more functions as arguments, or returns a function as its result (e.g. map, filter, sorted, or custom decorators).",
    explanation: "Enables flexible behavioral parameterization.",
    hint: "A function that accepts or returns other functions.",
    level: "basic",
    codeExample: "def operate(fn, val):\n    return fn(val)"
  },
  {
    question: "What is a 'Function Factory'?",
    shortAnswer: "A higher-order function that defines and returns a newly configured inner function customized with specific parameters.",
    explanation: "Allows dynamic creation of specialized calculation functions.",
    hint: "A function that builds and returns another customized function.",
    level: "moderate",
    codeExample: "def make_multiplier(n):\n    def mult(x): return x * n\n    return mult"
  },
  {
    question: "What is a 'Command Dispatch Table' pattern?",
    shortAnswer: "A pattern where string commands or action codes are mapped to function objects inside a dictionary, enabling O(1) lookups and eliminating sprawling 'if/elif/else' ladders.",
    explanation: "Clean, open-closed architecture for command routing.",
    hint: "A dictionary mapping command strings to function references.",
    level: "moderate",
    codeExample: "DISPATCH = {'ADD': handle_add, 'DEL': handle_del}\nDISPATCH[cmd]()"
  },
  {
    question: "What is the type of a standard function object in Python?",
    shortAnswer: "'types.FunctionType' (or '<class \"function\">').",
    explanation: "Functions are instances of the FunctionType class.",
    hint: "types.FunctionType.",
    level: "basic",
    codeExample: "import types\nisinstance(my_func, types.FunctionType)  # True"
  },
  {
    question: "What does the '__name__' attribute of a function store?",
    shortAnswer: "A string containing the original declared name of the function (e.g. 'calculate_tuition').",
    explanation: "Preserves the original identifier even when aliased to another variable.",
    hint: "Stores the string identifier name of the function.",
    level: "basic",
    codeExample: "def foo(): pass\nalias = foo\nprint(alias.__name__)  # 'foo'"
  },
  {
    question: "What does the '__doc__' attribute of a function store?",
    shortAnswer: "The docstring documentation string defined immediately below the function signature.",
    explanation: "Used by help(), IDEs, and documentation generators like Sphinx.",
    hint: "Stores the docstring of the function.",
    level: "basic",
    codeExample: "def calc(): '''Computes tax''' \nprint(calc.__doc__)  # 'Computes tax'"
  },
  {
    question: "What does the '__code__' attribute of a function store?",
    shortAnswer: "The compiled bytecode code object ('types.CodeType') containing instruction constants, argument counts, and variable names.",
    explanation: "Low-level CPython execution details.",
    hint: "Stores the compiled bytecode code object.",
    level: "complex",
    codeExample: "print(my_func.__code__.co_argcount)  # Number of arguments"
  },
  {
    question: "Can function objects have custom user-defined attributes attached to them?",
    shortAnswer: "Yes. Because functions are standard objects with a '__dict__', you can attach arbitrary attributes: 'my_func.custom_tag = \"v1.0\"'.",
    explanation: "Often used by frameworks to attach routing metadata or rate limits.",
    hint: "Yes, functions have a __dict__ and can store custom attributes.",
    level: "moderate",
    codeExample: "def service(): pass\nservice.version = '2.1.0'\nservice.author = 'Sukanta'"
  },
  {
    question: "How does the built-in 'sorted()' function use first-class functions?",
    shortAnswer: "It accepts a function reference in its 'key' parameter (e.g. 'sorted(students, key=lambda s: s[\"score\"])') to extract the comparison key dynamically.",
    explanation: "Standard library example of higher-order function usage.",
    hint: "Via the 'key' parameter which accepts a function reference.",
    level: "basic",
    codeExample: "sorted(roster, key=get_gpa, reverse=True)"
  },
  {
    question: "How do 'map()' and 'filter()' leverage first-class functions?",
    shortAnswer: "'map(func, iterable)' applies 'func' to each item in the iterable; 'filter(predicate, iterable)' keeps items where 'predicate(item)' evaluates to True.",
    explanation: "Standard functional transformation tools.",
    hint: "They take a function reference as their first argument to transform or filter data.",
    level: "basic",
    codeExample: "scores_taxed = list(map(add_gst, raw_scores))"
  },
  {
    question: "Can functions be defined inside conditional blocks or loops?",
    shortAnswer: "Yes. In Python, 'def' is an executable statement that creates and binds a function object at runtime, so it can be placed inside 'if/else' blocks or loops.",
    explanation: "Allows runtime function definition based on configuration.",
    hint: "Yes, 'def' executes at runtime and can be conditionally executed.",
    level: "moderate",
    codeExample: "if debug_mode:\n    def log(m): print(m)\nelse:\n    def log(m): pass"
  },
  {
    question: "What is 'Function Composition'?",
    shortAnswer: "The mathematical process of combining two or more functions (f and g) to produce a new function h(x) = f(g(x)), passing the output of one function as the input to the next.",
    explanation: "A fundamental technique in clean functional pipeline architecture.",
    hint: "Combining functions where output of one becomes input to the next.",
    level: "moderate",
    codeExample: "composed = lambda x: tax(discount(x))"
  },
  {
    question: "What happens when you delete the original function name with 'del original_func' after aliasing it?",
    shortAnswer: "The function object remains alive in memory and can still be invoked through the alias variable, because Python uses reference counting garbage collection.",
    explanation: "Objects exist as long as at least one reference points to them.",
    hint: "The function remains alive through other active variable references.",
    level: "moderate",
    codeExample: "alias = orig; del orig; alias()  # Still executes perfectly!"
  },
  {
    question: "How can you check if an arbitrary object is callable (i.e. can be invoked with ())?",
    shortAnswer: "By using the built-in 'callable(obj)' function, which returns True for functions, methods, and classes implementing '__call__'.",
    explanation: "Essential guard check before attempting invocation.",
    hint: "Use the built-in callable() function.",
    level: "basic",
    codeExample: "if callable(handler): handler()"
  },
  {
    question: "What is the difference between a lambda function and a standard 'def' function in terms of first-class status?",
    shortAnswer: "None. Both lambda and 'def' create identical first-class function objects of type 'types.FunctionType'; lambdas are simply anonymous and limited to a single expression.",
    explanation: "Lambdas are syntactic sugar for short single-expression functions.",
    hint: "Both produce identical first-class function objects.",
    level: "basic",
    codeExample: "type(lambda x: x) == type(def_func)  # True"
  },
  {
    question: "How does the 'functools.partial' function work?",
    shortAnswer: "It takes a callable and pre-fills (freezes) a subset of its positional or keyword arguments, returning a new first-class callable object.",
    explanation: "Standard library tool for creating specialized function variants.",
    hint: "Creates a new callable with certain arguments pre-filled.",
    level: "moderate",
    codeExample: "from functools import partial\npower_two = partial(pow, 2)"
  },
  {
    question: "What is the 'Callback Pattern' in Python?",
    shortAnswer: "Passing a function reference into an asynchronous task or event listener to be called back when the operation finishes (e.g. on_success, on_error).",
    explanation: "Widely used in GUI frameworks, web servers, and event loops.",
    hint: "Passing a function to be executed upon completion of an event.",
    level: "basic",
    codeExample: "fetch_data(url, on_complete=render_ui)"
  },
  {
    question: "Can functions be stored in a set?",
    shortAnswer: "Yes. Function objects are immutable and hashable (they implement '__hash__' based on their memory address), so they can be elements in sets or keys in dictionaries.",
    explanation: "Enables creating unique collections of handler functions.",
    hint: "Yes, functions are hashable and can be stored in sets.",
    level: "moderate",
    codeExample: "handlers = {func_a, func_b}"
  },
  {
    question: "What is the memory overhead of creating many function objects at runtime?",
    shortAnswer: "Each function object creates a Python object header, code pointer, and '__dict__', taking approximately 140 bytes of RAM; lightweight for normal applications.",
    explanation: "Very efficient in CPython.",
    hint: "Each function takes ~140 bytes of memory.",
    level: "complex",
    codeExample: "import sys; sys.getsizeof(lambda: None)  # ~144 bytes"
  },
  {
    question: "Why should you avoid using mutable default arguments when returning inner functions?",
    shortAnswer: "Because default arguments are evaluated once at function definition time and shared across all subsequent invocations, causing unexpected shared state bugs.",
    explanation: "Use None as the default argument instead.",
    hint: "Mutable defaults are shared across calls, causing state leakage.",
    level: "moderate",
    codeExample: "# Anti-pattern: def factory(cache={}): ..."
  },
  {
    question: "How do first-class functions form the foundation of Python Decorators?",
    shortAnswer: "Decorators are higher-order functions that accept a function as an argument, wrap it inside a new inner function, and return that wrapped function object.",
    explanation: "Decorators are pure syntax sugar over first-class function mechanics.",
    hint: "Decorators accept a function, wrap it, and return the new function.",
    level: "basic",
    codeExample: "@dec -> func = dec(func)"
  },
  {
    question: "What happens if you invoke a dispatch table with a key that does not exist without a default?",
    shortAnswer: "It raises a 'KeyError'; using 'table.get(key, default_handler)' provides safe fallback execution.",
    explanation: "Defensive coding ensures missing commands are handled gracefully.",
    hint: "Raises KeyError; use table.get(key, default) for safety.",
    level: "basic",
    codeExample: "handler = DISPATCH.get(cmd, fallback_handler)"
  },
  {
    question: "What is the ultimate golden rule for First-Class Functions in Python?",
    shortAnswer: "Treat functions as dynamic data: pass them to parameterize behavior, return them from factories to generate specialized logic, and compose them into clean processing pipelines.",
    explanation: "The gateway to mastering Python decorators, closures, and advanced functional architecture.",
    hint: "Treat functions as dynamic objects: pass, return, alias, and compose them.",
    level: "basic",
    codeExample: "# First-class functions: the foundation of advanced Python"
  }
];

export default questions;
