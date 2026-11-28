// 25 Authentic CBSE Board Examination Questions for Topic 5
const questions = [
  {
    "id": 1,
    "question": "Which Python list method is used to remove and return the top-most element in a stack?",
    "options": [
      "stk.remove()",
      "stk.pop()",
      "stk.delete()",
      "stk.drop()"
    ],
    "correctAnswer": 1,
    "explanation": "stk.pop() removes and returns the last element from the list.",
    "hint": "stk.pop()."
  },
  {
    "id": 2,
    "question": "What argument should be passed to list.pop() to remove the top element in our stack?",
    "options": [
      "0",
      "-1 (or omit argument entirely, since default is -1)",
      "len(stk)",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "By default, list.pop() removes the last element (index -1), matching the TOP of the stack.",
    "hint": "No argument or -1."
  },
  {
    "id": 3,
    "question": "What exception occurs if list.pop() is called on an empty list?",
    "options": [
      "IndexError: pop from empty list",
      "ValueError",
      "KeyError",
      "StackEmptyException"
    ],
    "correctAnswer": 0,
    "explanation": "Python raises IndexError: pop from empty list.",
    "hint": "IndexError."
  },
  {
    "id": 4,
    "question": "What condition MUST be checked before calling stk.pop() to prevent crashes?",
    "options": [
      "Check if numbers are positive",
      "Check if stack is empty (len(stk) == 0)",
      "Check if file is open",
      "Check if string has vowels"
    ],
    "correctAnswer": 1,
    "explanation": "Guarding against an empty stack (Underflow) is mandatory before popping.",
    "hint": "Check len(stk) == 0."
  },
  {
    "id": 5,
    "question": "What is the return value of list.pop() when popping an element from [10, 20, 30]?",
    "options": [
      "None",
      "30",
      "[10, 20]",
      "10"
    ],
    "correctAnswer": 1,
    "explanation": "list.pop() returns the removed element (30 in this case).",
    "hint": "30."
  },
  {
    "id": 6,
    "question": "What is the difference between list.remove(x) and list.pop()?",
    "options": [
      "They are identical",
      "remove(x) searches and deletes the first matching value x by search; pop() deletes and returns the element by position (default index -1)",
      "remove is faster",
      "pop requires strings"
    ],
    "correctAnswer": 1,
    "explanation": "remove(x) searches for value x; pop() extracts by index in O(1) time without searching.",
    "hint": "pop() extracts by index in O(1)."
  },
  {
    "id": 7,
    "question": "What is the time complexity of stk.pop() removing the last element?",
    "options": [
      "O(1) Constant Time",
      "O(N) Linear Time",
      "O(N^2)",
      "O(log N)"
    ],
    "correctAnswer": 0,
    "explanation": "Removing the last item requires no memory shifting, operating in O(1) time.",
    "hint": "O(1) Constant Time."
  },
  {
    "id": 8,
    "question": "What message is conventionally displayed in CBSE exams when Underflow occurs in Pop?",
    "options": [
      "'Underflow' or 'Stack is empty'",
      "'Syntax Error'",
      "'Fatal Error'",
      "'Restart System'"
    ],
    "correctAnswer": 0,
    "explanation": "CBSE marking schemes expect 'Underflow' or 'Stack is empty'.",
    "hint": "'Underflow' or 'Stack is empty'."
  },
  {
    "id": 9,
    "question": "Consider: def Pop(stk): if len(stk) == 0: print('Underflow') else: return stk.pop(). If stk = [100], what happens?",
    "options": [
      "Prints Underflow",
      "100 is returned, and stk becomes empty []",
      "IndexError",
      "Returns None"
    ],
    "correctAnswer": 1,
    "explanation": "The else branch pops 100, leaving stk as [].",
    "hint": "100 is returned, stk becomes []."
  },
  {
    "id": 10,
    "question": "What happens to the stack size (len(stk)) when Pop() executes successfully?",
    "options": [
      "Increases by 1",
      "Decreases by 1",
      "Remains unchanged",
      "Doubles"
    ],
    "correctAnswer": 1,
    "explanation": "A successful Pop removes one element, decrementing length by 1.",
    "hint": "Decreases by 1."
  },
  {
    "id": 11,
    "question": "Consider: while len(stk) > 0: print(Pop(stk)). What does this loop do?",
    "options": [
      "Loops forever",
      "Pops and displays all elements in LIFO order until the stack is empty",
      "Pushes elements",
      "Prints only the first element"
    ],
    "correctAnswer": 1,
    "explanation": "It extracts and prints elements in reverse order until the stack is completely drained.",
    "hint": "Pops all elements in LIFO order."
  },
  {
    "id": 12,
    "question": "In CBSE board marking keys, what score is deducted if a student writes 'stk.pop()' without checking for empty stack?",
    "options": [
      "0 marks",
      "½ to 1 mark",
      "All 3 marks",
      "Zero marks if it works on sample input"
    ],
    "correctAnswer": 1,
    "explanation": "Examiners deduct ½ to 1 mark for omitting the empty/Underflow guard.",
    "hint": "½ to 1 mark."
  },
  {
    "id": 13,
    "question": "Can Pop() return multiple values at once in a standard Stack ADT?",
    "options": [
      "Yes, pop takes a count argument",
      "No, in a standard stack ADT, Pop removes strictly ONE element at a time from the TOP",
      "Only if elements are strings",
      "Only in Python 3.12"
    ],
    "correctAnswer": 1,
    "explanation": "A standard Stack Pop operation removes exactly one element from TOP.",
    "hint": "Strictly ONE element at a time."
  },
  {
    "id": 14,
    "question": "Consider: stack = ['A', 'B', 'C']. What is the value of item after item = stack.pop()?",
    "options": [
      "'A'",
      "'B'",
      "'C'",
      "['A', 'B']"
    ],
    "correctAnswer": 2,
    "explanation": "'C' was at the TOP (end of list), so it is popped.",
    "hint": "'C'."
  },
  {
    "id": 15,
    "question": "What is the contents of stack after executing item = stack.pop() on ['A', 'B', 'C']?",
    "options": [
      "['A', 'B']",
      "['B', 'C']",
      "['C']",
      "[]"
    ],
    "correctAnswer": 0,
    "explanation": "Removing 'C' leaves ['A', 'B'].",
    "hint": "['A', 'B']."
  },
  {
    "id": 16,
    "question": "How do you pop an element and store it into variable 'deleted_val' safely?",
    "options": [
      "if len(stk) > 0: deleted_val = stk.pop()",
      "deleted_val = stk.pop(safe=True)",
      "deleted_val = pop(stk)",
      "stk.delete(deleted_val)"
    ],
    "correctAnswer": 0,
    "explanation": "Checking len(stk) > 0 ensures safe popping without IndexError.",
    "hint": "if len(stk) > 0: deleted_val = stk.pop()."
  },
  {
    "id": 17,
    "question": "What happens if you call stk.pop(0) instead of stk.pop()?",
    "options": [
      "Pops from the top",
      "Removes from the bottom (index 0), which violates the LIFO principle and takes O(N) time",
      "Raises syntax error",
      "Deletes all elements"
    ],
    "correctAnswer": 1,
    "explanation": "stk.pop(0) removes from the front (FIFO behavior, like a Queue), violating Stack LIFO semantics.",
    "hint": "Removes from bottom, violating LIFO."
  },
  {
    "id": 18,
    "question": "If a stack has 10 elements, how many Pop operations are required to empty it?",
    "options": [
      "1",
      "5",
      "10",
      "Infinite"
    ],
    "correctAnswer": 2,
    "explanation": "Each Pop removes 1 element, requiring exactly 10 calls.",
    "hint": "10."
  },
  {
    "id": 19,
    "question": "Consider: def Pop(stk): if not stk: return None return stk.pop(). If stk = [], what is the return value?",
    "options": [
      "IndexError",
      "None",
      "0",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "The guard clause triggers and returns None cleanly.",
    "hint": "None."
  },
  {
    "id": 20,
    "question": "What data structure operation corresponds to 'stk.pop()'?",
    "options": [
      "Enqueue",
      "Push",
      "Pop",
      "Peek"
    ],
    "correctAnswer": 2,
    "explanation": "stk.pop() implements the Pop operation.",
    "hint": "Pop."
  },
  {
    "id": 21,
    "question": "Can an element popped from one stack be immediately pushed onto another stack?",
    "options": [
      "No, elements are destroyed",
      "Yes, e.g. stack2.append(stack1.pop()) transfers elements between stacks",
      "Only if converted to int",
      "Only with queues"
    ],
    "correctAnswer": 1,
    "explanation": "Popping from one stack and pushing to another is a classic algorithm (e.g. implementing queues using two stacks).",
    "hint": "Yes, transfers elements between stacks."
  },
  {
    "id": 22,
    "question": "What is the state of a stack after: Push(1), Push(2), Pop(), Pop()?",
    "options": [
      "[1, 2]",
      "[1]",
      "[] (Empty Stack)",
      "[2]"
    ],
    "correctAnswer": 2,
    "explanation": "Two pushes followed by two pops leaves the stack completely empty.",
    "hint": "[] (Empty Stack)."
  },
  {
    "id": 23,
    "question": "Consider: def Pop(stk): if len(stk) == 0: print('Underflow') return stk.pop(). What is flawed about this function?",
    "options": [
      "Missing brackets",
      "It prints 'Underflow' but still calls stk.pop(), which immediately crashes with IndexError!",
      "It does not accept integers",
      "It uses len"
    ],
    "correctAnswer": 1,
    "explanation": "Without an 'else:' or an early 'return None', execution proceeds to stk.pop(), crashing on empty list.",
    "hint": "Proceeds to call stk.pop() and crashes."
  },
  {
    "id": 24,
    "question": "In practical examination vivas, what is the external examiner's standard question on Pop?",
    "options": [
      "'What happens if you pop from an empty stack?' (Answer: Underflow)",
      "'How much does Python cost?'",
      "'What is the color of a stack?'",
      "'Can a stack fly?'"
    ],
    "correctAnswer": 0,
    "explanation": "Examiners universally ask students to define Underflow and explain how they guard against it.",
    "hint": "Underflow definition and guard."
  },
  {
    "id": 25,
    "question": "Which of the following functions is 100% compliant with CBSE Class 12 board marking keys?",
    "options": [
      "def Pop(stk):\\n    if len(stk) == 0:\\n        print('Underflow')\\n        return None\\n    else:\\n        return stk.pop()",
      "def Pop(stk):\\n    return stk.pop()",
      "def Pop(stk):\\n    del stk[0]",
      "def Pop(stk):\\n    stk = []"
    ],
    "correctAnswer": 0,
    "explanation": "Checking len(stk) == 0, printing Underflow, returning None, and calling stk.pop() in else is the ideal answer.",
    "hint": "Full underflow check + else return stk.pop()."
  }
];

export default questions;
