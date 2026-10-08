const topic6_questions = [
  {
    id: 1,
    question: "What is the return type of all relational operators (`==`, `!=`, `<`, `>`, `<=`, `>=`) in Java?",
    options: [
      "boolean",
      "int",
      "void",
      "byte"
    ],
    correctAnswer: 0,
    explanation: "In Java, all relational comparison operators strictly return a boolean value (`true` or `false`). Unlike C/C++, Java does not allow converting 0 or 1 to boolean.",
    explanationBn: "জাভায় সমস্ত রিলেশনাল অপারেটর অবশ্যই boolean মান (`true` বা `false`) প্রদান করে। সি-এর মতো জাভায় 0 বা 1 কে বুলিয়ানে পরিবর্তন করা যায় না।",
    hint: "Relational operators evaluate to true or false."
  },
  {
    id: 2,
    question: "Which of the following represents the short-circuit logical AND operator in Java?",
    options: [
      "&&",
      "&",
      "and",
      "*"
    ],
    correctAnswer: 0,
    explanation: "`&&` is Java's short-circuit logical AND operator. It skips evaluating the right-hand operand if the left operand evaluates to false.",
    explanationBn: "`&&` হলো জাভার শর্ট-সার্কিট লজিক্যাল AND অপারেটর। বামদিকের মান false হলে এটি ডানদিকের শর্ত যাচাই না করেই false রিটার্ন করে।",
    hint: "Double ampersand."
  },
  {
    id: 3,
    question: "What is short-circuit evaluation in the context of `A || B`?",
    options: [
      "If `A` is true, `B` is never evaluated because the entire expression is already guaranteed to be true.",
      "If `A` is false, `B` is never evaluated.",
      "Both `A` and `B` are always evaluated regardless of their values.",
      "It causes a runtime error when `A` is true."
    ],
    correctAnswer: 0,
    explanation: "In `A || B`, if operand `A` evaluates to `true`, the overall result is definitively `true`, so Java bypasses (short-circuits) the evaluation of operand `B`.",
    explanationBn: "`A || B` এক্সপ্রেশনে যদি `A` সত্য (true) হয়, তবে সমগ্র ফলাফল নিশ্চিতভাবে true হওয়ায় জাভা `B` অংশটিকে মূল্যায়ন করা বাদ দেয়।",
    hint: "True OR anything is always true."
  },
  {
    id: 4,
    question: "What is the output of the following Java snippet?\nint a = 10, b = 20;\nboolean res = (a > 15) && (++b > 20);\nSystem.out.println(b);",
    options: [
      "20",
      "21",
      "10",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "Because `(a > 15)` is `10 > 15` which is `false`, the short-circuit operator `&&` halts evaluation immediately. `(++b > 20)` is NEVER executed, leaving `b` unchanged at 20.",
    explanationBn: "যেহেতু `(a > 15)` false, শর্ট-সার্কিট `&&` সাথে সাথে থেমে যায়। তাই `++b` কখনোই রান হয় না, এবং `b`-এর মান 20 অপরিবর্তিত থাকে।",
    hint: "Did the right-hand side get evaluated?"
  },
  {
    id: 5,
    question: "What is the output if the bitwise AND `&` is used instead?\nint a = 10, b = 20;\nboolean res = (a > 15) & (++b > 20);\nSystem.out.println(b);",
    options: [
      "21",
      "20",
      "10",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "The single `&` is a non-short-circuit logical/bitwise operator. It forces both operands to be evaluated regardless of the left side. Thus, `++b` executes, making `b` equal to 21.",
    explanationBn: "একক `&` শর্ট-সার্কিট নয়। এটি উভয় পাশের শর্তই বাধ্যতামূলক মূল্যায়ন করে। ফলে `++b` কার্যকর হয় এবং `b`-এর মান 21 হয়।",
    hint: "Single & always evaluates both sides."
  },
  {
    id: 6,
    question: "Given `int x = 0; if (x != 0 && 100 / x > 2)`, why does Java NOT throw an `ArithmeticException: / by zero`?",
    options: [
      "Because `x != 0` is false, and `&&` short-circuits, skipping `100 / x`.",
      "Because Java automatically sets division by zero to infinity for integers.",
      "Because the compiler detects zero division and replaces it with 0.",
      "Because relational operators have higher precedence than division."
    ],
    correctAnswer: 0,
    explanation: "`x != 0` evaluates to `false`. Since `false && anything` is always `false`, Java does not evaluate the right operand `100 / x > 2`. Division by zero is safely avoided.",
    explanationBn: "`x != 0` মিথ্যা (false) হওয়ায় শর্ট-সার্কিট `&&` ডানদিকের `100 / x` অংশটি এড়িয়ে যায়, ফলে শূন্য দিয়ে ভাগজনিত এক্সেপশন হয় না।",
    hint: "The division is never reached."
  },
  {
    id: 7,
    question: "What will happen if we write `if (x != 0 & 100 / x > 2)` when `x = 0`?",
    options: [
      "Throws java.lang.ArithmeticException: / by zero at runtime.",
      "Executes safely and prints false.",
      "Compile-time error: invalid operator.",
      "Returns null."
    ],
    correctAnswer: 0,
    explanation: "Unlike `&&`, the bitwise operator `&` does NOT short-circuit. It evaluates `100 / x`, causing an integer division by zero and throwing `java.lang.ArithmeticException`.",
    explanationBn: "যেহেতু `&` শর্ট-সার্কিট অপারেটর নয়, এটি `100 / x` মূল্যায়ন করতে যায় এবং রানটাইমে `ArithmeticException: / by zero` ঘটে।",
    hint: "Bitwise & does not protect against zero division."
  },
  {
    id: 8,
    question: "What is the result of the expression `!true || false && true`?",
    options: [
      "false",
      "true",
      "Compile-time error",
      "1"
    ],
    correctAnswer: 0,
    explanation: "Operator precedence: `!` is highest, followed by `&&`, then `||`. Step 1: `!true` is `false`. Step 2: `false && true` is `false`. Step 3: `false || false` is `false`.",
    explanationBn: "অপারেটরের প্রাধান্য: `!` সবার আগে, তারপর `&&`, এবং শেষে `||`। `!true` $\\to$ false; `false && true` $\\to$ false; `false || false` $\\to$ false।",
    hint: "Precedence order: NOT (!) > AND (&&) > OR (||)."
  },
  {
    id: 9,
    question: "What is the difference between `=` and `==` in Java?",
    options: [
      "`=` is the assignment operator, whereas `==` is the equality comparison operator.",
      "`=` compares values, whereas `==` assigns values.",
      "Both are identical in modern Java.",
      "`=` works only for numbers, `==` works only for text."
    ],
    correctAnswer: 0,
    explanation: "`=` assigns the value of the right operand to the variable on the left. `==` checks whether two operands are equal and yields a boolean result.",
    explanationBn: "`=` হলো অ্যাসাইনমেন্ট অপারেটর যা মান সংরক্ষণ করে, আর `==` হলো রিলেশনাল অপারেটর যা দুটি মান সমান কিনা পরীক্ষা করে।",
    hint: "= stores, == tests equality."
  },
  {
    id: 10,
    question: "What will happen if a programmer writes `if (x = 5)` where `int x;` in Java?",
    options: [
      "Compilation error: incompatible types (cannot convert int to boolean).",
      "It assigns 5 to x and executes the if block.",
      "It evaluates to false.",
      "Runtime ClassCastException."
    ],
    correctAnswer: 0,
    explanation: "In Java, the condition inside `if (...)` MUST evaluate to a `boolean`. `x = 5` evaluates to an integer `5`, which cannot be converted to `boolean`, causing a compile-time error.",
    explanationBn: "জাভায় `if` শর্তে শুধুমাত্র boolean মান গ্রহণযোগ্য। `x = 5` এর ফলাফল পূর্ণসংখ্যা 5 হওয়ায় কম্পাইল ত্রুটি ঘটবে।",
    hint: "In Java, integers cannot be treated as booleans."
  },
  {
    id: 11,
    question: "What is the value of `flag` after:\nboolean a = true, b = false;\nboolean flag = a || (b = true);\nSystem.out.println(b);",
    options: [
      "false",
      "true",
      "null",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "Because `a` is `true`, the `||` operator short-circuits. The expression `(b = true)` is never evaluated, so `b` remains `false`.",
    explanationBn: "`a` সত্য (true) হওয়ায় `||` শর্ট-সার্কিট ঘটে এবং `(b = true)` কখনোই নির্বাহিত হয় না। ফলে `b`-এর মান false থাকে।",
    hint: "Left side is true in OR."
  },
  {
    id: 12,
    question: "Which of the following is equivalent to De Morgan's Law for `!(A && B)`?",
    options: [
      "!A || !B",
      "!A && !B",
      "A || B",
      "!A && B"
    ],
    correctAnswer: 0,
    explanation: "By De Morgan's Law: `!(A && B)` is logically equivalent to `!A || !B`.",
    explanationBn: "ডি মর্গানের সূত্র অনুযায়ী: `!(A && B)` এর সমতুল্য হলো `!A || !B`।",
    hint: "Negate both and flip AND to OR."
  },
  {
    id: 13,
    question: "Which of the following is equivalent to De Morgan's Law for `!(A || B)`?",
    options: [
      "!A && !B",
      "!A || !B",
      "A && B",
      "A != B"
    ],
    correctAnswer: 0,
    explanation: "By De Morgan's Law: `!(A || B)` is logically equivalent to `!A && !B`.",
    explanationBn: "ডি মর্গানের সূত্র অনুসারে: `!(A || B)` এর সমতুল্য হলো `!A && !B`।",
    hint: "Negate both and flip OR to AND."
  },
  {
    id: 14,
    question: "What does the expression `(5 >= 5) && (3 < 2)` evaluate to?",
    options: [
      "false",
      "true",
      "1",
      "0"
    ],
    correctAnswer: 0,
    explanation: "`5 >= 5` is `true`. `3 < 2` is `false`. `true && false` evaluates to `false`.",
    explanationBn: "`5 >= 5` সত্য (true), কিন্তু `3 < 2` মিথ্যা (false)। true && false এর ফল false।",
    hint: "Both sides must be true for &&."
  },
  {
    id: 15,
    question: "What does the expression `(10 != 10) || (4 <= 4)` evaluate to?",
    options: [
      "true",
      "false",
      "null",
      "Syntax error"
    ],
    correctAnswer: 0,
    explanation: "`10 != 10` is `false`. But `4 <= 4` is `true`. `false || true` evaluates to `true`.",
    explanationBn: "`10 != 10` হলো false, কিন্তু `4 <= 4` হলো true। false || true এর ফলাফল true।",
    hint: "Only one condition needs to be true for OR."
  },
  {
    id: 16,
    question: "What is the result of comparing characters in Java, e.g., `'a' < 'b'`?",
    options: [
      "true, because Unicode value of 'a' (97) is less than 'b' (98).",
      "false, characters cannot be compared with relational operators.",
      "Compile-time error.",
      "Runtime ClassCastException."
    ],
    correctAnswer: 0,
    explanation: "In Java, `char` values are 16-bit unsigned integers (Unicode code points). Thus, `'a' < 'b'` compares `97 < 98`, which evaluates to `true`.",
    explanationBn: "জাভায় char মানগুলি মূলত ইউনিকোড পূর্ণসংখ্যা। তাই `'a' < 'b'` মূলত `97 < 98` যাচাই করে, যার মান true।",
    hint: "Characters are compared by their Unicode/ASCII codes."
  },
  {
    id: 17,
    question: "Can relational operators like `<` or `>` be applied directly to two `boolean` operands in Java (e.g. `true > false`)?",
    options: [
      "No, relational operators `<`, `>`, `<=`, `>=` cannot be applied to boolean types (compile error).",
      "Yes, true is treated as 1 and false as 0.",
      "Yes, true is greater than false.",
      "Only inside while loops."
    ],
    correctAnswer: 0,
    explanation: "In Java, relational operators `<`, `<=`, `>`, `>=` are only defined for numeric types (`byte`, `short`, `char`, `int`, `long`, `float`, `double`). Attempting `true > false` causes a compiler error.",
    explanationBn: "জাভায় `<`, `>`, `<=`, `>=` শুধুমাত্র সংখ্যাক বা ক্যারেক্টারের ক্ষেত্রে প্রযোজ্য; বুলিয়ান মানে এগুলো ব্যবহার করলে কম্পাইল ত্রুটি হয়।",
    hint: "Booleans only support ==, !=, and logical operators."
  },
  {
    id: 18,
    question: "Which operators can compare two `boolean` variables for equality or inequality?",
    options: [
      "`==` and `!=`",
      "`<` and `>`",
      "`<=` and `>=`",
      "None of the above"
    ],
    correctAnswer: 0,
    explanation: "Boolean values can only be compared using the equality operators `==` and `!=`.",
    explanationBn: "দুটি বুলিয়ান চলকের সমতা বা অসমতা যাচাই করতে কেবল `==` এবং `!=` ব্যবহার করা যায়।",
    hint: "Equality works, relative magnitude does not."
  },
  {
    id: 19,
    question: "What is the output of the following Java code?\nint p = 5, q = 10;\nboolean r = (p++ > 5) && (++q > 10);\nSystem.out.println(p + \" \" + q);",
    options: [
      "6 10",
      "6 11",
      "5 10",
      "5 11"
    ],
    correctAnswer: 0,
    explanation: "`p++ > 5` uses current `p` (5) for comparison: `5 > 5` is `false`. Then `p` increments to 6. Because the condition is `false`, `&&` short-circuits. `++q` is NEVER executed. Thus `p = 6` and `q = 10`.",
    explanationBn: "`p++ > 5` এ 5 > 5 পরীক্ষা হয় যা false, এরপর p বেড়ে 6 হয়। false হওয়ায় short-circuit ঘটে এবং `++q` হয় না। তাই p=6, q=10।",
    hint: "Post-increment evaluates first, increments p, but short-circuits before q."
  },
  {
    id: 20,
    question: "What is the output of the following Java code?\nint p = 5, q = 10;\nboolean r = (++p > 5) || (++q > 10);\nSystem.out.println(p + \" \" + q);",
    options: [
      "6 10",
      "6 11",
      "5 10",
      "5 11"
    ],
    correctAnswer: 0,
    explanation: "`++p` increments `p` from 5 to 6. Then `6 > 5` is `true`. Because the left side of `||` is `true`, the expression short-circuits. `++q` is never executed. Thus `p = 6` and `q = 10`.",
    explanationBn: "`++p` এর মান 6 হয় এবং 6 > 5 হলো true। `||` অপারেটরে বামদিক true হওয়ায় শর্ট-সার্কিট ঘটে এবং `++q` চলে না। তাই p=6, q=10।",
    hint: "Pre-increment makes p=6, 6>5 is true, OR short-circuits."
  },
  {
    id: 21,
    question: "Which of the following expressions checks whether variable `n` is between 10 and 50 inclusive in Java?",
    options: [
      "n >= 10 && n <= 50",
      "10 <= n <= 50",
      "n >= 10 || n <= 50",
      "10 <= n &<= 50"
    ],
    correctAnswer: 0,
    explanation: "Chained comparisons like `10 <= n <= 50` are invalid in Java (since `10 <= n` produces a boolean, and `boolean <= 50` is a type error). You must use `n >= 10 && n <= 50`.",
    explanationBn: "জাভায় `10 <= n <= 50` লেখা যায় না কারণ `10 <= n` একটি বুলিয়ান দেয় যার সাথে সংখ্যার তুলনা অবৈধ। সঠিক উপায় হলো `n >= 10 && n <= 50`।",
    hint: "Java does not support chained inequality syntax."
  },
  {
    id: 22,
    question: "What is the truth value of `!(5 == 5) == false`?",
    options: [
      "true",
      "false",
      "Compile-time error",
      "1"
    ],
    correctAnswer: 0,
    explanation: "`5 == 5` is `true`. `!true` is `false`. Then `false == false` evaluates to `true`.",
    explanationBn: "`5 == 5` সত্য (true); `!true` হলো false; এরপর `false == false` এর মান দাঁড়ায় true।",
    hint: "Break it down: 5==5 is true, not true is false, false == false is true."
  },
  {
    id: 23,
    question: "What is the result of `false && (5 / 0 == 0)`?",
    options: [
      "false (safely evaluated due to short-circuit)",
      "ArithmeticException: / by zero",
      "true",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "The left operand is `false`, so Java's `&&` short-circuits immediately. The zero division is never reached or evaluated.",
    explanationBn: "বামদিকের মান false হওয়ায় শর্ট-সার্কিটের কারণে শূন্য দিয়ে ভাগ অংশটি কখনোই কল হয় না। নিরাপদভাবে false ফেরত আসে।",
    hint: "Short-circuit prevents runtime exception."
  },
  {
    id: 24,
    question: "What is the result of `true || (5 / 0 == 0)`?",
    options: [
      "true (safely evaluated due to short-circuit)",
      "ArithmeticException: / by zero",
      "false",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "The left operand is `true`, so Java's `||` short-circuits immediately without evaluating the right operand. The result is `true`.",
    explanationBn: "বামদিকের মান true হওয়ায় `||` শর্ট-সার্কিট ঘটে এবং ডানদিকের শূন্য দিয়ে ভাগ মূল্যায়ন করা হয় না। নিরাপদভাবে true আসে।",
    hint: "True OR anything skips the rest."
  },
  {
    id: 25,
    question: "In the expression `a && b || c`, how does Java group the operators by precedence without parentheses?",
    options: [
      "(a && b) || c",
      "a && (b || c)",
      "Left-to-right strictly without precedence",
      "Right-to-left strictly"
    ],
    correctAnswer: 0,
    explanation: "In Java operator precedence, `&&` has higher precedence than `||`. Therefore, `a && b || c` is implicitly grouped as `(a && b) || c`.",
    explanationBn: "জাভায় `&&` অপারেটরের প্রাধান্য `||` এর চেয়ে বেশি। তাই `a && b || c` মূলত `(a && b) || c` হিসেবে মূল্যায়িত হয়।",
    hint: "Logical AND binds tighter than Logical OR."
  }
];

export default topic6_questions;
