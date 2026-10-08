const topic2_questions = [
  {
    id: 1,
    question: "What punctuation character must follow each `case` label in a Java `switch` statement?",
    options: [
      "Colon (`:`)",
      "Semicolon (`;`)",
      "Arrow (`->`)",
      "Comma (`, `)"
    ],
    correctAnswer: 0,
    explanation: "In traditional Java switch statements, every `case` label and the `default` label must be terminated with a colon (`:`), e.g., `case 1:`. Using a semicolon causes a syntax error.",
    explanationBn: "প্রচলিত জাভা সুইচ স্টেটমেন্টে প্রতিটি `case` এবং `default` লেবেলের শেষে অবশ্যই কোলন (`:`) ব্যবহার করতে হয়। সেমিকোলন দিলে সিনট্যাক্স এরর হয়।",
    hint: "Colon (:)"
  },
  {
    id: 2,
    question: "Which of the following represents the correct syntax for a `case` label in Java?",
    options: [
      "case 5:",
      "case (5):",
      "case = 5:",
      "case 5;"
    ],
    correctAnswer: 0,
    explanation: "`case 5:` is the correct syntax. It uses the `case` keyword followed by the constant value and a colon.",
    explanationBn: "`case 5:` হলো সঠিক সিনট্যাক্স। `case` কি-ওয়ার্ডের পর ধ্রুবক মান ও কোলন বসে।",
    hint: "case value:"
  },
  {
    id: 3,
    question: "What is the function of the `break` statement inside a `case` block?",
    options: [
      "It terminates the execution of the switch body and transfers control out of the switch construct.",
      "It pauses execution for 1 second.",
      "It re-evaluates the switch expression.",
      "It restarts the switch from case 1."
    ],
    correctAnswer: 0,
    explanation: "The `break` statement immediately breaks out of the surrounding switch block, preventing control from cascading into subsequent cases.",
    explanationBn: "`break` স্টেটমেন্ট তাৎক্ষণিকভাবে সুইচের কাজ বন্ধ করে সুইচ ব্লকের বাইরে চলে যায়, ফলে পরবর্তী কেসগুলোতে গড়িয়ে পড়া বন্ধ হয়।",
    hint: "Exits the switch block immediately."
  },
  {
    id: 4,
    question: "What occurs if a `break` statement is omitted at the end of a matching `case` block?",
    options: [
      "Execution 'falls through' and continues executing subsequent case statements unconditionally until a break or the end of the switch is reached.",
      "The program throws a compile-time error: 'missing break'.",
      "The switch statement restarts from the beginning.",
      "A runtime NullPointerException is thrown."
    ],
    correctAnswer: 0,
    explanation: "In Java, omitting `break` causes 'fall-through', where execution continues seamlessly into the next case regardless of whether the next case's label matches.",
    explanationBn: "`break` না দিলে 'fall-through' ঘটে, যার ফলে শর্ত না মিললেও নিচের কেসের কোডগুলো একের পর এক চলতে থাকে।",
    hint: "Fall-through execution."
  },
  {
    id: 5,
    question: "Is it mandatory to wrap multiple statements under a `case` label in curly braces `{}`?",
    options: [
      "No, curly braces are optional under a case label; execution simply continues statement-by-statement until a `break;` is encountered.",
      "Yes, any case with more than one statement requires curly braces.",
      "Yes, all switch cases require braces.",
      "Only if local variables are not declared."
    ],
    correctAnswer: 0,
    explanation: "Unlike `if` statements, statements following a `case` label do not require curly braces `{}`. Execution runs sequentially until a `break;` or closing brace `}` is encountered.",
    explanationBn: "`if`-এর মতো কেসের ভেতরে একাধিক স্টেটমেন্ট থাকলে দ্বিতীয় বন্ধনী `{}` বাধ্যতামূলক নয়; `break;` না পাওয়া পর্যন্ত কোড স্বাভাবিকভাবেই চলে।",
    hint: "Braces are optional unless scoping local variables."
  },
  {
    id: 6,
    question: "What happens if a developer tries to declare and initialize a local variable inside one `case` without braces and re-declares it in another `case`?",
    options: [
      "Compilation error: variable is already defined in the switch scope.",
      "Each case gets its own independent scope.",
      "The variable is automatically overwritten.",
      "Runtime ClassCastException."
    ],
    correctAnswer: 0,
    explanation: "The entire switch block constitutes a single local variable scope. Declaring `int x = 10;` in `case 1:` makes `x` already defined in `case 2:` unless enclosed in a nested block `{ int x = ... }`.",
    explanationBn: "সম্পূর্ণ সুইচ ব্লকটি একটি একক ভেরিয়েবল স্কোপ। তাই দ্বিতীয় বন্ধনী ছাড়া এক কেসে ঘোষিত ভেরিয়েবল অন্য কেসে পুনরায় ঘোষণা করলে কম্পাইল এরর হয়।",
    hint: "The entire switch body shares one scope."
  },
  {
    id: 7,
    question: "How many `default` labels are permitted in a single `switch` statement?",
    options: [
      "At most one",
      "As many as the programmer wants",
      "Exactly one (mandatory)",
      "Zero only"
    ],
    correctAnswer: 0,
    explanation: "Java permits at most one `default` label per switch statement. Having more than one `default` label produces a compilation error: \"duplicate default label\".",
    explanationBn: "একটি সুইচে সর্বোচ্চ একটিমাত্র `default` লেবেল থাকতে পারে। একের অধিক দিলে কম্পাইল এরর হয়।",
    hint: "Only one default label allowed."
  },
  {
    id: 8,
    question: "What is the output of the following Java snippet?\nint x = 2;\nswitch (x) {\n  case 1: System.out.print(\"A \");\n  case 2: System.out.print(\"B \");\n  case 3: System.out.print(\"C \"); break;\n  case 4: System.out.print(\"D \");\n}",
    options: [
      "B C ",
      "B ",
      "A B C ",
      "B C D "
    ],
    correctAnswer: 0,
    explanation: "`x = 2` jumps to `case 2:`. It prints \"B \". Because `case 2:` has no `break`, execution falls through into `case 3:`, printing \"C \". `case 3:` has a `break;`, which stops execution.",
    explanationBn: "x=২ হওয়ায় `case 2:` মিলে \"B \" প্রিন্ট হয়। break না থাকায় নিচে গড়িয়ে `case 3:`-এর \"C \" প্রিন্ট করে ব্রেক করে। ফলাফল: \"B C \"।",
    hint: "Case 2 has no break, case 3 has break."
  },
  {
    id: 9,
    question: "Where can the `default` label be placed in a `switch` statement in Java?",
    options: [
      "At the top, in the middle, or at the bottom of the switch block.",
      "Only as the very last statement.",
      "Only as the very first statement.",
      "Only immediately following case 1."
    ],
    correctAnswer: 0,
    explanation: "Syntactically, the `default` label can be placed anywhere inside the switch block (beginning, middle, or end). Conventionally, it is placed at the end.",
    explanationBn: "সিনট্যাক্স অনুযায়ী `default` লেবেল সুইচের শুরু, মাঝখানে বা শেষে যেকোনো স্থানে বসতে পারে।",
    hint: "Can be placed anywhere."
  },
  {
    id: 10,
    question: "If `default` is placed at the TOP of a `switch` block without a `break;`, what happens when no case matches?",
    options: [
      "The default block executes, and execution then falls through into the subsequent case blocks.",
      "The default block executes and automatically breaks.",
      "Compilation error.",
      "Nothing executes."
    ],
    correctAnswer: 0,
    explanation: "If `default` is at the top without a `break`, its code executes when no case matches, and execution continues directly into the case immediately below it.",
    explanationBn: "`default` শুরুতে থাকলে এবং তাতে break না থাকলে, কোনো কেস না মিললে default চলে নিচে গড়িয়ে পরবর্তী কেসও চালিয়ে দেয়।",
    hint: "Default without break falls through like any other case."
  },
  {
    id: 11,
    question: "What is the output of the following Java snippet?\nint n = 10;\nswitch (n) {\n  default: System.out.print(\"Def \");\n  case 1: System.out.print(\"One \"); break;\n  case 2: System.out.print(\"Two \"); break;\n}",
    options: [
      "Def One ",
      "Def ",
      "One ",
      "Two "
    ],
    correctAnswer: 0,
    explanation: "`n = 10` does not match 1 or 2, so it jumps to `default`. It prints \"Def \". Because `default` lacks a `break`, execution falls through into `case 1:`, printing \"One \" before hitting `break`!",
    explanationBn: "১০ কোনো কেসের সাথে না মেলায় default চলে \"Def \" প্রিন্ট করে। break না থাকায় নিচে গড়িয়ে `case 1:`-এর \"One \" প্রিন্ট করে ব্রেক করে।",
    hint: "Fall-through from default to case 1."
  },
  {
    id: 12,
    question: "Can a `case` label be an arithmetic constant expression, such as `case 2 * 3:`?",
    options: [
      "Yes, because `2 * 3` is a constant expression evaluated at compile time to 6.",
      "No, only literal numbers like 6 are permitted.",
      "Only in Java 11 and later.",
      "Only if enclosed in double quotes."
    ],
    correctAnswer: 0,
    explanation: "Under JLS §15.28, constant expressions involving arithmetic on literals (such as `2 * 3` or `10 - 4`) are computed at compile time and are 100% valid as case labels.",
    explanationBn: "কম্পাইল-টাইমে মূল্যায়নযোগ্য গাণিতিক এক্সপ্রেশন (যেমন `2 * 3 = 6`) কেস লেবেলে ব্যবহার করা সম্পূর্ণ বৈধ।",
    hint: "Compile-time constant expressions are valid."
  },
  {
    id: 13,
    question: "What is the output of the following code?\nfinal int X = 5;\nint a = 5;\nswitch (a) {\n  case X: System.out.print(\"Match\"); break;\n  default: System.out.print(\"No\");\n}",
    options: [
      "Match",
      "No",
      "Compilation error: variables cannot be case labels",
      "Runtime exception"
    ],
    correctAnswer: 0,
    explanation: "`X` is declared `final` and initialized with a literal constant `5`. The compiler treats `X` as a compile-time constant, so `case X:` compiles and matches `a = 5`.",
    explanationBn: "`X` একটি `final` ভেরিয়েবল যা ধ্রুবক ৫ দিয়ে তৈরি, তাই কম্পাইলার এটিকে ধ্রুবক হিসেবে গণ্য করে এবং \"Match\" প্রিন্ট করে।",
    hint: "Final variable initialized with constant literal is valid."
  },
  {
    id: 14,
    question: "Why does the following code produce a compilation error?\nint x = 5;\nswitch (5) {\n  case x: System.out.println(\"Matched\"); break;\n}",
    options: [
      "Because `x` is not a compile-time constant (it lacks the `final` modifier).",
      "Because 5 cannot be used inside switch.",
      "Because switch cannot take integer literals.",
      "Because break is missing a label."
    ],
    correctAnswer: 0,
    explanation: "Case labels must be constants. Since `x` is a non-final variable whose value could change at runtime, the compiler rejects it with: \"constant expression required\".",
    explanationBn: "`x` কোনো `final` ধ্রুবক নয়। সাধারণ চলক কেস লেবেলে দিলে \"constant expression required\" এরর হয়।",
    hint: "x is not declared final."
  },
  {
    id: 15,
    question: "What is the output of the following Java snippet?\nint val = 2;\nswitch (val) {\n  case 1:\n  case 2:\n  case 3:\n    System.out.println(\"Small\");\n    break;\n  case 4:\n    System.out.println(\"Large\");\n    break;\n}",
    options: [
      "Small",
      "Large",
      "SmallLarge",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "Cases 1, 2, and 3 are stacked together to share a single code block. When `val = 2`, control jumps to `case 2:`, falls through into `case 3:`'s body, prints \"Small\", and breaks.",
    explanationBn: "১, ২ ও ৩ কেসগুলো একই কোড শেয়ার করছে। val=২ হওয়ায় কোডটি সক্রিয় হয়ে \"Small\" প্রিন্ট করে এবং ব্রেক করে।",
    hint: "Stacked cases share the block."
  },
  {
    id: 16,
    question: "What happens if two cases in the same switch have the same value, e.g., `case 5:` and `case 2 + 3:`?",
    options: [
      "Compilation error: duplicate case label.",
      "The first matching case executes.",
      "Both cases execute simultaneously.",
      "The compiler automatically deletes the second case."
    ],
    correctAnswer: 0,
    explanation: "`2 + 3` evaluates to 5. Having two cases with the value 5 creates a duplicate case label error at compile time.",
    explanationBn: "`2 + 3` এর মান ৫। সুইচে দুটি ৫ মানের কেস লেবেল থাকলে `duplicate case label` কম্পাইল এরর হয়।",
    hint: "Duplicate case labels are illegal."
  },
  {
    id: 17,
    question: "What is the purpose of placing a `break;` statement at the very end of the final `default` clause when it is located at the bottom of the switch?",
    options: [
      "It is a defensive programming best practice to prevent accidental fall-through if cases are added below it later.",
      "It is strictly required by the compiler; omitting it causes a syntax error.",
      "It increases program execution speed.",
      "It clears the stack memory."
    ],
    correctAnswer: 0,
    explanation: "While optional when `default` is the last clause, writing `break;` is a recommended defensive programming habit so that if someone appends new cases later, fall-through bugs are avoided.",
    explanationBn: "সবার শেষে থাকলে break ঐচ্ছিক হলেও এটি লেখা একটি উত্তম চর্চা, যাতে ভবিষ্যতে নিচে নতুন কেস যোগ করা হলে কোনো ত্রুটি না ঘটে।",
    hint: "Defensive programming habit."
  },
  {
    id: 18,
    question: "Can a `switch` statement in Java have NO cases at all (e.g. `switch(x) { }`)?",
    options: [
      "Yes, an empty switch statement is syntactically valid in Java (though it does nothing).",
      "No, a switch must contain at least one case.",
      "No, an empty switch causes a syntax error.",
      "Only if it contains a comment."
    ],
    correctAnswer: 0,
    explanation: "An empty switch block `{}` compiles without errors in Java. The expression is evaluated and discarded, and execution continues.",
    explanationBn: "জাভায় ফাঁকা সুইচ ব্লক `{}` সিনট্যাক্সগতভাবে সম্পূর্ণ বৈধ, যদিও এটি কোনো কাজ করে না।",
    hint: "Empty switch block is syntactically allowed."
  },
  {
    id: 19,
    question: "What is the output of the following Java snippet?\nint a = 1;\nswitch (a) {\n  case 1: System.out.print(\"One \");\n  default: System.out.print(\"Def \");\n  case 2: System.out.print(\"Two \");\n}",
    options: [
      "One Def Two ",
      "One ",
      "One Two ",
      "Def Two "
    ],
    correctAnswer: 0,
    explanation: "`a = 1` matches `case 1:`. Because there are NO `break` statements anywhere, execution cascades through `case 1:`, `default:`, and `case 2:`, outputting \"One Def Two \".",
    explanationBn: "`a=1` মেলায় `case 1:` শুরু হয়। কোনো break না থাকায় কোডটি default এবং case 2 সবগুলোর ওপর দিয়ে গড়িয়ে \"One Def Two \" প্রিন্ট করে।",
    hint: "Complete fall-through across all cases and default."
  },
  {
    id: 20,
    question: "Can a `return` statement be used instead of `break` inside a switch case in a method?",
    options: [
      "Yes, a `return` statement exits both the switch block and the enclosing method immediately.",
      "No, switch only accepts `break`.",
      "Only in void methods.",
      "Only if followed by a break."
    ],
    correctAnswer: 0,
    explanation: "A `return` statement exits the entire method (and hence the switch construct), making a following `break` unreachable and unnecessary.",
    explanationBn: "`return` স্টেটমেন্ট পুরো মেথড থেকেই বের হয়ে যায়, ফলে সুইচের ভেতরে `return` দিলে আর `break`-এর প্রয়োজন হয় না।",
    hint: "Return exits method and switch."
  },
  {
    id: 21,
    question: "What is the output of the following method?\npublic static String getDayName(int d) {\n  switch (d) {\n    case 1: return \"Mon\";\n    case 2: return \"Tue\";\n    default: return \"Other\";\n  }\n}",
    options: [
      "When called with 1, returns \"Mon\" cleanly without requiring a break.",
      "Causes a compile error because break is missing.",
      "Returns \"MonTueOther\".",
      "Returns null."
    ],
    correctAnswer: 0,
    explanation: "Each branch returns immediately. Because `return` exits the method, fall-through cannot occur, and `break` is not needed.",
    explanationBn: "প্রতিটি শাখায় `return` থাকায় মেথড সাথে সাথে মান ফেরত দেয়, কোনো fall-through হয় না এবং `break`-এর প্রয়োজন পড়ে না।",
    hint: "Return eliminates the need for break."
  },
  {
    id: 22,
    question: "What is the effect of writing `case 'A':` when the switch variable is an `int`?",
    options: [
      "Valid, because `char` is an integer type in Java; 'A' is promoted to its Unicode value 65.",
      "Compilation error: cannot convert char to int in case label.",
      "Runtime ClassCastException.",
      "It compares the letter 'A' as a string."
    ],
    correctAnswer: 0,
    explanation: "Characters in Java are 16-bit unsigned integers. A `char` literal `'A'` has integer value 65, which is fully compatible with an `int` switch expression.",
    explanationBn: "জাভায় char মূলত পূর্ণসংখ্যা (ইউনিকোড ৬৫)। তাই `int` সুইচের ক্ষেত্রে `'A'` কেস লেবেল ব্যবহার করা সম্পূর্ণ বৈধ।",
    hint: "Char literals have integer values."
  },
  {
    id: 23,
    question: "What happens if a `case` value is outside the range of the switch variable type (e.g. `byte b = 10; switch(b) { case 300: ... }`)?",
    options: [
      "Compilation error: incompatible types (possible lossy conversion from int to byte, as 300 exceeds byte max 127).",
      "It automatically converts 300 to a byte.",
      "It executes the default case.",
      "The program crashes at runtime."
    ],
    correctAnswer: 0,
    explanation: "The maximum value of a `byte` is 127. A case label of 300 exceeds the range of `byte`, causing a compile-time error: \"possible lossy conversion from int to byte\".",
    explanationBn: "বাইটের সর্বোচ্চ মান ১২৭। কেস লেবেলে ৩০০ দিলে তা বাইটের সীমার বাইরে চলে যাওয়ায় কম্পাইল এরর হয়।",
    hint: "300 is too large for byte."
  },
  {
    id: 24,
    question: "Which of the following is true about nested `switch` statements in Java?",
    options: [
      "Java fully supports nested switch statements (a switch placed inside a case of another switch).",
      "Java forbids nesting switch statements.",
      "A switch can only be nested inside loops, not another switch.",
      "Nested switches cause stack overflow."
    ],
    correctAnswer: 0,
    explanation: "A `switch` statement can be nested inside another `switch` without issues. The `break` statement inside the inner switch only breaks out of the inner switch.",
    explanationBn: "জাভায় একটি সুইচের ভেতরে আরেকটি নেস্টেড সুইচ ব্যবহার করা সম্পূর্ণ বৈধ। ভেতরের break কেবল ভেতরের সুইচ থেকেই বের করে।",
    hint: "Nested switches are fully supported."
  },
  {
    id: 25,
    question: "In the CBSE Class 12 IT-802 exam, why is understanding the anatomy of `switch` essential?",
    options: [
      "Because question papers routinely test predicting outputs with missing breaks, duplicate case traps, and converting if-else blocks into valid switch syntax.",
      "Because only switch statements are tested on practical exams.",
      "Because switch statements are required for all database connections.",
      "Because switch statements run without the JVM."
    ],
    correctAnswer: 0,
    explanation: "CBSE board question papers test output prediction of switch blocks with intentional missing `break` statements, tricky `default` positions, and converting GUI `if-else` billing slabs into `switch` constructs.",
    explanationBn: "বোর্ড পরীক্ষায় প্রায়শই ব্রেকবিহীন সুইচের আউটপুট নির্ণয়, ডিফল্টের অবস্থান এবং if-else থেকে সুইচে রূপান্তরের প্রশ্ন আসে।",
    hint: "Output prediction and if-else conversion."
  }
];

export default topic2_questions;
