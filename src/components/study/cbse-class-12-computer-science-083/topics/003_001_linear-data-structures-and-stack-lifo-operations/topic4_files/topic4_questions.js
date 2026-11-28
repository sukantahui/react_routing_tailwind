// 25 Authentic CBSE Board Examination Questions for Topic 4
const questions = [
  {
    "id": 1,
    "question": "Which Python list method is used to implement the Push operation on a stack?",
    "options": [
      "stk.push()",
      "stk.append()",
      "stk.add()",
      "stk.insert_top()"
    ],
    "correctAnswer": 1,
    "explanation": "Python lists do not have a built-in 'push()' method; the standard list method stk.append(item) is used.",
    "hint": "stk.append()."
  },
  {
    "id": 2,
    "question": "At which end of the Python list does stk.append(item) insert the new element?",
    "options": [
      "At the beginning (index 0)",
      "At the end (index len-1 / -1), which represents TOP",
      "At random index",
      "In the center"
    ],
    "correctAnswer": 1,
    "explanation": "stk.append() places the new element at the very end of the list, acting as the TOP.",
    "hint": "At the end of the list."
  },
  {
    "id": 3,
    "question": "What is the time complexity of the Push operation implemented using stk.append(item)?",
    "options": [
      "O(1) amortized",
      "O(N)",
      "O(N^2)",
      "O(log N)"
    ],
    "correctAnswer": 0,
    "explanation": "Appending to the end of a dynamic array takes amortized O(1) constant time.",
    "hint": "O(1) amortized."
  },
  {
    "id": 4,
    "question": "Why is stk.insert(0, item) NOT recommended for implementing Push?",
    "options": [
      "It causes syntax error",
      "It requires shifting all existing N elements by 1 position, resulting in inefficient O(N) time",
      "It reverses the list",
      "It can only insert strings"
    ],
    "correctAnswer": 1,
    "explanation": "Inserting at index 0 requires memory shifting of all N elements, making it O(N) and slow.",
    "hint": "Inefficient O(N) due to element shifting."
  },
  {
    "id": 5,
    "question": "Consider: def Push(stk, val): stk.append(val). Does this function need to return stk?",
    "options": [
      "Yes, Python lists are immutable",
      "No, Python lists are mutable objects modified in-place by reference",
      "Yes, otherwise stk is deleted",
      "Only if val is negative"
    ],
    "correctAnswer": 1,
    "explanation": "Lists are mutable and passed by reference; changes made via append() persist in the caller's list.",
    "hint": "Mutable objects modified in-place."
  },
  {
    "id": 6,
    "question": "In CBSE board coding questions, which of the following is the standard 2-line Push function?",
    "options": [
      "def Push(stk, val): stk.append(val)",
      "def Push(stk, val): stk = stk + val",
      "def Push(stk, val): stk.push(val)",
      "def Push(stk, val): stk.extend(val)"
    ],
    "correctAnswer": 0,
    "explanation": "def Push(stk, val): stk.append(val) is the standard, canonical 2-line Push implementation.",
    "hint": "def Push(stk, val): stk.append(val)."
  },
  {
    "id": 7,
    "question": "What happens if you push a list [101, 'Aarav', 95] onto a stack using stk.append([101, 'Aarav', 95])?",
    "options": [
      "It flattens the list",
      "The entire sub-list is stored as a single composite element at the TOP of the stack",
      "TypeError is raised",
      "Commas are removed"
    ],
    "correctAnswer": 1,
    "explanation": "append() adds the argument as a single element, creating a record-based stack element.",
    "hint": "Stored as a single composite element."
  },
  {
    "id": 8,
    "question": "What is the result of stk.append(item) if stk = [10, 20] and item = 30?",
    "options": [
      "stk becomes [30, 10, 20]",
      "stk becomes [10, 20, 30]",
      "stk becomes [30]",
      "stk becomes [[10, 20], 30]"
    ],
    "correctAnswer": 1,
    "explanation": "30 is appended to the end, resulting in [10, 20, 30].",
    "hint": "[10, 20, 30]."
  },
  {
    "id": 9,
    "question": "Can an integer, float, string, and list all be pushed onto the same Python stack?",
    "options": [
      "No, stacks must be strictly homogeneous",
      "Yes, Python lists support heterogeneous elements",
      "Only if converted to strings",
      "Only in Python 2"
    ],
    "correctAnswer": 1,
    "explanation": "Python lists are heterogeneous, permitting different data types in the same stack.",
    "hint": "Yes, heterogeneous types supported."
  },
  {
    "id": 10,
    "question": "What is the value of len(stk) after 4 consecutive Push() calls on an initially empty stack?",
    "options": [
      "0",
      "3",
      "4",
      "5"
    ],
    "correctAnswer": 2,
    "explanation": "Each push increments length by 1; after 4 pushes on an empty stack, len is 4.",
    "hint": "4."
  },
  {
    "id": 11,
    "question": "What index can be used to inspect the newly pushed element immediately after stk.append(x)?",
    "options": [
      "stk[0]",
      "stk[-1]",
      "stk[1]",
      "stk[len(stk)]"
    ],
    "correctAnswer": 1,
    "explanation": "stk[-1] accesses the last element, which is the newly appended item at TOP.",
    "hint": "stk[-1]."
  },
  {
    "id": 12,
    "question": "Consider: def PushEven(stk, n): if n % 2 == 0: stk.append(n). If n = 15, what is pushed?",
    "options": [
      "15 is pushed",
      "Nothing is pushed because 15 is odd",
      "0 is pushed",
      "Raises ValueError"
    ],
    "correctAnswer": 1,
    "explanation": "The condition n % 2 == 0 evaluates to False for 15, so append is not called.",
    "hint": "Nothing pushed (15 is odd)."
  },
  {
    "id": 13,
    "question": "In CBSE board questions: 'Write a function Push(stk) to take book names from user and push', what is the expected code?",
    "options": [
      "def Push(stk): b = input('Enter Book: '); stk.append(b)",
      "def Push(stk): stk.push(input())",
      "def Push(stk): stk = input()",
      "def Push(stk): return stk.append()"
    ],
    "correctAnswer": 0,
    "explanation": "Taking input inside the function and appending it to stk is standard practice.",
    "hint": "Input book and call stk.append()."
  },
  {
    "id": 14,
    "question": "What is the difference between stk.append(item) and stk.extend(item) when item = [1, 2]?",
    "options": [
      "There is no difference",
      "append adds [1, 2] as ONE element; extend iterates and adds 1 and 2 as TWO separate elements",
      "extend deletes elements",
      "append reverses the list"
    ],
    "correctAnswer": 1,
    "explanation": "append() adds the list object as a single item; extend() unpacks and adds individual items.",
    "hint": "append adds as ONE element."
  },
  {
    "id": 15,
    "question": "Why should stk.extend() NOT be used for standard Push operations?",
    "options": [
      "Because extend crashes on integers (TypeError: 'int' object is not iterable)",
      "Because extend is deprecated",
      "Because extend deletes the stack",
      "Because extend is slow"
    ],
    "correctAnswer": 0,
    "explanation": "extend() expects an iterable argument and raises TypeError on numbers like 10.",
    "hint": "Raises TypeError on non-iterables."
  },
  {
    "id": 16,
    "question": "What happens if you do: stk = stk + [item] inside a function without global declaration?",
    "options": [
      "It updates the caller's stack in place",
      "It creates a local variable 'stk' that does NOT update the caller's original list outside the function!",
      "It throws an error",
      "It clears memory"
    ],
    "correctAnswer": 1,
    "explanation": "Re-assigning 'stk = ...' creates a new local object reference, failing to mutate the original list in-place.",
    "hint": "Creates a local variable without updating caller."
  },
  {
    "id": 17,
    "question": "Consider: Push(s, 5); Push(s, 10); Push(s, 15). What is s[0] and what is s[-1]?",
    "options": [
      "s[0]=5 (Bottom), s[-1]=15 (TOP)",
      "s[0]=15 (TOP), s[-1]=5 (Bottom)",
      "s[0]=10, s[-1]=10",
      "s[0]=None"
    ],
    "correctAnswer": 0,
    "explanation": "s[0] is the bottom-most element (5), and s[-1] is the top-most element (15).",
    "hint": "s[0]=5 (Bottom), s[-1]=15 (TOP)."
  },
  {
    "id": 18,
    "question": "What exception is raised if Push is attempted on a variable that is None rather than a list?",
    "options": [
      "AttributeError: 'NoneType' object has no attribute 'append'",
      "IndexError",
      "ValueError",
      "ZeroDivisionError"
    ],
    "correctAnswer": 0,
    "explanation": "Calling .append() on None raises AttributeError.",
    "hint": "AttributeError."
  },
  {
    "id": 19,
    "question": "Can an element be pushed conditionally, such as only if marks >= 90?",
    "options": [
      "No, stacks accept all values unconditionally",
      "Yes, an 'if' statement before stk.append() enables conditional push filtering",
      "Only in SQL",
      "Only with queues"
    ],
    "correctAnswer": 1,
    "explanation": "Conditional push is the most frequent question format in CBSE board exams.",
    "hint": "Yes, using an 'if' guard."
  },
  {
    "id": 20,
    "question": "Consider: words = ['cat', 'elephant', 'dog', 'rhinoceros']. If we push words with len > 4, what does the stack contain?",
    "options": [
      "['cat', 'dog']",
      "['elephant', 'rhinoceros']",
      "['elephant']",
      "All 4 words"
    ],
    "correctAnswer": 1,
    "explanation": "'elephant' (8 chars) and 'rhinoceros' (10 chars) have lengths greater than 4.",
    "hint": "['elephant', 'rhinoceros']."
  },
  {
    "id": 21,
    "question": "What is the return value of stk.append(x)?",
    "options": [
      "The list stk",
      "None",
      "The length of stk",
      "True"
    ],
    "correctAnswer": 1,
    "explanation": "append() modifies the list in-place and returns None.",
    "hint": "None."
  },
  {
    "id": 22,
    "question": "What happens if a student writes 'stk = stk.append(x)'?",
    "options": [
      "stk is updated correctly",
      "stk is overwritten with None, destroying the stack!",
      "stk becomes an integer",
      "Python ignores it"
    ],
    "correctAnswer": 1,
    "explanation": "Because append() returns None, assigning stk = stk.append(x) sets stk to None!",
    "hint": "Destroys stack by setting it to None."
  },
  {
    "id": 23,
    "question": "In CBSE board marking schemes, how many marks are typically allotted for writing the Push function?",
    "options": [
      "1 to 2 marks",
      "5 marks",
      "10 marks",
      "½ mark"
    ],
    "correctAnswer": 0,
    "explanation": "In a 3-mark or 4-mark stack question, the Push function accounts for 1.5 to 2 marks.",
    "hint": "1 to 2 marks."
  },
  {
    "id": 24,
    "question": "Can a dictionary be pushed onto a Python stack?",
    "options": [
      "No",
      "Yes, stk.append({'Roll': 101, 'Marks': 95}) is completely valid",
      "Only if keys are integers",
      "Only in JSON"
    ],
    "correctAnswer": 1,
    "explanation": "Dictionaries are valid Python objects and can be pushed onto a stack.",
    "hint": "Yes, dictionaries are valid elements."
  },
  {
    "id": 25,
    "question": "Which of the following describes the Push operation accurately?",
    "options": [
      "Adds element at TOP, increments stack size by 1, operates in O(1) time",
      "Adds element at bottom, decrements stack size",
      "Deletes top element",
      "Sorts the stack"
    ],
    "correctAnswer": 0,
    "explanation": "Push adds to TOP, increases size by 1, and runs in O(1) time.",
    "hint": "Adds at TOP, size + 1, O(1) time."
  }
];

export default questions;
