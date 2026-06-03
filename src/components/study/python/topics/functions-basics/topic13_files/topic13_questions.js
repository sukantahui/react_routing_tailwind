const questions = [
  {
    question: "What is variable scope in Python?",
    shortAnswer: "The region of a program where a variable is accessible.",
    explanation: "Scope determines where a variable can be read or written. Python has local, enclosing, global, and built‑in scopes (LEGB rule).",
    hint: "Where can you use this variable?",
    level: "basic",
    codeExample: "x = 10  # global scope\ndef f(): y = 5  # local scope"
  },
  {
    question: "What is a local variable?",
    shortAnswer: "A variable defined inside a function, accessible only within that function.",
    explanation: "Local variables are created when the function is called and destroyed when it returns.",
    hint: "Only the function can see it.",
    level: "basic",
    codeExample: "def f(): a = 10  # local; print(a)  # works; print(a) outside -> NameError"
  },
  {
    question: "What is a global variable?",
    shortAnswer: "A variable defined at the top level of a module, accessible from any function.",
    explanation: "Global variables exist for the lifetime of the program (module). They can be read inside functions without special syntax, but writing requires the `global` keyword.",
    hint: "Defined outside all functions.",
    level: "basic",
    codeExample: "count = 0  # global\ndef show(): print(count)"
  },
  {
    question: "Can a function access a global variable without the `global` keyword?",
    shortAnswer: "Yes, for reading only. To modify it, you must use `global`.",
    explanation: "When you read a variable, Python looks up the name following LEGB. If you assign to it inside a function, Python creates a local variable unless `global` is used.",
    hint: "Read access is fine; assignment needs `global`.",
    level: "basic",
    codeExample: "x = 5\ndef read(): print(x)  # works\ndef write(): x = 10  # creates local, does not change global"
  },
  {
    question: "What is the LEGB rule?",
    shortAnswer: "Local → Enclosing → Global → Built‑in: the order Python uses to resolve names.",
    explanation: "Python looks for a variable first in the local scope, then in any enclosing functions (nonlocal), then global, then built‑in names.",
    hint: "Stands for Local, Enclosing, Global, Built‑in.",
    level: "intermediate",
    codeExample: "x = 'global'\ndef outer(): x = 'enclosing'; def inner(): print(x)  # finds 'enclosing'"
  },
  {
    question: "What happens if you assign a value to a variable inside a function without `global`?",
    shortAnswer: "Python creates a new local variable; the global variable (if any) remains unchanged.",
    explanation: "Assignment inside a function defaults to creating a local variable, even if a global with the same name exists.",
    hint: "It shadows the global.",
    level: "basic",
    codeExample: "x = 10\ndef f(): x = 20  # local x\nf(); print(x)  # still 10"
  },
  {
    question: "What error do you get when you try to read a local variable before assignment?",
    shortAnswer: "UnboundLocalError.",
    explanation: "If you have a local variable that is assigned after being read, Python raises UnboundLocalError because the variable exists but has no value yet.",
    hint: "Variable is defined but not yet assigned.",
    level: "intermediate",
    codeExample: "def f(): print(x); x = 5  # UnboundLocalError"
  },
  {
    question: "How do you modify a global variable inside a function?",
    shortAnswer: "Use the `global` keyword before assigning to it.",
    explanation: "`global x` tells Python that `x` refers to the global variable, not a local one.",
    hint: "Declare `global` first.",
    level: "basic",
    codeExample: "x = 0\ndef increment(): global x; x += 1"
  },
  {
    question: "Can you use `global` on a variable that doesn't exist globally yet?",
    shortAnswer: "Yes, it will create the variable in the global scope when assigned.",
    explanation: "If you use `global x` inside a function and then assign `x = 5`, Python creates a global variable named `x`.",
    hint: "It can create new globals.",
    level: "intermediate",
    codeExample: "def create(): global new_var; new_var = 42\ncreate(); print(new_var)  # 42"
  },
  {
    question: "What is the difference between `global` and `nonlocal`?",
    shortAnswer: "`global` refers to module‑level variables; `nonlocal` refers to variables in enclosing (but not global) scopes.",
    explanation: "`nonlocal` is used inside nested functions to modify variables in the outer (enclosing) function scope.",
    hint: "`nonlocal` is for nested functions.",
    level: "advanced",
    codeExample: "def outer(): x = 1; def inner(): nonlocal x; x = 2"
  },
  {
    question: "Can you access a variable from an outer function without `nonlocal`?",
    shortAnswer: "Yes, for reading. To modify it, you need `nonlocal`.",
    explanation: "Just like global vs local, but for nested scopes.",
    hint: "Read is fine; write needs `nonlocal`.",
    level: "intermediate",
    codeExample: "def outer(): x = 1; def inner(): print(x)  # works; x = 2  # creates local"
  },
  {
    question: "What is the lifetime of a local variable?",
    shortAnswer: "From the moment the function is called until the function returns (or raises an exception).",
    explanation: "Local variables are stored on the call stack and are destroyed when the function exits.",
    hint: "They are temporary.",
    level: "basic",
    codeExample: "def f(): a = 5; return a  # a is destroyed after return"
  },
  {
    question: "What is the lifetime of a global variable?",
    shortAnswer: "From the moment the module is loaded until the program ends.",
    explanation: "Globals live for the entire runtime of the program (or module).",
    hint: "They persist.",
    level: "basic",
    codeExample: "x = 10  # lives until program exits"
  },
  {
    question: "What does the `globals()` function return?",
    shortAnswer: "A dictionary representing the current global symbol table.",
    explanation: "It maps variable names to their values in the global scope. You can modify it (not recommended).",
    hint: "All global variables in a dict.",
    level: "intermediate",
    codeExample: "x = 5; print(globals()['x'])  # 5"
  },
  {
    question: "What does the `locals()` function return?",
    shortAnswer: "A dictionary representing the current local symbol table.",
    explanation: "Inside a function, `locals()` shows local variables. At module level, it's the same as `globals()`.",
    hint: "Current local namespace.",
    level: "intermediate",
    codeExample: "def f(): a = 1; print(locals())  # {'a': 1}"
  },
  {
    question: "What happens if you use `global` on a variable that is also a parameter?",
    shortAnswer: "SyntaxError: name is parameter and global.",
    explanation: "You cannot have a parameter and also declare it as global; they are contradictory.",
    hint: "Parameters are always local.",
    level: "advanced",
    codeExample: "def f(x): global x  # SyntaxError"
  },
  {
    question: "Can you delete a global variable from inside a function?",
    shortAnswer: "Yes, using `del` after declaring it global: `global x; del x`.",
    explanation: "The `global` statement allows you to access the global variable for deletion as well.",
    hint: "Use `global` then `del`.",
    level: "advanced",
    codeExample: "x = 10\ndef remove(): global x; del x\nremove()  # x is gone"
  },
  {
    question: "What is name shadowing in Python?",
    shortAnswer: "When a local variable has the same name as a global (or enclosing) variable, hiding the outer one.",
    explanation: "The local variable takes precedence within its scope, making the outer variable temporarily inaccessible.",
    hint: "The inner variable overshadows the outer.",
    level: "intermediate",
    codeExample: "x = 5\ndef f(): x = 10; print(x)  # 10, global x is shadowed"
  },
  {
    question: "How can you access a global variable that has been shadowed by a local variable?",
    shortAnswer: "You cannot directly; you must avoid shadowing or use `globals()` dict.",
    explanation: "`globals()['x']` gives the global even if a local `x` exists, but this is rarely good practice.",
    hint: "Use `globals()` but it's messy.",
    level: "advanced",
    codeExample: "x = 5\ndef f(): x = 10; print(globals()['x'])  # 5"
  },
  {
    question: "What is the built‑in scope?",
    shortAnswer: "The scope containing Python's built‑in functions and exceptions (e.g., `print`, `len`, `TypeError`).",
    explanation: "These names are always available; you can shadow them but shouldn't.",
    hint: "Python's standard library of functions.",
    level: "basic",
    codeExample: "print = 5  # shadows built‑in print; bad practice"
  },
  {
    question: "Why is it generally bad to use many global variables?",
    shortAnswer: "They make code harder to debug, test, and reason about, and can lead to unintended side effects.",
    explanation: "Global variables create hidden dependencies between functions, making the program state unpredictable.",
    hint: "Spaghetti code risk.",
    level: "intermediate",
    codeExample: "# Prefer passing arguments and returning values."
  },
  {
    question: "What is the `__builtins__` module?",
    shortAnswer: "A module containing Python's built‑in names; it's automatically imported.",
    explanation: "You can access it as `__builtins__` (implementation‑specific) or better, `import builtins`.",
    hint: "Where `print`, `len` live.",
    level: "advanced",
    codeExample: "import builtins; print(builtins.print)  # <built-in function print>"
  },
  {
    question: "How does Python treat a variable that is assigned inside a function but also has a global declaration later?",
    shortAnswer: "If `global` appears anywhere in the function, the name is treated as global throughout the function, even before the `global` statement.",
    explanation: "`global` affects the entire function scope; it's a declaration, not a statement.",
    hint: "The `global` declaration applies to the whole function.",
    level: "advanced",
    codeExample: "def f(): print(x); global x; x = 5  # still looks for global x from start"
  },
  {
    question: "What is the difference between `globals()` and `locals()` at module level?",
    shortAnswer: "They return the same dictionary because at module level, local scope is the global scope.",
    explanation: "Outside functions, the local namespace is the same as the global namespace.",
    hint: "They are identical in the global scope.",
    level: "intermediate",
    codeExample: "print(globals() is locals())  # True at module level"
  },
  {
    question: "Can you add a new global variable dynamically using `globals()`?",
    shortAnswer: "Yes, by assigning to `globals()['new_var'] = value`.",
    explanation: "This modifies the global dictionary, creating a new global variable. It's rarely needed and can be confusing.",
    hint: "Possible but not recommended.",
    level: "expert",
    codeExample: "def create(): globals()['dynamic'] = 100\ncreate(); print(dynamic)  # 100"
  },
  {
    question: "What happens to local variables when a function raises an exception?",
    shortAnswer: "They are still destroyed when the function exits (the stack unwinds).",
    explanation: "Exception does not preserve local variables; they are cleaned up normally.",
    hint: "No special treatment.",
    level: "intermediate",
    codeExample: "def f(): a = 1; raise ValueError; # a is destroyed after exception"
  },
  {
    question: "What is the scope of a variable defined inside a loop or conditional block?",
    shortAnswer: "In Python, blocks like `if`, `for`, `while` do not create a new scope; the variable is in the enclosing function or global scope.",
    explanation: "Unlike languages like C or Java, Python only creates new scopes for functions (and classes/modules).",
    hint: "Only functions create new scopes.",
    level: "intermediate",
    codeExample: "if True: x = 5\nprint(x)  # works, x is in the same scope"
  },
  {
    question: "How can you inspect all variables in the current scope?",
    shortAnswer: "Use `dir()` (list of names) or `locals()` (dict of name‑value pairs).",
    explanation: "`dir()` shows variable names; `locals()` gives both names and values.",
    hint: "Useful for debugging.",
    level: "intermediate",
    codeExample: "a = 1; b = 2; print(locals().keys())  # dict_keys(['a','b',...])"
  },
  {
    question: "What is the purpose of the `__name__` variable?",
    shortAnswer: "It indicates the name of the current module; `'__main__'` when the script is executed directly.",
    explanation: "This is a built‑in global variable used to determine if a module is run as a script or imported.",
    hint: "Used for `if __name__ == '__main__':`",
    level: "basic",
    codeExample: "print(__name__)  # '__main__' if run directly, else module name"
  },
  {
    question: "What is a closure?",
    shortAnswer: "A nested function that captures variables from its enclosing scope, even after the outer function has returned.",
    explanation: "Closures are created when an inner function references non‑global variables from the outer function. The lifetime of those variables extends.",
    hint: "Enclosing scope variables that live on.",
    level: "advanced",
    codeExample: "def outer(x): def inner(): return x; return inner\nf = outer(5); print(f())  # 5"
  }
];

export default questions;