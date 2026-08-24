const questions = [
  {
    question: "What does a function return if it has no `return` statement?",
    shortAnswer: "It returns `None`.",
    explanation: "Every Python function returns a value; if no explicit return, `None` is returned.",
    hint: "The default return value is `None`.",
    level: "basic",
    codeExample: "def f(): pass; print(f())  # None"
  },
  {
    question: "What is `None` in Python?",
    shortAnswer: "A singleton object representing the absence of a value.",
    explanation: "`None` is the sole instance of `NoneType`. It's used to indicate 'no value' or 'null'.",
    hint: "Similar to `null` in other languages.",
    level: "basic",
    codeExample: "x = None; print(type(x))  # <class 'NoneType'>"
  },
  {
    question: "How should you check if a variable is `None`?",
    shortAnswer: "Use `if x is None:` or `if x is not None:`.",
    explanation: "`is` compares identity, which is correct for singletons. `==` also works but is slower and can be overridden.",
    hint: "`is` is idiomatic and faster.",
    level: "basic",
    codeExample: "if result is None: print('No result')"
  },
  {
    question: "What does `return` without a value do?",
    shortAnswer: "It exits the function and returns `None`.",
    explanation: "`return` alone is equivalent to `return None`. Often used for early exits.",
    hint: "Early exit pattern.",
    level: "basic",
    codeExample: "def f(): if condition: return; print('continues')"
  },
  {
    question: "Is `None` the same as `False`?",
    shortAnswer: "No, `None` is a different object, though both are falsy.",
    explanation: "`None` is falsy (`bool(None) is False`), but `None is False` is `False`.",
    hint: "Different types.",
    level: "basic",
    codeExample: "print(None == False)  # False"
  },
  {
    question: "Why do methods like `list.append()` return `None`?",
    shortAnswer: "Because they modify the list in place and don't need to return a value.",
    explanation: "Returning `None` signals that the operation was a side effect, not a computation.",
    hint: "In‑place modification pattern.",
    level: "intermediate",
    codeExample: "lst = [1,2]; result = lst.append(3); print(result)  # None"
  },
  {
    question: "Can I use `None` as a default parameter value?",
    shortAnswer: "Yes, and it's a common pattern to avoid mutable default traps.",
    explanation: "`def f(lst=None): lst = lst or []` allows creating a new list each call.",
    hint: "Sentinel for optional arguments.",
    level: "intermediate",
    codeExample: "def add_item(item, basket=None): basket = basket or []; basket.append(item)"
  },
  {
    question: "What is the type of `None`?",
    shortAnswer: "`NoneType`.",
    explanation: "It's a built‑in type; you can access it as `type(None)`.",
    hint: "Singleton type.",
    level: "basic",
    codeExample: "print(type(None))  # <class 'NoneType'>"
  },
  {
    question: "What happens if I try to call a method on `None`?",
    shortAnswer: "`AttributeError: 'NoneType' object has no attribute ...`",
    explanation: "`None` has very few methods (e.g., `__str__`, `__bool__`).",
    hint: "Common runtime error.",
    level: "basic",
    codeExample: "x = None; x.append(5)  # AttributeError"
  },
  {
    question: "Can I assign multiple variables to `None`?",
    shortAnswer: "Yes, and they all reference the same `None` object.",
    explanation: "`a = None; b = None; a is b` is `True`.",
    hint: "Singleton.",
    level: "basic",
    codeExample: "a = None; b = None; print(a is b)  # True"
  },
  {
    question: "What is the difference between `None` and `''` (empty string)?",
    shortAnswer: "`None` means 'no value'; empty string is a string with zero characters.",
    explanation: "They are different types; `None` is falsy, `''` is also falsy but distinct.",
    hint: "`''` is a string, `None` is not.",
    level: "basic",
    codeExample: "print(type(None), type(''))"
  },
  {
    question: "How does `None` behave in boolean contexts?",
    shortAnswer: "It evaluates to `False`.",
    explanation: "`bool(None)` returns `False`. So `if None:` will not execute.",
    hint: "Falsy value.",
    level: "basic",
    codeExample: "if None: print('won't run') else: print('runs')"
  },
  {
    question: "What does `print(None)` output?",
    shortAnswer: "It prints the string `'None'`.",
    explanation: "The `__str__` method of `None` returns the string `'None'`.",
    hint: "It's not empty.",
    level: "basic",
    codeExample: "print(None)  # None (as text)"
  },
  {
    question: "Can I use `None` in arithmetic operations?",
    shortAnswer: "No, it raises `TypeError`.",
    explanation: "`None + 5` is invalid because `None` does not support numeric operations.",
    hint: "Not a number.",
    level: "basic",
    codeExample: "# None + 1  # TypeError"
  },
  {
    question: "What is a sentinel value?",
    shortAnswer: "A special value (often `None`) used to indicate a special condition, like 'not found' or 'default'.",
    explanation: "`None` is frequently used as a sentinel because it's unique and unlikely to be a valid data value.",
    hint: "Marker for exceptional cases.",
    level: "intermediate",
    codeExample: "def find(lst, target): for i,val in enumerate(lst): if val==target: return i; return None"
  },
  {
    question: "Why should I avoid `if x == None`?",
    shortAnswer: "It works but `if x is None` is more idiomatic and slightly faster.",
    explanation: "`is` compares identity, which is correct for a singleton. `==` might be overridden by a custom class.",
    hint: "PEP 8 recommends `is` for `None`.",
    level: "intermediate",
    codeExample: "# Prefer: if x is None"
  },
  {
    question: "What is the result of `None or 5`?",
    shortAnswer: "`5` because `None` is falsy, so the `or` returns the second operand.",
    explanation: "Short‑circuit evaluation: `None or 5` evaluates to `5`.",
    hint: "Logical operators work with `None`.",
    level: "intermediate",
    codeExample: "x = None or 42; print(x)  # 42"
  },
  {
    question: "Can a function return `None` intentionally?",
    shortAnswer: "Yes, and it's a common pattern for functions that perform side effects or indicate failure.",
    explanation: "For example, a lookup function returns `None` when the item is not found.",
    hint: "Explicit `return None` signals intent.",
    level: "basic",
    codeExample: "def get(key): return cache.get(key)  # returns None if missing"
  },
  {
    question: "What is the difference between `return None` and `return`?",
    shortAnswer: "No functional difference, but `return None` is more explicit.",
    explanation: "PEP 8 suggests using `return` for early exits and `return None` at the end of a function for clarity.",
    hint: "Style preference.",
    level: "basic",
    codeExample: "def f(): return None  # explicit; def g(): return  # implicit None"
  },
  {
    question: "Can I store `None` in a list or dictionary?",
    shortAnswer: "Yes, `None` can be an element of any container.",
    explanation: "It's a regular Python object.",
    hint: "Useful for placeholders.",
    level: "basic",
    codeExample: "lst = [1, None, 3]; d = {'a': None}"
  },
  {
    question: "What is the `__bool__` method of `None`?",
    shortAnswer: "It returns `False`.",
    explanation: "`None.__bool__()` is defined to return `False`.",
    hint: "Makes `None` falsy.",
    level: "advanced",
    codeExample: "print(bool(None))  # False"
  },
  {
    question: "Is `None` greater than or less than numbers?",
    shortAnswer: "Comparing `None` with numbers raises `TypeError` in Python 3.",
    explanation: "`None < 5` is not allowed; you'll get a `TypeError`.",
    hint: "No ordering.",
    level: "intermediate",
    codeExample: "# None < 5  # TypeError"
  },
  {
    question: "How does `None` behave in JSON serialization?",
    shortAnswer: "It serializes to `null` in JSON.",
    explanation: "`json.dumps(None)` returns the string `'null'`.",
    hint: "Maps to JSON null.",
    level: "intermediate",
    codeExample: "import json; print(json.dumps(None))  # null"
  },
  {
    question: "Can I use `None` as a key in a dictionary?",
    shortAnswer: "Yes, `None` is hashable and can be a dict key.",
    explanation: "It's immutable and hashable, so it can be used as a key.",
    hint: "Works fine.",
    level: "intermediate",
    codeExample: "d = {None: 'empty value'}; print(d[None])"
  },
  {
    question: "What is the `__str__` method of `None`?",
    shortAnswer: "It returns the string `'None'`.",
    explanation: "When you `print(None)`, it calls `None.__str__()` which returns `'None'`.",
    hint: "Not an empty string.",
    level: "advanced",
    codeExample: "print(str(None))  # 'None'"
  },
  {
    question: "Can I create a new instance of `NoneType`?",
    shortAnswer: "No, `None` is a singleton; you cannot create another `None`.",
    explanation: "`NoneType` constructor is not available; `None` is the only instance.",
    hint: "Singleton pattern.",
    level: "advanced",
    codeExample: "# type(None)()  # TypeError"
  },
  {
    question: "What is the purpose of `None` in `__init__` methods?",
    shortAnswer: "It's often used as a default for optional attributes.",
    explanation: "`self.attribute = attribute` where `attribute=None` means the attribute is not set.",
    hint: "Optional initialization.",
    level: "intermediate",
    codeExample: "def __init__(self, name=None): self.name = name"
  },
  {
    question: "How does `None` interact with `isinstance`?",
    shortAnswer: "`isinstance(None, type(None))` is `True`; `isinstance(None, object)` is also `True`.",
    explanation: "`None` is an instance of `NoneType` and also of `object`.",
    hint: "Subclass of `object`.",
    level: "advanced",
    codeExample: "print(isinstance(None, object))  # True"
  },
  {
    question: "What is the performance cost of returning `None`?",
    shortAnswer: "Virtually none – it's just returning a reference to a singleton.",
    explanation: "`None` is pre‑created, so returning it is very cheap.",
    hint: "No allocation overhead.",
    level: "expert",
    codeExample: "Returning `None` is O(1)."
  },
  {
    question: "Can I use `None` in a `match` statement (Python 3.10+)?",
    shortAnswer: "Yes, `case None:` works as a pattern.",
    explanation: "You can match against `None` directly.",
    hint: "Useful for handling missing values.",
    level: "advanced",
    codeExample: "match value: case None: print('missing')"
  },
  {
    question: "Why does `' '.join(['a', None, 'c'])` fail?",
    shortAnswer: "Because `join` expects all elements to be strings; `None` is not a string.",
    explanation: "`None` cannot be concatenated with strings. Convert to string first.",
    hint: "Type error.",
    level: "intermediate",
    codeExample: "# ' '.join(['a', None, 'c'])  # TypeError"
  }
];

export default questions;