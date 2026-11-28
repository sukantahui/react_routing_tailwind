// 25 Authentic CBSE Board Examination Questions for Topic 3
const questions = [
  {
    "id": 1,
    "question": "Which expression is the most common and standard way to check for an empty stack in Python?",
    "options": [
      "len(stk) == 0",
      "stk is None",
      "stk.isEmpty() (built-in)",
      "stk == 0"
    ],
    "correctAnswer": 0,
    "explanation": "len(stk) == 0 is the explicit, universally accepted standard in CBSE Class 12.",
    "hint": "len(stk) == 0."
  },
  {
    "id": 2,
    "question": "In Python, what boolean value does an empty list evaluate to in an 'if' condition?",
    "options": [
      "True",
      "False",
      "None",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "In Python, empty sequences (including []) evaluate to False in boolean context.",
    "hint": "False."
  },
  {
    "id": 3,
    "question": "What does the statement 'if not stk:' do?",
    "options": [
      "Checks if stk is not empty",
      "Checks if stk is empty (evaluates to True when stk is [])",
      "Deletes stk",
      "Reverses stk"
    ],
    "correctAnswer": 1,
    "explanation": "Because an empty list is False, 'not stk' evaluates to True when the list is empty.",
    "hint": "Evaluates to True when empty."
  },
  {
    "id": 4,
    "question": "What exception is raised if you try to pop from an empty list using list.pop()?",
    "options": [
      "IndexError",
      "ValueError",
      "TypeError",
      "ZeroDivisionError"
    ],
    "correctAnswer": 0,
    "explanation": "Python raises IndexError: pop from empty list.",
    "hint": "IndexError."
  },
  {
    "id": 5,
    "question": "What exception is raised if you try to inspect stk[-1] when stk is empty []?",
    "options": [
      "IndexError: list index out of range",
      "KeyError: -1",
      "ValueError",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Indexing an empty list raises IndexError: list index out of range.",
    "hint": "IndexError."
  },
  {
    "id": 6,
    "question": "Which of the following functions correctly defines an isEmpty(stk) helper function in Python?",
    "options": [
      "def isEmpty(stk): return len(stk) == 0",
      "def isEmpty(stk): return stk == []",
      "def isEmpty(stk): return not stk",
      "All of the mentioned are correct"
    ],
    "correctAnswer": 3,
    "explanation": "All three implementations correctly determine whether a list is empty.",
    "hint": "All of the mentioned."
  },
  {
    "id": 7,
    "question": "What should a user-defined Pop(stk) function do if the stack is found to be empty?",
    "options": [
      "Crash the program intentionally",
      "Display an 'Underflow' or 'Stack Empty' message and return None",
      "Append a zero",
      "Create a new file"
    ],
    "correctAnswer": 1,
    "explanation": "Defensive code displays an Underflow warning and returns None cleanly.",
    "hint": "Display 'Underflow' and return None."
  },
  {
    "id": 8,
    "question": "Consider: def Pop(stk): if len(stk) == 0: return 'Underflow' else: return stk.pop(). If stk = [50], what does Pop(stk) return?",
    "options": [
      "'Underflow'",
      "50",
      "None",
      "[50]"
    ],
    "correctAnswer": 1,
    "explanation": "Since stk has length 1, the else branch executes, returning the popped element 50.",
    "hint": "50."
  },
  {
    "id": 9,
    "question": "If stk is currently [], what does len(stk) return?",
    "options": [
      "-1",
      "0",
      "None",
      "False"
    ],
    "correctAnswer": 1,
    "explanation": "len() on an empty list returns 0.",
    "hint": "0."
  },
  {
    "id": 10,
    "question": "Why is isEmpty() checked BEFORE calling stk.pop() rather than after?",
    "options": [
      "To prevent an IndexError crash from occurring during the pop call",
      "Because Python forbids code after pop",
      "To speed up internet speed",
      "To clear memory"
    ],
    "correctAnswer": 0,
    "explanation": "Checking before prevents the runtime crash that occurs when pop() is called on an empty collection.",
    "hint": "Prevents runtime crash."
  },
  {
    "id": 11,
    "question": "Consider: while not isEmpty(stk): print(stk.pop()). What does this loop do?",
    "options": [
      "Pushes numbers",
      "Pops and prints elements one by one until the stack is completely empty",
      "Runs infinitely",
      "Creates a queue"
    ],
    "correctAnswer": 1,
    "explanation": "The loop continues popping until isEmpty(stk) becomes True, safely emptying the stack.",
    "hint": "Pops until stack is empty."
  },
  {
    "id": 12,
    "question": "What does bool([]) evaluate to in Python?",
    "options": [
      "True",
      "False",
      "None",
      "0"
    ],
    "correctAnswer": 1,
    "explanation": "Casting an empty list to bool yields False.",
    "hint": "False."
  },
  {
    "id": 13,
    "question": "What does bool([0]) evaluate to in Python?",
    "options": [
      "False",
      "True (because the list is non-empty, containing one item 0)",
      "None",
      "Error"
    ],
    "correctAnswer": 1,
    "explanation": "A list containing even a single element (even if that element is 0 or False) is non-empty, so bool([0]) is True.",
    "hint": "True (non-empty list)."
  },
  {
    "id": 14,
    "question": "Can an empty check be written as 'if stk == None:'?",
    "options": [
      "Yes, [] is identical to None",
      "No, an empty list [] is NOT None; stk == None will evaluate to False for an empty list!",
      "Only in Python 2",
      "Yes, if cast to int"
    ],
    "correctAnswer": 1,
    "explanation": "[] is an object of type list, which is completely distinct from the singleton None object.",
    "hint": "[] is NOT None."
  },
  {
    "id": 15,
    "question": "In CBSE board examination questions, if the question does not provide an isEmpty() function, can you write your own or check len(stk) == 0 directly?",
    "options": [
      "Only built-in functions are allowed",
      "Yes, writing if len(stk) == 0: or defining isEmpty(stk) is 100% valid and expected",
      "No, you must import stack",
      "Only in practicals"
    ],
    "correctAnswer": 1,
    "explanation": "Both directly writing 'if len(stk) == 0:' or creating an 'isEmpty(stk)' helper are standard full-credit solutions.",
    "hint": "Yes, both are standard."
  },
  {
    "id": 16,
    "question": "What does the expression len(stk) > 0 mean?",
    "options": [
      "Stack is empty",
      "Stack is non-empty (contains at least one element)",
      "Stack is full",
      "Stack has negative elements"
    ],
    "correctAnswer": 1,
    "explanation": "len(stk) > 0 confirms that the stack contains at least one item.",
    "hint": "Stack is non-empty."
  },
  {
    "id": 17,
    "question": "Consider: def Peek(stk): if len(stk) == 0: print('Empty') else: print(stk[-1]). If stk = [10, 20], what is printed?",
    "options": [
      "10",
      "20",
      "'Empty'",
      "None"
    ],
    "correctAnswer": 1,
    "explanation": "stk[-1] accesses the top element 20.",
    "hint": "20."
  },
  {
    "id": 18,
    "question": "If stk = [], what is the result of 'if stk:'?",
    "options": [
      "The if branch executes",
      "The condition evaluates to False, so the if branch is skipped and else executes",
      "TypeError",
      "Crash"
    ],
    "correctAnswer": 1,
    "explanation": "Empty list evaluates to False, bypassing the if block.",
    "hint": "Condition evaluates to False."
  },
  {
    "id": 19,
    "question": "Why is 'while len(stk) > 0:' safer than 'while True:' when popping all items?",
    "options": [
      "It automatically terminates when the stack becomes empty, avoiding an unhandled Underflow IndexError",
      "It is 100x faster",
      "It uses less power",
      "It prevents imports"
    ],
    "correctAnswer": 0,
    "explanation": "Terminating the loop when length reaches 0 avoids popping from an empty list.",
    "hint": "Terminates when empty, avoiding crash."
  },
  {
    "id": 20,
    "question": "What does the statement 'stk.clear()' do in Python?",
    "options": [
      "Deletes the variable completely",
      "Removes all elements from the list, resetting it to an empty list []",
      "Sets all elements to zero",
      "Raises error"
    ],
    "correctAnswer": 1,
    "explanation": "stk.clear() removes all items from the list in-place.",
    "hint": "Removes all elements, making it []."
  },
  {
    "id": 21,
    "question": "What is the result of len(stk) after stk.clear()?",
    "options": [
      "0",
      "-1",
      "None",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "After clear(), the list is empty with len(stk) == 0.",
    "hint": "0."
  },
  {
    "id": 22,
    "question": "In the CBSE Class 12 board sample question paper, what message is traditionally printed when popping from an empty stack?",
    "options": [
      "'Stack Underflow' or 'Empty Stack'",
      "'Stack Crash'",
      "'Error 404'",
      "'None Available'"
    ],
    "correctAnswer": 0,
    "explanation": "Official marking schemes use 'Stack Underflow' or 'Empty Stack'.",
    "hint": "'Stack Underflow' or 'Empty Stack'."
  },
  {
    "id": 23,
    "question": "Consider: def Pop(stk): if not stk: return None return stk.pop(). Is this valid Python?",
    "options": [
      "No, indentation error",
      "Yes, clean guard clause returning None on empty stack",
      "Only in Python 2",
      "Only for strings"
    ],
    "correctAnswer": 1,
    "explanation": "This is a clean and idiomatic guard clause in Python.",
    "hint": "Yes, clean guard clause."
  },
  {
    "id": 24,
    "question": "If a function receives 'stk = None' by accident, how can you guard against AttributeError before calling len(stk)?",
    "options": [
      "if stk is None or len(stk) == 0:",
      "if stk == []:",
      "if not stk:",
      "Both A and C are safe guards"
    ],
    "correctAnswer": 3,
    "explanation": "Both 'if stk is None or len(stk) == 0:' and 'if not stk:' safely handle None without crashing.",
    "hint": "Both A and C."
  },
  {
    "id": 25,
    "question": "What is the memory size of an empty Python list [] in 64-bit CPython?",
    "options": [
      "0 bytes",
      "Around 56 to 64 bytes (due to object header and pointer capacity)",
      "1 Megabyte",
      "8 bits"
    ],
    "correctAnswer": 1,
    "explanation": "In CPython, an empty list object carries a memory overhead of about 56-64 bytes for its internal PyObject header.",
    "hint": "About 56 to 64 bytes."
  }
];

export default questions;
