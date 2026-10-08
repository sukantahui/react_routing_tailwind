const topic4_questions = [
  {
    id: 1,
    question: "What is the final value of `x` after executing the following Java statement when initial `x = 5`?\n```java\nx = ((++x) * 2) + 7;\n```",
    options: [
      "17",
      "19",
      "21",
      "24"
    ],
    correctAnswer: 1,
    explanation: "Step 1: Innermost `(++x)` increments x from 5 to 6 and yields 6. Step 2: `6 * 2 = 12`. Step 3: `12 + 7 = 19`. Step 4: 19 is assigned to x. Final result: 19.",
    explanationBn: "ধাপ ১: বন্ধনীতে `(++x)` x-কে ৫ থেকে ৬ করে এবং ৬ মান দেয়। ধাপ ২: ৬ * ২ = ১২। ধাপ ৩: ১২ + ৭ = ১৯। ধাপ ৪: ১৯ মানটি x-এ জমা হয়। চূড়ান্ত মান: ১৯।",
    hint: "x becomes 6 in (++x), 6*2=12, 12+7=19."
  },
  {
    id: 2,
    question: "What is the final value of `x` if the expression is `x = ((x++) * 2) + 7;` with initial `x = 5`?",
    options: [
      "17",
      "19",
      "10",
      "24"
    ],
    correctAnswer: 0,
    explanation: "Step 1: `(x++)` uses the original value 5 first (then increments x to 6 in memory). Step 2: `5 * 2 = 10`. Step 3: `10 + 7 = 17`. Step 4: The assignment `=` overwrites x with 17. Final result: 17.",
    explanationBn: "ধাপ ১: `(x++)` পোস্টফিক্স হওয়ায় ৫ মানটি ব্যবহৃত হয় (পরে মেমরিতে x=৬ হয়)। ধাপ ২: ৫ * ২ = ১০। ধাপ ৩: ১০ + ৭ = ১৭। ধাপ ৪: ১৭ মানটি x-এ অ্যাসাইন হয়। চূড়ান্ত মান: ১৭।",
    hint: "x++ uses 5, 5*2=10, 10+7=17."
  },
  {
    id: 3,
    question: "What will be the output of the following Java code?\n```java\nint a = 3;\na += ++a * 4;\nSystem.out.println(a);\n```",
    options: [
      "15",
      "16",
      "19",
      "20"
    ],
    correctAnswer: 2,
    explanation: "`a += ...` evaluates the left operand `a` (which is 3) first. Then `++a * 4`: `++a` increments a from 3 to 4, yielding 4. `4 * 4 = 16`. Finally, `3 + 16 = 19`. Thus `a = 19`.",
    explanationBn: "বামপাশের 'a'-এর প্রাথমিক মান ৩ সংরক্ষিত হয়। ডানপাশে `++a` a-কে ৪ করে, এবং ৪ * ৪ = ১৬। অবশেষে ৩ + ১৬ = ১৯ হয়ে a-তে অ্যাসাইন হয়।",
    hint: "Initial a (3) + (++a * 4 which is 4 * 4 = 16) = 19."
  },
  {
    id: 4,
    question: "What is the value of `result` in:\n```java\nint x = 2, y = 3;\nint result = x++ * ++y + --x * y--;\n```",
    options: [
      "14",
      "16",
      "18",
      "12"
    ],
    correctAnswer: 1,
    explanation: "Trace: 1) `x++`: yields 2 (x becomes 3). 2) `++y`: y becomes 4, yields 4. Term 1 = `2 * 4 = 8`. 3) `--x`: x decrements from 3 to 2, yields 2. 4) `y--`: yields 4 (then y becomes 3). Term 2 = `2 * 4 = 8`. 5) Sum = `8 + 8 = 16`.",
    explanationBn: "ট্রেসিং: প্রথম অংশ ২ * ৪ = ৮ (x=৩, y=৪)। দ্বিতীয় অংশ `--x` x-কে ২ করে এবং `y--` ৪ দেয়, ফলে ২ * ৪ = ৮। মোট যোগফল ৮ + ৮ = ১৬।",
    hint: "Term 1 is 2 * 4 = 8; Term 2 is 2 * 4 = 8; Total = 16."
  },
  {
    id: 5,
    question: "What will be printed by the following statement?\n```java\nint a = 10;\nSystem.out.println(a++ + a++ + a++);\n```",
    options: [
      "30",
      "33",
      "36",
      "31"
    ],
    correctAnswer: 1,
    explanation: "1st term `a++` yields 10 (a becomes 11). 2nd term `a++` yields 11 (a becomes 12). 3rd term `a++` yields 12 (a becomes 13). Sum = `10 + 11 + 12 = 33`.",
    explanationBn: "১ম টার্ম ১০ দেয় (a=১১), ২য় টার্ম ১১ দেয় (a=১২), ৩য় টার্ম ১২ দেয় (a=১৩)। যোগফল = ১০ + ১১ + ১২ = ৩৩।",
    hint: "10 + 11 + 12 = 33."
  },
  {
    id: 6,
    question: "What will be printed by the following statement?\n```java\nint a = 10;\nSystem.out.println(++a + ++a + ++a);\n```",
    options: [
      "33",
      "36",
      "39",
      "30"
    ],
    correctAnswer: 1,
    explanation: "1st term `++a` yields 11 (a is 11). 2nd term `++a` yields 12 (a is 12). 3rd term `++a` yields 13 (a is 13). Sum = `11 + 12 + 13 = 36`.",
    explanationBn: "১ম টার্ম ১১ দেয় (a=১১), ২য় টার্ম ১২ দেয় (a=১২), ৩য় টার্ম ১৩ দেয় (a=১৩)। যোগফল = ১১ + ১২ + ১৩ = ৩৬।",
    hint: "11 + 12 + 13 = 36."
  },
  {
    id: 7,
    question: "What is the value of `z` after evaluating: `int x = 4; int z = 2 * ++x + x++ * 3;`?",
    options: [
      "22",
      "25",
      "27",
      "28"
    ],
    correctAnswer: 1,
    explanation: "1) `++x` pre-increments 4 to 5, yields 5 (x is 5). Term 1: `2 * 5 = 10`. 2) `x++` yields 5 (then x increments to 6). Term 2: `5 * 3 = 15`. 3) Sum: `10 + 15 = 25`.",
    explanationBn: "১) `++x` ৫ করে এবং ২ * ৫ = ১০ দেয়। ২) `x++` ৫ দেয় এবং ৫ * ৩ = ১৫ হয় (পরে x=৬ হয়)। যোগফল ১০ + ১৫ = ২৫।",
    hint: "2 * 5 = 10; 5 * 3 = 15; 10 + 15 = 25."
  },
  {
    id: 8,
    question: "What is the outcome of: `int a = 5; int b = a++ + a * 2;`?",
    options: [
      "15",
      "16",
      "17",
      "18"
    ],
    correctAnswer: 2,
    explanation: "1) `a++` yields 5, and increments a to 6 in memory. 2) Next, `a * 2` reads the current value of a (which is now 6): `6 * 2 = 12`. 3) Sum = `5 + 12 = 17`.",
    explanationBn: "১) `a++` ৫ দেয় এবং মেমরিতে a=৬ হয়। ২) এরপর `a * 2` হিসাবের সময় a-এর মান ৬ থাকায় ৬ * ২ = ১২ হয়। ৩) যোগফল = ৫ + ১২ = ১৭।",
    hint: "5 + (6 * 2) = 17."
  },
  {
    id: 9,
    question: "What is the value of `res` in `int p = 6; int res = ((--p) + 4) * 2;`?",
    options: [
      "18",
      "20",
      "16",
      "14"
    ],
    correctAnswer: 0,
    explanation: "`--p` decrements 6 to 5, yields 5. `5 + 4 = 9`. `9 * 2 = 18`.",
    explanationBn: "`--p` ৬ থেকে ৫ করে। ৫ + ৪ = ৯, এবং ৯ * ২ = ১৮।",
    hint: "(5 + 4) * 2 = 18."
  },
  {
    id: 10,
    question: "What is the output of the following Java snippet?\n```java\nint x = 1;\nx = x++ + ++x;\nSystem.out.println(x);\n```",
    options: [
      "3",
      "4",
      "5",
      "2"
    ],
    correctAnswer: 1,
    explanation: "1) `x++` yields 1 (x becomes 2 in memory). 2) `++x` pre-increments 2 to 3, yields 3. 3) Sum = `1 + 3 = 4`. 4) Assigns 4 to x. Result: 4.",
    explanationBn: "১) `x++` দেয় ১ (x=২); ২) `++x` দেয় ৩ (x=৩); ৩) যোগফল = ১ + ৩ = ৪, যা x-এ অ্যাসাইন হয়।",
    hint: "1 + 3 = 4."
  },
  {
    id: 11,
    question: "What is the value of `b` in `int a = 2; int b = a++ + a++ * a++;`?",
    options: [
      "14",
      "20",
      "18",
      "12"
    ],
    correctAnswer: 0,
    explanation: "Operands evaluate strictly left-to-right: 1) First `a++` yields 2 (a becomes 3). 2) Multiplication `*` binds second `a++` and third `a++`: second `a++` yields 3 (a becomes 4); third `a++` yields 4 (a becomes 5). 3) Multiplication: `3 * 4 = 12`. 4) Addition: `2 + 12 = 14`. Final: `b = 14` (and `a = 5`).",
    explanationBn: "বাম থেকে ডানে: ১ম `a++` দেয় ২ (a=৩); ২য় `a++` দেয় ৩ (a=৪); ৩য় `a++` দেয় ৪ (a=৫)। গুণের প্রাধান্য থাকায় ৩ * ৪ = ১২। যোগফল = ২ + ১২ = ১৪।",
    hint: "2 + (3 * 4) = 14."
  },
  {
    id: 12,
    question: "What is the output of `System.out.println(10 + 20 / 5 * 2);`?",
    options: [
      "12",
      "18",
      "14",
      "2"
    ],
    correctAnswer: 1,
    explanation: "`/` and `*` have higher precedence than `+` and associate left to right: `20 / 5 = 4`, then `4 * 2 = 8`. Finally `10 + 8 = 18`.",
    explanationBn: "ভাগ ও গুণ আগে সম্পন্ন হয়: ২০ / ৫ = ৪, এবং ৪ * ২ = ৮। এরপর ১০ + ৮ = ১৮।",
    hint: "10 + ((20 / 5) * 2) = 10 + 8 = 18."
  },
  {
    id: 13,
    question: "What is the output of `System.out.println((10 + 20) / (5 * 2));`?",
    options: [
      "18",
      "3",
      "12",
      "30"
    ],
    correctAnswer: 1,
    explanation: "Parentheses evaluate first: `(10 + 20) = 30` and `(5 * 2) = 10`. Then `30 / 10 = 3`.",
    explanationBn: "বন্ধনী আগে মূল্যায়িত হয়: ৩০ / ১০ = ৩।",
    hint: "30 / 10 = 3."
  },
  {
    id: 14,
    question: "What will the following code print?\n```java\nint x = 5;\nint y = 2;\nint z = x / y * y + x % y;\nSystem.out.println(z);\n```",
    options: [
      "5",
      "4",
      "6",
      "2"
    ],
    correctAnswer: 0,
    explanation: "By mathematical identity, `(x / y) * y + (x % y) == x`! Tracing: `5 / 2 = 2`. `2 * 2 = 4`. `5 % 2 = 1`. `4 + 1 = 5`.",
    explanationBn: "গাণিতিক নিয়ম অনুযায়ী (x/y)*y + x%y সর্বদা x-এর সমান হয়। এখানে (৫/২)*২ = ৪ এবং ৫%২ = ১, সুতরাং ৪ + ১ = ৫।",
    hint: "Division quotient * divisor + remainder = dividend."
  },
  {
    id: 15,
    question: "What will be the output of `System.out.println(2 + 3 * 4 - 6 / 2);`?",
    options: [
      "7",
      "11",
      "17",
      "12"
    ],
    correctAnswer: 1,
    explanation: "High precedence first: `3 * 4 = 12` and `6 / 2 = 3`. Expression becomes `2 + 12 - 3`. Then left to right: `2 + 12 = 14`, `14 - 3 = 11`.",
    explanationBn: "প্রথমে গুণ ও ভাগ: ৩ * ৪ = ১২ এবং ৬ / ২ = ৩। এক্সপ্রেশনটি হয় ২ + ১২ - ৩ = ১১।",
    hint: "2 + 12 - 3 = 11."
  },
  {
    id: 16,
    question: "What is the value of `val` in `int a = 8; int val = a-- - --a;`?",
    options: [
      "2",
      "1",
      "0",
      "3"
    ],
    correctAnswer: 0,
    explanation: "1) `a--` yields 8 (a becomes 7). 2) `--a` decrements a from 7 to 6, yields 6. 3) `8 - 6 = 2`. Final: `val = 2` (and `a = 6`).",
    explanationBn: "১) `a--` দেয় ৮ (a=৭); ২) `--a` দেয় ৬ (a=৬)। ফলে ৮ - ৬ = ২।",
    hint: "8 - 6 = 2."
  },
  {
    id: 17,
    question: "What will be the value of `c` in `int a = 1, b = 2; int c = a + b * a + b;`?",
    options: [
      "5",
      "7",
      "8",
      "4"
    ],
    correctAnswer: 0,
    explanation: "`b * a` evaluates first: `2 * 1 = 2`. Then `1 + 2 + 2 = 5`.",
    explanationBn: "গুণের অগ্রাধিকার আগে: ২ * ১ = ২। এরপর ১ + ২ + ২ = ৫।",
    hint: "1 + (2 * 1) + 2 = 5."
  },
  {
    id: 18,
    question: "What is the value of `ans` in `int x = 3; int ans = ++x * ++x * ++x;`?",
    options: [
      "120",
      "216",
      "64",
      "100"
    ],
    correctAnswer: 0,
    explanation: "1) 1st `++x` yields 4 (x=4). 2) 2nd `++x` yields 5 (x=5). 3) 3rd `++x` yields 6 (x=6). Product: `4 * 5 * 6 = 120`.",
    explanationBn: "১মটি ৪, ২য়টি ৫ এবং ৩য়টি ৬ দেয়। ৪ * ৫ * ৬ = ১২০।",
    hint: "4 * 5 * 6 = 120."
  },
  {
    id: 19,
    question: "What is the value of `ans` in `int x = 3; int ans = x++ * x++ * x++;`?",
    options: [
      "60",
      "120",
      "27",
      "64"
    ],
    correctAnswer: 0,
    explanation: "1) 1st `x++` yields 3 (x=4). 2) 2nd `x++` yields 4 (x=5). 3) 3rd `x++` yields 5 (x=6). Product: `3 * 4 * 5 = 60`.",
    explanationBn: "১মটি ৩, ২য়টি ৪ এবং ৩য়টি ৫ দেয়। ৩ * ৪ * ৫ = ৬০।",
    hint: "3 * 4 * 5 = 60."
  },
  {
    id: 20,
    question: "What will be the value of `x` after `int x = 10; x -= 2 * 3;`?",
    options: [
      "4",
      "24",
      "8",
      "16"
    ],
    correctAnswer: 0,
    explanation: "`2 * 3 = 6`. `x -= 6` evaluates to `x = 10 - 6 = 4`.",
    explanationBn: "২ * ৩ = ৬। x = ১০ - ৬ = ৪।",
    hint: "10 - (2 * 3) = 4."
  },
  {
    id: 21,
    question: "What will be printed by: `System.out.println(100 / 10 / 2);`?",
    options: [
      "5",
      "20",
      "50",
      "2"
    ],
    correctAnswer: 0,
    explanation: "Left-to-right associativity: `100 / 10 = 10`, then `10 / 2 = 5`.",
    explanationBn: "বাম থেকে ডানে ভাগ: ১০০ / ১০ = ১০, এবং ১০ / ২ = ৫।",
    hint: "(100 / 10) / 2 = 5."
  },
  {
    id: 22,
    question: "What is the output of `System.out.println(100 / (10 / 2));`?",
    options: [
      "5",
      "20",
      "50",
      "2"
    ],
    correctAnswer: 1,
    explanation: "Parentheses first: `10 / 2 = 5`. Then `100 / 5 = 20`.",
    explanationBn: "বন্ধনী আগে: ১০ / ২ = ৫। এরপর ১০০ / ৫ = ২০।",
    hint: "100 / 5 = 20."
  },
  {
    id: 23,
    question: "What is the result of `int a = 5; int b = (a > 3) ? a++ * 2 : ++a * 2;`?",
    options: [
      "10",
      "12",
      "14",
      "15"
    ],
    correctAnswer: 0,
    explanation: "The condition `a > 3` (5 > 3) is true, so only the true branch `a++ * 2` is evaluated. `a++` yields 5, so `5 * 2 = 10`.",
    explanationBn: "শর্ত ৫ > ৩ সত্য হওয়ায় সত্যের অংশ `a++ * 2` চলে। ৫ * ২ = ১০।",
    hint: "Only the true branch executes: 5 * 2 = 10."
  },
  {
    id: 24,
    question: "In Java, what is guaranteed regarding the order of operand evaluation in expressions?",
    options: [
      "Operands are strictly evaluated from LEFT TO RIGHT",
      "Operands are evaluated in any random order chosen by the JVM",
      "Right operand is always evaluated first",
      "Order depends on whether the OS is Windows or Linux"
    ],
    correctAnswer: 0,
    explanation: "The Java Language Specification (JLS §15.7) strictly mandates that operands in an expression are evaluated from left to right.",
    explanationBn: "জাভা ল্যাঙ্গুয়েজ স্পেসিফিকেশন কঠোরভাবে নির্ধারণ করে যে যেকোনো এক্সপ্রেশনের অপারেন্ড সর্বদা বাম থেকে ডানে মূল্যায়িত হয়।",
    hint: "Strict left-to-right evaluation order."
  },
  {
    id: 25,
    question: "Which of the following summaries regarding complex expression tracing is accurate for CBSE Class 12 IT-802?",
    options: [
      "Parentheses have highest precedence; operands evaluate strictly left-to-right; and each increment/decrement side-effect immediately updates memory before subsequent operands are evaluated",
      "Multiplication always occurs after addition",
      "Side effects of ++ only happen when the program terminates",
      "Expressions inside parentheses are ignored by the compiler"
    ],
    correctAnswer: 0,
    explanation: "Accurate summary: parentheses evaluate first, left-to-right operand order, and side-effects update memory immediately.",
    explanationBn: "সঠিক সারাংশ: বন্ধনীর অগ্রাধিকার সর্বোচ্চ, বাম থেকে ডানে মূল্যায়ন ঘটে এবং ++/-- এর প্রভাব অবিলম্বে মেমরিতে আপডেট হয়।",
    hint: "Review all 3 core tracing rules."
  }
];

export default topic4_questions;
