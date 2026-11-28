// 25 Authentic CBSE Board Examination Questions for Topic 1
const questions = [
  {
    "id": 1,
    "question": "What is the primary governing principle of a Stack data structure?",
    "options": [
      "FIFO (First In, First Out)",
      "LIFO (Last In, First Out)",
      "Random Access",
      "Priority Based Access"
    ],
    "correctAnswer": 1,
    "explanation": "A Stack strictly operates on LIFO (Last In, First Out) where the last element inserted is the first to be removed.",
    "hint": "LIFO (Last In, First Out)."
  },
  {
    "id": 2,
    "question": "At which end of the stack do all insertions and deletions take place?",
    "options": [
      "BOTTOM",
      "MIDDLE",
      "TOP",
      "Both TOP and BOTTOM"
    ],
    "correctAnswer": 2,
    "explanation": "In a stack, both insertions (Push) and deletions (Pop) take place exclusively at the TOP.",
    "hint": "TOP."
  },
  {
    "id": 3,
    "question": "Which of the following real-world scenarios perfectly mirrors a Stack?",
    "options": [
      "People standing in a ticket counter queue",
      "A stack of plates placed one upon another in a buffet",
      "A circle of musical chairs",
      "Vehicles passing through a toll booth"
    ],
    "correctAnswer": 1,
    "explanation": "Plates stacked in a buffet are added to the top and picked from the top, embodying LIFO.",
    "hint": "Stack of buffet plates."
  },
  {
    "id": 4,
    "question": "What is an alternative acronym for the LIFO principle?",
    "options": [
      "FILO (First In, Last Out)",
      "FIFO (First In, First Out)",
      "SISO (Single In, Single Out)",
      "LILO (Last In, Last Out)"
    ],
    "correctAnswer": 0,
    "explanation": "LIFO (Last In, First Out) and FILO (First In, Last Out) describe the identical access order.",
    "hint": "FILO (First In, Last Out)."
  },
  {
    "id": 5,
    "question": "Which computer system subsystem relies directly on a stack for managing function execution and local variables?",
    "options": [
      "Hard disk sector allocation table",
      "The runtime Call Stack (Execution Stack)",
      "The network Ethernet card",
      "The monitor display buffer"
    ],
    "correctAnswer": 1,
    "explanation": "Programming languages use the Call Stack to store stack frames for active function calls and local variables.",
    "hint": "The runtime Call Stack."
  },
  {
    "id": 6,
    "question": "How does the 'Undo' (Ctrl+Z) feature in text editors like MS Word utilize a stack?",
    "options": [
      "It saves files to the cloud",
      "Each edit operation is pushed onto a stack; pressing Undo pops and reverses the most recent operation first",
      "It sorts text alphabetically",
      "It formats fonts"
    ],
    "correctAnswer": 1,
    "explanation": "The most recent action pushed onto the undo stack is popped first, reversing changes in reverse chronological order.",
    "hint": "Pushes actions and pops most recent first."
  },
  {
    "id": 7,
    "question": "If elements 'A', 'B', 'C', 'D' are pushed onto a stack in that order, in what order will they be popped?",
    "options": [
      "A, B, C, D",
      "D, C, B, A",
      "B, A, D, C",
      "A, D, B, C"
    ],
    "correctAnswer": 1,
    "explanation": "Because the last element pushed is 'D', it is popped first, followed by 'C', 'B', and 'A' (D, C, B, A).",
    "hint": "Reverse order: D, C, B, A."
  },
  {
    "id": 8,
    "question": "Which compiler operation uses a stack to ensure syntactically valid code?",
    "options": [
      "Parentheses and bracket matching (e.g. balanced { [ ( ) ] })",
      "Calculating battery life",
      "Compiling images",
      "Allocating IP addresses"
    ],
    "correctAnswer": 0,
    "explanation": "Compilers push opening brackets onto a stack and pop them when matching closing brackets occur.",
    "hint": "Parentheses and bracket matching."
  },
  {
    "id": 9,
    "question": "What notation is commonly evaluated using a Stack in computer science?",
    "options": [
      "Postfix (Reverse Polish Notation)",
      "Infix without parentheses",
      "Roman Numerals",
      "Binary Coded Decimal"
    ],
    "correctAnswer": 0,
    "explanation": "Stacks are universally used to evaluate Postfix expressions efficiently in O(N) time.",
    "hint": "Postfix notation."
  },
  {
    "id": 10,
    "question": "How does the 'Back' button in a web browser navigate history?",
    "options": [
      "Using a queue",
      "Using a stack where visited URLs are pushed, and clicking Back pops the most recent page",
      "Using random access",
      "By reloading the operating system"
    ],
    "correctAnswer": 1,
    "explanation": "Web browser forward/back buttons are implemented using two URL history stacks.",
    "hint": "Pops most recent page from history stack."
  },
  {
    "id": 11,
    "question": "What happens when a recursive function in Python calls itself infinitely without a base condition?",
    "options": [
      "The computer reboots",
      "RecursionError: maximum recursion depth exceeded (Call stack overflow)",
      "Memory doubles",
      "The file saves automatically"
    ],
    "correctAnswer": 1,
    "explanation": "Each recursive call consumes a call stack frame until the recursion limit is hit, raising RecursionError.",
    "hint": "RecursionError / Call stack overflow."
  },
  {
    "id": 12,
    "question": "Can an element in the middle of a stack be accessed or removed directly in a pure Stack ADT?",
    "options": [
      "Yes, stacks allow arbitrary index access",
      "No, in a pure stack only the top-most element is directly accessible",
      "Only if it is an integer",
      "Only in Python 3"
    ],
    "correctAnswer": 1,
    "explanation": "In a formal Stack ADT, only the top element can be inspected or removed; intermediate elements cannot be accessed directly without popping items above them.",
    "hint": "Only the top element is accessible."
  },
  {
    "id": 13,
    "question": "Consider: Push(10), Push(20), Pop(), Push(30), Push(40), Pop(). What is the element at the TOP?",
    "options": [
      "10",
      "20",
      "30",
      "40"
    ],
    "correctAnswer": 2,
    "explanation": "Trace: [10] -> [10, 20] -> Pop 20 [10] -> [10, 30] -> [10, 30, 40] -> Pop 40 [10, 30]. TOP is 30.",
    "hint": "Trace sequentially: TOP is 30."
  },
  {
    "id": 14,
    "question": "Consider: Push(5), Push(10), Push(15). If we execute two consecutive Pop() operations, which element is removed in the second Pop?",
    "options": [
      "5",
      "10",
      "15",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "First Pop removes 15. Second Pop removes 10.",
    "hint": "Second Pop removes 10."
  },
  {
    "id": 15,
    "question": "What graph traversal algorithm uses a stack (either explicitly or via recursion)?",
    "options": [
      "Breadth First Search (BFS)",
      "Depth First Search (DFS)",
      "Dijkstra's Algorithm",
      "Binary Search"
    ],
    "correctAnswer": 1,
    "explanation": "Depth First Search (DFS) relies on a stack for backtracking along graph paths.",
    "hint": "Depth First Search (DFS)."
  },
  {
    "id": 16,
    "question": "In Python, which built-in data type is most commonly used to implement a stack for CBSE Class 12?",
    "options": [
      "dict",
      "set",
      "list",
      "tuple"
    ],
    "correctAnswer": 2,
    "explanation": "Python's dynamic list structure with append() and pop() is the standard stack implementation.",
    "hint": "list."
  },
  {
    "id": 17,
    "question": "Why is a tuple unsuitable for implementing a Stack in Python?",
    "options": [
      "Tuples do not support numbers",
      "Tuples are immutable; elements cannot be appended or popped dynamically",
      "Tuples have no index",
      "Tuples cannot be printed"
    ],
    "correctAnswer": 1,
    "explanation": "Tuples cannot be modified after creation (immutable), making Push and Pop impossible.",
    "hint": "Tuples are immutable."
  },
  {
    "id": 18,
    "question": "What is the time complexity of pushing an element onto the top of a stack implemented with a Python list?",
    "options": [
      "O(1) amortized",
      "O(N)",
      "O(N^2)",
      "O(log N)"
    ],
    "correctAnswer": 0,
    "explanation": "Appending to the end of a Python list runs in O(1) amortized constant time.",
    "hint": "O(1) amortized constant time."
  },
  {
    "id": 19,
    "question": "What is the time complexity of popping an element from the top of a stack implemented with a Python list (list.pop())?",
    "options": [
      "O(1) constant time",
      "O(N) linear time",
      "O(N^2)",
      "O(log N)"
    ],
    "correctAnswer": 0,
    "explanation": "Removing the last element (list.pop()) requires zero element shifting, running in O(1) time.",
    "hint": "O(1) constant time."
  },
  {
    "id": 20,
    "question": "What would be the time complexity if we implemented Push and Pop at index 0 of a list (list.insert(0, x) and list.pop(0))?",
    "options": [
      "O(1)",
      "O(N) because every existing element must be shifted in memory",
      "O(N^2)",
      "O(0)"
    ],
    "correctAnswer": 1,
    "explanation": "Inserting or removing at index 0 forces all remaining elements to shift, degrading performance to O(N).",
    "hint": "O(N) due to memory shifting."
  },
  {
    "id": 21,
    "question": "Which end of a Python list should be designated as the TOP of the stack for optimal performance?",
    "options": [
      "Index 0 (the beginning)",
      "The end of the list (index -1 / len-1)",
      "The middle element",
      "Any random index"
    ],
    "correctAnswer": 1,
    "explanation": "The end of the list allows O(1) append() and pop() without element shifting.",
    "hint": "The end of the list (index -1)."
  },
  {
    "id": 22,
    "question": "What term describes the state when a stack contains zero elements?",
    "options": [
      "Full Stack",
      "Empty Stack",
      "Nullified Stack",
      "Zero Stack"
    ],
    "correctAnswer": 1,
    "explanation": "A stack containing zero elements is called an Empty Stack.",
    "hint": "Empty Stack."
  },
  {
    "id": 23,
    "question": "Consider string 'PYTHON'. If its letters are pushed onto a stack one by one and then popped until empty, what word is printed?",
    "options": [
      "PYTHON",
      "NOHTYP",
      "PTHON",
      "TYPHON"
    ],
    "correctAnswer": 1,
    "explanation": "Popping reverses the sequence: 'NOHTYP'. Stacks are natural sequence reversers.",
    "hint": "Reversed: NOHTYP."
  },
  {
    "id": 24,
    "question": "Why is a stack called a 'Restricted' data structure?",
    "options": [
      "It requires special OS administrator permissions",
      "Access, insertion, and deletion are restricted to only one end (the TOP)",
      "It can only hold 8-bit characters",
      "It can only be used in games"
    ],
    "correctAnswer": 1,
    "explanation": "It is restricted because operations cannot occur at arbitrary positions, only at the TOP.",
    "hint": "Operations are restricted to the TOP."
  },
  {
    "id": 25,
    "question": "In the CBSE Class 12 board curriculum, how many marks is a Stack programming question typically worth?",
    "options": [
      "1 mark",
      "3 to 4 marks",
      "10 marks",
      "15 marks"
    ],
    "correctAnswer": 1,
    "explanation": "The Stack implementation question (Push and Pop functions) carries 3 or 4 marks in the theory paper.",
    "hint": "3 to 4 marks."
  }
];

export default questions;
