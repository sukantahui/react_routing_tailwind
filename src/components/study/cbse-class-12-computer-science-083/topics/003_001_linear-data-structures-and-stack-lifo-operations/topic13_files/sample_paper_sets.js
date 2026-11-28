export const samplePaperSets = [
  {
    "setId": 1,
    "title": "Set 1: Stack Principles, LIFO Mechanics & Push/Pop Basics",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Which data structure principle does a Stack follow?\n(a) FIFO (First In First Out)\n(b) LIFO (Last In First Out)\n(c) LILO (Last In Last Out)\n(d) Priority Order",
            "solution": "(b) LIFO (Last In First Out). The most recently inserted element is removed first.",
            "markingScheme": "1 Mark for (b) LIFO."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What Python list method is conventionally used to implement the Push operation in a stack?",
            "solution": "append() (e.g. stack.append(item)).",
            "markingScheme": "1 Mark for append()."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What condition occurs when a Pop operation is attempted on an empty stack?\n(a) Overflow\n(b) Underflow\n(c) Deadlock\n(d) Memory Error",
            "solution": "(b) Underflow. Popping from an empty stack causes Stack Underflow.",
            "markingScheme": "1 Mark for (b) Underflow."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "Which index in a Python list corresponds to the 'top' of the stack when implemented using append() and pop()?",
            "solution": "-1 (the last index, stack[-1]).",
            "markingScheme": "1 Mark for -1 or last index."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Trace the contents of stack after operations:\nstack = []\nstack.append(10)\nstack.append(20)\nx = stack.pop()\nstack.append(30)\nstack.append(40)\nstack.pop()\nprint(stack)",
            "solution": "1. append(10) -> [10]\n2. append(20) -> [10, 20]\n3. pop() removes 20 -> [10]\n4. append(30) -> [10, 30]\n5. append(40) -> [10, 30, 40]\n6. pop() removes 40 -> [10, 30]\nOutput:\n[10, 30]",
            "markingScheme": "1 Mark for step tracing, 1 Mark for [10, 30]."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why should we check if stack is empty before performing a pop() or peek() operation in Python?",
            "solution": "Calling pop() on an empty Python list raises an IndexError: pop from empty list. Checking ensures graceful Underflow handling without crashing.",
            "markingScheme": "1 Mark for IndexError on empty list, 1 Mark for graceful Underflow prevention."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write two Python functions:\n1. is_empty(stk): Returns True if stk is empty, else False.\n2. peek(stk): Returns the top element without removing it, or None with message 'Underflow' if empty.",
            "solution": "def is_empty(stk):\n    return len(stk) == 0\n\ndef peek(stk):\n    if is_empty(stk):\n        print('Stack Underflow!')\n        return None\n    return stk[-1]",
            "markingScheme": "1 Mark for is_empty, 2 Marks for peek with Underflow check and stk[-1] return."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function display_stack(stk) that prints all elements from top to bottom without modifying the stack.",
            "solution": "def display_stack(stk):\n    if not stk:\n        print('Stack is Empty')\n        return\n    print('Top ->', end=' ')\n    for i in range(len(stk) - 1, -1, -1):\n        print(stk[i], end=' ')\n    print()",
            "markingScheme": "1 Mark for empty check, 1.5 Marks for top-to-bottom traversal (reverse loop), 0.5 Mark for output formatting."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a complete modular program in Python with functions:\n1. push_divisible_by_5(stk, num_list): Pushes all numbers divisible by 5 from num_list into stk.\n2. pop_all(stk): Pops and displays each number until stack is empty. If stack is already empty, display 'Underflow'.\nDemonstrate with num_list = [12, 25, 30, 44, 55, 61, 70].",
            "solution": "def push_divisible_by_5(stk, num_list):\n    for n in num_list:\n        if n % 5 == 0:\n            stk.append(n)\n\ndef pop_all(stk):\n    if not stk:\n        print('Stack Underflow!')\n        return\n    print('Popping elements:')\n    while stk:\n        print(stk.pop(), end=' ')\n    print()\n\ndef main():\n    my_stack = []\n    num_list = [12, 25, 30, 44, 55, 61, 70]\n    push_divisible_by_5(my_stack, num_list)\n    print('Stack after pushes:', my_stack)\n    pop_all(my_stack)\n\nmain()",
            "markingScheme": "2.5 Marks for push_divisible_by_5 (n % 5 == 0 check and append), 2.5 Marks for pop_all (Underflow check & while loop with pop), 1 Mark for driver demonstration."
          }
        ]
      }
    ]
  },
  {
    "setId": 2,
    "title": "Set 2: String & Character Stacks, Palindromes & Reversal",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "How does a stack naturally reverse a sequence of characters?",
            "solution": "Because characters pushed in order are popped in the exact reverse order due to the LIFO property.",
            "markingScheme": "1 Mark for LIFO property pops in reverse order."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What does len(stack) == 0 check in stack algorithms?",
            "solution": "Whether the stack is empty (Underflow condition).",
            "markingScheme": "1 Mark for empty stack / Underflow check."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which operation removes an element from the stack?\n(a) push\n(b) peek\n(c) pop\n(d) dequeue",
            "solution": "(c) pop.",
            "markingScheme": "1 Mark for (c) pop."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "True or False: In a software stack implemented with a Python dynamic list, Stack Overflow is rare because Python lists grow dynamically in memory.",
            "solution": "True. Stack Overflow primarily occurs in fixed-size arrays or when memory is exhausted.",
            "markingScheme": "1 Mark for True."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Trace output:\ns = []\nfor ch in 'CBSE':\n    s.append(ch)\nres = ''\nwhile s:\n    res += s.pop()\nprint(res)",
            "solution": "Characters pushed: 'C', 'B', 'S', 'E'.\nPopped: 'E', 'S', 'B', 'C'.\nOutput:\nESBC",
            "markingScheme": "1 Mark for LIFO reversal, 1 Mark for 'ESBC'."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Differentiate between Underflow and Overflow conditions in stack data structures.",
            "solution": "Underflow occurs when attempting to pop from an empty stack. Overflow occurs when attempting to push onto a full stack (in fixed-size storage).",
            "markingScheme": "1 Mark for Underflow (pop on empty), 1 Mark for Overflow (push on full)."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function reverse_string_using_stack(text) that reverses text using a stack.",
            "solution": "def reverse_string_using_stack(text):\n    stack = []\n    for ch in text:\n        stack.append(ch)\n    rev = ''\n    while stack:\n        rev += stack.pop()\n    return rev",
            "markingScheme": "1 Mark for pushing characters, 1.5 Marks for popping into rev string, 0.5 Mark for returning rev."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function is_palindrome_stack(word) that uses a stack to check if word is a palindrome.",
            "solution": "def is_palindrome_stack(word):\n    clean = word.lower()\n    stack = list(clean)\n    reversed_chars = []\n    while stack:\n        reversed_chars.append(stack.pop())\n    return clean == ''.join(reversed_chars)",
            "markingScheme": "1 Mark for pushing to stack, 1.5 Marks for popping and comparing, 0.5 Mark for boolean return."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A list contains employee designations: ['Manager', 'Clerk', 'Accountant', 'Peon', 'Director', 'Supervisor']. Write Python functions:\n1. push_long_designations(stk, desig_list): Pushes all designations with character length greater than 6 into stk.\n2. pop_and_count(stk): Pops all elements, displays each, and returns the total number of items popped. If stack is empty, prints 'Underflow' and returns 0.",
            "solution": "def push_long_designations(stk, desig_list):\n    for d in desig_list:\n        if len(d) > 6:\n            stk.append(d)\n\ndef pop_and_count(stk):\n    if not stk:\n        print('Stack Underflow!')\n        return 0\n    count = 0\n    print('Popped Designations:')\n    while stk:\n        item = stk.pop()\n        print(item)\n        count += 1\n    return count\n\ndef main():\n    stack = []\n    desigs = ['Manager', 'Clerk', 'Accountant', 'Peon', 'Director', 'Supervisor']\n    push_long_designations(stack, desigs)\n    print('Stack:', stack)\n    total = pop_and_count(stack)\n    print(f'Total elements popped: {total}')\n\nmain()",
            "markingScheme": "2.5 Marks for push_long_designations (len(d) > 6 check & append), 2.5 Marks for pop_and_count (Underflow check, loop, print & count), 1 Mark for main test."
          }
        ]
      }
    ]
  },
  {
    "setId": 3,
    "title": "Set 3: Record & Dictionary Stacks (Tuples, Key Filtering)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Can an element pushed onto a Python stack be a composite structure like a tuple (id, name, score)?",
            "solution": "Yes. Python stacks (implemented via lists) can store elements of any arbitrary type including tuples, dictionaries, and objects.",
            "markingScheme": "1 Mark for Yes with explanation."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What does stack[-1][1] access if each stack item is a tuple (Roll, Name, Marks)?",
            "solution": "The 'Name' of the topmost student currently on the stack.",
            "markingScheme": "1 Mark for Name of topmost student."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which of the following creates an empty stack in Python?\n(a) stk = {}\n(b) stk = []\n(c) stk = ()\n(d) stk = set()",
            "solution": "(b) stk = [].",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "When popping a dictionary record from a stack, what does item['salary'] retrieve?",
            "solution": "The value mapped to the 'salary' key for that popped record.",
            "markingScheme": "1 Mark for value mapped to 'salary' key."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Trace output:\nstk = []\nstk.append({'roll': 1, 'marks': 85})\nstk.append({'roll': 2, 'marks': 92})\nstk.append({'roll': 3, 'marks': 78})\nwhile stk:\n    rec = stk.pop()\n    if rec['marks'] > 80:\n        print(rec['roll'], end=' ')",
            "solution": "Popped in order:\n1. roll 3 (marks 78 -> not > 80)\n2. roll 2 (marks 92 -> prints 2)\n3. roll 1 (marks 85 -> prints 1)\nOutput:\n2 1",
            "markingScheme": "1 Mark for LIFO pop order analysis, 1 Mark for exact output: 2 1."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Explain why stk.pop(0) should NOT be used to implement a stack in Python.",
            "solution": "stk.pop(0) removes the first element (FIFO queue behavior), shifting all remaining elements left in O(n) time, whereas a stack requires LIFO removal from the top (stk.pop()) in O(1) time.",
            "markingScheme": "1 Mark for FIFO vs LIFO distinction, 1 Mark for O(n) shifting performance cost."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function push_students(stk, student_dict) where student_dict maps roll_no to percentage. Push only those students having percentage >= 75 as (roll, percentage) tuples.",
            "solution": "def push_students(stk, student_dict):\n    for roll, pct in student_dict.items():\n        if pct >= 75:\n            stk.append((roll, pct))",
            "markingScheme": "1 Mark for iterating items(), 1.5 Marks for pct >= 75 condition, 0.5 Mark for tuple append."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function pop_student(stk) that pops and returns the top student tuple. If empty, print 'Underflow' and return None.",
            "solution": "def pop_student(stk):\n    if not stk:\n        print('Underflow')\n        return None\n    return stk.pop()",
            "markingScheme": "1.5 Marks for empty check and 'Underflow' message, 1.5 Marks for stk.pop() return."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A dictionary stores book details: {'B01': ['Python', 450], 'B02': ['C++', 300], 'B03': ['Java', 600], 'B04': ['DSA', 750]}. Write functions:\n1. Push_Books(stk, book_dict): Pushes book codes of all books whose price is greater than 400 into stk.\n2. Pop_Books(stk): Pops and displays each book code. When empty, displays 'Stack Empty'.\nShow execution.",
            "solution": "def Push_Books(stk, book_dict):\n    for bcode, details in book_dict.items():\n        if details[1] > 400:\n            stk.append(bcode)\n\ndef Pop_Books(stk):\n    if not stk:\n        print('Stack Empty')\n        return\n    print('Popped Books:')\n    while stk:\n        print(stk.pop())\n\ndef main():\n    stk = []\n    books = {'B01': ['Python', 450], 'B02': ['C++', 300], 'B03': ['Java', 600], 'B04': ['DSA', 750]}\n    Push_Books(stk, books)\n    print('Stack after push:', stk)\n    Pop_Books(stk)\n\nmain()",
            "markingScheme": "2.5 Marks for Push_Books (details[1] > 400 check & append), 2.5 Marks for Pop_Books (Underflow check & while pop), 1 Mark for main execution."
          }
        ]
      }
    ]
  },
  {
    "setId": 4,
    "title": "Set 4: Mathematical Stacks, Factorials, Primes & Divisibility",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is the time complexity of the push (append) and pop operations in a Python list-based stack?\n(a) O(1) amortized\n(b) O(n)\n(c) O(log n)\n(d) O(n^2)",
            "solution": "(a) O(1) amortized.",
            "markingScheme": "1 Mark for (a) O(1)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "In expression evaluation, what data structure is universally used to convert infix expressions to postfix?",
            "solution": "A Stack.",
            "markingScheme": "1 Mark for Stack."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is returned by stack.pop() if stack is [5, 10, 15]?",
            "solution": "15.",
            "markingScheme": "1 Mark for 15."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether stack[-1] modifies the stack.",
            "solution": "No. stack[-1] (peek) inspects the top element without removing or altering anything.",
            "markingScheme": "1 Mark for No (read-only inspection)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Trace output:\ns = []\nfor i in range(1, 6):\n    if i % 2 != 0: s.append(i * 10)\nwhile s:\n    print(s.pop(), end=' ')",
            "solution": "Odd numbers: 1, 3, 5 -> Pushed: 10, 30, 50.\nPopped in LIFO: 50, 30, 10.\nOutput:\n50 30 10",
            "markingScheme": "1 Mark for identifying pushed elements, 1 Mark for LIFO output 50 30 10."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Explain how recursion in Python utilizes an internal call stack.",
            "solution": "Each recursive function call allocates a new stack frame on the system call stack storing local variables and return address. When a call returns, its frame is popped.",
            "markingScheme": "1 Mark for call stack frame allocation, 1 Mark for return address/popping."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function push_primes(stk, limit) that finds all prime numbers up to limit and pushes them onto stk.",
            "solution": "def is_prime(n):\n    if n < 2: return False\n    for i in range(2, int(n**0.5) + 1):\n        if n % i == 0: return False\n    return True\n\ndef push_primes(stk, limit):\n    for num in range(2, limit + 1):\n        if is_prime(num):\n            stk.append(num)",
            "markingScheme": "1.5 Marks for prime detection logic, 1.5 Marks for range loop and append."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function pop_sum(stk) that pops all numbers from stk and returns their sum. If empty, return 0.",
            "solution": "def pop_sum(stk):\n    total = 0\n    while stk:\n        total += stk.pop()\n    return total",
            "markingScheme": "1 Mark for total variable, 1.5 Marks for while loop and pop, 0.5 Mark for returning sum."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a Python program to evaluate postfix arithmetic expressions using a stack for single-digit operands and operators (+, -, *, /).\nExample: ['2', '3', '1', '*', '+', '9', '-'] should evaluate to -4.\nFunction: evaluate_postfix(tokens)",
            "solution": "def evaluate_postfix(tokens):\n    stack = []\n    for token in tokens:\n        if token.isdigit():\n            stack.append(int(token))\n        else:\n            val2 = stack.pop()\n            val1 = stack.pop()\n            if token == '+': res = val1 + val2\n            elif token == '-': res = val1 - val2\n            elif token == '*': res = val1 * val2\n            elif token == '/': res = val1 // val2\n            stack.append(res)\n    return stack.pop()\n\nprint('Result:', evaluate_postfix(['2', '3', '1', '*', '+', '9', '-']))",
            "markingScheme": "2 Marks for operand push, 2.5 Marks for operator pop of 2 operands in correct order (val1, val2), 1.5 Marks for arithmetic evaluation and result return."
          }
        ]
      }
    ]
  },
  {
    "setId": 5,
    "title": "Set 5: Nested Structure Filtering (Lists of Dictionaries)",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What happens if you attempt to pop from an empty list in Python without checking?\n(a) Returns None\n(b) Raises IndexError: pop from empty list\n(c) Creates a 0 element\n(d) Loops indefinitely",
            "solution": "(b) Raises IndexError: pop from empty list.",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "Which function returns the current number of elements in a stack?",
            "solution": "len(stack).",
            "markingScheme": "1 Mark for len()."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "In a stack containing items [A, B, C], which item was inserted first?",
            "solution": "A (bottom of stack).",
            "markingScheme": "1 Mark for A."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether push operation adds to index 0 or index -1 in standard Python stack implementation.",
            "solution": "Index -1 (appended at the end of the list).",
            "markingScheme": "1 Mark for index -1 (end of list)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Find the output:\nstk = []\nfor w in ['sun', 'earth', 'mars', 'jupiter']:\n    if len(w) <= 4: stk.append(w)\nwhile stk:\n    print(stk.pop().upper(), end=' ')",
            "solution": "Filtered words with length <= 4: 'sun', 'mars'.\nPushed: ['sun', 'mars'].\nPopped in LIFO: 'MARS', 'SUN'.\nOutput:\nMARS SUN",
            "markingScheme": "1 Mark for filtering 'sun' and 'mars', 1 Mark for LIFO upper: MARS SUN."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Why is stack referred to as a 'restricted data structure'?",
            "solution": "Because insertion (push) and deletion (pop) are strictly restricted to only one end, called the TOP.",
            "markingScheme": "1 Mark for access restricted to one end, 1 Mark for called TOP."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function push_vowel_words(stk, sentence) that splits sentence into words and pushes those starting with a vowel (A, E, I, O, U).",
            "solution": "def push_vowel_words(stk, sentence):\n    vowels = ('a', 'e', 'i', 'o', 'u')\n    for word in sentence.split():\n        if word.lower().startswith(vowels):\n            stk.append(word)",
            "markingScheme": "1 Mark for sentence.split(), 1.5 Marks for startswith vowel tuple check, 0.5 Mark for append."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function pop_all_and_display(stk) that pops and prints each element on a new line until empty, printing 'Empty' if initially empty.",
            "solution": "def pop_all_and_display(stk):\n    if not stk:\n        print('Empty')\n        return\n    while stk:\n        print(stk.pop())",
            "markingScheme": "1 Mark for initial empty check, 1.5 Marks for while loop popping, 0.5 Mark for print."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "A company stores customer packages in a list of dictionaries: [{'pkg_id': 'P1', 'weight': 5.2, 'dest': 'Delhi'}, {'pkg_id': 'P2', 'weight': 12.0, 'dest': 'Mumbai'}, {'pkg_id': 'P3', 'weight': 3.5, 'dest': 'Kolkata'}, {'pkg_id': 'P4', 'weight': 15.5, 'dest': 'Goa'}].\nWrite Python functions:\n1. Push_Heavy_Packages(stk, pkg_list): Pushes package ID of packages weighing over 10.0 kg into stk.\n2. Dispatch_Packages(stk): Pops and displays each package ID being dispatched until empty. If empty, displays 'No packages to dispatch'.",
            "solution": "def Push_Heavy_Packages(stk, pkg_list):\n    for pkg in pkg_list:\n        if pkg['weight'] > 10.0:\n            stk.append(pkg['pkg_id'])\n\ndef Dispatch_Packages(stk):\n    if not stk:\n        print('No packages to dispatch')\n        return\n    print('Dispatching Heavy Packages:')\n    while stk:\n        print(f'Dispatching: {stk.pop()}')\n\ndef main():\n    stk = []\n    packages = [{'pkg_id': 'P1', 'weight': 5.2, 'dest': 'Delhi'}, {'pkg_id': 'P2', 'weight': 12.0, 'dest': 'Mumbai'}, {'pkg_id': 'P3', 'weight': 3.5, 'dest': 'Kolkata'}, {'pkg_id': 'P4', 'weight': 15.5, 'dest': 'Goa'}]\n    Push_Heavy_Packages(stk, packages)\n    print('Stack of heavy packages:', stk)\n    Dispatch_Packages(stk)\n\nmain()",
            "markingScheme": "2.5 Marks for Push_Heavy_Packages (pkg['weight'] > 10.0 check & push), 2.5 Marks for Dispatch_Packages (Underflow check, while loop and pop display), 1 Mark for main."
          }
        ]
      }
    ]
  },
  {
    "setId": 6,
    "title": "Set 6: Balanced Parentheses Checking & Symbol Validation",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "Why is a stack the ideal data structure for parenthesis matching in compilers?\n(a) It maintains FIFO order\n(b) The most recently opened bracket must be the first one closed (LIFO)\n(c) It sorts brackets\n(d) It uses less memory than an integer",
            "solution": "(b) The most recently opened bracket must be the first one closed (LIFO).",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What does an unexpected closing bracket with an empty stack indicate during parenthesis checking?",
            "solution": "Unbalanced brackets / Underflow (a closing bracket has no corresponding opening bracket).",
            "markingScheme": "1 Mark for unbalanced brackets / missing opening bracket."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "If the stack is not empty after processing all characters in an expression, is the expression balanced?",
            "solution": "No. It means one or more opening brackets were never closed.",
            "markingScheme": "1 Mark for No (unclosed opening brackets remain)."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "Which method in Python removes all items from a list at once?\n(a) list.clear()\n(b) list.reset()\n(c) list.popall()\n(d) list.empty()",
            "solution": "(a) list.clear().",
            "markingScheme": "1 Mark for (a) clear()."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Trace the state of the stack for expression: '( [ ] )'\nShow push and pop steps.",
            "solution": "1. '(' -> push -> ['(']\n2. '[' -> push -> ['(', '[']\n3. ']' -> matches '[' -> pop '[' -> ['(']\n4. ')' -> matches '(' -> pop '(' -> []\nStack is empty -> Balanced!",
            "markingScheme": "1 Mark for step by step stack state, 1 Mark for concluding Balanced."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Write code to clear a stack completely using a while loop and pop().",
            "solution": "while stack:\n    stack.pop()",
            "markingScheme": "1 Mark for while stack condition, 1 Mark for stack.pop()."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function is_balanced_parentheses(expr) that returns True if the string containing only '(' and ')' is balanced, else False.",
            "solution": "def is_balanced_parentheses(expr):\n    stack = []\n    for ch in expr:\n        if ch == '(':\n            stack.append(ch)\n        elif ch == ')':\n            if not stack: return False\n            stack.pop()\n    return len(stack) == 0",
            "markingScheme": "1 Mark for push '(', 1.5 Marks for ')' check and underflow return False, 0.5 Mark for final empty check."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function count_unmatched(expr) that returns the total number of unmatched brackets.",
            "solution": "def count_unmatched(expr):\n    stack = []\n    unmatched_close = 0\n    for ch in expr:\n        if ch == '(':\n            stack.append(ch)\n        elif ch == ')':\n            if stack: stack.pop()\n            else: unmatched_close += 1\n    return unmatched_close + len(stack)",
            "markingScheme": "1 Mark for stack push, 1.5 Marks for unmatched_close count, 0.5 Mark for returning sum."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a complete Python function is_balanced_all_brackets(expr) that handles '()', '[]', and '{}'. Return True if perfectly balanced, else False.\nTest with: '{ [ a + (b * c) ] }' and '( [ a + b } )'.",
            "solution": "def is_balanced_all_brackets(expr):\n    stack = []\n    mapping = {')': '(', ']': '[', '}': '{'}\n    for ch in expr:\n        if ch in mapping.values():\n            stack.append(ch)\n        elif ch in mapping:\n            if not stack or stack[-1] != mapping[ch]:\n                return False\n            stack.pop()\n    return len(stack) == 0\n\nprint('Test 1:', is_balanced_all_brackets('{ [ a + (b * c) ] }')) # True\nprint('Test 2:', is_balanced_all_brackets('( [ a + b } )')) # False",
            "markingScheme": "2 Marks for mapping dictionary & opening bracket push, 2.5 Marks for closing bracket top matching & pop, 1.5 Marks for final stack empty check & tests."
          }
        ]
      }
    ]
  },
  {
    "setId": 7,
    "title": "Set 7: Queue vs Stack Comparisons & Reversible Buffers",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is the primary architectural difference between a Stack and a Queue?\n(a) Stack is LIFO; Queue is FIFO\n(b) Stack is nonlinear; Queue is linear\n(c) Stack has two ends; Queue has one\n(d) Stack uses trees; Queue uses lists",
            "solution": "(a) Stack is LIFO (Last In First Out); Queue is FIFO (First In First Out).",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "In which end are insertions and deletions done in a Stack?",
            "solution": "Both insertions and deletions are done exclusively at the TOP end.",
            "markingScheme": "1 Mark for at the TOP end."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What does the operation Pop return when invoked on stack [10, 20, 30]?",
            "solution": "30 (the last element).",
            "markingScheme": "1 Mark for 30."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "True or False: A queue can be implemented using two stacks.",
            "solution": "True. Two stacks (inbox and outbox) can simulate a FIFO queue.",
            "markingScheme": "1 Mark for True."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Write code to transfer all elements from stack1 into stack2 so that the order of elements is inverted.",
            "solution": "stack2 = []\nwhile stack1:\n    stack2.append(stack1.pop())",
            "markingScheme": "1 Mark for while stack1, 1 Mark for stack2.append(stack1.pop())."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "State two real-world examples of a Stack.",
            "solution": "1. A stack of plates in a cafeteria.\n2. Browser navigation history (Back button pops the most recently visited page).",
            "markingScheme": "1 Mark per valid real-world example."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function copy_stack(src_stk) that returns an identical new copy of src_stk without modifying the original stack.",
            "solution": "def copy_stack(src_stk):\n    return list(src_stk)",
            "markingScheme": "1.5 Marks for list(src_stk) or src_stk.copy(), 1.5 Marks for explanation that original is unchanged."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function remove_bottom_element(stk) that removes the bottom-most element of stk and preserves the order of remaining elements.",
            "solution": "def remove_bottom_element(stk):\n    if not stk:\n        return None\n    temp = []\n    while stk:\n        temp.append(stk.pop())\n    bottom = temp.pop() # removes bottom\n    while temp:\n        stk.append(temp.pop())\n    return bottom",
            "markingScheme": "1 Mark for popping to temp, 1 Mark for removing bottom, 1 Mark for restoring elements into stk."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Implement a BrowserHistory class in Python using a Stack:\n1. visit(url): Pushes a new URL onto the back_stack.\n2. back(): Pops the current page and returns the previous URL. If no previous page exists, prints 'No history' and returns None.\n3. current_page(): Returns the top URL without removing it.\nDemonstrate by visiting 'google.com', 'python.org', 'cbse.nic.in', then going back twice.",
            "solution": "class BrowserHistory:\n    def __init__(self):\n        self.back_stack = []\n        \n    def visit(self, url):\n        self.back_stack.append(url)\n        print(f'Visited: {url}')\n        \n    def back(self):\n        if len(self.back_stack) <= 1:\n            print('No history')\n            return None\n        current = self.back_stack.pop()\n        prev = self.back_stack[-1]\n        print(f'Navigated back from {current} to {prev}')\n        return prev\n        \n    def current_page(self):\n        return self.back_stack[-1] if self.back_stack else None\n\nh = BrowserHistory()\nh.visit('google.com')\nh.visit('python.org')\nh.visit('cbse.nic.in')\nh.back()\nh.back()",
            "markingScheme": "2 Marks for visit method, 2.5 Marks for back method with history check, 1.5 Marks for current_page and demonstration."
          }
        ]
      }
    ]
  },
  {
    "setId": 8,
    "title": "Set 8: Stack with Custom Objects & Complex Filtering",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What built-in statement is commonly used with pop() to handle stack empty condition gracefully?\n(a) if stack:\n(b) try-except IndexError:\n(c) Both (a) and (b)\n(d) while True:",
            "solution": "(c) Both (a) and (b). Both 'if stack:' guard check and 'try-except IndexError' are valid Python idioms.",
            "markingScheme": "1 Mark for (c)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is the result of bool([]) in Python when testing a stack?",
            "solution": "False. An empty list evaluates to False in boolean context.",
            "markingScheme": "1 Mark for False."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is an activation record / stack frame?",
            "solution": "A chunk of memory pushed onto the system call stack containing the parameters, local variables, and return address of a function call.",
            "markingScheme": "1 Mark for chunk of memory with parameters, locals, and return address."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "True or False: Elements can be inserted into the middle of a stack.",
            "solution": "False. A stack strictly permits insertion only at the TOP.",
            "markingScheme": "1 Mark for False."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Trace output:\ns = []\ns.append(('A', 1))\ns.append(('B', 2))\ns.append(('C', 3))\nprint(s[-1][0], s.pop()[1], len(s))",
            "solution": "s[-1] is ('C', 3) -> s[-1][0] is 'A' (wait, s[-1] is ('C',3), s[-1][0] is 'C').\ns.pop()[1] pops ('C', 3) and returns 3.\nlen(s) is now 2.\nOutput:\nC 3 2",
            "markingScheme": "1 Mark for identifying 'C' and 3, 1 Mark for remaining len 2."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Write code to find the maximum element in a numerical stack without losing any stack elements.",
            "solution": "max_val = max(stk) if stk else None\nprint('Max:', max_val)",
            "markingScheme": "1 Mark for max(stk) without pop, 1 Mark for empty check."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function push_consonant_words(stk, words_list) that pushes all words that start with a consonant.",
            "solution": "def push_consonant_words(stk, words_list):\n    vowels = ('a', 'e', 'i', 'o', 'u')\n    for w in words_list:\n        if w and w[0].lower() not in vowels and w[0].isalpha():\n            stk.append(w)",
            "markingScheme": "1 Mark for loop, 1.5 Marks for consonant check (isalpha and not in vowels), 0.5 Mark for append."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function count_elements_greater_than(stk, val) that counts elements in stk strictly greater than val without modifying stk.",
            "solution": "def count_elements_greater_than(stk, val):\n    return sum(1 for item in stk if item > val)",
            "markingScheme": "1.5 Marks for generator expression item > val, 1.5 Marks for sum() and non-destructive traversal."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a complete Python program with functions:\n1. Push_Emp(stk, emp_dict): emp_dict has structure {eid: [name, dept, sal]}. Pushes [eid, name] of all employees with dept == 'Accounts' and sal >= 40000 into stk.\n2. Pop_Emp(stk): Pops and displays each record. If empty, displays 'Underflow'.\nDemonstrate with sample dictionary.",
            "solution": "def Push_Emp(stk, emp_dict):\n    for eid, info in emp_dict.items():\n        if info[1].lower() == 'accounts' and info[2] >= 40000:\n            stk.append([eid, info[0]])\n\ndef Pop_Emp(stk):\n    if not stk:\n        print('Underflow')\n        return\n    print('Popped Accounts Employees:')\n    while stk:\n        rec = stk.pop()\n        print(f'ID: {rec[0]}, Name: {rec[1]}')\n\ndef main():\n    stk = []\n    employees = {\n        101: ['Suresh', 'Accounts', 45000],\n        102: ['Anita', 'Sales', 50000],\n        103: ['Rajesh', 'Accounts', 38000],\n        104: ['Priya', 'Accounts', 62000]\n    }\n    Push_Emp(stk, employees)\n    print('Stack after Push:', stk)\n    Pop_Emp(stk)\n\nmain()",
            "markingScheme": "2.5 Marks for Push_Emp (dept == 'accounts' and sal >= 40000 check), 2.5 Marks for Pop_Emp (underflow check & while pop display), 1 Mark for main test."
          }
        ]
      }
    ]
  },
  {
    "setId": 9,
    "title": "Set 9: Multi-Stack Operations & Advanced Algorithmic Tracing",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "What is an infix expression?\n(a) Operator before operands\n(b) Operator between operands\n(c) Operator after operands\n(d) Expression without operator",
            "solution": "(b) Operator between operands (e.g. A + B).",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What is a postfix (Reverse Polish) expression?\n(a) Operator between operands\n(b) Operator after operands\n(c) Operator before operands\n(d) Parenthesized expression",
            "solution": "(b) Operator after operands (e.g. A B +).",
            "markingScheme": "1 Mark for (b)."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "What is the equivalent postfix form of (A + B) * C?\n(a) A B + C *\n(b) A B C + *\n(c) + A B * C\n(d) A + B C *",
            "solution": "(a) A B + C *.",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State whether postfix expressions require parentheses to define operator precedence.",
            "solution": "No. The order of evaluation in postfix notation is strictly unambiguous and requires zero parentheses.",
            "markingScheme": "1 Mark for No (unambiguous order without parentheses)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Evaluate the postfix expression using a stack table: 5 6 2 + * 12 4 / -",
            "solution": "1. Push 5, push 6, push 2 -> [5, 6, 2]\n2. '+' -> 6 + 2 = 8 -> push 8 -> [5, 8]\n3. '*' -> 5 * 8 = 40 -> push 40 -> [40]\n4. Push 12, push 4 -> [40, 12, 4]\n5. '/' -> 12 / 4 = 3 -> push 3 -> [40, 3]\n6. '-' -> 40 - 3 = 37 -> push 37 -> [37]\nFinal Result: 37",
            "markingScheme": "1 Mark for intermediate stack states, 1 Mark for final answer 37."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "Convert the infix expression A + B * C - D to postfix notation showing operator stack states.",
            "solution": "Precedence: * > + == -\n1. A -> Postfix: A\n2. + -> Stack: [+]\n3. B -> Postfix: A B\n4. * -> Stack: [+, *]\n5. C -> Postfix: A B C\n6. - -> Pop * and +, Postfix: A B C * +, Stack: [-]\n7. D -> Postfix: A B C * + D\n8. End -> Pop -, Postfix: A B C * + D -\nResult: A B C * + D -",
            "markingScheme": "1 Mark for correct precedence handling, 1 Mark for final expression: A B C * + D -."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function separate_even_odd(stk, even_stk, odd_stk) that pops all elements from stk and pushes even numbers to even_stk and odd numbers to odd_stk.",
            "solution": "def separate_even_odd(stk, even_stk, odd_stk):\n    while stk:\n        val = stk.pop()\n        if val % 2 == 0:\n            even_stk.append(val)\n        else:\n            odd_stk.append(val)",
            "markingScheme": "1 Mark for while stk loop, 1 Mark for val % 2 == 0 check and push, 1 Mark for odd push."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function merge_stacks(stk1, stk2) that merges elements of stk2 into stk1 while maintaining the original order of stk1 below stk2.",
            "solution": "def merge_stacks(stk1, stk2):\n    stk1.extend(stk2)\n    stk2.clear()",
            "markingScheme": "1.5 Marks for extend / appending stk2 elements onto stk1, 1.5 Marks for clearing stk2."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a Python program with functions:\n1. Push_Player(stk, player_list): player_list contains tuples (p_name, runs, wickets). Pushes player name into stk if runs > 500 or wickets > 20.\n2. Pop_Player(stk): Pops and displays player names. If empty, prints 'No Players in Stack'.\nShow execution.",
            "solution": "def Push_Player(stk, player_list):\n    for p in player_list:\n        if p[1] > 500 or p[2] > 20:\n            stk.append(p[0])\n\ndef Pop_Player(stk):\n    if not stk:\n        print('No Players in Stack')\n        return\n    print('Popped Star Players:')\n    while stk:\n        print(stk.pop())\n\ndef main():\n    stk = []\n    players = [\n        ('Virat', 650, 2),\n        ('Bumrah', 45, 28),\n        ('Rahul', 320, 0),\n        ('Jadeja', 420, 22)\n    ]\n    Push_Player(stk, players)\n    print('Star players stack:', stk)\n    Pop_Player(stk)\n\nmain()",
            "markingScheme": "2.5 Marks for Push_Player (runs > 500 or wickets > 20 condition), 2.5 Marks for Pop_Player (empty check & while loop pop), 1 Mark for main."
          }
        ]
      }
    ]
  },
  {
    "setId": 10,
    "title": "Set 10: Complete Stack Mastery & Board Examination Blueprint",
    "timeAllowed": "45 Minutes",
    "maxMarks": 20,
    "sections": [
      {
        "name": "Section A: Objective & Conceptual Questions (4 Marks)",
        "questions": [
          {
            "qNo": 1,
            "marks": 1,
            "question": "In CBSE examination questions on Stacks, what is the standard signature for a Push function?\n(a) Push(stk, item)\n(b) stk.push(item)\n(c) push_item()\n(d) add(stk)",
            "solution": "(a) Push(stk, item) or Push(stk) accepting the target data structure as parameter.",
            "markingScheme": "1 Mark for (a)."
          },
          {
            "qNo": 2,
            "marks": 1,
            "question": "What does the Pop function in CBSE questions return when the stack is empty?",
            "solution": "'Underflow' or None (with message displayed).",
            "markingScheme": "1 Mark for 'Underflow' / None."
          },
          {
            "qNo": 3,
            "marks": 1,
            "question": "Which data structure is also known as a 'Pushdown List'?",
            "solution": "A Stack.",
            "markingScheme": "1 Mark for Stack."
          },
          {
            "qNo": 4,
            "marks": 1,
            "question": "State the number of pointers maintained in a software stack.",
            "solution": "One pointer (TOP).",
            "markingScheme": "1 Mark for One pointer (TOP)."
          }
        ]
      },
      {
        "name": "Section B: Short Answer & Output Tracing (4 Marks)",
        "questions": [
          {
            "qNo": 5,
            "marks": 2,
            "question": "Trace output:\nstk = []\nfor i in [1, 2, 3, 4, 5]:\n    stk.append(i * i)\nprint(stk.pop() + stk.pop())",
            "solution": "Pushed squares: 1, 4, 9, 16, 25.\nFirst pop() -> 25\nSecond pop() -> 16\nSum = 25 + 16 = 41.\nOutput:\n41",
            "markingScheme": "1 Mark for identifying 25 and 16, 1 Mark for 41."
          },
          {
            "qNo": 6,
            "marks": 2,
            "question": "State two applications of stack in operating systems and compiler design.",
            "solution": "1. Function call management and recursion (call stack).\n2. Parsing and syntax tree evaluation of arithmetic expressions.",
            "markingScheme": "1 Mark per valid application."
          }
        ]
      },
      {
        "name": "Section C: Analytical Problem Solving (6 Marks)",
        "questions": [
          {
            "qNo": 7,
            "marks": 3,
            "question": "Write a function push_multiples(stk, lst, k) that pushes all elements from lst that are multiples of k into stk.",
            "solution": "def push_multiples(stk, lst, k):\n    for num in lst:\n        if num % k == 0:\n            stk.append(num)",
            "markingScheme": "1 Mark for loop, 1.5 Marks for num % k == 0 check, 0.5 Mark for append."
          },
          {
            "qNo": 8,
            "marks": 3,
            "question": "Write a function pop_and_print_formatted(stk) that pops elements and prints them separated by ' -> ' followed by 'None'.",
            "solution": "def pop_and_print_formatted(stk):\n    if not stk:\n        print('None')\n        return\n    while stk:\n        print(stk.pop(), end=' -> ')\n    print('None')",
            "markingScheme": "1 Mark for empty check, 1.5 Marks for while loop and end=' -> ', 0.5 Mark for final 'None'."
          }
        ]
      },
      {
        "name": "Section D: Programming & Comprehensive Application (6 Marks)",
        "questions": [
          {
            "qNo": 9,
            "marks": 6,
            "question": "Write a complete CBSE standard program with functions:\n1. Push_Hotel(stk, hotel_dict): hotel_dict contains {room_no: [guest_name, room_type, bill_amount]}. Pushes [room_no, guest_name] into stk if room_type == 'Deluxe' and bill_amount > 5000.\n2. Pop_Hotel(stk): Pops and displays each guest's room and name until empty. If empty, prints 'Underflow'.\nDemonstrate with sample hotel records.",
            "solution": "def Push_Hotel(stk, hotel_dict):\n    for room_no, info in hotel_dict.items():\n        if info[1].lower() == 'deluxe' and info[2] > 5000:\n            stk.append([room_no, info[0]])\n\ndef Pop_Hotel(stk):\n    if not stk:\n        print('Stack Underflow!')\n        return\n    print('Popped Deluxe Guests:')\n    while stk:\n        room, name = stk.pop()\n        print(f'Room: {room} | Guest: {name}')\n\ndef main():\n    stk = []\n    hotels = {\n        101: ['Mr. Sharma', 'Standard', 3500],\n        102: ['Ms. Roy', 'Deluxe', 7500],\n        103: ['Dr. Sen', 'Deluxe', 4500],\n        104: ['Mrs. Verma', 'Deluxe', 9000]\n    }\n    Push_Hotel(stk, hotels)\n    print('Stack contents:', stk)\n    Pop_Hotel(stk)\n\nmain()",
            "markingScheme": "2.5 Marks for Push_Hotel (info[1] == 'deluxe' and info[2] > 5000 condition & append), 2.5 Marks for Pop_Hotel (Underflow check & while pop display), 1 Mark for main."
          }
        ]
      }
    ]
  }
];
