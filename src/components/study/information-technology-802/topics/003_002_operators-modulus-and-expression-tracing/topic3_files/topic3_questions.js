const topic3_questions = [
  {
    id: 1,
    question: "What is the key functional difference between prefix (`++x`) and postfix (`x++`) increment in Java?",
    options: [
      "Prefix increments by 2, postfix increments by 1",
      "Prefix increments the variable first and uses the updated value; postfix uses the current value first and increments afterwards",
      "Prefix only works on integers; postfix only works on floats",
      "Prefix cannot be used inside loops"
    ],
    correctAnswer: 1,
    explanation: "In prefix (`++x`), the variable is incremented prior to its value being fetched for the expression ('change then use'). In postfix (`x++`), the existing value is used in the expression and incrementation occurs in memory afterwards ('use then change').",
    explanationBn: "প্রিফিক্স (`++x`) এ প্রথমে মান ১ বাড়ে এবং নতুন মানটি ব্যবহৃত হয়; আর পোস্টফিক্স (`x++`) এ বর্তমান মানটি আগে ব্যবহৃত হয় এবং পরে মেমরিতে মান ১ বাড়ে।",
    hint: "Prefix: Change then use; Postfix: Use then change."
  },
  {
    id: 2,
    question: "Given `int x = 5; int y = ++x;`, what are the final values of `x` and `y`?",
    options: [
      "x = 6, y = 5",
      "x = 6, y = 6",
      "x = 5, y = 6",
      "x = 5, y = 5"
    ],
    correctAnswer: 1,
    explanation: "Because `++x` is prefix, `x` is incremented from 5 to 6 first, and then 6 is assigned to `y`. Thus, both `x` and `y` equal `6`.",
    explanationBn: "যেহেতু `++x` প্রিফিক্স, তাই 'x' আগে ৫ থেকে ৬ হয় এবং সেই ৬ মানটি 'y'-তে জমা হয়। ফলে x = 6 এবং y = 6।",
    hint: "Pre-increment updates both to 6."
  },
  {
    id: 3,
    question: "Given `int x = 5; int y = x++;`, what are the final values of `x` and `y`?",
    options: [
      "x = 6, y = 5",
      "x = 6, y = 6",
      "x = 5, y = 6",
      "x = 5, y = 5"
    ],
    correctAnswer: 0,
    explanation: "Because `x++` is postfix, the original value `5` is assigned to `y` first. Then `x` is incremented to `6` in memory. Thus `x = 6` and `y = 5`.",
    explanationBn: "পোস্টফিক্স `x++` হওয়ায় 'y' প্রথমে বর্তমান মান ৫ গ্রহণ করে, এরপর মেমরিতে 'x'-এর মান বেড়ে ৬ হয়। ফলে x = 6, y = 5।",
    hint: "y gets the original 5, then x becomes 6."
  },
  {
    id: 4,
    question: "What is the output of the following Java snippet?\n```java\nint a = 5;\nint b = a++ + ++a;\nSystem.out.println(\"a=\" + a + \", b=\" + b);\n```",
    options: [
      "a=7, b=12",
      "a=6, b=11",
      "a=7, b=11",
      "a=6, b=12"
    ],
    correctAnswer: 0,
    explanation: "Trace: 1) `a++` yields 5, and increments `a` in memory to 6. 2) `++a` increments `a` from 6 to 7, and yields 7. 3) Sum `b = 5 + 7 = 12`. Final values: `a = 7`, `b = 12`.",
    explanationBn: "ট্রেসিং: ১) `a++` মান দেয় ৫ এবং মেমরিতে a=৬ হয়; ২) `++a` a-কে বাড়িয়ে ৭ করে এবং মান দেয় ৭; ৩) যোগফল b = ৫ + ৭ = ১২। চূড়ান্ত মান: a = 7, b = 12।",
    hint: "First term gives 5 (a becomes 6), second term pre-increments to 7."
  },
  {
    id: 5,
    question: "What will the following code print?\n```java\nint p = 10;\nSystem.out.println(p++);\nSystem.out.println(p);\n```",
    options: [
      "11 followed by 11",
      "10 followed by 11",
      "10 followed by 10",
      "11 followed by 10"
    ],
    correctAnswer: 1,
    explanation: "`System.out.println(p++)` prints the original value `10` first, then `p` increments to 11 in memory. The second println outputs the updated `11`.",
    explanationBn: "প্রথম println এ পোস্টফিক্স থাকায় ১০ মুদ্রিত হয় এবং মেমরিতে p=১১ হয়। দ্বিতীয় println এ ১১ মুদ্রিত হয়।",
    hint: "Prints 10, then prints 11."
  },
  {
    id: 6,
    question: "What will the following code print?\n```java\nint p = 10;\nSystem.out.println(++p);\nSystem.out.println(p);\n```",
    options: [
      "11 followed by 11",
      "10 followed by 11",
      "10 followed by 10",
      "11 followed by 12"
    ],
    correctAnswer: 0,
    explanation: "`++p` increments `p` from 10 to 11 first and prints `11`. The next line prints `11` again.",
    explanationBn: "প্রিফিক্স `++p` প্রথমে ১০ থেকে ১১ করে এবং ১১ প্রিন্ট করে। পরবর্তী লাইনেও ১১ প্রিন্ট হয়।",
    hint: "Both print 11."
  },
  {
    id: 7,
    question: "What is the result of evaluating: `5++` in Java?",
    options: [
      "6",
      "Compile-time error: unexpected type, required: variable, found: value",
      "5",
      "Runtime ArithmeticException"
    ],
    correctAnswer: 1,
    explanation: "Increment and decrement operators can ONLY be applied to variables, never to constant literals or values. `5++` causes a compile-time error.",
    explanationBn: "ইনক্রিমেন্ট/ডিক্রিমেন্ট অপারেটর শুধুমাত্র ভ্যারিয়েবলে প্রয়োগ করা যায়, কোনো ধ্রুবক বা সংখ্যায় নয়। তাই `5++` কম্পাইল এরর তৈরি করে।",
    hint: "++ requires a variable (l-value), not a literal."
  },
  {
    id: 8,
    question: "What is the output of the following code?\n```java\nint x = 8;\nint y = --x + x--;\nSystem.out.println(\"x=\" + x + \", y=\" + y);\n```",
    options: [
      "x=6, y=14",
      "x=6, y=13",
      "x=7, y=14",
      "x=7, y=15"
    ],
    correctAnswer: 0,
    explanation: "Trace: 1) `--x` decrements 8 to 7, yields 7 (x is 7). 2) `x--` yields 7, then decrements x to 6 (x is 6). 3) `y = 7 + 7 = 14`. Final: `x = 6`, `y = 14`.",
    explanationBn: "ট্রেসিং: ১) `--x` ৮ থেকে ৭ করে মান দেয় ৭; ২) `x--` মান দেয় ৭ এবং মেমরিতে x=৬ হয়; ৩) y = ৭ + ৭ = ১৪। চূড়ান্ত: x = 6, y = 14।",
    hint: "--x gives 7, x-- gives 7, x becomes 6, y = 14."
  },
  {
    id: 9,
    question: "What is the output of the following statement in Java?\n```java\nint x = 5;\nx = x++;\nSystem.out.println(x);\n```",
    options: [
      "6",
      "5",
      "Compile-time error",
      "0"
    ],
    correctAnswer: 1,
    explanation: "Classic Java Quiz Trap! In `x = x++`, the right side evaluates to `5` (saved in a temporary slot). Then `x` is incremented to 6 in memory. But finally, the assignment operator `=` writes the saved temporary value `5` back into `x`, overwriting the 6! Thus, `x` remains `5`.",
    explanationBn: "জাভায় `x = x++` লিখলে ডানপাশের মান ৫ আগে সংরক্ষিত হয়, মেমরিতে x=৬ হলেও অ্যাসাইনমেন্ট অপারেটর পূর্বের ৫ মানটি পুনরায় x-এ ওভাররাইট করে দেয়। ফলে x = 5 থাকে।",
    hint: "The assignment overwrites the incremented value with original 5."
  },
  {
    id: 10,
    question: "What is the output of:\n```java\nint x = 5;\nx = ++x;\nSystem.out.println(x);\n```",
    options: [
      "5",
      "6",
      "7",
      "Compile-time error"
    ],
    correctAnswer: 1,
    explanation: "`++x` pre-increments 5 to 6 and yields 6. Assigning 6 back to `x` results in `x = 6`.",
    explanationBn: "`++x` প্রথমে ৫ থেকে ৬ করে এবং ৬ মানটি 'x'-এ অ্যাসাইন হওয়ায় ফলাফল ৬ হয়।",
    hint: "Pre-increment assigns 6."
  },
  {
    id: 11,
    question: "If `int a = 1; int b = 2; int c = a++ * ++b;`, what is the value of `c`?",
    options: [
      "6",
      "3",
      "4",
      "2"
    ],
    correctAnswer: 1,
    explanation: "`a++` yields 1 (then a becomes 2). `++b` pre-increments b from 2 to 3, yielding 3. `c = 1 * 3 = 3`.",
    explanationBn: "`a++` মান দেয় ১ এবং `++b` মান দেয় ৩। সুতরাং c = ১ * ৩ = ৩।",
    hint: "1 * 3 = 3."
  },
  {
    id: 12,
    question: "What is the output of:\n```java\nint m = 4;\nint n = ++m * m++;\nSystem.out.println(n);\n```",
    options: [
      "20",
      "25",
      "24",
      "16"
    ],
    correctAnswer: 1,
    explanation: "1) `++m` pre-increments 4 to 5, yields 5 (m is now 5). 2) `m++` yields 5 (then m becomes 6). 3) `n = 5 * 5 = 25`.",
    explanationBn: "১) `++m` মান দেয় ৫ (m=৫); ২) `m++` মান দেয় ৫ (পরে m=৬); ৩) n = ৫ * ৫ = ২৫।",
    hint: "5 * 5 = 25."
  },
  {
    id: 13,
    question: "Can the increment operator `++` be applied to a `char` variable in Java (e.g. `char ch = 'A'; ch++;`)?",
    options: [
      "No, char only supports text",
      "Yes, `ch++` advances the Unicode value from 65 to 66, turning `ch` into `'B'`",
      "No, it throws a ClassCastException",
      "Yes, but it converts ch into a String"
    ],
    correctAnswer: 1,
    explanation: "Because `char` in Java is a 16-bit integer type, `ch++` cleanly increments the character code point, advancing `'A'` (65) to `'B'` (66).",
    explanationBn: "হ্যাঁ, জাভায় char মূলত ১৬-বিট পূর্ণসংখ্যা হওয়ায় `ch++` করলে 'A' (৬৫) থেকে 'B' (৬৬) তে পরিবর্তিত হয়।",
    hint: "'A' increments to 'B'."
  },
  {
    id: 14,
    question: "Can the increment operator `++` be applied to a `boolean` variable in Java (e.g. `boolean flag = true; flag++;`)?",
    options: [
      "Yes, flag becomes false",
      "Compile-time error: operator ++ cannot be applied to boolean",
      "Yes, flag becomes 2",
      "Runtime NullPointerException"
    ],
    correctAnswer: 1,
    explanation: "In Java, `++` and `--` can only be applied to numeric types (byte, short, int, long, float, double, char). Applying them to `boolean` produces a compile-time error.",
    explanationBn: "জাভায় boolean ভ্যারিয়েবলে ইনক্রিমেন্ট বা ডিক্রিমেন্ট অপারেটর প্রয়োগ করা সম্পূর্ণ নিষিদ্ধ এবং কম্পাইল এরর হয়।",
    hint: "Increment/decrement cannot be applied to booleans."
  },
  {
    id: 15,
    question: "What is the output of the following Java snippet?\n```java\nint x = 10;\nSystem.out.println(x++ + x++);\n```",
    options: [
      "20",
      "21",
      "22",
      "23"
    ],
    correctAnswer: 1,
    explanation: "First `x++` yields 10 (and increments x to 11). Second `x++` yields 11 (and increments x to 12). Sum = `10 + 11 = 21`.",
    explanationBn: "প্রথম `x++` দেয় ১০ (x=১১ হয়), দ্বিতীয় `x++` দেয় ১১ (x=১২ হয়)। যোগফল = ১০ + ১১ = ২১।",
    hint: "10 + 11 = 21."
  },
  {
    id: 16,
    question: "What is the output of the following Java snippet?\n```java\nint x = 10;\nSystem.out.println(++x + ++x);\n```",
    options: [
      "21",
      "22",
      "23",
      "24"
    ],
    correctAnswer: 2,
    explanation: "First `++x` pre-increments 10 to 11, yields 11. Second `++x` pre-increments 11 to 12, yields 12. Sum = `11 + 12 = 23`.",
    explanationBn: "প্রথম `++x` দেয় ১১ (x=১১), দ্বিতীয় `++x` দেয় ১২ (x=১২)। যোগফল = ১১ + ১২ = ২৩।",
    hint: "11 + 12 = 23."
  },
  {
    id: 17,
    question: "What is the net effect of running `count++;` as a standalone statement compared to `++count;`?",
    options: [
      "`count++;` increases count by 1; `++count;` increases count by 2",
      "Both standalone statements have the EXACT SAME net effect of increasing `count` by 1 in memory",
      "`count++;` is faster than `++count;`",
      "`++count;` is not allowed as a standalone statement"
    ],
    correctAnswer: 1,
    explanation: "As standalone statements where the return value is not captured, both `count++;` and `++count;` simply increment `count` by 1 with identical results.",
    explanationBn: "আলাদা স্টেটমেন্ট হিসেবে ব্যবহারের সময় `count++;` এবং `++count;` উভয়ের ফলাফল অবিকল এক (মেমরিতে মান ১ বৃদ্ধি পায়)।",
    hint: "Standalone statements have identical net results."
  },
  {
    id: 18,
    question: "What is the value of `k` after executing:\n```java\nint i = 2;\nint k = i++ - --i + i++;\n```",
    options: [
      "2",
      "3",
      "4",
      "1"
    ],
    correctAnswer: 0,
    explanation: "1) `i++` yields 2 (i becomes 3). 2) `--i` decrements i from 3 to 2, yields 2 (i is 2). 3) `i++` yields 2 (i becomes 3). 4) `k = 2 - 2 + 2 = 2`.",
    explanationBn: "ট্রেসিং: ১) `i++` দেয় ২ (i=৩); ২) `--i` দেয় ২ (i=২); ৩) `i++` দেয় ২ (i=৩)। ফলে k = ২ - ২ + ২ = ২।",
    hint: "2 - 2 + 2 = 2."
  },
  {
    id: 19,
    question: "What is the output of the following Java snippet?\n```java\nint a = 3;\nint b = a-- + a-- + a--;\nSystem.out.println(b);\n```",
    options: [
      "6",
      "3",
      "0",
      "9"
    ],
    correctAnswer: 0,
    explanation: "1) First `a--` yields 3 (a becomes 2). 2) Second `a--` yields 2 (a becomes 1). 3) Third `a--` yields 1 (a becomes 0). Sum: `3 + 2 + 1 = 6`.",
    explanationBn: "প্রথমটি দেয় ৩ (a=২), দ্বিতীয়টি দেয় ২ (a=১), তৃতীয়টি দেয় ১ (a=০)। যোগফল = ৩ + ২ + ১ = ৬।",
    hint: "3 + 2 + 1 = 6."
  },
  {
    id: 20,
    question: "What is the output of the following loop?\n```java\nfor (int i = 0; i < 3; ++i) {\n    System.out.print(i + \" \");\n}\n```",
    options: [
      "0 1 2",
      "1 2 3",
      "0 1 2 3",
      "1 2"
    ],
    correctAnswer: 0,
    explanation: "In a for loop update clause, `++i` and `i++` behave identically because the update step occurs independently at the end of each iteration. Output: `0 1 2 `.",
    explanationBn: "for লুপের আপডেট অংশে `++i` এবং `i++` একই কাজ করে। আউটপুট হবে 0 1 2।",
    hint: "Loop prints 0 1 2."
  },
  {
    id: 21,
    question: "What is the value of `y` in: `int x = 5; int y = ++x * 2;`?",
    options: [
      "10",
      "12",
      "11",
      "5"
    ],
    correctAnswer: 1,
    explanation: "`++x` pre-increments 5 to 6, then `6 * 2 = 12`.",
    explanationBn: "`++x` এর মান হয় ৬, এরপর ৬ * ২ = ১২।",
    hint: "6 * 2 = 12."
  },
  {
    id: 22,
    question: "What is the value of `y` in: `int x = 5; int y = x++ * 2;`?",
    options: [
      "10",
      "12",
      "11",
      "5"
    ],
    correctAnswer: 0,
    explanation: "`x++` uses 5 first, so `5 * 2 = 10`. Then `x` increments to 6.",
    explanationBn: "`x++` প্রথমে ৫ ব্যবহার করে, তাই ৫ * ২ = ১০ হয়। পরে x মেমরিতে ৬ হয়।",
    hint: "5 * 2 = 10."
  },
  {
    id: 23,
    question: "Which of the following expressions is syntactically INVALID in Java?",
    options: [
      "++x",
      "x++",
      "++(x + 1)",
      "--x"
    ],
    correctAnswer: 2,
    explanation: "`++` requires an assignable variable (l-value). `(x + 1)` is an expression/value, so `++(x + 1)` causes a compile-time error.",
    explanationBn: "`++` শুধুমাত্র ভ্যারিয়েবলে কাজ করে। `(x + 1)` একটি এক্সপ্রেশন হওয়ায় `++(x + 1)` সিনট্যাক্স এরর দেয়।",
    hint: "Cannot apply ++ to an expression like (x + 1)."
  },
  {
    id: 24,
    question: "What will happen if `double d = 4.5; d++;` is executed?",
    options: [
      "Compile-time error: ++ only works on integers",
      "d becomes 5.5",
      "d becomes 5.0",
      "d becomes 4.6"
    ],
    correctAnswer: 1,
    explanation: "In Java, `++` works on floating-point types as well, adding 1.0. Thus `4.5` becomes `5.5`.",
    explanationBn: "জাভায় দশমিক সংখ্যাতেও `++` কাজ করে এবং ১.০ যোগ করে, ফলে ৪.৫ বেড়ে ৫.৫ হয়।",
    hint: "Adds 1.0 to double, yielding 5.5."
  },
  {
    id: 25,
    question: "Which of the following summaries regarding increment/decrement operators is completely accurate for CBSE Class 12 IT-802?",
    options: [
      "Prefix (`++x`, `--x`) updates the variable in memory first and returns the updated value; Postfix (`x++`, `x--`) returns the original value first and updates memory afterwards; they only work on variables, not literals",
      "Prefix and postfix always produce different results even when written on their own line",
      "Postfix increment increases a variable by 2",
      "Increment operators can be used on boolean variables"
    ],
    correctAnswer: 0,
    explanation: "Prefix changes then uses, Postfix uses then changes, and they strictly require variable operands.",
    explanationBn: "সঠিক সারাংশ: প্রিফিক্স আগে মেমরিতে পরিবর্তন করে নতুন মান দেয়, পোস্টফিক্স আগে বর্তমান মান দিয়ে পরে মেমরিতে পরিবর্তন করে, এবং কেবল ভ্যারিয়েবলে প্রযোজ্য।",
    hint: "Review prefix vs postfix fundamental concepts."
  }
];

export default topic3_questions;
