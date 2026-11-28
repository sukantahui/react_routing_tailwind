const questions = [
  {
    id: 1,
    question: "What is a Dangling Pointer in C after calling `free(node)`?",
    options: [
      "A pointer that still holds the old heap address of memory that has already been freed",
      "A pointer initialized to `NULL`",
      "A pointer that has never been assigned (`uninitialized`)",
      "A pointer stored inside a struct's `next` field pointing to `head`"
    ],
    answer: "A pointer that still holds the old heap address of memory that has already been freed",
    explanation: "`free(node)` releases the heap block back to the allocator, but leaves the numeric address inside `node` unchanged unless you explicitly set `node = NULL;`."
  },
  {
    id: 2,
    question: "Why doesn't `free(node)` automatically set `node = NULL` in C?",
    options: [
      "`free()` receives the pointer BY VALUE (a copy of the address), so it cannot modify the caller's pointer variable",
      "C pointers are always `const`",
      "Because `NULL` takes 16 bytes",
      "Because `free()` only clears `node->data`"
    ],
    answer: "`free()` receives the pointer BY VALUE (a copy of the address), so it cannot modify the caller's pointer variable",
    explanation: "Just like any C function taking `void *ptr`, `free()` gets a copy of the address; only the caller (or a helper taking `Node **`) can set `node = NULL`."
  },
  {
    id: 3,
    question: "What happens if you call `free(ptr)` twice on the same non-NULL address without resetting `ptr = NULL` in between?",
    options: [
      "Undefined Behavior / Double-Free corruption (often crashing immediately with `SIGABRT: double free detected`)",
      "The second `free(ptr)` safely does nothing",
      "It frees the next node in the list",
      "It doubles the heap capacity"
    ],
    answer: "Undefined Behavior / Double-Free corruption (often crashing immediately with `SIGABRT: double free detected`)",
    explanation: "Calling `free()` twice on the same chunk corrupts the heap allocator's free-list metadata. Setting `ptr = NULL` after the first `free()` prevents this because `free(NULL)` is a safe no-op."
  },
  {
    id: 4,
    question: "What does the C Standard guarantee if you pass `NULL` to `free(NULL)`?",
    options: [
      "It is guaranteed to be a safe no-op (does nothing and never crashes)",
      "It causes a `SIGSEGV` crash",
      "It frees all memory in the program",
      "It returns `-1`"
    ],
    answer: "It is guaranteed to be a safe no-op (does nothing and never crashes)",
    explanation: "ISO C specifies that if `ptr` is a null pointer, `free(ptr)` performs no action—making `free(ptr); ptr = NULL;` completely idempotent."
  },
  {
    id: 5,
    question: "In `while (curr != NULL) { free(curr); curr = curr->next; }`, what exact bug occurs?",
    options: [
      "Use-After-Free (reading `curr->next` from memory that was just freed on the previous line)",
      "Memory Leak of `head`",
      "Stack Overflow",
      "Integer Division by Zero"
    ],
    answer: "Use-After-Free (reading `curr->next` from memory that was just freed on the previous line)",
    explanation: "Always save `Node *next = curr->next;` BEFORE calling `free(curr)`."
  },
  {
    id: 6,
    question: "Why might reading `node->data` right after `free(node)` still print the old integer value during testing, tricking beginners into thinking their code is bug-free?",
    options: [
      "The heap allocator doesn't immediately zero out freed bytes; the old bits may sit in RAM until a later `malloc()` overwrites them",
      "`free()` waits until `main()` returns before freeing memory",
      "Integers are stored on the stack while pointers are on the heap",
      "C compilers ignore `free()` in debug mode"
    ],
    answer: "The heap allocator doesn't immediately zero out freed bytes; the old bits may sit in RAM until a later `malloc()` overwrites them",
    explanation: "Use-After-Free is insidious because it may silently work in tiny tests and then crash randomly in production once new allocations reuse that chunk!"
  },
  {
    id: 7,
    question: "If two pointers `a` and `b` point to the SAME heap node and you run `free(a); a = NULL;`, what is `b`?",
    options: [
      "`b` is STILL a dangling pointer pointing to freed memory!",
      "`b` automatically becomes `NULL` too",
      "`b` points to `head`",
      "`b` becomes a valid new copy of the node"
    ],
    answer: "`b` is STILL a dangling pointer pointing to freed memory!",
    explanation: "Setting `a = NULL` only clears `a`; any alias pointer `b` (such as a forgotten `tail` pointer!) remains dangling unless updated too."
  },
  {
    id: 8,
    question: "Which compiler flag catches Use-After-Free, Double-Free, and Heap Buffer Overflows immediately at runtime with clear line numbers?",
    options: [
      "`gcc -g -fsanitize=address` (AddressSanitizer / ASan)",
      "`gcc -O2`",
      "`gcc -Wall` alone (catches only compile-time warnings)",
      "`gcc -lm`"
    ],
    answer: "`gcc -g -fsanitize=address` (AddressSanitizer / ASan)",
    explanation: "AddressSanitizer instruments heap allocations and poisons freed blocks so any Use-After-Free fails immediately with a stack trace."
  },
  {
    id: 9,
    question: "In Project 9 (Find Middle Node with Fast & Slow pointers), how many passes over the list are needed?",
    options: [
      "1 single pass (`O(N)` time, `O(1)` space)",
      "2 full passes",
      "N passes (`O(N^2)`)",
      "O(log N) passes"
    ],
    answer: "1 single pass (`O(N)` time, `O(1)` space)",
    explanation: "When `fast` (2x speed) hits the end, `slow` (1x speed) is at the middle in one pass."
  },
  {
    id: 10,
    question: "In Project 15 (Merge Two Sorted Lists), why do we use a `Node dummy` stack node?",
    options: [
      "It gives the merged list a starting anchor (`dummy.next`) so we don't need special-case `if (res == NULL)` checks on the first append",
      "It sorts unsorted lists automatically",
      "It doubles memory speed",
      "It prevents `malloc()` from returning `NULL`"
    ],
    answer: "It gives the merged list a starting anchor (`dummy.next`) so we don't need special-case `if (res == NULL)` checks on the first append",
    explanation: "Initializing `tail = &dummy` lets every append simply execute `tail->next = node; tail = node;`, then return `dummy.next`."
  },
  {
    id: 11,
    question: "In Project 18 (Y-Shaped List Intersection), why does redirecting `pA` to `headB` and `pB` to `headA` when reaching `NULL` find the intersection?",
    options: [
      "Both pointers travel the exact same total distance `Len(A) + Len(B)`, so they align and arrive at the shared merge node simultaneously",
      "It reverses both lists",
      "It sorts the nodes by address",
      "It breaks any cycle"
    ],
    answer: "Both pointers travel the exact same total distance `Len(A) + Len(B)`, so they align and arrive at the shared merge node simultaneously",
    explanation: "If `A` has length `a + c` and `B` has length `b + c`, both walk `a + c + b` steps before reaching the shared tail `c`!"
  },
  {
    id: 12,
    question: "In Project 19 (N-th Node from End in one pass), how far apart are `fast` and `slow` kept?",
    options: [
      "`N` nodes apart — advance `fast` `N` steps first, then move both 1 step until `fast == NULL`",
      "1 node apart",
      "They move at 2x and 1x speeds",
      "`N / 2` nodes apart"
    ],
    answer: "`N` nodes apart — advance `fast` `N` steps first, then move both 1 step until `fast == NULL`",
    explanation: "Maintaining a fixed window of `N` nodes ensures that when `fast` lands on `NULL`, `slow` is `N` steps behind at the N-th node from the end."
  },
  {
    id: 13,
    question: "What happens if `freeList(Node *head)` takes a single pointer `Node *` instead of `Node **`?",
    options: [
      "It frees all heap nodes, but `main()`'s `head` stays a dangling pointer unless the caller manually writes `head = NULL;` afterward",
      "It fails to free any nodes",
      "It causes a compile error",
      "It only frees the head node"
    ],
    answer: "It frees all heap nodes, but `main()`'s `head` stays a dangling pointer unless the caller manually writes `head = NULL;` afterward",
    explanation: "Passing `Node **headRef` (i.e. `freeList(&head)`) allows `freeList` itself to set `*headRef = NULL;` cleanly."
  },
  {
    id: 14,
    question: "In Project 16 (Palindrome Linked List in O(1) space), why is it good engineering practice to reverse the second half BACK to its original order before returning?",
    options: [
      "So the caller's linked list data structure isn't left unexpectedly mutated by a read-only check like `is_palindrome()`",
      "Because `freeList()` only works on palindromes",
      "Because C forbids returning `bool` from mutated lists",
      "To reduce time complexity from O(N) to O(1)"
    ],
    answer: "So the caller's linked list data structure isn't left unexpectedly mutated by a read-only check like `is_palindrome()`",
    explanation: "Restoring the second half leaves the input list intact after checking."
  },
  {
    id: 15,
    question: "In Project 24 (XOR Doubly Linked List), how do you recover the `next` node address from `curr->npx` and `prev`?",
    options: [
      "`next = (Node*)((uintptr_t)prev ^ (uintptr_t)curr->npx)`",
      "`next = prev + curr->npx`",
      "`next = prev & curr->npx`",
      "`next = curr->npx`"
    ],
    answer: "`next = (Node*)((uintptr_t)prev ^ (uintptr_t)curr->npx)`",
    explanation: "Since `npx = prev ^ next` and `A ^ A = 0`, `prev ^ (prev ^ next) = next`."
  },
  {
    id: 16,
    question: "When deleting the head node in `Node *temp = head; head = head->next; free(temp);`, is `head` dangling?",
    options: [
      "No — `head` moved to `head->next` before `free(temp)`, and `temp` is the local variable that held the freed node",
      "Yes — `head` is dangling",
      "Yes — unless `head->next` was `NULL`",
      "Only if `head` was `malloc`'d"
    ],
    answer: "No — `head` moved to `head->next` before `free(temp)`, and `temp` is the local variable that held the freed node",
    explanation: "`head` now points to the second node (or `NULL`), while `temp` goes out of scope (or can be set `temp = NULL;`)."
  },
  {
    id: 17,
    question: "What Valgrind message confirms that your Linked List program had zero memory leaks and zero dangling pointer accesses?",
    options: [
      "`All heap blocks were freed -- no leaks are possible` and `ERROR SUMMARY: 0 errors`",
      "`Segmentation fault (core dumped)`",
      "`definitely lost: 16 bytes in 1 blocks`",
      "`Invalid read of size 8`"
    ],
    answer: "`All heap blocks were freed -- no leaks are possible` and `ERROR SUMMARY: 0 errors`",
    explanation: "`definitely lost` means leaked nodes; `Invalid read/write` means Use-After-Free or out-of-bounds access."
  },
  {
    id: 18,
    question: "In Project 12 (Recursive List Reversal), why does `reverse_recursive` set `head->next->next = head; head->next = NULL;`?",
    options: [
      "To make the successor node point back to `head` and erase `head`'s old forward link so the new tail ends cleanly at `NULL` (preventing a 2-node cycle!)",
      "To delete the first two nodes",
      "To swap `head->data` and `head->next->data`",
      "To create a circular list"
    ],
    answer: "To make the successor node point back to `head` and erase `head`'s old forward link so the new tail ends cleanly at `NULL` (preventing a 2-node cycle!)",
    explanation: "Forgetting `head->next = NULL;` leaves the first two nodes pointing at each other in a cycle!"
  },
  {
    id: 19,
    question: "In Project 21 (Reverse Nodes in K-Group), what happens if fewer than `K` nodes remain at the tail?",
    options: [
      "Those remaining `< K` nodes stay in their original order without reversal",
      "They are freed and deleted",
      "They are padded with `0` nodes",
      "The entire list is reversed anyway"
    ],
    answer: "Those remaining `< K` nodes stay in their original order without reversal",
    explanation: "Checking whether `K` nodes exist ahead before reversing ensures partial trailing groups remain untouched."
  },
  {
    id: 20,
    question: "In Project 23 (Copy List with Random Pointers via Interleaving), what is the space complexity (excluding the returned cloned list itself)?",
    options: [
      "O(1) auxiliary space (no hash map needed!)",
      "O(N) auxiliary hash map space",
      "O(N^2) space",
      "O(log N) space"
    ],
    answer: "O(1) auxiliary space (no hash map needed!)",
    explanation: "Weaving `A -> A' -> B -> B'` lets `A'->random = A->random->next`, then unweaving restores `A -> B` and `A' -> B'` in O(1) extra space."
  },
  {
    id: 21,
    question: "What happens if a function returns a pointer to a node that was already passed to `free()` inside a helper?",
    options: [
      "The caller receives a dangling pointer, leading to Use-After-Free undefined behavior",
      "The compiler prevents returning freed pointers",
      "The OS automatically re-allocates the node",
      "It safely returns `NULL`"
    ],
    answer: "The caller receives a dangling pointer, leading to Use-After-Free undefined behavior",
    explanation: "Once a node is freed, never return its address—return `NULL` or the successor node instead."
  },
  {
    id: 22,
    question: "When removing duplicates from an unsorted list (Project 17), why must `runner` stop at the node BEFORE the duplicate (`runner->next->data == curr->data`)?",
    options: [
      "So we can set `temp = runner->next; runner->next = temp->next; free(temp);` without losing connectivity",
      "Because `curr` cannot advance otherwise",
      "To avoid checking `curr->data`",
      "So `runner` skips every second node"
    ],
    answer: "So we can set `temp = runner->next; runner->next = temp->next; free(temp);` without losing connectivity",
    explanation: "Notice also: when you delete `runner->next`, you do NOT advance `runner` in that iteration because the NEW `runner->next` might also be a duplicate!"
  },
  {
    id: 23,
    question: "In Project 25 (Fixed-Size Memory Pool Allocator), why are linked list nodes pre-allocated in one big array/slab instead of calling `malloc()` per node?",
    options: [
      "To achieve O(1) deterministic allocation/free with zero heap fragmentation and better CPU cache locality",
      "Because `malloc()` cannot allocate structs",
      "To increase struct padding",
      "To make pointers 128-bit"
    ],
    answer: "To achieve O(1) deterministic allocation/free with zero heap fragmentation and better CPU cache locality",
    explanation: "Embedded systems and game engines use slab/pool allocators with a linked free-list for fast, predictable memory reuse."
  },
  {
    id: 24,
    question: "Which practice completely eliminates dangling pointers across single-node deletions in your own C projects?",
    options: [
      "Always unlink the node first, call `free(temp)`, and immediately write `temp = NULL;` (plus update `head`/`tail` if affected)",
      "Never call `free()` until the computer restarts",
      "Store all nodes in global arrays only",
      "Cast pointers to `int` before freeing"
    ],
    answer: "Always unlink the node first, call `free(temp)`, and immediately write `temp = NULL;` (plus update `head`/`tail` if affected)",
    explanation: "Disciplined unlinking, freeing, and nullifying keeps every pointer either valid or `NULL`."
  },
  {
    id: 25,
    question: "If `head` and `tail` both point to the only node in a list and you delete it with `free(head); head = NULL;`, what bug remains?",
    options: [
      "`tail` is now a dangling pointer to the freed node unless you also set `tail = NULL;`",
      "No bug—`tail` automatically becomes `NULL`",
      "`head` is still valid",
      "The node cannot be freed"
    ],
    answer: "`tail` is now a dangling pointer to the freed node unless you also set `tail = NULL;`",
    explanation: "Any secondary boundary pointer (`tail`, `curr`, `prev`) referencing a freed node must also be updated or set to `NULL`."
  }
];

export default questions;
