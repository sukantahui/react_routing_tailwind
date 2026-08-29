const topic3_questions = [
  {
    question: "What is the formula to calculate the exact number of binary bits required to store a positive integer N in physical computer memory?",
    options: [
      "bits = N / 2",
      "bits = floor(log_2(N)) + 1",
      "bits = ceil(log_10(N))",
      "bits = 2^N"
    ],
    correctAnswer: 1,
    explanation: "Just as the number of decimal digits in N is floor(log_10 N) + 1, the number of binary bits in silicon memory is floor(log_2 N) + 1."
  },
  {
    question: "What is the maximum height h of a balanced binary search tree (such as an AVL or Red-Black Tree) containing N nodes?",
    options: [
      "h = N - 1",
      "h = floor(log_2(N)) = Theta(log N)",
      "h = sqrt(N)",
      "h = N / 2"
    ],
    correctAnswer: 1,
    explanation: "In a balanced binary tree, each level doubles the capacity of nodes (2^k). The height is bounded by h = floor(log_2 N) = O(log N)."
  },
  {
    question: "Why does a binary heap insertion or deletion operation take at most O(log N) comparisons?",
    options: [
      "Because the heap traverses all elements linearly",
      "Because inserting a node involves shifting up or down along a single root-to-leaf path, which is bounded by the tree height floor(log_2 N)",
      "Because heaps use hash functions to jump directly to the root",
      "Because heaps only support 2 total elements"
    ],
    correctAnswer: 1,
    explanation: "Sift-Up and Sift-Down follow a single root-to-leaf path. Since the height of a complete binary tree of N elements is floor(log_2 N), at most log_2 N swaps are made."
  },
  {
    question: "A 64-bit CPU virtual address space can address 2^64 bytes of memory (approx 18.4 Quintillion bytes). What logarithmic property connects the 64-bit register width to the memory capacity?",
    options: [
      "log_2(2^64) = 64 bits",
      "64 * 64 = 4096",
      "2^64 / 2 = 2^32",
      "sqrt(64) = 8 bytes"
    ],
    correctAnswer: 0,
    explanation: "The address register width is the base-2 logarithm of the addressable byte count: log_2(18.4 * 10^18) = 64 bits."
  },
  {
    question: "How many bits are needed to represent the decimal number 255 in binary?",
    options: [
      "7 bits",
      "8 bits",
      "9 bits",
      "16 bits"
    ],
    correctAnswer: 1,
    explanation: "floor(log_2(255)) + 1 = 7 + 1 = 8 bits (255 = 11111111 in binary)."
  },
  {
    question: "How many bits are needed to represent the decimal number 256 in binary?",
    options: [
      "8 bits",
      "9 bits",
      "10 bits",
      "16 bits"
    ],
    correctAnswer: 1,
    explanation: "floor(log_2(256)) + 1 = 8 + 1 = 9 bits (256 = 100000000 in binary)."
  },
  {
    question: "What is the maximum number of unique states that can be represented with B binary bits?",
    options: [
      "2 * B",
      "B^2",
      "2^B",
      "log_2(B)"
    ],
    correctAnswer: 2,
    explanation: "Each bit has 2 states (0 or 1). B independent bits provide 2 * 2 * ... * 2 = 2^B unique states."
  },
  {
    question: "If a complete binary tree contains 1,023 nodes, what is its exact tree height (with root at level 0)?",
    options: [
      "9",
      "10",
      "11",
      "1023"
    ],
    correctAnswer: 0,
    explanation: "Total nodes N = 2^(h+1) - 1. For N = 1023, 2^(h+1) = 1024 = 2^10 => h + 1 = 10 => h = 9."
  },
  {
    question: "What is the worst-case height of an UNBALANCED degenerate Binary Search Tree containing N nodes?",
    options: [
      "O(log N)",
      "O(sqrt(N))",
      "O(N - 1) = O(N)",
      "O(1)"
    ],
    correctAnswer: 2,
    explanation: "If elements are inserted in already sorted order into a naive BST without self-balancing, it degrades into a linear linked list of height N - 1 = O(N)."
  },
  {
    question: "What is the maximum height of a Red-Black Tree with N internal nodes?",
    options: [
      "2 * log_2(N + 1)",
      "N / 2",
      "sqrt(N)",
      "log_10(N)"
    ],
    correctAnswer: 0,
    explanation: "A fundamental theorem of Red-Black Trees proves that tree height is at most 2 * log_2(N + 1) = O(log N)."
  },
  {
    question: "What is the maximum height of an AVL Tree containing N nodes?",
    options: [
      "Approximately 1.44 * log_2(N)",
      "N",
      "0.5 * log_2(N)",
      "log_3(N)"
    ],
    correctAnswer: 0,
    explanation: "Because an AVL tree enforces a strict balance factor difference of at most 1, its height is strictly bounded by ≈ 1.44 * log_2(N) = O(log N)."
  },
  {
    question: "Why do B-Trees and B+ Trees in database storage engines (MySQL InnoDB, PostgreSQL) use high branching factors (e.g. M = 100 or M = 1000)?",
    options: [
      "Because high branching factors reduce tree height to h = log_M(N), minimizing expensive mechanical disk block reads (I/O seeks)",
      "Because binary trees cannot store integers",
      "Because database disks only support base 10",
      "Because B-Trees do not support range scans"
    ],
    correctAnswer: 0,
    explanation: "With M = 100, a tree of height 3 can index 1,000,000 records. Querying any record requires only 3 disk block reads instead of 20 reads in a binary tree!"
  },
  {
    question: "In a 32-bit computing system, what is the maximum addressable RAM without physical address extension (PAE)?",
    options: [
      "2 GB",
      "4 GB (2^32 bytes)",
      "8 GB",
      "16 GB"
    ],
    correctAnswer: 1,
    explanation: "2^32 bytes = 4,294,967,296 bytes = 4 GB. This is why 32-bit operating systems cannot natively address more than 4 GB of RAM."
  },
  {
    question: "How many decimal digits are in the integer 1,000,000?",
    options: [
      "6 digits",
      "7 digits (floor(log_10(10^6)) + 1 = 6 + 1 = 7)",
      "8 digits",
      "10 digits"
    ],
    correctAnswer: 1,
    explanation: "By the digit formula: floor(log_10(1000000)) + 1 = 6 + 1 = 7 digits."
  },
  {
    question: "In a binary min-heap stored in an array, for a node at index i (0-based), what are the indices of its left and right children?",
    options: [
      "Left: 2*i + 1, Right: 2*i + 2",
      "Left: 2*i, Right: 2*i + 1",
      "Left: i/2, Right: i/2 + 1",
      "Left: i + 1, Right: i + 2"
    ],
    correctAnswer: 0,
    explanation: "In standard 0-indexed binary heaps, left child is at 2*i + 1 and right child is at 2*i + 2."
  },
  {
    question: "In a 0-indexed binary heap, what is the parent index of a node at index i?",
    options: [
      "(i - 1) / 2",
      "i / 2",
      "2 * i",
      "(i + 1) / 2"
    ],
    correctAnswer: 0,
    explanation: "In integer division, parent(i) = floor((i - 1) / 2)."
  },
  {
    question: "What is the maximum number of nodes at level k of a binary tree (root at level 0)?",
    options: [
      "k",
      "2 * k",
      "2^k",
      "k^2"
    ],
    correctAnswer: 2,
    explanation: "Level 0 has 2^0 = 1 node; Level 1 has 2^1 = 2 nodes; Level 2 has 2^2 = 4 nodes; Level k has 2^k nodes."
  },
  {
    question: "If a Segment Tree is built on an array of size N, what is the upper bound on the number of nodes in the tree array?",
    options: [
      "2N",
      "4N",
      "N^2",
      "N log N"
    ],
    correctAnswer: 1,
    explanation: "A segment tree requires 2 * 2^(ceil(log_2 N) + 1) - 1 < 4N nodes in the worst case."
  },
  {
    question: "In a Fenwick Tree (Binary Indexed Tree), how many operations are needed to update or query an element?",
    options: [
      "O(1)",
      "At most floor(log_2 N) + 1 operations = O(log N)",
      "O(N)",
      "O(N^2)"
    ],
    correctAnswer: 1,
    explanation: "Each point update (`i += i & -i`) and prefix sum query (`i -= i & -i`) flips bits, taking at most log_2(N) steps."
  },
  {
    question: "If a complete binary tree has 1,000,000 nodes, how many levels must be traversed in the worst case from root to leaf?",
    options: [
      "1,000 levels",
      "20 levels",
      "50 levels",
      "100 levels"
    ],
    correctAnswer: 1,
    explanation: "Height h = floor(log_2(1,000,000)) = 19. Traversing from root (level 0) to leaf (level 19) visits exactly 20 nodes."
  },
  {
    question: "Why is binary search on an array much more cache-friendly than random BST pointer traversing, even though both are O(log N)?",
    options: [
      "Arrays store contiguous memory blocks that maximize CPU L1/L2 cache line hits, whereas node pointers cause unpredictable cache misses",
      "Arrays do not use CPU registers",
      "Binary trees are not logarithmic",
      "BSTs cannot be stored in RAM"
    ],
    correctAnswer: 0,
    explanation: "Contiguous array memory layout enables hardware prefetching and spatial locality, whereas linked tree node pointers scatter memory across the heap."
  },
  {
    question: "How many bits are needed to store an integer N up to 1,000,000,000,000 (1 Trillion)?",
    options: [
      "20 bits",
      "30 bits",
      "40 bits (floor(log_2(10^12)) + 1 = 39 + 1 = 40 bits)",
      "64 bits"
    ],
    correctAnswer: 2,
    explanation: "Since 2^39 ≈ 5.49 * 10^11 < 10^12 < 2^40 ≈ 1.09 * 10^12, floor(log_2(10^12)) + 1 = 40 bits."
  },
  {
    question: "What is the maximum number of leaves in a binary tree of height h?",
    options: [
      "h",
      "2^h",
      "2^(h+1) - 1",
      "h^2"
    ],
    correctAnswer: 1,
    explanation: "In a binary tree of height h, the bottom level can have at most 2^h leaf nodes."
  },
  {
    question: "What is the relationship between the number of leaves L in a full binary tree and its internal nodes I?",
    options: [
      "L = I + 1",
      "L = 2 * I",
      "L = I - 1",
      "L = I"
    ],
    correctAnswer: 0,
    explanation: "In any full binary tree (where every non-leaf node has exactly 2 children), the number of leaf nodes L is always equal to internal nodes I plus 1 (L = I + 1)."
  },
  {
    question: "Why does converting a 32-bit pointer to a 64-bit pointer double the pointer memory overhead in node-based trees?",
    options: [
      "Because 64-bit pointers occupy 8 bytes per address instead of 4 bytes in 32-bit systems",
      "Because 64-bit pointers contain 2 CPU chips",
      "Because trees become 2x deeper",
      "Because garbage collection runs twice as fast"
    ],
    correctAnswer: 0,
    explanation: "In 64-bit systems, memory addresses are 8 bytes (64 bits). In a binary tree node with `left` and `right` child pointers, pointer metadata alone consumes 16 bytes per node."
  },
  {
    question: "What is the time complexity to build a binary heap from an unsorted array of N elements using Floyd's bottom-up `Build-Heap` algorithm?",
    options: [
      "O(N log N)",
      "O(N) [Linear Time]",
      "O(N^2)",
      "O(log N)"
    ],
    correctAnswer: 1,
    explanation: "By summing height-dependent node counts sum_{h=0}^{log N} (N / 2^(h+1)) * O(h) = O(N * sum h/2^h) = O(N). Building a heap is linear!"
  },
  {
    question: "In a Treap (Tree + Heap), what property ensures logarithmic O(log N) expected tree depth?",
    options: [
      "Assigning independent random priority keys to maintain heap-order via rotations, mimicking a randomly built BST",
      "Hardcoding all values to powers of 2",
      "Limiting the tree to 32 nodes",
      "Using red and black bit flags"
    ],
    correctAnswer: 0,
    explanation: "Random priorities in Treaps ensure the tree structure is identical to a random BST, guaranteeing O(log N) expected height with high probability."
  },
  {
    question: "What is the depth of a Trie storing N strings of maximum length L over an alphabet of size Sigma?",
    options: [
      "O(N)",
      "At most L levels = O(L)",
      "O(Sigma^N)",
      "O(log N)"
    ],
    correctAnswer: 1,
    explanation: "In a Trie, each character represents a level. The maximum tree depth is bounded strictly by the length of the longest word L."
  },
  {
    question: "In a complete binary tree with N nodes, how many nodes are located at the leaf level?",
    options: [
      "Exactly ceil(N / 2) nodes",
      "N / 4 nodes",
      "log_2(N) nodes",
      "1 node"
    ],
    correctAnswer: 0,
    explanation: "In any complete binary tree, approximately half of all nodes (ceil(N / 2)) reside on the bottom leaf level."
  },
  {
    question: "What is the major architectural principle connecting binary logarithms to data structures?",
    options: [
      "Logarithms only apply to math software",
      "Every balanced hierarchical structure that splits branching by factor k achieves tree height h = log_k(N), ensuring logarithmic lookup and modification operations",
      "Data structures must avoid logarithms",
      "Logarithms slow down memory access"
    ],
    correctAnswer: 1,
    explanation: "Branching by factor k divides the search space exponentially, bounding root-to-leaf paths to log_k(N) steps."
  }
];

export default topic3_questions;
