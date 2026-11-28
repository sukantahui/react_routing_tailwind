// 25 Authentic CBSE Board Examination Questions for Topic 9
const questions = [
  {
    "id": 1,
    "question": "What is a 'Record-Based Stack' in Python?",
    "options": [
      "A stack that writes only to hard disks",
      "A stack where each element is a composite collection (such as a sub-list or tuple) containing multiple attributes",
      "A stack that only stores music files",
      "A stack without a TOP"
    ],
    "correctAnswer": 1,
    "explanation": "In a record-based stack, every pushed element is a multi-attribute data structure (e.g. [RollNo, Name, Marks]).",
    "hint": "Composite collection containing multiple attributes."
  },
  {
    "id": 2,
    "question": "Consider: Push(stk, [101, 'Aarav', 95.5]). What is the datatype of this element inside the stack?",
    "options": [
      "int",
      "list",
      "str",
      "float"
    ],
    "correctAnswer": 1,
    "explanation": "The element itself is a Python list containing three heterogeneous values.",
    "hint": "list."
  },
  {
    "id": 3,
    "question": "How do you access the Name of the top student in record_stack = [[101, 'Amit', 80], [102, 'Ria', 90]]?",
    "options": [
      "record_stack[-1][1]",
      "record_stack[0][1]",
      "record_stack[1][0]",
      "record_stack.name"
    ],
    "correctAnswer": 0,
    "explanation": "record_stack[-1] accesses the top record [102, 'Ria', 90]; indexing [1] extracts the Name 'Ria'.",
    "hint": "record_stack[-1][1]."
  },
  {
    "id": 4,
    "question": "What does record_stack[-1][2] represent in a stack storing [Roll, Name, Marks]?",
    "options": [
      "Roll number of top student",
      "Name of top student",
      "Marks of top student",
      "Total count"
    ],
    "correctAnswer": 2,
    "explanation": "Index 2 corresponds to the third field (Marks).",
    "hint": "Marks of top student."
  },
  {
    "id": 5,
    "question": "How do you unpack a popped student record [101, 'Aarav', 95.5] into individual variables?",
    "options": [
      "rno, name, marks = stk.pop()",
      "rno = stk.pop()[0], name = stk.pop()[1]",
      "stk.unpack()",
      "stk.pop(rno, name, marks)"
    ],
    "correctAnswer": 0,
    "explanation": "Python tuple/list unpacking allows direct assignment: rno, name, marks = stk.pop().",
    "hint": "rno, name, marks = stk.pop()."
  },
  {
    "id": 6,
    "question": "Consider: def PushBook(stk, bno, title, price): stk.append([bno, title, price]). What is the length of stk after this call on an empty stack?",
    "options": [
      "1",
      "3",
      "0",
      "None"
    ],
    "correctAnswer": 0,
    "explanation": "The composite sub-list is appended as a SINGLE element, so len(stk) is 1.",
    "hint": "1."
  },
  {
    "id": 7,
    "question": "What would happen if a student used stk.extend([bno, title, price]) instead of stk.append()?",
    "options": [
      "Works the same",
      "It adds bno, title, and price as THREE separate individual elements, destroying the record structure!",
      "IndexError occurs",
      "Stack is reversed"
    ],
    "correctAnswer": 1,
    "explanation": "extend() unpacks elements, corrupting the composite record format.",
    "hint": "Adds as 3 separate elements, corrupting structure."
  },
  {
    "id": 8,
    "question": "In CBSE board coding questions, how is the display of a record-based stack typically formatted?",
    "options": [
      "In binary bytes",
      "In clean tabular rows with column headers (Roll, Name, Marks)",
      "As an unformatted dictionary",
      "In HTML"
    ],
    "correctAnswer": 1,
    "explanation": "Tabular formatting with headers and neat column alignment is the textbook standard.",
    "hint": "Clean tabular rows with column headers."
  },
  {
    "id": 9,
    "question": "How do you check if the top record has marks >= 90 without popping it?",
    "options": [
      "if len(stk) > 0 and stk[-1][2] >= 90:",
      "if stk.pop()[2] >= 90:",
      "if stk[0] >= 90:",
      "if stk.peek() >= 90:"
    ],
    "correctAnswer": 0,
    "explanation": "Checking len(stk) > 0 followed by stk[-1][2] inspects marks safely without deleting the record.",
    "hint": "if len(stk) > 0 and stk[-1][2] >= 90:."
  },
  {
    "id": 10,
    "question": "What is the time complexity of pushing a composite record [rno, name, marks] into a list-based stack?",
    "options": [
      "O(1) amortized",
      "O(N)",
      "O(N^2)",
      "O(log N)"
    ],
    "correctAnswer": 0,
    "explanation": "Appending a reference to a sub-list takes O(1) amortized constant time.",
    "hint": "O(1) amortized."
  },
  {
    "id": 11,
    "question": "Can tuples be used instead of lists for storing immutable inner records, e.g. stk.append((rno, name, marks))?",
    "options": [
      "No, tuples are forbidden in stacks",
      "Yes, tuples are ideal for inner records because record fields remain protected from accidental modification",
      "Only if marks are integer",
      "Only in Linux"
    ],
    "correctAnswer": 1,
    "explanation": "Tuples make great immutable inner records inside a mutable outer list stack.",
    "hint": "Yes, tuples protect record fields from modification."
  },
  {
    "id": 12,
    "question": "Consider: stk = [[1, 'A', 50], [2, 'B', 60], [3, 'C', 70]]. What does Pop() remove?",
    "options": [
      "[1, 'A', 50]",
      "[2, 'B', 60]",
      "[3, 'C', 70] (the top record)",
      "Only the number 70"
    ],
    "correctAnswer": 2,
    "explanation": "[3, 'C', 70] is at the TOP (end of list) and is popped as an entire record.",
    "hint": "[3, 'C', 70]."
  },
  {
    "id": 13,
    "question": "How do you count how many records in a stack have Marks > 80?",
    "options": [
      "sum(1 for rec in stk if rec[2] > 80)",
      "len(stk)",
      "stk.count(80)",
      "max(stk)"
    ],
    "correctAnswer": 0,
    "explanation": "Generator comprehension iterating through rec[2] counts matching records cleanly.",
    "hint": "sum(1 for rec in stk if rec[2] > 80)."
  },
  {
    "id": 14,
    "question": "What exception occurs if you access rec[3] on a record with only 3 attributes [Roll, Name, Marks]?",
    "options": [
      "IndexError: list index out of range",
      "ValueError",
      "TypeError",
      "ZeroDivisionError"
    ],
    "correctAnswer": 0,
    "explanation": "For 3 attributes, valid indices are 0, 1, and 2. Index 3 raises IndexError.",
    "hint": "IndexError."
  },
  {
    "id": 15,
    "question": "Can dictionaries be used as composite elements in a stack (e.g. stk.append({'Roll': 101, 'Name': 'Aarav'}))?",
    "options": [
      "No",
      "Yes, dictionaries can be stored as stack elements, and accessed via stk[-1]['Roll']",
      "Only in JSON",
      "Only in Python 2"
    ],
    "correctAnswer": 1,
    "explanation": "Dictionaries are valid composite elements in Python stacks.",
    "hint": "Yes, dictionaries are valid elements."
  },
  {
    "id": 16,
    "question": "Consider: def Pop(stk): if len(stk) == 0: return 'Underflow' else: rec = stk.pop(); return rec[1]. What does this Pop return?",
    "options": [
      "The entire record",
      "Only the student's Name from the popped record",
      "The roll number",
      "The marks"
    ],
    "correctAnswer": 1,
    "explanation": "rec[1] extracts and returns only the Name field of the popped record.",
    "hint": "Only the student's Name."
  },
  {
    "id": 17,
    "question": "What is printed by: for i in range(len(stk)-1, -1, -1): print(stk[i][0]) on student records?",
    "options": [
      "All student names",
      "All roll numbers from TOP down to bottom",
      "Marks only",
      "Nothing"
    ],
    "correctAnswer": 1,
    "explanation": "Index 0 is Roll Number, printed in reverse order from TOP to bottom.",
    "hint": "All roll numbers from TOP to bottom."
  },
  {
    "id": 18,
    "question": "In a library management stack storing [BookID, Title, Price], how do you filter and display only books with Price < 500?",
    "options": [
      "for b in reversed(stk): if b[2] < 500: print(b)",
      "if stk.price < 500: print(stk)",
      "stk.filter(500)",
      "del stk[500]"
    ],
    "correctAnswer": 0,
    "explanation": "Iterating through reversed(stk) and checking b[2] < 500 displays matching books in LIFO order.",
    "hint": "for b in reversed(stk): if b[2] < 500: print(b)."
  },
  {
    "id": 19,
    "question": "What is the memory footprint difference between pushing 100 individual integers vs 100 3-element lists?",
    "options": [
      "3-element lists have higher memory footprint due to multiple list object headers",
      "Integers use more memory",
      "Exact same memory",
      "Lists use zero bytes"
    ],
    "correctAnswer": 0,
    "explanation": "Each inner list is a separate Python heap object with its own header, consuming more memory.",
    "hint": "Inner lists carry object header overhead."
  },
  {
    "id": 20,
    "question": "Consider: def PushHighScorers(stk, student_list): for s in student_list: if s[2] >= 90: stk.append(s). What does this function do?",
    "options": [
      "Deletes students",
      "Pushes only students who scored 90 or more marks onto the stack",
      "Sorts students",
      "Pushes all students"
    ],
    "correctAnswer": 1,
    "explanation": "It iterates through student_list and conditionally pushes high scorers onto stk.",
    "hint": "Pushes students with marks >= 90."
  },
  {
    "id": 21,
    "question": "How do you search for a student with Roll Number 105 in a record stack without deleting records?",
    "options": [
      "for rec in stk: if rec[0] == 105: print('Found:', rec)",
      "stk.pop(105)",
      "stk.search(105)",
      "del stk[105]"
    ],
    "correctAnswer": 0,
    "explanation": "Looping through stk and comparing rec[0] performs a non-destructive linear search.",
    "hint": "Non-destructive linear traversal."
  },
  {
    "id": 22,
    "question": "What is the return value of Pop() on a record stack when Underflow occurs?",
    "options": [
      "None",
      "[]",
      "0",
      "IndexError"
    ],
    "correctAnswer": 0,
    "explanation": "Underflow handlers typically return None.",
    "hint": "None."
  },
  {
    "id": 23,
    "question": "Why do CBSE Class 12 board questions frequently use record-based stacks instead of simple integers?",
    "options": [
      "To test multi-dimensional indexing (rec[0], rec[1]), real-world data handling, and conditional filtering simultaneously",
      "Because simple integers are forbidden",
      "To make code impossible to write",
      "Because Python lacks numbers"
    ],
    "correctAnswer": 0,
    "explanation": "It tests practical data handling, index access, and conditional algorithmic thinking.",
    "hint": "Tests multi-dimensional indexing & conditional filtering."
  },
  {
    "id": 24,
    "question": "What happens if a student modifies rec[2] inside a loop 'for rec in stk: rec[2] += 5'?",
    "options": [
      "Inner lists are modified in-place, adding 5 grace marks to all students in the stack",
      "Throws error",
      "Stack is deleted",
      "Only local copy is changed"
    ],
    "correctAnswer": 0,
    "explanation": "Because inner lists are mutable, in-place item modifications persist directly in the stack.",
    "hint": "Modifies inner lists in-place."
  },
  {
    "id": 25,
    "question": "Which of the following creates a clean tabular display with string alignment for [Roll, Name, Marks]?",
    "options": [
      "print(f'{rec[0]:<8} {rec[1]:<20} {rec[2]:>6.2f}')",
      "print(rec)",
      "print(rec[0] + rec[1] + rec[2])",
      "print(rec.align())"
    ],
    "correctAnswer": 0,
    "explanation": "f-string alignment specifiers :<8, :<20, and :>6.2f produce aligned columns.",
    "hint": "f-string alignment specifiers."
  }
];

export default questions;
