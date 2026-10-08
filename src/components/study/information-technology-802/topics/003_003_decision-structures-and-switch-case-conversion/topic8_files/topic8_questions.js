const topic8_questions = [
  {
    id: 1,
    question: "What is the consequence of placing a semicolon immediately after the condition in `if (score >= 40);`?",
    options: [
      "The `if` statement terminates immediately with an empty body, causing any following block to execute unconditionally.",
      "The compiler flags a syntax error.",
      "The condition is negated.",
      "The program enters an infinite loop."
    ],
    correctAnswer: 0,
    explanation: "A semicolon after the parentheses terminates the `if` construct as a no-op statement. The subsequent block runs regardless of whether `score >= 40` was true or false.",
    explanationBn: "`if` শর্তের পর সেমিকোলন দিলে শর্তটি ফাঁকা স্টেটমেন্ট হিসেবে শেষ হয়ে যায় এবং নিচের ব্লকটি সর্বদা কোনো শর্ত ছাড়াই চলে।",
    hint: "Semicolon ends the if statement prematurely."
  },
  {
    id: 2,
    question: "Why is `double` forbidden in Java `switch` statements?",
    options: [
      "Because IEEE 754 floating-point representation has binary rounding imprecision, making exact binary equality (`==`) unreliable.",
      "Because double takes 128 bits of memory.",
      "Because double cannot be divided.",
      "Because double is not a numeric type."
    ],
    correctAnswer: 0,
    explanation: "Floating-point numbers can differ by tiny fractions in binary representation (e.g. 0.1 + 0.2 != 0.3), which makes exact discrete equality matching unpredictable.",
    explanationBn: "বাইনারি ফ্লোটিং-পয়েন্ট উপস্থাপনায় নিখুঁত সমতা (==) নিশ্চিত করা যায় না বলে জাভা সুইচে `double` নিষিদ্ধ।",
    hint: "Binary rounding imprecision."
  },
  {
    id: 3,
    question: "Which of the following is the correct syntax for a `case` label in Java?",
    options: [
      "case 10:",
      "case 10;",
      "case (10);",
      "case == 10:"
    ],
    correctAnswer: 0,
    explanation: "A `case` label must be written with the keyword `case`, followed by a constant value and a colon (`:`).",
    explanationBn: "কেস লেবেলে `case` কি-ওয়ার্ডের পর ধ্রুবক মান ও কোলন (`:`) দিতে হয়।",
    hint: "case value:"
  },
  {
    id: 4,
    question: "What is the output of the following Java snippet?\nint x = 2;\nswitch (x) {\n  case 1: System.out.print(\"A\");\n  case 2: System.out.print(\"B\");\n  case 3: System.out.print(\"C\"); break;\n  default: System.out.print(\"D\");\n}",
    options: [
      "BC",
      "B",
      "BCD",
      "C"
    ],
    correctAnswer: 0,
    explanation: "`x = 2` jumps to `case 2:` (\"B\"), falls through into `case 3:` (\"C\") because `case 2:` lacks a break, and stops at `break;`. Output: \"BC\".",
    explanationBn: "x=২ মেলায় case 2 চলে (\"B\"); break না থাকায় case 3 চলে (\"C\") এবং ব্রেক করে। আউটপুট: \"BC\"।",
    hint: "Starts at case 2, stops after case 3."
  },
  {
    id: 5,
    question: "When rewriting an `if-else-if` ladder to `switch`, why must `break;` be appended to each case?",
    options: [
      "To preserve mutual exclusivity and prevent fall-through into following cases.",
      "To restart the switch statement.",
      "Because the compiler refuses to compile cases without breaks.",
      "To save heap memory."
    ],
    correctAnswer: 0,
    explanation: "Without `break;`, Java falls through into subsequent cases, altering the mutually exclusive behavior of the original `if-else` ladder.",
    explanationBn: "`break;` না দিলে এক কেস থেকে অন্য কেসে fall-through হয়ে আউটপুট বিকৃত হয়ে যাবে।",
    hint: "Maintains mutual exclusivity."
  },
  {
    id: 6,
    question: "Which component of an `if-else-if` ladder becomes the `default:` clause in a `switch`?",
    options: [
      "The trailing unconditional `else` block",
      "The first `if` statement",
      "The condition with `&&`",
      "The variable declaration"
    ],
    correctAnswer: 0,
    explanation: "The final `else` block serves as the catch-all for unmatched conditions, corresponding to `default:` in `switch`.",
    explanationBn: "ল্যাডারের শেষ শর্তহীন `else` ব্লকটি সুইচে `default:` ক্লজ হিসেবে রূপান্তরিত হয়।",
    hint: "Trailing else maps to default."
  },
  {
    id: 7,
    question: "In NetBeans GUI applications, what exception is thrown if `Integer.parseInt(jTextField1.getText())` is called on a field containing letters like \"abc\"?",
    options: [
      "java.lang.NumberFormatException",
      "java.lang.NullPointerException",
      "java.lang.ArithmeticException",
      "java.lang.ClassCastException"
    ],
    correctAnswer: 0,
    explanation: "`Integer.parseInt()` throws a `NumberFormatException` when the string argument cannot be parsed as a valid integer.",
    explanationBn: "অ-সাংখ্যিক স্ট্রিংকে পূর্ণসংখ্যায় রূপান্তর করতে গেলে রানটাইমে `NumberFormatException` ঘটে।",
    hint: "NumberFormatException."
  },
  {
    id: 8,
    question: "Why should `double pay = 0.0;` be declared before entering a `switch` block in a GUI button event handler?",
    options: [
      "To ensure the variable remains in scope after the switch block finishes so it can be passed to `jTextField2.setText()`.",
      "Because Java forbids variables inside switch.",
      "Because switch cannot modify variables.",
      "To avoid garbage collection."
    ],
    correctAnswer: 0,
    explanation: "A variable declared inside a switch case is local to that case block and cannot be accessed outside the switch to update the GUI.",
    explanationBn: "সুইচের ভেতরে ঘোষিত চলকের পরিধি বাইরে থাকে না। তাই সুইচের বাইরে টেক্সটফিল্ডে ফলাফল প্রদর্শন করতে চলকটি সুইচের আগেই ঘোষণা করতে হয়।",
    hint: "Variable scope outside the switch."
  },
  {
    id: 9,
    question: "Which of the following data types was added to `switch` support in Java 7?",
    options: [
      "String",
      "enum",
      "boolean",
      "float"
    ],
    correctAnswer: 0,
    explanation: "Java 7 introduced the ability to switch on `String` objects using string literals as case labels.",
    explanationBn: "জাভা ৭ সংস্করণে `String` অবজেক্টের ওপর সুইচ স্টেটমেন্ট ব্যবহারের সুবিধা যুক্ত করা হয়।",
    hint: "String added in Java 7."
  },
  {
    id: 10,
    question: "What happens if `default` is placed at the top of a switch block without a `break;` and no case matches?",
    options: [
      "The default block executes, and execution cascades into the following case blocks.",
      "The default block executes and cleanly exits.",
      "Compilation error.",
      "It re-evaluates the switch."
    ],
    correctAnswer: 0,
    explanation: "Without a `break;`, execution cascades downward from `default:` into whatever case lies below it.",
    explanationBn: "ডিফল্টে `break;` না থাকলে তা সক্রিয় হওয়ার পর নিচের কেসে গড়িয়ে পড়ে।",
    hint: "Falls through into following cases."
  },
  {
    id: 11,
    question: "Can an `if-else` ladder testing `if (score >= 90) ...` be converted directly into a `switch` in Java?",
    options: [
      "No, switch only tests for exact discrete equality (`==`), not continuous ranges or inequalities.",
      "Yes, `case >= 90:` is valid syntax.",
      "Yes, using a comma.",
      "Only in Java 17."
    ],
    correctAnswer: 0,
    explanation: "Java switch cases only accept discrete constant values; relational inequalities like `>= 90` are not permitted.",
    explanationBn: "জাভা সুইচে শুধুমাত্র নির্দিষ্ট ধ্রুবক মান বসে; অসমতা বা রেঞ্জ সরাসরি লেখা যায় না।",
    hint: "Ranges cannot be case labels."
  },
  {
    id: 12,
    question: "What is the output of the following Java snippet?\nint a = 10, b = 20;\nint max = a > b ? a : b;\nSystem.out.println(max);",
    options: [
      "20",
      "10",
      "true",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "`10 > 20` is false. The ternary operator returns the false branch `b` (20).",
    explanationBn: "১০ > ২০ মিথ্যা হওয়ায় টার্নারি অপারেটর b-এর মান ২০ প্রদান করে।",
    hint: "Ternary operator evaluates false branch."
  },
  {
    id: 13,
    question: "What is the output of the following Java code?\nboolean b = false;\nif (b = true) {\n  System.out.println(\"Yes\");\n} else {\n  System.out.println(\"No\");\n}",
    options: [
      "Yes",
      "No",
      "Compilation error",
      "false"
    ],
    correctAnswer: 0,
    explanation: "`b = true` assigns `true` to `b` and evaluates to `true`. Thus the `if` branch executes, printing \"Yes\".",
    explanationBn: "`b = true` চলকে true জমা করে এবং সামগ্রিক শর্ত true হওয়ায় \"Yes\" প্রিন্ট হয়।",
    hint: "Assignment assigns true and evaluates to true."
  },
  {
    id: 14,
    question: "What is the output of the following Java code?\nint opt = 2;\nswitch (opt) {\n  case 1: System.out.print(\"Gold \");\n  case 2:\n  case 3: System.out.print(\"Medal \"); break;\n  default: System.out.print(\"None \");\n}",
    options: [
      "Medal ",
      "Gold Medal ",
      "None ",
      "Medal None "
    ],
    correctAnswer: 0,
    explanation: "`opt = 2` jumps to `case 2:`. It falls through into `case 3:`, prints \"Medal \", and breaks.",
    explanationBn: "opt=২ মেলায় case 2-তে যায় এবং নিচে case 3-তে গড়িয়ে \"Medal \" প্রিন্ট করে ব্রেক করে।",
    hint: "Case 2 and 3 share block."
  },
  {
    id: 15,
    question: "Can duplicate case labels exist in the same switch block (e.g. `case 5:` and `case 5:`)?",
    options: [
      "No, duplicate case labels cause a compile-time error (`duplicate case label`).",
      "Yes, both execute.",
      "Yes, first one executes.",
      "Only if they have different breaks."
    ],
    correctAnswer: 0,
    explanation: "Java requires all case constants in a switch to be strictly unique.",
    explanationBn: "সুইচের প্রতিটি কেস লেবেল অনন্য (unique) হতে হবে; একই কেস দুবার থাকলে কম্পাইল এরর হয়।",
    hint: "Duplicate cases are forbidden."
  },
  {
    id: 16,
    question: "Which of the following represents the correct statement to set the text of `jTextField2` to the value of double `total`?",
    options: [
      "jTextField2.setText(\"\" + total);",
      "jTextField2.setText(total);",
      "jTextField2.print(total);",
      "jTextField2.write(total);"
    ],
    correctAnswer: 0,
    explanation: "`setText()` requires a `String`. `\"\" + total` converts the double to a string.",
    explanationBn: "`setText()` শুধুমাত্র স্ট্রিং গ্রহণ করে। `\"\" + total` সংখ্যাকে স্ট্রিংয়ে রূপান্তর করে।",
    hint: "\"\" + total converts to String."
  },
  {
    id: 17,
    question: "What is the output of the following Java code?\nint k = 1;\nswitch (k) {\n  default: System.out.print(\"D \"); break;\n  case 1: System.out.print(\"1 \");\n  case 2: System.out.print(\"2 \"); break;\n}",
    options: [
      "1 2 ",
      "D ",
      "D 1 2 ",
      "1 "
    ],
    correctAnswer: 0,
    explanation: "`k = 1` matches `case 1:`. It prints \"1 \", falls into `case 2:` printing \"2 \", and halts at `break;`. Output: \"1 2 \".",
    explanationBn: "k=১ সরাসরি case 1 মেলায়: \"1 \" প্রিন্ট করে নিচে case 2-তে গড়িয়ে \"2 \" প্রিন্ট করে ব্রেক করে।",
    hint: "Case 1 matches, falls into case 2."
  },
  {
    id: 18,
    question: "What happens if a non-final variable `x` is used in a case label (e.g. `int x = 5; case x:`)?",
    options: [
      "Compilation error: constant expression required",
      "It matches when switch expression equals x",
      "It evaluates to case 0:",
      "Runtime ClassCastException"
    ],
    correctAnswer: 0,
    explanation: "Case labels must be compile-time constants. A non-final variable causes a \"constant expression required\" error.",
    explanationBn: "কেস লেবেলে সাধারণ পরিবর্তনশীল চলক দিলে কম্পাইলার \"constant expression required\" এরর দেয়।",
    hint: "Case labels must be constant expressions."
  },
  {
    id: 19,
    question: "Under the dangling else rule, which `if` does the `else` belong to in the code below?\nif (a > 0)\n  if (b > 0)\n    System.out.println(\"Positive\");\nelse\n  System.out.println(\"Negative\");",
    options: [
      "The inner `if (b > 0)`",
      "The outer `if (a > 0)`",
      "Both",
      "Neither (syntax error)"
    ],
    correctAnswer: 0,
    explanation: "An `else` always attaches to the closest preceding unmatched `if` within the same block.",
    explanationBn: "`else` সর্বদা তার নিকটতম পূর্ববর্তী অমিলিত `if`-এর সাথে যুক্ত হয় (ভেতরের `b > 0`)।",
    hint: "Attaches to closest preceding unmatched if."
  },
  {
    id: 20,
    question: "What is the output of the code in Question 19 when `a = -5` and `b = 10`?",
    options: [
      "Nothing is printed",
      "Negative",
      "Positive",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "Because `a > 0` (-5 > 0) is false, execution skips the entire nested `if-else` construct. Nothing is printed.",
    explanationBn: "a > ০ (-৫ > ০) মিথ্যা হওয়ায় পুরো নেস্টেড ব্লকটি বাদ যায় এবং কিছুই প্রিন্ট হয় না।",
    hint: "Outer if condition fails."
  },
  {
    id: 21,
    question: "What is the output of the following Java snippet?\nString code = \"IN\";\nswitch (code) {\n  case \"in\": System.out.print(\"Lower \"); break;\n  case \"IN\": System.out.print(\"Upper \"); break;\n  default: System.out.print(\"None \");\n}",
    options: [
      "Upper ",
      "Lower ",
      "Lower Upper ",
      "None "
    ],
    correctAnswer: 0,
    explanation: "String switch comparisons are strictly case-sensitive. \"IN\" matches `case \"IN\":` and prints \"Upper \".",
    explanationBn: "স্ট্রিং সুইচ কেস-সেনসিটিভ হওয়ায় বড় হাতের \"IN\" মিলে গিয়ে \"Upper \" প্রিন্ট করে।",
    hint: "Case-sensitive string matching."
  },
  {
    id: 22,
    question: "What happens if the switch expression evaluates to `null` for a String variable?",
    options: [
      "Throws java.lang.NullPointerException at runtime",
      "Enters default case safely",
      "Prints null",
      "Skips switch cleanly"
    ],
    correctAnswer: 0,
    explanation: "Evaluating `null` inside `switch(s)` calls `s.hashCode()`, throwing a `NullPointerException` immediately.",
    explanationBn: "`null` স্ট্রিংয়ের ওপর সুইচ করলে রানটাইমে `NullPointerException` ঘটে।",
    hint: "NullPointerException on null String."
  },
  {
    id: 23,
    question: "Can multiple case labels share a single statement block in Java?",
    options: [
      "Yes, by stacking them sequentially (e.g. `case 1: case 2: ...`)",
      "No, each case must have its own statements",
      "Only in Java 21",
      "Only for characters"
    ],
    correctAnswer: 0,
    explanation: "Stacking case labels sequentially allows multiple values to trigger the same code block.",
    explanationBn: "পরপর কেস লেবেল সাজিয়ে একাধিক মানের জন্য একই কোড কার্যকর করা যায়।",
    hint: "Stacking cases shares logic."
  },
  {
    id: 24,
    question: "What is the result of `switch(5)` if no cases match and there is NO default clause?",
    options: [
      "The switch statement does nothing and program execution continues normally after the switch block.",
      "Throws a runtime exception.",
      "Compilation error.",
      "Restarts from case 1."
    ],
    correctAnswer: 0,
    explanation: "If no case matches and there is no default clause, the switch simply exits with no action taken.",
    explanationBn: "কোনো কেস না মিললে এবং default না থাকলে কোনো ত্রুটি ছাড়াই সুইচ শেষ হয়ে যায়।",
    hint: "Exits cleanly doing nothing."
  },
  {
    id: 25,
    question: "What is the primary benefit of replacing multiple `if (w == 5) ... else if (w == 8) ...` with `switch(w)`?",
    options: [
      "Significantly improved code readability, modularity, and potential JVM jump-table optimization.",
      "Automatic database connectivity.",
      "Elimination of the need for compilers.",
      "Runs on GPU instead of CPU."
    ],
    correctAnswer: 0,
    explanation: "Switch constructs make multi-way equality checks clean, structured, and allow JVM jump-table performance optimizations.",
    explanationBn: "সুইচ কোডের স্পষ্টতা ও পঠনযোগ্যতা বৃদ্ধি করে এবং জেভিএম জাম্প টেবিল অপ্টিমাইজেশনের সুযোগ দেয়।",
    hint: "Readability and jump table optimization."
  }
];

export default topic8_questions;
