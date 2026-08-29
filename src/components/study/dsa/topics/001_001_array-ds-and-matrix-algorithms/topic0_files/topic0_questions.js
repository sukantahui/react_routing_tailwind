const questions = [
  {
    id: 1,
    question: "What is the time complexity of accessing an element at a specific index in a standard C array?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
    answer: "O(1)",
    explanation: "C arrays store elements in contiguous memory locations. Using the formula `Address(A[i]) = BaseAddress + i * sizeof(type)`, memory access is computed in O(1) constant time."
  },
  {
    id: 2,
    question: "What happens if you access an index out of bounds in C (e.g. `arr[10]` for an array of size 5)?",
    options: [
      "Throws IndexOutOfBoundsException",
      "Undefined Behavior (reads arbitrary memory or segfaults)",
      "Automatically resizes array",
      "Returns 0"
    ],
    answer: "Undefined Behavior (reads arbitrary memory or segfaults)",
    explanation: "C does not perform automatic bounds checking. Accessing an out-of-bounds index reads/writes unreserved memory, leading to security vulnerabilities or Segmentation Fault (SIGSEGV)."
  },
  {
    id: 3,
    question: "Which C standard library function is used to change the size of a dynamically allocated array block?",
    options: ["malloc()", "calloc()", "realloc()", "free()"],
    answer: "realloc()",
    explanation: "`realloc(ptr, new_size)` reallocates memory, copying existing contents to the new contiguous memory area if relocation is necessary."
  },
  {
    id: 4,
    question: "In C, how are multi-dimensional arrays stored in physical memory?",
    options: ["Column-Major Order", "Row-Major Order", "Hashed Buckets", "Tree Map"],
    answer: "Row-Major Order",
    explanation: "C stores 2D arrays row by row in contiguous memory locations (Row-Major Order), so `arr[i][j]` is followed immediately by `arr[i][j+1]`."
  },
  {
    id: 5,
    question: "What is the key advantage of a dynamic array over a static array in C?",
    options: [
      "Faster index access time O(0.5)",
      "Flexible sizing at runtime using heap memory",
      "Automatic garbage collection",
      "Type conversion support"
    ],
    answer: "Flexible sizing at runtime using heap memory",
    explanation: "Dynamic arrays are allocated on the Heap using `malloc()`/`realloc()`, allowing the container capacity to grow or shrink dynamically as items are added."
  }
];

export default questions;
