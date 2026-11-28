// 25 Authentic CBSE Board Examination Questions for Topic 3
const questions = [
  {
    "id": 1,
    "question": "What is the value of the expression `2 ** 3 ** 2` in Python?",
    "options": [
      "64",
      "512",
      "36",
      "18"
    ],
    "correctAnswer": 1,
    "explanation": "The exponentiation operator `**` has right-to-left associativity: `2 ** (3 ** 2) = 2 ** 9 = 512`.",
    "hint": "Right-to-left exponentiation."
  },
  {
    "id": 2,
    "question": "What is the result of `-7 // 2` in Python?",
    "options": [
      "-3",
      "-4",
      "-3.5",
      "-3.0"
    ],
    "correctAnswer": 1,
    "explanation": "Floor division `//` always rounds down to the nearest lower integer. `-3.5` rounded down is `-4`.",
    "hint": "Rounds down towards negative infinity."
  },
  {
    "id": 3,
    "question": "What is the output of `-7 % 2`?",
    "options": [
      "-1",
      "1",
      "0",
      "-0.5"
    ],
    "correctAnswer": 1,
    "explanation": "Using the definition `a % b = a - (b * (a // b))`: `-7 - (2 * (-4)) = -7 - (-8) = 1`.",
    "hint": "Remainder formula with negative dividend."
  },
  {
    "id": 4,
    "question": "What does the expression `10 and 20` evaluate to?",
    "options": [
      "True",
      "10",
      "20",
      "False"
    ],
    "correctAnswer": 2,
    "explanation": "`and` evaluates operands from left to right. Since 10 is truthy, it returns the second operand, 20.",
    "hint": "Short-circuit behavior of `and`."
  },
  {
    "id": 5,
    "question": "What does the expression `0 or 'Python'` evaluate to?",
    "options": [
      "0",
      "'Python'",
      "True",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "In an `or` operation, if the first operand is falsy (0), it evaluates and returns the second operand ('Python').",
    "hint": "Short-circuit behavior of `or`."
  },
  {
    "id": 6,
    "question": "Which logical operator has the highest precedence in Python?",
    "options": [
      "and",
      "or",
      "not",
      "Both and & or have equal precedence"
    ],
    "correctAnswer": 2,
    "explanation": "`not` has higher precedence than `and`, which in turn has higher precedence than `or`.",
    "hint": "Highest logical precedence."
  },
  {
    "id": 7,
    "question": "What is the output of `print(True + True * 3)`?",
    "options": [
      "6",
      "4",
      "True",
      "3"
    ],
    "correctAnswer": 1,
    "explanation": "Multiplication precedes addition: `True * 3` is `1 * 3 = 3`. Then `True + 3` is `1 + 3 = 4`.",
    "hint": "True evaluates as numeric 1."
  },
  {
    "id": 8,
    "question": "What is the output of `5 < 10 < 15 < 20`?",
    "options": [
      "True",
      "False",
      "SyntaxError",
      "20"
    ],
    "correctAnswer": 0,
    "explanation": "Python supports chained comparisons: equivalent to `5 < 10 and 10 < 15 and 15 < 20`, which is True.",
    "hint": "Chained relational comparison."
  },
  {
    "id": 9,
    "question": "What will `print(10 / 2)` output?",
    "options": [
      "5",
      "5.0",
      "5.00",
      "Raises TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "The true division operator `/` always returns a floating-point result in Python 3.",
    "hint": "True division always returns float."
  },
  {
    "id": 10,
    "question": "What will be printed by `print(bool([]))`?",
    "options": [
      "True",
      "False",
      "None",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "Empty collections, numeric zeros, and None evaluate to False.",
    "hint": "Empty list falsiness."
  },
  {
    "id": 11,
    "question": "What is the value of `16 // 3 * 3`?",
    "options": [
      "16",
      "15",
      "15.0",
      "16.0"
    ],
    "correctAnswer": 1,
    "explanation": "`//` and `*` have equal precedence and associate left-to-right: `16 // 3` is 5; `5 * 3` is 15.",
    "hint": "Left-to-right associativity."
  },
  {
    "id": 12,
    "question": "What is the result of `not (5 > 2 and 3 < 1)`?",
    "options": [
      "True",
      "False",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`5 > 2` is True, `3 < 1` is False; `True and False` is False; `not False` is True.",
    "hint": "Logical negation."
  },
  {
    "id": 13,
    "question": "What does `False == 0` evaluate to?",
    "options": [
      "True",
      "False",
      "None",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "`bool` is a subclass of `int` where `False` has integer value 0 and `True` has integer value 1.",
    "hint": "Numeric equivalence of False."
  },
  {
    "id": 14,
    "question": "Which operator is evaluated FIRST in `x = 4 + 3 * 2 ** 2`?",
    "options": [
      "+",
      "*",
      "**",
      "="
    ],
    "correctAnswer": 2,
    "explanation": "Exponentiation `**` has the highest precedence, evaluated before `*`, `+`, and `=`.",
    "hint": "Highest precedence among arithmetic."
  },
  {
    "id": 15,
    "question": "What is the value of `4 + 3 * 2 ** 2`?",
    "options": [
      "28",
      "16",
      "49",
      "100"
    ],
    "correctAnswer": 1,
    "explanation": "`2 ** 2 = 4`, then `3 * 4 = 12`, then `4 + 12 = 16`.",
    "hint": "Step-by-step precedence."
  },
  {
    "id": 16,
    "question": "What is short-circuit evaluation?",
    "options": [
      "Stopping expression evaluation as soon as the final truth value is determined",
      "An electric fault in the CPU",
      "A compiler optimization for loops",
      "Using bitwise operators only"
    ],
    "correctAnswer": 0,
    "explanation": "Short-circuit evaluation means stopping evaluation of logical expressions as soon as the outcome is guaranteed.",
    "hint": "Halting unnecessary evaluation."
  },
  {
    "id": 17,
    "question": "What is the result of `(10 > 5) or (1 / 0)`?",
    "options": [
      "ZeroDivisionError",
      "True",
      "False",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "Because `10 > 5` is True, Python short-circuits the `or` expression without evaluating `1 / 0`.",
    "hint": "Short-circuit avoids division by zero."
  },
  {
    "id": 18,
    "question": "What is the output of `round(2.5)` vs `round(3.5)` in Python 3?",
    "options": [
      "3 and 4",
      "2 and 4",
      "2 and 3",
      "3 and 3"
    ],
    "correctAnswer": 1,
    "explanation": "Python 3 uses banker's rounding (round half to even). 2.5 rounds to 2, and 3.5 rounds to 4.",
    "hint": "Round half to even."
  },
  {
    "id": 19,
    "question": "What is the output of `print(10 != 10 or 20 == 20 and 30 != 30)`?",
    "options": [
      "True",
      "False",
      "Error",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "`and` precedes `or`: `(20 == 20 and 30 != 30)` is `True and False = False`. Then `False or False = False`.",
    "hint": "`and` has higher precedence than `or`."
  },
  {
    "id": 20,
    "question": "What is the result of `divmod(17, 5)`?",
    "options": [
      "(3, 2)",
      "(2, 3)",
      "3.4",
      "[3, 2]"
    ],
    "correctAnswer": 0,
    "explanation": "`divmod(a, b)` returns a tuple `(a // b, a % b)`. For 17 and 5: `(3, 2)`.",
    "hint": "Quotient and remainder pair."
  },
  {
    "id": 21,
    "question": "Which comparison operator checks if two references DO NOT point to the same object?",
    "options": [
      "!=",
      "is not",
      "not in",
      "<>"
    ],
    "correctAnswer": 1,
    "explanation": "`is not` is the identity test operator that returns True if the references are distinct.",
    "hint": "Identity negation."
  },
  {
    "id": 22,
    "question": "What does `3 < 4 and 4 > 5 or 2 < 3` evaluate to?",
    "options": [
      "True",
      "False",
      "Error",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "`3 < 4 and 4 > 5` is `True and False = False`. Then `False or (2 < 3)` is `False or True = True`.",
    "hint": "Evaluate `and` first, then `or`."
  },
  {
    "id": 23,
    "question": "What will `print('A' * 3 + 'B')` output?",
    "options": [
      "AAAB",
      "AB * 3",
      "TypeError",
      "A3B"
    ],
    "correctAnswer": 0,
    "explanation": "String repetition `*` precedes string concatenation `+`: `'A' * 3` is `'AAA'`, then `'AAA' + 'B'` is `'AAAB'`.",
    "hint": "String operators precedence."
  },
  {
    "id": 24,
    "question": "What will `print(2 ** 0)` output?",
    "options": [
      "0",
      "1",
      "2",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "Any non-zero number raised to power 0 equals 1.",
    "hint": "Zero exponent."
  },
  {
    "id": 25,
    "question": "What is the output of `print(10 // -3)`?",
    "options": [
      "-3",
      "-4",
      "-3.33",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "10 / -3 is -3.333... Floor division rounds down towards negative infinity, yielding -4.",
    "hint": "Floor rounding down with negative quotient."
  }
];

export default questions;
