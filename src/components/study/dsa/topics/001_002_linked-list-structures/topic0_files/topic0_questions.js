const questions = [
  {
    id: 1,
    question: "Why is element access in a Singly Linked List O(n) while array access is O(1)?",
    options: [
      "Nodes are stored in non-contiguous heap memory locations connected by pointers",
      "Linked lists use binary search internally",
      "Heap memory access takes O(n) CPU cycles",
      "Pointers consume double RAM"
    ],
    answer: "Nodes are stored in non-contiguous heap memory locations connected by pointers",
    explanation: "Because nodes are allocated dynamically on the heap at arbitrary addresses, accessing the k-th node requires traversing from the head pointer node-by-node using `curr = curr->next`."
  },
  {
    id: 2,
    question: "What is the time complexity of reversing a Singly Linked List in-place?",
    options: ["O(n^2)", "O(n)", "O(log n)", "O(1)"],
    answer: "O(n)",
    explanation: "Reversing a singly linked list in-place uses 3 pointers (`prev`, `curr`, `next`) and traverses the list in a single pass of n nodes."
  },
  {
    id: 3,
    question: "What algorithm is commonly used for detecting a cycle (loop) in a linked list?",
    options: [
      "Floyd's Tortoise and Hare Algorithm (Two Pointers)",
      "Dijkstra's Shortest Path",
      "Kruskal's Algorithm",
      "Binary Search"
    ],
    answer: "Floyd's Tortoise and Hare Algorithm (Two Pointers)",
    explanation: "Floyd's cycle detection algorithm uses a slow pointer (moves 1 step) and a fast pointer (moves 2 steps). If a loop exists, fast and slow will collide."
  },
  {
    id: 4,
    question: "In a Doubly Linked List, what extra member does each node contain compared to a Singly Linked List?",
    options: [
      "A pointer to the previous node (`prev`)",
      "A hash table key",
      "An array index",
      "A stack frame pointer"
    ],
    answer: "A pointer to the previous node (`prev`)",
    explanation: "Each node in a doubly linked list contains `data`, `next` (points to subsequent node), and `prev` (points to antecedent node)."
  },
  {
    id: 5,
    question: "What happens if you free a head node (`free(head)`) before saving its `next` pointer?",
    options: [
      "The rest of the list becomes unreachable causing a memory leak (dangling pointers)",
      "The entire linked list is automatically freed by the compiler",
      "Returns NULL",
      "Resets head to 0"
    ],
    answer: "The rest of the list becomes unreachable causing a memory leak (dangling pointers)",
    explanation: "Calling `free(head)` destroys the node containing the `next` pointer. Without saving `head->next` first, references to remaining nodes are permanently lost."
  }
];

export default questions;
