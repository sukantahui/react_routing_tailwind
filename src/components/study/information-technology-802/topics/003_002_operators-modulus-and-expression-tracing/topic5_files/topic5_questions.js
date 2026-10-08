const topic5_questions = [
  {
    id: 1,
    question: "Why does the statement `b += 5;` compile successfully when `byte b = 10;`, whereas `b = b + 5;` causes a compile error?",
    options: [
      "Because compound assignment operators in Java automatically inject an implicit narrowing type cast: `b = (byte)(b + 5);`",
      "Because 5 is smaller than 10",
      "Because += only works with bytes",
      "Because b + 5 is faster than b += 5"
    ],
    correctAnswer: 0,
    explanation: "Under JLS §15.26.2, compound assignments like `b += 5` automatically cast the result back to the type of the left-hand variable (`b = (byte)(b + 5)`), avoiding the 'possible lossy conversion' error produced by `b = b + 5`.",
    explanationBn: "জাভায় কম্পাউন্ড অ্যাসাইনমেন্ট (`b += 5`) স্বয়ংক্রিয়ভাবে টাইপকাস্টিং `b = (byte)(b + 5);` সম্পন্ন করে, ফলে `b = b + 5` এর মতো lossy conversion ত্রুটি ঘটে না।",
    hint: "Compound operators automatically apply implicit narrowing casts."
  },
  {
    id: 2,
    question: "What is the equivalent expression of `a *= b + 2;` in Java?",
    options: [
      "a = a * b + 2;",
      "a = a * (b + 2);",
      "a = (a * b) + 2;",
      "a = b + 2;"
    ],
    correctAnswer: 1,
    explanation: "In compound assignment, the entire right-hand expression is treated as if enclosed in parentheses: `a *= b + 2` is equivalent to `a = a * (b + 2);`.",
    explanationBn: "কম্পাউন্ড অপারেটরে ডানপাশের সম্পূর্ণ অংশ বন্ধনীর মতো কাজ করে: `a *= b + 2` এর সমতুল্য হলো `a = a * (b + 2);`।",
    hint: "Parentheses wrap the entire right-hand side."
  },
  {
    id: 3,
    question: "Given `int a = 5, b = 3; a *= b + 2;`. What is the final value of `a`?",
    options: [
      "17",
      "25",
      "15",
      "10"
    ],
    correctAnswer: 1,
    explanation: "`a = 5 * (3 + 2) = 5 * 5 = 25` (It is NOT `5 * 3 + 2 = 17`!).",
    explanationBn: "a = ৫ * (৩ + ২) = ৫ * ৫ = ২৫।",
    hint: "5 * (3 + 2) = 25."
  },
  {
    id: 4,
    question: "What is the output of the following Java code?\n```java\nint x = 10, y = 80;\nx %= y;\nSystem.out.println(x);\n```",
    options: [
      "0",
      "8",
      "10",
      "80"
    ],
    correctAnswer: 2,
    explanation: "`x %= y` means `x = x % y`. Since `10 % 80 = 10`, `x` retains the value `10`.",
    explanationBn: "`x %= y` মানে `x = x % y`। যেহেতু ১০ % ৮০ = ১০, তাই x-এর মান ১০ থাকে।",
    hint: "10 % 80 = 10."
  },
  {
    id: 5,
    question: "What will be the value of `x` after `int x = 20; x /= 3 + 1;`?",
    options: [
      "5",
      "7",
      "6",
      "0"
    ],
    correctAnswer: 0,
    explanation: "`x /= 3 + 1` expands to `x = x / (3 + 1) = 20 / 4 = 5`.",
    explanationBn: "`x = ২০ / (৩ + ১) = ২০ / ৪ = ৫`।",
    hint: "20 / (3 + 1) = 5."
  },
  {
    id: 6,
    question: "What is the result of `int a = 12; a -= 4 - 2;`?",
    options: [
      "6",
      "10",
      "8",
      "14"
    ],
    correctAnswer: 1,
    explanation: "`a -= (4 - 2)` evaluates to `a = 12 - 2 = 10`.",
    explanationBn: "`a = ১২ - (৪ - ২) = ১২ - ২ = ১০`।",
    hint: "12 - (4 - 2) = 10."
  },
  {
    id: 7,
    question: "Which of the following is NOT a compound assignment operator in Java?",
    options: [
      "+=",
      "%=",
      "=+",
      "*="
    ],
    correctAnswer: 2,
    explanation: "`=+' is NOT a compound assignment operator; it is an assignment operator followed by a unary plus (e.g. `x = +5`). The compound operator is `+=`.",
    explanationBn: "`=+` কোনো কম্পাউন্ড অপারেটর নয়, এটি মূলত `=` এর পর ইউনারি প্লাস (+)। সঠিক অপারেটর হলো `+=`।",
    hint: "The operator is +=, not =+."
  },
  {
    id: 8,
    question: "What will the following code snippet print?\n```java\nint x = 4;\nx += x * 2;\nSystem.out.println(x);\n```",
    options: [
      "12",
      "16",
      "8",
      "4"
    ],
    correctAnswer: 0,
    explanation: "`x += x * 2` expands to `x = x + (x * 2) = 4 + (4 * 2) = 4 + 8 = 12`.",
    explanationBn: "`x = ৪ + (৪ * ২) = ৪ + ৮ = ১২`।",
    hint: "4 + (4 * 2) = 12."
  },
  {
    id: 9,
    question: "What is the value of `n` in:\n```java\nint n = 15;\nn %= 4;\nSystem.out.println(n);\n```",
    options: [
      "3",
      "0",
      "1",
      "4"
    ],
    correctAnswer: 0,
    explanation: "`n = 15 % 4 = 3`.",
    explanationBn: "১৫ কে ৪ দিয়ে ভাগ করলে ভাগশেষ ৩ থাকে।",
    hint: "15 % 4 = 3."
  },
  {
    id: 10,
    question: "What will happen when compiling: `short s = 20; s += 10.5;`?",
    options: [
      "Compile-time error: cannot add double to short",
      "Compiles successfully and truncates the double to short (s becomes 30)",
      "Runtime ClassCastException",
      "s becomes 30.5"
    ],
    correctAnswer: 1,
    explanation: "Because `+=` includes an implicit cast `s = (short)(s + 10.5);`, the double `30.5` is automatically cast to `short 30` without any compiler error!",
    explanationBn: "কম্পাউন্ড অপারেটরে স্বয়ংক্রিয় টাইপকাস্টিং `s = (short)(s + 10.5);` থাকায় ৩০.৫ সংখ্যাটি ট্রাঙ্কেট হয়ে short ৩০ এ পরিণত হয় এবং কোডটি সফলভাবে কম্পাইল হয়।",
    hint: "Implicit cast truncates double to short without error."
  },
  {
    id: 11,
    question: "What will be printed by:\n```java\nint a = 10;\na *= a += 2;\nSystem.out.println(a);\n```",
    options: [
      "120",
      "100",
      "144",
      "24"
    ],
    correctAnswer: 0,
    explanation: "1) The left operand of `*=` is `a` (which is 10). 2) The right-hand side `a += 2` updates `a` to 12 and yields 12. 3) Finally, `10 * 12 = 120`. Result: `a = 120`.",
    explanationBn: "১) বামপাশের a-এর মান ১০ সংরক্ষিত হয়। ২) ডানপাশে `a += 2` হয়ে a=১২ হয় এবং ১২ মান দেয়। ৩) ১০ * ১২ = ১২০ মানটি a-তে জমা হয়।",
    hint: "10 * (a += 2 which is 12) = 120."
  },
  {
    id: 12,
    question: "What is the output of:\n```java\nint x = 8;\nx -= x / 2;\nSystem.out.println(x);\n```",
    options: [
      "4",
      "0",
      "8",
      "2"
    ],
    correctAnswer: 0,
    explanation: "`x -= x / 2` -> `x = x - (x / 2) = 8 - 4 = 4`.",
    explanationBn: "`x = ৮ - (৮ / ২) = ৮ - ৪ = ৪`।",
    hint: "8 - 4 = 4."
  },
  {
    id: 13,
    question: "Which of the following lines causes a compile-time error?",
    options: [
      "byte b = 5; b += 2;",
      "byte b = 5; b = b + 2;",
      "byte b = 5; b = (byte)(b + 2);",
      "int b = 5; b += 2;"
    ],
    correctAnswer: 1,
    explanation: "`b = b + 2;` causes 'possible lossy conversion from int to byte' because `b + 2` evaluates to an int.",
    explanationBn: "`b = b + 2;` কম্পাইল এরর দেয় কারণ b + 2 একটি int মান তৈরি করে যা কাস্টিং ছাড়া byte-এ রাখা যায় না।",
    hint: "b = b + 2 lacks explicit casting."
  },
  {
    id: 14,
    question: "What is the value of `val` after `int val = 100; val /= 5 * 4;`?",
    options: [
      "80",
      "5",
      "20",
      "4"
    ],
    correctAnswer: 1,
    explanation: "`val /= (5 * 4)` -> `val = 100 / 20 = 5`.",
    explanationBn: "`val = ১০০ / (৫ * ৪) = ১০০ / ২০ = ৫`।",
    hint: "100 / (5 * 4) = 5."
  },
  {
    id: 15,
    question: "Can compound assignment operators be used with String variables in Java (e.g. `String str = \"Hi \"; str += \"There\";`)?",
    options: [
      "No, compound operators are only for numbers",
      "Yes, `+=` works on Strings for concatenation",
      "No, Strings are final and cannot use operators",
      "Only in Java 21"
    ],
    correctAnswer: 1,
    explanation: "Yes, `+=` is valid on Strings and performs concatenation: `str += \"There\"` becomes `\"Hi There\"`.",
    explanationBn: "হ্যাঁ, জাভায় স্ট্রিংয়েও `+=` ব্যবহার করা যায় এবং এটি স্ট্রিং কনক্যাটেনেশন সম্পন্ন করে।",
    hint: "+= performs string concatenation."
  },
  {
    id: 16,
    question: "What is the value of `k` after `int k = 10; k %= 3 * 2;`?",
    options: [
      "4",
      "2",
      "1",
      "0"
    ],
    correctAnswer: 0,
    explanation: "`k %= (3 * 2)` -> `k = 10 % 6 = 4`.",
    explanationBn: "`k = ১০ % (৩ * ২) = ১০ % ৬ = ৪`।",
    hint: "10 % (3 * 2) = 10 % 6 = 4."
  },
  {
    id: 17,
    question: "What will happen if `int x = 10; x /= 0;` is executed?",
    options: [
      "x becomes 0",
      "Throws java.lang.ArithmeticException: / by zero",
      "x becomes Infinity",
      "x remains 10"
    ],
    correctAnswer: 1,
    explanation: "Compound division by zero throws an ArithmeticException at runtime just like regular division.",
    explanationBn: "শূন্য দিয়ে ভাগ করায় রানটাইমে ArithmeticException ঘটে।",
    hint: "Throws ArithmeticException."
  },
  {
    id: 18,
    question: "What is the output of:\n```java\nint x = 5;\nx += ++x;\nSystem.out.println(x);\n```",
    options: [
      "10",
      "11",
      "12",
      "6"
    ],
    correctAnswer: 1,
    explanation: "1) Left operand `x` is evaluated first (5). 2) Right operand `++x` pre-increments x from 5 to 6, yields 6. 3) `5 + 6 = 11`. Assigned to x -> `x = 11`.",
    explanationBn: "বামপাশের x এর মান ৫ থাকে, ডানপাশের `++x` মান দেয় ৬। ফলে ৫ + ৬ = ১১।",
    hint: "5 + 6 = 11."
  },
  {
    id: 19,
    question: "What is the output of:\n```java\nint x = 5;\nx += x++;\nSystem.out.println(x);\n```",
    options: [
      "10",
      "11",
      "12",
      "5"
    ],
    correctAnswer: 0,
    explanation: "1) Left operand `x` evaluates to 5. 2) Right operand `x++` yields 5 (then x becomes 6 in memory). 3) `5 + 5 = 10`. Assigned to x -> `x = 10`.",
    explanationBn: "বামপাশের x দেয় ৫, ডানপাশের `x++` দেয় ৫। ফলে ৫ + ৫ = ১০ মানটি x-এ জমা হয়।",
    hint: "5 + 5 = 10."
  },
  {
    id: 20,
    question: "What is the associativity of all assignment and compound assignment operators in Java?",
    options: [
      "Left-to-Right",
      "Right-to-Left",
      "Non-associative",
      "Top-to-Bottom"
    ],
    correctAnswer: 1,
    explanation: "All assignment operators (`=`, `+=`, `-=`, `*=`, etc.) have RIGHT-TO-LEFT associativity in Java.",
    explanationBn: "জাভায় সকল অ্যাসাইনমেন্ট এবং কম্পাউন্ড অ্যাসাইনমেন্ট অপারেটর ডান থেকে বামে (Right-to-Left) কাজ করে।",
    hint: "Assignment operators associate Right-to-Left."
  },
  {
    id: 21,
    question: "What is the value of `a` and `b` in `int a, b; a = b = 50;`?",
    options: [
      "Both a and b are 50",
      "Only b is 50",
      "Syntax error",
      "Both are 0"
    ],
    correctAnswer: 0,
    explanation: "Due to right-to-left associativity, `b = 50` evaluates first, returning 50, which is then assigned to `a = 50`.",
    explanationBn: "ডান থেকে বামে মূল্যায়নের কারণে b=৫০ আগে হয় এবং সেই মান a-তে গিয়ে উভয়ই ৫০ হয়।",
    hint: "Chained assignment sets both to 50."
  },
  {
    id: 22,
    question: "What is the value of `x` after: `int x = 10; x -= 3 * 2 + 1;`?",
    options: [
      "3",
      "15",
      "7",
      "14"
    ],
    correctAnswer: 0,
    explanation: "`x -= (3 * 2 + 1)` -> `x = 10 - (6 + 1) = 10 - 7 = 3`.",
    explanationBn: "`x = ১০ - (৬ + ১) = ১০ - ৭ = ৩`।",
    hint: "10 - (6 + 1) = 3."
  },
  {
    id: 23,
    question: "What is the value of `p` after `int p = 5; p *= 2 + 3;`?",
    options: [
      "13",
      "25",
      "15",
      "10"
    ],
    correctAnswer: 1,
    explanation: "`p *= (2 + 3)` -> `5 * 5 = 25`.",
    explanationBn: "`p = ৫ * (২ + ৩) = ৫ * ৫ = ২৫`।",
    hint: "5 * (2 + 3) = 25."
  },
  {
    id: 24,
    question: "Can compound assignment operators be used with array elements (e.g. `arr[0] += 5;`)?",
    options: [
      "No, only with primitive simple variables",
      "Yes, the array element at index 0 is updated by 5",
      "Throws ArrayStoreException",
      "Requires ArrayList"
    ],
    correctAnswer: 1,
    explanation: "Yes, compound assignment works seamlessly on array elements: `arr[0] += 5`.",
    explanationBn: "হ্যাঁ, অ্যারে উপাদানেও কম্পাউন্ড অপারেটর অনায়াসে কাজ করে।",
    hint: "Works with array elements."
  },
  {
    id: 25,
    question: "Which of the following summaries regarding compound assignment operators is 100% accurate for CBSE Class 12 IT-802?",
    options: [
      "Compound assignment operators (`+=`, `-=`, etc.) automatically perform an implicit cast back to the target variable's type, treat the entire right-hand expression as parenthesized, and associate right-to-left",
      "Compound assignment operators require manual type casting for all operations",
      "Compound assignment operators can only be used with integer types",
      "`a *= b + 2` is equivalent to `a = a * b + 2`"
    ],
    correctAnswer: 0,
    explanation: "Accurate summary: implicit narrowing casting, right-hand parenthesization, and right-to-left associativity.",
    explanationBn: "সঠিক সারাংশ: কম্পাউন্ড অপারেটর স্বয়ংক্রিয় টাইপকাস্ট করে, ডানপাশের এক্সপ্রেশনকে বন্ধনীতে আবদ্ধ ধরে এবং ডান থেকে বামে কাজ করে।",
    hint: "Review all 3 key features of compound assignment."
  }
];

export default topic5_questions;
