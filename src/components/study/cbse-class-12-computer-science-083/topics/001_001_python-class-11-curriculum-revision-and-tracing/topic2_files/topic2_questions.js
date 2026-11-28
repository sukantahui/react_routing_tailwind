// 25 Authentic CBSE Board Examination Questions for Topic 2
const questions = [
  {
    "id": 1,
    "question": "Which of the following data types is MUTABLE in Python?",
    "options": [
      "Tuple",
      "String",
      "List",
      "Integer"
    ],
    "correctAnswer": 2,
    "explanation": "Lists can be modified in-place using methods like append(), pop(), and subscript assignment.",
    "hint": "Can change contents in-place."
  },
  {
    "id": 2,
    "question": "What error is raised when executing `s = 'Python'; s[0] = 'J'`?",
    "options": [
      "ValueError",
      "TypeError: 'str' object does not support item assignment",
      "IndexError",
      "SyntaxError"
    ],
    "correctAnswer": 1,
    "explanation": "Strings are immutable, so item assignment raises TypeError.",
    "hint": "Immutable item assignment error."
  },
  {
    "id": 3,
    "question": "Which of the following is an IMMUTABLE sequence?",
    "options": [
      "list",
      "set",
      "tuple",
      "dict"
    ],
    "correctAnswer": 2,
    "explanation": "A tuple is an ordered, immutable sequence of elements.",
    "hint": "Parentheses sequence."
  },
  {
    "id": 4,
    "question": "What happens to the memory address (id) of a list when an element is appended?",
    "options": [
      "It changes to a new address",
      "It remains exactly the same",
      "It becomes None",
      "Raises MemoryError"
    ],
    "correctAnswer": 1,
    "explanation": "Lists are mutable; in-place operations modify the object without changing its memory ID.",
    "hint": "In-place modification."
  },
  {
    "id": 5,
    "question": "Which data type can be used as a dictionary KEY?",
    "options": [
      "list",
      "dict",
      "tuple (containing only immutable elements)",
      "set"
    ],
    "correctAnswer": 2,
    "explanation": "Dictionary keys must be hashable and immutable. Tuples containing only immutable items can serve as keys.",
    "hint": "Must be hashable."
  },
  {
    "id": 6,
    "question": "What is the boolean evaluation of an empty tuple `()`?",
    "options": [
      "True",
      "False",
      "None",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "All empty containers (strings '', lists [], tuples (), dicts {}) evaluate to False in boolean context.",
    "hint": "Empty sequence truthiness."
  },
  {
    "id": 7,
    "question": "What will `print(type(True))` display?",
    "options": [
      "<class 'bool'>",
      "<class 'int'>",
      "<class 'boolean'>",
      "<class 'str'>"
    ],
    "correctAnswer": 0,
    "explanation": "True belongs to `<class 'bool'>`, which is a subclass of int.",
    "hint": "Boolean class."
  },
  {
    "id": 8,
    "question": "What is the output of `isinstance(True, int)`?",
    "options": [
      "True",
      "False",
      "Error",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "In Python, `bool` is a subclass of `int`. `True` has numerical value 1, so `isinstance(True, int)` is True.",
    "hint": "bool inherits from int."
  },
  {
    "id": 9,
    "question": "Which module provides `copy()` and `deepcopy()` functions?",
    "options": [
      "sys",
      "os",
      "copy",
      "math"
    ],
    "correctAnswer": 2,
    "explanation": "The standard library module `copy` provides generic shallow and deep copy operations.",
    "hint": "Module named after copying."
  },
  {
    "id": 10,
    "question": "If `L1 = [1, [2, 3]]` and `L2 = L1[:]`, what type of copy is created?",
    "options": [
      "Deep copy",
      "Shallow copy",
      "Reference alias",
      "Immutable view"
    ],
    "correctAnswer": 1,
    "explanation": "Slicing `[:]` produces a shallow copy. The outer list is new, but the inner list `[2, 3]` is shared.",
    "hint": "Slicing copy nature."
  },
  {
    "id": 11,
    "question": "What will `t = (1, 2, [3, 4]); t[2].append(5); print(t)` output?",
    "options": [
      "TypeError",
      "(1, 2, [3, 4, 5])",
      "(1, 2, [3, 4])",
      "AttributeError"
    ],
    "correctAnswer": 1,
    "explanation": "The tuple `t` is immutable and its references cannot change, but the referenced list at index 2 is mutable and can be modified in-place.",
    "hint": "Tuple containing a mutable element."
  },
  {
    "id": 12,
    "question": "Which of the following types is NOT a sequence?",
    "options": [
      "str",
      "list",
      "dict",
      "tuple"
    ],
    "correctAnswer": 2,
    "explanation": "`dict` is a mapping type (key-value associations), not a sequence.",
    "hint": "Mapping vs Sequence."
  },
  {
    "id": 13,
    "question": "What is the result of `id(10) == id(10)`?",
    "options": [
      "True",
      "False",
      "Raises TypeError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Both expressions reference the same cached integer literal 10.",
    "hint": "Same object address."
  },
  {
    "id": 14,
    "question": "Can a set contain a list as one of its elements?",
    "options": [
      "Yes, sets accept all types",
      "No, lists are unhashable and raise TypeError",
      "Only if the list is empty",
      "Yes, if converted to string"
    ],
    "correctAnswer": 1,
    "explanation": "Set elements must be hashable. Lists are mutable and unhashable, raising `TypeError: unhashable type: 'list'`.",
    "hint": "Unhashable type error."
  },
  {
    "id": 15,
    "question": "What is the return type of the function `id()`?",
    "options": [
      "str",
      "int",
      "float",
      "hex"
    ],
    "correctAnswer": 1,
    "explanation": "`id()` returns an integer corresponding to the object's memory address.",
    "hint": "Memory address integer."
  },
  {
    "id": 16,
    "question": "Which method clears all elements of a list in-place?",
    "options": [
      "L.delete()",
      "L.clear()",
      "L.empty()",
      "L.remove()"
    ],
    "correctAnswer": 1,
    "explanation": "`L.clear()` removes all items from the list, mutating it to `[]`.",
    "hint": "In-place removal of all items."
  },
  {
    "id": 17,
    "question": "What will `a = 'hello'; b = 'hello'; print(a is b)` output?",
    "options": [
      "True",
      "False",
      "None",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Short ASCII string literals without spaces are interned by CPython, so `a` and `b` reference the same memory object.",
    "hint": "String interning."
  },
  {
    "id": 18,
    "question": "Which of the following creates an empty set?",
    "options": [
      "{}",
      "set()",
      "[]",
      "()"
    ],
    "correctAnswer": 1,
    "explanation": "`{}` creates an empty dictionary. `set()` is required to create an empty set.",
    "hint": "Empty set syntax."
  },
  {
    "id": 19,
    "question": "Is a floating point number mutable or immutable?",
    "options": [
      "Mutable",
      "Immutable",
      "Depends on precision",
      "Neither"
    ],
    "correctAnswer": 1,
    "explanation": "All numbers (int, float, complex) are immutable in Python.",
    "hint": "Number category immutability."
  },
  {
    "id": 20,
    "question": "What is the output of `x = 5; print(id(x) == id(x + 0))`?",
    "options": [
      "True",
      "False",
      "Error",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Adding 0 to 5 evaluates to 5, which resolves to the cached integer 5.",
    "hint": "Identity of cached integer."
  },
  {
    "id": 21,
    "question": "Which function converts a list to an immutable tuple?",
    "options": [
      "tuple(L)",
      "freeze(L)",
      "immutable(L)",
      "convert(L)"
    ],
    "correctAnswer": 0,
    "explanation": "`tuple(L)` creates a new tuple containing the elements of the list.",
    "hint": "Type constructor."
  },
  {
    "id": 22,
    "question": "What error occurs if you try to use a list as a dictionary key?",
    "options": [
      "KeyError",
      "TypeError: unhashable type: 'list'",
      "ValueError",
      "IndexError"
    ],
    "correctAnswer": 1,
    "explanation": "Dictionary keys require a `__hash__` method. Mutable collections do not implement hash, raising TypeError.",
    "hint": "Unhashable type."
  },
  {
    "id": 23,
    "question": "What will `x = [1, 2]; y = list(x); print(x is y)` print?",
    "options": [
      "True",
      "False",
      "Error",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "`list(x)` creates a brand-new copy of the list with a different memory address, so `x is y` is False.",
    "hint": "New list constructor allocation."
  },
  {
    "id": 24,
    "question": "What does `sys.getsizeof()` measure?",
    "options": [
      "Length of a string",
      "Memory size of an object in bytes",
      "Number of variables",
      "Hard disk space"
    ],
    "correctAnswer": 1,
    "explanation": "`sys.getsizeof()` returns the memory consumption of an object in bytes.",
    "hint": "Object memory footprint."
  },
  {
    "id": 25,
    "question": "Why is immutability beneficial in programming?",
    "options": [
      "Prevents accidental side-effects, enables thread-safety, and allows safe dictionary key hashing",
      "Makes code run slower",
      "Requires more RAM",
      "Eliminates variable assignment"
    ],
    "correctAnswer": 0,
    "explanation": "Immutable objects guarantee that their state cannot be unexpectedly mutated by other parts of the program.",
    "hint": "Integrity and hashing guarantees."
  }
];

export default questions;
