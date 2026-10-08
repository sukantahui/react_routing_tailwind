const topic2_questions = [
  {
    id: 1,
    question: "What will be the output of `System.out.println(10 % 80);` in Java?",
    options: [
      "8",
      "0",
      "10",
      "80"
    ],
    correctAnswer: 2,
    explanation: "When the dividend (10) is smaller than the divisor (80), the division quotient is 0 (`10 / 80 = 0`), and the entire dividend remains as the remainder (`10 = 80 * 0 + 10`). Thus, `10 % 80` yields `10`.",
    explanationBn: "ভাজ্য (১০) যখন ভাজক (৮০)-এর চেয়ে ছোট হয়, তখন ভাগফল ০ হয় এবং সম্পূর্ণ ভাজ্যটিই ভাগশেষ হিসেবে থাকে। সুতরাং ১০ % ৮০ এর মান হলো ১০।",
    hint: "If a < b, then a % b = a (for positive integers)."
  },
  {
    id: 2,
    question: "Consider the following code snippet:\n```java\nint x = 10, y = 80;\nx %= y;\nSystem.out.println(x);\n```\nWhat is the value printed?",
    options: [
      "0",
      "8",
      "10",
      "80"
    ],
    correctAnswer: 2,
    explanation: "`x %= y` expands to `x = x % y`. Since `10 % 80 = 10`, `x` retains the value `10`.",
    explanationBn: "`x %= y` সমতুল্য `x = x % y`। যেহেতু ১০ % ৮০ = ১০, তাই 'x'-এর চূড়ান্ত মান ১০ প্রদর্শিত হবে।",
    hint: "x %= y is x = x % y (10 % 80)."
  },
  {
    id: 3,
    question: "What is the output of `System.out.println(-10 % 3);` in Java?",
    options: [
      "1",
      "-1",
      "-2",
      "2"
    ],
    correctAnswer: 1,
    explanation: "In Java, the sign of the modulus result is strictly governed by the sign of the dividend (left operand). Since the dividend `-10` is negative, the result is `-1` (`-10 = 3 * -3 + (-1)`).",
    explanationBn: "জাভায় মডুলাসের ফলাফলের চিহ্ন সর্বদা বামপাশের সংখ্যা (ভাজ্য)-এর চিহ্নের সমান হয়। এখানে -১০ ঋণাত্মক হওয়ায় ফলাফল -১।",
    hint: "The sign of the result matches the dividend (first operand)."
  },
  {
    id: 4,
    question: "What is the output of `System.out.println(10 % -3);` in Java?",
    options: [
      "1",
      "-1",
      "2",
      "-2"
    ],
    correctAnswer: 0,
    explanation: "In Java, the sign of the divisor (right operand) has no effect on the modulus result. Because the dividend `10` is positive, the result is positive `1`.",
    explanationBn: "ডানপাশের ভাজকের ঋণাত্মক চিহ্ন মডুলাসের ফলাফলে প্রভাব ফেলে না। বামপাশের ১০ ধনাত্মক হওয়ায় ফলাফল +১।",
    hint: "The sign of the divisor is ignored; only the dividend's sign matters."
  },
  {
    id: 5,
    question: "What is the output of `System.out.println(-10 % -3);` in Java?",
    options: [
      "1",
      "-1",
      "0",
      "3"
    ],
    correctAnswer: 1,
    explanation: "The dividend `-10` is negative, so the result is `-1`. The sign of the divisor `-3` is ignored.",
    explanationBn: "যেহেতু ভাজ্য -১০ ঋণাত্মক, তাই ফলাফল ঋণাত্মক (-১) হবে।",
    hint: "Dividend is -10 (negative), so result is negative."
  },
  {
    id: 6,
    question: "Which mathematical formula correctly defines Java's modulus evaluation `a % b`?",
    options: [
      "a % b = a - (b * (a / b))",
      "a % b = (a + b) / 2",
      "a % b = a * b - (a / b)",
      "a % b = b - (a * b)"
    ],
    correctAnswer: 0,
    explanation: "According to the Java Language Specification (JLS), integer remainder is defined as: `a % b = a - (b * (a / b))` where `a / b` is truncated integer division.",
    explanationBn: "জাভা স্পেসিফিকেশন অনুযায়ী ভাগশেষের সূত্র হলো: `a % b = a - (b * (a / b))`।",
    hint: "a minus (b times the integer quotient of a/b)."
  },
  {
    id: 7,
    question: "What is the output of `System.out.println(7.5 % 2.0);` in Java?",
    options: [
      "Compile-time error: % cannot be used with floating point numbers",
      "1.5",
      "1",
      "0.5"
    ],
    correctAnswer: 1,
    explanation: "Java permits the modulus operator on floating-point numbers. `7.5 / 2.0` has a quotient of 3 (`2.0 * 3 = 6.0`), leaving a remainder of `7.5 - 6.0 = 1.5`.",
    explanationBn: "জাভায় দশমিক সংখ্যাতেও % কাজ করে। ৭.৫ কে ২.০ দিয়ে ভাগ করলে ভাগফল ৩ এবং ভাগশেষ ১.৫ থাকে।",
    hint: "7.5 - (2.0 * 3) = 1.5."
  },
  {
    id: 8,
    question: "What is the output of `System.out.println(3 % 7);`?",
    options: [
      "3",
      "7",
      "0",
      "1"
    ],
    correctAnswer: 0,
    explanation: "Because 3 is smaller than 7, `3 % 7` evaluates to `3`.",
    explanationBn: "৩ সংখ্যাটি ৭ এর চেয়ে ছোট হওয়ায় ভাগশেষ হিসেবে ৩-ই থাকে।",
    hint: "3 < 7, so remainder is 3."
  },
  {
    id: 9,
    question: "How can you extract the last digit of an integer (e.g. 549) in Java?",
    options: [
      "int last = 549 / 10;",
      "int last = 549 % 10;",
      "int last = 549 - 10;",
      "int last = 549 * 10;"
    ],
    correctAnswer: 1,
    explanation: "Modulus 10 (`number % 10`) always extracts the units digit (e.g. `549 % 10 = 9`).",
    explanationBn: "যেকোনো সংখ্যাকে ১০ দিয়ে মডুলাস (`number % 10`) করলে তার এককের ঘরের শেষ অঙ্কটি (যেমন ৯) পাওয়া যায়।",
    hint: "% 10 returns the last digit."
  },
  {
    id: 10,
    question: "How can you remove the last digit of an integer (e.g. 549 -> 54) in Java?",
    options: [
      "int remaining = 549 % 10;",
      "int remaining = 549 / 10;",
      "int remaining = 549 - 10;",
      "int remaining = (int) 549.10;"
    ],
    correctAnswer: 1,
    explanation: "Integer division by 10 (`549 / 10`) drops the last digit, returning `54`.",
    explanationBn: "১০ দিয়ে পূর্ণসংখ্যা ভাগ (`549 / 10`) করলে শেষ অঙ্কটি বাদ গিয়ে বাকি অংশ (৫৪) থাকে।",
    hint: "/ 10 drops the last digit."
  },
  {
    id: 11,
    question: "Which condition in Java accurately tests whether an integer `num` is EVEN?",
    options: [
      "if (num / 2 == 0)",
      "if (num % 2 == 0)",
      "if (num % 2 == 1)",
      "if (num / 2 == 1)"
    ],
    correctAnswer: 1,
    explanation: "An even number divides by 2 with a remainder of 0: `num % 2 == 0`.",
    explanationBn: "জোড় সংখ্যাকে ২ দিয়ে ভাগ করলে ভাগশেষ ০ হয়, তাই শর্তটি হবে `num % 2 == 0`।",
    hint: "Remainder after division by 2 must be 0."
  },
  {
    id: 12,
    question: "What is the result of `25 % 25` in Java?",
    options: [
      "25",
      "1",
      "0",
      "50"
    ],
    correctAnswer: 2,
    explanation: "25 divides evenly into 25 with no remainder (`25 = 25 * 1 + 0`), so `25 % 25 = 0`.",
    explanationBn: "২৫ কে ২৫ দিয়ে ভাগ করলে কোনো ভাগশেষ থাকে না, তাই ফলাফল ০।",
    hint: "Any number modulo itself is 0."
  },
  {
    id: 13,
    question: "What is the result of `0 % 15` in Java?",
    options: [
      "0",
      "15",
      "ArithmeticException",
      "NaN"
    ],
    correctAnswer: 0,
    explanation: "`0 / 15 = 0`, leaving a remainder of `0`. Thus `0 % 15 = 0`.",
    explanationBn: "০ কে ১৫ দিয়ে ভাগ করলে ভাগশেষ ০ থাকে।",
    hint: "0 divided by any non-zero number has a remainder of 0."
  },
  {
    id: 14,
    question: "What happens when evaluating `15 % 0` in Java?",
    options: [
      "0",
      "15",
      "java.lang.ArithmeticException: / by zero",
      "Infinity"
    ],
    correctAnswer: 2,
    explanation: "Just like division by zero, integer modulus by zero (`% 0`) throws `java.lang.ArithmeticException: / by zero` at runtime.",
    explanationBn: "শূন্য (০) দিয়ে পূর্ণসংখ্যা মডুলাস করলে রানটাইমে ArithmeticException ঘটে।",
    hint: "Modulus by zero throws ArithmeticException."
  },
  {
    id: 15,
    question: "What is the result of `15.0 % 0` in Java?",
    options: [
      "ArithmeticException",
      "NaN (Not a Number)",
      "Infinity",
      "0.0"
    ],
    correctAnswer: 1,
    explanation: "In IEEE 754 floating-point rules, modulus by zero (e.g. `15.0 % 0`) produces `NaN`.",
    explanationBn: "দশমিক সংখ্যাকে ০ দিয়ে মডুলাস করলে IEEE 754 নিয়ম অনুযায়ী `NaN` (Not a Number) রিটার্ন করে।",
    hint: "Floating point modulus by zero yields NaN."
  },
  {
    id: 16,
    question: "What is the value of `int ans = 100 % 30 % 4;`?",
    options: [
      "2",
      "10",
      "0",
      "1"
    ],
    correctAnswer: 0,
    explanation: "Left to right associativity: `100 % 30 = 10`. Next, `10 % 4 = 2`.",
    explanationBn: "বাম থেকে ডানে মূল্যায়নে: ১০০ % ৩০ = ১০, এরপর ১০ % ৪ = ২।",
    hint: "(100 % 30) % 4."
  },
  {
    id: 17,
    question: "What is the output of `System.out.println(1 % 10);`?",
    options: [
      "0",
      "1",
      "10",
      "0.1"
    ],
    correctAnswer: 1,
    explanation: "Since 1 < 10, the remainder is `1`.",
    explanationBn: "১ সংখ্যাটি ১০ এর চেয়ে ছোট হওয়ায় ভাগশেষ ১।",
    hint: "1 < 10, so remainder is 1."
  },
  {
    id: 18,
    question: "What is the result of `System.out.println(-1 % 5);` in Java?",
    options: [
      "4",
      "-1",
      "1",
      "-4"
    ],
    correctAnswer: 1,
    explanation: "Because the dividend `-1` is negative, the remainder is `-1` (`-1 = 5 * 0 + (-1)`). Note: in Python this would be 4, but in Java it is `-1`.",
    explanationBn: "ভাজ্য -১ ঋণাত্মক হওয়ায় জাভায় ফলাফল -১ (পাইথনে ৪ হলেও জাভায় এটি -১)।",
    hint: "Dividend is -1, so result is -1 in Java."
  },
  {
    id: 19,
    question: "A store in Barrackpore wants to determine the number of remaining items after packing boxes of 12. If total items = 125, which expression gives the leftover items?",
    options: [
      "125 / 12",
      "125 % 12",
      "125 * 12",
      "125 - 12"
    ],
    correctAnswer: 1,
    explanation: "`125 % 12` calculates the leftover remainder after filling 10 full boxes of 12 (`125 = 12 * 10 + 5`), giving `5` leftover items.",
    explanationBn: "১২৫ % ১২ হিসাব করলে ১০টি পূর্ণ বাক্স ভরার পর অবশিষ্ট ৫টি আইটেম ভাগশেষ হিসেবে পাওয়া যায়।",
    hint: "Modulus finds remaining unpacked items."
  },
  {
    id: 20,
    question: "What is the value of `int r = 16 % 4;`?",
    options: [
      "4",
      "0",
      "1",
      "16"
    ],
    correctAnswer: 1,
    explanation: "16 is an exact multiple of 4 (`16 = 4 * 4 + 0`), so the remainder is `0`.",
    explanationBn: "১৬ সংখ্যাটি ৪ দ্বারা সম্পূর্ণরূপে বিভাজ্য হওয়ায় ভাগশেষ ০।",
    hint: "Exact multiple yields remainder 0."
  },
  {
    id: 21,
    question: "What is the output of `System.out.println(14 % 3 + 14 / 3);`?",
    options: [
      "6",
      "4",
      "2",
      "8"
    ],
    correctAnswer: 0,
    explanation: "`14 % 3 = 2` (remainder). `14 / 3 = 4` (quotient). `2 + 4 = 6`.",
    explanationBn: "১৪ % ৩ = ২ (ভাগশেষ) এবং ১৪ / ৩ = ৪ (ভাগফল)। সুতরাং ২ + ৪ = ৬।",
    hint: "Remainder 2 + Quotient 4 = 6."
  },
  {
    id: 22,
    question: "What is the output of `System.out.println(5 % 1);`?",
    options: [
      "5",
      "0",
      "1",
      "Error"
    ],
    correctAnswer: 1,
    explanation: "Any integer modulo 1 always yields `0` because 1 divides all integers exactly.",
    explanationBn: "যেকোনো পূর্ণসংখ্যাকে ১ দিয়ে ভাগ করলে কোনো ভাগশেষ থাকে না, তাই ফলাফল ০।",
    hint: "Modulo 1 is always 0."
  },
  {
    id: 23,
    question: "What will be the output of `System.out.println(-25 % 7);`?",
    options: [
      "-4",
      "4",
      "-3",
      "3"
    ],
    correctAnswer: 0,
    explanation: "`-25 / 7 = -3`. Remainder = `-25 - (7 * -3) = -25 - (-21) = -4`.",
    explanationBn: "ভাজ্য -২৫ ঋণাত্মক হওয়ায় ভাগশেষ -৪ হবে।",
    hint: "-25 = (7 * -3) - 4."
  },
  {
    id: 24,
    question: "What will be the output of `System.out.println(25 % -7);`?",
    options: [
      "-4",
      "4",
      "3",
      "-3"
    ],
    correctAnswer: 1,
    explanation: "Dividend `25` is positive, so remainder is positive `4` (`25 = -7 * -3 + 4`).",
    explanationBn: "ভাজ্য ২৫ ধনাত্মক হওয়ায় ফলাফল +৪ হবে।",
    hint: "Dividend 25 is positive, so result is positive 4."
  },
  {
    id: 25,
    question: "Which of the following summaries regarding the `%` operator is 100% accurate for CBSE Class 12 IT-802?",
    options: [
      "The modulus operator returns the remainder; if dividend < divisor, remainder equals the dividend (e.g. 10 % 80 = 10); in signed operations, the result sign strictly follows the dividend; and Java supports floating-point modulus",
      "The modulus operator always returns the quotient",
      "Negative modulus is undefined in Java",
      "The modulus operator can only be used with odd numbers"
    ],
    correctAnswer: 0,
    explanation: "Accurate summary: % computes remainder; when dividend < divisor, result is dividend; sign follows dividend; and floating point modulus is valid.",
    explanationBn: "সঠিক সারাংশ: % ভাগশেষ নির্ণয় করে, ভাজ্য ছোট হলে ভাজ্যই ফলাফল হয়, ফলাফলের চিহ্ন সর্বদা ভাজ্যের চিহ্নের সমান হয় এবং দশমিকেও % কাজ করে।",
    hint: "Review all remainder rules and dividend sign dominance."
  }
];

export default topic2_questions;
