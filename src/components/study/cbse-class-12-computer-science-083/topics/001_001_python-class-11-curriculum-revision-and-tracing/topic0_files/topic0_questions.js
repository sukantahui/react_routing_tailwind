// 25 Authentic CBSE Board Examination Questions for Topic 0
const questions = [
  {
    "id": 1,
    "question": "What is the smallest individual unit in a Python program called?",
    "options": [
      "Lexical Unit (Token)",
      "Instruction",
      "Variable",
      "Statement"
    ],
    "correctAnswer": 0,
    "explanation": "A token (or lexical unit) is the smallest element recognized by the Python interpreter during lexical parsing.",
    "hint": "Smallest recognized building block."
  },
  {
    "id": 2,
    "question": "Which of the following is an INVALID Python identifier?",
    "options": [
      "_score_2026",
      "student_rank",
      "2nd_record",
      "TrueValue"
    ],
    "correctAnswer": 2,
    "explanation": "Identifiers cannot start with a numeric digit. '2nd_record' begins with '2', raising a SyntaxError.",
    "hint": "Rule on initial character."
  },
  {
    "id": 3,
    "question": "How many keywords in Python 3 begin with an uppercase letter?",
    "options": [
      "1 (None)",
      "2 (True, False)",
      "3 (True, False, None)",
      "0 (all are lowercase)"
    ],
    "correctAnswer": 2,
    "explanation": "Exactly three keywords begin with an uppercase letter: True, False, and None. All other keywords are lowercase.",
    "hint": "Boolean constants plus null literal."
  },
  {
    "id": 4,
    "question": "What is the output of `type(0b1010)` in Python?",
    "options": [
      "<class 'bin'>",
      "<class 'int'>",
      "<class 'str'>",
      "<class 'binary'>"
    ],
    "correctAnswer": 1,
    "explanation": "0b1010 is an integer literal expressed in binary radix (evaluates to decimal 10). Its type is 'int'.",
    "hint": "Prefix 0b is an integer format."
  },
  {
    "id": 5,
    "question": "Which of the following is a Python punctuator (delimiter)?",
    "options": [
      "return",
      "while",
      "#",
      ":"
    ],
    "correctAnswer": 3,
    "explanation": "The colon (:) is a punctuator used to begin indented code suites like loops, functions, and conditionals. '#' starts comments.",
    "hint": "Used after if, for, def."
  },
  {
    "id": 6,
    "question": "Which statement correctly describes the difference between `==` and `is`?",
    "options": [
      "`==` compares object values, whereas `is` compares memory identity (address)",
      "`==` checks data type, `is` checks value",
      "Both operators are completely identical in all versions of Python",
      "`is` compares values, `==` compares addresses"
    ],
    "correctAnswer": 0,
    "explanation": "`==` evaluates value equivalence, while `is` evaluates whether two operands point to the exact same object in memory (`id(a) == id(b)`).",
    "hint": "Value vs Memory reference identity."
  },
  {
    "id": 7,
    "question": "Which of the following is NOT a reserved keyword in Python 3?",
    "options": [
      "pass",
      "eval",
      "global",
      "yield"
    ],
    "correctAnswer": 1,
    "explanation": "'eval' is a built-in function, not a reserved keyword. 'pass', 'global', and 'yield' are keywords.",
    "hint": "Built-in function vs keyword."
  },
  {
    "id": 8,
    "question": "What will `print(r'Python\\nExam')` output?",
    "options": [
      "Python Exam (on two lines)",
      "Python\\nExam",
      "Python\\Exam",
      "SyntaxError"
    ],
    "correctAnswer": 1,
    "explanation": "The 'r' prefix creates a raw string literal, treating backslashes as literal characters and disabling '\\n' escape sequence expansion.",
    "hint": "Raw string literal."
  },
  {
    "id": 9,
    "question": "Which of the following identifier names is valid according to Python naming rules?",
    "options": [
      "total-score",
      "while",
      "_finalMarks$",
      "__init__"
    ],
    "correctAnswer": 3,
    "explanation": "'__init__' contains only letters and underscores. 'total-score' has a hyphen, 'while' is a keyword, and '$' is illegal.",
    "hint": "Dunder methods are legal identifiers."
  },
  {
    "id": 10,
    "question": "What is the value and type of `3.5e2` in Python?",
    "options": [
      "350, <class 'int'>",
      "350.0, <class 'float'>",
      "3.52, <class 'float'>",
      "70.0, <class 'float'>"
    ],
    "correctAnswer": 1,
    "explanation": "3.5e2 represents 3.5 * 10^2 = 350.0. Exponential notation always results in a floating-point literal.",
    "hint": "Exponent scientific notation."
  },
  {
    "id": 11,
    "question": "Which token category does the string `'Hello, World!'` belong to?",
    "options": [
      "Identifier",
      "Literal",
      "Punctuator",
      "Keyword"
    ],
    "correctAnswer": 1,
    "explanation": "String constants enclosed in quotes are String Literals.",
    "hint": "Constant data value."
  },
  {
    "id": 12,
    "question": "What error is raised if you execute `for = 10`?",
    "options": [
      "NameError",
      "SyntaxError",
      "ValueError",
      "TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "'for' is a reserved keyword and cannot be used as an l-value variable name. The parser raises SyntaxError.",
    "hint": "Keywords cannot be variable names."
  },
  {
    "id": 13,
    "question": "Which operator is used to test whether an item exists inside a list or string?",
    "options": [
      "is",
      "in",
      "==",
      "exists"
    ],
    "correctAnswer": 1,
    "explanation": "'in' is a membership operator that returns True if the sequence contains the specified value.",
    "hint": "Membership operator."
  },
  {
    "id": 14,
    "question": "What is the boolean evaluation of the literal `None`?",
    "options": [
      "True",
      "False",
      "None",
      "Raises TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "In boolean contexts (e.g. `bool(None)` or `if None:`), `None` evaluates to False.",
    "hint": "Falsy values in Python."
  },
  {
    "id": 15,
    "question": "Which escape sequence in Python represents a carriage return?",
    "options": [
      "\\n",
      "\\r",
      "\\t",
      "\\b"
    ],
    "correctAnswer": 1,
    "explanation": "'\\r' represents Carriage Return, '\\n' is Line Feed, '\\t' is Horizontal Tab.",
    "hint": "ASCII CR."
  },
  {
    "id": 16,
    "question": "What is the output of `print(0x1F)`?",
    "options": [
      "1F",
      "31",
      "16",
      "26"
    ],
    "correctAnswer": 1,
    "explanation": "0x1F is a hexadecimal literal: (1 * 16^1) + (15 * 16^0) = 16 + 15 = 31.",
    "hint": "Hexadecimal conversion: F = 15."
  },
  {
    "id": 17,
    "question": "Which of the following is a logical operator in Python?",
    "options": [
      "&&",
      "&",
      "and",
      "AND"
    ],
    "correctAnswer": 2,
    "explanation": "Python uses English lowercase words `and`, `or`, and `not` as logical operators. `&` is bitwise AND, and `&&` is invalid syntax in Python.",
    "hint": "Lowercase English words."
  },
  {
    "id": 18,
    "question": "Which statement about Python variable names is correct?",
    "options": [
      "Variable names can have unlimited length",
      "Variable names must not exceed 31 characters",
      "Variable names can include emojis",
      "Variable names are case-insensitive"
    ],
    "correctAnswer": 0,
    "explanation": "Python identifiers can be of arbitrary length. However, clarity and PEP 8 guidelines suggest concise naming.",
    "hint": "No arbitrary character limit."
  },
  {
    "id": 19,
    "question": "What will `print('A' < 'a')` output and why?",
    "options": [
      "True, because ASCII value of 'A' (65) is less than 'a' (97)",
      "False, because uppercase letters take precedence",
      "TypeError, cannot compare character magnitudes",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Python compares characters using their Unicode/ASCII code points: ord('A') is 65, ord('a') is 97; 65 < 97 is True.",
    "hint": "ord('A') = 65, ord('a') = 97."
  },
  {
    "id": 20,
    "question": "Which token separates parameters in a function definition?",
    "options": [
      "Colon (:)",
      "Comma (,)",
      "Semicolon (;)",
      "Period (.)"
    ],
    "correctAnswer": 1,
    "explanation": "The comma (,) is a punctuator used to separate arguments and parameters.",
    "hint": "Delimiting function arguments."
  },
  {
    "id": 21,
    "question": "What is the type of `(10)` vs `(10,)` in Python?",
    "options": [
      "Both are tuples",
      "`int` and `tuple` respectively",
      "`tuple` and `int` respectively",
      "Both are integers"
    ],
    "correctAnswer": 1,
    "explanation": "Parentheses around a single integer `(10)` are treated as grouping parentheses resulting in `int`. A trailing comma `(10,)` is required to construct a singleton `tuple`.",
    "hint": "Importance of trailing comma."
  },
  {
    "id": 22,
    "question": "Which of the following is an augmented assignment operator?",
    "options": [
      "==",
      "++",
      "+=",
      "->"
    ],
    "correctAnswer": 2,
    "explanation": "`+=` is an augmented assignment operator. Python does not support the `++` increment operator.",
    "hint": "In-place addition assignment."
  },
  {
    "id": 23,
    "question": "What token marks the end of a physical line in Python without executing the statement?",
    "options": [
      "Semicolon (;)",
      "Backslash (\\)",
      "Slash (/)",
      "Tilde (~)"
    ],
    "correctAnswer": 1,
    "explanation": "A backslash (\\) at the end of a line acts as an explicit line continuation character.",
    "hint": "Line continuation character."
  },
  {
    "id": 24,
    "question": "Which of the following literals is of type `complex`?",
    "options": [
      "4 + 5i",
      "4 + 5j",
      "complex(4, 5)",
      "Both B and C"
    ],
    "correctAnswer": 3,
    "explanation": "Python uses 'j' or 'J' for the imaginary component (`4 + 5j`), or the built-in function `complex(4, 5)`. 'i' is invalid syntax.",
    "hint": "Symbol j represents imaginary unit."
  },
  {
    "id": 25,
    "question": "In CBSE board marking, why does `3a = 90` cause an error?",
    "options": [
      "3a is not declared",
      "Variable names cannot begin with a number",
      "Assignment operator is misplaced",
      "90 is an integer"
    ],
    "correctAnswer": 1,
    "explanation": "According to statutory Python lexical rules, an identifier must begin with an alphabet or underscore, never a numeric digit.",
    "hint": "Identifier naming rule 1."
  }
];

export default questions;
