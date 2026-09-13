export const topic1Questions = [
  {
    question: "What is a Doubly Linked List (DLL) and what are its advantages over a Singly Linked List?",
    answer: "A Doubly Linked List contains two pointers per node: 'next' and 'prev'. This permits bidirectional traversal (forward and backward) and allows deleting a node in O(1) time given only a pointer to that node without having to search for its predecessor."
  },
  {
    question: "How does O(1) node deletion work in a Doubly Linked List?",
    answer: "node->prev->next = node->next; if (node->next) node->next->prev = node->prev; free(node); Because each node already knows its predecessor via 'prev', no list traversal is needed."
  },
  {
    question: "What is a Circular Linked List (CLL)?",
    answer: "A linked list where the last node's 'next' pointer points back to the first node (head) rather than NULL, forming a continuous circular loop."
  },
  {
    question: "What is a Sentinel (Dummy Head / Tail) Node in Doubly Linked Lists?",
    answer: "Permanent dummy nodes at head and tail that eliminate null checks. In a sentinel-based DLL, every real data node always has a valid non-null 'prev' and 'next', drastically reducing edge-case bugs."
  },
  {
    question: "How does an LRU (Least Recently Used) Cache use a Doubly Linked List?",
    answer: "An LRU Cache pairs a Hash Table (for O(1) lookup) with a Doubly Linked List. When an item is accessed, it is detached in O(1) and moved to the head (Most Recently Used). When capacity is full, the tail node (Least Recently Used) is evicted in O(1)."
  },
  {
    question: "What is the memory overhead of a Doubly Linked List node compared to a Singly Linked List node?",
    answer: "A DLL node stores an additional 8-byte pointer ('prev' on 64-bit systems), increasing node size by 8 bytes."
  },
  {
    question: "How do you detect the termination condition when traversing a Circular Linked List?",
    answer: "Compare current against the starting node pointer (head): Node *curr = head; if (curr) do { /* process */ curr = curr->next; } while (curr != head);"
  },
  {
    question: "What happens if you insert a node into a DLL and forget to update node->next->prev?",
    answer: "Forward traversal will work, but backward traversal from the tail will skip the new node or jump to corrupted memory, creating an inconsistent asymmetric list."
  },
  {
    question: "What is a Circular Doubly Linked List (CDLL)?",
    answer: "A list where head->prev points to the tail node, and tail->next points to the head node. Both the first and last elements are directly accessible in O(1) time from the head."
  },
  {
    question: "How does the Linux kernel implement its universal 'struct list_head'?",
    answer: "It uses a circular doubly linked list where each node contains only 'next' and 'prev' pointers, embedded inside larger data structs."
  },
  {
    question: "How do you reverse a Doubly Linked List in-place?",
    answer: "Iterate through each node and swap its 'prev' and 'next' pointers: DNode *temp = curr->prev; curr->prev = curr->next; curr->next = temp; curr = curr->prev;"
  },
  {
    question: "What is a common real-world use case for Circular Linked Lists?",
    answer: "Round-robin CPU process schedulers, media playlist repeat loops, multiplayer turn-based game rotations, and audio buffer ring streams."
  },
  {
    question: "How do you split a Circular Linked List into two equal circular halves?",
    answer: "Use slow and fast pointers to find the midpoint, set mid->next to head (first circular half), and tail->next to mid->next (second circular half)."
  },
  {
    question: "Can a Doubly Linked List support O(1) insertion before an arbitrary given node?",
    answer: "Yes, because given node 'p', its predecessor is immediately accessible via p->prev."
  },
  {
    question: "What happens if free() is called on a node in a Circular Linked List without updating surrounding links?",
    answer: "The loop is broken and traversing the list leads to undefined behavior or infinite loops over deallocated memory."
  },
  {
    question: "Why are browser history navigation engines implemented using Doubly Linked Lists?",
    answer: "Because user navigation involves moving backward (Back button -> curr->prev) and forward (Forward button -> curr->next) along a linear history chain."
  },
  {
    question: "What is a Deque (Double-Ended Queue) and how is it implemented with a DLL?",
    answer: "A collection allowing O(1) push and pop at both head and tail, implemented natively by maintaining head and tail pointers on a Doubly Linked List."
  },
  {
    question: "How do you check if a Doubly Linked List is a palindrome?",
    answer: "Set left pointer to head and right pointer to tail. Move left forward and right backward, checking left->data == right->data until left meets or crosses right."
  },
  {
    question: "What is the time complexity of finding the size (length) of a Circular Linked List?",
    answer: "O(N), as you must count nodes starting from head until current->next reaches head."
  },
  {
    question: "How does memory fragmentation affect Doubly Linked Lists over long periods?",
    answer: "Frequent allocations and deallocations scatter DLL nodes across the heap, increasing heap fragmentation unless a custom memory pool or slab allocator is used."
  },
  {
    question: "What is the difference between an XOR Linked List (Memory Efficient DLL) and a regular DLL?",
    answer: "An XOR Linked List stores a single pointer field per node equal to (address(prev) ^ address(next)), halving the pointer memory overhead while still supporting bidirectional traversal."
  },
  {
    question: "How do you insert an element into a sorted Doubly Linked List?",
    answer: "Traverse until current->data >= new_data, then rewire 4 pointers: newNode->next = current, newNode->prev = current->prev, current->prev->next = newNode, current->prev = newNode."
  },
  {
    question: "Can a DLL node's prev pointer be NULL?",
    answer: "Yes, in a standard non-circular DLL, head->prev is NULL and tail->next is NULL to indicate boundary endpoints."
  },
  {
    question: "Why should you test DLL deletion on single-node lists (head == tail)?",
    answer: "Single-node lists are the most common source of null pointer dereference crashes when both head and tail must be reset to NULL."
  },
  {
    question: "How do compilers optimize sentinel-node Doubly Linked List traversal?",
    answer: "Eliminating NULL checks allows the compiler to generate unrolled loops with fewer branch mispredictions."
  }
];
