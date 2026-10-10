export const topic2Questions = [
  {
    id: "t2_q1",
    question: "What is a 'Token' in Python?",
    options: [
      "The smallest individual lexical unit in a program recognized by the interpreter",
      "A physical hardware security key",
      "A Python loop construct",
      "A database table record"
    ],
    correct: 0,
    explanationEn: "A token is the smallest fundamental lexical unit in source code that the Python interpreter parses (Keywords, Identifiers, Literals, Operators, Punctuators).",
    explanationBn: "টোকেন (Token) হলো একটি পাইথন প্রোগ্রামের ক্ষুদ্রতম স্বতন্ত্র একক যা ইন্টারপ্রেটার সরাসরি শনাক্ত ও প্রসেস করে।"
  },
  {
    id: "t2_q2",
    question: "How many main categories of tokens exist in Python?",
    options: [
      "5 (Keywords, Identifiers, Literals, Operators, Punctuators)",
      "2 (Variables and Constants)",
      "10 (Numbers only)",
      "3 (Input, Process, Output)"
    ],
    correct: 0,
    explanationEn: "Python tokens are classified into 5 core types: Keywords, Identifiers, Literals, Operators, and Punctuators (Delimiters).",
    explanationBn: "পাইথনের টোকেন প্রধানত ৫ প্রকার: কিওয়ার্ড, আইডেন্টিফায়ার, লিটারেল, অপারেটর এবং পাংকচুয়েটর।"
  },
  {
    id: "t2_q3",
    question: "Which THREE Python keywords begin with an UPPERCASE capital letter?",
    options: [
      "`True`, `False`, `None`",
      "`If`, `Else`, `While`",
      "`Def`, `Class`, `Return`",
      "`For`, `In`, `Is`"
    ],
    correct: 0,
    explanationEn: "Only `True`, `False`, and `None` are capitalized; all other 32 keywords are in strict lowercase in Python 3.",
    explanationBn: "পাইথনের ৩৫টি কিওয়ার্ডের মধ্যে কেবল ৩টি বড় হাতের অক্ষর দিয়ে শুরু হয়: `True`, `False`, এবং `None`।"
  },
  {
    id: "t2_q4",
    question: "Which of the following is an INVALID Python identifier?",
    options: [
      "`2nd_rank`",
      "`_total_sum`",
      "`Student1`",
      "`marks_2026`"
    ],
    correct: 0,
    explanationEn: "`2nd_rank` is invalid because an identifier CANNOT begin with a numeric digit (0-9).",
    explanationBn: "`2nd_rank` অবৈধ কারণ পাইথনে কোনো আইডেন্টিফায়ার বা ভেরিয়েবলের নাম সংখ্যা (০-৯) দিয়ে শুরু হতে পারে না।"
  },
  {
    id: "t2_q5",
    question: "Which of the following characters is ALLOWED inside a Python identifier?",
    options: [
      "`_` (Underscore)",
      "`$` (Dollar)",
      "`-` (Hyphen)",
      "` ` (Space)"
    ],
    correct: 0,
    explanationEn: "The underscore `_` is the ONLY non-alphanumeric character permitted in Python identifiers.",
    explanationBn: "পাইথন আইডেন্টিফায়ারে অক্ষর ও সংখ্যা ছাড়া শুধুমাত্র আন্ডারস্কোর `_` ব্যবহার করা বৈধ।"
  },
  {
    id: "t2_q6",
    question: "Which of the following is a reserved Python keyword and CANNOT be used as a variable name?",
    options: [
      "`pass`",
      "`passed`",
      "`passing`",
      "`PASS`"
    ],
    correct: 0,
    explanationEn: "`pass` is a reserved Python keyword (null statement). Because Python is case-sensitive, `PASS`, `passed`, and `passing` are legal identifiers.",
    explanationBn: "`pass` পাইথনের একটি সংরক্ষিত কিওয়ার্ড, তাই এটি ভেরিয়েবলের নাম হিসেবে ব্যবহার করা যায় না।"
  },
  {
    id: "t2_q7",
    question: "What error is raised if you execute the assignment: `def = 50`?",
    options: [
      "`SyntaxError: invalid syntax`",
      "`TypeError`",
      "`NameError`",
      "`ValueError`"
    ],
    correct: 0,
    explanationEn: "`def` is a reserved keyword for function definitions. Attempting to assign to a keyword triggers a `SyntaxError: invalid syntax`.",
    explanationBn: "`def` ফাংশন সংজ্ঞায়নের কিওয়ার্ড হওয়ায় এতে মান নির্ধারণের চেষ্টা করলে `SyntaxError` তৈরি হয়।"
  },
  {
    id: "t2_q8",
    question: "Which of the following is a VALID identifier in Python?",
    options: [
      "`_123`",
      "`123_`",
      "`total-amount`",
      "`class`"
    ],
    correct: 0,
    explanationEn: "`_123` begins with an underscore, which is fully legal according to Python lexical naming rules.",
    explanationBn: "`_123` নামটি আন্ডারস্কোর দিয়ে শুরু হওয়ায় এটি সম্পূর্ণ বৈধ আইডেন্টিফায়ার।"
  },
  {
    id: "t2_q9",
    question: "Why is `roll-number` an invalid variable name in Python?",
    options: [
      "Because the hyphen `-` is interpreted as the subtraction arithmetic operator",
      "Because it contains more than 5 characters",
      "Because lowercase is not allowed",
      "Because 'roll' is a keyword"
    ],
    correct: 0,
    explanationEn: "The hyphen `-` is an arithmetic subtraction operator. Python interprets `roll-number` as the expression `roll minus number`.",
    explanationBn: "হাইফেন `-` একটি বিয়োগ অপারেটর হিসেবে গণ্য হওয়ায় পাইথন এটিকে `roll` থেকে `number` বিয়োগ হিসেবে পড়ে।"
  },
  {
    id: "t2_q10",
    question: "How does Python handle the identifiers `var`, `Var`, and `VAR`?",
    options: [
      "As three completely separate and distinct variables in memory",
      "As identical variables pointing to the same address",
      "It raises a DuplicateVariableError",
      "It combines them into a list"
    ],
    correct: 0,
    explanationEn: "Python is case-sensitive; distinct capitalizations represent separate variable bindings.",
    explanationBn: "পাইথন কেস-সংবেদনশীল হওয়ায় `var`, `Var`, এবং `VAR` তিনটি স্বতন্ত্র ভেরিয়েবল হিসেবে মেমরিতে স্থান পায়।"
  },
  {
    id: "t2_q11",
    question: "Which built-in Python module provides the `iskeyword()` function to verify if a string is a reserved keyword?",
    options: [
      "`keyword`",
      "`token`",
      "`sys`",
      "`os`"
    ],
    correct: 0,
    explanationEn: "The standard library module `keyword` provides `keyword.iskeyword(name)` and `keyword.kwlist`.",
    explanationBn: "পাইথনের স্ট্যান্ডার্ড `keyword` মডিউল ব্যবহার করে কোনো শব্দ কিওয়ার্ড কিনা তা পরীক্ষা করা যায় (`keyword.iskeyword()`)।"
  },
  {
    id: "t2_q12",
    question: "What is the statutory length limit for an identifier in Python 3?",
    options: [
      "No fixed length limit (can be arbitrarily long, though PEP 8 recommends readability)",
      "31 characters",
      "256 characters",
      "8 characters"
    ],
    correct: 0,
    explanationEn: "Python imposes no statutory limit on identifier length, though readable, concise names are recommended by PEP 8.",
    explanationBn: "পাইথনে আইডেন্টিফায়ারের দৈর্ঘ্যের কোনো নির্দিষ্ট সীমা নেই; তবে স্পষ্ট ও সংক্ষিপ্ত নাম ব্যবহার করা বাঞ্ছনীয়।"
  },
  {
    id: "t2_q13",
    question: "Which of the following is NOT an identifier naming convention under PEP 8?",
    options: [
      "Using `PascalCase` or `CapWords` for Class names",
      "Using `snake_case` (lowercase with underscores) for functions and variables",
      "Using `ALL_CAPS_WITH_UNDERSCORES` for constants",
      "Starting all variable names with a dollar sign `$score`"
    ],
    correct: 3,
    explanationEn: "The `$` symbol is illegal in Python syntax (unlike PHP or JavaScript).",
    explanationBn: "পাইথনে ডলার চিহ্ন `$` সম্পূর্ণ অবৈধ; এটি কোনো বৈধ কনভেনশন নয়।"
  },
  {
    id: "t2_q14",
    question: "Which of the following is categorized as a Python PUNCTUATOR / DELIMITER?",
    options: [
      "`:` (Colon)",
      "`while`",
      "`100`",
      "`+`"
    ],
    correct: 0,
    explanationEn: "The colon `:` is a punctuator/delimiter used to indicate the start of an indented block (suites in if, for, def, etc.).",
    explanationBn: "কোলন `:` একটি পাংকচুয়েটর/ডিলিমিটার যা নতুন কোড ব্লকের সূচনা নির্দেশ করে।"
  },
  {
    id: "t2_q15",
    question: "Which of the following token classifications is correct for the statement `score = 95`?",
    options: [
      "`score`: Identifier, `=`: Operator, `95`: Numeric Literal",
      "`score`: Keyword, `=`: Punctuator, `95`: String",
      "`score`: Literal, `=`: Keyword, `95`: Operator",
      "All three are keywords"
    ],
    correct: 0,
    explanationEn: "`score` is a user-defined identifier, `=` is the assignment operator, and `95` is an integer literal.",
    explanationBn: "`score` হলো আইডেন্টিফায়ার, `=` হলো অ্যাসাইনমেন্ট অপারেটর, এবং `95` হলো নিউমেরিক লিটারেল।"
  },
  {
    id: "t2_q16",
    question: "Can an identifier in Python begin with a single underscore (e.g., `_item`) or double underscore (e.g., `__init__`)?",
    options: [
      "Yes, starting with one or two underscores is completely legal and carries special scoping meanings in OOP",
      "No, underscores are only allowed in the middle",
      "Only in Python 2, not Python 3",
      "Only for integer variables"
    ],
    correct: 0,
    explanationEn: "Leading underscores are legal and commonly used to denote private attributes or special dunder methods (like `__init__`).",
    explanationBn: "হ্যাঁ, আন্ডারস্কোর দিয়ে নাম শুরু করা সম্পূর্ণ বৈধ এবং অবজেক্ট ওরিয়েন্টেড প্রোগ্রামিংয়ে এর বিশেষ তাৎপর্য রয়েছে।"
  },
  {
    id: "t2_q17",
    question: "Which of the following is an INVALID variable name due to spaces?",
    options: [
      "`student name`",
      "`student_name`",
      "`studentName`",
      "`StudentName`"
    ],
    correct: 0,
    explanationEn: "Whitespace characters are illegal within identifiers. Python reads `student name` as two separate disconnected tokens.",
    explanationBn: "আইডেন্টিফায়ারের মাঝে স্পেস বা ফাঁকা স্থান থাকা সম্পূর্ণ অবৈধ।"
  },
  {
    id: "t2_q18",
    question: "What token type is the symbol `@` when used before a function definition (e.g. `@staticmethod`)?",
    options: [
      "Punctuator / Decorator prefix",
      "Arithmetic Operator",
      "Numeric Literal",
      "Keyword"
    ],
    correct: 0,
    explanationEn: "`@` is a Python punctuator/delimiter used to denote decorators.",
    explanationBn: "`@` প্রতীকটি ডেকোরেটর নির্দেশক একটি পাংকচুয়েটর।"
  },
  {
    id: "t2_q19",
    question: "Which of the following statements about Python keywords is FALSE?",
    options: [
      "Keywords can be created dynamically by the user using the `create_keyword()` function",
      "Keywords are reserved by the language compiler/interpreter",
      "Keywords have fixed predefined syntactic semantics",
      "There are 35 keywords in Python 3.12"
    ],
    correct: 0,
    explanationEn: "Keywords are hardcoded into the Python grammar and tokenizer; users cannot define new keywords dynamically.",
    explanationBn: "ব্যবহারকারীরা নতুন কিওয়ার্ড তৈরি করতে পারে না; কিওয়ার্ডগুলো পাইথন ভাষার অভ্যন্তরে পূর্বনির্ধারিত।"
  },
  {
    id: "t2_q20",
    question: "Which of the following identifiers represents a common dunder (magic) method in Python?",
    options: [
      "`__str__`",
      "`str$`",
      "`--str--`",
      "`#str#`"
    ],
    correct: 0,
    explanationEn: "`__str__` with double leading and trailing underscores is a standard Python magic/dunder method identifier.",
    explanationBn: "`__str__` হলো পাইথনের একটি স্ট্যান্ডার্ড ডান্ডার (স্পেশাল) মেথড।"
  },
  {
    id: "t2_q21",
    question: "Identify the number of tokens in the Python statement: `total = a + b`",
    options: [
      "5 (`total`, `=`, `a`, `+`, `b`)",
      "3",
      "1",
      "4"
    ],
    correct: 0,
    explanationEn: "The statement contains 5 tokens: identifier `total`, operator `=`, identifier `a`, operator `+`, identifier `b`.",
    explanationBn: "স্টেটমেন্টটিতে ৫টি টোকেন রয়েছে: `total`, `=`, `a`, `+`, এবং `b`।"
  },
  {
    id: "t2_q22",
    question: "What is the token classification of `'Hello World'` in Python?",
    options: [
      "String Literal",
      "Identifier",
      "Punctuator",
      "Keyword"
    ],
    correct: 0,
    explanationEn: "Text enclosed in quotes is classified as a String Literal (constant data token).",
    explanationBn: "কোটেশনের মধ্যে থাকা টেক্সট স্ট্রিং লিটারেল (ধ্রুবক মান) হিসেবে শ্রেণিবদ্ধ হয়।"
  },
  {
    id: "t2_q23",
    question: "Why is `global` an invalid variable name in Python?",
    options: [
      "Because `global` is a reserved keyword used for namespace scope declarations",
      "Because it begins with letter 'g'",
      "Because it is too long",
      "Because it contains a vowel"
    ],
    correct: 0,
    explanationEn: "`global` is a reserved keyword in Python used to declare global variable bindings inside functions.",
    explanationBn: "`global` পাইথনের একটি সংরক্ষিত কিওয়ার্ড, তাই এটি সাধারণ ভেরিয়েবল হিসেবে ব্যবহৃত হতে পারে না।"
  },
  {
    id: "t2_q24",
    question: "Which of the following is a legal identifier according to Python 3 Unicode naming rules?",
    options: [
      "`নম্বর` (Bengali word)",
      "`10_total`",
      "`for`",
      "`user-name`"
    ],
    correct: 0,
    explanationEn: "Python 3 supports Unicode alphanumeric characters in identifiers, making `নম্বর` a valid identifier (though ASCII is recommended by PEP 8).",
    explanationBn: "পাইথন ৩ ইউনিকোড অক্ষর সমর্থন করায় বাংলা বর্ণমালা দিয়ে নাম তৈরি বৈধ (তবে ইংরেজি ব্যবহার সুপারিশকৃত)।"
  },
  {
    id: "t2_q25",
    question: "What happens when the Python lexical scanner encounters an invalid token (like `123abc` as an identifier)?",
    options: [
      "It raises a `SyntaxError: invalid decimal literal` during parsing",
      "It converts the letters into numbers",
      "It prints a warning and proceeds",
      "It halts the operating system"
    ],
    correct: 0,
    explanationEn: "The scanner attempts to parse `123abc` as a number, fails on the letters, and raises `SyntaxError: invalid decimal literal`.",
    explanationBn: "স্ক্যানার `123abc`-কে সংখ্যা হিসেবে পার্স করার চেষ্টা করে ব্যর্থ হয় এবং `SyntaxError` প্রদর্শন করে।"
  }
];
