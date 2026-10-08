const topic1_questions = [
  {
    id: 1,
    question: "What is the output of the statement `System.out.println(12 / 5);` in Java?",
    options: [
      "2.4",
      "2",
      "3",
      "2.0"
    ],
    correctAnswer: 1,
    explanation: "Because both 12 and 5 are integer operands, Java performs integer division and discards (truncates) the decimal fraction `.4`, yielding integer `2`.",
    explanationBn: "যেহেতু ১২ এবং ৫ উভয়ই পূর্ণসংখ্যা, তাই জাভায় ইন্টিজার ডিভিশন ঘটে এবং দশমিক অংশ (.৪) বাদ গিয়ে কেবল ২ থাকে।",
    hint: "Integer division discards decimals without rounding."
  },
  {
    id: 2,
    question: "What is the output of the statement `System.out.println(12.0 / 5);` in Java?",
    options: [
      "2",
      "2.4",
      "2.0",
      "3.0"
    ],
    correctAnswer: 1,
    explanation: "Because `12.0` is a double, the integer `5` is promoted to `5.0`. Floating-point division preserves decimal precision, resulting in `2.4`.",
    explanationBn: "যেহেতু ১২.০ একটি double সংখ্যা, তাই ৫-কে ৫.০ তে উন্নীত করে ফ্লোটিং-পয়েন্ট ভাগ সম্পন্ন হয় এবং সঠিক ফলাফল ২.৪ পাওয়া যায়।",
    hint: "A decimal operand enables floating-point division."
  },
  {
    id: 3,
    question: "What is the value of `double result = 12 / 5;` when printed on the console?",
    options: [
      "2.4",
      "2.0",
      "2",
      "Compile-time error"
    ],
    correctAnswer: 1,
    explanation: "First, the right-hand side `12 / 5` evaluates using integer division, producing integer `2`. Next, integer `2` is implicitly widened to type double when assigned to `result`, becoming `2.0`.",
    explanationBn: "প্রথমে ডানপাশে ১২ / ৫ ভাগ হয়ে পূর্ণসংখ্যা ২ হয়। এরপর double ভ্যারিয়েবলে অ্যাসাইন হওয়ার সময় তা ২.০ তে রূপান্তরিত হয়।",
    hint: "Integer division executes first, then converts to double."
  },
  {
    id: 4,
    question: "What is the output of `System.out.println((double) 12 / 5);`?",
    options: [
      "2.0",
      "2.4",
      "2",
      "Compile error"
    ],
    correctAnswer: 1,
    explanation: "The explicit cast `(double) 12` has higher precedence than division `/`. 12 is cast to `12.0` first, so `12.0 / 5` yields `2.4`.",
    explanationBn: "টাইপকাস্ট `(double)` এর অগ্রাধিকার বেশি থাকায় ১২ প্রথমে ১২.০ হয়, এবং ১২.০ / ৫ ভাগ হয়ে ২.৪ আউটপুট দেয়।",
    hint: "12 is cast to 12.0 before division."
  },
  {
    id: 5,
    question: "What is the output of `System.out.println((double)(12 / 5));` in Java?",
    options: [
      "2.4",
      "2.0",
      "2",
      "3.0"
    ],
    correctAnswer: 1,
    explanation: "Parentheses `(12 / 5)` evaluate first using integer division, yielding integer `2`. Then `(double)` casts `2` to `2.0`. The fractional `.4` is lost before casting takes place!",
    explanationBn: "প্রথম বন্ধনী `(12 / 5)` আগে সম্পন্ন হয়ে পূর্ণসংখ্যা ২ তৈরি করে। এরপর `(double)` কাস্টিং করায় ২.০ পাওয়া যায় (দশমিক অংশ আগেই মুছে যায়)।",
    hint: "Parentheses evaluate integer division 12/5 first."
  },
  {
    id: 6,
    question: "What is the output of `System.out.println(1 / 2);` in Java?",
    options: [
      "0.5",
      "0",
      "1",
      "0.0"
    ],
    correctAnswer: 1,
    explanation: "Integer division `1 / 2` evaluates to 0.5 mathematically, but truncates towards zero to produce `0`.",
    explanationBn: "১ / ২ এর প্রকৃত মান ০.৫ হলেও ইন্টিজার ডিভিশন দশমিক বর্জন করায় ফলাফল ০ হয়।",
    hint: "1 divided by 2 as integers truncates to 0."
  },
  {
    id: 7,
    question: "What is the output of `System.out.println(1.0 / 2);` in Java?",
    options: [
      "0",
      "0.5",
      "0.0",
      "1.0"
    ],
    correctAnswer: 1,
    explanation: "With `1.0` as a double, Java promotes 2 to 2.0 and computes `1.0 / 2.0 = 0.5`.",
    explanationBn: "যেহেতু ১.০ একটি double, তাই ফ্লোটিং ডিভিশন সম্পন্ন হয়ে ০.৫ পাওয়া যায়।",
    hint: "Floating point division computes 0.5."
  },
  {
    id: 8,
    question: "What will the following code snippet print?\n```java\nint totalMarks = 485;\nint maxMarks = 500;\ndouble percentage = (totalMarks / maxMarks) * 100;\nSystem.out.println(percentage);\n```",
    options: [
      "97.0",
      "0.0",
      "97",
      "48500"
    ],
    correctAnswer: 1,
    explanation: "Classic CBSE student error! Because both `totalMarks` (485) and `maxMarks` (500) are integers, `(485 / 500)` evaluates to `0`! Then `0 * 100` is `0`, which is widened to `0.0`. To fix it, write `((double)totalMarks / maxMarks) * 100`.",
    explanationBn: "৪৮৫ / ৫০০ ইন্টিজার ডিভিশন করায় ফলাফল ০ হয়! এরপর ০ * ১০০ = ০, যা double-এ ০.০ দেখায়। সঠিক ফল পেতে `(double)totalMarks` লিখতে হবে।",
    hint: "485 / 500 truncates to 0 before multiplying by 100."
  },
  {
    id: 9,
    question: "What will the expression `System.out.println(-13 / 5);` evaluate to in Java?",
    options: [
      "-2",
      "-3",
      "-2.6",
      "2"
    ],
    correctAnswer: 0,
    explanation: "Java integer division truncates towards zero. `-13 / 5 = -2.6`, which truncates towards zero to `-2`.",
    explanationBn: "জাভায় ঋণাত্মক সংখ্যার ইন্টিজার ডিভিশন শূন্যের দিকে ট্রাঙ্কেট করে, ফলে -১৩ / ৫ এর মান হয় -২।",
    hint: "Truncation towards zero results in -2."
  },
  {
    id: 10,
    question: "What happens when executing: `System.out.println(15 / 0);`?",
    options: [
      "Prints Infinity",
      "Throws java.lang.ArithmeticException: / by zero",
      "Prints 0",
      "Prints NaN"
    ],
    correctAnswer: 1,
    explanation: "Integer division by zero is illegal and throws an `ArithmeticException`.",
    explanationBn: "পূর্ণসংখ্যাকে শূন্য দিয়ে ভাগ করলে রানটাইমে ArithmeticException ঘটে।",
    hint: "Integer division by zero throws ArithmeticException."
  },
  {
    id: 11,
    question: "What happens when executing: `System.out.println(15.0 / 0);`?",
    options: [
      "Throws ArithmeticException",
      "Prints Infinity",
      "Prints 0.0",
      "Prints NaN"
    ],
    correctAnswer: 1,
    explanation: "Floating-point division by zero in Java does not throw an exception; it yields IEEE 754 positive `Infinity`.",
    explanationBn: "ফ্লোটিং-পয়েন্ট সংখ্যাকে ০ দিয়ে ভাগ করলে কোনো এরর হয় না, বরং 'Infinity' মুদ্রিত হয়।",
    hint: "Floating point division by zero results in Infinity."
  },
  {
    id: 12,
    question: "What is printed by: `System.out.println(-15.0 / 0);`?",
    options: [
      "Infinity",
      "-Infinity",
      "ArithmeticException",
      "NaN"
    ],
    correctAnswer: 1,
    explanation: "Dividing a negative floating-point number by zero yields `-Infinity`.",
    explanationBn: "ঋণাত্মক দশমিক সংখ্যাকে ০ দিয়ে ভাগ করলে '-Infinity' পাওয়া যায়।",
    hint: "Negative divided by zero gives -Infinity."
  },
  {
    id: 13,
    question: "What is printed by: `System.out.println(0.0 / 0);`?",
    options: [
      "0.0",
      "Infinity",
      "NaN",
      "ArithmeticException"
    ],
    correctAnswer: 2,
    explanation: "Zero divided by zero in floating-point mathematics is indeterminate and produces `NaN` (Not a Number).",
    explanationBn: "০.০ কে ০ দিয়ে ভাগ করলে অনির্ধারিত মান `NaN` (Not a Number) পাওয়া যায়।",
    hint: "Zero divided by zero yields NaN."
  },
  {
    id: 14,
    question: "What will be the output of `System.out.println(7 / 2 + 7.0 / 2);`?",
    options: [
      "7.0",
      "6.5",
      "6",
      "7"
    ],
    correctAnswer: 1,
    explanation: "`7 / 2` evaluates to integer `3`. `7.0 / 2` evaluates to double `3.5`. Then `3 + 3.5 = 6.5`.",
    explanationBn: "৭ / ২ হলো ৩ (ইন্টিজার) এবং ৭.০ / ২ হলো ৩.৫ (ডাবল)। সুতরাং ৩ + ৩.৫ = ৬.৫।",
    hint: "3 + 3.5 = 6.5."
  },
  {
    id: 15,
    question: "What is the output of `System.out.println((float) 5 / 2);`?",
    options: [
      "2",
      "2.5",
      "2.0",
      "2.5f"
    ],
    correctAnswer: 1,
    explanation: "`5` is cast to `float` 5.0f. `5.0f / 2` computes float `2.5`.",
    explanationBn: "৫-কে float-এ কাস্ট করলে ৫.০f হয়, এরপর ২ দিয়ে ভাগ করলে ২.৫ পাওয়া যায়।",
    hint: "5.0f / 2 = 2.5."
  },
  {
    id: 16,
    question: "Which of the following expressions evaluates to 2.5 in Java?",
    options: [
      "5 / 2",
      "(double)(5 / 2)",
      "5.0 / 2",
      "(int) 5.0 / 2"
    ],
    correctAnswer: 2,
    explanation: "`5.0 / 2` performs floating-point division and returns `2.5`. `5 / 2` is 2; `(double)(5 / 2)` is 2.0; `(int)5.0 / 2` is 5 / 2 = 2.",
    explanationBn: "`5.0 / 2` ফ্লোটিং ডিভিশন হওয়ায় ২.৫ দেয়। বাকিগুলোতে ইন্টিজার ট্রাঙ্কেশন ঘটে।",
    hint: "5.0 / 2 preserves the decimal 2.5."
  },
  {
    id: 17,
    question: "What is the output of `System.out.println(10 / 4 * 4);` in Java?",
    options: [
      "10",
      "8",
      "10.0",
      "2"
    ],
    correctAnswer: 1,
    explanation: "Left-to-right evaluation: `10 / 4` evaluates to integer `2`. Then `2 * 4` evaluates to `8`!",
    explanationBn: "বাম থেকে ডানে মূল্যায়নে: ১০ / ৪ = ২ (ভাগফল), তারপর ২ * ৪ = ৮ হয়।",
    hint: "10 / 4 gives 2, then 2 * 4 = 8."
  },
  {
    id: 18,
    question: "What is the output of `System.out.println(10 * 4 / 4);` in Java?",
    options: [
      "8",
      "10",
      "10.0",
      "40"
    ],
    correctAnswer: 1,
    explanation: "Left-to-right evaluation: `10 * 4 = 40`. Then `40 / 4 = 10`.",
    explanationBn: "প্রথমে ১০ * ৪ = ৪০, তারপর ৪০ / ৪ = ১০ হয়।",
    hint: "(10 * 4) / 4 = 10."
  },
  {
    id: 19,
    question: "What is the output of `System.out.println(19 / 5.0f);`?",
    options: [
      "3.8",
      "3",
      "3.0",
      "4"
    ],
    correctAnswer: 0,
    explanation: "19 is promoted to float 19.0f, and `19.0f / 5.0f` yields float `3.8`.",
    explanationBn: "১৯-কে float ধরে ভাগ করায় সঠিক দশমিক ফলাফল ৩.৮ পাওয়া যায়।",
    hint: "Floating point division gives 3.8."
  },
  {
    id: 20,
    question: "What is the output of `System.out.println(10 / 3);`?",
    options: [
      "3.3333333333333335",
      "3",
      "3.0",
      "4"
    ],
    correctAnswer: 1,
    explanation: "Both 10 and 3 are integers, so integer division yields `3`.",
    explanationBn: "উভয় সংখ্যা পূর্ণসংখ্যা হওয়ায় ফলাফল ৩ হয়।",
    hint: "Integer division gives 3."
  },
  {
    id: 21,
    question: "What is the output of `System.out.println(10.0 / 3);`?",
    options: [
      "3",
      "3.3333333333333335",
      "3.3",
      "3.0"
    ],
    correctAnswer: 1,
    explanation: "With `10.0` as double, floating-point division produces `3.3333333333333335`.",
    explanationBn: "১০.০ double হওয়ায় ১৫ ঘর পর্যন্ত দশমিক মান ৩.৩৩৩৩৩৩৩৩৩৩৩৩৩৩৫ মুদ্রিত হয়।",
    hint: "Double precision floating-point division."
  },
  {
    id: 22,
    question: "If `int a = 7, b = 2;`, which statement correctly stores the exact floating-point average of `a` and `b` in `double avg`?",
    options: [
      "double avg = (a + b) / 2;",
      "double avg = (double)(a + b) / 2;",
      "double avg = (double)((a + b) / 2);",
      "double avg = (a + b) / (int) 2.0;"
    ],
    correctAnswer: 1,
    explanation: "Casting `(double)(a + b)` converts 9 to `9.0` before dividing by 2, yielding `4.5`. Option A gives 4.0; Option C gives 4.0.",
    explanationBn: "`double avg = (double)(a + b) / 2;` লিখলে ৯ প্রথমে ৯.০ হয়, যা ২ দিয়ে ভাগ হয়ে সঠিক গড় ৪.৫ দেয়।",
    hint: "Cast (a + b) to double before division."
  },
  {
    id: 23,
    question: "What is the result of `double d = 1 / 4 * 100;`?",
    options: [
      "25.0",
      "0.0",
      "25",
      "0.25"
    ],
    correctAnswer: 1,
    explanation: "`1 / 4` is integer division yielding `0`. Then `0 * 100 = 0`, which is assigned to double as `0.0`.",
    explanationBn: "১ / ৪ হলো ০ (ভাগফল)। এরপর ০ * ১০০ = ০, যা double-এ ০.০ হয়।",
    hint: "1 / 4 truncates to 0."
  },
  {
    id: 24,
    question: "What is the result of `double d = 1.0 / 4 * 100;`?",
    options: [
      "0.0",
      "25.0",
      "25",
      "0.25"
    ],
    correctAnswer: 1,
    explanation: "`1.0 / 4` evaluates to double `0.25`. Then `0.25 * 100 = 25.0`.",
    explanationBn: "১.০ / ৪ = ০.২৫, এরপর ০.২৫ * ১০০ = ২৫.০ হয়।",
    hint: "1.0 / 4 = 0.25, then 0.25 * 100 = 25.0."
  },
  {
    id: 25,
    question: "Which of the following summaries regarding division in Java is 100% accurate for CBSE IT-802?",
    options: [
      "Integer division (`int / int`) discards all fractional parts towards zero; floating-point division occurs when at least one operand is float/double; integer division by zero throws ArithmeticException while floating division by zero yields Infinity",
      "Integer division rounds to the nearest whole integer",
      "All division operations in Java return a double automatically",
      "Floating-point numbers cannot be divided in Java"
    ],
    correctAnswer: 0,
    explanation: "Complete accurate summary: integer division truncates towards zero, floating division activates with any decimal operand, and dividing by zero throws ArithmeticException for integers but gives Infinity for floats.",
    explanationBn: "সঠিক সারাংশ: ইন্টিজার ভাগফল দশমিক ফেলে দেয়, যেকোনো একটি ডেসিমেল হলে ফ্লোটিং ভাগফল দেয় এবং ০ দিয়ে পূর্ণসংখ্যা ভাগে এরর হলেও দশমিকে Infinity হয়।",
    hint: "Review all division rules and zero-division behaviors."
  }
];

export default topic1_questions;
