const questions = [
  {
    id: 1,
    question: "What is the fundamental graph-theoretic definition of a Tree data structure?",
    options: [
      "An undirected, connected, acyclic graph containing N vertices and exactly N - 1 edges with a unique simple path between any two vertices",
      "A cyclic directed graph with bidirectional loops",
      "A linear data structure where each element has at least two parents",
      "A collection of isolated vertices with zero connecting edges"
    ],
    answer: "An undirected, connected, acyclic graph containing N vertices and exactly N - 1 edges with a unique simple path between any two vertices",
    explanation: "A tree is an acyclic connected graph. If a tree has N vertices, it is mathematically guaranteed to contain exactly N - 1 edges and zero cycles."
  },
  {
    id: 2,
    question: "What is a 'Root Node' in a rooted binary tree hierarchy?",
    options: [
      "The topmost vertex in the tree that has in-degree 0 (has no incoming edges or parent)",
      "The bottom-most node with out-degree 0",
      "Any node that has exactly two children",
      "A node stored at physical memory address 0x0"
    ],
    answer: "The topmost vertex in the tree that has in-degree 0 (has no incoming edges or parent)",
    explanation: "The root node is the unique entry point into the tree hierarchy from which all other nodes are reachable via directed descendant paths."
  },
  {
    id: 3,
    question: "What is the difference between the 'Depth' and the 'Height' of a node in a tree?",
    options: [
      "Depth is the number of edges from the ROOT down to the node; Height is the number of edges on the LONGEST path from the node down to a leaf",
      "Depth and Height are identical synonyms with the exact same value",
      "Depth is measured from leaf to root; Height is measured from root to sibling",
      "Depth is always 0 for leaves; Height is always 0 for the root"
    ],
    answer: "Depth is the number of edges from the ROOT down to the node; Height is the number of edges on the LONGEST path from the node down to a leaf",
    explanation: "Depth measures distance downwards from the top (Root has depth 0). Height measures the longest distance downwards to a bottom leaf (Leaves have height 0; Root height equals the tree's total height)."
  },
  {
    id: 4,
    question: "Under the standard edge-count convention in computer science, what is the height of an EMPTY tree and a SINGLE-NODE tree?",
    options: [
      "Empty tree height = -1; Single-node tree height = 0",
      "Empty tree height = 0; Single-node tree height = 1",
      "Empty tree height = 1; Single-node tree height = 2",
      "Empty tree height = undefined; Single-node tree height = -1"
    ],
    answer: "Empty tree height = -1; Single-node tree height = 0",
    explanation: "Because height measures the number of edges on the longest downward path, a single node has 0 edges to itself (height = 0), and an empty tree (NULL) is defined as -1 so that 1 + max(-1, -1) = 0 for a leaf."
  },
  {
    id: 5,
    question: "What is a 'Leaf Node' (External Node) in a binary tree?",
    options: [
      "A node with degree 0 (both left and right child pointers are NULL)",
      "A node that has exactly one child",
      "A node that is an ancestor of the root",
      "Any node located at depth 1"
    ],
    answer: "A node with degree 0 (both left and right child pointers are NULL)",
    explanation: "Leaf nodes are the terminal vertices at the boundaries of the tree hierarchy that possess zero children (`node->left == NULL && node->right == NULL`)."
  },
  {
    id: 6,
    question: "What defines an 'Internal Node' (Non-Leaf Node) in a tree?",
    options: [
      "Any node that has at least one child (degree >= 1)",
      "Only nodes that have exactly two children",
      "Only the root node",
      "Nodes that do not have memory allocated on the heap"
    ],
    answer: "Any node that has at least one child (degree >= 1)",
    explanation: "An internal node is any non-terminal vertex in the tree that possesses one or more child subtrees (degree >= 1)."
  },
  {
    id: 7,
    question: "What are 'Siblings' in a tree data structure?",
    options: [
      "Nodes that share the exact same direct parent node",
      "Nodes located on adjacent memory addresses",
      "Nodes located at different depths in the tree",
      "Nodes that have the exact same integer key value"
    ],
    answer: "Nodes that share the exact same direct parent node",
    explanation: "In a binary tree, the left child and right child of a given parent node are siblings to each other."
  },
  {
    id: 8,
    question: "What is the defining invariant of a 'Full Binary Tree' (also known as a Proper or Strict Binary Tree)?",
    options: [
      "Every node in the tree has EITHER 0 OR 2 children (no node has degree 1)",
      "All levels must be completely filled with nodes",
      "All leaves must be on the leftmost side of the tree",
      "Every node must have exactly one left child"
    ],
    answer: "Every node in the tree has EITHER 0 OR 2 children (no node has degree 1)",
    explanation: "In a Full Binary Tree, every vertex is either an internal node with both left and right children, or a leaf node with zero children. No node has only a single child."
  },
  {
    id: 9,
    question: "In any Full Binary Tree with I internal nodes, what is the number of Leaf Nodes L?",
    options: [
      "L = I + 1",
      "L = 2 * I",
      "L = I - 1",
      "L = I^2"
    ],
    answer: "L = I + 1",
    explanation: "Mathematical proof: In a full binary tree, each internal node adds 2 edges, and total vertices N = 2I + 1. Since N = L + I, substituting yields L + I = 2I + 1 => L = I + 1."
  },
  {
    id: 10,
    question: "What is the defining invariant of a 'Complete Binary Tree'?",
    options: [
      "All levels are completely filled except possibly the last level, and all nodes in the last level are packed as far LEFT as possible",
      "Every level has exactly 2^h nodes without exception",
      "All leaves must be at odd-numbered depths",
      "The left subtree must always be larger than the right subtree"
    ],
    answer: "All levels are completely filled except possibly the last level, and all nodes in the last level are packed as far LEFT as possible",
    explanation: "Complete binary trees allow contiguous array representations without gaps: if a parent is at index i, left child is at 2i + 1 and right child at 2i + 2 (essential for Binary Heaps)."
  },
  {
    id: 11,
    question: "In a Complete Binary Tree mapped to a 0-indexed array, where are the parent and children of a node at index i located?",
    options: [
      "Parent: floor((i - 1) / 2); Left Child: 2i + 1; Right Child: 2i + 2",
      "Parent: 2i; Left Child: i + 1; Right Child: i + 2",
      "Parent: i - 1; Left Child: 2i; Right Child: 2i + 1",
      "Parent: i / 2; Left Child: i + 2; Right Child: i + 4"
    ],
    answer: "Parent: floor((i - 1) / 2); Left Child: 2i + 1; Right Child: 2i + 2",
    explanation: "This mathematical index relation enables Binary Heaps and Priority Queues to be stored in contiguous cache-friendly arrays with zero pointer overhead."
  },
  {
    id: 12,
    question: "What is a 'Perfect Binary Tree'?",
    options: [
      "A binary tree where all internal nodes have exactly 2 children AND all leaf nodes are at the exact same depth",
      "A tree where all node keys are prime numbers",
      "A tree with height equal to the number of nodes N",
      "A tree where every node has only a right child"
    ],
    answer: "A binary tree where all internal nodes have exactly 2 children AND all leaf nodes are at the exact same depth",
    explanation: "A perfect binary tree is completely full at every level. For height h, it contains exactly 2^(h+1) - 1 nodes and 2^h leaves."
  },
  {
    id: 13,
    question: "How many total nodes N are present in a Perfect Binary Tree of height h?",
    options: [
      "N = 2^(h + 1) - 1",
      "N = 2^h",
      "N = 2 * h + 1",
      "N = h^2"
    ],
    answer: "N = 2^(h + 1) - 1",
    explanation: "Sum of geometric progression across levels 0 to h: 2^0 + 2^1 + 2^2 + ... + 2^h = 2^(h+1) - 1."
  },
  {
    id: 14,
    question: "How many leaf nodes L are in a Perfect Binary Tree of height h?",
    options: [
      "L = 2^h",
      "L = 2^(h - 1)",
      "L = h + 1",
      "L = 2 * h"
    ],
    answer: "L = 2^h",
    explanation: "In a perfect binary tree, all leaves reside at the bottom level h. Level h has exactly 2^h vertices."
  },
  {
    id: 15,
    question: "What is a 'Degenerate' (or Pathological / Skewed) Binary Tree?",
    options: [
      "A tree where every internal parent node has only ONE child, causing height to equal N - 1 (resembling a singly linked list)",
      "A tree with negative numbers as node keys",
      "A tree where all nodes are stored in read-only memory",
      "A tree with circular loops between leaf nodes"
    ],
    answer: "A tree where every internal parent node has only ONE child, causing height to equal N - 1 (resembling a singly linked list)",
    explanation: "A degenerate tree loses all logarithmic advantages: tree height degrades to N - 1, and search time degrades from O(log N) to linear O(N)."
  },
  {
    id: 16,
    question: "What is the maximum number of nodes that can exist at level l of any binary tree (where root is level 0)?",
    options: [
      "2^l",
      "2^(l - 1)",
      "2 * l",
      "l^2"
    ],
    answer: "2^l",
    explanation: "Level 0 has 2^0 = 1 node (root), level 1 has up to 2^1 = 2 nodes, level 2 has up to 2^2 = 4 nodes, and level l has up to 2^l nodes."
  },
  {
    id: 17,
    question: "What is the minimum possible height of a binary tree containing N nodes?",
    options: [
      "ceil(log2(N + 1)) - 1 (or floor(log2(N)))",
      "N / 2",
      "N - 1",
      "sqrt(N)"
    ],
    answer: "ceil(log2(N + 1)) - 1 (or floor(log2(N)))",
    explanation: "Minimum height occurs when the tree is as complete/balanced as possible, packing up to 2^(h+1) - 1 nodes into height h, yielding logarithmic height."
  },
  {
    id: 18,
    question: "In ANY binary tree, what is the mathematical relationship between the number of leaf nodes L and the number of nodes with degree 2 (N_2)?",
    options: [
      "L = N_2 + 1",
      "L = 2 * N_2",
      "L = N_2 - 1",
      "L = N_2 + 2"
    ],
    answer: "L = N_2 + 1",
    explanation: "Universal Theorem: In any binary tree where vertices have degree 0, 1, or 2, the number of leaves (degree 0) is always exactly 1 greater than the number of nodes with 2 children (L = N_2 + 1)."
  },
  {
    id: 19,
    question: "What is the Balance Factor (BF) of a node N in an AVL / Balanced Binary Tree?",
    options: [
      "BF = Height(N.left) - Height(N.right)",
      "BF = Depth(N.left) + Depth(N.right)",
      "BF = Count(N.left) / Count(N.right)",
      "BF = Height(N) * 2"
    ],
    answer: "BF = Height(N.left) - Height(N.right)",
    explanation: "The balance factor is the difference between left and right subtree heights. For an AVL tree, BF must be in {-1, 0, +1} at every node."
  },
  {
    id: 20,
    question: "What is the 'Diameter' (or Width) of a binary tree?",
    options: [
      "The length of the longest path between any two nodes in the tree (which may or may not pass through the root)",
      "The number of leaf nodes on the bottom level",
      "The total memory size of all tree structs combined",
      "The maximum difference between keys in the tree"
    ],
    answer: "The length of the longest path between any two nodes in the tree (which may or may not pass through the root)",
    explanation: "Diameter is calculated as max(left_diameter, right_diameter, left_height + right_height + 2) in edge count."
  },
  {
    id: 21,
    question: "In C, what is the memory footprint of `struct TreeNode { int data; struct TreeNode *left, *right; }` on a 64-bit architecture?",
    options: [
      "24 bytes (4 bytes data + 4 bytes compiler padding + 8 bytes left + 8 bytes right)",
      "12 bytes (4 bytes data + 4 bytes left + 4 bytes right)",
      "16 bytes with zero padding",
      "32 bytes due to 64-bit alignment restrictions"
    ],
    answer: "24 bytes (4 bytes data + 4 bytes compiler padding + 8 bytes left + 8 bytes right)",
    explanation: "On 64-bit systems, pointer variables require 8-byte boundary alignment. The compiler inserts 4 padding bytes after `int data` (4B) so that `struct TreeNode *left` starts at an 8-byte aligned address."
  },
  {
    id: 22,
    question: "How many edges E exist in a valid binary tree containing N vertices?",
    options: [
      "E = N - 1",
      "E = N",
      "E = 2 * N",
      "E = N / 2"
    ],
    answer: "E = N - 1",
    explanation: "Every node in a tree has exactly one incoming edge from its parent, except the root node which has 0 incoming edges. Total edges = N - 1."
  },
  {
    id: 23,
    question: "What is an 'Ancestor' of a node X in a tree?",
    options: [
      "Any node located on the unique path from the Root node down to X (including parent, grandparent, etc.)",
      "Any node located in X's left or right subtrees",
      "Any node that shares the same depth as X",
      "The sibling node of X"
    ],
    answer: "Any node located on the unique path from the Root node down to X (including parent, grandparent, etc.)",
    explanation: "Node Y is an ancestor of X if and only if X is a descendant of Y (i.e. Y lies on the path from Root to X)."
  },
  {
    id: 24,
    question: "What is a 'Descendant' of a node X in a tree?",
    options: [
      "Any node reachable by following downward child edges starting from X (all nodes in X's subtrees)",
      "The direct parent of X",
      "Nodes located on level 0",
      "Nodes with degree 2"
    ],
    answer: "Any node reachable by following downward child edges starting from X (all nodes in X's subtrees)",
    explanation: "A descendant of X is any vertex that lies within the subtree rooted at X."
  },
  {
    id: 25,
    question: "Why does recursive tree height calculation `calculateHeight(root)` require Post-Order Traversal?",
    options: [
      "Because the height of a parent node cannot be determined until the heights of BOTH left and right children are calculated first (Height = 1 + max(lh, rh))",
      "Because pre-order traversal cannot allocate stack memory in C",
      "Because in-order traversal reverses child heights",
      "Because post-order traversal runs in O(1) time"
    ],
    answer: "Because the height of a parent node cannot be determined until the heights of BOTH left and right children are calculated first (Height = 1 + max(lh, rh))",
    explanation: "Computing parent height is a bottom-up aggregation: we must visit Left child, visit Right child, and then compute `1 + max(leftH, rightH)` for the current Root."
  },
  {
    id: 26,
    question: "What is the time complexity of calculating the Height of a binary tree with N nodes?",
    options: [
      "O(N) because every node in the tree must be visited once",
      "O(log N) under all circumstances",
      "O(1) using hardware prefetchers",
      "O(N^2) due to nested recursive calls"
    ],
    answer: "O(N) because every node in the tree must be visited once",
    explanation: "The recursive function `calculateHeight(root)` visits every vertex in the tree exactly once, executing constant O(1) operations per vertex, leading to strictly O(N) total time."
  },
  {
    id: 27,
    question: "What happens if a programmer frees a parent node with `free(root)` before calling `freeTree(root->left)` and `freeTree(root->right)`?",
    options: [
      "It causes Undefined Behavior and Memory Leaks because child pointers become Dangling Pointers that cannot be safely dereferenced",
      "The C runtime automatically deallocates all child nodes",
      "The operating system re-attaches the children to the root",
      "The program executes faster due to batch deallocation"
    ],
    answer: "It causes Undefined Behavior and Memory Leaks because child pointers become Dangling Pointers that cannot be safely dereferenced",
    explanation: "In C, deallocating memory invalidates its addresses. Reading `root->left` after `free(root)` is a Use-After-Free bug. Post-order deallocation is required to ensure children are freed before parent."
  },
  {
    id: 28,
    question: "What is a 'Subtree' in a binary tree?",
    options: [
      "A tree consisting of a chosen node and all of its descendants, retaining all connecting edges",
      "A collection of leaves with no root",
      "An array of integer values",
      "A disjoint set with no edges"
    ],
    answer: "A tree consisting of a chosen node and all of its descendants, retaining all connecting edges",
    explanation: "Every node in a binary tree acts as the root of its own subtree, containing all nodes that descend from it."
  },
  {
    id: 29,
    question: "How does the number of edges in a tree compare to a general graph with N vertices?",
    options: [
      "A tree with N vertices has strictly N - 1 edges (minimal connectivity), whereas a general graph can have up to N*(N - 1)/2 edges",
      "A tree always has more edges than a complete graph",
      "A tree has exactly 2N edges",
      "A tree has no edges"
    ],
    answer: "A tree with N vertices has strictly N - 1 edges (minimal connectivity), whereas a general graph can have up to N*(N - 1)/2 edges",
    explanation: "A tree is a minimally connected graph: removing any single edge disconnects the tree, and adding any single edge creates a cycle."
  },
  {
    id: 30,
    question: "Why are binary trees fundamentally important in modern systems programming and database architecture?",
    options: [
      "They provide hierarchical logarithmic O(log N) search, insertion, and deletion, powering B-Trees in databases, LSM-Trees in storage engines, and ASTs in compilers",
      "They use less electricity than arrays in CPU hardware",
      "They allow infinite data storage without RAM limits",
      "They eliminate the need for CPU instruction registers"
    ],
    answer: "They provide hierarchical logarithmic O(log N) search, insertion, and deletion, powering B-Trees in databases, LSM-Trees in storage engines, and ASTs in compilers",
    explanation: "From SQLite and PostgreSQL index B+Trees to Linux kernel Red-Black process schedulers and compiler syntax trees (ASTs), hierarchical tree data structures form the backbone of systems engineering."
  }
];

export default questions;
