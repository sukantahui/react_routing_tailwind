const questions = [
  {
    question: "What does the `global` keyword do in Python?",
    shortAnswer: "It allows a function to modify a variable defined in the global scope.",
    explanation: "Without `global`, assigning to a variable inside a function creates a new local variable. `global` tells Python to use the global variable instead.",
    hint: "Needed to change global variables inside functions.",
    level: "basic",
    codeExample: "x = 10\ndef change(): global x; x = 20\nchange()\nprint(x)  # 20"
  },
  {
    question: "Do you need `global` to read a global variable inside a function?",
    shortAnswer: "No, reading a global variable does not require `global`.",
    explanation: "Python automatically looks up variable names using the LEGB rule. For reading, the global variable is found without `global`.",
    hint: "Only assignment requires `global`.",
    level: "basic",
    codeExample: "x = 5\ndef show(): print(x)  # works fine\nshow()"
  },
  {
    question: "What happens if you assign to a variable inside a function without using `global`?",
    shortAnswer: "Python creates a new local variable with the same name, leaving the global unchanged.",
    explanation: "Assignment inside a function defaults to creating a local variable, even if a global variable with that name exists.",
    hint: "It shadows the global.",
    level: "basic",
    codeExample: "x = 10\ndef f(): x = 20  # local x\nf()\nprint(x)  # still 10"
  },
  {
    question: "Can you use `global` on multiple variables at once?",
    shortAnswer: "Yes, separate them with commas: `global a, b, c`.",
    explanation: "The `global` statement accepts a comma‑separated list of names to treat as global.",
    hint: "List them after `global`.",
    level: "basic",
    codeExample: "a = 1; b = 2\ndef update(): global a, b; a, b = b, a"
  },
  {
    question: "Where can you use the `global` statement?",
    shortAnswer: "Only inside a function (or method).",
    explanation: "`global` is a statement that affects variable lookups within the current function scope. Using it outside a function is a syntax error.",
    hint: "Inside functions only.",
    level: "basic",
    codeExample: "# global x  # SyntaxError outside function\ndef f(): global x; x = 5"
  },
  {
    question: "Can you use `global` on a variable that does not exist globally yet?",
    shortAnswer: "Yes, it will create the variable in the global scope when you assign to it.",
    explanation: "Using `global x` inside a function followed by assignment creates a new global variable.",
    hint: "It can create new globals.",
    level: "intermediate",
    codeExample: "def create(): global new_var; new_var = 42\ncreate()\nprint(new_var)  # 42"
  },
  {
    question: "What is the difference between `global` and `nonlocal`?",
    shortAnswer: "`global` refers to module‑level variables; `nonlocal` refers to variables in enclosing (non‑global) function scopes.",
    explanation: "Use `nonlocal` inside nested functions to modify variables of the outer function. `global` is for top‑level module variables.",
    hint: "`nonlocal` is for nested functions.",
    level: "advanced",
    codeExample: "def outer(): x = 1; def inner(): nonlocal x; x = 2"
  },
  {
    question: "What error occurs if you try to modify a global variable without `global`?",
    shortAnswer: "No error occurs; a new local variable is created instead. The global remains unchanged.",
    explanation: "Python does not raise an error; it simply creates a local variable. This is a common logic mistake, not a syntax error.",
    hint: "It's a silent bug, not an error.",
    level: "intermediate",
    codeExample: "x = 5\ndef f(): x = 10  # creates local, no error\nf()\nprint(x)  # 5, not 10"
  },
  {
    question: "Can you use `global` inside a nested function to modify a global variable?",
    shortAnswer: "Yes, `global` always refers to the module‑level global, even from inside nested functions.",
    explanation: "`global` is not affected by nesting; it always targets the module's global namespace.",
    hint: "`global` goes straight to the top.",
    level: "intermediate",
    codeExample: "x = 5\ndef outer(): def inner(): global x; x = 10; inner()\nouter()\nprint(x)  # 10"
  },
  {
    question: "What does the `globals()` function return?",
    shortAnswer: "A dictionary representing the current global symbol table.",
    explanation: "It maps global variable names to their values. You can even modify it, though that's rarely needed.",
    hint: "The global namespace as a dict.",
    level: "intermediate",
    codeExample: "x = 5; print(globals()['x'])  # 5"
  },
  {
    question: "How can you modify a global variable without using the `global` keyword?",
    shortAnswer: "By using `globals()` dictionary: `globals()['var'] = new_value`.",
    explanation: "This is a hack and not recommended for normal code, but it works because `globals()` returns a mutable dict.",
    hint: "Avoid unless necessary.",
    level: "advanced",
    codeExample: "x = 5\ndef f(): globals()['x'] = 10\nf()\nprint(x)  # 10"
  },
  {
    question: "Can you delete a global variable from inside a function?",
    shortAnswer: "Yes, using `global x; del x`.",
    explanation: "After declaring the variable global, you can delete it with `del`, removing it from the global namespace.",
    hint: "Use `global` then `del`.",
    level: "advanced",
    codeExample: "x = 10\ndef remove(): global x; del x\nremove()\n# print(x) would raise NameError"
  },
  {
    question: "What is the scope of a variable declared with `global` inside a function?",
    shortAnswer: "It becomes a reference to the global variable; there is no local version.",
    explanation: "The `global` declaration makes the name refer to the global variable for the entire function, even before the `global` statement.",
    hint: "No local variable is created.",
    level: "intermediate",
    codeExample: "x = 5\ndef f(): global x; x = 10  # modifies global"
  },
  {
    question: "Is it possible to use `global` and assign a value on the same line?",
    shortAnswer: "No, `global` is a statement, not an expression. You must use separate lines.",
    explanation: "`global x; x = 5` is correct; `global x = 5` is a syntax error.",
    hint: "Two separate statements.",
    level: "basic",
    codeExample: "# global x = 5  # SyntaxError\nglobal x; x = 5  # correct"
  },
  {
    question: "What happens if you use `global` on a name that is also a function parameter?",
    shortAnswer: "SyntaxError: name 'x' is parameter and global.",
    explanation: "Parameters are always local to the function; they cannot be declared global.",
    hint: "Parameters cannot be global.",
    level: "advanced",
    codeExample: "def f(x): global x  # SyntaxError"
  },
  {
    question: "Can you use `global` inside a class method?",
    shortAnswer: "Yes, it works the same as in a function, referring to the module‑level global.",
    explanation: "Methods are functions inside a class; `global` still accesses the module's global namespace.",
    hint: "Class scope does not affect `global`.",
    level: "intermediate",
    codeExample: "x = 5\nclass MyClass:\n    def method(self): global x; x = 10"
  },
  {
    question: "What is the difference between `global` and assigning to a variable without `global` in a function?",
    shortAnswer: "`global` modifies the global variable; without `global`, you create a new local variable.",
    explanation: "The presence or absence of `global` changes whether the assignment targets the global or local scope.",
    hint: "`global` = global change; no `global` = local creation.",
    level: "basic",
    codeExample: "x = 5\ndef f1(): global x; x = 10  # changes global\ndef f2(): x = 10  # creates local"
  },
  {
    question: "How can you check if a variable is defined in the global scope?",
    shortAnswer: "Use `'var_name' in globals()`.",
    explanation: "`globals()` returns a dict; checking for a key tells you if the global exists.",
    hint: "Membership test in `globals()`.",
    level: "intermediate",
    codeExample: "x = 5; print('x' in globals())  # True"
  },
  {
    question: "Why is using `global` generally discouraged?",
    shortAnswer: "Because it creates hidden dependencies and makes code harder to debug, test, and maintain.",
    explanation: "Global variables can be modified anywhere, leading to unpredictable state. It's better to pass values as arguments and return results.",
    hint: "Prefer pure functions.",
    level: "intermediate",
    codeExample: "# Better: def add(x, y): return x + y\n# Than: global total; total = x + y"
  },
  {
    question: "Can you use `global` to import a module under a different name?",
    shortAnswer: "No, `global` is for variable names, not for imports.",
    explanation: "Imports already create module‑level names; you don't need `global` to use them inside functions.",
    hint: "Not needed for imports.",
    level: "basic",
    codeExample: "import math\ndef f(): print(math.pi)  # works without global"
  },
  {
    question: "What happens if you have both a global and a local variable with the same name, and you use `global` inside a function?",
    shortAnswer: "The function will use and modify the global variable; the local variable (if any) is irrelevant.",
    explanation: "`global` forces the name to be resolved in the global scope, ignoring any local variable with the same name.",
    hint: "`global` overrides local.",
    level: "intermediate",
    codeExample: "x = 5\ndef f(): x = 10  # local; global x; x = 20  # modifies global\nf()\nprint(x)  # 20"
  },
  {
    question: "Can you use `global` inside a lambda function?",
    shortAnswer: "No, lambda functions cannot contain statements; `global` is a statement.",
    explanation: "Lambdas are limited to a single expression, so they cannot declare `global`. Use a regular `def` if you need to modify globals.",
    hint: "Lambdas are expression‑only.",
    level: "advanced",
    codeExample: "# lambda: global x  # SyntaxError"
  },
  {
    question: "What is the output of this code? `x = 5; def f(): x = 10; f(); print(x)`",
    shortAnswer: "5",
    explanation: "Inside `f()`, `x = 10` creates a local variable, leaving the global `x` unchanged.",
    hint: "Local assignment does not affect global.",
    level: "basic",
    codeExample: "x = 5; def f(): x = 10; f(); print(x)  # 5"
  },
  {
    question: "How do you modify a global variable that is also the name of a built‑in function?",
    shortAnswer: "Use `global` as usual; be aware you are shadowing the built‑in, which is not recommended.",
    explanation: "For example, `global print; print = 5` will make `print` a global integer, breaking `print()`.",
    hint: "Avoid shadowing built‑ins.",
    level: "advanced",
    codeExample: "print = 5  # shadows built‑in; def f(): global print; print = 10"
  },
  {
    question: "Can you use `global` inside a list comprehension or generator expression?",
    shortAnswer: "No, because those are expressions, not statements. They cannot contain `global`.",
    explanation: "List comprehensions have their own local scope, but they cannot contain statements. Use a regular loop or function.",
    hint: "Not allowed in comprehensions.",
    level: "expert",
    codeExample: "# [global x for x in range(5)]  # SyntaxError"
  },
  {
    question: "What is the difference between `global x` and `x = globals().get('x')`?",
    shortAnswer: "`global x` makes `x` refer to the global variable for assignments; `globals().get` only reads the current value.",
    explanation: "`global` is a declaration; `globals()` is a function call. `global` allows modification; `globals().get` does not.",
    hint: "`global` is for writing, not just reading.",
    level: "advanced",
    codeExample: "def f(): global x; x = 5  # modifies\ndef g(): y = globals().get('x')  # reads only"
  },
  {
    question: "What happens if you use `global` on a variable that was already used as a local?",
    shortAnswer: "Python treats the name as global throughout the function; earlier references to the name will look for a global variable (which may not exist).",
    explanation: "The `global` declaration applies to the entire function scope, even if placed after some code.",
    hint: "`global` affects the whole function.",
    level: "advanced",
    codeExample: "x = 5\ndef f(): print(x); global x; x = 10  # print(x) looks for global, finds 5"
  },
  {
    question: "Can you use `global` to make a variable that is both global and also a function parameter?",
    shortAnswer: "No, that is a syntax error.",
    explanation: "A name cannot be both a parameter (local by definition) and a global.",
    hint: "Parameters are always local.",
    level: "advanced",
    codeExample: "def f(x): global x  # SyntaxError"
  },
  {
    question: "How does `global` interact with variable annotations (type hints)?",
    shortAnswer: "You can use `global` with type hints: `global x: int` is not allowed; use separate statements.",
    explanation: "Type hints for globals are written at module level. Inside a function, `global x` then `x: int` is not valid syntax.",
    hint: "Keep type hints at module level.",
    level: "expert",
    codeExample: "x: int = 5  # module level\ndef f(): global x; x = 10  # works"
  },
  {
    question: "What is the best practice for using global variables?",
    shortAnswer: "Avoid them when possible. Use function arguments and return values. If necessary, group them in a module or class.",
    explanation: "Globals create hidden couplings. For configuration, use a module with getter/setter functions or a class.",
    hint: "Minimise global state.",
    level: "intermediate",
    codeExample: "# Better: pass config as argument\ndef process(data, config): pass"
  }
];

export default questions;