const topic7_questions = [
  {
    id: 1,
    question: "Which of the following files contains the intermediate, platform-independent bytecode in a Java software application?",
    options: [
      "App.java",
      "App.class",
      "App.exe",
      "App.obj"
    ],
    correctAnswer: 1,
    explanation: "Compiled Java bytecode is stored in files with the '.class' extension.",
    explanationBn: "কম্পাইল করা জাভা বাইটকোড '.class' এক্সটেনশন বিশিষ্ট ফাইলে সংরক্ষিত থাকে।",
    hint: ".class extension."
  },
  {
    id: 2,
    question: "What is the relationship between the JRE and the JDK?",
    options: [
      "JDK = JRE + Development Tools (like javac, javadoc)",
      "JRE = JDK + Compiler",
      "JDK and JRE are completely identical",
      "JRE contains javac compiler, but JDK does not"
    ],
    correctAnswer: 0,
    explanation: "The Java Development Kit (JDK) is a superset of the JRE; it contains the JRE plus development tools including the javac compiler and debugger.",
    explanationBn: "JDK হলো JRE এবং ডেভেলপার টুলস (যেমন javac, javadoc)-এর সমন্বয়।",
    hint: "JDK contains JRE plus compiler tools."
  },
  {
    id: 3,
    question: "Which of the following primitive data types in Java requires 8 bytes (64 bits) of memory?",
    options: [
      "int and float",
      "long and double",
      "short and char",
      "byte and boolean"
    ],
    correctAnswer: 1,
    explanation: "Both 'long' (64-bit integer) and 'double' (64-bit floating point) occupy 8 bytes in Java memory.",
    explanationBn: "জাভায় 'long' (পূর্ণসংখ্যা) এবং 'double' (দশমিক) উভয়ই ৮ বাইট (৬৪ বিট) মেমরি গ্রহণ করে।",
    hint: "Both long and double are 64 bits."
  },
  {
    id: 4,
    question: "What is the result of executing: `System.out.println(5 + 5 + \" = 10\");`?",
    options: [
      "55 = 10",
      "10 = 10",
      "5 + 5 = 10",
      "Syntax error"
    ],
    correctAnswer: 1,
    explanation: "Numbers on the left add numerically first: `5 + 5` = 10, then `10 + \" = 10\"` concatenates to produce `\"10 = 10\"`.",
    explanationBn: "বাম দিকের সংখ্যা দুটি প্রথমে গাণিতিকভাবে যোগ হয়ে ১০ হয়, তারপর স্ট্রিংয়ের সাথে যুক্ত হয়ে '10 = 10' আউটপুট দেয়।",
    hint: "Left-to-right evaluation adds 5 + 5 first."
  },
  {
    id: 5,
    question: "Why is `double interest% = 8.5;` an illegal variable declaration in Java?",
    options: [
      "8.5 is too large for double",
      "The '%' symbol is the modulus operator and is not allowed inside identifier names",
      "interest is a reserved keyword",
      "Semicolons are not allowed after double declarations"
    ],
    correctAnswer: 1,
    explanation: "Identifiers in Java can only contain letters, digits, underscores, and dollar signs. '%' is an arithmetic operator.",
    explanationBn: "জাভা আইডেন্টিফায়ারে '%' ব্যবহার করা যায় না কারণ এটি মডুলাস অপারেটর।",
    hint: "% is an arithmetic operator."
  },
  {
    id: 6,
    question: "Which keyword prevents a variable from having its value altered after initialization?",
    options: [
      "static",
      "final",
      "const",
      "private"
    ],
    correctAnswer: 1,
    explanation: "The 'final' keyword in Java creates constant variables whose values cannot be reassigned.",
    explanationBn: "জাভায় 'final' কিওয়ার্ডের সাহায্যে এমন ধ্রুবক তৈরি করা যায় যার মান পরবর্তীতে পরিবর্তন করা যায় না।",
    hint: "Use the final keyword."
  },
  {
    id: 7,
    question: "What is the memory size of a 'char' in Java and why?",
    options: [
      "1 byte ASCII",
      "2 bytes Unicode (0 to 65,535)",
      "4 bytes UTF-32",
      "8 bytes String pointer"
    ],
    correctAnswer: 1,
    explanation: "Java char is 2 bytes (16 bits) to support the global Unicode character set.",
    explanationBn: "বিশ্বের সকল ভাষা প্রকাশের জন্য জাভা ২-বাইট ইউনিকোড ক্যারেক্টার সেট ব্যবহার করে।",
    hint: "2 bytes Unicode."
  },
  {
    id: 8,
    question: "What is the default initial value of an uninitialized instance boolean field in a Java class?",
    options: [
      "true",
      "false",
      "0",
      "null"
    ],
    correctAnswer: 1,
    explanation: "Boolean fields in Java classes default to 'false'.",
    explanationBn: "জাভা ক্লাসের বুলিয়ান ফিল্ডের ডিফল্ট মান হয় 'false'।",
    hint: "Defaults to false."
  },
  {
    id: 9,
    question: "What will happen if you compile: `float f = 10.5;` without the 'f' suffix?",
    options: [
      "Compiles cleanly and truncates to 10",
      "Compile-time error: possible lossy conversion from double to float",
      "f becomes 10.5d",
      "Throws RuntimeException"
    ],
    correctAnswer: 1,
    explanation: "10.5 is typed as double by default; assigning an 8-byte double to a 4-byte float causes a lossy conversion compile error.",
    explanationBn: "১০.৫ ডিফল্টভাবে double হওয়ায় ৪-বাইটের float-এ রাখতে গেলে lossy conversion কম্পাইল এরর হয়।",
    hint: "Lossy conversion from double to float."
  },
  {
    id: 10,
    question: "Which of the following identifier names follows standard Java naming convention for CONSTANTS?",
    options: [
      "default_tax_rate",
      "DEFAULT_TAX_RATE",
      "DefaultTaxRate",
      "defaultTaxRate"
    ],
    correctAnswer: 1,
    explanation: "Constants in Java follow UPPER_SNAKE_CASE (all capital letters with underscores).",
    explanationBn: "জাভায় ধ্রুবকের নামকরণের নিয়ম হলো সম্পূর্ণ ক্যাপিটাল লেটার এবং আন্ডারস্কোর (UPPER_SNAKE_CASE)।",
    hint: "ALL_CAPS_WITH_UNDERSCORES."
  },
  {
    id: 11,
    question: "Which of the following is true about the Java Virtual Machine (JVM)?",
    options: [
      "The JVM is platform-independent, while bytecode is platform-dependent",
      "The JVM is platform-dependent, while bytecode is platform-independent",
      "Both JVM and bytecode are platform-dependent",
      "Neither depends on any software"
    ],
    correctAnswer: 1,
    explanation: "Bytecode is universal (.class is platform-independent), while the JVM software must be tailored to each operating system (platform-dependent).",
    explanationBn: "বাইটকোড সবার জন্য সমান (প্ল্যাটফর্ম-স্বাধীন), কিন্তু JVM সফটওয়্যারটি প্রতিটি ওএস-এর জন্য আলাদা (প্ল্যাটফর্ম-নির্ভর)।",
    hint: "Bytecode independent, JVM dependent."
  },
  {
    id: 12,
    question: "What is the role of the Bytecode Verifier in the JVM?",
    options: [
      "To check syntax in .java files",
      "To inspect loaded .class bytecode for memory safety and security violations before execution",
      "To delete unused variables",
      "To compile Java to HTML"
    ],
    correctAnswer: 1,
    explanation: "The Bytecode Verifier ensures the bytecode conforms to JVM specs and does not violate memory access or security rules.",
    explanationBn: "বাইটকোড ভেরিফায়ার কোডের মেমরি নিরাপত্তা ও স্পেসিফিকেশন পরীক্ষা করে।",
    hint: "Ensures memory safety and security."
  },
  {
    id: 13,
    question: "What is the numerical range of the 'byte' data type in Java?",
    options: [
      "0 to 255",
      "-128 to +127",
      "-32,768 to +32,767",
      "-2^31 to 2^31 - 1"
    ],
    correctAnswer: 1,
    explanation: "A signed 8-bit byte ranges from -128 to +127.",
    explanationBn: "৮-বিট সাইন্ড byte-এর রেঞ্জ হলো -১২৮ থেকে +১২৭ পর্যন্ত।",
    hint: "-128 to +127."
  },
  {
    id: 14,
    question: "What is printed by: `System.out.println(\"A\" + 1 + 2);`?",
    options: [
      "A3",
      "A12",
      "3A",
      "Syntax error"
    ],
    correctAnswer: 1,
    explanation: "`\"A\" + 1` evaluates to `\"A1\"`, and `\"A1\" + 2` evaluates to `\"A12\"`.",
    explanationBn: "'A' + 1 = \"A1\", এবং \"A1\" + 2 = \"A12\"।",
    hint: "Left-to-right string concatenation."
  },
  {
    id: 15,
    question: "Which escape sequence represents a newline in Java?",
    options: [
      "\\t",
      "\\n",
      "\\r",
      "\\b"
    ],
    correctAnswer: 1,
    explanation: "`\\n` is the newline character in Java.",
    explanationBn: "`\\n` হলো জাভার নিউলাইন (Newline) এস্কেপ সিকোয়েন্স।",
    hint: "\\n stands for newline."
  },
  {
    id: 16,
    question: "What happens if a local variable is read before being initialized inside a method?",
    options: [
      "It reads value 0",
      "Compile-time error: variable might not have been initialized",
      "It reads null",
      "Runtime NullPointerException"
    ],
    correctAnswer: 1,
    explanation: "Local variables do not receive default values and must be initialized before use.",
    explanationBn: "মেথডের লোকাল ভ্যারিয়েবলে ডিফল্ট মান থাকে না, তাই ব্যবহারের আগে মান না দিলে কম্পাইল এরর হয়।",
    hint: "Uninitialized local variable compile error."
  },
  {
    id: 17,
    question: "Which of the following is an invalid Java identifier?",
    options: [
      "_count",
      "$amount",
      "studentName",
      "9thClass"
    ],
    correctAnswer: 3,
    explanation: "Java identifiers cannot begin with a numeric digit (0-9).",
    explanationBn: "জাভা আইডেন্টিফায়ারের নাম ডিজিট (০-৯) দিয়ে শুরু হতে পারে না।",
    hint: "Cannot start with a digit."
  },
  {
    id: 18,
    question: "Where are instantiated Java objects stored in JVM memory?",
    options: [
      "Java Stack Area",
      "Heap Memory",
      "Program Counter Register",
      "Hard Disk swap"
    ],
    correctAnswer: 1,
    explanation: "Objects created using the 'new' keyword are dynamically allocated in JVM Heap Memory.",
    explanationBn: "জাভায় 'new' দিয়ে তৈরি সকল অবজেক্ট হিপ মেমরিতে (Heap Memory) জমা থাকে।",
    hint: "Heap memory holds objects."
  },
  {
    id: 19,
    question: "Which component of the JVM compiles frequently executed bytecode 'hotspots' into native machine code?",
    options: [
      "ClassLoader",
      "Just-In-Time (JIT) Compiler",
      "Garbage Collector",
      "Bytecode Verifier"
    ],
    correctAnswer: 1,
    explanation: "The JIT compiler accelerates performance by converting frequently executed bytecode blocks directly into native CPU instructions.",
    explanationBn: "JIT কম্পাইলার বারবার চলা কোডকে সরাসরি নেটিভ মেশিন কোডে রূপান্তর করে গতি বাড়ায়।",
    hint: "JIT compiler."
  },
  {
    id: 20,
    question: "What is the standard convention for naming Java CLASSES?",
    options: [
      "camelCase (e.g. studentAccount)",
      "PascalCase starting with uppercase (e.g. StudentAccount)",
      "ALL_CAPS (e.g. STUDENTACCOUNT)",
      "kebab-case (e.g. student-account)"
    ],
    correctAnswer: 1,
    explanation: "Classes and interfaces in Java follow PascalCase, where each word starts with an uppercase letter.",
    explanationBn: "জাভা ক্লাসের নামকরণে PascalCase (যেমন: `StudentAccount`) ব্যবহার করা হয়।",
    hint: "PascalCase with capital first letter."
  },
  {
    id: 21,
    question: "What is the error in: `char ch = 'AB';`?",
    options: [
      "Single quotes can only enclose exactly one character; multiple characters require a String",
      "ch is a reserved keyword",
      "char must always be lowercase",
      "No error"
    ],
    correctAnswer: 0,
    explanation: "A primitive char can only store a single character. 'AB' contains two characters and is invalid syntax in single quotes.",
    explanationBn: "char-এ কেবল একটিমাত্র ক্যারেক্টার রাখা যায়। একাধিক অক্ষরের জন্য String ব্যবহার করতে হয়।",
    hint: "Single character only for char."
  },
  {
    id: 22,
    question: "Which command is used to run a compiled Java class file named 'BillingApp.class'?",
    options: [
      "javac BillingApp.class",
      "java BillingApp",
      "run BillingApp.java",
      "execute BillingApp"
    ],
    correctAnswer: 1,
    explanation: "To execute a class, use `java <ClassName>` without the `.class` extension.",
    explanationBn: "জাভা ক্লাস চালাতে `java BillingApp` কমান্ড ব্যবহার করা হয় (.class লেখা হয় না)।",
    hint: "Use 'java' without .class."
  },
  {
    id: 23,
    question: "What is the hexadecimal magic number present at the start of every valid compiled Java .class file?",
    options: [
      "0xDEADBEEF",
      "0xCAFEBABE",
      "0x12345678",
      "0x00000000"
    ],
    correctAnswer: 1,
    explanation: "Every valid Java bytecode file begins with the 4-byte header `0xCAFEBABE`.",
    explanationBn: "প্রতিটি জাভা .class ফাইলের শুরুতে `0xCAFEBABE` ম্যাজিক নাম্বার থাকে।",
    hint: "0xCAFEBABE."
  },
  {
    id: 24,
    question: "What is the result of casting `(int) 45.89` in Java?",
    options: [
      "46 (rounded up)",
      "45 (truncated decimal)",
      "Compile-time error",
      "45.0"
    ],
    correctAnswer: 1,
    explanation: "Explicit casting from floating point to integer truncates the decimal part, leaving 45.",
    explanationBn: "টাইপ কাস্টিং দশমিক অংশ কেটে বাদ দেয়, ফলে মান হয় ৪৫।",
    hint: "Truncates decimals to 45."
  },
  {
    id: 25,
    question: "Which of the following accurately describes the 'Write Once, Run Anywhere' (WORA) philosophy in CBSE Class 12 IT-802?",
    options: [
      "Java source code is compiled once into platform-independent Bytecode (.class), which executes on any operating system equipped with a compatible JVM",
      "Java applications can only run once before self-deleting",
      "Every operating system must run the exact same C++ executable",
      "Java code cannot run on mobile phones"
    ],
    correctAnswer: 0,
    explanation: "WORA means compiling once to bytecode and running anywhere via the platform's JVM.",
    explanationBn: "WORA অর্থ একবার কোড লিখে বাইটকোডে রূপান্তর করলে তা যেকোনো ওএস-এ থাকা JVM দ্বারা নির্বিঘ্নে চালানো যায়।",
    hint: "Compile once to bytecode, run on any JVM."
  }
];

export default topic7_questions;
