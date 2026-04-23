const questions = [
  {
    question: "What does `**kwargs` do in a function definition?",
    shortAnswer: "It collects any number of keyword arguments into a dictionary.",
    explanation: "The `**` syntax packs extra keyword arguments into a dict named `kwargs` (or any name after `**`).",
    hint: "Think of it as 'gather all keyword arguments'.",
    level: "basic",
    codeExample: "def f(**kwargs): print(kwargs); f(a=1, b=2)  # {'a':1, 'b':2}"
  },
  {
    question: "What type is `kwargs` inside the function?",
    shortAnswer: "A dictionary (dict).",
    explanation: "All extra keyword arguments become key-value pairs in a dict. Keys are strings (parameter names).",
    hint: "Use `.items()` to iterate.",
    level: "basic",
    codeExample: "def f(**kwargs): print(type(kwargs)); f(x=5)  # <class 'dict'>"
  },
  {
    question: "Can I use a name other than `kwargs`?",
    shortAnswer: "Yes, the double asterisk is what matters. The name after `**` can be anything (e.g., `**options`).",
    explanation: "Convention is `**kwargs`, but any valid identifier works.",
    hint: "Choose a descriptive name like `**config`.",
    level: "basic",
    codeExample: "def f(**settings): print(settings); f(mode='dark')"
  },
  {
    question: "What is the correct order when using `*args` and `**kwargs` together?",
    shortAnswer: "Normal parameters, then `*args`, then `**kwargs`.",
    explanation: "`**kwargs` must always be the last parameter. Example: `def f(a, b=2, *args, **kwargs):`",
    hint: "Remember: positional, *args, **kwargs.",
    level: "intermediate",
    codeExample: "def f(a, *args, **kwargs): pass"
  },
  {
    question: "What happens if I call a function with keyword arguments that are not defined as parameters?",
    shortAnswer: "If the function has `**kwargs`, they are collected; otherwise, TypeError.",
    explanation: "Without `**kwargs`, extra keyword arguments raise `TypeError: got an unexpected keyword argument`.",
    hint: "Use `**kwargs` to accept arbitrary keywords.",
    level: "basic",
    codeExample: "def f(a): pass; f(a=1, b=2)  # TypeError; def f(a, **kwargs): pass  # works"
  },
  {
    question: "Can `**kwargs` be empty?",
    shortAnswer: "Yes. If no keyword arguments are passed, `kwargs` is an empty dict.",
    explanation: "The function can still run, and `kwargs` can be checked with `if kwargs:`.",
    hint: "Always handle the empty case if needed.",
    level: "basic",
    codeExample: "def f(**kwargs): print(len(kwargs)); f()  # 0"
  },
  {
    question: "How do you iterate over `**kwargs`?",
    shortAnswer: "Use `.items()`, `.keys()`, or `.values()` dictionary methods.",
    explanation: "Example: `for key, value in kwargs.items():`",
    hint: "`kwargs` is a normal dict.",
    level: "basic",
    codeExample: "def print_kwargs(**kwargs): for k,v in kwargs.items(): print(f'{k}={v}')"
  },
  {
    question: "How do you access a value in `**kwargs` safely?",
    shortAnswer: "Use `kwargs.get('key', default)` to avoid KeyError if the key is missing.",
    explanation: "Direct indexing `kwargs['key']` raises KeyError if the key is not present.",
    hint: "`.get()` is safer.",
    level: "basic",
    codeExample: "timeout = kwargs.get('timeout', 5)"
  },
  {
    question: "What is the difference between `*args` and `**kwargs`?",
    shortAnswer: "`*args` collects positional arguments into a tuple; `**kwargs` collects keyword arguments into a dict.",
    explanation: "They handle different types of arguments and are often used together.",
    hint: "`*args` for variable positional, `**kwargs` for variable keyword.",
    level: "basic",
    codeExample: "def f(*args, **kwargs): print(args, kwargs); f(1,2, a=3)  # (1,2) {'a':3}"
  },
  {
    question: "How do you pass a dictionary as keyword arguments to a function?",
    shortAnswer: "Use `**` unpacking in the call: `func(**my_dict)`.",
    explanation: "The dict keys must be strings that are valid parameter names.",
    hint: "`**` in call unpacks dict into keyword arguments.",
    level: "intermediate",
    codeExample: "def f(a,b): return a+b; d={'a':5, 'b':3}; print(f(**d))  # 8"
  },
  {
    question: "Can `**kwargs` accept keys that are not valid Python identifiers?",
    shortAnswer: "No – when calling a function, keys must be valid identifiers (no spaces, not starting with digit). But after unpacking, the dict can have any string keys.",
    explanation: "`func(**{'invalid-key':1})` works because the key is a string, but inside `kwargs` the key is `'invalid-key'`. However, you cannot write `func(invalid-key=1)` directly.",
    hint: "Use dict unpacking for non-identifier keys.",
    level: "advanced",
    codeExample: "def f(**kw): print(kw); f(**{'my-key': 42})  # {'my-key': 42}"
  },
  {
    question: "What is a common real‑world use of `**kwargs`?",
    shortAnswer: "Configuration functions, argument forwarding in decorators, HTML tag builders, and subclass constructors.",
    explanation: "Any situation where you want to accept arbitrary options without enumerating them all.",
    hint: "Think of `requests.get(url, **options)`.",
    level: "intermediate",
    codeExample: "def make_tag(name, **attrs): return f'<{name} {\" \".join(f\"{k}={v}\" for k,v in attrs.items())}>'"
  },
  {
    question: "Can I use `**kwargs` with default parameter values?",
    shortAnswer: "Yes, but explicit parameters with defaults are separate from `**kwargs`. They are consumed first; leftover keywords go to `kwargs`.",
    explanation: "Example: `def f(a, b=2, **kwargs):` – `b` is not in `kwargs` if provided.",
    hint: "Explicit parameters take precedence.",
    level: "intermediate",
    codeExample: "def f(a, b=2, **kw): print(a,b,kw); f(1, c=3)  # a=1,b=2,kw={'c':3}"
  },
  {
    question: "What happens if I define a function with `**kwargs` and also have an explicit parameter with the same name?",
    shortAnswer: "The explicit parameter takes precedence; that key will not appear in `kwargs`.",
    explanation: "Python matches keyword arguments to explicit parameters first. Only leftover keywords go into `**kwargs`.",
    hint: "They are mutually exclusive.",
    level: "advanced",
    codeExample: "def f(name, **kwargs): print(name, kwargs); f(name='A', age=10)  # name='A', kwargs={'age':10}"
  },
  {
    question: "How do you type hint a function with `**kwargs`?",
    shortAnswer: "Use `**kwargs: type` where `type` indicates the expected type of each value.",
    explanation: "Example: `def f(**kwargs: int)` means all keyword argument values must be ints. Keys are always strings.",
    hint: "Python 3.12+ supports `**kwargs: Unpack[TypedDict]`.",
    level: "advanced",
    codeExample: "def config(**settings: str) -> None: pass"
  },
  {
    question: "Can I have multiple `**kwargs` parameters?",
    shortAnswer: "No – only one `**kwargs` is allowed, and it must be the last parameter.",
    explanation: "SyntaxError if you try. Use one `**kwargs` to capture all extra keywords.",
    hint: "Only one.",
    level: "basic",
    codeExample: "# def f(**a, **b): pass  # SyntaxError"
  },
  {
    question: "How does `**kwargs` work with class inheritance and `super()`?",
    shortAnswer: "You can forward `**kwargs` to the parent class constructor, allowing flexible child classes.",
    explanation: "Common pattern: `def __init__(self, **kwargs): super().__init__(**kwargs)`",
    hint: "Useful for multiple inheritance (mixins).",
    level: "advanced",
    codeExample: "class A: def __init__(self, a): pass; class B(A): def __init__(self, **kwargs): super().__init__(**kwargs)"
  },
  {
    question: "Can I modify `**kwargs` inside the function?",
    shortAnswer: "Yes, because it's a regular dict. You can add, remove, or change items.",
    explanation: "However, modifying `kwargs` does not affect the original arguments outside the function.",
    hint: "It's a copy of the passed keyword arguments.",
    level: "intermediate",
    codeExample: "def f(**kw): kw['new'] = 42; print(kw); f(a=1)  # {'a':1, 'new':42}"
  },
  {
    question: "What is the performance cost of using `**kwargs`?",
    shortAnswer: "Minimal – creating a dict of keyword arguments has overhead, but acceptable for most uses.",
    explanation: "Python already creates a dict for keyword arguments internally. `**kwargs` just exposes it.",
    hint: "Don't worry unless in extremely tight loops.",
    level: "expert",
    codeExample: "Typically fine; use when flexibility is needed."
  },
  {
    question: "Can I use `**kwargs` in lambda functions?",
    shortAnswer: "Yes, lambda can have `**kwargs` as a parameter.",
    explanation: "Example: `lambda **kw: kw.get('x', 0)`",
    hint: "Useful for short callbacks.",
    level: "intermediate",
    codeExample: "get_x = lambda **kw: kw.get('x', 0); print(get_x(x=5, y=10))  # 5"
  },
  {
    question: "How does `**kwargs` interact with `*args` when both are present?",
    shortAnswer: "`*args` collects extra positional arguments, `**kwargs` collects extra keyword arguments. They don't interfere.",
    explanation: "Example: `def f(a, *args, **kwargs):` – `a` is required positional; extra positional → `args`; extra keyword → `kwargs`.",
    hint: "They handle different 'channels'.",
    level: "intermediate",
    codeExample: "def f(*args, **kwargs): print(args, kwargs); f(1,2, x=3)  # (1,2) {'x':3}"
  },
  {
    question: "Can I use `**kwargs` to pass arguments to another function conditionally?",
    shortAnswer: "Yes, you can filter or modify the dict before unpacking.",
    explanation: "Example: build a dict of options and call `target(**filtered_kwargs)`.",
    hint: "Very common in API wrappers.",
    level: "advanced",
    codeExample: "def wrapper(**kwargs): kwargs.pop('internal', None); return actual(**kwargs)"
  },
  {
    question: "What is the purpose of `**kwargs` in decorators?",
    shortAnswer: "To forward any keyword arguments from the wrapper to the original function.",
    explanation: "A decorator often defines `def wrapper(*args, **kwargs): return func(*args, **kwargs)` to be completely transparent.",
    hint: "Preserves the decorated function's signature.",
    level: "advanced",
    codeExample: "def timer(func): def wrapper(*args, **kwargs): start=time.time(); result=func(*args,**kwargs); print(time.time()-start); return result"
  },
  {
    question: "Can I use `**kwargs` to provide default values?",
    shortAnswer: "Yes, using `kwargs.get('key', default)` inside the function body.",
    explanation: "This allows optional parameters without listing them in the definition.",
    hint: "Combine with explicit defaults for clarity.",
    level: "intermediate",
    codeExample: "def connect(**kwargs): timeout = kwargs.get('timeout', 5)"
  },
  {
    question: "What happens if I pass a keyword argument that is also a Python built-in function name?",
    shortAnswer: "It's allowed – the key is just a string, e.g., `print=5`. But avoid confusion.",
    explanation: "Inside the function, you can access `kwargs['print']`. But you lose the built-in `print` if you overwrite it locally.",
    hint: "Not recommended for clarity.",
    level: "advanced",
    codeExample: "def f(**kw): print(kw.get('print')); f(print=42)  # 42"
  },
  {
    question: "How do I document `**kwargs` in a docstring?",
    shortAnswer: "Use `:param kwargs:` or describe expected keys and their meanings.",
    explanation: "Convention: `**kwargs: arbitrary keyword arguments. Expected keys: ...`",
    hint: "Be as explicit as possible.",
    level: "basic",
    codeExample: "def f(**kwargs): \"\"\"... :param kwargs: optional settings (timeout, retries)\"\"\""
  },
  {
    question: "What is the `__annotations__` of `**kwargs`?",
    shortAnswer: "It appears as `'kwargs': kwargs_type` where `kwargs_type` is the type hint applied to `**kwargs`.",
    explanation: "Example: `def f(**kwargs: float):` → `{'kwargs': float}`.",
    hint: "The annotation applies to each value.",
    level: "expert",
    codeExample: "def f(**kwargs: int): pass; print(f.__annotations__)  # {'kwargs': int}"
  },
  {
    question: "Can I use `**kwargs` with `@staticmethod` or `@classmethod`?",
    shortAnswer: "Yes, but remember `classmethod` takes `cls` first, then `**kwargs`.",
    explanation: "The decorator doesn't affect `**kwargs` placement.",
    hint: "Same rules.",
    level: "advanced",
    codeExample: "@classmethod def create(cls, **kwargs): return cls(**kwargs)"
  },
  {
    question: "How does `**kwargs` behave with `functools.partial`?",
    shortAnswer: "You can partially apply some keyword arguments, and the rest can still be passed via `**kwargs`.",
    explanation: "`partial` fixes certain keyword arguments; the returned function still accepts `**kwargs` for others.",
    hint: "Useful for configuration.",
    level: "expert",
    codeExample: "from functools import partial; def f(a,b): pass; g = partial(f, b=2); g(a=1)  # works"
  },
  {
    question: "What is the difference between `**kwargs` and using a dict parameter?",
    shortAnswer: "`**kwargs` collects multiple keyword arguments; a dict parameter expects a single dict argument.",
    explanation: "Calling style: `f(a=1, b=2)` vs `f({'a':1, 'b':2})`. `**kwargs` is more convenient for callers.",
    hint: "Choose `**kwargs` for API flexibility.",
    level: "intermediate",
    codeExample: "def f(**kwargs): pass vs def g(config): pass; f(a=1); g({'a':1})"
  },
  {
    question: "Can I use `**kwargs` in a function that also has keyword-only parameters?",
    shortAnswer: "Yes, keyword-only parameters (after `*`) are separate from `**kwargs`. They are not included in `kwargs`.",
    explanation: "Example: `def f(*, a=1, **kwargs):` – `a` is keyword-only, not in `kwargs`.",
    hint: "Keyword-only parameters are explicit.",
    level: "advanced",
    codeExample: "def f(*, a=1, **kw): print(a, kw); f(b=2)  # a=1, kw={'b':2}"
  }
];

export default questions;