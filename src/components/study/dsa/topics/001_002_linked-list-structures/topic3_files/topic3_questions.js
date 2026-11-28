const questions = [
  {
    id: 1,
    question: "How many pointer fields does each node in a standard Doubly Linked List contain?",
    options: [
      "Two pointers: `prev` (pointing backward) and `next` (pointing forward)",
      "One pointer: `next` only",
      "Three pointers: `head`, `tail`, and `mid`",
      "Zero pointers—nodes are stored in contiguous arrays"
    ],
    answer: "Two pointers: `prev` (pointing backward) and `next` (pointing forward)",
    explanation: "Each DLL node holds `struct DNode *prev` and `struct DNode *next`, enabling bidirectional navigation."
  },
  {
    id: 2,
    question: "On a 64-bit GCC system, what is `sizeof(struct DNode)` for `{ int data; struct DNode *prev; struct DNode *next; }`?",
    options: [
      "24 bytes (4B `int` + 4B padding + 8B `prev` + 8B `next`)",
      "16 bytes",
      "20 bytes",
      "12 bytes"
    ],
    answer: "24 bytes (4B `int` + 4B padding + 8B `prev` + 8B `next`)",
    explanation: "`int data` (4B) needs 4B padding so `prev` (8B) aligns at offset +8, followed by `next` (8B) at offset +16, totaling 24 bytes."
  },
  {
    id: 3,
    question: "What is the biggest asymptotic advantage of a Doubly Linked List over a Singly Linked List when you are ALREADY given a pointer `del` to the node to remove?",
    options: [
      "Deleting `del` takes O(1) time because `del->prev` gives instant access to its predecessor",
      "Searching for a value becomes O(1)",
      "It uses 50% less RAM per node",
      "It enables O(1) random access by index `i`"
    ],
    answer: "Deleting `del` takes O(1) time because `del->prev` gives instant access to its predecessor",
    explanation: "In a Singly Linked List you must walk from `head` (O(N)) to find the predecessor; in a DLL, `del->prev` is right inside the node!"
  },
  {
    id: 4,
    question: "In a healthy, non-empty Doubly Linked List, what must `head->prev` and `tail->next` equal?",
    options: [
      "Both must equal `NULL`",
      "`head->prev == tail` and `tail->next == head`",
      "`head->prev == head` and `tail->next == NULL`",
      "Both remain uninitialized garbage"
    ],
    answer: "Both must equal `NULL`",
    explanation: "In a non-circular DLL, `NULL` marks both ends so forward traversal stops at `tail->next == NULL` and backward traversal stops at `head->prev == NULL`."
  },
  {
    id: 5,
    question: "When deleting `del` in a DLL, why MUST you guard `if (del->prev != NULL)` and `if (del->next != NULL)` before updating neighbor pointers?",
    options: [
      "If `del` is the `head`, `del->prev` is `NULL`; if `del` is the `tail`, `del->next` is `NULL`—accessing `NULL->next` or `NULL->prev` causes `SIGSEGV`",
      "C syntax forbids two pointer arrows in one line without `if`",
      "To skip freeing `del` when it is at the ends",
      "To convert the DLL into a circular list"
    ],
    answer: "If `del` is the `head`, `del->prev` is `NULL`; if `del` is the `tail`, `del->next` is `NULL`—accessing `NULL->next` or `NULL->prev` causes `SIGSEGV`",
    explanation: "Edge nodes (`head` and `tail`) have a `NULL` neighbor on one side, so always check for `NULL` before dereferencing."
  },
  {
    id: 6,
    question: "When inserting `newNode` at the HEAD of a non-empty Doubly Linked List, which 3 pointer updates are required?",
    options: [
      "`newNode->next = head; head->prev = newNode; head = newNode;` (with `newNode->prev = NULL`)",
      "`head = newNode; head->prev = newNode;`",
      "`newNode->prev = head; head = newNode;`",
      "`head->next = newNode; newNode->prev = NULL;`"
    ],
    answer: "`newNode->next = head; head->prev = newNode; head = newNode;` (with `newNode->prev = NULL`)",
    explanation: "Notice that if `head` was `NULL` (empty list), you must skip `head->prev = newNode` and also set `tail = newNode`!"
  },
  {
    id: 7,
    question: "What is the Symmetry Invariant for every adjacent pair of nodes `A` and `B` in a Doubly Linked List?",
    options: [
      "`A->next == B` if and only if `B->prev == A`",
      "`A->data < B->data`",
      "`A->prev == B->next`",
      "`A == B`"
    ],
    answer: "`A->next == B` if and only if `B->prev == A`",
    explanation: "Every forward link must have a matching backward link. Updating only `next` without `prev` leaves the list half-broken when traversing backward."
  },
  {
    id: 8,
    question: "If you swap two adjacent nodes `A` and `B` (where `B = A->next`) by relinking pointers instead of copying data, how many nodes' pointers may change (including outer neighbors)?",
    options: [
      "Up to 4 nodes: `before->next`, `B->prev`, `B->next`, `A->prev`, `A->next`, and `after->prev` (6 pointer assignments total)",
      "Only 1 pointer (`A->next = B`)",
      "All `N` nodes in the list must be relinked",
      "0 pointers—only `head` changes"
    ],
    answer: "Up to 4 nodes: `before->next`, `B->prev`, `B->next`, `A->prev`, `A->next`, and `after->prev` (6 pointer assignments total)",
    explanation: "Swapping nodes in-place preserves memory addresses (important if external handles point to nodes) by rewiring `before`, `A`, `B`, and `after`."
  },
  {
    id: 9,
    question: "When is swapping node pointers better than simply swapping `A->data` and `B->data`?",
    options: [
      "When nodes store large structs (many fields) or when external pointers (e.g. an LRU cache hash map) reference specific node addresses",
      "Swapping pointers is always simpler to write",
      "Data swapping takes O(N) time even for two integers",
      "C does not allow assigning `int` values between structs"
    ],
    answer: "When nodes store large structs (many fields) or when external pointers (e.g. an LRU cache hash map) reference specific node addresses",
    explanation: "In an LRU Cache, a hash table stores direct pointers to DLL nodes—moving data would break the hash map's node mapping!"
  },
  {
    id: 10,
    question: "Which famous real-world data structure pairs a Hash Map with a Doubly Linked List for O(1) `get` and `put`?",
    options: [
      "An LRU (Least Recently Used) Cache",
      "Binary Heap Priority Queue",
      "Trie Prefix Tree",
      "Disjoint Set Union"
    ],
    answer: "An LRU (Least Recently Used) Cache",
    explanation: "The hash map jumps to a node in O(1), and the DLL unlinks it from the middle (`O(1)`) and moves it to the front (`O(1)`)."
  },
  {
    id: 11,
    question: "What happens if you delete the ONLY node in a Doubly Linked List (`head == tail == del`)?",
    options: [
      "Both `head` and `tail` must become `NULL` before `free(del)`",
      "Only `head` becomes `NULL`, `tail` stays pointing to `del`",
      "It causes a compile error",
      "`del->next` becomes `del`"
    ],
    answer: "Both `head` and `tail` must become `NULL` before `free(del)`",
    explanation: "If `tail` isn't reset to `NULL`, `tail` becomes a dangling pointer to freed heap memory!"
  },
  {
    id: 12,
    question: "What is the time complexity of deleting the LAST node (`tail`) in a Doubly Linked List that tracks `tail`?",
    options: [
      "O(1) — set `temp = tail; tail = tail->prev; if (tail) tail->next = NULL; else head = NULL; free(temp);`",
      "O(N) — must traverse from `head`",
      "O(log N)",
      "O(N^2)"
    ],
    answer: "O(1) — set `temp = tail; tail = tail->prev; if (tail) tail->next = NULL; else head = NULL; free(temp);`",
    explanation: "Unlike a Singly Linked List (which takes O(N) to find the second-to-last node), a DLL reads `tail->prev` directly in O(1)!"
  },
  {
    id: 13,
    question: "How do you reverse an entire Doubly Linked List in-place in O(N) time and O(1) space?",
    options: [
      "Walk through every node and swap its `curr->prev` and `curr->next` pointers (advancing via `curr = curr->prev`, which was the old `next`), then swap `head` and `tail`",
      "Copy all elements into an array and rebuild",
      "Only swap `head` and `tail` pointers",
      "Use 5 nested loops"
    ],
    answer: "Walk through every node and swap its `curr->prev` and `curr->next` pointers (advancing via `curr = curr->prev`, which was the old `next`), then swap `head` and `tail`",
    explanation: "Swapping `prev` and `next` on every node flips both directions cleanly in a single pass!"
  },
  {
    id: 14,
    question: "What bug occurs when inserting `newNode` after `prevNode` if you execute `prevNode->next = newNode;` BEFORE `newNode->next = prevNode->next;`?",
    options: [
      "`newNode->next` gets set to `newNode` itself, losing the entire rest of the list!",
      "Nothing—both orders work",
      "Only `prevNode->prev` is lost",
      "It inserts before `prevNode` instead of after"
    ],
    answer: "`newNode->next` gets set to `newNode` itself, losing the entire rest of the list!",
    explanation: "Overwriting `prevNode->next` first destroys the reference to the downstream node."
  },
  {
    id: 15,
    question: "During `freeDoublyList(&head, &tail)`, why should you ALSO set `*tailRef = NULL;` in addition to `*headRef = NULL;`?",
    options: [
      "So `tail` does not remain a dangling pointer pointing to already-freed heap memory",
      "Because `free()` only frees `head` otherwise",
      "Because C requires `tail` to be freed separately with `free(tail)`",
      "To prevent struct padding"
    ],
    answer: "So `tail` does not remain a dangling pointer pointing to already-freed heap memory",
    explanation: "Every boundary pointer (`head` and `tail`) must be neutralized to `NULL` after all nodes are freed."
  },
  {
    id: 16,
    question: "Which common UI/application feature directly maps to a Doubly Linked List?",
    options: [
      "Browser Back / Forward navigation history and Undo / Redo editor chains",
      "Static lookup table of ASCII codes",
      "Matrix transpose",
      "Recursive Fibonacci memoization table"
    ],
    answer: "Browser Back / Forward navigation history and Undo / Redo editor chains",
    explanation: "Moving backward (`curr = curr->prev`) and forward (`curr = curr->next`) in O(1) directly models Back/Forward and Undo/Redo."
  },
  {
    id: 17,
    question: "What is an XOR Linked List used for in memory-constrained C systems?",
    options: [
      "It stores `prev ^ next` in a single pointer field (`npx`), cutting pointer overhead per node in half while still allowing bidirectional traversal",
      "It encrypts node data against hackers",
      "It sorts nodes automatically using XOR",
      "It allows O(1) random indexing"
    ],
    answer: "It stores `prev ^ next` in a single pointer field (`npx`), cutting pointer overhead per node in half while still allowing bidirectional traversal",
    explanation: "Using `uintptr_t`, `next = prev ^ curr->npx`, saving 8 bytes per node on 64-bit systems (though less cache/GC friendly)."
  },
  {
    id: 18,
    question: "In `swapAdjacent(&head, &tail, a)` where `a` is the `head` node and `b = a->next`, what happens if you forget `else *headRef = b;` when `a->prev == NULL`?",
    options: [
      "`head` still points to `a` (which is now the 2nd node), so `b` becomes unreachable from `head`!",
      "`head` updates automatically when `b->prev` becomes `NULL`",
      "The list becomes circular",
      "Nothing—`a` remains the first node"
    ],
    answer: "`head` still points to `a` (which is now the 2nd node), so `b` becomes unreachable from `head`!",
    explanation: "Whenever the swapped pair includes the first node (`before == NULL`), `head` must be updated to `b` (and similarly `tail` to `a` if `after == NULL`)."
  },
  {
    id: 19,
    question: "What is the time complexity to search for a key `X` in an unsorted Doubly Linked List of `N` nodes?",
    options: [
      "O(N)",
      "O(1)",
      "O(log N)",
      "O(N^2)"
    ],
    answer: "O(N)",
    explanation: "Even with bidirectional links, an unsorted DLL still requires scanning nodes sequentially until `X` is found."
  },
  {
    id: 20,
    question: "How can a Sentinel (Dummy Head + Dummy Tail) Doubly Linked List simplify insertion and deletion?",
    options: [
      "Every real node sits between two non-NULL nodes, eliminating all `head == NULL`, `tail == NULL`, and `NULL` neighbor checks!",
      "It eliminates `malloc()` calls completely",
      "It reduces node size to 8 bytes",
      "It makes search O(1)"
    ],
    answer: "Every real node sits between two non-NULL nodes, eliminating all `head == NULL`, `tail == NULL`, and `NULL` neighbor checks!",
    explanation: "With dummy `head` and `tail` sentinels (`head->next = tail; tail->prev = head;`), `del->prev` and `del->next` are NEVER `NULL` for any real node!"
  },
  {
    id: 21,
    question: "If you traverse a DLL backward starting from `tail`, what loop condition terminates cleanly at the beginning?",
    options: [
      "`while (curr != NULL) { ... curr = curr->prev; }`",
      "`while (curr->prev != NULL) { ... curr = curr->prev; }` (skips `head`!)",
      "`while (curr != tail)`",
      "`while (curr->next != NULL)`"
    ],
    answer: "`while (curr != NULL) { ... curr = curr->prev; }`",
    explanation: "Checking `curr != NULL` ensures `head` itself (whose `prev` is `NULL`) is processed before the loop ends."
  },
  {
    id: 22,
    question: "In a DLL, if `curr->next != NULL` and `curr->next->prev != curr`, what does that indicate?",
    options: [
      "A broken Symmetry Invariant (pointer corruption during an insert/delete/swap operation)",
      "A normal circular linked list",
      "An empty list",
      "Proper struct alignment"
    ],
    answer: "A broken Symmetry Invariant (pointer corruption during an insert/delete/swap operation)",
    explanation: "Writing a quick `verifyInvariant(head)` check in lab exercises is a great way to catch missing `prev` updates immediately."
  },
  {
    id: 23,
    question: "What happens if `freeDoublyList` deletes nodes from `tail` backward (`curr = curr->prev`) vs from `head` forward (`curr = curr->next`)?",
    options: [
      "Both free all `N` nodes safely in O(N) time as long as the next/prev pointer is saved in `temp` before calling `free(curr)`",
      "Freeing backward leaks `head`",
      "Freeing forward leaks `tail`",
      "`free()` can only free nodes in ascending address order"
    ],
    answer: "Both free all `N` nodes safely in O(N) time as long as the next/prev pointer is saved in `temp` before calling `free(curr)`",
    explanation: "Either direction visits and frees every node exactly once; just save `temp` before calling `free(curr)` and neutralize both `head` and `tail`."
  },
  {
    id: 24,
    question: "If you need a Double-Ended Queue (Deque) with O(1) `push_front`, `push_back`, `pop_front`, and `pop_back` and unbounded dynamic size, which list type fits best?",
    options: [
      "Doubly Linked List with `head` and `tail` pointers",
      "Singly Linked List with only `head`",
      "Singly Linked List with `head` and `tail` (cannot do O(1) `pop_back`!)",
      "Static fixed-size array"
    ],
    answer: "Doubly Linked List with `head` and `tail` pointers",
    explanation: "A Singly Linked List cannot do O(1) `pop_back`, whereas a DLL with `head` and `tail` does all four deque operations in O(1)!"
  },
  {
    id: 25,
    question: "What is the main memory trade-off when choosing a Doubly Linked List over a Singly Linked List?",
    options: [
      "DLL uses 1 extra pointer per node (8 bytes on 64-bit) in exchange for backward traversal and O(1) deletion/pop_back",
      "DLL uses less memory per node",
      "DLL cannot be allocated with `malloc()`",
      "DLL does not support storing integers"
    ],
    answer: "DLL uses 1 extra pointer per node (8 bytes on 64-bit) in exchange for backward traversal and O(1) deletion/pop_back",
    explanation: "That 8-byte per-node pointer cost is the exact trade-off between Singly and Doubly Linked Lists."
  }
];

export default questions;
