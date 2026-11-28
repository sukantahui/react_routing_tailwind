// 25 Authentic CBSE Board Examination Questions for Topic 12
const questions = [
  {
    "id": 1,
    "question": "Which data structure operates on the Last-In-First-Out (LIFO) access discipline?",
    "options": [
      "Queue",
      "Stack",
      "Tree",
      "Array"
    ],
    "correctAnswer": 1,
    "explanation": "A Stack is strictly a LIFO data structure.",
    "hint": "Stack."
  },
  {
    "id": 2,
    "question": "At which position of a Python list is the TOP of the stack maintained for O(1) performance?",
    "options": [
      "Index 0",
      "The end of the list (index -1)",
      "Index 1",
      "The middle"
    ],
    "correctAnswer": 1,
    "explanation": "The end of the list (index -1) requires zero element shifting, running in O(1) time.",
    "hint": "Index -1 (end of list)."
  },
  {
    "id": 3,
    "question": "Which built-in list method implements the Push operation?",
    "options": [
      "stk.append()",
      "stk.push()",
      "stk.add()",
      "stk.insert()"
    ],
    "correctAnswer": 0,
    "explanation": "stk.append() appends an element to the TOP in O(1) time.",
    "hint": "stk.append()."
  },
  {
    "id": 4,
    "question": "Which built-in list method implements the Pop operation?",
    "options": [
      "stk.remove()",
      "stk.pop()",
      "stk.delete()",
      "stk.drop()"
    ],
    "correctAnswer": 1,
    "explanation": "stk.pop() extracts and returns the last element.",
    "hint": "stk.pop()."
  },
  {
    "id": 5,
    "question": "What exception is raised if list.pop() is called on an empty list?",
    "options": [
      "IndexError",
      "ValueError",
      "KeyError",
      "TypeError"
    ],
    "correctAnswer": 0,
    "explanation": "Python raises IndexError: pop from empty list.",
    "hint": "IndexError."
  },
  {
    "id": 6,
    "question": "What is the error condition of attempting to delete from an empty stack called?",
    "options": [
      "Overflow",
      "Underflow",
      "Deadlock",
      "Memory Leak"
    ],
    "correctAnswer": 1,
    "explanation": "Underflow occurs when attempting to pop from an empty collection.",
    "hint": "Underflow."
  },
  {
    "id": 7,
    "question": "What operation inspects the top element without removing it from the stack?",
    "options": [
      "Pop",
      "Peek (or Top)",
      "Push",
      "Display"
    ],
    "correctAnswer": 1,
    "explanation": "Peek inspects the top element non-destructively.",
    "hint": "Peek (or Top)."
  },
  {
    "id": 8,
    "question": "What Python index accesses the top element without popping it?",
    "options": [
      "stk[0]",
      "stk[-1]",
      "stk[len(stk)]",
      "stk.peek()"
    ],
    "correctAnswer": 1,
    "explanation": "Negative indexing stk[-1] accesses the top element directly.",
    "hint": "stk[-1]."
  },
  {
    "id": 9,
    "question": "In what order are stack elements printed during Display traversal?",
    "options": [
      "From Bottom up to TOP",
      "From TOP down to Bottom",
      "Alphabetical order",
      "Randomly"
    ],
    "correctAnswer": 1,
    "explanation": "Stacks are canonically displayed from TOP down to bottom.",
    "hint": "From TOP down to Bottom."
  },
  {
    "id": 10,
    "question": "Which range expression traverses a list of length N from TOP down to bottom index 0?",
    "options": [
      "range(N - 1, -1, -1)",
      "range(N, 0, -1)",
      "range(0, N)",
      "range(N, -1)"
    ],
    "correctAnswer": 0,
    "explanation": "range(N - 1, -1, -1) starts at N-1 and stops at 0.",
    "hint": "range(N - 1, -1, -1)."
  },
  {
    "id": 11,
    "question": "Why should a Display function NOT use stk.pop()?",
    "options": [
      "It destroys the stack by deleting all elements while printing",
      "It causes syntax error",
      "It is illegal in Python",
      "It reverses the list"
    ],
    "correctAnswer": 0,
    "explanation": "Display must be non-destructive; popping elements destroys the user's data.",
    "hint": "Destroys the stack."
  },
  {
    "id": 12,
    "question": "What is the time complexity of Push and Pop when implemented at the end of a Python list?",
    "options": [
      "O(1) Constant Time",
      "O(N) Linear Time",
      "O(N^2)",
      "O(log N)"
    ],
    "correctAnswer": 0,
    "explanation": "Both append() and pop() on the tail take O(1) time.",
    "hint": "O(1) Constant Time."
  },
  {
    "id": 13,
    "question": "What condition checks if a stack is completely empty?",
    "options": [
      "len(stk) == 0",
      "not stk",
      "stk == []",
      "All of the mentioned"
    ],
    "correctAnswer": 3,
    "explanation": "All three expressions correctly evaluate to True when the list is empty.",
    "hint": "All of the mentioned."
  },
  {
    "id": 14,
    "question": "What is the value of TOP when a stack is completely empty?",
    "options": [
      "0",
      "1",
      "-1 (or None)",
      "Infinity"
    ],
    "correctAnswer": 2,
    "explanation": "Conventionally, TOP is initialized to -1 (or None) when empty.",
    "hint": "-1 (or None)."
  },
  {
    "id": 15,
    "question": "What happens if you execute stk = stk.append(50)?",
    "options": [
      "stk is updated correctly",
      "stk becomes None, destroying the list!",
      "stk becomes 50",
      "IndexError occurs"
    ],
    "correctAnswer": 1,
    "explanation": "append() returns None, so assigning stk = stk.append(50) wipes the list to None.",
    "hint": "stk becomes None."
  },
  {
    "id": 16,
    "question": "In a record stack storing [Roll, Name, Marks], how do you access the Marks of the top student?",
    "options": [
      "stk[-1][0]",
      "stk[-1][1]",
      "stk[-1][2]",
      "stk.marks"
    ],
    "correctAnswer": 2,
    "explanation": "Index 2 corresponds to Marks in the 0-indexed sub-list.",
    "hint": "stk[-1][2]."
  },
  {
    "id": 17,
    "question": "What control structure keeps an interactive stack menu active?",
    "options": [
      "while True:",
      "for i in range(10):",
      "if True:",
      "try-finally:"
    ],
    "correctAnswer": 0,
    "explanation": "An infinite 'while True:' loop keeps the interactive CLI menu running.",
    "hint": "while True:."
  },
  {
    "id": 18,
    "question": "How do you push all names from dictionary d where marks >= 90?",
    "options": [
      "for name, m in d.items(): if m >= 90: stk.append(name)",
      "for name in d: stk.append(name)",
      "stk = list(d.keys())",
      "stk.append(90)"
    ],
    "correctAnswer": 0,
    "explanation": "Iterating through d.items() and checking if m >= 90 pushes the matching names.",
    "hint": "for name, m in d.items(): if m >= 90: stk.append(name)."
  },
  {
    "id": 19,
    "question": "How do you check if an integer 'n' is even in Python?",
    "options": [
      "n % 2 == 0",
      "n / 2 == 0",
      "n // 2 == 0",
      "is_even(n)"
    ],
    "correctAnswer": 0,
    "explanation": "Modulo by 2 yielding 0 confirms an even number.",
    "hint": "n % 2 == 0."
  },
  {
    "id": 20,
    "question": "What error occurs if a recursive function lacks a base case?",
    "options": [
      "RecursionError (Call stack overflow)",
      "IndexError",
      "ZeroDivisionError",
      "SyntaxError"
    ],
    "correctAnswer": 0,
    "explanation": "Infinite recursive calls exhaust the call stack, raising RecursionError.",
    "hint": "RecursionError (Call stack overflow)."
  },
  {
    "id": 21,
    "question": "Which of the following is a classic real-world application of Stacks?",
    "options": [
      "Undo mechanism in software (Ctrl+Z)",
      "Evaluating postfix arithmetic",
      "Matching balanced brackets in compilers",
      "All of the mentioned"
    ],
    "correctAnswer": 3,
    "explanation": "All three are classic real-world computing applications of Stacks.",
    "hint": "All of the mentioned."
  },
  {
    "id": 22,
    "question": "How do you drain a stack completely and display all elements in LIFO order?",
    "options": [
      "while len(stk) > 0: print(stk.pop())",
      "print(stk)",
      "stk.clear()",
      "del stk"
    ],
    "correctAnswer": 0,
    "explanation": "Popping in a while loop empties the stack, displaying items in reverse order.",
    "hint": "while len(stk) > 0: print(stk.pop())."
  },
  {
    "id": 23,
    "question": "What does list.clear() do in Python?",
    "options": [
      "Removes all elements, leaving the list empty []",
      "Deletes variable",
      "Sets all elements to 0",
      "Raises error"
    ],
    "correctAnswer": 0,
    "explanation": "clear() removes all elements in-place, resetting length to 0.",
    "hint": "Removes all elements, leaving []."
  },
  {
    "id": 24,
    "question": "What is the weightage of the Stack question in the CBSE Class 12 Computer Science theory paper?",
    "options": [
      "1 mark",
      "3 to 4 marks",
      "10 marks",
      "15 marks"
    ],
    "correctAnswer": 1,
    "explanation": "Stack implementation programming questions typically carry 3 or 4 marks.",
    "hint": "3 to 4 marks."
  },
  {
    "id": 25,
    "question": "Which principle makes Stacks ideal for function call execution and backtracking?",
    "options": [
      "LIFO (Last In, First Out)",
      "FIFO (First In, First Out)",
      "Random Access",
      "Hashing"
    ],
    "correctAnswer": 0,
    "explanation": "LIFO allows the most recent function or step to be unwound first upon completion.",
    "hint": "LIFO (Last In, First Out)."
  }
];

export default questions;
