const questions = [
  {
    id: 1,
    question: "What is the smallest individual unit in a Python program called?",
    options: ["Token (Lexical Unit)", "Variable", "Statement", "Function"],
    correctAnswer: 0,
    explanation: "A Token (or Lexical Unit) is the smallest individual element in a program that the Python interpreter recognizes. Python has 5 token categories: Keywords, Identifiers, Literals, Operators, and Punctuators (Delimiters).",
    hint: "Smallest lexical unit."
  },
  {
    id: 2,
    question: "Which of the following is an INVALID Python identifier?",
    options: ["_total_marks", "student_2", "2nd_student", "StudentName"],
    correctAnswer: 2,
    explanation: "Identifiers cannot begin with a digit (0–9). `2nd_student` starts with digit '2', raising a SyntaxError.",
    hint: "Identifiers cannot start with a numeric digit."
  },
  {
    id: 3,
    question: "Which of the following statements about Python's assignment mechanics (l-value and r-value) is TRUE?",
    options: [
      "Both l-value and r-value can be arbitrary arithmetic expressions.",
      "The l-value (left side of =) must be a valid assignable memory target (such as a variable or subscript), while the r-value is an evaluated expression or literal.",
      "The r-value must always be a variable name.",
      "Literals can appear on the left-hand side of an assignment operator."
    ],
    correctAnswer: 1,
    explanation: "In Python assignment (`lvalue = rvalue`), the left-hand side (l-value) must be an assignable memory target (like a variable or list index). Writing an expression or literal on the left (e.g. `a + b = 20` or `100 = score`) raises `SyntaxError: cannot assign to expression / literal`.",
    hint: "l-value is the assignable target location in memory; r-value is the evaluated data value."
  },
  {
    id: 4,
    question: "Which of the following assignment statements will raise a `SyntaxError: cannot assign to expression` due to an l-value violation?",
    options: [
      "total = marks + bonus",
      "p, q = 10, 20",
      "x + y = 50",
      "status = True"
    ],
    correctAnswer: 2,
    explanation: "`x + y = 50` attempts to assign a value to the expression `x + y` on the left-hand side (invalid l-value). Only variable targets can reside on the left side of the assignment operator.",
    hint: "Look for an arithmetic expression on the left of the '=' operator."
  },
  {
    id: 5,
    question: "Which of the following is a Python reserved Keyword?",
    options: ["eval", "lambda", "main", "print"],
    correctAnswer: 1,
    explanation: "`lambda` is a built-in Python keyword used to define anonymous inline functions. `print` and `eval` are built-in functions, not keywords.",
    hint: "lambda is used for anonymous functions."
  },
  {
    id: 6,
    question: "Which three Python keywords begin with an uppercase letter?",
    options: [
      "True, False, None",
      "If, Else, While",
      "For, In, Is",
      "Def, Class, Return"
    ],
    correctAnswer: 0,
    explanation: "In Python 3, exactly three keywords start with a capital letter: `True`, `False`, and `None`. All other Python keywords are written entirely in lowercase.",
    hint: "True, False, None."
  },
  {
    id: 7,
    question: "What does the `input()` function in Python always return?",
    options: [
      "An integer (`int`)",
      "A floating-point number (`float`)",
      "A string (`str`)",
      "The exact data type entered by the user"
    ],
    correctAnswer: 2,
    explanation: "Python's built-in `input()` function reads a line from standard input and ALWAYS returns it as a string (`str`). Explicit type casting (e.g. `int(input())` or `float(input())`) is necessary for mathematical operations.",
    hint: "input() always returns a string (str)."
  },
  {
    id: 8,
    question: "What is the output of the following Python statement?\n`print('CBSE', 'CS', '083', sep='-', end='###')`",
    options: [
      "CBSE-CS-083###",
      "CBSE CS 083-###",
      "CBSE-CS-083\n###",
      "CBSE###CS###083"
    ],
    correctAnswer: 0,
    explanation: "The `sep='-'` parameter inserts a hyphen between printed arguments, and `end='###'` appends '###' instead of the default newline `\n`. Output is `CBSE-CS-083###`.",
    hint: "sep replaces spaces between items; end replaces trailing newline."
  },
  {
    id: 9,
    question: "What is the default value of the `sep` and `end` parameters in the Python `print()` function?",
    options: [
      "sep=' ' (space) and end='\\n' (newline)",
      "sep='' (empty string) and end=' ' (space)",
      "sep='\\t' (tab) and end='\\n' (newline)",
      "sep=',' (comma) and end='\\0' (null)"
    ],
    correctAnswer: 0,
    explanation: "By default, `print()` separates multiple positional arguments with a single space (`sep=' '`) and appends a newline character (`end='\\n'`).",
    hint: "Single space separator and newline terminator."
  },
  {
    id: 10,
    question: "What type of literal is `0b10110` in Python?",
    options: [
      "Binary Integer Literal",
      "Octal Integer Literal",
      "Hexadecimal Literal",
      "Floating Point Literal"
    ],
    correctAnswer: 0,
    explanation: "`0b` or `0B` prefix denotes a Binary Integer Literal in Python. `0b10110` evaluates to integer `22` (16 + 4 + 2).",
    hint: "Prefix 0b denotes binary."
  },
  {
    id: 11,
    question: "What type of literal is `1.45e3` in Python?",
    options: [
      "Floating Point Literal (Scientific / Exponent Notation)",
      "Integer Literal",
      "Complex Literal",
      "String Literal"
    ],
    correctAnswer: 0,
    explanation: "`1.45e3` represents scientific exponent notation for floats: $1.45 \\times 10^3 = 1450.0$ (`float`).",
    hint: "e or E denotes power of 10 in floating-point literals."
  },
  {
    id: 12,
    question: "What is the data type of the special literal `None` in Python?",
    options: ["NoneType", "null", "void", "bool"],
    correctAnswer: 0,
    explanation: "`None` is Python's singleton literal used to indicate the absence of a value or null state. Its type is `NoneType` (`<class 'NoneType'>`).",
    hint: "type(None) is NoneType."
  },
  {
    id: 13,
    question: "Which of the following is a valid multi-line string literal in Python?",
    options: [
      "'''This is a\nmultiline string'''",
      "\"\"\"This is also\nmultiline\"\"\"",
      "Both A and B",
      "None of the above"
    ],
    correctAnswer: 2,
    explanation: "Multi-line strings in Python can be enclosed either in triple single quotes (`'''...'''`) or triple double quotes (`\"\"\"...\"\"\"`).",
    hint: "Triple quotes allow multi-line string literals."
  },
  {
    id: 14,
    question: "What is Dynamic Typing in Python?",
    options: [
      "A feature where variable types are determined dynamically at runtime based on the assigned value, without explicit type declarations",
      "Typing code very quickly on the keyboard",
      "Declaring data types using C syntax",
      "Compiling Python into Java bytecode"
    ],
    correctAnswer: 0,
    explanation: "In Python, variables are dynamic references to objects in memory. A variable `x` can hold an integer `x = 10` and later hold a string `x = 'Hello'` without explicit type declaration.",
    hint: "Variables are untyped references bound dynamically at runtime."
  },
  {
    id: 15,
    question: "What is the output of the following code?\n```python\na, b = 5, 10\na, b = b, a\nprint(a, b)\n```",
    options: ["10 5", "5 10", "10 10", "5 5"],
    correctAnswer: 0,
    explanation: "Python evaluates all r-values on the right side (`b, a` -> `(10, 5)`) into a temporary tuple, and then simultaneously unpacks them into the l-values (`a, b`). The values of `a` and `b` are swapped cleanly.",
    hint: "Tuple packing and simultaneous unpacking swaps values."
  },
  {
    id: 16,
    question: "Which symbol is used for single-line comments in Python?",
    options: ["#", "//", "/*", "--"],
    correctAnswer: 0,
    explanation: "The hash symbol `#` begins a single-line comment in Python. The interpreter ignores all text from `#` to the end of the physical line.",
    hint: "# starts comments in Python."
  },
  {
    id: 17,
    question: "What is the escape sequence for inserting a Tab space and a Newline character in Python strings?",
    options: ["\\t and \\n", "\\b and \\r", "\\a and \\t", "\\s and \\n"],
    correctAnswer: 0,
    explanation: "`\\t` inserts a horizontal tab space (usually 4 or 8 spaces), and `\\n` inserts a newline linefeed character.",
    hint: "\\t is tab, \\n is newline."
  },
  {
    id: 18,
    question: "Which of the following characters is a Delimiter (Punctuator) in Python?",
    options: [": (colon)", ", (comma)", "{ } (curly braces)", "All of the above"],
    correctAnswer: 3,
    explanation: "Delimiters (Punctuators) organize program structure and include parentheses `()`, brackets `[]`, braces `{}`, comma `,`, colon `:`, period `.`, semicolon `;`, and assignment operators.",
    hint: "Punctuation marks used for syntax structuring."
  },
  {
    id: 19,
    question: "What is the output of `print('Python' * 3)`?",
    options: [
      "PythonPythonPython",
      "Python 3",
      "TypeError: cannot multiply sequence",
      "['Python', 'Python', 'Python']"
    ],
    correctAnswer: 0,
    explanation: "The `*` operator applied between a string (sequence) and an integer is the String Replication Operator, repeating the string 3 times.",
    hint: "String replication repeats the string n times."
  },
  {
    id: 20,
    question: "What is the result of `type(3 + 4j)` in Python?",
    options: [
      "<class 'complex'>",
      "<class 'float'>",
      "<class 'int'>",
      "<class 'imaginary'>"
    ],
    correctAnswer: 0,
    explanation: "`3 + 4j` is a complex number literal in Python where `3` is the real part and `4` is the imaginary part (`j` or `J`). Its type is `<class 'complex'>`.",
    hint: "Complex numbers in Python use j for the imaginary unit."
  },
  {
    id: 21,
    question: "Which function returns the unique memory address (identity) of an object in Python?",
    options: ["id()", "addr()", "mem()", "location()"],
    correctAnswer: 0,
    explanation: "`id(obj)` returns the integer memory address identity where the object resides in RAM (CPython memory pointer).",
    hint: "id() returns the unique memory identifier."
  },
  {
    id: 22,
    question: "What happens when you execute `x = y = z = 50`?",
    options: [
      "All three variables x, y, and z refer to the same integer object 50 in memory (Chained Assignment)",
      "Only x gets 50; y and z get None",
      "SyntaxError: multiple equals not allowed",
      "x is assigned 50, then y and z are deleted"
    ],
    correctAnswer: 0,
    explanation: "Chained assignment assigns the single r-value `50` to all three l-value variable targets `x`, `y`, and `z` simultaneously.",
    hint: "Chained assignment binds multiple targets to one value."
  },
  {
    id: 23,
    question: "Which of the following is an invalid variable name in Python due to case-sensitivity / keyword clash?",
    options: ["for_loop", "pass_mark", "def", "global_var"],
    correctAnswer: 2,
    explanation: "`def` is a reserved Python keyword (used to define functions) and cannot be used as an identifier name.",
    hint: "def is a reserved keyword for function definitions."
  },
  {
    id: 24,
    question: "What is the output of the following code?\n```python\nx = 10\ny = 20\nprint(x, y, sep='+', end='=')\nprint(x + y)\n```",
    options: [
      "10+20=30",
      "10 20=30",
      "10+20\n=30",
      "10+20= 30"
    ],
    correctAnswer: 0,
    explanation: "The first `print` outputs `10+20=` without a trailing newline. The second `print` appends `30` on the exact same line, giving `10+20=30`.",
    hint: "end='=' keeps the cursor on the same line before printing 30."
  },
  {
    id: 25,
    question: "Case Study: Swadeep writes the following code to input two numbers and add them:\n```python\nn1 = input('Enter first number: ')\nn2 = input('Enter second number: ')\nprint(n1 + n2)\n```\nIf he inputs `10` and `20`, why does the output print `1020` instead of `30`?",
    options: [
      "Because `input()` returns strings, and the `+` operator performs string concatenation (`'10' + '20' = '1020'`) instead of numeric addition",
      "Because Python has a bug in its adder circuit",
      "Because numbers must be separated by commas",
      "Because n1 and n2 were invalid l-values"
    ],
    correctAnswer: 0,
    explanation: "`input()` returns strings. To perform numeric addition, the inputs must be explicitly cast to integers: `int(input())` or `float(input())`.",
    hint: "input() returns str, so + concatenates strings."
  }
];

export default questions;
