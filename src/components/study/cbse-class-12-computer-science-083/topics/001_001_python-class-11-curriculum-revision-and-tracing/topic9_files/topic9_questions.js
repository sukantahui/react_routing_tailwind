// 25 Authentic CBSE Board Examination Questions for Topic 9
const questions = [
  {
    "id": 1,
    "question": "Which of the following can be used as a dictionary KEY?",
    "options": [
      "['name']",
      "{'id': 1}",
      "('roll', 101)",
      "{1, 2}"
    ],
    "correctAnswer": 2,
    "explanation": "Dictionary keys must be immutable and hashable. Tuples containing immutable objects are hashable.",
    "hint": "Must be hashable."
  },
  {
    "id": 2,
    "question": "What error occurs if you access a missing key using `d['nonexistent']`?",
    "options": [
      "IndexError",
      "KeyError",
      "ValueError",
      "TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "Direct subscript lookup on a non-existent key raises `KeyError`.",
    "hint": "Key lookup failure."
  },
  {
    "id": 3,
    "question": "How does `d.get('missing', 'Default')` handle a missing key?",
    "options": [
      "Raises KeyError",
      "Returns 'Default' without raising an error",
      "Inserts 'missing' into the dictionary",
      "Returns None always"
    ],
    "correctAnswer": 1,
    "explanation": "`get()` safely returns the fallback default value when the key is not present.",
    "hint": "Safe lookup with default."
  },
  {
    "id": 4,
    "question": "What will `d = {'a': 1, 'b': 2, 'a': 3}; print(d['a'])` output?",
    "options": [
      "1",
      "3",
      "SyntaxError",
      "[1, 3]"
    ],
    "correctAnswer": 1,
    "explanation": "Dictionary keys must be unique. If a duplicate key is assigned, the latter value (3) overwrites the earlier one.",
    "hint": "Duplicate key overwriting."
  },
  {
    "id": 5,
    "question": "What does `d.popitem()` do in Python 3.7+?",
    "options": [
      "Removes and returns a random element",
      "Removes and returns the LAST inserted (key, value) pair",
      "Removes the first inserted item",
      "Clears the dictionary"
    ],
    "correctAnswer": 1,
    "explanation": "In modern Python, `popitem()` operates in LIFO order, removing and returning the last inserted item as a tuple.",
    "hint": "LIFO item removal."
  },
  {
    "id": 6,
    "question": "What is the output of `len({'a': 1, 'b': 2, 'c': 3})`?",
    "options": [
      "3",
      "6",
      "1",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`len()` on a dictionary returns the total number of key-value pairs (3).",
    "hint": "Key-value pair count."
  },
  {
    "id": 7,
    "question": "What does `d.keys()` return?",
    "options": [
      "A list of keys",
      "A dict_keys view object",
      "A tuple of keys",
      "A set of keys"
    ],
    "correctAnswer": 1,
    "explanation": "`d.keys()` returns a dynamic view object of keys (`dict_keys`).",
    "hint": "View object."
  },
  {
    "id": 8,
    "question": "What is the output of `d = {}; d[1] = 'A'; d[1.0] = 'B'; print(len(d))`?",
    "options": [
      "2",
      "1",
      "Error",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "In Python, `1 == 1.0` and `hash(1) == hash(1.0)`. Thus `1.0` is treated as the SAME key, overwriting 'A' with 'B', leaving length 1.",
    "hint": "Numeric equivalence of 1 and 1.0."
  },
  {
    "id": 9,
    "question": "Which method merges another dictionary `d2` into dictionary `d1`?",
    "options": [
      "d1.append(d2)",
      "d1.extend(d2)",
      "d1.update(d2)",
      "d1.merge(d2)"
    ],
    "correctAnswer": 2,
    "explanation": "`d1.update(d2)` inserts or overwrites keys from `d2` into `d1`.",
    "hint": "Update method."
  },
  {
    "id": 10,
    "question": "What will `d = {'x': 10}; print('x' in d)` evaluate to?",
    "options": [
      "True",
      "False",
      "10",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "The membership operator `in` checks for presence among dictionary KEYS.",
    "hint": "Checks keys by default."
  },
  {
    "id": 11,
    "question": "How do you test if a VALUE exists in a dictionary `d`?",
    "options": [
      "val in d",
      "val in d.values()",
      "d.has_value(val)",
      "val in d.keys()"
    ],
    "correctAnswer": 1,
    "explanation": "To test for a value, search explicitly within `d.values()`.",
    "hint": "Search in values view."
  },
  {
    "id": 12,
    "question": "What will `d = {'a': 1, 'b': 2}; del d['a']; print(d)` output?",
    "options": [
      "{'b': 2}",
      "{'a': 1}",
      "{}",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`del d['a']` removes key 'a' and its associated value, leaving `{'b': 2}`.",
    "hint": "del statement on key."
  },
  {
    "id": 13,
    "question": "What is the output of `dict.fromkeys(['a', 'b'], 0)`?",
    "options": [
      "{'a': 0, 'b': 0}",
      "['a', 'b', 0]",
      "{0: 'a', 0: 'b'}",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`fromkeys(seq, value)` initializes a new dictionary with keys from `seq` mapped to `value`.",
    "hint": "Dictionary factory method."
  },
  {
    "id": 14,
    "question": "What does `d.clear()` do?",
    "options": [
      "Removes all key-value pairs in-place, resulting in {}",
      "Deletes the dictionary reference",
      "Sets values to 0",
      "Raises KeyError"
    ],
    "correctAnswer": 0,
    "explanation": "`clear()` removes all items from the dictionary in-place.",
    "hint": "Empties dictionary."
  },
  {
    "id": 15,
    "question": "What will `print({} == set())` evaluate to?",
    "options": [
      "True",
      "False",
      "Error",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "`{}` is an empty dictionary (`dict`), whereas `set()` is an empty `set`. Different types compare False.",
    "hint": "dict vs set."
  },
  {
    "id": 16,
    "question": "What is the return value of `d.pop('k')` when 'k' exists?",
    "options": [
      "The value associated with 'k'",
      "The key 'k'",
      "True",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`pop(key)` removes the key and returns its corresponding value.",
    "hint": "Returns value."
  },
  {
    "id": 17,
    "question": "Can a dictionary contain another dictionary as a value?",
    "options": [
      "Yes, creating a nested dictionary",
      "No, dictionaries cannot be nested",
      "Only up to 2 levels",
      "Only if keys are strings"
    ],
    "correctAnswer": 0,
    "explanation": "Dictionary values can be of any type, including other dictionaries.",
    "hint": "Nested dictionaries."
  },
  {
    "id": 18,
    "question": "What is the result of `list({'a': 1, 'b': 2})`?",
    "options": [
      "['a', 'b']",
      "[1, 2]",
      "[('a', 1), ('b', 2)]",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Passing a dictionary to `list()` extracts its keys by default: `['a', 'b']`.",
    "hint": "List of keys."
  },
  {
    "id": 19,
    "question": "What is the output of: `d = {1: 'One', 2: 'Two'}; print(d.setdefault(3, 'Three'))`?",
    "options": [
      "'Three'",
      "None",
      "KeyError",
      "{1: 'One', 2: 'Two', 3: 'Three'}"
    ],
    "correctAnswer": 0,
    "explanation": "`setdefault(k, d)` returns the value if `k` exists; otherwise inserts `k` with default value and returns it.",
    "hint": "setdefault behavior."
  },
  {
    "id": 20,
    "question": "What will `for x in {'a': 1, 'b': 2}: print(x, end=' ')` print?",
    "options": [
      "a b ",
      "1 2 ",
      "('a', 1) ('b', 2) ",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Iterating directly over a dictionary iterates through its KEYS.",
    "hint": "Default iteration over keys."
  },
  {
    "id": 21,
    "question": "What is the output of: `d = {'x': 10}; d.update({'y': 20, 'x': 30}); print(d)`?",
    "options": [
      "{'x': 30, 'y': 20}",
      "{'x': 10, 'y': 20}",
      "{'x': 30}",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`update()` overwrites existing key 'x' with 30 and adds new key 'y': 20.",
    "hint": "Update overwrites existing."
  },
  {
    "id": 22,
    "question": "What is the time complexity of dictionary key lookup on average in Python?",
    "options": [
      "O(1) Constant Time",
      "O(N) Linear Time",
      "O(log N)",
      "O(N^2)"
    ],
    "correctAnswer": 0,
    "explanation": "Python dictionaries use a hash table implementation with open addressing, yielding O(1) average lookup.",
    "hint": "Hash table constant time."
  },
  {
    "id": 23,
    "question": "What will `d = {'m': 50}; print(d.get('n'))` output?",
    "options": [
      "None",
      "KeyError",
      "0",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "When the key is missing and no default is provided, `get()` returns `None`.",
    "hint": "Default None."
  },
  {
    "id": 24,
    "question": "What does `d = {x: x**3 for x in range(3)}` produce?",
    "options": [
      "{0: 0, 1: 1, 2: 8}",
      "{1: 1, 2: 8, 3: 27}",
      "[0, 1, 8]",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Dictionary comprehension mapping numbers 0, 1, 2 to their cubes: `{0: 0, 1: 1, 2: 8}`.",
    "hint": "Dictionary comprehension."
  },
  {
    "id": 25,
    "question": "In CBSE board coding, why is `freq[char] = freq.get(char, 0) + 1` preferred over `if char in freq:`?",
    "options": [
      "It is more concise, idiomatic, and executes in a single dictionary lookup",
      "It uses less memory",
      "It runs 10x faster",
      "It avoids creating keys"
    ],
    "correctAnswer": 0,
    "explanation": "The `.get(k, 0) + 1` idiom avoids redundant branch logic and handles both initialization and incrementing in one line.",
    "hint": "Idiomatic frequency accumulator."
  }
];

export default questions;
