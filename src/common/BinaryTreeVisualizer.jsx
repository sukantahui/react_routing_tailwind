// ============================================================================
// BinaryTreeVisualizer.jsx - Pro-Level Next-Generation BST Visualizer
// ============================================================================

import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// 1. Data Structures & Core Tree Algorithms
// ============================================================================

class TreeNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.id = `${value}-${Math.random().toString(36).substr(2, 5)}`;
  }
}

// Immutable BST Insert
const insertNode = (root, value) => {
  if (!root) return new TreeNode(value);
  if (value < root.value) {
    return new TreeNode(root.value, insertNode(root.left, value), root.right);
  } else if (value > root.value) {
    return new TreeNode(root.value, root.left, insertNode(root.right, value));
  }
  return root; // No duplicates allowed in BST
};

// Find Minimum node
const findMin = (node) => {
  while (node && node.left) node = node.left;
  return node;
};

// Find Maximum node
const findMax = (node) => {
  while (node && node.right) node = node.right;
  return node;
};

// Immutable BST Delete
const deleteNode = (root, value) => {
  if (!root) return null;
  if (value < root.value) {
    return new TreeNode(root.value, deleteNode(root.left, value), root.right);
  } else if (value > root.value) {
    return new TreeNode(root.value, root.left, deleteNode(root.right, value));
  } else {
    // Node found
    if (!root.left && !root.right) return null;
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    // Node with two children: get inorder successor
    const successor = findMin(root.right);
    return new TreeNode(
      successor.value,
      root.left,
      deleteNode(root.right, successor.value)
    );
  }
};

// Invert / Mirror Tree
const invertTree = (root) => {
  if (!root) return null;
  return new TreeNode(root.value, invertTree(root.right), invertTree(root.left));
};

// Balance Tree (convert BST &rarr; Sorted Array -> Balanced BST)
const getSortedArray = (root, arr = []) => {
  if (!root) return arr;
  getSortedArray(root.left, arr);
  arr.push(root.value);
  getSortedArray(root.right, arr);
  return arr;
};

const buildBalancedTree = (sortedArr, start = 0, end = sortedArr.length - 1) => {
  if (start > end) return null;
  const mid = Math.floor((start + end) / 2);
  const node = new TreeNode(sortedArr[mid]);
  node.left = buildBalancedTree(sortedArr, start, mid - 1);
  node.right = buildBalancedTree(sortedArr, mid + 1, end);
  return node;
};

// Tree Traversals
const getInOrder = (root, result = []) => {
  if (!root) return result;
  getInOrder(root.left, result);
  result.push(root.value);
  getInOrder(root.right, result);
  return result;
};

const getPreOrder = (root, result = []) => {
  if (!root) return result;
  result.push(root.value);
  getPreOrder(root.left, result);
  getPreOrder(root.right, result);
  return result;
};

const getPostOrder = (root, result = []) => {
  if (!root) return result;
  getPostOrder(root.left, result);
  getPostOrder(root.right, result);
  result.push(root.value);
  return result;
};

const getLevelOrder = (root) => {
  if (!root) return [];
  const result = [];
  const queue = [root];
  while (queue.length > 0) {
    const curr = queue.shift();
    result.push(curr.value);
    if (curr.left) queue.push(curr.left);
    if (curr.right) queue.push(curr.right);
  }
  return result;
};

// Metrics
const countNodes = (root) => {
  if (!root) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
};

const countLeaves = (root) => {
  if (!root) return 0;
  if (!root.left && !root.right) return 1;
  return countLeaves(root.left) + countLeaves(root.right);
};

const getTreeHeight = (root) => {
  if (!root) return 0;
  return 1 + Math.max(getTreeHeight(root.left), getTreeHeight(root.right));
};

const checkIsBalanced = (root) => {
  const check = (node) => {
    if (!node) return 0;
    const leftH = check(node.left);
    if (leftH === -1) return -1;
    const rightH = check(node.right);
    if (rightH === -1) return -1;
    if (Math.abs(leftH - rightH) > 1) return -1;
    return 1 + Math.max(leftH, rightH);
  };
  return check(root) !== -1;
};

const findLCA = (root, n1, n2) => {
  if (!root) return null;
  if (root.value > n1 && root.value > n2) return findLCA(root.left, n1, n2);
  if (root.value < n1 && root.value < n2) return findLCA(root.right, n1, n2);
  return root;
};

// Presets
const PRESETS = {
  balanced: [50, 25, 75, 12, 37, 62, 87],
  full: [40, 20, 60, 10, 30, 50, 70],
  skewedLeft: [70, 60, 50, 40, 30],
  skewedRight: [20, 30, 40, 50, 60],
  complex: [55, 33, 78, 22, 44, 66, 99, 11, 28, 38, 49, 88],
};

// Color Themes
const THEMES = {
  cyan: {
    name: "Neon Cyan",
    primary: "#06b6d4",
    accent: "#38bdf8",
    gradStart: "#0891b2",
    gradEnd: "#06b6d4",
    border: "border-cyan-500/40",
    text: "text-cyan-400",
    bgPill: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    ring: "ring-cyan-500/30",
  },
  emerald: {
    name: "Emerald Jade",
    primary: "#10b981",
    accent: "#34d399",
    gradStart: "#059669",
    gradEnd: "#10b981",
    border: "border-emerald-500/40",
    text: "text-emerald-400",
    bgPill: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    ring: "ring-emerald-500/30",
  },
  purple: {
    name: "Cosmic Purple",
    primary: "#8b5cf6",
    accent: "#a855f7",
    gradStart: "#7c3aed",
    gradEnd: "#a855f7",
    border: "border-purple-500/40",
    text: "text-purple-400",
    bgPill: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    ring: "ring-purple-500/30",
  },
  amber: {
    name: "Solar Amber",
    primary: "#f59e0b",
    accent: "#fbbf24",
    gradStart: "#d97706",
    gradEnd: "#f59e0b",
    border: "border-amber-500/40",
    text: "text-amber-400",
    bgPill: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    ring: "ring-amber-500/30",
  },
};

// ============================================================================
// 2. Comprehensive Task Rules & DSA Blueprints Dictionary
// ============================================================================

const TASK_RULES = {
  insert: {
    id: "insert",
    title: "BST Node Insertion Protocol",
    icon: "bi-plus-circle-fill",
    badge: "O(log N) Avg | O(N) Worst",
    color: "from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30",
    invariants: "For any node N: key(N.left) < key(N) < key(N.right)",
    steps: [
      { step: 1, title: "Comparison with Root", desc: "Compare target value V with current node value N.val." },
      { step: 2, title: "Branch Direction Decision", desc: "If V < N.val, navigate to left subtree. If V > N.val, navigate to right subtree." },
      { step: 3, title: "Duplicate Check", desc: "If V === N.val, insertion is rejected (standard BSTs do not allow duplicate keys)." },
      { step: 4, title: "Leaf Attachment", desc: "When a null pointer is reached, create new TreeNode(V) and attach as a leaf." },
    ],
    timeComplexity: "O(log N) average, O(N) worst-case (for skewed trees)",
    spaceComplexity: "O(h) call stack memory where h is tree height",
    keyInsight: "Node insertion always occurs as a new leaf node at the bottom of the tree.",
  },
  delete: {
    id: "delete",
    title: "BST Node Deletion (3 Structural Cases)",
    icon: "bi-dash-circle-fill",
    badge: "O(log N) Avg",
    color: "from-rose-500/20 to-orange-500/10 text-rose-400 border-rose-500/30",
    invariants: "Must preserve BST ordering property across all subtrees after deletion.",
    steps: [
      { step: 1, title: "Case 1: Leaf Node (0 Children)", desc: "Simply delete the node and set its parent pointer to null." },
      { step: 2, title: "Case 2: Single Child (1 Child)", desc: "Bypass the node by linking its parent directly to its only child (left or right)." },
      { step: 3, title: "Case 3: Two Children (2 Children)", desc: "Find In-Order Successor (smallest node in right subtree: findMin(node.right))." },
      { step: 4, title: "Value Replacement & Recursive Cleanup", desc: "Copy successor's value into current node, then delete that successor from right subtree." },
    ],
    timeComplexity: "O(h) where h is tree height (average O(log N))",
    spaceComplexity: "O(h) auxiliary recursion stack",
    keyInsight: "Using the in-order successor guarantees that all nodes in left subtree remain smaller, and all remaining nodes in right subtree remain greater.",
  },
  search: {
    id: "search",
    title: "BST Search & Binary Elimination",
    icon: "bi-search",
    badge: "Binary Elimination",
    color: "from-amber-500/20 to-yellow-500/10 text-amber-400 border-amber-500/30",
    invariants: "Each comparison eliminates half of the remaining search space.",
    steps: [
      { step: 1, title: "Start at Root", desc: "Initialize pointer at the root of the tree." },
      { step: 2, title: "Match Test", desc: "If node.value === target, search succeeds immediately (Node Found!)." },
      { step: 3, title: "Target Smaller", desc: "If target < node.value, discard entire right subtree and branch left." },
      { step: 4, title: "Target Larger", desc: "If target > node.value, discard entire left subtree and branch right." },
      { step: 5, title: "Termination", desc: "If pointer reaches null, target is guaranteed not present in the BST." },
    ],
    timeComplexity: "O(log N) best/avg, O(N) worst-case",
    spaceComplexity: "O(1) iterative / O(h) recursive",
    keyInsight: "Similar to Binary Search on sorted arrays, BST search achieves logarithmic time by halving search space at each step.",
  },
  inorder: {
    id: "inorder",
    title: "In-Order Traversal (L → Root → R)",
    icon: "bi-play-circle-fill",
    badge: "Produces Sorted Order",
    color: "from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30",
    invariants: "Visits nodes in strictly ascending non-decreasing numerical sequence.",
    steps: [
      { step: 1, title: "Traverse Left", desc: "Recursively traverse the left subtree: inOrder(node.left)." },
      { step: 2, title: "Visit Current Root", desc: "Process, print, or record current node value." },
      { step: 3, title: "Traverse Right", desc: "Recursively traverse the right subtree: inOrder(node.right)." },
    ],
    timeComplexity: "O(N) — visits each of the N nodes exactly once",
    spaceComplexity: "O(h) where h is tree height",
    keyInsight: "Fundamental for validating if a binary tree is a valid BST (the in-order sequence must be strictly sorted).",
  },
  preorder: {
    id: "preorder",
    title: "Pre-Order Traversal (Root → L → R)",
    icon: "bi-diagram-2",
    badge: "Tree Serialization",
    color: "from-sky-500/20 to-indigo-500/10 text-sky-400 border-sky-500/30",
    invariants: "Root is visited before any of its descendant subtrees.",
    steps: [
      { step: 1, title: "Visit Current Root", desc: "Process, print, or record current root node first." },
      { step: 2, title: "Traverse Left", desc: "Recursively traverse the entire left subtree: preOrder(node.left)." },
      { step: 3, title: "Traverse Right", desc: "Recursively traverse the entire right subtree: preOrder(node.right)." },
    ],
    timeComplexity: "O(N) — all nodes visited once",
    spaceComplexity: "O(h) call stack memory",
    keyInsight: "Used to create exact clones/copies of a binary tree and in prefix expression evaluations.",
  },
  postorder: {
    id: "postorder",
    title: "Post-Order Traversal (L → R → Root)",
    icon: "bi-arrow-repeat",
    badge: "Bottom-Up Processing",
    color: "from-indigo-500/20 to-purple-500/10 text-indigo-400 border-indigo-500/30",
    invariants: "Children are processed completely before their parent node.",
    steps: [
      { step: 1, title: "Traverse Left", desc: "Recursively traverse the entire left subtree: postOrder(node.left)." },
      { step: 2, title: "Traverse Right", desc: "Recursively traverse the entire right subtree: postOrder(node.right)." },
      { step: 3, title: "Visit Current Root", desc: "Process parent node after all children have finished executing." },
    ],
    timeComplexity: "O(N) — linear traversal",
    spaceComplexity: "O(h) recursion depth",
    keyInsight: "Essential for bottom-up tasks like calculating subtree sizes, heights, or deleting dynamically allocated trees.",
  },
  levelorder: {
    id: "levelorder",
    title: "Level-Order Traversal (Breadth-First Search / BFS)",
    icon: "bi-layers-fill",
    badge: "Queue Based (BFS)",
    color: "from-teal-500/20 to-emerald-500/10 text-teal-400 border-teal-500/30",
    invariants: "Visits nodes level by level from depth 0 down to maximum depth.",
    steps: [
      { step: 1, title: "Initialize Queue", desc: "Create a FIFO queue and push root node." },
      { step: 2, title: "Dequeue & Process", desc: "While queue is not empty, dequeue current node and record its value." },
      { step: 3, title: "Enqueue Children", desc: "If left child exists, push to queue; if right child exists, push to queue." },
      { step: 4, title: "Repeat", desc: "Continue until all levels of the tree have been exhausted." },
    ],
    timeComplexity: "O(N) — visits each node once",
    spaceComplexity: "O(W) where W is maximum width of tree",
    keyInsight: "Used to find shortest paths in unweighted trees/graphs and printing hierarchical tree diagrams.",
  },
  lca: {
    id: "lca",
    title: "Lowest Common Ancestor (LCA) Split Rule",
    icon: "bi-share-fill",
    badge: "O(h) Split Point",
    color: "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30",
    invariants: "The LCA is the highest node where values n1 and n2 diverge into separate subtrees.",
    steps: [
      { step: 1, title: "Both Nodes Smaller", desc: "If n1 < root.val AND n2 < root.val, LCA must lie in the left subtree (recurse left)." },
      { step: 2, title: "Both Nodes Larger", desc: "If n1 > root.val AND n2 &gt; root.val, LCA must lie in the right subtree (recurse right)." },
      { step: 3, title: "Split Point Detected", desc: "If one value is &le; root.val and other >= root.val (or root matches one of them), root is the LCA!" },
    ],
    timeComplexity: "O(h) where h is tree height (O(log N) in balanced BST)",
    spaceComplexity: "O(1) iterative / O(h) recursive",
    keyInsight: "Taking advantage of BST order allows finding LCA in O(h) without extra memory or parent pointers.",
  },
  balance: {
    id: "balance",
    title: "Tree Auto-Balancing (Sorted Array D&C)",
    icon: "bi-arrows-collapse",
    badge: "Height Minimizer",
    color: "from-cyan-500/20 to-emerald-500/10 text-cyan-400 border-cyan-500/30",
    invariants: "Produces perfectly balanced BST with height h = floor(log2 N).",
    steps: [
      { step: 1, title: "Extract Sorted Array", desc: "Perform In-Order traversal to extract elements into a sorted array in O(N)." },
      { step: 2, title: "Find Middle Element", desc: "Compute mid = (start + end)/2 and create new root from array[mid]." },
      { step: 3, title: "Recursive Subtree Construction", desc: "Recursively build left subtree from (start, mid-1) and right subtree from (mid+1, end)." },
    ],
    timeComplexity: "O(N) time to construct balanced tree from N elements",
    spaceComplexity: "O(N) auxiliary array storage",
    keyInsight: "Guarantees logarithmic height O(log N) for all future search, insert, and delete operations.",
  },
  invert: {
    id: "invert",
    title: "Tree Mirror / Inversion Protocol",
    icon: "bi-arrow-left-right",
    badge: "Pointer Swap",
    color: "from-pink-500/20 to-purple-500/10 text-pink-400 border-pink-500/30",
    invariants: "Every left subtree becomes a right subtree and vice-versa.",
    steps: [
      { step: 1, title: "Base Case Check", desc: "If current node is null, return null." },
      { step: 2, title: "Recursive Subtree Inversion", desc: "Recursively invert left subtree and invert right subtree." },
      { step: 3, title: "Pointer Swap", desc: "Swap left and right pointers: node.left = invertedRight; node.right = invertedLeft." },
    ],
    timeComplexity: "O(N) — visits all nodes",
    spaceComplexity: "O(h) call stack memory",
    keyInsight: "Classical interview problem demonstrating recursive symmetry in binary trees.",
  },
};

// ============================================================================
// 3. SVG Tree Layout Computation
// ============================================================================
const NODE_RADIUS = 24;
const LEVEL_HEIGHT = 90;
const SIBLING_SPACING = 50;
const TOP_PADDING = 50;
const EXTRA_PADDING = 60;

const computeLayout = (root) => {
  if (!root) return { positions: new Map(), nodeLevels: new Map(), width: 600, height: 350, minX: 0, maxX: 600 };

  const positions = new Map();
  const nodeLevels = new Map();
  let minX = Infinity, maxX = -Infinity;

  const recurse = (node, x, y, level = 1) => {
    if (!node) return 0;
    nodeLevels.set(node.value, level);

    const leftWidth = recurse(node.left, x, y + LEVEL_HEIGHT, level + 1);
    const rightWidth = recurse(node.right, x + leftWidth + SIBLING_SPACING, y + LEVEL_HEIGHT, level + 1);
    const totalWidth = Math.max(leftWidth + (node.left ? SIBLING_SPACING : 0) + rightWidth, NODE_RADIUS * 2);
    const nodeX = x + totalWidth / 2;

    positions.set(node, { x: nodeX, y });
    minX = Math.min(minX, nodeX - NODE_RADIUS);
    maxX = Math.max(maxX, nodeX + NODE_RADIUS);

    return totalWidth;
  };

  recurse(root, 0, TOP_PADDING, 1);

  if (!isFinite(minX)) minX = 0;
  if (!isFinite(maxX)) maxX = 600;

  const depth = getTreeHeight(root);
  const treeHeight = Math.max(depth * LEVEL_HEIGHT + TOP_PADDING + 40, 350);

  return { positions, nodeLevels, minX, maxX, height: treeHeight };
};

// ============================================================================
// 4. Main BinaryTreeVisualizer Component
// ============================================================================

const BinaryTreeVisualizer = () => {
  // Tree State
  const [root, setRoot] = useState(() => {
    let r = null;
    PRESETS.balanced.forEach((v) => {
      r = insertNode(r, v);
    });
    return r;
  });

  // Inputs
  const [inputValue, setInputValue] = useState("");
  const [batchInput, setBatchInput] = useState("");
  const [deleteInput, setDeleteInput] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [lcaInputs, setLcaInputs] = useState({ n1: "", n2: "" });

  // Status & Feedback
  const [message, setMessage] = useState({ type: "info", text: "Ready to explore Binary Search Trees" });
  const [selectedNode, setSelectedNode] = useState(null);
  const [insertedNode, setInsertedNode] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [currentTheme, setCurrentTheme] = useState("cyan");

  // Selected Rule Key for Rulebook Panel (defaults to 'insert')
  const [activeRuleKey, setActiveRuleKey] = useState("insert");
  const [showRulesPanel, setShowRulesPanel] = useState(true);

  // Traversal & Step Animation State
  const [traversalType, setTraversalType] = useState("inorder");
  const [traversalSequence, setTraversalSequence] = useState([]);
  const [activeStepIndex, setActiveStepIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(600); // ms per step
  const [activeTab, setActiveTab] = useState("operations"); // 'operations' | 'traversal' | 'analytics' | 'code'

  // Canvas View Controls
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showNodeLevels, setShowNodeLevels] = useState(true);

  // Search Trace
  const [searchPath, setSearchPath] = useState([]);
  const [searchTarget, setSearchTarget] = useState(null);

  // LCA Result
  const [lcaResult, setLcaResult] = useState(null);

  // Refs
  const svgContainerRef = useRef(null);
  const timerRef = useRef(null);

  // Calculate Layout
  const layout = useMemo(() => computeLayout(root), [root]);

  // Derived Tree Metrics
  const metrics = useMemo(() => {
    const total = countNodes(root);
    const height = getTreeHeight(root);
    const leaves = countLeaves(root);
    const balanced = checkIsBalanced(root);
    const minNode = root ? findMin(root) : null;
    const maxNode = root ? findMax(root) : null;
    const min = minNode ? minNode.value : "—";
    const max = maxNode ? maxNode.value : "—";
    return { total, height, leaves, balanced, min, max };
  }, [root]);

  // Dynamic SVG ViewBox
  const viewBox = useMemo(() => {
    const minX = isFinite(layout.minX) ? layout.minX - EXTRA_PADDING : 0;
    const spanX = isFinite(layout.maxX) && isFinite(layout.minX) ? layout.maxX - layout.minX : 600;
    const width = Math.max(spanX + 2 * EXTRA_PADDING, 600);
    const minY = TOP_PADDING - 30;
    const height = Math.max(isFinite(layout.height) ? layout.height : 350, 350);
    return `${minX} ${minY} ${width} ${height}`;
  }, [layout]);

  // Helper to show message
  const setFeedback = (text, type = "info") => {
    setMessage({ type, text });
  };

  // --------------------------------------------------------------------------
  // Tree Actions
  // --------------------------------------------------------------------------

  // Single Insert
  const handleInsert = useCallback(() => {
    setActiveRuleKey("insert");
    if (!inputValue.trim()) {
      setFeedback("Please enter a numeric value to insert", "error");
      return;
    }
    const val = parseInt(inputValue.trim(), 10);
    if (isNaN(val)) {
      setFeedback("Invalid input: Value must be a valid integer", "error");
      return;
    }

    if (getInOrder(root).includes(val)) {
      setFeedback(`Value ${val} already exists in the BST. Duplicate values are ignored.`, "warning");
      return;
    }

    setRoot((prev) => insertNode(prev, val));
    setInsertedNode(val);
    setFeedback(`Successfully inserted node ${val} into the tree.`, "success");
    setInputValue("");

    setTimeout(() => setInsertedNode(null), 1200);
  }, [inputValue, root]);

  // Batch Insert
  const handleBatchInsert = useCallback(() => {
    setActiveRuleKey("insert");
    if (!batchInput.trim()) {
      setFeedback("Please enter comma-separated numbers (e.g., 40, 20, 60, 10)", "error");
      return;
    }
    const numbers = batchInput
      .split(/[\s,]+/)
      .map((n) => parseInt(n.trim(), 10))
      .filter((n) => !isNaN(n));

    if (numbers.length === 0) {
      setFeedback("No valid numbers found in the input.", "error");
      return;
    }

    let newRoot = root;
    let addedCount = 0;
    numbers.forEach((num) => {
      const before = countNodes(newRoot);
      newRoot = insertNode(newRoot, num);
      if (countNodes(newRoot) > before) addedCount++;
    });

    setRoot(newRoot);
    setBatchInput("");
    setFeedback(`Batch inserted ${addedCount} new nodes into the BST.`, "success");
  }, [batchInput, root]);

  // Delete Node
  const handleDelete = useCallback((val) => {
    setActiveRuleKey("delete");
    if (val === null || val === undefined) return;
    if (pendingDelete) return;

    if (!getInOrder(root).includes(val)) {
      setFeedback(`Node ${val} does not exist in the tree.`, "error");
      return;
    }

    setPendingDelete(val);
    setFeedback(`Deleting node ${val}...`, "warning");

    setTimeout(() => {
      setRoot((prev) => deleteNode(prev, val));
      setPendingDelete(null);
      if (selectedNode?.value === val) setSelectedNode(null);
      setFeedback(`Node ${val} successfully removed.`, "success");
    }, 500);
  }, [root, pendingDelete, selectedNode]);

  // Step-by-Step Search
  const handleSearch = useCallback(() => {
    setActiveRuleKey("search");
    if (!searchInput.trim()) {
      setFeedback("Please enter a value to search for", "error");
      return;
    }
    const val = parseInt(searchInput.trim(), 10);
    if (isNaN(val)) {
      setFeedback("Value must be a valid integer", "error");
      return;
    }

    // Compute path
    const path = [];
    let curr = root;
    let found = false;

    while (curr) {
      path.push(curr.value);
      if (curr.value === val) {
        found = true;
        break;
      } else if (val < curr.value) {
        curr = curr.left;
      } else {
        curr = curr.right;
      }
    }

    setSearchPath(path);
    setSearchTarget(val);

    if (found) {
      setFeedback(`Found value ${val} in ${path.length} step${path.length > 1 ? "s" : ""}! Path: [ ${path.join(" → ")} ]`, "success");
    } else {
      setFeedback(`Value ${val} not found in the BST. Checked path: [ ${path.join(" → ")} → null ]`, "error");
    }
  }, [searchInput, root]);

  // Load Preset
  const handleLoadPreset = (key) => {
    let newRoot = null;
    PRESETS[key].forEach((v) => {
      newRoot = insertNode(newRoot, v);
    });
    setRoot(newRoot);
    setSearchPath([]);
    setSearchTarget(null);
    setSelectedNode(null);
    setTraversalSequence([]);
    setActiveStepIndex(-1);
    setIsPlaying(false);
    setFeedback(`Loaded ${key.replace(/([A-Z])/g, " $1")} preset tree.`, "info");
  };

  // Generate Random Tree
  const handleRandomTree = () => {
    const size = Math.floor(Math.random() * 6) + 6;
    const vals = new Set();
    while (vals.size < size) {
      vals.add(Math.floor(Math.random() * 90) + 10);
    }
    let newRoot = null;
    Array.from(vals).forEach((v) => {
      newRoot = insertNode(newRoot, v);
    });
    setRoot(newRoot);
    setSearchPath([]);
    setSearchTarget(null);
    setSelectedNode(null);
    setTraversalSequence([]);
    setActiveStepIndex(-1);
    setIsPlaying(false);
    setFeedback(`Generated random tree with ${size} nodes.`, "info");
  };

  // Balance the Tree
  const handleBalanceTree = () => {
    setActiveRuleKey("balance");
    if (!root) return;
    const sorted = getSortedArray(root);
    const balanced = buildBalancedTree(sorted);
    setRoot(balanced);
    setFeedback("Tree re-balanced into optimal O(log N) height!", "success");
  };

  // Invert Tree
  const handleInvertTree = () => {
    setActiveRuleKey("invert");
    if (!root) return;
    setRoot((prev) => invertTree(prev));
    setFeedback("Tree inverted / mirrored successfully!", "info");
  };

  // Clear Tree
  const handleClearTree = () => {
    setRoot(null);
    setSelectedNode(null);
    setSearchPath([]);
    setSearchTarget(null);
    setTraversalSequence([]);
    setActiveStepIndex(-1);
    setIsPlaying(false);
    setFeedback("Tree cleared. Canvas is empty.", "info");
  };

  // Calculate LCA
  const handleCalculateLCA = () => {
    setActiveRuleKey("lca");
    const n1 = parseInt(lcaInputs.n1, 10);
    const n2 = parseInt(lcaInputs.n2, 10);
    if (isNaN(n1) || isNaN(n2)) {
      setFeedback("Please enter two valid integer values for LCA", "error");
      return;
    }
    const lca = findLCA(root, n1, n2);
    if (lca) {
      setLcaResult(lca.value);
      setFeedback(`Lowest Common Ancestor of ${n1} and ${n2} is [ ${lca.value} ]`, "success");
    } else {
      setLcaResult(null);
      setFeedback(`Could not compute LCA for ${n1} and ${n2}`, "error");
    }
  };

  // --------------------------------------------------------------------------
  // Traversal Playback Engine
  // --------------------------------------------------------------------------

  const startTraversal = (type) => {
    if (!root) {
      setFeedback("Cannot traverse an empty tree", "error");
      return;
    }
    setTraversalType(type);
    setActiveRuleKey(type);
    let seq = [];
    if (type === "inorder") seq = getInOrder(root);
    else if (type === "preorder") seq = getPreOrder(root);
    else if (type === "postorder") seq = getPostOrder(root);
    else if (type === "levelorder") seq = getLevelOrder(root);

    setTraversalSequence(seq);
    setActiveStepIndex(0);
    setIsPlaying(true);
    setFeedback(`Started ${type.toUpperCase()} traversal: [ ${seq.join(", ")} ]`, "info");
  };

  useEffect(() => {
    if (isPlaying && traversalSequence.length > 0) {
      timerRef.current = setInterval(() => {
        setActiveStepIndex((prev) => {
          if (prev &ge; traversalSequence.length - 1) {
            setIsPlaying(false);
            clearInterval(timerRef.current);
            setFeedback(`${traversalType.toUpperCase()} traversal complete!`, "success");
            return prev;
          }
          return prev + 1;
        });
      }, animationSpeed);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, traversalSequence, animationSpeed, traversalType]);

  // Click on Node Inspector
  const handleNodeClick = (node) => {
    if (!node) return;
    const leftVal = node.left ? node.left.value : "None";
    const rightVal = node.right ? node.right.value : "None";
    const subHeight = getTreeHeight(node);
    const subSize = countNodes(node);
    const level = layout.nodeLevels.get(node.value) || 1;

    setSelectedNode({
      value: node.value,
      left: leftVal,
      right: rightVal,
      height: subHeight,
      size: subSize,
      level,
    });
  };

  const activeTheme = THEMES[currentTheme];
  const activeRule = TASK_RULES[activeRuleKey] || TASK_RULES.insert;

  return (
    <div className="w-full min-h-screen bg-[#030712] text-slate-100 p-3 sm:p-6 flex flex-col items-center selection:bg-cyan-500/30 selection:text-cyan-300">
      
      {/* Background ambient lighting */}
      <div className="fixed w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] -top-20 -left-20 pointer-events-none" />
      <div className="fixed w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] bottom-0 right-0 pointer-events-none" />

      <div className="w-full max-w-7xl relative z-10 flex flex-col gap-4">
        
        {/* =================================================================== */}
        {/* 1. PRO HEADER & ALGORITHM COMPLEXITY BAR */}
        {/* =================================================================== */}
        <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-5 sm:p-6 shadow-2xl shadow-black/60 relative overflow-hidden ring-1 ring-white/10">
          <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 absolute top-0 left-0" />

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/25">
                  <i className="bi bi-diagram-2-fill text-xl"></i>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                    Binary Search Tree Visualizer
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                      Pro Interactive Engine
                    </span>
                  </h1>
                  <p className="text-xs text-slate-400">
                    Step-by-step BST operations, traversals, path tracing, balance analysis & live rule guide
                  </p>
                </div>
              </div>
            </div>

            {/* Top Right: Rules Panel Toggle & Complexity Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => setShowRulesPanel(!showRulesPanel)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition border cursor-pointer ${
                  showRulesPanel
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-400 shadow-md shadow-cyan-500/20"
                    : "bg-slate-950 text-slate-400 border-slate-800 hover:text-white"
                }`}
              &gt;
                <i className="bi bi-journal-text text-sm"></i>
                <span>{showRulesPanel ? "Hide Rules Guide" : "Show Rules Guide"}</span>
              </button>

              <div className="px-2.5 py-1 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 font-mono">
                <span className="text-slate-500 mr-1.5">Search:</span>
                <span className="text-cyan-400 font-bold">O(log N)</span>
              </div>
              <div className="px-2.5 py-1 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 font-mono">
                <span className="text-slate-500 mr-1.5">Insert:</span>
                <span className="text-emerald-400 font-bold">O(log N)</span>
              </div>
              <div className="px-2.5 py-1 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 font-mono">
                <span className="text-slate-500 mr-1.5">Delete:</span>
                <span className="text-rose-400 font-bold">O(log N)</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 mt-4 pt-4 border-t border-slate-800/80">
            <div className="bg-slate-950/60 p-2.5 rounded-2xl border border-slate-800/60">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Total Nodes</span>
              <span className="text-base font-extrabold text-cyan-400">{metrics.total}</span>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-2xl border border-slate-800/60">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Tree Height</span>
              <span className="text-base font-extrabold text-indigo-400">{metrics.height}</span>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-2xl border border-slate-800/60">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Leaf Nodes</span>
              <span className="text-base font-extrabold text-purple-400">{metrics.leaves}</span>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-2xl border border-slate-800/60">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Is Balanced?</span>
              <span className={`text-base font-extrabold ${metrics.balanced ? "text-emerald-400" : "text-amber-400"}`}>
                {metrics.balanced ? "Yes (Optimal)" : "No (Skewed)"}
              </span>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-2xl border border-slate-800/60">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Min Value</span>
              <span className="text-base font-extrabold text-slate-200">{metrics.min}</span>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-2xl border border-slate-800/60">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Max Value</span>
              <span className="text-base font-extrabold text-slate-200">{metrics.max}</span>
            </div>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 2. DEDICATED TASK RULES & ALGORITHM BLUEPRINT PANEL */}
        {/* =================================================================== */}
        <AnimatePresence>
          {showRulesPanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="bg-slate-900/95 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-5 shadow-2xl shadow-black/60 relative ring-1 ring-cyan-500/20">
                
                {/* Rules Selector Pills */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800/80 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      Task Rules & Algorithm Blueprint:
                    </span>
                  </div>

                  {/* Task Switcher Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
                    {[
                      { key: "insert", label: "Insert Rule", icon: "bi-plus-circle" },
                      { key: "delete", label: "Delete (3 Cases)", icon: "bi-dash-circle" },
                      { key: "search", label: "Search Trace", icon: "bi-search" },
                      { key: "inorder", label: "In-Order", icon: "bi-play-circle" },
                      { key: "preorder", label: "Pre-Order", icon: "bi-diagram-2" },
                      { key: "postorder", label: "Post-Order", icon: "bi-arrow-repeat" },
                      { key: "levelorder", label: "Level-Order (BFS)", icon: "bi-layers" },
                      { key: "lca", label: "LCA Split", icon: "bi-share" },
                      { key: "balance", label: "Auto-Balance", icon: "bi-arrows-collapse" },
                      { key: "invert", label: "Mirror / Invert", icon: "bi-arrow-left-right" },
                    ].map((t) => (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setActiveRuleKey(t.key)}
                        className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-semibold whitespace-nowrap transition cursor-pointer ${
                          activeRuleKey === t.key
                            ? "bg-cyan-500 text-white shadow-sm shadow-cyan-500/30"
                            : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                        }`}
                      &gt;
                        <i className={`bi ${t.icon}`}></i>
                        <span>{t.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Rule Details Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                  
                  {/* Left Column: Rule Title & Invariant (4 cols) */}
                  <div className="lg:col-span-4 bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center text-sm">
                        <i className={`bi ${activeRule.icon}`}></i>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{activeRule.title}</h3>
                        <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20 inline-block">
                          {activeRule.badge}
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px]">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Core Invariant</span>
                      <p className="font-mono text-cyan-300">{activeRule.invariants}</p>
                    </div>

                    <div className="space-y-1 text-[11px]">
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Time Complexity:</span>
                        <span className="font-mono font-bold text-emerald-400">{activeRule.timeComplexity}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-400">
                        <span>Space Complexity:</span>
                        <span className="font-mono font-bold text-purple-400">{activeRule.spaceComplexity}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-[11px] text-slate-300">
                      <span className="text-cyan-400 font-bold block mb-0.5">💡 Key Concept:</span>
                      {activeRule.keyInsight}
                    </div>
                  </div>

                  {/* Right Column: Step-by-Step Rules (8 cols) */}
                  <div className="lg:col-span-8 space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Step-by-Step Execution Rules ({activeRule.steps.length} Steps)
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {activeRule.steps.map((s, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-950/70 p-3 rounded-2xl border border-slate-800/90 flex items-start gap-3 hover:border-slate-700 transition"
                        >
                          <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 font-extrabold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-cyan-500/30">
                            {s.step}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-white mb-0.5">{s.title}</h4>
                            <p className="text-[11px] text-slate-400 leading-relaxed">{s.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =================================================================== */}
        {/* 3. CONTROL DECK WITH TABS */}
        {/* =================================================================== */}
        <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-4 sm:p-5 shadow-xl shadow-black/50">
          
          {/* Tabs Navigation */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-2xl border border-slate-800/80 mb-4 overflow-x-auto">
            <button
              onClick={() => {
                setActiveTab("operations");
                setActiveRuleKey("insert");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === "operations"
                  ? "bg-cyan-500 text-white shadow-md shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            &gt;
              <i className="bi bi-gear-wide-connected"></i>
              <span>Tree Operations</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("traversal");
                setActiveRuleKey("inorder");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === "traversal"
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            &gt;
              <i className="bi bi-play-circle-fill"></i>
              <span>Traversal Player</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("analytics");
                setActiveRuleKey("lca");
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === "analytics"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            &gt;
              <i className="bi bi-diagram-3-fill"></i>
              <span>Algorithms & LCA</span>
            </button>

            <button
              onClick={() => setActiveTab("code")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === "code"
                  ? "bg-amber-600 text-white shadow-md shadow-amber-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            &gt;
              <i className="bi bi-code-slash"></i>
              <span>Code Implementations</span>
            </button>
          </div>

          {/* TAB 1: OPERATIONS */}
          {activeTab === "operations" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                
                {/* Insert Node */}
                <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                  <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <i className="bi bi-plus-circle-fill text-cyan-400"></i>
                    <span>Insert Single Node</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onFocus={() => setActiveRuleKey("insert")}
                      onKeyDown={(e) => e.key === "Enter" && handleInsert()}
                      placeholder="e.g. 45"
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      onClick={handleInsert}
                      className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-lg shadow-cyan-600/20 transition cursor-pointer"
                    >
                      Insert
                    </button>
                  </div>
                </div>

                {/* Delete Node */}
                <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                  <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <i className="bi bi-dash-circle-fill text-rose-400"></i>
                    <span>Delete Node by Value</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={deleteInput}
                      onChange={(e) => setDeleteInput(e.target.value)}
                      onFocus={() => setActiveRuleKey("delete")}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && deleteInput) {
                          handleDelete(parseInt(deleteInput, 10));
                          setDeleteInput("");
                        }
                      }}
                      placeholder="e.g. 25"
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                    />
                    <button
                      onClick={() => {
                        if (deleteInput) {
                          handleDelete(parseInt(deleteInput, 10));
                          setDeleteInput("");
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/20 transition cursor-pointer"
                    &gt;
                      Delete
                    </button>
                  </div>
                </div>

                {/* Search Trace */}
                <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                  <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center gap-1.5">
                    <i className="bi bi-search text-amber-400"></i>
                    <span>Search Path Trace</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onFocus={() => setActiveRuleKey("search")}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      placeholder="e.g. 75"
                      className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={handleSearch}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/20 transition cursor-pointer"
                    >
                      Trace
                    </button>
                  </div>
                </div>

              </div>

              {/* Batch Insert & Presets Bar */}
              <div className="flex flex-col md:flex-row gap-3 pt-2 border-t border-slate-800/80">
                {/* Batch insert input */}
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={batchInput}
                    onChange={(e) => setBatchInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleBatchInsert()}
                    placeholder="Batch Insert (comma-separated): 50, 30, 70, 20, 40, 60, 80"
                    className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={handleBatchInsert}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs border border-cyan-500/30 whitespace-nowrap cursor-pointer"
                  >
                    Batch Add
                  </button>
                </div>

                {/* Quick Presets */}
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  <span className="text-[11px] text-slate-500 font-bold uppercase mr-1">Presets:</span>
                  <button
                    onClick={() => handleLoadPreset("balanced")}
                    className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 whitespace-nowrap transition cursor-pointer"
                  &gt;
                    Balanced BST
                  </button>
                  <button
                    onClick={() => handleLoadPreset("complex")}
                    className="px-2.5 py-1 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 whitespace-nowrap transition cursor-pointer"
                  &gt;
                    Complex (12)
                  </button>
                  <button
                    onClick={handleRandomTree}
                    className="px-2.5 py-1 rounded-lg text-xs bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/40 whitespace-nowrap transition cursor-pointer"
                  >
                    🎲 Random
                  </button>
                  <button
                    onClick={handleClearTree}
                    className="px-2.5 py-1 rounded-lg text-xs bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 whitespace-nowrap transition cursor-pointer"
                  >
                    Clear Canvas
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TRAVERSAL PLAYER */}
          {activeTab === "traversal" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Traversal Selector Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => startTraversal("inorder")}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      traversalType === "inorder" && traversalSequence.length &gt; 0
                        ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                    }`}
                  >
                    In-Order (L-Root-R)
                  </button>

                  <button
                    onClick={() => startTraversal("preorder")}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      traversalType === "preorder" && traversalSequence.length &gt; 0
                        ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                    }`}
                  >
                    Pre-Order (Root-L-R)
                  </button>

                  <button
                    onClick={() => startTraversal("postorder")}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      traversalType === "postorder" && traversalSequence.length &gt; 0
                        ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                    }`}
                  >
                    Post-Order (L-R-Root)
                  </button>

                  <button
                    onClick={() => startTraversal("levelorder")}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                      traversalType === "levelorder" && traversalSequence.length &gt; 0
                        ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                    }`}
                  >
                    Level-Order (BFS)
                  </button>
                </div>

                {/* Playback Controls & Speed Slider */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
                    <button
                      onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                      disabled={activeStepIndex &le; 0}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-40"
                      title="Step Backward"
                    >
                      <i className="bi bi-skip-backward-fill"></i>
                    </button>
                    
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                    &gt;
                      {isPlaying ? <i className="bi bi-pause-fill"></i> : <i className="bi bi-play-fill"></i>}
                      <span className="ml-1">{isPlaying ? "Pause" : "Play"}</span>
                    </button>

                    <button
                      onClick={() => setActiveStepIndex((prev) => Math.min(traversalSequence.length - 1, prev + 1))}
                      disabled={activeStepIndex &ge; traversalSequence.length - 1}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-40"
                      title="Step Forward"
                    >
                      <i className="bi bi-skip-forward-fill"></i>
                    </button>
                  </div>

                  {/* Speed Selector */}
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <span>Speed:</span>
                    <select
                      value={animationSpeed}
                      onChange={(e) => setAnimationSpeed(Number(e.target.value))}
                      className="bg-slate-950 border border-slate-800 text-white text-xs rounded-lg px-2 py-1 focus:outline-none"
                    &gt;
                      <option value={1200}>0.5x (Slow)</option>
                      <option value={600}>1.0x (Normal)</option>
                      <option value={300}>2.0x (Fast)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Traversal Tape / Visited Array */}
              {traversalSequence.length &gt; 0 && (
                <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-400 uppercase tracking-wider">
                      {traversalType.toUpperCase()} Sequence ({activeStepIndex + 1} / {traversalSequence.length})
                    </span>
                    <span className="text-[11px] text-purple-400 font-mono">
                      Current Node: {activeStepIndex &ge; 0 ? traversalSequence[activeStepIndex] : "—"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto py-1">
                    {traversalSequence.map((val, idx) => (
                      <div
                        key={idx}
                        className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all duration-200 border ${
                          idx === activeStepIndex
                            ? "bg-purple-600 text-white border-purple-400 scale-110 shadow-lg shadow-purple-500/40 ring-2 ring-purple-400"
                            : idx < activeStepIndex
                            ? "bg-purple-950/40 text-purple-300 border-purple-800/60 opacity-80"
                            : "bg-slate-900 text-slate-500 border-slate-800"
                        }`}
                      >
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ADVANCED ALGORITHMS & LCA */}
          {activeTab === "analytics" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              
              {/* Lowest Common Ancestor (LCA) */}
              <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <i className="bi bi-share-fill text-emerald-400"></i>
                    <span>Lowest Common Ancestor (LCA)</span>
                  </span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    O(H)
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Find the shared ancestor node of any two elements in this BST.
                </p>

                <div className="flex gap-2">
                  <input
                    type="number"
                    value={lcaInputs.n1}
                    onChange={(e) => setLcaInputs({ ...lcaInputs, n1: e.target.value })}
                    onFocus={() => setActiveRuleKey("lca")}
                    placeholder="Node 1 (e.g. 12)"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  <input
                    type="number"
                    value={lcaInputs.n2}
                    onChange={(e) => setLcaInputs({ ...lcaInputs, n2: e.target.value })}
                    onFocus={() => setActiveRuleKey("lca")}
                    placeholder="Node 2 (e.g. 37)"
                    className="w-full bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={handleCalculateLCA}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 whitespace-nowrap cursor-pointer"
                  >
                    Find LCA
                  </button>
                </div>

                {lcaResult !== null && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                    🎉 Lowest Common Ancestor = <span className="text-white text-sm font-bold underline">{lcaResult}</span>
                  </div>
                )}
              </div>

              {/* Tree Optimization Tools */}
              <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800/80 space-y-3">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <i className="bi bi-magic text-cyan-400"></i>
                  <span>Structural Transformers</span>
                </span>
                <p className="text-xs text-slate-400">
                  Instantly optimize tree height or invert binary pointers.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={handleBalanceTree}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left transition group cursor-pointer"
                  >
                    <div className="text-xs font-bold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1 mb-1">
                      <i className="bi bi-arrows-collapse"></i>
                      <span>Auto-Balance Tree</span>
                    </div>
                    <p className="text-[10px] text-slate-400">Convert skewed BST into minimal height tree</p>
                  </button>

                  <button
                    onClick={handleInvertTree}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-left transition group cursor-pointer"
                  >
                    <div className="text-xs font-bold text-purple-400 group-hover:text-purple-300 flex items-center gap-1 mb-1">
                      <i className="bi bi-arrow-left-right"></i>
                      <span>Mirror / Invert Tree</span>
                    </div>
                    <p className="text-[10px] text-slate-400">Swap every left and right subtree</p>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: CODE & THEORY */}
          {activeTab === "code" && (
            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs font-mono text-slate-300 space-y-3">
              <div className="flex items-center justify-between text-slate-400">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <i className="bi bi-file-earmark-code text-cyan-400"></i>
                  <span>BST Insertion & Lookup Algorithm (C++ / Java / Python Equivalent)</span>
                </span>
              </div>
              <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 overflow-x-auto text-[11px] text-sky-300 leading-relaxed">
                <pre>{`// BST Node Lookup - O(log N) average, O(N) worst case
TreeNode* search(TreeNode* root, int key) {
    if (root == nullptr || root &rarr; val == key)
        return root;
    if (key < root->val)
        return search(root &rarr; left, key);
    return search(root-&gt;right, key);
}

// BST Node Insertion
TreeNode* insert(TreeNode* root, int key) {
    if (root == nullptr) return new TreeNode(key);
    if (key < root->val)
        root &rarr; left = insert(root-&gt;left, key);
    else if (key > root->val)
        root->right = insert(root->right, key);
    return root;
}`}</pre>
              </div>
            </div>
          )}
        </div>

        {/* =================================================================== */}
        {/* 4. INTERACTIVE CANVAS & VISUALIZER */}
        {/* =================================================================== */}
        <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-4 sm:p-6 shadow-2xl shadow-black/80 flex flex-col min-h-[460px] overflow-hidden">
          
          {/* Canvas Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80 mb-3">
            
            {/* Live Interactive Feedback Banner */}
            <div className="flex items-center gap-2 text-xs font-medium">
              <span
                className={`w-2 h-2 rounded-full ${
                  message.type === "success"
                    ? "bg-emerald-400 shadow-sm shadow-emerald-400/80"
                    : message.type === "error"
                    ? "bg-rose-400 shadow-sm shadow-rose-400/80"
                    : message.type === "warning"
                    ? "bg-amber-400 shadow-sm shadow-amber-400/80"
                    : "bg-cyan-400 shadow-sm shadow-cyan-400/80"
                }`}
              />
              <span className="text-slate-200">{message.text}</span>
            </div>

            {/* Viewport Zoom & Theme Switcher */}
            <div className="flex items-center gap-2">
              {/* Node Level Badges Toggle */}
              <button
                onClick={() => setShowNodeLevels(!showNodeLevels)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition cursor-pointer ${
                  showNodeLevels
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                    : "bg-slate-950 text-slate-400 border-slate-800"
                }`}
              &gt;
                Levels: {showNodeLevels ? "ON" : "OFF"}
              </button>

              {/* Theme Selector */}
              <select
                value={currentTheme}
                onChange={(e) => setCurrentTheme(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs text-slate-300 rounded-lg px-2 py-1 focus:outline-none"
              &gt;
                <option value="cyan">Neon Cyan</option>
                <option value="emerald">Emerald Jade</option>
                <option value="purple">Cosmic Purple</option>
                <option value="amber">Solar Amber</option>
              </select>

              {/* Zoom Buttons */}
              <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-xs">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.15))}
                  className="p-1 text-slate-400 hover:text-white"
                  title="Zoom Out"
                >
                  <i className="bi bi-zoom-out"></i>
                </button>
                <span className="text-[10px] text-slate-400 px-1 font-mono">{Math.round(zoomLevel * 100)}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(1.6, z + 0.15))}
                  className="p-1 text-slate-400 hover:text-white"
                  title="Zoom In"
                >
                  <i className="bi bi-zoom-in"></i>
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1 text-slate-400 hover:text-white text-[10px]"
                  title="Reset Zoom"
                &gt;
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* SVG Canvas Area */}
          <div
            ref={svgContainerRef}
            className="flex-1 w-full overflow-auto flex items-center justify-center p-2 rounded-2xl bg-[#020617]/90 border border-slate-950 shadow-inner min-h-[380px]"
          >
            {!root ? (
              <div className="text-center py-16 text-slate-500 space-y-2">
                <i className="bi bi-diagram-2 text-4xl block opacity-40"></i>
                <p className="text-sm font-semibold text-slate-400">Canvas is empty</p>
                <p className="text-xs text-slate-500">Insert values or click "Random Tree" above to begin visualizing</p>
              </div>
            ) : (
              <div
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: "center top",
                  transition: "transform 0.2s ease-out",
                  minWidth: "100%",
                }}
              >
                <svg
                  viewBox={viewBox}
                  className="w-full h-auto max-h-[600px] overflow-visible select-none"
                >
                  <defs>
                    <linearGradient id="treeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={activeTheme.gradStart} />
                      <stop offset="100%" stopColor={activeTheme.gradEnd} />
                    </linearGradient>

                    <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>

                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* 1. EDGES / BRANCHES */}
                  {Array.from(layout.positions.entries()).map(([node, pos]) => {
                    const isDeleting = pendingDelete === node.value;
                    if (isDeleting) return null;

                    const branches = [];

                    if (node.left && pendingDelete !== node.left.value) {
                      const childPos = layout.positions.get(node.left);
                      if (childPos) {
                        const inSearchPath =
                          searchPath.includes(node.value) && searchPath.includes(node.left.value);
                        branches.push(
                          <g key={`${node.value}-left`}>
                            <line
                              x1={pos.x}
                              y1={pos.y + NODE_RADIUS * 0.8}
                              x2={childPos.x}
                              y2={childPos.y - NODE_RADIUS * 0.8}
                              stroke={inSearchPath ? "#f59e0b" : "#334155"}
                              strokeWidth={inSearchPath ? "3.5" : "2.5"}
                              className="transition-all duration-300"
                            />
                            {/* Directional Subtitle (L) */}
                            <text
                              x={(pos.x + childPos.x) / 2 - 8}
                              y={(pos.y + childPos.y) / 2}
                              fill="#64748b"
                              fontSize="9"
                              fontWeight="bold"
                            >
                              L
                            </text>
                          </g>
                        );
                      }
                    }

                    if (node.right && pendingDelete !== node.right.value) {
                      const childPos = layout.positions.get(node.right);
                      if (childPos) {
                        const inSearchPath =
                          searchPath.includes(node.value) && searchPath.includes(node.right.value);
                        branches.push(
                          <g key={`${node.value}-right`}>
                            <line
                              x1={pos.x}
                              y1={pos.y + NODE_RADIUS * 0.8}
                              x2={childPos.x}
                              y2={childPos.y - NODE_RADIUS * 0.8}
                              stroke={inSearchPath ? "#f59e0b" : "#334155"}
                              strokeWidth={inSearchPath ? "3.5" : "2.5"}
                              className="transition-all duration-300"
                            />
                            {/* Directional Subtitle (R) */}
                            <text
                              x={(pos.x + childPos.x) / 2 + 8}
                              y={(pos.y + childPos.y) / 2}
                              fill="#64748b"
                              fontSize="9"
                              fontWeight="bold"
                            >
                              R
                            </text>
                          </g>
                        );
                      }
                    }

                    return branches;
                  })}

                  {/* 2. NODES */}
                  {Array.from(layout.positions.entries()).map(([node, pos]) => {
                    const isInserted = insertedNode === node.value;
                    const isDeleting = pendingDelete === node.value;
                    const isSelected = selectedNode?.value === node.value;
                    const isTraversalActive =
                      activeStepIndex &ge; 0 && traversalSequence[activeStepIndex] === node.value;
                    const inSearchPath = searchPath.includes(node.value);
                    const isSearchMatch = searchTarget === node.value;
                    const isLCANode = lcaResult === node.value;
                    const level = layout.nodeLevels.get(node.value) || 1;

                    return (
                      <g
                        key={node.value}
                        id={`node-${node.value}`}
                        onClick={() => handleNodeClick(node)}
                        className="cursor-pointer group"
                        style={{
                          transformOrigin: `${pos.x}px ${pos.y}px`,
                          transition: "all 0.3s ease-out",
                        }}
                      &gt;
                        {/* Outer Glow Halo for Active State */}
                        {(isTraversalActive || isSearchMatch || isLCANode || isSelected) && (
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r={NODE_RADIUS + 8}
                            fill="none"
                            stroke={
                              isTraversalActive
                                ? "#a855f7"
                                : isSearchMatch
                                ? "#10b981"
                                : isLCANode
                                ? "#10b981"
                                : "#38bdf8"
                            }
                            strokeWidth="2"
                            strokeDasharray="4 2"
                            className="animate-spin"
                            style={{ transformOrigin: `${pos.x}px ${pos.y}px`, animationDuration: "8s" }}
                          />
                        )}

                        {/* Node Main Circle */}
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={NODE_RADIUS}
                          fill={
                            isTraversalActive
                              ? "url(#activeGrad)"
                              : inSearchPath
                              ? "#d97706"
                              : isLCANode
                              ? "#059669"
                              : isSelected
                              ? "#2563eb"
                              : "url(#treeGrad)"
                          }
                          stroke={
                            isInserted || isTraversalActive || isSearchMatch
                              ? "#fbbf24"
                              : isSelected
                              ? "#93c5fd"
                              : "#1e293b"
                          }
                          strokeWidth={isSelected || isTraversalActive ? "3" : "2"}
                          filter={isTraversalActive || isSearchMatch ? "url(#glow)" : undefined}
                          className="transition-all duration-300 transform group-hover:scale-110"
                        />

                        {/* Node Value */}
                        <text
                          x={pos.x}
                          y={pos.y + 1}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="white"
                          fontSize="13"
                          fontWeight="800"
                          fontFamily="monospace"
                          className="pointer-events-none"
                        >
                          {node.value}
                        </text>

                        {/* Level / Depth Badge Tag */}
                        {showNodeLevels && (
                          <g className="pointer-events-none">
                            <rect
                              x={pos.x - 14}
                              y={pos.y + NODE_RADIUS - 4}
                              width="28"
                              height="13"
                              rx="6"
                              fill="#090d16"
                              stroke="#334155"
                              strokeWidth="1"
                            />
                            <text
                              x={pos.x}
                              y={pos.y + NODE_RADIUS + 4}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill="#94a3b8"
                              fontSize="8"
                              fontWeight="bold"
                            >
                              L{level}
                            </text>
                          </g>
                        )}

                        {/* Delete Mini Quick Action Button */}
                        {!isDeleting && (
                          <g
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(node.value);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          &gt;
                            <circle
                              cx={pos.x + NODE_RADIUS - 5}
                              cy={pos.y - NODE_RADIUS + 5}
                              r="9"
                              fill="#ef4444"
                              stroke="#0f172a"
                              strokeWidth="1.5"
                              className="hover:fill-rose-700"
                            />
                            <text
                              x={pos.x + NODE_RADIUS - 5}
                              y={pos.y - NODE_RADIUS + 5}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill="white"
                              fontSize="10"
                              fontWeight="bold"
                            >
                              ×
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* =================================================================== */}
        {/* 5. FLOATING NODE INSPECTOR MODAL */}
        {/* =================================================================== */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="fixed bottom-6 right-6 z-50 w-80 bg-slate-900/95 backdrop-blur-2xl border border-slate-700/80 rounded-2xl shadow-2xl p-4 ring-1 ring-cyan-500/30"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-xs">
                    {selectedNode.value}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">Node Inspector</h3>
                    <p className="text-[10px] text-slate-400">Level {selectedNode.level} in BST</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-slate-400 hover:text-white text-xs"
                &gt;
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Left Child</span>
                  <span className="font-mono font-bold text-cyan-300">{selectedNode.left}</span>
                </div>
                <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Right Child</span>
                  <span className="font-mono font-bold text-cyan-300">{selectedNode.right}</span>
                </div>
                <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Subtree Height</span>
                  <span className="font-bold text-purple-300">{selectedNode.height}</span>
                </div>
                <div className="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Subtree Size</span>
                  <span className="font-bold text-indigo-300">{selectedNode.size} nodes</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(selectedNode.value)}
                  className="flex-1 py-1.5 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-bold transition cursor-pointer"
                &gt;
                  Delete Node
                </button>
                <button
                  onClick={() => {
                    setSearchInput(selectedNode.value.toString());
                    handleSearch();
                  }}
                  className="flex-1 py-1.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600 text-cyan-300 hover:text-white border border-cyan-500/30 text-xs font-bold transition cursor-pointer"
                &gt;
                  Trace Path
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default BinaryTreeVisualizer;