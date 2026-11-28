// 25 Authentic CBSE Board Examination Questions for Topic 8
const questions = [
  {
    "id": 1,
    "question": "What is the data type of `x = (10)` in Python?",
    "options": [
      "<class 'tuple'>",
      "<class 'int'>",
      "<class 'list'>",
      "<class 'set'>"
    ],
    "correctAnswer": 1,
    "explanation": "Without a trailing comma, parentheses are evaluated as grouping operators around the integer 10, resulting in `<class 'int'>`.",
    "hint": "Parentheses as grouping operator."
  },
  {
    "id": 2,
    "question": "Which syntax correctly constructs a single-element tuple containing 10?",
    "options": [
      "(10)",
      "(10,)",
      "tuple(10)",
      "[10,]"
    ],
    "correctAnswer": 1,
    "explanation": "A single-element tuple must include a trailing comma `(10,)`.",
    "hint": "Trailing comma requirement."
  },
  {
    "id": 3,
    "question": "What methods are available on Python tuple objects?",
    "options": [
      "append() and pop()",
      "count() and index()",
      "sort() and reverse()",
      "insert() and remove()"
    ],
    "correctAnswer": 1,
    "explanation": "Because tuples are immutable, they only support two non-mutating search methods: `count()` and `index()`.",
    "hint": "Only two non-mutating methods."
  },
  {
    "id": 4,
    "question": "What error occurs if you run `t = (1, 2, 3); t[0] = 100`?",
    "options": [
      "ValueError",
      "TypeError: 'tuple' object does not support item assignment",
      "IndexError",
      "AttributeError"
    ],
    "correctAnswer": 1,
    "explanation": "Tuples are immutable; item assignment raises TypeError.",
    "hint": "Item assignment error on immutable object."
  },
  {
    "id": 5,
    "question": "What will `a, b, c = (10, 20, 30); print(b)` output?",
    "options": [
      "10",
      "20",
      "30",
      "(10, 20, 30)"
    ],
    "correctAnswer": 1,
    "explanation": "Tuple unpacking binds variables positionally: a=10, b=20, c=30.",
    "hint": "Positional unpacking."
  },
  {
    "id": 6,
    "question": "What error occurs if you write `x, y = (1, 2, 3)`?",
    "options": [
      "TypeError",
      "ValueError: too many values to unpack (expected 2)",
      "IndexError",
      "SyntaxError"
    ],
    "correctAnswer": 1,
    "explanation": "Unpacking requires the number of l-values to match the number of sequence items; mismatch raises ValueError.",
    "hint": "Unpacking count mismatch."
  },
  {
    "id": 7,
    "question": "What will `print((1, 2) + (3, 4))` output?",
    "options": [
      "(4, 6)",
      "(1, 2, 3, 4)",
      "((1, 2), (3, 4))",
      "TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "The `+` operator concatenates two tuples into a new tuple `(1, 2, 3, 4)`.",
    "hint": "Tuple concatenation."
  },
  {
    "id": 8,
    "question": "What will `print((1, 2) * 3)` output?",
    "options": [
      "(3, 6)",
      "(1, 2, 1, 2, 1, 2)",
      "((1, 2), (1, 2), (1, 2))",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "Multiplying a tuple by an integer repeats its elements.",
    "hint": "Tuple repetition."
  },
  {
    "id": 9,
    "question": "What will `t = (1, 2, [3, 4]); t[2].append(5); print(t)` produce?",
    "options": [
      "TypeError",
      "(1, 2, [3, 4, 5])",
      "(1, 2, [3, 4])",
      "SyntaxError"
    ],
    "correctAnswer": 1,
    "explanation": "The tuple's reference to the list at index 2 does not change; the inner list is mutated in-place.",
    "hint": "Mutable element inside immutable tuple."
  },
  {
    "id": 10,
    "question": "Can a tuple containing a list `(1, [2, 3])` be used as a dictionary key?",
    "options": [
      "Yes, because it is a tuple",
      "No, because it contains an unhashable mutable object (list)",
      "Only if the list has length 1",
      "Yes, in Python 3"
    ],
    "correctAnswer": 1,
    "explanation": "A tuple is only hashable if ALL its nested elements are also hashable. Containing a list raises `TypeError: unhashable type: 'list'`.",
    "hint": "Recursive hashability requirement."
  },
  {
    "id": 11,
    "question": "What is tuple packing?",
    "options": [
      "Compressing a tuple to zip format",
      "Combining multiple values into a single tuple without parentheses (e.g. t = 1, 2, 3)",
      "Converting a list to tuple",
      "Deleting a tuple"
    ],
    "correctAnswer": 1,
    "explanation": "Tuple packing occurs when values separated by commas are packaged into a tuple.",
    "hint": "Packing values into a tuple."
  },
  {
    "id": 12,
    "question": "What will `first, *rest = (10, 20, 30, 40)` bind to `rest`?",
    "options": [
      "(20, 30, 40)",
      "[20, 30, 40]",
      "40",
      "20"
    ],
    "correctAnswer": 1,
    "explanation": "Extended unpacking with `*` collects remaining items into a standard Python `list`: `[20, 30, 40]`.",
    "hint": "Starred target type is list."
  },
  {
    "id": 13,
    "question": "What is the output of `(1, 2, 3).count(4)`?",
    "options": [
      "0",
      "-1",
      "False",
      "ValueError"
    ],
    "correctAnswer": 0,
    "explanation": "`count()` returns 0 if the element is not found.",
    "hint": "Count missing element."
  },
  {
    "id": 14,
    "question": "What happens if `(1, 2, 3).index(4)` is called?",
    "options": [
      "Returns -1",
      "Returns 0",
      "Raises ValueError: tuple.index(x): x not in tuple",
      "Returns None"
    ],
    "correctAnswer": 2,
    "explanation": "`tuple.index()` raises `ValueError` if the value is absent.",
    "hint": "Index missing element error."
  },
  {
    "id": 15,
    "question": "What is the output of `len((10, 20, (30, 40)))`?",
    "options": [
      "4",
      "3",
      "2",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "The tuple has 3 elements: 10, 20, and the nested tuple `(30, 40)`.",
    "hint": "Top-level element count."
  },
  {
    "id": 16,
    "question": "What will `min(('cat', 'dog', 'apple'))` return?",
    "options": [
      "'cat'",
      "'apple'",
      "'dog'",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "'apple' has the smallest lexicographical ASCII value (starts with 'a').",
    "hint": "Alphabetical minimum."
  },
  {
    "id": 17,
    "question": "Which function converts a string `'CBSE'` into a tuple of characters?",
    "options": [
      "tuple('CBSE')",
      "to_tuple('CBSE')",
      "split('CBSE')",
      "freeze('CBSE')"
    ],
    "correctAnswer": 0,
    "explanation": "`tuple('CBSE')` returns `('C', 'B', 'S', 'E')`.",
    "hint": "Built-in tuple constructor."
  },
  {
    "id": 18,
    "question": "What is the output of `tuple()`?",
    "options": [
      "()",
      "None",
      "[]",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`tuple()` with no arguments creates an empty tuple `()`.",
    "hint": "Empty tuple."
  },
  {
    "id": 19,
    "question": "Why are tuples preferred over lists for fixed collections?",
    "options": [
      "Tuples require slightly less memory and protect data against accidental modification",
      "Tuples can store more data types",
      "Tuples run 100x faster",
      "Lists cannot be nested"
    ],
    "correctAnswer": 0,
    "explanation": "Tuples provide data integrity (write-protection), memory efficiency, and hashability.",
    "hint": "Read-only integrity & memory compactness."
  },
  {
    "id": 20,
    "question": "What does `del t[0]` do on tuple `t = (1, 2, 3)`?",
    "options": [
      "Deletes 1",
      "Raises TypeError: 'tuple' object doesn't support item deletion",
      "Sets t[0] = None",
      "Deletes the tuple"
    ],
    "correctAnswer": 1,
    "explanation": "Tuples do not support item deletion; it raises `TypeError`.",
    "hint": "Immutability prevents item deletion."
  },
  {
    "id": 21,
    "question": "Can the entire tuple variable be deleted using `del t`?",
    "options": [
      "Yes, del removes the variable name from namespace",
      "No, tuples cannot be deleted",
      "Only if tuple is empty",
      "Raises TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "`del t` deletes the variable reference itself, which is completely valid.",
    "hint": "Deleting variable binding."
  },
  {
    "id": 22,
    "question": "What is the output of `(1, 2, 3) == [1, 2, 3]`?",
    "options": [
      "True",
      "False",
      "TypeError",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "Sequences of different data types (tuple vs list) compare unequal in Python, yielding False.",
    "hint": "Cross-type equality."
  },
  {
    "id": 23,
    "question": "What will `t = (5,); print(t * 3)` output?",
    "options": [
      "(15,)",
      "(5, 5, 5)",
      "15",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "Repeating a 1-element tuple 3 times produces `(5, 5, 5)`.",
    "hint": "Singleton repetition."
  },
  {
    "id": 24,
    "question": "What is the output of `(10, 20)[::-1]`?",
    "options": [
      "(20, 10)",
      "[20, 10]",
      "(10, 20)",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Slicing a tuple returns a new tuple. Step -1 reverses it: `(20, 10)`.",
    "hint": "Tuple slice reversal."
  },
  {
    "id": 25,
    "question": "In CBSE board marking, why does `x = (5)` not create a tuple?",
    "options": [
      "It creates an int because parentheses are treated as an arithmetic operator unless followed by a comma",
      "Because 5 is not in quotes",
      "Because tuple keyword was not used",
      "Because tuples need at least 2 items"
    ],
    "correctAnswer": 0,
    "explanation": "Parentheses alone are treated as standard expression precedence grouping. A trailing comma is required to disambiguate.",
    "hint": "Disambiguating comma."
  }
];

export default questions;
