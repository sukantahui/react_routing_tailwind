const questions = [
  {
    question: "What is the recurrence for tree traversals?",
    shortAnswer: "T(n) = T(k) + T(n-1-k) + O(1), T(0) = O(1)",
    explanation: "Each node is visited once, and each visit does constant work.",
    hint: "Visit each node once.",
    level: "basic",
    codeExample: "// T(n) = T(k) + T(n-1-k) + 1"
  },
  {
    question: "What is the time complexity of recursive tree traversals?",
    shortAnswer: "O(n) — linear time.",
    explanation: "Every node in the tree is visited exactly once.",
    hint: "Visit every node.",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of recursive tree traversals?",
    shortAnswer: "O(h) — where h is the height of the tree.",
    explanation: "The recursion stack depth equals the height of the tree.",
    hint: "Stack depth = height.",
    level: "basic",
    codeExample: "// O(h)"
  },
  {
    question: "What is the space complexity for a balanced tree?",
    shortAnswer: "O(log n) — the height is logarithmic.",
    explanation: "A balanced tree has height O(log n), so stack space is O(log n).",
    hint: "log n.",
    level: "intermediate",
    codeExample: "// O(log n)"
  },
  {
    question: "What is the space complexity for a skewed tree?",
    shortAnswer: "O(n) — the height is linear.",
    explanation: "A skewed tree has height O(n), so stack space is O(n).",
    hint: "O(n).",
    level: "intermediate",
    codeExample: "// O(n)"
  },
  {
    question: "What is the order of nodes in preorder traversal?",
    shortAnswer: "Root → Left → Right.",
    explanation: "Visit the root first, then recursively traverse the left subtree, then the right.",
    hint: "Root first.",
    level: "basic",
    codeExample: "// visit(node); preorder(left); preorder(right);"
  },
  {
    question: "What is the order of nodes in inorder traversal?",
    shortAnswer: "Left → Root → Right.",
    explanation: "Recursively traverse the left subtree, then visit the root, then the right.",
    hint: "Left, Root, Right.",
    level: "basic",
    codeExample: "// inorder(left); visit(node); inorder(right);"
  },
  {
    question: "What is the order of nodes in postorder traversal?",
    shortAnswer: "Left → Right → Root.",
    explanation: "Recursively traverse the left subtree, then the right, then visit the root.",
    hint: "Left, Right, Root.",
    level: "basic",
    codeExample: "// postorder(left); postorder(right); visit(node);"
  },
  {
    question: "What is the base case for recursive tree traversal?",
    shortAnswer: "If the node is null, return.",
    explanation: "The recursion stops when it reaches a null child.",
    hint: "null check.",
    level: "basic",
    codeExample: "// if (node == null) return;"
  },
  {
    question: "Why does tree traversal take O(n) time?",
    shortAnswer: "Because every node is visited exactly once.",
    explanation: "There are n nodes, and each node is processed in constant time.",
    hint: "Visit each node once.",
    level: "basic",
    codeExample: "// n visits"
  },
  {
    question: "Can recursive tree traversal cause a stack overflow?",
    shortAnswer: "Yes, for a very skewed tree with depth > stack size limit.",
    explanation: "A skewed tree has height O(n), which can exceed the recursion stack limit.",
    hint: "Skewed tree.",
    level: "intermediate",
    codeExample: "// StackOverflowError for large skewed trees"
  },
  {
    question: "How can you avoid stack overflow in tree traversal?",
    shortAnswer: "Use iterative traversal with an explicit stack.",
    explanation: "Iterative traversal uses a stack on the heap, which can handle larger sizes.",
    hint: "Iterative.",
    level: "intermediate",
    codeExample: "// Stack<Node> stack = new Stack<>();"
  },
  {
    question: "What is the time complexity of iterative tree traversal?",
    shortAnswer: "O(n) — same as recursive.",
    explanation: "Each node is still visited once.",
    hint: "O(n).",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of iterative tree traversal?",
    shortAnswer: "O(h) — same as recursive, but the stack is on the heap.",
    explanation: "The explicit stack still has size O(h) in the worst case.",
    hint: "O(h).",
    level: "intermediate",
    codeExample: "// O(h) space"
  },
  {
    question: "What is the height of a balanced binary tree?",
    shortAnswer: "O(log n) — where n is the number of nodes.",
    explanation: "A balanced tree has height at most log₂(n).",
    hint: "log n.",
    level: "basic",
    codeExample: "// ~log₂(n)"
  },
  {
    question: "What is the height of a skewed binary tree?",
    shortAnswer: "O(n) — linear height.",
    explanation: "A skewed tree is essentially a linked list, so height = n.",
    hint: "n.",
    level: "basic",
    codeExample: "// n"
  },
  {
    question: "What is the recurrence for tree traversal in terms of n (balanced)?",
    shortAnswer: "T(n) = 2T(n/2) + O(1) → O(n).",
    explanation: "For a balanced tree, each subtree has n/2 nodes.",
    hint: "2T(n/2) + 1.",
    level: "intermediate",
    codeExample: "// T(n) = 2T(n/2) + 1"
  },
  {
    question: "What is the recurrence for tree traversal in terms of n (skewed)?",
    shortAnswer: "T(n) = T(n-1) + O(1) → O(n).",
    explanation: "For a skewed tree, the recursion is linear.",
    hint: "T(n-1) + 1.",
    level: "intermediate",
    codeExample: "// T(n) = T(n-1) + 1"
  },
  {
    question: "What is the space complexity of tree traversal for a perfectly balanced tree?",
    shortAnswer: "O(log n) — the height is log₂(n).",
    explanation: "The recursion stack depth is the height of the tree.",
    hint: "O(log n).",
    level: "intermediate",
    codeExample: "// O(log n)"
  },
  {
    question: "What is the space complexity of tree traversal for a tree that is a linked list?",
    shortAnswer: "O(n) — the height is n.",
    explanation: "A tree that is a linked list has height n, so stack depth is n.",
    hint: "O(n).",
    level: "intermediate",
    codeExample: "// O(n)"
  },
  {
    question: "What traversal would you use to get sorted order from a BST?",
    shortAnswer: "Inorder traversal.",
    explanation: "Inorder traversal of a BST visits nodes in ascending order.",
    hint: "Inorder.",
    level: "basic",
    codeExample: "// inorder gives sorted order"
  },
  {
    question: "What traversal would you use to copy a tree?",
    shortAnswer: "Preorder traversal.",
    explanation: "Preorder visits root first, which is useful for creating a copy.",
    hint: "Preorder.",
    level: "intermediate",
    codeExample: "// preorder for copying"
  },
  {
    question: "What traversal would you use to delete a tree?",
    shortAnswer: "Postorder traversal.",
    explanation: "Postorder visits children before the parent, so you can delete children first.",
    hint: "Postorder.",
    level: "intermediate",
    codeExample: "// postorder for deletion"
  },
  {
    question: "What is the time complexity of Morris traversal?",
    shortAnswer: "O(n) — linear time, O(1) space.",
    explanation: "Morris traversal uses threaded binary trees to traverse without recursion or stack.",
    hint: "O(1) space.",
    level: "advanced",
    codeExample: "// O(n) time, O(1) space"
  },
  {
    question: "Can tree traversal be done in O(1) space recursively?",
    shortAnswer: "No, recursion inherently uses O(h) stack space.",
    explanation: "Recursive calls consume stack space proportional to the depth.",
    hint: "No.",
    level: "advanced",
    codeExample: "// recursion uses stack"
  },
  {
    question: "What is the space complexity of Morris traversal?",
    shortAnswer: "O(1) — constant space (no recursion, no stack).",
    explanation: "Morris traversal uses the tree's null pointers to traverse without extra memory.",
    hint: "O(1).",
    level: "advanced",
    codeExample: "// O(1) space"
  },
  {
    question: "What is the recurrence for the number of recursive calls in tree traversal?",
    shortAnswer: "C(n) = C(k) + C(n-1-k) + 1, C(0) = 1 → O(n).",
    explanation: "Each node causes one call (plus null checks).",
    hint: "C(n) = C(k) + C(n-1-k) + 1.",
    level: "advanced",
    codeExample: "// C(n) = C(k) + C(n-1-k) + 1"
  },
  {
    question: "What is the maximum recursion depth for inorder traversal of a skewed tree?",
    shortAnswer: "n — the height of the tree.",
    explanation: "For a skewed tree, the deepest path has n nodes.",
    hint: "n.",
    level: "intermediate",
    codeExample: "// depth = n"
  },
  {
    question: "What is the maximum recursion depth for inorder traversal of a balanced tree?",
    shortAnswer: "log₂(n) — the height of the tree.",
    explanation: "For a balanced tree, the height is logarithmic.",
    hint: "log n.",
    level: "intermediate",
    codeExample: "// depth = log₂(n)"
  },
  {
    question: "Can tree traversal be parallelized?",
    shortAnswer: "Yes, subtrees can be traversed in parallel.",
    explanation: "Left and right subtrees are independent, so they can be processed concurrently.",
    hint: "Parallel.",
    level: "advanced",
    codeExample: "// parallel traversal"
  },
  {
    question: "What is the time complexity of tree traversal with n nodes and height h?",
    shortAnswer: "O(n) — independent of height.",
    explanation: "Time is determined by the number of nodes, not the height.",
    hint: "O(n).",
    level: "basic",
    codeExample: "// O(n)"
  },
  {
    question: "What is the space complexity of tree traversal with n nodes and height h?",
    shortAnswer: "O(h) — depends on the height.",
    explanation: "The recursion stack depth is the height of the tree.",
    hint: "O(h).",
    level: "basic",
    codeExample: "// O(h)"
  }
];

export default questions;