// 25 Authentic CBSE Board Examination Questions for Topic 7
const questions = [
  {
    "id": 1,
    "question": "In what order should stack elements be printed when implementing a Display function?",
    "options": [
      "From Bottom (index 0) up to TOP",
      "From TOP (highest index) down to Bottom (index 0)",
      "In sorted numerical order",
      "In random order"
    ],
    "correctAnswer": 1,
    "explanation": "Because a Stack is a LIFO structure, contents are canonically displayed from TOP down to bottom.",
    "hint": "From TOP down to Bottom."
  },
  {
    "id": 2,
    "question": "Which of the following range expressions correctly traverses a list of N elements in reverse from index N-1 down to 0?",
    "options": [
      "range(N, 0, -1)",
      "range(N - 1, -1, -1)",
      "range(0, N, -1)",
      "range(N - 1, 0, 1)"
    ],
    "correctAnswer": 1,
    "explanation": "range(N - 1, -1, -1) starts at N-1, steps by -1, and stops before -1 (i.e. at 0).",
    "hint": "range(N - 1, -1, -1)."
  },
  {
    "id": 3,
    "question": "Should a Display function pop or delete elements from the stack during traversal?",
    "options": [
      "Yes, popping is required to read",
      "No, Display is a non-destructive traversal and must preserve all elements",
      "Only if requested by user",
      "Only in Python 2"
    ],
    "correctAnswer": 1,
    "explanation": "Display must be non-destructive; popping elements during display would destroy the user's data.",
    "hint": "Non-destructive traversal."
  },
  {
    "id": 4,
    "question": "What should Display(stk) print if len(stk) == 0?",
    "options": [
      "'Stack Empty' or 'Underflow'",
      "IndexError",
      "Zeroes",
      "Crash"
    ],
    "correctAnswer": 0,
    "explanation": "If the stack contains no elements, an appropriate 'Stack Empty' message should be shown.",
    "hint": "'Stack Empty' or 'Underflow'."
  },
  {
    "id": 5,
    "question": "Consider: for item in reversed(stk): print(item). How does this traverse the list?",
    "options": [
      "From index 0 to len-1",
      "From last element (TOP) down to the first element (Bottom)",
      "In ascending order",
      "In pairs"
    ],
    "correctAnswer": 1,
    "explanation": "reversed(stk) returns a reverse iterator, traversing from tail (TOP) to head (Bottom).",
    "hint": "From last element down to first."
  },
  {
    "id": 6,
    "question": "Consider: for item in stk[::-1]: print(item). What does the slice stk[::-1] do?",
    "options": [
      "Deletes all elements",
      "Returns a reversed copy of the list",
      "Sorts the list",
      "Finds the max value"
    ],
    "correctAnswer": 1,
    "explanation": "Slice with step -1 (stk[::-1]) creates a reversed copy of the list.",
    "hint": "Reversed copy of the list."
  },
  {
    "id": 7,
    "question": "Why do CBSE marking schemes specifically award credit for showing '<-- TOP' next to the first printed element?",
    "options": [
      "It identifies which element is currently at the accessible summit of the stack",
      "It changes font color",
      "It is required by Python grammar",
      "To make the text bold"
    ],
    "correctAnswer": 0,
    "explanation": "Displaying '<-- TOP' clearly marks the active insertion and deletion boundary.",
    "hint": "Marks the active boundary."
  },
  {
    "id": 8,
    "question": "Consider: stk = [10, 20, 30]. If Display prints from TOP to bottom, which number is printed first?",
    "options": [
      "10",
      "20",
      "30",
      "0"
    ],
    "correctAnswer": 2,
    "explanation": "30 is at the end (TOP) and is printed first.",
    "hint": "30."
  },
  {
    "id": 9,
    "question": "What is the time complexity of displaying all N elements of a stack?",
    "options": [
      "O(1)",
      "O(N) Linear Time",
      "O(N^2)",
      "O(log N)"
    ],
    "correctAnswer": 1,
    "explanation": "Visiting each of the N elements exactly once takes O(N) linear time.",
    "hint": "O(N) Linear Time."
  },
  {
    "id": 10,
    "question": "What error occurs if a student writes: for i in range(len(stk), 0, -1): print(stk[i]) on non-empty stk?",
    "options": [
      "IndexError: list index out of range on first iteration (stk[len(stk)])",
      "SyntaxError",
      "ValueError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Valid indices end at len(stk)-1; starting at len(stk) raises IndexError immediately.",
    "hint": "IndexError on stk[len(stk)]."
  },
  {
    "id": 11,
    "question": "What happens if a student writes: while len(stk) > 0: print(stk.pop()) inside Display(stk)?",
    "options": [
      "It prints the stack in LIFO order, but DELETES all elements, leaving the caller with an empty stack!",
      "It runs perfectly with no drawbacks",
      "It doubles the stack",
      "It raises TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "Using pop() destroys the stack! Traversal must read via index or iterator without popping.",
    "hint": "Destroys stack by deleting all elements."
  },
  {
    "id": 12,
    "question": "How can you print each element on a new line with its index in the stack?",
    "options": [
      "for i in range(len(stk)-1, -1, -1): print(f'Index {i}: {stk[i]}')",
      "print(stk)",
      "for i in stk: print(i)",
      "stk.show_indices()"
    ],
    "correctAnswer": 0,
    "explanation": "Iterating through the reverse index range prints the index alongside each element.",
    "hint": "for i in range(len(stk)-1, -1, -1): print(f'Index {i}: {stk[i]}')."
  },
  {
    "id": 13,
    "question": "Consider: stk = ['Red', 'Green', 'Blue']. What is printed if we iterate: for i in range(len(stk)-1, -1, -1): print(stk[i], end=' ')?",
    "options": [
      "Red Green Blue ",
      "Blue Green Red ",
      "Green Red Blue ",
      "Blue Red Green "
    ],
    "correctAnswer": 1,
    "explanation": "Reversed traversal prints Blue (TOP), then Green, then Red.",
    "hint": "Blue Green Red ."
  },
  {
    "id": 14,
    "question": "In CBSE board examination theory questions, how many marks is a Display function typically worth?",
    "options": [
      "½ to 1 mark (as part of a 3-4 mark question)",
      "10 marks",
      "15 marks",
      "0 marks"
    ],
    "correctAnswer": 0,
    "explanation": "Display or Traversal typically carries 1 mark in multi-part stack questions.",
    "hint": "½ to 1 mark."
  },
  {
    "id": 15,
    "question": "What is the result of range(0, -1, -1)?",
    "options": [
      "An empty range",
      "Generates the single integer: 0",
      "Generates 0 and -1",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "range(0, -1, -1) starts at 0 and stops before -1, producing [0].",
    "hint": "Produces [0]."
  },
  {
    "id": 16,
    "question": "If stk has only 1 element [99], what does for i in range(len(stk)-1, -1, -1): print(stk[i]) output?",
    "options": [
      "Nothing",
      "99",
      "IndexError",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "len is 1; range(0, -1, -1) executes once for index 0, printing 99.",
    "hint": "99."
  },
  {
    "id": 17,
    "question": "Why is checking 'if len(stk) == 0:' important before printing '<-- TOP'?",
    "options": [
      "To prevent an IndexError when accessing stk[len(stk)-1] on an empty list",
      "To clear memory",
      "To change colors",
      "To speed up loop"
    ],
    "correctAnswer": 0,
    "explanation": "On [], len is 0, so len-1 is -1; while Python supports -1, an empty list raises IndexError on stk[-1].",
    "hint": "Prevents IndexError on empty list."
  },
  {
    "id": 18,
    "question": "Can stack elements be printed horizontally separated by arrows, e.g. 30 -> 20 -> 10?",
    "options": [
      "No, stacks must be printed vertically",
      "Yes, using print(item, end=' -> ') during traversal",
      "Only in C++",
      "Only with json"
    ],
    "correctAnswer": 1,
    "explanation": "Using the end parameter in print() allows custom horizontal separators.",
    "hint": "Yes, using end=' -> '."
  },
  {
    "id": 19,
    "question": "Consider: def Show(s): [print(x) for x in reversed(s)]. Is this valid in Python?",
    "options": [
      "Yes, list comprehension executing print for each reversed element",
      "No, syntax error",
      "Only in Python 2",
      "Only for numbers"
    ],
    "correctAnswer": 0,
    "explanation": "List comprehension iterating over reversed(s) is valid Python.",
    "hint": "Yes, valid in Python."
  },
  {
    "id": 20,
    "question": "When displaying a record-based stack (e.g. [[101, 'Amit', 95], [102, 'Ria', 98]]), how can fields be formatted neatly?",
    "options": [
      "print(f'{row[0]:<10} {row[1]:<20} {row[2]:<8}')",
      "print(row)",
      "Both are valid",
      "Neither is valid"
    ],
    "correctAnswer": 2,
    "explanation": "Both raw printing and formatted f-strings are valid, with f-strings providing clean tabular columns.",
    "hint": "Both are valid."
  },
  {
    "id": 21,
    "question": "What is the memory overhead of reversed(stk) compared to stk[::-1]?",
    "options": [
      "reversed(stk) creates an iterator without duplicating the list; stk[::-1] creates a new list copy in RAM",
      "reversed duplicates the list 3 times",
      "There is no difference",
      "stk[::-1] is always 0 bytes"
    ],
    "correctAnswer": 0,
    "explanation": "reversed() creates a lightweight O(1) memory iterator, whereas slice copying creates a new list.",
    "hint": "reversed() uses O(1) memory iterator."
  },
  {
    "id": 22,
    "question": "If a student writes 'for item in stk: print(item)', in what order are elements printed?",
    "options": [
      "From TOP to Bottom",
      "From Bottom (index 0) up to TOP (last index) - which is inverted for a stack!",
      "Randomly",
      "Descending"
    ],
    "correctAnswer": 1,
    "explanation": "Standard iteration goes from index 0 to N-1 (bottom to top), which inverts standard stack perspective.",
    "hint": "Bottom to top (inverted for stack)."
  },
  {
    "id": 23,
    "question": "What is the standard penalty in CBSE exam marking for displaying from bottom to top instead of top to bottom?",
    "options": [
      "½ mark deduction",
      "0 marks",
      "Minus 10 marks",
      "No deduction"
    ],
    "correctAnswer": 0,
    "explanation": "Examiners typically deduct ½ mark for failing to present elements from TOP down to bottom.",
    "hint": "½ mark deduction."
  },
  {
    "id": 24,
    "question": "How can you print a boundary line separating stack elements in vertical display?",
    "options": [
      "print('----------') between rows",
      "print('|' + str(item) + '|') with borders",
      "Both are common formatted visual representations",
      "None"
    ],
    "correctAnswer": 2,
    "explanation": "Drawing ASCII separators or vertical borders enhances readability.",
    "hint": "Both are common formatted representations."
  },
  {
    "id": 25,
    "question": "Which of the following functions represents the standard, complete CBSE Display implementation?",
    "options": [
      "def Display(stk):\\n    if len(stk) == 0:\\n        print('Stack Empty')\\n        return\\n    top = len(stk) - 1\\n    print(stk[top], '<-- TOP')\\n    for i in range(top - 1, -1, -1):\\n        print(stk[i])",
      "def Display(stk):\\n    print(stk)",
      "def Display(stk):\\n    while stk: print(stk.pop())",
      "def Display(stk):\\n    stk.reverse()"
    ],
    "correctAnswer": 0,
    "explanation": "Guarding against empty stack, marking TOP on first element, and looping down to 0 is the textbook standard.",
    "hint": "Check empty + print TOP + reverse loop down to 0."
  }
];

export default questions;
