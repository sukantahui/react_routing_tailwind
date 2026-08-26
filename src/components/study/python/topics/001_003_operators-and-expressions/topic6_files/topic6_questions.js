// src/components/study/python/topics/001_003_operators-and-expressions/topic6_files/topic6_questions.js

const questions = [
  {
    question: "What is an expression in Python?",
    shortAnswer: "An expression is any legal combination of values, variables, and operators that evaluates to a single value.",
    explanation: "Unlike a statement which performs an action (such as assignment or branching), an expression always produces and returns a value upon evaluation.",
    hint: "Think about whether it returns a value or performs an instruction.",
    level: "basic",
    codeExample: "result = 5 + 3 * 2  # '5 + 3 * 2' is an expression yielding 11"
  },
  {
    question: "What is the difference between operator precedence and associativity?",
    shortAnswer: "Precedence resolves priority between different operators; associativity resolves direction for tied operators.",
    explanation: "Precedence determines which operator binds first when operators differ (e.g. * vs +). Associativity determines whether evaluation groups Left-to-Right or Right-to-Left when operators have the exact same precedence level.",
    hint: "One resolves different operators, the other resolves tied operators.",
    level: "basic",
    codeExample: "10 + 5 * 2  # Precedence (* before +)\n10 - 4 - 2  # Associativity (Left-to-Right: (10-4)-2)"
  },
  {
    question: "Why does `2 ** 3 ** 2` evaluate to 512 instead of 64?",
    shortAnswer: "Because the exponentiation operator (**) is Right-to-Left associative.",
    explanation: "In `2 ** 3 ** 2`, Python evaluates the rightmost power first: `3 ** 2 = 9`, and then `2 ** 9 = 512`. If it were left-associative, it would be `(2 ** 3) ** 2 = 8 ** 2 = 64`.",
    hint: "Check the associativity of the exponentiation operator.",
    level: "moderate",
    codeExample: "print(2 ** 3 ** 2)      # 512 (2 ** 9)\nprint((2 ** 3) ** 2)    # 64"
  },
  {
    question: "Why does `-3 ** 2` evaluate to -9 in Python?",
    shortAnswer: "Because `**` has higher precedence than unary minus `-`.",
    explanation: "Python parses `-3 ** 2` as `-(3 ** 2) = -9`. To include the negative sign in exponentiation, you must use parentheses: `(-3) ** 2 = 9`.",
    hint: "Think about whether the exponent or the negative sign binds tighter.",
    level: "moderate",
    codeExample: "print(-3 ** 2)     # -9\nprint((-3) ** 2)   # 9"
  },
  {
    question: "What is short-circuit evaluation in logical expressions?",
    shortAnswer: "Stopping evaluation as soon as the overall truth value is determined.",
    explanation: "In `A or B`, if A is True, B is never evaluated. In `A and B`, if A is False, B is never evaluated. This prevents errors like division by zero in conditional expressions.",
    hint: "Does Python evaluate the second condition if the first condition is already conclusive?",
    level: "moderate",
    codeExample: "count = 0\nif count > 0 and (100 / count) > 5:\n    print('Safe!')  # No ZeroDivisionError!"
  },
  {
    question: "How does Python execute chained comparisons like `10 < x < 20`?",
    shortAnswer: "It expands them to `(10 < x) and (x < 20)` with the middle operand evaluated only once.",
    explanation: "Unlike other languages where `10 < x < 20` evaluates `(10 < x) < 20` (comparing a boolean to 20), Python executes it as a logical conjunction, guaranteeing single evaluation of middle expressions.",
    hint: "How does Python rewrite chained operators?",
    level: "moderate",
    codeExample: "x = 15\nprint(10 < x < 20)  # True -> (10 < 15) and (15 < 20)"
  },
  {
    question: "What is the output of `10 + 20 / 5 * 2` and why?",
    shortAnswer: "18.0, because `/` and `*` have equal precedence and evaluate Left-to-Right before `+`.",
    explanation: "1. `20 / 5 = 4.0` (Left-to-Right)\n2. `4.0 * 2 = 8.0`\n3. `10 + 8.0 = 18.0`",
    hint: "Follow PEMDAS/BODMAS with Left-to-Right tie breaking.",
    level: "basic",
    codeExample: "print(10 + 20 / 5 * 2)  # 18.0"
  },
  {
    question: "What is an Abstract Syntax Tree (AST) in expression evaluation?",
    shortAnswer: "A tree representation of the syntactic structure of source code used by the compiler.",
    explanation: "Python parses expressions into an AST where operators are internal nodes and operands are leaf nodes. Evaluation proceeds bottom-up from child nodes to the root.",
    hint: "Think of a hierarchical tree showing which operation executes first.",
    level: "advanced",
    codeExample: "import ast\nprint(ast.dump(ast.parse('10 + 2 * 3', mode='eval')))"
  },
  {
    question: "Why does `0.1 + 0.2 == 0.3` evaluate to False?",
    shortAnswer: "Due to IEEE 754 binary floating-point representation rounding limits.",
    explanation: "0.1 and 0.2 cannot be represented exactly in binary floating point. `0.1 + 0.2` produces `0.30000000000000004`, which is not equal to `0.3`. Use `math.isclose()` instead.",
    hint: "Can computers represent decimal fractions with infinite binary precision?",
    level: "expert",
    codeExample: "import math\nprint(0.1 + 0.2 == 0.3)          # False\nprint(math.isclose(0.1 + 0.2, 0.3)) # True"
  },
  {
    question: "In `f() + g() * h()`, in what order are the functions called?",
    shortAnswer: "f(), then g(), then h() (strictly left-to-right operand evaluation).",
    explanation: "In Python, operand evaluation is strictly Left-to-Right, even though multiplication `*` has higher operator precedence than addition `+`. Python evaluates all operands before executing the operator.",
    hint: "Does precedence change the order in which function arguments/operands are called?",
    level: "expert",
    codeExample: "def f(): print('f'); return 1\ndef g(): print('g'); return 2\ndef h(): print('h'); return 3\n# Output order: f, g, h\nres = f() + g() * h()"
  },
  {
    question: "What is the result of `True or False and False`?",
    shortAnswer: "True, because `and` has higher precedence than `or`.",
    explanation: "1. `False and False` evaluates first to `False`.\n2. `True or False` evaluates to `True`.",
    hint: "Which logical operator has higher precedence: and or or?",
    level: "basic",
    codeExample: "print(True or False and False)    # True\nprint((True or False) and False)  # False"
  },
  {
    question: "What is the return value of `10 or 20`?",
    shortAnswer: "10 (the first truthy value).",
    explanation: "Python's `or` operator returns the first truthy operand it encounters without converting it to boolean True.",
    hint: "What does the short-circuit or operator return?",
    level: "moderate",
    codeExample: "print(10 or 20)      # 10\nprint('' or 'Default') # 'Default'"
  },
  {
    question: "What is the return value of `0 and 'Python'`?",
    shortAnswer: "0 (the first falsy value).",
    explanation: "Python's `and` operator short-circuits on the first falsy operand and returns it directly.",
    hint: "When does and stop evaluating?",
    level: "moderate",
    codeExample: "print(0 and 'Python')    # 0\nprint(5 and 'Python')    # 'Python'"
  },
  {
    question: "Why is `x =+ 5` different from `x += 5`?",
    shortAnswer: "`x =+ 5` assigns positive 5; `x += 5` adds 5 to x.",
    explanation: "`=+` is parsed as assignment `=` followed by unary positive `+5`. `+=` is the augmented addition assignment operator.",
    hint: "Where is the plus sign positioned relative to the equals sign?",
    level: "basic",
    codeExample: "x = 10\nx =+ 5  # x is now 5!\ny = 10\ny += 5  # y is now 15"
  },
  {
    question: "What happens in `a = b = []` when you do `a.append(1)`?",
    shortAnswer: "Both `a` and `b` contain `[1]` because they reference the same list.",
    explanation: "Chained assignment assigns the exact same object reference to both variables from right to left. For mutable types like lists, modifying one affects both.",
    hint: "Do a and b point to the same memory address?",
    level: "moderate",
    codeExample: "a = b = []\na.append(1)\nprint(b)  # [1]"
  },
  {
    question: "What is the result of `1 < 2 < 1` in Python?",
    shortAnswer: "False.",
    explanation: "Python parses it as `(1 < 2) and (2 < 1)`. Since `1 < 2` is True but `2 < 1` is False, `True and False` evaluates to False.",
    hint: "Break the chained comparison into an 'and' expression.",
    level: "moderate",
    codeExample: "print(1 < 2 < 1)  # False"
  },
  {
    question: "How does Python evaluate `not a == b`?",
    shortAnswer: "It evaluates as `not (a == b)` because `==` has higher precedence than `not`.",
    explanation: "Comparison operators have Level 10 precedence, while `not` has Level 11 precedence (lower). So `a == b` is tested first, then inverted.",
    hint: "Does equality or logical NOT bind tighter?",
    level: "moderate",
    codeExample: "a, b = 5, 5\nprint(not a == b)  # False (not True)"
  },
  {
    question: "What is the result of `100 - 40 - 10` and why?",
    shortAnswer: "50, because subtraction is Left-to-Right associative.",
    explanation: "Evaluation order: `(100 - 40) - 10 = 60 - 10 = 50`. If it were right-associative, it would be `100 - (40 - 10) = 100 - 30 = 70`.",
    hint: "Which direction does subtraction evaluate?",
    level: "basic",
    codeExample: "print(100 - 40 - 10)  # 50"
  },
  {
    question: "What is the result of `'10' + 5` in Python?",
    shortAnswer: "TypeError: cannot concatenate 'str' and 'int'.",
    explanation: "Python is strongly typed and does not perform automatic type coercion between strings and numbers during arithmetic operations. You must explicitly convert: `'10' + str(5)` or `int('10') + 5`.",
    hint: "Does Python auto-convert strings to numbers like JavaScript?",
    level: "basic",
    codeExample: "# '10' + 5 -> TypeError\nprint('10' + str(5))  # '105'\nprint(int('10') + 5)  # 15"
  },
  {
    question: "What does `10 // 3` vs `10 / 3` return?",
    shortAnswer: "`10 // 3` returns integer `3`; `10 / 3` returns float `3.3333333333333335`.",
    explanation: "`//` performs floor division (integer quotient), while `/` performs true mathematical division returning a float.",
    hint: "Which division operator gives an integer quotient?",
    level: "basic",
    codeExample: "print(10 // 3)  # 3\nprint(10 / 3)   # 3.3333333333333335"
  },
  {
    question: "What is the output of `-7 // 2` in Python and why?",
    shortAnswer: "-4, because floor division rounds down towards negative infinity.",
    explanation: "`-7 / 2` is `-3.5`. Rounding down towards negative infinity ($\lfloor -3.5 \rfloor$) produces `-4`.",
    hint: "What integer is immediately below -3.5 on the number line?",
    level: "moderate",
    codeExample: "print(-7 // 2)      # -4\nprint(int(-7 / 2))  # -3 (truncates towards zero)"
  },
  {
    question: "What is the Walrus Operator `:=` in Python expressions?",
    shortAnswer: "The assignment expression operator, introduced in Python 3.8.",
    explanation: "It assigns values to variables as part of a larger expression, allowing value assignment within conditional checks or while loops.",
    hint: "Which operator looks like the eyes and tusks of a walrus?",
    level: "advanced",
    codeExample: "if (n := len('Python')) > 4:\n    print(f'Length is {n}')"
  },
  {
    question: "What is the result of `10 & 12 | 3`?",
    shortAnswer: "11, because bitwise `&` has higher precedence than bitwise `|`.",
    explanation: "1. `10 & 12 = 8` (1010 & 1100 = 1000)\n2. `8 | 3 = 11` (1000 | 0011 = 1011)",
    hint: "Does bitwise AND execute before bitwise OR?",
    level: "advanced",
    codeExample: "print(10 & 12 | 3)  # 11"
  },
  {
    question: "Why is `if x == 1 or 2:` a dangerous bug?",
    shortAnswer: "Because it evaluates as `(x == 1) or 2`, which is always truthy because `2` is truthy.",
    explanation: "Even if `x` is 99, `x == 1` is False, but `False or 2` evaluates to `2` (truthy), so the if-block ALWAYS runs. The correct syntax is `if x == 1 or x == 2:` or `if x in (1, 2):`.",
    hint: "How does Python group conditions around 'or'?",
    level: "moderate",
    codeExample: "x = 99\nif x == 1 or 2:\n    print('Bug: Always executes!')\nif x in (1, 2):\n    print('Correct check')"
  },
  {
    question: "What is the result of `True + True + False` in Python?",
    shortAnswer: "2, because booleans inherit from integers (True=1, False=0).",
    explanation: "In Python, `bool` is a subclass of `int`. In arithmetic operations, `True` converts to `1` and `False` converts to `0`.",
    hint: "What numerical value do True and False have?",
    level: "basic",
    codeExample: "print(True + True + False)  # 2"
  },
  {
    question: "How does Python evaluate conditional ternary expressions `x if C else y`?",
    shortAnswer: "It evaluates condition C first; if True it evaluates x, otherwise y.",
    explanation: "Only the relevant branch is evaluated. When nested (`a if c1 else b if c2 else c`), it associates Right-to-Left.",
    hint: "Does the true branch or the condition evaluate first?",
    level: "moderate",
    codeExample: "score = 85\nstatus = 'Pass' if score >= 40 else 'Fail'\nprint(status)  # Pass"
  },
  {
    question: "What is the result of `(5 + 3 > 7) and (2 * 4 == 8)`?",
    shortAnswer: "True.",
    explanation: "1. `5 + 3 = 8` -> `8 > 7` is True.\n2. `2 * 4 = 8` -> `8 == 8` is True.\n3. `True and True` evaluates to True.",
    hint: "Break the expression down into arithmetic, then relational, then logical.",
    level: "basic",
    codeExample: "print((5 + 3 > 7) and (2 * 4 == 8))  # True"
  },
  {
    question: "What is the result of `4 << 2 + 1` in Python?",
    shortAnswer: "32, because addition `+` has higher precedence than bitwise shift `<<`.",
    explanation: "1. `2 + 1` evaluates first to `3`.\n2. `4 << 3` evaluates to `4 * (2^3) = 4 * 8 = 32`.",
    hint: "Does addition or bitwise shift happen first?",
    level: "expert",
    codeExample: "print(4 << 2 + 1)  # 32 (4 << 3)"
  },
  {
    question: "Why should you use parentheses in complex expressions even when you know operator precedence?",
    shortAnswer: "To improve code readability, eliminate ambiguity, and adhere to PEP 8 standards.",
    explanation: "The Zen of Python states: 'Explicit is better than implicit.' Code is read far more often than it is written. Parentheses prevent cognitive overload and prevent human calculation errors.",
    hint: "Think about team collaboration and maintenance.",
    level: "basic",
    codeExample: "# Ambiguous:\nres = a + b * c / d - e\n# Clear & Explicit:\nres = a + ((b * c) / d) - e"
  },
  {
    question: "How does the built-in `eval()` function evaluate Python expressions dynamically?",
    shortAnswer: "`eval()` parses a string expression into bytecode and executes it in current namespaces.",
    explanation: "`eval(expression, globals, locals)` compiles the string into an expression AST, executes it, and returns the result. It should be used with extreme caution due to security injection risks.",
    hint: "What function executes a Python expression passed as a string?",
    level: "expert",
    codeExample: "expr_str = '10 * 5 + 2'\nprint(eval(expr_str))  # 52"
  }
];

export default questions;
