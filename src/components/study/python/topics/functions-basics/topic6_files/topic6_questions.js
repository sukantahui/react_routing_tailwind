const questions = [
  {
    question: "What does `*args` do in a function definition?",
    shortAnswer: "It allows the function to accept any number of positional arguments, collected into a tuple.",
    explanation: "The `*` syntax packs extra positional arguments into a tuple named `args` (or any name after `*`).",
    hint: "Think of it as 'gather the rest'.",
    level: "basic",
    codeExample: "def f(*args): print(args); f(1,2,3)  # (1,2,3)"
  },
  {
    question: "What type is `args` inside the function?",
    shortAnswer: "A tuple.",
    explanation: "All extra positional arguments are collected into a tuple. If no arguments, it's an empty tuple.",
    hint: "Tuples are immutable.",
    level: "basic",
    codeExample: "def f(*args): print(type(args)); f()  # <class 'tuple'>"
  },
  {
    question: "Can I use a name other than `args`?",
    shortAnswer: "Yes, the asterisk is what matters. The name after `*` can be anything (e.g., `*numbers`, `*items`).",
    explanation: "Convention is `*args`, but any valid identifier works. The function body uses that name.",
    hint: "Choose a descriptive name.",
    level: "basic",
    codeExample: "def total(*numbers): return sum(numbers)"
  },
  {
    question: "What is the correct order of parameters when using `*args`?",
    shortAnswer: "Normal parameters first, then default parameters, then `*args`, then keyword-only parameters (if any).",
    explanation: "`*args` collects all remaining positional arguments, so it must come after parameters that can be set positionally.",
    hint: "Required, defaults, *args.",
    level: "intermediate",
    codeExample: "def f(a, b=2, *args): pass"
  },
  {
    question: "What happens if I call a function with more positional arguments than `*args`?",
    shortAnswer: "It's fine – `*args` collects the extra ones. If there's no `*args`, you get a TypeError.",
    explanation: "`*args` acts as a catch‑all for any extra positional arguments beyond the explicitly named parameters.",
    hint: "It prevents `TypeError: takes X positional arguments but Y were given`.",
    level: "basic",
    codeExample: "def f(a, *rest): pass; f(1,2,3,4)  # a=1, rest=(2,3,4)"
  },
  {
    question: "Can `*args` be empty?",
    shortAnswer: "Yes. If no extra arguments are passed, `args` is an empty tuple.",
    explanation: "This allows functions to be called with the minimum number of arguments.",
    hint: "Always handle the empty case if needed.",
    level: "basic",
    codeExample: "def f(*args): print(len(args)); f()  # 0"
  },
  {
    question: "How do you iterate over `*args`?",
    shortAnswer: "Use a `for` loop like any tuple.",
    explanation: "Since `args` is a tuple, you can iterate, index, or use tuple methods.",
    hint: "`for arg in args:`",
    level: "basic",
    codeExample: "def sum_all(*nums): total=0; for n in nums: total+=n; return total"
  },
  {
    question: "Can I modify `*args` directly?",
    shortAnswer: "No, because it's a tuple (immutable). But you can convert it to a list if needed.",
    explanation: "Tuples cannot be changed. Use `list(args)` to get a mutable copy.",
    hint: "`args = list(args)` then modify.",
    level: "intermediate",
    codeExample: "def process(*items): items = list(items); items.append('new'); return items"
  },
  {
    question: "What is the difference between `*args` and a list parameter?",
    shortAnswer: "`*args` collects separate arguments; a list parameter expects a single list argument.",
    explanation: "`def f(*args):` can be called as `f(1,2,3)`. `def f(lst):` must be called as `f([1,2,3])`.",
    hint: "One uses commas, the other uses brackets.",
    level: "intermediate",
    codeExample: "def sum1(*nums): return sum(nums); sum1(1,2,3) vs def sum2(nums): return sum(nums); sum2([1,2,3])"
  },
  {
    question: "How do you pass a list as multiple arguments to a function that expects `*args`?",
    shortAnswer: "Use the unpacking operator `*` in the call: `func(*my_list)`.",
    explanation: "The `*` in the call unpacks the list into separate positional arguments.",
    hint: "`*` in call = unpack; `*` in def = pack.",
    level: "intermediate",
    codeExample: "def f(*args): print(args); my_list=[1,2,3]; f(*my_list)  # (1,2,3)"
  },
  {
    question: "Can I use `*args` with default parameters?",
    shortAnswer: "Yes, but default parameters must come before `*args`.",
    explanation: "Example: `def f(a, b=2, *args):` – `b` is a default that can be overridden, but if you pass a third positional argument, it goes into `args`.",
    hint: "Defaults before `*args`.",
    level: "intermediate",
    codeExample: "def f(a, b=2, *args): print(a,b,args); f(1,3,4,5)  # a=1,b=3,args=(4,5)"
  },
  {
    question: "What is a common real‑world use of `*args`?",
    shortAnswer: "Logging functions, math operations (sum, average), and wrapper functions/decorators.",
    explanation: "Any situation where the number of inputs is not known in advance benefits from `*args`.",
    hint: "Think of `print()` – it can take any number of arguments.",
    level: "intermediate",
    codeExample: "def log(level, *messages): for msg in messages: print(f'[{level}] {msg}')"
  },
  {
    question: "Can `*args` be used together with `**kwargs`?",
    shortAnswer: "Yes, and the order must be `*args` before `**kwargs`.",
    explanation: "`*args` collects positional extras, `**kwargs` collects keyword extras. They complement each other.",
    hint: "`def f(*args, **kwargs):`",
    level: "advanced",
    codeExample: "def f(*args, **kwargs): print(args, kwargs); f(1,2, a=3)  # (1,2) {'a':3}"
  },
  {
    question: "What happens if I put `*args` before a parameter with a default?",
    shortAnswer: "That parameter becomes keyword‑only (can only be set by name).",
    explanation: "After `*args`, all parameters are keyword‑only. They can have defaults but cannot be set positionally.",
    hint: "This is an advanced pattern.",
    level: "advanced",
    codeExample: "def f(*args, b=2): print(args,b); f(1,2,3, b=5)  # args=(1,2,3), b=5"
  },
  {
    question: "How do you type hint a function with `*args`?",
    shortAnswer: "Use `*args: type` where `type` indicates the expected type of each argument.",
    explanation: "Example: `def sum_all(*args: int) -> int:` – each argument is int, returns int.",
    hint: "Use `*args: int` not `*args: Tuple[int]`.",
    level: "advanced",
    codeExample: "def average(*scores: float) -> float: return sum(scores)/len(scores)"
  },
  {
    question: "Can I pass a generator or other iterable to `*args`?",
    shortAnswer: "Yes, by unpacking it with `*` in the call: `func(*gen)`.",
    explanation: "The unpacking operator consumes the iterable and passes its items as separate arguments.",
    hint: "Be careful with large generators – all items become arguments.",
    level: "expert",
    codeExample: "def f(*args): print(len(args)); f(*(x for x in range(10)))  # 10"
  },
  {
    question: "What is the performance cost of using `*args`?",
    shortAnswer: "Minimal – creating a tuple of arguments has some overhead, but usually negligible.",
    explanation: "Python already creates a tuple for positional arguments internally. `*args` just exposes it.",
    hint: "Don't micro‑optimize; readability first.",
    level: "expert",
    codeExample: "Passing many arguments (thousands) may be slower than passing a list, but rare."
  },
  {
    question: "Can I use `*args` in lambda functions?",
    shortAnswer: "Yes, lambda can have `*args` as a parameter.",
    explanation: "Example: `lambda *args: sum(args)` creates a lambda that sums any number of arguments.",
    hint: "Useful for small functional patterns.",
    level: "intermediate",
    codeExample: "sum_all = lambda *nums: sum(nums); print(sum_all(1,2,3))"
  },
  {
    question: "How does `*args` interact with default arguments that are mutable?",
    shortAnswer: "The same mutable default trap applies, but `*args` is separate.",
    explanation: "`*args` itself is a tuple (immutable), so no issue. But default parameters before `*args` can be mutable – be careful.",
    hint: "Apply the `None` sentinel pattern for mutable defaults before `*args`.",
    level: "advanced",
    codeExample: "def f(basket=None, *items): basket = basket or []; basket.extend(items); return basket"
  },
  {
    question: "Can I use `*args` to forward arguments to another function?",
    shortAnswer: "Yes, very common in decorators and wrapper functions.",
    explanation: "`def wrapper(*args, **kwargs): return original(*args, **kwargs)`",
    hint: "Preserves flexibility.",
    level: "advanced",
    codeExample: "def timer(func): def wrapper(*args, **kwargs): start=time.time(); result=func(*args,**kwargs); print(time.time()-start); return result"
  },
  {
    question: "What is the difference between `*args` in definition and `*args` in call?",
    shortAnswer: "In definition, `*` packs arguments into a tuple. In call, `*` unpacks an iterable into separate arguments.",
    explanation: "Same symbol, opposite operation.",
    hint: "Packing vs unpacking.",
    level: "intermediate",
    codeExample: "def pack(*args): pass  # packing; pack(*[1,2])  # unpacking in call"
  },
  {
    question: "Can I have multiple `*args` in a function definition?",
    shortAnswer: "No – only one `*args` parameter is allowed, and it must be last among positional parameters.",
    explanation: "Multiple would be ambiguous. Use one `*args` and optionally `**kwargs`.",
    hint: "SyntaxError if you try.",
    level: "basic",
    codeExample: "# def f(*a, *b): pass  # SyntaxError"
  },
  {
    question: "How do you access the first extra argument in `*args`?",
    shortAnswer: "Using indexing: `args[0]`, but ensure `len(args) > 0` first.",
    explanation: "Since `args` is a tuple, you can index it. Use `if args:` to check emptiness.",
    hint: "`first = args[0] if args else None`",
    level: "basic",
    codeExample: "def f(first_required, *rest): print('First extra:', rest[0] if rest else None)"
  },
  {
    question: "Can `*args` be used with class methods?",
    shortAnswer: "Yes, including `__init__`, `__call__`, and regular methods.",
    explanation: "The `self` parameter comes first, then other parameters, then `*args`.",
    hint: "Useful for subclasses that need to pass extra arguments.",
    level: "intermediate",
    codeExample: "class MyClass: def __init__(self, *args): self.data = args"
  },
  {
    question: "What does `*args` become when the function is called with no extra arguments?",
    shortAnswer: "An empty tuple `()`.",
    explanation: "The function can still process `args` safely using loops or checks.",
    hint: "`if args:` is a common pattern.",
    level: "basic",
    codeExample: "def f(*args): print(len(args)); f()  # 0"
  },
  {
    question: "Can I use `*args` to accept a variable number of arguments of mixed types?",
    shortAnswer: "Yes, `*args` can hold any types, since it's just a tuple.",
    explanation: "No restriction on types – you can mix ints, strings, objects, etc.",
    hint: "But your function logic must handle them.",
    level: "intermediate",
    codeExample: "def echo(*things): for thing in things: print(thing); echo(1, 'hello', [1,2])"
  },
  {
    question: "How do you document `*args` in a docstring?",
    shortAnswer: "Use `:param args:` or describe as 'variable-length argument list'.",
    explanation: "Convention: `*args: variable number of X values`.",
    hint: "Be explicit about expected types.",
    level: "basic",
    codeExample: "def sum_all(*nums): \"\"\"Sum any number of integers. :param nums: int values\"\"\""
  },
  {
    question: "What is the `__annotations__` of `*args`?",
    shortAnswer: "It appears as `'args': args_type` where `args_type` is the type hint applied to `*args`.",
    explanation: "Example: `def f(*args: int):` → `{'args': int}`.",
    hint: "The annotation applies to each element, not the tuple.",
    level: "expert",
    codeExample: "def f(*args: float): pass; print(f.__annotations__)  # {'args': float}"
  },
  {
    question: "Can I use `*args` with `@staticmethod` or `@classmethod`?",
    shortAnswer: "Yes, but remember `classmethod` takes `cls` first, then `*args`.",
    explanation: "The decorator doesn't affect `*args` placement.",
    hint: "Same rules apply.",
    level: "advanced",
    codeExample: "@classmethod def create(cls, *args): return cls(*args)"
  },
  {
    question: "How does `*args` behave with keyword arguments?",
    shortAnswer: "Keyword arguments are not collected by `*args`; they go to `**kwargs` or cause TypeError if no `**kwargs`.",
    explanation: "`*args` only captures extra positional arguments. Keyword arguments require separate handling.",
    hint: "Use `**kwargs` for keyword extras.",
    level: "intermediate",
    codeExample: "def f(*args): pass; f(a=1)  # TypeError: got an unexpected keyword argument 'a'"
  },
  {
    question: "Is it possible to have a function that takes no positional arguments but uses `*args`?",
    shortAnswer: "Yes, `def f(*args):` – then all positional arguments go to `args`.",
    explanation: "This means the function requires at least 0 arguments, but can take any number.",
    hint: "Like a flexible accumulator.",
    level: "basic",
    codeExample: "def average(*scores): return sum(scores)/len(scores) if scores else 0"
  }
];

export default questions;