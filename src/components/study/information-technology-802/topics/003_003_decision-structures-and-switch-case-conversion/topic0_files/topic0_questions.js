const topic0_questions = [
  {
    id: 1,
    question: "What must the expression inside the parentheses of an `if(...)` statement evaluate to in Java?",
    options: [
      "boolean",
      "int (0 or 1)",
      "Any primitive type",
      "void"
    ],
    correctAnswer: 0,
    explanation: "In Java, the test condition in an `if` statement MUST strictly evaluate to a `boolean` (`true` or `false`). Unlike C/C++, Java does not allow integer values like 0 or 1 as conditions.",
    explanationBn: "জাভায় `if` শর্তের মধ্যকার এক্সপ্রেশনটি অবশ্যই boolean মান (`true` বা `false`) হতে হবে। সি-এর মতো 0 বা 1 কে শর্ত হিসেবে গ্রহণ করা যায় না।",
    hint: "Only true or false is accepted."
  },
  {
    id: 2,
    question: "What is the output of the following Java snippet?\nint x = 5;\nif (x > 10);\n{\n  System.out.println(\"Hello\");\n}",
    options: [
      "Hello",
      "Nothing is printed",
      "Compilation error",
      "Runtime exception"
    ],
    correctAnswer: 0,
    explanation: "Because of the semicolon `;` immediately following `if (x > 10);`, the if statement terminates as an empty statement. The subsequent curly block `{ ... }` executes unconditionally, printing \"Hello\".",
    explanationBn: "`if (x > 10);` এর শেষে সেমিকোলন থাকায় শর্তটি ফাঁকা স্টেটমেন্ট হিসেবে শেষ হয়ে যায়। ফলে নিচের ব্লকটি নিঃশর্তভাবে চলে এবং \"Hello\" প্রিন্ট হয়।",
    hint: "Notice the semicolon after if."
  },
  {
    id: 3,
    question: "What happens when compiling the code:\nint a = 0;\nif (a = 1) {\n  System.out.println(\"True\");\n}",
    options: [
      "Compilation error: incompatible types (int cannot be converted to boolean)",
      "Prints \"True\"",
      "Prints \"False\"",
      "Runtime exception"
    ],
    correctAnswer: 0,
    explanation: "`a = 1` is an assignment expression that evaluates to the integer `1`. Since `1` is an `int` and not a `boolean`, the Java compiler rejects it with an incompatible types error.",
    explanationBn: "`a = 1` হলো অ্যাসাইনমেন্ট যার মান ১। পূর্ণসংখ্যা ১ কে বুলিয়ানে পরিবর্তন করা যায় না বলে কম্পাইল এরর ঘটে।",
    hint: "= is assignment, not equality =="
  },
  {
    id: 4,
    question: "What is the output of the following Java code?\nboolean flag = false;\nif (flag = true) {\n  System.out.println(\"Yes\");\n} else {\n  System.out.println(\"No\");\n}",
    options: [
      "Yes",
      "No",
      "Compilation error",
      "false"
    ],
    correctAnswer: 0,
    explanation: "In `if (flag = true)`, the single `=` assigns `true` to `flag`. An assignment expression evaluates to the assigned value, which is `true`. Because the result is a boolean `true`, the `if` block executes, printing \"Yes\".",
    explanationBn: "`flag = true` অ্যাসাইনমেন্টে flag-এর মান true হয় এবং সামগ্রিক শর্তটি true রিটার্ন করে। তাই if ব্লক কার্যকর হয়ে \"Yes\" প্রিন্ট করে।",
    hint: "The assignment assigns true and returns true."
  },
  {
    id: 5,
    question: "In an `if-else-if` ladder, what happens once one of the conditions evaluates to `true`?",
    options: [
      "Its associated block executes, and all remaining conditions in the ladder are bypassed.",
      "The program evaluates all subsequent conditions anyway.",
      "The program resets the variable.",
      "A compile-time warning is issued."
    ],
    correctAnswer: 0,
    explanation: "An `if-else-if` ladder is mutually exclusive. Once a condition evaluates to `true`, its block executes and control transfers immediately out of the entire ladder construct.",
    explanationBn: "`if-else-if` ল্যাডারে একটি শর্ত সত্য (true) হলে তার সংশ্লিষ্ট ব্লক চলে এবং বাকি সব শর্ত এড়িয়ে গিয়ে ল্যাডার থেকে বের হয়ে যায়।",
    hint: "First true condition wins and skips the rest."
  },
  {
    id: 6,
    question: "What is the output of the following Java snippet?\nint marks = 75;\nif (marks >= 80) {\n  System.out.print(\"A \");\n} else if (marks >= 60) {\n  System.out.print(\"B \");\n} else if (marks >= 40) {\n  System.out.print(\"C \");\n} else {\n  System.out.print(\"D \");\n}",
    options: [
      "B ",
      "B C D ",
      "A B ",
      "C "
    ],
    correctAnswer: 0,
    explanation: "`marks >= 80` (75 >= 80) is false. Next, `marks >= 60` (75 >= 60) is true! It prints \"B \" and bypasses all subsequent `else if` and `else` branches.",
    explanationBn: "৭৫ >= ৮০ মিথ্যা; কিন্তু ৭৫ >= ৬০ সত্য। তাই \"B \" প্রিন্ট হয় এবং পরবর্তী কোনো শাখা আর যাচাই করা হয় না।",
    hint: "75 is greater than 60."
  },
  {
    id: 7,
    question: "What is the 'dangling else' problem in programming?",
    options: [
      "Ambiguity regarding which preceding `if` an `else` clause belongs to when braces `{}` are omitted.",
      "An else clause without any code inside.",
      "An else statement appearing before an if statement.",
      "A syntax error caused by too many else statements."
    ],
    correctAnswer: 0,
    explanation: "The dangling else problem occurs in nested if statements without explicit curly braces `{}`. In Java, an `else` is always paired with the closest preceding unmatched `if` within the same block.",
    explanationBn: "ড্যাংলিং এলস হলো নেস্টেড `if`-এ বন্ধনী না থাকলে `else` কোন `if`-এর সাথে যুক্ত হবে সেই বিভ্রান্তি। জাভায় `else` সবসময় নিকটতম পূর্ববর্তী `if`-এর সাথে যুক্ত হয়।",
    hint: "Else pairs with the closest preceding unmatched if."
  },
  {
    id: 8,
    question: "What is the output of this code with nested conditionals?\nint x = 10, y = 5;\nif (x > 5)\n  if (y > 10)\n    System.out.print(\"One\");\n  else\n    System.out.print(\"Two\");",
    options: [
      "Two",
      "One",
      "OneTwo",
      "Nothing is printed"
    ],
    correctAnswer: 0,
    explanation: "`x > 5` (10 > 5) is true, entering the inner if. The inner condition `y > 10` (5 > 10) is false, so its corresponding `else` executes, printing \"Two\".",
    explanationBn: "`x > 5` সত্য হওয়ায় ভেতরের if-এ প্রবেশ করে। `y > 10` মিথ্যা হওয়ায় এর সাথে যুক্ত `else` চলে এবং \"Two\" প্রিন্ট করে।",
    hint: "Inner if is false, its else runs."
  },
  {
    id: 9,
    question: "What is the output of this code?\nint x = 2, y = 5;\nif (x > 5)\n  if (y > 2)\n    System.out.print(\"One\");\n  else\n    System.out.print(\"Two\");",
    options: [
      "Nothing is printed",
      "Two",
      "One",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "`x > 5` (2 > 5) is false. Since the outer `if` condition is false, the entire inner `if-else` construct is bypassed. Nothing is printed.",
    explanationBn: "`x > 5` (২ > ৫) মিথ্যা হওয়ায় বাইরের if-এর ভেতরে প্রবেশই করে না। তাই কোনো কিছুই প্রিন্ট হয় না।",
    hint: "Outer if fails immediately."
  },
  {
    id: 10,
    question: "When are curly braces `{}` strictly mandatory in an `if` statement?",
    options: [
      "When the body contains two or more statements.",
      "Always; Java does not allow single statements without braces.",
      "Only when using else.",
      "Only inside loops."
    ],
    correctAnswer: 0,
    explanation: "If the body of an `if` or `else` contains two or more statements, curly braces `{}` are strictly mandatory to group them into a single block.",
    explanationBn: "`if` বা `else` ব্লকে একের অধিক স্টেটমেন্ট থাকলে সেগুলোকে একত্রে ব্লক করার জন্য দ্বিতীয় বন্ধনী `{}` বাধ্যতামূলক।",
    hint: "More than one statement requires braces."
  },
  {
    id: 11,
    question: "What is the output of the following Java snippet?\nint a = 10;\nif (a > 5)\n  a += 2;\n  a += 3;\nSystem.out.println(a);",
    options: [
      "15",
      "12",
      "10",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "Without braces, only the immediately following statement `a += 2;` belongs to the `if`. `a += 3;` executes unconditionally! `a` becomes `10 + 2 = 12`, then `12 + 3 = 15`.",
    explanationBn: "বন্ধনী না থাকায় শুধু `a += 2;` অংশটি if-এর অধীনে থাকে। `a += 3;` নিঃশর্তভাবে চলে। ফলে a-এর মান 10 + 2 + 3 = 15 হয়।",
    hint: "Only one statement belongs to the unbraced if."
  },
  {
    id: 12,
    question: "What is the output of the following Java snippet?\nint a = 2;\nif (a > 5)\n  a += 2;\n  a += 3;\nSystem.out.println(a);",
    options: [
      "5",
      "2",
      "7",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "`a > 5` (2 > 5) is false, so `a += 2;` is skipped. However, because there are no curly braces, `a += 3;` is NOT part of the `if` and executes unconditionally! `a` becomes `2 + 3 = 5`.",
    explanationBn: "`a > 5` মিথ্যা হওয়ায় `a += 2;` বাদ যায়, কিন্তু বন্ধনী না থাকায় `a += 3;` নিঃশর্তভাবে চলে এবং মান ২ + ৩ = ৫ হয়।",
    hint: "a += 3 is outside the if block."
  },
  {
    id: 13,
    question: "Which of the following can replace a simple two-way `if-else` statement with a single concise line?",
    options: [
      "The ternary conditional operator `? :`",
      "The switch statement",
      "A while loop",
      "The instanceof operator"
    ],
    correctAnswer: 0,
    explanation: "The ternary operator `condition ? value_if_true : value_if_false` provides a compact inline alternative to a standard `if-else` statement.",
    explanationBn: "টার্নারি অপারেটর (`? :`) একটি সাধারণ দুই-শাখার `if-else` স্টেটমেন্টের সংক্ষিপ্ত এক-লাইনের বিকল্প হিসেবে কাজ করে।",
    hint: "? : is the ternary operator."
  },
  {
    id: 14,
    question: "What will the following code print?\nint age = 16;\nString status = age >= 18 ? \"Adult\" : \"Minor\";\nSystem.out.println(status);",
    options: [
      "Minor",
      "Adult",
      "16",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "`16 >= 18` is false. The ternary operator evaluates the false branch, returning \"Minor\".",
    explanationBn: "১৬ >= ১৮ মিথ্যা (false) হওয়ায় টার্নারি অপারেটর দ্বিতীয় মান \"Minor\" প্রদান করে।",
    hint: "16 is less than 18."
  },
  {
    id: 15,
    question: "Can an `if` statement exist without an `else` branch in Java?",
    options: [
      "Yes, an `if` statement can exist independently without any `else`.",
      "No, every `if` must have a matching `else`.",
      "Only in void methods.",
      "Only if it contains a return statement."
    ],
    correctAnswer: 0,
    explanation: "An `else` branch is entirely optional in Java. A simple `if` statement without an `else` executes only when its condition is true.",
    explanationBn: "জাভায় `else` সম্পূর্ণ ঐচ্ছিক। কোনো `else` ছাড়াই একটি স্বাধীন `if` স্টেটমেন্ট সম্পূর্ণ বৈধ।",
    hint: "Else is optional."
  },
  {
    id: 16,
    question: "Can an `else` branch exist without a preceding `if` in Java?",
    options: [
      "No, an `else` without a matching `if` causes a compile-time error (`'else' without 'if'`).",
      "Yes, it executes by default.",
      "Yes, if placed inside a class.",
      "Only if written in lowercase."
    ],
    correctAnswer: 0,
    explanation: "An `else` statement must always be paired with a preceding `if`. Writing `else` without an `if` produces a compiler error.",
    explanationBn: "একটি `else` অবশ্যই পূর্ববর্তী কোনো `if`-এর সাথে যুক্ত থাকতে হয়। `if` ছাড়া `else` লিখলে কম্পাইল এরর হয়।",
    hint: "Else requires an if."
  },
  {
    id: 17,
    question: "What is the output of the following Java snippet?\nint n = 0;\nif (n > 0) {\n  System.out.print(\"Positive\");\n} else if (n < 0) {\n  System.out.print(\"Negative\");\n} else {\n  System.out.print(\"Zero\");\n}",
    options: [
      "Zero",
      "Positive",
      "Negative",
      "PositiveZero"
    ],
    correctAnswer: 0,
    explanation: "`n > 0` (0 > 0) is false. `n < 0` (0 < 0) is false. The catch-all `else` block executes, printing \"Zero\".",
    explanationBn: "০ > ০ এবং ০ < ০ উভয় শর্তই মিথ্যা। ফলে শেষ `else` ব্লকটি সক্রিয় হয়ে \"Zero\" প্রিন্ট করে।",
    hint: "0 is neither positive nor negative."
  },
  {
    id: 18,
    question: "What is the output of the following Java code?\nboolean x = true, y = false;\nif (x && y) {\n  System.out.print(\"1\");\n} else if (x || y) {\n  System.out.print(\"2\");\n} else {\n  System.out.print(\"3\");\n}",
    options: [
      "2",
      "1",
      "3",
      "12"
    ],
    correctAnswer: 0,
    explanation: "`x && y` (true && false) is `false`. Next condition `x || y` (true || false) is `true`. It prints \"2\" and terminates the ladder.",
    explanationBn: "`true && false` হলো false; কিন্তু `true || false` হলো true। ফলে \"2\" প্রিন্ট হয়।",
    hint: "OR condition succeeds."
  },
  {
    id: 19,
    question: "What is the purpose of the final `else` clause in an `if-else-if` ladder?",
    options: [
      "It acts as a default fallback executed when none of the preceding conditions evaluate to true.",
      "It restarts the ladder.",
      "It forces the compiler to optimize the code.",
      "It makes all previous conditions true."
    ],
    correctAnswer: 0,
    explanation: "The final `else` serves as a default catch-all handler that executes if and only if every single preceding `if` and `else if` condition evaluated to `false`.",
    explanationBn: "ল্যাডারের শেষ `else` একটি ডিফল্ট ফলব্যাক হিসেবে কাজ করে যা পূর্ববর্তী কোনো শর্তই সত্য না হলে বাস্তবায়িত হয়।",
    hint: "Fallback when all conditions fail."
  },
  {
    id: 20,
    question: "What happens if all conditions in an `if-else-if` ladder are `false` and there is NO final `else` block?",
    options: [
      "The entire construct terminates without executing any block, and control continues with the next statement.",
      "A NullPointerException is thrown.",
      "Compilation error.",
      "The first block executes anyway."
    ],
    correctAnswer: 0,
    explanation: "If no conditions match and there is no default `else`, none of the blocks execute, and execution continues to the line after the ladder.",
    explanationBn: "কোনো শর্তই না মিললে এবং শেষ `else` না থাকলে কোনো ব্লকই চলবে না, প্রোগ্রাম স্বাভাবিকভাবে পরের লাইনে চলে যাবে।",
    hint: "Nothing executes."
  },
  {
    id: 21,
    question: "What is the output of the following Java code?\nint val = 15;\nif (val % 3 == 0) {\n  System.out.print(\"Three \");\n}\nif (val % 5 == 0) {\n  System.out.print(\"Five \");\n}",
    options: [
      "Three Five ",
      "Three ",
      "Five ",
      "Nothing"
    ],
    correctAnswer: 0,
    explanation: "Notice these are two INDEPENDENT `if` statements, NOT an `if-else` ladder! Both conditions are evaluated: `15 % 3 == 0` is true (prints \"Three \"), and `15 % 5 == 0` is true (prints \"Five \").",
    explanationBn: "এখানে দুটি পৃথক স্বাধীন `if` স্টেটমেন্ট রয়েছে (কোনো else নেই)। উভয় শর্তই সত্য হওয়ায় \"Three Five \" প্রিন্ট হবে।",
    hint: "Two separate if statements, not an if-else."
  },
  {
    id: 22,
    question: "In contrast to Question 21, what is the output if an `else if` is used?\nint val = 15;\nif (val % 3 == 0) {\n  System.out.print(\"Three \");\n} else if (val % 5 == 0) {\n  System.out.print(\"Five \");\n}",
    options: [
      "Three ",
      "Three Five ",
      "Five ",
      "Nothing"
    ],
    correctAnswer: 0,
    explanation: "Because this is an `if-else-if` ladder, once `val % 3 == 0` is true, \"Three \" is printed and the subsequent `else if` is completely skipped.",
    explanationBn: "যেহেতু এটি একটি ল্যাডার, প্রথম শর্ত `val % 3 == 0` সত্য হওয়ায় \"Three \" প্রিন্ট হয়ে ল্যাডার শেষ হয়ে যায়। \"Five \" আর চলে না।",
    hint: "Ladder stops after the first true match."
  },
  {
    id: 23,
    question: "What is the output of the following Java snippet?\nint a = 5;\nif (a > 2)\n  if (a < 4)\n    System.out.print(\"Inside\");\nelse\n  System.out.print(\"Outside\");",
    options: [
      "Outside",
      "Inside",
      "InsideOutside",
      "Nothing"
    ],
    correctAnswer: 0,
    explanation: "Due to the dangling else rule, `else` binds to the inner `if (a < 4)`. `a > 2` (5 > 2) is true, entering inner block. `a < 4` (5 < 4) is false, so the inner `else` executes, printing \"Outside\".",
    explanationBn: "ড্যাংলিং এলস নিয়মে `else` ভেতরের `if (a < 4)`-এর সাথে যুক্ত। ৫ > ২ সত্য, কিন্তু ৫ < ৪ মিথ্যা। তাই ভেতরের else কার্যকর হয়ে \"Outside\" প্রিন্ট করে।",
    hint: "Indentation does not fool the Java compiler; else belongs to inner if."
  },
  {
    id: 24,
    question: "How can a developer force an `else` to belong to the OUTER `if` in nested conditions?",
    options: [
      "By enclosing the inner `if` inside curly braces `{}`.",
      "By indenting the else to match the outer if.",
      "By putting a semicolon after the inner if.",
      "Java does not permit an else to belong to an outer if."
    ],
    correctAnswer: 0,
    explanation: "Wrapping the inner `if` in braces `{ if (...) ... }` closes its scope, forcing any subsequent `else` to attach to the outer `if`.",
    explanationBn: "ভেতরের `if`-কে দ্বিতীয় বন্ধনী `{}` দিয়ে আবদ্ধ করলে তার পরিধি শেষ হয়ে যায় এবং পরবর্তী `else` সরাসরি বাইরের `if`-এর সাথে যুক্ত হয়।",
    hint: "Use curly braces to isolate the inner if."
  },
  {
    id: 25,
    question: "What will happen if a programmer writes an unreachable statement in Java?\nif (false) {\n  System.out.println(\"Unreachable\");\n}",
    options: [
      "Java allows `if (false)` without compilation error (used for conditional compilation/feature toggling), though the statement will never execute.",
      "Throws a mandatory compile-time error: 'unreachable statement'.",
      "Causes a JVM crash.",
      "Converts false to true."
    ],
    correctAnswer: 0,
    explanation: "While unreachable `while(false)` or statements after `return` cause compile errors, the Java Language Specification (§14.21) explicitly allows `if (false)` to support conditional compilation flags.",
    explanationBn: "জাভায় `while(false)` বা return-এর পরের কোডে unreachable এরর দিলেও JLS §14.21 অনুযায়ী `if (false)` অনুমোদিত (ফিচার ফ্ল্যাগের সুবিধার জন্য)।",
    hint: "if (false) is a special exemption in JLS for conditional compilation."
  }
];

export default topic0_questions;
