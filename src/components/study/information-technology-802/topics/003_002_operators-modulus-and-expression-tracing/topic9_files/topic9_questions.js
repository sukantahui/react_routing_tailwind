const topic9_questions = [
  {
    id: 1,
    question: "What is the output of `System.out.println(15 / 4);` in Java?",
    options: [
      "3",
      "3.75",
      "4",
      "3.0"
    ],
    correctAnswer: 0,
    explanation: "Both 15 and 4 are integer literals, so integer division is performed. The fractional portion is discarded, yielding 3.",
    explanationBn: "উভয় অপারেন্ড পূর্ণসংখ্যা হওয়ায় দশমিক অংশ বাদ গিয়ে ভাগফল ৩ হয়।",
    hint: "Integer division truncates decimals."
  },
  {
    id: 2,
    question: "What is the output of `System.out.println(15.0 / 4);` in Java?",
    options: [
      "3.75",
      "3",
      "4.0",
      "3.0"
    ],
    correctAnswer: 0,
    explanation: "15.0 is a double literal. The integer 4 is promoted to double 4.0, performing floating-point division which outputs 3.75.",
    explanationBn: "১৫.০ একটি double মান হওয়ায় ফ্লোটিং-পয়েন্ট ভাগ সম্পন্ন হয় এবং ফলাফল ৩.৭৫ হয়।",
    hint: "At least one operand is double."
  },
  {
    id: 3,
    question: "What is the evaluated result of `(double)(15 / 4)` in Java?",
    options: [
      "3.0",
      "3.75",
      "3",
      "4.0"
    ],
    correctAnswer: 0,
    explanation: "Parentheses enforce `15 / 4` first, producing integer 3. Then `(double)3` casts 3 to `3.0`.",
    explanationBn: "বন্ধনী থাকায় প্রথমে ১৫ / ৪ = ৩ হয়, তারপর double-এ কাস্ট হয়ে ৩.০ হয়।",
    hint: "Integer division happens before the cast."
  },
  {
    id: 4,
    question: "What is the evaluated output of `10 % 80` in Java?",
    options: [
      "10",
      "0",
      "80",
      "8"
    ],
    correctAnswer: 0,
    explanation: "When dividend `a` is smaller than divisor `b` (`10 < 80`), the quotient is 0 and the remainder is the dividend itself: 10.",
    explanationBn: "ভাজ্য ছোট হলে (১০ < ৮০) ভাগশেষ ভাজ্যের সমান অর্থাৎ ১০ থাকে।",
    hint: "Dividend is smaller than divisor."
  },
  {
    id: 5,
    question: "What is the output of `-25 % 4` in Java?",
    options: [
      "-1",
      "1",
      "-6",
      "6"
    ],
    correctAnswer: 0,
    explanation: "In Java, the sign of the modulus remainder strictly follows the sign of the dividend. `-25` is negative, so the remainder is `-1`.",
    explanationBn: "ভাগশেষের চিহ্ন সবসময় ভাজ্যের চিহ্নের সমান হয়। -25 ঋণাত্মক হওয়ায় ভাগশেষ -1।",
    hint: "Sign matches the dividend (-25)."
  },
  {
    id: 6,
    question: "What is the output of `25 % -4` in Java?",
    options: [
      "1",
      "-1",
      "6",
      "-6"
    ],
    correctAnswer: 0,
    explanation: "The sign of the divisor has no effect on the remainder. Since the dividend `25` is positive, the remainder is `+1`.",
    explanationBn: "ভাজকের ঋণাত্মক চিহ্ন ভাগশেষের চিহ্নে কোনো প্রভাব ফেলে না। ভাজ্য ২৫ ধনাত্মক হওয়ায় ভাগশেষ +1।",
    hint: "Divisor sign is ignored."
  },
  {
    id: 7,
    question: "What is the result of `7.5 % 2.5` in Java?",
    options: [
      "0.0",
      "3.0",
      "2.5",
      "Compile-time error: % only allowed on integers"
    ],
    correctAnswer: 0,
    explanation: "Java permits the modulus operator `%` on floating-point operands. `7.5 / 2.5 = 3.0` with a remainder of `0.0`.",
    explanationBn: "জাভায় ফ্লোটিং-পয়েন্ট মানের ক্ষেত্রেও `%` বৈধ। ৭.৫ কে ২.৫ দিয়ে ভাগ করলে ভাগশেষ ০.০ থাকে।",
    hint: "7.5 divides evenly by 2.5."
  },
  {
    id: 8,
    question: "Given `int x = 10; int y = ++x;`. What are the values of `x` and `y`?",
    options: [
      "x = 11, y = 11",
      "x = 11, y = 10",
      "x = 10, y = 11",
      "x = 10, y = 10"
    ],
    correctAnswer: 0,
    explanation: "Prefix `++x` increments `x` to 11 first, and then assigns 11 to `y`.",
    explanationBn: "প্রিফিক্স `++x` প্রথমে মান বাড়িয়ে ১১ করে, এবং পরে সেই ১১ মানটি y-এ জমা দেয়।",
    hint: "Prefix increments before assignment."
  },
  {
    id: 9,
    question: "Given `int x = 10; int y = x++;`. What are the values of `x` and `y`?",
    options: [
      "x = 11, y = 10",
      "x = 11, y = 11",
      "x = 10, y = 11",
      "x = 10, y = 10"
    ],
    correctAnswer: 0,
    explanation: "Postfix `x++` assigns the current value 10 to `y` first, and then increments `x` to 11.",
    explanationBn: "পোস্টফিক্স `x++` বর্তমান মান ১০ আগে y-কে দেয়, এরপর x-এর মান বেড়ে ১১ হয়।",
    hint: "Postfix uses original value before incrementing."
  },
  {
    id: 10,
    question: "What is the final value of `p` after executing: `int p = 7; p = p++;`?",
    options: [
      "7",
      "8",
      "9",
      "0"
    ],
    correctAnswer: 0,
    explanation: "In `p = p++`, the original value 7 is cached, `p` increments to 8 in memory, but assignment `=` restores the cached value 7 back into `p`.",
    explanationBn: "পোস্টফিক্স সেলফ-অ্যাসাইনমেন্টে পুরনো মান ৭ জমা থাকে এবং পরে p-তে প্রতিস্থাপিত হওয়ায় p-এর মান ৭-ই থাকে।",
    hint: "The post-increment assignment quirk."
  },
  {
    id: 11,
    question: "Trace the expression `x = ((++x) * 2) + 7` where initial `x = 5`. What is final `x`?",
    options: [
      "19",
      "17",
      "21",
      "14"
    ],
    correctAnswer: 0,
    explanation: "1) `++x` turns 5 into 6. 2) `6 * 2 = 12`. 3) `12 + 7 = 19`. Thus `x = 19`.",
    explanationBn: "১) ++x মান বাড়িয়ে ৬ করে; ২) ৬ * ২ = ১২; ৩) ১২ + ৭ = ১৯।",
    hint: "6 * 2 + 7 = 19."
  },
  {
    id: 12,
    question: "What is the output of the following Java snippet?\nint a = 3, b = 4;\nint c = ++a * b-- + a;\nSystem.out.println(c);",
    options: [
      "20",
      "19",
      "16",
      "24"
    ],
    correctAnswer: 0,
    explanation: "1) `++a` increments `a` from 3 to 4 (yields 4). 2) `b--` yields 4 (and decrements `b` to 3). 3) `++a * b-- = 4 * 4 = 16`. 4) Current `a` is 4. 5) `16 + 4 = 20`.",
    explanationBn: "১) ++a এর মান ৪; ২) b-- দেয় ৪; ৩) ৪ * ৪ = ১৬; ৪) a-এর বর্তমান মান ৪; ৫) ১৬ + ৪ = ২০।",
    hint: "4 * 4 + 4 = 20."
  },
  {
    id: 13,
    question: "Why does `byte b = 20; b += 10;` compile, but `b = b + 10;` causes a compilation error?",
    options: [
      "Compound assignment automatically injects an implicit narrowing cast: `b = (byte)(b + 10);`",
      "Because += is an older operator that skips type checking.",
      "Because 10 is treated as a byte only in compound expressions.",
      "Because b + 10 exceeds the maximum value of byte."
    ],
    correctAnswer: 0,
    explanation: "Normal binary addition `b + 10` promotes `b` to `int`, producing an `int` result that cannot be assigned to `byte` without a cast. Compound assignment `b += 10` automatically includes `(byte)` cast.",
    explanationBn: "কম্পাউন্ড অ্যাসাইনমেন্ট `b += 10` স্বয়ংক্রিয়ভাবে `(byte)(b + 10)` কাস্ট করে, ফলে lossy conversion এরর ঘটে না।",
    hint: "Implicit narrowing cast in compound operators."
  },
  {
    id: 14,
    question: "Given `int a = 6, b = 2; a *= b + 3;`. What is the final value of `a`?",
    options: [
      "30",
      "15",
      "18",
      "24"
    ],
    correctAnswer: 0,
    explanation: "`a *= b + 3` is parsed as `a = a * (b + 3) = 6 * (2 + 3) = 6 * 5 = 30`.",
    explanationBn: "কম্পাউন্ড অপারেটরে সম্পূর্ণ ডানপাশ বন্ধনীতে থাকে: `a = ৬ * (২ + ৩) = ৬ * ৫ = ৩০`।",
    hint: "a = 6 * (2 + 3) = 30."
  },
  {
    id: 15,
    question: "What is the result of `int k = 10; k %= 3 + 1;`?",
    options: [
      "2",
      "1",
      "0",
      "3"
    ],
    correctAnswer: 0,
    explanation: "`k %= (3 + 1)` -> `k = 10 % 4 = 2` (NOT `10 % 3 + 1 = 2` by coincidence, always parenthesize right side).",
    explanationBn: "ডানপাশ বন্ধনীভুক্ত হয়: `k = 10 % (3 + 1) = 10 % 4 = 2`।",
    hint: "10 % 4 = 2."
  },
  {
    id: 16,
    question: "What is short-circuit evaluation in Java boolean expressions?",
    options: [
      "Skipping evaluation of subsequent operands when the overall truth value is already determined.",
      "Halting the JVM due to memory overflow.",
      "Automatically converting boolean values to 0 or 1.",
      "Evaluating operators strictly from right to left."
    ],
    correctAnswer: 0,
    explanation: "In short-circuit evaluation (`&&` and `||`), if the first operand suffices to determine the result (false for `&&`, true for `||`), Java bypasses evaluating the second operand.",
    explanationBn: "প্রথম শর্ত দেখেই চূড়ান্ত সিদ্ধান্ত নেওয়া সম্ভব হলে (AND-এ false, OR-এ true) পরবর্তী শর্ত যাচাই না করাই হলো শর্ট-সার্কিট।",
    hint: "Stops early when result is guaranteed."
  },
  {
    id: 17,
    question: "What is the output of the following Java snippet?\nint n = 5;\nboolean check = (n < 2) && (++n > 2);\nSystem.out.println(n);",
    options: [
      "5",
      "6",
      "2",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "`5 < 2` is `false`. Because `&&` short-circuits on `false`, `++n` is NEVER executed. Thus `n` remains 5.",
    explanationBn: "`5 < 2` মিথ্যা (false) হওয়ায় শর্ট-সার্কিটের কারণে `++n` কার্যকর হয় না। n-এর মান ৫ থাকে।",
    hint: "The right side is skipped."
  },
  {
    id: 18,
    question: "What will happen if we execute: `int x = 0; if (x != 0 && 50 / x > 2)`?",
    options: [
      "Condition evaluates safely to false without throwing any exception.",
      "Throws java.lang.ArithmeticException: / by zero",
      "Condition evaluates to true.",
      "Compile-time error: invalid division."
    ],
    correctAnswer: 0,
    explanation: "Because `x != 0` is false, `&&` short-circuits and skips `50 / x`. Zero division never happens!",
    explanationBn: "`x != 0` মিথ্যা হওয়ায় `&&` ডানপাশের ৫০ / x পরীক্ষা করা বন্ধ করে দেয়, ফলে কোনো ভাগজনিত এরর হয় না।",
    hint: "Short-circuit protects from zero division."
  },
  {
    id: 19,
    question: "What will happen if we execute: `int x = 0; if (x != 0 & 50 / x > 2)`?",
    options: [
      "Throws java.lang.ArithmeticException: / by zero at runtime.",
      "Condition evaluates safely to false.",
      "Executes the if block.",
      "Compile-time error."
    ],
    correctAnswer: 0,
    explanation: "The single `&` is a non-short-circuit operator. It evaluates both sides, computing `50 / 0` and crashing with `java.lang.ArithmeticException`.",
    explanationBn: "একক `&` শর্ট-সার্কিট নয়। এটি ডানদিকের ৫০ / ০ হিসাব করতে গিয়ে রানটাইমে ক্র্যাশ করে।",
    hint: "Single & evaluates both sides."
  },
  {
    id: 20,
    question: "What is the output of `System.out.println(\"Score: \" + 50 + 50);`?",
    options: [
      "\"Score: 5050\"",
      "\"Score: 100\"",
      "Compilation error",
      "\"100 Score: \""
    ],
    correctAnswer: 0,
    explanation: "Left-to-right evaluation: `\"Score: \" + 50` creates `\"Score: 50\"`. Then `\"Score: 50\" + 50` creates `\"Score: 5050\"`.",
    explanationBn: "বাম-থেকে-ডান নিয়মে স্ট্রিং কনক্যাটেনেশন হয়ে ফলাফল হয় \"Score: 5050\"।",
    hint: "String concatenation flows left to right."
  },
  {
    id: 21,
    question: "What is the output of `System.out.println(50 + 50 + \" Score\");`?",
    options: [
      "\"100 Score\"",
      "\"5050 Score\"",
      "Compilation error",
      "\"Score 100\""
    ],
    correctAnswer: 0,
    explanation: "Left-to-right evaluation performs integer addition `50 + 50 = 100` first, then concatenates with `\" Score\"` to give `\"100 Score\"`.",
    explanationBn: "প্রথমে দুটি সংখ্যা যোগ হয়ে 100 হয়, পরে স্ট্রিং যুক্ত হয়ে \"100 Score\" তৈরি করে।",
    hint: "Integer addition occurs before string concatenation."
  },
  {
    id: 22,
    question: "What is the evaluated output of `20 / 4 * 2` in Java?",
    options: [
      "10",
      "2",
      "20",
      "40"
    ],
    correctAnswer: 0,
    explanation: "Multiplication and division have equal precedence. Left-to-right associativity computes `(20 / 4) * 2 = 5 * 2 = 10`.",
    explanationBn: "ভাগ ও গুণের প্রাধান্য সমান। বাম-থেকে-ডান নিয়মে (২০ / ৪) * ২ = ৫ * ২ = ১০ হয়।",
    hint: "20 / 4 is evaluated first."
  },
  {
    id: 23,
    question: "What does `true || false && false` evaluate to in Java?",
    options: [
      "true",
      "false",
      "Compile-time error",
      "null"
    ],
    correctAnswer: 0,
    explanation: "Logical AND (`&&`) has higher precedence than Logical OR (`||`). `false && false` is `false`, and `true || false` evaluates to `true`.",
    explanationBn: "`&&` এর প্রাধান্য `||` এর চেয়ে বেশি হওয়ায় `false && false` $\\to$ false; শেষে `true || false` $\\to$ true।",
    hint: "&& binds tighter than ||."
  },
  {
    id: 24,
    question: "Which of the following categories of operators evaluates from Right-to-Left in Java?",
    options: [
      "Unary operators (`++`, `--`, `!`), ternary conditional (`? :`), and assignment operators (`=`, `+=`)",
      "Multiplication, division, and modulus",
      "Addition and subtraction",
      "Relational and equality operators"
    ],
    correctAnswer: 0,
    explanation: "In Java, only Unary, Ternary, and Assignment operators possess Right-to-Left associativity.",
    explanationBn: "জাভায় শুধুমাত্র ইউনারি, টার্নারি এবং অ্যাসাইনমেন্ট অপারেটরের মূল্যায়ন দিক ডান-থেকে-বামে (Right-to-Left)।",
    hint: "Unary, Ternary, and Assignment."
  },
  {
    id: 25,
    question: "Given `int a, b, c; a = b = c = 12 / 4;`. What values do `a`, `b`, and `c` hold?",
    options: [
      "a = 3, b = 3, c = 3",
      "a = 12, b = 4, c = 3",
      "a = 3, b = 0, c = 0",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "`12 / 4` evaluates to 3. Then Right-to-Left assignment sets `c = 3`, `b = 3`, and `a = 3`.",
    explanationBn: "১২ / ৪ = ৩ মূল্যায়নের পর ডান-থেকে-বামে c=3, b=3 এবং a=3 অ্যাসাইন হয়।",
    hint: "All three variables receive 3."
  },
  {
    id: 26,
    question: "What does `!(10 >= 10) == (5 < 4)` evaluate to?",
    options: [
      "true",
      "false",
      "Compile error",
      "1"
    ],
    correctAnswer: 0,
    explanation: "`10 >= 10` is true, so `!(true)` is `false`. `5 < 4` is `false`. `false == false` evaluates to `true`.",
    explanationBn: "`!(10 >= 10)` হলো false; `5 < 4` হলো false; false == false এর মান true।",
    hint: "Both sides evaluate to false, and false == false is true."
  },
  {
    id: 27,
    question: "What is the output of the following Java code?\nint x = 2;\nint y = x++ + x++ + ++x;\nSystem.out.println(y);",
    options: [
      "10",
      "9",
      "11",
      "8"
    ],
    correctAnswer: 0,
    explanation: "1) First `x++` yields 2 (x becomes 3). 2) Second `x++` yields 3 (x becomes 4). 3) `++x` increments x from 4 to 5 and yields 5. Total `y = 2 + 3 + 5 = 10`.",
    explanationBn: "১) প্রথম x++ দেয় ২ (x হয় ৩); ২) দ্বিতীয় x++ দেয় ৩ (x হয় ৪); ৩) ++x মান বাড়িয়ে ৫ করে ৫ দেয়। যোগফল = ২ + ৩ + ৫ = ১০।",
    hint: "2 + 3 + 5 = 10."
  },
  {
    id: 28,
    question: "What is the output of `System.out.println(10.0 / 0);` in Java?",
    options: [
      "Infinity",
      "Throws ArithmeticException",
      "NaN",
      "0.0"
    ],
    correctAnswer: 0,
    explanation: "Floating-point division by zero in Java adheres to IEEE 754 standards and produces `Infinity` without an exception.",
    explanationBn: "জাভায় ফ্লোটিং-পয়েন্ট সংখ্যাকে শূন্য দিয়ে ভাগ করলে এক্সেপশন না হয়ে `Infinity` রিটার্ন করে।",
    hint: "Floating zero division produces Infinity."
  },
  {
    id: 29,
    question: "What is the output of `System.out.println(0.0 / 0.0);` in Java?",
    options: [
      "NaN",
      "Infinity",
      "0.0",
      "ArithmeticException"
    ],
    correctAnswer: 0,
    explanation: "In IEEE 754 floating-point standard, zero divided by zero yields `NaN` (Not a Number).",
    explanationBn: "০.০ কে ০.০ দিয়ে ভাগ করলে IEEE 754 অনুযায়ী `NaN` (Not a Number) হয়।",
    hint: "Undefined floating point division yields NaN."
  },
  {
    id: 30,
    question: "Which of the following correctly describes operator precedence between `+` (addition) and `==` (equality)?",
    options: [
      "Additive `+` has higher precedence than equality `==`",
      "Equality `==` has higher precedence than additive `+`",
      "Both have equal precedence",
      "Precedence depends on whether numbers or strings are used"
    ],
    correctAnswer: 0,
    explanation: "In Java, arithmetic additive operators (`+`, `-`) have Rank 4, whereas equality operators (`==`, `!=`) have Rank 7. Thus `5 + 2 == 7` calculates `5 + 2` before comparing.",
    explanationBn: "যোগের প্রাধান্য সমতা (`==`) এর চেয়ে বেশি। তাই `5 + 2 == 7` এ আগে যোগ ৫+২=৭ হয়, তারপর ৭==৭ পরীক্ষা হয়।",
    hint: "Arithmetic operations execute before comparison."
  }
];

export default topic9_questions;
