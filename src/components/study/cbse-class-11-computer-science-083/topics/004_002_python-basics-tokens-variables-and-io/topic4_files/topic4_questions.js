export const topic4Questions = [
  {
    id: "t4_q1",
    question: "What is a 'Punctuator' (Delimiter) in Python syntax?",
    options: [
      "A symbol that has syntactic and structural meaning in grouping, separating, and organizing code expressions",
      "A variable that stores integers",
      "A hardware cooling unit",
      "A type of computer mouse"
    ],
    correct: 0,
    explanationEn: "Punctuators (delimiters) are punctuation symbols that structure expressions, define code blocks, and separate elements (e.g. `( )`, `[ ]`, `{ }`, `:`, `,`, `.`, `;`).",
    explanationBn: "পাংকচুয়েটর বা ডিলিমিটার হলো এমন কিছু প্রতীক যা কোডের কাঠামো বিন্যাস, উপাদান পৃথকীকরণ এবং গ্রুপিং করতে ব্যবহৃত হয়।"
  },
  {
    id: "t4_q2",
    question: "Which punctuator is MANDATORY at the end of header lines for `if`, `for`, `while`, `def`, and `class` statements in Python?",
    options: [
      "`:` (Colon)",
      "`;` (Semicolon)",
      `\`{\` (Open Curly Brace)`,
      "`$`"
    ],
    correct: 0,
    explanationEn: "In Python syntax, compound statement headers MUST terminate with a colon `:`, which introduces the indented code block (suite).",
    explanationBn: "পাইথনে `if`, `for`, `def` ইত্যাদি স্টেটমেন্টের হেডার লাইনের শেষে কোলন `:` থাকা বাধ্যতামূলক।"
  },
  {
    id: "t4_q3",
    question: "Which pair of delimiters is used to define a Python LIST literal and perform sequence indexing?",
    options: [
      "Square Brackets `[ ]`",
      "Parentheses `( )`",
      "Curly Braces `{ }`",
      "Angle Brackets `< >`"
    ],
    correct: 0,
    explanationEn: "Square brackets `[ ]` create list literals (e.g., `[1, 2, 3]`) and access element indexes (e.g., `arr[0]`).",
    explanationBn: "লিস্ট তৈরি এবং ইনডেক্সিং করার জন্য বর্গাকার ব্র্যাকেট `[ ]` ব্যবহৃত হয়।"
  },
  {
    id: "t4_q4",
    question: "Which pair of delimiters is used to create a Python TUPLE and invoke functions?",
    options: [
      "Parentheses `( )`",
      "Square Brackets `[ ]`",
      "Curly Braces `{ }`",
      "Colons `: :`"
    ],
    correct: 0,
    explanationEn: "Parentheses `( )` create tuples `(1, 2)`, group expressions `(a + b)`, and execute function calls `print()`.",
    explanationBn: "টিউপল তৈরি, ফাংশন কল এবং এক্সপ্রেশন গ্রুপিংয়ে প্রথম বন্ধনী `( )` ব্যবহৃত হয়।"
  },
  {
    id: "t4_q5",
    question: "Which pair of delimiters is used to define DICTIONARIES and SETS in Python?",
    options: [
      "Curly Braces `{ }`",
      "Parentheses `( )`",
      "Square Brackets `[ ]`",
      "Quotes `' '`"
    ],
    correct: 0,
    explanationEn: "Curly braces `{ }` enclose dictionary key-value mappings `{'a': 1}` and set elements `{1, 2, 3}`.",
    explanationBn: "ডিকশনারি এবং সেট সংজ্ঞায়িত করতে দ্বিতীয় বন্ধনী বা কার্লি ব্র্যাকেট `{ }` ব্যবহৃত হয়।"
  },
  {
    id: "t4_q6",
    question: "What is the role of the comma `,` in the statement `x, y = 10, 20`?",
    options: [
      "It enables multiple simultaneous tuple assignment / unpacking",
      "It divides x by y",
      "It creates a float",
      "It comments out the line"
    ],
    correct: 0,
    explanationEn: "Commas separate target identifiers on the left and values on the right, enabling simultaneous tuple unpacking.",
    explanationBn: "কমা একাধিক চলকে একসাথে মান নির্ধারণ (Tuple unpacking) করার সুবিধা দেয়।"
  },
  {
    id: "t4_q7",
    question: "What is the primary function of the dot / period `.` punctuator in Python?",
    options: [
      "Attribute and method access (e.g. `math.sqrt()` or `str.upper()`) and decimal point in floats",
      "To end a Python sentence like a full stop in English",
      "To delete variables",
      "To declare loops"
    ],
    correct: 0,
    explanationEn: "The dot operator `.` accesses object attributes and methods, module members, and acts as a decimal point in floats.",
    explanationBn: "ডট `.` অবজেক্টের মেথড বা মডিউলের ফাংশন অ্যাক্সেস করতে এবং ফ্লোটের দশমিক বিন্দু হিসেবে ব্যবহৃত হয়।"
  },
  {
    id: "t4_q8",
    question: "Can multiple independent statements be written on the SAME physical line in Python?",
    options: [
      "Yes, by separating them with a semicolon `;` (e.g., `a = 5; b = 10; print(a + b)`)",
      "No, Python strictly forbids more than one statement per line",
      "Only if they are written in binary",
      "Only in Python 2"
    ],
    correct: 0,
    explanationEn: "Semicolons `;` allow multiple statements on a single line, although PEP 8 discourages this for readability.",
    explanationBn: "হ্যাঁ, সেমিকোলন `;` দিয়ে একাধিক স্টেটমেন্ট এক লাইনে লেখা যায়, তবে কোডের স্পষ্টতার জন্য তা এড়িয়ে চলা ভালো।"
  },
  {
    id: "t4_q9",
    question: "What punctuator symbol is placed before decorator names in Python (e.g. `@classmethod`)?",
    options: [
      "`@` (At symbol)",
      "`#`",
      "`$`",
      "`&`"
    ],
    correct: 0,
    explanationEn: "The `@` symbol is the syntactic prefix for decorators in Python.",
    explanationBn: "পাইথনে ডেকোরেটর সংজ্ঞায়িত করতে নামের পূর্বে `@` চিহ্ন ব্যবহার করা হয়।"
  },
  {
    id: "t4_q10",
    question: "What is the data type of `t = (5)` vs `t = (5,)` in Python?",
    options: [
      "`(5)` is an integer `int`, while `(5,)` with a trailing comma is a single-element `tuple`",
      "Both are tuples",
      "Both are ints",
      "Both are syntax errors"
    ],
    correct: 0,
    explanationEn: "Without a trailing comma, `(5)` is treated as integer 5 in parentheses. The comma `,` is necessary to construct a single-element tuple `(5,)`.",
    explanationBn: "কমা ছাড়া `(5)` কেবল পূর্ণসংখ্যা ৫; কিন্তু ট্রেলিং কমা যুক্ত `(5,)` হলো একটি একক উপাদানের টিউপল।"
  },
  {
    id: "t4_q11",
    question: "Which punctuator separates slices in Python sequence slicing (e.g., `text[1:8:2]`)?",
    options: [
      "`:` (Colon)",
      "`,` (Comma)",
      "`;` (Semicolon)",
      "`-` (Hyphen)"
    ],
    correct: 0,
    explanationEn: "The colon `:` separates `start:stop:step` indices inside slicing brackets.",
    explanationBn: "স্লাইসিং করার সময় `start:stop:step` অংশগুলোকে কোলন `:` দিয়ে আলাদা করা হয়।"
  },
  {
    id: "t4_q12",
    question: "What is the role of curly braces `{}` in Python formatted string literals (f-strings)?",
    options: [
      "They act as replacement fields containing Python expressions to be evaluated and formatted",
      "They create an empty set inside the string",
      "They cause a syntax error",
      "They make the text bold"
    ],
    correct: 0,
    explanationEn: "In f-strings (e.g. `f'{name}'`), `{}` denotes variable replacement expressions evaluated at runtime.",
    explanationBn: "f-স্ট্রিংয়ে কার্লি ব্র্যাকেটের ভেতরের ভেরিয়েবল বা এক্সপ্রেশনের মান লাইভ গণনা করে টেক্সটে বসানো হয়।"
  },
  {
    id: "t4_q13",
    question: "Which compound operator combines addition with assignment?",
    options: [
      "`+=`",
      "`=+`",
      "`++`",
      "`+==`"
    ],
    correct: 0,
    explanationEn: "`+=` is the in-place addition assignment operator (`x += y` is equivalent to `x = x + y`). Note: `++` does NOT exist in Python.",
    explanationBn: "`+=` হলো অগমেন্টেড অ্যাডিশন অপারেটর (`x += y` মানে `x = x + y`)। পাইথনে `++` অপারেটর নেই।"
  },
  {
    id: "t4_q14",
    question: "What does the symbol `=` represent in Python syntax?",
    options: [
      "Assignment operator (stores r-value on the right into l-value on the left)",
      "Equality comparison",
      "A variable name",
      "A comment delimiter"
    ],
    correct: 0,
    explanationEn: "`=` is the assignment operator. Equality comparison uses double equals `==`.",
    explanationBn: "`=` হলো অ্যাসাইনমেন্ট অপারেটর যা ডানপাশের মান বামপাশের চলকে রাখে। সমতা পরীক্ষার জন্য `==` ব্যবহৃত হয়।"
  },
  {
    id: "t4_q15",
    question: "What is the function of the backslash `\\` at the very end of a physical code line in Python?",
    options: [
      "Line Continuation character (joins current line with the next physical line into a single logical line)",
      "It deletes the line",
      "It starts a multiline comment",
      "It terminates the script"
    ],
    correct: 0,
    explanationEn: "An unquoted backslash `\\` at the end of a line acts as explicit line continuation.",
    explanationBn: "লাইনের শেষে ব্যাকস্ল্যাশ `\\` থাকলে তা নির্দেশ করে যে স্টেটমেন্টটি পরবর্তী লাইনেও অব্যাহত রয়েছে।"
  },
  {
    id: "t4_q16",
    question: "Which of the following is NOT a valid augmented assignment operator in Python?",
    options: [
      "`++=`",
      "`*=`",
      "`//=`",
      "`**=`"
    ],
    correct: 0,
    explanationEn: "`++=` is invalid. Valid augmented assignment operators include `+=`, `-=`, `*=`, `/=`, `//=`, `%=`, `**=`.",
    explanationBn: "`++=` পাইথনে অবৈধ। বৈধ অপারেটর হলো `+=`, `-=`, `*=`, ইত্যাদি।"
  },
  {
    id: "t4_q17",
    question: "What error occurs if you omit the colon `:` after an `if` statement: `if x > 10`?",
    options: [
      "`SyntaxError: expected ':'`",
      "`TypeError`",
      "`NameError`",
      "`ValueError`"
    ],
    correct: 0,
    explanationEn: "Python syntax requires a colon to terminate block headers; omitting it triggers `SyntaxError: expected ':'`.",
    explanationBn: "কোলন বাদ দিলে পাইথন `SyntaxError: expected ':'` প্রদর্শন করে।"
  },
  {
    id: "t4_q18",
    question: "What does `d = {}` create in Python?",
    options: [
      "An empty Dictionary (not an empty set)",
      "An empty Set",
      "An empty Tuple",
      "A SyntaxError"
    ],
    correct: 0,
    explanationEn: "In Python, empty curly braces `{}` create an empty dictionary (`dict`). To create an empty set, use `set()`.",
    explanationBn: "ফাঁকা কার্লি ব্র্যাকেট `{}` একটি খালি ডিকশনারি তৈরি করে (খালি সেট তৈরি করতে `set()` ব্যবহার করতে হয়)।"
  },
  {
    id: "t4_q19",
    question: "What is the token role of quotes `'` or `\"` in Python?",
    options: [
      "String Literal delimiters",
      "Mathematical operators",
      "Keywords",
      "Comments"
    ],
    correct: 0,
    explanationEn: "Single, double, and triple quotes act as delimiters that mark the boundaries of string literals.",
    explanationBn: "কোটেশন চিহ্নগুলো স্ট্রিং লিটারেলের শুরু ও শেষ নির্দেশক ডিলিমিটার হিসেবে কাজ করে।"
  },
  {
    id: "t4_q20",
    question: "What does the expression `a, b, c = [10, 20, 30]` demonstrate in Python?",
    options: [
      "Sequence unpacking using commas",
      "Array indexing",
      "Matrix inversion",
      "SyntaxError"
    ],
    correct: 0,
    explanationEn: "Comma-separated identifiers unpack sequence elements into individual variables.",
    explanationBn: "কমা দিয়ে পৃথক চলকে তালিকার উপাদানগুলো আনপ্যাক করা হচ্ছে।"
  },
  {
    id: "t4_q21",
    question: "Which symbol is used for variable type annotations in Python 3 (PEP 526)?",
    options: [
      "`:` (Colon, e.g. `age: int = 17`)",
      "`->`",
      "`#`",
      "`@`"
    ],
    correct: 0,
    explanationEn: "The colon `:` specifies the annotated type of a variable (`name: str = 'Amit'`).",
    explanationBn: "চলকের টাইপ অ্যানোটেশন প্রকাশে কোলন `:` প্রতীক ব্যবহৃত হয়।"
  },
  {
    id: "t4_q22",
    question: "Which symbol is used for function return type annotations in Python 3 (PEP 3107)?",
    options: [
      "`->` (Arrow punctuator, e.g. `def get_sum(a, b) -> int:`)",
      "`=>`",
      "`::`",
      "`:`"
    ],
    correct: 0,
    explanationEn: "The arrow `->` is used to specify return type annotations on function definitions.",
    explanationBn: "ফাংশন কি ধরনের মান রিটার্ন করবে তা বোঝাতে `->` প্রতীক ব্যবহার করা হয়।"
  },
  {
    id: "t4_q23",
    question: "What happens if parentheses are mismatched in Python (e.g., `(10 + 5` without closing `)`)?",
    options: [
      "`SyntaxError: '(' was never closed`",
      "Python automatically adds a closing parenthesis",
      "The program executes partially",
      "Memory leak"
    ],
    correct: 0,
    explanationEn: "Unclosed grouping delimiters cause an immediate compile-time `SyntaxError: '(' was never closed`.",
    explanationBn: "বন্ধনী অসম্পূর্ণ থাকলে পাইথন `SyntaxError` প্রদান করে।"
  },
  {
    id: "t4_q24",
    question: "What does the walrus operator `:=` (Assignment Expression - PEP 572) do?",
    options: [
      "Assigns a value to a variable as part of a larger expression",
      "Compares two variables for equality",
      "Deletes an object",
      "Creates a new class"
    ],
    correct: 0,
    explanationEn: "The walrus operator `:=` (introduced in Python 3.8) allows assignment directly inside expressions (e.g. `if (n := len(a)) > 10:`).",
    explanationBn: "ওয়ালরাস অপারেটর `:=` কোনো এক্সপ্রেশনের ভেতরেই সরাসরি ভেরিয়েবলে মান নির্ধারণের সুবিধা দেয়।"
  },
  {
    id: "t4_q25",
    question: "Why does Python rely on indentation rather than curly braces `{}` to define block structure?",
    options: [
      "To enforce visual cleanliness, readability, and reduce clutter from unnecessary closing delimiters",
      "Because curly braces do not exist on English keyboards",
      "To make compiling 100x slower",
      "Because indentation uses less disk space"
    ],
    correct: 0,
    explanationEn: "Python's design philosophy enforces clean, readable code by using indentation for block hierarchy instead of curly braces.",
    explanationBn: "কোডকে পরিচ্ছন্ন, সুন্দর ও সহজপাঠ্য করার জন্য পাইথনে ব্র্যাকেটের বদলে ইন্ডেন্টেশন (স্পেস) দিয়ে ব্লক গঠন নির্ধারণ করা হয়েছে।"
  }
];
