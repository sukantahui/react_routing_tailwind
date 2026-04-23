const questions = [
  {
    question: "What are default parameter values in Python?",
    shortAnswer: "Values assigned to parameters in function definition that are used if the caller doesn't provide an argument.",
    explanation: "Default parameters allow functions to be called with fewer arguments than defined, using the default for omitted ones. They are defined with `param=value` syntax.",
    hint: "Think of optional settings that have a sensible default.",
    level: "basic",
    codeExample: "def greet(name='Guest'): print(f'Hello {name}')"
  },
  {
    question: "What is the correct order for parameters with default values?",
    shortAnswer: "All non-default (required) parameters must come before default parameters.",
    explanation: "Python requires that parameters without defaults are listed first, otherwise the syntax is ambiguous. Example: `def func(a, b=1):` is correct; `def func(a=1, b):` is invalid.",
    hint: "Required parameters first, optional after.",
    level: "basic",
    codeExample: "def func(required, optional='default'): pass"
  },
  {
    question: "When are default parameter values evaluated?",
    shortAnswer: "Once, at function definition time, not each time the function is called.",
    explanation: "The default value is computed when the `def` statement is executed and stored in the function object. Subsequent calls reuse the same object.",
    hint: "Try using `datetime.now()` as a default – it won't update.",
    level: "intermediate",
    codeExample: "import datetime; def log(msg, when=datetime.now()): print(when, msg)"
  },
  {
    question: "Why is using a mutable default (like []) dangerous?",
    shortAnswer: "Because the same mutable object is reused across all calls, leading to unexpected state accumulation.",
    explanation: "The default list is created once and attached to the function. Each call that modifies it will affect future calls.",
    hint: "Run a function that appends to a default list multiple times.",
    level: "intermediate",
    codeExample: "def add(x, lst=[]): lst.append(x); return lst"
  },
  {
    question: "How do you safely use a mutable default like a list?",
    shortAnswer: "Set the default to `None` and create a new mutable inside the function if needed.",
    explanation: "Inside the function, check `if param is None: param = []`. This creates a fresh list each call.",
    hint: "Use sentinel `None` then instantiate.",
    level: "intermediate",
    codeExample: "def add(x, lst=None): lst = lst or []; lst.append(x); return lst"
  },
  {
    question: "Can a default value depend on another parameter?",
    shortAnswer: "No, because the other parameter is not in scope when the default is evaluated.",
    explanation: "Default values are evaluated in the function's definition scope, where only global names and previously defined parameters are available.",
    hint: "You cannot write `def f(a, b=a):` – it will raise a NameError.",
    level: "advanced",
    codeExample: "# Invalid: def f(a, b=a): pass"
  },
  {
    question: "How can you override a default parameter when calling a function?",
    shortAnswer: "Pass an argument (positionally or by keyword) for that parameter.",
    explanation: "The argument you provide replaces the default value. If you want to skip a default parameter that appears before another you want to override, use keyword arguments.",
    hint: "Positional args override in order; keyword args override by name.",
    level: "basic",
    codeExample: "def f(a=1, b=2): pass; f(b=5)  # a uses default 1, b=5"
  },
  {
    question: "What is the return type of a function that uses default parameters?",
    shortAnswer: "The return type is determined by the function's logic, not by the defaults.",
    explanation: "Default parameters only affect input values; they do not change the function's return type annotation (if any).",
    hint: "Defaults are about inputs, not outputs.",
    level: "basic",
    codeExample: "def add(x, y=0): return x + y  # returns int"
  },
  {
    question: "Can you use a function call as a default value?",
    shortAnswer: "Yes, but it will be called only once at definition time.",
    explanation: "You can write `def f(arg=some_function())`. The function is invoked when the `def` is executed, not each call.",
    hint: "Use this carefully – the value is fixed.",
    level: "intermediate",
    codeExample: "def get_default(): return 42; def f(x=get_default()): print(x)"
  },
  {
    question: "What happens if you modify a default list inside the function?",
    shortAnswer: "The modified list persists and will be used in future calls as the default.",
    explanation: "Since the default object is shared, changes are visible across invocations. This is often unintended.",
    hint: "It's like a hidden global variable attached to the function.",
    level: "intermediate",
    codeExample: "def f(lst=[]): lst.append(1); return lst"
  },
  {
    question: "How can you see the default values of a function?",
    shortAnswer: "Use `function.__defaults__` (for positional defaults) and `function.__kwdefaults__` (for keyword-only defaults).",
    explanation: "These attributes store the default values as tuples/dicts. They are mutable but should not be modified.",
    hint: "Try `print(my_func.__defaults__)`.",
    level: "advanced",
    codeExample: "def f(a, b=2, c=3): pass; print(f.__defaults__)  # (2, 3)"
  },
  {
    question: "What is the difference between `def f(a, b=[])` and `def f(a, b=None); b = b or []`?",
    shortAnswer: "The first shares a single list across calls; the second creates a new list each call when `None` is provided.",
    explanation: "The first uses a mutable default (dangerous). The second uses `None` as a sentinel and creates a fresh list inside, avoiding sharing.",
    hint: "Always prefer the second pattern for mutable defaults.",
    level: "intermediate",
    codeExample: "def safe(b=None): b = b or []"
  },
  {
    question: "Can default parameters be overridden with positional arguments?",
    shortAnswer: "Yes, but you must provide values for all parameters before the one you want to override.",
    explanation: "Positional arguments fill parameters in order. To override a default later in the list, you must also provide values for all preceding parameters (unless you use keyword arguments).",
    hint: "Keyword arguments are more flexible.",
    level: "basic",
    codeExample: "def f(a=1, b=2): pass; f(10)  # a=10, b=2 (default)"
  },
  {
    question: "Is it possible to have a default value that is a lambda?",
    shortAnswer: "Yes, lambdas are expressions and can be used as default values.",
    explanation: "The lambda is evaluated once at definition time, creating a callable object that is stored as the default.",
    hint: "Be careful – the lambda captures variables at definition time.",
    level: "advanced",
    codeExample: "def f(transform=lambda x: x): return transform(5)"
  },
  {
    question: "How do default parameters interact with `*args`?",
    shortAnswer: "Parameters with defaults cannot appear after `*args` unless they are keyword-only.",
    explanation: "After `*args`, parameters are keyword-only and can have defaults. Regular defaults must appear before `*args`.",
    hint: "Order: positional, default, *args, keyword-only default.",
    level: "advanced",
    codeExample: "def f(a, b=2, *args, c=3): pass"
  },
  {
    question: "What does `functools.partial` have to do with default parameters?",
    shortAnswer: "`partial` creates a new function with some arguments pre‑filled, similar to setting defaults at call time.",
    explanation: "It 'freezes' some arguments, returning a callable that requires fewer arguments. Useful for functional programming.",
    hint: "Like a 'custom default' that is evaluated at creation.",
    level: "expert",
    codeExample: "from functools import partial; def power(base, exp): return base**exp; square = partial(power, exp=2)"
  },
  {
    question: "Can you change a function's default values after it's defined?",
    shortAnswer: "Yes, by modifying `__defaults__` or `__kwdefaults__`, but this is hacky and not recommended.",
    explanation: "These attributes are writable, but mutating them can break expectations and is considered bad practice.",
    hint: "Don't do this in production code.",
    level: "expert",
    codeExample: "def f(a=1): pass; f.__defaults__ = (2,); print(f())  # uses 2"
  },
  {
    question: "What is the 'mutable default argument' gotcha?",
    shortAnswer: "A default argument that is a mutable object (list, dict, set) is shared across all calls, causing unintended accumulation.",
    explanation: "Because the default is created once and attached to the function, modifications persist. This is one of Python's most common surprises.",
    hint: "It's like a static variable in C.",
    level: "intermediate",
    codeExample: "def f(lst=[]): lst.append(1); return lst"
  },
  {
    question: "How to avoid mutable default issues with dictionaries?",
    shortAnswer: "Use `None` as default and create a new dict inside: `if d is None: d = {}`.",
    explanation: "This pattern ensures a fresh dictionary for each call when no argument is provided.",
    hint: "Same as for lists.",
    level: "intermediate",
    codeExample: "def process(data, config=None): config = config or {}; config['key'] = value"
  },
  {
    question: "Can a default value be an object attribute that changes?",
    shortAnswer: "Yes, but the attribute is read at definition time, so changes afterward are not reflected.",
    explanation: "For example, `default=obj.attr` stores the value of `obj.attr` at the moment of definition.",
    hint: "It's static, not dynamic.",
    level: "advanced",
    codeExample: "class C: x = 1; def f(a=C.x): print(a); C.x = 2; f()  # prints 1"
  },
  {
    question: "What is the purpose of using `None` as a default?",
    shortAnswer: "To indicate that no value was provided, allowing you to create a fresh mutable inside the function.",
    explanation: "`None` is immutable and a safe sentinel. It also allows you to distinguish between `None` as an argument and no argument.",
    hint: "Use `if param is None:` to handle.",
    level: "intermediate",
    codeExample: "def f(param=None): param = param or []"
  },
  {
    question: "How do you document default parameter values?",
    shortAnswer: "In the docstring, using the `:param` directive or plain English describing the default.",
    explanation: "Tools like Sphinx recognise `:param name: description (default: value)`.",
    hint: "Make defaults explicit.",
    level: "basic",
    codeExample: "def f(x=1): \"\"\"... :param x: multiplier (default 1)\"\"\""
  },
  {
    question: "What is a keyword-only default parameter?",
    shortAnswer: "A parameter that can only be set using a keyword argument, often with a default value, appearing after `*` or `*args`.",
    explanation: "Example: `def f(a, *, b=2):` – `b` is keyword-only with default 2.",
    hint: "The `*` in the parameter list separates positional from keyword-only.",
    level: "advanced",
    codeExample: "def f(a, *, b=2): pass; f(1, b=3)  # works; f(1, 3) raises TypeError"
  },
  {
    question: "Can you mix default and non-default parameters after `*args`?",
    shortAnswer: "After `*args`, all parameters are keyword-only and can have defaults.",
    explanation: "Example: `def f(a, *args, b=1, c):` – `b` has default, `c` is required keyword-only.",
    hint: "Keyword-only required parameters have no default.",
    level: "expert",
    codeExample: "def f(*, required): pass  # must call with required=..."
  },
  {
    question: "What happens if you assign a default value that is a variable that later changes?",
    shortAnswer: "The default value uses the variable's value at definition time; later changes to the variable do not affect the default.",
    explanation: "Because the default is evaluated when `def` is executed, not when the function is called.",
    hint: "It's captured early.",
    level: "intermediate",
    codeExample: "x = 10; def f(y=x): print(y); x = 20; f()  # prints 10"
  },
  {
    question: "How can you force a parameter to be passed by keyword only?",
    shortAnswer: "Place `*` in the parameter list before that parameter. Any parameter after `*` is keyword-only.",
    explanation: "This prevents the parameter from being set by position, improving readability for boolean flags or optional settings.",
    hint: "Use `*` as a separator.",
    level: "advanced",
    codeExample: "def f(a, *, b): pass; f(1, b=2)  # correct; f(1,2) error"
  },
  {
    question: "What is the purpose of `**kwargs` with defaults?",
    shortAnswer: "`**kwargs` collects extra keyword arguments; defaults for specific keys can be handled inside the function using `kwargs.get('key', default)`.",
    explanation: "You cannot have default values directly in `**kwargs`; you must provide logic inside the function body.",
    hint: "`**kwargs` itself has no defaults.",
    level: "advanced",
    codeExample: "def f(**kwargs): timeout = kwargs.get('timeout', 5)"
  },
  {
    question: "Can a default value be a class instance?",
    shortAnswer: "Yes, any object can be a default, including class instances.",
    explanation: "The instance is created once at definition time. If the instance is mutable, modifications will persist across calls.",
    hint: "Same caution as list/dict.",
    level: "intermediate",
    codeExample: "class C: pass; obj = C(); def f(x=obj): print(id(x))"
  },
  {
    question: "How does Python handle default values in method definitions?",
    shortAnswer: "Same as functions – default values are bound at definition time and belong to the function object, not instances.",
    explanation: "For mutable defaults, the same gotcha applies. For instance methods, `self` is not available at definition time, so you cannot use `self` in defaults.",
    hint: "Defaults are evaluated when the class is defined.",
    level: "advanced",
    codeExample: "class A: def f(self, x=[]): x.append(1)"
  },
  {
    question: "What is the `__defaults__` attribute of a function?",
    shortAnswer: "A tuple containing the default values for positional parameters (from left to right).",
    explanation: "It is stored on the function object. Modifying it changes the defaults, but this is not recommended.",
    hint: "Read‑only in practice.",
    level: "expert",
    codeExample: "def f(a, b=2, c=3): pass; print(f.__defaults__)  # (2, 3)"
  },
  {
    question: "How can you create a function that has a default that is evaluated at call time?",
    shortAnswer: "Set the default to `None` and compute the value inside the function if the argument is `None`.",
    explanation: "For example, `def log(msg, when=None): when = when or datetime.now()`.",
    hint: "Sentinel pattern.",
    level: "intermediate",
    codeExample: "def log(msg, when=None): when = when or datetime.now(); print(when, msg)"
  }
];

export default questions;