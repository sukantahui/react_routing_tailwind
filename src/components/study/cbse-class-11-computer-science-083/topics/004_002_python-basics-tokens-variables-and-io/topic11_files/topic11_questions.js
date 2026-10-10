export const topic11Questions = [
  {
    id: "t11_q1",
    question: "What is the default separator (`sep`) used by Python's `print()` function between multiple comma-separated arguments?",
    options: [
      "A single space `' '`",
      "A newline character `'\\n'`",
      "No separator `''`",
      "A comma `','`"
    ],
    correct: 0,
    explanationEn: "The default value of the `sep` keyword parameter in `print()` is a single space `' '`.",
    explanationBn: "পাইথনের `print()` ফাংশনে একাধিক মানের মাঝে ডিফল্ট সেপারেটর হলো একটি স্পেস `' '`।"
  },
  {
    id: "t11_q2",
    question: "What is the default value of the `end` keyword parameter in Python's `print()` function?",
    options: [
      "Newline character `'\\n'`",
      "Empty string `''`",
      "Single space `' '`",
      "Null character `'\\0'`"
    ],
    correct: 0,
    explanationEn: "By default, `print()` appends a newline character `\\n` at the end of its output stream, causing the next print to start on a new line.",
    explanationBn: "`print()` ফাংশনে `end`-এর ডিফল্ট মান হলো নতুন লাইন ক্যারেক্টার `'\\n'`।"
  },
  {
    id: "t11_q3",
    question: "What is the output of the following statement?\nprint('Python', 'Class', 11, sep='-')",
    options: [
      "`Python-Class-11`",
      "`Python Class 11`",
      "`Python-Class-11-`",
      "`SyntaxError`"
    ],
    correct: 0,
    explanationEn: "Setting `sep='-'` replaces the default space with hyphens between consecutive arguments, yielding `Python-Class-11`.",
    explanationBn: "`sep='-'` নির্ধারণ করায় প্রতিটি আর্গুমেন্টের মাঝে হাইফেন বসে `Python-Class-11` তৈরি হয়।"
  },
  {
    id: "t11_q4",
    question: "What will be the output of the following code snippet?\nprint('A', end='#')\nprint('B', end='#')\nprint('C')",
    options: [
      "`A#B#C`",
      "`A\\n#B\\n#C`",
      "`A#\\nB#\\nC`",
      "`#A#B#C`"
    ],
    correct: 0,
    explanationEn: "`print('A', end='#')` outputs `A#` without a newline; `print('B', end='#')` outputs `B#`; `print('C')` outputs `C` followed by default `\\n`. Combined: `A#B#C`.",
    explanationBn: "প্রথম দুটি প্রিন্টে `end='#'` থাকায় নতুন লাইনে না গিয়ে `A#B#C` একই লাইনে মুদ্রিত হয়।"
  },
  {
    id: "t11_q5",
    question: "What is printed when `print()` is called with zero arguments?",
    options: [
      "A blank newline (`\\n`)",
      "`None`",
      "`0`",
      "It raises a `TypeError`"
    ],
    correct: 0,
    explanationEn: "Calling `print()` with no arguments simply emits the default `end` character, which produces a single blank line.",
    explanationBn: "কোনো আর্গুমেন্ট ছাড়া `print()` কল করলে একটি ফাঁকা নতুন লাইন (`\\n`) প্রিন্ট হয়।"
  },
  {
    id: "t11_q6",
    question: "What is the output of the following code?\nprint('Welcome', sep='***')",
    options: [
      "`Welcome`",
      "`***Welcome`",
      "`Welcome***`",
      "`***Welcome***`"
    ],
    correct: 0,
    explanationEn: "`sep` is only inserted BETWEEN multiple items. When only a single item is passed, `sep` has no effect.",
    explanationBn: "`sep` শুধুমাত্র একাধিক আর্গুমেন্টের মাঝে বসে। মাত্র একটি আর্গুমেন্ট থাকায় `sep` কোনো প্রভাব ফেলে না।"
  },
  {
    id: "t11_q7",
    question: "Consider:\nprint(10, 20, 30, sep='', end='!')\nWhat will be displayed on the console?",
    options: [
      "`102030!`",
      "`10 20 30!`",
      "`10,20,30!`",
      "`102030\\n!`"
    ],
    correct: 0,
    explanationEn: "`sep=''` joins the three numbers with no intervening characters, and `end='!'` terminates the line with an exclamation point.",
    explanationBn: "`sep=''` সংখ্যাগুলোকে কোনো ফাঁকা স্থান ছাড়াই যুক্ত করে এবং শেষে `!` যুক্ত হয়।"
  },
  {
    id: "t11_q8",
    question: "What happens if an integer is assigned to the `sep` parameter, such as `print(1, 2, sep=0)`?",
    options: [
      "Raises `TypeError: sep must be None or a string`",
      "Prints `102`",
      "Prints `1 0 2`",
      "Raises `SyntaxError`"
    ],
    correct: 0,
    explanationEn: "In Python, both `sep` and `end` must be `str` or `None`. Passing an integer raises a `TypeError` at runtime.",
    explanationBn: "`sep` এবং `end` প্যারামিটারে শুধুমাত্র স্ট্রিং বা `None` দেওয়া যায়। পূর্ণসংখ্যা দিলে `TypeError` ঘটে।"
  },
  {
    id: "t11_q9",
    question: "What is the output of:\nprint('Hello\\tWorld')?",
    options: [
      "Hello and World separated by horizontal tab spacing",
      "`Hello\\tWorld` literally",
      "Hello and World on two separate lines",
      "A `SyntaxError`"
    ],
    correct: 0,
    explanationEn: "The escape sequence `\\t` represents a horizontal tab, inserting whitespace to align to the next tab stop.",
    explanationBn: "`\\t` এস্কেপ সিকোয়েন্স আউটপুটে অনুভূমিক ট্যাব (ট্যাব স্পেস) প্রদান করে।"
  },
  {
    id: "t11_q10",
    question: "What does the escape sequence `\\n` perform in a Python print string?",
    options: [
      "Line feed (moves cursor to the beginning of the next line)",
      "Inserts a null character",
      "Prints a backslash followed by n",
      "Negates the string"
    ],
    correct: 0,
    explanationEn: "`\\n` triggers a linefeed / newline break in the console stream.",
    explanationBn: "`\\n` কার্সারকে পরবর্তী লাইনে স্থানান্তরিত করে।"
  },
  {
    id: "t11_q11",
    question: "What will be printed by the following code?\nfor i in range(1, 4):\n    print(i, end=' ')",
    options: [
      "`1 2 3 `",
      "`1\\n2\\n3`",
      "`1, 2, 3`",
      "`123`"
    ],
    correct: 0,
    explanationEn: "Each iteration prints the number followed by a space instead of a newline, producing `1 2 3 `.",
    explanationBn: "প্রতিটি লুপ সংখ্যা প্রিন্ট করে স্পেস দেয়, ফলে `1 2 3 ` প্রদর্শিত হয়।"
  },
  {
    id: "t11_q12",
    question: "What is the purpose of the `flush=True` parameter in the `print()` function?",
    options: [
      "Forcibly flushes the output buffer to display text immediately",
      "Clears the terminal screen",
      "Flushes memory garbage collection",
      "Converts strings to uppercase"
    ],
    correct: 0,
    explanationEn: "`flush=True` ensures standard output buffers are emptied immediately to the screen without waiting for newline or buffer fullness.",
    explanationBn: "`flush=True` আউটপুট বাফারকে সাথে সাথে স্ক্রিনে ফ্ল্যাশ বা প্রদর্শন করতে বাধ্য করে।"
  },
  {
    id: "t11_q13",
    question: "What is the output of the following formatted string?\nval = 3.14159\nprint(f'{val:.2f}')",
    options: [
      "`3.14`",
      "`3.1`",
      "`3.141`",
      "`3.15`"
    ],
    correct: 0,
    explanationEn: "The specifier `:.2f` formats the float to exactly 2 decimal places with rounding, giving `3.14`.",
    explanationBn: "`:.2f` ফরম্যাট স্পেসিফায়ার দশমিকের পর ২ ঘর পর্যন্ত মান প্রদর্শন করে।"
  },
  {
    id: "t11_q14",
    question: "What is the output of the following code?\nprint('Alpha', 'Beta', sep='\\n')",
    options: [
      "Alpha\\nBeta (Alpha on first line, Beta on second line)",
      "`Alpha Beta` on one line",
      "`Alpha\\nBeta` literally",
      "`SyntaxError`"
    ],
    correct: 0,
    explanationEn: "Setting `sep='\\n'` places a newline between the two arguments, causing `Alpha` and `Beta` to appear on separate lines.",
    explanationBn: "`sep='\\n'` ব্যবহারের কারণে আর্গুমেন্ট দুটি আলাদা আলাদা লাইনে প্রিন্ট হয়।"
  },
  {
    id: "t11_q15",
    question: "What will be printed by the following code?\nx, y = 5, 10\nprint(f'{x} + {y} = {x + y}')",
    options: [
      "`5 + 10 = 15`",
      "`{x} + {y} = 15`",
      "`5 + 10 = {x + y}`",
      "`SyntaxError`"
    ],
    correct: 0,
    explanationEn: "f-strings evaluate expressions enclosed within curly braces `{}` at runtime, producing `5 + 10 = 15`.",
    explanationBn: "f-স্ট্রিং কার্লি ব্র্যাকেটের ভেতরের চলক ও এক্সপ্রেশন মূল্যায়ন করে মান বসায়।"
  },
  {
    id: "t11_q16",
    question: "What is the output of:\nprint('Data', 'Science', sep=' @ ', end=' 2026\\n')",
    options: [
      "`Data @ Science 2026`",
      "`Data Science @ 2026`",
      "`Data @ Science @ 2026`",
      "`Data @ Science\\n2026`"
    ],
    correct: 0,
    explanationEn: "The arguments are joined by ` @ `, followed by the ending string ` 2026` and newline, giving `Data @ Science 2026`.",
    explanationBn: "`sep=' @ '` শব্দ দুটির মাঝে বসে এবং শেষে ` 2026` যুক্ত হয়।"
  },
  {
    id: "t11_q17",
    question: "How can you print a raw backslash character in Python?",
    options: [
      "`print('\\\\')` or `print(r'\\')`",
      "`print('/')`",
      "`print('\\b')`",
      "`print('\\a')`"
    ],
    correct: 0,
    explanationEn: "An escaped backslash `\\\\` or raw string `r'\\'` is used to print a literal backslash.",
    explanationBn: "আউটপুটে ব্যাকস্ল্যাশ প্রিন্ট করার জন্য এস্কেপড ব্যাকস্ল্যাশ `\\\\` বা র' স্ট্রিং ব্যবহার করা হয়।"
  },
  {
    id: "t11_q18",
    question: "What is the output of the following statement?\nprint('Sun', 'Mon', 'Tue', sep=' | ')",
    options: [
      "`Sun | Mon | Tue`",
      "`Sun Mon Tue | `",
      "`| Sun | Mon | Tue |`",
      "`SunMonTue`"
    ],
    correct: 0,
    explanationEn: "`sep=' | '` separates each token with vertical pipe and spaces.",
    explanationBn: "`sep=' | '` প্রতিটি দিনের নামের মাঝে পাইপ প্রতীক বসায়।"
  },
  {
    id: "t11_q19",
    question: "Which of the following is equivalent to `print(a, b)`?",
    options: [
      "`print(a, b, sep=' ', end='\\n')`",
      "`print(a, b, sep='', end='')`",
      "`print(a, b, sep='\\t', end='\\n')`",
      "`print(a, b, sep='\\n', end=' ')`"
    ],
    correct: 0,
    explanationEn: "By default, `sep` is `' '` and `end` is `'\\n'`, so explicit declaration of these matches default behavior.",
    explanationBn: "ডিফল্টভাবে `sep=' '` এবং `end='\\n'` সক্রিয় থাকে।"
  },
  {
    id: "t11_q20",
    question: "What will be printed?\nprint('1', end='')\nprint('2', end='')\nprint('3')",
    options: [
      "`123`",
      "`1 2 3`",
      "`1\\n2\\n3`",
      "`123\\n`"
    ],
    correct: 0,
    explanationEn: "The first two calls suppress newlines with `end=''`, concatenating all digits onto the same line as `123`.",
    explanationBn: "প্রথম দুটি প্রিন্ট `end=''` থাকায় লাইন ব্রেক না করে একই সাথে `123` প্রিন্ট করে।"
  },
  {
    id: "t11_q21",
    question: "What is the output of:\nprint('Hello', 'World', sep=None)?",
    options: [
      "`Hello World` (reverts to default space)",
      "`HelloWorld`",
      "`TypeError`",
      "`HelloNoneWorld`"
    ],
    correct: 0,
    explanationEn: "If `sep=None`, Python resets `sep` to its default value, which is a single space `' '`.",
    explanationBn: "`sep=None` পাস করলে পাইথন ডিফল্ট স্পেসকে সেপারেটর হিসেবে ব্যবহার করে।"
  },
  {
    id: "t11_q22",
    question: "What is the output of:\nprint(1, 2, 3, sep='*', end='*')\nprint(4, 5, sep='*')",
    options: [
      "`1*2*3*4*5`",
      "`1*2*3*\\n4*5`",
      "`1*2*3 4*5`",
      "`1*2*3*4*5*`"
    ],
    correct: 0,
    explanationEn: "Line 1 outputs `1*2*3*` without newline. Line 2 immediately follows with `4*5`, resulting in `1*2*3*4*5`.",
    explanationBn: "প্রথম প্রিন্টের শেষে `*` থাকায় দ্বিতীয় প্রিন্টের `4*5` এর সাথে মিশে `1*2*3*4*5` তৈরি করে।"
  },
  {
    id: "t11_q23",
    question: "What is the escape sequence for printing double quotes inside a double-quoted string?",
    options: [
      "`\\\"`",
      "`//\"`",
      "`&quot;`",
      "`\"\"`"
    ],
    correct: 0,
    explanationEn: "A backslash preceding the quote `\\\"` escapes the quote delimiter.",
    explanationBn: "ডাবল কোটের ভেতরে ডাবল কোট প্রিন্ট করতে এস্কেপ ক্যারেক্টার `\\\"` ব্যবহৃত হয়।"
  },
  {
    id: "t11_q24",
    question: "What will `print(f'{100:06d}')` output?",
    options: [
      "`000100`",
      "`100000`",
      "`  0100`",
      "`100`"
    ],
    correct: 0,
    explanationEn: "The specifier `:06d` formats the integer as a 6-digit decimal with leading zero-padding, producing `000100`.",
    explanationBn: "`:06d` মোট ৬ ঘরের জন্য শূন্য দিয়ে প্যাডিং করে `000100` প্রদর্শন করে।"
  },
  {
    id: "t11_q25",
    question: "What does the `file` parameter in `print(*objects, file=...)` allow developers to do?",
    options: [
      "Redirect console output directly into a file object or stream",
      "Attach an external image file to the print output",
      "Compile the script into a binary executable",
      "Encrypt the console text"
    ],
    correct: 0,
    explanationEn: "By default `file=sys.stdout`. Pointing `file` to an open writable file object redirects `print` output directly to disk.",
    explanationBn: "`file` প্যারামিটার কনসোল আউটপুটকে কোনো ফাইলে রিডাইরেক্ট করে লেখার সুবিধা দেয়।"
  }
];
