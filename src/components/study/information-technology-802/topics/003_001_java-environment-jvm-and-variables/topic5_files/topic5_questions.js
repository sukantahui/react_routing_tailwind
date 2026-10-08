const topic5_questions = [
  {
    id: 1,
    question: "What is the primary operational difference between `System.out.print()` and `System.out.println()` in Java?",
    options: [
      "`System.out.print()` only works for numbers, while `System.out.println()` works for text",
      "`System.out.println()` prints the argument and appends a newline moving the cursor to the next line, whereas `System.out.print()` keeps the cursor on the same line",
      "`System.out.print()` prints directly to a printer hardware machine",
      "`System.out.println()` encrypts the output text"
    ],
    correctAnswer: 1,
    explanation: "`System.out.println()` prints the supplied content and moves the console cursor to the beginning of the next line, whereas `System.out.print()` leaves the cursor immediately following the printed text on the current line.",
    explanationBn: "`System.out.println()` প্রিন্ট করার পর নতুন লাইনে (Newline) চলে যায়, আর `System.out.print()` একই লাইনে কার্সার রেখে দেয় যাতে পরবর্তী প্রিন্ট একই লাইনে হয়।",
    hint: "Notice 'ln' stands for line (newline)."
  },
  {
    id: 2,
    question: "What will be the exact console output of the following Java code snippet?\n```java\nSystem.out.print(\"CBSE \");\nSystem.out.print(\"Class \");\nSystem.out.println(\"XII\");\nSystem.out.print(\"IT-802\");\n```",
    options: [
      "CBSE Class XII IT-802 (all on one line)",
      "CBSE Class XII\nIT-802 (on two lines)",
      "CBSE\nClass\nXII\nIT-802 (on four lines)",
      "Syntax error"
    ],
    correctAnswer: 1,
    explanation: "The first two print statements output 'CBSE ' and 'Class ' on line 1. `println(\"XII\")` appends 'XII' on line 1 and moves to line 2. Then `print(\"IT-802\")` prints 'IT-802' on line 2.",
    explanationBn: "প্রথম দুটি print একই লাইনে 'CBSE Class ' লেখে। println('XII') সেই লাইনে 'XII' লিখে কার্সার নিচে নামায়। ফলে 'IT-802' দ্বিতীয় লাইনে মুদ্রিত হয়।",
    hint: "Track cursor line breaks on println."
  },
  {
    id: 3,
    question: "What is the predicted console output of the following statement?\n```java\nSystem.out.println(\"Sum = \" + 10 + 20);\n```",
    options: [
      "Sum = 30",
      "Sum = 1020",
      "Sum = 10 20",
      "Compile-time error"
    ],
    correctAnswer: 1,
    explanation: "Java evaluates '+' from left to right. First, '\"Sum = \" + 10' performs string concatenation producing '\"Sum = 10\"'. Next, '\"Sum = 10\" + 20' concatenates 20, producing 'Sum = 1020'.",
    explanationBn: "জাভা বাম থেকে ডানে মূল্যায়ন করে। প্রথমে '\"Sum = \" + 10' হয়ে '\"Sum = 10\"' (স্ট্রিং) তৈরি হয়। তারপর '\"Sum = 10\" + 20' যুক্ত হয়ে 'Sum = 1020' আউটপুট দেয়।",
    hint: "Left-to-right evaluation converts subsequent numbers to strings."
  },
  {
    id: 4,
    question: "What is the predicted console output of the following statement?\n```java\nSystem.out.println(\"Sum = \" + (10 + 20));\n```",
    options: [
      "Sum = 1020",
      "Sum = 30",
      "Sum = (10+20)",
      "Compile-time error"
    ],
    correctAnswer: 1,
    explanation: "Parentheses `(10 + 20)` have the highest precedence, so mathematical addition executes first to yield 30. Then `\"Sum = \" + 30` concatenates to produce `Sum = 30`.",
    explanationBn: "প্রথম বন্ধনী `(10 + 20)`-এর অগ্রাধিকার বেশি থাকায় প্রথমে ১০ ও ২০ যোগ হয়ে ৩০ হয়। এরপর স্ট্রিংয়ের সাথে যুক্ত হয়ে 'Sum = 30' আউটপুট দেয়।",
    hint: "Parentheses force addition before string concatenation."
  },
  {
    id: 5,
    question: "What is the predicted console output of the following statement?\n```java\nSystem.out.println(10 + 20 + \" is the answer\");\n```",
    options: [
      "1020 is the answer",
      "30 is the answer",
      "10 + 20 is the answer",
      "Compile-time error"
    ],
    correctAnswer: 1,
    explanation: "Evaluation begins left to right: `10 + 20` involves two integer operands, so arithmetic addition occurs first producing integer `30`. Then `30 + \" is the answer\"` concatenates to yield `\"30 is the answer\"`.",
    explanationBn: "বাম দিকে প্রথমে দুটি সংখ্যা থাকায় `10 + 20` গাণিতিক যোগ হয়ে ৩০ হয়। এরপর স্ট্রিংয়ের সাথে যুক্ত হয়ে '30 is the answer' হয়।",
    hint: "Numbers on the left add together before encountering a string."
  },
  {
    id: 6,
    question: "In the statement `System.out.println(\"Hello\");`, what is `out`?",
    options: [
      "A keyword in Java",
      "A public static final field of the `System` class of type `java.io.PrintStream`",
      "A method of the `System` class",
      "A local primitive variable"
    ],
    correctAnswer: 1,
    explanation: "`out` is a public static object reference in the `System` class that points to the standard output stream (an instance of `java.io.PrintStream`).",
    explanationBn: "`out` হলো `System` ক্লাসের একটি public static অবজেক্ট ভ্যারিয়েবল যা `PrintStream` ক্লাসের ইন্সট্যান্স নির্দেশ করে।",
    hint: "Static field of System class."
  },
  {
    id: 7,
    question: "Which escape sequence in Java inserts a tab space into a printed string?",
    options: [
      "\\n",
      "\\t",
      "\\b",
      "\\r"
    ],
    correctAnswer: 1,
    explanation: "`\\t` is the horizontal tab escape sequence in Java, which advances the cursor to the next horizontal tab stop.",
    explanationBn: "`\\t` হলো জাভার হরাইজন্টাল ট্যাব (Tab) এস্কেপ সিকোয়েন্স, যা আউটপুটে ফাঁকা ট্যাব স্পেস তৈরি করে।",
    hint: "'t' stands for tab."
  },
  {
    id: 8,
    question: "How do you print a string that contains literal double quotes, such as: `He said \"Hello\"` in Java?",
    options: [
      "System.out.println(\"He said \"Hello\"\");",
      "System.out.println(\"He said \\\"Hello\\\"\");",
      "System.out.println('He said \"Hello\"');",
      "System.out.println(\"He said /\"Hello/\");"
    ],
    correctAnswer: 1,
    explanation: "To embed double quotes inside a string literal, escape each double quote using a backslash: `\\\"`. Thus: `\"He said \\\"Hello\\\"\"`.",
    explanationBn: "স্ট্রিংয়ের ভেতরে ডবল কোটেশন প্রিন্ট করতে ব্যাকস্ল্যাশ দিয়ে এস্কেপ করতে হয়: `\\\"`। তাই সঠিক রূপ হলো `\"He said \\\"Hello\\\"\"`।",
    hint: "Use \\\" to escape double quotes."
  },
  {
    id: 9,
    question: "What is the output of the following Java statement?\n```java\nSystem.out.println(\"Path: C:\\\\Java\\\\bin\");\n```",
    options: [
      "Path: C:\\\\Java\\\\bin",
      "Path: C:\\Java\\bin",
      "Path: C:/Java/bin",
      "Compile-time error: unknown escape characters"
    ],
    correctAnswer: 1,
    explanation: "Each double backslash `\\\\` is an escape sequence that represents a single literal backslash character in output. Hence, `C:\\\\Java\\\\bin` prints `C:\\Java\\bin`.",
    explanationBn: "জাভায় প্রতিটি ডবল ব্যাকস্ল্যাশ `\\\\` আউটপুটে একটিমাত্র একক ব্যাকস্ল্যাশ হিসেবে মুদ্রিত হয়। ফলে আউটপুট হবে `C:\\Java\\bin`।",
    hint: "\\\\ escapes to a single backslash."
  },
  {
    id: 10,
    question: "What is the result of calling `System.out.println();` with no arguments?",
    options: [
      "Compile-time error: arguments are mandatory",
      "Prints a blank line and moves the cursor to the next line",
      "Prints the word 'null'",
      "Clears the entire console screen"
    ],
    correctAnswer: 1,
    explanation: "`System.out.println()` with no arguments simply writes a line terminator (newline `\\n`), producing a blank line on the console.",
    explanationBn: "কোনো আর্গুমেন্ট ছাড়া `System.out.println()` কল করলে এটি একটি ফাঁকা লাইন প্রিন্ট করে পরবর্তী লাইনে চলে যায়।",
    hint: "Prints an empty newline."
  },
  {
    id: 11,
    question: "Can `System.out.print()` be called with no arguments like `System.out.print();`?",
    options: [
      "Yes, it does nothing",
      "No, `System.out.print()` requires at least one parameter; calling it empty generates a compile-time error",
      "Yes, it prints a space",
      "Yes, it prints 0"
    ],
    correctAnswer: 1,
    explanation: "Unlike `println()`, the `PrintStream` class has NO parameterless `print()` method overload. Calling `System.out.print();` causes a compile error: 'no suitable method found for print()'.",
    explanationBn: "`println()` এর মতো প্যারামিটারহীন `print()` মেথড জাভায় নেই। তাই `System.out.print();` লিখলে কম্পাইল এরর হয়।",
    hint: "print() requires an argument, unlike println()."
  },
  {
    id: 12,
    question: "What is the output of the following Java code?\n```java\nint a = 5, b = 2;\nSystem.out.println(\"Output: \" + a * b);\n```",
    options: [
      "Output: 52",
      "Output: 10",
      "Output: 5*2",
      "Compile-time error"
    ],
    correctAnswer: 1,
    explanation: "Multiplication `*` has higher operator precedence than addition/concatenation `+`. So `a * b` (5 * 2 = 10) is computed first, and then `\"Output: \" + 10` evaluates to `Output: 10`.",
    explanationBn: "গুণ অপারেটর `*`-এর অগ্রাধিকার যোগ/কনক্যাটেনেশনের চেয়ে বেশি হওয়ায় প্রথমে ৫ * ২ = ১০ হয়, তারপর 'Output: 10' প্রিন্ট হয়।",
    hint: "Multiplication takes precedence over concatenation."
  },
  {
    id: 13,
    question: "What will be the output of the following Java code?\n```java\nSystem.out.println('A' + 'B');\n```",
    options: [
      "AB",
      "131",
      "A B",
      "Compile-time error"
    ],
    correctAnswer: 1,
    explanation: "In Java, characters are numerical types (ASCII/Unicode). `'A'` is 65 and `'B'` is 66. The `+` operator between two char primitives performs integer addition: `65 + 66 = 131`.",
    explanationBn: "জাভায় char মূলত পূর্ণসংখ্যা। 'A'-এর মান ৬৫ এবং 'B'-এর মান ৬৬। দুটি char যোগ করলে তাদের সাংখ্যিক মানের যোগফল (৬৫ + ৬৬ = ১৩১) পাওয়া যায়।",
    hint: "'A' is 65, 'B' is 66; addition adds their numeric Unicode values."
  },
  {
    id: 14,
    question: "How can you print 'AB' using character primitives without adding their numerical values?",
    options: [
      "System.out.println(\"\" + 'A' + 'B');",
      "System.out.println('A' * 'B');",
      "System.out.println('A' + 0 + 'B');",
      "System.out.println(('A')('B'));"
    ],
    correctAnswer: 0,
    explanation: "Prefixing with an empty string `\"\" + 'A'` forces string concatenation, turning `'A'` into `\"A\"`, and then `\"A\" + 'B'` becomes `\"AB\"`.",
    explanationBn: "একটি ফাঁকা স্ট্রিং `\"\" + 'A'` দিলে তা স্ট্রিং কনক্যাটেনেশনে রূপ নেয়, ফলে 'AB' হিসেবে মুদ্রিত হয়।",
    hint: "Starting with an empty string forces string conversion."
  },
  {
    id: 15,
    question: "What is the output of the following snippet?\n```java\nSystem.out.print(\"Line 1\\nLine 2\\nLine 3\");\n```",
    options: [
      "Line 1\\nLine 2\\nLine 3 on a single line",
      "Line 1, Line 2, and Line 3 each on separate lines",
      "Line 1 Line 2 Line 3 with tabs",
      "Syntax error"
    ],
    correctAnswer: 1,
    explanation: "Even though `System.out.print()` is used, the embedded `\\n` newline escape sequences force the console to break onto new lines, printing 3 separate lines.",
    explanationBn: "যদিও `print()` ব্যবহৃত হয়েছে, কিন্তু স্ট্রিংয়ের ভেতরে থাকা `\\n` এস্কেপ সিকোয়েন্সের কারণে টেক্সটটি ৩টি আলাদা লাইনে মুদ্রিত হবে।",
    hint: "\\n forces a line break."
  },
  {
    id: 16,
    question: "Which package does the `System` class belong to in Java?",
    options: [
      "java.io",
      "java.util",
      "java.lang",
      "java.awt"
    ],
    correctAnswer: 2,
    explanation: "The `System` class belongs to the `java.lang` package, which is automatically imported into every Java source file by default without requiring an `import` statement.",
    explanationBn: "`System` ক্লাসটি `java.lang` প্যাকেজের অন্তর্ভুক্ত, যা সব জাভা ফাইলে ডিফল্টভাবে স্বয়ংক্রিয়ভাবে ইমপোর্ট থাকে।",
    hint: "The core package imported automatically."
  },
  {
    id: 17,
    question: "What is the difference between `System.out` and `System.err` in Java?",
    options: [
      "System.out is for graphics; System.err is for sound",
      "System.out is the standard output stream, while System.err is the standard error stream dedicated to displaying error messages/diagnostics",
      "System.err deletes errors from the computer",
      "System.out is only available in Linux"
    ],
    correctAnswer: 1,
    explanation: "`System.out` writes to standard output (STDOUT), whereas `System.err` writes to standard error (STDERR), often displayed in red text in IDE consoles for logging errors.",
    explanationBn: "`System.out` সাধারণ আউটপুটের জন্য (STDOUT) এবং `System.err` এরর বা ত্রুটি বার্তা প্রদর্শনের জন্য (STDERR) ব্যবহৃত হয়।",
    hint: "STDOUT vs STDERR."
  },
  {
    id: 18,
    question: "What is the predicted output of:\n```java\nint x = 5;\nSystem.out.println(\"Value: \" + x + 5);\n```",
    options: [
      "Value: 10",
      "Value: 55",
      "Value: x5",
      "Compile-time error"
    ],
    correctAnswer: 1,
    explanation: "`\"Value: \" + 5` becomes `\"Value: 5\"`, and `\"Value: 5\" + 5` becomes `\"Value: 55\"` due to left-to-right string concatenation.",
    explanationBn: "বাম থেকে ডানে কনক্যাটেনেশনের কারণে প্রথমে 'Value: 5' এবং এরপর 'Value: 55' আউটপুট হয়।",
    hint: "String concatenation chains 5 and 5 as text."
  },
  {
    id: 19,
    question: "What is the predicted output of:\n```java\nint x = 5;\nSystem.out.println(\"Value: \" + (x + 5));\n```",
    options: [
      "Value: 55",
      "Value: 10",
      "Value: 5+5",
      "Value: x+5"
    ],
    correctAnswer: 1,
    explanation: "Because of the parentheses `(x + 5)`, the addition `5 + 5 = 10` executes first, resulting in `Value: 10`.",
    explanationBn: "বন্ধনী থাকার কারণে `(x + 5)` যোগ হয়ে ১০ হয়, ফলে আউটপুট হয় 'Value: 10'।",
    hint: "Parentheses ensure arithmetic addition first."
  },
  {
    id: 20,
    question: "Which of the following is an invalid escape sequence in Java that causes a compile-time error?",
    options: [
      "\\n",
      "\\t",
      "\\q",
      "\\\\"
    ],
    correctAnswer: 2,
    explanation: "`\\q` is not a valid escape character in Java. Attempting to include `\\q` inside a string literal causes a compile error: 'illegal escape character'.",
    explanationBn: "`\\q` জাভায় কোনো বৈধ এস্কেপ সিকোয়েন্স নয়, তাই স্ট্রিংয়ের ভেতর `\\q` লিখলে 'illegal escape character' এরর হয়।",
    hint: "\\q is not a recognized escape sequence."
  },
  {
    id: 21,
    question: "What will the following code print?\n```java\nSystem.out.println(1 + 2 + \"3\" + 4 + 5);\n```",
    options: [
      "15",
      "3345",
      "12345",
      "339"
    ],
    correctAnswer: 1,
    explanation: "1. `1 + 2` -> `3` (Integer addition)\n2. `3 + \"3\"` -> `\"33\"` (String concatenation)\n3. `\"33\" + 4` -> `\"334\"` (String concatenation)\n4. `\"334\" + 5` -> `\"3345\"`.",
    explanationBn: "১. `1 + 2` = ৩ (যোগ);\n২. `3 + \"3\"` = \"33\" (কনক্যাট);\n৩. `\"33\" + 4` = \"334\";\n৪. `\"334\" + 5` = \"3345\"।",
    hint: "Numbers on the left add, but once a string is met, all subsequent pluses concatenate."
  },
  {
    id: 22,
    question: "What is printed by the statement: `System.out.println(\"Kolkata\\rBarrackpore\");` (on a standard CR-compliant terminal)?",
    options: [
      "KolkataBarrackpore",
      "Barrackpore (Carriage Return `\\r` moves cursor to line start, overwriting Kolkata)",
      "Kolkata\nBarrackpore",
      "Compile-time error"
    ],
    correctAnswer: 1,
    explanation: "`\\r` is the Carriage Return escape sequence. It moves the cursor to the beginning of the current line without advancing to the next line, causing 'Barrackpore' to overwrite 'Kolkata'.",
    explanationBn: "`\\r` হলো ক্যারেজ রিটার্ন (Carriage Return), যা কার্সারকে বর্তমান লাইনের শুরুতে নিয়ে যায়, ফলে 'Barrackpore' পূর্ববর্তী 'Kolkata'-কে ওভাররাইট করে।",
    hint: "\\r returns cursor to beginning of current line."
  },
  {
    id: 23,
    question: "Which method in `PrintStream` allows formatted printing using format specifiers like `%d`, `%s`, and `%.2f`?",
    options: [
      "System.out.print()",
      "System.out.printf() or System.out.format()",
      "System.out.println()",
      "System.out.show()"
    ],
    correctAnswer: 1,
    explanation: "`System.out.printf()` and `System.out.format()` provide C-style formatted output strings using format specifiers (e.g. `System.out.printf(\"Total: ₹%.2f\", 250.75);`).",
    explanationBn: "`System.out.printf()` বা `System.out.format()` মেথড ফরম্যাট স্পেসিফায়ার (যেমন %d, %s, %.2f) দিয়ে ফরম্যাটেড আউটপুট প্রিন্ট করার সুবিধা দেয়।",
    hint: "printf format printing."
  },
  {
    id: 24,
    question: "What is the output of the following statement?\n```java\nSystem.out.println(\"Java\" + null);\n```",
    options: [
      "NullPointerException",
      "Javanull",
      "Java",
      "Compile-time error"
    ],
    correctAnswer: 1,
    explanation: "In Java string concatenation, `null` is converted to the string literal `\"null\"`. Thus `\"Java\" + null` safely results in `\"Javanull\"`.",
    explanationBn: "জাভায় স্ট্রিং কনক্যাটেনেশনের সময় `null` স্বয়ংক্রিয়ভাবে \"null\" স্ট্রিংয়ে পরিণত হয়, ফলে আউটপুট হয় 'Javanull'।",
    hint: "null converts to the word 'null' during string concatenation."
  },
  {
    id: 25,
    question: "Which of the following summaries regarding `System.out.print()` vs `System.out.println()` is completely accurate for CBSE Class 12 IT-802?",
    options: [
      "`System.out.print()` writes text and leaves the cursor on the same line; `System.out.println()` writes text and automatically advances the cursor to the next line; the `+` operator concatenates strings left-to-right unless overridden by parentheses",
      "`System.out.println()` can only be used once in an entire Java program",
      "`System.out.print()` always clears the console before printing",
      "The `+` operator always performs arithmetic addition, never string concatenation"
    ],
    correctAnswer: 0,
    explanation: "The complete accurate summary: print() stays on the same line, println() inserts a newline, and + performs left-to-right concatenation unless parentheses enforce precedence.",
    explanationBn: "সঠিক সারাংশ: print() একই লাইনে থাকে, println() নতুন লাইনে যায়, এবং '+' অপারেটর বন্ধনী না থাকলে বাম থেকে ডানে স্ট্রিং কনক্যাটেনেশন সম্পন্ন করে।",
    hint: "Review print vs println and + precedence rules."
  }
];

export default topic5_questions;
