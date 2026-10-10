export const topic12Questions = [
  {
    id: "t12_q1",
    question: "Which file extension is standard for saving Python script source code files?",
    options: [
      "`.py`",
      "`.python`",
      "`.pyc`",
      "`.pys`"
    ],
    correct: 0,
    explanationEn: "Python source files are conventionally saved with the `.py` file extension.",
    explanationBn: "পাইথন সোর্স কোড ফাইল সাধারণভাবে `.py` এক্সটেনশনে সংরক্ষিত হয়।"
  },
  {
    id: "t12_q2",
    question: "What is the primary advantage of script mode over interactive mode (REPL) in Python?",
    options: [
      "Code can be permanently saved, edited, reused, and run as a complete module",
      "It executes without needing a Python interpreter",
      "It executes 100 times faster than compiled C++",
      "Variables in script mode never consume RAM"
    ],
    correct: 0,
    explanationEn: "Script mode allows developers to save extensive code to `.py` files on disk for execution and distribution.",
    explanationBn: "স্ক্রিপ্ট মোডের প্রধান সুবিধা হলো কোড স্থায়ীভাবে ফাইলে সংরক্ষণ, সম্পাদন ও পুনঃব্যবহার করা যায়।"
  },
  {
    id: "t12_q3",
    question: "Which of the following represents an illegal assignment statement in Python?",
    options: [
      "`100 = score`",
      "`score = 100`",
      "`a = b = c = 0`",
      "`x, y = 10, 20`"
    ],
    correct: 0,
    explanationEn: "The left-hand side must be an l-value (variable/storage). `100` is a literal constant (r-value only), so `100 = score` raises `SyntaxError`.",
    explanationBn: "অ্যাসাইনমেন্টের বামপাশে l-value থাকতে হয়। `100 = score` একটি সিনট্যাক্স এরর সৃষ্টি করে।"
  },
  {
    id: "t12_q4",
    question: "What is the memory address of an object inspected with in Python?",
    options: [
      "`id(obj)`",
      "`mem(obj)`",
      "`address(obj)`",
      "`loc(obj)`"
    ],
    correct: 0,
    explanationEn: "`id()` returns the unique integer identity (memory location) of an object during its lifetime.",
    explanationBn: "`id()` ফাংশন মেমোরিতে অবজেক্টের ইউনিক অ্যাড্রেস নির্দেশ করে।"
  },
  {
    id: "t12_q5",
    question: "Which of the following is a valid Python identifier?",
    options: [
      "`_total_marks`",
      "`2nd_player`",
      "`for`",
      "`roll-no`"
    ],
    correct: 0,
    explanationEn: "`_total_marks` is valid. `2nd_player` starts with a digit, `for` is a keyword, and `roll-no` contains a hyphen.",
    explanationBn: "`_total_marks` একটি বৈধ আইডেন্টিফায়ার কারণ এটি আন্ডারস্কোর দিয়ে শুরু হয়েছে।"
  },
  {
    id: "t12_q6",
    question: "Which three keywords in Python begin with an uppercase letter?",
    options: [
      "`True`, `False`, `None`",
      "`If`, `Else`, `While`",
      "`Def`, `Class`, `Return`",
      "`And`, `Or`, `Not`"
    ],
    correct: 0,
    explanationEn: "Only `True`, `False`, and `None` begin with a capital letter in Python 3.",
    explanationBn: "পাইথনে শুধুমাত্র `True`, `False`, এবং `None` ক্যাপিটাল লেটার দিয়ে শুরু হয়।"
  },
  {
    id: "t12_q7",
    question: "What will `print(type(input('Enter value: ')))` output if the user enters `100`?",
    options: [
      "`<class 'str'>`",
      "`<class 'int'>`",
      "`<class 'float'>`",
      "`<class 'NoneType'>`"
    ],
    correct: 0,
    explanationEn: "`input()` always returns a string (`str`), regardless of numerical user input.",
    explanationBn: "`input()` সর্বদা স্ট্রিং হিসেবে মান প্রদান করে, তাই আউটপুট হবে `<class 'str'>`।"
  },
  {
    id: "t12_q8",
    question: "What will `print('A', 'B', sep='*', end='#')` output?",
    options: [
      "`A*B#`",
      "`A B*#`",
      "`*A*B#`",
      "`A*B\\n#`"
    ],
    correct: 0,
    explanationEn: "Arguments `'A'` and `'B'` are joined with `*` and followed by end character `#` without newline.",
    explanationBn: "`sep='*'` মাঝে স্টার বসায় এবং `end='#'` শেষে হ্যাশ বসায়।"
  },
  {
    id: "t12_q9",
    question: "What is the value of `0b1010` in decimal?",
    options: [
      "`10`",
      "`1010`",
      "`8`",
      "`12`"
    ],
    correct: 0,
    explanationEn: "`0b1010` is binary for `1*8 + 0*4 + 1*2 + 0*1 = 10`.",
    explanationBn: "`0b1010` বাইনারি সংখ্যার দশমিক মান হলো ১০।"
  },
  {
    id: "t12_q10",
    question: "What character begins a single-line comment in Python?",
    options: [
      "`#`",
      "`//`",
      "`/*`",
      "`--`"
    ],
    correct: 0,
    explanationEn: "Python uses the hash character `#` for single-line comments.",
    explanationBn: "পাইথনে এক লাইনের কমেন্ট শুরু করতে `#` চিহ্ন ব্যবহার করা হয়।"
  },
  {
    id: "t12_q11",
    question: "Which special attribute stores a function's docstring?",
    options: [
      "`__doc__`",
      "`__help__`",
      "`__info__`",
      "`__comment__`"
    ],
    correct: 0,
    explanationEn: "PEP 257 docstrings are attached to the object's `__doc__` attribute.",
    explanationBn: "ডকস্ট্রিং অবজেক্টের `__doc__` অ্যাট্রিবিউটে সংরক্ষিত থাকে।"
  },
  {
    id: "t12_q12",
    question: "What happens when `x = 5` is followed by `x = 'Hello'` in Python?",
    options: [
      "Dynamic typing rebinds the label `x` to a new string object",
      "A `TypeError` is raised because integers cannot change to strings",
      "The value `'Hello'` is mathematically converted to `5`",
      "Python crashes"
    ],
    correct: 0,
    explanationEn: "Python is dynamically typed; variable names are simply labels that can reference objects of any type during runtime.",
    explanationBn: "পাইথনে ডায়নামিক টাইপিংয়ের মাধ্যমে ভেরিয়েবল যেকোনো ধরণের নতুন অবজেক্টের সাথে যুক্ত হতে পারে।"
  },
  {
    id: "t12_q13",
    question: "Which of the following is a punctuator / delimiter in Python?",
    options: [
      "`:` (colon)",
      "`while`",
      "`45.8`",
      "`my_var`"
    ],
    correct: 0,
    explanationEn: "Colons, commas, brackets, and equal signs are punctuators/delimiters in Python grammar.",
    explanationBn: "কোলন (`:`) পাইথনের একটি পাংচুয়েটর বা ডেলিমিটার।"
  },
  {
    id: "t12_q14",
    question: "What is the output of `int(float('15.85'))`?",
    options: [
      "`15`",
      "`15.85`",
      "`16`",
      "`ValueError`"
    ],
    correct: 0,
    explanationEn: "`float('15.85')` becomes `15.85`, and `int(15.85)` truncates the fractional part to `15`.",
    explanationBn: "প্রথমে স্ট্রিংটি ফ্লোট `15.85` হয় এবং `int()` একে `15` তে রূপান্তর করে।"
  },
  {
    id: "t12_q15",
    question: "Which function displays the interactive documentation and help manual for any Python object?",
    options: [
      "`help()`",
      "`doc()`",
      "`manual()`",
      "`guide()`"
    ],
    correct: 0,
    explanationEn: "`help(obj)` invokes the built-in interactive help utility to render the object's docstring and signature.",
    explanationBn: "`help()` ফাংশন অবজেক্টের ডকুমেন্টেশন প্রদর্শন করে।"
  },
  {
    id: "t12_q16",
    question: "What is the output of `print(1, 2, 3, sep='-')`?",
    options: [
      "`1-2-3`",
      "`1 2 3`",
      "`-1-2-3`",
      "`1-2-3-`"
    ],
    correct: 0,
    explanationEn: "`sep='-'` places hyphens between the three arguments, producing `1-2-3`.",
    explanationBn: "`sep='-'` এর কারণে আউটপুট হবে `1-2-3`।"
  },
  {
    id: "t12_q17",
    question: "What is the return type of the comparison `5 == 5.0`?",
    options: [
      "`bool` (value: `True`)",
      "`int` (value: `1`)",
      "`float`",
      "`None`"
    ],
    correct: 0,
    explanationEn: "The equality operator `==` compares numeric value across types and returns the boolean `True`.",
    explanationBn: "সংখ্যার মান সমান হওয়ায় `5 == 5.0` বুলিয়ান `True` প্রদান করে।"
  },
  {
    id: "t12_q18",
    question: "What is the effect of an underscore in numeric literals, e.g., `1_000_000`?",
    options: [
      "Ignored by Python interpreter; used purely for human readability",
      "Converts number to string",
      "Raises SyntaxError",
      "Creates a private integer"
    ],
    correct: 0,
    explanationEn: "PEP 515 introduced underscores in numeric literals as visual digit separators with no effect on numeric value.",
    explanationBn: "সংখ্যার মাঝে আন্ডারস্কোর শুধুমাত্র মানুষের পড়ার সুবিধার জন্য ব্যবহৃত হয় এবং পাইথন এটি উপেক্ষা করে।"
  },
  {
    id: "t12_q19",
    question: "Which escape sequence inserts a horizontal tab?",
    options: [
      "`\\t`",
      "`\\n`",
      "`\\h`",
      "`\\tab`"
    ],
    correct: 0,
    explanationEn: "`\\t` inserts a horizontal tab space.",
    explanationBn: "`\\t` অনুভূমিক ট্যাব স্পেস যোগ করে।"
  },
  {
    id: "t12_q20",
    question: "What will `a = b = 50` do in Python memory?",
    options: [
      "Both labels `a` and `b` reference the same integer object `50`",
      "Creates two separate duplicate objects in two memory addresses",
      "Raises SyntaxError",
      "Deletes `a`"
    ],
    correct: 0,
    explanationEn: "Chained assignment binds both `a` and `b` to the identical integer object in memory.",
    explanationBn: "উভয় ভেরিয়েবল `a` এবং `b` মেমোরির একই অবজেক্ট `50`-কে নির্দেশ করে।"
  },
  {
    id: "t12_q21",
    question: "Which of the following is NOT a keyword in Python 3.12?",
    options: [
      "`eval`",
      "`yield`",
      "`async`",
      "`pass`"
    ],
    correct: 0,
    explanationEn: "`eval` is a built-in function, NOT a reserved language keyword.",
    explanationBn: "`eval` একটি বিল্ট-ইন ফাংশন, এটি সংরক্ষিত কীওয়ার্ড নয়।"
  },
  {
    id: "t12_q22",
    question: "What is the value of `type(None)`?",
    options: [
      "`<class 'NoneType'>`",
      "`<class 'null'>`",
      "`<class 'void'>`",
      "`<class 'None'>`"
    ],
    correct: 0,
    explanationEn: "`None` is the sole singleton instance of the `NoneType` class.",
    explanationBn: "`None` হলো `NoneType` ক্লাসের অবজেক্ট।"
  },
  {
    id: "t12_q23",
    question: "How can two variable values `x` and `y` be swapped cleanly in one statement in Python?",
    options: [
      "`x, y = y, x`",
      "`swap(x, y)`",
      "`x = y and y = x`",
      "`x <-> y`"
    ],
    correct: 0,
    explanationEn: "Python supports tuple packing and unpacking: `x, y = y, x` swaps both variables simultaneously without a temp variable.",
    explanationBn: "`x, y = y, x` কোনো তৃতীয় ভেরিয়েবল ছাড়াই দুটি মানের স্থান পরিবর্তন করে।"
  },
  {
    id: "t12_q24",
    question: "What will `print('10' + '20')` output?",
    options: [
      "`1020`",
      "`30`",
      "`TypeError`",
      "`None`"
    ],
    correct: 0,
    explanationEn: "Because both operands are strings, `+` performs string concatenation.",
    explanationBn: "দুটোই স্ট্রিং হওয়ায় কনক্যাটেনেশন হয়ে `1020` প্রিন্ট হবে।"
  },
  {
    id: "t12_q25",
    question: "Which operator checks if two variable references point to the exact same memory address?",
    options: [
      "`is`",
      "`==`",
      "`eq`",
      "`===`"
    ],
    correct: 0,
    explanationEn: "`is` checks object identity (`id(a) == id(b)`), whereas `==` checks value equality.",
    explanationBn: "`is` অপারেটর দুটি ভেরিয়েবল মেমোরির একই ঠিকানা নির্দেশ করছে কিনা তা পরীক্ষা করে।"
  }
];
