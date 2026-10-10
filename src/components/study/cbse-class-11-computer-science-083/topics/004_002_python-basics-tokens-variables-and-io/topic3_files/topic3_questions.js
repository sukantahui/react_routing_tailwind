export const topic3Questions = [
  {
    id: "t3_q1",
    question: "What is a 'Literal' in Python?",
    options: [
      "A raw, fixed constant data value written directly into the source code",
      "A variable whose value changes during runtime",
      "A hardware processor register",
      "An operating system shell command"
    ],
    correct: 0,
    explanationEn: "A literal represents a constant, immutable data value directly embedded in source code (e.g., `42`, `'Hello'`, `3.14`, `True`).",
    explanationBn: "লিটারেল (Literal) হলো সোর্স কোডে সরাসরি লিখিত নির্দিষ্ট ও অপরিবর্তনীয় ধ্রুবক ডেটা মান।"
  },
  {
    id: "t3_q2",
    question: "Which prefix is used to write an Integer Literal in Binary (Base-2) in Python?",
    options: [
      "`0b` or `0B`",
      "`0o` or `0O`",
      "`0x` or `0X`",
      "`bin:`"
    ],
    correct: 0,
    explanationEn: "Binary integer literals are prefixed with `0b` or `0B` followed by binary digits (0 and 1). E.g. `0b1010` = 10.",
    explanationBn: "বাইনারি লিটারেল লেখার জন্য `0b` বা `0B` প্রিফিক্স ব্যবহার করা হয়। যেমন: `0b1010` = ১০।"
  },
  {
    id: "t3_q3",
    question: "What will `print(0b1101)` output in Python?",
    options: [
      "13",
      "1101",
      "0b1101",
      "14"
    ],
    correct: 0,
    explanationEn: "`0b1101` is binary: 1*(2^3) + 1*(2^2) + 0*(2^1) + 1*(2^0) = 8 + 4 + 0 + 1 = 13.",
    explanationBn: "`0b1101` বাইনারি থেকে ডেসিমেলে রূপান্তরিত হয়ে ১৩ আউটপুট দেয়।"
  },
  {
    id: "t3_q4",
    question: "Which prefix is used to denote an Octal (Base-8) integer literal in Python 3?",
    options: [
      "`0o` or `0O`",
      "`0` (leading zero only)",
      "`0x`",
      "`oct()`"
    ],
    correct: 0,
    explanationEn: "In Python 3, octal literals MUST use the `0o` or `0O` prefix. A standalone leading zero like `017` is a SyntaxError.",
    explanationBn: "পাইথন ৩-এ অক্টাল লিটারেলের জন্য `0o` বা `0O` প্রিফিক্স থাকা বাধ্যতামূলক।"
  },
  {
    id: "t3_q5",
    question: "What will `print(0x1F)` display in the Python console?",
    options: [
      "31",
      "1F",
      "0x1F",
      "15"
    ],
    correct: 0,
    explanationEn: "Hexadecimal `1F` is 1*16 + 15*1 = 16 + 15 = 31.",
    explanationBn: "হেক্সাডেসিমেল `1F`-এর ডেসিমেল মান হলো ৩১।"
  },
  {
    id: "t3_q6",
    question: "What is the evaluated decimal value of the scientific floating-point literal `1.2e3`?",
    options: [
      "1200.0",
      "120.0",
      "1.23",
      "0.0012"
    ],
    correct: 0,
    explanationEn: "`1.2e3` means 1.2 * 10^3 = 1.2 * 1000 = 1200.0 (float).",
    explanationBn: "`1.2e3` নির্দেশ করে ১.২ * ১০^৩ = ১২০০.০।"
  },
  {
    id: "t3_q7",
    question: "What is the evaluated value of `2.5e-2` in Python?",
    options: [
      "0.025",
      "250.0",
      "-25.0",
      "0.25"
    ],
    correct: 0,
    explanationEn: "`2.5e-2` means 2.5 * 10^(-2) = 2.5 / 100 = 0.025.",
    explanationBn: "`2.5e-2` মানে ২.৫ * ১০^(-২) = ০.০২৫।"
  },
  {
    id: "t3_q8",
    question: "Which letter is used in Python to represent the imaginary unit in Complex Number literals?",
    options: [
      "`j` or `J`",
      "`i` or `I`",
      "`c`",
      "`k`"
    ],
    correct: 0,
    explanationEn: "Python uses `j` or `J` for the imaginary unit (e.g. `3 + 4j`), following engineering conventions.",
    explanationBn: "পাইথনে জটিল সংখ্যার কাল্পনিক অংশ বোঝাতে `j` বা `J` প্রতীক ব্যবহার করা হয়।"
  },
  {
    id: "t3_q9",
    question: "Given `z = 5 + 7j`, what will `z.real` and `z.imag` return?",
    options: [
      "`5.0` and `7.0` (both floats)",
      "`5` and `7` (both ints)",
      "`5` and `'7j'`",
      "`12`"
    ],
    correct: 0,
    explanationEn: "The `.real` and `.imag` attributes of a complex number return floating-point numbers: 5.0 and 7.0.",
    explanationBn: "জটিল সংখ্যার `.real` ও `.imag` অ্যাট্রিবিউট উভয়ই ফ্লোটিং-পয়েন্ট সংখ্যা (5.0 ও 7.0) প্রদান করে।"
  },
  {
    id: "t3_q10",
    question: "What will `True + True + False` evaluate to in Python?",
    options: [
      "2",
      "True",
      "TypeError",
      "1"
    ],
    correct: 0,
    explanationEn: "In Python, `bool` is a subclass of `int`. `True` has numerical value 1 and `False` has 0. 1 + 1 + 0 = 2.",
    explanationBn: "পাইথনে `True` এর মান ১ এবং `False` এর মান ০। তাই ১ + ১ + ০ = ২।"
  },
  {
    id: "t3_q11",
    question: "What is the data type of the special literal `None` in Python?",
    options: [
      "`NoneType`",
      "`str`",
      "`void`",
      "`null`"
    ],
    correct: 0,
    explanationEn: "The literal `None` is the sole instance of the built-in type `NoneType`.",
    explanationBn: "বিশেষ লিটারেল `None` এর ডেটা টাইপ হলো `NoneType`।"
  },
  {
    id: "t3_q12",
    question: "Which of the following creates a Multiline String Literal in Python that preserves whitespace and newline breaks?",
    options: [
      "Triple quotes: `'''...'''` or `\"\"\"...\"\"\"`",
      "Single quotes: `'...'`",
      "Double quotes: `\"...\"`",
      "Square brackets: `[...]`"
    ],
    correct: 0,
    explanationEn: "Triple-quoted strings (using `'''` or `\"\"\"`) span multiple lines, preserving line breaks and indentations verbatim.",
    explanationBn: "ট্রিপল কোটেশন (`'''` বা `\"\"\"`) একাধিক লাইনে বিস্তৃত স্ট্রিং তৈরিতে ব্যবহৃত হয়।"
  },
  {
    id: "t3_q13",
    question: "What is the purpose of digit grouping underscores in integer literals (e.g. `val = 1_000_000`) introduced in PEP 515?",
    options: [
      "To enhance visual readability of large numbers without affecting the numeric value",
      "To divide by 1000",
      "To declare a tuple",
      "To convert the number to string"
    ],
    correct: 0,
    explanationEn: "Underscores inside numeric literals (PEP 515) are visual separators ignored by the interpreter: `1_000_000` is identical to `1000000`.",
    explanationBn: "বড় সংখ্যা সহজে পড়ার সুবিধার জন্য আন্ডারস্কোর ব্যবহার করা হয়; এটি মানের কোনো পরিবর্তন করে না।"
  },
  {
    id: "t3_q14",
    question: "What will be the output of `type(3.0)` in Python?",
    options: [
      "`<class 'float'>`",
      "`<class 'int'>`",
      "`<class 'decimal'>`",
      "`<class 'number'>`"
    ],
    correct: 0,
    explanationEn: "Numbers with decimal points are instantiated as `<class 'float'>` in Python.",
    explanationBn: "দশমিক বিন্দুযুক্ত সংখ্যাগুলো `<class 'float'>` টাইপের অন্তর্গত।"
  },
  {
    id: "t3_q15",
    question: "Which of the following is an INVALID numeric literal in Python 3?",
    options: [
      "`045` (leading zero without radix prefix)",
      "`0o45`",
      "`0x45`",
      "`0b101`"
    ],
    correct: 0,
    explanationEn: "In Python 3, decimal integers cannot start with a leading zero (e.g. `045`), raising `SyntaxError: leading zeros in decimal integer literals are not permitted`.",
    explanationBn: "পাইথন ৩-এ কোনো সাধারণ পূর্ণসংখ্যার শুরুতে শূন্য (যেমন `045`) লেখা অবৈধ এবং `SyntaxError` তৈরি করে।"
  },
  {
    id: "t3_q16",
    question: "What does the expression `bool(0)` and `bool(\"\")` evaluate to?",
    options: [
      "`False` for both",
      "`True` for both",
      "`False` and `True`",
      "`None`"
    ],
    correct: 0,
    explanationEn: "In Python, `0`, empty string `\"\"`, empty collections, and `None` evaluate to `False` in boolean context (falsy values).",
    explanationBn: "পাইথনে ০, ফাঁকা স্ট্রিং `\"\"`, এবং `None` সবই বুলিয়ান হিসেবে `False` মান দেয়।"
  },
  {
    id: "t3_q17",
    question: "What is the output of `print(r\"C:\\Users\\admin\\new\")`?",
    options: [
      "`C:\\Users\\admin\\new` (exact literal text)",
      "A newline after admin",
      "`SyntaxError`",
      "`C:Usersadminnew`"
    ],
    correct: 0,
    explanationEn: "Raw string `r\"...\"` ignores escape sequences, printing `\\n` as literal backslash and letter n.",
    explanationBn: "র-স্ট্রিং `r\"...\"` এস্কেপ সিকোয়েন্সকে নিষ্ক্রিয় করে হুবহু টেক্সট প্রিন্ট করে।"
  },
  {
    id: "t3_q18",
    question: "What is the value of `5 * False` in Python?",
    options: [
      "0",
      "False",
      "TypeError",
      "5"
    ],
    correct: 0,
    explanationEn: "Since `False` is numerically 0, 5 * 0 = 0.",
    explanationBn: "`False` এর মান ০ হওয়ায় ৫ * ০ = ০।"
  },
  {
    id: "t3_q19",
    question: "Which of the following is a Boolean Literal in Python?",
    options: [
      "`True`",
      "`true`",
      "`TRUE`",
      "`\"True\"`"
    ],
    correct: 0,
    explanationEn: "Only `True` (with capitalized T) is the built-in boolean literal; `true` is undefined (NameError) and `\"True\"` is a string.",
    explanationBn: "শুধুমাত্র `True` (বড় হাতের T) হলো বুলিয়ান লিটারেল; ছোট হাতের `true` লিখলে `NameError` দেয়।"
  },
  {
    id: "t3_q20",
    question: "What happens when you evaluate `3 + 0j == 3`?",
    options: [
      "`True`",
      "`False`",
      "`TypeError: cannot compare complex with int`",
      "`None`"
    ],
    correct: 0,
    explanationEn: "Python allows mixed-type numeric equality: `3 + 0j` has real part 3 and zero imaginary part, so it equals integer 3.",
    explanationBn: "পাইথনে কাল্পনিক অংশ শূন্য হলে জটিল সংখ্যা ও সাধারণ সংখ্যার সমতা `True` হয়।"
  },
  {
    id: "t3_q21",
    question: "What is a Literal Collection in Python representing an ordered, mutable sequence of items?",
    options: [
      "List Literal (e.g., `[1, 2, 3]`)",
      "Tuple Literal (e.g., `(1, 2, 3)`)",
      "Set Literal (e.g., `{1, 2, 3}`)",
      "Dictionary Literal"
    ],
    correct: 0,
    explanationEn: "Square brackets `[...]` denote a List literal, which is an ordered and mutable collection.",
    explanationBn: "বর্গাকার ব্র্যাকেট `[...]` দ্বারা লিস্ট লিটারেল তৈরি হয় যা পরিবর্তনযোগ্য (Mutable)।"
  },
  {
    id: "t3_q22",
    question: "What literal type is created by `{ \"name\": \"Amit\", \"age\": 17 }`?",
    options: [
      "Dictionary Literal (key-value mapping)",
      "Set Literal",
      "Tuple Literal",
      "String Literal"
    ],
    correct: 0,
    explanationEn: "Curly braces containing colon-separated key-value pairs create a Dictionary literal.",
    explanationBn: "কী-ভ্যালু জোড়া সম্বলিত কার্লি ব্র্যাকেট `{...}` ডিকশনারি লিটারেল নির্দেশ করে।"
  },
  {
    id: "t3_q23",
    question: "What will `print(type(None))` output?",
    options: [
      "`<class 'NoneType'>`",
      "`<class 'null'>`",
      "`<class 'void'>`",
      "`<class 'object'>`"
    ],
    correct: 0,
    explanationEn: "The type of the special literal `None` is `<class 'NoneType'>`.",
    explanationBn: "`None` লিটারেলের টাইপ হলো `<class 'NoneType'>`।"
  },
  {
    id: "t3_q24",
    question: "Why does Python support multiple literal bases (Binary, Octal, Hexadecimal)?",
    options: [
      "To allow low-level systems, bitwise logic, network mask, and hardware register manipulation with native syntax",
      "To increase game frame rates",
      "To make Python slower",
      "Because Python 3 does not support decimal math"
    ],
    correct: 0,
    explanationEn: "Multiple radix bases facilitate hardware programming, network socket addressing, cryptography, and bitwise manipulation.",
    explanationBn: "কম্পিউটার আর্কিটেকচার, নেটওয়ার্কিং, এবং বিটওয়াইজ কাজের সুবিধার জন্য একাধিক বেসের লিটারেল সমর্থন করা হয়।"
  },
  {
    id: "t3_q25",
    question: "What is the output of `print(0b10 + 0o10 + 0x10 + 10)` in Python?",
    options: [
      "36 (2 + 8 + 16 + 10)",
      "40",
      "10101010",
      "TypeError"
    ],
    correct: 0,
    explanationEn: "0b10 = 2, 0o10 = 8, 0x10 = 16, 10 = 10. Sum is 2 + 8 + 16 + 10 = 36.",
    explanationBn: "বাইনারি ২ + অক্টাল ৮ + হেক্সাডেসিমেল ১৬ + ডেসিমেল ১০ = ৩৬। আউটপুট: ৩৬।"
  }
];
