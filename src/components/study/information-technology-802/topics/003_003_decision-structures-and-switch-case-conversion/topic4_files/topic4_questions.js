const topic4_questions = [
  {
    id: 1,
    question: "When converting an `if-else-if` ladder to a `switch-case` statement, what must be added to each `case` to preserve the ladder's mutually exclusive behavior?",
    options: [
      "A `break;` statement at the end of each case block.",
      "A semicolon after each curly brace.",
      "A default statement in each case.",
      "An increment statement."
    ],
    correctAnswer: 0,
    explanation: "Because an `if-else-if` ladder stops immediately once a condition matches, each corresponding `case` in a `switch` statement must end with `break;` to prevent fall-through into following cases.",
    explanationBn: "`if-else-if` ল্যাডারে একটি শর্ত মিললে বাকিগুলো বাদ যায়। সুইচে এই আচরণ অক্ষুণ্ন রাখতে প্রতিটি কেসের শেষে অবশ্যই `break;` স্টেটমেন্ট যুক্ত করতে হবে।",
    hint: "Prevent fall-through with break."
  },
  {
    id: 2,
    question: "Which component of an `if-else-if` ladder becomes the `default:` clause in a `switch` statement?",
    options: [
      "The final trailing `else` block without a condition.",
      "The first `if` statement.",
      "All `else if` conditions.",
      "The variable declaration."
    ],
    correctAnswer: 0,
    explanation: "The trailing `else` block executes when none of the previous `if` or `else if` conditions match, which directly maps to the `default:` clause in a `switch` statement.",
    explanationBn: "ল্যাডারের শেষ শর্তহীন `else` ব্লকটি সুইচের `default:` ক্লজে রূপান্তরিত হয়।",
    hint: "Final else becomes default."
  },
  {
    id: 3,
    question: "Which of the following `if-else` ladders CANNOT be directly converted into a `switch` statement in Java?",
    options: [
      "if (marks >= 90) { ... } else if (marks >= 80) { ... }",
      "if (choice == 1) { ... } else if (choice == 2) { ... }",
      "if (grade == 'A') { ... } else if (grade == 'B') { ... }",
      "if (code.equals(\"IN\")) { ... } else if (code.equals(\"US\")) { ... }"
    ],
    correctAnswer: 0,
    explanation: "`marks >= 90` is a relational range comparison. Java `switch` statements can only match discrete constant values (`==`), not continuous ranges.",
    explanationBn: "`marks >= 90` হলো অসমতা বা সীমার শর্ত। জাভা `switch` দিয়ে সরাসরি সীমা বা রেঞ্জ পরীক্ষা করা যায় না।",
    hint: "Ranges like >= cannot be converted to switch cases directly."
  },
  {
    id: 4,
    question: "Why can the ladder `if (x == 1) ... else if (y == 2) ...` NOT be converted to a single `switch` statement?",
    options: [
      "Because two different variables (`x` and `y`) are being tested across branches, whereas `switch` can only evaluate a single expression.",
      "Because 1 and 2 are too small.",
      "Because switch cannot take integers.",
      "Because y cannot be compared in Java."
    ],
    correctAnswer: 0,
    explanation: "A `switch` statement selects branches based on the value of a single expression. Branches testing different variables cannot be collapsed into one switch.",
    explanationBn: "`switch` স্টেটমেন্ট কেবল একটিমাত্র চলকের মান পরীক্ষা করতে পারে। এখানে দুটি ভিন্ন চলক (`x` ও `y`) থাকায় একে একটি সুইচে রূপান্তর করা সম্ভব নয়।",
    hint: "Switch tests a single variable."
  },
  {
    id: 5,
    question: "Why can an `if-else` ladder comparing `double` values (e.g. `if (price == 99.5)`) NOT be converted to a `switch` in Java?",
    options: [
      "Because `double` and `float` are not permissible data types for a switch expression in Java.",
      "Because 99.5 is too large.",
      "Because doubles require while loops.",
      "Because price is a keyword."
    ],
    correctAnswer: 0,
    explanation: "Java forbids `float` and `double` in `switch` expressions due to precision and IEEE 754 floating-point representation nuances.",
    explanationBn: "জাভায় ফ্লোটিং-পয়েন্ট সংখ্যা (`float`, `double`) সুইচ এক্সপ্রেশনে ব্যবহার করা সম্পূর্ণ নিষিদ্ধ।",
    hint: "Floats and doubles are illegal in switch."
  },
  {
    id: 6,
    question: "Consider the code:\nif (ch == 'R') color = \"Red\";\nelse if (ch == 'G') color = \"Green\";\nelse color = \"Blue\";\nWhat is the equivalent switch statement?",
    options: [
      "switch(ch) { case 'R': color=\"Red\"; break; case 'G': color=\"Green\"; break; default: color=\"Blue\"; break; }",
      "switch(ch) { case R: color=\"Red\"; case G: color=\"Green\"; default: color=\"Blue\"; }",
      "switch(ch) { case \"R\": color=\"Red\"; break; }",
      "switch('R') { case ch: color=\"Red\"; break; }"
    ],
    correctAnswer: 0,
    explanation: "`ch` is the switch variable. Case labels must be character literals (`'R'`, `'G'`) and each case requires a `break;`. The `else` becomes `default: color = \"Blue\"; break;`.",
    explanationBn: "`ch` হলো সুইচ চলক, কেসগুলো ক্যারেক্টার লিটারাল (`'R'`, `'G'`), প্রতিটি কেসে `break;` আছে এবং `else` টি `default:`-এ রূপান্তরিত হয়েছে।",
    hint: "Check for char quotes and break statements."
  },
  {
    id: 7,
    question: "What is the consequence of forgetting to write `break;` when converting an `if-else` ladder into a `switch`?",
    options: [
      "The switch statement will suffer from fall-through, executing multiple cases and likely overwriting the result with the last case's code.",
      "The code will fail to compile with a 'missing break' error.",
      "The program will crash with an ArithmeticException.",
      "The default clause will never execute."
    ],
    correctAnswer: 0,
    explanation: "Without `break;`, execution falls through into subsequent cases, altering program behavior and producing incorrect outputs.",
    explanationBn: "`break;` না দিলে fall-through ঘটবে এবং একের পর এক নিচের কেসগুলো চলে ফলাফল বিকৃত করে দেবে।",
    hint: "Fall-through bug."
  },
  {
    id: 8,
    question: "Consider:\nif (val == 1 || val == 2) System.out.println(\"Low\");\nelse System.out.println(\"High\");\nHow is the `||` condition converted into a `switch`?",
    options: [
      "By stacking case labels without a break: `case 1: case 2: System.out.println(\"Low\"); break;`",
      "By writing `case 1 || 2:`",
      "By writing `case 1, 2:` (in pre-Java 12 traditional code)",
      "It cannot be converted to switch."
    ],
    correctAnswer: 0,
    explanation: "In traditional Java, logical OR (`||`) between discrete values is represented by stacking `case 1: case 2:` sequentially so they share the same statement block.",
    explanationBn: "লজিক্যাল OR (`||`) বোঝাতে পরপর কেস লেবেল সাজিয়ে (`case 1: case 2:`) একই ব্লক কার্যকর করা হয়।",
    hint: "Stacked case labels represent OR."
  },
  {
    id: 9,
    question: "What is the equivalent switch for:\nif (code == 10) tax = 100;\nelse if (code == 20) tax = 200;\nelse tax = 0;",
    options: [
      "switch(code) { case 10: tax = 100; break; case 20: tax = 200; break; default: tax = 0; break; }",
      "switch(tax) { case 10: code = 100; break; }",
      "switch(code) { case 10: tax = 100; case 20: tax = 200; default: tax = 0; }",
      "switch(code) { case == 10: tax = 100; break; }"
    ],
    correctAnswer: 0,
    explanation: "`code` is tested for 10 and 20. Each branch sets `tax` and breaks. The fallback sets `tax = 0`.",
    explanationBn: "`code`-এর মান ১০ ও ২০ যাচাই হয়; প্রতিটি শাখায় `tax` নির্ধারণ করে `break` করে এবং ডিফল্টে `tax = 0` হয়।",
    hint: "code is the selector variable."
  },
  {
    id: 10,
    question: "Can an `if-else` ladder with `boolean` conditions (e.g. `if (isMember == true)`) be converted to a `switch` in Java?",
    options: [
      "No, `boolean` is not a permissible switch expression type in Java.",
      "Yes, `switch(isMember)` with `case true:` is valid Java.",
      "Only in Java 8.",
      "Only if wrapped in an integer."
    ],
    correctAnswer: 0,
    explanation: "Java does not permit `boolean` as a switch expression data type. `switch(isMember)` produces a compile-time error.",
    explanationBn: "জাভায় `boolean` ডেটা টাইপ সুইচ এক্সপ্রেশন হিসেবে সম্পূর্ণ অবৈধ।",
    hint: "Booleans cannot be used in switch statements."
  },
  {
    id: 11,
    question: "When converting a NetBeans GUI textfield input `jTextField1.getText()` to a switch, what method is needed first?",
    options: [
      "`Integer.parseInt(...)` or `Double.parseDouble(...)` (if parsing integers/numbers)",
      "`System.out.println()`",
      "`jTextField1.setText()`",
      "`String.valueOf()`"
    ],
    correctAnswer: 0,
    explanation: "GUI text fields return strings via `getText()`. To use numerical switch cases (`case 1:`, `case 2:`), the string must first be converted using `Integer.parseInt(...)`.",
    explanationBn: "জিইউআই টেক্সটফিল্ড থেকে স্ট্রিং পাওয়া যায়। সংখ্যা দিয়ে সুইচ করতে হলে প্রথমে `Integer.parseInt(...)` দিয়ে পূর্ণসংখ্যায় রূপান্তর করতে হয়।",
    hint: "Convert string to int using Integer.parseInt."
  },
  {
    id: 12,
    question: "What is the equivalent switch construct for:\nif (city.equals(\"Kolkata\")) fare = 50;\nelse if (city.equals(\"Barrackpore\")) fare = 30;\nelse fare = 100;",
    options: [
      "switch(city) { case \"Kolkata\": fare = 50; break; case \"Barrackpore\": fare = 30; break; default: fare = 100; break; }",
      "switch(city) { case Kolkata: fare = 50; break; }",
      "switch(fare) { case 50: city = \"Kolkata\"; break; }",
      "Strings cannot be used in switch."
    ],
    correctAnswer: 0,
    explanation: "Since Java 7, `String` is fully supported in `switch`. Case labels must be string literals enclosed in double quotes with `break;` after each case.",
    explanationBn: "জাভা ৭ থেকে স্ট্রিং দিয়ে সুইচ করা সম্পূর্ণ বৈধ। কেস লেবেলগুলো ডাবল কোটেশনে রেখে প্রতিটিতে `break;` দিতে হয়।",
    hint: "String literals require double quotes."
  },
  {
    id: 13,
    question: "In CBSE board marking schemes, how many marks are typically deducted if a student converts an `if-else` ladder to `switch` correctly but forgets all `break;` statements?",
    options: [
      "1 to 1.5 marks (often 50% or more of the question's total weightage)",
      "Zero marks, break is optional in marking schemes.",
      "100% deduction automatically.",
      "0.25 marks only."
    ],
    correctAnswer: 0,
    explanation: "CBSE marking schemes strictly penalize missing `break;` statements because omitting break fundamentally changes the program's output due to fall-through.",
    explanationBn: "বোর্ড পরীক্ষার মার্কিং স্কিমে `break;` বাদ পড়ার জন্য সাধারণত ৫০% বা তার বেশি নম্বর কেটে নেওয়া হয়, কারণ এর ফলে আউটপুট সম্পূর্ণ বদলে যায়।",
    hint: "Significant deduction for missing break."
  },
  {
    id: 14,
    question: "Given:\nint opt = 2, fee = 0;\nif (opt == 1) fee = 500;\nelse if (opt == 2) fee = 800;\nelse fee = 1000;\nIf converted to `switch` without `break`, what value does `fee` end up holding?",
    options: [
      "1000 (because it falls through into default)",
      "800",
      "500",
      "0"
    ],
    correctAnswer: 0,
    explanation: "`opt = 2` enters `case 2:` setting `fee = 800`. Without a `break;`, it falls through into `default:`, overwriting `fee = 1000`! This demonstrates why `break;` is critical.",
    explanationBn: "break না থাকায় case 2-এর পর default-এ গড়িয়ে `fee = 1000` হয়ে যাবে! তাই break অপরিহার্য।",
    hint: "Overwritten by fall-through into default."
  },
  {
    id: 15,
    question: "How should `if (x == 1) a = 10; else if (x == 2); else a = 20;` be converted?",
    options: [
      "switch(x) { case 1: a = 10; break; case 2: break; default: a = 20; break; }",
      "switch(x) { case 1: a = 10; break; case 2: a = 20; break; }",
      "switch(x) { case 1: a = 10; break; default: a = 20; break; }",
      "It cannot be converted because case 2 is empty."
    ],
    correctAnswer: 0,
    explanation: "An empty branch like `else if (x == 2);` corresponds to an empty case with a `break;`: `case 2: break;`.",
    explanationBn: "ফাঁকা শাখা `else if (x == 2);` এর জন্য সুইচে শুধু `case 2: break;` লিখতে হয় যাতে কোনো কাজ না করে বেরিয়ে যায়।",
    hint: "Empty branch becomes case 2: break;"
  },
  {
    id: 16,
    question: "Can an `if-else` ladder testing `x == 1 && y == 2` be converted into a single simple `switch(x)`?",
    options: [
      "No, not directly into a single switch without nested logic, because two variables are coupled via logical AND.",
      "Yes, `switch(x && y)`",
      "Yes, `case 1 && 2:`",
      "Yes, using a comma."
    ],
    correctAnswer: 0,
    explanation: "Compound conditions coupling multiple variables cannot be mapped directly to a single `switch(x)` expression.",
    explanationBn: "একাধিক চলক লজিক্যাল AND দিয়ে যুক্ত থাকলে তাকে একটিমাত্র সাধারণ সুইচে সরাসরি রূপান্তর করা যায় না।",
    hint: "Multiple variables in condition."
  },
  {
    id: 17,
    question: "What is the equivalent switch statement for:\nif (k == 0) System.out.print(\"Zero\");\nelse System.out.print(\"Non-Zero\");",
    options: [
      "switch(k) { case 0: System.out.print(\"Zero\"); break; default: System.out.print(\"Non-Zero\"); break; }",
      "switch(k) { case 0: System.out.print(\"Zero\"); case 1: System.out.print(\"Non-Zero\"); }",
      "switch(k) { default: System.out.print(\"Zero\"); }",
      "switch(0) { case k: System.out.print(\"Zero\"); }"
    ],
    correctAnswer: 0,
    explanation: "Case 0 matches 0; all other values fall through to `default:` which prints \"Non-Zero\".",
    explanationBn: "case 0-এ \"Zero\" প্রিন্ট করে ব্রেক করবে এবং বাকি সমস্ত মানের জন্য `default:` \"Non-Zero\" প্রিন্ট করবে।",
    hint: "Case 0 and default."
  },
  {
    id: 18,
    question: "Why is converting `if-else` to `switch` advantageous when building menus in vocational IT applications?",
    options: [
      "It organizes numeric menu choices (e.g. 1. Add, 2. Edit, 3. Delete, 4. Exit) into structured, easily readable cases.",
      "It prevents user input errors automatically.",
      "It runs without a JVM.",
      "It saves disk space on the client machine."
    ],
    correctAnswer: 0,
    explanation: "Menu-driven programs with numbered options map directly to switch case numbers, providing clean, professional architecture.",
    explanationBn: "মেনু-চালিত অ্যাপ্লিকেশনে সংখ্যাভিত্তিক বিকল্পগুলো (১. যোগ, ২. এডিট ইত্যাদি) সুইচের মাধ্যমে অত্যন্ত সুশৃঙ্খলভাবে সাজানো যায়।",
    hint: "Menu architectures map directly to cases."
  },
  {
    id: 19,
    question: "Consider:\nchar grade = 'C';\nint score = 0;\nif (grade == 'A') score = 90;\nelse if (grade == 'B') score = 80;\nelse if (grade == 'C') score = 70;\nelse score = 50;\nWhat is the converted switch?",
    options: [
      "switch(grade) { case 'A': score = 90; break; case 'B': score = 80; break; case 'C': score = 70; break; default: score = 50; break; }",
      "switch(score) { case 90: grade = 'A'; break; }",
      "switch(grade) { case A: score = 90; break; }",
      "switch(grade) { case \"A\": score = 90; break; }"
    ],
    correctAnswer: 0,
    explanation: "`grade` is the switch variable with char constant labels (`'A'`, `'B'`, `'C'`), ending each with `break;` and `default: score = 50; break;`.",
    explanationBn: "`grade` হলো সুইচ চলক যার কেসগুলো ক্যারেক্টার (`'A'`, `'B'`, `'C'`), প্রতিটি কেসে break এবং শেষে default রয়েছে।",
    hint: "Character literals use single quotes."
  },
  {
    id: 20,
    question: "Can an `if-else` chain that checks `long` variables (e.g. `long id; if (id == 100L)`) be converted to a `switch` in Java?",
    options: [
      "No, the `long` primitive type is NOT permitted in Java switch statements.",
      "Yes, `switch(id)` is valid.",
      "Only if the letter L is omitted.",
      "Only in 64-bit JVMs."
    ],
    correctAnswer: 0,
    explanation: "In Java, primitive integers larger than 32 bits (`long`) are not permitted in `switch` expressions. Only `byte`, `short`, `char`, and `int` are allowed among primitives.",
    explanationBn: "জাভায় `long` ডেটা টাইপ সুইচ এক্সপ্রেশন হিসেবে ব্যবহার করা নিষিদ্ধ।",
    hint: "long is not allowed in switch."
  },
  {
    id: 21,
    question: "What is the result of converting:\nif (num == 5) x = 10;\nelse if (num == 10) x = 20;\nwhen there is NO trailing `else`?",
    options: [
      "A switch statement with `case 5:` and `case 10:` and NO default clause (or an empty default).",
      "A compile error because switch requires default.",
      "default: x = 0; must be added by the student.",
      "x is automatically set to null."
    ],
    correctAnswer: 0,
    explanation: "If the original `if-else` ladder has no trailing `else`, the equivalent `switch` simply omits the `default:` clause.",
    explanationBn: "মূল ল্যাডারে কোনো শেষ `else` না থাকলে সমতুল্য সুইচে কোনো `default:` ক্লজ লেখার প্রয়োজন নেই।",
    hint: "No else means no default."
  },
  {
    id: 22,
    question: "What happens if a student writes `case (x == 5):` in a converted switch statement?",
    options: [
      "Compilation error: case label requires a constant value, not a boolean expression or condition.",
      "It matches when x is 5.",
      "It is valid in modern Java.",
      "It evaluates to case 1:."
    ],
    correctAnswer: 0,
    explanation: "Case labels must specify the target value only (e.g. `case 5:`). Writing conditions like `case (x == 5):` is a syntax error.",
    explanationBn: "কেস লেবেলে শুধুমাত্র মান লিখতে হয় (যেমন `case 5:`); শর্ত বা সমতা লেখা যায় না।",
    hint: "Do not write conditions in case labels."
  },
  {
    id: 23,
    question: "In the expression `if (w == 5) pay = w * 20; else if (w == 8) pay = w * 26;`, how is `pay = w * 20` written in `case 5:`?",
    options: [
      "case 5:\n  pay = w * 20;\n  break;",
      "case 5 -> pay = w * 20",
      "case w == 5: pay = w * 20;",
      "case 5: pay = 5 * 20; break;"
    ],
    correctAnswer: 0,
    explanation: "The body of the if block is placed directly under `case 5:` followed by a `break;`.",
    explanationBn: "if ব্লকের ভেতরের কোডটি হুবহু `case 5:`-এর নিচে লিখে শেষে `break;` দিতে হয়।",
    hint: "Body placed under case, followed by break."
  },
  {
    id: 24,
    question: "Why should variable declarations like `int pay = 0;` remain OUTSIDE the `switch` statement during conversion?",
    options: [
      "To ensure the variable remains in scope after the switch block finishes and is accessible for display or subsequent calculations.",
      "Because switch cannot use variables.",
      "Because declaring variables inside switch causes a memory leak.",
      "Because Java forbids local variables."
    ],
    correctAnswer: 0,
    explanation: "Variables declared inside a switch case lose their scope outside the switch closing brace `}`. Declaring the variable beforehand ensures it can be used afterwards (e.g. in `jTextField2.setText(\"\" + pay);`).",
    explanationBn: "সুইচের ভেতরে ঘোষিত ভেরিয়েবল বাইরে ব্যবহারের সুযোগ থাকে না। তাই ভেরিয়েবল আগে ডিক্লেয়ার করে সুইচের ভেতরে শুধু মান পরিবর্তন করা উচিত।",
    hint: "Keep declaration outside to preserve scope."
  },
  {
    id: 25,
    question: "What is the ultimate checklist for students when solving a 3-mark CBSE code conversion problem?",
    options: [
      "1) Correct variable in `switch(...)`; 2) Colons after `case` labels; 3) `break;` after every branch; 4) `else` mapped to `default:`; 5) Identical output verified.",
      "1) Remove all braces; 2) Change all types to float.",
      "1) Replace switch with a for loop.",
      "1) Write in uppercase."
    ],
    correctAnswer: 0,
    explanation: "Following the 5-point checklist guarantees full marks in CBSE board evaluations without accidental syntax or fall-through errors.",
    explanationBn: "সঠিক সুইচ চলক, কোলন ব্যবহার, প্রতিটিতে `break;`, `else`-কে `default:` করা এবং আউটপুট মিলিয়ে দেখা—এই ৫টি নিয়ম মেনে চললে ১০০% পূর্ণ নম্বর নিশ্চিত হয়।",
    hint: "The 5-point conversion checklist."
  }
];

export default topic4_questions;
