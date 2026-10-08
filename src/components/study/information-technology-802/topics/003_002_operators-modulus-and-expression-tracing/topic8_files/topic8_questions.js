const topic8_questions = [
  {
    id: 1,
    question: "Which of the following expressions evaluates to floating-point `2.4` in Java?",
    options: [
      "12.0 / 5",
      "12 / 5",
      "(double)(12 / 5)",
      "12 / 5.0f == 2.0"
    ],
    correctAnswer: 0,
    explanation: "`12.0 / 5` involves a `double` literal `12.0`, promoting the division to floating-point arithmetic which yields `2.4`. Notice that `(double)(12 / 5)` first calculates `12 / 5 = 2`, then casts to `2.0`.",
    explanationBn: "`12.0 / 5` এ `12.0` একটি double মান হওয়ায় ফলাফল হয় 2.4। কিন্তু `(double)(12 / 5)` প্রথমে পূর্ণসংখ্যা ভাগ 2 সম্পন্ন করে পরে double-এ রূপান্তর করায় 2.0 দেয়।",
    hint: "Make sure the division itself is floating-point."
  },
  {
    id: 2,
    question: "What is the evaluated output of `10 % 80` in Java?",
    options: [
      "10",
      "0",
      "80",
      "8"
    ],
    correctAnswer: 0,
    explanation: "When dividend `a` is strictly smaller than divisor `b` (`a < b` and positive), integer division yields quotient 0 and remainder equals dividend: `10 % 80 = 10`.",
    explanationBn: "ভাজ্য ভাজকের চেয়ে ছোট হলে (১০ < ৮০) ভাগফল হয় ০ এবং অবশিষ্ট ভাজ্যের সমান অর্থাৎ ১০ থাকে।",
    hint: "10 divided by 80 is 0 with remainder 10."
  },
  {
    id: 3,
    question: "What is the result of `-17 % 5` in Java?",
    options: [
      "-2",
      "2",
      "-3",
      "3"
    ],
    correctAnswer: 0,
    explanation: "In Java, the sign of the modulus remainder is strictly inherited from the dividend (left operand). Since `-17` is negative, the remainder is `-2`.",
    explanationBn: "জাভায় ভাগশেষের চিহ্ন সবসময় ভাজ্য (বামদিকের সংখ্যা)-এর চিহ্ন পায়। -17 ঋণাত্মক হওয়ায় ভাগশেষ -2।",
    hint: "Sign matches the dividend (-17)."
  },
  {
    id: 4,
    question: "What is the result of `17 % -5` in Java?",
    options: [
      "2",
      "-2",
      "3",
      "-3"
    ],
    correctAnswer: 0,
    explanation: "The sign of the divisor (`-5`) has no impact on the remainder in Java. Since the dividend `17` is positive, the remainder is `+2`.",
    explanationBn: "ভাজক ঋণাত্মক হলেও ভাগশেষের চিহ্নে কোনো প্রভাব ফেলে না। ভাজ্য ১৭ ধনাত্মক হওয়ায় ফলাফল +2।",
    hint: "Divisor sign is ignored for remainder sign."
  },
  {
    id: 5,
    question: "What is the final value of `x` after executing: `int x = 5; x = x++;`?",
    options: [
      "5",
      "6",
      "7",
      "0"
    ],
    correctAnswer: 0,
    explanation: "Postfix `x++` caches the current value (5), increments `x` to 6 in memory, and then the assignment `=` overwrites `x` with the cached value 5! Thus `x` remains 5.",
    explanationBn: "পোস্টফিক্স `x++` বর্তমান মান ৫ জমা রাখে, মেমোরিতে x বেড়ে ৬ হয়, কিন্তু অ্যাসাইনমেন্ট অপারেটর পুনরায় ৫ মানটি x-এ লিখে দেয়। তাই x-এর মান ৫ থাকে।",
    hint: "The post-increment assignment trap."
  },
  {
    id: 6,
    question: "What is the result of `x = ((++x) * 2) + 7;` when initial `x = 5`?",
    options: [
      "19",
      "17",
      "21",
      "14"
    ],
    correctAnswer: 0,
    explanation: "1) `(++x)` increments `x` to 6 and yields 6. 2) `6 * 2 = 12`. 3) `12 + 7 = 19`. Finally, `x = 19`.",
    explanationBn: "১) `++x` মান বাড়িয়ে ৬ করে; ২) ৬ * ২ = ১২; ৩) ১২ + ৭ = ১৯। চূড়ান্ত মান ১৯।",
    hint: "6 * 2 + 7 = 19."
  },
  {
    id: 7,
    question: "Why does `byte b = 10; b += 5;` compile without error in Java?",
    options: [
      "Compound assignment automatically injects an implicit narrowing cast: `b = (byte)(b + 5);`",
      "Because 5 is a byte literal by default.",
      "Because byte addition does not promote to int.",
      "Because += disables type checking."
    ],
    correctAnswer: 0,
    explanation: "Per JLS §15.26.2, compound assignments like `E1 op= E2` are equivalent to `E1 = (T)(E1 op E2)`, automatically casting the resulting int back to byte.",
    explanationBn: "কম্পাউন্ড অ্যাসাইনমেন্ট `b += 5` স্বয়ংক্রিয়ভাবে `b = (byte)(b + 5);` টাইপকাস্ট যুক্ত করে, ফলে lossy conversion এরর ঘটে না।",
    hint: "Implicit narrowing cast is performed automatically."
  },
  {
    id: 8,
    question: "What is the value of `a` after: `int a = 5, b = 3; a *= b + 2;`?",
    options: [
      "25",
      "17",
      "15",
      "30"
    ],
    correctAnswer: 0,
    explanation: "The right-hand side of a compound assignment is evaluated as if fully parenthesized: `a = a * (b + 2) = 5 * (3 + 2) = 5 * 5 = 25`.",
    explanationBn: "কম্পাউন্ড অপারেটরে ডানপাশের সম্পূর্ণ অংশ বন্ধনীর মতো কাজ করে: `a = 5 * (3 + 2) = 5 * 5 = 25`।",
    hint: "a = 5 * (3 + 2) = 25."
  },
  {
    id: 9,
    question: "What is the output of the following Java snippet?\nint count = 10;\nboolean check = false && (++count > 10);\nSystem.out.println(count);",
    options: [
      "10",
      "11",
      "0",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "Because the left operand is `false`, the logical AND operator `&&` short-circuits. The right side `++count` is never executed, keeping `count = 10`.",
    explanationBn: "বামদিকের মান false হওয়ায় শর্ট-সার্কিট ঘটে এবং `++count` কখনোই কার্যকর হয় না। ফলে count এর মান 10 থাকে।",
    hint: "Short-circuit bypasses the right operand."
  },
  {
    id: 10,
    question: "What is the evaluated output of `20 / 4 * 2` in Java?",
    options: [
      "10",
      "2",
      "20",
      "40"
    ],
    correctAnswer: 0,
    explanation: "Division and multiplication have equal precedence and Left-to-Right associativity: `(20 / 4) * 2 = 5 * 2 = 10`.",
    explanationBn: "ভাগ ও গুণের প্রাধান্য সমান (বাম-থেকে-ডান): `(20 / 4) * 2 = 5 * 2 = 10`।",
    hint: "20 / 4 is computed first."
  },
  {
    id: 11,
    question: "Which of the following operators has Right-to-Left associativity in Java?",
    options: [
      "Assignment (`=`), ternary (`? :`), and unary prefix (`++`, `--`, `!`)",
      "Multiplication (`*`) and division (`/`)",
      "Addition (`+`) and subtraction (`-`)",
      "Relational (`<`, `>`) and equality (`==`)"
    ],
    correctAnswer: 0,
    explanation: "In Java, only unary operators, the ternary conditional operator, and assignment operators evaluate from Right to Left.",
    explanationBn: "জাভায় শুধুমাত্র ইউনারি, টার্নারি এবং অ্যাসাইনমেন্ট অপারেটর ডান-থেকে-বামে মূল্যায়িত হয়।",
    hint: "Assignment, ternary, and unary."
  },
  {
    id: 12,
    question: "What is the result of the expression: `\"Sum: \" + 10 + 20`?",
    options: [
      "\"Sum: 1020\"",
      "\"Sum: 30\"",
      "Compilation error",
      "\"30 Sum: \""
    ],
    correctAnswer: 0,
    explanation: "Because `+` associates Left-to-Right: Step 1: `\"Sum: \" + 10` becomes `\"Sum: 10\"`. Step 2: `\"Sum: 10\" + 20` becomes `\"Sum: 1020\"`.",
    explanationBn: "বাম-থেকে-ডান নিয়মে: প্রথমে `\"Sum: \" + 10` $\\to$ `\"Sum: 10\"`, এরপর `\"Sum: 10\" + 20` $\\to$ `\"Sum: 1020\"`।",
    hint: "String concatenation proceeds left to right."
  },
  {
    id: 13,
    question: "What is the result of `10 + 20 + \" Sum\"` in Java?",
    options: [
      "\"30 Sum\"",
      "\"1020 Sum\"",
      "Compilation error",
      "\"Sum 30\""
    ],
    correctAnswer: 0,
    explanation: "Left-to-Right evaluation computes `10 + 20 = 30` (integer addition) first, then concatenates with `\" Sum\"` to produce `\"30 Sum\"`.",
    explanationBn: "বামদিকের দুটি সংখ্যা আগে যোগ হয়ে 30 হয়, তারপর স্ট্রিংয়ের সাথে যুক্ত হয়ে `\"30 Sum\"` তৈরি করে।",
    hint: "Numbers first, then string."
  },
  {
    id: 14,
    question: "What does `true || false && false` evaluate to?",
    options: [
      "true",
      "false",
      "Compile-time error",
      "null"
    ],
    correctAnswer: 0,
    explanation: "Logical AND (`&&`) has higher precedence than Logical OR (`||`). `false && false` is `false`, and `true || false` is `true`.",
    explanationBn: "`&&` এর প্রাধান্য `||` এর চেয়ে বেশি। `false && false` $\\to$ false; `true || false` $\\to$ true।",
    hint: "&& binds tighter than ||."
  },
  {
    id: 15,
    question: "What is the output of the following Java code?\nint a = 2, b = 3;\nint c = a++ + ++b * a;\nSystem.out.println(c);",
    options: [
      "14",
      "11",
      "12",
      "15"
    ],
    correctAnswer: 0,
    explanation: "Left-to-right evaluation: 1) `a++` yields 2 (and `a` becomes 3). 2) `++b` increments `b` from 3 to 4 (yields 4). 3) `a` is now 3. 4) `++b * a = 4 * 3 = 12`. 5) `a++ + 12 = 2 + 12 = 14`.",
    explanationBn: "১) a++ এর মান ২ (a হয় ৩); ২) ++b মান হয় ৪; ৩) a-এর বর্তমান মান ৩; ৪) ৪ * ৩ = ১২; ৫) ২ + ১২ = ১৪।",
    hint: "a++ gives 2, ++b gives 4, current a is 3: 2 + (4 * 3) = 14."
  },
  {
    id: 16,
    question: "Which of the following is true regarding floating-point modulus in Java (e.g. `7.5 % 2.0`)?",
    options: [
      "Java fully supports floating-point modulus, returning `1.5`.",
      "Java throws a compile-time error because % only works on integers.",
      "It returns 0.",
      "It throws an ArithmeticException."
    ],
    correctAnswer: 0,
    explanation: "Unlike C/C++, Java explicitly allows the `%` operator on `float` and `double` operands. `7.5 % 2.0 = 1.5`.",
    explanationBn: "সি-এর বিপরীতে জাভায় ফ্লোটিং-পয়েন্ট সংখ্যার ক্ষেত্রেও `%` অপারেটর বৈধ। `7.5 % 2.0 = 1.5`।",
    hint: "Java allows % on float and double."
  },
  {
    id: 17,
    question: "What is the output of the following snippet?\nint x = 10;\nx += x++ + ++x;\nSystem.out.println(x);",
    options: [
      "32",
      "31",
      "30",
      "33"
    ],
    correctAnswer: 0,
    explanation: "`x += ...` evaluates as `x = 10 + (x++ + ++x)`. In the bracket: `x++` yields 10 (and `x` becomes 11). `++x` increments `x` to 12 and yields 12. Sum in bracket = `10 + 12 = 22`. Total `x = 10 + 22 = 32`.",
    explanationBn: "`x += ...` এর হিসাব: ১০ + (১০ + ১২) = ১০ + ২২ = ৩২।",
    hint: "Initial x is 10. 10 + (10 + 12) = 32."
  },
  {
    id: 18,
    question: "What is the result of `100 / 0` in Java?",
    options: [
      "Throws java.lang.ArithmeticException: / by zero",
      "Infinity",
      "NaN",
      "0"
    ],
    correctAnswer: 0,
    explanation: "Integer division by zero in Java throws a runtime `java.lang.ArithmeticException: / by zero`.",
    explanationBn: "পূর্ণসংখ্যাকে শূন্য দিয়ে ভাগ করলে রানটাইমে `ArithmeticException: / by zero` ঘটে।",
    hint: "Integer zero division crashes."
  },
  {
    id: 19,
    question: "What is the result of `100.0 / 0` in Java?",
    options: [
      "Infinity",
      "Throws java.lang.ArithmeticException",
      "NaN",
      "0.0"
    ],
    correctAnswer: 0,
    explanation: "Under IEEE 754 floating-point standards, dividing a non-zero floating-point number by zero yields `Infinity` without throwing an exception.",
    explanationBn: "ফ্লোটিং-পয়েন্ট সংখ্যাকে শূন্য দিয়ে ভাগ করলে কোনো এরর হয় না, বরং IEEE 754 অনুযায়ী `Infinity` মান দেয়।",
    hint: "Floating point division by zero yields Infinity."
  },
  {
    id: 20,
    question: "What is the result of `0.0 / 0.0` in Java?",
    options: [
      "NaN (Not a Number)",
      "Infinity",
      "0.0",
      "ArithmeticException"
    ],
    correctAnswer: 0,
    explanation: "Under IEEE 754 standards, zero divided by zero in floating-point arithmetic evaluates to `NaN` (Not a Number).",
    explanationBn: "ফ্লোটিং-পয়েন্টে ০.০ কে ০.০ দিয়ে ভাগ করলে `NaN` (Not a Number) ফলাফল দেয়।",
    hint: "0.0 / 0.0 is NaN."
  },
  {
    id: 21,
    question: "What does `!(5 > 3) || (10 <= 10)` evaluate to?",
    options: [
      "true",
      "false",
      "Compile-time error",
      "0"
    ],
    correctAnswer: 0,
    explanation: "`5 > 3` is true, so `!(true)` is `false`. But `10 <= 10` is `true`. `false || true` evaluates to `true`.",
    explanationBn: "`5 > 3` হলো true, তাই `!true` $\\to$ false। কিন্তু `10 <= 10` সত্য (true)। ফলে false || true $\\to$ true।",
    hint: "Right side is true in OR."
  },
  {
    id: 22,
    question: "Which expression correctly checks if integer variable `score` is strictly between 0 and 100?",
    options: [
      "score > 0 && score < 100",
      "0 < score < 100",
      "score > 0 || score < 100",
      "score >< (0, 100)"
    ],
    correctAnswer: 0,
    explanation: "Java does not support chained inequality like `0 < score < 100`. The logical AND operator `score > 0 && score < 100` must be used.",
    explanationBn: "জাভায় `0 < score < 100` লেখা যায় না। সঠিক উপায় হলো `score > 0 && score < 100`।",
    hint: "Combine two conditions with &&."
  },
  {
    id: 23,
    question: "What is the output of the following Java statement?\nSystem.out.println(10 == 10.0);",
    options: [
      "true",
      "false",
      "Compile error: incompatible types",
      "ClassCastException"
    ],
    correctAnswer: 0,
    explanation: "The integer `10` is automatically promoted to double `10.0` before comparison. Since `10.0 == 10.0` is true, it outputs `true`.",
    explanationBn: "তুলনা করার আগে পূর্ণসংখ্যা 10 স্বয়ংক্রিয়ভাবে double 10.0-এ উন্নীত হয়। ফলে `10.0 == 10.0` সত্য (true) হয়।",
    hint: "Implicit promotion to double."
  },
  {
    id: 24,
    question: "What is the result of `int a = 10; a %= 3;`?",
    options: [
      "1",
      "0",
      "3",
      "10"
    ],
    correctAnswer: 0,
    explanation: "`a %= 3` is `a = a % 3`. `10 % 3 = 1`. Thus `a` becomes 1.",
    explanationBn: "`a %= 3` মানে হলো `a = a % 3`। ১০ কে ৩ দিয়ে ভাগ করলে ভাগশেষ ১ থাকে।",
    hint: "10 % 3 is 1."
  },
  {
    id: 25,
    question: "In the expression `a + b * c == d && e`, what is the exact order of operator execution?",
    options: [
      "Multiplication `*`, then Addition `+`, then Equality `==`, then Logical AND `&&`",
      "Addition `+`, then Multiplication `*`, then Equality `==`, then Logical AND `&&`",
      "Logical AND `&&`, then Equality `==`, then Addition `+`, then Multiplication `*`",
      "Strictly Left-to-Right without precedence"
    ],
    correctAnswer: 0,
    explanation: "Operator Precedence order: Multiplicative `*` (Rank 3) -> Additive `+` (Rank 4) -> Equality `==` (Rank 7) -> Logical AND `&&` (Rank 11).",
    explanationBn: "সঠিক অগ্রাধিকার ক্রম: গুণ `*` -> যোগ `+` -> সমতা `==` -> লজিক্যাল AND `&&`।",
    hint: "Arithmetic (*, +), then comparison (==), then logical (&&)."
  }
];

export default topic8_questions;
