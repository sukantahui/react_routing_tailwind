const questions = [
  {
    id: 1,
    question: "Which tree traversal algorithm on a Binary Search Tree (BST) yields elements in strictly ascending sorted order?",
    options: ["Preorder Traversal", "Inorder Traversal", "Postorder Traversal", "Level-Order Traversal"],
    answer: "Inorder Traversal",
    explanation: "Inorder traversal visits Left Subtree -> Root -> Right Subtree (LVR). By definition of a BST, this yields all keys in strictly sorted order."
  },
  {
    id: 2,
    question: "What is the worst-case time complexity for searching an element in an unbalanced Binary Search Tree of n nodes?",
    options: ["O(log n)", "O(n)", "O(1)", "O(n log n)"],
    answer: "O(n)",
    explanation: "If keys are inserted in sorted order, an unbalanced BST degrades into a linear single-chain (skewed tree) of height n, making search O(n)."
  },
  {
    id: 3,
    question: "What defining condition determines an AVL Tree?",
    options: [
      "For every node, the height difference between its left and right subtrees (Balance Factor) is at most 1 (-1, 0, +1)",
      "All leaves must be at the exact same depth",
      "Nodes must have exactly 2 children",
      "Contains no duplicate values"
    ],
    answer: "For every node, the height difference between its left and right subtrees (Balance Factor) is at most 1 (-1, 0, +1)",
    explanation: "An AVL tree is a self-balancing binary search tree where the balance factor `Balance = Height(Left) - Height(Right)` is strictly within {-1, 0, +1} for all nodes."
  },
  {
    id: 4,
    question: "Which rotation is performed in an AVL tree to fix a Left-Right (LR) imbalance?",
    options: [
      "Single Right Rotation",
      "Single Left Rotation",
      "Double Rotation: Left Rotation on Left Child, then Right Rotation on Root",
      "No rotation required"
    ],
    answer: "Double Rotation: Left Rotation on Left Child, then Right Rotation on Root",
    explanation: "An LR imbalance requires a double rotation: first a Left Rotation on the left child node, followed by a Right Rotation on the imbalanced root node."
  },
  {
    id: 5,
    question: "What is the maximum number of nodes in a full binary tree of height h (where root height = 0)?",
    options: ["2^(h+1) - 1", "2^h", "h^2", "2*h + 1"],
    answer: "2^(h+1) - 1",
    explanation: "A full binary tree of height h has `2^0 + 2^1 + ... + 2^h = 2^(h+1) - 1` total nodes."
  }
];

export default questions;
