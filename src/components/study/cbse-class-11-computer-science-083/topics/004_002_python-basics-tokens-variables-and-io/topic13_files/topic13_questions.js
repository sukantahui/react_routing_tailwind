export const topic13Questions = [
  {
    id: "t13_q1",
    question: "Which of the following is an INVALID identifier in Python?",
    options: [
      "`9lives`",
      "`_lives9`",
      "`lives_9`",
      "`LIVES`"
    ],
    correct: 0,
    explanationEn: "Identifiers cannot start with a digit. `9lives` starts with '9' and therefore triggers a syntax error.",
    explanationBn: "আইডেন্টিফায়ার কখনো সংখ্যা দিয়ে শুরু হতে পারে না। `9lives` সংখ্যা দিয়ে শুরু হওয়ায় এটি অবৈধ।"
  },
  {
    id: "t13_q2",
    question: "What is the output of the following statement?\nprint('Python', '3', sep='@', end='!')\nprint('Rocks')",
    options: [
      "`Python@3!Rocks`",
      "`Python@3!\\nRocks`",
      "`Python 3@!Rocks`",
      "`Python@3\\n!Rocks`"
    ],
    correct: 0,
    explanationEn: "The first print outputs `Python@3!` with no newline. The second print starts immediately after `!`, yielding `Python@3!Rocks`.",
    explanationBn: "প্রথম প্রিন্টের শেষে `!` থাকায় নতুন লাইনে না গিয়ে পরবর্তী শব্দের সাথে মিলে `Python@3!Rocks` হয়।"
  },
  {
    id: "t13_q3",
    question: "Why does the statement `20 = x` fail during Python compilation?",
    options: [
      "Literal `20` is an r-value and cannot act as an l-value target",
      "`20` is not an integer",
      "`x` is undefined",
      "`=` is not supported with numbers"
    ],
    correct: 0,
    explanationEn: "Assignment syntax requires a valid l-value (memory storage target) on the left of `=`. Constant `20` is an r-value only.",
    explanationBn: "অ্যাসাইনমেন্টের বামপাশে পরিবর্তনযোগ্য মেমোরি রেফারেন্স (l-value) থাকতে হয়। ধ্রুবক সংখ্যা ২০ কোনো l-value হতে পারে না।"
  },
  {
    id: "t13_q4",
    question: "What will `type(3 + 4j)` evaluate to?",
    options: [
      "`<class 'complex'>`",
      "`<class 'imaginary'>`",
      "`<class 'float'>`",
      "`<class 'tuple'>`"
    ],
    correct: 0,
    explanationEn: "In Python, numbers with `j` or `J` represent complex numbers belonging to `<class 'complex'>`.",
    explanationBn: "`3 + 4j` পাইথনে জটিল সংখ্যা বা `<class 'complex'>` ক্লাসের অন্তর্ভুক্ত।"
  },
  {
    id: "t13_q5",
    question: "What does Python's `id()` function return?",
    options: [
      "A unique integer representing the memory address of the object",
      "The string name of the variable",
      "The count of active references",
      "The line number in source code"
    ],
    correct: 0,
    explanationEn: "`id(obj)` returns the object's unique memory address integer during its lifetime.",
    explanationBn: "`id()` ফাংশন অবজেক্টের মেমোরি ঠিকানার একটি অনন্য পূর্ণসংখ্যা প্রদান করে।"
  },
  {
    id: "t13_q6",
    question: "Consider:\nx = 10\ny = 10\nWhat is the value of `x is y` in CPython for small integers?",
    options: [
      "`True` (due to small integer caching from -5 to 256)",
      "`False` (separate variables always have separate IDs)",
      "`None`",
      "`SyntaxError`"
    ],
    correct: 0,
    explanationEn: "CPython pre-allocates and reuses integer objects from -5 to 256, so `x` and `y` reference the exact same memory object.",
    explanationBn: "পাইথন -৫ থেকে ২৫৬ পর্যন্ত সংখ্যাগুলোকে মেমোরিতে ক্যাশ করে রাখে, তাই `x is y` হবে `True`।"
  },
  {
    id: "t13_q7",
    question: "What is the output of `int('1010', 2)` in Python?",
    options: [
      "`10`",
      "`1010`",
      "`2`",
      "`ValueError`"
    ],
    correct: 0,
    explanationEn: "Passing base 2 to `int()` parses the binary string `'1010'` into its decimal integer equivalent `10`.",
    explanationBn: "বেস ২ দিয়ে `int()` কল করলে বাইনারি স্ট্রিং `'1010'` ডেসিমাল সংখ্যা ১০-এ রূপান্তরিত হয়।"
  },
  {
    id: "t13_q8",
    question: "Which of the following is NOT a reserved keyword in Python 3.12?",
    options: [
      "`include`",
      "`assert`",
      "`yield`",
      "`nonlocal`"
    ],
    correct: 0,
    explanationEn: "`include` is a keyword in C/C++, but NOT in Python (Python uses `import`).",
    explanationBn: "`include` পাইথনের কীওয়ার্ড নয় (পাইথনে `import` ব্যবহৃত হয়)।"
  },
  {
    id: "t13_q9",
    question: "What happens when an expression is placed on the left-hand side: `x + 1 = 10`?",
    options: [
      "Raises `SyntaxError: cannot assign to expression`",
      "Assigns 9 to `x` automatically",
      "Prints `10`",
      "Creates a new variable named `x + 1`"
    ],
    correct: 0,
    explanationEn: "Expressions evaluate to r-values and cannot accept assignments, throwing an immediate `SyntaxError`.",
    explanationBn: "এক্সপ্রেশন কোনো l-value হতে পারে না, তাই `x + 1 = 10` লিখলে `SyntaxError` ঘটে।"
  },
  {
    id: "t13_q10",
    question: "Which function converts a string representation of a float `'3.14'` into an integer without error?",
    options: [
      "`int(float('3.14'))`",
      "`int('3.14')`",
      "`float(int('3.14'))`",
      "`str(int('3.14'))`"
    ],
    correct: 0,
    explanationEn: "`int('3.14')` raises `ValueError`, but nested `int(float('3.14'))` successfully parses to float `3.14` and truncates to `3`.",
    explanationBn: "সরাসরি `int('3.14')` এরর দেয়, তবে `int(float('3.14'))` সঠিকভাবে পূর্ণসংখ্যা ৩-এ রূপান্তর করে।"
  },
  {
    id: "t13_q11",
    question: "What is printed by:\nprint('A', 'B', 'C', sep='', end='\\n')?",
    options: [
      "`ABC`",
      "`A B C`",
      "`A, B, C`",
      "`A\\nB\\nC`"
    ],
    correct: 0,
    explanationEn: "An empty string separator `sep=''` concatenates the tokens directly with no spaces: `ABC`.",
    explanationBn: "`sep=''` আর্গুমেন্টগুলোর মাঝে কোনো স্পেস না দিয়ে সরাসরি `ABC` প্রিন্ট করে।"
  },
  {
    id: "t13_q12",
    question: "What is the data type of `x = (5)` vs `y = (5,)`?",
    options: [
      "`x` is `int`, `y` is `tuple`",
      "`x` is `tuple`, `y` is `tuple`",
      "`x` is `int`, `y` is `int`",
      "`x` is `list`, `y` is `tuple`"
    ],
    correct: 0,
    explanationEn: "Parentheses alone denote grouping, making `(5)` an integer. A trailing comma `(5,)` is required to construct a 1-element tuple.",
    explanationBn: "কমা ছাড়া `(5)` হলো একটি সাধারণ পূর্ণসংখ্যা `int`, কিন্তু কমাযুক্ত `(5,)` হলো একটি `tuple`।"
  },
  {
    id: "t13_q13",
    question: "What is the escape sequence for an ASCII Backspace?",
    options: [
      "`\\b`",
      "`\\a`",
      "`\\r`",
      "`\\f`"
    ],
    correct: 0,
    explanationEn: "`\\b` represents the backspace escape sequence.",
    explanationBn: "`\\b` ব্যাকস্পেস এস্কেপ সিকোয়েন্স হিসেবে কাজ করে।"
  },
  {
    id: "t13_q14",
    question: "What will `bool('')` and `bool('0')` evaluate to respectively?",
    options: [
      "`False` and `True`",
      "`False` and `False`",
      "`True` and `True`",
      "`True` and `False`"
    ],
    correct: 0,
    explanationEn: "Empty string `''` is falsy (`False`), whereas non-empty string `'0'` has length 1 and is truthy (`True`).",
    explanationBn: "ফাঁকা স্ট্রিং `''` হলো `False`, কিন্তু ১ দৈর্ঘ্যের অ-ফাঁকা স্ট্রিং `'0'` হলো `True`।"
  },
  {
    id: "t13_q15",
    question: "What is the output of `print(0.1 + 0.2 == 0.3)` in Python?",
    options: [
      "`False` (due to IEEE 754 floating-point binary representation precision)",
      "`True`",
      "`None`",
      "`TypeError`"
    ],
    correct: 0,
    explanationEn: "Due to binary floating-point representation limits in IEEE 754, `0.1 + 0.2` equals `0.30000000000000004`, so equality returns `False`.",
    explanationBn: "বাইনারি ফ্লোটিং পয়েন্ট ফ্র্যাকশনের সীমাবদ্ধতার কারণে `0.1 + 0.2 == 0.3` এর মান `False` হয়।"
  },
  {
    id: "t13_q16",
    question: "What will `a, b = 1, 2; a, b = b, a + b; print(a, b)` output?",
    options: [
      "`2 3`",
      "`2 2`",
      "`1 3`",
      "`3 3`"
    ],
    correct: 0,
    explanationEn: "The right-hand tuple `(b, a + b)` evaluates first to `(2, 1 + 2) = (2, 3)` before simultaneously unpacking into `a` and `b`.",
    explanationBn: "ডানপাশের মান `(2, 3)` আগে হিসাব হয়ে একসাথে `a` ও `b`-তে অ্যাসাইন হয়, ফলে আউটপুট `2 3`।"
  },
  {
    id: "t13_q17",
    question: "Which of the following creates a multiline raw string?",
    options: [
      "`r'''line1\\nline2'''`",
      "`m\"line1\\nline2\"`",
      "`raw['line1', 'line2']`",
      "`\"line1\" + raw + \"line2\"`"
    ],
    correct: 0,
    explanationEn: "Prefixing triple quotes with `r` or `R` creates a multiline raw string where escape characters are treated literally.",
    explanationBn: "ট্রিপল কোটের পূর্বে `r` বসালে মাল্টি-লাইন র' স্ট্রিং তৈরি হয়।"
  },
  {
    id: "t13_q18",
    question: "What will `print('A', end=''); print('B', end=''); print('C')` print?",
    options: [
      "`ABC`",
      "`A\\nB\\nC`",
      "`A B C`",
      "`ABC\\n`"
    ],
    correct: 0,
    explanationEn: "Suppressed newlines join all three letters into `ABC` on a single line.",
    explanationBn: "`end=''` থাকার কারণে তিনটি অক্ষর পাশাপাশি বসে `ABC` হিসেবে প্রদর্শিত হয়।"
  },
  {
    id: "t13_q19",
    question: "What is the data type of the expression `15 / 3` in Python 3?",
    options: [
      "`float` (value `5.0`)",
      "`int` (value `5`)",
      "`str`",
      "`bool`"
    ],
    correct: 0,
    explanationEn: "True division `/` in Python 3 ALWAYS produces a `float`, so `15 / 3` evaluates to `5.0`.",
    explanationBn: "পাইথন ৩-এ ট্রু ডিভিশন `/` সর্বদা ফ্লোট (`float`) মান `5.0` প্রদান করে।"
  },
  {
    id: "t13_q20",
    question: "What is the default encoding format of Python source code files under PEP 3120?",
    options: [
      "UTF-8",
      "ASCII",
      "UTF-16",
      "ISO-8859-1"
    ],
    correct: 0,
    explanationEn: "Since Python 3.0, the default source code character encoding is UTF-8.",
    explanationBn: "পাইথন ৩-এর ডিফল্ট সোর্স কোড ক্যারেক্টার এনকোডিং হলো UTF-8।"
  },
  {
    id: "t13_q21",
    question: "Which built-in function returns the string representation of an object as seen by the interpreter?",
    options: [
      "`repr()`",
      "`str()`",
      "`type()`",
      "`chr()`"
    ],
    correct: 0,
    explanationEn: "`repr()` returns an unambiguous official string representation of an object.",
    explanationBn: "`repr()` অবজেক্টের আনঅ্যাম্বিগিউয়াস স্ট্রিং রূপ প্রদান করে।"
  },
  {
    id: "t13_q22",
    question: "What is the output of `print(bool(None))`?",
    options: [
      "`False`",
      "`True`",
      "`None`",
      "`TypeError`"
    ],
    correct: 0,
    explanationEn: "`None` is falsy in Python boolean truth-value contexts, so `bool(None)` is `False`.",
    explanationBn: "পাইথনে `None` মান সর্বদা অসত্য বা `False` হিসেবে গণ্য হয়।"
  },
  {
    id: "t13_q23",
    question: "What will `a = 10; b = 20; a, b = b, a; print(a)` output?",
    options: [
      "`20`",
      "`10`",
      "`30`",
      "`TypeError`"
    ],
    correct: 0,
    explanationEn: "Tuple swap assigns the initial value of `b` (20) to `a`.",
    explanationBn: "সোয়াপ করার ফলে `a` এর মান ২০ হয়ে যায়।"
  },
  {
    id: "t13_q24",
    question: "What will `eval('2 + 3 * 4')` return?",
    options: [
      "`14` (integer)",
      "`20`",
      "`'2 + 3 * 4'` (string)",
      "`'14'`"
    ],
    correct: 0,
    explanationEn: "`eval()` parses and computes the mathematical expression according to operator precedence (`3 * 4 = 12`, `12 + 2 = 14`).",
    explanationBn: "`eval()` গাণিতিক এক্সপ্রেশনটি মূল্যায়ন করে সঠিক মান ১৪ প্রদান করে।"
  },
  {
    id: "t13_q25",
    question: "Which statement will raise a `SyntaxError`?",
    options: [
      "`a + 2 = 10`",
      "`a = 10 + 2`",
      "`a = b = 10`",
      "`_ = 10`"
    ],
    correct: 0,
    explanationEn: "`a + 2 = 10` attempts to assign a value to an arithmetic expression on the left, which is illegal.",
    explanationBn: "`a + 2 = 10` এক্সপ্রেশনে অ্যাসাইন করার চেষ্টা করায় `SyntaxError` ঘটবে।"
  },
  {
    id: "t13_q26",
    question: "What is the output of `print('Python', end='---'); print('Rocks')`?",
    options: [
      "`Python---Rocks`",
      "`Python\\n---Rocks`",
      "`Python Rocks---`",
      "`Python--- Rocks`"
    ],
    correct: 0,
    explanationEn: "The trailing `---` connects directly with `Rocks` on the same line.",
    explanationBn: "লাইনের শেষে `---` থাকায় দ্বিতীয় প্রিন্টের সাথে যুক্ত হয়ে `Python---Rocks` হয়।"
  },
  {
    id: "t13_q27",
    question: "What is the binary representation prefix in Python integer literals?",
    options: [
      "`0b` or `0B`",
      "`0x` or `0X`",
      "`0o` or `0O`",
      "`#b`"
    ],
    correct: 0,
    explanationEn: "Binary integers begin with `0b` or `0B` (e.g. `0b1101`).",
    explanationBn: "বাইনারি লিটারেল `0b` বা `0B` দিয়ে শুরু হয়।"
  },
  {
    id: "t13_q28",
    question: "What is the return type of `input('Enter your roll: ')`?",
    options: [
      "`<class 'str'>`",
      "`<class 'int'>`",
      "`<class 'float'>`",
      "`<class 'NoneType'>`"
    ],
    correct: 0,
    explanationEn: "`input()` always returns a string, even if the user enters only digits.",
    explanationBn: "`input()` সবসময় স্ট্রিং রিটার্ন করে।"
  },
  {
    id: "t13_q29",
    question: "What is the value of `float('inf') > 10**100`?",
    options: [
      "`True` (Positive infinity is greater than any finite number)",
      "`False`",
      "`OverflowError`",
      "`TypeError`"
    ],
    correct: 0,
    explanationEn: "In Python, `float('inf')` represents mathematical positive infinity and compares greater than any finite numerical value.",
    explanationBn: "পাইথনে অসীম মান `float('inf')` যেকোনো সসীম সংখ্যার চেয়ে বড়, তাই এটি `True`।"
  },
  {
    id: "t13_q30",
    question: "Which of the following is true regarding dynamic typing in Python?",
    options: [
      "Data types belong to objects, not to variable names",
      "A variable must be re-declared with `var` or `let` before changing types",
      "Python does not support dynamic typing",
      "Variable types are permanently locked after their first assignment"
    ],
    correct: 0,
    explanationEn: "In Python, types are intrinsic to runtime objects. Variables are merely references that can point to objects of differing types over time.",
    explanationBn: "পাইথনে ডেটা টাইপ অবজেক্টের সাথে যুক্ত থাকে, ভেরিয়েবলের নামের সাথে নয়।"
  }
];
