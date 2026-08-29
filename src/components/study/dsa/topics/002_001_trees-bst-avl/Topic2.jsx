import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";
import demoCode from "./topic2_files/BinarySearchTreeBstOperationsIDemo.c?raw";

// ============================================================================
// BST Core Logic & Node Definition
// ============================================================================
class BSTNode {
  constructor(value, left = null, right = null, id = null) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.id = id || `${value}-${Math.random().toString(36).substring(2, 7)}`;
  }
}

// Deep clone of a BST
const cloneBST = (root) => {
  if (!root) return null;
  return new BSTNode(root.value, cloneBST(root.left), cloneBST(root.right), root.id);
};

// Immutable BST Insert
const insertBST = (root, val) => {
  if (!root) return new BSTNode(val);
  if (val < root.value) {
    return new BSTNode(root.value, insertBST(root.left, val), root.right, root.id);
  } else if (val > root.value) {
    return new BSTNode(root.value, root.left, insertBST(root.right, val), root.id);
  }
  return root;
};

// Min / Max Node finders
const findMinNode = (node) => {
  let curr = node;
  while (curr && curr.left) curr = curr.left;
  return curr;
};

const findMaxNode = (node) => {
  let curr = node;
  while (curr && curr.right) curr = curr.right;
  return curr;
};

// Immutable BST Delete (Successor)
const deleteUsingSuccessorBST = (root, val) => {
  if (!root) return null;
  if (val < root.value) {
    return new BSTNode(root.value, deleteUsingSuccessorBST(root.left, val), root.right, root.id);
  } else if (val > root.value) {
    return new BSTNode(root.value, root.left, deleteUsingSuccessorBST(root.right, val), root.id);
  } else {
    if (!root.left && !root.right) return null;
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    const succ = findMinNode(root.right);
    return new BSTNode(succ.value, root.left, deleteUsingSuccessorBST(root.right, succ.value), root.id);
  }
};

// Immutable BST Delete (Predecessor)
const deleteUsingPredecessorBST = (root, val) => {
  if (!root) return null;
  if (val < root.value) {
    return new BSTNode(root.value, deleteUsingPredecessorBST(root.left, val), root.right, root.id);
  } else if (val > root.value) {
    return new BSTNode(root.value, root.left, deleteUsingPredecessorBST(root.right, val), root.id);
  } else {
    if (!root.left && !root.right) return null;
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    const pred = findMaxNode(root.left);
    return new BSTNode(pred.value, deleteUsingPredecessorBST(root.left, pred.value), root.right, root.id);
  }
};

// Traversals & Metrics
const getInorderArray = (root, res = []) => {
  if (!root) return res;
  getInorderArray(root.left, res);
  res.push(root.value);
  getInorderArray(root.right, res);
  return res;
};

const getTreeDepth = (root) => {
  if (!root) return 0;
  return 1 + Math.max(getTreeDepth(root.left), getTreeDepth(root.right));
};

const countTreeNodes = (root) => {
  if (!root) return 0;
  return 1 + countTreeNodes(root.left) + countTreeNodes(root.right);
};

const countLeafNodes = (root) => {
  if (!root) return 0;
  if (!root.left && !root.right) return 1;
  return countLeafNodes(root.left) + countLeafNodes(root.right);
};

// Compute 2D tree layout coordinates
const calculateTreeLayout = (node, depth = 0, leftBoundary = 40, rightBoundary = 760) => {
  if (!node) return { nodes: [], edges: [] };

  const x = (leftBoundary + rightBoundary) / 2;
  const y = 50 + depth * 75;

  const currentLayoutNode = {
    id: node.id,
    value: node.value,
    x,
    y,
    depth,
    hasLeft: Boolean(node.left),
    hasRight: Boolean(node.right),
    childCount: (node.left ? 1 : 0) + (node.right ? 1 : 0),
  };

  let allNodes = [currentLayoutNode];
  let allEdges = [];

  if (node.left) {
    const leftLayout = calculateTreeLayout(node.left, depth + 1, leftBoundary, x);
    allNodes = allNodes.concat(leftLayout.nodes);
    allEdges.push({
      id: `${node.value}->${node.left.value}`,
      fromValue: node.value,
      toValue: node.left.value,
      fromX: x,
      fromY: y,
      toX: leftLayout.nodes[0].x,
      toY: leftLayout.nodes[0].y,
      branch: "L",
    });
    allEdges = allEdges.concat(leftLayout.edges);
  }

  if (node.right) {
    const rightLayout = calculateTreeLayout(node.right, depth + 1, x, rightBoundary);
    allNodes = allNodes.concat(rightLayout.nodes);
    allEdges.push({
      id: `${node.value}->${node.right.value}`,
      fromValue: node.value,
      toValue: node.right.value,
      fromX: x,
      fromY: y,
      toX: rightLayout.nodes[0].x,
      toY: rightLayout.nodes[0].y,
      branch: "R",
    });
    allEdges = allEdges.concat(rightLayout.edges);
  }

  return { nodes: allNodes, edges: allEdges };
};

const createTreeFromList = (arr) => {
  let tree = null;
  for (const v of arr) {
    tree = insertBST(tree, v);
  }
  return tree;
};

// ============================================================================
// ANIMATION STEP GENERATORS
// ============================================================================
const generateInsertAnimationSteps = (initialTree, val) => {
  const steps = [];
  const currentPath = [];
  const activeEdges = [];

  steps.push({
    title: "1. Start Insertion Traversal",
    tree: cloneBST(initialTree),
    activeNode: initialTree ? initialTree.value : null,
    highlightedPath: [],
    activeEdges: [],
    targetVal: val,
    badgeText: `Insert(${val})`,
    badgeColor: "bg-cyan-500",
    message: `Starting BST Insertion for key ${val} at Root.`,
    cCode: `BSTNode* insert(BSTNode* root, int value = ${val})`,
    pointerInfo: "Pointer register initialized at root.",
  });

  let curr = initialTree;
  let parent = null;
  let branchSide = null;

  while (curr) {
    currentPath.push(curr.value);

    if (val === curr.value) {
      steps.push({
        title: "Duplicate Key Detected",
        tree: cloneBST(initialTree),
        activeNode: curr.value,
        highlightedPath: [...currentPath],
        activeEdges: [...activeEdges],
        targetVal: val,
        badgeText: "DUPLICATE",
        badgeColor: "bg-amber-500",
        message: `Key ${val} matches node ${curr.value}. In standard BST, duplicates are disallowed. Insertion aborted!`,
        cCode: `if (value == root->data) return root; // Duplicate rejected`,
        pointerInfo: `Node already exists at memory 0x${(3000 + curr.value * 8).toString(16)}.`,
        isFinal: true,
      });
      return steps;
    }

    if (val < curr.value) {
      steps.push({
        title: `Compare: ${val} < ${curr.value} → Branch LEFT`,
        tree: cloneBST(initialTree),
        activeNode: curr.value,
        highlightedPath: [...currentPath],
        activeEdges: [...activeEdges],
        targetVal: val,
        comparisonText: `${val} < ${curr.value} ⬅️`,
        badgeText: "BRANCH LEFT",
        badgeColor: "bg-sky-500",
        message: `Since ${val} < ${curr.value}, navigate to LEFT subtree: root->left.`,
        cCode: `root->left = insert(root->left, ${val});`,
        pointerInfo: `curr = curr->left (checking 0x${curr.left ? (3000 + curr.left.value * 8).toString(16) : "0x0 (NULL)"})`,
      });
      parent = curr;
      branchSide = "left";
      if (curr.left) {
        activeEdges.push(`${curr.value}->${curr.left.value}`);
      }
      curr = curr.left;
    } else {
      steps.push({
        title: `Compare: ${val} > ${curr.value} → Branch RIGHT`,
        tree: cloneBST(initialTree),
        activeNode: curr.value,
        highlightedPath: [...currentPath],
        activeEdges: [...activeEdges],
        targetVal: val,
        comparisonText: `${val} > ${curr.value} ➡️`,
        badgeText: "BRANCH RIGHT",
        badgeColor: "bg-indigo-500",
        message: `Since ${val} > ${curr.value}, navigate to RIGHT subtree: root->right.`,
        cCode: `root->right = insert(root->right, ${val});`,
        pointerInfo: `curr = curr->right (checking 0x${curr.right ? (3000 + curr.right.value * 8).toString(16) : "0x0 (NULL)"})`,
      });
      parent = curr;
      branchSide = "right";
      if (curr.right) {
        activeEdges.push(`${curr.value}->${curr.right.value}`);
      }
      curr = curr.right;
    }
  }

  // Reach NULL leaf position
  const finalTree = insertBST(initialTree, val);
  steps.push({
    title: "Empty Slot Reached: Allocate & Attach Leaf",
    tree: finalTree,
    activeNode: val,
    highlightedPath: [...currentPath, val],
    activeEdges: [...activeEdges],
    targetVal: val,
    isNewlyInserted: val,
    badgeText: "ATTACH LEAF",
    badgeColor: "bg-emerald-500",
    message: `Reached NULL pointer on ${branchSide ? branchSide.toUpperCase() : "ROOT"} of parent ${parent ? parent.value : "NULL"}. Created new BSTNode(${val}) and linked pointer.`,
    cCode: `if (root == NULL) return createNode(${val});`,
    pointerInfo: `Allocated 24 bytes in RAM at 0x${(3000 + val * 8).toString(16)}. Zero leaks verified.`,
    isFinal: true,
  });

  return steps;
};

const generateSearchAnimationSteps = (initialTree, val) => {
  const steps = [];
  const currentPath = [];
  const activeEdges = [];

  steps.push({
    title: "1. Start Search at Root",
    tree: cloneBST(initialTree),
    activeNode: initialTree ? initialTree.value : null,
    highlightedPath: [],
    activeEdges: [],
    targetVal: val,
    badgeText: `Search(${val})`,
    badgeColor: "bg-cyan-500",
    message: `Initializing BST binary elimination search for target key ${val} at Root.`,
    cCode: `BSTNode* search(BSTNode* root, int key = ${val})`,
    pointerInfo: "Pointer register initialized at root.",
  });

  let curr = initialTree;
  while (curr) {
    currentPath.push(curr.value);

    if (curr.value === val) {
      steps.push({
        title: `MATCH FOUND! Key ${val} Located`,
        tree: cloneBST(initialTree),
        activeNode: curr.value,
        highlightedPath: [...currentPath],
        activeEdges: [...activeEdges],
        targetVal: val,
        isSuccess: true,
        comparisonText: `MATCH: ${val} == ${curr.value} 🎯`,
        badgeText: "FOUND 🎯",
        badgeColor: "bg-emerald-500",
        message: `Success! Target key ${val} located in BST after visiting [${currentPath.join(" → ")}] (${currentPath.length} comparison levels).`,
        cCode: `if (root->data == key) return root; // Key ${val} found!`,
        pointerInfo: `Returned valid pointer to node at memory 0x${(3000 + curr.value * 8).toString(16)}.`,
        isFinal: true,
      });
      return steps;
    }

    if (val < curr.value) {
      steps.push({
        title: `Compare: ${val} < ${curr.value} → Discard Right, Go LEFT`,
        tree: cloneBST(initialTree),
        activeNode: curr.value,
        highlightedPath: [...currentPath],
        activeEdges: [...activeEdges],
        targetVal: val,
        comparisonText: `${val} < ${curr.value} ⬅️`,
        badgeText: "BRANCH LEFT",
        badgeColor: "bg-sky-500",
        message: `Target ${val} is smaller than ${curr.value}. Entire right subtree eliminated from search. Stepping left.`,
        cCode: `return search(root->left, ${val});`,
        pointerInfo: `root = root->left (0x${curr.left ? (3000 + curr.left.value * 8).toString(16) : "0x0"})`,
      });
      if (curr.left) {
        activeEdges.push(`${curr.value}->${curr.left.value}`);
      }
      curr = curr.left;
    } else {
      steps.push({
        title: `Compare: ${val} > ${curr.value} → Discard Left, Go RIGHT`,
        tree: cloneBST(initialTree),
        activeNode: curr.value,
        highlightedPath: [...currentPath],
        activeEdges: [...activeEdges],
        targetVal: val,
        comparisonText: `${val} > ${curr.value} ➡️`,
        badgeText: "BRANCH RIGHT",
        badgeColor: "bg-indigo-500",
        message: `Target ${val} is greater than ${curr.value}. Entire left subtree eliminated from search. Stepping right.`,
        cCode: `return search(root->right, ${val});`,
        pointerInfo: `root = root->right (0x${curr.right ? (3000 + curr.right.value * 8).toString(16) : "0x0"})`,
      });
      if (curr.right) {
        activeEdges.push(`${curr.value}->${curr.right.value}`);
      }
      curr = curr.right;
    }
  }

  // Not found
  steps.push({
    title: `Search Exhausted: Key ${val} NOT FOUND`,
    tree: cloneBST(initialTree),
    activeNode: null,
    highlightedPath: [...currentPath],
    activeEdges: [...activeEdges],
    targetVal: val,
    isFailed: true,
    badgeText: "NOT FOUND ❌",
    badgeColor: "bg-rose-500",
    message: `Reached NULL pointer after checking path [${currentPath.join(" → ")}]. Key ${val} does not exist in BST.`,
    cCode: `if (root == NULL) return NULL; // Search failed`,
    pointerInfo: "Pointer register is NULL (0x0). Invariant verified.",
    isFinal: true,
  });

  return steps;
};

const generateDeleteAnimationSteps = (initialTree, val, method = "successor") => {
  const steps = [];
  const currentPath = [];
  const activeEdges = [];

  // Step 1: Search and locate target
  steps.push({
    title: "1. Locate Target Node for Deletion",
    tree: cloneBST(initialTree),
    activeNode: initialTree ? initialTree.value : null,
    highlightedPath: [],
    activeEdges: [],
    targetVal: val,
    badgeText: `Delete(${val})`,
    badgeColor: "bg-rose-500",
    message: `Searching BST to locate target node ${val} for deletion.`,
    cCode: `BSTNode* deleteNode(BSTNode* root, int key = ${val})`,
    pointerInfo: "Navigating to target node address.",
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
      if (curr.left) activeEdges.push(`${curr.value}->${curr.left.value}`);
      curr = curr.left;
    } else {
      if (curr.right) activeEdges.push(`${curr.value}->${curr.right.value}`);
      curr = curr.right;
    }
  }

  if (!targetNode) {
    steps.push({
      title: `Target ${val} Not Found: Deletion Aborted`,
      tree: cloneBST(initialTree),
      activeNode: null,
      highlightedPath: [...currentPath],
      activeEdges: [...activeEdges],
      targetVal: val,
      badgeText: "NOT FOUND",
      badgeColor: "bg-slate-500",
      message: `Node ${val} does not exist in the BST. No pointers were modified.`,
      cCode: `if (root == NULL) return NULL;`,
      pointerInfo: "No deallocation performed.",
      isFinal: true,
    });
    return steps;
  }

  // Target located
  steps.push({
    title: `2. Target Located: Node ${val}`,
    tree: cloneBST(initialTree),
    activeNode: val,
    isTarget: val,
    highlightedPath: [...currentPath],
    activeEdges: [...activeEdges],
    targetVal: val,
    badgeText: "TARGET FOUND",
    badgeColor: "bg-rose-600",
    message: `Target node ${val} located! Analyzing child degree structure...`,
    cCode: `// Target node located at memory 0x${(3000 + val * 8).toString(16)}`,
    pointerInfo: `Child Count: ${(targetNode.left ? 1 : 0) + (targetNode.right ? 1 : 0)}`,
  });

  // CASE 1: Leaf (0 children)
  if (!targetNode.left && !targetNode.right) {
    steps.push({
      title: `CASE 1: Leaf Node Deletion (0 Children)`,
      tree: cloneBST(initialTree),
      activeNode: val,
      isTarget: val,
      isBeingFreed: val,
      highlightedPath: [...currentPath],
      activeEdges: [...activeEdges],
      targetVal: val,
      badgeText: "CASE 1: LEAF",
      badgeColor: "bg-emerald-500",
      message: `Target ${val} is a Leaf (0 children). Calling free(${val}) and returning NULL so parent link is cleared.`,
      cCode: `if (root->left == NULL && root->right == NULL) {\n    free(root);\n    return NULL;\n}`,
      pointerInfo: `Deallocated 24 bytes at 0x${(3000 + val * 8).toString(16)}. Parent pointer set to NULL.`,
    });

    const finalTree =
      method === "successor"
        ? deleteUsingSuccessorBST(initialTree, val)
        : deleteUsingPredecessorBST(initialTree, val);

    steps.push({
      title: `Deletion Complete: Leaf ${val} Removed`,
      tree: finalTree,
      activeNode: null,
      highlightedPath: [],
      activeEdges: [],
      targetVal: val,
      badgeText: "COMPLETED",
      badgeColor: "bg-emerald-600",
      message: `Leaf node ${val} successfully deallocated. BST invariant preserved.`,
      cCode: `// Memory freed. Zero dangling pointers.`,
      pointerInfo: "Tree structure updated cleanly.",
      isFinal: true,
    });
    return steps;
  }

  // CASE 2: Single Child (1 Child)
  if (!targetNode.left || !targetNode.right) {
    const singleChild = targetNode.left ? targetNode.left.value : targetNode.right.value;
    const side = targetNode.left ? "left" : "right";

    steps.push({
      title: `CASE 2: Single Child Deletion (1 Child: ${singleChild})`,
      tree: cloneBST(initialTree),
      activeNode: val,
      isTarget: val,
      promotedChild: singleChild,
      highlightedPath: [...currentPath],
      activeEdges: [...activeEdges],
      targetVal: val,
      badgeText: `CASE 2: 1 CHILD (${side.toUpperCase()})`,
      badgeColor: "bg-amber-500",
      message: `Target ${val} has exactly one child (${singleChild}). Bypassing node ${val}: grandparent adopts grandchild ${singleChild}. Calling free(${val}).`,
      cCode: `BSTNode* temp = root->${side};\nfree(root);\nreturn temp; // Child ${singleChild} promoted`,
      pointerInfo: `Parent pointer updated directly to child 0x${(3000 + singleChild * 8).toString(16)}.`,
    });

    const finalTree =
      method === "successor"
        ? deleteUsingSuccessorBST(initialTree, val)
        : deleteUsingPredecessorBST(initialTree, val);

    steps.push({
      title: `Deletion Complete: Node ${val} Bypassed & Child ${singleChild} Promoted`,
      tree: finalTree,
      activeNode: singleChild,
      highlightedPath: [],
      activeEdges: [],
      targetVal: val,
      badgeText: "COMPLETED",
      badgeColor: "bg-emerald-600",
      message: `Node ${val} freed. Grandchild ${singleChild} promoted into position.`,
      cCode: `// Node ${val} freed without losing ${singleChild}'s subtree.`,
      pointerInfo: "BST order intact.",
      isFinal: true,
    });
    return steps;
  }

  // CASE 3: Two Children (2 Children)
  if (method === "successor") {
    // 3A: Inorder Successor
    steps.push({
      title: `CASE 3A: Target ${val} has TWO Children → Search Inorder Successor`,
      tree: cloneBST(initialTree),
      activeNode: val,
      isTarget: val,
      highlightedPath: [...currentPath],
      activeEdges: [...activeEdges],
      targetVal: val,
      badgeText: "CASE 3A: SUCCESSOR",
      badgeColor: "bg-cyan-500",
      message: `Target ${val} has 2 children. Initiating search for Inorder Successor (minimum node in Right Subtree: findMin(root->right)).`,
      cCode: `BSTNode* succ = findMin(root->right); // Min of right subtree`,
      pointerInfo: `Moving right once (to 0x${(3000 + targetNode.right.value * 8).toString(16)}), then following left pointers.`,
    });

    // Trace to successor
    let succCurr = targetNode.right;
    const succPath = [targetNode.right.value];
    while (succCurr.left) {
      succCurr = succCurr.left;
      succPath.push(succCurr.value);
    }
    const succVal = succCurr.value;

    steps.push({
      title: `Inorder Successor Located: Key ${succVal}`,
      tree: cloneBST(initialTree),
      activeNode: succVal,
      isTarget: val,
      isSuccessor: succVal,
      highlightedPath: [...currentPath, ...succPath],
      activeEdges: [...activeEdges],
      targetVal: val,
      badgeText: `SUCCESSOR: ${succVal}`,
      badgeColor: "bg-cyan-400",
      message: `Found Inorder Successor ${succVal} (smallest key in right subtree). Guaranteed to have AT MOST 1 child!`,
      cCode: `// Successor ${succVal} has left == NULL`,
      pointerInfo: `Successor address: 0x${(3000 + succVal * 8).toString(16)}.`,
    });

    // Intermediate tree state: value copied into target
    const intermediateTree = cloneBST(initialTree);
    const replaceValInTree = (node) => {
      if (!node) return;
      if (node.value === val) node.value = succVal;
      replaceValInTree(node.left);
      replaceValInTree(node.right);
    };
    replaceValInTree(intermediateTree);

    steps.push({
      title: `Value Copy: Replace Target ${val} with Successor ${succVal}`,
      tree: intermediateTree,
      activeNode: succVal,
      isTarget: succVal,
      isSuccessor: succVal,
      highlightedPath: [...currentPath],
      activeEdges: [...activeEdges],
      targetVal: val,
      badgeText: `COPY VALUE (${succVal})`,
      badgeColor: "bg-indigo-500",
      message: `Copied successor value ${succVal} into target node. Now recursively deleting original successor ${succVal} from right subtree (Case 1 or 2).`,
      cCode: `root->data = succ->data; // root value is now ${succVal}\nroot->right = deleteNode(root->right, succ->data);`,
      pointerInfo: "Value overwritten. Subtree cleanup triggered.",
    });

    const finalTree = deleteUsingSuccessorBST(initialTree, val);

    steps.push({
      title: `Deletion Complete: Successor ${succVal} Promoted, Old Node Removed`,
      tree: finalTree,
      activeNode: succVal,
      highlightedPath: [],
      activeEdges: [],
      targetVal: val,
      badgeText: "COMPLETED",
      badgeColor: "bg-emerald-600",
      message: `Success! Target ${val} successfully deleted and replaced by Inorder Successor ${succVal}. All subtrees remain valid BSTs.`,
      cCode: `// Case 3 deletion completed with zero memory leaks.`,
      pointerInfo: "Full tree balance and BST search invariant intact.",
      isFinal: true,
    });
    return steps;
  } else {
    // 3B: Inorder Predecessor
    steps.push({
      title: `CASE 3B: Target ${val} has TWO Children → Search Inorder Predecessor`,
      tree: cloneBST(initialTree),
      activeNode: val,
      isTarget: val,
      highlightedPath: [...currentPath],
      activeEdges: [...activeEdges],
      targetVal: val,
      badgeText: "CASE 3B: PREDECESSOR",
      badgeColor: "bg-purple-500",
      message: `Target ${val} has 2 children. Initiating search for Inorder Predecessor (maximum node in Left Subtree: findMax(root->left)).`,
      cCode: `BSTNode* pred = findMax(root->left); // Max of left subtree`,
      pointerInfo: `Moving left once (to 0x${(3000 + targetNode.left.value * 8).toString(16)}), then following right pointers.`,
    });

    let predCurr = targetNode.left;
    const predPath = [targetNode.left.value];
    while (predCurr.right) {
      predCurr = predCurr.right;
      predPath.push(predCurr.value);
    }
    const predVal = predCurr.value;

    steps.push({
      title: `Inorder Predecessor Located: Key ${predVal}`,
      tree: cloneBST(initialTree),
      activeNode: predVal,
      isTarget: val,
      isPredecessor: predVal,
      highlightedPath: [...currentPath, ...predPath],
      activeEdges: [...activeEdges],
      targetVal: val,
      badgeText: `PREDECESSOR: ${predVal}`,
      badgeColor: "bg-purple-400",
      message: `Found Inorder Predecessor ${predVal} (largest key in left subtree). Guaranteed to have AT MOST 1 child!`,
      cCode: `// Predecessor ${predVal} has right == NULL`,
      pointerInfo: `Predecessor address: 0x${(3000 + predVal * 8).toString(16)}.`,
    });

    const intermediateTree = cloneBST(initialTree);
    const replaceValInTree = (node) => {
      if (!node) return;
      if (node.value === val) node.value = predVal;
      replaceValInTree(node.left);
      replaceValInTree(node.right);
    };
    replaceValInTree(intermediateTree);

    steps.push({
      title: `Value Copy: Replace Target ${val} with Predecessor ${predVal}`,
      tree: intermediateTree,
      activeNode: predVal,
      isTarget: predVal,
      isPredecessor: predVal,
      highlightedPath: [...currentPath],
      activeEdges: [...activeEdges],
      targetVal: val,
      badgeText: `COPY VALUE (${predVal})`,
      badgeColor: "bg-indigo-500",
      message: `Copied predecessor value ${predVal} into target node. Now recursively deleting original predecessor ${predVal} from left subtree (Case 1 or 2).`,
      cCode: `root->data = pred->data; // root value is now ${predVal}\nroot->left = deleteNode(root->left, pred->data);`,
      pointerInfo: "Value overwritten. Subtree cleanup triggered.",
    });

    const finalTree = deleteUsingPredecessorBST(initialTree, val);

    steps.push({
      title: `Deletion Complete: Predecessor ${predVal} Promoted, Old Node Removed`,
      tree: finalTree,
      activeNode: predVal,
      highlightedPath: [],
      activeEdges: [],
      targetVal: val,
      badgeText: "COMPLETED",
      badgeColor: "bg-emerald-600",
      message: `Success! Target ${val} successfully deleted and replaced by Inorder Predecessor ${predVal}. All subtrees remain valid BSTs.`,
      cCode: `// Case 3 deletion completed with zero memory leaks.`,
      pointerInfo: "Full tree balance and BST search invariant intact.",
      isFinal: true,
    });
    return steps;
  }
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function Topic2() {
  const sectionRefs = useRef([]);

  // Base Tree State
  const [treeRoot, setTreeRoot] = useState(() =>
    createTreeFromList([50, 30, 70, 20, 40, 60, 80])
  );
  const [inputValue, setInputValue] = useState("");
  const [deleteTarget, setDeleteTarget] = useState("50");
  const [deletionMethod, setDeletionMethod] = useState("successor"); // "successor" or "predecessor"

  // Step-by-Step Animation State Engine
  const [animSteps, setAnimSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(900); // ms per step

  // Theory Tab state
  const [activeTab, setActiveTab] = useState("case3");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.08 }
    );

    sectionRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addRef = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  // Auto-play timer
  useEffect(() => {
    let timer = null;
    if (isAutoPlaying && animSteps.length > 0) {
      if (currentStepIdx < animSteps.length - 1) {
        timer = setTimeout(() => {
          setCurrentStepIdx((prev) => prev + 1);
        }, animationSpeed);
      } else {
        // Finished last step -> update base tree
        const lastStep = animSteps[animSteps.length - 1];
        if (lastStep && lastStep.tree) {
          setTreeRoot(lastStep.tree);
        }
        setIsAutoPlaying(false);
      }
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAutoPlaying, currentStepIdx, animSteps, animationSpeed]);

  // Current active step data or static tree fallback
  const currentStep = useMemo(() => {
    if (animSteps.length > 0 && animSteps[currentStepIdx]) {
      return animSteps[currentStepIdx];
    }
    return {
      title: "BST Ready",
      tree: treeRoot,
      activeNode: null,
      highlightedPath: [],
      activeEdges: [],
      message: "Tree state ready. Click Insert, Search, or Delete to start step-by-step animation.",
      cCode: "// Invariant: Left < Root < Right. Zero memory leaks.",
      pointerInfo: "Pointer registers quiescent.",
    };
  }, [animSteps, currentStepIdx, treeRoot]);

  // Dynamic layout for currently displayed tree
  const activeTreeToRender = currentStep.tree || treeRoot;
  const layout = useMemo(() => {
    return calculateTreeLayout(activeTreeToRender, 0, 40, 760);
  }, [activeTreeToRender]);

  const treeMetrics = useMemo(() => {
    const total = countTreeNodes(treeRoot);
    const depth = getTreeDepth(treeRoot);
    const leaves = countLeafNodes(treeRoot);
    const inorderList = getInorderArray(treeRoot);
    const minVal = inorderList.length > 0 ? inorderList[0] : "—";
    const maxVal = inorderList.length > 0 ? inorderList[inorderList.length - 1] : "—";
    return { total, depth, leaves, inorderList, minVal, maxVal };
  }, [treeRoot]);

  // Trigger Insert with Steps
  const startInsertAnimation = useCallback(() => {
    const val =
      inputValue.trim() !== ""
        ? parseInt(inputValue, 10)
        : Math.floor(Math.random() * 85 + 10);
    if (isNaN(val)) return;

    const steps = generateInsertAnimationSteps(treeRoot, val);
    setAnimSteps(steps);
    setCurrentStepIdx(0);
    setIsAutoPlaying(true);
    setInputValue("");
  }, [inputValue, treeRoot]);

  // Trigger Search with Steps
  const startSearchAnimation = useCallback(() => {
    const val = parseInt(inputValue.trim() || deleteTarget, 10);
    if (isNaN(val)) return;

    const steps = generateSearchAnimationSteps(treeRoot, val);
    setAnimSteps(steps);
    setCurrentStepIdx(0);
    setIsAutoPlaying(true);
  }, [inputValue, deleteTarget, treeRoot]);

  // Trigger Delete with Steps
  const startDeleteAnimation = useCallback(() => {
    const val = parseInt(deleteTarget, 10);
    if (isNaN(val)) return;

    const steps = generateDeleteAnimationSteps(treeRoot, val, deletionMethod);
    setAnimSteps(steps);
    setCurrentStepIdx(0);
    setIsAutoPlaying(true);
  }, [deleteTarget, deletionMethod, treeRoot]);

  // Playback navigation
  const handleStepNext = () => {
    if (currentStepIdx < animSteps.length - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      if (nextIdx === animSteps.length - 1 && animSteps[nextIdx].tree) {
        setTreeRoot(animSteps[nextIdx].tree);
      }
    }
  };

  const handleStepPrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const handleResetAnimation = () => {
    setIsAutoPlaying(false);
    if (animSteps.length > 0) {
      const lastStep = animSteps[animSteps.length - 1];
      if (lastStep && lastStep.tree) {
        setTreeRoot(lastStep.tree);
      }
    }
    setAnimSteps([]);
    setCurrentStepIdx(0);
  };

  // Preset Loaders
  const loadPreset = (type) => {
    setIsAutoPlaying(false);
    setAnimSteps([]);
    setCurrentStepIdx(0);

    if (type === "balanced") {
      setTreeRoot(createTreeFromList([50, 30, 70, 20, 40, 60, 80]));
      setDeleteTarget("50");
    } else if (type === "case1_leaf") {
      setTreeRoot(createTreeFromList([50, 30, 70, 20, 40, 60, 80]));
      setDeleteTarget("20");
    } else if (type === "case2_left") {
      setTreeRoot(createTreeFromList([50, 30, 70, 25, 60, 80]));
      setDeleteTarget("30");
    } else if (type === "case2_right") {
      setTreeRoot(createTreeFromList([50, 30, 70, 20, 40, 85]));
      setDeleteTarget("70");
    } else if (type === "case3_root") {
      setTreeRoot(createTreeFromList([50, 30, 70, 20, 40, 60, 80, 35, 45]));
      setDeleteTarget("50");
    }
  };

  return (
    <>
      <style>{`
        .reveal-section {
          opacity: 0.99;
          transform: translateY(0);
          transition: opacity 0.4s ease-out, transform 0.4s ease-out;
        }
        .reveal-section.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @keyframes tracerPulse {
          0%, 100% {
            r: 25px;
            opacity: 0.9;
            filter: drop-shadow(0 0 12px rgba(6, 182, 212, 0.9));
          }
          50% {
            r: 30px;
            opacity: 0.4;
            filter: drop-shadow(0 0 24px rgba(56, 189, 248, 1));
          }
        }
        @keyframes targetPulse {
          0%, 100% {
            r: 25px;
            filter: drop-shadow(0 0 12px rgba(244, 63, 94, 0.9));
          }
          50% {
            r: 29px;
            filter: drop-shadow(0 0 22px rgba(225, 29, 72, 1));
          }
        }
        @keyframes successorPulse {
          0%, 100% {
            r: 25px;
            filter: drop-shadow(0 0 12px rgba(16, 185, 129, 0.9));
          }
          50% {
            r: 29px;
            filter: drop-shadow(0 0 22px rgba(52, 211, 153, 1));
          }
        }
        .tracer-glow {
          animation: tracerPulse 1.2s infinite ease-in-out;
        }
        .target-glow {
          animation: targetPulse 1.2s infinite ease-in-out;
        }
        .successor-glow {
          animation: successorPulse 1.2s infinite ease-in-out;
        }
        .edge-active {
          stroke: #38bdf8 !important;
          stroke-width: 3.5px !important;
          stroke-dasharray: 6 3;
          animation: dashMove 0.8s linear infinite;
        }
        @keyframes dashMove {
          to { stroke-dashoffset: -18; }
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        
        {/* SECTION 1: HEADER & METADATA */}
        <header ref={addRef} className="reveal-section max-w-6xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-700/70 text-cyan-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>⚡</span>
            <span>DSA Segment 2 · Topic 2</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            Binary Search Tree (BST) Architecture &amp; Complete 3-Case Deletion Mechanics
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Master the foundational BST search invariant, dynamic insertion, and exhaustive step-by-step 3-Case Deletions using both Inorder Successor &amp; Inorder Predecessor methods with smooth animated step-by-step visualization at Coder &amp; AccoTax Barrackpore Lab.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Course Code: DSA-C-202</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-sky-400">Center: Coder &amp; AccoTax (Barrackpore Lab)</span>
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-emerald-400">Mentor: Sukanta Hui</span>
          </div>
        </header>

        {/* SECTION 2: FRIENDLY TEACHER'S DESK */}
        <section ref={addRef} className="reveal-section max-w-6xl mx-auto mb-12 space-y-6">
          <div className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/30 border border-cyan-500/30 rounded-2xl p-6 md:p-8 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl">
                👨‍🏫
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300">
                  Teacher's Desk: Physical Mental Models &amp; Deletion Intuition
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Sukanta Hui &amp; Barrackpore Lab Classroom Dialogue
                </p>
              </div>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-cyan-400 font-bold flex items-center gap-2 text-base">
                  <span>💡</span> Why a Tree is NOT a Linked List: Logarithmic Search vs Linear Scans
                </h3>
                <p>
                  In a linear linked list, every search requires visiting nodes one by one ($O(N)$ sequential pointer chasing). In contrast, a <strong>Binary Search Tree (BST)</strong> enforces an ordering invariant at every vertex: all elements strictly smaller live in the left subtree, and all elements strictly larger live in the right subtree. At each step, a single comparison halves the remaining search space, converting a slow $O(N)$ scan into an ultra-fast $O(\log N)$ logarithmic traversal!
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Barrackpore Lab Classroom Discussion on 3-Case Deletions
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-cyan-500/40 pl-4 py-1">
                  <p>
                    <strong className="text-emerald-400">Swadeep:</strong> <em>"Sir, why is deletion in a BST so much more complex than insertion?"</em>
                  </p>
                  <p>
                    <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Because insertion always occurs at an empty leaf position ($NULL$ pointer), whereas deletion can target any internal node in the middle of the tree! If the node has 2 children, removing it directly would sever both subtrees and shatter the tree into disconnected fragments."</em>
                  </p>
                  <p>
                    <strong className="text-emerald-400">Tuhina:</strong> <em>"And that's why we use either the Inorder Successor or Predecessor! Because they are guaranteed to have at most ONE child, reducing Case 3 back into an easy Case 1 or 2 deletion!"</em>
                  </p>
                  <p>
                    <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Spot on, Tuhina! We copy the value, and then perform a simple leaf or single-child deallocation. Watch the smooth animation below step by step."</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: AUTHENTIC 2D INTERACTIVE BST VISUALIZER WITH SMOOTH ANIMATION */}
        <section ref={addRef} className="reveal-section max-w-6xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            
            {/* Visualizer Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 flex items-center gap-2">
                  <span>🔬</span> Interactive 2D BST Visualizer &amp; Step-by-Step Animation Engine
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Hierarchical branch-tracing, step-by-step playback, comparison callouts, and pointer diagnostics
                </p>
              </div>

              {/* Metrics Badges */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-400">
                  Total Nodes: <strong className="text-white">{treeMetrics.total}</strong>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-sky-400">
                  Height: <strong className="text-white">{treeMetrics.depth}</strong>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-400">
                  Leaves: <strong className="text-white">{treeMetrics.leaves}</strong>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-purple-400">
                  Range: <strong className="text-white">[{treeMetrics.minVal} .. {treeMetrics.maxVal}]</strong>
                </div>
              </div>
            </div>

            {/* Presets Toolbar */}
            <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
                Quick Presets:
              </span>
              <button
                onClick={() => loadPreset("balanced")}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-800/50 transition-all"
              >
                🌳 Balanced 7-Node BST
              </button>
              <button
                onClick={() => loadPreset("case1_leaf")}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 hover:bg-slate-800 text-emerald-300 border border-emerald-800/50 transition-all"
              >
                🍃 Case 1: Leaf (0 Child)
              </button>
              <button
                onClick={() => loadPreset("case2_left")}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-800/50 transition-all"
              >
                🌿 Case 2A: 1 Child (Left)
              </button>
              <button
                onClick={() => loadPreset("case2_right")}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-800/50 transition-all"
              >
                🌿 Case 2B: 1 Child (Right)
              </button>
              <button
                onClick={() => loadPreset("case3_root")}
                className="px-2.5 py-1 text-xs rounded-lg bg-slate-900 hover:bg-slate-800 text-rose-300 border border-rose-800/50 transition-all"
              >
                ⚡ Case 3: 2 Children (Root)
              </button>
            </div>

            {/* Interactive Operations Control Panel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              
              {/* Insert / Search Box */}
              <div className="lg:col-span-5 bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
                <div className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                  <span>➕</span> BST Insertion &amp; Search Animation
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter Key (e.g. 55)"
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-cyan-300 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                  <button
                    onClick={startInsertAnimation}
                    className="px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-xs transition-all shadow-md flex items-center gap-1"
                  >
                    <span>▶️</span> Animate Insert
                  </button>
                  <button
                    onClick={startSearchAnimation}
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-semibold text-xs transition-all border border-slate-700 flex items-center gap-1"
                  >
                    <span>🔍</span> Search
                  </button>
                </div>
              </div>

              {/* Deletion Box with Strategy Selector */}
              <div className="lg:col-span-7 bg-slate-950/80 border border-rose-900/30 rounded-xl p-4 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span>🗑️</span> BST Deletion Animation with Strategy Toggle
                  </div>
                  
                  {/* Toggle: Successor vs Predecessor */}
                  <div className="flex items-center rounded-lg bg-slate-900 p-0.5 border border-slate-800 text-[11px] font-mono">
                    <button
                      onClick={() => setDeletionMethod("successor")}
                      className={`px-2 py-1 rounded-md transition-all ${
                        deletionMethod === "successor"
                          ? "bg-cyan-600 text-slate-950 font-bold shadow"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Successor (Min Right)
                    </button>
                    <button
                      onClick={() => setDeletionMethod("predecessor")}
                      className={`px-2 py-1 rounded-md transition-all ${
                        deletionMethod === "predecessor"
                          ? "bg-purple-600 text-white font-bold shadow"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      Predecessor (Max Left)
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={deleteTarget}
                    onChange={(e) => setDeleteTarget(e.target.value)}
                    placeholder="Key to delete"
                    className="w-32 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-rose-300 focus:outline-none focus:border-rose-500 font-mono"
                  />
                  <button
                    onClick={startDeleteAnimation}
                    className="flex-1 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-all shadow-md shadow-rose-950/50 flex items-center justify-center gap-1.5"
                  >
                    <span>▶️</span> Animate Delete ({deletionMethod === "successor" ? "Successor" : "Predecessor"})
                  </button>
                </div>
              </div>
            </div>

            {/* Animation Step Playback Control Bar (Active when animation is running) */}
            {animSteps.length > 0 && (
              <div className="p-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-cyan-500/40 rounded-xl space-y-3 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                      Step {currentStepIdx + 1} of {animSteps.length}:
                    </span>
                    <span className="text-xs font-bold text-slate-100 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
                      {currentStep.title}
                    </span>
                  </div>

                  {/* Playback Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleStepPrev}
                      disabled={currentStepIdx === 0}
                      className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition-all border border-slate-700"
                    >
                      ⏮️ Prev
                    </button>
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className={`px-3.5 py-1 text-xs font-bold rounded-lg transition-all shadow ${
                        isAutoPlaying
                          ? "bg-amber-600 hover:bg-amber-500 text-slate-950"
                          : "bg-cyan-600 hover:bg-cyan-500 text-slate-950"
                      }`}
                    >
                      {isAutoPlaying ? "⏸️ Pause" : "▶️ Play"}
                    </button>
                    <button
                      onClick={handleStepNext}
                      disabled={currentStepIdx === animSteps.length - 1}
                      className="px-2.5 py-1 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 transition-all border border-slate-700"
                    >
                      Next ⏭️
                    </button>
                    <button
                      onClick={handleResetAnimation}
                      className="px-2 py-1 text-xs rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800"
                    >
                      Clear
                    </button>

                    {/* Speed Selector */}
                    <div className="flex items-center ml-2 border-l border-slate-800 pl-2 gap-1 text-[11px] font-mono text-slate-400">
                      <span>Speed:</span>
                      <button
                        onClick={() => setAnimationSpeed(1400)}
                        className={`px-1.5 py-0.5 rounded ${
                          animationSpeed === 1400 ? "bg-cyan-900 text-cyan-300 font-bold" : "hover:text-white"
                        }`}
                      >
                        0.5x
                      </button>
                      <button
                        onClick={() => setAnimationSpeed(900)}
                        className={`px-1.5 py-0.5 rounded ${
                          animationSpeed === 900 ? "bg-cyan-900 text-cyan-300 font-bold" : "hover:text-white"
                        }`}
                      >
                        1x
                      </button>
                      <button
                        onClick={() => setAnimationSpeed(450)}
                        className={`px-1.5 py-0.5 rounded ${
                          animationSpeed === 450 ? "bg-cyan-900 text-cyan-300 font-bold" : "hover:text-white"
                        }`}
                      >
                        2x
                      </button>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-sky-400 h-1.5 transition-all duration-300"
                    style={{
                      width: `${((currentStepIdx + 1) / animSteps.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* The Actual 2D Tree Render Area (SVG Canvas with Smooth Tracer Animation) */}
            <div className="relative w-full bg-slate-950/95 border border-slate-800 rounded-2xl overflow-hidden min-h-[380px] p-2 flex flex-col justify-center items-center shadow-inner">
              {layout.nodes.length === 0 ? (
                <div className="text-center py-16 text-slate-500 font-mono text-sm">
                  Tree is currently EMPTY (root == NULL). Insert elements to visualize the BST.
                </div>
              ) : (
                <svg
                  viewBox="0 0 800 360"
                  className="w-full h-auto max-h-[420px] select-none"
                  style={{ minHeight: "320px" }}
                >
                  <defs>
                    <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0891b2" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Connecting Branches (Edges) */}
                  {layout.edges.map((edge) => {
                    const isTraversed =
                      currentStep.activeEdges &&
                      currentStep.activeEdges.includes(`${edge.fromValue}->${edge.toValue}`);

                    return (
                      <g key={edge.id}>
                        <line
                          x1={edge.fromX}
                          y1={edge.fromY}
                          x2={edge.toX}
                          y2={edge.toY}
                          stroke={isTraversed ? "#38bdf8" : "#334155"}
                          strokeWidth={isTraversed ? "3.5" : "2"}
                          className={`transition-all duration-300 ${isTraversed ? "edge-active" : ""}`}
                        />
                        {/* Direction Branch Tag (L / R) */}
                        <circle
                          cx={(edge.fromX + edge.toX) / 2}
                          cy={(edge.fromY + edge.toY) / 2}
                          r="8"
                          fill="#0f172a"
                          stroke={isTraversed ? "#38bdf8" : "#475569"}
                          strokeWidth="1"
                        />
                        <text
                          x={(edge.fromX + edge.toX) / 2}
                          y={(edge.fromY + edge.toY) / 2 + 3}
                          fontSize="9"
                          textAnchor="middle"
                          fill={isTraversed ? "#38bdf8" : "#94a3b8"}
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          {edge.branch}
                        </text>
                      </g>
                    );
                  })}

                  {/* Hierarchical Tree Nodes */}
                  {layout.nodes.map((node) => {
                    const isActive = currentStep.activeNode === node.value;
                    const isTarget = currentStep.isTarget === node.value;
                    const isSuccessor = currentStep.isSuccessor === node.value;
                    const isPredecessor = currentStep.isPredecessor === node.value;
                    const isNewlyInserted = currentStep.isNewlyInserted === node.value;
                    const isHighlighted =
                      currentStep.highlightedPath && currentStep.highlightedPath.includes(node.value);

                    let fillColor = "#0f172a";
                    let strokeColor = "#38bdf8";
                    let textColor = "#e2e8f0";
                    let strokeWidth = "2.5";
                    let pulseClass = "";

                    if (isTarget) {
                      fillColor = "#881337";
                      strokeColor = "#f43f5e";
                      textColor = "#ffffff";
                      strokeWidth = "3.5";
                      pulseClass = "target-glow";
                    } else if (isSuccessor || isPredecessor) {
                      fillColor = isSuccessor ? "#064e3b" : "#4c1d95";
                      strokeColor = isSuccessor ? "#10b981" : "#a855f7";
                      textColor = "#ffffff";
                      strokeWidth = "3.5";
                      pulseClass = "successor-glow";
                    } else if (isActive) {
                      fillColor = "#164e63";
                      strokeColor = "#22d3ee";
                      strokeWidth = "3.5";
                      pulseClass = "tracer-glow";
                    } else if (isNewlyInserted) {
                      fillColor = "#064e3b";
                      strokeColor = "#34d399";
                      strokeWidth = "3.5";
                    } else if (isHighlighted) {
                      fillColor = "#0e3a53";
                      strokeColor = "#38bdf8";
                    }

                    return (
                      <g
                        key={node.id}
                        className="transition-all duration-500 cursor-pointer"
                        onClick={() => setDeleteTarget(node.value.toString())}
                      >
                        {/* Node Halo Circle */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="22"
                          fill={fillColor}
                          stroke={strokeColor}
                          strokeWidth={strokeWidth}
                          className={pulseClass}
                          filter={isActive || isTarget || isSuccessor || isPredecessor ? "url(#glow)" : undefined}
                        />

                        {/* Node Key */}
                        <text
                          x={node.x}
                          y={node.y + 5}
                          textAnchor="middle"
                          fontSize="14"
                          fontWeight="bold"
                          fill={textColor}
                          fontFamily="monospace"
                        >
                          {node.value}
                        </text>

                        {/* Memory Address Tag */}
                        <text
                          x={node.x}
                          y={node.y - 27}
                          textAnchor="middle"
                          fontSize="9"
                          fill="#64748b"
                          fontFamily="monospace"
                        >
                          0x{(3000 + node.value * 8).toString(16)}
                        </text>

                        {/* Degree / Child Count Label */}
                        <text
                          x={node.x}
                          y={node.y + 35}
                          textAnchor="middle"
                          fontSize="9"
                          fill={
                            node.childCount === 0
                              ? "#34d399"
                              : node.childCount === 1
                              ? "#fbbf24"
                              : "#a78bfa"
                          }
                          fontFamily="sans-serif"
                        >
                          {node.childCount === 0 ? "Leaf (0c)" : `${node.childCount} Child`}
                        </text>

                        {/* Comparison Callout Tooltip attached to active node */}
                        {isActive && currentStep.comparisonText && (
                          <g className="animate-bounce">
                            <rect
                              x={node.x - 45}
                              y={node.y - 55}
                              width="90"
                              height="22"
                              rx="6"
                              fill="#0284c7"
                              stroke="#38bdf8"
                              strokeWidth="1"
                            />
                            <text
                              x={node.x}
                              y={node.y - 40}
                              textAnchor="middle"
                              fontSize="10"
                              fontWeight="bold"
                              fill="#ffffff"
                              fontFamily="monospace"
                            >
                              {currentStep.comparisonText}
                            </text>
                          </g>
                        )}
                      </g>
                    );
                  })}
                </svg>
              )}

              {/* Sorted Inorder Stream Display at bottom of canvas */}
              <div className="w-full mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 px-3 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">Inorder Traversal (Sorted):</span>
                  <span className="text-slate-200">
                    [ {treeMetrics.inorderList.join(", ")} ]
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Tip: Click any tree node to set it as deletion target
                </div>
              </div>
            </div>

            {/* Real-time Operation Log & C Register Invariants */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-cyan-400 flex items-start gap-2">
                <span className="text-base select-none">ℹ️</span>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">
                    Step Status Log &amp; Decision
                  </div>
                  <span>{currentStep.message}</span>
                </div>
              </div>

              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-xs text-emerald-400 flex items-start gap-2">
                <span className="text-base select-none">💻</span>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">
                    Underlying C Pointer Code &amp; Memory Registers
                  </div>
                  <pre className="text-[11px] text-emerald-300 whitespace-pre-wrap font-mono leading-tight">
                    {currentStep.cCode}
                  </pre>
                  <div className="text-[10px] text-slate-400 mt-1 font-mono">
                    {currentStep.pointerInfo}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: EXHAUSTIVE DEEP TECHNICAL BREAKDOWN OF ALL 3 DELETION CASES */}
        <section ref={addRef} className="reveal-section max-w-6xl mx-auto mb-12 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 flex items-center gap-2">
              <span>📚</span> Deep Technical Breakdown: The 3 Structural BST Deletion Cases
            </h2>

            {/* Sub-tabs for switching focus */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setActiveTab("case1")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "case1"
                    ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Case 1: Leaf (0 Child)
              </button>
              <button
                onClick={() => setActiveTab("case2")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "case2"
                    ? "bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Case 2: Single Child (1 Child)
              </button>
              <button
                onClick={() => setActiveTab("case3")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "case3"
                    ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Case 3: Two Children (Successor &amp; Predecessor)
              </button>
            </div>
          </div>

          {/* CASE 1 CARD */}
          {(activeTab === "case1" || activeTab === "all") && (
            <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                  <span>🍃</span> Case 1: Deletion of a Leaf Node (Degree 0 / 0 Children)
                </h3>
                <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-mono font-bold">
                  Time: O(h) · Pointer Changes: 1
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
                <div className="space-y-4">
                  <p>
                    <strong className="text-emerald-300">Structural Mechanic:</strong> A leaf node is a terminal node in the BST where <code className="text-emerald-400 font-mono">root-&gt;left == NULL</code> and <code className="text-emerald-400 font-mono">root-&gt;right == NULL</code>.
                  </p>
                  <p>
                    Because it has zero descendants, removing a leaf has <strong>zero cascading side effects</strong> on any remaining subtrees. We simply deallocate the node's heap block with <code className="text-emerald-400 font-mono">free(root)</code> and return <code className="text-emerald-400 font-mono">NULL</code> so that the calling parent's pointer is severed cleanly.
                  </p>

                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs space-y-2 text-emerald-300">
                    <div className="text-slate-400 font-bold">// C Implementation Pattern for Case 1:</div>
                    <pre className="text-slate-200">
{`if (root->left == NULL && root->right == NULL) {
    free(root);       // 1. Release heap memory
    return NULL;      // 2. Parent pointer receives NULL
}`}
                    </pre>
                  </div>
                </div>

                {/* Visual ASCII / Before-After Diagram */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 font-mono text-xs flex flex-col justify-between space-y-3">
                  <div className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
                    Concrete Example: Deleting Leaf Node 20
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center py-2">
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      <span className="text-rose-400 font-bold block mb-2">Before Deletion</span>
                      <pre className="text-slate-300 text-[11px] leading-tight">
{`      50
     /  \\
   30    70
  /  \\
[20]  40`}
                      </pre>
                    </div>
                    <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                      <span className="text-emerald-400 font-bold block mb-2">After Deleting 20</span>
                      <pre className="text-slate-300 text-[11px] leading-tight">
{`      50
     /  \\
   30    70
     \\
      40`}
                      </pre>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Parent node <code className="text-emerald-400">30-&gt;left</code> is reset to <code className="text-emerald-400">NULL</code>. The BST ordering <code className="text-slate-200">[30, 40, 50, 70]</code> remains perfectly preserved.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CASE 2 CARD */}
          {(activeTab === "case2" || activeTab === "all") && (
            <div className="bg-slate-900/90 border border-amber-500/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                  <span>🌿</span> Case 2: Deletion of a Node with One Child (Degree 1 / Single Child)
                </h3>
                <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800 text-amber-300 text-xs font-mono font-bold">
                  Time: O(h) · Subtree Bypassing
                </span>
              </div>

              <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
                <p>
                  <strong className="text-amber-300">Structural Mechanic:</strong> The node to be deleted has exactly one non-empty child subtree—either left or right. To eliminate the node without losing its descendant branch, we perform a <strong>pointer bypass (grandparent adopts grandchild)</strong>:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Subcase 2A: Left Child Only */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 font-mono text-xs">
                    <h4 className="text-amber-400 font-bold flex items-center gap-2 text-sm">
                      <span>🅰️</span> Subcase 2A: Node has ONLY Left Child
                    </h4>
                    <p className="text-slate-300 font-sans text-xs">
                      Target node has <code className="text-amber-300">root-&gt;right == NULL</code> and non-null <code className="text-amber-300">root-&gt;left</code>. We capture <code className="text-amber-300">temp = root-&gt;left</code>, free <code className="text-amber-300">root</code>, and return <code className="text-amber-300">temp</code> to the parent.
                    </p>
                    <pre className="text-slate-200 bg-slate-900 p-3 rounded-lg">
{`if (root->right == NULL) {
    BSTNode* temp = root->left;
    free(root);
    return temp; // Child promoted
}`}
                    </pre>
                    <div className="bg-slate-900/60 p-3 rounded-lg text-center">
                      <span className="text-slate-400 text-[10px] block mb-1">Example: Deleting 30 (left child 25)</span>
                      <pre className="text-[11px] text-slate-300">
{`    50                50
   /  \\   Delete 30  /  \\
 (30)  70  --------> 25  70
  /
 25`}
                      </pre>
                    </div>
                  </div>

                  {/* Subcase 2B: Right Child Only */}
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 font-mono text-xs">
                    <h4 className="text-amber-400 font-bold flex items-center gap-2 text-sm">
                      <span>🅱️</span> Subcase 2B: Node has ONLY Right Child
                    </h4>
                    <p className="text-slate-300 font-sans text-xs">
                      Target node has <code className="text-amber-300">root-&gt;left == NULL</code> and non-null <code className="text-amber-300">root-&gt;right</code>. We capture <code className="text-amber-300">temp = root-&gt;right</code>, free <code className="text-amber-300">root</code>, and return <code className="text-amber-300">temp</code>.
                    </p>
                    <pre className="text-slate-200 bg-slate-900 p-3 rounded-lg">
{`if (root->left == NULL) {
    BSTNode* temp = root->right;
    free(root);
    return temp; // Child promoted
}`}
                    </pre>
                    <div className="bg-slate-900/60 p-3 rounded-lg text-center">
                      <span className="text-slate-400 text-[10px] block mb-1">Example: Deleting 70 (right child 85)</span>
                      <pre className="text-[11px] text-slate-300">
{`    50                50
   /  \\   Delete 70  /  \\
  30  (70) --------> 30  85
        \\
         85`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CASE 3 CARD */}
          {(activeTab === "case3" || activeTab === "all") && (
            <div className="bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
                  <span>⚡</span> Case 3: Deletion of a Node with Two Children (Degree 2)
                </h3>
                <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-300 text-xs font-mono font-bold">
                  Dual Strategies: Successor vs Predecessor
                </span>
              </div>

              <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
                <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-2">
                  <h4 className="text-base font-bold text-cyan-400">
                    Why Direct Removal Fails &amp; The Replacement Theorem
                  </h4>
                  <p>
                    When a node has two children, simply deleting it leaves two disconnected subtrees with no single root to attach to the parent. Instead of breaking tree topology, we replace the target's value with the <strong>closest adjacent value in sorted order</strong>.
                  </p>
                  <p className="text-xs text-slate-400">
                    <strong>Crucial Invariant Guarantee:</strong> Both the Inorder Successor and Inorder Predecessor are guaranteed to have <em>at most 1 child</em>! Thus, after copying its value, deleting that candidate node from the subtree reduces the problem to an easy <strong>Case 1 (Leaf)</strong> or <strong>Case 2 (Single Child)</strong> deletion.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Method 3A: Inorder Successor */}
                  <div className="bg-slate-950 border border-cyan-500/30 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-cyan-300 flex items-center gap-2">
                        <span>🌟</span> Method 3A: Inorder Successor (Recommended)
                      </h4>
                      <span className="text-[11px] font-mono text-cyan-400 font-bold bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                        findMin(root-&gt;right)
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong>Definition:</strong> The smallest key in the target node's <strong>Right Subtree</strong>. It is found by stepping right once, and then moving left as far as possible until <code className="text-cyan-400">left == NULL</code>.
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-300">
                      <div className="font-semibold text-cyan-400">Step-by-Step Execution:</div>
                      <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[11px]">
                        <li>Locate <code className="text-slate-200">succ = findMin(root-&gt;right)</code>.</li>
                        <li>Copy successor value: <code className="text-slate-200">root-&gt;data = succ-&gt;data</code>.</li>
                        <li>Recursively delete successor from right subtree: <code className="text-slate-200">root-&gt;right = deleteNode(root-&gt;right, succ-&gt;data)</code>.</li>
                      </ol>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-[11px] font-mono">
                      <div className="text-cyan-400 text-center font-bold mb-1">Example: Deleting Root 50 via Successor (60)</div>
                      <pre className="text-slate-300 leading-tight">
{`       (50) [Target]                     (60) [Replaced]
      /    \\                            /    \\
    30      70          ------>       30      70
   /  \\    /  \\                      /  \\       \\
  20  40 (60)  80                   20  40       80
        [Succ]`}
                      </pre>
                    </div>
                  </div>

                  {/* Method 3B: Inorder Predecessor */}
                  <div className="bg-slate-950 border border-purple-500/30 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-purple-300 flex items-center gap-2">
                        <span>🔄</span> Method 3B: Inorder Predecessor
                      </h4>
                      <span className="text-[11px] font-mono text-purple-400 font-bold bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
                        findMax(root-&gt;left)
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      <strong>Definition:</strong> The largest key in the target node's <strong>Left Subtree</strong>. It is found by stepping left once, and then moving right as far as possible until <code className="text-purple-400">right == NULL</code>.
                    </p>

                    <div className="space-y-1.5 text-xs text-slate-300">
                      <div className="font-semibold text-purple-400">Step-by-Step Execution:</div>
                      <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[11px]">
                        <li>Locate <code className="text-slate-200">pred = findMax(root-&gt;left)</code>.</li>
                        <li>Copy predecessor value: <code className="text-slate-200">root-&gt;data = pred-&gt;data</code>.</li>
                        <li>Recursively delete predecessor from left subtree: <code className="text-slate-200">root-&gt;left = deleteNode(root-&gt;left, pred-&gt;data)</code>.</li>
                      </ol>
                    </div>

                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-[11px] font-mono">
                      <div className="text-purple-400 text-center font-bold mb-1">Example: Deleting Root 50 via Predecessor (40)</div>
                      <pre className="text-slate-300 leading-tight">
{`       (50) [Target]                     (40) [Replaced]
      /    \\                            /    \\
    30      70          ------>       30      70
   /  \\    /  \\                      /       /  \\
  20  (40) 60  80                   20      60  80
     [Pred]`}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* Comparative Decision Matrix Table */}
                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-xs text-left border-collapse border border-slate-800 rounded-xl overflow-hidden font-mono">
                    <thead className="bg-slate-950 text-cyan-300">
                      <tr>
                        <th className="p-3 border border-slate-800">Strategy Metric</th>
                        <th className="p-3 border border-slate-800">Inorder Successor</th>
                        <th className="p-3 border border-slate-800">Inorder Predecessor</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                      <tr className="bg-slate-900/40">
                        <td className="p-3 font-bold text-slate-200">Search Subtree</td>
                        <td className="p-3 text-cyan-400">Right Subtree (<code className="text-xs font-mono">root-&gt;right</code>)</td>
                        <td className="p-3 text-purple-400">Left Subtree (<code className="text-xs font-mono">root-&gt;left</code>)</td>
                      </tr>
                      <tr className="bg-slate-900/20">
                        <td className="p-3 font-bold text-slate-200">Search Direction</td>
                        <td className="p-3">Traverse <code className="text-cyan-400">left</code> pointers till NULL (<code className="text-xs">findMin</code>)</td>
                        <td className="p-3">Traverse <code className="text-purple-400">right</code> pointers till NULL (<code className="text-xs">findMax</code>)</td>
                      </tr>
                      <tr className="bg-slate-900/40">
                        <td className="p-3 font-bold text-slate-200">Max Children of Candidate</td>
                        <td className="p-3">At most 1 (Right child only; never left child)</td>
                        <td className="p-3">At most 1 (Left child only; never right child)</td>
                      </tr>
                      <tr className="bg-slate-900/20">
                        <td className="p-3 font-bold text-slate-200">BST Invariant Preservation</td>
                        <td className="p-3 text-emerald-400">100% Guaranteed (Sorted Inorder intact)</td>
                        <td className="p-3 text-emerald-400">100% Guaranteed (Sorted Inorder intact)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* SECTION 5: RUNNABLE PRODUCTION C CODE IMPLEMENTATION */}
        <section ref={addRef} className="reveal-section max-w-6xl mx-auto mb-12 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
              <span>🛠️</span> Runnable Production C Implementation (Zero Memory Leaks)
            </h2>
            <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded-md border border-slate-800">
              Covers Case 1, Case 2, and Case 3 (Both Successor &amp; Predecessor)
            </span>
          </div>
          <EditableCCodeBlock
            code={demoCode}
            initialCode={demoCode}
            title="BinarySearchTreeBstOperationsIDemo.c"
          />
        </section>

        {/* SECTION 6: FAQS */}
        <section ref={addRef} className="reveal-section max-w-6xl mx-auto mb-12">
          <FAQTemplate questions={questions} />
        </section>

        {/* SECTION 7: PRINTABLE STUDY NOTE */}
        <section ref={addRef} className="reveal-section max-w-6xl mx-auto mb-12">
          <PlainTextPrint
            content={noteText}
            title="DSA Printable Note: Binary Search Tree (BST) Architecture, Operations & 3-Case Deletions"
          />
        </section>

        {/* SECTION 8: MENTOR CARD */}
        <section ref={addRef} className="reveal-section max-w-6xl mx-auto mb-12">
          <Teacher />
        </section>
      </div>
    </>
  );
}
