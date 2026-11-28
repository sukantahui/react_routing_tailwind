// 25 Authentic CBSE Board Examination Questions for Topic 11
const questions = [
  {
    "id": 1,
    "question": "Which data structure follows the Last-In, First-Out (LIFO) principle?",
    "options": [
      "Queue",
      "Stack",
      "Tree",
      "Array"
    ],
    "correctAnswer": 1,
    "explanation": "A Stack strictly operates on LIFO access.",
    "hint": "Stack."
  },
  {
    "id": 2,
    "question": "At which end of a Python list do Push and Pop operations take place?",
    "options": [
      "Index 0",
      "End of the list (index -1 / len-1)",
      "Middle",
      "Random index"
    ],
    "correctAnswer": 1,
    "explanation": "The end of the list acts as the TOP for O(1) efficiency.",
    "hint": "End of the list."
  },
  {
    "id": 3,
    "question": "Which Python method implements the Push operation?",
    "options": [
      "stk.append()",
      "stk.push()",
      "stk.add()",
      "stk.insert()"
    ],
    "correctAnswer": 0,
    "explanation": "stk.append() appends an element to the end of the list in O(1) time.",
    "hint": "stk.append()."
  },
  {
    "id": 4,
    "question": "Which Python method implements the Pop operation?",
    "options": [
      "stk.remove()",
      "stk.pop()",
      "stk.delete()",
      "stk.drop()"
    ],
    "correctAnswer": 1,
    "explanation": "stk.pop() removes and returns the last element.",
    "hint": "stk.pop()."
  },
  {
    "id": 5,
    "question": "What exception is raised if list.pop() is called on an empty list?",
    "options": [
      "IndexError: pop from empty list",
      "ValueError",
      "TypeError",
      "ZeroDivisionError"
    ],
    "correctAnswer": 0,
    "explanation": "Python raises IndexError on empty list pop.",
    "hint": "IndexError."
  },
  {
    "id": 6,
    "question": "What term describes the error state of attempting to delete from an empty stack?",
    "options": [
      "Overflow",
      "Underflow",
      "Deadlock",
      "Segmentation Fault"
    ],
    "correctAnswer": 1,
    "explanation": "Underflow occurs when attempting to pop or peek from an empty stack.",
    "hint": "Underflow."
  },
  {
    "id": 7,
    "question": "What is the Peek operation?",
    "options": [
      "Inspecting the top-most element without deleting it",
      "Deleting all elements",
      "Counting items",
      "Sorting elements"
    ],
    "correctAnswer": 0,
    "explanation": "Peek reads the top value while leaving the stack intact.",
    "hint": "Inspecting top without deleting."
  },
  {
    "id": 8,
    "question": "In Python, which expression retrieves the top element without removing it?",
    "options": [
      "stk[0]",
      "stk[-1]",
      "stk[len(stk)]",
      "stk.peek()"
    ],
    "correctAnswer": 1,
    "explanation": "Negative indexing stk[-1] accesses the top element.",
    "hint": "stk[-1]."
  },
  {
    "id": 9,
    "question": "In what direction should elements be printed when displaying a stack?",
    "options": [
      "From Bottom up to Top",
      "From TOP down to Bottom",
      "Alphabetically",
      "Randomly"
    ],
    "correctAnswer": 1,
    "explanation": "Stacks are canonically traversed from TOP down to bottom.",
    "hint": "From TOP down to Bottom."
  },
  {
    "id": 10,
    "question": "Which loop range correctly traverses a stack of length N from TOP to bottom?",
    "options": [
      "range(N - 1, -1, -1)",
      "range(N, 0, -1)",
      "range(0, N)",
      "range(N - 1, 0)"
    ],
    "correctAnswer": 0,
    "explanation": "range(N - 1, -1, -1) starts at N-1 and stops before -1 (at index 0).",
    "hint": "range(N - 1, -1, -1)."
  },
  {
    "id": 11,
    "question": "Why should you never use while stk: print(stk.pop()) inside a Display function?",
    "options": [
      "It causes syntax error",
      "It empties and destroys the stack while printing!",
      "It prints in wrong order",
      "It is slow"
    ],
    "correctAnswer": 1,
    "explanation": "Display must be non-destructive; popping elements deletes the data.",
    "hint": "Destroys the stack."
  },
  {
    "id": 12,
    "question": "What is the time complexity of Push and Pop in a list-based stack?",
    "options": [
      "O(1) Constant Time",
      "O(N) Linear Time",
      "O(N^2)",
      "O(log N)"
    ],
    "correctAnswer": 0,
    "explanation": "Both append() and pop() on the tail run in O(1) time.",
    "hint": "O(1) Constant Time."
  },
  {
    "id": 13,
    "question": "What does the expression 'len(stk) == 0' test for?",
    "options": [
      "Empty stack",
      "Full stack",
      "Even count",
      "Odd count"
    ],
    "correctAnswer": 0,
    "explanation": "len(stk) == 0 tests whether the stack has zero elements.",
    "hint": "Empty stack."
  },
  {
    "id": 14,
    "question": "In Python, which built-in function returns a reverse iterator for a list without copying it?",
    "options": [
      "reversed(stk)",
      "stk.reverse()",
      "stk.inverted()",
      "stk.back()"
    ],
    "correctAnswer": 0,
    "explanation": "reversed(stk) returns an O(1) memory reverse iterator.",
    "hint": "reversed(stk)."
  },
  {
    "id": 15,
    "question": "What does 'stk = stk.append(10)' result in?",
    "options": [
      "stk becomes [10]",
      "stk becomes None, destroying the list!",
      "stk becomes 10",
      "TypeError"
    ],
    "correctAnswer": 1,
    "explanation": "append() returns None; assigning stk = stk.append(10) sets stk to None.",
    "hint": "stk becomes None."
  },
  {
    "id": 16,
    "question": "How do you access the Name field in a record stack element [Roll, Name, Marks] at the TOP?",
    "options": [
      "stk[-1][0]",
      "stk[-1][1]",
      "stk[-1][2]",
      "stk.name"
    ],
    "correctAnswer": 1,
    "explanation": "stk[-1] accesses the top record; [1] accesses the Name.",
    "hint": "stk[-1][1]."
  },
  {
    "id": 17,
    "question": "What control structure keeps an interactive stack menu running?",
    "options": [
      "for i in range(5):",
      "while True:",
      "if True:",
      "try-except:"
    ],
    "correctAnswer": 1,
    "explanation": "while True: loop provides continuous interactive execution.",
    "hint": "while True:."
  },
  {
    "id": 18,
    "question": "How do you filter and push keys from dictionary d whose values exceed 80?",
    "options": [
      "for k, v in d.items(): if v > 80: stk.append(k)",
      "for k in d: stk.append(k)",
      "stk = list(d.keys())",
      "stk.append(80)"
    ],
    "correctAnswer": 0,
    "explanation": "Iterating through d.items() and checking if v > 80 filters keys.",
    "hint": "for k, v in d.items(): if v > 80: stk.append(k)."
  },
  {
    "id": 19,
    "question": "What condition checks if integer n is a multiple of both 3 and 7?",
    "options": [
      "n % 3 == 0 and n % 7 == 0",
      "n % 21 == 0",
      "Both A and B are valid",
      "Neither"
    ],
    "correctAnswer": 2,
    "explanation": "Both checking individual modulos or modulo 21 correctly verify multiples of both 3 and 7.",
    "hint": "Both A and B are valid."
  },
  {
    "id": 20,
    "question": "What happens if a recursive function in Python has no base case?",
    "options": [
      "It executes forever",
      "RecursionError: maximum recursion depth exceeded (Call stack overflow)",
      "Memory clears",
      "Output is None"
    ],
    "correctAnswer": 1,
    "explanation": "Unbounded recursion fills the call stack, triggering RecursionError.",
    "hint": "RecursionError (Call stack overflow)."
  },
  {
    "id": 21,
    "question": "Which of the following is NOT an application of a Stack?",
    "options": [
      "Browser Back/Forward navigation",
      "Undo operation in text editors",
      "Evaluating postfix arithmetic expressions",
      "Round Robin CPU process scheduling queue"
    ],
    "correctAnswer": 3,
    "explanation": "CPU scheduling queues use a FIFO Queue, not a LIFO Stack.",
    "hint": "Round Robin CPU scheduling queue."
  },
  {
    "id": 22,
    "question": "How can you drain an entire stack while printing each element in LIFO order?",
    "options": [
      "while len(stk) > 0: print(stk.pop())",
      "print(stk)",
      "for i in stk: print(i)",
      "stk.clear()"
    ],
    "correctAnswer": 0,
    "explanation": "Popping in a while loop drains the stack in LIFO order.",
    "hint": "while len(stk) > 0: print(stk.pop())."
  },
  {
    "id": 23,
    "question": "Can an element be popped from a stack if len(stk) == 0?",
    "options": [
      "Yes, returns 0",
      "No, it triggers Underflow and raises IndexError if not guarded",
      "Yes, returns None automatically",
      "Only on Windows"
    ],
    "correctAnswer": 1,
    "explanation": "Popping from an empty list triggers Underflow / IndexError.",
    "hint": "No, triggers Underflow."
  },
  {
    "id": 24,
    "question": "In the CBSE Class 12 CS theory paper, how many marks does the Stack coding question carry?",
    "options": [
      "1 mark",
      "3 to 4 marks",
      "10 marks",
      "15 marks"
    ],
    "correctAnswer": 1,
    "explanation": "Stack coding questions carry 3 or 4 marks in Section C/D.",
    "hint": "3 to 4 marks."
  },
  {
    "id": 25,
    "question": "Which of the following describes the Push operation on a stack?",
    "options": [
      "Adds to TOP, length increases by 1, O(1) amortized time",
      "Adds to bottom, length decreases",
      "Reads without deleting",
      "Drains the stack"
    ],
    "correctAnswer": 0,
    "explanation": "Push adds to TOP, increments length, and operates in O(1) time.",
    "hint": "Adds to TOP, length + 1, O(1) time."
  }
];

export default questions;
