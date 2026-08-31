const questions = [
  {
    id: 1,
    question: "What is the primary condition that defines a valid Binary Search Tree (BST)?",
    options: [
      "For every node N, all keys in its left subtree are strictly less than N.data, and all keys in its right subtree are strictly greater than N.data",
      "Every node must have exactly two children except leaves",
      "The height of the left and right subtrees must differ by at most 1 at all times",
      "All leaf nodes must be located on the same horizontal level"
    ],
    answer: "For every node N, all keys in its left subtree are strictly less than N.data, and all keys in its right subtree are strictly greater than N.data",
    explanation: "This invariant must hold recursively for every single node in the tree. Because of this property, an Inorder Traversal (Left → Root → Right) always produces keys in strictly ascending sorted order."
  },
  {
    id: 2,
    question: "What does an Inorder Traversal (Left → Root → Right) of a valid Binary Search Tree produce?",
    options: [
      "Keys sorted in strictly ascending non-decreasing order",
      "Keys sorted in strictly descending order",
      "Keys arranged by tree level from root to leaf",
      "A pseudo-random distribution of keys depending on insertion order"
    ],
    answer: "Keys sorted in strictly ascending non-decreasing order",
    explanation: "Because the BST invariant guarantees that left subtree < root < right subtree, recursively processing left subtree, then current root, then right subtree guarantees mathematical non-decreasing sorted order in O(N) time."
  },
  {
    id: 3,
    question: "What is the worst-case time complexity of searching for a key in an unbalanced (skewed) BST with N nodes?",
    options: [
      "O(N)",
      "O(log N)",
      "O(1)",
      "O(N log N)"
    ],
    answer: "O(N)",
    explanation: "If keys are inserted in sequential order (e.g. 10, 20, 30, 40, 50), the BST degrades into a linear chain/linked list of height N. Searching for the deepest element requires visiting every node, yielding O(N) worst-case time."
  },
  {
    id: 4,
    question: "In BST deletion Case 1 (Leaf Node with 0 children), what are the exact memory and pointer operations performed?",
    options: [
      "Call free(root) and return NULL so the parent pointer is reset to NULL",
      "Replace node's value with 0 and leave memory allocated",
      "Find the inorder successor and copy its value to the parent",
      "Shift all downstream nodes up by one level in memory"
    ],
    answer: "Call free(root) and return NULL so the parent pointer is reset to NULL",
    explanation: "Because a leaf has no children, removing it has zero downstream impact on the tree structure. The node memory is deallocated with free(root), and returning NULL allows the calling parent link (e.g. parent->left or parent->right) to cleanly unhook the node."
  },
  {
    id: 5,
    question: "Why does Case 1 (Leaf deletion) have zero cascading structural side effects on the rest of the tree?",
    options: [
      "Because the leaf has degree 0 (both left and right child pointers are NULL), so no subtrees exist below it to reattach",
      "Because leaf nodes do not occupy memory on the heap",
      "Because the parent node is automatically deleted along with the leaf",
      "Because the operating system handles subtree rebalancing in hardware"
    ],
    answer: "Because the leaf has degree 0 (both left and right child pointers are NULL), so no subtrees exist below it to reattach",
    explanation: "A leaf node is a terminal vertex in the tree hierarchy. Severing the link from its parent isolates only the leaf node itself without orphaning any descendant subtrees."
  },
  {
    id: 6,
    question: "In BST deletion Case 2 (Node with 1 child), how is the deleted node bypassed without losing its descendant subtree?",
    options: [
      "The parent pointer is linked directly to the deleted node's single child (left or right), and the deleted node is freed",
      "The entire subtree rooted at that node is recursively deallocated",
      "The child node is copied into root and the entire tree is rebalanced",
      "A dummy node is inserted in place of the deleted node"
    ],
    answer: "The parent pointer is linked directly to the deleted node's single child (left or right), and the deleted node is freed",
    explanation: "By capturing `temp = root->left ? root->left : root->right`, freeing `root`, and returning `temp`, the grandparent adopts the single grandchild directly. The BST invariant is preserved because all values in that child's subtree already satisfied the ancestor's comparison bound."
  },
  {
    id: 7,
    question: "In C, what is the exact code pattern for Subcase 2A when the target node has ONLY a left child (`root->right == NULL`)?",
    options: [
      "BSTNode* temp = root->left; free(root); return temp;",
      "BSTNode* temp = root->right; free(root); return temp;",
      "free(root->left); root->left = NULL; return root;",
      "root->data = root->left->data; free(root->left); return root;"
    ],
    answer: "BSTNode* temp = root->left; free(root); return temp;",
    explanation: "We save the pointer to the non-null left child into `temp`, deallocate `root` memory via `free(root)`, and return `temp` so the caller's pointer (`parent->left` or `parent->right`) directly references the promoted child."
  },
  {
    id: 8,
    question: "Why does directly removing a node with TWO children (Case 3) fail without a replacement strategy?",
    options: [
      "A parent pointer in a binary tree can only hold ONE address, so it cannot link directly to both left and right child subtrees simultaneously",
      "Because nodes with two children cannot be freed in C",
      "Because CPU cache registers overflow when two pointers are severed",
      "Because the operating system MMU blocks deallocating internal tree nodes"
    ],
    answer: "A parent pointer in a binary tree can only hold ONE address, so it cannot link directly to both left and right child subtrees simultaneously",
    explanation: "A binary tree node has a single link from its parent. If an internal node with two children is removed, two disconnected subtrees are left behind. Therefore, we must replace the node's key with an adjacent sorted key (Inorder Successor or Predecessor) instead of breaking the topology."
  },
  {
    id: 9,
    question: "How do you find the Inorder Successor of a node N in a BST when N has a non-empty right subtree?",
    options: [
      "Traverse to N->right, and then repeatedly follow left pointers until reaching the leftmost node (findMin(N->right))",
      "Traverse to N->left, and then repeatedly follow right pointers (findMax(N->left))",
      "Traverse up to the root node and find the maximum element",
      "Select N->right directly without further traversal"
    ],
    answer: "Traverse to N->right, and then repeatedly follow left pointers until reaching the leftmost node (findMin(N->right))",
    explanation: "The Inorder Successor is the smallest key in the right subtree. Starting at `N->right` and moving `curr = curr->left` until `curr->left == NULL` locates the minimum element in that right subtree."
  },
  {
    id: 10,
    question: "How many children can an Inorder Successor (found via `findMin(root->right)`) have at most?",
    options: [
      "At most 1 child (which must be a right child, never a left child)",
      "Exactly 2 children",
      "Up to 3 children depending on tree depth",
      "It must always have 0 children (strictly a leaf)"
    ],
    answer: "At most 1 child (which must be a right child, never a left child)",
    explanation: "By definition, the minimum node in a right subtree cannot have a left child (if it had a left child, that left child would be smaller!). Therefore, it can only have at most 1 right child, reducing its recursive deletion to Case 1 or Case 2."
  },
  {
    id: 11,
    question: "How do you find the Inorder Predecessor of a node N in a BST when N has a non-empty left subtree?",
    options: [
      "Traverse to N->left, and then repeatedly follow right pointers until reaching the rightmost node (findMax(N->left))",
      "Traverse to N->right, and then repeatedly follow left pointers (findMin(N->right))",
      "Traverse up to the tree root and select the left child",
      "Select N->left directly without further traversal"
    ],
    answer: "Traverse to N->left, and then repeatedly follow right pointers until reaching the rightmost node (findMax(N->left))",
    explanation: "The Inorder Predecessor is the largest key in the left subtree. Starting at `N->left` and moving `curr = curr->right` until `curr->right == NULL` locates the maximum element in that left subtree."
  },
  {
    id: 12,
    question: "How many children can an Inorder Predecessor (found via `findMax(root->left)`) have at most?",
    options: [
      "At most 1 child (which must be a left child, never a right child)",
      "Exactly 2 children",
      "Up to 4 children depending on memory allocation",
      "It must always have 0 children (strictly a leaf)"
    ],
    answer: "At most 1 child (which must be a left child, never a right child)",
    explanation: "By definition, the maximum node in a left subtree cannot have a right child (if it had a right child, that right child would be larger!). Therefore, it can only have at most 1 left child, reducing its recursive deletion to Case 1 or Case 2."
  },
  {
    id: 13,
    question: "What are the exact execution steps for Case 3 deletion using Inorder Successor?",
    options: [
      "1) Find succ = findMin(root->right), 2) Copy succ->data to root->data, 3) Recursively delete succ->data from root->right",
      "1) Free root directly, 2) Move left subtree into right subtree, 3) Return NULL",
      "1) Swap root with root->right, 2) Delete root->left, 3) Rebalance tree",
      "1) Find succ = findMax(root->right), 2) Set root->right = NULL, 3) Free succ"
    ],
    answer: "1) Find succ = findMin(root->right), 2) Copy succ->data to root->data, 3) Recursively delete succ->data from root->right",
    explanation: "Replacing root's key with its successor key preserves the sorted order invariant across all subtrees. Then deleting the successor from `root->right` is guaranteed to be a simple Case 1 or Case 2 deletion."
  },
  {
    id: 14,
    question: "How is the Inorder Successor of a node N determined if N does NOT have a right subtree (`N->right == NULL`)?",
    options: [
      "It is the lowest ancestor of N whose left child is also an ancestor of N (the closest ancestor where we took a left turn)",
      "The node has no successor under any circumstances",
      "It is the leftmost leaf of the entire tree",
      "It is N's immediate left child"
    ],
    answer: "It is the lowest ancestor of N whose left child is also an ancestor of N (the closest ancestor where we took a left turn)",
    explanation: "When stepping up the ancestor chain from N, the first ancestor reached by moving up from its left branch is strictly greater than N and represents the next sequential key in Inorder traversal."
  },
  {
    id: 15,
    question: "How is the Inorder Predecessor of a node N determined if N does NOT have a left subtree (`N->left == NULL`)?",
    options: [
      "It is the lowest ancestor of N whose right child is also an ancestor of N (the closest ancestor where we took a right turn)",
      "The node has no predecessor under any circumstances",
      "It is the rightmost leaf of the entire tree",
      "It is N's immediate right child"
    ],
    answer: "It is the lowest ancestor of N whose right child is also an ancestor of N (the closest ancestor where we took a right turn)",
    explanation: "When stepping up the ancestor chain from N, the first ancestor reached by moving up from its right branch is strictly smaller than N and represents the previous sequential key in Inorder traversal."
  },
  {
    id: 16,
    question: "What is 'Hibbard Deletion Bias' and why does always using Inorder Successor degrade BST performance over time?",
    options: [
      "Repeatedly replacing deleted nodes with right-subtree successors systematically shrinks right subtrees and makes left subtrees deeper, skewing tree height towards O(N)",
      "It causes memory fragmentation by repeatedly allocating odd-sized chunks",
      "It forces the CPU instruction pipeline to stall",
      "It invalidates the binary search property on leaf nodes"
    ],
    answer: "Repeatedly replacing deleted nodes with right-subtree successors systematically shrinks right subtrees and makes left subtrees deeper, skewing tree height towards O(N)",
    explanation: "Thomas Hibbard proved in 1962 that asymmetric deletions using only successors cause random BSTs to lose balance, increasing average depth to O(sqrt(N)) instead of O(log N). Alternating randomly between successor and predecessor mitigates this asymmetry."
  },
  {
    id: 17,
    question: "When deleting the Root Node in C, why is writing `root = deleteNode(root, key)` or passing a double pointer `BSTNode** root` mandatory?",
    options: [
      "In C, pointers are passed by value; if the root address is freed, the caller's pointer becomes dangling unless updated by returning the new root or modifying *root",
      "C functions cannot deallocate heap memory without double pointers",
      "The operating system requires double pointers for all recursive data structures",
      "To prevent compiler warnings about unused return values"
    ],
    answer: "In C, pointers are passed by value; if the root address is freed, the caller's pointer becomes dangling unless updated by returning the new root or modifying *root",
    explanation: "If `root` is deleted, its heap address is invalid. Assigning `root = deleteNode(root, key)` updates the caller's root pointer to the newly promoted root node (or NULL if the tree becomes empty)."
  },
  {
    id: 18,
    question: "What is a 'Dangling Pointer' in the context of BST deletion, and how is it prevented in C?",
    options: [
      "A pointer that still points to a deallocated memory address after free(); prevented by setting the pointer to NULL immediately after freeing",
      "A pointer that points to two children simultaneously",
      "A pointer that has not been initialized with malloc()",
      "A pointer pointing to read-only program code segment"
    ],
    answer: "A pointer that still points to a deallocated memory address after free(); prevented by setting the pointer to NULL immediately after freeing",
    explanation: "Calling `free(ptr)` marks memory as available to the OS allocator but does not erase the address in `ptr`. Setting `ptr = NULL` ensures that subsequent accidental dereferences trigger a fast, safe crash rather than corrupting memory."
  },
  {
    id: 19,
    question: "Why must a whole-tree deallocation function `freeTree(root)` use Post-Order Traversal (Left → Right → Root)?",
    options: [
      "It ensures both child subtrees are completely freed before the parent node memory holding their pointers is deallocated",
      "Pre-order traversal is not supported by standard C recursion",
      "Post-order traversal is the only traversal that runs in O(log N) time",
      "Because Inorder traversal reverses pointer directions during deallocation"
    ],
    answer: "It ensures both child subtrees are completely freed before the parent node memory holding their pointers is deallocated",
    explanation: "If a parent is freed first (as in Pre-order), its `left` and `right` child pointers become dangling pointers. Accessing them to free children causes Undefined Behavior and memory leaks. Post-order frees children first, then root."
  },
  {
    id: 20,
    question: "Where does insertion of a new key always take place in a standard Binary Search Tree?",
    options: [
      "As a new leaf node at an empty (NULL) position at the bottom of the tree",
      "Always at the root, pushing old nodes downward",
      "At the first available position on level 1",
      "Randomly replacing an existing leaf"
    ],
    answer: "As a new leaf node at an empty (NULL) position at the bottom of the tree",
    explanation: "In standard BST insertion, we follow comparison branches down the tree until reaching a NULL pointer, where we allocate a new `BSTNode` and attach it as a leaf."
  },
  {
    id: 21,
    question: "How do industrial applications handle duplicate keys in a Binary Search Tree?",
    options: [
      "By storing a 'count' or 'frequency' integer field within the node struct rather than creating duplicate node vertices",
      "By inserting duplicate keys only on alternate Fridays",
      "By ignoring all duplicates silently without recording counts",
      "By placing duplicates in an external unindexed linked list"
    ],
    answer: "By storing a 'count' or 'frequency' integer field within the node struct rather than creating duplicate node vertices",
    explanation: "Adding a `node->count++` field keeps tree height smaller, eliminates duplicate node pointer overhead, and simplifies deletion (decrement count until 0 before structural removal)."
  },
  {
    id: 22,
    question: "How do you find the Lowest Common Ancestor (LCA) of two values n1 and n2 (where n1 < n2) in a BST?",
    options: [
      "Start at root: if root->data > n2, step left; if root->data < n1, step right; otherwise root is the LCA",
      "Traverse all paths using BFS and calculate string edit distance",
      "Find the maximum node of the left subtree and return its parent",
      "LCA in a BST cannot be found without parent pointers"
    ],
    answer: "Start at root: if root->data > n2, step left; if root->data < n1, step right; otherwise root is the LCA",
    explanation: "Because of the BST property, the first node where the two search paths diverge (one value is <= root and the other is >= root) is guaranteed to be their Lowest Common Ancestor in O(h) time."
  },
  {
    id: 23,
    question: "Why is verifying `node->left->data < node->data < node->right->data` for each node INSUFFICIENT to validate a BST?",
    options: [
      "Because a node in the right subtree might have a descendant smaller than an ancestor higher up in the tree (violating the global BST invariant)",
      "Because the C compiler optimizes away comparison operators in recursive functions",
      "Because leaf nodes do not have left or right children",
      "Because BST validation requires calculating tree diameter"
    ],
    answer: "Because a node in the right subtree might have a descendant smaller than an ancestor higher up in the tree (violating the global BST invariant)",
    explanation: "A tree like `[20, left: 10, right: 30(left: 5)]` satisfies local checks at every node, but node `5` is in the right subtree of `20` (5 < 20), violating the global BST property. Validation must check that every node falls within `(min_allowed, max_allowed)`."
  },
  {
    id: 24,
    question: "What is the auxiliary space complexity of recursive BST Search, Insertion, and Deletion?",
    options: [
      "O(h) where h is the tree height, due to recursive call stack frames",
      "Strictly O(1) under all compiler settings",
      "O(N^2) because each stack frame clones the tree",
      "O(log h) using hardware register compression"
    ],
    answer: "O(h) where h is the tree height, due to recursive call stack frames",
    explanation: "Each recursive step places a function activation record on the call stack. For a balanced tree, $h = O(\log N)$; for a skewed tree, $h = O(N)$. Iterative implementations can reduce Search/Insert auxiliary space to $O(1)$."
  },
  {
    id: 25,
    question: "How do you find the Minimum and Maximum keys in a non-empty Binary Search Tree?",
    options: [
      "Minimum is the leftmost node (`while(curr->left) curr=curr->left`); Maximum is the rightmost node (`while(curr->right) curr=curr->right`)",
      "Minimum is always the root node; Maximum is the deepest right leaf",
      "Perform a full Level-Order traversal and find the extremes in an array",
      "Minimum is found via Preorder; Maximum is found via Postorder"
    ],
    answer: "Minimum is the leftmost node (`while(curr->left) curr=curr->left`); Maximum is the rightmost node (`while(curr->right) curr=curr->right`)",
    explanation: "Due to the BST invariant, smaller keys always lie to the left and larger keys always lie to the right. Following left pointers leads directly to the minimum key in O(h) time."
  },
  {
    id: 26,
    question: "Given a sorted array of N elements, how do you construct a height-balanced BST with minimal height O(log N)?",
    options: [
      "Pick middle element as root, recursively build left subtree from left half, and right subtree from right half (Divide & Conquer in O(N) time)",
      "Insert elements sequentially from index 0 to N-1 using standard insert()",
      "Insert elements in reverse order from index N-1 down to 0",
      "Sort array with HeapSort and link adjacent array slots with pointers"
    ],
    answer: "Pick middle element as root, recursively build left subtree from left half, and right subtree from right half (Divide & Conquer in O(N) time)",
    explanation: "Selecting `mid = (start + end)/2` ensures an equal number of elements in both left and right subtrees at every step, creating a perfectly balanced BST of height floor(log2(N)) in O(N) total time."
  },
  {
    id: 27,
    question: "What is the primary architectural difference between an unbalanced BST and self-balancing trees like AVL or Red-Black trees?",
    options: [
      "Self-balancing trees enforce height/color balance invariants and perform rotations (LL, RR, LR, RL) during insert/delete to guarantee O(log N) worst-case bounds",
      "Unbalanced BSTs store keys in arrays while AVL trees store keys in hash tables",
      "AVL trees allow duplicate keys while standard BSTs do not",
      "Red-Black trees do not require pointers in memory"
    ],
    answer: "Self-balancing trees enforce height/color balance invariants and perform rotations (LL, RR, LR, RL) during insert/delete to guarantee O(log N) worst-case bounds",
    explanation: "A standard BST can degenerate into an O(N) linear list if keys arrive in sorted order. AVL and Red-Black trees monitor balance factors and execute tree rotations in O(1) time to keep height bounded by O(log N)."
  },
  {
    id: 28,
    question: "On a 64-bit architecture, what is the physical memory size of `struct BSTNode { int data; struct BSTNode *left, *right; }`?",
    options: [
      "24 bytes (4 bytes int + 4 bytes padding + 8 bytes left pointer + 8 bytes right pointer)",
      "12 bytes (4 bytes int + 4 bytes left + 4 bytes right)",
      "16 bytes exactly with zero padding",
      "32 bytes due to cache line allocation minimums"
    ],
    answer: "24 bytes (4 bytes int + 4 bytes padding + 8 bytes left pointer + 8 bytes right pointer)",
    explanation: "On 64-bit systems, pointers must align to 8-byte boundaries. The compiler inserts 4 invisible padding bytes after the 4-byte `int` so that `left` starts at an 8-byte aligned offset: 4 + 4(pad) + 8 + 8 = 24 bytes."
  },
  {
    id: 29,
    question: "How does Level-Order Traversal (Breadth-First Search) differ from Depth-First Traversals (Inorder, Preorder, Postorder)?",
    options: [
      "Level-Order visits nodes horizontally level-by-level using an auxiliary FIFO Queue, while DFS traversals use a LIFO Call Stack / recursion",
      "Level-Order always sorts the tree keys in descending order",
      "Level-Order only visits leaf nodes",
      "Level-Order requires O(1) total memory under all circumstances"
    ],
    answer: "Level-Order visits nodes horizontally level-by-level using an auxiliary FIFO Queue, while DFS traversals use a LIFO Call Stack / recursion",
    explanation: "Level-Order pushes root to a queue, then repeatedly dequeues a node, prints its key, and enqueues its left and right children. It explores the tree layer by layer."
  },
  {
    id: 30,
    question: "Why are Binary Search Trees preferred over sorted arrays for dynamic datasets requiring frequent insertions and deletions?",
    options: [
      "BSTs perform dynamic insert/delete in O(h) time by updating pointers without shifting elements, whereas sorted arrays require O(N) data shifts per mutation",
      "Sorted arrays cannot be searched in logarithmic time",
      "BSTs require 90% less memory than arrays",
      "CPUs execute tree dereferences faster than array indexing"
    ],
    answer: "BSTs perform dynamic insert/delete in O(h) time by updating pointers without shifting elements, whereas sorted arrays require O(N) data shifts per mutation",
    explanation: "While sorted arrays allow O(log N) binary search, inserting or deleting an element in the middle requires shifting up to N elements (O(N) memory moves). A BST achieves O(log N) search AND O(log N) dynamic insert/delete without shifting memory buffers."
  }
];

export default questions;
