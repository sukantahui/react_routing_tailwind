// src/components/study/python/topics/003_001_object-oriented-python/topic12_files/topic12_questions.js
// Comprehensive Master Review Questions for Topic 12: Magic / Dunder Methods: __str__, __repr__, __len__, __eq__, __add__

const questions = [
  {
    question: "What are Magic / Dunder Methods in Python?",
    shortAnswer: "Special built-in methods surrounded by double underscores (e.g. __init__, __str__, __len__) that Python invokes behind the scenes to support core language syntax and operations.",
    explanation: "They define how custom objects interact with Python's Data Model.",
    hint: "Double-underscore methods defining Python Data Model behavior.",
    level: "basic",
    codeExample: "def __len__(self): return len(self._items)"
  },
  {
    question: "What is the key difference between '__str__' and '__repr__'?",
    shortAnswer: "'__str__' returns a readable, user-friendly string for print() and UI display; '__repr__' returns an unambiguous, technical string for developers and debuggers (ideally matching eval(repr(obj)) == obj).",
    explanation: "If __str__ is missing, Python falls back to __repr__ automatically.",
    hint: "__str__ is for end users; __repr__ is for developers and debuggers.",
    level: "basic",
    codeExample: "# __str__: 'Sourav (STU-101)'\n# __repr__: 'Student(id=101, name=\"Sourav\")'"
  },
  {
    question: "What happens if a class defines '__repr__' but does NOT define '__str__'?",
    shortAnswer: "Python automatically falls back to using '__repr__' for 'print()' and 'str()' calls.",
    explanation: "Best practice: Always implement __repr__ first on every custom class.",
    hint: "Python falls back to __repr__ when __str__ is not defined.",
    level: "basic",
    codeExample: "class A:\n    def __repr__(self): return 'A()'\nprint(A())  # Output: 'A()'"
  },
  {
    question: "What requirement must the return value of '__len__' satisfy?",
    shortAnswer: "It must return a non-negative integer (>= 0); returning floats, negative numbers, or non-integers raises a TypeError or ValueError.",
    explanation: "Enforced by Python's C core.",
    hint: "Must return a non-negative integer (>= 0).",
    level: "basic",
    codeExample: "def __len__(self):\n    return len(self._data)"
  },
  {
    question: "What magic methods enable square-bracket indexing (obj[key]) and slicing (obj[1:3])?",
    shortAnswer: "'__getitem__(self, key)' for reading, '__setitem__(self, key, value)' for writing, and '__delitem__(self, key)' for deleting.",
    explanation: "Key can be an integer, string, or slice object.",
    hint: "__getitem__, __setitem__, and __delitem__.",
    level: "basic",
    codeExample: "def __getitem__(self, idx):\n    return self._items[idx]"
  },
  {
    question: "What magic method powers the 'in' membership testing operator ('item in obj')?",
    shortAnswer: "The '__contains__(self, item)' method, which must return True or False.",
    explanation: "If __contains__ is omitted, Python falls back to iterating with __iter__ or __getitem__.",
    hint: "The __contains__ magic method.",
    level: "basic",
    codeExample: "def __contains__(self, query):\n    return query in self._data"
  },
  {
    question: "What does the '__call__' magic method do?",
    shortAnswer: "Allows an object instance to be invoked directly like a standard function (e.g. my_obj(arg1, arg2)), creating stateful Function Objects or Functors.",
    explanation: "Used extensively in decorators, pricing calculators, and neural network layers (PyTorch nn.Module).",
    hint: "Makes object instances callable like functions: obj().",
    level: "moderate",
    codeExample: "class Multiplier:\n    def __init__(self, f): self.f = f\n    def __call__(self, x): return x * self.f"
  },
  {
    question: "What is the relationship between '__eq__' and '__hash__'?",
    shortAnswer: "If two objects compare equal via '__eq__', they MUST return the exact same integer from '__hash__'; if a mutable class overrides '__eq__', Python automatically sets '__hash__ = None' to prevent set/dict corruption.",
    explanation: "Guarantees dictionary bucket lookup correctness.",
    hint: "Equal objects must have identical hash values; mutable objects with __eq__ are unhashable by default.",
    level: "complex",
    codeExample: "def __hash__(self):\n    return hash((self.id, self.name))"
  },
  {
    question: "What does the '@functools.total_ordering' decorator do?",
    shortAnswer: "Given a class defining '__eq__' and at least one rich comparison dunder (__lt__, __le__, __gt__, or __ge__), it automatically generates all remaining comparison methods.",
    explanation: "Eliminates repetitive boilerplate comparison methods.",
    hint: "Auto-generates all comparison operators from __eq__ and one ordering method.",
    level: "moderate",
    codeExample: "from functools import total_ordering\n@total_ordering\nclass Box: ..."
  },
  {
    question: "What is the difference between '__add__', '__radd__', and '__iadd__'?",
    shortAnswer: "'__add__' handles left-addition (a + b); '__radd__' handles reflected right-addition (b + a when b does not implement __add__); '__iadd__' handles in-place addition (a += b).",
    explanation: "Provides complete control over arithmetic operations.",
    hint: "__add__ = left, __radd__ = reflected right, __iadd__ = in-place +=.",
    level: "moderate",
    codeExample: "# a + b -> a.__add__(b)\n# 5 + a -> a.__radd__(5)\n# a += b -> a.__iadd__(b)"
  },
  {
    question: "What magic method powers iteration in 'for item in obj:' loops?",
    shortAnswer: "The '__iter__(self)' method, which must return an iterator object.",
    explanation: "If missing, Python attempts legacy indexing via __getitem__ starting at 0.",
    hint: "The __iter__ magic method.",
    level: "basic",
    codeExample: "def __iter__(self):\n    return iter(self._items)"
  },
  {
    question: "What is the '__bool__' magic method used for?",
    shortAnswer: "Determines the truth value of an object in 'if obj:' statements (returns True or False); if omitted, Python checks if '__len__() > 0'.",
    explanation: "Controls dynamic truthiness evaluation.",
    hint: "Controls boolean truth value in if conditions.",
    level: "basic",
    codeExample: "def __bool__(self):\n    return self.is_active"
  },
  {
    question: "What magic methods manage Context Managers ('with' statements)?",
    shortAnswer: "'__enter__(self)' to acquire resources and '__exit__(self, exc_type, exc_val, exc_tb)' to release resources and handle errors.",
    explanation: "Guarantees reliable resource cleanup.",
    hint: "__enter__ and __exit__.",
    level: "basic",
    codeExample: "def __enter__(self): return self\ndef __exit__(self, *exc): self.close()"
  },
  {
    question: "Why should you never invent your own arbitrary dunder names like '__my_custom_method__'?",
    shortAnswer: "Because Python reserves all double-underscore names for future language expansion; inventing your own risks collisions with future Python keywords or built-ins.",
    explanation: "Use regular descriptive names for custom methods.",
    hint: "Python reserves all dunder names for language standards.",
    level: "basic",
    codeExample: "# Do NOT create custom __my_dunder__ names"
  },
  {
    question: "What magic method is called when an attribute is NOT found on an object?",
    shortAnswer: "'__getattr__(self, name)' is called as a fallback when normal attribute lookup fails.",
    explanation: "Contrasts with '__getattribute__' which intercepts EVERY attribute access.",
    hint: "__getattr__ is called only when an attribute lookup fails.",
    level: "complex",
    codeExample: "def __getattr__(self, name):\n    return f'Dynamic: {name}'"
  },
  {
    question: "What is the difference between '__getattr__' and '__getattribute__'?",
    shortAnswer: "'__getattribute__' is called unconditionally for every attribute access; '__getattr__' is called only if the attribute was not found in the instance or class __dict__.",
    explanation: "Overriding __getattribute__ requires extreme care to avoid infinite recursion.",
    hint: "__getattribute__ intercepts everything; __getattr__ is a fallback.",
    level: "complex",
    codeExample: "# __getattribute__ -> unconditional\n# __getattr__ -> fallback"
  },
  {
    question: "How do you implement string format specifications for 'f\"{obj:fmt}\"' or 'format(obj, fmt)'?",
    shortAnswer: "By implementing the '__format__(self, format_spec)' magic method.",
    explanation: "Allows domain objects to support custom formatting codes (e.g. f'{money:inr}').",
    hint: "Implement the __format__ magic method.",
    level: "moderate",
    codeExample: "def __format__(self, spec):\n    return f'₹{self.amount:,.2f}' if spec == 'inr' else str(self.amount)"
  },
  {
    question: "What magic method is invoked by 'reversed(obj)'?",
    shortAnswer: "The '__reversed__(self)' method.",
    explanation: "Allows custom containers to yield elements in reverse order efficiently.",
    hint: "The __reversed__ magic method.",
    level: "basic",
    codeExample: "def __reversed__(self):\n    return reversed(self._items)"
  },
  {
    question: "Can magic methods be dynamically assigned directly to an instance (e.g. obj.__len__ = lambda: 5)?",
    shortAnswer: "No. Python resolves magic methods on the Class object (type(obj)), bypassing the instance dictionary for performance reasons.",
    explanation: "A key CPython optimization rule for dunder dispatch.",
    hint: "No, Python looks up magic methods on the Class, not the instance dict.",
    level: "complex",
    codeExample: "# Assigning obj.__len__ on an instance is ignored by len(obj)"
  },
  {
    question: "What magic method is called when an object is deleted or garbage-collected?",
    shortAnswer: "The '__del__(self)' finalizer method.",
    explanation: "Called when the object's reference count drops to zero.",
    hint: "The __del__ finalizer method.",
    level: "moderate",
    codeExample: "def __del__(self):\n    print('Object destroyed')"
  },
  {
    question: "How do you make a class support bitwise operations (e.g. |, &, ^)?",
    shortAnswer: "By implementing '__or__', '__and__', and '__xor__' magic methods.",
    explanation: "Used extensively in permission masks, flag enums, and pandas/SQLAlchemy queries.",
    hint: "Implement __or__, __and__, and __xor__.",
    level: "moderate",
    codeExample: "def __or__(self, other): return PermissionSet(self.flags | other.flags)"
  },
  {
    question: "What magic method enables copying behavior for 'copy.copy(obj)' and 'copy.deepcopy(obj)'?",
    shortAnswer: "'__copy__(self)' and '__deepcopy__(self, memo)' methods.",
    explanation: "Provides custom shallow and deep cloning logic.",
    hint: "__copy__ and __deepcopy__.",
    level: "moderate",
    codeExample: "def __copy__(self): return MyClass(self.data)"
  },
  {
    question: "What is the Python Data Model / Object Protocol?",
    shortAnswer: "The formal API and set of magic methods that allows user-defined classes to hook into Python's native operators, syntax, built-ins, and iteration mechanics.",
    explanation: "Transforms custom objects into first-class citizens in the Python ecosystem.",
    hint: "The formal API defining how objects interact with Python syntax and operators.",
    level: "basic",
    codeExample: "# Implementing dunders makes classes first-class Python objects"
  },
  {
    question: "Why should '__repr__' always be implemented on domain models?",
    shortAnswer: "Because it provides clear, unambiguous diagnostics in logs, debuggers, error tracebacks, and interactive shells, drastically reducing debugging time.",
    explanation: "A fundamental hallmark of professional Python engineering.",
    hint: "Provides clear diagnostic strings in debuggers, logs, and tracebacks.",
    level: "basic",
    codeExample: "# Crucial for logging and debugging: def __repr__(self):"
  },
  {
    question: "What is the golden rule for implementing Magic / Dunder methods?",
    shortAnswer: "Implement dunder methods only when they naturalize domain syntax (e.g. len(), +, indexing), keep their behavior intuitive and expected, and always implement __repr__ as the baseline foundation.",
    explanation: "Makes domain objects feel like native built-in Python data structures.",
    hint: "Naturalize syntax, keep behavior intuitive, and always provide __repr__.",
    level: "basic",
    codeExample: "# Clean, intuitive, Pythonic Data Model integration"
  }
];

export default questions;
