// ===============================================
// BinaryTreeVisualizer.jsx (Slower & smoother animations)
// - Node entry: 0.6s with bounce easing
// - Node exit: 0.6s fade+scale
// - Inserted node highlight duration 1s
// - Container fade on tree changes
// ===============================================

import React, { useState, useCallback, useRef, useEffect } from "react";

// Tree node structure
class TreeNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

// ============ Immutable BST operations ============
const insertNode = (root, value) => {
  if (!root) return new TreeNode(value);
  if (value < root.value) {
    return new TreeNode(root.value, insertNode(root.left, value), root.right);
  } else if (value > root.value) {
    return new TreeNode(root.value, root.left, insertNode(root.right, value));
  }
  return root;
};

const findMin = (node) => {
  while (node.left) node = node.left;
  return node;
};

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
    return new TreeNode(successor.value, root.left, deleteNode(root.right, successor.value));
  }
};

const searchNode = (root, value) => {
  if (!root) return false;
  if (value === root.value) return true;
  return value < root.value ? searchNode(root.left, value) : searchNode(root.right, value);
};

const generateRandomTree = () => {
  const numNodes = Math.floor(Math.random() * 7) + 3;
  const values = new Set();
  while (values.size < numNodes) {
    values.add(Math.floor(Math.random() * 90) + 10);
  }
  let root = null;
  Array.from(values).forEach(val => {
    root = insertNode(root, val);
  });
  return root;
};

const countNodes = (root) => {
  if (!root) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
};

// ============ Tree Layout ============
const NODE_RADIUS = 25;
const LEVEL_HEIGHT = 100;
const SIBLING_SPACING = 80;
const TOP_PADDING = 50;
const BOTTOM_PADDING = 30;

const computePositions = (root, x = 0, y = TOP_PADDING, depth = 0, positions = new Map()) => {
  if (!root) return { width: 0, positions };

  const leftWidth = root.left ? computePositions(root.left, x, y + LEVEL_HEIGHT, depth + 1, positions).width : 0;
  const rightWidth = root.right ? computePositions(root.right, x + leftWidth + SIBLING_SPACING, y + LEVEL_HEIGHT, depth + 1, positions).width : 0;
  const totalWidth = Math.max(leftWidth + (root.left ? SIBLING_SPACING : 0) + rightWidth, NODE_RADIUS * 2);
  const nodeX = x + totalWidth / 2;
  positions.set(root, { x: nodeX, y, depth });
  return { width: totalWidth, positions };
};

// ============ SVG Tree Renderer with animations ============
const TreeSVG = ({ root, searchTerm, onDelete, insertedNode, pendingDelete }) => {
  const [svgSize, setSvgSize] = useState({ width: 800, height: 400 });
  const [positions, setPositions] = useState(new Map());

  // Recompute layout when tree changes
  useEffect(() => {
    if (!root) return;
    const { width, positions: posMap } = computePositions(root);
    const maxDepth = (node) => node ? 1 + Math.max(maxDepth(node.left), maxDepth(node.right)) : 0;
    const depth = maxDepth(root);
    const height = (depth - 1) * LEVEL_HEIGHT + TOP_PADDING + BOTTOM_PADDING + NODE_RADIUS * 2;
    setSvgSize({ width: Math.max(width + 60, 600), height: Math.max(height, 300) });
    setPositions(posMap);
  }, [root]);

  if (!root) return <div className="text-center text-gray-400">Empty tree</div>;

  const lines = [];
  const nodes = [];

  positions.forEach((pos, node) => {
    const isHighlighted = searchTerm && node.value.toString().includes(searchTerm);
    const isInserted = insertedNode === node.value;
    const isDeleting = pendingDelete === node.value;
    const animationStyle = isDeleting
      ? { animation: 'fadeOutScale 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards' }
      : isInserted
      ? { animation: 'scaleIn 0.6s cubic-bezier(0.34, 1.2, 0.64, 1) forwards' }
      : {};

    nodes.push(
      <g key={node.value} style={animationStyle}>
        <circle
          cx={pos.x}
          cy={pos.y}
          r={NODE_RADIUS}
          fill="url(#grad)"
          stroke={isHighlighted ? "#FBBF24" : (isInserted ? "#FBBF24" : "#38BDF8")}
          strokeWidth="2.5"
          className="transition-all duration-300"
        />
        <text
          x={pos.x}
          y={pos.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="14"
          fontWeight="bold"
        >
          {node.value}
        </text>
        {/* Delete button (disabled during animation) */}
        {!isDeleting && (
          <>
            <circle
              cx={pos.x + NODE_RADIUS - 8}
              cy={pos.y - NODE_RADIUS + 8}
              r="12"
              fill="#EF4444"
              className="cursor-pointer hover:fill-red-600 transition-colors"
              onClick={() => onDelete(node.value)}
            />
            <text
              x={pos.x + NODE_RADIUS - 8}
              y={pos.y - NODE_RADIUS + 8}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="12"
              className="cursor-pointer"
              onClick={() => onDelete(node.value)}
            >
              ×
            </text>
          </>
        )}
      </g>
    );

    // Draw lines (only if neither node is deleting)
    if (!isDeleting && !(node.left && pendingDelete === node.left.value) && !(node.right && pendingDelete === node.right.value)) {
      if (node.left) {
        const childPos = positions.get(node.left);
        if (childPos && pendingDelete !== node.left.value) {
          lines.push(
            <line
              key={`${node.value}-left`}
              x1={pos.x}
              y1={pos.y + NODE_RADIUS * 0.7}
              x2={childPos.x}
              y2={childPos.y - NODE_RADIUS * 0.7}
              stroke="#6B7280"
              strokeWidth="2"
            />
          );
        }
      }
      if (node.right) {
        const childPos = positions.get(node.right);
        if (childPos && pendingDelete !== node.right.value) {
          lines.push(
            <line
              key={`${node.value}-right`}
              x1={pos.x}
              y1={pos.y + NODE_RADIUS * 0.7}
              x2={childPos.x}
              y2={childPos.y - NODE_RADIUS * 0.7}
              stroke="#6B7280"
              strokeWidth="2"
            />
          );
        }
      }
    }
  });

  return (
    <div className="overflow-x-auto overflow-y-visible w-full">
      <svg width={svgSize.width} height={svgSize.height} viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}>
        <defs>
          <radialGradient id="grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#6366F1" />
          </radialGradient>
          <style>
            {`
              @keyframes scaleIn {
                0% {
                  transform: scale(0.5);
                  opacity: 0;
                }
                60% {
                  transform: scale(1.05);
                }
                100% {
                  transform: scale(1);
                  opacity: 1;
                }
              }
              @keyframes fadeOutScale {
                0% {
                  transform: scale(1);
                  opacity: 1;
                }
                100% {
                  transform: scale(0.5);
                  opacity: 0;
                }
              }
            `}
          </style>
        </defs>
        {lines}
        {nodes}
      </svg>
    </div>
  );
};

// ============ Main Component ============
const BinaryTreeVisualizer = () => {
  const [root, setRoot] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [deleteValue, setDeleteValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [insertedNode, setInsertedNode] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const containerRef = useRef(null);

  const handleInsert = useCallback(() => {
    if (!inputValue.trim()) {
      setError("Please enter a value");
      return;
    }
    const num = Number(inputValue);
    if (isNaN(num)) {
      setError("Value must be a number");
      return;
    }
    const newRoot = insertNode(root, num);
    if (newRoot === root) {
      setError(`Value ${num} already exists.`);
      return;
    }
    setRoot(newRoot);
    setInsertedNode(num);
    // Remove highlight after 1 second
    setTimeout(() => setInsertedNode(null), 1000);
    setInputValue("");
    setError("");
  }, [inputValue, root]);

  const handleDelete = useCallback((val) => {
    if (pendingDelete) return; // already deleting
    if (!searchNode(root, val)) {
      setError(`Value ${val} not found in the tree.`);
      return;
    }
    setPendingDelete(val);
    setTimeout(() => {
      setRoot(prev => deleteNode(prev, val));
      setPendingDelete(null);
      setError("");
    }, 600);
  }, [root, pendingDelete]);

  const handleDeleteByValue = useCallback(() => {
    if (!deleteValue.trim()) {
      setError("Please enter a value to delete");
      return;
    }
    const num = Number(deleteValue);
    if (isNaN(num)) {
      setError("Value must be a number");
      return;
    }
    handleDelete(num);
    setDeleteValue("");
  }, [deleteValue, handleDelete]);

  const handleClear = useCallback(() => {
    setRoot(null);
    setError("");
    setSearchTerm("");
    setInsertedNode(null);
    setPendingDelete(null);
  }, []);

  const handleRandom = useCallback(() => {
    setRoot(generateRandomTree());
    setError("");
    setSearchTerm("");
    setInsertedNode(null);
    setPendingDelete(null);
  }, []);

  const nodeCount = root ? countNodes(root) : 0;

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-7xl flex-1 flex flex-col">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400">
          Binary Tree Visualizer
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Smooth animations: entries pop with a bounce, deletions fade out gently.
        </p>

        {error && (
          <div className="mb-4 text-center text-red-400 bg-red-900/20 py-2 px-4 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Value to insert"
              className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500 w-32 sm:w-40"
            />
            <button
              onClick={handleInsert}
              className="px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition shadow-lg"
            >
              Insert
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              value={deleteValue}
              onChange={(e) => setDeleteValue(e.target.value)}
              placeholder="Delete value"
              className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 w-32 sm:w-40"
            />
            <button
              onClick={handleDeleteByValue}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:opacity-90 transition shadow-lg"
            >
              Delete by Value
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search (highlight)"
              className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 w-32 sm:w-40"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
          <button
            onClick={handleRandom}
            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg hover:opacity-90 transition shadow-lg"
          >
            Random Tree
          </button>
          <button
            onClick={handleClear}
            className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:opacity-90 transition shadow-lg"
          >
            Clear Tree
          </button>
        </div>

        <div
          ref={containerRef}
          className="flex-1 bg-gray-900/50 rounded-2xl border border-gray-700 p-6 min-h-[400px] overflow-auto transition-all duration-500"
        >
          <TreeSVG
            root={root}
            searchTerm={searchTerm}
            onDelete={handleDelete}
            insertedNode={insertedNode}
            pendingDelete={pendingDelete}
          />
        </div>

        <div className="mt-4 text-center text-gray-400">
          <p>Number of nodes: {nodeCount}</p>
        </div>
      </div>
    </div>
  );
};

export default BinaryTreeVisualizer;