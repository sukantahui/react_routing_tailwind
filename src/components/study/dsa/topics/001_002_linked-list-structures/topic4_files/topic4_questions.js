const questions = [
  {
    id: 1,
    question: "What defines a Circular Singly Linked List?",
    options: [
      "The last node's `next` pointer points back to the first node (`tail->next == head`) instead of `NULL`",
      "Every node points to `NULL`",
      "Nodes are stored in a circular static array",
      "Each node has both `prev` and `next` pointing to `NULL`"
    ],
    answer: "The last node's `next` pointer points back to the first node (`tail->next == head`) instead of `NULL`",
    explanation: "Because `tail->next == head`, traversing forward wraps smoothly from the last node back to the first node."
  },
  {
    id: 2,
    question: "Why is maintaining a `tail` pointer (instead of `head`) a huge optimization for a Circular Linked List?",
    options: [
      "`head` is still accessible in O(1) via `tail->next`, AND both `insertHead` and `insertTail` run in O(1) time without traversing",
      "`tail` cuts node memory size in half",
      "Searching becomes O(1)",
      "`tail` allows backward traversal in a singly circular list"
    ],
    answer: "`head` is still accessible in O(1) via `tail->next`, AND both `insertHead` and `insertTail` run in O(1) time without traversing",
    explanation: "With only `head`, inserting at either end needs an O(N) walk to find the last node to rewire `last->next`. With `tail`, both ends are 1 step away!"
  },
  {
    id: 3,
    question: "In a Circular Linked List containing only ONE node `p`, what must `p->next` point to?",
    options: [
      "Itself (`p->next = p`)",
      "`NULL`",
      "Address `0x1`",
      "Unitialized garbage"
    ],
    answer: "Itself (`p->next = p`)",
    explanation: "For a 1-node circular list, `p` is both `head` and `tail`, so `tail->next == head` means `p->next == p`."
  },
  {
    id: 4,
    question: "What happens if you accidentally traverse a Circular Linked List using `while (curr != NULL) { curr = curr->next; }`?",
    options: [
      "An infinite loop—because no node in a non-empty circular list has `next == NULL`",
      "It prints each node once and exits",
      "It stops after 2 laps",
      "It triggers a compile error"
    ],
    answer: "An infinite loop—because no node in a non-empty circular list has `next == NULL`",
    explanation: "Since `tail->next == head`, `curr` never becomes `NULL`. You must stop when `curr` wraps back to `head`."
  },
  {
    id: 5,
    question: "Why is a `do { ... } while (curr != head);` loop preferred over `while (curr != head)` when printing a Circular Linked List?",
    options: [
      "Because `curr` starts AT `head`, so a `while (curr != head)` loop would be false on the very first check and print 0 nodes!",
      "`do-while` runs twice as fast in C",
      "`while` loops cannot compare pointers",
      "`do-while` handles `head == NULL` automatically without an `if`"
    ],
    answer: "Because `curr` starts AT `head`, so a `while (curr != head)` loop would be false on the very first check and print 0 nodes!",
    explanation: "With `do-while`, `head` is visited first, `curr = curr->next` advances, and the loop stops once `curr` returns to `head` (after guarding `if (tail == NULL)`!)."
  },
  {
    id: 6,
    question: "Before running `do { ... } while (curr != head);`, what guard is mandatory?",
    options: [
      "`if (tail == NULL) return;` (empty list check)",
      "`if (tail->next == NULL)`",
      "`if (sizeof(Node) == 16)`",
      "No guard is needed"
    ],
    answer: "`if (tail == NULL) return;` (empty list check)",
    explanation: "If the circular list is empty (`tail == NULL`), `tail->next` or `curr->next` inside `do-while` would dereference `NULL` and segfault!"
  },
  {
    id: 7,
    question: "In the `tail`-pointer representation, what two lines append `newNode` at the TAIL of a non-empty Circular Linked List in O(1)?",
    options: [
      "`newNode->next = tail->next; tail->next = newNode; tail = newNode;`",
      "`tail = newNode; newNode->next = tail;`",
      "`tail->next = newNode; newNode->next = NULL;`",
      "`newNode->next = tail; tail = newNode;`"
    ],
    answer: "`newNode->next = tail->next; tail->next = newNode; tail = newNode;`",
    explanation: "`tail->next` is `head`, so `newNode->next` points to `head`, old `tail->next` points to `newNode`, and `tail` advances to `newNode`."
  },
  {
    id: 8,
    question: "In the `tail`-pointer representation, how do you insert `newNode` at the HEAD (front) of a non-empty Circular Linked List in O(1)?",
    options: [
      "`newNode->next = tail->next; tail->next = newNode;` (do NOT move `tail`!)",
      "`newNode->next = tail->next; tail->next = newNode; tail = newNode;`",
      "Traverse the entire list to find `head`",
      "`tail = newNode;`"
    ],
    answer: "`newNode->next = tail->next; tail->next = newNode;` (do NOT move `tail`!)",
    explanation: "Because `head` is defined as `tail->next`, making `tail->next = newNode` automatically installs `newNode` as the new `head` while keeping `tail` at the end!"
  },
  {
    id: 9,
    question: "Which operating system scheduling algorithm naturally models a Circular Linked List?",
    options: [
      "Round-Robin CPU Process Scheduling (each process gets a time quantum, then yields to `curr->next`)",
      "Binary Tree Directory Indexing",
      "Shortest Remaining Stack First",
      "Contiguous Page Swapping"
    ],
    answer: "Round-Robin CPU Process Scheduling (each process gets a time quantum, then yields to `curr->next`)",
    explanation: "Round-Robin cycles endlessly across ready processes in fixed time slices, removing tasks only when `remainingTime == 0`."
  },
  {
    id: 10,
    question: "In a Round-Robin scheduler using a Circular Linked List, when a process finishes (`remainingMs == 0`), how do you remove it if it is the ONLY process left (`curr == prev`)?",
    options: [
      "`free(curr); *tailRef = NULL;`",
      "`prev->next = curr->next; free(curr);`",
      "`curr->next = NULL;`",
      "Keep it in the ring with `0ms`"
    ],
    answer: "`free(curr); *tailRef = NULL;`",
    explanation: "When `curr == prev`, `curr->next == curr`, so skipping `prev->next = curr->next` would leave `tail` pointing to freed memory! You must set `*tailRef = NULL`."
  },
  {
    id: 11,
    question: "When removing a finished process `curr` from a multi-node circular list (`curr != prev`), what extra check is needed if `curr == *tailRef`?",
    options: [
      "Update `*tailRef = prev;` before freeing `curr`, otherwise `*tailRef` becomes a dangling pointer",
      "Set `*tailRef = NULL;`",
      "Set `prev->next = NULL;`",
      "No extra check is needed"
    ],
    answer: "Update `*tailRef = prev;` before freeing `curr`, otherwise `*tailRef` becomes a dangling pointer",
    explanation: "If the deleted node happened to be the `tail` node, `prev` becomes the new `tail` (`prev->next` already points to `head`)."
  },
  {
    id: 12,
    question: "What does 'break-loop mechanics' mean when cleaning up a Circular Linked List?",
    options: [
      "Setting `tail->next = NULL;` (after saving `head = tail->next`) to turn the circular list into a standard linear list before freeing nodes",
      "Using `break;` inside a `for` loop without freeing memory",
      "Calling `free(tail)` first while `tail->next` still points to `head`",
      "Splitting the list into two smaller circular lists"
    ],
    answer: "Setting `tail->next = NULL;` (after saving `head = tail->next`) to turn the circular list into a standard linear list before freeing nodes",
    explanation: "Breaking the circle (`tail->next = NULL`) ensures a standard `while (curr != NULL)` cleanup loop terminates safely after freeing every node once."
  },
  {
    id: 13,
    question: "What is the time complexity of deleting the HEAD node (`tail->next`) in a Circular Singly Linked List that tracks `tail`?",
    options: [
      "O(1) — save `head = tail->next`, set `tail->next = head->next`, and `free(head)`",
      "O(N) — must traverse the entire ring",
      "O(log N)",
      "O(N^2)"
    ],
    answer: "O(1) — save `head = tail->next`, set `tail->next = head->next`, and `free(head)`",
    explanation: "(With the 1-node edge case `if (head == tail) { free(head); tail = NULL; }`.) No traversal is needed!"
  },
  {
    id: 14,
    question: "What is the time complexity of deleting the TAIL node itself in a Circular SINGLY Linked List?",
    options: [
      "O(N) — because you need the node BEFORE `tail`, which requires walking around the ring from `head`",
      "O(1)",
      "O(log N)",
      "O(1) if `head` is stored instead"
    ],
    answer: "O(N) — because you need the node BEFORE `tail`, which requires walking around the ring from `head`",
    explanation: "A Circular Singly Linked List still only has forward links; to get `O(1)` tail deletion, you need a Circular DOUBLY Linked List (`tail->prev`)."
  },
  {
    id: 15,
    question: "In a Circular DOUBLY Linked List, what do `head->prev` and `tail->next` point to?",
    options: [
      "`head->prev == tail` and `tail->next == head`",
      "Both point to `NULL`",
      "`head->prev == NULL` and `tail->next == head`",
      "`head->prev == head` and `tail->next == NULL`"
    ],
    answer: "`head->prev == tail` and `tail->next == head`",
    explanation: "A Circular Doubly Linked List wraps around in BOTH directions, making `head` and `tail` completely symmetric!"
  },
  {
    id: 16,
    question: "Suppose a Circular Linked List has 4 nodes `[A -> B -> C -> D -> (back to A)]`. If you split it into two equal circular halves, what pointers change?",
    options: [
      "`B->next = A` (first half) and `D->next = C` (second half)",
      "`B->next = NULL` and `D->next = NULL`",
      "`A->next = C` and `B->next = D`",
      "Only `D->next = B`"
    ],
    answer: "`B->next = A` (first half) and `D->next = C` (second half)",
    explanation: "Using Floyd's fast/slow pointers, you find the midpoint `B` and tail `D`, then close each half back onto its own start!"
  },
  {
    id: 17,
    question: "How is the classic Josephus Problem (people standing in a circle, every K-th person eliminated) cleanly simulated?",
    options: [
      "Using a Circular Linked List where you advance `K - 1` steps and unlink/free the K-th node until 1 node remains (`curr->next == curr`)",
      "Using a Stack with LIFO pops",
      "Using Binary Search",
      "Using a non-circular Singly Linked List without wrapping"
    ],
    answer: "Using a Circular Linked List where you advance `K - 1` steps and unlink/free the K-th node until 1 node remains (`curr->next == curr`)",
    explanation: "Circular Linked Lists naturally handle wrapping around the remaining survivors without index modulo shifts."
  },
  {
    id: 18,
    question: "How do you merge two Circular Linked Lists with tail pointers `tail1` and `tail2` in O(1) time?",
    options: [
      "Save `head1 = tail1->next`; set `tail1->next = tail2->next; tail2->next = head1;` and return `tail2` as the new tail",
      "Traverse both lists completely in O(N + M) time",
      "Set `tail1->next = NULL;` and `tail2->next = NULL;`",
      "Swap `tail1->data` and `tail2->data`"
    ],
    answer: "Save `head1 = tail1->next`; set `tail1->next = tail2->next; tail2->next = head1;` and return `tail2` as the new tail",
    explanation: "Concatenating two circular lists takes just 3 pointer assignments in O(1) time when both `tail` pointers are known!"
  },
  {
    id: 19,
    question: "Which real-world use case is a natural fit for a Circular Linked List?",
    options: [
      "Multiplayer turn-taking loops, audio ring buffers, and OS Round-Robin task queues",
      "Evaluating arithmetic precedence with LIFO operators",
      "Storing static 2D matrices",
      "Sorting strings lexicographically"
    ],
    answer: "Multiplayer turn-taking loops, audio ring buffers, and OS Round-Robin task queues",
    explanation: "Any repeating cyclic turn order where control wraps smoothly from the last item back to the first benefits from circular linking."
  },
  {
    id: 20,
    question: "If you write `free(curr)` inside a Circular Linked List loop WITHOUT first breaking `tail->next = NULL` (or tracking `tail`), what bug occurs?",
    options: [
      "The loop either never stops or accesses freed memory (`curr != head` reads freed `head`), causing Use-After-Free / Double-Free crashes",
      "Nothing—`free()` automatically breaks circular links",
      "Only `tail` gets freed",
      "It turns the list into a Doubly Linked List"
    ],
    answer: "The loop either never stops or accesses freed memory (`curr != head` reads freed `head`), causing Use-After-Free / Double-Free crashes",
    explanation: "Breaking the circle (`tail->next = NULL`) before freeing turns cleanup into a safe, finite linear walk."
  },
  {
    id: 21,
    question: "What is the auxiliary space complexity of Round-Robin simulation on an existing Circular Linked List of `N` processes?",
    options: [
      "O(1) extra space (only `prev` and `curr` pointers plus `slice` integer)",
      "O(N) extra space per round",
      "O(N^2) space",
      "O(log N) recursion stack"
    ],
    answer: "O(1) extra space (only `prev` and `curr` pointers plus `slice` integer)",
    explanation: "Simulation walks the existing nodes in-place using constant pointer variables."
  },
  {
    id: 22,
    question: "How can you check in O(N) time whether ANY given `Node *head` is a true Circular Linked List (where the last node loops all the way back to `head`) vs a normal `NULL`-terminated list?",
    options: [
      "Walk `curr = head->next` while `curr != NULL && curr != head`; if `curr == head`, it is circular!",
      "Check if `head->next == NULL`",
      "Check if `head->data == 0`",
      "Count only the first 2 nodes"
    ],
    answer: "Walk `curr = head->next` while `curr != NULL && curr != head`; if `curr == head`, it is circular!",
    explanation: "(Note: if the list could have a cycle NOT starting at `head`, use Floyd's algorithm instead so you don't loop forever!)"
  },
  {
    id: 23,
    question: "In `insertTailCircular(&tail, pid, burst)`, why must the `if (*tailRef == NULL)` branch set `newProc->next = newProc;`?",
    options: [
      "To preserve the circular invariant (`tail->next == head`) right from the very first node",
      "Because `NULL` is illegal in structs",
      "To allocate twice as much memory",
      "So `printCircular` skips the first node"
    ],
    answer: "To preserve the circular invariant (`tail->next == head`) right from the very first node",
    explanation: "If the first node left `next = NULL`, subsequent circular inserts (`newProc->next = (*tailRef)->next`) would inject `NULL` into the ring!"
  },
  {
    id: 24,
    question: "What is the difference between a Circular Linked List and a Linked List with a Cycle bug?",
    options: [
      "In a Circular Linked List, `tail->next` intentionally points to `head` and traversal uses `do-while (curr != head)`; a cycle bug usually loops into an interior node and breaks `while (curr != NULL)`",
      "There is no structural difference—circular lists always crash",
      "A cycle bug uses `prev` pointers",
      "A circular list uses `NULL` at `tail->next`"
    ],
    answer: "In a Circular Linked List, `tail->next` intentionally points to `head` and traversal uses `do-while (curr != head)`; a cycle bug usually loops into an interior node and breaks `while (curr != NULL)`",
    explanation: "Circularity is a deliberate design when paired with `tail` tracking and `do-while` / break-loop protocols."
  },
  {
    id: 25,
    question: "After calling `breakAndFreeCircular(&tail)`, what should `tail` equal?",
    options: [
      "`NULL`",
      "The former `head` address",
      "`tail->next`",
      "Unchanged garbage address"
    ],
    answer: "`NULL`",
    explanation: "Setting `*tailRef = NULL;` ensures no dangling pointer remains after all nodes are freed."
  }
];

export default questions;
