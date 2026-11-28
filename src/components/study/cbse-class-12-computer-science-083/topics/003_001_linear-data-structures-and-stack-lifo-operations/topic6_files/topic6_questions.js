// 25 Authentic CBSE Board Examination Questions for Topic 6
const questions = [
  {
    "id": 1,
    "question": "What does the Peek operation do in a Stack?",
    "options": [
      "Removes all elements",
      "Returns or displays the value of the top-most element without deleting it",
      "Pushes a new element",
      "Sorts the stack"
    ],
    "correctAnswer": 1,
    "explanation": "Peek inspects the top element without modifying or reducing the stack.",
    "hint": "Inspects top element without deleting."
  },
  {
    "id": 2,
    "question": "What is the primary difference between Pop() and Peek()?",
    "options": [
      "Pop deletes the top element; Peek leaves the stack unmodified",
      "Pop is read-only; Peek deletes",
      "There is no difference",
      "Peek deletes all elements"
    ],
    "correctAnswer": 0,
    "explanation": "Pop removes and returns the top element; Peek reads the top element without removal.",
    "hint": "Pop deletes; Peek leaves stack unmodified."
  },
  {
    "id": 3,
    "question": "Which Python index accesses the top element of a stack implemented as a list?",
    "options": [
      "stk[0]",
      "stk[1]",
      "stk[-1]",
      "stk[len(stk)]"
    ],
    "correctAnswer": 2,
    "explanation": "stk[-1] accesses the last element (TOP) in Python.",
    "hint": "stk[-1]."
  },
  {
    "id": 4,
    "question": "What happens if you execute stk[-1] on an empty list []?",
    "options": [
      "Returns None",
      "Raises IndexError: list index out of range",
      "Returns 0",
      "Creates an element"
    ],
    "correctAnswer": 1,
    "explanation": "Indexing an empty list raises IndexError.",
    "hint": "IndexError."
  },
  {
    "id": 5,
    "question": "What is the time complexity of the Peek operation in Python?",
    "options": [
      "O(1) Constant Time",
      "O(N) Linear Time",
      "O(N^2)",
      "O(log N)"
    ],
    "correctAnswer": 0,
    "explanation": "Index lookup stack[-1] computes memory address directly in O(1) time.",
    "hint": "O(1) Constant Time."
  },
  {
    "id": 6,
    "question": "Does the length of the stack (len(stk)) change after executing Peek(stk)?",
    "options": [
      "Yes, decreases by 1",
      "Yes, increases by 1",
      "No, it remains exactly the same",
      "Only if stack has 1 item"
    ],
    "correctAnswer": 2,
    "explanation": "Peek is a read-only operation; stack length remains unaltered.",
    "hint": "Remains exactly the same."
  },
  {
    "id": 7,
    "question": "Consider: def Peek(stk): if len(stk) == 0: return None else: return stk[-1]. If stk = [5, 10, 15], what does Peek(stk) return?",
    "options": [
      "5",
      "10",
      "15",
      "[5, 10, 15]"
    ],
    "correctAnswer": 2,
    "explanation": "The element at the top is 15.",
    "hint": "15."
  },
  {
    "id": 8,
    "question": "If we execute Peek() three times consecutively on a non-empty stack without pushing or popping, what is returned?",
    "options": [
      "Three different elements",
      "The identical top element all three times",
      "None on the third call",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "Because Peek does not remove elements, the top item remains unchanged across multiple calls.",
    "hint": "Identical top element all three times."
  },
  {
    "id": 9,
    "question": "What is another common name used for the Peek operation?",
    "options": [
      "Top()",
      "Head()",
      "First()",
      "Inspect()"
    ],
    "correctAnswer": 0,
    "explanation": "Peek is commonly called Top() in many textbooks and programming languages.",
    "hint": "Top()."
  },
  {
    "id": 10,
    "question": "Can Peek be used in expression evaluation to check the operator precedence at the top of the operator stack?",
    "options": [
      "No, operators cannot be peeked",
      "Yes, compilers peek at the top operator to compare precedence before pushing",
      "Only in binary arithmetic",
      "Only in Java"
    ],
    "correctAnswer": 1,
    "explanation": "Infix to Postfix conversion relies heavily on Peek to inspect the top operator's precedence.",
    "hint": "Yes, used to compare operator precedence."
  },
  {
    "id": 11,
    "question": "Consider: stack = ['A']. If we execute Peek(stack), followed by Pop(stack), what did Peek return and what did Pop return?",
    "options": [
      "Both returned 'A'",
      "Peek returned 'A', Pop returned None",
      "Peek returned None, Pop returned 'A'",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Peek inspects 'A' leaving the stack intact; Pop then removes and returns 'A'.",
    "hint": "Both returned 'A'."
  },
  {
    "id": 12,
    "question": "What does the expression stk[len(stk) - 1] evaluate to?",
    "options": [
      "First element",
      "Last element (identical to stk[-1])",
      "Length",
      "IndexError always"
    ],
    "correctAnswer": 1,
    "explanation": "In 0-based indexing, len(stk)-1 is the exact index of the last element.",
    "hint": "Last element (identical to stk[-1])."
  },
  {
    "id": 13,
    "question": "Why is stk[-1] preferred over stk[len(stk) - 1] in Python?",
    "options": [
      "stk[-1] is more concise, idiomatic Python",
      "stk[len-1] is deprecated",
      "stk[-1] bypasses bounds checking",
      "No reason"
    ],
    "correctAnswer": 0,
    "explanation": "Negative indexing stk[-1] is clean, readable, and idiomatic Python.",
    "hint": "Concise and idiomatic Python."
  },
  {
    "id": 14,
    "question": "What should Peek(stk) return if stk is empty?",
    "options": [
      "None (or display 'Empty Stack')",
      "0",
      "-1",
      "Raise unhandled exception"
    ],
    "correctAnswer": 0,
    "explanation": "Returning None or printing a message cleanly handles the empty stack.",
    "hint": "None or 'Empty Stack'."
  },
  {
    "id": 15,
    "question": "Consider: Push(10), Push(20), Peek(), Push(30), Pop(). What is the final TOP element?",
    "options": [
      "10",
      "20",
      "30",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "Trace: [10] -> [10, 20] -> Peek reads 20 -> [10, 20, 30] -> Pop removes 30 -> [10, 20]. TOP is 20.",
    "hint": "TOP is 20."
  },
  {
    "id": 16,
    "question": "Can Peek be used to verify balanced parentheses in a compiler?",
    "options": [
      "No",
      "Yes, to check if the top opening bracket matches the current closing bracket",
      "Only for curly braces",
      "Only in C"
    ],
    "correctAnswer": 1,
    "explanation": "Compilers peek at the stack to ensure '(' matches ')' before popping.",
    "hint": "Yes, verifies bracket matching."
  },
  {
    "id": 17,
    "question": "Is Peek an essential operation defined in the formal Stack ADT?",
    "options": [
      "No, only Push and Pop are strictly required, but Peek is universally included for practical utility",
      "Yes, stacks cannot function without Peek",
      "Peek is illegal in stacks",
      "Peek is a hardware operation"
    ],
    "correctAnswer": 0,
    "explanation": "Push and Pop are minimal primitives; Peek is universally included as a standard convenience operation.",
    "hint": "Universally included standard operation."
  },
  {
    "id": 18,
    "question": "What happens if a student writes: def Peek(stk): return stk.pop()?",
    "options": [
      "Correct implementation of Peek",
      "Incorrect! This is Pop(), not Peek, because it deletes the element!",
      "Runs in O(N)",
      "Deletes entire stack"
    ],
    "correctAnswer": 1,
    "explanation": "Calling pop() deletes the item, violating the non-destructive contract of Peek.",
    "hint": "Incorrect: deletes the element."
  },
  {
    "id": 19,
    "question": "How can Peek be simulated if only Push and Pop operations are available?",
    "options": [
      "val = Pop(stk); Push(stk, val); return val",
      "It cannot be simulated",
      "stk.clear()",
      "len(stk)"
    ],
    "correctAnswer": 0,
    "explanation": "Popping the top item, saving it, and immediately pushing it back restores the stack state.",
    "hint": "Pop, save value, push back."
  },
  {
    "id": 20,
    "question": "Consider: stack = [100, 200, 300]. What is the index of the element returned by Peek?",
    "options": [
      "0",
      "1",
      "2 (which is -1)",
      "3"
    ],
    "correctAnswer": 2,
    "explanation": "Index 2 is the last index for a 3-element list.",
    "hint": "Index 2 (or -1)."
  },
  {
    "id": 21,
    "question": "In a composite record stack containing [Roll, Name, Marks], what does Peek(stk)[1] return?",
    "options": [
      "The Roll of top student",
      "The Name of top student",
      "The Marks of top student",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "Peek(stk) returns the top record [Roll, Name, Marks]; indexing [1] accesses the Name.",
    "hint": "Name of the top student."
  },
  {
    "id": 22,
    "question": "What exception occurs if a non-list object like an integer is passed to Peek(5)?",
    "options": [
      "TypeError: 'int' object is not subscriptable",
      "IndexError",
      "ValueError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Attempting to index an integer with [-1] raises TypeError: 'int' object is not subscriptable.",
    "hint": "TypeError."
  },
  {
    "id": 23,
    "question": "What is printed by: if Peek(stk) is not None: print('Top exists') on stack = [0]?",
    "options": [
      "Nothing",
      "'Top exists' (since 0 is not None)",
      "Error",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "The element is 0, which is a valid value not equal to None.",
    "hint": "'Top exists'."
  },
  {
    "id": 24,
    "question": "Does Peek require any parameters other than the stack list itself?",
    "options": [
      "Yes, requires element value",
      "No, it only needs the stack list reference: def Peek(stk)",
      "Requires an index parameter",
      "Requires file pointer"
    ],
    "correctAnswer": 1,
    "explanation": "Peek only requires the stack reference because it always inspects the fixed TOP position.",
    "hint": "Only needs stack reference (stk)."
  },
  {
    "id": 25,
    "question": "Which of the following functions represents the cleanest Python implementation of Peek?",
    "options": [
      "def Peek(stk):\\n    return stk[-1] if stk else None",
      "def Peek(stk):\\n    stk.pop()",
      "def Peek(stk):\\n    stk[0]",
      "def Peek(stk):\\n    print(stk)"
    ],
    "correctAnswer": 0,
    "explanation": "return stk[-1] if stk else None is concise, safe, and returns None on empty stack.",
    "hint": "return stk[-1] if stk else None."
  }
];

export default questions;
