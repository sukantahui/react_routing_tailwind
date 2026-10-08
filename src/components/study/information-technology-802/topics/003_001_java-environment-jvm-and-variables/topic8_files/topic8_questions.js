const topic8_questions = [
  {
    id: 1,
    question: "Which of the following describes the execution model of Java?",
    options: [
      "Purely compiled directly to native machine code",
      "Purely interpreted from raw source text with no compiler",
      "Compiled into Bytecode by javac, then interpreted/JIT-compiled by the JVM",
      "Executed directly by web browsers only"
    ],
    correctAnswer: 2,
    explanation: "Java uses a hybrid model: source code is compiled into platform-neutral bytecode by javac, which the JVM executes via an interpreter and JIT compiler.",
    explanationBn: "জাভা একটি হাইব্রিড মডেল ব্যবহার করে: javac দিয়ে সোর্স কোড বাইটকোডে কম্পাইল হয়, এবং পরবর্তীতে JVM ইন্টারপ্রেটার ও JIT কম্পাইলারের সাহায্যে তা চালায়।",
    hint: "Two-stage execution model."
  },
  {
    id: 2,
    question: "What is the memory footprint of an 'int' variable in Java?",
    options: [
      "2 bytes",
      "4 bytes (32 bits)",
      "8 bytes",
      "1 byte"
    ],
    correctAnswer: 1,
    explanation: "In Java, 'int' is a 32-bit signed integer occupying 4 bytes.",
    explanationBn: "জাভায় 'int' হলো ৩২-বিট সাইন্ড পূর্ণসংখ্যা যা ৪ বাইট মেমরি নেয়।",
    hint: "4 bytes = 32 bits."
  },
  {
    id: 3,
    question: "What will be the output of: `System.out.println(\"Total: \" + 100 + 200);`?",
    options: [
      "Total: 300",
      "Total: 100200",
      "Total: 100 200",
      "Compile error"
    ],
    correctAnswer: 1,
    explanation: "String concatenation evaluates left-to-right, converting numbers to strings: `\"Total: \" + 100` -> `\"Total: 100\"`, then `\"Total: 100\" + 200` -> `\"Total: 100200\"`.",
    explanationBn: "বাম থেকে ডানে কনক্যাটেনেশনের কারণে 'Total: 100200' আউটপুট হয়।",
    hint: "Concatenates 100 and 200 as text."
  },
  {
    id: 4,
    question: "Which of the following is a VALID Java identifier?",
    options: [
      "2ndYear",
      "$total_fee",
      "total-fee",
      "class"
    ],
    correctAnswer: 1,
    explanation: "'$total_fee' contains only allowed characters (letters, digits, $, _) and starts with a dollar sign. '2ndYear' starts with digit, 'total-fee' has hyphen, and 'class' is a keyword.",
    explanationBn: "'$total_fee' সম্পূর্ণ বৈধ। ডিজিট দিয়ে শুরু, হাইফেন বা কিওয়ার্ড ব্যবহার অবৈধ।",
    hint: "Starts with $ and uses underscores."
  },
  {
    id: 5,
    question: "Which keyword is used to declare constants in Java?",
    options: [
      "const",
      "final",
      "static",
      "constant"
    ],
    correctAnswer: 1,
    explanation: "The 'final' keyword creates immutable constants in Java.",
    explanationBn: "জাভায় ধ্রুবক তৈরি করতে 'final' কিওয়ার্ড ব্যবহৃত হয়।",
    hint: "Use final."
  },
  {
    id: 6,
    question: "What is the consequence of declaring: `final double RATE = 5.0; RATE = 6.0;`?",
    options: [
      "RATE updates to 6.0",
      "Compile-time error: cannot assign a value to final variable RATE",
      "Runtime NullPointerException",
      "Throws ArithmeticException"
    ],
    correctAnswer: 1,
    explanation: "A final variable cannot be reassigned once initialized.",
    explanationBn: "final ভ্যারিয়েবলের মান একবার দিলে আর পরিবর্তন করা যায় না, তাই কম্পাইল এরর হয়।",
    hint: "Cannot assign value to final variable."
  },
  {
    id: 7,
    question: "What is the memory size of a 'char' in Java?",
    options: [
      "1 byte",
      "2 bytes (16-bit Unicode)",
      "4 bytes",
      "8 bytes"
    ],
    correctAnswer: 1,
    explanation: "Java char is 2 bytes (16 bits) to support Unicode.",
    explanationBn: "জাভায় char হলো ২ বাইট (১৬-বিট) ইউনিকোড।",
    hint: "2 bytes."
  },
  {
    id: 8,
    question: "What is the range of a 'byte' in Java?",
    options: [
      "-128 to 127",
      "0 to 255",
      "-32,768 to 32,767",
      "-2^31 to 2^31 - 1"
    ],
    correctAnswer: 0,
    explanation: "Signed 8-bit byte ranges from -128 to +127.",
    explanationBn: "byte-এর রেঞ্জ হলো -১২৮ থেকে +১২৭ পর্যন্ত।",
    hint: "-128 to 127."
  },
  {
    id: 9,
    question: "Which equation represents the components of the JDK?",
    options: [
      "JDK = JRE + Development Tools (javac, etc.)",
      "JDK = JVM + Hard Drive",
      "JDK = JRE - Libraries",
      "JDK = JVM + Browser"
    ],
    correctAnswer: 0,
    explanation: "JDK contains the JRE plus development tools like the javac compiler.",
    explanationBn: "JDK হলো JRE এবং ডেভেলপমেন্ট টুলসের সমন্বয়।",
    hint: "JDK = JRE + Tools."
  },
  {
    id: 10,
    question: "What is the error in: `float val = 45.75;`?",
    options: [
      "45.75 is too large",
      "45.75 is double by default, causing a lossy conversion compile error; requires 'f' suffix (`45.75f`)",
      "val is a reserved word",
      "float cannot store decimals"
    ],
    correctAnswer: 1,
    explanation: "Decimals in Java are double by default and require 'f' to be assigned to float.",
    explanationBn: "দশমিক সংখ্যা ডিফল্টভাবে double হওয়ায় float-এ রাখতে 'f' প্রত্যয় যোগ করতে হয়।",
    hint: "Missing 'f' suffix."
  },
  {
    id: 11,
    question: "Where are instantiated Java objects stored in JVM memory?",
    options: [
      "Heap Memory",
      "Java Stack",
      "PC Register",
      "Operating system cache"
    ],
    correctAnswer: 0,
    explanation: "All objects created with 'new' are stored in Heap Memory.",
    explanationBn: "'new' দিয়ে তৈরি অবজেক্টগুলো হিপ মেমরিতে জমা থাকে।",
    hint: "Heap memory."
  },
  {
    id: 12,
    question: "What is the output of: `System.out.println(10 + 20 + \" Sum\");`?",
    options: [
      "1020 Sum",
      "30 Sum",
      "10 + 20 Sum",
      "Syntax error"
    ],
    correctAnswer: 1,
    explanation: "Numbers on the left add numerically first: `10 + 20 = 30`, then concatenate with `\" Sum\"` -> `\"30 Sum\"`.",
    explanationBn: "বাম দিকের ১০ ও ২০ যোগ হয়ে ৩০ হয়, তারপর স্ট্রিং যুক্ত হয়ে '30 Sum' হয়।",
    hint: "Adds first, then concatenates."
  },
  {
    id: 13,
    question: "What does the 'WORA' acronym stand for?",
    options: [
      "Work On Real Applications",
      "Write Once, Run Anywhere",
      "Web Operations Resource Architecture",
      "Wireless Online Radio Access"
    ],
    correctAnswer: 1,
    explanation: "WORA = Write Once, Run Anywhere.",
    explanationBn: "WORA এর অর্থ হলো Write Once, Run Anywhere।",
    hint: "Write Once, Run Anywhere."
  },
  {
    id: 14,
    question: "What is the default value of an uninitialized instance field of type `boolean` in Java?",
    options: [
      "true",
      "false",
      "0",
      "null"
    ],
    correctAnswer: 1,
    explanation: "Instance boolean fields default to 'false'.",
    explanationBn: "বুলিয়ান ফিল্ডের ডিফল্ট মান হয় false।",
    hint: "false."
  },
  {
    id: 15,
    question: "What is the error in: `char grade = \"B\";`?",
    options: [
      "Double quotes denote a String; primitive char requires single quotes 'B'",
      "grade is a reserved word",
      "char cannot hold letter B",
      "Missing colon"
    ],
    correctAnswer: 0,
    explanation: "Char literals must be enclosed in single quotes `'B'`.",
    explanationBn: "char লিটারাল সর্বদা একক উদ্ধৃতিচিহ্নে `'B'` লিখতে হয়।",
    hint: "Use single quotes for char."
  },
  {
    id: 16,
    question: "What is the role of the JIT Compiler in the JVM?",
    options: [
      "To compile frequently executed bytecode hot spots into native machine code",
      "To delete virus files",
      "To format database tables",
      "To convert Java to HTML"
    ],
    correctAnswer: 0,
    explanation: "The JIT compiler boosts execution speed by compiling hot spots directly into host CPU machine code.",
    explanationBn: "JIT কম্পাইলার বারবার ব্যবহৃত কোডকে সরাসরি নেটিভ মেশিন কোডে রূপান্তর করে গতি বাড়ায়।",
    hint: "Compiles hotspots to native code."
  },
  {
    id: 17,
    question: "What will happen if a local variable inside a method is used before initialization?",
    options: [
      "It reads 0",
      "Compile-time error: variable might not have been initialized",
      "It reads null",
      "Runtime NullPointerException"
    ],
    correctAnswer: 1,
    explanation: "Local variables must be explicitly initialized before being read.",
    explanationBn: "মেথডের লোকাল ভ্যারিয়েবল ইনিশিয়ালাইজ না করে ব্যবহার করলে কম্পাইল এরর হয়।",
    hint: "Variable might not have been initialized."
  },
  {
    id: 18,
    question: "What is the standard naming convention for Java constants?",
    options: [
      "camelCase",
      "UPPER_SNAKE_CASE (e.g. MAX_USERS)",
      "PascalCase",
      "kebab-case"
    ],
    correctAnswer: 1,
    explanation: "Constants follow UPPER_SNAKE_CASE convention.",
    explanationBn: "ধ্রুবকের নাম UPPER_SNAKE_CASE (যেমন: `MAX_USERS`) অনুযায়ী লেখা হয়।",
    hint: "ALL_CAPS_WITH_UNDERSCORES."
  },
  {
    id: 19,
    question: "Which of the following is NOT a primitive data type in Java?",
    options: [
      "boolean",
      "char",
      "String",
      "double"
    ],
    correctAnswer: 2,
    explanation: "'String' is a pre-defined class / reference type, not a primitive type.",
    explanationBn: "'String' কোনো প্রিমিটিভ টাইপ নয়, এটি একটি ক্লাস।",
    hint: "String is a class."
  },
  {
    id: 20,
    question: "What is the 4-byte magic number that begins every compiled Java .class file?",
    options: [
      "0xDEADBEEF",
      "0xCAFEBABE",
      "0x00000001",
      "0x12345678"
    ],
    correctAnswer: 1,
    explanation: "Every Java .class file begins with magic header `0xCAFEBABE`.",
    explanationBn: "প্রতিটি জাভা .class ফাইলের শুরুতে `0xCAFEBABE` থাকে।",
    hint: "0xCAFEBABE."
  },
  {
    id: 21,
    question: "What is the difference between `print()` and `println()`?",
    options: [
      "`println()` appends a newline moving cursor to the next line; `print()` stays on the same line",
      "`print()` only prints numbers",
      "`println()` only works on Linux",
      "`print()` requires internet"
    ],
    correctAnswer: 0,
    explanation: "println() appends a newline character (\\n) and advances the cursor to the next line.",
    explanationBn: "println() প্রিন্ট করার পর নতুন লাইনে যায়, আর print() একই লাইনে থাকে।",
    hint: "println adds a newline."
  },
  {
    id: 22,
    question: "Which escape sequence represents a tab in Java strings?",
    options: [
      "\\n",
      "\\t",
      "\\b",
      "\\r"
    ],
    correctAnswer: 1,
    explanation: "`\\t` inserts a horizontal tab.",
    explanationBn: "`\\t` ট্যাব স্পেস তৈরি করে।",
    hint: "\\t for tab."
  },
  {
    id: 23,
    question: "What is the result of `(int) 78.9` in Java?",
    options: [
      "79",
      "78",
      "Compile error",
      "78.9"
    ],
    correctAnswer: 1,
    explanation: "Explicit type casting truncates the decimal fraction to 78.",
    explanationBn: "টাইপ কাস্টিং দশমিক অংশ কেটে দিয়ে ৭৮ করে।",
    hint: "Truncates decimal to 78."
  },
  {
    id: 24,
    question: "Can an identifier in Java contain spaces (e.g. `int student age = 17;`)?",
    options: [
      "Yes",
      "No, whitespace is strictly illegal inside identifier names",
      "Only if surrounded by quotes",
      "Only on Windows"
    ],
    correctAnswer: 1,
    explanation: "Identifiers cannot contain spaces or tabs.",
    explanationBn: "ভ্যারিয়েবলের নামের মাঝে স্পেস থাকা সম্পূর্ণ অবৈধ।",
    hint: "No spaces in identifiers."
  },
  {
    id: 25,
    question: "Which of the following is a reserved keyword in Java?",
    options: [
      "program",
      "include",
      "final",
      "main"
    ],
    correctAnswer: 2,
    explanation: "'final' is a reserved Java keyword. 'main' is a method name, and 'include'/'program' are not Java keywords.",
    explanationBn: "'final' হলো একটি সংরক্ষিত জাভা কিওয়ার্ড।",
    hint: "final is a keyword."
  },
  {
    id: 26,
    question: "What is the purpose of the Garbage Collector in Java?",
    options: [
      "To automatically reclaim memory occupied by unreferenced heap objects",
      "To delete virus files",
      "To compile code",
      "To close open browser tabs"
    ],
    correctAnswer: 0,
    explanation: "The Garbage Collector frees memory by removing orphan objects from the heap.",
    explanationBn: "গার্বেজ কালেক্টর হিপ মেমরিতে থাকা অব্যবহৃত অবজেক্ট মুছে মেমরি খালি করে।",
    hint: "Automatic heap memory reclamation."
  },
  {
    id: 27,
    question: "What is the output of: `System.out.println(\"Sum: \" + (20 + 30));`?",
    options: [
      "Sum: 2030",
      "Sum: 50",
      "Sum: 20+30",
      "Syntax error"
    ],
    correctAnswer: 1,
    explanation: "Parentheses `(20 + 30)` evaluate first to 50, so output is `Sum: 50`.",
    explanationBn: "বন্ধনী থাকায় ২০ + ৩০ = ৫০ আগে সম্পন্ন হয়, ফলে আউটপুট হয় 'Sum: 50'।",
    hint: "Parentheses force addition to 50."
  },
  {
    id: 28,
    question: "Which of the following types occupies 8 bytes of memory in Java?",
    options: [
      "int",
      "double",
      "float",
      "short"
    ],
    correctAnswer: 1,
    explanation: "'double' is an 8-byte (64-bit) floating point type.",
    explanationBn: "'double' হলো ৮ বাইট বিশিষ্ট দশমিক সংখ্যা।",
    hint: "double is 8 bytes."
  },
  {
    id: 29,
    question: "What is the error in: `double amount% = 500.0;`?",
    options: [
      "500.0 must be integer",
      "Illegal character '%' in identifier name",
      "amount is a keyword",
      "Semicolon is misplaced"
    ],
    correctAnswer: 1,
    explanation: "'%' is the modulus operator and cannot be part of an identifier name.",
    explanationBn: "'%' প্রতীকটি আইডেন্টিফায়ারের নাম হিসেবে ব্যবহার করা অবৈধ।",
    hint: "Illegal % character."
  },
  {
    id: 30,
    question: "Which tool in the JDK is used to compile `.java` source files into `.class` bytecode?",
    options: [
      "java.exe",
      "javac.exe",
      "javadoc.exe",
      "jar.exe"
    ],
    correctAnswer: 1,
    explanation: "'javac.exe' is the official Java compiler.",
    explanationBn: "'javac.exe' হলো জাভার মূল কম্পাইলার।",
    hint: "javac is the compiler."
  }
];

export default topic8_questions;
