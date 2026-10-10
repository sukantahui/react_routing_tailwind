export const topic9Questions = [
  {
    id: "t9_q1",
    question: "Which special character is used to start a single-line comment in Python?",
    options: [
      "`#` (Hash / Pound)",
      "`//` (Double Slash)",
      "`/*`",
      "`--`"
    ],
    correct: 0,
    explanationEn: "The hash `#` symbol introduces single-line comments in Python, causing the interpreter to ignore the rest of the line.",
    explanationBn: "পাইথনে একক লাইনের কমেন্ট শুরু করতে হ্যাশ `#` প্রতীক ব্যবহার করা হয়।"
  },
  {
    id: "t9_q2",
    question: "How does the Python interpreter handle comments during program compilation and execution?",
    options: [
      "They are completely ignored and skipped with zero runtime performance cost",
      "They are compiled into machine instructions",
      "They are stored in global RAM variables",
      "They are printed to the console automatically"
    ],
    correct: 0,
    explanationEn: "Comments are purely for human developers; the Python interpreter strips them during lexical scanning without executing them.",
    explanationBn: "কমেন্টগুলো কেবল মানুষের পড়ার জন্য; ইন্টারপ্রেটার এগুলোকে সম্পূর্ণরূপে উপেক্ষা করে এবং কোনো কোড তৈরি করে না।"
  },
  {
    id: "t9_q3",
    question: "What is a 'Docstring' (Documentation String) in Python?",
    options: [
      "A string literal appearing as the first statement in a module, class, or function definition to describe its behavior",
      "A medical prescription string",
      "A string that cannot contain vowels",
      "An encrypted string"
    ],
    correct: 0,
    explanationEn: "A docstring (PEP 257) is a string literal placed right after a function/class header that serves as official built-in documentation.",
    explanationBn: "ডকস্ট্রিং (Docstring) হলো ফাংশন বা ক্লাসের শুরুতে লিখিত বিশেষ স্ট্রিং যা এর কাজের বিবরণ ও ডকুমেন্টেশন হিসেবে কাজ করে।"
  },
  {
    id: "t9_q4",
    question: "Which special attribute stores a function's docstring for programmatic inspection at runtime?",
    options: [
      "`func.__doc__`",
      "`func.__comment__`",
      "`func.__text__`",
      "`func.__help__`"
    ],
    correct: 0,
    explanationEn: "Python automatically attaches a function's docstring to its `__doc__` special attribute.",
    explanationBn: "পাইথন ফাংশনের ডকস্ট্রিংকে তার `__doc__` নামক বিশেষ অ্যাট্রিবিউটে সংরক্ষণ করে।"
  },
  {
    id: "t9_q5",
    question: "Which built-in Python tool formats and displays an object's docstring interactively in the terminal?",
    options: [
      "`help(object)`",
      "`doc(object)`",
      "`info(object)`",
      "`show(object)`"
    ],
    correct: 0,
    explanationEn: "The `help()` interactive utility parses and renders docstrings formatted for reading.",
    explanationBn: "`help()` ফাংশন ব্যবহার করে যেকোনো ফাংশন বা অবজেক্টের ডকস্ট্রিং টার্মিনালে সুন্দরভাবে দেখা যায়।"
  },
  {
    id: "t9_q6",
    question: "What is an 'Inline Comment' in Python source code?",
    options: [
      "A comment placed on the exact same line following an executable Python statement (e.g., `x = 5  # Initial score`)",
      "A comment written on line 1 only",
      "A comment inside an input() prompt",
      "A comment with no hash symbol"
    ],
    correct: 0,
    explanationEn: "Inline comments appear on the same physical line as executable code, separated by at least two spaces according to PEP 8.",
    explanationBn: "ইনলাইন কমেন্ট হলো কোডের একই লাইনের শেষে হ্যাশ দিয়ে লেখা ব্যাখ্যামূলক মন্তব্য।"
  },
  {
    id: "t9_q7",
    question: "What delimiter is conventionally used to enclose multiline docstrings according to PEP 257?",
    options: [
      "Triple double quotes: `\"\"\"...\"\"\"`",
      "Single slashes: `/.../`",
      "Square brackets: `[...]`",
      "Curly braces: `{...}`"
    ],
    correct: 0,
    explanationEn: "PEP 257 specifies triple double quotes `\"\"\"...\"\"\"` as the universal standard delimiter for docstrings.",
    explanationBn: "PEP 257 স্ট্যান্ডার্ড অনুযায়ী ডকস্ট্রিং লেখার জন্য ট্রিপল ডাবল কোটেশন `\"\"\"...\"\"\"` ব্যবহার করা হয়।"
  },
  {
    id: "t9_q8",
    question: "What is the primary difference between a regular `#` comment and a `\"\"\"` Docstring?",
    options: [
      "`#` comments are discarded during parsing, whereas docstrings are retained in memory and accessible via `__doc__`",
      "`#` comments run on the CPU",
      "Docstrings are converted into binary executable code",
      "There is no difference"
    ],
    correct: 0,
    explanationEn: "Regular `#` comments disappear after parsing; docstrings are preserved at runtime as object metadata.",
    explanationBn: "সাধারণ `#` কমেন্ট পার্স করার পর মুছে যায়, কিন্তু ডকস্ট্রিং মেমরিতে সংরক্ষিত থাকে এবং রানটাইমে দেখা যায়।"
  },
  {
    id: "t9_q9",
    question: "Consider:\ndef add(a, b):\n    # Adds two numbers\n    return a + b\nWhat will `print(add.__doc__)` output?",
    options: [
      "`None` (because regular `#` comments are NOT stored as docstrings)",
      "`Adds two numbers`",
      "`SyntaxError`",
      "`<comment>`"
    ],
    correct: 0,
    explanationEn: "Regular `#` comments are ignored and do NOT populate `__doc__`. For `__doc__` to exist, an actual string literal `\"\"\"...\"\"\"` must be used.",
    explanationBn: "হ্যাশ `#` কমেন্ট ডকস্ট্রিং হিসেবে গণ্য হয় না, তাই `add.__doc__` এর আউটপুট হবে `None`।"
  },
  {
    id: "t9_q10",
    question: "What will `print(\"Hello # World\")` output in Python?",
    options: [
      "`Hello # World` (the `#` inside quotes is treated as part of the string literal, NOT a comment)",
      "`Hello `",
      "`SyntaxError`",
      "`World`"
    ],
    correct: 0,
    explanationEn: "A `#` character placed inside quotes is parsed as a regular string character, not a comment starter.",
    explanationBn: "কোটেশনের ভেতরে হ্যাশ `#` থাকলে তা স্ট্রিংয়ের অংশ হিসেবে প্রিন্ট হয়, কমেন্ট হিসেবে নয়।"
  },
  {
    id: "t9_q11",
    question: "Which of the following represents the best PEP 8 commenting practice?",
    options: [
      "Explain *why* a particular non-obvious algorithm or workaround was implemented, rather than restating what the code does",
      "Write comments for every single line like `x = 10  # assign 10 to x`",
      "Write comments in Latin only",
      "Never write any comments"
    ],
    correct: 0,
    explanationEn: "Good comments explain non-obvious design choices, business rules, and algorithmic rationale rather than stating trivial syntax facts.",
    explanationBn: "ভালো কমেন্টের উদ্দেশ্য হলো কোডটি *কেন* এভাবে লেখা হয়েছে তার পেছনের যুক্তি ব্যাখ্যা করা, স্পষ্ট বিষয় পুনরাবৃত্তি করা নয়।"
  },
  {
    id: "t9_q12",
    question: "Can an unassigned standalone string literal (e.g. `\"\"\"Notes here\"\"\"`) act as a multiline comment inside the body of a script?",
    options: [
      "Yes, Python parses the standalone string literal, produces no side-effects, and garbage-collects it immediately",
      "No, unassigned strings cause SyntaxError",
      "Only if it contains numbers",
      "Only in Python 2"
    ],
    correct: 0,
    explanationEn: "Unassigned string literals are valid statements that evaluate to constant objects and are immediately discarded by Python.",
    explanationBn: "হ্যাঁ, কোনো চলকে না রাখা ট্রিপল কোটেড স্ট্রিং কোনো ক্ষতি না করে বাতিল হয়ে যায় এবং কমেন্টের মতো কাজ করে।"
  },
  {
    id: "t9_q13",
    question: "How many spaces should precede an inline comment according to PEP 8 guidelines?",
    options: [
      "At least two spaces (e.g., `x = x + 1  # Increment`)",
      "No spaces",
      "Exactly 10 spaces",
      "A tab only"
    ],
    correct: 0,
    explanationEn: "PEP 8 specifies that inline comments should be separated from code by at least two spaces for visual clarity.",
    explanationBn: "PEP 8 নিয়ম অনুযায়ী ইনলাইন কমেন্ট এবং কোডের মাঝে অন্তত ২টি স্পেস থাকা উচিত।"
  },
  {
    id: "t9_q14",
    question: "What is a 'Module Docstring' in Python?",
    options: [
      "A docstring placed at the very top (first non-comment statement) of a `.py` file describing the module's contents and purpose",
      "A comment inside the CPU",
      "A license key in Windows",
      "An image tag"
    ],
    correct: 0,
    explanationEn: "A docstring at the beginning of a Python file serves as the module-level documentation accessible via `module.__doc__`.",
    explanationBn: "ফাইলের শুরুতে লিখিত ডকস্ট্রিং হলো মডিউল ডকস্ট্রিং যা পুরো মডিউলের উদ্দেশ্য ব্যাখ্যা করে।"
  },
  {
    id: "t9_q15",
    question: "Can docstrings be written on a single line (e.g. `\"\"\"Calculates square of x.\"\"\"`)?",
    options: [
      "Yes, single-line docstrings are recommended for simple one-line function definitions",
      "No, docstrings must always have at least 10 lines",
      "Only in classes",
      "Single-line docstrings are illegal in Python 3"
    ],
    correct: 0,
    explanationEn: "PEP 257 supports both one-line docstrings (for trivial functions) and multi-line structured docstrings.",
    explanationBn: "হ্যাঁ, সহজ ফাংশনের জন্য একক লাইনের ডকস্ট্রিং লেখা সম্পূর্ণ বৈধ ও নিয়মসম্মত।"
  },
  {
    id: "t9_q16",
    question: "What will `help(math.sqrt)` display in the Python interactive shell?",
    options: [
      "The official docstring of the `sqrt` function detailing its parameter and square root return value",
      "A link to Google",
      "A syntax error",
      "The source code in C++"
    ],
    correct: 0,
    explanationEn: "`help(math.sqrt)` formats and displays the compiled CPython docstring for the square root function.",
    explanationBn: "`help(math.sqrt)` ফাংশনটির অফিশিয়াল ডকস্ট্রিং টার্মিনালে প্রদর্শন করে।"
  },
  {
    id: "t9_q17",
    question: "Which of the following is true about comments in Python?",
    options: [
      "Comments can contain any Unicode character, including regional languages like Bengali, Hindi, and symbols",
      "Comments can only be written in English",
      "Comments increase program execution time",
      "Comments can only appear at the bottom of a file"
    ],
    correct: 0,
    explanationEn: "Because Python source files use UTF-8 by default, comments can contain any international Unicode characters.",
    explanationBn: "পাইথনে UTF-8 সমর্থিত হওয়ায় কমেন্টের ভেতর বাংলা, হিন্দি ইত্যাদি যেকোনো ভাষার অক্ষর লেখা যায়।"
  },
  {
    id: "t9_q18",
    question: "What is 'Code Commenting Out' during debugging?",
    options: [
      "Temporarily placing a `#` in front of statements to prevent them from executing while testing bug fixes",
      "Deleting code permanently",
      "Sending code via email",
      "Changing the variable name"
    ],
    correct: 0,
    explanationEn: "'Commenting out' is a common debugging technique where code lines are prefixed with `#` to disable them temporarily.",
    explanationBn: "ডিবাগিংয়ের সময় কোনো কোড সাময়িকভাবে বন্ধ রাখতে তার আগে `#` বসানোকে কমেন্টিং আউট বলে।"
  },
  {
    id: "t9_q19",
    question: "What is a 'Shebang line' (e.g. `#!/usr/bin/env python3`) at the top of a Unix/Linux Python script?",
    options: [
      "A special comment read by the operating system shell to know which Python interpreter binary to invoke",
      "A syntax error",
      "A virus detection tag",
      "A compiler header"
    ],
    correct: 0,
    explanationEn: "The shebang line `#!/usr/bin/env python3` is a specialized comment telling Unix shells where the interpreter lives.",
    explanationBn: "শিব্যাং লাইন (`#!/...`) হলো একটি বিশেষ কমেন্ট যা ইউনিক্স/লিনাক্স ওএস-কে পাইথন ইন্টারপ্রেটারের লোকেশন জানিয়ে দেয়।"
  },
  {
    id: "t9_q20",
    question: "What happens if a docstring is placed AFTER executable statements inside a function?",
    options: [
      "It is NOT recognized as a docstring (`__doc__` remains None); it is treated as a useless standalone string statement",
      "Python crashes",
      "It is still treated as a docstring",
      "It prints to the screen"
    ],
    correct: 0,
    explanationEn: "A docstring MUST be the very first statement in the body. If placed after code, it is merely an unassigned string.",
    explanationBn: "ডকস্ট্রিং অবশ্যই ফাংশনের প্রথম স্টেটমেন্ট হতে হবে; পরে লিখলে তা সাধারণ বাতিল স্ট্রিং হিসেবে গণ্য হয়।"
  },
  {
    id: "t9_q21",
    question: "What do automated documentation generators (like Sphinx, pydoc, Doxygen) use to create HTML software documentation websites?",
    options: [
      "They extract docstrings defined in the Python source code modules and classes",
      "They read the programmer's mind",
      "They guess the code behavior",
      "They execute the code 1000 times"
    ],
    correct: 0,
    explanationEn: "Tools like Sphinx and `pydoc` automatically inspect docstrings from Python modules to generate professional HTML documentation.",
    explanationBn: "Sphinx ও pydoc-এর মতো টুলগুলো কোডের ডকস্ট্রিং পড়ে স্বয়ংক্রিয়ভাবে এইচটিএমএল ডকুমেন্টেশন তৈরি করে।"
  },
  {
    id: "t9_q22",
    question: "Which of the following is considered redundant/poor commenting in Python?",
    options: [
      "`x = x + 1  # add 1 to x` (stating the obvious)",
      "`# Use Newton-Raphson approximation for fast convergence`",
      "`# Adjust for 18% GST tax rate`",
      "`# Handle edge case when user input is zero`"
    ],
    correct: 0,
    explanationEn: "Commenting `add 1 to x` on `x = x + 1` adds zero value and clutters code with noise.",
    explanationBn: "স্পষ্ট বিষয় কমেন্টে পুনরাবৃত্তি করা (যেমন: `x = x + 1 # ১ যোগ করো`) কোডের মান নষ্ট করে।"
  },
  {
    id: "t9_q23",
    question: "What is the output of `help(len)` in Python?",
    options: [
      "Displays the built-in docstring: `len(obj, /) -> Return the number of items in a container.`",
      "Displays error",
      "Deletes len",
      "Prints 0"
    ],
    correct: 0,
    explanationEn: "`help(len)` displays the official built-in documentation for the `len()` function.",
    explanationBn: "`help(len)` ফাংশনটির অফিশিয়াল ব্যবহারের নিয়ম ও ডকস্ট্রিং প্রদর্শন করে।"
  },
  {
    id: "t9_q24",
    question: "Can docstrings contain Markdown or reStructuredText markup syntax?",
    options: [
      "Yes, docstrings frequently contain formatted Markdown or Sphinx reStructuredText for rich documentation rendering",
      "No, only uppercase letters are permitted",
      "Only in Python 2",
      "Only if saved as .txt"
    ],
    correct: 0,
    explanationEn: "Python docstrings standardly incorporate reStructuredText (reST) or Google/NumPy Markdown formatting.",
    explanationBn: "হ্যাঁ, সুন্দর ও গোছানো ডকুমেন্টেশন তৈরির জন্য ডকস্ট্রিংয়ে মার্কডাউন বা reST ফরম্যাট ব্যবহার করা হয়।"
  },
  {
    id: "t9_q25",
    question: "Why does the CBSE curriculum emphasize proper commenting and docstrings in practical programming?",
    options: [
      "Because software maintainability, clarity, and readability are essential software engineering practices evaluated in board practicals",
      "To increase line counts for grading",
      "Because Python code will not compile without comments",
      "Because comments use less electricity"
    ],
    correct: 0,
    explanationEn: "Clean commenting and docstrings represent good software engineering habits, maintainability, and code readability evaluated by CBSE examiners.",
    explanationBn: "কোডের স্পষ্টতা, রক্ষণাবেক্ষণ যোগ্যতা এবং সুন্দর উপস্থাপনা একজন ভালো প্রোগ্রামারের অপরিহার্য গুণ যা বোর্ড পরীক্ষায় মূল্যায়ন করা হয়।"
  }
];
