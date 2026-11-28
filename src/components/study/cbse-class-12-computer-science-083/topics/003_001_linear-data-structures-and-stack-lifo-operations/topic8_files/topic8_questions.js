// 25 Authentic CBSE Board Examination Questions for Topic 8
const questions = [
  {
    "id": 1,
    "question": "What control structure provides the continuous menu execution in a Python stack program?",
    "options": [
      "for i in range(10):",
      "while True:",
      "if True:",
      "try-finally:"
    ],
    "correctAnswer": 1,
    "explanation": "An infinite 'while True:' loop keeps the user interface responsive until an explicit exit break.",
    "hint": "while True: loop."
  },
  {
    "id": 2,
    "question": "What statement terminates the while True menu loop when the user chooses 'Exit'?",
    "options": [
      "continue",
      "break",
      "pass",
      "exit() only"
    ],
    "correctAnswer": 1,
    "explanation": "'break' exits the enclosing while loop immediately.",
    "hint": "break."
  },
  {
    "id": 3,
    "question": "Why is menu input checked as strings ('1', '2', etc.) rather than int(input()) in robust programs?",
    "options": [
      "Comparing strings avoids crashing with ValueError if the user enters letters or symbols",
      "Strings run 10x faster",
      "Python forbids integers in menus",
      "Because stacks only store strings"
    ],
    "correctAnswer": 0,
    "explanation": "String comparisons gracefully handle non-numeric keys without unhandled ValueError exceptions.",
    "hint": "Avoids ValueError on non-numeric input."
  },
  {
    "id": 4,
    "question": "Where should the stack list 'stack = []' be initialized relative to the while loop?",
    "options": [
      "Inside the while loop on line 1 of each iteration",
      "Outside the while loop before it starts",
      "Inside the Push function only",
      "In a text file"
    ],
    "correctAnswer": 1,
    "explanation": "Initializing outside preserves pushed elements across iterations; initializing inside would wipe the stack on every turn.",
    "hint": "Outside the while loop."
  },
  {
    "id": 5,
    "question": "What happens if a student initializes 'stack = []' inside the while loop?",
    "options": [
      "Works normally",
      "The stack resets to an empty list on every loop turn, wiping out all previously pushed elements",
      "Raises SyntaxError",
      "Overflow occurs"
    ],
    "correctAnswer": 1,
    "explanation": "Re-assigning stack = [] inside resets the collection on each menu choice.",
    "hint": "Resets to empty list on every iteration."
  },
  {
    "id": 6,
    "question": "In the menu, what should be done after calling Peek(stack)?",
    "options": [
      "Print the returned top value if it is not None",
      "Call pop() immediately",
      "Clear the list",
      "Exit"
    ],
    "correctAnswer": 0,
    "explanation": "Displaying the returned element allows the user to see the top value.",
    "hint": "Print returned top value if not None."
  },
  {
    "id": 7,
    "question": "How many choices does a standard CBSE stack menu provide?",
    "options": [
      "Only 1 (Push)",
      "4 or 5 (Push, Pop, Peek, Display, Exit)",
      "10 choices",
      "20 choices"
    ],
    "correctAnswer": 1,
    "explanation": "A standard menu provides Push, Pop, Peek, Display, and Exit.",
    "hint": "Push, Pop, Peek, Display, Exit."
  },
  {
    "id": 8,
    "question": "What should be displayed if the user enters choice '9' in a 1-5 menu?",
    "options": [
      "Delete the stack",
      "Display 'Invalid Choice! Please enter 1 to 5'",
      "Crash Python",
      "Exit program"
    ],
    "correctAnswer": 1,
    "explanation": "The 'else' branch should display a friendly validation message.",
    "hint": "Invalid Choice message."
  },
  {
    "id": 9,
    "question": "Can both numbers and strings be accepted in the same menu-driven stack?",
    "options": [
      "No, lists only accept one datatype",
      "Yes, Python lists are dynamic and heterogeneous",
      "Only with typecasting",
      "Only if stored in binary"
    ],
    "correctAnswer": 1,
    "explanation": "Python lists can hold numbers, strings, and records simultaneously.",
    "hint": "Yes, heterogeneous types supported."
  },
  {
    "id": 10,
    "question": "What is the role of strip() in choice = input().strip()?",
    "options": [
      "Removes accidental leading and trailing spaces from input",
      "Converts to int",
      "Encrypts choice",
      "Deletes input"
    ],
    "correctAnswer": 0,
    "explanation": "strip() removes whitespace, ensuring exact matching with '1', '2', etc.",
    "hint": "Removes leading/trailing whitespace."
  },
  {
    "id": 11,
    "question": "In practical examinations, what is the weightage of a complete menu-driven stack program?",
    "options": [
      "1 mark",
      "4 to 8 marks (in lab project / practical exam)",
      "25 marks",
      "30 marks"
    ],
    "correctAnswer": 1,
    "explanation": "Menu-driven data structure programs form a central part of board lab practicals (4 to 8 marks).",
    "hint": "4 to 8 marks."
  },
  {
    "id": 12,
    "question": "What happens if the user selects 'Pop' when the stack is empty?",
    "options": [
      "The program crashes with IndexError",
      "The Underflow guard catches it, prints 'Underflow' and keeps the menu active",
      "The computer shuts down",
      "The stack becomes None"
    ],
    "correctAnswer": 1,
    "explanation": "A proper underflow guard displays an error and allows the user to continue using the menu.",
    "hint": "Underflow guard catches it and continues menu."
  },
  {
    "id": 13,
    "question": "Why should modular functions (Push, Pop, Peek, Display) be used instead of writing everything inside the while loop?",
    "options": [
      "Functions improve readability, reusability, testing, and directly match CBSE board question requirements",
      "Functions make code slower",
      "Python requires at least 10 functions",
      "To use more disk space"
    ],
    "correctAnswer": 0,
    "explanation": "Modular functions keep code structured, clean, and directly testable.",
    "hint": "Improves readability, reusability & matches CBSE format."
  },
  {
    "id": 14,
    "question": "Consider: while True: ... elif ch == '5': break. What code runs after break?",
    "options": [
      "Code immediately after the while block (e.g. exit message)",
      "The while loop restarts",
      "Push executes",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "Execution jumps to the first statement following the while loop.",
    "hint": "Code immediately following while loop."
  },
  {
    "id": 15,
    "question": "How can you display the total number of items currently in the stack within the menu?",
    "options": [
      "print('Count:', len(stack))",
      "print('Count:', stack.count())",
      "print('Count:', stack.size)",
      "print('Count:', stack.depth)"
    ],
    "correctAnswer": 0,
    "explanation": "len(stack) returns the current number of elements.",
    "hint": "len(stack)."
  },
  {
    "id": 16,
    "question": "What is printed if Display is chosen on stack = ['Maths', 'Physics', 'CS']?",
    "options": [
      "CS <-- TOP \\n Physics \\n Maths",
      "Maths <-- TOP \\n Physics \\n CS",
      "Physics \\n Maths \\n CS",
      "CS Maths Physics"
    ],
    "correctAnswer": 0,
    "explanation": "'CS' is at the TOP (end of list) and is printed first with pointer.",
    "hint": "CS <-- TOP followed by Physics and Maths."
  },
  {
    "id": 17,
    "question": "Can user input inside Push be cast to int() for numeric stacks?",
    "options": [
      "Yes, val = int(input('Enter integer: '))",
      "No, input must remain string",
      "Only with float",
      "Only if negative"
    ],
    "correctAnswer": 0,
    "explanation": "Casting with int() ensures numeric values are stored.",
    "hint": "Yes, int(input())."
  },
  {
    "id": 18,
    "question": "What exception handling can be added around int(input()) to prevent crashes on non-numeric input?",
    "options": [
      "try ... except ValueError:",
      "try ... except IndexError:",
      "try ... except TypeError:",
      "try ... except ZeroDivisionError:"
    ],
    "correctAnswer": 0,
    "explanation": "Catching ValueError prevents invalid non-integer inputs from crashing the program.",
    "hint": "try ... except ValueError."
  },
  {
    "id": 19,
    "question": "Consider: def Pop(stk): if not stk: print('Underflow') else: return stk.pop(). If called as x = Pop(stack) on empty stack, what is x?",
    "options": [
      "None",
      "0",
      "'Underflow'",
      "Error"
    ],
    "correctAnswer": 0,
    "explanation": "Without an explicit return in the if branch, Python functions return None by default.",
    "hint": "None."
  },
  {
    "id": 20,
    "question": "Why is Peek useful in a menu-driven application?",
    "options": [
      "It lets the user verify what is currently at the top before deciding whether to Pop it",
      "It deletes duplicates",
      "It encrypts records",
      "It prints in color"
    ],
    "correctAnswer": 0,
    "explanation": "Peek gives visibility into the top item without committing to deletion.",
    "hint": "Verifies top value before deciding to Pop."
  },
  {
    "id": 21,
    "question": "What does the expression 'stack = None' do if assigned inside a menu?",
    "options": [
      "Destroys the list object, causing future calls like stack.append() to crash with AttributeError",
      "Empties the stack cleanly",
      "Resets to 0",
      "Saves to file"
    ],
    "correctAnswer": 0,
    "explanation": "Setting stack = None destroys the list reference and causes crashes on subsequent operations.",
    "hint": "Destroys list reference causing AttributeError."
  },
  {
    "id": 22,
    "question": "How do you properly clear all elements from the stack in a menu choice 'Clear Stack'?",
    "options": [
      "stack.clear() or stack = []",
      "stack = None",
      "del stack",
      "stack = 0"
    ],
    "correctAnswer": 0,
    "explanation": "stack.clear() empties the existing list safely in-place.",
    "hint": "stack.clear() or stack = []."
  },
  {
    "id": 23,
    "question": "In CBSE board practicals, what is an examiner looking for in the menu interface?",
    "options": [
      "Clean prompt, clear options, defensive underflow handling, and accurate LIFO display",
      "Graphic 3D animations",
      "Sound effects",
      "Network connections"
    ],
    "correctAnswer": 0,
    "explanation": "Examiners evaluate correctness of LIFO behavior, error guards, and clean modular code.",
    "hint": "LIFO behavior, error guards & modular functions."
  },
  {
    "id": 24,
    "question": "Can multiple elements be pushed in a single menu session?",
    "options": [
      "Yes, the user can choose option 1 as many times as desired in the while loop",
      "No, maximum 1 push per program",
      "Only up to 3 pushes",
      "Only if stack is empty"
    ],
    "correctAnswer": 0,
    "explanation": "The while loop enables arbitrary repeated pushes and pops.",
    "hint": "Yes, repeated operations supported."
  },
  {
    "id": 25,
    "question": "Which pattern best prevents infinite recursion in a menu program?",
    "options": [
      "Use an iterative while loop rather than calling menu() recursively from within itself",
      "Never use functions",
      "Use C++ instead",
      "Reboot after every choice"
    ],
    "correctAnswer": 0,
    "explanation": "Calling menu() recursively inside itself consumes stack frames; an iterative while loop is clean and robust.",
    "hint": "Use iterative while loop."
  }
];

export default questions;
