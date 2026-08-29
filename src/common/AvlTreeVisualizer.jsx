// ============================================================================
// AvlTreeVisualizer.jsx - Pro-Level Next-Generation AVL Tree Visualizer Studio
// Self-Balancing Engine, LL/RR/LR/RL Rotations, Soothing Aesthetics & Batch Entry
// ============================================================================

import React, { useState, useCallback, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// 1. Data Structures & Core AVL Tree Algorithms
// ============================================================================

class AvlNode {
  constructor(value, left = null, right = null, height = 1) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.height = height;
    this.id = `${value}-${Math.random().toString(36).substr(2, 5)}`;
  }
}

// Deep clone
const cloneTree = (root) => {
  if (!root) return null;
  return new AvlNode(root.value, cloneTree(root.left), cloneTree(root.right), root.height);
};

// Node Height
const getNodeHeight = (node) => (node ? node.height : 0);

// Recalculate Node Height
const recalcHeight = (node) => {
  if (!node) return 0;
  return 1 + Math.max(getNodeHeight(node.left), getNodeHeight(node.right));
};

// Balance Factor = height(Left) - height(Right)
const getBalanceFactor = (node) => {
  if (!node) return 0;
  return getNodeHeight(node.left) - getNodeHeight(node.right);
};

// Right Rotation (Single LL)
const rotateRight = (y) => {
  const x = y.left;
  const T2 = x.right;

  x.right = y;
  y.left = T2;

  y.height = recalcHeight(y);
  x.height = recalcHeight(x);

  return x; // New root of subtree
};

// Left Rotation (Single RR)
const rotateLeft = (x) => {
  const y = x.right;
  const T2 = y.left;

  y.left = x;
  x.right = T2;

  x.height = recalcHeight(x);
  y.height = recalcHeight(y);

  return y; // New root of subtree
};

// Immutable AVL Insert with Auto-Balancing
const insertAvlNode = (root, value) => {
  const insertInternal = (node, val) => {
    if (!node) return new AvlNode(val);

    let newLeft = node.left;
    let newRight = node.right;

    if (val < node.value) {
      newLeft = insertInternal(node.left, val);
    } else if (val > node.value) {
      newRight = insertInternal(node.right, val);
    } else {
      return node; // Duplicate keys ignored
    }

    const newNode = new AvlNode(node.value, newLeft, newRight, node.height);
    newNode.height = recalcHeight(newNode);
    const balance = getBalanceFactor(newNode);

    // Case 1: Left Left (LL)
    if (balance > 1 && val < (newNode.left ? newNode.left.value : 0)) {
      return rotateRight(newNode);
    }

    // Case 2: Right Right (RR)
    if (balance < -1 && val > (newNode.right ? newNode.right.value : 0)) {
      return rotateLeft(newNode);
    }

    // Case 3: Left Right (LR)
    if (balance > 1 && val > (newNode.left ? newNode.left.value : 0)) {
      newNode.left = rotateLeft(newNode.left);
      return rotateRight(newNode);
    }

    // Case 4: Right Left (RL)
    if (balance < -1 && val < (newNode.right ? newNode.right.value : 0)) {
      newNode.right = rotateRight(newNode.right);
      return rotateLeft(newNode);
    }

    return newNode;
  };

  return insertInternal(cloneTree(root), value);
};

// Find Minimum node
const findMin = (node) => {
  let curr = node;
  while (curr && curr.left) curr = curr.left;
  return curr;
};

// Immutable AVL Delete with Auto-Balancing
const deleteAvlNode = (root, value) => {
  if (!root) return null;

  if (value < root.value) {
    root.left = deleteAvlNode(root.left, value);
  } else if (value > root.value) {
    root.right = deleteAvlNode(root.right, value);
  } else {
    // Node found
    if (!root.left || !root.right) {
      const temp = root.left ? root.left : root.right;
      if (!temp) {
        return null; // Leaf
      } else {
        root = temp; // One child
      }
    } else {
      // Two children: get inorder successor
      const successor = findMin(root.right);
      root.value = successor.value;
      root.right = deleteAvlNode(root.right, successor.value);
    }
  }

  if (!root) return null;

  root.height = recalcHeight(root);
  const balance = getBalanceFactor(root);

  // Rebalance after deletion
  // LL
  if (balance > 1 && getBalanceFactor(root.left) >= 0) {
    return rotateRight(root);
  }

  // LR
  if (balance > 1 && getBalanceFactor(root.left) < 0) {
    root.left = rotateLeft(root.left);
    return rotateRight(root);
  }

  // RR
  if (balance < -1 && getBalanceFactor(root.right) <= 0) {
    return rotateLeft(root);
  }

  // RL
  if (balance < -1 && getBalanceFactor(root.right) > 0) {
    root.right = rotateRight(root.right);
    return rotateLeft(root);
  }

  return root;
};

// Traversals
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
  return recalcHeight(root);
};

const checkIsStrictlyAvl = (root) => {
  const check = (node) => {
    if (!node) return { isAvl: true, height: 0 };
    const left = check(node.left);
    const right = check(node.right);

    const bf = left.height - right.height;
    const isAvl = left.isAvl && right.isAvl && Math.abs(bf) <= 1;
    const height = 1 + Math.max(left.height, right.height);

    return { isAvl, height };
  };
  return check(root).isAvl;
};

const findLCA = (root, n1, n2) => {
  if (!root) return null;
  if (root.value > n1 && root.value > n2) return findLCA(root.left, n1, n2);
  if (root.value < n1 && root.value < n2) return findLCA(root.right, n1, n2);
  return root;
};

// Presets (including rotation demonstrations)
const PRESETS = {
  balanced: { label: "Balanced AVL (7)", data: [40, 20, 60, 10, 30, 50, 70] },
  userBatch: { label: "Batch Sample (10)", data: [23, 67, 12, 45, 10, 5, 8, 37, 7, 34] },
  llTrigger: { label: "LL Rotation Trigger (3)", data: [30, 20, 10] },
  rrTrigger: { label: "RR Rotation Trigger (3)", data: [10, 20, 30] },
  lrTrigger: { label: "LR Double Rotation (3)", data: [30, 10, 20] },
  rlTrigger: { label: "RL Double Rotation (3)", data: [10, 30, 20] },
  complex: { label: "Complex AVL (12)", data: [55, 33, 78, 22, 44, 66, 99, 11, 28, 38, 49, 88] },
};

// Soothing Color Themes
const THEMES = {
  ocean: {
    name: "Serene Azure",
    nodeStart: "#1e293b",
    nodeEnd: "#0f172a",
    border: "rgba(56, 189, 248, 0.4)",
    edge: "#334155",
    activeEdge: "#38bdf8",
    halo: "#38bdf8",
    activeNodeStart: "#0284c7",
    activeNodeEnd: "#0369a1",
    accent: "text-sky-400",
  },
  sage: {
    name: "Sage & Mint",
    nodeStart: "#132a22",
    nodeEnd: "#0a1914",
    border: "rgba(52, 211, 153, 0.4)",
    edge: "#204639",
    activeEdge: "#34d399",
    halo: "#34d399",
    activeNodeStart: "#059669",
    activeNodeEnd: "#047857",
    accent: "text-emerald-400",
  },
  lavender: {
    name: "Lavender Mist",
    nodeStart: "#231f45",
    nodeEnd: "#121026",
    border: "rgba(192, 132, 252, 0.4)",
    edge: "#3b346d",
    activeEdge: "#c084fc",
    halo: "#c084fc",
    activeNodeStart: "#7c3aed",
    activeNodeEnd: "#5b21b6",
    accent: "text-purple-400",
  },
  peach: {
    name: "Rose Peach",
    nodeStart: "#2d1b22",
    nodeEnd: "#190d12",
    border: "rgba(251, 113, 133, 0.4)",
    edge: "#4a2835",
    activeEdge: "#fb7185",
    halo: "#fb7185",
    activeNodeStart: "#e11d48",
    activeNodeEnd: "#be123c",
    accent: "text-rose-400",
  },
};

// Rules Dictionary
const TASK_RULES = {
  avlInvariants: {
    title: "Strict AVL Invariant",
    badge: "Balance Factor ∈ {-1, 0, +1}",
    invariants: "For every node N: |height(N.left) - height(N.right)| ≤ 1",
    steps: [
      { step: 1, title: "BST Ordering", desc: "All left keys < root < all right keys." },
      { step: 2, title: "Height Calculation", desc: "height(node) = 1 + max(h(left), h(right))." },
      { step: 3, title: "Logarithmic Height Bound", desc: "Height is mathematically bounded: h < 1.44 log2(N)." },
    ],
    timeComplexity: "O(log N) Guaranteed for all operations",
    spaceComplexity: "O(h) Stack memory",
  },
  rotations: {
    title: "The 4 AVL Rotations",
    badge: "O(1) Restructuring",
    invariants: "Restores balance factor to 0 or ±1 in constant O(1) pointer swaps.",
    steps: [
      { step: 1, title: "LL (Single Right)", desc: "Left heavy on left child (BF = +2, child BF ≥ 0) → rotateRight(Z)." },
      { step: 2, title: "RR (Single Left)", desc: "Right heavy on right child (BF = -2, child BF ≤ 0) → rotateLeft(Z)." },
      { step: 3, title: "LR (Left-Right Double)", desc: "Left heavy with right child (BF = +2, child BF < 0) → rotateLeft(child), then rotateRight(Z)." },
      { step: 4, title: "RL (Right-Left Double)", desc: "Right heavy with left child (BF = -2, child BF > 0) → rotateRight(child), then rotateLeft(Z)." },
    ],
    timeComplexity: "O(1) time per rotation",
    spaceComplexity: "O(1) auxiliary pointers",
  },
  heightVsWeight: {
    title: "Height-Balance vs Node Count",
    badge: "Key Concept 💡",
    invariants: "AVL trees balance strictly by Subtree Height (Levels), NOT by total node count.",
    steps: [
      { step: 1, title: "Height vs Node Count", desc: "A node can have 3 nodes on Left and 1 node on Right (e.g. Left H=2 vs Right H=1)." },
      { step: 2, title: "Balance Factor Math", desc: "Difference: |Height(L) - Height(R)| = |2 - 1| = 1 ≤ 1 (Strictly Balanced!)." },
      { step: 3, title: "Guaranteed Performance", desc: "Guarantees max search depth ≤ 1.44 log2(N), avoiding unnecessary rotations." },
    ],
    timeComplexity: "O(log N) search guarantee",
    spaceComplexity: "O(1) rebalancing overhead",
  },
};

// ============================================================================
// 2. SVG Tree Layout Computation
// ============================================================================
const NODE_RADIUS = 18;
const LEVEL_HEIGHT = 70;
const SIBLING_SPACING = 30;
const TOP_PADDING = 35;
const EXTRA_PADDING = 45;

const computeLayout = (root) => {
  if (!root) return { positions: new Map(), nodeLevels: new Map(), width: 600, height: 300, minX: 0, maxX: 600 };

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
  const treeHeight = Math.max(depth * LEVEL_HEIGHT + TOP_PADDING + 30, 300);

  return { positions, nodeLevels, minX, maxX, height: treeHeight };
};

// ============================================================================
// 3. STEP GENERATORS (INSERT, ROTATIONS, DELETE, SEARCH)
// ============================================================================

const generateAnimatedAvlInsertSteps = (initialTree, val) => {
  const steps = [];
  const currentPath = [];

  steps.push({
    title: `Insert ${val}: Traversal Start`,
    tree: cloneTree(initialTree),
    activeNode: initialTree ? initialTree.value : null,
    highlightedPath: [],
    targetVal: val,
    message: `Starting AVL insertion for key ${val} at root.`,
    cCode: `AVLNode* insert(AVLNode* node, int key = ${val})`,
  });

  // Step 1: Normal BST traversal
  let curr = initialTree;
  let branchSide = null;
  let parent = null;

  while (curr) {
    currentPath.push(curr.value);

    if (val === curr.value) {
      steps.push({
        title: `Insert ${val}: Duplicate Detected`,
        tree: cloneTree(initialTree),
        activeNode: curr.value,
        highlightedPath: [...currentPath],
        targetVal: val,
        comparisonText: `Duplicate (${val}) ⚠️`,
        message: `Key ${val} already exists in the AVL Tree. Duplicates are not allowed.`,
        cCode: `if (key == node->key) return node; // Duplicate ignored`,
        isFinal: true,
      });
      return steps;
    }

    if (val < curr.value) {
      steps.push({
        title: `Insert ${val}: ${val} < ${curr.value} → Left`,
        tree: cloneTree(initialTree),
        activeNode: curr.value,
        highlightedPath: [...currentPath],
        targetVal: val,
        comparisonText: `${val} < ${curr.value}  ← Left`,
        message: `Since ${val} < ${curr.value}, navigate to LEFT subtree.`,
        cCode: `node->left = insert(node->left, ${val});`,
      });
      parent = curr;
      branchSide = "left";
      curr = curr.left;
    } else {
      steps.push({
        title: `Insert ${val}: ${val} > ${curr.value} → Right`,
        tree: cloneTree(initialTree),
        activeNode: curr.value,
        highlightedPath: [...currentPath],
        targetVal: val,
        comparisonText: `${val} > ${curr.value}  Right →`,
        message: `Since ${val} > ${curr.value}, navigate to RIGHT subtree.`,
        cCode: `node->right = insert(node->right, ${val});`,
      });
      parent = curr;
      branchSide = "right";
      curr = curr.right;
    }
  }

  // Step 2: Leaf Attached (Pre-rotation snapshot)
  // Let's create the tree without rebalancing to show the intermediate unbalance
  const insertUnbalanced = (node, v) => {
    if (!node) return new AvlNode(v);
    if (v < node.value) node.left = insertUnbalanced(node.left, v);
    else if (v > node.value) node.right = insertUnbalanced(node.right, v);
    node.height = recalcHeight(node);
    return node;
  };

  const intermediateTree = insertUnbalanced(cloneTree(initialTree), val);
  steps.push({
    title: `Insert ${val}: Attached as Leaf`,
    tree: cloneTree(intermediateTree),
    activeNode: val,
    highlightedPath: [...currentPath, val],
    targetVal: val,
    comparisonText: `Attached ✨`,
    message: `Attached new leaf TreeNode(${val}). Now backtracking ancestor path to check Balance Factors...`,
    cCode: `node->height = 1 + max(h(left), h(right));\nint balance = getBalance(node);`,
  });

  // Step 3: Check if rotation is needed
  // Check from bottom-up along path
  let unbalancedNode = null;
  let rotationType = null;

  for (let i = currentPath.length - 1; i >= 0; i--) {
    const nodeVal = currentPath[i];
    // Find node in intermediate tree
    let n = intermediateTree;
    while (n && n.value !== nodeVal) {
      n = nodeVal < n.value ? n.left : n.right;
    }
    if (n) {
      const bf = getBalanceFactor(n);
      if (Math.abs(bf) > 1) {
        unbalancedNode = n.value;
        if (bf > 1 && val < n.left.value) rotationType = "LL (Single Right)";
        else if (bf < -1 && val > n.right.value) rotationType = "RR (Single Left)";
        else if (bf > 1 && val > n.left.value) rotationType = "LR (Left-Right Double)";
        else if (bf < -1 && val < n.right.value) rotationType = "RL (Right-Left Double)";
        break;
      }
    }
  }

  if (unbalancedNode && rotationType) {
    steps.push({
      title: `⚠️ Imbalance at Node ${unbalancedNode} (BF = ${getBalanceFactor(intermediateTree) > 0 ? "+" + getBalanceFactor(intermediateTree) : getBalanceFactor(intermediateTree)})`,
      tree: cloneTree(intermediateTree),
      activeNode: unbalancedNode,
      isImbalancedNode: unbalancedNode,
      rotationType: rotationType,
      nodeBf: getBalanceFactor(intermediateTree),
      requiresBalancePrompt: true, // Auto-pause & ask for balance
      highlightedPath: [unbalancedNode],
      targetVal: val,
      comparisonText: `Imbalance (${rotationType.split(" ")[0]}) ⚡`,
      message: `Node ${unbalancedNode} is now IMBALANCED! Balancing via ${rotationType} is required.`,
      cCode: `// Imbalance detected at node ${unbalancedNode}\nreturn ${rotationType.includes("LL") ? "rotateRight" : rotationType.includes("RR") ? "rotateLeft" : rotationType.includes("LR") ? "rotateLR" : "rotateRL"}(node);`,
    });
  }

  // Step 4: Final AVL Balanced Tree
  const finalTree = insertAvlNode(initialTree, val);
  steps.push({
    title: `Insertion & Rebalance Complete`,
    tree: finalTree,
    activeNode: val,
    highlightedPath: [],
    targetVal: val,
    message: unbalancedNode
      ? `Successfully executed ${rotationType} Rotation. All Balance Factors restored to {-1, 0, +1}.`
      : `Node ${val} inserted. Tree remains balanced without rotation.`,
    cCode: `// AVL Invariant preserved. Height = ${getTreeHeight(finalTree)}`,
    isFinal: true,
  });

  return steps;
};

// Batch Insert Generator
const generateAnimatedBatchInsertSteps = (initialTree, numbers) => {
  const steps = [];
  let currentTree = cloneTree(initialTree);

  steps.push({
    title: `Start Batch Entry (${numbers.length} keys)`,
    tree: cloneTree(currentTree),
    activeNode: null,
    highlightedPath: [],
    message: `Beginning sequential AVL insertion of ${numbers.length} keys: [ ${numbers.join(", ")} ]`,
    cCode: `// Sequential AVL Batch Insert: ${numbers.length} keys`,
  });

  numbers.forEach((num, index) => {
    const singleSteps = generateAnimatedAvlInsertSteps(currentTree, num);
    singleSteps.forEach((s) => {
      steps.push({
        ...s,
        title: `[${index + 1}/${numbers.length}] ${s.title}`,
      });
    });
    currentTree = insertAvlNode(currentTree, num);
  });

  steps.push({
    title: `Batch Insertion Complete (${numbers.length} keys)`,
    tree: cloneTree(currentTree),
    activeNode: null,
    highlightedPath: [],
    message: `All ${numbers.length} elements [ ${numbers.join(", ")} ] inserted. Tree is perfectly self-balanced with height = ${getTreeHeight(currentTree)}.`,
    cCode: `// AVL Batch Complete. Nodes: ${countNodes(currentTree)}, Height: ${getTreeHeight(currentTree)}`,
    isFinal: true,
  });

  return steps;
};

// Raw BST Deletion without rebalancing (used to visualize intermediate imbalance)
const deleteBstUnbalanced = (root, val) => {
  if (!root) return null;
  let newRoot;
  if (val < root.value) {
    newRoot = new AvlNode(root.value, deleteBstUnbalanced(root.left, val), root.right);
  } else if (val > root.value) {
    newRoot = new AvlNode(root.value, root.left, deleteBstUnbalanced(root.right, val));
  } else {
    if (!root.left && !root.right) return null;
    if (!root.left) return cloneTree(root.right);
    if (!root.right) return cloneTree(root.left);
    const successor = findMin(root.right);
    newRoot = new AvlNode(successor.value, root.left, deleteBstUnbalanced(root.right, successor.value));
  }
  newRoot.height = recalcHeight(newRoot);
  return newRoot;
};

// Deletion Generator with Explicit Post-Delete Imbalance & Rebalancing Steps
const generateAnimatedAvlDeleteSteps = (initialTree, val) => {
  const steps = [];
  const currentPath = [];

  steps.push({
    title: `Locate Node ${val} for Deletion`,
    tree: cloneTree(initialTree),
    activeNode: initialTree ? initialTree.value : null,
    highlightedPath: [],
    targetVal: val,
    message: `Searching AVL tree to locate target node ${val} for deletion.`,
    cCode: `AVLNode* deleteNode(AVLNode* root, int key = ${val})`,
  });

  let curr = initialTree;
  let targetNode = null;

  while (curr) {
    currentPath.push(curr.value);
    if (curr.value === val) {
      targetNode = curr;
      break;
    }
    if (val < curr.value) {
      curr = curr.left;
    } else {
      curr = curr.right;
    }
  }

  if (!targetNode) {
    steps.push({
      title: `Node ${val} Not Found`,
      tree: cloneTree(initialTree),
      activeNode: null,
      highlightedPath: [...currentPath],
      targetVal: val,
      message: `Node ${val} does not exist in the AVL Tree. Tree remains unchanged.`,
      cCode: `if (root == NULL) return NULL;`,
      isFinal: true,
    });
    return steps;
  }

  const numChildren = (targetNode.left ? 1 : 0) + (targetNode.right ? 1 : 0);
  const caseDesc =
    numChildren === 0
      ? "Case 1: Leaf (0 Children)"
      : numChildren === 1
      ? "Case 2: Single Child"
      : "Case 3: Two Children (Inorder Successor)";

  steps.push({
    title: `Target Node ${val} Located (${caseDesc})`,
    tree: cloneTree(initialTree),
    activeNode: val,
    isTargetNode: val,
    highlightedPath: [...currentPath],
    targetVal: val,
    comparisonText: `Delete: ${val} 🗑️`,
    message: `Target node ${val} identified (${caseDesc}). Removing node from tree structure...`,
    cCode: `// Target node ${val} located. Unlinking node and updating parent...`,
  });

  // Step 2: Show Intermediate State (Node Removed, heights updated, before balancing)
  let currentTree = deleteBstUnbalanced(cloneTree(initialTree), val);

  steps.push({
    title: `Step 1: Node ${val} Unlinked (Raw Unbalanced State)`,
    tree: cloneTree(currentTree),
    activeNode: null,
    highlightedPath: [],
    targetVal: val,
    comparisonText: `Unlinked ✂️`,
    message: `Node ${val} has been removed. Now backtracking ancestor path bottom-up to inspect Balance Factors...`,
    cCode: `// Node ${val} removed. Backtracking ancestor path to check Balance Factors...`,
  });

  // Multi-step bottom-up rebalancing loop
  let stepNumber = 2;
  let rotationCount = 0;
  const appliedRotations = [];

  // Helper to find lowest/deepest imbalanced node (bottom-up postorder)
  const findDeepestImbalancedNode = (node) => {
    if (!node) return null;
    const leftRes = findDeepestImbalancedNode(node.left);
    if (leftRes) return leftRes;
    const rightRes = findDeepestImbalancedNode(node.right);
    if (rightRes) return rightRes;
    const bf = getBalanceFactor(node);
    if (Math.abs(bf) > 1) return node;
    return null;
  };

  // Helper to rotate a specific subtree rooted at targetVal
  const rotateSubtreeAtVal = (rootNode, targetVal) => {
    if (!rootNode) return null;
    if (rootNode.value === targetVal) {
      const balance = getBalanceFactor(rootNode);
      if (balance > 1 && getBalanceFactor(rootNode.left) >= 0) {
        return rotateRight(rootNode);
      }
      if (balance < -1 && getBalanceFactor(rootNode.right) <= 0) {
        return rotateLeft(rootNode);
      }
      if (balance > 1 && getBalanceFactor(rootNode.left) < 0) {
        rootNode.left = rotateLeft(rootNode.left);
        return rotateRight(rootNode);
      }
      if (balance < -1 && getBalanceFactor(rootNode.right) > 0) {
        rootNode.right = rotateRight(rootNode.right);
        return rotateLeft(rootNode);
      }
      return rootNode;
    }

    if (targetVal < rootNode.value) {
      rootNode.left = rotateSubtreeAtVal(rootNode.left, targetVal);
    } else {
      rootNode.right = rotateSubtreeAtVal(rootNode.right, targetVal);
    }
    rootNode.height = recalcHeight(rootNode);
    return rootNode;
  };

  while (true) {
    const imbalancedNode = findDeepestImbalancedNode(currentTree);
    if (!imbalancedNode) break;

    rotationCount++;
    const nodeVal = imbalancedNode.value;
    const bf = getBalanceFactor(imbalancedNode);
    let rotationType = "Rotation";
    let rotCode = "";

    if (bf > 1 && getBalanceFactor(imbalancedNode.left) >= 0) {
      rotationType = "LL (Single Right)";
      rotCode = `return rotateRight(node);`;
    } else if (bf > 1 && getBalanceFactor(imbalancedNode.left) < 0) {
      rotationType = "LR (Left-Right Double)";
      rotCode = `node->left = rotateLeft(node->left);\nreturn rotateRight(node);`;
    } else if (bf < -1 && getBalanceFactor(imbalancedNode.right) <= 0) {
      rotationType = "RR (Single Left)";
      rotCode = `return rotateLeft(node);`;
    } else if (bf < -1 && getBalanceFactor(imbalancedNode.right) > 0) {
      rotationType = "RL (Right-Left Double)";
      rotCode = `node->right = rotateRight(node->right);\nreturn rotateLeft(node);`;
    }

    appliedRotations.push({ nodeVal, rotationType });

    // Step A: Pause on this specific imbalance and ask for user confirmation
    steps.push({
      title: `Step ${stepNumber++}: ⚠️ Imbalance #${rotationCount} at Node ${nodeVal} (BF = ${bf > 0 ? "+" + bf : bf})`,
      tree: cloneTree(currentTree),
      activeNode: nodeVal,
      isImbalancedNode: nodeVal,
      rotationType: rotationType,
      nodeBf: bf,
      rotationNum: rotationCount,
      requiresBalancePrompt: true, // Auto-pause & ask for user confirmation!
      highlightedPath: [nodeVal],
      targetVal: val,
      comparisonText: `Imbalance #${rotationCount} (BF: ${bf > 0 ? "+" + bf : bf}) ⚡`,
      message: `Imbalance #${rotationCount} detected at Node ${nodeVal} (BF = ${bf > 0 ? "+" + bf : bf}). User confirmation required to start ${rotationType} Rotation.`,
      cCode: `// Imbalance #${rotationCount} at Node ${nodeVal} (|BF| = ${Math.abs(bf)} > 1)\n${rotCode}`,
    });

    // Step B: Execute this specific rotation and show resulting tree
    currentTree = rotateSubtreeAtVal(cloneTree(currentTree), nodeVal);

    steps.push({
      title: `Step ${stepNumber++}: Executed ${rotationType} at Node ${nodeVal}`,
      tree: cloneTree(currentTree),
      activeNode: nodeVal,
      highlightedPath: [nodeVal],
      targetVal: val,
      comparisonText: `Balanced #${rotationCount} 🔄`,
      message: `Executed ${rotationType} at Node ${nodeVal}. Subtree balanced. Checking remaining ancestor levels...`,
      cCode: `// Rotated Node ${nodeVal}. Recalculated heights. Inspecting parent levels...`,
    });
  }

  if (rotationCount === 0) {
    steps.push({
      title: `Step ${stepNumber++}: Ancestors Checked (All Balance Factors Valid)`,
      tree: cloneTree(currentTree),
      activeNode: null,
      highlightedPath: [],
      targetVal: val,
      comparisonText: `All BF ∈ {-1,0,1} ✅`,
      message: `All ancestor balance factors are within {-1, 0, +1}. Tree is already balanced without rotations!`,
      cCode: `// Invariants verified: All Balance Factors in {-1, 0, 1}`,
    });
  }

  // Final Step: Complete
  const finalTree = currentTree;
  steps.push({
    title: `Step ${stepNumber}: Deletion & All AVL Balancings Complete`,
    tree: cloneTree(finalTree),
    activeNode: null,
    highlightedPath: [],
    targetVal: val,
    message: rotationCount > 0
      ? `✅ Deletion complete! Executed ${rotationCount} sequential rotation${rotationCount > 1 ? "s" : ""} (${appliedRotations.map(r => `Node ${r.nodeVal}: ${r.rotationType.split(" ")[0]}`).join(", ")}). Tree height is ${getTreeHeight(finalTree)} with all |BF| ≤ 1.`
      : `✅ Deletion complete. Tree height is ${getTreeHeight(finalTree)}. AVL invariants preserved.`,
    cCode: `// Final: Strict AVL property preserved. Height = ${getTreeHeight(finalTree)} (Total rotations = ${rotationCount})`,
    isFinal: true,
  });

  return steps;
};

// Search Generator
const generateAnimatedSearchSteps = (initialTree, val) => {
  const steps = [];
  const currentPath = [];

  steps.push({
    title: "Start Search at Root",
    tree: cloneTree(initialTree),
    activeNode: initialTree ? initialTree.value : null,
    highlightedPath: [],
    targetVal: val,
    message: `Initializing O(log N) search for key ${val} at Root.`,
    cCode: `AVLNode* search(AVLNode* root, int key = ${val})`,
  });

  let curr = initialTree;
  while (curr) {
    currentPath.push(curr.value);

    if (curr.value === val) {
      steps.push({
        title: `Key ${val} Located!`,
        tree: cloneTree(initialTree),
        activeNode: curr.value,
        isSearchMatch: curr.value,
        highlightedPath: [...currentPath],
        targetVal: val,
        comparisonText: `Found ${val} 🎯`,
        message: `Success! Target key ${val} located in ${currentPath.length} step${currentPath.length > 1 ? "s" : ""}. Path: [${currentPath.join(" → ")}].`,
        cCode: `if (root->key == key) return root; // Key ${val} found!`,
        isFinal: true,
      });
      return steps;
    }

    if (val < curr.value) {
      steps.push({
        title: `Compare: ${val} < ${curr.value} → Branch Left`,
        tree: cloneTree(initialTree),
        activeNode: curr.value,
        highlightedPath: [...currentPath],
        targetVal: val,
        comparisonText: `${val} < ${curr.value}  ← Left`,
        message: `Target ${val} < ${curr.value}. Branching left.`,
        cCode: `return search(root->left, ${val});`,
      });
      curr = curr.left;
    } else {
      steps.push({
        title: `Compare: ${val} > ${curr.value} → Branch Right`,
        tree: cloneTree(initialTree),
        activeNode: curr.value,
        highlightedPath: [...currentPath],
        targetVal: val,
        comparisonText: `${val} > ${curr.value}  Right →`,
        message: `Target ${val} > ${curr.value}. Branching right.`,
        cCode: `return search(root->right, ${val});`,
      });
      curr = curr.right;
    }
  }

  steps.push({
    title: `Key ${val} Not Found`,
    tree: cloneTree(initialTree),
    activeNode: null,
    highlightedPath: [...currentPath],
    targetVal: val,
    isFailed: true,
    message: `Reached NULL pointer. Key ${val} does not exist in the AVL Tree.`,
    cCode: `if (root == NULL) return NULL; // Not found`,
    isFinal: true,
  });

  return steps;
};

// ============================================================================
// 4. Main AvlTreeVisualizer Component
// ============================================================================

const AvlTreeVisualizer = () => {
  // Tree State
  const [root, setRoot] = useState(() => {
    let r = null;
    PRESETS.balanced.data.forEach((v) => {
      r = insertAvlNode(r, v);
    });
    return r;
  });

  // Action Inputs
  const [actionVal, setActionVal] = useState("");
  const [batchVal, setBatchVal] = useState("23, 67, 12, 45, 10, 5, 8, 37, 7, 34");
  const [selectedOperation, setSelectedOperation] = useState("batch"); // "insert" | "batch" | "delete" | "search"

  // Status & Feedback
  const [feedback, setFeedback] = useState({ text: "AVL Self-Balancing Studio Ready", type: "info" });
  const [selectedNode, setSelectedNode] = useState(null);
  const [currentTheme, setCurrentTheme] = useState("ocean");

  // Secondary Drawer
  const [bottomTab, setBottomTab] = useState(null); // null | "rotations" | "traversal" | "lca" | "rules" | "code"
  const [showNodeLevels, setShowNodeLevels] = useState(true);
  const [showBalanceFactors, setShowBalanceFactors] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Traversal Player
  const [traversalType, setTraversalType] = useState("inorder");
  const [traversalSequence, setTraversalSequence] = useState([]);
  const [traversalStepIdx, setTraversalStepIdx] = useState(-1);
  const [isTraversalPlaying, setIsTraversalPlaying] = useState(false);

  // LCA Inputs
  const [lcaInputs, setLcaInputs] = useState({ n1: "", n2: "" });
  const [lcaResult, setLcaResult] = useState(null);

  // Operation Animation Engine
  const [opSteps, setOpSteps] = useState([]);
  const [opStepIdx, setOpStepIdx] = useState(0);
  const [isOpPlaying, setIsOpPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(700);
  const [showBalanceConfirmModal, setShowBalanceConfirmModal] = useState(false);

  const svgContainerRef = useRef(null);
  const traversalTimerRef = useRef(null);

  // Auto-play for Operation Steps
  useEffect(() => {
    let timer = null;
    if (isOpPlaying && opSteps.length > 0) {
      // Pause playback when reaching an imbalance state so user sees the imbalance and is asked to balance
      if (opSteps[opStepIdx]?.requiresBalancePrompt) {
        setIsOpPlaying(false);
        return;
      }
      if (opStepIdx < opSteps.length - 1) {
        timer = setTimeout(() => {
          setOpStepIdx((prev) => prev + 1);
        }, animationSpeed);
      } else {
        const lastStep = opSteps[opSteps.length - 1];
        if (lastStep && lastStep.tree) {
          setRoot(lastStep.tree);
        }
        setIsOpPlaying(false);
      }
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpPlaying, opStepIdx, opSteps, animationSpeed]);

  // Traversal effect
  useEffect(() => {
    if (isTraversalPlaying && traversalSequence.length > 0) {
      traversalTimerRef.current = setInterval(() => {
        setTraversalStepIdx((prev) => {
          if (prev >= traversalSequence.length - 1) {
            setIsTraversalPlaying(false);
            clearInterval(traversalTimerRef.current);
            setFeedback({ text: `${traversalType.toUpperCase()} traversal complete!`, type: "success" });
            return prev;
          }
          return prev + 1;
        });
      }, animationSpeed);
    } else {
      clearInterval(traversalTimerRef.current);
    }
    return () => clearInterval(traversalTimerRef.current);
  }, [isTraversalPlaying, traversalSequence, animationSpeed, traversalType]);

  // Current active step snapshot
  const currentOpStep = useMemo(() => {
    if (opSteps.length > 0 && opSteps[opStepIdx]) {
      return opSteps[opStepIdx];
    }
    return null;
  }, [opSteps, opStepIdx]);

  // Auto-trigger Confirmation Modal when reaching an imbalance step requiring user confirmation
  useEffect(() => {
    if (currentOpStep?.requiresBalancePrompt) {
      setShowBalanceConfirmModal(true);
      setIsOpPlaying(false);
    } else {
      setShowBalanceConfirmModal(false);
    }
  }, [currentOpStep]);

  // Active Tree for Layout Calculation
  const activeTreeToRender = currentOpStep?.tree || root;
  const layout = useMemo(() => computeLayout(activeTreeToRender), [activeTreeToRender]);

  // Tree Metrics
  const metrics = useMemo(() => {
    const total = countNodes(root);
    const height = getTreeHeight(root);
    const leaves = countLeaves(root);
    const isStrictAvl = checkIsStrictlyAvl(root);
    const minNode = root ? findMin(root) : null;
    return {
      total,
      height,
      leaves,
      isStrictAvl,
      min: minNode ? minNode.value : "—",
    };
  }, [root]);

  // Dynamic SVG ViewBox
  const viewBox = useMemo(() => {
    const minX = isFinite(layout.minX) ? layout.minX - EXTRA_PADDING : 0;
    const spanX = isFinite(layout.maxX) && isFinite(layout.minX) ? layout.maxX - layout.minX : 600;
    const width = Math.max(spanX + 2 * EXTRA_PADDING, 600);
    const minY = TOP_PADDING - 25;
    const height = Math.max(isFinite(layout.height) ? layout.height : 300, 300);
    return `${minX} ${minY} ${width} ${height}`;
  }, [layout]);

  const parseBatchNumbers = (text) => {
    return text
      .split(/[\s,]+/)
      .map((n) => parseInt(n.trim(), 10))
      .filter((n) => !isNaN(n));
  };

  // Operation Triggers
  const handleExecuteOperation = useCallback(() => {
    if (selectedOperation === "batch") {
      const numbers = parseBatchNumbers(batchVal);
      if (numbers.length === 0) {
        setFeedback({ text: "Please enter valid comma-separated integers", type: "error" });
        return;
      }
      const steps = generateAnimatedBatchInsertSteps(root, numbers);
      setOpSteps(steps);
      setOpStepIdx(0);
      setIsOpPlaying(true);
      setFeedback({ text: `Animating AVL batch insertion for ${numbers.length} elements...`, type: "info" });
      return;
    }

    if (!actionVal.trim()) {
      setFeedback({ text: "Please enter a numeric key", type: "error" });
      return;
    }
    const val = parseInt(actionVal.trim(), 10);
    if (isNaN(val)) {
      setFeedback({ text: "Invalid input: Please enter a valid integer", type: "error" });
      return;
    }

    if (selectedOperation === "insert") {
      const steps = generateAnimatedAvlInsertSteps(root, val);
      setOpSteps(steps);
      setOpStepIdx(0);
      setIsOpPlaying(true);
      setFeedback({ text: `Inserting node ${val} into AVL tree...`, type: "info" });
      setActionVal("");
    } else if (selectedOperation === "delete") {
      if (!getInOrder(root).includes(val)) {
        setFeedback({ text: `Node ${val} not found in tree`, type: "error" });
        return;
      }
      const steps = generateAnimatedAvlDeleteSteps(root, val);
      setOpSteps(steps);
      setOpStepIdx(0);
      setIsOpPlaying(true);
      setFeedback({ text: `Deleting node ${val} and rebalancing...`, type: "warning" });
      setActionVal("");
    } else if (selectedOperation === "search") {
      const steps = generateAnimatedSearchSteps(root, val);
      setOpSteps(steps);
      setOpStepIdx(0);
      setIsOpPlaying(true);
      setFeedback({ text: `Searching for key ${val}...`, type: "info" });
    }
  }, [actionVal, batchVal, selectedOperation, root]);

  // Instant Add
  const handleQuickInsert = () => {
    if (!actionVal.trim()) {
      setFeedback({ text: "Please enter a numeric key to insert", type: "error" });
      return;
    }
    const val = parseInt(actionVal.trim(), 10);
    if (isNaN(val)) {
      setFeedback({ text: "Invalid numeric key", type: "error" });
      return;
    }
    handleCloseOpAnimation();
    setRoot((prev) => insertAvlNode(prev, val));
    setSelectedNode(null);
    setFeedback({ text: `Instant inserted node ${val} into AVL tree`, type: "success" });
    setActionVal("");
  };

  // Instant Batch Add
  const handleQuickBatchAdd = () => {
    const numbers = parseBatchNumbers(batchVal);
    if (numbers.length === 0) {
      setFeedback({ text: "Please enter valid batch numbers", type: "error" });
      return;
    }
    handleCloseOpAnimation();
    let newRoot = root;
    numbers.forEach((n) => {
      newRoot = insertAvlNode(newRoot, n);
    });
    setRoot(newRoot);
    setSelectedNode(null);
    setFeedback({ text: `Instant added ${numbers.length} keys to AVL tree: [ ${numbers.join(", ")} ]`, type: "success" });
  };

  // Rebuild AVL from Batch
  const handleRebuildFromBatch = () => {
    const numbers = parseBatchNumbers(batchVal);
    if (numbers.length === 0) return;
    handleCloseOpAnimation();
    let newRoot = null;
    numbers.forEach((n) => {
      newRoot = insertAvlNode(newRoot, n);
    });
    setRoot(newRoot);
    setFeedback({ text: `Constructed fresh AVL tree with ${numbers.length} keys: [ ${numbers.join(", ")} ]`, type: "success" });
  };

  // Close Animation
  const handleCloseOpAnimation = () => {
    setIsOpPlaying(false);
    setShowBalanceConfirmModal(false);
    if (opSteps.length > 0) {
      const lastStep = opSteps[opSteps.length - 1];
      if (lastStep && lastStep.tree) {
        setRoot(lastStep.tree);
      }
    }
    setOpSteps([]);
    setOpStepIdx(0);
  };

  // Load Preset
  const handleLoadPreset = (key) => {
    handleCloseOpAnimation();
    let newRoot = null;
    PRESETS[key].data.forEach((v) => {
      newRoot = insertAvlNode(newRoot, v);
    });
    setRoot(newRoot);
    setSelectedNode(null);
    setFeedback({ text: `Loaded ${PRESETS[key].label} preset.`, type: "info" });
  };

  // Trigger Dedicated Rotation Demo
  const handleTriggerRotationDemo = (type) => {
    handleCloseOpAnimation();
    if (type === "LL") {
      let r = insertAvlNode(null, 30);
      r = insertAvlNode(r, 20);
      const steps = generateAnimatedAvlInsertSteps(r, 10);
      setOpSteps(steps);
      setOpStepIdx(0);
      setIsOpPlaying(true);
      setFeedback({ text: "Demonstrating Single Right Rotation (LL Imbalance)...", type: "info" });
    } else if (type === "RR") {
      let r = insertAvlNode(null, 10);
      r = insertAvlNode(r, 20);
      const steps = generateAnimatedAvlInsertSteps(r, 30);
      setOpSteps(steps);
      setOpStepIdx(0);
      setIsOpPlaying(true);
      setFeedback({ text: "Demonstrating Single Left Rotation (RR Imbalance)...", type: "info" });
    } else if (type === "LR") {
      let r = insertAvlNode(null, 30);
      r = insertAvlNode(r, 10);
      const steps = generateAnimatedAvlInsertSteps(r, 20);
      setOpSteps(steps);
      setOpStepIdx(0);
      setIsOpPlaying(true);
      setFeedback({ text: "Demonstrating Left-Right Double Rotation (LR Imbalance)...", type: "info" });
    } else if (type === "RL") {
      let r = insertAvlNode(null, 10);
      r = insertAvlNode(r, 30);
      const steps = generateAnimatedAvlInsertSteps(r, 20);
      setOpSteps(steps);
      setOpStepIdx(0);
      setIsOpPlaying(true);
      setFeedback({ text: "Demonstrating Right-Left Double Rotation (RL Imbalance)...", type: "info" });
    }
  };

  const handleRandomTree = () => {
    handleCloseOpAnimation();
    const size = Math.floor(Math.random() * 5) + 6;
    const vals = new Set();
    while (vals.size < size) {
      vals.add(Math.floor(Math.random() * 85) + 10);
    }
    let newRoot = null;
    Array.from(vals).forEach((v) => {
      newRoot = insertAvlNode(newRoot, v);
    });
    setRoot(newRoot);
    setSelectedNode(null);
    setFeedback({ text: `Generated self-balancing AVL tree with ${size} nodes.`, type: "info" });
  };

  const handleClearTree = () => {
    handleCloseOpAnimation();
    setRoot(null);
    setSelectedNode(null);
    setTraversalSequence([]);
    setTraversalStepIdx(-1);
    setFeedback({ text: "AVL canvas cleared.", type: "info" });
  };

  // Traversal
  const handleStartTraversal = (type) => {
    if (!root) {
      setFeedback({ text: "Tree is empty.", type: "error" });
      return;
    }
    handleCloseOpAnimation();
    setTraversalType(type);
    let seq = [];
    if (type === "inorder") seq = getInOrder(root);
    else if (type === "preorder") seq = getPreOrder(root);
    else if (type === "postorder") seq = getPostOrder(root);
    else if (type === "levelorder") seq = getLevelOrder(root);

    setTraversalSequence(seq);
    setTraversalStepIdx(0);
    setIsTraversalPlaying(true);
    setFeedback({ text: `Traversing ${type.toUpperCase()}: [ ${seq.join(", ")} ]`, type: "info" });
  };

  // Node Inspector Click
  const handleNodeClick = (node) => {
    if (!node) return;
    const leftH = node.left ? getNodeHeight(node.left) : 0;
    const rightH = node.right ? getNodeHeight(node.right) : 0;
    const leftCnt = node.left ? countNodes(node.left) : 0;
    const rightCnt = node.right ? countNodes(node.right) : 0;
    const bf = leftH - rightH;

    setSelectedNode({
      value: node.value,
      left: node.left ? node.left.value : "None",
      right: node.right ? node.right.value : "None",
      height: getNodeHeight(node),
      leftHeight: leftH,
      rightHeight: rightH,
      leftCount: leftCnt,
      rightCount: rightCnt,
      bf,
      size: countNodes(node),
      level: layout.nodeLevels.get(node.value) || 1,
    });
  };

  const activeTheme = THEMES[currentTheme];

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 p-3 sm:p-5 flex flex-col items-center selection:bg-sky-500/25 selection:text-sky-300">
      
      {/* Ambient background glow */}
      <div className="fixed w-[650px] h-[650px] bg-emerald-950/15 rounded-full blur-[160px] -top-24 -left-24 pointer-events-none" />
      <div className="fixed w-[550px] h-[550px] bg-sky-950/20 rounded-full blur-[160px] bottom-0 right-0 pointer-events-none" />

      <div className="w-full max-w-6xl relative z-10 flex flex-col gap-3">
        
        {/* =================================================================== */}
        {/* 1. TOP HEADER & METRICS */}
        {/* =================================================================== */}
        <header className="bg-slate-900/60 backdrop-blur-2xl border border-slate-800/80 rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 shadow-xl flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500/80 via-teal-600/70 to-sky-600/80 flex items-center justify-center text-white shadow-lg shadow-emerald-500/15 border border-emerald-400/20">
              <i className="bi bi-share text-lg"></i>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight flex items-center gap-2">
                AVL Tree Studio
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  Self-Balancing
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Strict $O(\log N)$ guarantee, automatic LL/RR/LR/RL rotations &amp; live balance factors
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-300 font-mono text-[11px]">
              <span className="text-slate-400">Nodes:</span>
              <span className="text-emerald-300 font-semibold">{metrics.total}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-300 font-mono text-[11px]">
              <span className="text-slate-400">Height:</span>
              <span className="text-sky-300 font-semibold">{metrics.height}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-300 font-mono text-[11px]">
              <span className="text-slate-400">Strict AVL:</span>
              <span className={`font-semibold ${metrics.isStrictAvl ? "text-emerald-300" : "text-rose-400"}`}>
                {metrics.isStrictAvl ? "Valid (BF ≤ 1)" : "Imbalanced"}
              </span>
            </div>

            {/* Theme Selector */}
            <div className="flex items-center gap-1 bg-slate-950/60 border border-slate-800/80 rounded-xl px-2 py-1">
              <span className="text-[10px] text-slate-400">🎨</span>
              <select
                value={currentTheme}
                onChange={(e) => setCurrentTheme(e.target.value)}
                className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value="ocean" className="bg-slate-900">Serene Azure</option>
                <option value="sage" className="bg-slate-900">Sage &amp; Mint</option>
                <option value="lavender" className="bg-slate-900">Lavender Mist</option>
                <option value="peach" className="bg-slate-900">Rose Peach</option>
              </select>
            </div>
          </div>
        </header>

        {/* =================================================================== */}
        {/* 2. STUDIO ACTION DOCK (SLICK & STRICT SINGLE ROW) */}
        {/* =================================================================== */}
        <div className="bg-slate-900/80 backdrop-blur-2xl border border-slate-800/90 rounded-2xl px-3 py-2 shadow-xl shadow-black/40 ring-1 ring-white/5 flex items-center justify-between gap-2.5 overflow-x-auto">
          
          {/* Left Wing: Mode Selector + Input + Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Segmented Mode Selector */}
            <div className="inline-flex items-center bg-slate-950/90 p-0.5 rounded-xl border border-slate-800/90 shadow-inner shrink-0">
              <button
                onClick={() => setSelectedOperation("batch")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  selectedOperation === "batch"
                    ? "bg-emerald-500/25 text-emerald-200 border border-emerald-400/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <i className="bi bi-stack text-[11px]"></i>
                <span>Batch</span>
              </button>
              <button
                onClick={() => setSelectedOperation("insert")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  selectedOperation === "insert"
                    ? "bg-sky-500/25 text-sky-200 border border-sky-400/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <i className="bi bi-plus-circle text-[11px]"></i>
                <span>Insert</span>
              </button>
              <button
                onClick={() => setSelectedOperation("delete")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  selectedOperation === "delete"
                    ? "bg-rose-500/25 text-rose-200 border border-rose-400/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <i className="bi bi-dash-circle text-[11px]"></i>
                <span>Delete</span>
              </button>
              <button
                onClick={() => setSelectedOperation("search")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  selectedOperation === "search"
                    ? "bg-amber-500/25 text-amber-200 border border-amber-400/40 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <i className="bi bi-search text-[11px]"></i>
                <span>Search</span>
              </button>
            </div>

            {/* Input & Action Buttons in strict single line */}
            {selectedOperation === "batch" ? (
              <div className="flex items-center gap-1.5 shrink-0">
                <input
                  type="text"
                  value={batchVal}
                  onChange={(e) => setBatchVal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleExecuteOperation()}
                  placeholder="23, 67, 12, 45, 10, 5, 8, 37, 7, 34"
                  className="w-44 sm:w-56 bg-slate-950/90 border border-slate-700/60 rounded-xl px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/70 font-mono transition"
                />

                <button
                  onClick={() => setBatchVal("23, 67, 12, 45, 10, 5, 8, 37, 7, 34")}
                  className="px-2 py-1 rounded-xl text-xs bg-slate-800/80 hover:bg-slate-700 text-emerald-300 border border-slate-700/60 transition cursor-pointer shrink-0"
                  title="Fill sample batch"
                >
                  Sample ✨
                </button>

                <button
                  onClick={handleExecuteOperation}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-md shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>▶️</span>
                  <span>Animate</span>
                </button>

                <button
                  onClick={handleQuickBatchAdd}
                  className="px-2.5 py-1 rounded-xl text-xs bg-slate-800/90 hover:bg-slate-750 text-slate-200 font-medium border border-slate-700/60 transition cursor-pointer shrink-0"
                >
                  Instant
                </button>

                <button
                  onClick={handleRebuildFromBatch}
                  className="px-2 py-1 rounded-xl text-xs bg-teal-900/40 hover:bg-teal-800/60 text-teal-300 font-medium border border-teal-700/50 transition cursor-pointer shrink-0"
                >
                  🌱 Rebuild
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 shrink-0">
                <input
                  type="number"
                  value={actionVal}
                  onChange={(e) => setActionVal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleExecuteOperation()}
                  placeholder={selectedOperation === "insert" ? "Key..." : selectedOperation === "delete" ? "Key..." : "Key..."}
                  className="w-24 sm:w-28 bg-slate-950/90 border border-slate-700/60 rounded-xl px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/70 font-mono transition"
                />

                <button
                  onClick={handleExecuteOperation}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-md shrink-0 ${
                    selectedOperation === "insert"
                      ? "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-sky-500/25"
                      : selectedOperation === "delete"
                      ? "bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white shadow-rose-500/25"
                      : "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white shadow-amber-500/25"
                  }`}
                >
                  <span>▶️</span>
                  <span>Animate</span>
                </button>

                {selectedOperation === "insert" && (
                  <button
                    onClick={handleQuickInsert}
                    className="px-2.5 py-1 rounded-xl text-xs bg-slate-800/90 hover:bg-slate-750 text-slate-300 font-medium border border-slate-700/60 transition cursor-pointer shrink-0"
                  >
                    Instant
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Center Divider */}
          <div className="hidden xl:block w-[1px] h-5 bg-slate-800/80 shrink-0" />

          {/* Right Wing: Presets & Utility Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <select
              onChange={(e) => {
                if (e.target.value) handleLoadPreset(e.target.value);
              }}
              defaultValue=""
              className="bg-slate-950/90 border border-slate-800/90 text-xs text-slate-300 rounded-xl px-2.5 py-1 focus:outline-none cursor-pointer hover:border-slate-700 transition"
            >
              <option value="" disabled>🌲 Presets</option>
              <option value="balanced" className="bg-slate-900">Balanced AVL (7)</option>
              <option value="userBatch" className="bg-slate-900">Batch Sample (10)</option>
              <option value="llTrigger" className="bg-slate-900">LL Rotation (3)</option>
              <option value="rrTrigger" className="bg-slate-900">RR Rotation (3)</option>
              <option value="lrTrigger" className="bg-slate-900">LR Double Rotation (3)</option>
              <option value="rlTrigger" className="bg-slate-900">RL Double Rotation (3)</option>
              <option value="complex" className="bg-slate-900">Complex AVL (12)</option>
            </select>

            <button
              onClick={handleRandomTree}
              className="px-2.5 py-1 rounded-xl text-xs bg-slate-950/90 hover:bg-slate-800 text-slate-300 border border-slate-800/90 transition cursor-pointer flex items-center gap-1"
              title="Generate random AVL tree"
            >
              <span>🎲</span>
              <span>Random</span>
            </button>

            <button
              onClick={handleClearTree}
              className="px-2.5 py-1 rounded-xl text-xs bg-rose-950/30 hover:bg-rose-900/50 text-rose-300 border border-rose-800/40 transition cursor-pointer flex items-center gap-1"
              title="Clear Canvas"
            >
              <span>🧹</span>
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* =================================================================== */}
        {/* 3. STEP ANIMATION PLAYBACK CONTROLLER */}
        {/* =================================================================== */}
        <AnimatePresence>
          {opSteps.length > 0 && currentOpStep && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-3 shadow-xl backdrop-blur-xl space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950/70 px-2 py-0.5 rounded-lg border border-emerald-800/50">
                    Step {opStepIdx + 1}/{opSteps.length}
                  </span>
                  <span className="text-xs font-semibold text-slate-100">
                    {currentOpStep.title}
                  </span>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => opStepIdx > 0 && setOpStepIdx((p) => p - 1)}
                    disabled={opStepIdx === 0}
                    className="px-2 py-1 text-xs rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition cursor-pointer"
                  >
                    ⏮️ Prev
                  </button>

                  <button
                    onClick={() => setIsOpPlaying(!isOpPlaying)}
                    className={`px-3 py-1 text-xs font-semibold rounded-lg transition cursor-pointer ${
                      isOpPlaying ? "bg-amber-500 text-slate-950" : "bg-emerald-500 text-slate-950"
                    }`}
                  >
                    {isOpPlaying ? "⏸️ Pause" : "▶️ Play"}
                  </button>

                  <button
                    onClick={() => {
                      if (opStepIdx < opSteps.length - 1) {
                        const next = opStepIdx + 1;
                        setOpStepIdx(next);
                        if (next === opSteps.length - 1 && opSteps[next].tree) setRoot(opSteps[next].tree);
                      }
                    }}
                    disabled={opStepIdx === opSteps.length - 1}
                    className="px-2 py-1 text-xs rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition cursor-pointer"
                  >
                    Next ⏭️
                  </button>

                  <button
                    onClick={handleCloseOpAnimation}
                    className="px-2 py-1 text-xs rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition cursor-pointer ml-1"
                  >
                    Done ✕
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-950/80 rounded-full h-1 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 h-1 transition-all duration-300"
                  style={{ width: `${((opStepIdx + 1) / opSteps.length) * 100}%` }}
                />
              </div>

              {/* Interactive Balance Prompt Banner when Imbalance occurs */}
              {currentOpStep.requiresBalancePrompt && (
                <div className="bg-rose-950/85 border-2 border-rose-500 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-lg shadow-rose-500/25">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-500/30 border border-rose-400/50 flex items-center justify-center text-rose-300 font-bold text-lg animate-bounce">
                      ⚠️
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-rose-200 flex items-center gap-2">
                        Tree is NOT Balanced at Node {currentOpStep.isImbalancedNode} (BF: {currentOpStep.nodeBf > 0 ? `+${currentOpStep.nodeBf}` : currentOpStep.nodeBf})
                        <span className="text-[10px] bg-rose-500/30 text-rose-200 px-2 py-0.5 rounded-full border border-rose-400/30 font-mono">
                          Balancing Required
                        </span>
                      </h4>
                      <p className="text-[11px] text-rose-300/90 font-medium">
                        AVL property violated (|BF| &gt; 1). Ready to execute <b>{currentOpStep.rotationType} Rotation</b>.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (opStepIdx < opSteps.length - 1) {
                        const next = opStepIdx + 1;
                        setOpStepIdx(next);
                        setIsOpPlaying(true);
                      }
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-400 hover:to-pink-400 text-white shadow-lg shadow-rose-500/30 flex items-center gap-2 cursor-pointer transition transform hover:scale-105 active:scale-95"
                  >
                    <span>🔄</span>
                    <span>Balance Now ({currentOpStep.rotationType?.split(" ")[0] || "Rotate"})</span>
                  </button>
                </div>
              )}

              {/* Description message */}
              <div className="flex items-center justify-between text-[11px] font-mono bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800/60">
                <span className="text-emerald-200">💡 {currentOpStep.message}</span>
                <span className="text-sky-300 hidden sm:inline">{currentOpStep.cCode.split("\n")[0]}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =================================================================== */}
        {/* 4. MAIN 2D SVG TREE CANVAS WITH BALANCE FACTORS */}
        {/* =================================================================== */}
        <main className="relative bg-[#080d19]/90 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col min-h-[430px] overflow-hidden ring-1 ring-white/5">
          
          {/* Canvas Top Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-3 text-xs">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  feedback.type === "success"
                    ? "bg-emerald-400 shadow-sm shadow-emerald-400/80"
                    : feedback.type === "error"
                    ? "bg-rose-400 shadow-sm shadow-rose-400/80"
                    : feedback.type === "warning"
                    ? "bg-amber-400 shadow-sm shadow-amber-400/80"
                    : "bg-emerald-400 shadow-sm shadow-emerald-400/80"
                }`}
              />
              <span className="text-slate-300 text-[11px] font-medium">{feedback.text}</span>
            </div>

            {/* Badges Toggles & Zoom */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowBalanceFactors(!showBalanceFactors)}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-medium border transition cursor-pointer ${
                  showBalanceFactors ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" : "bg-slate-950/80 text-slate-500 border-slate-800/80"
                }`}
              >
                BF Badges {showBalanceFactors ? "ON" : "OFF"}
              </button>

              <button
                onClick={() => setShowNodeLevels(!showNodeLevels)}
                className={`px-2 py-0.5 rounded-lg text-[11px] font-medium border transition cursor-pointer ${
                  showNodeLevels ? "bg-sky-500/15 text-sky-300 border-sky-500/30" : "bg-slate-950/80 text-slate-500 border-slate-800/80"
                }`}
              >
                Levels {showNodeLevels ? "ON" : "OFF"}
              </button>

              <div className="flex items-center gap-1 bg-slate-950/80 p-0.5 rounded-lg border border-slate-800/80 text-xs">
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
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* SVG Tree */}
          <div
            ref={svgContainerRef}
            className="flex-1 w-full overflow-auto flex items-center justify-center p-2 rounded-2xl min-h-[350px]"
          >
            {!root ? (
              <div className="text-center py-16 text-slate-500 space-y-2">
                <i className="bi bi-share text-4xl block opacity-25"></i>
                <p className="text-sm font-medium text-slate-400">AVL Tree is empty</p>
                <p className="text-xs text-slate-500">Insert values or click "Sample" above to begin visualizing</p>
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
                  className="w-full h-auto max-h-[560px] overflow-visible select-none"
                >
                  <defs>
                    <linearGradient id="avlNodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={activeTheme.nodeStart} />
                      <stop offset="100%" stopColor={activeTheme.nodeEnd} />
                    </linearGradient>

                    <linearGradient id="avlActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={activeTheme.activeNodeStart} />
                      <stop offset="100%" stopColor={activeTheme.activeNodeEnd} />
                    </linearGradient>

                    <linearGradient id="avlMatchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>

                    <linearGradient id="avlImbalanceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9f1239" />
                      <stop offset="100%" stopColor="#881337" />
                    </linearGradient>

                    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.5" />
                    </filter>
                  </defs>

                  {/* 1. EDGES / BRANCHES */}
                  {Array.from(layout.positions.entries()).map(([node, pos]) => {
                    const branches = [];

                    if (node.left) {
                      const childPos = layout.positions.get(node.left);
                      if (childPos) {
                        const inOpPath =
                          currentOpStep?.highlightedPath?.includes(node.value) &&
                          currentOpStep?.highlightedPath?.includes(node.left.value);

                        branches.push(
                          <g key={`${node.value}-left`}>
                            <line
                              x1={pos.x}
                              y1={pos.y + NODE_RADIUS * 0.82}
                              x2={childPos.x}
                              y2={childPos.y - NODE_RADIUS * 0.82}
                              stroke={inOpPath ? activeTheme.activeEdge : activeTheme.edge}
                              strokeWidth={inOpPath ? "2.5" : "1.75"}
                              strokeDasharray={inOpPath ? "6 3" : undefined}
                              className="transition-all duration-300"
                            />
                            <text
                              x={(pos.x + childPos.x) / 2 - 7}
                              y={(pos.y + childPos.y) / 2}
                              fill={inOpPath ? activeTheme.activeEdge : "#475569"}
                              fontSize="7.5"
                              fontWeight="600"
                              fontFamily="system-ui, sans-serif"
                            >
                              L
                            </text>
                          </g>
                        );
                      }
                    }

                    if (node.right) {
                      const childPos = layout.positions.get(node.right);
                      if (childPos) {
                        const inOpPath =
                          currentOpStep?.highlightedPath?.includes(node.value) &&
                          currentOpStep?.highlightedPath?.includes(node.right.value);

                        branches.push(
                          <g key={`${node.value}-right`}>
                            <line
                              x1={pos.x}
                              y1={pos.y + NODE_RADIUS * 0.82}
                              x2={childPos.x}
                              y2={childPos.y - NODE_RADIUS * 0.82}
                              stroke={inOpPath ? activeTheme.activeEdge : activeTheme.edge}
                              strokeWidth={inOpPath ? "2.5" : "1.75"}
                              strokeDasharray={inOpPath ? "6 3" : undefined}
                              className="transition-all duration-300"
                            />
                            <text
                              x={(pos.x + childPos.x) / 2 + 7}
                              y={(pos.y + childPos.y) / 2}
                              fill={inOpPath ? activeTheme.activeEdge : "#475569"}
                              fontSize="7.5"
                              fontWeight="600"
                              fontFamily="system-ui, sans-serif"
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
                    const isSelected = selectedNode?.value === node.value;
                    const isTraversalActive =
                      traversalStepIdx >= 0 && traversalSequence[traversalStepIdx] === node.value;

                    const isOpActiveNode = currentOpStep?.activeNode === node.value;
                    const isOpTargetNode = currentOpStep?.isTargetNode === node.value;
                    const isOpImbalanced = currentOpStep?.isImbalancedNode === node.value;
                    const isOpSearchMatch = currentOpStep?.isSearchMatch === node.value;

                    const level = layout.nodeLevels.get(node.value) || 1;
                    const bf = getBalanceFactor(node);
                    const isBfImbalanced = Math.abs(bf) > 1;

                    let nodeFill = "url(#avlNodeGrad)";
                    let nodeStroke = activeTheme.border;
                    let strokeWidth = "1.5";
                    let haloStroke = activeTheme.halo;

                    if (isOpImbalanced || isBfImbalanced) {
                      nodeFill = "url(#avlImbalanceGrad)";
                      nodeStroke = "rgba(244, 63, 94, 0.85)";
                      strokeWidth = "2.5";
                      haloStroke = "#f43f5e";
                    } else if (isOpSearchMatch) {
                      nodeFill = "url(#avlMatchGrad)";
                      nodeStroke = "rgba(52, 211, 153, 0.9)";
                      strokeWidth = "2.5";
                      haloStroke = "#34d399";
                    } else if (isOpTargetNode) {
                      nodeFill = "url(#avlImbalanceGrad)";
                      nodeStroke = "rgba(244, 63, 94, 0.8)";
                      strokeWidth = "2.5";
                      haloStroke = "#f43f5e";
                    } else if (isOpActiveNode) {
                      nodeFill = "url(#avlActiveGrad)";
                      nodeStroke = "rgba(56, 189, 248, 0.9)";
                      strokeWidth = "2.5";
                      haloStroke = activeTheme.halo;
                    } else if (isTraversalActive) {
                      nodeFill = "url(#avlActiveGrad)";
                      nodeStroke = "rgba(251, 191, 36, 0.8)";
                      strokeWidth = "2.5";
                      haloStroke = "#fbbf24";
                    } else if (isSelected) {
                      nodeFill = "url(#avlActiveGrad)";
                      nodeStroke = "rgba(147, 197, 253, 0.9)";
                      strokeWidth = "2";
                    }

                    return (
                      <g
                        key={node.value}
                        id={`node-${node.value}`}
                        onClick={() => handleNodeClick(node)}
                        className="cursor-pointer group"
                        style={{
                          transformOrigin: `${pos.x}px ${pos.y}px`,
                          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        }}
                      >
                        {/* Concentric Animated Halo */}
                        {(isTraversalActive || isSelected || isOpActiveNode || isOpTargetNode || isOpImbalanced || isOpSearchMatch || isBfImbalanced) && (
                          <>
                            <circle
                              cx={pos.x}
                              cy={pos.y}
                              r={NODE_RADIUS + 5}
                              fill="none"
                              stroke={haloStroke}
                              strokeWidth="1.5"
                              strokeDasharray="4 3"
                              className="animate-spin"
                              style={{
                                transformOrigin: `${pos.x}px ${pos.y}px`,
                                animationDuration: "12s",
                                opacity: 0.85,
                              }}
                            />
                            <circle
                              cx={pos.x}
                              cy={pos.y}
                              r={NODE_RADIUS + 9}
                              fill="none"
                              stroke={haloStroke}
                              strokeWidth="1"
                              strokeOpacity="0.3"
                              className="animate-ping"
                              style={{
                                transformOrigin: `${pos.x}px ${pos.y}px`,
                                animationDuration: "3s",
                              }}
                            />
                          </>
                        )}

                        {/* Main Node Body */}
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={NODE_RADIUS}
                          fill={nodeFill}
                          stroke={nodeStroke}
                          strokeWidth={strokeWidth}
                          filter="url(#softShadow)"
                          className="transition-all duration-300 transform group-hover:scale-108"
                        />

                        {/* Soft Inner Highlight Ring */}
                        <circle
                          cx={pos.x}
                          cy={pos.y}
                          r={NODE_RADIUS - 1.5}
                          fill="none"
                          stroke="rgba(255, 255, 255, 0.12)"
                          strokeWidth="1"
                          className="pointer-events-none"
                        />

                        {/* Node Value */}
                        <text
                          x={pos.x}
                          y={pos.y + 0.5}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#f8fafc"
                          fontSize="10.5"
                          fontWeight="700"
                          fontFamily="monospace"
                          className="pointer-events-none tracking-tight"
                        >
                          {node.value}
                        </text>

                        {/* Balance Factor Tag (Top Right of Node) */}
                        {showBalanceFactors && (
                          <g className="pointer-events-none">
                            <rect
                              x={pos.x + 8}
                              y={pos.y - NODE_RADIUS - 4}
                              width="22"
                              height="12"
                              rx="6"
                              fill={
                                isBfImbalanced
                                  ? "#881337"
                                  : bf === 0
                                  ? "#0f172a"
                                  : "#064e3b"
                              }
                              stroke={
                                isBfImbalanced
                                  ? "#f43f5e"
                                  : bf === 0
                                  ? "rgba(255, 255, 255, 0.2)"
                                  : "#10b981"
                              }
                              strokeWidth="0.75"
                            />
                            <text
                              x={pos.x + 19}
                              y={pos.y - NODE_RADIUS + 3}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill={
                                isBfImbalanced
                                  ? "#fda4af"
                                  : bf === 0
                                  ? "#94a3b8"
                                  : "#a7f3d0"
                              }
                              fontSize="7.5"
                              fontWeight="700"
                              fontFamily="monospace"
                            >
                              {bf > 0 ? `+${bf}` : `${bf}`}
                            </text>
                          </g>
                        )}

                        {/* Level Tag (Bottom) */}
                        {showNodeLevels && (
                          <g className="pointer-events-none">
                            <rect
                              x={pos.x - 11}
                              y={pos.y + NODE_RADIUS - 2}
                              width="22"
                              height="11"
                              rx="5.5"
                              fill="#0b1120"
                              stroke="rgba(255, 255, 255, 0.15)"
                              strokeWidth="0.75"
                            />
                            <text
                              x={pos.x}
                              y={pos.y + NODE_RADIUS + 4.5}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill="#94a3b8"
                              fontSize="7"
                              fontWeight="600"
                            >
                              L{level}
                            </text>
                          </g>
                        )}

                        {/* Floating Comparison / Rotation Decision Pill */}
                        {isOpActiveNode && currentOpStep?.comparisonText && (
                          <g className="animate-bounce pointer-events-none" style={{ animationDuration: "1.8s" }}>
                            <rect
                              x={pos.x - 48}
                              y={pos.y - 44}
                              width="96"
                              height="20"
                              rx="10"
                              fill="#0c1829"
                              stroke="rgba(56, 189, 248, 0.6)"
                              strokeWidth="1"
                              filter="url(#softShadow)"
                            />
                            <text
                              x={pos.x}
                              y={pos.y - 32}
                              textAnchor="middle"
                              fontSize="8"
                              fontWeight="600"
                              fill="#e0f2fe"
                              fontFamily="system-ui, sans-serif"
                            >
                              {currentOpStep.comparisonText}
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
        </main>

        {/* =================================================================== */}
        {/* 5. SECONDARY TOOLS & ROTATION SANDBOX */}
        {/* =================================================================== */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-3 shadow-lg space-y-3">
          
          {/* Pill Selector */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              AVL Rotations &amp; Blueprints:
            </span>

            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { key: "rotations", label: "Rotation Sandbox", icon: "bi-arrow-repeat" },
                { key: "traversal", label: "Traversal Player", icon: "bi-play-circle" },
                { key: "lca", label: "LCA Calculator", icon: "bi-share" },
                { key: "rules", label: "AVL Rules Guide", icon: "bi-journal-text" },
                { key: "code", label: "C Code Blueprint", icon: "bi-code-slash" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setBottomTab(bottomTab === tab.key ? null : tab.key)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                    bottomTab === tab.key
                      ? "bg-emerald-500/20 text-emerald-200 border border-emerald-500/40 shadow-sm"
                      : "bg-slate-950/70 text-slate-400 hover:text-white border border-slate-800/80"
                  }`}
                >
                  <i className={`bi ${tab.icon}`}></i>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Drawer Content */}
          <AnimatePresence>
            {bottomTab && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-2 border-t border-slate-800/60 overflow-hidden"
              >
                {/* 1. Rotation Sandbox */}
                {bottomTab === "rotations" && (
                  <div className="space-y-3 p-1">
                    <p className="text-xs text-slate-400">
                      Trigger dedicated animated demonstrations for each of the 4 fundamental AVL self-balancing rotations:
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        onClick={() => handleTriggerRotationDemo("LL")}
                        className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-left transition cursor-pointer group"
                      >
                        <div className="text-xs font-bold text-sky-400 flex items-center gap-1 mb-1">
                          <span>🔄</span> LL Rotation
                        </div>
                        <p className="text-[10px] text-slate-400">Single Right rotation at imbalanced parent</p>
                      </button>

                      <button
                        onClick={() => handleTriggerRotationDemo("RR")}
                        className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-left transition cursor-pointer group"
                      >
                        <div className="text-xs font-bold text-emerald-400 flex items-center gap-1 mb-1">
                          <span>🔄</span> RR Rotation
                        </div>
                        <p className="text-[10px] text-slate-400">Single Left rotation at imbalanced parent</p>
                      </button>

                      <button
                        onClick={() => handleTriggerRotationDemo("LR")}
                        className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-left transition cursor-pointer group"
                      >
                        <div className="text-xs font-bold text-purple-400 flex items-center gap-1 mb-1">
                          <span>🔀</span> LR Double
                        </div>
                        <p className="text-[10px] text-slate-400">Left rotate child, then Right rotate parent</p>
                      </button>

                      <button
                        onClick={() => handleTriggerRotationDemo("RL")}
                        className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-left transition cursor-pointer group"
                      >
                        <div className="text-xs font-bold text-amber-400 flex items-center gap-1 mb-1">
                          <span>🔀</span> RL Double
                        </div>
                        <p className="text-[10px] text-slate-400">Right rotate child, then Left rotate parent</p>
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. Traversal Player */}
                {bottomTab === "traversal" && (
                  <div className="space-y-3 p-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        {["inorder", "preorder", "postorder", "levelorder"].map((t) => (
                          <button
                            key={t}
                            onClick={() => handleStartTraversal(t)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition cursor-pointer ${
                              traversalType === t && traversalSequence.length > 0
                                ? "bg-purple-600/80 text-white border border-purple-400/40"
                                : "bg-slate-950/80 hover:bg-slate-800/80 text-slate-300 border border-slate-800/80"
                            }`}
                          >
                            {t === "inorder" ? "In-Order (L-Root-R)" : t === "preorder" ? "Pre-Order (Root-L-R)" : t === "postorder" ? "Post-Order (L-R-Root)" : "Level-Order (BFS)"}
                          </button>
                        ))}
                      </div>

                      {traversalSequence.length > 0 && (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setTraversalStepIdx((p) => Math.max(0, p - 1))}
                            disabled={traversalStepIdx <= 0}
                            className="px-2 py-1 rounded-lg bg-slate-950 text-xs text-slate-300 disabled:opacity-40"
                          >
                            ⏮️
                          </button>
                          <button
                            onClick={() => setIsTraversalPlaying(!isTraversalPlaying)}
                            className="px-2.5 py-1 rounded-lg bg-purple-600 text-xs text-white font-medium"
                          >
                            {isTraversalPlaying ? "Pause" : "Play"}
                          </button>
                          <button
                            onClick={() => setTraversalStepIdx((p) => Math.min(traversalSequence.length - 1, p + 1))}
                            disabled={traversalStepIdx >= traversalSequence.length - 1}
                            className="px-2 py-1 rounded-lg bg-slate-950 text-xs text-slate-300 disabled:opacity-40"
                          >
                            ⏭️
                          </button>
                        </div>
                      )}
                    </div>

                    {traversalSequence.length > 0 && (
                      <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                        {traversalSequence.map((val, idx) => (
                          <div
                            key={idx}
                            className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs transition-all border ${
                              idx === traversalStepIdx
                                ? "bg-purple-600 text-white border-purple-400 scale-110 shadow"
                                : idx < traversalStepIdx
                                ? "bg-purple-950/40 text-purple-300 border-purple-800/40"
                                : "bg-slate-950 text-slate-500 border-slate-800"
                            }`}
                          >
                            {val}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* 3. LCA Calculator */}
                {bottomTab === "lca" && (
                  <div className="p-1 space-y-2">
                    <p className="text-xs text-slate-400">
                      Find Lowest Common Ancestor (LCA) in guaranteed O(log N) depth:
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={lcaInputs.n1}
                        onChange={(e) => setLcaInputs({ ...lcaInputs, n1: e.target.value })}
                        placeholder="Node 1"
                        className="w-28 bg-slate-950/80 border border-slate-800 rounded-xl px-2.5 py-1 text-xs text-white font-mono"
                      />
                      <input
                        type="number"
                        value={lcaInputs.n2}
                        onChange={(e) => setLcaInputs({ ...lcaInputs, n2: e.target.value })}
                        placeholder="Node 2"
                        className="w-28 bg-slate-950/80 border border-slate-800 rounded-xl px-2.5 py-1 text-xs text-white font-mono"
                      />
                      <button
                        onClick={() => {
                          const n1 = parseInt(lcaInputs.n1, 10);
                          const n2 = parseInt(lcaInputs.n2, 10);
                          if (isNaN(n1) || isNaN(n2)) return;
                          const lca = findLCA(root, n1, n2);
                          setLcaResult(lca ? lca.value : "None");
                        }}
                        className="px-3 py-1 bg-emerald-600/80 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl cursor-pointer"
                      >
                        Compute LCA
                      </button>
                      {lcaResult !== null && (
                        <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/60 px-2.5 py-1 rounded-xl border border-emerald-800/60">
                          LCA = {lcaResult}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* 4. AVL Rules Guide */}
                {bottomTab === "rules" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 p-1 text-xs">
                    {Object.values(TASK_RULES).map((rule, idx) => (
                      <div key={idx} className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-100">{rule.title}</span>
                          <span className="text-[10px] text-emerald-400 font-mono">{rule.badge}</span>
                        </div>
                        <p className="text-[11px] text-slate-400">{rule.invariants}</p>
                        <div className="space-y-1 text-[10px] text-slate-400">
                          {rule.steps.map((s, sIdx) => (
                            <div key={sIdx} className="flex gap-1.5">
                              <span className="text-emerald-400 font-semibold">{s.step}.</span>
                              <span>{s.title}: {s.desc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 5. C Code Reference */}
                {bottomTab === "code" && (
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[11px] font-mono text-emerald-300">
                    <pre className="overflow-x-auto leading-relaxed">{`// Production AVL Tree Node and Rotations in C
struct AVLNode {
    int key;
    struct AVLNode *left, *right;
    int height;
};

// Right Rotation (LL)
struct AVLNode* rotateRight(struct AVLNode* y) {
    struct AVLNode* x = y->left;
    struct AVLNode* T2 = x->right;
    x->right = y;
    y->left = T2;
    y->height = 1 + max(getHeight(y->left), getHeight(y->right));
    x->height = 1 + max(getHeight(x->left), getHeight(x->right));
    return x;
}

// Left Rotation (RR)
struct AVLNode* rotateLeft(struct AVLNode* x) {
    struct AVLNode* y = x->right;
    struct AVLNode* T2 = y->left;
    y->left = x;
    x->right = T2;
    x->height = 1 + max(getHeight(x->left), getHeight(x->right));
    y->height = 1 + max(getHeight(y->left), getHeight(y->right));
    return y;
}`}</pre>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* =================================================================== */}
        {/* 6. FLOATING NODE INSPECTOR CARD */}
        {/* =================================================================== */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="fixed bottom-5 right-5 z-50 w-72 bg-slate-900/95 backdrop-blur-2xl border border-slate-700/70 rounded-2xl shadow-2xl p-3.5 ring-1 ring-emerald-500/20"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-xs">
                    {selectedNode.value}
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white">AVL Node Inspector</h3>
                    <p className="text-[10px] text-slate-400">Level {selectedNode.level}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-slate-400 hover:text-white text-xs cursor-pointer"
                >
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-xs mb-2">
                <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/80">
                  <span className="text-[9px] text-slate-400 block">Balance Factor (BF)</span>
                  <span className={`font-mono font-semibold ${Math.abs(selectedNode.bf) > 1 ? "text-rose-400 font-bold" : "text-emerald-300"}`}>
                    {selectedNode.bf > 0 ? `+${selectedNode.bf}` : `${selectedNode.bf}`} {Math.abs(selectedNode.bf) <= 1 ? "✅ Valid" : "❌ Imbalance"}
                  </span>
                </div>
                <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/80">
                  <span className="text-[9px] text-slate-400 block">Subtree Height</span>
                  <span className="font-semibold text-sky-300">{selectedNode.height}</span>
                </div>
                <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/80">
                  <span className="text-[9px] text-slate-400 block">Left Subtree</span>
                  <span className="font-mono text-slate-300 text-[11px]">
                    H: <b className="text-sky-300">{selectedNode.leftHeight}</b> | {selectedNode.leftCount} node{selectedNode.leftCount !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/80">
                  <span className="text-[9px] text-slate-400 block">Right Subtree</span>
                  <span className="font-mono text-slate-300 text-[11px]">
                    H: <b className="text-sky-300">{selectedNode.rightHeight}</b> | {selectedNode.rightCount} node{selectedNode.rightCount !== 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* Height vs Weight Explainer Badge */}
              <div className="bg-slate-950/90 border border-slate-800/80 rounded-xl p-2 mb-2.5 text-[10px] text-slate-300 font-sans space-y-1">
                <div className="flex items-center justify-between text-slate-400 font-mono text-[9.5px]">
                  <span>Formula: Height(L) - Height(R)</span>
                  <span className="text-emerald-300 font-bold">{selectedNode.leftHeight} - {selectedNode.rightHeight} = {selectedNode.bf > 0 ? `+${selectedNode.bf}` : selectedNode.bf}</span>
                </div>
                <p className="text-slate-400 leading-tight">
                  <span className="text-emerald-400 font-semibold">💡 Height-Balanced:</span> AVL trees balance strictly by <b>subtree depth/height</b> (diff ≤ 1), not node count ({selectedNode.leftCount} vs {selectedNode.rightCount}).
                </p>
              </div>

              <div className="flex gap-1.5">
                <button
                  onClick={() => {
                    const steps = generateAnimatedAvlDeleteSteps(root, selectedNode.value);
                    setOpSteps(steps);
                    setOpStepIdx(0);
                    setIsOpPlaying(true);
                    setSelectedNode(null);
                  }}
                  className="flex-1 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-semibold transition cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    const steps = generateAnimatedSearchSteps(root, selectedNode.value);
                    setOpSteps(steps);
                    setOpStepIdx(0);
                    setIsOpPlaying(true);
                    setSelectedNode(null);
                  }}
                  className="flex-1 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-semibold transition cursor-pointer"
                >
                  Search
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =================================================================== */}
        {/* 7. USER CONFIRMATION MODAL BEFORE BALANCING */}
        {/* =================================================================== */}
        <AnimatePresence>
          {showBalanceConfirmModal && currentOpStep?.requiresBalancePrompt && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                className="w-full max-w-md bg-slate-900/95 border-2 border-rose-500/80 rounded-3xl p-5 shadow-2xl ring-2 ring-rose-500/20 space-y-4"
              >
                {/* Modal Header */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-300 text-2xl font-bold animate-pulse">
                    ⚠️
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                      Balance Confirmation
                      {currentOpStep.rotationNum && (
                        <span className="text-[11px] bg-rose-500/30 text-rose-200 px-2 py-0.5 rounded-full border border-rose-400/30">
                          Step #{currentOpStep.rotationNum}
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-rose-300 font-medium">
                      {currentOpStep.rotationNum && currentOpStep.rotationNum > 1
                        ? "Sequential cascade rebalancing in progress"
                        : "Tree is NOT balanced after deletion"}
                    </p>
                  </div>
                </div>

                {/* Diagnostics Box */}
                <div className="bg-slate-950/90 rounded-2xl p-3.5 border border-slate-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                    <span className="text-slate-400">Imbalanced Node:</span>
                    <span className="font-mono font-bold text-rose-300 text-sm">Node {currentOpStep.isImbalancedNode}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-800/80">
                    <span className="text-slate-400">Current Balance Factor:</span>
                    <span className="font-mono font-bold text-rose-400">
                      {currentOpStep.nodeBf > 0 ? `+${currentOpStep.nodeBf}` : currentOpStep.nodeBf} <span className="text-[10px] text-rose-300 font-sans font-normal">({currentOpStep.nodeBf > 0 ? "Left-Heavy" : "Right-Heavy"})</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-400">Required Rotation:</span>
                    <span className="font-semibold text-emerald-300">{currentOpStep.rotationType}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  The deletion has left the tree in an <b>unbalanced raw state</b> (|BF| &gt; 1). Do you confirm starting the balancing procedure to restore the strict AVL invariant?
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <button
                    onClick={() => {
                      setShowBalanceConfirmModal(false);
                      if (opStepIdx < opSteps.length - 1) {
                        setOpStepIdx((prev) => prev + 1);
                        setIsOpPlaying(true);
                      }
                    }}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-400 hover:to-teal-400 text-white text-xs font-bold shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer transition transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>✅ Yes, Start Balancing</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowBalanceConfirmModal(false);
                      setIsOpPlaying(false);
                    }}
                    className="py-2.5 px-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-750 text-slate-300 text-xs font-medium border border-slate-700 transition cursor-pointer"
                  >
                    🔍 Inspect First
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default AvlTreeVisualizer;