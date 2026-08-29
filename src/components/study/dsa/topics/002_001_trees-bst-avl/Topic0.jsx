import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import EditableCCodeBlock from "../../../../../common/EditableCCodeBlock";
import questions from "./topic0_files/topic0_questions";
import noteText from "./topic0_files/topic0_note.txt?raw";
import demoCode from "./topic0_files/bst_avl_demo.c?raw";

// ============================================================================
// Tree Node Definition & Anatomy Computation Engine
// ============================================================================
class TreeNode {
  constructor(value, left = null, right = null, id = null) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.id = id || `${value}-${Math.random().toString(36).substring(2, 7)}`;
  }
}

// Deep clone a tree
const cloneTree = (root) => {
  if (!root) return null;
  return new TreeNode(root.value, cloneTree(root.left), cloneTree(root.right), root.id);
};

// Tree Insert (BST insertion helper for dynamic demo)
const insertNode = (root, val) => {
  if (!root) return new TreeNode(val);
  if (val < root.value) {
    return new TreeNode(root.value, insertNode(root.left, val), root.right, root.id);
  } else if (val > root.value) {
    return new TreeNode(root.value, root.left, insertNode(root.right, val), root.id);
  }
  return root;
};

// Delete node helper
const deleteNodeFromTree = (root, val) => {
  if (!root) return null;
  if (val < root.value) {
    return new TreeNode(root.value, deleteNodeFromTree(root.left, val), root.right, root.id);
  } else if (val > root.value) {
    return new TreeNode(root.value, root.left, deleteNodeFromTree(root.right, val), root.id);
  } else {
    if (!root.left && !root.right) return null;
    if (!root.left) return root.right;
    if (!root.right) return root.left;
    let succ = root.right;
    while (succ && succ.left) succ = succ.left;
    return new TreeNode(succ.value, root.left, deleteNodeFromTree(root.right, succ.value), root.id);
  }
};

// Compute individual node anatomy metrics
const getNodeHeight = (node) => {
  if (!node) return -1;
  return 1 + Math.max(getNodeHeight(node.left), getNodeHeight(node.right));
};

const countSubtreeNodes = (node) => {
  if (!node) return 0;
  return 1 + countSubtreeNodes(node.left) + countSubtreeNodes(node.right);
};

const countLeafNodes = (node) => {
  if (!node) return 0;
  if (!node.left && !node.right) return 1;
  return countLeafNodes(node.left) + countLeafNodes(node.right);
};

const countDegree2Nodes = (node) => {
  if (!node) return 0;
  const isDegree2 = node.left && node.right ? 1 : 0;
  return isDegree2 + countDegree2Nodes(node.left) + countDegree2Nodes(node.right);
};

// Verification of Strict Properties
const checkIsFull = (node) => {
  if (!node) return true;
  if (!node.left && !node.right) return true;
  if (node.left && node.right) {
    return checkIsFull(node.left) && checkIsFull(node.right);
  }
  return false;
};

const checkIsComplete = (root) => {
  if (!root) return true;
  const queue = [root];
  let reachedEnd = false;

  while (queue.length > 0) {
    const curr = queue.shift();
    if (!curr) {
      reachedEnd = true;
    } else {
      if (reachedEnd) return false;
      queue.push(curr.left);
      queue.push(curr.right);
    }
  }
  return true;
};

const checkIsPerfect = (root) => {
  if (!root) return true;
  const height = getNodeHeight(root);
  const total = countSubtreeNodes(root);
  return total === Math.pow(2, height + 1) - 1;
};

const checkIsBalanced = (root) => {
  const check = (node) => {
    if (!node) return 0;
    const lh = check(node.left);
    if (lh === -1) return -1;
    const rh = check(node.right);
    if (rh === -1) return -1;
    if (Math.abs(lh - rh) > 1) return -1;
    return 1 + Math.max(lh, rh);
  };
  return check(root) !== -1;
};

// Compute 2D tree layout coordinates & anatomy annotations
const calculateAnatomyTreeLayout = (
  node,
  depth = 0,
  leftBoundary = 40,
  rightBoundary = 760,
  parent = null,
  ancestorChain = []
) => {
  if (!node) return { nodes: [], edges: [] };

  const x = (leftBoundary + rightBoundary) / 2;
  const y = 45 + depth * 70;
  const nodeHeight = getNodeHeight(node);
  const childCount = (node.left ? 1 : 0) + (node.right ? 1 : 0);
  const isRoot = parent === null;
  const isLeaf = childCount === 0;
  const isInternal = !isLeaf;
  const currentAncestors = isRoot ? [] : [...ancestorChain, parent.value];

  const currentLayoutNode = {
    id: node.id,
    value: node.value,
    x,
    y,
    depth,
    level: depth,
    height: nodeHeight,
    childCount,
    isRoot,
    isLeaf,
    isInternal,
    parentVal: parent ? parent.value : null,
    ancestors: currentAncestors,
    subtreeSize: countSubtreeNodes(node),
    hasLeft: Boolean(node.left),
    hasRight: Boolean(node.right),
    leftChildVal: node.left ? node.left.value : null,
    rightChildVal: node.right ? node.right.value : null,
  };

  let allNodes = [currentLayoutNode];
  let allEdges = [];

  if (node.left) {
    const leftLayout = calculateAnatomyTreeLayout(
      node.left,
      depth + 1,
      leftBoundary,
      x,
      node,
      currentAncestors
    );
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
    const rightLayout = calculateAnatomyTreeLayout(
      node.right,
      depth + 1,
      x,
      rightBoundary,
      node,
      currentAncestors
    );
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

// Tree Presets Builders
const createPresetTree = (type) => {
  if (type === "perfect") {
    // 7-node perfect binary tree of height 2
    const root = new TreeNode(50);
    root.left = new TreeNode(30, new TreeNode(20), new TreeNode(40));
    root.right = new TreeNode(70, new TreeNode(60), new TreeNode(80));
    return root;
  } else if (type === "full") {
    // Full binary tree: all nodes have 0 or 2 children
    const root = new TreeNode(50);
    root.left = new TreeNode(30, new TreeNode(20), new TreeNode(40));
    root.right = new TreeNode(70);
    return root;
  } else if (type === "complete") {
    // Complete binary tree: filled left to right
    const root = new TreeNode(50);
    root.left = new TreeNode(30, new TreeNode(20), new TreeNode(40));
    root.right = new TreeNode(70, new TreeNode(60), null);
    return root;
  } else if (type === "skewed") {
    // Degenerate / Right-Skewed tree
    const root = new TreeNode(10);
    root.right = new TreeNode(20);
    root.right.right = new TreeNode(30);
    root.right.right.right = new TreeNode(40);
    root.right.right.right.right = new TreeNode(50);
    return root;
  } else {
    // Default balanced sample tree
    const root = new TreeNode(50);
    root.left = new TreeNode(30, new TreeNode(20), new TreeNode(40));
    root.right = new TreeNode(70, new TreeNode(60), new TreeNode(80));
    return root;
  }
};

// ============================================================================
// STEP-BY-STEP TRAVERSAL & ANATOMY ANIMATION GENERATORS
// ============================================================================
const generateHeightCalculationSteps = (tree) => {
  const steps = [];
  const visited = [];

  steps.push({
    title: "1. Start Height Calculation",
    activeNode: tree ? tree.value : null,
    highlightedPath: [],
    badgeText: "CALCULATE HEIGHT",
    badgeColor: "bg-cyan-500",
    message: "Calculating tree height via Post-Order Traversal: Height = 1 + max(Left_Height, Right_Height).",
    cCode: "int calculateHeight(TreeNode* root) {\n    if (root == NULL) return -1;\n    return 1 + max(calculateHeight(root->left), calculateHeight(root->right));\n}",
    pointerInfo: "Post-order bottom-up aggregation begins at root.",
  });

  const postOrderTraverse = (node) => {
    if (!node) return -1;
    postOrderTraverse(node.left);
    postOrderTraverse(node.right);

    const lh = getNodeHeight(node.left);
    const rh = getNodeHeight(node.right);
    const h = 1 + Math.max(lh, rh);
    visited.push(node.value);

    steps.push({
      title: `Compute Height at Node ${node.value}`,
      activeNode: node.value,
      computedHeight: h,
      comparisonText: `H = 1 + max(${lh}, ${rh}) = ${h}`,
      highlightedPath: [...visited],
      badgeText: `Height: ${h}`,
      badgeColor: "bg-emerald-500",
      message: `Node ${node.value}: Left Subtree Height = ${lh}, Right Subtree Height = ${rh} → Node Height = ${h}.`,
      cCode: `// Node ${node.value}: lh = ${lh}, rh = ${rh}\nreturn 1 + max(${lh}, ${rh}); // yields ${h}`,
      pointerInfo: `Calculated height ${h} stored in frame.`,
    });

    return h;
  };

  const totalHeight = postOrderTraverse(tree);

  steps.push({
    title: `Height Calculation Complete: Tree Height = ${totalHeight}`,
    activeNode: tree ? tree.value : null,
    computedHeight: totalHeight,
    highlightedPath: [...visited],
    badgeText: `TOTAL HEIGHT = ${totalHeight}`,
    badgeColor: "bg-cyan-400",
    message: `Tree Height is ${totalHeight} (longest path from Root to Leaf contains ${totalHeight} edges).`,
    cCode: `// Total Tree Height = ${totalHeight} edges (Root depth 0 to Leaf depth ${totalHeight})`,
    pointerInfo: "Whole-tree height calculation finished.",
    isFinal: true,
  });

  return steps;
};

const generateLeafCountingSteps = (tree) => {
  const steps = [];
  const leavesFound = [];

  steps.push({
    title: "1. Start Leaf Node Counting",
    activeNode: tree ? tree.value : null,
    highlightedPath: [],
    badgeText: "COUNT LEAVES",
    badgeColor: "bg-emerald-500",
    message: "Scanning tree to identify all leaf nodes (vertices where left == NULL && right == NULL / Degree 0).",
    cCode: "int countLeafNodes(TreeNode* root) {\n    if (root == NULL) return 0;\n    if (root->left == NULL && root->right == NULL) return 1;\n    return countLeaves(root->left) + countLeaves(root->right);\n}",
    pointerInfo: "Traversing tree hierarchy.",
  });

  const traverseLeaves = (node) => {
    if (!node) return;
    if (!node.left && !node.right) {
      leavesFound.push(node.value);
      steps.push({
        title: `Leaf Node Found: Key ${node.value}`,
        activeNode: node.value,
        isLeafMatch: node.value,
        comparisonText: `LEAF 🍃 (0 Children)`,
        highlightedPath: [...leavesFound],
        badgeText: `LEAF #${leavesFound.length}`,
        badgeColor: "bg-emerald-500",
        message: `Node ${node.value} has degree 0 (both child pointers are NULL). Added to leaf count!`,
        cCode: `if (root->left == NULL && root->right == NULL) return 1; // Leaf ${node.value} found`,
        pointerInfo: `Leaf count is now ${leavesFound.length}.`,
      });
    } else {
      steps.push({
        title: `Internal Node: Key ${node.value}`,
        activeNode: node.value,
        comparisonText: `INTERNAL 🔷 (${(node.left?1:0)+(node.right?1:0)} Child)`,
        highlightedPath: [...leavesFound],
        badgeText: "INTERNAL NODE",
        badgeColor: "bg-purple-500",
        message: `Node ${node.value} has child subtrees. Stepping down into branches...`,
        cCode: `return countLeaves(root->left) + countLeaves(root->right);`,
        pointerInfo: "Exploring child branches.",
      });
      traverseLeaves(node.left);
      traverseLeaves(node.right);
    }
  };

  traverseLeaves(tree);

  const n2Count = countDegree2Nodes(tree);
  steps.push({
    title: `Leaf Count Complete: ${leavesFound.length} Leaves Found`,
    activeNode: null,
    highlightedPath: [...leavesFound],
    badgeText: `TOTAL LEAVES = ${leavesFound.length}`,
    badgeColor: "bg-emerald-400",
    message: `Identified ${leavesFound.length} leaf nodes: [${leavesFound.join(", ")}]. Verified Leaf Theorem: L (${leavesFound.length}) == N_2 (${n2Count}) + 1!`,
    cCode: `// Leaf Theorem Verified: Leaves (${leavesFound.length}) = Degree-2 Nodes (${n2Count}) + 1`,
    pointerInfo: "Universal Leaf Invariant verified.",
    isFinal: true,
  });

  return steps;
};

// ============================================================================
// MAIN TOPIC 0 COMPONENT
// ============================================================================
export default function Topic0() {
  const sectionRefs = useRef([]);

  // Base Tree State
  const [treeRoot, setTreeRoot] = useState(() => createPresetTree("perfect"));
  const [selectedNodeVal, setSelectedNodeVal] = useState(50);
  const [inputValue, setInputValue] = useState("");
  const [presetType, setPresetType] = useState("perfect");

  // Animation Playback Engine State
  const [animSteps, setAnimSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(900);

  // Theory Sub-Tabs State
  const [activeTab, setActiveTab] = useState("anatomy");

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
        setIsAutoPlaying(false);
      }
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isAutoPlaying, currentStepIdx, animSteps, animationSpeed]);

  // Current active step data or static fallback
  const currentStep = useMemo(() => {
    if (animSteps.length > 0 && animSteps[currentStepIdx]) {
      return animSteps[currentStepIdx];
    }
    return {
      title: "Tree Anatomy Inspector Ready",
      activeNode: selectedNodeVal,
      highlightedPath: [],
      message: "Click any node in the SVG tree to inspect its depth, height, level, parent, and subtrees.",
      cCode: "// Invariant: Depth(Root) = 0. Height(Leaf) = 0. Zero memory leaks.",
      pointerInfo: "Pointer registers quiescent.",
    };
  }, [animSteps, currentStepIdx, selectedNodeVal]);

  // Dynamic Layout Calculation
  const layout = useMemo(() => {
    return calculateAnatomyTreeLayout(treeRoot, 0, 40, 760);
  }, [treeRoot]);

  // Quantitative Whole-Tree Metrics
  const treeMetrics = useMemo(() => {
    const total = countSubtreeNodes(treeRoot);
    const height = getNodeHeight(treeRoot);
    const leaves = countLeafNodes(treeRoot);
    const internals = total - leaves;
    const isFull = checkIsFull(treeRoot);
    const isComplete = checkIsComplete(treeRoot);
    const isPerfect = checkIsPerfect(treeRoot);
    const isBalanced = checkIsBalanced(treeRoot);
    const degree2Count = countDegree2Nodes(treeRoot);

    return {
      total,
      height,
      leaves,
      internals,
      isFull,
      isComplete,
      isPerfect,
      isBalanced,
      degree2Count,
    };
  }, [treeRoot]);

  // Selected Node Detailed Data
  const selectedNodeData = useMemo(() => {
    if (!selectedNodeVal) return null;
    return layout.nodes.find((n) => n.value === selectedNodeVal) || layout.nodes[0] || null;
  }, [selectedNodeVal, layout]);

  // Handlers
  const handleLoadPreset = (type) => {
    setIsAutoPlaying(false);
    setAnimSteps([]);
    setCurrentStepIdx(0);
    setPresetType(type);
    const newTree = createPresetTree(type);
    setTreeRoot(newTree);
    if (newTree) setSelectedNodeVal(newTree.value);
  };

  const handleAddNode = () => {
    const val =
      inputValue.trim() !== ""
        ? parseInt(inputValue, 10)
        : Math.floor(Math.random() * 85 + 10);
    if (isNaN(val)) return;

    setTreeRoot((prev) => insertNode(prev, val));
    setSelectedNodeVal(val);
    setInputValue("");
  };

  const handleDeleteSelected = () => {
    if (!selectedNodeVal) return;
    setTreeRoot((prev) => deleteNodeFromTree(prev, selectedNodeVal));
    setSelectedNodeVal(50);
  };

  const startHeightAnimation = useCallback(() => {
    const steps = generateHeightCalculationSteps(treeRoot);
    setAnimSteps(steps);
    setCurrentStepIdx(0);
    setIsAutoPlaying(true);
  }, [treeRoot]);

  const startLeafCountAnimation = useCallback(() => {
    const steps = generateLeafCountingSteps(treeRoot);
    setAnimSteps(steps);
    setCurrentStepIdx(0);
    setIsAutoPlaying(true);
  }, [treeRoot]);

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
            r: 29px;
            opacity: 0.4;
            filter: drop-shadow(0 0 22px rgba(56, 189, 248, 1));
          }
        }
        .node-tracer {
          animation: tracerPulse 1.2s infinite ease-in-out;
        }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 md:p-12 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        
        {/* SECTION 1: HEADER & METADATA */}
        <header ref={addRef} className="reveal-section max-w-6xl mx-auto mb-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-700/70 text-cyan-300 text-xs font-semibold uppercase tracking-wider shadow-lg">
            <span>⚡</span>
            <span>DSA Segment 2 · Topic 0</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 tracking-tight leading-tight">
            Tree Anatomy, Invariants &amp; Strict Binary Tree Properties
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Master the structural anatomy of hierarchical trees: Root, Leaves, Height vs. Depth, Subtrees, Mathematical Theorems, and Strict Classifications (Full, Complete, Perfect, Balanced &amp; Degenerate) at Coder &amp; AccoTax Barrackpore Lab.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400 pt-2">
            <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-cyan-400">Course Code: DSA-C-200</span>
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
                  Teacher's Desk: Physical Mental Models &amp; Non-Linear Hierarchies
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Sukanta Hui &amp; Barrackpore Lab Classroom Dialogue
                </p>
              </div>
            </div>

            <div className="space-y-6 text-slate-300 leading-relaxed text-sm sm:text-base">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-cyan-400 font-bold flex items-center gap-2 text-base">
                  <span>💡</span> The Physical Intuition Behind Hierarchical Tree Data Structures
                </h3>
                <p>
                  Linear structures like Arrays and Linked Lists suffer from an unavoidable tradeoff: arrays offer $O(1)$ indexed access but require slow $O(N)$ data shifting during insertion/deletion; linked lists allow dynamic memory growth but require $O(N)$ sequential pointer chasing to search. A <strong>Tree</strong> transcends this by introducing a 2-dimensional hierarchical branching factor, allowing algorithms to divide search space exponentially and achieve blazing-fast $O(\log N)$ operations!
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-5 space-y-3">
                <h3 className="text-sky-400 font-bold flex items-center gap-2 text-base">
                  <span>💬</span> Barrackpore Lab Classroom Discussion on Depth vs Height
                </h3>
                <div className="space-y-3 text-xs sm:text-sm font-sans border-l-2 border-cyan-500/40 pl-4 py-1">
                  <p>
                    <strong className="text-emerald-400">Swadeep:</strong> <em>"Sir, what is the exact difference between Node Depth and Node Height? In exams, students often mix them up."</em>
                  </p>
                  <p>
                    <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Think of an ocean! <strong>Depth</strong> is measured from the surface (the Root) downwards. The root is at depth 0. <strong>Height</strong> is measured from the ocean floor (the deepest Leaf) upwards! A leaf has height 0, and the root has the maximum height equal to the entire tree."</em>
                  </p>
                  <p>
                    <strong className="text-emerald-400">Tuhina:</strong> <em>"And by edge convention, an empty tree has height $-1$, so that a single root node has height $1 + \max(-1, -1) = 0$!"</em>
                  </p>
                  <p>
                    <strong className="text-cyan-300">Sukanta Sir:</strong> <em>"Spot on, Tuhina! That mathematical consistency prevents off-by-one errors when writing recursive algorithms in C."</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: AUTHENTIC 2D INTERACTIVE TREE ANATOMY VISUALIZER */}
        <section ref={addRef} className="reveal-section max-w-6xl mx-auto mb-12 space-y-6">
          <div className="bg-slate-900/90 border border-cyan-500/40 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
            
            {/* Visualizer Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-cyan-300 flex items-center gap-2">
                  <span>🔬</span> 2D Tree Anatomy Inspector &amp; Invariant Diagnostic Engine
                </h2>
                <p className="text-xs text-slate-400 font-mono mt-1">
                  Click any node to inspect its local anatomical metrics, or simulate whole-tree properties
                </p>
              </div>

              {/* Invariant Status Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono border ${treeMetrics.isFull ? "bg-emerald-950/80 border-emerald-700 text-emerald-300" : "bg-slate-900 border-slate-800 text-slate-500"}`}>
                  Full: {treeMetrics.isFull ? "YES" : "NO"}
                </span>
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono border ${treeMetrics.isComplete ? "bg-cyan-950/80 border-cyan-700 text-cyan-300" : "bg-slate-900 border-slate-800 text-slate-500"}`}>
                  Complete: {treeMetrics.isComplete ? "YES" : "NO"}
                </span>
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono border ${treeMetrics.isPerfect ? "bg-purple-950/80 border-purple-700 text-purple-300" : "bg-slate-900 border-slate-800 text-slate-500"}`}>
                  Perfect: {treeMetrics.isPerfect ? "YES" : "NO"}
                </span>
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono border ${treeMetrics.isBalanced ? "bg-emerald-950/80 border-emerald-700 text-emerald-300" : "bg-rose-950/80 border-rose-700 text-rose-300"}`}>
                  Balanced: {treeMetrics.isBalanced ? "YES" : "NO"}
                </span>
              </div>
            </div>

            {/* Tree Classification Presets */}
            <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1">
                Classification Presets:
              </span>
              <button
                onClick={() => handleLoadPreset("perfect")}
                className={`px-2.5 py-1 text-xs rounded-lg transition-all border ${presetType === "perfect" ? "bg-purple-600 text-white font-bold border-purple-400" : "bg-slate-900 text-purple-300 border-purple-900/50 hover:bg-slate-800"}`}
              >
                👑 Perfect Tree
              </button>
              <button
                onClick={() => handleLoadPreset("full")}
                className={`px-2.5 py-1 text-xs rounded-lg transition-all border ${presetType === "full" ? "bg-emerald-600 text-white font-bold border-emerald-400" : "bg-slate-900 text-emerald-300 border-emerald-900/50 hover:bg-slate-800"}`}
              >
                🌲 Full Binary Tree
              </button>
              <button
                onClick={() => handleLoadPreset("complete")}
                className={`px-2.5 py-1 text-xs rounded-lg transition-all border ${presetType === "complete" ? "bg-cyan-600 text-slate-950 font-bold border-cyan-400" : "bg-slate-900 text-cyan-300 border-cyan-900/50 hover:bg-slate-800"}`}
              >
                📦 Complete Tree
              </button>
              <button
                onClick={() => handleLoadPreset("skewed")}
                className={`px-2.5 py-1 text-xs rounded-lg transition-all border ${presetType === "skewed" ? "bg-rose-600 text-white font-bold border-rose-400" : "bg-slate-900 text-rose-300 border-rose-900/50 hover:bg-slate-800"}`}
              >
                ⛓️ Degenerate (Skewed)
              </button>
            </div>

            {/* Quick Operations & Animation Triggers */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Node key (e.g. 25)"
                  className="w-32 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-cyan-300 font-mono"
                />
                <button
                  onClick={handleAddNode}
                  className="px-3 py-1.5 text-xs rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold transition-all shadow"
                >
                  ➕ Add Node
                </button>
                <button
                  onClick={handleDeleteSelected}
                  className="px-3 py-1.5 text-xs rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-300 border border-rose-700 transition-all font-semibold"
                >
                  🗑️ Delete Selected ({selectedNodeVal})
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={startHeightAnimation}
                  className="px-3 py-1.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-800 font-mono flex items-center gap-1"
                >
                  <span>📏</span> Animate Height
                </button>
                <button
                  onClick={startLeafCountAnimation}
                  className="px-3 py-1.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-800 font-mono flex items-center gap-1"
                >
                  <span>🍃</span> Animate Leaves
                </button>
              </div>
            </div>

            {/* Playback Control Bar (Active during animation) */}
            {animSteps.length > 0 && (
              <div className="p-3.5 bg-slate-950 border border-cyan-500/40 rounded-xl space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-cyan-400">Step {currentStepIdx + 1}/{animSteps.length}:</span>
                    <span className="font-bold text-slate-200 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">{currentStep.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className={`px-3 py-1 rounded font-bold transition-all ${isAutoPlaying ? "bg-amber-600 text-slate-950" : "bg-cyan-600 text-slate-950"}`}
                    >
                      {isAutoPlaying ? "⏸️ Pause" : "▶️ Play"}
                    </button>
                    <button
                      onClick={() => setAnimSteps([])}
                      className="px-2 py-1 bg-slate-900 text-slate-400 hover:text-white rounded border border-slate-800"
                    >
                      Clear
                    </button>
                  </div>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1 overflow-hidden">
                  <div className="bg-cyan-400 h-1 transition-all duration-300" style={{ width: `${((currentStepIdx + 1) / animSteps.length) * 100}%` }} />
                </div>
              </div>
            )}

            {/* 2D SVG Tree Canvas */}
            <div className="relative w-full bg-slate-950/95 border border-slate-800 rounded-2xl overflow-hidden min-h-[380px] p-2 flex flex-col justify-center items-center shadow-inner">
              {layout.nodes.length === 0 ? (
                <div className="text-center py-16 text-slate-500 font-mono text-sm">
                  Tree is currently EMPTY (root == NULL). Load a preset above.
                </div>
              ) : (
                <svg
                  viewBox="0 0 800 360"
                  className="w-full h-auto max-h-[420px] select-none"
                  style={{ minHeight: "320px" }}
                >
                  <defs>
                    <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Level Grid Lines */}
                  {[0, 1, 2, 3, 4].map((lvl) => (
                    <g key={lvl} opacity="0.3">
                      <line x1="20" y1={45 + lvl * 70} x2="780" y2={45 + lvl * 70} stroke="#334155" strokeDasharray="4 4" strokeWidth="1" />
                      <text x="30" y={45 + lvl * 70 - 6} fill="#64748b" fontSize="9" fontFamily="monospace">
                        Depth {lvl} (Level {lvl})
                      </text>
                    </g>
                  ))}

                  {/* Branch Edges */}
                  {layout.edges.map((edge) => (
                    <g key={edge.id}>
                      <line
                        x1={edge.fromX}
                        y1={edge.fromY}
                        x2={edge.toX}
                        y2={edge.toY}
                        stroke="#334155"
                        strokeWidth="2"
                      />
                      <circle
                        cx={(edge.fromX + edge.toX) / 2}
                        cy={(edge.fromY + edge.toY) / 2}
                        r="7"
                        fill="#0f172a"
                        stroke="#475569"
                        strokeWidth="1"
                      />
                      <text
                        x={(edge.fromX + edge.toX) / 2}
                        y={(edge.fromY + edge.toY) / 2 + 2.5}
                        fontSize="8"
                        textAnchor="middle"
                        fill="#94a3b8"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {edge.branch}
                      </text>
                    </g>
                  ))}

                  {/* Nodes */}
                  {layout.nodes.map((node) => {
                    const isSelected = selectedNodeVal === node.value;
                    const isActive = currentStep.activeNode === node.value;
                    const isHighlighted = currentStep.highlightedPath && currentStep.highlightedPath.includes(node.value);

                    let fillColor = "#0f172a";
                    let strokeColor = "#38bdf8";
                    let textColor = "#e2e8f0";
                    let roleBadge = "🔷 Int";

                    if (node.isRoot) {
                      strokeColor = "#06b6d4";
                      roleBadge = "👑 Root";
                    } else if (node.isLeaf) {
                      strokeColor = "#10b981";
                      roleBadge = "🍃 Leaf";
                    }

                    if (isSelected) {
                      fillColor = "#1e293b";
                      strokeColor = "#f59e0b"; // Amber for user selection
                      textColor = "#ffffff";
                    }

                    if (isActive) {
                      fillColor = "#164e63";
                      strokeColor = "#22d3ee";
                    }

                    return (
                      <g
                        key={node.id}
                        className="transition-all duration-300 cursor-pointer"
                        onClick={() => setSelectedNodeVal(node.value)}
                      >
                        {/* Node Circle */}
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="22"
                          fill={fillColor}
                          stroke={strokeColor}
                          strokeWidth={isSelected || isActive ? "3.5" : "2.5"}
                          filter={isSelected || isActive || isHighlighted ? "url(#nodeGlow)" : undefined}
                          className={isActive ? "node-tracer" : ""}
                        />

                        {/* Value */}
                        <text
                          x={node.x}
                          y={node.y + 5}
                          textAnchor="middle"
                          fontSize="13"
                          fontWeight="bold"
                          fill={textColor}
                          fontFamily="monospace"
                        >
                          {node.value}
                        </text>

                        {/* Top tag: Height */}
                        <text
                          x={node.x}
                          y={node.y - 26}
                          textAnchor="middle"
                          fontSize="9"
                          fill="#38bdf8"
                          fontFamily="monospace"
                        >
                          H={node.height}
                        </text>

                        {/* Bottom tag: Role */}
                        <text
                          x={node.x}
                          y={node.y + 35}
                          textAnchor="middle"
                          fontSize="9"
                          fill={node.isLeaf ? "#34d399" : node.isRoot ? "#22d3ee" : "#c084fc"}
                          fontFamily="sans-serif"
                        >
                          {roleBadge}
                        </text>

                        {/* Callout during animation */}
                        {isActive && currentStep.comparisonText && (
                          <g className="animate-bounce">
                            <rect
                              x={node.x - 55}
                              y={node.y - 58}
                              width="110"
                              height="22"
                              rx="6"
                              fill="#0284c7"
                              stroke="#38bdf8"
                              strokeWidth="1"
                            />
                            <text
                              x={node.x}
                              y={node.y - 43}
                              textAnchor="middle"
                              fontSize="9"
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

              {/* Anatomy Legend Bar */}
              <div className="w-full mt-2 pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 px-3 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"/> 👑 Root (Depth 0)</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-400 inline-block"/> 🔷 Internal Node (Deg &ge; 1)</span>
                  <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"/> 🍃 Leaf Node (Height 0, Deg 0)</span>
                </div>
                <div className="text-[11px] text-amber-400">
                  Selected Node: [{selectedNodeVal}]
                </div>
              </div>
            </div>

            {/* Diagnostic Anatomy Inspector Card for Selected Node */}
            {selectedNodeData && (
              <div className="bg-slate-950 border border-cyan-500/30 rounded-xl p-5 space-y-4 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-cyan-300">
                      🔬 Anatomical Diagnostic: Node [{selectedNodeData.value}]
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${selectedNodeData.isRoot ? "bg-cyan-950 text-cyan-300 border border-cyan-700" : selectedNodeData.isLeaf ? "bg-emerald-950 text-emerald-300 border border-emerald-700" : "bg-purple-950 text-purple-300 border border-purple-700"}`}>
                      {selectedNodeData.isRoot ? "ROOT VERTEX" : selectedNodeData.isLeaf ? "LEAF VERTEX (0 Children)" : "INTERNAL VERTEX"}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    RAM Address: <strong className="text-cyan-400">0x{(2048 + selectedNodeData.value * 8).toString(16)}</strong> (24B block)
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">Depth from Root</span>
                    <span className="text-base font-bold text-sky-300">{selectedNodeData.depth} edges</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">Height to Leaf</span>
                    <span className="text-base font-bold text-emerald-300">{selectedNodeData.height} edges</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">Out-Degree (Children)</span>
                    <span className="text-base font-bold text-amber-300">{selectedNodeData.childCount} ({selectedNodeData.childCount === 0 ? "Leaf" : selectedNodeData.childCount === 1 ? "1 Child" : "2 Children"})</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                    <span className="text-slate-400 block text-[10px] uppercase">Subtree Size</span>
                    <span className="text-base font-bold text-purple-300">{selectedNodeData.subtreeSize} vertices</span>
                  </div>
                </div>

                {/* Ancestor & Descendant Lineage */}
                <div className="text-xs font-mono space-y-1.5 pt-1 text-slate-300">
                  <div>
                    <strong className="text-cyan-400">Ancestor Chain: </strong>
                    {selectedNodeData.ancestors.length === 0 ? (
                      <span className="text-slate-500">None (Node is Root)</span>
                    ) : (
                      <span>[ Root({selectedNodeData.ancestors[0]}) &rarr; {selectedNodeData.ancestors.slice(1).map((a) => `${a} &rarr; `)}Node({selectedNodeData.value}) ]</span>
                    )}
                  </div>
                  <div>
                    <strong className="text-emerald-400">Children Links: </strong>
                    <span>Left: {selectedNodeData.leftChildVal ? `Node(${selectedNodeData.leftChildVal})` : "NULL"}, Right: {selectedNodeData.rightChildVal ? `Node(${selectedNodeData.rightChildVal})` : "NULL"}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SECTION 4: EXHAUSTIVE DEEP TECHNICAL BREAKDOWN OF TREE ANATOMY */}
        <section ref={addRef} className="reveal-section max-w-6xl mx-auto mb-12 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-cyan-300 flex items-center gap-2">
              <span>📚</span> Deep Technical Breakdown: Tree Anatomy &amp; Mathematical Invariants
            </h2>

            {/* Sub-tabs */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-mono">
              <button
                onClick={() => setActiveTab("anatomy")}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === "anatomy" ? "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-bold" : "text-slate-400 hover:text-slate-200"}`}
              >
                1. Anatomy &amp; Terms
              </button>
              <button
                onClick={() => setActiveTab("classifications")}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === "classifications" ? "bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold" : "text-slate-400 hover:text-slate-200"}`}
              >
                2. Strict Classifications
              </button>
              <button
                onClick={() => setActiveTab("formulas")}
                className={`px-3 py-1.5 rounded-lg transition-all ${activeTab === "formulas" ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold" : "text-slate-400 hover:text-slate-200"}`}
              >
                3. Formulas &amp; Theorems
              </button>
            </div>
          </div>

          {/* TAB 1: ANATOMY */}
          {activeTab === "anatomy" && (
            <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-cyan-300 flex items-center gap-2">
                <span>🌳</span> Structural Anatomy of a Rooted Tree
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300 leading-relaxed">
                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                    <strong className="text-cyan-400 block text-base mb-1">Root Node</strong>
                    <p className="text-xs text-slate-400">The unique topmost vertex with in-degree 0 (has zero parents). The entry point to all recursive tree operations.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                    <strong className="text-emerald-400 block text-base mb-1">Leaf (External) Node</strong>
                    <p className="text-xs text-slate-400">A terminal vertex having degree 0 (<code className="text-emerald-300 font-mono">left == NULL &amp;&amp; right == NULL</code>). Has zero child descendants.</p>
                  </div>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                    <strong className="text-purple-400 block text-base mb-1">Internal (Non-Leaf) Node</strong>
                    <p className="text-xs text-slate-400">Any vertex possessing at least one child (degree &ge; 1). Acts as a branching junction in the hierarchy.</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                    <strong className="text-sky-400 block text-base mb-1">Depth vs. Height (The Critical Contrast)</strong>
                    <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                      <li><strong className="text-sky-300">Depth of Node N:</strong> Number of edges on the path from Root down to N (<code className="text-sky-300 font-mono">Depth(Root) = 0</code>).</li>
                      <li><strong className="text-emerald-300">Height of Node N:</strong> Longest path from N down to a Leaf (<code className="text-emerald-300 font-mono">Height(Leaf) = 0</code>).</li>
                      <li><strong className="text-cyan-300">Height of Tree:</strong> Equal to the height of the Root node.</li>
                    </ul>
                  </div>
                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                    <strong className="text-amber-400 block text-base mb-1">Ancestors &amp; Descendants</strong>
                    <p className="text-xs text-slate-400">Ancestors are all vertices on the path from Root to the node. Descendants are all vertices contained within the subtrees branching downwards from the node.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CLASSIFICATIONS */}
          {activeTab === "classifications" && (
            <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-purple-300 flex items-center gap-2">
                <span>🌲</span> Strict Binary Tree Classifications &amp; Invariant Profiles
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-purple-400 font-bold text-sm">1. Perfect Binary Tree</div>
                  <p className="text-slate-400 font-sans text-xs">All internal nodes have exactly 2 children, and ALL leaf nodes reside at the exact same depth.</p>
                  <div className="text-slate-300 bg-slate-900 p-2 rounded text-[11px]">
                    N = 2^(h+1) - 1<br />
                    Leaves L = 2^h
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-emerald-400 font-bold text-sm">2. Full (Proper) Tree</div>
                  <p className="text-slate-400 font-sans text-xs">Every node in the tree has EITHER 0 OR 2 children (no vertex possesses degree 1).</p>
                  <div className="text-slate-300 bg-slate-900 p-2 rounded text-[11px]">
                    Leaves L = Internals I + 1<br />
                    Total N = 2I + 1
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-cyan-400 font-bold text-sm">3. Complete Binary Tree</div>
                  <p className="text-slate-400 font-sans text-xs">All levels filled except possibly last level, which is filled strictly from left to right.</p>
                  <div className="text-slate-300 bg-slate-900 p-2 rounded text-[11px]">
                    Array: 2i+1, 2i+2<br />
                    Height: floor(log2 N)
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 md:col-span-1.5">
                  <div className="text-amber-400 font-bold text-sm">4. Balanced Tree (AVL)</div>
                  <p className="text-slate-400 font-sans text-xs">For every vertex, the heights of left and right subtrees differ by at most 1: |lh - rh| &le; 1.</p>
                  <div className="text-slate-300 bg-slate-900 p-2 rounded text-[11px]">
                    Guarantees O(log N) worst-case height and search.
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 md:col-span-2">
                  <div className="text-rose-400 font-bold text-sm">5. Degenerate (Skewed) Tree</div>
                  <p className="text-slate-400 font-sans text-xs">Every internal parent has only 1 child. Degenerates into a linear linked list of height N-1 with slow O(N) lookup.</p>
                  <div className="text-slate-300 bg-slate-900 p-2 rounded text-[11px]">
                    Height = N - 1 | Cache misses maximized
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FORMULAS */}
          {activeTab === "formulas" && (
            <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                <span>📐</span> Universal Mathematical Formulas &amp; Tree Theorems
              </h3>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-slate-800 rounded-xl overflow-hidden font-mono">
                  <thead className="bg-slate-950 text-cyan-300">
                    <tr>
                      <th className="p-3 border border-slate-800">Tree Property</th>
                      <th className="p-3 border border-slate-800">Mathematical Formula</th>
                      <th className="p-3 border border-slate-800">Significance in Systems &amp; C</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-300">
                    <tr className="bg-slate-900/40">
                      <td className="p-3 font-bold text-slate-200">Max Nodes at Level l</td>
                      <td className="p-3 text-cyan-400">2^l (Root is level 0)</td>
                      <td className="p-3 text-slate-400">Determines maximum BFS queue capacity.</td>
                    </tr>
                    <tr className="bg-slate-900/20">
                      <td className="p-3 font-bold text-slate-200">Max Nodes in Height h</td>
                      <td className="p-3 text-emerald-400">2^(h+1) - 1</td>
                      <td className="p-3 text-slate-400">Capacity bound for perfect binary trees.</td>
                    </tr>
                    <tr className="bg-slate-900/40">
                      <td className="p-3 font-bold text-slate-200">Min Height with N Nodes</td>
                      <td className="p-3 text-purple-400">ceil(log2(N + 1)) - 1</td>
                      <td className="p-3 text-slate-400">Theoretical optimal search comparison bound.</td>
                    </tr>
                    <tr className="bg-slate-900/20">
                      <td className="p-3 font-bold text-slate-200">Universal Leaf Theorem</td>
                      <td className="p-3 text-amber-400">L = N_2 + 1</td>
                      <td className="p-3 text-slate-400">Leaves always equal degree-2 vertices + 1 in ANY binary tree!</td>
                    </tr>
                    <tr className="bg-slate-900/40">
                      <td className="p-3 font-bold text-slate-200">Total Edges in Tree</td>
                      <td className="p-3 text-sky-400">E = N - 1</td>
                      <td className="p-3 text-slate-400">Every node has 1 incoming parent edge except root (0).</td>
                    </tr>
                  </tbody>
                </table>
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
              Height, Depth, Leaf Counts &amp; Strict Invariant Verification
            </span>
          </div>
          <EditableCCodeBlock
            code={demoCode}
            initialCode={demoCode}
            title="bst_avl_demo.c"
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
            title="DSA Printable Note: Tree Anatomy, Invariants & Strict Binary Tree Properties"
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
