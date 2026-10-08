const topic7_questions = [
  {
    id: 1,
    question: "What is operator precedence in Java?",
    options: [
      "The rule specifying which operator is evaluated first when an expression contains multiple operators of different levels.",
      "The order in which variables are declared in memory.",
      "The speed of CPU execution for different operators.",
      "The number of operands an operator can accept."
    ],
    correctAnswer: 0,
    explanation: "Operator precedence defines the priority of operators when an expression contains multiple distinct operators, determining which operation is computed first.",
    explanationBn: "অপারেটর প্রেসিডেন্স বা প্রাধান্য নির্দেশ করে যে একাধিক ভিন্ন ধরনের অপারেটর উপস্থিত থাকলে কোন অপারেশনটি আগে সম্পন্ন হবে।",
    hint: "Think about BODMAS/PEMDAS in mathematics."
  },
  {
    id: 2,
    question: "What is operator associativity in Java?",
    options: [
      "The direction (Left-to-Right or Right-to-Left) in which operators of EQUAL precedence are evaluated.",
      "The compatibility of data types with an operator.",
      "The ability of an operator to work on strings.",
      "The priority difference between integers and floats."
    ],
    correctAnswer: 0,
    explanation: "Associativity dictates whether operators with the same precedence level are evaluated from Left-to-Right or from Right-to-Left.",
    explanationBn: "অ্যাসোসিয়েটিভিটি নির্ধারণ করে যে সমান প্রাধান্যের অপারেটরগুলো বাম-থেকে-ডানে নাকি ডান-থেকে-বামে মূল্যায়িত হবে।",
    hint: "Resolves ties between operators of the same rank."
  },
  {
    id: 3,
    question: "Which of the following operators has the HIGHEST precedence in Java?",
    options: [
      "Parentheses `()` and postfix `++` / `--`",
      "Multiplication `*`",
      "Addition `+`",
      "Assignment `=`"
    ],
    correctAnswer: 0,
    explanation: "Parentheses `()` and postfix increment/decrement operators occupy the top tier of operator precedence in Java.",
    explanationBn: "জাভায় বন্ধনী `()` এবং পোস্টফিক্স ইনক্রিমেন্ট/ডিক্রিমেন্ট অপারেটরের প্রাধান্য সবার শীর্ষে।",
    hint: "Brackets and postfix come first."
  },
  {
    id: 4,
    question: "What is the result of evaluating the Java expression: `100 / 10 * 2`?",
    options: [
      "20",
      "5",
      "100",
      "0"
    ],
    correctAnswer: 0,
    explanation: "Division `/` and multiplication `*` have EQUAL precedence and their associativity is Left-to-Right. Thus: `(100 / 10) * 2 = 10 * 2 = 20` (NOT `100 / 20 = 5`!).",
    explanationBn: "ভাগ ও গুণের প্রাধান্য সমান এবং এদের দিক হলো বাম-থেকে-ডান। ফলে প্রথমে `(100 / 10) = 10` হয় এবং পরে `10 * 2 = 20` হয়।",
    hint: "Left to right: divide first, then multiply."
  },
  {
    id: 5,
    question: "What is the associativity of assignment operators (`=`, `+=`, `-=`, `*=`, `/=`) in Java?",
    options: [
      "Right-to-Left",
      "Left-to-Right",
      "Top-to-Bottom",
      "Bidirectional"
    ],
    correctAnswer: 0,
    explanation: "Assignment operators are evaluated from Right-to-Left. For example, `a = b = c = 5;` evaluates as `a = (b = (c = 5));`.",
    explanationBn: "অ্যাসাইনমেন্ট অপারেটরের মূল্যায়ন দিক হলো ডান-থেকে-বামে (Right-to-Left)।",
    hint: "Rightmost value is assigned first."
  },
  {
    id: 6,
    question: "Given `int a, b, c; a = b = c = 10 + 5;`, what are the values of `a`, `b`, and `c`?",
    options: [
      "a = 15, b = 15, c = 15",
      "a = 10, b = 10, c = 15",
      "a = 15, b = 0, c = 0",
      "Compilation error"
    ],
    correctAnswer: 0,
    explanation: "`10 + 5` evaluates to 15. Due to Right-to-Left associativity: `c = 15`, then `b = 15`, then `a = 15`.",
    explanationBn: "প্রথমে `10 + 5 = 15` মূল্যায়িত হয়। এরপর ডান-থেকে-বামে c=15, b=15 এবং a=15 অ্যাসাইন হয়।",
    hint: "Chained assignment flows right to left."
  },
  {
    id: 7,
    question: "Which operator between `&&` (Logical AND) and `||` (Logical OR) has higher precedence in Java?",
    options: [
      "`&&` has higher precedence than `||`",
      "`||` has higher precedence than `&&`",
      "Both have identical precedence",
      "Precedence depends on operand order"
    ],
    correctAnswer: 0,
    explanation: "In Java, Logical AND (`&&`) has higher precedence than Logical OR (`||`). `a || b && c` is evaluated as `a || (b && c)`.",
    explanationBn: "জাভায় Logical AND (`&&`) এর প্রাধান্য Logical OR (`||`) এর চেয়ে বেশি।",
    hint: "AND is like multiplication, OR is like addition."
  },
  {
    id: 8,
    question: "What is the evaluated result of: `true || false && false`?",
    options: [
      "true",
      "false",
      "Compile error",
      "null"
    ],
    correctAnswer: 0,
    explanation: "Because `&&` has higher precedence than `||`, Java evaluates `false && false` which is `false`. Then `true || false` evaluates to `true`. Alternatively, short-circuit OR sees `true` first.",
    explanationBn: "`&&` এর প্রাধান্য বেশি হওয়ায় `false && false` $\\to$ false, এবং শেষে `true || false` $\\to$ true হয়।",
    hint: "&& binds first, or short-circuit evaluates true first."
  },
  {
    id: 9,
    question: "What is the result of the expression: `10 + 20 * 30 / 10 - 5`?",
    options: [
      "65",
      "85",
      "75",
      "90"
    ],
    correctAnswer: 0,
    explanation: "1) `20 * 30 = 600`. 2) `600 / 10 = 60`. 3) `10 + 60 = 70`. 4) `70 - 5 = 65`.",
    explanationBn: "১) 20 * 30 = 600; ২) 600 / 10 = 60; ৩) 10 + 60 = 70; ৪) 70 - 5 = 65।",
    hint: "Multiplication and division first (L to R), then addition and subtraction."
  },
  {
    id: 10,
    question: "Which of the following unary operators has Right-to-Left associativity in Java?",
    options: [
      "Prefix increment `++`, unary minus `-`, and logical NOT `!`",
      "Multiplication `*` and division `/`",
      "Equality `==` and inequality `!=`",
      "Relational `<` and `>`"
    ],
    correctAnswer: 0,
    explanation: "All unary operators (prefix `++`, prefix `--`, `+`, `-`, `!`, `~`, casts) associate from Right to Left.",
    explanationBn: "সমস্ত ইউনারি অপারেটর (যেমন `++`, `--`, `-`, `!`) ডান-থেকে-বামে (Right-to-Left) মূল্যায়িত হয়।",
    hint: "Prefix and unary signs associate Right to Left."
  },
  {
    id: 11,
    question: "What does the expression `!true == false` evaluate to?",
    options: [
      "true",
      "false",
      "Compile-time error",
      "0"
    ],
    correctAnswer: 0,
    explanation: "Unary `!` has higher precedence than equality `==`. Thus `!true` evaluates to `false`, and `false == false` evaluates to `true`.",
    explanationBn: "ইউনারি `!` এর প্রাধান্য `==` এর চেয়ে বেশি। তাই `!true` $\\to$ false হয়, এবং `false == false` এর ফল true।",
    hint: "NOT comes before equality."
  },
  {
    id: 12,
    question: "What is the result of the Java expression: `15 % 4 * 2`?",
    options: [
      "6",
      "0",
      "1",
      "7"
    ],
    correctAnswer: 0,
    explanation: "`%` and `*` have EQUAL precedence, evaluated Left-to-Right. Step 1: `15 % 4 = 3`. Step 2: `3 * 2 = 6`.",
    explanationBn: "`%` এবং `*` উভয়ের প্রাধান্য সমান (বাম-থেকে-ডান)। প্রথমে `15 % 4 = 3`, পরে `3 * 2 = 6`।",
    hint: "15 % 4 = 3, then 3 * 2."
  },
  {
    id: 13,
    question: "Which of the following represents the correct precedence order from HIGHEST to LOWEST?",
    options: [
      "Postfix `++` -> Multiplicative `*` -> Additive `+` -> Relational `<` -> Logical `&&` -> Assignment `=`",
      "Assignment `=` -> Logical `&&` -> Relational `<` -> Additive `+` -> Multiplicative `*`",
      "Additive `+` -> Multiplicative `*` -> Postfix `++` -> Assignment `=`",
      "Logical `&&` -> Relational `<` -> Multiplicative `*` -> Postfix `++`"
    ],
    correctAnswer: 0,
    explanation: "The hierarchy flows: Postfix -> Unary -> Multiplicative -> Additive -> Shift -> Relational -> Equality -> Bitwise -> Logical -> Ternary -> Assignment.",
    explanationBn: "সঠিক ক্রম: পোস্টফিক্স -> ইউনারি -> গুণ/ভাগ -> যোগ/বিয়োগ -> রিলেশনাল -> লজিক্যাল -> অ্যাসাইনমেন্ট।",
    hint: "Arithmetic before Relational, Relational before Logical, Assignment last."
  },
  {
    id: 14,
    question: "What is the output of the following Java code?\nint a = 5, b = 2;\nint res = a + b * a / b - b;\nSystem.out.println(res);",
    options: [
      "8",
      "10",
      "6",
      "5"
    ],
    correctAnswer: 0,
    explanation: "`b * a = 2 * 5 = 10`. Then `10 / b = 10 / 2 = 5`. Then `a + 5 = 5 + 5 = 10`. Finally `10 - b = 10 - 2 = 8`.",
    explanationBn: "২ * ৫ = ১০; ১০ / ২ = ৫; ৫ + ৫ = ১০; ১০ - ২ = ৮।",
    hint: "Step-by-step: 2*5/2 = 5; 5+5-2 = 8."
  },
  {
    id: 15,
    question: "How can a programmer force Java to evaluate addition before multiplication?",
    options: [
      "By placing the addition in parentheses: `(a + b) * c`",
      "By declaring the variables as float",
      "By placing the `+` at the start of the line",
      "Java never allows addition before multiplication"
    ],
    correctAnswer: 0,
    explanation: "Parentheses `(...)` have the absolute highest precedence and explicitly override natural operator precedence.",
    explanationBn: "বন্ধনী `(...)` এর প্রাধান্য সর্বোচ্চ, যা যেকোনো স্বাভাবিক অগ্রাধিকার পরিবর্তন করতে পারে।",
    hint: "Use parentheses."
  },
  {
    id: 16,
    question: "What is the value of `z` in: `int x = 2, y = 3; int z = x > y ? x : y + 4;`?",
    options: [
      "7",
      "2",
      "3",
      "4"
    ],
    correctAnswer: 0,
    explanation: "Relational `>` and additive `+` have higher precedence than ternary `? :`. `x > y` is `2 > 3` (false). So the false branch `y + 4 = 3 + 4 = 7` is returned.",
    explanationBn: "`2 > 3` মিথ্যা (false), তাই false শাখা `3 + 4 = 7` মূল্যায়িত হয়।",
    hint: "False branch is chosen."
  },
  {
    id: 17,
    question: "What is the associativity of the ternary conditional operator (`? :`) in Java?",
    options: [
      "Right-to-Left",
      "Left-to-Right",
      "Non-associative",
      "Circular"
    ],
    correctAnswer: 0,
    explanation: "The ternary operator `? :` associates from Right to Left, allowing nested conditionals like `a ? b : c ? d : e` to be parsed as `a ? b : (c ? d : e)`.",
    explanationBn: "টার্নারি অপারেটর (`? :`) ডান-থেকে-বামে (Right-to-Left) অ্যাসোসিয়েটিভ।",
    hint: "Like assignment, ternary goes right to left."
  },
  {
    id: 18,
    question: "In the expression `12 - 4 - 2`, what is the result and why?",
    options: [
      "6, because `-` is Left-to-Right associative: `(12 - 4) - 2 = 8 - 2 = 6`",
      "10, because `-` is Right-to-Left associative: `12 - (4 - 2) = 12 - 2 = 10`",
      "0",
      "4"
    ],
    correctAnswer: 0,
    explanation: "Subtraction is Left-to-Right associative. Therefore: `(12 - 4) - 2 = 8 - 2 = 6`.",
    explanationBn: "বিয়োগ অপারেটর বাম-থেকে-ডানে মূল্যায়িত হয়: `(12 - 4) - 2 = 8 - 2 = 6`।",
    hint: "Left to right: 12 - 4 is 8, 8 - 2 is 6."
  },
  {
    id: 19,
    question: "What is the result of `5 + 2 == 7 && 10 / 2 == 5`?",
    options: [
      "true",
      "false",
      "Compilation error",
      "1"
    ],
    correctAnswer: 0,
    explanation: "Precedence: Arithmetic (`+`, `/`) > Equality (`==`) > Logical AND (`&&`). 1) `5 + 2 = 7`, `10 / 2 = 5`. 2) `7 == 7` is true, `5 == 5` is true. 3) `true && true` is `true`.",
    explanationBn: "প্রথমে গাণিতিক হিসাব: ৫+২=৭, ১০/২=৫; এরপর সমতা: ৭==৭ (true), ৫==৫ (true); শেষে true && true $\\to$ true।",
    hint: "Arithmetic first, then equality, then logical AND."
  },
  {
    id: 20,
    question: "What does the Java expression `x = y = 20` evaluate to, and what is stored in `x`?",
    options: [
      "20 is stored in both x and y, and the expression value is 20.",
      "x receives 20, y remains null.",
      "y receives 20, x is false.",
      "Compile-time error."
    ],
    correctAnswer: 0,
    explanation: "Assignment returns the value assigned. `y = 20` assigns 20 to `y` and yields 20. Then `x = 20` assigns 20 to `x`.",
    explanationBn: "অ্যাসাইনমেন্ট ডান-থেকে-বামে কাজ করে: `y = 20` হওয়ার পর সেই 20 মানটি `x`-এ জমা হয়।",
    hint: "Value assigned is propagated."
  },
  {
    id: 21,
    question: "What is the result of `30 / 5 * 2 + 10 % 3`?",
    options: [
      "13",
      "14",
      "4",
      "12"
    ],
    correctAnswer: 0,
    explanation: "1) `30 / 5 = 6`. 2) `6 * 2 = 12`. 3) `10 % 3 = 1`. 4) `12 + 1 = 13`.",
    explanationBn: "১) 30 / 5 = 6; ২) 6 * 2 = 12; ৩) 10 % 3 = 1; ৪) 12 + 1 = 13।",
    hint: "30/5*2 = 12, 10%3 = 1, 12+1 = 13."
  },
  {
    id: 22,
    question: "Which category of operators has the LOWEST precedence among all Java operators?",
    options: [
      "Assignment operators (`=`, `+=`, `-=`, etc.)",
      "Logical OR (`||`)",
      "Ternary operator (`? :`)",
      "Relational operators (`<`, `>`)"
    ],
    correctAnswer: 0,
    explanation: "Assignment operators (`=`, `+=`, `-=`, `*=`, `/=`, `%=`, etc.) have the lowest precedence in the entire Java language.",
    explanationBn: "জাভায় অ্যাসাইনমেন্ট অপারেটরগুলোর প্রাধান্য সবার চেয়ে কম।",
    hint: "Assignment happens at the very end."
  },
  {
    id: 23,
    question: "Given `int x = 4; int y = ++x * 3;`. What are `x` and `y`?",
    options: [
      "x = 5, y = 15",
      "x = 4, y = 12",
      "x = 5, y = 12",
      "x = 4, y = 15"
    ],
    correctAnswer: 0,
    explanation: "Unary prefix `++` has higher precedence than `*`. `++x` increments `x` to 5 immediately. Then `5 * 3 = 15`. Thus `x = 5, y = 15`.",
    explanationBn: "প্রিফিক্স `++` এর প্রাধান্য গুণের চেয়ে বেশি। x বেড়ে ৫ হয় এবং ৫ * ৩ = ১৫ হয়।",
    hint: "Prefix ++ runs before multiplication."
  },
  {
    id: 24,
    question: "Given `int x = 4; int y = x++ * 3;`. What are `x` and `y`?",
    options: [
      "x = 5, y = 12",
      "x = 5, y = 15",
      "x = 4, y = 12",
      "x = 4, y = 15"
    ],
    correctAnswer: 0,
    explanation: "Postfix `x++` has highest operator binding, but its original value (4) is supplied to the multiplication: `4 * 3 = 12`. Then `x` is incremented to 5.",
    explanationBn: "পোস্টফিক্স `x++` এর বর্তমান মান ৪ গুণের কাজে লাগে: ৪ * ৩ = ১২। এরপর x বেড়ে ৫ হয়।",
    hint: "Current value 4 is multiplied, then x becomes 5."
  },
  {
    id: 25,
    question: "Why should developers and students use parentheses even when operator precedence is well-defined?",
    options: [
      "To improve code readability, prevent subtle precedence bugs, and ensure clear intent across compilers.",
      "Because Java refuses to compile expressions without parentheses.",
      "Because parentheses make code execute twice as fast.",
      "To prevent garbage collection from cleaning variables early."
    ],
    correctAnswer: 0,
    explanation: "Parentheses eliminate ambiguity, make mathematical intent explicit to maintainers and examiners, and reduce cognitive load and mistakes during exams.",
    explanationBn: "বন্ধনী ব্যবহার করলে কোডের স্পষ্টতা বাড়ে, ভুল বোঝাবুঝি দূর হয় এবং পরীক্ষার খাতায় নিখুঁত উত্তর নিশ্চিত করা যায়।",
    hint: "Clarity and error prevention."
  }
];

export default topic7_questions;
