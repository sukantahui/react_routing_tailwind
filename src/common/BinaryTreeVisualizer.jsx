// ============================================================================
// BinaryTreeVisualizer.jsx - Pro-Level Next-Generation BST Visualizer
// Soothing Aesthetic Design, Fluid Animations & Batch Entry Engine
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

// Deep clone of tree
const cloneTree = (root) => {
  if (!root) return null;
  return new TreeNode(root.value, cloneTree(root.left), cloneTree(root.right));
};

// Immutable BST Insert
const insertNode = (root, value) => {
  if (!root) return new TreeNode(value);
  if (value < root.value) {
    return new TreeNode(root.value, insertNode(root.left, value), root.right);
  } else if (value > root.value) {
    return new TreeNode(root.value, root.left, insertNode(root.right, value));
  }
  return root; // No duplicates allowed in standard BST
};

// Find Minimum node (Leftmost in subtree)
const findMin = (node) => {
  let curr = node;
  while (curr && curr.left) curr = curr.left;
  return curr;
};

// Find Maximum node (Rightmost in subtree)
const findMax = (node) => {
  let curr = node;
  while (curr && curr.right) curr = curr.right;
  return curr;
};

// Immutable BST Delete (Successor)
const deleteNode = (root, value) => {
  if (!root) return null;
  if (value < root.value) {
    return new TreeNode(root.value, deleteNode(root.left, value), root.right);
  } else if (value > root.value) {
    return new TreeNode(root.value, root.left, deleteNode(root.right, value));
  } else {
    if (!root.left && !root.right) return null;
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    const successor = findMin(root.right);
    return new TreeNode(
      successor.value,
      root.left,
      deleteNode(root.right, successor.value)
    );
  }
};

// Immutable BST Delete (Predecessor)
const deleteNodePredecessor = (root, value) => {
  if (!root) return null;
  if (value < root.value) {
    return new TreeNode(root.value, deleteNodePredecessor(root.left, value), root.right);
  } else if (value > root.value) {
    return new TreeNode(root.value, root.left, deleteNodePredecessor(root.right, value));
  } else {
    if (!root.left && !root.right) return null;
    if (!root.left) return root.right;
    if (!root.right) return root.left;

    const predecessor = findMax(root.left);
    return new TreeNode(
      predecessor.value,
      deleteNodePredecessor(root.left, predecessor.value),
      root.right
    );
  }
};

// Invert / Mirror Tree
const invertTree = (root) => {
  if (!root) return null;
  return new TreeNode(root.value, invertTree(root.right), invertTree(root.left));
};

// Balance Tree (convert BST -> Sorted Array -> Balanced BST)
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

// Presets (including user batch preset)
const PRESETS = {
  balanced: { label: "Balanced BST (7)", data: [50, 25, 75, 12, 37, 62, 87] },
  userBatch: { label: "Batch Sample (10)", data: [23, 67, 12, 45, 10, 5, 8, 37, 7, 34] },
  full: { label: "Full Binary Tree (7)", data: [40, 20, 60, 10, 30, 50, 70] },
  skewedLeft: { label: "Left Skewed (5)", data: [70, 60, 50, 40, 30] },
  skewedRight: { label: "Right Skewed (5)", data: [20, 30, 40, 50, 60] },
  complex: { label: "Complex (12 nodes)", data: [55, 33, 78, 22, 44, 66, 99, 11, 28, 38, 49, 88] },
};

// Soothing, Eye-Comfortable Color Themes
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
    pillBg: "bg-sky-500/15 border-sky-500/30 text-sky-300",
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
    pillBg: "bg-emerald-500/15 border-emerald-500/30 text-emerald-300",
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
    pillBg: "bg-purple-500/15 border-purple-500/30 text-purple-300",
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
    pillBg: "bg-rose-500/15 border-rose-500/30 text-rose-300",
  },
};

// Rules Dictionary
const TASK_RULES = {
  insert: {
    title: "BST Node Insertion",
    badge: "O(log N) Avg",
    invariants: "For any node N: key(N.left) < key(N) < key(N.right)",
    steps: [
      { step: 1, title: "Compare with Root", desc: "Compare target V with N.val." },
      { step: 2, title: "Branch Decision", desc: "If V < N.val branch Left; if V > N.val branch Right." },
      { step: 3, title: "Attach Leaf", desc: "When NULL is reached, allocate TreeNode(V) as new leaf." },
    ],
    timeComplexity: "O(log N) Avg | O(N) Worst",
    spaceComplexity: "O(h) Stack",
  },
  batch: {
    title: "Sequential Batch Insertion",
    badge: "O(K log N)",
    invariants: "Inserts K elements one by one, preserving BST rules at each step.",
    steps: [
      { step: 1, title: "Parse Entry Sequence", desc: "Extract valid numeric keys from comma/space separated list." },
      { step: 2, title: "Iterative Insertion", desc: "For each key, perform standard BST insertion starting from current root." },
      { step: 3, title: "Tree Construction", desc: "Updates overall tree structure and metrics progressively." },
    ],
    timeComplexity: "O(K log N) for K entries",
    spaceComplexity: "O(h) auxiliary stack per element",
  },
  delete: {
    title: "BST 3-Case Deletion",
    badge: "O(log N) Avg",
    invariants: "Preserves BST ordering across all remaining subtrees.",
    steps: [
      { step: 1, title: "Case 1: Leaf (0 Children)", desc: "Directly unlink node and set parent pointer to NULL." },
      { step: 2, title: "Case 2: Single Child (1 Child)", desc: "Bypass node by linking parent directly to only child." },
      { step: 3, title: "Case 3: Two Children (2 Children)", desc: "Replace with Inorder Successor (min right) or Predecessor (max left), then delete candidate from subtree." },
    ],
    timeComplexity: "O(log N) Avg",
    spaceComplexity: "O(h) Stack",
  },
  search: {
    title: "Binary Elimination Search",
    badge: "O(log N) Avg",
    invariants: "Halves search space at each level.",
    steps: [
      { step: 1, title: "Start at Root", desc: "Initialize search pointer at root." },
      { step: 2, title: "Binary Comparison", desc: "If target === val: Found! If target < val: branch left; else branch right." },
      { step: 3, title: "Termination", desc: "If NULL reached, key is not present in BST." },
    ],
    timeComplexity: "O(log N) Avg",
    spaceComplexity: "O(1) Iterative",
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
// 3. STEP GENERATORS
// ============================================================================

const generateAnimatedInsertSteps = (initialTree, val) => {
  const steps = [];
  const currentPath = [];

  steps.push({
    title: `Insert ${val}: Start at Root`,
    tree: cloneTree(initialTree),
    activeNode: initialTree ? initialTree.value : null,
    highlightedPath: [],
    targetVal: val,
    message: `Starting BST Insertion for key ${val} at Root.`,
    cCode: `BSTNode* insert(BSTNode* root, int value = ${val})`,
  });

  let curr = initialTree;
  let parent = null;
  let branchSide = null;

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
        message: `Key ${val} already exists in the BST. Duplicate values are ignored.`,
        cCode: `if (value == root->data) return root; // Duplicate ignored`,
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
        cCode: `root->left = insert(root->left, ${val});`,
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
        cCode: `root->right = insert(root->right, ${val});`,
      });
      parent = curr;
      branchSide = "right";
      curr = curr.right;
    }
  }

  const finalTree = insertNode(initialTree, val);
  steps.push({
    title: `Insert ${val}: Attached as Leaf`,
    tree: finalTree,
    activeNode: val,
    isNewlyInserted: val,
    highlightedPath: [...currentPath, val],
    targetVal: val,
    comparisonText: `Attached ✨`,
    message: `Reached NULL pointer on ${branchSide ? branchSide.toUpperCase() : "ROOT"} of parent ${parent ? parent.value : "NULL"}. Created new TreeNode(${val}).`,
    cCode: `if (root == NULL) return new TreeNode(${val});`,
    isFinal: true,
  });

  return steps;
};

// Batch Insert Step Generator
const generateAnimatedBatchInsertSteps = (initialTree, numbers) => {
  const steps = [];
  let currentTree = cloneTree(initialTree);

  steps.push({
    title: `Start Batch Entry (${numbers.length} keys)`,
    tree: cloneTree(currentTree),
    activeNode: null,
    highlightedPath: [],
    message: `Starting sequential insertion of ${numbers.length} keys: [ ${numbers.join(", ")} ]`,
    cCode: `// Sequential Batch Insert: ${numbers.length} elements`,
  });

  numbers.forEach((num, index) => {
    const singleSteps = generateAnimatedInsertSteps(currentTree, num);
    singleSteps.forEach((s) => {
      steps.push({
        ...s,
        title: `[${index + 1}/${numbers.length}] ${s.title}`,
      });
    });
    currentTree = insertNode(currentTree, num);
  });

  steps.push({
    title: `Batch Insertion Complete (${numbers.length} keys)`,
    tree: cloneTree(currentTree),
    activeNode: null,
    highlightedPath: [],
    message: `Successfully inserted all ${numbers.length} elements: [ ${numbers.join(", ")} ]. BST invariant preserved.`,
    cCode: `// Batch Insert Finished. Tree Size = ${countNodes(currentTree)}`,
    isFinal: true,
  });

  return steps;
};

const generateAnimatedSearchSteps = (initialTree, val) => {
  const steps = [];
  const currentPath = [];

  steps.push({
    title: "Start Search at Root",
    tree: cloneTree(initialTree),
    activeNode: initialTree ? initialTree.value : null,
    highlightedPath: [],
    targetVal: val,
    message: `Initializing BST search for target key ${val} at Root.`,
    cCode: `TreeNode* search(TreeNode* root, int key = ${val})`,
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
        message: `Success! Target key ${val} located after visiting [${currentPath.join(" → ")}].`,
        cCode: `if (root->data == key) return root; // Key ${val} found!`,
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
    message: `Reached NULL pointer. Key ${val} is not present in BST.`,
    cCode: `if (root == NULL) return NULL; // Not found`,
    isFinal: true,
  });

  return steps;
};

const generateAnimatedDeleteSteps = (initialTree, val, strategy = "successor") => {
  const steps = [];
  const currentPath = [];

  steps.push({
    title: "Locate Target Node",
    tree: cloneTree(initialTree),
    activeNode: initialTree ? initialTree.value : null,
    highlightedPath: [],
    targetVal: val,
    message: `Searching BST to locate target node ${val} for deletion.`,
    cCode: `TreeNode* deleteNode(TreeNode* root, int key = ${val})`,
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
      message: `Node ${val} does not exist in the BST. Tree remains unchanged.`,
      cCode: `if (root == NULL) return NULL;`,
      isFinal: true,
    });
    return steps;
  }

  steps.push({
    title: `Target Located: Node ${val}`,
    tree: cloneTree(initialTree),
    activeNode: val,
    isTargetNode: val,
    highlightedPath: [...currentPath],
    targetVal: val,
    comparisonText: `Target: ${val} 🗑️`,
    message: `Target node ${val} located! Analyzing child count...`,
    cCode: `// Target node ${val} found. Degree = ${(targetNode.left?1:0)+(targetNode.right?1:0)}`,
  });

  // CASE 1: Leaf (0 children)
  if (!targetNode.left && !targetNode.right) {
    steps.push({
      title: "Case 1: Leaf Node Deletion",
      tree: cloneTree(initialTree),
      activeNode: val,
      isTargetNode: val,
      highlightedPath: [...currentPath],
      targetVal: val,
      comparisonText: `Leaf (0 Child) 🍃`,
      message: `Target ${val} has 0 children (Leaf). Resetting parent pointer to NULL.`,
      cCode: `if (root->left == NULL && root->right == NULL) return NULL;`,
    });

    const finalTree = deleteNode(initialTree, val);
    steps.push({
      title: `Deletion Complete: Leaf Removed`,
      tree: finalTree,
      activeNode: null,
      highlightedPath: [],
      targetVal: val,
      message: `Leaf node ${val} successfully deleted. BST invariant preserved.`,
      cCode: `// Memory freed cleanly.`,
      isFinal: true,
    });
    return steps;
  }

  // CASE 2: Single Child (1 Child)
  if (!targetNode.left || !targetNode.right) {
    const childVal = targetNode.left ? targetNode.left.value : targetNode.right.value;
    const side = targetNode.left ? "Left" : "Right";

    steps.push({
      title: `Case 2: Single Child Deletion`,
      tree: cloneTree(initialTree),
      activeNode: val,
      isTargetNode: val,
      promotedChild: childVal,
      highlightedPath: [...currentPath],
      targetVal: val,
      comparisonText: `1 Child (${side}) 🌿`,
      message: `Target ${val} has a single child (${childVal}). Bypassing node ${val}: parent adopts ${childVal}.`,
      cCode: `TreeNode* temp = root->${side.toLowerCase()};\nreturn temp; // Child ${childVal} promoted`,
    });

    const finalTree = deleteNode(initialTree, val);
    steps.push({
      title: `Deletion Complete: Child Promoted`,
      tree: finalTree,
      activeNode: childVal,
      highlightedPath: [],
      targetVal: val,
      message: `Node ${val} removed. Child ${childVal} adopted into parent link.`,
      cCode: `// Node ${val} freed without losing descendant subtree.`,
      isFinal: true,
    });
    return steps;
  }

  // CASE 3: Two Children
  if (strategy === "successor") {
    steps.push({
      title: "Case 3: Two Children → Inorder Successor",
      tree: cloneTree(initialTree),
      activeNode: val,
      isTargetNode: val,
      highlightedPath: [...currentPath],
      targetVal: val,
      comparisonText: `2 Children ⚡`,
      message: `Target ${val} has 2 children. Searching for Inorder Successor (min node in Right Subtree).`,
      cCode: `TreeNode* succ = findMin(root->right); // Min of right subtree`,
    });

    let succCurr = targetNode.right;
    const succPath = [targetNode.right.value];
    while (succCurr.left) {
      succCurr = succCurr.left;
      succPath.push(succCurr.value);
    }
    const succVal = succCurr.value;

    steps.push({
      title: `Inorder Successor: Key ${succVal}`,
      tree: cloneTree(initialTree),
      activeNode: succVal,
      isTargetNode: val,
      isSuccessorNode: succVal,
      highlightedPath: [...currentPath, ...succPath],
      targetVal: val,
      comparisonText: `Successor: ${succVal} 🌟`,
      message: `Found Inorder Successor ${succVal} (smallest key in right subtree). Guaranteed <= 1 child!`,
      cCode: `// Successor ${succVal} located at leftmost position of right branch`,
    });

    const intermediateTree = cloneTree(initialTree);
    const replaceVal = (node) => {
      if (!node) return;
      if (node.value === val) node.value = succVal;
      replaceVal(node.left);
      replaceVal(node.right);
    };
    replaceVal(intermediateTree);

    steps.push({
      title: `Copy Successor (${succVal}) into Target`,
      tree: intermediateTree,
      activeNode: succVal,
      isTargetNode: succVal,
      isSuccessorNode: succVal,
      highlightedPath: [...currentPath],
      targetVal: val,
      comparisonText: `Copied ${succVal} 🔄`,
      message: `Copied successor key ${succVal} into target node. Now deleting original successor ${succVal} from right subtree.`,
      cCode: `root->data = succ->data;\nroot->right = deleteNode(root->right, succ->data);`,
    });

    const finalTree = deleteNode(initialTree, val);
    steps.push({
      title: `Deletion Complete: Successor Promoted`,
      tree: finalTree,
      activeNode: succVal,
      highlightedPath: [],
      targetVal: val,
      message: `Case 3 deletion complete! Node ${val} replaced with Inorder Successor ${succVal}.`,
      cCode: `// Zero dangling pointers. BST invariant preserved.`,
      isFinal: true,
    });
    return steps;
  } else {
    steps.push({
      title: "Case 3: Two Children → Inorder Predecessor",
      tree: cloneTree(initialTree),
      activeNode: val,
      isTargetNode: val,
      highlightedPath: [...currentPath],
      targetVal: val,
      comparisonText: `2 Children ⚡`,
      message: `Target ${val} has 2 children. Searching for Inorder Predecessor (max node in Left Subtree).`,
      cCode: `TreeNode* pred = findMax(root->left); // Max of left subtree`,
    });

    let predCurr = targetNode.left;
    const predPath = [targetNode.left.value];
    while (predCurr.right) {
      predCurr = predCurr.right;
      predPath.push(predCurr.value);
    }
    const predVal = predCurr.value;

    steps.push({
      title: `Inorder Predecessor: Key ${predVal}`,
      tree: cloneTree(initialTree),
      activeNode: predVal,
      isTargetNode: val,
      isPredecessorNode: predVal,
      highlightedPath: [...currentPath, ...predPath],
      targetVal: val,
      comparisonText: `Predecessor: ${predVal} 🌟`,
      message: `Found Inorder Predecessor ${predVal} (largest key in left subtree). Guaranteed <= 1 child!`,
      cCode: `// Predecessor ${predVal} located at rightmost position of left branch`,
    });

    const intermediateTree = cloneTree(initialTree);
    const replaceVal = (node) => {
      if (!node) return;
      if (node.value === val) node.value = predVal;
      replaceVal(node.left);
      replaceVal(node.right);
    };
    replaceVal(intermediateTree);

    steps.push({
      title: `Copy Predecessor (${predVal}) into Target`,
      tree: intermediateTree,
      activeNode: predVal,
      isTargetNode: predVal,
      isPredecessorNode: predVal,
      highlightedPath: [...currentPath],
      targetVal: val,
      comparisonText: `Copied ${predVal} 🔄`,
      message: `Copied predecessor key ${predVal} into target node. Now deleting original predecessor ${predVal} from left subtree.`,
      cCode: `root->data = pred->data;\nroot->left = deleteNode(root->left, pred->data);`,
    });

    const finalTree = deleteNodePredecessor(initialTree, val);
    steps.push({
      title: `Deletion Complete: Predecessor Promoted`,
      tree: finalTree,
      activeNode: predVal,
      highlightedPath: [],
      targetVal: val,
      message: `Case 3 deletion complete! Node ${val} replaced with Inorder Predecessor ${predVal}.`,
      cCode: `// Zero dangling pointers. BST invariant preserved.`,
      isFinal: true,
    });
    return steps;
  }
};

// ============================================================================
// 4. Main BinaryTreeVisualizer Component
// ============================================================================

const BinaryTreeVisualizer = () => {
  // Tree State
  const [root, setRoot] = useState(() => {
    let r = null;
    PRESETS.balanced.data.forEach((v) => {
      r = insertNode(r, v);
    });
    return r;
  });

  // Action Inputs
  const [actionVal, setActionVal] = useState("");
  const [batchVal, setBatchVal] = useState("23, 67, 12, 45, 10, 5, 8, 37, 7, 34");
  const [deleteStrategy, setDeleteStrategy] = useState("successor");
  const [selectedOperation, setSelectedOperation] = useState("batch"); // "insert" | "batch" | "delete" | "search"

  // Status & Feedback
  const [feedback, setFeedback] = useState({ text: "Ready to explore Binary Search Trees", type: "info" });
  const [selectedNode, setSelectedNode] = useState(null);
  const [currentTheme, setCurrentTheme] = useState("ocean");

  // Secondary Drawer / View mode
  const [bottomTab, setBottomTab] = useState(null); // null | "traversal" | "lca" | "rules" | "code"
  const [showNodeLevels, setShowNodeLevels] = useState(true);
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
  const [animationSpeed, setAnimationSpeed] = useState(600); // ms per step

  const svgContainerRef = useRef(null);
  const traversalTimerRef = useRef(null);

  // Auto-play for Operation Steps
  useEffect(() => {
    let timer = null;
    if (isOpPlaying && opSteps.length > 0) {
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

  // Traversal playback effect
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

  // Active Tree for Layout Calculation
  const activeTreeToRender = currentOpStep?.tree || root;
  const layout = useMemo(() => computeLayout(activeTreeToRender), [activeTreeToRender]);

  // Tree Metrics
  const metrics = useMemo(() => {
    const total = countNodes(root);
    const height = getTreeHeight(root);
    const leaves = countLeaves(root);
    const balanced = checkIsBalanced(root);
    const minNode = root ? findMin(root) : null;
    const maxNode = root ? findMax(root) : null;
    return {
      total,
      height,
      leaves,
      balanced,
      min: minNode ? minNode.value : "—",
      max: maxNode ? maxNode.value : "—",
    };
  }, [root]);

  // Dynamic SVG ViewBox
  const viewBox = useMemo(() => {
    const minX = isFinite(layout.minX) ? layout.minX - EXTRA_PADDING : 0;
    const spanX = isFinite(layout.maxX) && isFinite(layout.minX) ? layout.maxX - layout.minX : 600;
    const width = Math.max(spanX + 2 * EXTRA_PADDING, 600);
    const minY = TOP_PADDING - 25;
    const height = Math.max(isFinite(layout.height) ? layout.height : 320, 320);
    return `${minX} ${minY} ${width} ${height}`;
  }, [layout]);

  // Helper to parse batch string
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
        setFeedback({ text: "Please enter valid comma-separated integers (e.g. 23, 67, 12...)", type: "error" });
        return;
      }
      const steps = generateAnimatedBatchInsertSteps(root, numbers);
      setOpSteps(steps);
      setOpStepIdx(0);
      setIsOpPlaying(true);
      setFeedback({ text: `Animating batch insertion for ${numbers.length} elements...`, type: "info" });
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
      const steps = generateAnimatedInsertSteps(root, val);
      setOpSteps(steps);
      setOpStepIdx(0);
      setIsOpPlaying(true);
      setFeedback({ text: `Inserting node ${val} step-by-step...`, type: "info" });
      setActionVal("");
    } else if (selectedOperation === "delete") {
      if (!getInOrder(root).includes(val)) {
        setFeedback({ text: `Node ${val} not found in tree`, type: "error" });
        return;
      }
      const steps = generateAnimatedDeleteSteps(root, val, deleteStrategy);
      setOpSteps(steps);
      setOpStepIdx(0);
      setIsOpPlaying(true);
      setFeedback({ text: `Deleting node ${val} (${deleteStrategy})...`, type: "warning" });
      setActionVal("");
    } else if (selectedOperation === "search") {
      const steps = generateAnimatedSearchSteps(root, val);
      setOpSteps(steps);
      setOpStepIdx(0);
      setIsOpPlaying(true);
      setFeedback({ text: `Searching for key ${val}...`, type: "info" });
    }
  }, [actionVal, batchVal, selectedOperation, root, deleteStrategy]);

  // Instant Single Add
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
    setRoot((prev) => insertNode(prev, val));
    setSelectedNode(null);
    setFeedback({ text: `Instant inserted node ${val}`, type: "success" });
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
      newRoot = insertNode(newRoot, n);
    });
    setRoot(newRoot);
    setSelectedNode(null);
    setFeedback({ text: `Instant added ${numbers.length} batch keys: [ ${numbers.join(", ")} ]`, type: "success" });
  };

  // Rebuild BST from Batch
  const handleRebuildFromBatch = () => {
    const numbers = parseBatchNumbers(batchVal);
    if (numbers.length === 0) return;
    handleCloseOpAnimation();
    let newRoot = null;
    numbers.forEach((n) => {
      newRoot = insertNode(newRoot, n);
    });
    setRoot(newRoot);
    setFeedback({ text: `Tree constructed fresh with ${numbers.length} batch keys: [ ${numbers.join(", ")} ]`, type: "success" });
  };

  // Reset Op Animation
  const handleCloseOpAnimation = () => {
    setIsOpPlaying(false);
    if (opSteps.length > 0) {
      const lastStep = opSteps[opSteps.length - 1];
      if (lastStep && lastStep.tree) {
        setRoot(lastStep.tree);
      }
    }
    setOpSteps([]);
    setOpStepIdx(0);
  };

  // Presets
  const handleLoadPreset = (key) => {
    handleCloseOpAnimation();
    let newRoot = null;
    PRESETS[key].data.forEach((v) => {
      newRoot = insertNode(newRoot, v);
    });
    setRoot(newRoot);
    setSelectedNode(null);
    setTraversalSequence([]);
    setTraversalStepIdx(-1);
    setIsTraversalPlaying(false);
    setFeedback({ text: `Loaded ${PRESETS[key].label} preset.`, type: "info" });
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
      newRoot = insertNode(newRoot, v);
    });
    setRoot(newRoot);
    setSelectedNode(null);
    setFeedback({ text: `Generated random BST with ${size} nodes.`, type: "info" });
  };

  const handleBalanceTree = () => {
    if (!root) return;
    handleCloseOpAnimation();
    const sorted = getSortedArray(root);
    setRoot(buildBalancedTree(sorted));
    setFeedback({ text: "Re-balanced tree to optimal logarithmic height!", type: "success" });
  };

  const handleInvertTree = () => {
    if (!root) return;
    handleCloseOpAnimation();
    setRoot((prev) => invertTree(prev));
    setFeedback({ text: "Tree mirrored / inverted.", type: "info" });
  };

  const handleClearTree = () => {
    handleCloseOpAnimation();
    setRoot(null);
    setSelectedNode(null);
    setTraversalSequence([]);
    setTraversalStepIdx(-1);
    setFeedback({ text: "Canvas cleared.", type: "info" });
  };

  // Start Traversal
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
    setSelectedNode({
      value: node.value,
      left: node.left ? node.left.value : "None",
      right: node.right ? node.right.value : "None",
      height: getTreeHeight(node),
      size: countNodes(node),
      level: layout.nodeLevels.get(node.value) || 1,
    });
  };

  const activeTheme = THEMES[currentTheme];

  return (
    <div className="w-full min-h-screen bg-[#070b14] text-slate-100 p-3 sm:p-5 flex flex-col items-center selection:bg-sky-500/25 selection:text-sky-300">
      
      {/* Soothing background radial ambient glow */}
      <div className="fixed w-[650px] h-[650px] bg-sky-900/10 rounded-full blur-[160px] -top-24 -left-24 pointer-events-none" />
      <div className="fixed w-[550px] h-[550px] bg-indigo-950/15 rounded-full blur-[160px] bottom-0 right-0 pointer-events-none" />

      <div className="w-full max-w-6xl relative z-10 flex flex-col gap-3">
        
        {/* =================================================================== */}
        {/* 1. TOP HEADER & METRICS (SOOTHING & BALANCED) */}
        {/* =================================================================== */}
        <header className="bg-slate-900/60 backdrop-blur-2xl border border-slate-800/80 rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 shadow-xl flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500/80 via-cyan-600/70 to-indigo-600/80 flex items-center justify-center text-white shadow-lg shadow-sky-500/15 border border-sky-400/20">
              <i className="bi bi-diagram-2 text-lg"></i>
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight flex items-center gap-2">
                BST Interactive Studio
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
                  Visualizer
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Batch entry, fluid animations, balanced color schemes &amp; step-by-step algorithms
              </p>
            </div>
          </div>

          {/* Quick Metrics & Theme Dropdown */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-300 font-mono text-[11px]">
              <span className="text-slate-400">Nodes:</span>
              <span className="text-sky-300 font-semibold">{metrics.total}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-300 font-mono text-[11px]">
              <span className="text-slate-400">Height:</span>
              <span className="text-indigo-300 font-semibold">{metrics.height}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-300 font-mono text-[11px]">
              <span className="text-slate-400">Balanced:</span>
              <span className={`font-semibold ${metrics.balanced ? "text-emerald-300" : "text-amber-300"}`}>
                {metrics.balanced ? "Yes" : "No"}
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
        {/* 2. STUDIO ACTION DOCK WITH BATCH ENTRY (SLICK & UNIFIED) */}
        {/* =================================================================== */}
        {/* =================================================================== */}
        {/* 2. STUDIO ACTION DOCK WITH BATCH ENTRY (SLICK & STRICT SINGLE ROW) */}
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
                    ? "bg-sky-500/25 text-sky-200 border border-sky-400/40 shadow-sm"
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

            {/* BATCH ENTRY MODE INPUT */}
            {selectedOperation === "batch" ? (
              <div className="flex items-center gap-1.5 shrink-0">
                <input
                  type="text"
                  value={batchVal}
                  onChange={(e) => setBatchVal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleExecuteOperation()}
                  placeholder="23, 67, 12, 45, 10, 5, 8, 37, 7, 34"
                  className="w-44 sm:w-56 bg-slate-950/90 border border-slate-700/60 rounded-xl px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/70 font-mono transition"
                />

                <button
                  onClick={() => setBatchVal("23, 67, 12, 45, 10, 5, 8, 37, 7, 34")}
                  className="px-2 py-1 rounded-xl text-xs bg-slate-800/80 hover:bg-slate-750 text-sky-300 border border-slate-700/60 transition cursor-pointer shrink-0"
                  title="Fill sample batch: 23, 67, 12, 45, 10, 5, 8, 37, 7, 34"
                >
                  Sample ✨
                </button>

                <button
                  onClick={handleExecuteOperation}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-md shadow-sky-500/25 flex items-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>▶️</span>
                  <span>Animate</span>
                </button>

                <button
                  onClick={handleQuickBatchAdd}
                  className="px-2.5 py-1 rounded-xl text-xs bg-slate-800/90 hover:bg-slate-750 text-slate-200 font-medium border border-slate-700/60 transition cursor-pointer shrink-0"
                  title="Add all batch keys directly to current tree"
                >
                  Instant
                </button>

                <button
                  onClick={handleRebuildFromBatch}
                  className="px-2 py-1 rounded-xl text-xs bg-teal-900/40 hover:bg-teal-800/60 text-teal-300 font-medium border border-teal-700/50 transition cursor-pointer shrink-0"
                  title="Clear canvas and construct tree exclusively from this batch"
                >
                  🌱 Rebuild
                </button>
              </div>
            ) : (
              /* SINGLE OPERATION INPUT */
              <div className="flex items-center gap-1.5 shrink-0">
                <input
                  type="number"
                  value={actionVal}
                  onChange={(e) => setActionVal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleExecuteOperation()}
                  placeholder={selectedOperation === "insert" ? "Key..." : selectedOperation === "delete" ? "Key..." : "Key..."}
                  className="w-24 sm:w-28 bg-slate-950/90 border border-slate-700/60 rounded-xl px-2.5 py-1 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/70 font-mono transition"
                />

                {/* Strategy toggle for Deletion */}
                {selectedOperation === "delete" && (
                  <div className="flex items-center bg-slate-950/90 p-0.5 rounded-xl border border-slate-800/90 text-[11px] font-mono shrink-0">
                    <button
                      onClick={() => setDeleteStrategy("successor")}
                      className={`px-2 py-0.5 rounded-lg transition ${
                        deleteStrategy === "successor" ? "bg-sky-500/25 text-sky-200 border border-sky-400/30 font-semibold" : "text-slate-400 hover:text-white"
                      }`}
                      title="Inorder Successor (Min node in Right Subtree)"
                    >
                      Successor
                    </button>
                    <button
                      onClick={() => setDeleteStrategy("predecessor")}
                      className={`px-2 py-0.5 rounded-lg transition ${
                        deleteStrategy === "predecessor" ? "bg-purple-500/25 text-purple-200 border border-purple-400/30 font-semibold" : "text-slate-400 hover:text-white"
                      }`}
                      title="Inorder Predecessor (Max node in Left Subtree)"
                    >
                      Predecessor
                    </button>
                  </div>
                )}

                {/* Animate Action Button */}
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
                    title="Directly add node without animation"
                  >
                    Instant
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Center Divider */}
          <div className="hidden xl:block w-[1px] h-5 bg-slate-800/80 shrink-0" />

          {/* Right Wing: Preset & Modifiers */}
          <div className="flex items-center gap-1.5 shrink-0">
            <select
              onChange={(e) => {
                if (e.target.value) handleLoadPreset(e.target.value);
              }}
              defaultValue=""
              className="bg-slate-950/90 border border-slate-800/90 text-xs text-slate-300 rounded-xl px-2.5 py-1 focus:outline-none cursor-pointer hover:border-slate-700 transition"
            >
              <option value="" disabled>🌲 Presets</option>
              <option value="userBatch" className="bg-slate-900">User Batch (23, 67, 12...)</option>
              <option value="balanced" className="bg-slate-900">Balanced BST (7)</option>
              <option value="full" className="bg-slate-900">Full Tree (7)</option>
              <option value="skewedLeft" className="bg-slate-900">Left Skewed (5)</option>
              <option value="skewedRight" className="bg-slate-900">Right Skewed (5)</option>
              <option value="complex" className="bg-slate-900">Complex (12 nodes)</option>
            </select>

            <button
              onClick={handleRandomTree}
              className="px-2.5 py-1 rounded-xl text-xs bg-slate-950/90 hover:bg-slate-800 text-slate-300 border border-slate-800/90 transition cursor-pointer flex items-center gap-1"
              title="Generate random BST"
            >
              <span>🎲</span>
              <span>Random</span>
            </button>

            <button
              onClick={handleBalanceTree}
              className="px-2.5 py-1 rounded-xl text-xs bg-slate-950/90 hover:bg-slate-800 text-slate-300 border border-slate-800/90 transition cursor-pointer flex items-center gap-1"
              title="Auto-balance BST into minimal height"
            >
              <span>🔄</span>
              <span>Balance</span>
            </button>

            <button
              onClick={handleInvertTree}
              className="px-2.5 py-1 rounded-xl text-xs bg-slate-950/90 hover:bg-slate-800 text-slate-300 border border-slate-800/90 transition cursor-pointer flex items-center gap-1"
              title="Invert BST left and right subtrees"
            >
              <span>🪞</span>
              <span>Invert</span>
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
        {/* 3. FLUID STEP ANIMATION PLAYBACK DOCK */}
        {/* =================================================================== */}
        <AnimatePresence>
          {opSteps.length > 0 && currentOpStep && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="bg-slate-900/90 border border-sky-500/30 rounded-2xl p-3 shadow-xl backdrop-blur-xl space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-sky-300 bg-sky-950/70 px-2 py-0.5 rounded-lg border border-sky-800/50">
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
                      isOpPlaying ? "bg-amber-500 text-slate-950" : "bg-sky-500 text-slate-950"
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
                  className="bg-gradient-to-r from-sky-400 via-teal-300 to-emerald-400 h-1 transition-all duration-300"
                  style={{ width: `${((opStepIdx + 1) / opSteps.length) * 100}%` }}
                />
              </div>

              {/* Description message */}
              <div className="flex items-center justify-between text-[11px] font-mono bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800/60">
                <span className="text-sky-200">💡 {currentOpStep.message}</span>
                <span className="text-emerald-300 hidden sm:inline">{currentOpStep.cCode.split("\n")[0]}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =================================================================== */}
        {/* 4. MAIN HERO 2D CANVAS (SOOTHING & ELEGANT) */}
        {/* =================================================================== */}
        <main className="relative bg-[#080d19]/90 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col min-h-[430px] overflow-hidden ring-1 ring-white/5">
          
          {/* Top Bar inside Canvas */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-3 text-xs">
            {/* Feedback message banner */}
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  feedback.type === "success"
                    ? "bg-emerald-400 shadow-sm shadow-emerald-400/80"
                    : feedback.type === "error"
                    ? "bg-rose-400 shadow-sm shadow-rose-400/80"
                    : feedback.type === "warning"
                    ? "bg-amber-400 shadow-sm shadow-amber-400/80"
                    : "bg-sky-400 shadow-sm shadow-sky-400/80"
                }`}
              />
              <span className="text-slate-300 text-[11px] font-medium">{feedback.text}</span>
            </div>

            {/* Viewport Zoom & Level toggles */}
            <div className="flex items-center gap-2">
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

          {/* SVG Tree Canvas */}
          <div
            ref={svgContainerRef}
            className="flex-1 w-full overflow-auto flex items-center justify-center p-2 rounded-2xl min-h-[350px]"
          >
            {!root ? (
              <div className="text-center py-16 text-slate-500 space-y-2">
                <i className="bi bi-diagram-2 text-4xl block opacity-25"></i>
                <p className="text-sm font-medium text-slate-400">BST canvas is empty</p>
                <p className="text-xs text-slate-500">Insert values, batch keys, or click "Sample" above to begin</p>
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
                    {/* Soothing Node Radial & Linear Gradients */}
                    <linearGradient id="soothingNodeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={activeTheme.nodeStart} />
                      <stop offset="100%" stopColor={activeTheme.nodeEnd} />
                    </linearGradient>

                    <linearGradient id="soothingActiveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor={activeTheme.activeNodeStart} />
                      <stop offset="100%" stopColor={activeTheme.activeNodeEnd} />
                    </linearGradient>

                    <linearGradient id="soothingMatchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#059669" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>

                    <linearGradient id="soothingTargetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9f1239" />
                      <stop offset="100%" stopColor="#881337" />
                    </linearGradient>

                    <linearGradient id="soothingSuccessorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#065f46" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>

                    <linearGradient id="soothingPredecessorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6b21a8" />
                      <stop offset="100%" stopColor="#581c87" />
                    </linearGradient>

                    <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>

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
                              y1={pos.y + NODE_RADIUS * 0.8}
                              x2={childPos.x}
                              y2={childPos.y - NODE_RADIUS * 0.8}
                              stroke={inOpPath ? activeTheme.activeEdge : activeTheme.edge}
                              strokeWidth={inOpPath ? "2.5" : "1.75"}
                              strokeDasharray={inOpPath ? "6 3" : undefined}
                              className="transition-all duration-300"
                            />
                            {/* Directional Tag */}
                            <text
                              x={(pos.x + childPos.x) / 2 - 7}
                              y={(pos.y + childPos.y) / 2}
                              fill={inOpPath ? activeTheme.activeEdge : "#475569"}
                              fontSize="8"
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
                              y1={pos.y + NODE_RADIUS * 0.8}
                              x2={childPos.x}
                              y2={childPos.y - NODE_RADIUS * 0.8}
                              stroke={inOpPath ? activeTheme.activeEdge : activeTheme.edge}
                              strokeWidth={inOpPath ? "2.5" : "1.75"}
                              strokeDasharray={inOpPath ? "6 3" : undefined}
                              className="transition-all duration-300"
                            />
                            {/* Directional Tag */}
                            <text
                              x={(pos.x + childPos.x) / 2 + 7}
                              y={(pos.y + childPos.y) / 2}
                              fill={inOpPath ? activeTheme.activeEdge : "#475569"}
                              fontSize="8"
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

                    // Operation step states
                    const isOpActiveNode = currentOpStep?.activeNode === node.value;
                    const isOpTargetNode = currentOpStep?.isTargetNode === node.value;
                    const isOpSuccessorNode = currentOpStep?.isSuccessorNode === node.value;
                    const isOpPredecessorNode = currentOpStep?.isPredecessorNode === node.value;
                    const isOpSearchMatch = currentOpStep?.isSearchMatch === node.value;
                    const level = layout.nodeLevels.get(node.value) || 1;

                    let nodeFill = "url(#soothingNodeGrad)";
                    let nodeStroke = activeTheme.border;
                    let strokeWidth = "1.5";
                    let haloStroke = activeTheme.halo;

                    if (isOpTargetNode) {
                      nodeFill = "url(#soothingTargetGrad)";
                      nodeStroke = "rgba(244, 63, 94, 0.8)";
                      strokeWidth = "2.5";
                      haloStroke = "#f43f5e";
                    } else if (isOpSuccessorNode) {
                      nodeFill = "url(#soothingSuccessorGrad)";
                      nodeStroke = "rgba(52, 211, 153, 0.8)";
                      strokeWidth = "2.5";
                      haloStroke = "#34d399";
                    } else if (isOpPredecessorNode) {
                      nodeFill = "url(#soothingPredecessorGrad)";
                      nodeStroke = "rgba(192, 132, 252, 0.8)";
                      strokeWidth = "2.5";
                      haloStroke = "#c084fc";
                    } else if (isOpSearchMatch) {
                      nodeFill = "url(#soothingMatchGrad)";
                      nodeStroke = "rgba(52, 211, 153, 0.9)";
                      strokeWidth = "2.5";
                      haloStroke = "#34d399";
                    } else if (isOpActiveNode) {
                      nodeFill = "url(#soothingActiveGrad)";
                      nodeStroke = "rgba(56, 189, 248, 0.9)";
                      strokeWidth = "2.5";
                      haloStroke = activeTheme.halo;
                    } else if (isTraversalActive) {
                      nodeFill = "url(#soothingActiveGrad)";
                      nodeStroke = "rgba(251, 191, 36, 0.8)";
                      strokeWidth = "2.5";
                      haloStroke = "#fbbf24";
                    } else if (isSelected) {
                      nodeFill = "url(#soothingActiveGrad)";
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
                        {/* Soothing Concentric Animated Halo */}
                        {(isTraversalActive || isSelected || isOpActiveNode || isOpTargetNode || isOpSuccessorNode || isOpPredecessorNode || isOpSearchMatch) && (
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

                        {/* Main Node Body with Soothing Drop Shadow */}
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

                        {/* Soothing Level Pill */}
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

                        {/* Beautiful Floating Glassmorphism Comparison Pill */}
                        {isOpActiveNode && currentOpStep?.comparisonText && (
                          <g className="animate-bounce pointer-events-none" style={{ animationDuration: "1.8s" }}>
                            <rect
                              x={pos.x - 44}
                              y={pos.y - 44}
                              width="88"
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
        {/* 5. SECONDARY STUDIO EXPANDABLE TOOLS (NEAT & CLEAN) */}
        {/* =================================================================== */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-3 shadow-lg space-y-3">
          
          {/* Navigation Pill Buttons */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Studio Tools &amp; Blueprints:
            </span>

            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { key: "traversal", label: "Traversal Player", icon: "bi-play-circle" },
                { key: "lca", label: "LCA Calculator", icon: "bi-share" },
                { key: "rules", label: "Task Rules Guide", icon: "bi-journal-text" },
                { key: "code", label: "C Code Blueprint", icon: "bi-code-slash" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setBottomTab(bottomTab === tab.key ? null : tab.key)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition cursor-pointer flex items-center gap-1.5 ${
                    bottomTab === tab.key
                      ? "bg-sky-500/20 text-sky-200 border border-sky-500/40 shadow-sm"
                      : "bg-slate-950/70 text-slate-400 hover:text-white border border-slate-800/80"
                  }`}
                >
                  <i className={`bi ${tab.icon}`}></i>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Collapsible Content */}
          <AnimatePresence>
            {bottomTab && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="pt-2 border-t border-slate-800/60 overflow-hidden"
              >
                {/* 1. Traversal Player */}
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

                {/* 2. LCA Calculator */}
                {bottomTab === "lca" && (
                  <div className="p-1 space-y-2">
                    <p className="text-xs text-slate-400">
                      Find the Lowest Common Ancestor (LCA) split node for any two keys in O(h) time:
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

                {/* 3. Task Rules Guide */}
                {bottomTab === "rules" && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 p-1 text-xs">
                    {Object.values(TASK_RULES).map((rule, idx) => (
                      <div key={idx} className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-slate-100">{rule.title}</span>
                          <span className="text-[10px] text-sky-400 font-mono">{rule.badge}</span>
                        </div>
                        <p className="text-[11px] text-slate-400">{rule.invariants}</p>
                        <div className="space-y-1 text-[10px] text-slate-400">
                          {rule.steps.map((s, sIdx) => (
                            <div key={sIdx} className="flex gap-1.5">
                              <span className="text-sky-400 font-semibold">{s.step}.</span>
                              <span>{s.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. C Code Reference */}
                {bottomTab === "code" && (
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-[11px] font-mono text-sky-300">
                    <pre className="overflow-x-auto leading-relaxed">{`// BST Node Lookup & Insertion (O(log N) average)
TreeNode* insert(TreeNode* root, int key) {
    if (root == NULL) return new TreeNode(key);
    if (key < root->val) root->left = insert(root->left, key);
    else if (key > root->val) root->right = insert(root->right, key);
    return root;
}

// BST 3-Case Deletion
TreeNode* deleteNode(TreeNode* root, int key) {
    if (root == NULL) return NULL;
    if (key < root->val) root->left = deleteNode(root->left, key);
    else if (key > root->val) root->right = deleteNode(root->right, key);
    else {
        if (!root->left && !root->right) { delete root; return NULL; }
        if (!root->left) { TreeNode* t = root->right; delete root; return t; }
        if (!root->right) { TreeNode* t = root->left; delete root; return t; }
        TreeNode* succ = findMin(root->right);
        root->val = succ->val;
        root->right = deleteNode(root->right, succ->val);
    }
    return root;
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
              className="fixed bottom-5 right-5 z-50 w-72 bg-slate-900/95 backdrop-blur-2xl border border-slate-700/70 rounded-2xl shadow-2xl p-3.5 ring-1 ring-sky-500/20"
            >
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30 flex items-center justify-center font-mono font-bold text-xs">
                    {selectedNode.value}
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white">Node Inspector</h3>
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

              <div className="grid grid-cols-2 gap-1.5 text-xs mb-2.5">
                <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/80">
                  <span className="text-[9px] text-slate-400 block">Left Child</span>
                  <span className="font-mono font-semibold text-sky-300">{selectedNode.left}</span>
                </div>
                <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/80">
                  <span className="text-[9px] text-slate-400 block">Right Child</span>
                  <span className="font-mono font-semibold text-sky-300">{selectedNode.right}</span>
                </div>
                <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/80">
                  <span className="text-[9px] text-slate-400 block">Subtree Height</span>
                  <span className="font-semibold text-purple-300">{selectedNode.height}</span>
                </div>
                <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/80">
                  <span className="text-[9px] text-slate-400 block">Subtree Size</span>
                  <span className="font-semibold text-indigo-300">{selectedNode.size} nodes</span>
                </div>
              </div>

              <div className="flex gap-1.5">
                <button
                  onClick={() => {
                    const steps = generateAnimatedDeleteSteps(root, selectedNode.value, deleteStrategy);
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
                  className="flex-1 py-1 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 hover:text-white border border-sky-500/30 text-xs font-semibold transition cursor-pointer"
                >
                  Search
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