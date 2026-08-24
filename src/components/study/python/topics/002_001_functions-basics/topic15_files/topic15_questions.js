const questions = [
  {
    question: "What is the lifetime of a local variable?",
    shortAnswer: "From the moment the function is called until the function returns (or raises an exception).",
    explanation: "Local variables are stored on the call stack. They are created when the function is entered and destroyed when the function exits.",
    hint: "They exist only during function execution.",
    level: "basic",
    codeExample: "def f(): x = 5  # x created here; after f() returns, x is gone"
  },
  {
    question: "What is the lifetime of a global variable?",
    shortAnswer: "From the moment the module is loaded until the program ends.",
    explanation: "Global variables live in the module's namespace for the entire runtime of the program.",
    hint: "They persist across function calls.",
    level: "basic",
    codeExample: "x = 10  # exists until program exits"
  },
  {
    question: "What happens to local variables when a function raises an exception?",
    shortAnswer: "They are still destroyed when the function exits (stack unwinding).",
    explanation: "Exception does not preserve local variables; they are cleaned up normally as the call stack unwinds.",
    hint: "No special treatment.",
    level: "intermediate",
    codeExample: "def f(): a = 1; raise ValueError; # a is destroyed after exception"
  },
  {
    question: "What is a namespace in Python?",
    shortAnswer: "A mapping from names to objects. It's like a container where variable names are stored.",
    explanation: "Namespaces are implemented as dictionaries. Examples: local namespace, global namespace, built‑in namespace.",
    hint: "Think of it as a dictionary of variable names → values.",
    level: "basic",
    codeExample: "x = 5; print(locals())  # shows current namespace"
  },
  {
    question: "How many namespaces exist in a Python program?",
    shortAnswer: "At least three: built‑in, global, and local. More can exist (enclosing functions, classes).",
    explanation: "Each function call creates a new local namespace. Modules have their own global namespace.",
    hint: "Every scope has its own namespace.",
    level: "intermediate",
    codeExample: "def f(): x = 1  # local namespace; print(locals())"
  },
  {
    question: "What is the built‑in namespace?",
    shortAnswer: "The namespace containing Python's built‑in functions and exceptions (e.g., `print`, `len`, `TypeError`).",
    explanation: "This namespace is always available. You can shadow it but shouldn't.",
    hint: "Python's standard library of built‑ins.",
    level: "basic",
    codeExample: "print(dir(__builtins__))  # shows many names"
  },
  {
    question: "How can you see all variables in the current local namespace?",
    shortAnswer: "Use `locals()` function, which returns a dictionary of the local namespace.",
    explanation: "Inside a function, `locals()` shows local variables. At module level, it's the same as `globals()`.",
    hint: "`locals()` returns a dict.",
    level: "intermediate",
    codeExample: "def f(): a = 5; print(locals())  # {'a': 5}"
  },
  {
    question: "How can you see all variables in the global namespace?",
    shortAnswer: "Use `globals()` function, which returns a dictionary of the global namespace.",
    explanation: "`globals()` works anywhere and always refers to the module's global scope.",
    hint: "Global namespace as a dict.",
    level: "intermediate",
    codeExample: "x = 10; print(globals()['x'])  # 10"
  },
  {
    question: "What is the difference between `globals()` and `locals()` inside a function?",
    shortAnswer: "`globals()` returns the module‑level namespace; `locals()` returns the function's local namespace.",
    explanation: "They are different dictionaries. Modifying `locals()` does not affect the global scope.",
    hint: "`globals()` is outer; `locals()` is inner.",
    level: "intermediate",
    codeExample: "x = 5\ndef f(): y = 10; print(globals()['x']); print(locals()['y'])"
  },
  {
    question: "What is the lifetime of a variable in an enclosing (nonlocal) scope?",
    shortAnswer: "It lives as long as the outer function's stack frame exists, which may be extended if a closure is created.",
    explanation: "If an inner function references a variable from an outer function, that variable's lifetime can extend beyond the outer function's call (closure).",
    hint: "Closures keep enclosing variables alive.",
    level: "advanced",
    codeExample: "def outer(): x = 1; def inner(): return x; return inner\nf = outer(); print(f())  # x still exists"
  },
  {
    question: "What is a closure?",
    shortAnswer: "A nested function that captures variables from its enclosing scope, even after the outer function has returned.",
    explanation: "Closures are created when an inner function references non‑global variables from the outer function. The variables' lifetimes are extended.",
    hint: "Enclosing scope variables that live on.",
    level: "advanced",
    codeExample: "def make_multiplier(n): return lambda x: x * n  # n is captured"
  },
  {
    question: "Does Python have block‑level scope (like `if`, `for` blocks)?",
    shortAnswer: "No, only functions (and classes/modules) create new scopes. Blocks like `if`, `for`, `while` do not create new namespaces.",
    explanation: "Variables defined inside a loop or conditional are in the same scope as the enclosing function or global scope.",
    hint: "Only functions create new scopes.",
    level: "intermediate",
    codeExample: "for i in range(5): x = i; print(x)  # x is accessible after the loop"
  },
  {
    question: "What happens to a variable that is assigned in a loop?",
    shortAnswer: "It remains in the same scope (function or global) after the loop finishes.",
    explanation: "Python does not have block‑level scope, so the variable persists.",
    hint: "No new scope is created.",
    level: "basic",
    codeExample: "for i in range(5): y = i\nprint(y)  # y = 4, accessible"
  },
  {
    question: "How can you delete a variable from a namespace?",
    shortAnswer: "Use the `del` statement: `del variable_name`.",
    explanation: "`del` removes the binding from the current namespace. If it's a local variable, it is removed.",
    hint: "Removes the name.",
    level: "basic",
    codeExample: "x = 5; del x; # print(x) would raise NameError"
  },
  {
    question: "What is the `__dict__` attribute of a module or class?",
    shortAnswer: "It is the namespace dictionary for that object.",
    explanation: "For modules, `__dict__` is the same as `globals()`. For classes and instances, it stores attributes.",
    hint: "The underlying namespace dict.",
    level: "advanced",
    codeExample: "import math; print(math.__dict__.keys())"
  },
  {
    question: "What is the order of namespace lookup in Python?",
    shortAnswer: "LEGB: Local → Enclosing → Global → Built‑in.",
    explanation: "Python searches these namespaces in order when resolving a name.",
    hint: "Local, Enclosing, Global, Built‑in.",
    level: "intermediate",
    codeExample: "# LEGB determines which x is used"
  },
  {
    question: "Can you manually add a variable to the global namespace from inside a function without `global`?",
    shortAnswer: "Yes, by modifying `globals()` dict: `globals()['new_var'] = 42`.",
    explanation: "This is possible but considered bad practice and confusing.",
    hint: "Possible but not recommended.",
    level: "advanced",
    codeExample: "def add_global(): globals()['dynamic'] = 100\nadd_global(); print(dynamic)  # 100"
  },
  {
    question: "What is the difference between `del x` and `x = None`?",
    shortAnswer: "`del x` removes the variable from the namespace; `x = None` keeps the variable but sets its value to None.",
    explanation: "After `del x`, the name no longer exists. After `x = None`, the name exists and references the None object.",
    hint: "`del` removes the binding; assignment changes the value.",
    level: "intermediate",
    codeExample: "x = 5; del x; # NameError\nx = 5; x = None; print(x)  # None"
  },
  {
    question: "What is the lifetime of a variable created inside a class definition?",
    shortAnswer: "It lives as long as the class exists (usually the whole program).",
    explanation: "Class attributes are stored in the class's namespace and persist.",
    hint: "Class attributes are global-like.",
    level: "intermediate",
    codeExample: "class MyClass: x = 5  # x exists as long as MyClass exists"
  },
  {
    question: "How does Python treat default argument values in terms of lifetime?",
    shortAnswer: "Default argument values are evaluated once at function definition time and stored in the function object.",
    explanation: "They live as long as the function object exists, which can lead to mutable default gotchas.",
    hint: "Defaults are created once, not per call.",
    level: "advanced",
    codeExample: "def f(lst=[]): lst.append(1); return lst  # list persists across calls"
  },
  {
    question: "What is a namespace collision?",
    shortAnswer: "When two variables in different scopes have the same name, causing one to shadow the other.",
    explanation: "Local variables can shadow globals; inner function variables can shadow outer ones.",
    hint: "Name shadowing.",
    level: "basic",
    codeExample: "x = 5\ndef f(): x = 10  # shadows global x inside f"
  },
  {
    question: "How can you access a variable from an outer scope that has been shadowed?",
    shortAnswer: "You cannot directly. You can avoid shadowing or use `nonlocal` (for enclosing) or `globals()` (for global).",
    explanation: "Once shadowed, the outer variable is not accessible by that name inside the inner scope.",
    hint: "Prevent shadowing or use `globals()`.",
    level: "advanced",
    codeExample: "x = 5\ndef f(): x = 10; print(globals()['x'])  # prints 5"
  },
  {
    question: "What is the `__name__` variable?",
    shortAnswer: "A built‑in variable that holds the name of the current module.",
    explanation: "When a script is run directly, `__name__` is `'__main__'`. When imported, it's the module's filename.",
    hint: "Used in `if __name__ == '__main__':`.",
    level: "basic",
    codeExample: "print(__name__)  # '__main__' if run directly"
  },
  {
    question: "What happens to global variables when a module is imported?",
    shortAnswer: "They are created in the importer's namespace only if imported with `from module import *` (not recommended). Normally, they are accessed via the module's name.",
    explanation: "Global variables of a module are not automatically added to the importing module's global namespace unless explicitly imported.",
    hint: "Use `module.variable` to access.",
    level: "intermediate",
    codeExample: "import math; print(math.pi)  # pi is a global in math module"
  },
  {
    question: "Can two different modules have global variables with the same name?",
    shortAnswer: "Yes, because each module has its own separate global namespace.",
    explanation: "They do not interfere with each other.",
    hint: "Namespaces are separate.",
    level: "basic",
    codeExample: "# module a.py: x = 1; # module b.py: x = 2; no conflict"
  },
  {
    question: "What is the purpose of the `dir()` function?",
    shortAnswer: "It returns a sorted list of names in the current or given namespace.",
    explanation: "Useful for introspection. Without arguments, it lists names in the current local scope.",
    hint: "See what names are defined.",
    level: "intermediate",
    codeExample: "x = 5; print(dir())  # includes 'x'"
  },
  {
    question: "How does Python manage memory for local variables?",
    shortAnswer: "They are allocated on the call stack and deallocated when the function returns.",
    explanation: "Python uses reference counting and a garbage collector, but local variables are typically freed immediately when the function exits.",
    hint: "Stack allocation.",
    level: "advanced",
    codeExample: "def f(): a = [1,2,3]  # list is freed after f returns"
  },
  {
    question: "What is a reference cycle and how does it affect variable lifetime?",
    shortAnswer: "When two objects reference each other, their reference counts never reach zero, so they may not be freed immediately.",
    explanation: "Python's garbage collector periodically detects and breaks reference cycles. This can delay deallocation.",
    hint: "Cyclic references can cause memory leaks if not handled.",
    level: "expert",
    codeExample: "class Node: pass\na = Node(); b = Node(); a.ref = b; b.ref = a  # cycle"
  },
  {
    question: "What is the `__del__` method?",
    shortAnswer: "A destructor method called when an object is about to be garbage collected.",
    explanation: "It can be used to clean up resources, but its invocation is not guaranteed.",
    hint: "Not reliable for resource management.",
    level: "advanced",
    codeExample: "class C: def __del__(self): print('destroyed')"
  },
  {
    question: "What is the best practice regarding variable lifetime and namespaces?",
    shortAnswer: "Keep variables in the smallest possible scope. Use local variables unless global is truly needed. Avoid modifying `globals()` or `locals()`.",
    explanation: "Smaller scope reduces coupling and makes code easier to understand and debug.",
    hint: "Local is better than global.",
    level: "intermediate",
    codeExample: "# Prefer: def process(data): result = data * 2; return result"
  }
];

export default questions;