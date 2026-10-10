export const topic1Questions = [
  {
    id: "t1_q1",
    question: "Which international character encoding standard is used by default in Python 3 source code?",
    options: [
      "ASCII (7-bit)",
      "UTF-8 (Unicode Transformation Format)",
      "EBCDIC",
      "ISCII (8-bit)"
    ],
    correct: 1,
    explanationEn: "Python 3 uses Unicode UTF-8 encoding by default for source code, allowing it to process characters from all world languages including Indian scripts.",
    explanationBn: "পাইথন ৩ সোর্স কোডের জন্য ডিফল্টভাবে ইউনিকোড UTF-8 এনকোডিং ব্যবহার করে, যার ফলে বিশ্বের যেকোনো ভাষা ও প্রতীক সহজে প্রসেস করা যায়।"
  },
  {
    id: "t1_q2",
    question: "What is the ASCII value of the uppercase character 'A' and lowercase character 'a' in Python?",
    options: [
      "'A' = 65, 'a' = 97",
      "'A' = 97, 'a' = 65",
      "'A' = 48, 'a' = 49",
      "'A' = 1, 'a' = 2"
    ],
    correct: 0,
    explanationEn: "In standard ASCII, uppercase 'A' is 65 and lowercase 'a' is 97. The difference between uppercase and lowercase letters is exactly 32.",
    explanationBn: "স্ট্যান্ডার্ড ASCII টেবিলে বড় হাতের 'A'-এর মান ৬৫ এবং ছোট হাতের 'a'-এর মান ৯৭। এদের পার্থক্য ৩২।"
  },
  {
    id: "t1_q3",
    question: "Which of the following built-in Python functions returns the integer Unicode code point / ASCII value of a single character?",
    options: [
      "`ord()`",
      "`chr()`",
      "`ascii()`",
      "`int()`"
    ],
    correct: 0,
    explanationEn: "The `ord(c)` function returns the integer Unicode/ASCII code point of a single character string `c`. E.g., `ord('A')` returns `65`.",
    explanationBn: "`ord()` ফাংশন কোনো একটি অক্ষরের ইউনিকোড বা আসকি মান পূর্ণসংখ্যায় প্রদান করে। যেমন: `ord('A')` ফলাফল দেয় ৬৫।"
  },
  {
    id: "t1_q4",
    question: "What will be the output of `chr(66)` in Python?",
    options: [
      "'B'",
      "'A'",
      "'b'",
      "66"
    ],
    correct: 0,
    explanationEn: "The `chr(i)` function returns the character string whose Unicode code point is integer `i`. `chr(66)` evaluates to `'B'`.",
    explanationBn: "`chr()` ফাংশন সংখ্যার বিপরীতে সংশ্লিষ্ট অক্ষর ফেরত দেয়। `chr(66)` এর ফলাফল হলো 'B'।"
  },
  {
    id: "t1_q5",
    question: "Which of the following statements about Python's case-sensitivity is TRUE?",
    options: [
      "Python is strictly case-sensitive, treating `Marks`, `marks`, and `MARKS` as three completely different identifiers",
      "Python ignores uppercase and lowercase letters",
      "Only keywords are case-insensitive",
      "Python converts all variable names to uppercase automatically"
    ],
    correct: 0,
    explanationEn: "Python is case-sensitive. Identifiers with identical spelling but different casing refer to distinct memory locations.",
    explanationBn: "পাইথন পুরোপুরি কেস-সংবেদনশীল (Case-sensitive)। তাই `Marks`, `marks` এবং `MARKS` তিনটি সম্পূর্ণ ভিন্ন ভেরিয়েবল হিসেবে গণ্য হয়।"
  },
  {
    id: "t1_q6",
    question: "Which of the following is NOT classified as a whitespace character in Python?",
    options: [
      "Horizontal Tab (`\\t`)",
      "Space (` `)",
      "Newline (`\\n`)",
      "Underscore (`_`)"
    ],
    correct: 3,
    explanationEn: "The underscore `_` is classified as a letter/identifier character in Python syntax, NOT a whitespace character.",
    explanationBn: "আন্ডারস্কোর `_` পাইথনে অক্ষরের সমতুল্য হিসেবে গণ্য হয়, এটি কোনো হোয়াইটস্পেস (ফাঁকা স্থান) ক্যারেক্টার নয়।"
  },
  {
    id: "t1_q7",
    question: "What does the escape sequence `\\n` represent in a Python string?",
    options: [
      "Null character",
      "Newline (Line Feed) - moves the cursor to the start of the next line",
      "New variable",
      "Negative number"
    ],
    correct: 1,
    explanationEn: "`\\n` is the standard escape sequence for newline (ASCII 10), causing subsequent text to appear on a new line.",
    explanationBn: "`\\n` হলো নিউলাইন এস্কেপ সিকোয়েন্স, যা পরবর্তী লেখাকে নতুন লাইনে স্থানান্তর করে।"
  },
  {
    id: "t1_q8",
    question: "What does the escape sequence `\\t` accomplish when printed in Python?",
    options: [
      "Inserts a horizontal tab space (advancing cursor to the next tab stop)",
      "Terminates the program",
      "Prints the letter 't'",
      "Clears the screen"
    ],
    correct: 0,
    explanationEn: "`\\t` inserts a horizontal tab (ASCII 9), creating tabular columnar spacing.",
    explanationBn: "`\\t` হরিজন্টাল ট্যাব স্পেস প্রদান করে যা কলামাকারে লেখা সাজাতে ব্যবহৃত হয়।"
  },
  {
    id: "t1_q9",
    question: "How do you include a literal double quotation mark `\"` inside a double-quoted Python string `\"He said ...\"`?",
    options: [
      "Using the escape sequence `\\\"` (e.g., `\"He said \\\"Hello!\\\"\"`)",
      "Using two double quotes `\"\"`",
      "Using `@\"`",
      "Double quotes cannot be included in Python strings"
    ],
    correct: 0,
    explanationEn: "Preceding the quote with a backslash `\\\"` escapes the character so Python does not interpret it as the string delimiter.",
    explanationBn: "ডাবল কোটের ভেতর ডাবল কোট প্রিন্ট করতে ব্যাকস্ল্যাশ দিয়ে এস্কেপ `\\\"` করতে হয়।"
  },
  {
    id: "t1_q10",
    question: "What will `len(\"A\\nB\")` return in Python?",
    options: [
      "3",
      "4",
      "2",
      "1"
    ],
    correct: 0,
    explanationEn: "The string contains three characters: `'A'`, the single escape sequence `\\n` (newline character), and `'B'`. Total length is 3.",
    explanationBn: "স্ট্রিংটিতে ৩টি ক্যারেক্টার রয়েছে: 'A', নিউলাইন '\\n' (একটি একক ক্যারেক্টার), এবং 'B'। ফলে দৈর্ঘ্য ৩।"
  },
  {
    id: "t1_q11",
    question: "What is the ASCII value of the digit character `'0'` in Python?",
    options: [
      "0",
      "48",
      "32",
      "65"
    ],
    correct: 1,
    explanationEn: "The ASCII code point for the digit character `'0'` is 48, `'1'` is 49, and `'9'` is 57.",
    explanationBn: "ডিজিট ক্যারেক্টার '0'-এর আসকি মান হলো ৪৮ এবং '9'-এর মান ৫৭।"
  },
  {
    id: "t1_q12",
    question: "What is the ASCII value of the space character `' '`?",
    options: [
      "0",
      "32",
      "10",
      "255"
    ],
    correct: 1,
    explanationEn: "The standard ASCII code point for a space character is 32 (0x20 in hexadecimal).",
    explanationBn: "স্পেস ক্যারেক্টারের আসকি মান হলো ৩২।"
  },
  {
    id: "t1_q13",
    question: "Which of the following is an invalid escape sequence in Python string literals?",
    options: [
      "`\\n`",
      "`\\t`",
      "`\\\\`",
      "`\\?`"
    ],
    correct: 3,
    explanationEn: "While Python handles unknown escape sequences by preserving the backslash, `\\?` is not a standard recognized escape sequence.",
    explanationBn: "`\\n`, `\\t`, এবং `\\\\` পাইথনের স্ট্যান্ডার্ড এস্কেপ সিকোয়েন্স।"
  },
  {
    id: "t1_q14",
    question: "Can Python 3 source code contain Indian language characters (e.g. Hindi, Bengali, Tamil) in comments and string literals?",
    options: [
      "Yes, Python 3 fully supports all Unicode UTF-8 characters natively",
      "No, only English ASCII is allowed",
      "Only if an external C++ compiler is installed",
      "Only in Python 2.7"
    ],
    correct: 0,
    explanationEn: "Because Python 3 default encoding is UTF-8, characters from Indian scripts and global languages can be used freely inside strings and comments.",
    explanationBn: "হ্যাঁ, পাইথন ৩ সম্পূর্ণভাবে ইউনিকোড UTF-8 সমর্থন করে, তাই বাংলা, হিন্দি ইত্যাদি ভাষায় স্ট্রিং ও কমেন্ট লেখা যায়।"
  },
  {
    id: "t1_q15",
    question: "What will `print(\"Python\\b3\")` display in a standard terminal?",
    options: [
      "`Pytho3` (the backspace deletes the 'n')",
      "`Python\\b3`",
      "`Python3`",
      "`Error`"
    ],
    correct: 0,
    explanationEn: "`\\b` is the backspace escape sequence. It moves the cursor back one position, causing `'3'` to overwrite `'n'`, displaying `Pytho3`.",
    explanationBn: "`\\b` হলো ব্যাকস্পেস এস্কেপ সিকোয়েন্স যা কার্সারকে এক ঘর পেছনে নিয়ে গিয়ে 'n'-কে '3' দ্বারা প্রতিস্থাপন করে।"
  },
  {
    id: "t1_q16",
    question: "What is a raw string in Python created using the `r` prefix (e.g., `r\"C:\\new\\test.txt\"`)?",
    options: [
      "A string where backslashes are treated as literal characters rather than escape characters",
      "A corrupted string",
      "A string stored in RAM only",
      "A binary image file"
    ],
    correct: 0,
    explanationEn: "Raw strings (prefixed with `r` or `R`) treat backslashes as literal characters, preventing `\\n` from becoming a newline.",
    explanationBn: "র-স্ট্রিংয়ে (`r\"...\"`) ব্যাকস্ল্যাশকে এস্কেপ সিকোয়েন্স হিসেবে না দেখে সাধারণ ক্যারেক্টার হিসেবে গণ্য করা হয়।"
  },
  {
    id: "t1_q17",
    question: "What will `len(r\"Hello\\nWorld\")` evaluate to in Python?",
    options: [
      "11",
      "12",
      "10",
      "5"
    ],
    correct: 1,
    explanationEn: "In a raw string, `\\` and `n` are two separate individual characters. Length is 5 + 2 + 5 = 12.",
    explanationBn: "র-স্ট্রিং হওয়ায় `\\` এবং `n` দুটি আলাদা ক্যারেক্টার হিসেবে গুনে মোট দৈর্ঘ্য ১২ হয়।"
  },
  {
    id: "t1_q18",
    question: "Which of the following characters is treated as an alphabetic letter when defining variable identifiers in Python?",
    options: [
      "`$`",
      "`#`",
      "`_` (Underscore)",
      "`@`"
    ],
    correct: 2,
    explanationEn: "In Python lexical rules, the underscore `_` is grouped with alphabetic letters (can start and appear anywhere in identifiers).",
    explanationBn: "পাইথনে আন্ডারস্কোর `_`-কে বর্ণের সমতুল্য মর্যাদা দেওয়া হয়, তাই এটি ভেরিয়েবলের নামের শুরুতে বা মাঝে বসতে পারে।"
  },
  {
    id: "t1_q19",
    question: "What is the escape sequence for an ASCII Bell sound in Python?",
    options: [
      "`\\a`",
      "`\\b`",
      "`\\bell`",
      "`\\s`"
    ],
    correct: 0,
    explanationEn: "`\\a` stands for ASCII Alert / Bell (ASCII code 7).",
    explanationBn: "`\\a` হলো আসকি বেল (Bell/Alert) এস্কেপ সিকোয়েন্স।"
  },
  {
    id: "t1_q20",
    question: "What is the ASCII value difference between any uppercase letter and its corresponding lowercase letter (e.g. `'a'` - `'A'`)?",
    options: [
      "32",
      "26",
      "10",
      "64"
    ],
    correct: 0,
    explanationEn: "The numeric difference between `'a'` (97) and `'A'` (65) is exactly 32 (which represents a single bit flip in binary).",
    explanationBn: "ছোট হাতের ও বড় হাতের অক্ষরের আসকি মানের ব্যবধান ঠিক ৩২ (৯৭ - ৬৫ = ৩২)।"
  },
  {
    id: "t1_q21",
    question: "What is the character representation for Unicode code point `\\u0041` in Python?",
    options: [
      "'A'",
      "'a'",
      "'1'",
      "'@'"
    ],
    correct: 0,
    explanationEn: "Hexadecimal `0041` equals decimal 65, which is the code point for uppercase letter `'A'`.",
    explanationBn: "হেক্সাডেসিমেল 0041 মানে ডেসিমেল ৬৫, যা বড় হাতের 'A'-এর কোড পয়েন্ট।"
  },
  {
    id: "t1_q22",
    question: "Which of the following special characters is used to start a single-line comment in Python?",
    options: [
      "`//`",
      "`#`",
      "`/*`",
      "`--`"
    ],
    correct: 1,
    explanationEn: "The hash/pound symbol `#` is the standard single-line comment delimiter in Python.",
    explanationBn: "পাইথনে একক লাইনের কমেন্ট শুরু করতে হ্যাশ `#` প্রতীক ব্যবহার করা হয়।"
  },
  {
    id: "t1_q23",
    question: "What happens if you use an illegal non-printable character outside strings in Python source code?",
    options: [
      "Python raises a `SyntaxError: invalid character`",
      "Python automatically skips it silently",
      "The computer reboots",
      "The script becomes a binary file"
    ],
    correct: 0,
    explanationEn: "Unrecognized or illegal characters outside of comments and string literals trigger an immediate `SyntaxError`.",
    explanationBn: "স্ট্রিং বা কমেন্টের বাইরে কোনো অবৈধ ক্যারেক্টার থাকলে পাইথন `SyntaxError` তৈরি করে।"
  },
  {
    id: "t1_q24",
    question: "What does the escape sequence `\\r` (Carriage Return) do in a terminal output?",
    options: [
      "Moves the cursor to the beginning of the current line without advancing to the next line",
      "Restarts Python",
      "Reads a variable from user",
      "Reverses the string"
    ],
    correct: 0,
    explanationEn: "`\\r` returns the cursor to the beginning of the current line, allowing subsequent characters to overwrite earlier ones.",
    explanationBn: "`\\r` কার্সারকে নতুন লাইনে না নিয়ে বর্তমান লাইনের একেবারে শুরুতে ফেরত পাঠায়।"
  },
  {
    id: "t1_q25",
    question: "Why was Python 3 updated from Python 2 to treat all strings as Unicode by default?",
    options: [
      "To provide seamless global multilingual support and prevent character encoding errors (like ASCII decode errors)",
      "To make Python 3 incompatible with Linux",
      "To restrict programming to English only",
      "To increase RAM consumption"
    ],
    correct: 0,
    explanationEn: "Defaulting to Unicode UTF-8 in Python 3 solved ubiquitous character encoding bugs and enabled effortless internationalization.",
    explanationBn: "ইউনিকোড UTF-8 ডিফল্ট করায় বিশ্বের সব ভাষা নির্ভুলভাবে সমর্থন করা সম্ভব হয়েছে এবং এনকোডিং সংক্রান্ত সমস্যা দূর হয়েছে।"
  }
];
