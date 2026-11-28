// 25 Authentic CBSE Board Examination Questions for Topic 4
const questions = [
  {
    "id": 1,
    "question": "What error occurs if you write `if x = 5:` in Python?",
    "options": [
      "SyntaxError: invalid syntax",
      "TypeError",
      "ValueError",
      "NameError"
    ],
    "correctAnswer": 0,
    "explanation": "`=` is the assignment operator. Equality comparison requires `==`. Using `=` in an if condition raises SyntaxError.",
    "hint": "Assignment vs comparison operator."
  },
  {
    "id": 2,
    "question": "How does Python resolve which `if` an `else` block belongs to?",
    "options": [
      "It always binds to the first `if`",
      "Strictly by the indentation level",
      "By curly braces",
      "By line number"
    ],
    "correctAnswer": 1,
    "explanation": "Python uses indentation to determine block structure and associative grouping.",
    "hint": "Whitespace and indentation."
  },
  {
    "id": 3,
    "question": "What is the output of: `x = 0; if x: print('Yes'); else: print('No')`?",
    "options": [
      "Yes",
      "No",
      "SyntaxError",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "Numeric 0 evaluates to False in boolean context, so the `else` block executes printing 'No'.",
    "hint": "Truthiness of 0."
  },
  {
    "id": 4,
    "question": "In an `if-elif-else` ladder, what happens once a condition evaluates to True?",
    "options": [
      "All remaining elif conditions are still evaluated",
      "The matching block executes and the entire ladder is exited",
      "The program restarts",
      "The else block always executes"
    ],
    "correctAnswer": 1,
    "explanation": "Python evaluates elif conditions sequentially. As soon as one is True, its suite executes and control jumps past the entire construct.",
    "hint": "Mutual exclusivity of branches."
  },
  {
    "id": 5,
    "question": "What is the output of `res = 100 if 5 > 10 else 200; print(res)`?",
    "options": [
      "100",
      "200",
      "True",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "`5 > 10` is False, so the ternary expression returns the value after `else`, which is 200.",
    "hint": "Ternary operator evaluation."
  },
  {
    "id": 6,
    "question": "Which of the following is equivalent to `if not (a == b):`?",
    "options": [
      "if a != b:",
      "if a === b:",
      "if a <> b:",
      "if a is b:"
    ],
    "correctAnswer": 0,
    "explanation": "`not (a == b)` evaluates to True whenever `a != b`.",
    "hint": "Negation of equality."
  },
  {
    "id": 7,
    "question": "What will happen if every condition in an `if-elif` ladder is False and there is NO `else` clause?",
    "options": [
      "SyntaxError",
      "Program crashes with IndexError",
      "The entire construct is bypassed without executing any block",
      "The first if block executes"
    ],
    "correctAnswer": 2,
    "explanation": "Without an else clause, if no condition matches, execution simply moves to the statement following the construct.",
    "hint": "Optional nature of else."
  },
  {
    "id": 8,
    "question": "What is the output of: `a = 15; if a > 10: if a > 20: print('High') else: print('Mid') else: print('Low')`?",
    "options": [
      "High",
      "Mid",
      "Low",
      "SyntaxError"
    ],
    "correctAnswer": 1,
    "explanation": "`a > 10` is True, entering the outer if. `a > 20` is False, entering the inner else, printing 'Mid'.",
    "hint": "Nested conditional trace."
  },
  {
    "id": 9,
    "question": "Can an `elif` statement appear before an `if` statement?",
    "options": [
      "Yes",
      "No, an elif must always follow an if statement",
      "Only inside a loop",
      "Yes, with special import"
    ],
    "correctAnswer": 1,
    "explanation": "An `elif` is an 'else if' continuation and must strictly follow an initial `if` statement.",
    "hint": "Grammar requirement."
  },
  {
    "id": 10,
    "question": "What is the boolean value of an empty string `\"\"` in an if statement?",
    "options": [
      "True",
      "False",
      "None",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "Empty string `\"\"` is falsy in Python.",
    "hint": "Empty string truthiness."
  },
  {
    "id": 11,
    "question": "What is the output of: `x = 5; y = 10; if x < 10 and y > 5: print('Valid')`?",
    "options": [
      "Valid",
      "No output",
      "SyntaxError",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "Both `x < 10` (5 < 10 = True) and `y > 5` (10 > 5 = True) are True. `True and True = True`, printing 'Valid'.",
    "hint": "Logical and condition."
  },
  {
    "id": 12,
    "question": "What token MUST conclude every if, elif, and else header line?",
    "options": [
      "Semicolon (;)",
      "Colon (:)",
      "Curly brace ({)",
      "Arrow (->)"
    ],
    "correctAnswer": 1,
    "explanation": "In Python syntax, compound statement headers must end with a colon (:).",
    "hint": "Header punctuator."
  },
  {
    "id": 13,
    "question": "What is the output of: `val = None; if val is None: print('Empty')`?",
    "options": [
      "Empty",
      "None",
      "False",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "`val is None` evaluates to True, executing the print statement.",
    "hint": "Identity test with None."
  },
  {
    "id": 14,
    "question": "What is the output of: `x = 2; print('Even' if x % 2 == 0 else 'Odd')`?",
    "options": [
      "Even",
      "Odd",
      "2",
      "True"
    ],
    "correctAnswer": 0,
    "explanation": "`2 % 2 == 0` is True, so 'Even' is printed.",
    "hint": "Even parity check."
  },
  {
    "id": 15,
    "question": "Which year is NOT a leap year?",
    "options": [
      "2000",
      "2024",
      "1900",
      "2028"
    ],
    "correctAnswer": 2,
    "explanation": "Century years must be divisible by 400 to be leap years. 1900 is divisible by 100 but not by 400, so it is NOT a leap year.",
    "hint": "Centurial leap year rule."
  },
  {
    "id": 16,
    "question": "What error is raised if two consecutive lines in an if suite have inconsistent indentation?",
    "options": [
      "TabError or IndentationError",
      "SyntaxError only",
      "ValueError",
      "TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "Inconsistent indentation within a suite raises `IndentationError` (or `TabError` if mixing tabs and spaces).",
    "hint": "Indentation violation."
  },
  {
    "id": 17,
    "question": "What does `pass` do when used inside an if block?",
    "options": [
      "Exits the program",
      "Acts as a syntactic placeholder that does nothing",
      "Skips to the else block",
      "Returns True"
    ],
    "correctAnswer": 1,
    "explanation": "`pass` is a null statement used when a statement is required syntactically but no code needs to execute.",
    "hint": "Null placeholder."
  },
  {
    "id": 25,
    "question": "Why is `if a == True:` considered bad practice compared to `if a:`?",
    "options": [
      "It runs slower and violates PEP 8 pythonic conventions for boolean testing",
      "It causes a compiler error",
      "It inverts the logic",
      "It only works for strings"
    ],
    "correctAnswer": 0,
    "explanation": "Directly testing `if a:` is more concise, idiomatic, and works for all truthy values.",
    "hint": "Idiomatic boolean testing."
  },
  {
    "id": 18,
    "question": "What will `if []: print('A') elif [0]: print('B')` output?",
    "options": [
      "A",
      "B",
      "AB",
      "Nothing"
    ],
    "correctAnswer": 1,
    "explanation": "`[]` is empty (False). `[0]` has one item (0), which makes the list non-empty and truthy, printing 'B'.",
    "hint": "Non-empty collection truthiness."
  },
  {
    "id": 19,
    "question": "What is the output of: `x = 7; if 1 <= x <= 10: print('In Range')`?",
    "options": [
      "In Range",
      "SyntaxError",
      "No output",
      "False"
    ],
    "correctAnswer": 0,
    "explanation": "Python chained comparisons are evaluated as `1 <= x and x <= 10`, which is True for x = 7.",
    "hint": "Chained range check."
  },
  {
    "id": 20,
    "question": "Can an `else` block have a conditional expression attached to it (like `else x > 5:`)?",
    "options": [
      "Yes",
      "No, else cannot take a condition (use elif instead)",
      "Only in Python 3.12+",
      "Yes, if enclosed in brackets"
    ],
    "correctAnswer": 1,
    "explanation": "`else:` cannot have a condition. To test another condition, use `elif condition:`.",
    "hint": "Else does not accept expressions."
  },
  {
    "id": 21,
    "question": "What is the output of: `a = 10; b = 20; m = a if a > b else b; print(m)`?",
    "options": [
      "10",
      "20",
      "None",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "`a > b` (10 > 20) is False, so the expression yields `b`, which is 20.",
    "hint": "Max value ternary logic."
  },
  {
    "id": 22,
    "question": "What does the statement `if x in [1, 2, 3]:` check?",
    "options": [
      "Checks if x is equal to the list",
      "Checks if x is one of the elements inside the list",
      "Checks the memory address of x",
      "Returns the index of x"
    ],
    "correctAnswer": 1,
    "explanation": "The `in` membership operator returns True if `x` matches any item in the sequence.",
    "hint": "Membership check."
  },
  {
    "id": 23,
    "question": "What is the output of: `if not None: print('Passed')`?",
    "options": [
      "Passed",
      "None",
      "Failed",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "`None` evaluates to False. `not False` is True, so 'Passed' is printed.",
    "hint": "Negation of None."
  },
  {
    "id": 24,
    "question": "How many times will 'Hit' be printed: `if True: print('Hit'); if True: print('Hit')`?",
    "options": [
      "0",
      "1",
      "2",
      "Infinite"
    ],
    "correctAnswer": 2,
    "explanation": "These are two independent `if` statements; both conditions are True, so 'Hit' is printed twice.",
    "hint": "Independent if statements."
  }
];

export default questions;
