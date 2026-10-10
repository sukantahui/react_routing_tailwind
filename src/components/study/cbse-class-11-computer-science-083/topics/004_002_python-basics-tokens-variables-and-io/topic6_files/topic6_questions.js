export const topic6Questions = [
  {
    id: "t6_q1",
    question: "What does the term 'l-value' literally stand for in programming language semantics?",
    options: [
      "Locator Value (or Left-hand side value representing a mutable memory target)",
      "Loop Value",
      "Literal Value",
      "Low-level Value"
    ],
    correct: 0,
    explanationEn: "'l-value' stands for Locator Value (or Left-hand side), representing an entity that refers to an assignable memory target.",
    explanationBn: "'l-value' মানে হলো Locator Value (বা Left-hand value) যা মেমরির এমন একটি লক্ষ্য নির্দেশ করে যেখানে মান রাখা বা বাইন্ড করা যায়।"
  },
  {
    id: "t6_q2",
    question: "What does the term 'r-value' stand for?",
    options: [
      "Read Value (or Right-hand side expression that produces a data value)",
      "Register Value",
      "Root Value",
      "Random Value"
    ],
    correct: 0,
    explanationEn: "'r-value' stands for Read Value (or Right-hand side), representing an evaluated data expression that can be read.",
    explanationBn: "'r-value' মানে Read Value যা অ্যাসাইনমেন্টের ডানপাশে বসে এবং একটি গণনাকৃত ডেটা মান নির্দেশ করে।"
  },
  {
    id: "t6_q3",
    question: "In the assignment statement `x = a + 10`, what are the roles of `x` and `a + 10`?",
    options: [
      "`x` is the l-value (target), and `a + 10` is the r-value (expression)",
      "`x` is r-value, `a + 10` is l-value",
      "Both are l-values",
      "Both are r-values"
    ],
    correct: 0,
    explanationEn: "`x` on the left is the target variable (l-value), while `a + 10` on the right is the evaluated expression (r-value).",
    explanationBn: "বামপাশের `x` হলো l-value (টার্গেট) এবং ডানপাশের `a + 10` হলো r-value (গণনাকৃত মান)।"
  },
  {
    id: "t6_q4",
    question: "What error is raised if you execute: `10 = a` in Python?",
    options: [
      "`SyntaxError: cannot assign to literal`",
      "`TypeError`",
      "`ValueError`",
      "`NameError`"
    ],
    correct: 0,
    explanationEn: "`10` is a constant literal, not a mutable variable locator target. Python raises `SyntaxError: cannot assign to literal`.",
    explanationBn: "`10` একটি ধ্রুবক লিটারেল হওয়ায় এতে মান নির্ধারণ সম্ভব নয় এবং `SyntaxError: cannot assign to literal` তৈরি হয়।"
  },
  {
    id: "t6_q5",
    question: "What error is raised by the statement: `x + 2 = y`?",
    options: [
      "`SyntaxError: cannot assign to expression`",
      "`ZeroDivisionError`",
      "`IndexError`",
      "`TypeError`"
    ],
    correct: 0,
    explanationEn: "`x + 2` is an arithmetic expression that yields an r-value, not an assignable l-value. Python raises `SyntaxError: cannot assign to expression`.",
    explanationBn: "`x + 2` একটি গাণিতিক এক্সপ্রেশন যা কোনো চলক নয়, তাই এতে অ্যাসাইন করলে `SyntaxError: cannot assign to expression` দেয়।"
  },
  {
    id: "t6_q6",
    question: "Which of the following is a VALID l-value in Python?",
    options: [
      "`student_marks[0]` (subscripted list element)",
      "`100`",
      "`a + b`",
      "`len('Python')`"
    ],
    correct: 0,
    explanationEn: "A list element subscript `student_marks[0]` is a valid l-value capable of receiving a new object reference.",
    explanationBn: "লিস্টের উপাদান `student_marks[0]` একটি বৈধ l-value যেখানে নতুন মান নির্ধারণ করা যায়।"
  },
  {
    id: "t6_q7",
    question: "What error occurs if you try to assign to a function call: `len(name) = 5`?",
    options: [
      "`SyntaxError: cannot assign to function call`",
      "`TypeError`",
      "`NameError`",
      "`ValueError`"
    ],
    correct: 0,
    explanationEn: "Function calls return temporary r-values and cannot serve as left-hand side assignment targets (l-values).",
    explanationBn: "ফাংশন কল একটি r-value ফেরত দেয়, তাই একে l-value হিসেবে ব্যবহার করলে `SyntaxError` দেখা দেয়।"
  },
  {
    id: "t6_q8",
    question: "Can an l-value also be used as an r-value in another expression?",
    options: [
      "Yes, any variable (l-value) can be read on the right-hand side as an r-value (e.g. `y = x`)",
      "No, l-values can never appear on the right side",
      "Only in Python 2",
      "Only for floating-point numbers"
    ],
    correct: 0,
    explanationEn: "Variables can freely serve as l-values (when assigned to) or r-values (when their contents are read in expressions).",
    explanationBn: "হ্যাঁ, যেকোনো ভেরিয়েবল বামপাশে l-value হিসেবে এবং ডানপাশে r-value হিসেবে মান পাঠাতে পারে।"
  },
  {
    id: "t6_q9",
    question: "What is the order of evaluation in an assignment statement `LHS = RHS`?",
    options: [
      "The entire RHS (r-value) is evaluated FIRST to produce a value, then bound to the LHS (l-value)",
      "LHS is evaluated first, then RHS",
      "Both are evaluated at the exact same nanosecond",
      "RHS is evaluated only if LHS is empty"
    ],
    correct: 0,
    explanationEn: "Python always evaluates the right-hand expression completely before binding the resulting object reference to the left-hand target.",
    explanationBn: "পাইথন প্রথমে ডানপাশের পুরো এক্সপ্রেশনের মান গণনা করে, তারপর সেই মান বামপাশের চলকে যুক্ত করে।"
  },
  {
    id: "t6_q10",
    question: "In the multiple assignment `a, b = 10, 20`, what constitutes the l-value?",
    options: [
      "The tuple of target identifiers `(a, b)`",
      "`10`",
      "`20`",
      "`=`"
    ],
    correct: 0,
    explanationEn: "The tuple of identifiers `(a, b)` forms the compound l-value target for sequence unpacking.",
    explanationBn: "চলক জোড়া `(a, b)` হলো আনপ্যাকিংয়ের জন্য যৌগিক l-value টার্গেট।"
  },
  {
    id: "t6_q11",
    question: "Why does the statement `x = x + 1` execute without error in Python despite `x` appearing on both sides?",
    options: [
      "`x` on the RHS is evaluated as an r-value first, 1 is added, and the resulting new object is bound to `x` as an l-value",
      "Because Python cancels out x from both sides",
      "Because 1 equals 0 in binary",
      "Because x is deleted"
    ],
    correct: 0,
    explanationEn: "RHS `x + 1` reads the current value of `x` (r-value), creates a new incremented integer, and rebinds LHS `x` (l-value).",
    explanationBn: "ডানপাশের `x` থেকে মান পড়ে (r-value) ১ যোগ করা হয়, তারপর নতুন মানটি বামপাশের `x` (l-value)-এ প্রতিস্থাপন করা হয়।"
  },
  {
    id: "t6_q12",
    question: "Which of the following statements demonstrates an ILLEGAL l-value assignment?",
    options: [
      "`x * y = 50`",
      "`total = 50`",
      "`data['key'] = 50`",
      "`items[2] = 50`"
    ],
    correct: 0,
    explanationEn: "`x * y` is an arithmetic expression, which cannot be an l-value.",
    explanationBn: "`x * y` একটি গাণিতিক এক্সপ্রেশন, যা কোনো বৈধ l-value নয়।"
  },
  {
    id: "t6_q13",
    question: "What is the token role of `student['grade']` in the statement `student['grade'] = 'A'`?",
    options: [
      "A dictionary subscript acting as a valid l-value target",
      "A function call",
      "A numeric literal",
      "A keyword"
    ],
    correct: 0,
    explanationEn: "Dictionary key subscripting `student['grade']` is a valid l-value for mapping assignment.",
    explanationBn: "ডিকশনারির কী-সাবস্ক্রিপ্ট একটি বৈধ l-value হিসেবে কাজ করছে।"
  },
  {
    id: "t6_q14",
    question: "Why is `\"abc\" = str1` invalid?",
    options: [
      "Because string literal `\"abc\"` cannot be an l-value target",
      "Because strings cannot be compared",
      "Because str1 is a reserved word",
      "Because quotes are missing"
    ],
    correct: 0,
    explanationEn: "String literals are immutable constants that cannot act as l-value storage targets.",
    explanationBn: "স্ট্রিং লিটারেল একটি ধ্রুবক মান হওয়ায় এটি l-value টার্গেট হতে পারে না।"
  },
  {
    id: "t6_q15",
    question: "Consider: `a = b = c = 0`. What is this assignment style called?",
    options: [
      "Chained Assignment (multiple l-values bound to a single r-value)",
      "Loop assignment",
      "Bitwise assignment",
      "Recursive assignment"
    ],
    correct: 0,
    explanationEn: "Chained assignment assigns a single r-value (`0`) to multiple l-value variables (`a`, `b`, `c`) simultaneously.",
    explanationBn: "চেইনড অ্যাসাইনমেন্টে একটিমাত্র r-value একাধিক l-value চলকে একসাথে বরাদ্দ করা হয়।"
  },
  {
    id: "t6_q16",
    question: "What is the l-value in the augmented assignment statement `count += 5`?",
    options: [
      "`count`",
      "`5`",
      "`+=`",
      "`count + 5`"
    ],
    correct: 0,
    explanationEn: "In `count += 5`, the variable `count` acts as both the initial r-value and the target l-value for the addition result.",
    explanationBn: "`count += 5` স্টেটমেন্টে `count` চলকটি l-value টার্গেট হিসেবে কাজ করে।"
  },
  {
    id: "t6_q17",
    question: "Which of the following can NEVER be an l-value in Python?",
    options: [
      "A numeric constant literal (e.g. `250`)",
      "A variable identifier (e.g. `score`)",
      "A list index (e.g. `arr[0]`)",
      "An object attribute (e.g. `car.speed`)"
    ],
    correct: 0,
    explanationEn: "A numeric literal is a constant value and can never act as a target memory location (l-value).",
    explanationBn: "নিউমেরিক লিটারেল ধ্রুবক হওয়ায় তা কখনোই l-value হতে পারে না।"
  },
  {
    id: "t6_q18",
    question: "What happens when you execute `a, b, c = 10, 20` (3 l-values, 2 r-values)?",
    options: [
      "`ValueError: not enough values to unpack (expected 3, got 2)`",
      "`c` becomes 0 automatically",
      "`c` becomes None",
      "SyntaxError"
    ],
    correct: 0,
    explanationEn: "Mismatched unpacking targets trigger `ValueError: not enough values to unpack` at runtime.",
    explanationBn: "বামপাশে ৩টি এবং ডানপাশে ২টি মান থাকলে পাইথন `ValueError` তৈরি করে।"
  },
  {
    id: "t6_q19",
    question: "What happens when you execute `a, b = 10, 20, 30` (2 l-values, 3 r-values)?",
    options: [
      "`ValueError: too many values to unpack (expected 2)`",
      "30 is discarded silently",
      "SyntaxError",
      "`a` becomes a tuple"
    ],
    correct: 0,
    explanationEn: "Too many r-values for fewer l-value targets triggers `ValueError: too many values to unpack`.",
    explanationBn: "বামপাশের চেয়ে ডানপাশে বেশি মান থাকলে `ValueError: too many values to unpack` ঘটে।"
  },
  {
    id: "t6_q20",
    question: "In object-oriented Python, can an object attribute `self.name` act as an l-value?",
    options: [
      "Yes, `self.name = 'Amit'` is a standard l-value attribute binding",
      "No, only local variables can be l-values",
      "Only if name is an integer",
      "Only in Python 2"
    ],
    correct: 0,
    explanationEn: "Object attributes like `self.name` or `car.color` are fully valid l-values in Python.",
    explanationBn: "হ্যাঁ, অবজেক্টের বৈশিষ্ট্য বা অ্যাট্রিবিউট (`self.name`) একটি সম্পূর্ণ বৈধ l-value।"
  },
  {
    id: "t6_q21",
    question: "What is an expression that yields a value called in Python?",
    options: [
      "r-value",
      "l-value",
      "Punctuator",
      "Comment"
    ],
    correct: 0,
    explanationEn: "Any expression producing a value that can be read or evaluated is categorized as an r-value.",
    explanationBn: "যেকোনো মান প্রকাশকারী বা গণনাকৃত এক্সপ্রেশনকে r-value বলা হয়।"
  },
  {
    id: "t6_q22",
    question: "What error is raised by `True = 1` in Python 3?",
    options: [
      "`SyntaxError: cannot assign to True`",
      "`TypeError`",
      "`ValueError`",
      "`NameError`"
    ],
    correct: 0,
    explanationEn: "In Python 3, `True`, `False`, and `None` are reserved keywords and cannot be assigned to as l-values.",
    explanationBn: "পাইথন ৩-এ `True` একটি সংরক্ষিত কিওয়ার্ড হওয়ায় এতে মান নির্ধারণ করলে `SyntaxError` হয়।"
  },
  {
    id: "t6_q23",
    question: "What is the result of `x, *y = [1, 2, 3, 4]` (Extended Unpacking - PEP 3132)?",
    options: [
      "`x = 1` and `y = [2, 3, 4]`",
      "`x = [1, 2]` and `y = [3, 4]`",
      "ValueError",
      "`x = 1` and `y = 4`"
    ],
    correct: 0,
    explanationEn: "Extended unpacking with starred l-value `*y` collects all remaining elements into a list: `x = 1`, `y = [2, 3, 4]`.",
    explanationBn: "স্টারযুক্ত l-value `*y` বাকি সব উপাদানকে লিস্ট আকারে ধারণ করে: `x = 1`, `y = [2, 3, 4]`।"
  },
  {
    id: "t6_q24",
    question: "Can a Tuple element `t[0]` serve as an l-value target (e.g. `t[0] = 50`)?",
    options: [
      "No, because tuples are IMMUTABLE, raising `TypeError: 'tuple' object does not support item assignment`",
      "Yes, tuples are mutable",
      "Only if the tuple has 1 element",
      "Only in Python 3.12"
    ],
    correct: 0,
    explanationEn: "Tuples are immutable; their individual items cannot serve as l-value assignment targets, triggering a `TypeError`.",
    explanationBn: "টিউপল অপরিবর্তনীয় (Immutable) হওয়ায় এর কোনো উপাদান l-value হিসেবে মান গ্রহণ করতে পারে না (`TypeError` দেয়)।"
  },
  {
    id: "t6_q25",
    question: "Why is the distinction between l-value and r-value fundamental for CBSE Class 11 board exams?",
    options: [
      "Because students must be able to spot illegal assignment syntax errors and understand variable mutation mechanics in tracing questions",
      "Because computers cannot calculate without l-values",
      "To distinguish Python from HTML",
      "Because l-values take up 64 bits of RAM"
    ],
    correct: 0,
    explanationEn: "Understanding l-value and r-value mechanics prevents common syntax mistakes (like `10 = x` or `a+b = c`) and powers accurate code tracing.",
    explanationBn: "l-value এবং r-value এর নিয়ম জানা থাকলে ভুল অ্যাসাইনমেন্টের এরর শনাক্ত ও কোড ট্রেসিং নির্ভুলভাবে করা যায়।"
  }
];
