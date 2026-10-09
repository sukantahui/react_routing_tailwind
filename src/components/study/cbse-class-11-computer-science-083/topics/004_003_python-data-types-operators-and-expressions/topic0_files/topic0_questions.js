const questions = [
  {
    id: 1,
    question: "What is the result of evaluating the Python expression `2 ** 3 ** 2`?",
    options: ["64", "512", "36", "18"],
    correctAnswer: 1,
    explanation: "The exponentiation operator `**` has RIGHT-TO-LEFT associativity in Python. Therefore, `3 ** 2 = 9` is evaluated first, followed by `2 ** 9 = 512`.",
    hint: "Exponentiation associates from right to left: 2 ** (3 ** 2)."
  },
  {
    id: 2,
    question: "What is the output of `-7 // 2` in Python?",
    options: ["-3", "-4", "-3.5", "3"],
    correctAnswer: 1,
    explanation: "Floor division `//` always rounds down to the next lowest integer (toward negative infinity). $-7 / 2 = -3.5$, which rounds down to $-4$.",
    hint: "Floor division rounds toward negative infinity: -3.5 rounds down to -4."
  },
  {
    id: 3,
    question: "What is the output of `-7 % 2` in Python?",
    options: ["1", "-1", "0", "1.5"],
    correctAnswer: 0,
    explanation: "In Python, the modulo operator `%` satisfies the identity $a = (a // b) \times b + (a \% b)$. For $a = -7, b = 2$: $-7 = (-4) \times 2 + r \implies -7 = -8 + r \implies r = 1$. The result always shares the sign of the divisor $b$.",
    hint: "Formula: r = a - (a // b) * b -> -7 - (-4 * 2) = -7 + 8 = 1."
  },
  {
    id: 4,
    question: "What is the key difference between the equality operator `==` and the identity operator `is`?",
    options: [
      "`==` compares value contents for equality, while `is` compares memory address identity (checks if `id(a) == id(b)`).",
      "`==` is used for strings, while `is` is used for numbers.",
      "`==` creates new variables, while `is` deletes variables.",
      "There is no difference; they are exact aliases."
    ],
    correctAnswer: 0,
    explanation: "`==` tests value equivalence ($a == b$), whereas `is` tests whether both operand variables reference the exact same memory location in RAM ($id(a) == id(b)$).",
    hint: "== checks values; is checks object identity in memory."
  },
  {
    id: 5,
    question: "What is the output of the following code?\n```python\na = [1, 2, 3]\nb = [1, 2, 3]\nprint(a == b, a is b)\n```",
    options: [
      "True True",
      "True False",
      "False False",
      "False True"
    ],
    correctAnswer: 1,
    explanation: "`a == b` is `True` because their list elements are identical in value. `a is b` is `False` because `a` and `b` are two distinct list objects allocated in separate memory locations.",
    hint: "Lists have identical contents (True) but separate memory allocations (False)."
  },
  {
    id: 6,
    question: "Which operator has the highest precedence in Python?",
    options: [
      "Parentheses `( )`",
      "Exponentiation `**`",
      "Multiplication `*`",
      "Bitwise AND `&`"
    ],
    correctAnswer: 0,
    explanation: "Parentheses `()` have the highest precedence in Python, overriding all default operator binding orders.",
    hint: "Parentheses always evaluate first."
  },
  {
    id: 7,
    question: "What is the result of the expression `10 + 3 * 2 ** 2`?",
    options: ["52", "22", "160", "26"],
    correctAnswer: 1,
    explanation: "Precedence order: 1. Exponentiation `2 ** 2 = 4`. 2. Multiplication `3 * 4 = 12`. 3. Addition `10 + 12 = 22`.",
    hint: "Order: ** first, then *, then +."
  },
  {
    id: 8,
    question: "Which of the following is a Membership Operator in Python?",
    options: ["in", "is", "==", "&"],
    correctAnswer: 0,
    explanation: "`in` and `not in` are Python Membership Operators used to test whether a value is present in a sequence (string, list, tuple, dictionary keys).",
    hint: "in tests membership in sequences."
  },
  {
    id: 9,
    question: "What is the output of `'cat' in 'education'`?",
    options: ["True", "False", "TypeError", "None"],
    correctAnswer: 0,
    explanation: "The substring `'cat'` exists inside the string `'education'` (edu-cat-ion), so `'cat' in 'education'` evaluates to `True`.",
    hint: "Check if 'cat' is a contiguous substring of 'education'."
  },
  {
    id: 10,
    question: "What is the output of the logical short-circuit expression `0 and 5` in Python?",
    options: ["0", "5", "True", "False"],
    correctAnswer: 0,
    explanation: "In Python, `and` returns the first falsy operand encountered or the last truthy operand. Since `0` is falsy, evaluation stops immediately and returns `0` (short-circuit evaluation).",
    hint: "0 is falsy, so 'and' short-circuits and returns 0."
  },
  {
    id: 11,
    question: "What is the output of `5 or 10` in Python?",
    options: ["5", "10", "True", "15"],
    correctAnswer: 0,
    explanation: "In Python, `or` evaluates operands from left to right and returns the first truthy value encountered. Since `5` is truthy, it returns `5` immediately without evaluating `10`.",
    hint: "'or' returns the first truthy operand."
  },
  {
    id: 12,
    question: "What is the result of the bitwise operation `6 & 3`?",
    options: ["2", "7", "3", "6"],
    correctAnswer: 0,
    explanation: "6 in binary = `0110`, 3 in binary = `0011`. Bitwise AND (`0110 & 0011`) = `0010` (decimal 2).",
    hint: "6 (110) AND 3 (011) = 010 = 2."
  },
  {
    id: 13,
    question: "What is the result of the bitwise operation `6 | 3`?",
    options: ["7", "2", "9", "5"],
    correctAnswer: 0,
    explanation: "6 in binary = `0110`, 3 in binary = `0011`. Bitwise OR (`0110 | 0011`) = `0111` (decimal 7).",
    hint: "6 (110) OR 3 (011) = 111 = 7."
  },
  {
    id: 14,
    question: "What is the result of the bitwise operation `5 ^ 3` (XOR)?",
    options: ["6", "8", "2", "15"],
    correctAnswer: 0,
    explanation: "5 in binary = `0101`, 3 in binary = `0011`. Bitwise XOR (`0101 ^ 0011`) = `0110` (decimal 6).",
    hint: "5 (101) XOR 3 (011) = 110 = 6."
  },
  {
    id: 15,
    question: "What is the result of left-shift operation `5 << 2`?",
    options: ["20", "10", "1.25", "25"],
    correctAnswer: 0,
    explanation: "Left shift `x << n` multiplies $x$ by $2^n$. For $5 << 2$: $5 \times 2^2 = 5 \times 4 = 20$ (binary `0101` shifted left 2 positions becomes `010100` = 20).",
    hint: "x << n equals x * (2 ** n)."
  },
  {
    id: 16,
    question: "What is the result of right-shift operation `20 >> 2`?",
    options: ["5", "10", "40", "80"],
    correctAnswer: 0,
    explanation: "Right shift `x >> n` performs integer division by $2^n$: $20 // 2^2 = 20 // 4 = 5$.",
    hint: "x >> n equals x // (2 ** n)."
  },
  {
    id: 17,
    question: "What is the boolean evaluation of `bool([])`, `bool(0)`, and `bool('')` in Python?",
    options: [
      "All evaluate to `False`",
      "All evaluate to `True`",
      "First is True, others False",
      "Raises TypeError"
    ],
    correctAnswer: 0,
    explanation: "In Python, empty sequences (`[]`, `()`, `''`), empty mappings (`{}`), zero numbers (`0`, `0.0`, `0j`), and `None` evaluate to boolean `False` (Falsy values).",
    hint: "Empty structures and zero are falsy."
  },
  {
    id: 18,
    question: "What is the data type of the expression `5 / 2` in Python 3?",
    options: ["<class 'float'>", "<class 'int'>", "<class 'fraction'>", "<class 'double'>"],
    correctAnswer: 0,
    explanation: "In Python 3, standard true division `/` always returns a `float` (e.g. `5 / 2 = 2.5` and `4 / 2 = 2.0`).",
    hint: "True division (/) always produces a float."
  },
  {
    id: 19,
    question: "What is the output of `bool('False')`?",
    options: ["True", "False", "None", "Error"],
    correctAnswer: 0,
    explanation: "Any non-empty string in Python is truthy! `'False'` is a non-empty string containing 5 characters, so `bool('False')` returns `True`.",
    hint: "Non-empty strings are always truthy."
  },
  {
    id: 20,
    question: "What is Chained Relational Comparison in Python?",
    options: [
      "Evaluating `10 < x < 20` as `(10 < x) and (x < 20)` with short-circuiting",
      "Comparing variables across network chains",
      "Linking lists with relational operators",
      "An invalid syntax error"
    ],
    correctAnswer: 0,
    explanation: "Python allows chained relational comparisons like `10 < x < 20`, which translates internally to `(10 < x) and (x < 20)` without evaluating `x` twice.",
    hint: "10 < x < 20 evaluates as (10 < x) and (x < 20)."
  },
  {
    id: 21,
    question: "What is the output of `type( (5) )` versus `type( (5,) )`?",
    options: [
      "`int` and `tuple` respectively",
      "`tuple` and `tuple`",
      "`int` and `int`",
      "`list` and `tuple`"
    ],
    correctAnswer: 0,
    explanation: "`(5)` is simply an integer in parentheses (type `int`), whereas `(5,)` with a trailing comma creates a single-element `tuple`.",
    hint: "A single-element tuple requires a trailing comma."
  },
  {
    id: 22,
    question: "What is the value of `x` after executing `x = 5; x += 3 * 2`?",
    options: ["11", "16", "10", "13"],
    correctAnswer: 0,
    explanation: "In augmented assignment, the entire right-hand expression is evaluated first: `3 * 2 = 6`. Then `x = x + 6 = 5 + 6 = 11`.",
    hint: "Right side evaluates first: 5 + (3 * 2) = 11."
  },
  {
    id: 23,
    question: "What is the result of `~5` in Python (Bitwise NOT)?",
    options: ["-6", "-5", "4", "6"],
    correctAnswer: 0,
    explanation: "The Bitwise NOT operator `~` computes `-(x + 1)`. For $x = 5$: $-(5 + 1) = -6$.",
    hint: "Formula: ~x = -(x + 1)."
  },
  {
    id: 24,
    question: "What is the output of `5 == 5.0` in Python?",
    options: ["True", "False", "TypeError", "None"],
    correctAnswer: 0,
    explanation: "`5 == 5.0` evaluates to `True` because the integer `5` is implicitly type-promoted to float `5.0` and their numeric mathematical values are identical.",
    hint: "Value equality holds across int and float."
  },
  {
    id: 25,
    question: "Case Study: Susmita writes `marks = 95; print(marks > 90 and marks <= 100)`. Which chained comparison expresses the exact same condition pythonically?",
    options: [
      "`print(90 < marks <= 100)`",
      "`print(90 <= marks <= 100)`",
      "`print(marks in (90, 100))`",
      "`print(marks == 90 or 100)`"
    ],
    correctAnswer: 0,
    explanation: "`90 < marks <= 100` cleanly represents `marks > 90 and marks <= 100` using Python's chained comparison feature.",
    hint: "Chained comparison: 90 < marks <= 100."
  }
];

export default questions;
