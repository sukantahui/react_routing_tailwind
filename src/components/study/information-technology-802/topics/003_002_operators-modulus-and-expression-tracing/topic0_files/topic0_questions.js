const topic0_questions = [
  {
    id: 1,
    question: "Which of the following is NOT a valid binary arithmetic operator in Java?",
    options: [
      "+",
      "*",
      "%",
      "**"
    ],
    correctAnswer: 3,
    explanation: "In Java, exponentiation using '**' does not exist (unlike Python). Exponentiation is performed using `Math.pow(base, exp)`. The 5 binary arithmetic operators in Java are `+`, `-`, `*`, `/`, and `%`.",
    explanationBn: "জাভায় '**' কোনো বৈধ পাওয়ার বা এক্সপোনেন্ট অপারেটর নয় (পাইথনের মতো)। পাওয়ার বের করতে `Math.pow()` ব্যবহার করতে হয়। জাভার ৫টি গাণিতিক অপারেটর হলো +, -, *, /, %।",
    hint: "Java has no exponentiation operator like Python's **."
  },
  {
    id: 2,
    question: "What is the result of evaluating `byte a = 10; byte b = 20; byte c = a + b;`?",
    options: [
      "c = 30 with no error",
      "Compile-time error: possible lossy conversion from int to byte",
      "c = 0",
      "Runtime ArithmeticException"
    ],
    correctAnswer: 1,
    explanation: "In Java, binary arithmetic operations on smaller integer types (`byte`, `short`, `char`) automatically promote the operands to `int`. Thus `a + b` produces an `int` result (30). Assigning an `int` to a `byte` without an explicit cast causes a lossy conversion compile error.",
    explanationBn: "জাভায় byte, short বা char এর মধ্যে যোগ করলে স্বয়ংক্রিয়ভাবে ফলাফল int হয়ে যায়। তাই কাস্টিং ছাড়া byte-এ রাখতে গেলে 'possible lossy conversion from int to byte' এরর ঘটে।",
    hint: "Automatic type promotion converts byte + byte to int."
  },
  {
    id: 3,
    question: "How do you correct the statement `byte c = a + b;` where both a and b are bytes?",
    options: [
      "byte c = (byte)(a + b);",
      "byte c = (byte)a + b;",
      "byte c = [byte] a + b;",
      "byte c = a + b (byte);"
    ],
    correctAnswer: 0,
    explanation: "Parentheses around `(a + b)` ensure the entire addition result (which is an int) is cast down to `byte`: `byte c = (byte)(a + b);`.",
    explanationBn: "পুরো যোগফলটিকে প্রথম বন্ধনীতে রেখে `(byte)(a + b)` লিখলে int ফলাফলটি সফলভাবে byte-এ টাইপকাস্ট হয়।",
    hint: "Cast the whole expression (a + b) with (byte)."
  },
  {
    id: 4,
    question: "What is the output of `System.out.println(17 / 5);` in Java?",
    options: [
      "3.4",
      "3",
      "3.0",
      "2"
    ],
    correctAnswer: 1,
    explanation: "Both 17 and 5 are integer literals. In Java, integer division truncates any fractional decimal part, discarding `.4` and resulting in integer `3`.",
    explanationBn: "যেহেতু ১৭ এবং ৫ উভয়ই পূর্ণসংখ্যা, তাই ইন্টিজার ডিভিশনে দশমিক অংশ (.৪) বাদ গিয়ে কেবল ভাগফল ৩ হিসেবে থাকে।",
    hint: "Integer division truncates the decimal part."
  },
  {
    id: 5,
    question: "What is the output of `System.out.println(17 % 5);` in Java?",
    options: [
      "3",
      "2",
      "3.4",
      "0.4"
    ],
    correctAnswer: 1,
    explanation: "The modulus operator `%` computes the remainder after division: `17 = (5 * 3) + 2`. Thus, `17 % 5` returns `2`.",
    explanationBn: "মডুলাস অপারেটর `%` ভাগশেষ নির্ণয় করে। ১৭ কে ৫ দিয়ে ভাগ করলে ভাগফল ৩ এবং ভাগশেষ ২ থাকে, তাই ফলাফল ২।",
    hint: "17 divided by 5 leaves a remainder of 2."
  },
  {
    id: 6,
    question: "What is the resulting data type when adding a `long` and a `float` in Java: `long x = 100L; float y = 5.5f; var z = x + y;`?",
    options: [
      "long",
      "float",
      "double",
      "int"
    ],
    correctAnswer: 1,
    explanation: "According to Java binary numeric promotion rules, if either operand is `double`, the result is `double`. Otherwise, if either operand is `float`, the result is promoted to `float`. Since `float` has a wider range than `long`, the expression evaluates as `float`.",
    explanationBn: "জাভায় বাইনারি টাইপ প্রমোশনের নিয়ম অনুযায়ী long এবং float এর মধ্যে যোগ হলে ফলাফলটি float ডেটা টাইপে উন্নীত হয়।",
    hint: "Float takes precedence over long in numeric promotion."
  },
  {
    id: 7,
    question: "What is the difference between unary minus (`-x`) and binary subtraction (`x - y`) in Java?",
    options: [
      "Unary minus requires two operands, binary requires one",
      "Unary minus acts on a single operand to invert its algebraic sign; binary subtraction operates between two operands to compute their difference",
      "Unary minus only works with floating point numbers",
      "Binary subtraction produces a boolean value"
    ],
    correctAnswer: 1,
    explanation: "Unary operators take only one operand (e.g. `-a` negates `a`), while binary operators take two operands (e.g. `a - b` subtracts `b` from `a`).",
    explanationBn: "ইউনারি মাইনাস একটিমাত্র অপারেন্ডের চিহ্ন পরিবর্তন করে (যেমন -x), আর বাইনারি বিয়োগ দুটি সংখ্যার বিয়োগফল নির্ণয় করে (যেমন x - y)।",
    hint: "Unary = 1 operand; Binary = 2 operands."
  },
  {
    id: 8,
    question: "What will happen if an integer is divided by zero: `int result = 50 / 0;`?",
    options: [
      "result becomes Infinity",
      "The program terminates at runtime with `java.lang.ArithmeticException: / by zero`",
      "result becomes 0",
      "result becomes NaN"
    ],
    correctAnswer: 1,
    explanation: "In Java integer arithmetic, dividing by zero causes the JVM to throw an `ArithmeticException: / by zero` at runtime.",
    explanationBn: "জাভায় পূর্ণসংখ্যাকে শূন্য (০) দিয়ে ভাগ করলে রানটাইমে `java.lang.ArithmeticException: / by zero` এরর ঘটে।",
    hint: "Throws ArithmeticException at runtime."
  },
  {
    id: 9,
    question: "What will happen if a floating-point number is divided by zero: `double result = 50.0 / 0;`?",
    options: [
      "Throws ArithmeticException",
      "Evaluates to `Infinity` without throwing an exception",
      "Evaluates to 0.0",
      "Compile-time error"
    ],
    correctAnswer: 1,
    explanation: "Unlike integer division, IEEE 754 floating-point division by zero produces `Infinity` (or `-Infinity`) rather than throwing an ArithmeticException.",
    explanationBn: "দশমিক (floating-point) সংখ্যাকে ০ দিয়ে ভাগ করলে কোনো এক্সেপশন না দিয়ে IEEE 754 নিয়ম অনুযায়ী `Infinity` ফলাফল দেয়।",
    hint: "Floating point division by zero yields Infinity."
  },
  {
    id: 10,
    question: "What is the output of `0.0 / 0.0` in Java?",
    options: [
      "0.0",
      "Infinity",
      "NaN (Not a Number)",
      "ArithmeticException"
    ],
    correctAnswer: 2,
    explanation: "In IEEE 754 floating-point arithmetic, dividing zero by zero is mathematically undefined and yields `NaN` (Not a Number).",
    explanationBn: "IEEE 754 অনুযায়ী ০.০ কে ০.০ দিয়ে ভাগ করলে অনির্ধারিত মান `NaN` (Not a Number) রিটার্ন করে।",
    hint: "Not a Number."
  },
  {
    id: 11,
    question: "What is the value of `int ans = 25 * 4 / 2;` in Java?",
    options: [
      "50",
      "25",
      "100",
      "200"
    ],
    correctAnswer: 0,
    explanation: "Both `*` and `/` share the same precedence and are evaluated from left to right: `25 * 4 = 100`, then `100 / 2 = 50`.",
    explanationBn: "গুণ (*) এবং ভাগ (/) এর অগ্রাধিকার সমান হওয়ায় বাম থেকে ডানে কাজ করে: ২৫ * ৪ = ১০০, এবং ১০০ / ২ = ৫০।",
    hint: "Left to right associativity: (25 * 4) / 2."
  },
  {
    id: 12,
    question: "What is the value of `int ans = 25 / 4 * 2;` in Java?",
    options: [
      "12",
      "12.5",
      "3",
      "13"
    ],
    correctAnswer: 0,
    explanation: "Left to right evaluation: `25 / 4` is integer division which truncates to `6`. Then `6 * 2 = 12`.",
    explanationBn: "বাম থেকে ডানে মূল্যায়নে: ২৫ / ৪ হলো ইন্টিজার ডিভিশন যা ৬ হয়। এরপর ৬ * ২ = ১২।",
    hint: "25 / 4 gives 6, then 6 * 2 gives 12."
  },
  {
    id: 13,
    question: "What is the output of `System.out.println('A' + 1);` in Java?",
    options: [
      "A1",
      "66",
      "B",
      "Compile-time error"
    ],
    correctAnswer: 1,
    explanation: "In Java, `'A'` is a char with Unicode/ASCII value 65. Because it is paired with integer 1, arithmetic type promotion converts `'A'` to `65`, yielding `65 + 1 = 66`.",
    explanationBn: "'A'-এর অ্যাসকি/ইউনিকোড মান ৬৫। ইন্টিজার ১-এর সাথে যোগ করায় গাণিতিক যোগফল হিসেবে ৬৬ প্রদর্শিত হয়।",
    hint: "Unicode value of 'A' is 65."
  },
  {
    id: 14,
    question: "How can you get the character 'B' from `'A' + 1` in Java?",
    options: [
      "System.out.println((char)('A' + 1));",
      "System.out.println('A' + 1.toChar());",
      "System.out.println(char('A' + 1));",
      "System.out.println('A' + '1');"
    ],
    correctAnswer: 0,
    explanation: "Casting the resulting integer 66 back to `char` with `(char)('A' + 1)` outputs the letter `'B'`.",
    explanationBn: "যোগফল ৬৬-কে `(char)` দিয়ে টাইপকাস্ট করলে 'B' ক্যারেক্টার পাওয়া যায়।",
    hint: "Explicitly cast (char) around the sum."
  },
  {
    id: 15,
    question: "Which arithmetic operator can be used with both numbers AND Strings in Java?",
    options: [
      "-",
      "+",
      "*",
      "/"
    ],
    correctAnswer: 1,
    explanation: "The `+` operator is overloaded in Java: it performs arithmetic addition for numbers and concatenation when at least one operand is a String.",
    explanationBn: "জাভায় '+' অপারেটর ওভারলোডেড; এটি সংখ্যার জন্য যোগ এবং স্ট্রিংয়ের জন্য কনক্যাটেনেশন কাজ করে।",
    hint: "The plus operator."
  },
  {
    id: 16,
    question: "What is the result of `100 - -50` in Java?",
    options: [
      "50",
      "150",
      "-150",
      "Syntax error"
    ],
    correctAnswer: 1,
    explanation: "The second minus is unary negation: `-(-50)` evaluates to `+50`. Thus `100 - (-50) = 150`.",
    explanationBn: "দ্বিতীয় মাইনাসটি ইউনারি মাইনাস হওয়ায় তা -(-৫০) = +৫০ করে, ফলে ১০০ + ৫০ = ১৫০ হয়।",
    hint: "Subtracting a negative number is equivalent to addition."
  },
  {
    id: 17,
    question: "In Java, can the modulus operator `%` be used with floating-point numbers like `7.5 % 2.0`?",
    options: [
      "No, % only works on integers",
      "Yes, in Java % works on floating-point types and `7.5 % 2.0` yields `1.5`",
      "No, it throws a compile-time error",
      "Yes, but it converts them to integers first"
    ],
    correctAnswer: 1,
    explanation: "Unlike C/C++ (where `%` only works on integers), Java allows the modulus operator `%` on floating-point numbers: `7.5 % 2.0 = 1.5`.",
    explanationBn: "C/C++ এর মতো নয়; জাভায় দশমিক সংখ্যাতেও % অপারেটর কাজ করে এবং ৭.৫ % ২.০ এর মান হয় ১.৫।",
    hint: "Java supports floating-point modulus."
  },
  {
    id: 18,
    question: "What is the result of `System.out.println(10 * 0);`?",
    options: [
      "0",
      "ArithmeticException",
      "10",
      "null"
    ],
    correctAnswer: 0,
    explanation: "Multiplying any number by 0 in Java evaluates normally to `0`.",
    explanationBn: "যেকোনো সংখ্যাকে ০ দিয়ে গুণ করলে ফলাফল ০ হয়।",
    hint: "Any number multiplied by 0 is 0."
  },
  {
    id: 19,
    question: "What is the output of `System.out.println(20 / 6);`?",
    options: [
      "3.333333",
      "3",
      "4",
      "2"
    ],
    correctAnswer: 1,
    explanation: "Integer division truncates the decimal portion, so `20 / 6` returns `3`.",
    explanationBn: "ইন্টিজার ডিভিশনের কারণে ২০ / ৬ এর ভাগফল ৩ হয়।",
    hint: "Truncates 3.333 to 3."
  },
  {
    id: 20,
    question: "What is the output of `System.out.println(20 % 6);`?",
    options: [
      "3",
      "2",
      "4",
      "0"
    ],
    correctAnswer: 1,
    explanation: "`20 = (6 * 3) + 2`. The remainder is `2`.",
    explanationBn: "২০ কে ৬ দিয়ে ভাগ করলে ভাগশেষ ২ থাকে।",
    hint: "Remainder is 2."
  },
  {
    id: 21,
    question: "What is the value of `short s1 = 5; short s2 = 10; int s3 = s1 + s2;`?",
    options: [
      "15",
      "Compile-time error",
      "0",
      "510"
    ],
    correctAnswer: 0,
    explanation: "`s1 + s2` promotes to `int` with value 15, and since `s3` is declared as `int`, it successfully stores 15 without error.",
    explanationBn: "`s1 + s2` যোগফল int হয়ে ১৫ হয় এবং s3 int হওয়ায় কোনো এরর ছাড়াই ১৫ জমা রাখে।",
    hint: "Result is promoted to int and stored in an int."
  },
  {
    id: 22,
    question: "What is the value of `int x = 10; int y = + + +x;` in Java?",
    options: [
      "Compile-time error",
      "10 (multiple unary plus operators are evaluated consecutively)",
      "11",
      "30"
    ],
    correctAnswer: 1,
    explanation: "Multiple spaced unary plus operators `+ + +x` simply apply positive signs sequentially without changing the value, resulting in `10`.",
    explanationBn: "স্পেস দিয়ে একাধিক ইউনারি প্লাস `+ + +x` মানের কোনো পরিবর্তন করে না, ফলে মান ১০-ই থাকে।",
    hint: "Unary plus does not alter the numeric value."
  },
  {
    id: 23,
    question: "What is the result of `10 + 2 * 3` in Java?",
    options: [
      "36",
      "16",
      "60",
      "25"
    ],
    correctAnswer: 1,
    explanation: "Multiplication `*` has higher precedence than addition `+`. So `2 * 3 = 6`, followed by `10 + 6 = 16`.",
    explanationBn: "গুণের অগ্রাধিকার বেশি থাকায় ২ * ৩ = ৬ আগে হয়, তারপর ১০ + ৬ = ১৬ হয়।",
    hint: "Multiplication before addition."
  },
  {
    id: 24,
    question: "What is the result of `(10 + 2) * 3` in Java?",
    options: [
      "16",
      "36",
      "60",
      "26"
    ],
    correctAnswer: 1,
    explanation: "Parentheses enforce evaluation first: `10 + 2 = 12`, then `12 * 3 = 36`.",
    explanationBn: "বন্ধনী থাকায় ১০ + ২ = ১২ আগে হয়, তারপর ১২ * ৩ = ৩৬ হয়।",
    hint: "Parentheses override precedence."
  },
  {
    id: 25,
    question: "Which of the following summaries regarding arithmetic operators in Java is accurate for CBSE Class 12 IT-802?",
    options: [
      "Java supports 5 arithmetic operators (+, -, *, /, %); integer division truncates decimals, byte/short operations are automatically promoted to int, and % computes the remainder",
      "Java supports 6 arithmetic operators including ** for exponentiation",
      "Division by zero always produces 0 in Java",
      "Arithmetic operators can only be used with integer variables"
    ],
    correctAnswer: 0,
    explanation: "Java has 5 standard arithmetic operators (+, -, *, /, %), integer division truncates fractional parts, byte/short promote to int, and % calculates remainder.",
    explanationBn: "সঠিক সারাংশ: জাভায় ৫টি গাণিতিক অপারেটর রয়েছে, ইন্টিজার ডিভিশন দশমিক বর্জন করে, byte/short গণনায় int-এ উন্নীত হয় এবং % ভাগশেষ দেয়।",
    hint: "Review all 5 operators and promotion rules."
  }
];

export default topic0_questions;
