const topic2_questions = [
  {
    id: 1,
    question: "How many primitive data types are officially defined in the Java programming language?",
    options: [
      "4",
      "6",
      "8",
      "10"
    ],
    correctAnswer: 2,
    explanation: "Java defines exactly 8 primitive data types: byte, short, int, long, float, double, char, and boolean.",
    explanationBn: "জাভায় আনুষ্ঠানিকভাবে মোট ৮টি প্রিমিটিভ ডেটা টাইপ রয়েছে: byte, short, int, long, float, double, char, এবং boolean।",
    hint: "4 integer types + 2 floating point types + 1 character type + 1 boolean type."
  },
  {
    id: 2,
    question: "What is the memory size and valid numerical range of the 'byte' data type in Java?",
    options: [
      "1 byte (8 bits), range: -128 to 127",
      "2 bytes (16 bits), range: -32,768 to 32,767",
      "1 byte (8 bits), range: 0 to 255",
      "4 bytes (32 bits), range: -2,147,483,648 to 2,147,483,647"
    ],
    correctAnswer: 0,
    explanation: "In Java, 'byte' occupies 1 byte (8 bits) of memory in signed two's complement format, spanning from -128 (-2^7) to +127 (2^7 - 1).",
    explanationBn: "জাভায় 'byte' টাইপ ১ বাইট (৮ বিট) মেমরি নেয় এবং এর রেঞ্জ হলো -১২৮ থেকে +১২৭ পর্যন্ত।",
    hint: "Minimum is -128, maximum is 127."
  },
  {
    id: 3,
    question: "Why does the Java compiler throw an error for the statement: `float marks = 89.5;`?",
    options: [
      "Because 89.5 is an integer literal",
      "Because by default, all fractional/decimal literals in Java are treated as 'double' (8 bytes), and converting double to float (4 bytes) is a lossy conversion",
      "Because float variables can only hold whole numbers",
      "Because marks is a reserved keyword"
    ],
    correctAnswer: 1,
    explanation: "In Java, any floating-point literal (like 89.5) is automatically typed as 'double'. Assigning an 8-byte double to a 4-byte float causes a compile error: 'possible lossy conversion from double to float'. To fix it, write `89.5f` or `89.5F`.",
    explanationBn: "জাভায় যেকোনো দশমিক সংখ্যাকে ডিফল্টভাবে 'double' (৮ বাইট) ধরা হয়। তাই ৪ বাইটের float-এ রাখতে গেলে 'f' বা 'F' প্রত্যয় (যেমন: 89.5f) যোগ করতে হয়, অন্যথায় lossy conversion ত্রুটি দেয়।",
    hint: "Floating-point literals in Java are double by default."
  },
  {
    id: 4,
    question: "What is the memory size allocated to a 'char' data type in Java, and why is it different from C/C++?",
    options: [
      "1 byte, identical to C/C++ ASCII",
      "2 bytes (16 bits), because Java uses the Unicode character system to support international languages",
      "4 bytes, because Java stores images in char variables",
      "8 bytes, to allow 64-bit character encryption"
    ],
    correctAnswer: 1,
    explanation: "In Java, 'char' occupies 2 bytes (16 bits) ranging from 0 to 65,535 ('\\u0000' to '\\uffff') because Java adopts the international Unicode character set, unlike C/C++ which historically used 1-byte ASCII.",
    explanationBn: "জাভায় 'char' টাইপ ২ বাইট (১৬ বিট) মেমরি নেয় কারণ জাভা আন্তর্জাতিক ইউনিকোড (Unicode) সাপোর্ট করে যাতে বাংলা, হিন্দি ইত্যাদি বিশ্বের সব ভাষা প্রকাশ করা যায়।",
    hint: "Java char is 2 bytes Unicode (0 to 65535)."
  },
  {
    id: 5,
    question: "What are the ONLY two permissible literal values for a 'boolean' variable in Java?",
    options: [
      "0 and 1",
      "YES and NO",
      "true and false",
      "TRUE, FALSE, and NULL"
    ],
    correctAnswer: 2,
    explanation: "In Java, 'boolean' literals can ONLY be 'true' or 'false' (written in lowercase). Unlike C/C++, integers (0 or 1) cannot be implicitly or explicitly converted to boolean.",
    explanationBn: "জাভায় boolean ভ্যারিয়েবলের একমাত্র বৈধ মান হলো 'true' এবং 'false' (ছোট হাতের অক্ষরে)। জাভায় 0 বা 1 কে বুলিয়ান হিসেবে ব্যবহার করা যায় না।",
    hint: "Strictly lowercase true or false."
  },
  {
    id: 6,
    question: "What is the default initial value assigned to an uninitialized instance field of type 'int' and 'boolean' in Java?",
    options: [
      "int: 0, boolean: false",
      "int: null, boolean: null",
      "int: 1, boolean: true",
      "int: 0, boolean: 0"
    ],
    correctAnswer: 0,
    explanation: "In Java, class instance fields of numeric types default to 0 (or 0.0 for floating points), char defaults to '\\u0000', and boolean defaults to 'false'.",
    explanationBn: "জাভায় অবজেক্ট বা ক্লাসের ফিল্ডে int-এর ডিফল্ট মান হয় 0 এবং boolean-এর ডিফল্ট মান হয় false।",
    hint: "Numeric fields default to 0, boolean defaults to false."
  },
  {
    id: 7,
    question: "Which suffix must be appended to an integer literal if its value exceeds the maximum capacity of a 32-bit 'int' (e.g. 9876543210)?",
    options: [
      "I or i",
      "L or l",
      "D or d",
      "B or b"
    ],
    correctAnswer: 1,
    explanation: "Large integer literals beyond the 32-bit int range (-2^31 to 2^31 - 1) require an 'L' or 'l' suffix (e.g. `9876543210L`) to tell the compiler to treat the literal as a 64-bit 'long'. Uppercase 'L' is standard practice to avoid confusion with the digit 1.",
    explanationBn: "int-এর ঊর্ধ্বসীমা ছাড়িয়ে যাওয়া সংখ্যার শেষে 'L' বা 'l' প্রত্যয় (যেমন: 9876543210L) যুক্ত করতে হয় যাতে কম্পাইলার সেটিকে 64-বিট 'long' হিসেবে গণ্য করে।",
    hint: "Use 'L' for long integers."
  },
  {
    id: 8,
    question: "What is the memory size of a 'double' data type in Java?",
    options: [
      "2 bytes (16 bits)",
      "4 bytes (32 bits)",
      "8 bytes (64 bits)",
      "16 bytes (128 bits)"
    ],
    correctAnswer: 2,
    explanation: "In Java, a 'double' is a 64-bit (8 bytes) double-precision IEEE 754 floating-point data type offering approximately 15 decimal digits of precision.",
    explanationBn: "জাভায় 'double' টাইপ ৮ বাইট (৬৪ বিট) মেমরি গ্রহণ করে এবং এটি প্রায় ১৫ ঘর পর্যন্ত সঠিক দশমিক মান প্রদান করে।",
    hint: "Double is 8 bytes, double the size of a 4-byte float."
  },
  {
    id: 9,
    question: "Which of the following data types is NOT a primitive data type in Java?",
    options: [
      "short",
      "char",
      "String",
      "boolean"
    ],
    correctAnswer: 2,
    explanation: "'String' is a pre-defined class (a Reference / Non-Primitive data type) in the java.lang package, whereas short, char, and boolean are built-in primitive data types.",
    explanationBn: "'String' কোনো প্রিমিটিভ টাইপ নয়, এটি একটি ক্লাস বা রেফারেন্স ডেটা টাইপ। অপরপক্ষে short, char, boolean হলো প্রিমিটিভ টাইপ।",
    hint: "Look for the class name that starts with an uppercase letter."
  },
  {
    id: 10,
    question: "What will happen if you attempt to compile: `byte b = 130;` in a Java program?",
    options: [
      "It compiles successfully and wraps around to -126",
      "Compile-time error: 'possible lossy conversion from int to byte' because 130 exceeds the maximum byte limit of 127",
      "It prints 130 on the screen",
      "The program terminates with a NullPointerException"
    ],
    correctAnswer: 1,
    explanation: "The maximum value a signed byte can store is 127. 130 exceeds this limit, causing the Java compiler to raise a compile-time error for possible lossy conversion.",
    explanationBn: "byte-এর সর্বোচ্চ ধারণক্ষমতা ১২৭। ১৩০ সংখ্যাটি ১২৭-এর চেয়ে বড় হওয়ায় কম্পাইল টাইমে 'possible lossy conversion from int to byte' এরর হবে।",
    hint: "130 is outside the range -128 to 127."
  },
  {
    id: 11,
    question: "Which character literal syntax is VALID in Java?",
    options: [
      "char code = \"A\";",
      "char code = 'A';",
      "char code = 'AB';",
      "char code = A;"
    ],
    correctAnswer: 1,
    explanation: "In Java, character literals must contain exactly one character enclosed in SINGLE QUOTES (`'A'`). Double quotes denote String objects, multiple chars in single quotes are invalid, and unquoted letters are treated as undefined variable names.",
    explanationBn: "জাভায় ক্যারেক্টার লিটারাল সর্বদা একক উদ্ধৃতিচিহ্ন (Single Quotes) দিয়ে একটিমাত্র ক্যারেক্টার লিখতে হয় (যেমন: 'A')। ডবল কোটেশন স্ট্রিংয়ের জন্য ব্যবহৃত হয়।",
    hint: "Single quotes around a single character."
  },
  {
    id: 12,
    question: "What is the numerical range of the 'short' data type in Java?",
    options: [
      "-128 to 127",
      "-32,768 to +32,767",
      "-2,147,483,648 to +2,147,483,647",
      "0 to 65,535"
    ],
    correctAnswer: 1,
    explanation: "A 'short' is a 16-bit signed integer. Its range is -2^15 (-32,768) to 2^15 - 1 (+32,767).",
    explanationBn: "'short' হলো ১৬-বিট সাইন্ড ইন্টিজার। এর রেঞ্জ হলো -৩২,৭৬৮ থেকে +৩২,৭৬৭ পর্যন্ত।",
    hint: "2 bytes = 16 bits = -32,768 to 32,767."
  },
  {
    id: 13,
    question: "Consider the statement: `int rollNo = 101;`. How much memory is allocated on the stack for `rollNo`?",
    options: [
      "1 byte",
      "2 bytes",
      "4 bytes (32 bits)",
      "8 bytes"
    ],
    correctAnswer: 2,
    explanation: "In Java, every 'int' variable occupies exactly 4 bytes (32 bits) of memory.",
    explanationBn: "জাভায় প্রতিটি 'int' ভ্যারিয়েবল ঠিক ৪ বাইট (৩২ বিট) মেমরি গ্রহণ করে।",
    hint: "int is 32 bits = 4 bytes."
  },
  {
    id: 14,
    question: "Which of the following primitive types represents whole numbers and occupies the largest memory footprint (8 bytes)?",
    options: [
      "int",
      "short",
      "long",
      "double"
    ],
    correctAnswer: 2,
    explanation: "'long' is the 8-byte (64-bit) integer primitive type. Note that while 'double' is also 8 bytes, it represents floating-point (fractional) numbers, not whole integers.",
    explanationBn: "'long' হলো ৮ বাইট বিশিষ্ট পূর্ণসংখ্যার (integer) প্রিমিটিভ টাইপ। 'double' ও ৮ বাইট কিন্তু তা ভগ্নাংশের জন্য।",
    hint: "Whole number integer type with 64 bits."
  },
  {
    id: 15,
    question: "What is the Unicode escape representation for the default null character in Java?",
    options: [
      "'\\0'",
      "'\\u0000'",
      "'null'",
      "'\\n'"
    ],
    correctAnswer: 1,
    explanation: "The default value of a char in Java is '\\u0000' (Unicode value 0).",
    explanationBn: "জাভায় ক্যারেক্টারের ডিফল্ট নাল মান হলো '\\u0000' (ইউনিকোড মান ০)।",
    hint: "4 hex digits with \\u prefix."
  },
  {
    id: 16,
    question: "Can an integer value be directly assigned to a 'char' variable in Java (e.g. `char c = 65;`)?",
    options: [
      "No, integer and char are completely incompatible",
      "Yes, `char c = 65;` compiles successfully and assigns the character 'A' (ASCII / Unicode value 65)",
      "No, it requires explicit string conversion",
      "Yes, but it prints the number 65 instead of a character"
    ],
    correctAnswer: 1,
    explanation: "Yes! Because Java char is an unsigned 16-bit integer (0 to 65535), assigning `65` assigns the Unicode character at position 65, which is `'A'`. Printing `c` will display `'A'`.",
    explanationBn: "হ্যাঁ! যেহেতু জাভায় char মূলত ১৬-বিট ইন্টিজার মান, তাই `char c = 65;` লিখলে তা 'A' ক্যারেক্টারকে নির্দেশ করে এবং আউটপুটে 'A' দেখায়।",
    hint: "Unicode 65 corresponds to capital letter 'A'."
  },
  {
    id: 17,
    question: "What is the outcome of compiling: `boolean isEnrolled = 1;` in Java?",
    options: [
      "It assigns true to isEnrolled",
      "Compile-time error: 'incompatible types: int cannot be converted to boolean'",
      "It assigns false to isEnrolled",
      "It compiles and runs with a warning"
    ],
    correctAnswer: 1,
    explanation: "In Java, boolean is strictly type-safe. Integers (0 or 1) cannot be converted to boolean. Attempting to assign 1 to a boolean causes a compile-time error: 'incompatible types: int cannot be converted to boolean'.",
    explanationBn: "জাভায় ইন্টিজার ১ বা ০ কে বুলিয়ানে অ্যাসাইন করা যায় না। তাই `boolean isEnrolled = 1;` লিখলে টাইপ ইনকম্প্যাটিবিলিটি এরর দেয়।",
    hint: "Java does not treat 1 as true."
  },
  {
    id: 18,
    question: "Which primitive data type is most appropriate to store the price of a grocery item in Indian Rupees (e.g., ₹249.75)?",
    options: [
      "int",
      "boolean",
      "double or float",
      "char"
    ],
    correctAnswer: 2,
    explanation: "Monetary amounts with fractional paisa (like ₹249.75) require floating-point data types, with 'double' being the standard recommended type in Java.",
    explanationBn: "পয়সা বা ভগ্নাংশ বিশিষ্ট টাকার অঙ্ক (যেমন ২৪৯.৭৫ টাকা) সংরক্ষণের জন্য 'double' বা 'float' ডেটা টাইপ সবচেয়ে উপযুক্ত।",
    hint: "Fractional values need floating-point types."
  },
  {
    id: 19,
    question: "What is the memory size of a 'float' variable in Java?",
    options: [
      "2 bytes",
      "4 bytes (32 bits)",
      "8 bytes",
      "16 bytes"
    ],
    correctAnswer: 1,
    explanation: "A 'float' variable in Java occupies 4 bytes (32 bits) of memory according to the IEEE 754 standard.",
    explanationBn: "জাভায় 'float' ভ্যারিয়েবল ৪ বাইট (৩২ বিট) মেমরি গ্রহণ করে।",
    hint: "Float is 4 bytes."
  },
  {
    id: 20,
    question: "What is the result of casting a double literal to an int: `int total = (int) 99.85;`?",
    options: [
      "100 (rounded to nearest integer)",
      "99 (fractional part is truncated)",
      "Compile-time error",
      "99.85"
    ],
    correctAnswer: 1,
    explanation: "Explicit type casting from a floating-point type to an integer type in Java truncates (chops off) the decimal fraction rather than rounding. Thus, `(int) 99.85` yields `99`.",
    explanationBn: "জাভায় double থেকে int-এ এক্সপ্লিসিট টাইপকাস্টিং করলে দশমিকের পরের অংশ বাদ (truncate) হয়ে যায়, ফলে মান হয় ৯৯।",
    hint: "Casting truncates the decimal portion."
  },
  {
    id: 21,
    question: "Which of the following integer primitive types is unsigned in Java?",
    options: [
      "byte",
      "short",
      "char",
      "int"
    ],
    correctAnswer: 2,
    explanation: "In Java, 'char' is the ONLY unsigned numerical primitive type. It uses all 16 bits to represent values from 0 to 65,535. All other integer types (byte, short, int, long) are signed two's complement types.",
    explanationBn: "জাভায় 'char' হলো একমাত্র আনসাইন্ড (unsigned) প্রিমিটিভ টাইপ, যা ০ থেকে ৬৫,৫৩৫ পর্যন্ত মান ধারণ করতে পারে। বাকি সব পূর্ণসংখ্যা সাইন্ড।",
    hint: "char values range strictly from 0 to 65535 without negative numbers."
  },
  {
    id: 22,
    question: "Which numeric literal contains a valid underscore separator in Java?",
    options: [
      "int phone = _9830012345;",
      "int balance = 50_000;",
      "int code = 50000_;",
      "double rate = 12._5;"
    ],
    correctAnswer: 1,
    explanation: "In Java (from Java 7 onwards), underscores can be placed between digits to improve readability (e.g. `50_000`). Underscores cannot be placed at the start, at the end, or adjacent to a decimal point.",
    explanationBn: "জাভায় সংখ্যার মাঝে পাঠযোগ্যতা বাড়ানোর জন্য আন্ডারস্কোর দেওয়া যায় (যেমন: 50_000)। কিন্তু শুরুতে, শেষে বা দশমিকের ঠিক পাশে দেওয়া অবৈধ।",
    hint: "Underscores must only appear between digits."
  },
  {
    id: 23,
    question: "What is the maximum positive value that an 'int' variable can store in Java?",
    options: [
      "32,767",
      "2,147,483,647 (2^31 - 1)",
      "65,535",
      "4,294,967,295"
    ],
    correctAnswer: 1,
    explanation: "A 32-bit signed int in Java can store values up to 2^31 - 1, which equals 2,147,483,647.",
    explanationBn: "৩২-বিট সাইন্ড int-এর সর্বোচ্চ মান হলো ২,১৪৭,৪৮৩,৬৪৭ (২^৩১ - ১)।",
    hint: "Approximately 2.14 billion."
  },
  {
    id: 24,
    question: "Why should students avoid using 'float' or 'double' for exact financial accounting calculations in production software?",
    options: [
      "Because float and double use binary floating-point representation (IEEE 754) which causes tiny binary rounding errors (e.g. 0.1 + 0.2 != 0.3)",
      "Because Java does not allow multiplication on double values",
      "Because double numbers crash the computer when added",
      "Because float numbers only work on Linux"
    ],
    correctAnswer: 0,
    explanation: "IEEE 754 binary floating-point types cannot represent base-10 fractions (like 0.1 or 0.2) exactly, leading to rounding inaccuracies. For precise banking and accounting, Java provides `java.math.BigDecimal`.",
    explanationBn: "বাইনারি ফ্লোটিং-পয়েন্ট ফরম্যাটের কারণে double বা float-এ সূক্ষ্ম রাউন্ডিং ত্রুটি ঘটে (যেমন 0.1 + 0.2 = 0.30000000000000004)। ব্যাংকিং সফটওয়্যারে তাই BigDecimal ব্যবহার করা হয়।",
    hint: "Binary floating-point rounding precision issues."
  },
  {
    id: 25,
    question: "Which of the following pairs correctly maps the data type to its size in bytes?",
    options: [
      "byte: 1, short: 2, int: 4, long: 8, float: 4, double: 8, char: 2",
      "byte: 2, short: 4, int: 8, long: 16, float: 4, double: 8, char: 1",
      "byte: 1, short: 1, int: 2, long: 4, float: 4, double: 4, char: 2",
      "byte: 8, short: 16, int: 32, long: 64, float: 32, double: 64, char: 16"
    ],
    correctAnswer: 0,
    explanation: "The official byte sizes in Java are: byte (1B), short (2B), int (4B), long (8B), float (4B), double (8B), char (2B).",
    explanationBn: "জাভায় সঠিক বাইট মাপ হলো: byte (১B), short (২B), int (৪B), long (৮B), float (৪B), double (৮B), char (২B)।",
    hint: "1, 2, 4, 8 for ints; 4, 8 for floats; 2 for char."
  }
];

export default topic2_questions;
