export const topic0Questions = [
  {
    question: "What is a Singly Linked List and how does it differ from a contiguous array?",
    answer: "A Singly Linked List is a linear collection of nodes dynamically allocated in non-contiguous heap memory. Each node contains data and a pointer ('next') to the succeeding node, allowing O(1) dynamic insertions/deletions without resizing or shifting contiguous memory blocks."
  },
  {
    question: "Why must functions that modify the head pointer receive a pointer-to-pointer (Node **headRef)?",
    answer: "Because C is strictly pass-by-value. Passing a single pointer 'Node *head' passes a copy of the address. Modifying 'head' locally would not change the caller's head variable. Passing 'Node **headRef' allows dereferencing (*headRef = newNode) to modify the caller's actual head pointer."
  },
  {
    question: "What is the time complexity of inserting a node at the head of a Singly Linked List?",
    answer: "O(1) constant time, because updating the new node's next pointer to current head and resetting head requires only two pointer assignments regardless of list length."
  },
  {
    question: "What is the time complexity of inserting a node at the tail without a tail pointer?",
    answer: "O(N) linear time, because you must traverse from head through all N nodes until current->next is NULL before attaching the new node."
  },
  {
    question: "How do you achieve O(1) tail insertions in a linked list?",
    answer: "By maintaining an auxiliary 'tail' pointer (Node *tail) that continuously points to the last node in the list."
  },
  {
    question: "What is the classic 3-pointer algorithm for reversing a Singly Linked List in-place?",
    answer: "Initialize prev = NULL, current = head, next = NULL. In a loop: next = current->next; current->next = prev; prev = current; current = next. Finally, set *headRef = prev. Time complexity is O(N) with O(1) space."
  },
  {
    question: "What happens if you free a node before updating its predecessor's next pointer?",
    answer: "You lose the reference to the remainder of the list, causing a massive memory leak and leaving the predecessor with a dangling pointer."
  },
  {
    question: "How do you detect a cycle (infinite loop) in a Singly Linked List?",
    answer: "Using Floyd's Tortoise and Hare cycle-finding algorithm: maintain two pointers (slow moving 1 step, fast moving 2 steps). If they ever meet (slow == fast), a cycle exists."
  },
  {
    question: "How do you find the middle element of a linked list in a single pass?",
    answer: "Advance a 'fast' pointer 2 steps and a 'slow' pointer 1 step per iteration. When 'fast' reaches NULL or the last node, 'slow' points to the exact middle node."
  },
  {
    question: "Why does traversing a linked list have worse CPU cache locality than an array?",
    answer: "Array elements reside in contiguous RAM addresses, allowing the CPU hardware prefetcher to load entire cache lines. Linked list nodes are scattered across the heap, causing frequent CPU cache misses on pointer dereferences."
  },
  {
    question: "What is a Dummy Head (Sentinel Node) pattern in linked list implementation?",
    answer: "An extra dummy node allocated at the beginning of the list that never stores real data. It simplifies insertion and deletion code by eliminating special edge cases for updating the head pointer."
  },
  {
    question: "How do you delete the entire linked list cleanly without memory leaks?",
    answer: "Iterate through the list using: while (curr != NULL) { Node *next = curr->next; free(curr); curr = next; } *headRef = NULL;"
  },
  {
    question: "What is the space complexity overhead of a Singly Linked List compared to an array?",
    answer: "Each node incurs the overhead of storing a pointer (8 bytes on 64-bit systems) plus heap allocator metadata per node, making it less memory-dense than a contiguous array."
  },
  {
    question: "Can binary search be performed on a Singly Linked List in O(log N) time?",
    answer: "No. Because linked lists lack random access, jumping to the middle node requires O(N) sequential traversal, making binary search on linked lists O(N) rather than O(log N)."
  },
  {
    question: "How do you merge two sorted Singly Linked Lists into one sorted list?",
    answer: "Compare the heads of both lists, attach the smaller node to the merged list's tail, and advance the corresponding pointer. Repeat until one list is empty, then splice the remaining nodes in O(N+M) time."
  },
  {
    question: "What is the difference between a shallow copy and a deep copy of a linked list?",
    answer: "A shallow copy merely copies the head pointer, sharing node memory. A deep copy allocates new heap nodes for every element and duplicates all payload data."
  },
  {
    question: "How do you remove duplicates from an unsorted linked list?",
    answer: "Either use a nested loop (O(N^2) time, O(1) space) or store seen values in an auxiliary hash set / boolean lookup array (O(N) time, O(N) space)."
  },
  {
    question: "How do you find the Nth node from the end of a Singly Linked List in one pass?",
    answer: "Use two pointers: advance the 'first' pointer N nodes forward, then move both 'first' and 'second' pointers at equal speed until 'first' reaches NULL. 'second' will point to the Nth node from the end."
  },
  {
    question: "What happens if malloc fails when creating a new node?",
    answer: "malloc returns NULL. Robust programs verify 'if (newNode == NULL)' and handle the out-of-memory condition gracefully rather than dereferencing NULL."
  },
  {
    question: "Can a linked list node contain a flexible array member or pointer to another struct?",
    answer: "Yes, nodes can store arbitrary payloads including pointers, structs, strings, or function pointers."
  },
  {
    question: "How do you check if a Singly Linked List is a palindrome?",
    answer: "Find the middle using slow/fast pointers, reverse the second half in-place, compare the first half and reversed second half for equality, and optionally restore the original list structure."
  },
  {
    question: "What is the time complexity of deleting the last node (tail) in a Singly Linked List?",
    answer: "O(N), because you must traverse from the head to find the second-to-last node in order to set its next pointer to NULL."
  },
  {
    question: "Why should you set *headRef = NULL after freeing all nodes?",
    answer: "To ensure the caller's head pointer is not left as a dangling pointer pointing to deallocated heap memory."
  },
  {
    question: "How does the Linux kernel implement linked lists (struct list_head)?",
    answer: "The Linux kernel embeds generic circular doubly linked list pointers (struct list_head { struct list_head *next, *prev; }) inside data structures, navigating back to enclosing structs via container_of()."
  },
  {
    question: "When should you choose a Linked List over a dynamic array (like std::vector or resizable C array)?",
    answer: "When frequent insertions and deletions occur at the beginning or middle of the collection, when the maximum capacity is completely unpredictable, or when reference stability of existing nodes is required."
  }
];
