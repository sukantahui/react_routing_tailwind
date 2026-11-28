const questions = [
  {
    id: 1,
    question: "In a Singly Linked List, what is the time complexity of inserting a new node at the Head (beginning)?",
    options: [
      "O(1) — only 2 pointer assignments are needed regardless of list length",
      "O(N) — all existing nodes must shift one step right",
      "O(log N) — binary search locates the head",
      "O(N^2) — every node's address changes"
    ],
    answer: "O(1) — only 2 pointer assignments are needed regardless of list length",
    explanation: "Inserting at head only sets `newNode->next = head` and `head = newNode`. No shifting or traversal is required."
  },
  {
    id: 2,
    question: "When inserting `newNode` at the head of a non-empty Singly Linked List, what happens if you write `head = newNode; newNode->next = head;` in the WRONG order?",
    options: [
      "The original list is orphaned (memory leak), and `newNode->next` points to itself creating a 1-node infinite loop",
      "The compiler automatically swaps the two statements",
      "The node is inserted at the tail instead",
      "It works identically to `newNode->next = head; head = newNode;`"
    ],
    answer: "The original list is orphaned (memory leak), and `newNode->next` points to itself creating a 1-node infinite loop",
    explanation: "Overwriting `head` first destroys your only reference to the old first node, and `newNode->next = head` then points `newNode` to itself!"
  },
  {
    id: 3,
    question: "Why does deleting a middle node in a Singly Linked List require stopping at the node BEFORE the target (`prev` or `curr->next->data == key`)?",
    options: [
      "Because Singly Linked List nodes have no `prev` pointer, so once you stand on the target node you cannot step backward to relink its predecessor",
      "Because `free()` cannot be called on a middle node directly",
      "Because `curr->data` is write-protected",
      "To reduce space complexity from O(N) to O(1)"
    ],
    answer: "Because Singly Linked List nodes have no `prev` pointer, so once you stand on the target node you cannot step backward to relink its predecessor",
    explanation: "Links in a singly linked list only go forward. To change `predecessor->next = target->next`, you must still have a pointer to `predecessor`."
  },
  {
    id: 4,
    question: "In iterative 3-pointer list reversal (`prev`, `curr`, `next`), why MUST `next = curr->next;` be the very first line inside the `while (curr != NULL)` loop?",
    options: [
      "Because the next line `curr->next = prev;` overwrites `curr->next`, so without saving `next` first you lose access to the rest of the list",
      "Because `prev` is always `NULL` on every iteration",
      "Because `curr` is freed at the end of the loop",
      "Because C requires reading pointers before writing integers"
    ],
    answer: "Because the next line `curr->next = prev;` overwrites `curr->next`, so without saving `next` first you lose access to the rest of the list",
    explanation: "Flipping `curr->next = prev` breaks the forward bridge. Saving `next = curr->next` beforehand keeps a handle on the remaining unreversed nodes."
  },
  {
    id: 5,
    question: "At the end of iterative 3-pointer reversal (`while (curr != NULL)`), which pointer holds the new `head` of the reversed list?",
    options: [
      "`prev`",
      "`curr` (which is now `NULL`)",
      "`next` (which is now `NULL`)",
      "The original `head` pointer (now pointing to the tail)"
    ],
    answer: "`prev`",
    explanation: "When the loop terminates, `curr` and `next` have stepped off the end onto `NULL`, while `prev` sits cleanly on the former tail—the new head!"
  },
  {
    id: 6,
    question: "What are the time and auxiliary space complexities of iterative 3-pointer Singly Linked List reversal?",
    options: [
      "O(N) time and O(1) auxiliary space",
      "O(N) time and O(N) auxiliary space",
      "O(N log N) time and O(1) auxiliary space",
      "O(1) time and O(1) auxiliary space"
    ],
    answer: "O(N) time and O(1) auxiliary space",
    explanation: "It visits each of the N nodes once (`O(N)` time) and only uses three fixed pointer variables `prev`, `curr`, `next` (`O(1)` extra space)."
  },
  {
    id: 7,
    question: "Compare iterative 3-pointer reversal vs recursive reversal on a list with 1,000,000 nodes:",
    options: [
      "Iterative uses O(1) stack space and is safe; recursive uses O(N) call stack frames and risks Stack Overflow",
      "Recursive uses O(1) stack space while iterative uses O(N)",
      "Recursive is O(1) time while iterative is O(N)",
      "Both use identical stack memory"
    ],
    answer: "Iterative uses O(1) stack space and is safe; recursive uses O(N) call stack frames and risks Stack Overflow",
    explanation: "A million recursive stack frames typically exceed the default 1–8 MB OS thread stack limit, crashing with a stack overflow."
  },
  {
    id: 8,
    question: "What happens if you append at the tail using `while (curr->next != NULL) curr = curr->next;` WITHOUT first checking `if (*headRef == NULL)`?",
    options: [
      "Segmentation fault (`SIGSEGV`) on an empty list because `curr` is `NULL` and `curr->next` dereferences address `0x0`",
      "It safely creates the first node",
      "It inserts at the head instead",
      "The `while` condition evaluates to false and exits cleanly"
    ],
    answer: "Segmentation fault (`SIGSEGV`) on an empty list because `curr` is `NULL` and `curr->next` dereferences address `0x0`",
    explanation: "Always handle the empty-list case (`*headRef == NULL`) before accessing `curr->next`."
  },
  {
    id: 9,
    question: "How can tail insertion in a Singly Linked List be optimized from O(N) down to O(1)?",
    options: [
      "By maintaining an explicit `Node *tail` pointer alongside `head` that always points to the last node",
      "By converting `int data` into a `double`",
      "By skipping `malloc()` for tail nodes",
      "By reversing the list before every insertion"
    ],
    answer: "By maintaining an explicit `Node *tail` pointer alongside `head` that always points to the last node",
    explanation: "With a `tail` pointer, appending simply sets `tail->next = newNode; tail = newNode;` in O(1) time—though you must update `tail` on empty insert and tail delete!"
  },
  {
    id: 10,
    question: "During middle node deletion (`Node *toDelete = curr->next; curr->next = toDelete->next;`), why is calling `free(toDelete)` essential?",
    options: [
      "Unlinking only hides the node from traversal; without `free(toDelete)`, those heap bytes remain leaked until the process exits",
      "`free()` automatically updates `curr->next`",
      "Without `free()`, `curr->data` gets erased",
      "The C compiler refuses to compile unlinked nodes without `free()`"
    ],
    answer: "Unlinking only hides the node from traversal; without `free(toDelete)`, those heap bytes remain leaked until the process exits",
    explanation: "Rewiring `curr->next` removes the node from the chain, but the OS heap allocator only reclaims its memory when `free(toDelete)` is called."
  },
  {
    id: 11,
    question: "Which initial values are required before starting the 3-pointer reversal loop?",
    options: [
      "`prev = NULL; curr = head; next = NULL;`",
      "`prev = head; curr = head->next; next = NULL;`",
      "`prev = NULL; curr = NULL; next = head;`",
      "`prev = tail; curr = head; next = tail;`"
    ],
    answer: "`prev = NULL; curr = head; next = NULL;`",
    explanation: "The original `head` will become the new `tail`, so its reversed `next` must become `NULL`—which is why `prev` starts at `NULL`!"
  },
  {
    id: 12,
    question: "What happens if you run 3-pointer reversal on an empty list (`head == NULL`) or a 1-node list (`[10] -> NULL`)?",
    options: [
      "It handles both gracefully: empty stays `NULL`, and 1-node stays `[10] -> NULL`",
      "It crashes with `SIGSEGV` on a 1-node list",
      "It creates a cycle on an empty list",
      "It deletes the single node"
    ],
    answer: "It handles both gracefully: empty stays `NULL`, and 1-node stays `[10] -> NULL`",
    explanation: "When `head == NULL`, the loop never runs and `prev` is `NULL`. For 1 node, `next = NULL`, `curr->next = NULL`, `prev = head`, `curr = NULL`, returning the same single node."
  },
  {
    id: 13,
    question: "In `deleteByValue(&head, key)`, why must deleting the HEAD node be handled as a special case?",
    options: [
      "Because the head node has no predecessor node, so `*headRef` itself must be updated to `curr->next`",
      "Because the head node lives on the stack instead of the heap",
      "Because `head->data` cannot be compared in a `while` loop",
      "Because `free()` cannot free the first node"
    ],
    answer: "Because the head node has no predecessor node, so `*headRef` itself must be updated to `curr->next`",
    explanation: "Middle deletions modify `prevNode->next`, whereas deleting the first node modifies the external `head` pointer itself."
  },
  {
    id: 14,
    question: "What is the 'Dummy Sentinel Head' trick used for in Singly Linked List insertion/deletion?",
    options: [
      "Placing a temporary stack node `Node dummy = {0, head};` before `head` so head deletion/insertion uses the exact same `prev->next` logic as middle nodes",
      "Making every node store two copies of `data`",
      "Eliminating the need for `NULL` at the tail",
      "Speeding up linear search from O(N) to O(1)"
    ],
    answer: "Placing a temporary stack node `Node dummy = {0, head};` before `head` so head deletion/insertion uses the exact same `prev->next` logic as middle nodes",
    explanation: "With a dummy node, even the real `head` has a predecessor (`&dummy`), eliminating special-case `if` branches for `head`!"
  },
  {
    id: 15,
    question: "If a list has 4 nodes `[10 -> 20 -> 30 -> 40 -> NULL]` and you want to insert `25` at 1-based position `3` (between 20 and 30), how many steps from `head` must `curr` advance?",
    options: [
      "1 step (from `10` to `20`, i.e., `position - 2` moves so `curr` lands at node 2)",
      "3 steps (to `40`)",
      "0 steps (stays at `10`)",
      "4 steps (to `NULL`)"
    ],
    answer: "1 step (from `10` to `20`, i.e., `position - 2` moves so `curr` lands at node 2)",
    explanation: "To insert at 1-based position `pos = 3`, `curr` starts at pos 1 (`10`) and advances `pos - 2 = 1` time to reach pos 2 (`20`), then splices `25` after `20`."
  },
  {
    id: 16,
    question: "What is the time complexity to delete the LAST node (tail) of a Singly Linked List, even if you keep a `tail` pointer?",
    options: [
      "O(N) — because you must walk from `head` to find the second-to-last node so its `next` can be set to `NULL`",
      "O(1) — `tail` alone is enough to update the previous node",
      "O(log N)",
      "O(N^2)"
    ],
    answer: "O(N) — because you must walk from `head` to find the second-to-last node so its `next` can be set to `NULL`",
    explanation: "In a Singly Linked List, `tail` has no `prev` pointer. Only a Doubly Linked List achieves `O(1)` tail deletion!"
  },
  {
    id: 17,
    question: "In the 4-line loop body of 3-pointer reversal, what happens if you swap lines 3 and 4 (`curr = next; prev = curr;`)?",
    options: [
      "`prev` gets assigned `next` instead of the old `curr`, breaking the chain and skipping nodes",
      "The list is reversed twice back to normal",
      "Nothing changes—lines 3 and 4 are independent",
      "It reverses only the even-indexed nodes"
    ],
    answer: "`prev` gets assigned `next` instead of the old `curr`, breaking the chain and skipping nodes",
    explanation: "`prev = curr` MUST execute BEFORE `curr = next`, otherwise `curr` is overwritten before `prev` captures it!"
  },
  {
    id: 18,
    question: "Why does the loop condition `while (curr->next != NULL && curr->next->data != target)` use `&&` with `curr->next != NULL` on the LEFT?",
    options: [
      "Short-circuit evaluation stops before evaluating `curr->next->data` when `curr->next` is `NULL`, preventing a `SIGSEGV` crash",
      "C requires `!= NULL` to always appear on the left of `&&`",
      "It makes the loop run twice as fast",
      "It automatically frees `curr->next` when false"
    ],
    answer: "Short-circuit evaluation stops before evaluating `curr->next->data` when `curr->next` is `NULL`, preventing a `SIGSEGV` crash",
    explanation: "In C, `&&` evaluates left-to-right and stops immediately if the left operand is false, guarding against dereferencing `NULL->data`."
  },
  {
    id: 19,
    question: "Suppose `Node *a = head; Node *b = head->next;` and `head` is `10 -> 20 -> 30 -> NULL`. After `a->next = b->next; free(b);`, what does the list look like?",
    options: [
      "`10 -> 30 -> NULL`",
      "`20 -> 30 -> NULL`",
      "`10 -> 20 -> NULL`",
      "`10 -> NULL`"
    ],
    answer: "`10 -> 30 -> NULL`",
    explanation: "`a` (`10`) now points directly to `b->next` (`30`), bypassing `b` (`20`), and node `20` is freed."
  },
  {
    id: 20,
    question: "Which real-world C/OS structure behaves most like a Singly Linked List with `head` and `tail` pointers?",
    options: [
      "A FIFO Queue (enqueue at `tail` in O(1), dequeue from `head` in O(1))",
      "Binary search on a sorted phonebook",
      "A 2D image pixel grid",
      "Random-access database column indexing"
    ],
    answer: "A FIFO Queue (enqueue at `tail` in O(1), dequeue from `head` in O(1))",
    explanation: "Because Singly Linked Lists support O(1) `head` removal and O(1) `tail` append (when `tail` is tracked), they are ideal for unbounded FIFO queues."
  },
  {
    id: 21,
    question: "If `deleteByValue` forgets to handle `curr->next == NULL` (target not found) and unconditionally executes `Node *del = curr->next; curr->next = del->next;`, what happens?",
    options: [
      "`del` is `NULL`, so `del->next` dereferences `0x0` and crashes with `SIGSEGV`",
      "The last node gets deleted instead",
      "The list is cleared safely",
      "`free(NULL)` prints an error and continues"
    ],
    answer: "`del` is `NULL`, so `del->next` dereferences `0x0` and crashes with `SIGSEGV`",
    explanation: "Always check `if (curr->next == NULL) return;` after the search loop in case the target value does not exist in the list."
  },
  {
    id: 22,
    question: "What is the time complexity of reversing ONLY the first `K` nodes of an `N`-node Singly Linked List?",
    options: [
      "O(K) time and O(1) space",
      "O(N^2) time and O(N) space",
      "O(1) time and O(K) space",
      "O(N log K) time"
    ],
    answer: "O(K) time and O(1) space",
    explanation: "You run the 3-pointer loop for `K` steps and then connect the original `head` (now tail of the reversed prefix) to the `(K+1)`-th node."
  },
  {
    id: 23,
    question: "Why can't you perform standard Binary Search in O(log N) time on a sorted Singly Linked List?",
    options: [
      "You cannot jump to the middle index `mid` in O(1) time; walking to `mid` takes O(N) steps per probe",
      "Singly Linked Lists cannot hold sorted numbers",
      "`data` fields cannot be compared with `<` or `>`",
      "Pointers cannot be stored inside loops"
    ],
    answer: "You cannot jump to the middle index `mid` in O(1) time; walking to `mid` takes O(N) steps per probe",
    explanation: "Binary Search requires O(1) random access. Without contiguous indexing, finding the midpoint takes linear pointer traversal."
  },
  {
    id: 24,
    question: "After freeing all nodes in `freeList(&head)`, why should we set `*headRef = NULL;`?",
    options: [
      "So `head` does not remain a dangling pointer to freed heap memory, preventing Use-After-Free or Double-Free bugs",
      "Because `free()` fails if `head` is not `NULL`",
      "To compress the stack frame of `main()`",
      "To convert the list into a circular list"
    ],
    answer: "So `head` does not remain a dangling pointer to freed heap memory, preventing Use-After-Free or Double-Free bugs",
    explanation: "Neutralizing `head` back to `NULL` makes `head == NULL` truthfully report an empty list for any code that runs afterward."
  },
  {
    id: 25,
    question: "Which of these operations is O(1) on a standard Singly Linked List (with only `head` pointer)?",
    options: [
      "Inserting a node at the head, or deleting the head node",
      "Inserting a node at the tail",
      "Finding the middle element",
      "Checking if a value exists in the list"
    ],
    answer: "Inserting a node at the head, or deleting the head node",
    explanation: "With only `head`, both head insertion and head deletion touch only the first node in O(1) time; tail/middle/search all require traversal."
  }
];

export default questions;
