// src/components/study/python/topics/003_003_decorators-generators/topic1_files/topic1_questions.js
// Comprehensive Master Review Questions for Topic 1: Inner functions and variable scope closures

const questions = [
  {
    question: "What is an Inner (Nested) Function in Python?",
    shortAnswer: "A function defined directly inside the body of another enclosing parent function, having access to variables in the enclosing parent scope.",
    explanation: "Used for encapsulation, helper functions, and constructing closures.",
    hint: "A function defined inside another function.",
    level: "basic",
    codeExample: "def outer():\n    def inner(): pass"
  },
  {
    question: "What does the LEGB acronym stand for in Python scope resolution?",
    shortAnswer: "Local -> Enclosing -> Global -> Built-in. Python searches for variable names in this exact order when resolving an identifier.",
    explanation: "Fundamental variable lookup sequence in Python.",
    hint: "Local, Enclosing, Global, Built-in.",
    level: "basic",
    codeExample: "# Search order: Local -> Enclosing -> Global -> Built-in"
  },
  {
    question: "What are the 3 criteria required to form a true Python Closure?",
    shortAnswer: "1. Must have an inner nested function. 2. The inner function must reference a variable from the enclosing scope. 3. The enclosing function must return the inner function object.",
    explanation: "Forms a function bundled together with its lexical environment.",
    hint: "Nested function, references enclosing variable, enclosing function returns it.",
    level: "basic",
    codeExample: "def outer(x):\n    def inner(): return x * 2\n    return inner"
  },
  {
    question: "What is the primary benefit of a Closure over an ordinary function?",
    shortAnswer: "A closure retains access to variables in its enclosing scope even after the outer function has finished execution and popped off the call stack.",
    explanation: "Enables persistent, encapsulated state without global variables or classes.",
    hint: "Remembers enclosing variables even after the outer function has finished.",
    level: "basic",
    codeExample: "mult_5 = outer(5)  # Remembers x=5 forever"
  },
  {
    question: "What attribute on a function object stores its closure bindings in CPython?",
    shortAnswer: "The '__closure__' attribute, which contains a tuple of 'cell' objects.",
    explanation: "Returns None if the function is not a closure.",
    hint: "The __closure__ attribute.",
    level: "moderate",
    codeExample: "print(my_closure.__closure__[0].cell_contents)"
  },
  {
    question: "What is a 'cell' object in CPython?",
    shortAnswer: "An internal CPython heap data structure used to store a reference to an enclosed variable, allowing multiple scopes to share and mutate the same variable across lifetimes.",
    explanation: "Bridges the gap between function frame lifetimes.",
    hint: "Heap storage holding enclosed variable references.",
    level: "complex",
    codeExample: "cell.cell_contents  # The actual enclosed Python object"
  },
  {
    question: "What is the purpose of the 'nonlocal' keyword introduced in Python 3?",
    shortAnswer: "To declare that an identifier refers to a variable in the nearest enclosing parent function's scope, allowing that variable to be modified/reassigned rather than creating a new local shadow variable.",
    explanation: "Without nonlocal, reassigning raises UnboundLocalError.",
    hint: "Allows modifying variables in enclosing parent scopes.",
    level: "basic",
    codeExample: "def outer():\n    count = 0\n    def inner():\n        nonlocal count\n        count += 1"
  },
  {
    question: "What happens if you execute 'count += 1' on an enclosing variable inside an inner function WITHOUT 'nonlocal'?",
    shortAnswer: "Python raises 'UnboundLocalError: local variable referenced before assignment', because Python sees the assignment and treats 'count' as a local variable before it is initialized.",
    explanation: "One of the most common gotchas in Python scope management.",
    hint: "Raises UnboundLocalError.",
    level: "moderate",
    codeExample: "# UnboundLocalError: local variable 'count' referenced before assignment"
  },
  {
    question: "What is the difference between the 'global' and 'nonlocal' keywords in Python?",
    shortAnswer: "'global' binds a name to the top-level module scope; 'nonlocal' binds a name to the nearest enclosing parent function scope (excluding module global scope).",
    explanation: "nonlocal cannot be used at module level or to refer to globals.",
    hint: "global targets module scope; nonlocal targets parent function enclosing scope.",
    level: "moderate",
    codeExample: "global x  # Module scope\nnonlocal y  # Enclosing function scope"
  },
  {
    question: "What is the 'Late-Binding Closure Loop Trap' in Python?",
    shortAnswer: "When creating closures inside a loop (e.g. 'funcs = [lambda: i for i in range(5)]'), all closures bind to the same variable 'i' by reference; when called later, they all see the final loop value (4) rather than their value during iteration!",
    explanation: "A classic Python interview trap.",
    hint: "Closures look up variables at call time, not definition time, seeing the final loop value.",
    level: "complex",
    codeExample: "# TRAP: funcs = [lambda: i for i in range(5)] -> all return 4!\n# FIX: funcs = [lambda i=i: i for i in range(5)]"
  },
  {
    question: "How do you fix the Late-Binding Closure Loop Trap?",
    shortAnswer: "By binding the current iteration variable as a default argument: 'funcs = [lambda i=i: i for i in range(5)]' or using a separate factory function.",
    explanation: "Default arguments are evaluated at function definition time, locking in the value.",
    hint: "Use default argument binding: lambda i=i: i.",
    level: "moderate",
    codeExample: "funcs = [lambda i=i: i for i in range(5)]"
  },
  {
    question: "Can a closure encapsulate multiple enclosing variables?",
    shortAnswer: "Yes. Python will create a cell object in '__closure__' for every variable in the enclosing scope that is referenced by the inner function.",
    explanation: "Each referenced enclosing variable gets its own slot in __closure__.",
    hint: "Yes, __closure__ will contain multiple cell objects.",
    level: "basic",
    codeExample: "def outer(a, b):\n    def inner(): return a + b\n    return inner  # __closure__ has 2 cells"
  },
  {
    question: "How do closures compare to classes for state encapsulation?",
    shortAnswer: "Closures are lightweight and concise for managing 1 or 2 mutable state variables (e.g. counters, memoization); Classes are better when you need multiple methods, inheritance, or complex object modeling.",
    explanation: "Both provide encapsulation; choose based on complexity.",
    hint: "Closures for single-purpose stateful functions; classes for rich multi-method objects.",
    level: "moderate",
    codeExample: "# Lightweight state: make_counter()\n# Complex state: class Counter:"
  },
  {
    question: "Does mutating a mutable container (like list.append() or dict[k]=v) in an enclosing scope require 'nonlocal'?",
    shortAnswer: "No. Mutating the contents of an existing mutable object does not rebind the variable identifier itself, so 'nonlocal' is only needed when reassigning ('=') the variable name.",
    explanation: "Method calls like list.append() modify in-place without rebinding.",
    hint: "No, in-place mutations (append, update) do not require nonlocal.",
    level: "moderate",
    codeExample: "def outer():\n    items = []\n    def inner(x): items.append(x) # Valid without nonlocal!\n    return inner"
  },
  {
    question: "What is a 'Stateful Closure'?",
    shortAnswer: "A closure that uses 'nonlocal' (or mutable containers) to update its internal state across successive invocations (e.g. a running sum, counter, or rolling average).",
    explanation: "Acts like an object instance with hidden private attributes.",
    hint: "A closure that remembers and updates state between calls.",
    level: "basic",
    codeExample: "counter = make_counter(); counter(); counter()"
  },
  {
    question: "Can an inner function be called directly from outside its enclosing parent function?",
    shortAnswer: "No, unless the enclosing function explicitly returns the inner function reference or exposes it via a returned data structure.",
    explanation: "Inner functions are private to the enclosing function's local scope.",
    hint: "No, it is scoped locally inside the parent function.",
    level: "basic",
    codeExample: "# outer.inner() is invalid syntax"
  },
  {
    question: "How does Python garbage collection handle closures whose outer function has finished?",
    shortAnswer: "CPython moves the enclosed variables to the heap inside 'cell' objects and increments their reference count, keeping them alive as long as the returned inner function reference is reachable.",
    explanation: "Prevents memory reclamation while the closure exists.",
    hint: "Variables are preserved on the heap via cell objects as long as the closure is alive.",
    level: "complex",
    codeExample: "# Memory is preserved until closure object is deleted"
  },
  {
    question: "What happens if an inner function defines a variable with the same name as an enclosing variable WITHOUT 'nonlocal'?",
    shortAnswer: "The inner function creates a new Local variable that 'shadows' the enclosing variable; the enclosing variable remains completely unaffected.",
    explanation: "Standard variable shadowing behavior in Python.",
    hint: "Creates a local shadow variable without altering the outer variable.",
    level: "moderate",
    codeExample: "def outer(): x = 10; def inner(): x = 20; inner(); print(x) # 10"
  },
  {
    question: "Can closures be serialized with the standard 'pickle' module?",
    shortAnswer: "Standard pickle cannot serialize nested functions or closures because they lack top-level global module names; specialized libraries like 'cloudpickle' or 'dill' are required.",
    explanation: "Important consideration for multiprocessing and distributed tasks (Celery/PySpark).",
    hint: "Standard pickle fails on closures; use dill or cloudpickle.",
    level: "complex",
    codeExample: "import cloudpickle\nserialized = cloudpickle.dumps(my_closure)"
  },
  {
    question: "How can you expose multiple closure methods from a single enclosing factory function?",
    shortAnswer: "By defining multiple inner functions (e.g. 'deposit', 'withdraw', 'get_balance') that share the same enclosing variables and returning them as a dictionary of callables.",
    explanation: "Implements the Module/Object Pattern in pure functional Python.",
    hint: "Return a dictionary containing multiple inner function references.",
    level: "moderate",
    codeExample: "return {'get': get_val, 'set': set_val}"
  },
  {
    question: "What is 'Memoization' using a closure?",
    shortAnswer: "An optimization technique where a closure encapsulates a private cache dictionary, storing computed results of expensive function calls and returning cached values on repeat inputs.",
    explanation: "Commonly used in dynamic programming and decorators.",
    hint: "Caching function return values in an enclosed dictionary.",
    level: "moderate",
    codeExample: "def memoize(fn):\n    cache = {}\n    def wrapper(n): ...\n    return wrapper"
  },
  {
    question: "What is the relationship between Closures and Python Decorators?",
    shortAnswer: "Decorators are implemented directly as closures: the decorator function takes a target function in its enclosing scope, wraps it inside an inner function (closure), and returns the inner function.",
    explanation: "Mastering closures is essential to understanding decorators.",
    hint: "Every Python decorator is an application of closures.",
    level: "basic",
    codeExample: "# Decorator wrapper is a closure over func"
  },
  {
    question: "Can 'nonlocal' be used to create a new variable if it doesn't already exist in an enclosing scope?",
    shortAnswer: "No. Python raises 'SyntaxError: no binding for nonlocal found' if the declared identifier does not exist in any enclosing parent function scope.",
    explanation: "nonlocal requires a pre-existing enclosing variable.",
    hint: "Raises SyntaxError if the variable doesn't exist in enclosing scope.",
    level: "moderate",
    codeExample: "# SyntaxError: no binding for nonlocal 'unknown_var' found"
  },
  {
    question: "How do you inspect the free variable names of a closure function?",
    shortAnswer: "By reading the '__code__.co_freevars' tuple on the closure function object.",
    explanation: "Returns a tuple of string names representing enclosed variables.",
    hint: "Read the __code__.co_freevars tuple.",
    level: "complex",
    codeExample: "print(my_closure.__code__.co_freevars)  # ('count', 'total')"
  },
  {
    question: "What is the ultimate golden rule for Closures in Python?",
    shortAnswer: "Use closures to encapsulate private state and parameterize behavior cleanly without the overhead of full OOP classes, use 'nonlocal' when state mutation is required, and be vigilant regarding late-binding in loops.",
    explanation: "The foundation of elegant, functional Python architecture and custom decorators.",
    hint: "Use closures for lightweight state encapsulation and beware of late-binding in loops.",
    level: "basic",
    codeExample: "# Master closures and lexical scoping in Python"
  }
];

export default questions;
