export default [
  {
    "id": 1,
    "question": "In a 20-mark CBSE periodic test on Python fundamentals, what is the ideal recommended time allocation for 45 minutes?",
    "options": [
      "Section A: 5 mins, Section B: 10 mins, Section C: 15 mins, Section D: 15 mins",
      "40 mins on Section A and 5 mins on the rest",
      "Spend 45 minutes on Section D only",
      "No time management is necessary"
    ],
    "correctAnswer": 0,
    "explanation": "Allocating 5 minutes for Section A, 10 minutes for Section B, 15 minutes for Section C, and 15 minutes for Section D ensures thorough checking and zero unattempted questions.",
    "hint": "Balanced time allocation matching the marks distribution."
  },
  {
    "id": 2,
    "question": "When writing code debugging questions in CBSE board papers, what must students explicitly do to score full marks?",
    "options": [
      "Underline each corrected line or keyword in the rewritten code",
      "Delete the question",
      "Rewrite the code in C++",
      "Only write the error count without code"
    ],
    "correctAnswer": 0,
    "explanation": "CBSE marking schemes strictly state: 'Award 1/2 mark for each error identified, corrected, and underlined.'",
    "hint": "Identify, correct, and underline the changes."
  },
  {
    "id": 3,
    "question": "Why should students always show a dry-run execution table for output tracing questions?",
    "options": [
      "Evaluators award step-marking for intermediate variable states even if the final output has a minor arithmetic slip",
      "It consumes extra ink",
      "Dry run tables are forbidden by CBSE",
      "It formats the answer sheet"
    ],
    "correctAnswer": 0,
    "explanation": "Showing variable tracking columns (e.g. i, j, total) demonstrates clear algorithmic logic and earns partial credit under CBSE step-marking.",
    "hint": "Demonstrates clear logic and earns step-marking credit."
  },
  {
    "id": 4,
    "question": "In Python string slicing s[start:stop:step], what happens if step is negative?",
    "options": [
      "The slice traverses characters backwards from right to left",
      "It causes an immediate SyntaxError",
      "The string is converted to uppercase",
      "The slice returns an empty dictionary"
    ],
    "correctAnswer": 0,
    "explanation": "A negative step (e.g. s[::-1]) decrements the index, reversing or extracting characters from right to left.",
    "hint": "Negative step traverses backwards."
  },
  {
    "id": 5,
    "question": "What is the primary difference between list.sort() and the sorted() built-in function in Python?",
    "options": [
      "list.sort() modifies the original list in-place and returns None; sorted() leaves the original list unchanged and returns a new sorted list",
      "list.sort() only works on strings",
      "sorted() modifies the list in-place",
      "There is no difference"
    ],
    "correctAnswer": 0,
    "explanation": "list.sort() is an in-place mutating method returning None; sorted(iterable) returns a brand new sorted list.",
    "hint": "In-place modification vs returning a new sorted list."
  },
  {
    "id": 6,
    "question": "What exception is raised when trying to retrieve a non-existent key using square bracket syntax dict[key]?",
    "options": [
      "KeyError",
      "IndexError",
      "ValueError",
      "TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "Square bracket lookup raises KeyError if the key is absent. Using dict.get(key, default) avoids this error.",
    "hint": "KeyError for missing dictionary keys."
  },
  {
    "id": 7,
    "question": "In Python operator precedence, which of the following operations has the highest priority?",
    "options": [
      "Parentheses () and Exponentiation (**)",
      "Addition (+)",
      "Bitwise OR (|)",
      "Logical AND (and)"
    ],
    "correctAnswer": 0,
    "explanation": "Parentheses () have top priority, followed immediately by exponentiation (**), which evaluates before multiplication and addition.",
    "hint": "Parentheses and Exponentiation."
  },
  {
    "id": 8,
    "question": "What does the floor division operator '//' return when applied to negative numbers like -7 // 2?",
    "options": [
      "-4 (floors towards negative infinity)",
      "-3",
      "-3.5",
      "3"
    ],
    "correctAnswer": 0,
    "explanation": "Floor division rounds down towards negative infinity: -7 / 2 = -3.5, which floors down to -4.",
    "hint": "Rounds down towards negative infinity."
  },
  {
    "id": 9,
    "question": "Can dictionary keys be composed of lists?",
    "options": [
      "No, dictionary keys must be immutable and hashable; lists are mutable and raise a TypeError",
      "Yes, any data type can be a dictionary key",
      "Only if the list has 1 item",
      "Only in Python 2"
    ],
    "correctAnswer": 0,
    "explanation": "Dictionary keys require hashability. Because lists can be modified, they are unhashable and cannot be used as keys.",
    "hint": "Keys must be immutable and hashable."
  },
  {
    "id": 10,
    "question": "What is the output of print(type((5))) vs print(type((5,)))?",
    "options": [
      "<class 'int'> and <class 'tuple'>",
      "<class 'tuple'> and <class 'int'>",
      "<class 'tuple'> and <class 'tuple'>",
      "<class 'int'> and <class 'int'>"
    ],
    "correctAnswer": 0,
    "explanation": "(5) is an integer enclosed in parentheses; (5,) with a trailing comma is a single-element tuple.",
    "hint": "Trailing comma creates a tuple."
  },
  {
    "id": 11,
    "question": "What does the 'continue' statement do when encountered inside a loop?",
    "options": [
      "Skips the remainder of the current iteration and jumps directly to the next iteration",
      "Exits the loop permanently",
      "Terminates the entire Python program",
      "Re-runs the previous iteration"
    ],
    "correctAnswer": 0,
    "explanation": "continue aborts only the active iteration, jumping to the loop update/condition step.",
    "hint": "Skips to the next iteration."
  },
  {
    "id": 12,
    "question": "What is the output of print('Python'.find('th', 0, 4))?",
    "options": [
      "2",
      "3",
      "-1",
      "ValueError"
    ],
    "correctAnswer": 0,
    "explanation": "'th' starts at index 2, which falls within the slice range 0 to 4. Therefore find() returns 2.",
    "hint": "Index 2."
  },
  {
    "id": 13,
    "question": "What is the danger of writing 'while i < 10:' without an increment statement inside the loop body?",
    "options": [
      "It results in an infinite loop that freezes execution and consumes CPU resources",
      "It throws a SyntaxError",
      "It deletes variable i",
      "It converts the loop to a tuple"
    ],
    "correctAnswer": 0,
    "explanation": "Without incrementing the loop variable, the condition remains True perpetually, causing an infinite loop.",
    "hint": "Creates an infinite loop."
  },
  {
    "id": 14,
    "question": "Which of the following functions generates a random integer between a and b (both inclusive) in Python?",
    "options": [
      "random.randint(a, b)",
      "random.random()",
      "random.choice()",
      "random.range()"
    ],
    "correctAnswer": 0,
    "explanation": "random.randint(a, b) returns a random integer N such that a <= N <= b.",
    "hint": "random.randint(a, b)."
  },
  {
    "id": 15,
    "question": "What is the output of bool([]) and bool({})?",
    "options": [
      "False False (empty collections are falsy in Python)",
      "True True",
      "True False",
      "False True"
    ],
    "correctAnswer": 0,
    "explanation": "Empty built-in sequences and collections ([], {}, '', (), set()) evaluate to boolean False.",
    "hint": "Empty collections evaluate to False."
  },
  {
    "id": 16,
    "question": "What does the string method 'title()' do?",
    "options": [
      "Capitalizes the first character of each word in the string",
      "Converts the whole string to uppercase",
      "Underlines the string",
      "Centers the string"
    ],
    "correctAnswer": 0,
    "explanation": "title() converts the first character of every whitespace-separated word to uppercase.",
    "hint": "Capitalizes the first character of each word."
  },
  {
    "id": 17,
    "question": "In Python list slicing, what does list[::-1] produce?",
    "options": [
      "A reversed copy of the list",
      "An empty list",
      "The first element only",
      "A SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "The slice [::-1] steps backwards through the list, returning a new list with elements in reverse order.",
    "hint": "Reverses the list."
  },
  {
    "id": 18,
    "question": "What does the expression 3 * [1, 2] produce?",
    "options": [
      "[1, 2, 1, 2, 1, 2]",
      "[3, 6]",
      "[[1, 2], [1, 2], [1, 2]]",
      "[1, 2, 3]"
    ],
    "correctAnswer": 0,
    "explanation": "Multiplying a list by an integer replicates its elements in order into a flat list.",
    "hint": "Replicates elements into a flat list."
  },
  {
    "id": 19,
    "question": "What is the output of print('Hello'.swapcase())?",
    "options": [
      "'hELLO'",
      "'hello'",
      "'HELLO'",
      "'Hello'"
    ],
    "correctAnswer": 0,
    "explanation": "swapcase() converts uppercase characters to lowercase and lowercase characters to uppercase.",
    "hint": "Swaps uppercase with lowercase."
  },
  {
    "id": 20,
    "question": "What is the time complexity of looking up a key in a Python dictionary on average?",
    "options": [
      "O(1) Constant Time",
      "O(N) Linear Time",
      "O(N^2) Quadratic Time",
      "O(log N) Logarithmic Time"
    ],
    "correctAnswer": 0,
    "explanation": "Python dictionaries use hash tables, providing average O(1) constant time lookup, insertion, and deletion.",
    "hint": "O(1) hash table lookup."
  },
  {
    "id": 21,
    "question": "What does the 'is' operator test in Python?",
    "options": [
      "Object identity (whether both variables point to the exact same memory address)",
      "Value equality",
      "Alphabetical order",
      "Data type size"
    ],
    "correctAnswer": 0,
    "explanation": "'is' compares id(a) == id(b), verifying whether both variables reference the identical object in memory.",
    "hint": "Compares object identity and memory address."
  },
  {
    "id": 22,
    "question": "In a CBSE 6-mark programming question, what is the best strategy for clean code organization?",
    "options": [
      "Define clear function signatures, use meaningful variable names, handle edge cases, and print user-friendly output messages",
      "Write all code in one unindented line",
      "Avoid using comments or variable names",
      "Only write the function call"
    ],
    "correctAnswer": 0,
    "explanation": "Examiners award marks for structure, modularity, algorithmic correctness, and proper I/O formatting.",
    "hint": "Modular functions, clear names, edge case handling."
  },
  {
    "id": 23,
    "question": "What error is triggered if a student writes: print('Result: ' + 10)?",
    "options": [
      "TypeError: can only concatenate str (not 'int') to str",
      "ValueError",
      "SyntaxError",
      "ZeroDivisionError"
    ],
    "correctAnswer": 0,
    "explanation": "Python does not automatically convert numbers to strings during concatenation; str(10) is required.",
    "hint": "TypeError when concatenating string and integer."
  },
  {
    "id": 24,
    "question": "How does practicing with timed 20-mark sample paper sets improve examination performance?",
    "options": [
      "Builds speed, reduces exam anxiety, exposes conceptual blind spots, and develops structured answer-writing discipline",
      "Guarantees that no more studying is needed",
      "Replaces school teachers",
      "Increases typing speed only"
    ],
    "correctAnswer": 0,
    "explanation": "Timed practice with authentic sets bridges theoretical knowledge with real examination execution and pacing.",
    "hint": "Builds exam speed, pacing, and precision under timed conditions."
  },
  {
    "id": 25,
    "question": "What is the final step after completing each 20-mark practice set?",
    "options": [
      "Carefully compare your handwritten answers with the model solution and marking scheme to analyze lost half-marks",
      "Throw away the answer paper",
      "Never look at the solution",
      "Skip to the next module immediately"
    ],
    "correctAnswer": 0,
    "explanation": "Self-evaluating against the marking scheme teaches students where marks are deducted and how to achieve perfect 20/20 scores.",
    "hint": "Analyze mistakes against the official marking scheme."
  }
];
