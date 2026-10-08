const topic6_questions = [
  {
    id: 1,
    question: "Identify the compiler error in the following statement:\n```java\nfloat temperature = 98.4;\n```",
    options: [
      "No error, it compiles fine",
      "Compile-time error: possible lossy conversion from double to float (98.4 is double by default, requires 'f' suffix)",
      "Runtime NullPointerException",
      "Syntax error on variable name temperature"
    ],
    correctAnswer: 1,
    explanation: "In Java, decimal literals like `98.4` are double (8 bytes) by default. Assigning a double to a float (4 bytes) generates 'possible lossy conversion from double to float'. To fix it, write `98.4f`.",
    explanationBn: "জাভায় দশমিক সংখ্যা ডিফল্টভাবে 'double' হয়। তাই float ভ্যারিয়েবলে রাখতে গেলে 'f' প্রত্যয় (যেমন: 98.4f) না দিলে lossy conversion কম্পাইল এরর হয়।",
    hint: "Requires the 'f' or 'F' suffix for float literals."
  },
  {
    id: 2,
    question: "What is wrong with the following code snippet inside a method?\n```java\nint x;\nint y = x + 10;\nSystem.out.println(y);\n```",
    options: [
      "x is automatically initialized to 0, so y becomes 10",
      "Compile-time error: 'variable x might not have been initialized'",
      "y cannot be added to 10",
      "System.out.println requires string parameters"
    ],
    correctAnswer: 1,
    explanation: "Local variables in Java are not assigned default values. Attempting to use uninitialized local variable 'x' in an arithmetic expression causes a compile-time error: 'variable x might not have been initialized'.",
    explanationBn: "মেথডের লোকাল ভ্যারিয়েবলে কোনো ডিফল্ট মান থাকে না। মান না দিয়ে 'x'-কে যোগ করতে গেলে 'variable x might not have been initialized' কম্পাইল এরর ঘটে।",
    hint: "Local variables must be initialized before being read."
  },
  {
    id: 3,
    question: "Identify the error in the statement: `char Section = \"D\";`",
    options: [
      "Section must start with a lowercase letter",
      "Double quotes define a String; primitive char requires single quotes 'D'",
      "Semicolon is missing",
      "char is not a valid Java keyword"
    ],
    correctAnswer: 1,
    explanation: "Double quotes `\"D\"` denote a String object, causing 'incompatible types: java.lang.String cannot be converted to char'. A char literal requires single quotes `'D'`.",
    explanationBn: "ডবল কোটেশন `\"D\"` হলো String অবজেক্ট। char-এর জন্য একক উদ্ধৃতি চিহ্ন `'D'` ব্যবহার করতে হয়।",
    hint: "Use single quotes for char."
  },
  {
    id: 4,
    question: "Why does the statement `int class = 12;` fail to compile in Java?",
    options: [
      "12 is too large for int",
      "'class' is a reserved Java keyword used to define classes and cannot be used as a variable identifier",
      "Variables must have names longer than 5 characters",
      "Integers cannot store class numbers"
    ],
    correctAnswer: 1,
    explanation: "'class' is one of the most fundamental reserved keywords in Java and cannot be used as an identifier name.",
    explanationBn: "'class' হলো জাভার একটি সংরক্ষিত প্রধান কিওয়ার্ড, তাই এটিকে ভ্যারিয়েবলের নাম হিসেবে ব্যবহার করা সম্পূর্ণ নিষিদ্ধ।",
    hint: "class is a reserved keyword."
  },
  {
    id: 5,
    question: "What will the Java compiler report for: `byte age = 135;`?",
    options: [
      "Successfully compiles and wraps around to -121",
      "Compile-time error: possible lossy conversion from int to byte (135 exceeds maximum byte limit of 127)",
      "Runtime ArithmeticException",
      "Warning: age is too high"
    ],
    correctAnswer: 1,
    explanation: "A signed byte can only store numbers between -128 and +127. 135 exceeds 127, triggering a compile-time lossy conversion error.",
    explanationBn: "byte-এর সর্বোচ্চ ধারণক্ষমতা ১২৭। ১৩৫ সংখ্যাটি এর চেয়ে বড় হওয়ায় কম্পাইল টাইমে lossy conversion ত্রুটি দেখা দেয়।",
    hint: "135 is outside the -128 to 127 byte range."
  },
  {
    id: 6,
    question: "What is the error in the statement: `string studentName = \"Ananya\";`?",
    options: [
      "Ananya must be in single quotes",
      "In Java, the String class begins with an uppercase 'S' (`String studentName = \"Ananya\";`), because Java is case-sensitive and 'string' is unrecognized",
      "String variables cannot be assigned names",
      "Semicolons are not allowed after strings"
    ],
    correctAnswer: 1,
    explanation: "Java is strictly case-sensitive. The standard reference type is `String` with a capital 'S'. Lowercase `string` results in a 'cannot find symbol' error.",
    explanationBn: "জাভা কেস-সেনসিটিভ হওয়ায় 'String'-এর প্রথম অক্ষর বড় হাতের হতে হয়। ছোট হাতের 'string' লিখলে কম্পাইলার টাইপটিকে চিনতে পারে না ('cannot find symbol')।",
    hint: "String class begins with a capital S."
  },
  {
    id: 7,
    question: "What is the error in the statement: `char section = 'AB';`?",
    options: [
      "section is a reserved word",
      "A char literal can only store exactly ONE character; multiple characters inside single quotes cause an 'unclosed character literal' syntax error",
      "char must always be uppercase",
      "Single quotes are invalid in Java"
    ],
    correctAnswer: 1,
    explanation: "A `char` primitive stores a single 16-bit Unicode character. Enclosing multiple characters (`'AB'`) in single quotes causes a compiler syntax error. For multiple characters, use a `String section = \"AB\";`.",
    explanationBn: "char প্রিমিটিভ মাত্র একটি ক্যারেক্টার ধারণ করতে পারে। একক উদ্ধৃতিতে একাধিক অক্ষর `'AB'` লিখলে সিনট্যাক্স এরর হয়। এর জন্য `String` ব্যবহার করা উচিত।",
    hint: "char holds only 1 character."
  },
  {
    id: 8,
    question: "What is the error in the statement: `system.out.println(\"Hello Barrackpore\");`?",
    options: [
      "Hello Barrackpore should have no spaces",
      "`system` must be capitalized as `System` because Java is case-sensitive",
      "println cannot print text",
      "The statement must end with two semicolons"
    ],
    correctAnswer: 1,
    explanation: "`System` is a built-in class in `java.lang` and must start with an uppercase 'S'. `system` (lowercase) causes a 'package system does not exist / cannot find symbol' error.",
    explanationBn: "`System` ক্লাসটির প্রথম অক্ষর বড় হাতের 'S' হতে হবে। ছোট হাতের 'system' লিখলে কম্পাইলার এটিকে খুঁজে পায় না।",
    hint: "System class starts with an uppercase S."
  },
  {
    id: 9,
    question: "Identify the bug in the following variable declaration: `double total-score = 95.5;`",
    options: [
      "95.5 must be an integer",
      "The hyphen '-' is interpreted as a subtraction operator rather than part of the variable identifier",
      "double cannot store decimals",
      "Variables cannot start with the word total"
    ],
    correctAnswer: 1,
    explanation: "Hyphens `-` are not allowed in Java identifiers. The compiler parses `total-score` as `total` minus `score`, causing a syntax error.",
    explanationBn: "জাভায় ভ্যারিয়েবলের নামের মাঝে হাইফেন (-) ব্যবহার করা যায় না, কারণ কম্পাইলার এটিকে বিয়োগ চিহ্ন মনে করে। সঠিক নাম হবে `total_score` বা `totalScore`।",
    hint: "Hyphens look like minus signs to compilers."
  },
  {
    id: 10,
    question: "What is the error in: `boolean flag = \"true\";`?",
    options: [
      "No error, flag is true",
      "Compile-time error: incompatible types: java.lang.String cannot be converted to boolean (quotes turn true into a String literal)",
      "flag must be 1",
      "boolean only accepts numbers"
    ],
    correctAnswer: 1,
    explanation: "Quoting `\"true\"` creates a String literal. A boolean literal in Java must be written without quotes (`boolean flag = true;`).",
    explanationBn: "`\"true\"` কোটেশনের মধ্যে থাকায় এটি একটি String হয়ে গেছে। বুলিয়ান লিটারাল কোটেশন ছাড়া `true` বা `false` লিখতে হয়।",
    hint: "Boolean literals do not use quotes."
  },
  {
    id: 11,
    question: "What error occurs in: `long phone = 9876543210;`?",
    options: [
      "long cannot store 10 digits",
      "Compile-time error: integer number too large (the literal is treated as int by default, requires 'L' suffix: `9876543210L`)",
      "phone is a keyword",
      "No error"
    ],
    correctAnswer: 1,
    explanation: "Without the 'L' or 'l' suffix, the integer literal `9876543210` is parsed as a 32-bit `int`, which overflows the 2.14 billion limit, yielding 'integer number too large'. Appending 'L' fixes it.",
    explanationBn: "শেষে 'L' না দিলে কম্পাইলার সংখ্যাটিকে ৩২-বিট int মনে করে এবং int-এর সীমা পেরিয়ে যাওয়ায় 'integer number too large' এরর দেয়। সঠিক রূপ: `9876543210L`।",
    hint: "Large integer literals need the 'L' suffix."
  },
  {
    id: 12,
    question: "What is the compiler reaction to the statement: `int a, b = 10, int c;`?",
    options: [
      "Valid multi-variable declaration",
      "Syntax error: the type `int` cannot be repeated in the middle of a comma-separated declaration list",
      "Only b is initialized",
      "a and c become boolean"
    ],
    correctAnswer: 1,
    explanation: "In Java, in a single comma-separated list, the type is specified only once at the beginning: `int a, b = 10, c;`. Repeating `int` in the middle causes a syntax error.",
    explanationBn: "একই লাইনে কমা দিয়ে একাধিক ভ্যারিয়েবল ডিক্লেয়ার করার সময় টাইপ (int) কেবল শুরুতে একবারই দিতে হয়, মাঝে পুনরায় `int` লিখলে সিনট্যাক্স এরর হয়।",
    hint: "Do not repeat the type keyword in comma-separated declarations."
  },
  {
    id: 13,
    question: "What happens when you compile:\n```java\nint x = 10\nint y = 20;\n```",
    options: [
      "Compiles successfully because newline terminates statements",
      "Compile-time error: ';' expected at the end of the first line",
      "x and y are merged into 1020",
      "Warning: missing semicolon"
    ],
    correctAnswer: 1,
    explanation: "In Java, statements MUST be terminated with a semicolon `;`. Unlike Python or JavaScript, newlines do not terminate statements.",
    explanationBn: "জাভায় প্রতিটি স্টেটমেন্টের শেষে সেমিকোলন (;) দেওয়া বাধ্যতামূলক। প্রথম লাইনের শেষে সেমিকোলন না থাকায় '; expected' কম্পাইল এরর হবে।",
    hint: "Semicolons are mandatory statement terminators."
  },
  {
    id: 14,
    question: "What is the error in: `char symbol = '';` (empty single quotes)?",
    options: [
      "Compiles and assigns space",
      "Compile-time error: empty character literal (a char literal must contain exactly one character)",
      "Assigns null",
      "Prints blank screen"
    ],
    correctAnswer: 1,
    explanation: "Java does not permit empty character literals `''`. A char literal must contain at least one character or an escape sequence (e.g. `' '` or `'\\u0000'`).",
    explanationBn: "জাভায় ফাঁকা ক্যারেক্টার লিটারাল `''` অবৈধ। একক উদ্ধৃতির মাঝে অন্তত একটি অক্ষর বা স্পেস থাকতে হবে (যেমন: `' '`)।",
    hint: "Empty char literals '' are illegal in Java."
  },
  {
    id: 15,
    question: "What error occurs if you try to redeclare a variable in the same scope:\n```java\nint count = 5;\ndouble count = 10.5;\n```",
    options: [
      "count is converted to double with value 10.5",
      "Compile-time error: variable count is already defined in scope",
      "Runtime ClassCastException",
      "The program prompts for variable renaming"
    ],
    correctAnswer: 1,
    explanation: "In Java, declaring two variables with the exact same identifier name in the same scope triggers a compile error: 'variable count is already defined'.",
    explanationBn: "একই স্কোপে একই নামের দুটি ভ্যারিয়েবল ডিক্লেয়ার করলে 'variable count is already defined' কম্পাইল এরর ঘটে।",
    hint: "Duplicate variable identifier in same scope."
  },
  {
    id: 16,
    question: "Identify the error in: `final int MAX = 100; MAX = MAX + 1;`",
    options: [
      "MAX becomes 101",
      "Compile-time error: cannot assign a value to final variable MAX",
      "100 cannot be incremented",
      "Arithmetic overflow"
    ],
    correctAnswer: 1,
    explanation: "'final' variables are immutable. Modifying `MAX` after initialization triggers 'cannot assign a value to final variable MAX'.",
    explanationBn: "'final' ভ্যারিয়েবলের মান অপরিবর্তনীয়। তাই 'MAX'-এর মান বাড়ানোর চেষ্টা করলে কম্পাইল এরর হবে।",
    hint: "Final variables cannot be modified."
  },
  {
    id: 17,
    question: "What is the error in: `int #id = 501;`?",
    options: [
      "501 is not a valid integer",
      "Illegal character '#' in variable identifier",
      "id is a reserved keyword",
      "Missing public access modifier"
    ],
    correctAnswer: 1,
    explanation: "The '#' symbol is illegal in Java identifier names. Only letters, digits, `_`, and `$` are permitted.",
    explanationBn: "জাভা আইডেন্টিফায়ারে '#' প্রতীকটি ব্যবহার করা অবৈধ।",
    hint: "Illegal character #."
  },
  {
    id: 18,
    question: "What will the compiler output for: `boolean status = TRUE;` (in all uppercase)?",
    options: [
      "Compiles and sets status to true",
      "Compile-time error: cannot find symbol variable TRUE (Java boolean literals are strictly lowercase `true` and `false`)",
      "Runtime NullPointerException",
      "Warning: uppercase deprecated"
    ],
    correctAnswer: 1,
    explanation: "Java boolean literals are strictly lowercase: `true` and `false`. `TRUE` in uppercase is treated as an undeclared variable name, causing a 'cannot find symbol' error.",
    explanationBn: "জাভায় বুলিয়ান লিটারাল কঠোরভাবে ছোট হাতের অক্ষরে `true` এবং `false`। বড় হাতের `TRUE` লিখলে কম্পাইলার সেটিকে একটি অনির্ধারিত ভ্যারিয়েবল মনে করে এরর দেয়।",
    hint: "Boolean literals must be lowercase true or false."
  },
  {
    id: 19,
    question: "What is the error in: `int val = 085;`?",
    options: [
      "val is too small",
      "Compile-time error: integer number too large / illegal octal digit (a leading 0 indicates an Octal literal, but '8' is not a valid octal digit [0-7])",
      "val prints 85",
      "val converts to float"
    ],
    correctAnswer: 1,
    explanation: "In Java, an integer literal beginning with a leading `0` is treated as an Octal (base-8) number. Octal numbers only allow digits 0 through 7. Digit `8` in `085` causes an illegal octal digit error.",
    explanationBn: "জাভায় সংখ্যার শুরুতে '0' থাকলে কম্পাইলার সেটিকে অক্টাল (Octal) সংখ্যা মনে করে। কিন্তু অক্টালে ০ থেকে ৭ পর্যন্ত অঙ্ক থাকে, তাই '085'-এ থাকা '8'-এর জন্য এরর হয়।",
    hint: "Leading 0 signifies octal notation in Java."
  },
  {
    id: 20,
    question: "What is the compiler error in: `int x = 5.0 / 2;`?",
    options: [
      "x receives 2",
      "Compile-time error: possible lossy conversion from double to int (5.0 makes the expression a double)",
      "Runtime ArithmeticException",
      "x receives 2.5"
    ],
    correctAnswer: 1,
    explanation: "Because `5.0` is a double, `5.0 / 2` evaluates to double `2.5`. Assigning a double to an int variable without an explicit cast `(int)` causes a lossy conversion compile error.",
    explanationBn: "`5.0` থাকায় `5.0 / 2` এর ফলাফল হয় double `2.5`। টাইপ কাস্টিং ছাড়া double-কে int ভ্যারিয়েবলে রাখা যায় না, ফলে lossy conversion এরর হয়।",
    hint: "Floating point division produces double."
  },
  {
    id: 21,
    question: "How do you correct `int x = 5.0 / 2;` so that it compiles and stores the integer quotient?",
    options: [
      "int x = (int)(5.0 / 2);",
      "int x = 5.0 / 2f;",
      "int x = [int] 5.0 / 2;",
      "int x = int(5.0 / 2);"
    ],
    correctAnswer: 0,
    explanation: "Use explicit type casting with parentheses `(int)`: `int x = (int)(5.0 / 2);` which truncates the result to 2.",
    explanationBn: "এক্সপ্লিসিট টাইপ কাস্টিং `(int)` ব্যবহার করে `int x = (int)(5.0 / 2);` লিখলে কোডটি কম্পাইল হবে এবং মান হবে ২।",
    hint: "Use (int) for type casting in Java."
  },
  {
    id: 22,
    question: "What is the error in: `double price = ₹450.0;` in Java source code?",
    options: [
      "price is an invalid name",
      "₹ cannot be placed in front of a numeric literal without quotes (Java literals cannot contain currency symbols)",
      "double cannot store 450.0",
      "price must be float"
    ],
    correctAnswer: 1,
    explanation: "Numeric literals in Java cannot contain currency symbols. `₹` in front of `450.0` causes a syntax error. The numeric literal must be simply `450.0`.",
    explanationBn: "সংখ্যার সাথে সরাসরি মুদ্রা প্রতীক (যেমন ₹450.0) লেখা যায় না। সংখ্যাটি কেবল `450.0` হতে হবে।",
    hint: "Currency symbols cannot be part of numeric literals."
  },
  {
    id: 23,
    question: "What will happen if you compile: `int a = 10;;` (two consecutive semicolons)?",
    options: [
      "Fatal compile-time error",
      "Valid in Java: the second semicolon is parsed as an empty null statement",
      "Throws NullPointerException",
      "Deletes variable a"
    ],
    correctAnswer: 1,
    explanation: "In Java, an extra semicolon `;` is treated as an empty statement and is legally tolerated by the compiler without causing a syntax error.",
    explanationBn: "জাভায় অতিরিক্ত সেমিকোলন (;;) একটি ফাঁকা স্টেটমেন্ট (Empty Statement) হিসেবে গণ্য হয় এবং এটি কোনো এরর তৈরি করে না।",
    hint: "An extra semicolon is treated as an empty statement."
  },
  {
    id: 24,
    question: "What is the error in the statement: `float discount = 0.10d;`?",
    options: [
      "0.10d is too small",
      "Compile-time error: 'd' suffix explicitly declares a double, which cannot be assigned to a float without casting",
      "discount must be an integer",
      "float must have uppercase letters"
    ],
    correctAnswer: 1,
    explanation: "The 'd' suffix explicitly denotes a 64-bit double literal, which cannot be assigned to a 32-bit float without an explicit `(float)` cast, causing a possible lossy conversion error.",
    explanationBn: "'d' প্রত্যয় স্পষ্টভাবে double নির্দেশ করে, যা টাইপকাস্টিং ছাড়া float ভ্যারিয়েবলে অ্যাসাইন করা যায় না।",
    hint: "'d' suffix signifies double."
  },
  {
    id: 25,
    question: "Which of the following summaries provides the best strategy for solving CBSE Class 12 IT-802 'Error Identification' questions?",
    options: [
      "Check for: 1) Missing 'f' on float literals; 2) Double quotes on char; 3) Uninitialized local variables; 4) Reserved keywords as variable names; 5) Hyphens/special symbols in identifiers; 6) Case-sensitivity errors (String, System)",
      "Always assume every line of code has at least 3 errors",
      "Change all variables to String type",
      "Delete all semicolons from the code"
    ],
    correctAnswer: 0,
    explanation: "Checking these 6 classic areas guarantees finding all syntax and semantic errors in CBSE Class 12 IT-802 code debugging questions.",
    explanationBn: "এই ৬টি প্রধান বিষয় (float-এ f না থাকা, char-এ ডবল কোট, ইনিশিয়ালাইজ না করা, কিওয়ার্ডের ব্যবহার, হাইফেন বা স্পেস এবং ক্যাপিটালাইজেশন ভুল) লক্ষ্য রাখলে বোর্ডের সব এরর শনাক্ত করা সম্ভব।",
    hint: "Review all 6 classic compiler traps."
  }
];

export default topic6_questions;
