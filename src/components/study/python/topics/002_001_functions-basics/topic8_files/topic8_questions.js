const questions = [
  {
    question: "What does `*` do when used in a function call (e.g., `func(*iterable)`)?",
    shortAnswer: "It unpacks the iterable into positional arguments.",
    explanation: "Each element of the iterable becomes a separate argument to the function.",
    hint: "Opposite of packing in definition.",
    level: "basic",
    codeExample: "def f(a,b): return a+b; f(*[1,2])  # 3"
  },
  {
    question: "What does `**` do in a function call (e.g., `func(**dict)`)?",
    shortAnswer: "It unpacks a dictionary into keyword arguments.",
    explanation: "Dictionary keys become keyword names, values become argument values.",
    hint: "Keys must be strings and valid identifiers.",
    level: "basic",
    codeExample: "def f(name, age): print(name, age); f(**{'name':'A', 'age':20})"
  },
  {
    question: "Can you use `*` with a string?",
    shortAnswer: "Yes, a string is an iterable; it unpacks into individual characters.",
    explanation: "`func(*'abc')` passes three arguments: 'a', 'b', 'c'.",
    hint: "Works with any iterable.",
    level: "intermediate",
    codeExample: "def f(a,b,c): print(a,b,c); f(*'xyz')  # x y z"
  },
  {
    question: "What happens if the number of elements in the unpacked iterable doesn't match the function's parameter count?",
    shortAnswer: "Python raises a TypeError.",
    explanation: "Too many or too few elements → `TypeError: ... takes X positional arguments but Y were given`.",
    hint: "Count must match exactly.",
    level: "basic",
    codeExample: "def f(a,b): pass; f(*[1,2,3])  # TypeError"
  },
  {
    question: "Can you unpack multiple iterables in one function call?",
    shortAnswer: "Yes, Python 3.5+ allows multiple `*` unpackings.",
    explanation: "Example: `func(*[1,2], *[3,4])` passes 4 arguments.",
    hint: "They are concatenated in order.",
    level: "intermediate",
    codeExample: "def f(a,b,c,d): print(a,b,c,d); f(*[1,2], *[3,4])"
  },
  {
    question: "Can you unpack multiple dictionaries in one call?",
    shortAnswer: "Yes, using `**dict1, **dict2`. Later dicts override earlier keys.",
    explanation: "Merges the dictionaries; if keys repeat, the last one wins.",
    hint: "Order matters for duplicate keys.",
    level: "intermediate",
    codeExample: "def f(a,b): print(a,b); f(**{'a':1}, **{'b':2})"
  },
  {
    question: "What is the difference between `*` in definition vs `*` in call?",
    shortAnswer: "In definition, `*args` packs arguments into a tuple; in call, `*iterable` unpacks into arguments.",
    explanation: "They are opposites. The same symbol is used for packing (def) and unpacking (call).",
    hint: "Think of it as two sides of the same coin.",
    level: "intermediate",
    codeExample: "def pack(*args): pass; pack(*[1,2])  # * in call unpacks"
  },
  {
    question: "Can you use `**` to unpack a dictionary that has non-string keys?",
    shortAnswer: "No – all keys must be strings. Otherwise, TypeError.",
    explanation: "Keyword argument names must be strings. Dictionaries with integer keys cannot be unpacked with `**`.",
    hint: "Only string keys allowed.",
    level: "advanced",
    codeExample: "# f(**{1: 'one'})  # TypeError"
  },
  {
    question: "What happens if a dictionary key is not a valid Python identifier (e.g., 'my-key')?",
    shortAnswer: "It still works because the key is a string, but you cannot write it as a keyword argument directly; unpacking works.",
    explanation: "`func(**{'my-key': 1})` is valid; inside the function, the parameter name would be `'my-key'` if using `**kwargs`.",
    hint: "Only use with `**kwargs` functions.",
    level: "advanced",
    codeExample: "def f(**kw): print(kw); f(**{'my-key': 1})  # {'my-key':1}"
  },
  {
    question: "Can you mix regular arguments with unpacking?",
    shortAnswer: "Yes, but regular positional arguments must come before `*unpacking`; keyword arguments before `**unpacking`.",
    explanation: "Order: positional, `*iterable`, keyword, `**dict`.",
    hint: "Follow the same order as in function definition.",
    level: "intermediate",
    codeExample: "def f(a,b,c): pass; f(1, *[2,3])  # a=1,b=2,c=3"
  },
  {
    question: "Is it possible to unpack inside a list or dictionary literal?",
    shortAnswer: "Yes, Python 3.5+ allows `[*a, *b]` for lists and `{**d1, **d2}` for dicts.",
    explanation: "This creates a new list/dict by unpacking the contents.",
    hint: "Useful for merging.",
    level: "advanced",
    codeExample: "combined = [*[1,2], *[3,4]]  # [1,2,3,4]"
  },
  {
    question: "What is a common real-world use of argument unpacking?",
    shortAnswer: "Forwarding arguments in decorators, merging configurations, and calling functions with data from CSV/JSON.",
    explanation: "Any situation where you have a collection that needs to be passed as separate arguments.",
    hint: "Think of `max(*list)`.",
    level: "intermediate",
    codeExample: "def wrapper(*args, **kwargs): return func(*args, **kwargs)"
  },
  {
    question: "Can you use `*` with a generator?",
    shortAnswer: "Yes, but it will consume the generator entirely, which may be memory-intensive.",
    explanation: "The generator is iterated and each yielded value becomes an argument.",
    hint: "Be careful with infinite generators.",
    level: "advanced",
    codeExample: "def gen(): yield 1; yield 2; f(*gen())  # f(1,2)"
  },
  {
    question: "What happens if you unpack a dictionary that has keys not matching any parameter, and the function doesn't have `**kwargs`?",
    shortAnswer: "TypeError: unexpected keyword argument.",
    explanation: "The function's defined parameters must match exactly unless `**kwargs` is present.",
    hint: "Use `**kwargs` in definition to accept arbitrary keywords.",
    level: "basic",
    codeExample: "def f(a): pass; f(**{'a':1, 'b':2})  # TypeError"
  },
  {
    question: "Can you unpack a tuple into function arguments?",
    shortAnswer: "Yes, using `*` (e.g., `func(*my_tuple)`).",
    explanation: "Works exactly like a list.",
    hint: "Any iterable works.",
    level: "basic",
    codeExample: "def add(a,b): return a+b; tup=(5,3); add(*tup)  # 8"
  },
  {
    question: "What is the result of `{**dict1, **dict2}` when keys overlap?",
    shortAnswer: "The value from the later dictionary (dict2) wins.",
    explanation: "Dictionary unpacking in literals merges left to right; later keys overwrite earlier ones.",
    hint: "Similar to `dict1.update(dict2)` but returns a new dict.",
    level: "intermediate",
    codeExample: "d1={'a':1}; d2={'a':2, 'b':3}; {**d1, **d2}  # {'a':2, 'b':3}"
  },
  {
    question: "Can you use `*` to unpack a set?",
    shortAnswer: "Yes, but order is not guaranteed because sets are unordered.",
    explanation: "Unpacking a set yields its elements in arbitrary order.",
    hint: "Not recommended for positional arguments that have an expected order.",
    level: "advanced",
    codeExample: "def f(a,b,c): pass; f(*{1,2,3})  # order depends on set iteration"
  },
  {
    question: "What is the performance implication of unpacking large iterables?",
    shortAnswer: "Unpacking creates a tuple of arguments, which may be large but typically acceptable.",
    explanation: "For huge iterables (millions of items), consider passing the iterable directly instead of unpacking.",
    hint: "Don't unpack enormous sequences.",
    level: "expert",
    codeExample: "Better to accept an iterable parameter than to unpack a million arguments."
  },
  {
    question: "Can I use `*` and `**` in the same call?",
    shortAnswer: "Yes, they can be used together, with `*` first then `**`.",
    explanation: "Example: `func(*seq, **dict)`.",
    hint: "Order matters.",
    level: "intermediate",
    codeExample: "def f(a,b,c=0): pass; f(*[1,2], **{'c':3})"
  },
  {
    question: "What happens if I try to unpack a non-iterable with `*`?",
    shortAnswer: "TypeError: `func() argument after * must be an iterable, not ...`.",
    explanation: "Only iterables can be unpacked.",
    hint: "Check type before unpacking.",
    level: "basic",
    codeExample: "f(*5)  # TypeError: 'int' object is not iterable"
  },
  {
    question: "How does unpacking interact with default parameter values?",
    shortAnswer: "Unpacked arguments fill parameters in order; defaults are used only if not provided.",
    explanation: "If the unpacked iterable has fewer elements than required parameters, missing ones get defaults (if any).",
    hint: "Defaults are still applied.",
    level: "intermediate",
    codeExample: "def f(a,b=2): print(a,b); f(*[1])  # a=1,b=2"
  },
  {
    question: "Can you unpack a dictionary with `**` and also pass additional keyword arguments?",
    shortAnswer: "Yes, but the additional keyword arguments must come after the unpacking (or before, but careful with order).",
    explanation: "Order: ... `**dict`, keyword=value. Later keyword overrides if same key exists in dict.",
    hint: "Later overrides earlier.",
    level: "advanced",
    codeExample: "f(**{'a':1}, b=2)  # b overrides if 'b' in dict? No, dict has no 'b'."
  },
  {
    question: "What is the difference between `func(*[1,2])` and `func([1,2])`?",
    shortAnswer: "First unpacks to two arguments, second passes a single list argument.",
    explanation: "The first is equivalent to `func(1,2)`, the second to `func([1,2])`.",
    hint: "One list becomes separate args, other stays as one list.",
    level: "basic",
    codeExample: "def f(a,b): return a+b; f(*[1,2]) works; f([1,2]) fails."
  },
  {
    question: "Can I use `*` to unpack a range object?",
    shortAnswer: "Yes, `range` is iterable, so `func(*range(3))` passes 0,1,2.",
    explanation: "Be careful with large ranges – they generate many arguments.",
    hint: "Works but may be heavy.",
    level: "intermediate",
    codeExample: "def f(a,b,c): print(a,b,c); f(*range(3))  # 0 1 2"
  },
  {
    question: "Is argument unpacking the same as variable unpacking (e.g., `a,b = [1,2]`)?",
    shortAnswer: "Similar concept but different context: variable unpacking assigns to names; argument unpacking passes to functions.",
    explanation: "Both use `*` syntax but in different places.",
    hint: "Same symbol, different purpose.",
    level: "basic",
    codeExample: "a,b = [1,2]  # variable unpacking; func(*[1,2])  # argument unpacking"
  },
  {
    question: "Can you use `**` to unpack a dictionary that has a key named after a built-in (e.g., `print`)?",
    shortAnswer: "Yes, it's allowed because it's just a string. But inside the function, you can access it via `kwargs['print']`.",
    explanation: "No special restriction; the key is a string.",
    hint: "Avoid confusion.",
    level: "advanced",
    codeExample: "def f(**kw): print(kw['print']); f(**{'print': 42})"
  },
  {
    question: "What is the maximum number of arguments you can unpack?",
    shortAnswer: "Limited by Python's maximum argument count (typically around 10^5, platform-dependent).",
    explanation: "Unpacking huge iterables may hit recursion depth or memory limits.",
    hint: "Practical limit: a few thousand.",
    level: "expert",
    codeExample: "Unpacking a list of 100,000 elements will likely cause a RecursionError or MemoryError."
  },
  {
    question: "Can I use unpacking with built-in functions like `print`?",
    shortAnswer: "Yes, `print(*[1,2,3])` prints `1 2 3`.",
    explanation: "Built-in functions accept unpacking just like user-defined ones.",
    hint: "Very useful.",
    level: "basic",
    codeExample: "print(*['a','b','c'], sep=',')  # a,b,c"
  },
  {
    question: "What is the purpose of `*` and `**` in argument forwarding?",
    shortAnswer: "They allow a wrapper function to pass any arguments to another function without knowing them in advance.",
    explanation: "`def wrapper(*args, **kwargs): return func(*args, **kwargs)`",
    hint: "Essential for decorators.",
    level: "advanced",
    codeExample: "See decorator pattern."
  },
  {
    question: "Can you use `*` to unpack a dictionary? What happens?",
    shortAnswer: "Yes, but it unpacks only the keys (not values) because iterating a dict yields keys.",
    explanation: "`func(*{'a':1, 'b':2})` passes 'a', 'b' as arguments.",
    hint: "Use `**` for values.",
    level: "advanced",
    codeExample: "def f(a,b): print(a,b); f(*{'a':1, 'b':2})  # prints 'a','b'"
  },
  {
    question: "How does unpacking work with functions that have `*args` parameter?",
    shortAnswer: "Unpacking feeds into `*args` as individual elements, not as a tuple.",
    explanation: "If a function is defined with `*args`, calling it with `func(*[1,2,3])` will make `args = (1,2,3)`.",
    hint: "Unpacking is already providing separate args; `*args` packs them again.",
    level: "intermediate",
    codeExample: "def f(*args): print(args); f(*[1,2])  # (1,2)"
  }
];

export default questions;