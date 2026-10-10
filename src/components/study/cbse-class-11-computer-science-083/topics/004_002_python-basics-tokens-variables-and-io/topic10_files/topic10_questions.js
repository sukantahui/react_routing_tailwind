export const topic10Questions = [
  {
    id: "t10_q1",
    question: "What is the return data type of Python's built-in `input()` function regardless of what the user types?",
    options: [
      "`str` (String)",
      "`int` (Integer)",
      "`float`",
      "`None`"
    ],
    correct: 0,
    explanationEn: "In Python 3, `input()` ALWAYS returns a string (`<class 'str'>`), even if the user enters numeric digits like `1234`.",
    explanationBn: "পাইথন ৩-এ `input()` ফাংশন ব্যবহারকারী যা-ই টাইপ করুক না কেন সর্বদা স্ট্রিং (`<class 'str'>`) হিসেবে মান গ্রহণ করে।"
  },
  {
    id: "t10_q2",
    question: "Consider:\na = input('Enter a: ')  # User enters 10\nb = input('Enter b: ')  # User enters 20\nprint(a + b)\nWhat is the printed output?",
    options: [
      "`1020` (String concatenation)",
      "`30` (Arithmetic addition)",
      "`TypeError`",
      "`0`"
    ],
    correct: 0,
    explanationEn: "Because `a` and `b` are strings `'10'` and `'20'`, the `+` operator performs string concatenation, resulting in `'1020'`.",
    explanationBn: "`a` এবং `b` উভয়ই স্ট্রিং হওয়ায় `+` অপারেটর তাদের জোড়া লাগিয়ে `1020` আউটপুট দেয়।"
  },
  {
    id: "t10_q3",
    question: "How do you correctly take an integer input from the user for mathematical calculations?",
    options: [
      "`x = int(input('Enter integer: '))`",
      "`x = input(int('Enter integer: '))`",
      "`x = integer(input())`",
      "`x = read_int()`"
    ],
    correct: 0,
    explanationEn: "`int(input())` explicitly casts the raw string returned by `input()` into an integer.",
    explanationBn: "`int(input())` এর মাধ্যমে ব্যবহারকারীর ইনপুট নেওয়া স্ট্রিংকে পূর্ণসংখ্যায় (Integer) রূপান্তর করা হয়।"
  },
  {
    id: "t10_q4",
    question: "What happens if a user enters `'abc'` when prompted with `num = int(input())`?",
    options: [
      "`ValueError: invalid literal for int() with base 10: 'abc'`",
      "`num` becomes 0 automatically",
      "`TypeError`",
      "No error"
    ],
    correct: 0,
    explanationEn: "`int()` cannot parse non-digit characters into a base-10 integer, triggering a runtime `ValueError`.",
    explanationBn: "`int()` কোনো অক্ষরের স্ট্রিংকে পূর্ণসংখ্যায় রূপান্তর করতে না পেরে `ValueError` তৈরি করে।"
  },
  {
    id: "t10_q5",
    question: "What error is raised by `int('12.5')` in Python?",
    options: [
      "`ValueError: invalid literal for int() with base 10: '12.5'`",
      "`num` becomes 12",
      "`SyntaxError`",
      "`TypeError`"
    ],
    correct: 0,
    explanationEn: "`int()` expects pure integer digit strings. A decimal point string like `'12.5'` raises `ValueError`. Use `float('12.5')` or `int(float('12.5'))` instead.",
    explanationBn: "`int('12.5')` সরাসরি ফ্লোট স্ট্রিং গ্রহণ করতে পারে না এবং `ValueError` দেয়।"
  },
  {
    id: "t10_q6",
    question: "Which function converts a numeric string like `'98.75'` into a floating-point number?",
    options: [
      "`float(input())`",
      "`double(input())`",
      "`real(input())`",
      "`num(input())`"
    ],
    correct: 0,
    explanationEn: "`float()` converts integer or decimal numeric strings into floating-point numbers.",
    explanationBn: "`float()` ফাংশন স্ট্রিংকে দশমিক সংখ্যায় (Floating-point) রূপান্তর করে।"
  },
  {
    id: "t10_q7",
    question: "How can a user enter two integers separated by a space on a SINGLE input line?",
    options: [
      "`a, b = map(int, input().split())`",
      "`a, b = input(), input()`",
      "`a, b = int(input())`",
      "`a, b = split(input())`"
    ],
    correct: 0,
    explanationEn: "`input().split()` breaks the input line into individual string tokens, and `map(int, ...)` converts each token to an integer.",
    explanationBn: "`map(int, input().split())` এক লাইনে স্পেস দিয়ে দেওয়া একাধিক সংখ্যাকে আলাদা করে পূর্ণসংখ্যায় রূপান্তর করে।"
  },
  {
    id: "t10_q8",
    question: "What does the `eval()` function do when passed user input (e.g. `val = eval(input())`)?",
    options: [
      "It parses and evaluates the input string as a dynamic Python expression",
      "It deletes the input",
      "It formats input in uppercase",
      "It prints the input"
    ],
    correct: 0,
    explanationEn: "`eval()` evaluates the string argument as Python code (e.g. `'5 + 10'` evaluates to integer `15`).",
    explanationBn: "`eval()` ফাংশন ইনপুট স্ট্রিংটিকে সরাসরি একটি পাইথন এক্সপ্রেশন হিসেবে গণনা করে ফলাফল প্রদান করে।"
  },
  {
    id: "t10_q9",
    question: "If a user inputs `[10, 20, 30]` to `data = eval(input())`, what is the type and value of `data`?",
    options: [
      "`data` is a `<class 'list'>` with value `[10, 20, 30]`",
      "`data` is a string `'[10, 20, 30]'`",
      "`data` is an integer `60`",
      "`TypeError`"
    ],
    correct: 0,
    explanationEn: "`eval()` parses the list literal syntax `[10, 20, 30]` into a native Python list object.",
    explanationBn: "`eval()` স্ট্রিংটিকে একটি আসল পাইথন লিস্ট (`[10, 20, 30]`) অবজেক্টে পরিণত করে।"
  },
  {
    id: "t10_q10",
    question: "What is the prompt string in `name = input('Enter name: ')`?",
    options: [
      "`'Enter name: '` (a message displayed on screen to guide the user)",
      "`name`",
      "`input`",
      "`=`"
    ],
    correct: 0,
    explanationEn: "The optional string argument passed to `input()` is the prompt message printed to console before reading keystrokes.",
    explanationBn: "প্রম্পট স্ট্রিং হলো ইনপুট নেওয়ার আগে ব্যবহারকারীর নির্দেশনার জন্য স্ক্রিনে প্রদর্শিত বার্তা।"
  },
  {
    id: "t10_q11",
    question: "What does `input().split(',')` do?",
    options: [
      "Splits the user's input line using commas `,` as the delimiter into a list of strings",
      "Removes all commas",
      "Prints a comma",
      "Raises SyntaxError"
    ],
    correct: 0,
    explanationEn: "Passing `','` to `split()` uses the comma as the custom separator (ideal for CSV input).",
    explanationBn: "`split(',')` কমা দিয়ে পৃথক করা ইনপুটকে ভেঙে স্ট্রিংয়ের লিস্ট তৈরি করে।"
  },
  {
    id: "t10_q12",
    question: "What happens if a user presses Enter immediately without typing anything when prompted by `val = input()`?",
    options: [
      "`val` receives an empty string `\"\"`",
      "`val` becomes `None`",
      "`val` becomes `0`",
      "Python crashes"
    ],
    correct: 0,
    explanationEn: "Pressing Enter immediately without characters returns an empty string `\"\"` (length 0).",
    explanationBn: "কিছু না লিখে এন্টার চাপলে `input()` একটি ফাঁকা স্ট্রিং `\"\"` ফেরত দেয়।"
  },
  {
    id: "t10_q13",
    question: "What will `bool(input())` evaluate to if the user presses Enter without typing any characters?",
    options: [
      "`False` (because empty string `\"\"` is falsy in Python)",
      "`True`",
      "`TypeError`",
      "`None`"
    ],
    correct: 0,
    explanationEn: "Empty string `\"\"` has a boolean truth value of `False`.",
    explanationBn: "ফাঁকা স্ট্রিংয়ের বুলিয়ান মান `False`।"
  },
  {
    id: "t10_q14",
    question: "What will `bool(input())` evaluate to if the user types `'False'`?",
    options: [
      "`True` (because `'False'` is a non-empty string of 5 characters)",
      "`False`",
      "`TypeError`",
      "`None`"
    ],
    correct: 0,
    explanationEn: "`bool()` on any non-empty string returns `True`, regardless of whether the string says `'False'` or `'0'`.",
    explanationBn: "যেকোনো ফাঁকা-নয় এমন স্ট্রিংয়ের ওপর `bool()` চালালে ফলাফল সর্বদা `True` হয়।"
  },
  {
    id: "t10_q15",
    question: "Which of the following creates a list of integers from a space-separated user input line?",
    options: [
      "`nums = [int(x) for x in input().split()]`",
      "`nums = int(input().split())`",
      "`nums = input().split(int)`",
      "`nums = list(input())`"
    ],
    correct: 0,
    explanationEn: "List comprehension `[int(x) for x in input().split()]` converts each split string token into an integer in a new list.",
    explanationBn: "লিস্ট কম্প্রিহেনশন `[int(x) for x in input().split()]` স্পেসযুক্ত প্রতিটি সংখ্যাকে ইন্টিজারে রূপান্তর করে লিস্ট বানায়।"
  },
  {
    id: "t10_q16",
    question: "Why should `eval()` be avoided when handling untrusted user input in production web applications?",
    options: [
      "Security Risk: `eval()` executes arbitrary Python code, allowing malicious users to execute dangerous system commands",
      "Because `eval()` only works in Python 2",
      "Because `eval()` makes the screen flicker",
      "Because `eval()` deletes variables"
    ],
    correct: 0,
    explanationEn: "`eval()` poses a severe code-injection security vulnerability if passed un-sanitized external input.",
    explanationBn: "`eval()` এর মাধ্যমে ক্ষতিকর কোড চালিয়ে সিস্টেমের ক্ষতি করা সম্ভব, তাই নিরাপত্তার স্বার্থে এটি সতর্কতার সাথে ব্যবহার করতে হয়।"
  },
  {
    id: "t10_q17",
    question: "Consider:\nx = int(input('Enter x: '))  # User enters 5\ny = int(input('Enter y: '))  # User enters 2\nprint(x ** y)\nWhat is the output?",
    options: [
      "25 (5 to power 2)",
      "10",
      "52",
      "7"
    ],
    correct: 0,
    explanationEn: "With explicit `int()` typecasting, `5 ** 2 = 25` arithmetic exponentiation executes correctly.",
    explanationBn: "ইন্টিজারে রূপান্তরের ফলে ৫ ** ২ = ২৫ সঠিক গাণিতিক ফলাফল প্রদর্শিত হয়।"
  },
  {
    id: "t10_q18",
    question: "What is the default delimiter used by `split()` when no argument is supplied (e.g. `input().split()`)?",
    options: [
      "Any whitespace character (spaces, tabs, newlines) of any consecutive length",
      "Commas only",
      "Semicolons only",
      "Periods only"
    ],
    correct: 0,
    explanationEn: "`split()` with no arguments splits by consecutive whitespace runs (spaces, tabs) automatically.",
    explanationBn: "কোনো আর্গুমেন্ট না দিলে `split()` ডিফল্টভাবে যেকোনো হোয়াইটস্পেস (স্পেস, ট্যাব) দিয়ে বিভক্ত করে।"
  },
  {
    id: "t10_q19",
    question: "Consider: `a, b = input().split()`. If the user inputs only a single word `'Hello'` and presses Enter, what happens?",
    options: [
      "`ValueError: not enough values to unpack (expected 2, got 1)`",
      "`b` becomes empty string",
      "`b` becomes None",
      "SyntaxError"
    ],
    correct: 0,
    explanationEn: "Unpacking expects 2 items, but `split()` produced only 1 item, raising a runtime `ValueError`.",
    explanationBn: "বামপাশে ২টি চলক কিন্তু ইনপুটে ১টি শব্দ থাকায় `ValueError` ঘটে।"
  },
  {
    id: "t10_q20",
    question: "What function can be used to safely parse string literals into Python objects without security risks of `eval()`?",
    options: [
      "`ast.literal_eval()`",
      "`safe_eval()`",
      "`parse()`",
      "`json_read()`"
    ],
    correct: 0,
    explanationEn: "The standard library function `ast.literal_eval()` safely evaluates strings containing only literal structures (strings, numbers, tuples, lists, dicts, booleans, None).",
    explanationBn: "`ast.literal_eval()` কোনো ক্ষতিকর কোড না চালিয়ে নিরাপদে লিটারেল স্ট্রিং পার্স করার নিরাপদ মাধ্যম।"
  },
  {
    id: "t10_q21",
    question: "How do you strip leading and trailing whitespace from user input?",
    options: [
      "`user_input = input().strip()`",
      "`user_input = input().clean()`",
      "`user_input = input().remove_spaces()`",
      "`user_input = trim(input())`"
    ],
    correct: 0,
    explanationEn: "The `.strip()` method removes leading and trailing whitespace from the returned string.",
    explanationBn: "`.strip()` মেথড ব্যবহারকারীর ইনপুটের শুরু ও শেষের অতিরিক্ত স্পেস মুছে দেয়।"
  },
  {
    id: "t10_q22",
    question: "What is the output of `type(int(input()))` in Python?",
    options: [
      "`<class 'int'>`",
      "`<class 'str'>`",
      "`<class 'float'>`",
      "`<class 'number'>`"
    ],
    correct: 0,
    explanationEn: "Wrapping with `int()` converts the output into an instance of `<class 'int'>`.",
    explanationBn: "`int()` এ রূপান্তর করার পর টাইপ হয় `<class 'int'>`।"
  },
  {
    id: "t10_q23",
    question: "Can `float(input())` accept an integer like `42`?",
    options: [
      "Yes, it successfully converts integer `42` to float `42.0`",
      "No, it throws a ValueError",
      "Only if user types 42.0 explicitly",
      "Only in Python 2"
    ],
    correct: 0,
    explanationEn: "`float()` can seamlessly parse whole numbers into floating-point equivalents (e.g. `'42'` becomes `42.0`).",
    explanationBn: "`float()` পূর্ণসংখ্যার স্ট্রিং গ্রহণ করে তাকে দশমিক সংখ্যায় (৪২.০) রূপান্তর করতে পারে।"
  },
  {
    id: "t10_q24",
    question: "What happens in Python 2 `raw_input()` vs Python 3 `input()`?",
    options: [
      "In Python 3, `input()` replaced Python 2's `raw_input()` and always returns a string; Python 2's `input()` evaluated code automatically",
      "Python 3 removed input completely",
      "There is no difference",
      "Python 2 did not support keyboard input"
    ],
    correct: 0,
    explanationEn: "Python 2 had `raw_input()` (returned string) and `input()` (auto-evaluated). Python 3 unified this into `input()` which always returns a safe string.",
    explanationBn: "পাইথন ৩-এ `input()` ফাংশনটিকে নিরাপদ করা হয়েছে যাতে এটি সর্বদা স্ট্রিং হিসেবে ডেটা গ্রহণ করে।"
  },
  {
    id: "t10_q25",
    question: "Why is explicit type conversion essential after reading from `input()` in CBSE Class 11 programming?",
    options: [
      "Because mathematical calculations and relational comparisons require numeric data types rather than strings",
      "Because Python will crash without typecasting",
      "Because numbers use more memory than strings",
      "Because CBSE requires typecasting on every line"
    ],
    correct: 0,
    explanationEn: "Arithmetic operations (like `+`, `-`, `*`, `/`) behave differently on strings vs numbers, making explicit typecasting mandatory for mathematical accuracy.",
    explanationBn: "গাণিতিক হিসাবের জন্য স্ট্রিংকে সংখ্যায় রূপান্তর করা আবশ্যক, অন্যথায় ভুল ফলাফল (যেমন যোগের বদলে কনক্যাটেনেশন) হতে পারে।"
  }
];
