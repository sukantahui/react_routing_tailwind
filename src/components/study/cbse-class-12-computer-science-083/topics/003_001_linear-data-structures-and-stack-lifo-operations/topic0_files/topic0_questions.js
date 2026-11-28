// 25 Authentic CBSE Board Examination Questions for Topic 0
const questions = [
  {
    "id": 1,
    "question": "What is a data structure in Computer Science?",
    "options": [
      "A hardware chip inside the CPU",
      "A specialized scheme for organizing, storing, and manipulating data efficiently in memory",
      "An operating system command line tool",
      "A type of printer cable"
    ],
    "correctAnswer": 1,
    "explanation": "A data structure is an organized collection of data elements with specific relationships and operations.",
    "hint": "Scheme for organizing and storing data."
  },
  {
    "id": 2,
    "question": "Which of the following is categorized as a Primitive Data Structure in Python?",
    "options": [
      "Stack",
      "List",
      "Integer (int)",
      "Queue"
    ],
    "correctAnswer": 2,
    "explanation": "Integer (int), float, bool, and str are built-in primitive scalar data types.",
    "hint": "Integer (int)."
  },
  {
    "id": 3,
    "question": "Which of the following is a Linear Data Structure?",
    "options": [
      "Binary Tree",
      "Stack",
      "Graph",
      "Hierarchical Directory Tree"
    ],
    "correctAnswer": 1,
    "explanation": "A Stack is a linear data structure because its elements are arranged in a single sequential line.",
    "hint": "Stack."
  },
  {
    "id": 4,
    "question": "Which characteristic distinguishes a Linear Data Structure from a Non-Linear Data Structure?",
    "options": [
      "Linear structures store only numbers",
      "In linear structures, each element has a unique predecessor and successor (except endpoints)",
      "Non-linear structures cannot be represented in RAM",
      "Linear structures cannot be searched"
    ],
    "correctAnswer": 1,
    "explanation": "In a linear structure, elements form a sequence where every item (except first and last) has exactly one predecessor and one successor.",
    "hint": "Sequential predecessor-successor relationship."
  },
  {
    "id": 5,
    "question": "Which of the following data structures is Non-Linear?",
    "options": [
      "Array / List",
      "Stack",
      "Tree",
      "Queue"
    ],
    "correctAnswer": 2,
    "explanation": "Trees and Graphs are non-linear data structures because elements branch hierarchically or arbitrarily.",
    "hint": "Tree."
  },
  {
    "id": 6,
    "question": "What operation involves visiting every element in a data structure exactly once?",
    "options": [
      "Insertion",
      "Traversal",
      "Sorting",
      "Merging"
    ],
    "correctAnswer": 1,
    "explanation": "Traversal is the process of visiting/accessing every element of a data structure systematically.",
    "hint": "Traversal."
  },
  {
    "id": 7,
    "question": "What operation involves combining two pre-sorted data structures into a single sorted structure?",
    "options": [
      "Splitting",
      "Merging",
      "Filtering",
      "Truncating"
    ],
    "correctAnswer": 1,
    "explanation": "Merging combines two sorted structures into one sorted collection.",
    "hint": "Merging."
  },
  {
    "id": 8,
    "question": "What is the difference between a static and a dynamic data structure?",
    "options": [
      "Static structures change color; dynamic do not",
      "Static structures have a fixed size determined at compile-time; dynamic structures grow and shrink at runtime",
      "Static structures run only in Python 2",
      "Dynamic structures are stored only on hard disks"
    ],
    "correctAnswer": 1,
    "explanation": "Static structures have fixed memory allocations, whereas dynamic structures adjust their memory size at runtime.",
    "hint": "Fixed size vs runtime size growth."
  },
  {
    "id": 9,
    "question": "In Python, is the built-in 'list' data structure static or dynamic?",
    "options": [
      "Static with fixed 10 elements",
      "Dynamic because it can expand or shrink at runtime using append() and pop()",
      "Neither",
      "Only static when containing integers"
    ],
    "correctAnswer": 1,
    "explanation": "Python lists are dynamic arrays that automatically resize as elements are added or removed.",
    "hint": "Dynamic."
  },
  {
    "id": 10,
    "question": "Which of the following operations refers to adding a new element into a data structure?",
    "options": [
      "Deletion",
      "Insertion",
      "Traversal",
      "Searching"
    ],
    "correctAnswer": 1,
    "explanation": "Insertion is the process of adding an element to a collection.",
    "hint": "Insertion."
  },
  {
    "id": 11,
    "question": "Which of the following operations refers to finding the memory address or index of an element with a specific value?",
    "options": [
      "Searching",
      "Sorting",
      "Hashing",
      "Tracing"
    ],
    "correctAnswer": 0,
    "explanation": "Searching locates the presence and position of a target key in the data structure.",
    "hint": "Searching."
  },
  {
    "id": 12,
    "question": "What is the operation of arranging unordered elements into ascending or descending sequence called?",
    "options": [
      "Indexing",
      "Sorting",
      "Traversing",
      "Merging"
    ],
    "correctAnswer": 1,
    "explanation": "Sorting arranges elements in a specific order (ascending or descending).",
    "hint": "Sorting."
  },
  {
    "id": 13,
    "question": "Which of the following is NOT a linear data structure?",
    "options": [
      "Stack",
      "Queue",
      "Graph",
      "Linear List"
    ],
    "correctAnswer": 2,
    "explanation": "A Graph consists of vertices and edges without a single linear sequence, making it non-linear.",
    "hint": "Graph."
  },
  {
    "id": 14,
    "question": "How are elements arranged in a Non-Linear Data Structure?",
    "options": [
      "In a sequential 1D line",
      "In hierarchical (parent-child) or interconnected graph networks",
      "In reverse alphabetical order",
      "In circular rings only"
    ],
    "correctAnswer": 1,
    "explanation": "Non-linear data structures arrange elements hierarchically (trees) or in interconnected networks (graphs).",
    "hint": "Hierarchical or interconnected networks."
  },
  {
    "id": 15,
    "question": "Which data structure is primarily prescribed for detailed implementation in CBSE Class 12 Computer Science Unit I?",
    "options": [
      "Red-Black Tree",
      "Stack (using Python list)",
      "Adjacency Matrix Graph",
      "B-Tree"
    ],
    "correctAnswer": 1,
    "explanation": "CBSE Class 12 CS (Code 083) specifically focuses on the Stack data structure implemented via Python linear lists.",
    "hint": "Stack (using Python list)."
  },
  {
    "id": 16,
    "question": "In a singly linked list, how does each node connect to the next node?",
    "options": [
      "Via magnetic tape tracks",
      "Via a reference/pointer to the next node object",
      "Via Python dictionary keys",
      "Via disk sectors"
    ],
    "correctAnswer": 1,
    "explanation": "Each node contains a data field and a pointer (or reference) to the succeeding node.",
    "hint": "Pointer/reference to next node."
  },
  {
    "id": 17,
    "question": "Which of the following is an example of a hierarchical non-linear data structure used by operating systems?",
    "options": [
      "The file directory / folder tree structure",
      "A printer print spooler queue",
      "An undo stack in Word",
      "A list of students"
    ],
    "correctAnswer": 0,
    "explanation": "File systems organize folders and subfolders as a hierarchical Tree structure.",
    "hint": "File directory / folder tree."
  },
  {
    "id": 18,
    "question": "What is the time complexity of accessing an element by index in a Python list (e.g. my_list[4])?",
    "options": [
      "O(1) - Constant Time",
      "O(N) - Linear Time",
      "O(N^2) - Quadratic Time",
      "O(log N)"
    ],
    "correctAnswer": 0,
    "explanation": "Array and list index lookups calculate the memory offset directly, taking O(1) constant time.",
    "hint": "O(1) - Constant Time."
  },
  {
    "id": 19,
    "question": "What happens if an index exceeds the boundary of a Python list (e.g. lst[10] when len(lst) is 5)?",
    "options": [
      "Returns None",
      "Raises IndexError: list index out of range",
      "Returns 0",
      "Expands the list automatically"
    ],
    "correctAnswer": 1,
    "explanation": "Accessing an out-of-bounds index raises IndexError.",
    "hint": "IndexError."
  },
  {
    "id": 20,
    "question": "Which data structure models a First-In-First-Out (FIFO) access order?",
    "options": [
      "Stack",
      "Queue",
      "Binary Tree",
      "Heap"
    ],
    "correctAnswer": 1,
    "explanation": "A Queue operates on the FIFO (First-In, First-Out) principle.",
    "hint": "Queue."
  },
  {
    "id": 21,
    "question": "Which data structure models a Last-In-First-Out (LIFO) access order?",
    "options": [
      "Queue",
      "Stack",
      "Set",
      "Tuple"
    ],
    "correctAnswer": 1,
    "explanation": "A Stack operates on the LIFO (Last-In, First-Out) principle.",
    "hint": "Stack."
  },
  {
    "id": 22,
    "question": "Can non-primitive data structures contain other non-primitive data structures in Python?",
    "options": [
      "No, only primitive types can be nested",
      "Yes, Python lists can contain other lists, dictionaries, or custom objects (nested structures)",
      "Only in C++",
      "Only if serialized"
    ],
    "correctAnswer": 1,
    "explanation": "Python supports nested composite data structures (e.g. lists of lists, lists of dictionaries).",
    "hint": "Yes, nested structures are supported."
  },
  {
    "id": 23,
    "question": "What is an Abstract Data Type (ADT)?",
    "options": [
      "A data type that does not exist in memory",
      "A mathematical specification of a data structure defining its behavior and legal operations from the user's perspective, independent of implementation",
      "A variable without a name",
      "A compiled C extension"
    ],
    "correctAnswer": 1,
    "explanation": "An ADT specifies what operations can be performed on the data without specifying how they are implemented under the hood.",
    "hint": "Mathematical specification independent of implementation."
  },
  {
    "id": 24,
    "question": "In the CBSE Class 12 board examination theory paper, how many marks are typically allotted to Data Structure questions?",
    "options": [
      "1 mark",
      "3 to 4 marks (often Section C or D)",
      "15 marks",
      "20 marks"
    ],
    "correctAnswer": 1,
    "explanation": "Data Structures (Stack operations) typically feature as a 3-mark or 4-mark coding question in CBSE board exams.",
    "hint": "3 to 4 marks."
  },
  {
    "id": 25,
    "question": "Why are linear data structures easier to implement and traverse compared to non-linear structures?",
    "options": [
      "They use less CPU voltage",
      "Their elements reside in a single sequential sequence with clear sequential start and end points",
      "They don't require memory",
      "They are built into the monitor"
    ],
    "correctAnswer": 1,
    "explanation": "Linear structures have a direct sequential order, making sequential iteration and memory management straightforward.",
    "hint": "Sequential ordering makes iteration straightforward."
  }
];

export default questions;
