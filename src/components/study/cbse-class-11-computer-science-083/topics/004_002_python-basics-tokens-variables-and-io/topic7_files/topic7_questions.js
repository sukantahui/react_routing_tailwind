export const topic7Questions = [
  {
    id: "t7_q1",
    question: "What is the primary operational direction of the assignment operator `=` in Python?",
    options: [
      "Unidirectional from Right to Left (RHS is evaluated first, then bound to LHS)",
      "Unidirectional from Left to Right",
      "Bidirectional like mathematical equations",
      "Random"
    ],
    correct: 0,
    explanationEn: "Python assignment executes strictly from right to left: the RHS expression is fully evaluated first before binding to the LHS target.",
    explanationBn: "পাইথনে অ্যাসাইনমেন্ট সর্বদা ডান থেকে বামে কাজ করে: ডানপাশের মান আগে গণনা করা হয়, তারপর বামপাশের চলকে যুক্ত হয়।"
  },
  {
    id: "t7_q2",
    question: "What is the assignment style `a = b = c = 100` called in Python?",
    options: [
      "Chained Assignment (Multiple Target Assignment)",
      "Nested Assignment",
      "Recursive Assignment",
      "Tuple Assignment"
    ],
    correct: 0,
    explanationEn: "`a = b = c = 100` is chained assignment, binding multiple identifier targets to the same evaluated r-value.",
    explanationBn: "`a = b = c = 100` হলো চেইনড অ্যাসাইনমেন্ট, যেখানে একই মান একাধিক চলকে একসাথে নির্ধারণ করা হয়।"
  },
  {
    id: "t7_q3",
    question: "How do you swap the values of two variables `a` and `b` in Python without using a third temporary variable?",
    options: [
      "`a, b = b, a`",
      "`a = b`",
      "`swap(a, b)`",
      "`a == b`"
    ],
    correct: 0,
    explanationEn: "Simultaneous assignment `a, b = b, a` creates a temporary tuple `(b, a)` on the RHS and unpacks it into `a` and `b` cleanly.",
    explanationBn: "পাইথনে কোনো তৃতীয় চলক ছাড়াই মান অদলবদল করার উপায় হলো `a, b = b, a`।"
  },
  {
    id: "t7_q4",
    question: "Given `x = 10`, what will be the value of `x` after `x += 5 * 2`?",
    options: [
      "20 (since 5*2=10 is evaluated first, then x = 10 + 10 = 20)",
      "30",
      "25",
      "100"
    ],
    correct: 0,
    explanationEn: "The entire RHS expression `5 * 2 = 10` is evaluated before the addition assignment: `x = 10 + 10 = 20`.",
    explanationBn: "ডানপাশের গুণ আগে হবে: ৫ * ২ = ১০, তারপর ১০ + ১০ = ২০।"
  },
  {
    id: "t7_q5",
    question: "What error occurs if you execute `a, b = 10, 20, 30` in Python?",
    options: [
      "`ValueError: too many values to unpack (expected 2)`",
      "`SyntaxError`",
      "`TypeError`",
      "`IndexError`"
    ],
    correct: 0,
    explanationEn: "Python expects exactly 2 values to unpack into `a` and `b`, but 3 values were provided, triggering a `ValueError`.",
    explanationBn: "বামপাশে ২টি চলক কিন্তু ডানপাশে ৩টি মান থাকলে `ValueError: too many values to unpack` দেখা দেয়।"
  },
  {
    id: "t7_q6",
    question: "What error occurs if you execute `a, b, c = 10, 20`?",
    options: [
      "`ValueError: not enough values to unpack (expected 3, got 2)`",
      "`SyntaxError`",
      "`TypeError`",
      "`NameError`"
    ],
    correct: 0,
    explanationEn: "When the number of l-value variables exceeds the number of r-value expressions, Python raises `ValueError: not enough values to unpack`.",
    explanationBn: "চলকের সংখ্যা মানের চেয়ে বেশি হলে `ValueError: not enough values to unpack` ঘটে।"
  },
  {
    id: "t7_q7",
    question: "Consider: `p, q = 5, 10; p, q = q, p + q`. What are the final values of `p` and `q`?",
    options: [
      "`p = 10, q = 15`",
      "`p = 10, q = 20`",
      "`p = 5, q = 15`",
      "`p = 15, q = 10`"
    ],
    correct: 0,
    explanationEn: "RHS `(q, p + q)` evaluates to `(10, 5 + 10) = (10, 15)` using old values. Unpacking assigns `p = 10` and `q = 15`.",
    explanationBn: "ডানপাশে `(q, p + q)` এর মান হয় `(১০, ৫ + ১০) = (১০, ১৫)`। ফলে `p = ১০` এবং `q = ১৫`।"
  },
  {
    id: "t7_q8",
    question: "What does the extended starred unpacking statement `first, *rest = [1, 2, 3, 4, 5]` produce?",
    options: [
      "`first = 1` and `rest = [2, 3, 4, 5]`",
      "`first = [1, 2]` and `rest = [3, 4, 5]`",
      "`first = 1` and `rest = 5`",
      "`SyntaxError`"
    ],
    correct: 0,
    explanationEn: "The starred target `*rest` gathers all remaining sequence elements into a list: `first = 1`, `rest = [2, 3, 4, 5]`.",
    explanationBn: "`*rest` বাকি সব উপাদানকে লিস্ট আকারে ধারণ করে: `first = ১`, `rest = [২, ৩, ৪, ৫]`।"
  },
  {
    id: "t7_q9",
    question: "What is the value of `n` after: `n = 20; n //= 3`?",
    options: [
      "6 (integer floor division)",
      "6.666",
      "2",
      "0"
    ],
    correct: 0,
    explanationEn: "`n //= 3` is floor division: 20 // 3 = 6.",
    explanationBn: "`n //= 3` হলো ফ্লোর ডিভিশন অ্যাসাইনমেন্ট: ২০ // ৩ = ৬।"
  },
  {
    id: "t7_q10",
    question: "What is the value of `p` after: `p = 2; p **= 3`?",
    options: [
      "8 (2 raised to power 3)",
      "6",
      "9",
      "16"
    ],
    correct: 0,
    explanationEn: "`p **= 3` is exponentiation assignment: 2 ** 3 = 8.",
    explanationBn: "`p **= 3` হলো ঘাত বা এক্সপোনেন্ট অ্যাসাইনমেন্ট: ২ ** ৩ = ৮।"
  },
  {
    id: "t7_q11",
    question: "Why is `x + 1 = 10` invalid in Python?",
    options: [
      "Because `x + 1` is an evaluated arithmetic expression, which cannot serve as an l-value target",
      "Because 10 is not a prime number",
      "Because + is not recognized",
      "Because x is undefined"
    ],
    correct: 0,
    explanationEn: "Expressions on the LHS cannot hold memory bindings, triggering `SyntaxError: cannot assign to expression`.",
    explanationBn: "বামপাশে গাণিতিক এক্সপ্রেশন থাকা অবৈধ কারণ এটি কোনো মেমরি টার্গেট নয়।"
  },
  {
    id: "t7_q12",
    question: "What will be printed by:\na = 5\nb = a\na = 10\nprint(b)",
    options: [
      "5",
      "10",
      "15",
      "None"
    ],
    correct: 0,
    explanationEn: "`b` continues pointing to the original integer object `5` after `a` is rebound to `10`. Output is 5.",
    explanationBn: "`a` নতুন মান ১০-এ পরিবর্তিত হলেও `b` তার আগের অবজেক্ট ৫-কেই নির্দেশ করে। আউটপুট: ৫।"
  },
  {
    id: "t7_q13",
    question: "What is the difference between `lst.append(4)` and `lst = lst + [4]` regarding memory address?",
    options: [
      "`append(4)` mutates the existing list in-place (same `id()`), while `lst + [4]` creates a brand new list at a new address",
      "Both create new lists",
      "Both modify in-place",
      "`append()` is slower"
    ],
    correct: 0,
    explanationEn: "In-place mutation via `append()` keeps the same list object; concatenation `+` creates a new object in memory.",
    explanationBn: "`append()` একই মেমরিতে লিস্ট পরিবর্তন করে, আর `+` নতুন লিস্ট অবজেক্ট তৈরি করে।"
  },
  {
    id: "t7_q14",
    question: "What is the output of `a = 10; a %= 4; print(a)`?",
    options: [
      "2 (10 % 4 remainder)",
      "2.5",
      "0",
      "4"
    ],
    correct: 0,
    explanationEn: "`a %= 4` calculates remainder: 10 % 4 = 2.",
    explanationBn: "`a %= 4` ভাগশেষ বের করে: ১০ % ৪ = ২।"
  },
  {
    id: "t7_q15",
    question: "Consider: `a, b, c = 1, 2, 3; a, b, c = c, a, b`. What are the final values of (a, b, c)?",
    options: [
      "`(3, 1, 2)`",
      "`(1, 2, 3)`",
      "`(2, 3, 1)`",
      "`(3, 2, 1)`"
    ],
    correct: 0,
    explanationEn: "RHS evaluates to `(3, 1, 2)`. Unpacking sets `a = 3`, `b = 1`, `c = 2`.",
    explanationBn: "ডানপাশের মান `(৩, ১, ২)` যথাক্রমে `a`, `b`, এবং `c`-তে নির্ধারিত হয়।"
  },
  {
    id: "t7_q16",
    question: "What does `x = y = [1, 2]` do in memory?",
    options: [
      "Creates a SINGLE list object in memory, and binds both `x` and `y` to that shared list",
      "Creates two separate lists with separate IDs",
      "Raises SyntaxError",
      "Creates a tuple"
    ],
    correct: 0,
    explanationEn: "Chained assignment creates only one list object, causing `x` and `y` to be aliases pointing to the same memory address.",
    explanationBn: "চেইনড অ্যাসাইনমেন্ট একটিমাত্র লিস্ট অবজেক্ট তৈরি করে যাতে `x` ও `y` উভয়ই একই মেমরি নির্দেশ করে।"
  },
  {
    id: "t7_q17",
    question: "In the previous Question 16, if we now execute `x.append(3)`, what will `print(y)` output?",
    options: [
      "`[1, 2, 3]` (because y points to the exact same shared list object)",
      "`[1, 2]`",
      "`[3]`",
      "`Error`"
    ],
    correct: 0,
    explanationEn: "Because `x` and `y` share the same mutable list object, mutating `x` is immediately visible through `y`.",
    explanationBn: "যেহেতু `x` ও `y` একই মিউটেবল লিস্ট শেয়ার করে, তাই `x`-এ পরিবর্তন করলে `y`-তেও `[1, 2, 3]` প্রদর্শিত হয়।"
  },
  {
    id: "t7_q18",
    question: "Can an assignment statement be used directly inside an `if` conditional expression without walrus operator `:=`?",
    options: [
      "No, standard assignment `=` is a statement and raises `SyntaxError: invalid syntax` if used as an expression",
      "Yes, Python works like C language",
      "Only for integers",
      "Only in Python 2"
    ],
    correct: 0,
    explanationEn: "In Python, `=` is a statement, not an expression. Writing `if x = 5:` is a SyntaxError. Use `==` for comparison or `:=` for assignment expressions.",
    explanationBn: "পাইথনে `=` একটি স্টেটমেন্ট, তাই `if x = 5:` লিখলে `SyntaxError` হয়।"
  },
  {
    id: "t7_q19",
    question: "What is the output of `x = 5; x *= 3 + 2`?",
    options: [
      "25 (since 3+2=5 is evaluated first, then x = 5 * 5 = 25)",
      "17 (5 * 3 + 2)",
      "15",
      "10"
    ],
    correct: 0,
    explanationEn: "In augmented assignment `x *= RHS`, the RHS `(3 + 2 = 5)` is fully evaluated first, giving `x = 5 * 5 = 25`.",
    explanationBn: "ডানপাশের যোগ আগে হয়: ৩ + ২ = ৫, তারপর ৫ * ৫ = ২৫।"
  },
  {
    id: "t7_q20",
    question: "Which of the following is equivalent to `a = a - (b + c)`?",
    options: [
      "`a -= b + c`",
      "`a = -b + c`",
      "`a -= b - c`",
      "`a =+ b + c`"
    ],
    correct: 0,
    explanationEn: "`a -= b + c` automatically places parentheses around the RHS expression, evaluating `(b + c)` first.",
    explanationBn: "`a -= b + c` সরাসরি `a = a - (b + c)` এর সমতুল্য।"
  },
  {
    id: "t7_q21",
    question: "What will `a, *b, c = [10, 20, 30, 40, 50]` assign to `b`?",
    options: [
      "`[20, 30, 40]`",
      "`20`",
      "`[10, 20, 30]`",
      "`50`"
    ],
    correct: 0,
    explanationEn: "`a` takes `10`, `c` takes `50`, and the middle starred variable `*b` collects `[20, 30, 40]`.",
    explanationBn: "`a = ১০`, `c = ৫০`, এবং মাঝের `*b` উপাদানগুলো নিয়ে `[২০, ৩০, ৪০]` হয়।"
  },
  {
    id: "t7_q22",
    question: "What error occurs if you include TWO starred expressions in an unpacking assignment (e.g. `*a, *b = [1, 2, 3]`)?",
    options: [
      "`SyntaxError: multiple starred expressions in assignment`",
      "`ValueError`",
      "`TypeError`",
      "`IndexError`"
    ],
    correct: 0,
    explanationEn: "Python syntax allows at most ONE starred target in an unpacking assignment.",
    explanationBn: "একটি আনপ্যাকিং স্টেটমেন্টে একাধিক স্টারযুক্ত এক্সপ্রেশন থাকলে `SyntaxError` হয়।"
  },
  {
    id: "t7_q23",
    question: "What is the value of `s` after: `s = 'Hi'; s += '!'`?",
    options: [
      "`'Hi!'`",
      "`'Hi'`",
      "`TypeError`",
      "`None`"
    ],
    correct: 0,
    explanationEn: "Augmented assignment `+=` on strings performs string concatenation, resulting in `'Hi!'`.",
    explanationBn: "স্ট্রিংয়ের ক্ষেত্রে `+=` অপারেটর জোড়া লাগানোর (Concatenation) কাজ করে: `'Hi!'`।"
  },
  {
    id: "t7_q24",
    question: "What is the token classification of the `=` symbol?",
    options: [
      "Simple Assignment Operator",
      "Relational Operator",
      "Logical Operator",
      "Arithmetic Operator"
    ],
    correct: 0,
    explanationEn: "The single equals sign `=` is strictly the Simple Assignment Operator.",
    explanationBn: "একক সমান চিহ্ন `=` হলো সিম্পল অ্যাসাইনমেন্ট অপারেটর।"
  },
  {
    id: "t7_q25",
    question: "Why does Python evaluate all RHS expressions before performing any LHS bindings in multiple assignment `a, b = b, a`?",
    options: [
      "To prevent partial mutations from corrupting intermediate variable values during simultaneous assignments",
      "To make Python slower",
      "Because the CPU requires it",
      "To save battery power"
    ],
    correct: 0,
    explanationEn: "Evaluating all RHS values first into a temporary tuple guarantees that neither variable's old value is overwritten prematurely.",
    explanationBn: "ডানপাশের মানগুলো আগে টেম্পোরারি টিউপলে জমা করায় কোনো ভেরিয়েবলের প্রাথমিক মান হারিয়ে যায় না এবং নির্বিঘ্নে সোয়াপিং সম্পন্ন হয়।"
  }
];
