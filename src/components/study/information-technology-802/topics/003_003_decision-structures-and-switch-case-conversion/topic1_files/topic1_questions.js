const topic1_questions = [
  {
    id: 1,
    question: "What is the primary purpose of the `switch` statement in Java?",
    options: [
      "To test a single variable or expression against multiple discrete constant values and execute matching code.",
      "To create iterative loops that repeat code blocks.",
      "To declare multiple variables simultaneously.",
      "To handle runtime memory leaks."
    ],
    correctAnswer: 0,
    explanation: "The `switch` statement allows a multi-way branch based on the value of a single expression, routing execution directly to the matching `case` label.",
    explanationBn: "`switch` স্টেটমেন্ট একটি চলক বা এক্সপ্রেশনের মানকে একাধিক সুনির্দিষ্ট ধ্রুবক মানের সাথে তুলনা করে সঠিক `case` ব্লকে নির্দেশ প্রদান করে।",
    hint: "Multi-way branching on a single value."
  },
  {
    id: 2,
    question: "How many times is the test expression inside `switch(expression)` evaluated during execution?",
    options: [
      "Exactly once",
      "Once for each case statement",
      "Twice (before and after matching)",
      "Depends on the number of breaks"
    ],
    correctAnswer: 0,
    explanation: "In Java, the expression inside `switch(...)` is evaluated only once at the entry point of the switch block.",
    explanationBn: "জাভায় `switch(...)`-এর মধ্যকার এক্সপ্রেশনটি শুরুতে কেবল একবারই মূল্যায়িত হয়।",
    hint: "Evaluated only once at the beginning."
  },
  {
    id: 3,
    question: "What type of comparison is performed between the switch expression and the `case` labels?",
    options: [
      "Exact equality comparison (`==`)",
      "Relational comparison (`<` and `>`)",
      "Bitwise shifting",
      "Fuzzy pattern matching"
    ],
    correctAnswer: 0,
    explanation: "The `switch` statement solely performs exact equality comparisons (`==`) between the evaluated expression and constant case values.",
    explanationBn: "`switch` স্টেটমেন্ট শুধুমাত্র নিখুঁত সমতা (`==`) যাচাই করে; কোনো অসমতা বা রেঞ্জ পরীক্ষা করতে পারে না।",
    hint: "Tests only for equality."
  },
  {
    id: 4,
    question: "Which of the following conditions CANNOT be tested directly using a `switch` statement?",
    options: [
      "Range conditions like `x >= 10 && x <= 50`",
      "Exact integer match `x == 5`",
      "Character match `ch == 'A'`",
      "String match `str.equals(\"SUCCESS\")`"
    ],
    correctAnswer: 0,
    explanation: "`switch` only tests for exact discrete values. It cannot evaluate relational inequalities or ranges like `x >= 10 && x <= 50` directly.",
    explanationBn: "`switch` দিয়ে অসমতা বা সীমার শর্ত (যেমন `x >= 10 && x <= 50`) সরাসরি পরীক্ষা করা যায় না।",
    hint: "Ranges cannot be case labels."
  },
  {
    id: 5,
    question: "What is an advantage of `switch` over a long `if-else-if` ladder in Java?",
    options: [
      "Enhanced readability for menu-driven code and potential compiler optimization via jump tables (`tableswitch`).",
      "It allows comparing floating-point numbers.",
      "It can execute multiple conditions simultaneously on multiple threads.",
      "It requires no curly braces."
    ],
    correctAnswer: 0,
    explanation: "`switch` provides cleaner syntax for multi-way equality checks and allows the JVM to generate efficient bytecode jump tables (`tableswitch` / `lookupswitch`) instead of testing sequential branches linearly.",
    explanationBn: "`switch` কোডকে অত্যন্ত পরিষ্কার করে এবং জেভিএম সিকোয়েন্সিয়াল লিনিয়ার চেকের বদলে সরাসরি জাম্প টেবিলের মাধ্যমে দ্রুত কাজ সম্পন্ন করতে পারে।",
    hint: "Readability and jump table optimizations."
  },
  {
    id: 6,
    question: "What is the output of the following Java code?\nint day = 3;\nswitch (day) {\n  case 1: System.out.print(\"Mon \"); break;\n  case 2: System.out.print(\"Tue \"); break;\n  case 3: System.out.print(\"Wed \"); break;\n  default: System.out.print(\"Other \");\n}",
    options: [
      "Wed ",
      "Mon Tue Wed ",
      "Wed Other ",
      "Other "
    ],
    correctAnswer: 0,
    explanation: "`day` is 3, which matches `case 3:`. It prints \"Wed \" and the `break` statement immediately terminates the switch block.",
    explanationBn: "`day`-এর মান ৩ হওয়ায় `case 3:` এর সাথে মিলে যায়। \"Wed \" প্রিন্ট হওয়ার পর `break`-এর কারণে সুইচ শেষ হয়ে যায়।",
    hint: "Case 3 matches."
  },
  {
    id: 7,
    question: "What happens if no `case` matches the switch expression and there is NO `default` clause?",
    options: [
      "The entire switch statement terminates and execution continues with the statement following the switch block.",
      "A compile-time error occurs.",
      "A runtime NullPointerException is thrown.",
      "The first case executes automatically."
    ],
    correctAnswer: 0,
    explanation: "If none of the case labels match and no `default` clause is present, the switch statement does nothing and program flow simply resumes after the closing brace `}`.",
    explanationBn: "কোনো কেস না মিললে এবং `default` না থাকলে সুইচ ব্লকের কোনো কোড না চলে প্রোগ্রাম স্বাভাবিকভাবে পরের স্টেটমেন্টে চলে যায়।",
    hint: "Execution safely skips the entire switch."
  },
  {
    id: 8,
    question: "Can a `case` label in a Java `switch` be a variable, e.g., `case x:` where `int x = 5;`?",
    options: [
      "No, case labels MUST be compile-time constants (literals or `final` initialized variables).",
      "Yes, any variable can be used.",
      "Only if the variable is declared public.",
      "Only in Java 17 and later."
    ],
    correctAnswer: 0,
    explanation: "Under Java syntax rules, case labels must be compile-time constant expressions. Using a normal non-final variable like `case x:` causes a compilation error: \"constant expression required\".",
    explanationBn: "জাভায় কেস লেবেল অবশ্যই কম্পাইল-টাইম ধ্রুবক (যেমন সংখ্যা, অক্ষর বা `final` ভেরিয়েবল) হতে হবে; সাধারণ চলক ব্যবহার করলে কম্পাইল এরর হয়।",
    hint: "Case labels must be constants."
  },
  {
    id: 9,
    question: "Which of the following case labels is VALID in Java?",
    options: [
      "case 10 + 5:",
      "case x:",
      "case > 10:",
      "case 10..20:"
    ],
    correctAnswer: 0,
    explanation: "`case 10 + 5:` is a valid compile-time constant expression (evaluated to 15 at compile time). Variables, relational operators, and ranges (`..`) are invalid.",
    explanationBn: "`case 10 + 5:` একটি বৈধ ধ্রুবক এক্সপ্রেশন যা কম্পাইলার ১৫ হিসেবে গণনা করে। চলক বা রেঞ্জ কেসে লেখা যায় না।",
    hint: "Constant expressions like 10 + 5 are evaluated at compile time."
  },
  {
    id: 10,
    question: "Can duplicate `case` labels exist inside the same `switch` block in Java?",
    options: [
      "No, duplicate case labels cause a compile-time error (`duplicate case label`).",
      "Yes, both duplicate blocks execute.",
      "Yes, the first matching duplicate executes.",
      "Only if they have different break statements."
    ],
    correctAnswer: 0,
    explanation: "Every case label within a switch block must be unique. Having two `case 5:` labels produces a compiler error: \"duplicate case label\".",
    explanationBn: "একটি সুইচের মধ্যে প্রতিটি কেস লেবেল অনন্য (unique) হতে হবে; দুটি একই কেস থাকলে `duplicate case label` কম্পাইল এরর হয়।",
    hint: "Each case label must be unique."
  },
  {
    id: 11,
    question: "What is the keyword used to exit a `switch` block immediately after executing a case?",
    options: [
      "break",
      "exit",
      "stop",
      "return"
    ],
    correctAnswer: 0,
    explanation: "The `break` statement halts execution within the switch body and transfers control out of the switch construct.",
    explanationBn: "`break` স্টেটমেন্ট সুইচের ভেতরের কাজ থামিয়ে দিয়ে অবিলম্বে সুইচের বাইরে নিয়ন্ত্রণ স্থানান্তর করে।",
    hint: "break keyword."
  },
  {
    id: 12,
    question: "What is the role of the `default` keyword in a `switch` statement?",
    options: [
      "It specifies the code block to execute when none of the case constant values match the switch expression.",
      "It sets default values for all variables.",
      "It forces the switch to run at startup.",
      "It is mandatory in every switch statement."
    ],
    correctAnswer: 0,
    explanation: "The `default` clause functions as a catch-all fallback block executed when no case label matches the selector expression.",
    explanationBn: "`default` ক্লজ একটি ক্যাচ-অল বিকল্প হিসেবে কাজ করে যা কোনো কেস না মিললে নির্বাহিত হয়।",
    hint: "Runs when no case matches."
  },
  {
    id: 13,
    question: "Is the `default` clause mandatory in a Java `switch` statement?",
    options: [
      "No, the `default` clause is completely optional.",
      "Yes, omitting `default` causes a compile error.",
      "Yes, only if there are more than 3 cases.",
      "Only when switching on strings."
    ],
    correctAnswer: 0,
    explanation: "The `default` clause is optional. If omitted and no case matches, the switch executes nothing and exits gracefully.",
    explanationBn: "`default` ক্লজ সম্পূর্ণ ঐচ্ছিক। এটি না থাকলে এবং কোনো কেস না মিললে কোনো ত্রুটি ছাড়াই সুইচ শেষ হয়।",
    hint: "Default is optional."
  },
  {
    id: 14,
    question: "Where can the `default` clause be positioned inside a `switch` block in Java?",
    options: [
      "Anywhere inside the switch block (at the beginning, middle, or end).",
      "Strictly at the very bottom only.",
      "Strictly at the very top only.",
      "Immediately after the first case only."
    ],
    correctAnswer: 0,
    explanation: "Although conventionally placed at the end for readability, Java allows the `default` label to appear anywhere inside the switch body.",
    explanationBn: "সাধারণত শেষে রাখা হলেও জাভা ব্যাকরণ অনুযায়ী `default` লেবেলটি সুইচের শুরুতে, মাঝে বা শেষে যেকোনো জায়গায় থাকতে পারে।",
    hint: "Default can syntactically appear anywhere."
  },
  {
    id: 15,
    question: "What is the output of the following Java snippet?\nint code = 2;\nswitch (code) {\n  case 1: System.out.print(\"Gold \");\n  case 2: System.out.print(\"Silver \");\n  case 3: System.out.print(\"Bronze \");\n}",
    options: [
      "Silver Bronze ",
      "Silver ",
      "Gold Silver Bronze ",
      "Bronze "
    ],
    correctAnswer: 0,
    explanation: "Because there are NO `break` statements, once `case 2:` matches, execution falls through and executes `case 3:` as well, outputting \"Silver Bronze \".",
    explanationBn: "`break` না থাকায় `case 2:` মেলার পর কোডটি স্বয়ংক্রিয়ভাবে নিচের `case 3:`-ও চালিয়ে দেয় (fall-through), ফলে \"Silver Bronze \" প্রিন্ট হয়।",
    hint: "Missing breaks cause fall-through."
  },
  {
    id: 16,
    question: "What happens if a `switch` expression evaluates to a `null` String in Java?\nString s = null;\nswitch (s) { case \"A\": break; }",
    options: [
      "Throws java.lang.NullPointerException at runtime.",
      "Executes the default clause.",
      "Skips the switch statement safely.",
      "Compilation error: null not allowed."
    ],
    correctAnswer: 0,
    explanation: "Under JLS §14.11, switching on a `null` reference (such as `null` String) throws a `NullPointerException` at runtime when the switch expression is evaluated.",
    explanationBn: "জাভায় `null` স্ট্রিংয়ের ওপর সুইচ করতে গেলে রানটাইমে `NullPointerException` নিক্ষেপ করে ক্র্যাশ করে।",
    hint: "Switching on null causes NullPointerException."
  },
  {
    id: 17,
    question: "Can multiple `case` labels share the same block of code in Java?",
    options: [
      "Yes, by stacking case labels one after another (e.g. `case 1: case 2: ...`).",
      "No, every case label must have its own separate method.",
      "Only in while loops.",
      "Only using commas in Java 1.4."
    ],
    correctAnswer: 0,
    explanation: "Multiple case labels can be stacked together (e.g., `case 1: case 2: case 3: doSomething(); break;`) to execute the same statement block for different values.",
    explanationBn: "একাধিক কেস লেবেলকে পাশাপাশি বা পরপর লিখে একই কোড ব্লককে শেয়ার করা যায় (যেমন `case 1: case 2:` ইত্যাদি)।",
    hint: "Stacking case labels."
  },
  {
    id: 18,
    question: "What is the output of the following Java code?\nchar grade = 'B';\nswitch (grade) {\n  case 'A':\n  case 'B':\n    System.out.println(\"Pass\");\n    break;\n  case 'F':\n    System.out.println(\"Fail\");\n    break;\n}",
    options: [
      "Pass",
      "Fail",
      "PassFail",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "`case 'A'` and `case 'B'` share the same block. Since `grade == 'B'`, it enters and executes `System.out.println(\"Pass\");` then breaks.",
    explanationBn: "`case 'A'` ও `'B'` একই ব্লক শেয়ার করায় 'B'-এর জন্য \"Pass\" প্রিন্ট হবে এবং ব্রেক করবে।",
    hint: "Both A and B print Pass."
  },
  {
    id: 19,
    question: "Why does the compiler generate `tableswitch` or `lookupswitch` bytecodes for `switch` statements?",
    options: [
      "To optimize multi-way branching for faster $O(1)$ execution compared to sequential $O(N)$ if-else checks.",
      "To convert code to machine language without JVM.",
      "To prevent multiple threads from accessing the switch.",
      "To encrypt the constants."
    ],
    correctAnswer: 0,
    explanation: "Bytecode instructions `tableswitch` (for dense case values) and `lookupswitch` (for sparse values) allow direct indexed or binary-search jumps, making execution much faster than sequential if checks.",
    explanationBn: "জেভিএম `tableswitch` বা `lookupswitch` ব্যবহার করে যাতে ক্রমান্বয়ে খোঁজার বদলে সরাসরি নির্দিষ্ট ইনডেক্সে দ্রুত জাম্প করা যায়।",
    hint: "Direct jump indexing."
  },
  {
    id: 20,
    question: "What is the output of the following Java snippet?\nint x = 1;\nswitch (x) {\n  default: System.out.print(\"Def \");\n  case 2: System.out.print(\"Two \"); break;\n  case 1: System.out.print(\"One \"); break;\n}",
    options: [
      "One ",
      "Def Two One ",
      "Def ",
      "Compilation error: default must be at the end"
    ],
    correctAnswer: 0,
    explanation: "Even though `default` is written at the top, Java checks all `case` labels first! Since `case 1:` matches `x = 1`, it jumps directly to `case 1:` and prints \"One \".",
    explanationBn: "`default` শুরুতে থাকলেও জাভা আগে নির্দিষ্ট কেস লেবেল পরীক্ষা করে। ১ মেলার কারণে সরাসরি `case 1:`-এ গিয়ে \"One \" প্রিন্ট করে।",
    hint: "Matches case 1 first, regardless of where default is placed."
  },
  {
    id: 21,
    question: "What is the output if `x = 99` in the code from Question 20?\nint x = 99;\nswitch (x) {\n  default: System.out.print(\"Def \");\n  case 2: System.out.print(\"Two \"); break;\n  case 1: System.out.print(\"One \"); break;\n}",
    options: [
      "Def Two ",
      "Def ",
      "Two ",
      "Nothing"
    ],
    correctAnswer: 0,
    explanation: "Since no case matches, execution jumps to `default`, printing \"Def \". Because `default` has no `break`, execution falls through into `case 2:`, printing \"Two \" before hitting `break`!",
    explanationBn: "কোনো কেস না মেলায় `default` চালু হয়ে \"Def \" প্রিন্ট করে। কিন্তু সেখানে break না থাকায় নিচে গড়িয়ে `case 2:`-এর \"Two \" প্রিন্ট করে ব্রেক করে।",
    hint: "Fall-through from default when break is missing."
  },
  {
    id: 22,
    question: "Can `final` variables be used as case labels in Java?",
    options: [
      "Yes, if they are compile-time constant expressions initialized with a constant value.",
      "No, all variables are forbidden in case labels.",
      "Only if they are static.",
      "Only inside interfaces."
    ],
    correctAnswer: 0,
    explanation: "A `final` variable initialized with a constant literal (e.g. `final int MAX = 10;`) is considered a compile-time constant and is completely valid in `case MAX:`.",
    explanationBn: "একটি `final` ভেরিয়েবল যদি সরাসরি ধ্রুবক দিয়ে ইনিশিয়ালাইজ করা থাকে, তবে তা কেস লেবেলে ব্যবহার করা সম্পূর্ণ বৈধ।",
    hint: "Constant final variables are valid case labels."
  },
  {
    id: 23,
    question: "What will happen if we write `final int y = (int)(Math.random() * 10); case y:`?",
    options: [
      "Compilation error: case label requires a compile-time constant (Math.random() is evaluated at runtime).",
      "It compiles and matches the random number.",
      "Throws ClassCastException.",
      "Replaces y with 0."
    ],
    correctAnswer: 0,
    explanation: "Even though `y` is `final`, its value is determined at runtime via `Math.random()`, not compile-time. Hence it is NOT a constant expression and causes a compile error.",
    explanationBn: "`y` ফাইনাল হলেও এর মান রানটাইমে নির্ধারিত হয়। কম্পাইল-টাইম ধ্রুবক না হওয়ায় কেস লেবেলে ব্যবহার করলে কম্পাইল এরর হবে।",
    hint: "Must be known at compile-time."
  },
  {
    id: 24,
    question: "Which of the following is equivalent to `switch (x)` when `x` is checked for values 1, 2, and other?",
    options: [
      "if (x == 1) { ... } else if (x == 2) { ... } else { ... }",
      "if (x > 1) { ... } else if (x < 2) { ... }",
      "while (x == 1) { ... }",
      "for (int i = 0; i < x; i++) { ... }"
    ],
    correctAnswer: 0,
    explanation: "A `switch (x)` statement testing discrete case values translates directly to an `if-else if-else` chain testing exact equality (`==`).",
    explanationBn: "`switch` স্টেটমেন্ট সুনির্দিষ্ট মান পরীক্ষার ক্ষেত্রে সরাসরি `if (x == 1) ... else if (x == 2) ...` ল্যাডারের সমতুল্য।",
    hint: "Exact equality checks."
  },
  {
    id: 25,
    question: "In CBSE Class 12 IT-802, what is the most common coding problem involving `switch`?",
    options: [
      "Converting an `if-else if-else` ladder into an equivalent `switch-case` statement (and vice versa).",
      "Designing complex multi-threaded switches.",
      "Writing assembly code for jump tables.",
      "Benchmarking switch bytecode."
    ],
    correctAnswer: 0,
    explanation: "CBSE board question papers frequently ask students to rewrite given `if-else` slabs or menu codes into equivalent `switch-case` constructs without altering the program output.",
    explanationBn: "সিবিএসই বোর্ড পরীক্ষায় প্রায়শই `if-else if-else` ল্যাডার দেওয়া থাকে এবং সমতুল্য `switch-case` কোড লিখতে বলা হয়।",
    hint: "Code conversion between if-else and switch-case."
  }
];

export default topic1_questions;
