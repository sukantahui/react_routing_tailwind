const questions = [
  {
    id: 1,
    question: "What statement in Python allows conditional branching execution based on a boolean test?",
    options: ["`if` statement", "`for` statement", "`def` statement", "`import` statement"],
    correctAnswer: 0,
    explanation: "The `if` statement evaluates a condition; if the condition is `True`, the indented block of code is executed.",
    hint: "Conditional branching keyword."
  },
  {
    id: 2,
    question: "What punctuation mark is required at the end of every `if`, `elif`, and `else` header line in Python?",
    options: [": (colon)", "; (semicolon)", "{ (opening brace)", ", (comma)"],
    correctAnswer: 0,
    explanation: "In Python compound statements, every header clause (`if`, `elif`, `else`) must terminate with a colon `:` to introduce an indented suite.",
    hint: "Colon : introduces code blocks."
  },
  {
    id: 3,
    question: "What is the output of the following code?\n```python\nx = 15\nif x > 20:\n    print('A')\nelif x > 10:\n    print('B')\nelif x > 5:\n    print('C')\nelse:\n    print('D')\n```",
    options: ["B", "B\nC", "A\nB\nC", "D"],
    correctAnswer: 0,
    explanation: "In an `if-elif-else` ladder, conditions are evaluated sequentially from top to bottom. The first condition that evaluates to `True` (`x > 10` since 15 > 10) executes its block and immediately skips all subsequent branches. Output is `'B'`.",
    hint: "Only the first true elif branch executes in an if-elif-else ladder."
  },
  {
    id: 4,
    question: "What happens if all conditions in an `if-elif-else` ladder evaluate to `False`?",
    options: [
      "The `else` block executes (if present); otherwise, no block executes and control moves past the ladder.",
      "The program crashes with a ConditionError",
      "The first if block executes anyway",
      "Python enters an infinite loop"
    ],
    correctAnswer: 0,
    explanation: "If all `if` and `elif` tests evaluate to `False`, the optional `else` block is executed as the default fallback pathway.",
    hint: "The else block handles the fallback path."
  },
  {
    id: 5,
    question: "Which of the following is the correct syntax for Python's Conditional Expression (Ternary Operator)?",
    options: [
      "`value_if_true if condition else value_if_false`",
      "`condition ? value_if_true : value_if_false`",
      "`if condition: value_if_true else: value_if_false`",
      "`value_if_true ? condition : value_if_false`"
    ],
    correctAnswer: 0,
    explanation: "Python's ternary operator is formatted as: `x = 'Pass' if marks >= 33 else 'Fail'`.",
    hint: "x if condition else y."
  },
  {
    id: 6,
    question: "What is a 'Nested If' statement?",
    options: [
      "An `if` statement placed entirely inside the body of another `if`, `elif`, or `else` block",
      "Two if statements on the same line",
      "An if statement inside a comment",
      "An if statement imported from a module"
    ],
    correctAnswer: 0,
    explanation: "A nested `if` is an inner conditional statement contained within the indented body of an outer conditional statement.",
    hint: "An if block inside another if block."
  },
  {
    id: 7,
    question: "What is the output of the following nested conditional?\n```python\nscore = 85\nattendance = 92\nif score >= 80:\n    if attendance >= 90:\n        print('Scholarship A')\n    else:\n        print('Scholarship B')\nelse:\n    print('No Scholarship')\n```",
    options: ["Scholarship A", "Scholarship B", "No Scholarship", "Scholarship A\nScholarship B"],
    correctAnswer: 0,
    explanation: "Outer condition `score >= 80` (85 >= 80) is True. Inner condition `attendance >= 90` (92 >= 90) is True. Prints `'Scholarship A'`.",
    hint: "Both outer and inner conditions evaluate to True."
  },
  {
    id: 8,
    question: "Which logical operator short-circuits in `if A and B:` when A is False?",
    options: ["`and`", "`or`", "`not`", "`is`"],
    correctAnswer: 0,
    explanation: "For logical `and`, if the left operand `A` evaluates to `False`, the overall condition can never be True, so Python skips evaluating `B` entirely (short-circuiting).",
    hint: "and short-circuits on False."
  },
  {
    id: 9,
    question: "Which logical operator short-circuits in `if A or B:` when A is True?",
    options: ["`or`", "`and`", "`not`", "`in`"],
    correctAnswer: 0,
    explanation: "For logical `or`, if the left operand `A` evaluates to `True`, the entire condition is guaranteed to be True, so `B` is not evaluated.",
    hint: "or short-circuits on True."
  },
  {
    id: 10,
    question: "What is the leap year determination condition in Python?",
    options: [
      "`(year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)`",
      "`year % 4 == 0`",
      "`year % 100 == 0`",
      "`year % 400 != 0`"
    ],
    correctAnswer: 0,
    explanation: "A year is a leap year if it is divisible by 4 but not by 100, unless it is also divisible by 400.",
    hint: "Divisible by 4 and not 100, or divisible by 400."
  },
  {
    id: 11,
    question: "What is the output of the following code?\n```python\nval = 0\nif val:\n    print('True Branch')\nelse:\n    print('False Branch')\n```",
    options: ["False Branch", "True Branch", "0", "SyntaxError"],
    correctAnswer: 0,
    explanation: "In Python, numeric `0` is treated as boolean `False`. The `else` branch executes, printing `'False Branch'`.",
    hint: "0 is falsy."
  },
  {
    id: 12,
    question: "What is the output of the following code?\n```python\nname = 'Susmita'\nif 's' in name:\n    print('Found lower')\nelif 'S' in name:\n    print('Found Upper')\n```",
    options: ["Found lower", "Found Upper", "Found lower\nFound Upper", "None"],
    correctAnswer: 0,
    explanation: "The character `'s'` exists in `'Susmita'` at index 2 (`Su-s-mita`). The first `if` condition is True and executes, skipping the `elif` branch. Output is `'Found lower'`.",
    hint: "Index 2 has 's', matching the first if branch."
  },
  {
    id: 13,
    question: "What is the output of `status = 'Eligible' if age >= 18 else 'Minor'` when `age = 17`?",
    options: ["'Minor'", "'Eligible'", "False", "None"],
    correctAnswer: 0,
    explanation: "Since `age >= 18` (17 >= 18) is False, the ternary expression returns the fallback value `'Minor'`.",
    hint: "17 is < 18, so Minor is returned."
  },
  {
    id: 14,
    question: "Can an `elif` statement exist without a preceding `if` statement?",
    options: ["No, an `elif` must always follow an `if` statement", "Yes", "Only inside loops", "Only in functions"],
    correctAnswer: 0,
    explanation: "`elif` (short for else-if) is an extension of an `if` block and cannot appear independently without an initial `if` statement.",
    hint: "elif requires a preceding if statement."
  },
  {
    id: 15,
    question: "What is the maximum number of `elif` clauses allowed in a single `if` statement in Python?",
    options: ["Unlimited (as many as needed)", "Only 1", "Maximum 10", "Maximum 256"],
    correctAnswer: 0,
    explanation: "Python places no arbitrary limit on the number of `elif` branches in an `if-elif-else` ladder.",
    hint: "No limit on the number of elif clauses."
  },
  {
    id: 16,
    question: "What is the output of `if None: print('A') else: print('B')`?",
    options: ["B", "A", "None", "SyntaxError"],
    correctAnswer: 0,
    explanation: "`None` is falsy in Python, so the `else` branch executes and prints `'B'`.",
    hint: "None is falsy."
  },
  {
    id: 17,
    question: "What is the output of `x = 10; y = 20; max_val = x if x > y else y; print(max_val)`?",
    options: ["20", "10", "True", "False"],
    correctAnswer: 0,
    explanation: "`10 > 20` is False, so `max_val` is assigned `y` (20).",
    hint: "Ternary expression chooses y."
  },
  {
    id: 18,
    question: "Why does Python rely on indentation rather than curly braces `{}` to define conditional blocks?",
    options: [
      "To enforce code readability, eliminate visual clutter, and avoid mismatched delimiter bugs",
      "Because keyboards don't have curly braces",
      "To make files larger",
      "Because curly braces are used exclusively for sets and dicts"
    ],
    correctAnswer: 0,
    explanation: "Guido van Rossum designed Python to enforce clean visual structure and readability through semantic indentation (the Off-side Rule).",
    hint: "Enforces readability and clean formatting."
  },
  {
    id: 19,
    question: "What error occurs if an `if` statement has an empty body without the `pass` keyword?",
    options: ["IndentationError: expected an indented block", "ZeroDivisionError", "NameError", "ValueError"],
    correctAnswer: 0,
    explanation: "Python expects at least one indented statement following a colon. An empty block raises `IndentationError: expected an indented block`. `pass` can serve as an explicit no-op placeholder.",
    hint: "IndentationError is raised for empty blocks."
  },
  {
    id: 20,
    question: "What is the output of `if 5 in [1, 2, 3, 4]: print('Yes') else: print('No')`?",
    options: ["No", "Yes", "False", "SyntaxError"],
    correctAnswer: 0,
    explanation: "5 is not in the list `[1, 2, 3, 4]`, so the condition is False and prints `'No'`.",
    hint: "5 is not present in the list."
  },
  {
    id: 21,
    question: "What is the output of `x = 50; print('High' if x > 100 else 'Medium' if x > 30 else 'Low')`?",
    options: ["Medium", "High", "Low", "SyntaxError"],
    correctAnswer: 0,
    explanation: "Chained ternary evaluation: `x > 100` (50 > 100) is False. Moves to `('Medium' if x > 30 else 'Low')`. Since `50 > 30` is True, returns `'Medium'`.",
    hint: "Chained ternary expression evaluates to 'Medium'."
  },
  {
    id: 22,
    question: "What is the result of `if (a := 10) > 5: print(a)` in Python 3.8+ (Walrus Operator)?",
    options: ["Prints 10", "SyntaxError", "Prints True", "Prints 5"],
    correctAnswer: 0,
    explanation: "The Walrus operator `:=` assigns `10` to `a` and returns `10`. Since `10 > 5` is True, it prints `10`.",
    hint: "Walrus assignment operator assigns and evaluates in place."
  },
  {
    id: 23,
    question: "What condition tests whether a point $(x, y)$ lies in the First Quadrant of the Cartesian plane?",
    options: ["`x > 0 and y > 0`", "`x > 0 and y < 0`", "`x < 0 and y > 0`", "`x < 0 and y < 0`"],
    correctAnswer: 0,
    explanation: "In Quadrant I, both $x$ and $y$ coordinates are strictly positive ($x > 0$ and $y > 0$).",
    hint: "Both x and y positive."
  },
  {
    id: 24,
    question: "What is the output of `if False == 0: print('Equal')`?",
    options: ["Equal", "Nothing is printed", "TypeError", "False"],
    correctAnswer: 0,
    explanation: "In Python, `bool` is a subclass of `int` where `False == 0` is `True`. Prints `'Equal'`.",
    hint: "False is equal to 0 in Python."
  },
  {
    id: 25,
    question: "Case Study: Debangshu is computing electricity bills in Barrackpore. Units up to 100 are charged at ₹3/unit; next 100 units at ₹5/unit; above 200 units at ₹7/unit. If units = 250, what is the bill?",
    options: ["₹1150", "₹1750", "₹1250", "₹1000"],
    correctAnswer: 0,
    explanation: "First 100 units @ ₹3 = ₹300. Next 100 units @ ₹5 = ₹500. Remaining 50 units (250-200) @ ₹7 = ₹350. Total = 300 + 500 + 350 = ₹1150.",
    hint: "Slab calculation: (100*3) + (100*5) + (50*7) = 300 + 500 + 350 = 1150."
  }
];

export default questions;
