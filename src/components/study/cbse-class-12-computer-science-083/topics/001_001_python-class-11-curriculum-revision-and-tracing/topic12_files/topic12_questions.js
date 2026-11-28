// 25 Authentic CBSE Board Examination Questions for Topic 12
const questions = [
  {
    "id": 1,
    "question": "Which of the following is a valid Python identifier?",
    "options": [
      "2nd_rank",
      "for",
      "_totalMarks",
      "score$"
    ],
    "correctAnswer": 2,
    "explanation": "`_totalMarks` begins with an underscore and contains only alphanumeric characters. `2nd_rank` starts with a digit, `for` is a keyword, and `$` is illegal.",
    "hint": "Valid identifier rules."
  },
  {
    "id": 2,
    "question": "What is the output of `2 ** 3 ** 2`?",
    "options": [
      "64",
      "512",
      "36",
      "18"
    ],
    "correctAnswer": 1,
    "explanation": "Right-to-left associativity: `2 ** (3 ** 2) = 2 ** 9 = 512`.",
    "hint": "Exponentiation associativity."
  },
  {
    "id": 3,
    "question": "What is the result of `-9 // 2` in Python?",
    "options": [
      "-4",
      "-5",
      "-4.5",
      "4"
    ],
    "correctAnswer": 1,
    "explanation": "Floor division rounds down towards negative infinity: `-4.5` rounds down to `-5`.",
    "hint": "Floor rounding down."
  },
  {
    "id": 4,
    "question": "Which of the following data types is MUTABLE?",
    "options": [
      "tuple",
      "string",
      "list",
      "integer"
    ],
    "correctAnswer": 2,
    "explanation": "Lists can be modified in-place using methods like append, pop, and index assignments.",
    "hint": "Mutable sequence."
  },
  {
    "id": 5,
    "question": "What does `'Python'[::-1]` evaluate to?",
    "options": [
      "'nohtyP'",
      "'Python'",
      "'P'",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Step -1 slices the string in reverse order: 'nohtyP'.",
    "hint": "Reversed string."
  },
  {
    "id": 6,
    "question": "What is the return value of `L.sort()`?",
    "options": [
      "None",
      "The sorted list",
      "True",
      "A new list"
    ],
    "correctAnswer": 0,
    "explanation": "`list.sort()` is an in-place mutating method that always returns `None`.",
    "hint": "In-place method return value."
  },
  {
    "id": 7,
    "question": "What type of error is raised by `a + b = 25`?",
    "options": [
      "SyntaxError: cannot assign to expression",
      "TypeError",
      "ValueError",
      "NameError"
    ],
    "correctAnswer": 0,
    "explanation": "The left side of an assignment must be a valid l-value, not an arithmetic expression.",
    "hint": "Invalid l-value error."
  },
  {
    "id": 8,
    "question": "What will `(10)` vs `(10,)` evaluate to in Python?",
    "options": [
      "int and tuple",
      "tuple and int",
      "both tuples",
      "both ints"
    ],
    "correctAnswer": 0,
    "explanation": "`(10)` evaluates as an integer; `(10,)` with a trailing comma evaluates as a singleton tuple.",
    "hint": "Trailing comma for tuples."
  },
  {
    "id": 9,
    "question": "What is the output of `list(range(5, 0, -2))`?",
    "options": [
      "[5, 3, 1]",
      "[5, 4, 3, 2, 1]",
      "[5, 3]",
      "[0, 2, 4]"
    ],
    "correctAnswer": 0,
    "explanation": "Starts at 5, stops at 0 (exclusive), stepping by -2: 5, 3, 1.",
    "hint": "Negative step range."
  },
  {
    "id": 10,
    "question": "When does a loop's `else` block execute in Python?",
    "options": [
      "When the loop finishes normally without encountering a `break`",
      "Only when an error occurs",
      "Every time an iteration finishes",
      "When break executes"
    ],
    "correctAnswer": 0,
    "explanation": "A loop's `else` block executes only upon normal termination without encountering a `break`.",
    "hint": "Loop-else trigger."
  },
  {
    "id": 11,
    "question": "What does `d.get('key', 100)` return if 'key' is not in dictionary `d`?",
    "options": [
      "100",
      "None",
      "KeyError",
      "0"
    ],
    "correctAnswer": 0,
    "explanation": "`get()` safely returns the provided fallback default value (100) when the key is missing.",
    "hint": "Safe get fallback."
  },
  {
    "id": 12,
    "question": "What will `'hello world'.title()` return?",
    "options": [
      "'Hello World'",
      "'Hello world'",
      "'HELLO WORLD'",
      "'hello world'"
    ],
    "correctAnswer": 0,
    "explanation": "`title()` capitalizes the first character of each word: 'Hello World'.",
    "hint": "Title case."
  },
  {
    "id": 13,
    "question": "What is the output of `0 and 'Code'`?",
    "options": [
      "0",
      "'Code'",
      "False",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`and` halts at the first falsy operand (0) and returns it.",
    "hint": "Short-circuit and."
  },
  {
    "id": 14,
    "question": "What is the output of `0 or 'Code'`?",
    "options": [
      "'Code'",
      "0",
      "True",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "`or` halts at the first truthy operand, returning `'Code'`.",
    "hint": "Short-circuit or."
  },
  {
    "id": 15,
    "question": "What error occurs if you try to use a list as a dictionary key?",
    "options": [
      "TypeError: unhashable type: 'list'",
      "KeyError",
      "ValueError",
      "IndexError"
    ],
    "correctAnswer": 0,
    "explanation": "Dictionary keys must be hashable; mutable lists do not implement hash, raising TypeError.",
    "hint": "Unhashable key error."
  },
  {
    "id": 16,
    "question": "What does `s.find('Z')` return if 'Z' is not in string `s`?",
    "options": [
      "-1",
      "False",
      "ValueError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`str.find()` returns -1 when the substring is not found.",
    "hint": "Find failure return value."
  },
  {
    "id": 17,
    "question": "What is the output of `[x for x in [1, 2, 3, 4] if x % 2 == 0]`?",
    "options": [
      "[2, 4]",
      "[1, 3]",
      "[1, 2, 3, 4]",
      "[]"
    ],
    "correctAnswer": 0,
    "explanation": "The list comprehension filters for even integers: `[2, 4]`.",
    "hint": "Even filter."
  },
  {
    "id": 18,
    "question": "What will `a = [1, 2]; b = a; b.append(3); print(len(a))` output?",
    "options": [
      "3",
      "2",
      "Error",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`b = a` creates an alias to the same list in memory; modifying `b` affects `a`, giving length 3.",
    "hint": "Shared reference."
  },
  {
    "id": 19,
    "question": "What will `print('A' < 'a')` output?",
    "options": [
      "True",
      "False",
      "TypeError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "ASCII of 'A' (65) is less than ASCII of 'a' (97), so `65 < 97` is True.",
    "hint": "ASCII code point comparison."
  },
  {
    "id": 20,
    "question": "What is the output of `len({'a': 1, 'b': 2, 'a': 3})`?",
    "options": [
      "2",
      "3",
      "1",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "The duplicate key `'a'` overwrites the earlier value, leaving two unique keys `'a'` and `'b'`.",
    "hint": "Unique dictionary keys."
  },
  {
    "id": 21,
    "question": "What will `print((1, 2) * 2)` output?",
    "options": [
      "(1, 2, 1, 2)",
      "(2, 4)",
      "((1, 2), (1, 2))",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Multiplying a tuple by an integer repeats its elements.",
    "hint": "Tuple repetition."
  },
  {
    "id": 22,
    "question": "What does `pass` do in Python?",
    "options": [
      "Acts as a null placeholder that does nothing",
      "Exits the program",
      "Skips an iteration",
      "Returns True"
    ],
    "correctAnswer": 0,
    "explanation": "`pass` is a null statement used as a syntactic placeholder.",
    "hint": "Null statement."
  },
  {
    "id": 23,
    "question": "Which function converts character 'A' to ASCII code 65?",
    "options": [
      "ord('A')",
      "chr('A')",
      "ascii('A')",
      "code('A')"
    ],
    "correctAnswer": 0,
    "explanation": "`ord()` returns the Unicode/ASCII code point of a single character.",
    "hint": "ord function."
  },
  {
    "id": 24,
    "question": "What does `divmod(10, 3)` return?",
    "options": [
      "(3, 1)",
      "(1, 3)",
      "3.33",
      "[3, 1]"
    ],
    "correctAnswer": 0,
    "explanation": "`divmod(a, b)` returns the tuple `(a // b, a % b)` = `(3, 1)`.",
    "hint": "Quotient and remainder tuple."
  },
  {
    "id": 25,
    "question": "What is the result of `10 is 10` in Python?",
    "options": [
      "True",
      "False",
      "SyntaxError",
      "TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "Both expressions reference the same cached integer literal in memory.",
    "hint": "Identity of identical literal."
  }
];

export default questions;
