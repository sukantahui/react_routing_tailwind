// 25 Authentic CBSE Board Examination Questions for Topic 2
const questions = [
  {
    "id": 1,
    "question": "What does the TOP pointer represent in a Stack?",
    "options": [
      "The first element ever added to the stack",
      "The index or reference to the most recently added (top-most) element",
      "The total memory size in bytes",
      "The bottom-most element"
    ],
    "correctAnswer": 1,
    "explanation": "TOP points to the uppermost, most recently added element in the stack.",
    "hint": "Most recently added element."
  },
  {
    "id": 2,
    "question": "What term describes the operation of inserting an element into a stack?",
    "options": [
      "Append",
      "Push",
      "Enqueue",
      "Insert"
    ],
    "correctAnswer": 1,
    "explanation": "In formal Stack terminology, adding an element is designated as Push.",
    "hint": "Push."
  },
  {
    "id": 3,
    "question": "What term describes the operation of removing the top-most element from a stack?",
    "options": [
      "Delete",
      "Dequeue",
      "Pop",
      "Drop"
    ],
    "correctAnswer": 2,
    "explanation": "In formal Stack terminology, removing the top element is designated as Pop.",
    "hint": "Pop."
  },
  {
    "id": 4,
    "question": "What is the Peek (or Top) operation?",
    "options": [
      "Removing all elements at once",
      "Inspecting or returning the top-most element without deleting it from the stack",
      "Counting total elements",
      "Reversing the stack"
    ],
    "correctAnswer": 1,
    "explanation": "Peek inspects the value of the top-most element without modifying or reducing the stack size.",
    "hint": "Inspecting top without deleting."
  },
  {
    "id": 5,
    "question": "What condition is termed 'Underflow' in stack mechanics?",
    "options": [
      "Attempting to push into a full stack",
      "Attempting to pop or peek from an empty stack",
      "When stack size exceeds 1000",
      "When numbers are negative"
    ],
    "correctAnswer": 1,
    "explanation": "Underflow occurs when a deletion or peek is attempted on an already empty stack.",
    "hint": "Attempting to pop from an empty stack."
  },
  {
    "id": 6,
    "question": "What condition is termed 'Overflow' in stack mechanics?",
    "options": [
      "Attempting to push into a completely full stack of fixed capacity",
      "Attempting to pop from an empty stack",
      "When all elements are zero",
      "When memory is cleared"
    ],
    "correctAnswer": 0,
    "explanation": "Overflow occurs when trying to push an element into a stack that has no remaining capacity.",
    "hint": "Attempting to push into a full stack."
  },
  {
    "id": 7,
    "question": "Why does a traditional Overflow rarely occur in Python list-based stacks?",
    "options": [
      "Python lists are stored on the GPU",
      "Python lists are dynamic arrays that automatically allocate additional memory as needed",
      "Python forbids overflow by law",
      "Python lists have a fixed cap of 10 elements"
    ],
    "correctAnswer": 1,
    "explanation": "Python dynamic arrays expand automatically in memory, so overflow occurs only if total system RAM is exhausted.",
    "hint": "Dynamic arrays expand automatically."
  },
  {
    "id": 8,
    "question": "What Python exception is raised if you call my_list.pop() on an empty list without an underflow check?",
    "options": [
      "ValueError",
      "IndexError: pop from empty list",
      "KeyError",
      "StackUnderflowError"
    ],
    "correctAnswer": 1,
    "explanation": "Calling .pop() on an empty list [] in Python raises 'IndexError: pop from empty list'.",
    "hint": "IndexError."
  },
  {
    "id": 9,
    "question": "In a 0-indexed Python list with 5 elements, what is the index of the TOP element?",
    "options": [
      "0",
      "4",
      "5",
      "-5"
    ],
    "correctAnswer": 1,
    "explanation": "For N=5 elements, 0-based indices run from 0 to 4, so TOP is at index 4 (or -1).",
    "hint": "Index 4 (or -1)."
  },
  {
    "id": 10,
    "question": "What is the value of TOP when the stack is completely empty?",
    "options": [
      "0",
      "1",
      "-1 (or None)",
      "Infinity"
    ],
    "correctAnswer": 2,
    "explanation": "Conventionally in computer science, TOP is initialized to -1 (or None) when empty.",
    "hint": "-1 (or None)."
  },
  {
    "id": 11,
    "question": "Does the Peek operation alter the size of the stack?",
    "options": [
      "Yes, increases size by 1",
      "Yes, decreases size by 1",
      "No, size remains unchanged",
      "Only if it returns None"
    ],
    "correctAnswer": 2,
    "explanation": "Peek is a read-only inspection operation; the stack size remains exactly the same.",
    "hint": "Size remains unchanged."
  },
  {
    "id": 12,
    "question": "In what direction are elements typically displayed when printing a stack?",
    "options": [
      "From Bottom up to Top",
      "From TOP down to Bottom",
      "In sorted order",
      "Randomly"
    ],
    "correctAnswer": 1,
    "explanation": "A stack is canonically displayed from the TOP element down to the bottom element.",
    "hint": "From TOP down to Bottom."
  },
  {
    "id": 13,
    "question": "Consider: stack = [15, 25, 35]. What does stack[-1] return?",
    "options": [
      "15",
      "25",
      "35 (the TOP element)",
      "IndexError"
    ],
    "correctAnswer": 2,
    "explanation": "In Python, index -1 accesses the last element of the list, which corresponds to the TOP of the stack (35).",
    "hint": "35 (the TOP element)."
  },
  {
    "id": 14,
    "question": "What does the expression len(stack) == 0 test for?",
    "options": [
      "Full stack",
      "Overflow condition",
      "Empty stack (Underflow check)",
      "Even count"
    ],
    "correctAnswer": 2,
    "explanation": "len(stack) == 0 checks if the stack is completely empty.",
    "hint": "Empty stack."
  },
  {
    "id": 15,
    "question": "If a stack of maximum capacity 3 currently contains [10, 20, 30], what condition is triggered if Push(40) is attempted?",
    "options": [
      "Underflow",
      "Overflow",
      "Memory Leak",
      "Success"
    ],
    "correctAnswer": 1,
    "explanation": "Attempting to insert into a full stack of fixed capacity triggers an Overflow condition.",
    "hint": "Overflow."
  },
  {
    "id": 16,
    "question": "What is the time complexity of the Peek operation in a list-based stack?",
    "options": [
      "O(1)",
      "O(N)",
      "O(log N)",
      "O(N^2)"
    ],
    "correctAnswer": 0,
    "explanation": "Accessing stack[-1] is an O(1) direct memory lookup.",
    "hint": "O(1)."
  },
  {
    "id": 17,
    "question": "Consider: Push(10), Push(20), Peek(), Pop(). What is the return value of Pop()?",
    "options": [
      "10",
      "20",
      "None",
      "30"
    ],
    "correctAnswer": 1,
    "explanation": "Peek() does not remove 20, so Pop() subsequently removes and returns 20.",
    "hint": "20."
  },
  {
    "id": 18,
    "question": "In CBSE board marking schemes for a Pop function, how many marks are typically allotted for checking Underflow?",
    "options": [
      "½ to 1 mark",
      "0 marks",
      "All 4 marks",
      "3 marks"
    ],
    "correctAnswer": 0,
    "explanation": "Marking rubrics consistently allocate ½ to 1 mark specifically for guarding against Underflow before popping.",
    "hint": "½ to 1 mark."
  },
  {
    "id": 19,
    "question": "Which of the following functions correctly prints an Underflow message when popping from an empty stack?",
    "options": [
      "def Pop(s): if len(s)==0: print('Underflow') else: return s.pop()",
      "def Pop(s): return s.pop()",
      "def Pop(s): s.append(0)",
      "def Pop(s): s = []"
    ],
    "correctAnswer": 0,
    "explanation": "Checking len(s)==0 and printing 'Underflow' correctly prevents runtime crash.",
    "hint": "Check len(s)==0 first."
  },
  {
    "id": 20,
    "question": "Can a stack hold heterogenous datatypes in Python (e.g. integers, strings, floats)?",
    "options": [
      "No, Python forbids mixed types",
      "Yes, Python lists can store elements of any mixed datatypes simultaneously",
      "Only integers and floats",
      "Only strings"
    ],
    "correctAnswer": 1,
    "explanation": "Python lists are heterogeneous, so a list-based stack can hold mixed types.",
    "hint": "Yes, mixed datatypes are supported."
  },
  {
    "id": 21,
    "question": "What happens to the TOP pointer when a new element is pushed onto a non-empty stack?",
    "options": [
      "It decreases by 1",
      "It increases by 1",
      "It resets to 0",
      "It becomes None"
    ],
    "correctAnswer": 1,
    "explanation": "Pushing increases the stack depth by 1, advancing TOP by +1.",
    "hint": "Increases by 1."
  },
  {
    "id": 22,
    "question": "What happens to the TOP pointer when an element is popped from a stack with 3 items?",
    "options": [
      "Decreases by 1 (moves from index 2 to index 1)",
      "Increases by 1",
      "Remains at index 2",
      "Becomes -1"
    ],
    "correctAnswer": 0,
    "explanation": "Popping decrements the stack size by 1, shifting TOP down to the preceding element.",
    "hint": "Decreases by 1."
  },
  {
    "id": 23,
    "question": "What is returned if Pop() is called on stack = ['Delhi', 'Mumbai', 'Kolkata']?",
    "options": [
      "'Delhi'",
      "'Mumbai'",
      "'Kolkata'",
      "['Delhi', 'Mumbai']"
    ],
    "correctAnswer": 2,
    "explanation": "'Kolkata' was added last at the TOP, so it is popped first.",
    "hint": "'Kolkata'."
  },
  {
    "id": 24,
    "question": "In an exam question: 'Write a function Display(stk) to display all elements of stack', what should be displayed if stk is empty?",
    "options": [
      "Crash the program",
      "Print 'Stack Empty' or 'Underflow'",
      "Print zeroes",
      "Print -1"
    ],
    "correctAnswer": 1,
    "explanation": "If the stack has no elements, a clean message like 'Stack Empty' should be printed.",
    "hint": "Print 'Stack Empty'."
  },
  {
    "id": 25,
    "question": "Which of the following is true regarding Stack operations?",
    "options": [
      "Push, Pop, and Peek all have O(1) time complexity when implemented at the end of a Python list",
      "Push is O(N) and Pop is O(1)",
      "Peek is O(N^2)",
      "Pop deletes all elements"
    ],
    "correctAnswer": 0,
    "explanation": "All three primary stack operations operate in constant O(1) time when utilizing the end of a Python list.",
    "hint": "All three have O(1) constant time."
  }
];

export default questions;
