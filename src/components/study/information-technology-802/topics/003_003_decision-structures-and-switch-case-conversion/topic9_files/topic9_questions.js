const topic9_questions = [
  {
    id: 1,
    question: "What must the expression inside an `if(...)` statement evaluate to in Java?",
    options: [
      "Strictly boolean (true or false)",
      "Any integer (0 for false, non-zero for true)",
      "Any primitive type",
      "void"
    ],
    correctAnswer: 0,
    explanation: "In Java, conditional expressions in `if` statements must evaluate strictly to a `boolean` type (`true` or `false`).",
    explanationBn: "জাভায় `if` শর্তের মধ্যকার মান অবশ্যই বুলিয়ান (`true` বা `false`) হতে হবে।",
    hint: "Only boolean is permitted."
  },
  {
    id: 2,
    question: "What is the output of the following Java snippet?\nint a = 10;\nif (a < 5);\n{\n  System.out.println(\"Executed\");\n}",
    options: [
      "Executed",
      "Nothing",
      "Compilation error",
      "Runtime exception"
    ],
    correctAnswer: 0,
    explanation: "The semicolon immediately following `if (a < 5);` ends the conditional statement as an empty statement. The block below executes unconditionally, printing \"Executed\".",
    explanationBn: "`if (a < 5);` এর পর সেমিকোলন থাকায় শর্তটি ফাঁকা স্টেটমেন্ট হিসেবে শেষ হয়ে যায় এবং নিচের ব্লকটি সর্বদা চলে।",
    hint: "Notice the semicolon after if."
  },
  {
    id: 3,
    question: "Why does `if (x = 5)` fail to compile when `int x = 0;` in Java?",
    options: [
      "Because `=` is the assignment operator; `x = 5` evaluates to integer `5`, which cannot be converted to `boolean`.",
      "Because 5 is not an identifier.",
      "Because x must be final.",
      "Because Java does not allow numbers in if statements."
    ],
    correctAnswer: 0,
    explanation: "`x = 5` assigns 5 to `x` and evaluates to `5`. Since `int` cannot be converted to `boolean`, the compiler rejects it with an incompatible types error.",
    explanationBn: "`x = 5` একটি অ্যাসাইনমেন্ট যার ফল পূর্ণসংখ্যা ৫; জাভা পূর্ণসংখ্যাকে বুলিয়ানে রূপান্তর করে না।",
    hint: "Assignment returns int, not boolean."
  },
  {
    id: 4,
    question: "Under the dangling else rule, which `if` does the `else` attach to in:\nif (x > 10)\n  if (y > 20)\n    System.out.print(\"A\");\nelse\n  System.out.print(\"B\");",
    options: [
      "The inner `if (y > 20)`",
      "The outer `if (x > 10)`",
      "Both",
      "It causes a syntax error"
    ],
    correctAnswer: 0,
    explanation: "In Java, an `else` always binds to the closest preceding unmatched `if` within the same block, which is the inner `if (y > 20)`.",
    explanationBn: "জাভায় `else` সর্বদা তার নিকটতম পূর্ববর্তী অমিলিত `if`-এর সাথে যুক্ত হয় (ভেতরের `y > 20`)।",
    hint: "Binds to closest preceding unmatched if."
  },
  {
    id: 5,
    question: "How many times is the test expression evaluated in a `switch(expression)` statement?",
    options: [
      "Exactly once at the beginning of the switch block",
      "Once for each case statement",
      "Twice (before and after matching)",
      "Depends on the number of breaks"
    ],
    correctAnswer: 0,
    explanation: "The switch selector expression is evaluated exactly once when execution enters the switch construct.",
    explanationBn: "সুইচের এক্সপ্রেশনটি শুরুতে কেবল একবারই মূল্যায়িত হয়।",
    hint: "Evaluated only once."
  },
  {
    id: 6,
    question: "Which of the following data types is strictly FORBIDDEN in a Java `switch` statement?",
    options: [
      "double",
      "int",
      "String",
      "char"
    ],
    correctAnswer: 0,
    explanation: "`double` and `float` are forbidden in switch expressions due to IEEE 754 precision issues making exact binary equality unreliable.",
    explanationBn: "ফ্লোটিং-পয়েন্ট সংখ্যা (`double`, `float`) জাভা সুইচে নিষিদ্ধ।",
    hint: "Floating point numbers are forbidden."
  },
  {
    id: 7,
    question: "Why is the `long` primitive data type disallowed in Java `switch` statements?",
    options: [
      "Because JVM bytecode jump tables (`tableswitch`) are hardcoded to 32-bit integer indexes, whereas `long` is 64 bits.",
      "Because long values cannot be negative.",
      "Because long was deprecated.",
      "Because long requires double quotes."
    ],
    correctAnswer: 0,
    explanation: "JVM jump tables use 32-bit integer offsets, which cannot accommodate 64-bit `long` values.",
    explanationBn: "জেভিএম-এর জাম্প টেবিল ৩২-বিট পূর্ণসংখ্যার অফসেট ব্যবহার করে, কিন্তু `long` হলো ৬৪-বিট।",
    hint: "32-bit bytecode table limit."
  },
  {
    id: 8,
    question: "What punctuation character must follow each `case` label in Java?",
    options: [
      "Colon (`:`)",
      "Semicolon (`;`)",
      "Arrow (`->`)",
      "Period (`.`)"
    ],
    correctAnswer: 0,
    explanation: "Every `case` label in traditional Java switch statements must terminate with a colon (`:`).",
    explanationBn: "প্রচলিত জাভা সুইচে প্রতিটি `case` লেবেলের পর কোলন (`:`) বসাতে হয়।",
    hint: "Colon (:)."
  },
  {
    id: 9,
    question: "What is the output of the following Java snippet?\nint n = 2;\nswitch (n) {\n  case 1: System.out.print(\"A \");\n  case 2: System.out.print(\"B \");\n  case 3: System.out.print(\"C \"); break;\n  default: System.out.print(\"D \");\n}",
    options: [
      "B C ",
      "B ",
      "B C D ",
      "A B C "
    ],
    correctAnswer: 0,
    explanation: "`n = 2` jumps to `case 2:` (\"B \"), falls through into `case 3:` (\"C \") because `case 2:` lacks a break, and halts at `break;`. Output: \"B C \".",
    explanationBn: "n=২ মেলায় case 2 চলে (\"B \"); break না থাকায় নিচে case 3 চলে (\"C \") এবং ব্রেক করে।",
    hint: "B followed by C."
  },
  {
    id: 10,
    question: "What happens during fall-through if a case does NOT contain a `break;` statement?",
    options: [
      "Execution cascades into the next case unconditionally without checking its case label.",
      "The compiler throws an error: 'missing break'.",
      "The switch statement restarts from the beginning.",
      "The program terminates with an exception."
    ],
    correctAnswer: 0,
    explanation: "Java executes all following statements sequentially without checking case labels until a `break;` or the closing brace `}` is encountered.",
    explanationBn: "জাভা পরবর্তী কেস লেবেল পরীক্ষা না করেই অন্ধের মতো নিচের সব কোড চালিয়ে যায়।",
    hint: "Unconditional cascading execution."
  },
  {
    id: 11,
    question: "Can a non-final variable `v` be used as a case label in Java (e.g. `case v:`)?",
    options: [
      "No, case labels must be compile-time constants (literals or final variables).",
      "Yes, any variable is allowed.",
      "Only if declared static.",
      "Only in void methods."
    ],
    correctAnswer: 0,
    explanation: "Case labels must be compile-time constant expressions. Non-final variables cause a compilation error: \"constant expression required\".",
    explanationBn: "কেস লেবেল অবশ্যই ধ্রুবক হতে হবে; সাধারণ চলক দিলে \"constant expression required\" এরর হয়।",
    hint: "Must be a constant expression."
  },
  {
    id: 12,
    question: "What is the role of the `default` clause in a `switch` statement?",
    options: [
      "It serves as a fallback handler executed when none of the case labels match the switch expression.",
      "It resets the variables.",
      "It makes the switch execute in reverse.",
      "It is mandatory in every switch statement."
    ],
    correctAnswer: 0,
    explanation: "The `default` clause executes if and only if every single `case` constant comparison fails to match.",
    explanationBn: "`default` ক্লজটি কোনো কেস লেবেল না মিললে ফলব্যাক হিসেবে নির্বাহিত হয়।",
    hint: "Fallback when no case matches."
  },
  {
    id: 13,
    question: "Where can the `default` label be placed inside a `switch` block in Java?",
    options: [
      "Anywhere inside the switch block (beginning, middle, or end).",
      "Only as the very last statement.",
      "Only as the very first statement.",
      "Only in the middle."
    ],
    correctAnswer: 0,
    explanation: "Syntactically, the `default` label can appear anywhere inside the switch body, although it is conventionally placed at the end.",
    explanationBn: "সিনট্যাক্স অনুযায়ী `default` সুইচের শুরু, মাঝ বা শেষ যেকোনো জায়গায় থাকতে পারে।",
    hint: "Can be placed anywhere."
  },
  {
    id: 14,
    question: "What is the output of the following Java code?\nint val = 99;\nswitch (val) {\n  default: System.out.print(\"Def \");\n  case 1: System.out.print(\"One \"); break;\n  case 2: System.out.print(\"Two \"); break;\n}",
    options: [
      "Def One ",
      "Def ",
      "One ",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "`val = 99` matches no case. It enters `default:` (\"Def \"). Lacking a `break;`, it falls through into `case 1:` (\"One \") and halts at `break;`. Output: \"Def One \".",
    explanationBn: "৯৯ কোনো কেসে না মেলায় default চলে (\"Def \"); break না থাকায় case 1-এ গড়িয়ে (\"One \") প্রিন্ট করে ব্রেক করে।",
    hint: "Falls through from top default."
  },
  {
    id: 15,
    question: "What is the output of the code in Question 14 if `val = 1`?\nint val = 1;\nswitch (val) {\n  default: System.out.print(\"Def \");\n  case 1: System.out.print(\"One \"); break;\n  case 2: System.out.print(\"Two \"); break;\n}",
    options: [
      "One ",
      "Def One ",
      "Def ",
      "One Two "
    ],
    correctAnswer: 0,
    explanation: "Specific cases always take priority over default. Because `val == 1`, Java jumps directly to `case 1:`, prints \"One \", and breaks!",
    explanationBn: "নির্দিষ্ট কেস সর্বদা ডিফল্টের আগে অগ্রাধিকার পায়। val=১ মেলায় সরাসরি case 1 চলে (\"One \")।",
    hint: "Exact case match always takes priority."
  },
  {
    id: 16,
    question: "When converting an `if-else-if` ladder to a `switch`, what happens if a student forgets to write `break;` after each case?",
    options: [
      "Execution falls through into subsequent cases, causing multiple blocks to run and overwriting the result.",
      "The program fails to compile.",
      "The switch statement runs in an infinite loop.",
      "A NullPointerException is thrown."
    ],
    correctAnswer: 0,
    explanation: "Omitting `break;` breaks mutual exclusivity, causing execution to cascade into following cases and altering program output.",
    explanationBn: "`break;` না দিলে এক কেস থেকে অন্য কেসে fall-through হয়ে কোডের আউটপুট সম্পূর্ণ বদলে যাবে।",
    hint: "Fall-through bug."
  },
  {
    id: 17,
    question: "Why can the ladder `if (score >= 90) ... else if (score >= 80) ...` NOT be converted directly to a `switch` in Java?",
    options: [
      "Because switch can only test for exact discrete values (`==`), not continuous numerical ranges or inequalities.",
      "Because score is a reserved keyword.",
      "Because 90 and 80 are too large.",
      "Because switch requires strings."
    ],
    correctAnswer: 0,
    explanation: "Java `switch` statements only support discrete equality matches, not relational range comparisons like `>=` or `<`.",
    explanationBn: "সুইচ কেবল নিখুঁত সমতা (`==`) পরীক্ষা করতে পারে, কোনো সংখ্যাগত সীমা বা অসমতা নয়।",
    hint: "Ranges cannot be case labels."
  },
  {
    id: 18,
    question: "In NetBeans GUI applications, which method extracts user input from a `JTextField` as a `String`?",
    options: [
      "jTextField1.getText()",
      "jTextField1.read()",
      "jTextField1.getValue()",
      "jTextField1.input()"
    ],
    correctAnswer: 0,
    explanation: "`getText()` is the standard Swing method to retrieve text content from a `JTextField`.",
    explanationBn: "সুইং টেক্সটফিল্ড থেকে ইনপুট স্ট্রিং হিসেবে পড়তে `getText()` মেথড ব্যবহার করা হয়।",
    hint: "getText()."
  },
  {
    id: 19,
    question: "Which method converts the String from `jTextField1.getText()` into an integer?",
    options: [
      "Integer.parseInt(jTextField1.getText().trim())",
      "Integer.toString(jTextField1.getText())",
      "(int)jTextField1.getText()",
      "jTextField1.toInt()"
    ],
    correctAnswer: 0,
    explanation: "`Integer.parseInt()` parses string digits into a primitive `int`. `.trim()` removes accidental leading/trailing spaces.",
    explanationBn: "`Integer.parseInt()` স্ট্রিংকে পূর্ণসংখ্যায় রূপান্তর করে এবং `.trim()` অতিরিক্ত ফাঁকা স্থান মুছে ফেলে।",
    hint: "Integer.parseInt."
  },
  {
    id: 20,
    question: "What is the output of the following Java code?\nchar grade = 'B';\nswitch (grade) {\n  case 'A':\n  case 'B': System.out.print(\"Pass \"); break;\n  case 'F': System.out.print(\"Fail \"); break;\n}",
    options: [
      "Pass ",
      "Fail ",
      "Pass Fail ",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "`case 'A'` and `case 'B'` are stacked to share code. For 'B', it prints \"Pass \" and breaks.",
    explanationBn: "'A' এবং 'B' কেস দুটি একই কোড শেয়ার করায় 'B'-এর জন্য \"Pass \" প্রিন্ট হয়।",
    hint: "Stacked cases share logic."
  },
  {
    id: 21,
    question: "What happens if a `String` variable in `switch(str)` evaluates to `null`?",
    options: [
      "Throws java.lang.NullPointerException at runtime",
      "Enters default case safely",
      "Treats str as \"null\"",
      "Skips switch cleanly"
    ],
    correctAnswer: 0,
    explanation: "Switching on a `null` String invokes `str.hashCode()` internally, throwing an immediate `NullPointerException`.",
    explanationBn: "`null` স্ট্রিংয়ের ওপর সুইচ করলে রানটাইমে `NullPointerException` ঘটে।",
    hint: "NullPointerException on null String."
  },
  {
    id: 22,
    question: "Is string comparison in a Java `switch` case-sensitive?",
    options: [
      "Yes, strictly case-sensitive (\"Admin\" does not match \"admin\").",
      "No, switch is case-insensitive for strings.",
      "Only in Windows NetBeans.",
      "Depends on compiler settings."
    ],
    correctAnswer: 0,
    explanation: "String switch utilizes `equals()`, which enforces strict case-sensitivity.",
    explanationBn: "স্ট্রিং সুইচ কেস-সেনসিটিভ, বড় হাতের ও ছোট হাতের অক্ষর পৃথকভাবে বিবেচিত হয়।",
    hint: "Strictly case-sensitive."
  },
  {
    id: 23,
    question: "In NetBeans Swing, how do you set the calculated payable bill into `jTextField2`?",
    options: [
      "jTextField2.setText(\"\" + pay);",
      "jTextField2.setText(pay);",
      "jTextField2.write(pay);",
      "jTextField2.setValue(pay);"
    ],
    correctAnswer: 0,
    explanation: "`setText()` accepts a `String`. `\"\" + pay` converts the number into a string.",
    explanationBn: "`setText()` শুধুমাত্র স্ট্রিং নেয়; `\"\" + pay` সংখ্যাকে স্ট্রিংয়ে রূপান্তর করে।",
    hint: "\"\" + pay converts to String."
  },
  {
    id: 24,
    question: "What is the output of the following Java snippet?\nint a = 1;\nswitch (a) {\n  case 1: a += 5;\n  case 2: a += 10; break;\n  default: a += 20;\n}\nSystem.out.println(a);",
    options: [
      "16",
      "6",
      "11",
      "36"
    ],
    correctAnswer: 0,
    explanation: "1) `case 1:` adds 5: `a = 1 + 5 = 6`. 2) Falls through to `case 2:` adding 10: `a = 6 + 10 = 16`. 3) Hits `break;`. Output: 16.",
    explanationBn: "১) case 1: a = ১+৫ = ৬; ২) নিচে case 2-তে গড়ায়: a = ৬+১০ = ১৬; ৩) break করে। আউটপুট: ১৬।",
    hint: "1 + 5 + 10 = 16."
  },
  {
    id: 25,
    question: "Can an `enum` be used as a switch expression in Java?",
    options: [
      "Yes, enums are fully supported in switch statements since Java 5.",
      "No, enums can only be used with if-else.",
      "Only in Java 17.",
      "Only if converted to integers."
    ],
    correctAnswer: 0,
    explanation: "Enums are fully supported in switch statements using bare constant identifiers (e.g. `case RED:`).",
    explanationBn: "জাভা ৫ থেকে `enum` সরাসরি সুইচ স্টেটমেন্টে ব্যবহারের সুবিধা রয়েছে।",
    hint: "Enums are supported since Java 5."
  },
  {
    id: 26,
    question: "What is the output of the following Java code?\nint x = 5;\nif (x > 2)\n  if (x < 4)\n    System.out.print(\"A\");\nelse\n  System.out.print(\"B\");",
    options: [
      "B",
      "A",
      "AB",
      "Nothing"
    ],
    correctAnswer: 0,
    explanation: "The `else` binds to the inner `if (x < 4)`. `x > 2` (5 > 2) is true, entering inner block. `x < 4` (5 < 4) is false, so its `else` executes, printing \"B\".",
    explanationBn: "ড্যাংলিং এলস নিয়মে else ভেতরের `x < 4`-এর সাথে যুক্ত। ৫ > ২ সত্য, কিন্তু ৫ < ৪ মিথ্যা; তাই else চলে \"B\" প্রিন্ট করে।",
    hint: "Else belongs to inner if."
  },
  {
    id: 27,
    question: "What will happen if you compile:\nint x = 5;\nswitch(x) {\n  case 1: break;\n  default: break;\n  default: break;\n}",
    options: [
      "Compilation error: duplicate default label",
      "Compiles successfully",
      "Runtime ClassCastException",
      "Ignores second default"
    ],
    correctAnswer: 0,
    explanation: "Java allows at most one `default` clause per switch statement. Two default labels cause a compile-time error.",
    explanationBn: "একাধিক default লেবেল থাকলে কম্পাইলার `duplicate default label` এরর দেয়।",
    hint: "Duplicate default is illegal."
  },
  {
    id: 28,
    question: "Why should a `try-catch(NumberFormatException e)` block wrap textfield parsing in GUI billing apps?",
    options: [
      "To prevent the application from crashing when a user leaves the textfield blank or inputs non-numeric characters.",
      "To format the number into currency.",
      "To connect to the database.",
      "To increase CPU clock speed."
    ],
    correctAnswer: 0,
    explanation: "Wrapping in try-catch catches invalid input errors gracefully and allows showing an alert dialog instead of crashing the program.",
    explanationBn: "ভুল বা ফাঁকা ইনপুট দিলে অ্যাপ ক্র্যাশ হওয়া ঠেকাতে try-catch দিয়ে নিরাপদ করা হয়।",
    hint: "Defensive input validation."
  },
  {
    id: 29,
    question: "What is the equivalent switch statement for `if (w == 5) pay = w * 20; else if (w == 8) pay = w * 26; else pay = w * 40;` when `w = 8`?",
    options: [
      "pay = 8 * 26 = 208",
      "pay = 5 * 20 = 100",
      "pay = 8 * 40 = 320",
      "pay = 0"
    ],
    correctAnswer: 0,
    explanation: "`w = 8` matches `case 8:`, computing `pay = 8 * 26 = 208`.",
    explanationBn: "w=৮ কেস ৮-এর সাথে মিলে `pay = ৮ * ২৬ = ২০৮` হয়।",
    hint: "8 * 26 = 208."
  },
  {
    id: 30,
    question: "In the 5-point CBSE if-else to switch conversion algorithm, what is the single most critical step that students often forget?",
    options: [
      "Appending a `break;` statement to the end of every case block to prevent unwanted fall-through.",
      "Declaring variables in uppercase.",
      "Adding while loops.",
      "Writing curly braces around each case."
    ],
    correctAnswer: 0,
    explanation: "Forgetting `break;` causes fall-through bugs, which is the #1 cause of marks deduction in CBSE board exams.",
    explanationBn: "প্রতিটি কেসের শেষে `break;` দিতে ভুলে যাওয়া হলো সিবিএসই পরীক্ষায় নম্বর কাটার প্রধানতম কারণ।",
    hint: "Never forget the break statement."
  }
];

export default topic9_questions;
