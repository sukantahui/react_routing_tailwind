// ===============================================
// LinkedListVisualizer.jsx (Enhanced)
// - Insert at index, search, clear, random
// - Memoized Node component
// - useCallback for efficiency
// ===============================================

import React, { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Generate a mock memory address (hex string)
const generateAddress = (index) => `0x${(1000 + index * 4).toString(16)}`;

// Memoized Node component to avoid re-rendering all nodes on every change
const Node = memo(({ value, index, nodeAddress, nextAddress, onDelete, isHighlighted }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative group flex-shrink-0"
    >
      {/* Node Address (top label) */}
      <div className="text-center mb-1">
        <span className="text-xs font-mono text-gray-400 bg-gray-800 px-2 py-0.5 rounded">
          {nodeAddress}
        </span>
      </div>

      {/* Node Box */}
      <div
        className={`w-48 bg-gradient-to-br from-gray-700 to-gray-800 border-2 rounded-lg shadow-lg overflow-hidden transition-colors duration-300 ${
          isHighlighted ? "border-yellow-400 shadow-yellow-400/50" : "border-sky-400"
        }`}
      >
        {/* Data section */}
        <div className="border-b border-gray-600 p-3 text-center">
          <div className="text-xs text-gray-400">Data</div>
          <div className="text-xl font-bold text-white">{value}</div>
        </div>

        {/* Next pointer section */}
        <div className="p-3 text-center">
          <div className="text-xs text-gray-400">Next</div>
          <div className="font-mono text-sm text-sky-300 break-all">
            {nextAddress}
          </div>
        </div>
      </div>

      {/* Delete button */}
      <button
        onClick={() => onDelete(index)}
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-sm hover:bg-red-600"
      >
        ×
      </button>
    </motion.div>
  );
});

Node.displayName = "Node";

const LinkedListVisualizer = () => {
  const [nodes, setNodes] = useState([10, 20, 30]);
  const [inputValue, setInputValue] = useState("");
  const [deleteValue, setDeleteValue] = useState("");
  const [insertIndex, setInsertIndex] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");

  // Memoized handlers
  const addAtHead = useCallback(() => {
    if (!inputValue.trim()) return;
    setNodes((prev) => [inputValue, ...prev]);
    setInputValue("");
    setError("");
  }, [inputValue]);

  const addAtTail = useCallback(() => {
    if (!inputValue.trim()) return;
    setNodes((prev) => [...prev, inputValue]);
    setInputValue("");
    setError("");
  }, [inputValue]);

  const insertAtIndex = useCallback(() => {
    if (!inputValue.trim()) {
      setError("Please enter a value");
      return;
    }
    const idx = parseInt(insertIndex);
    if (isNaN(idx) || idx < 0 || idx > nodes.length) {
      setError(`Index must be between 0 and ${nodes.length}`);
      return;
    }
    setNodes((prev) => {
      const newNodes = [...prev];
      newNodes.splice(idx, 0, inputValue);
      return newNodes;
    });
    setInputValue("");
    setInsertIndex("");
    setError("");
  }, [inputValue, insertIndex, nodes.length]);

  const deleteByValue = useCallback(() => {
    if (!deleteValue.trim()) return;
    const index = nodes.findIndex((val) => val.toString() === deleteValue);
    if (index === -1) {
      setError("Value not found in the list.");
      return;
    }
    setNodes((prev) => {
      const newNodes = [...prev];
      newNodes.splice(index, 1);
      return newNodes;
    });
    setDeleteValue("");
    setError("");
  }, [deleteValue, nodes]);

  const deleteAtIndex = useCallback((index) => {
    setNodes((prev) => {
      const newNodes = [...prev];
      newNodes.splice(index, 1);
      return newNodes;
    });
  }, []);

  const clearList = useCallback(() => {
    setNodes([]);
    setError("");
  }, []);

  const generateRandom = useCallback(() => {
    const randomNodes = Array.from({ length: 5 }, () => Math.floor(Math.random() * 90) + 10);
    setNodes(randomNodes);
    setError("");
  }, []);

  // Search highlight indices
  const highlightedIndices = searchTerm
    ? nodes.reduce((acc, val, idx) => {
        if (val.toString().includes(searchTerm)) acc.push(idx);
        return acc;
      }, [])
    : [];

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-gray-100 flex flex-col items-center p-4 sm:p-6">
      <div className="w-full max-w-7xl flex-1 flex flex-col">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-400 to-pink-400">
          Linked List Visualizer
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Each node shows its memory address, data, and pointer to the next node.
        </p>

        {/* Error message */}
        {error && (
          <div className="mb-4 text-center text-red-400 bg-red-900/20 py-2 px-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
          {/* Add value input */}
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500 w-32 sm:w-40"
            />
            <button
              onClick={addAtHead}
              className="px-4 py-2 bg-gradient-to-r from-sky-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition shadow-lg"
            >
              Add Head
            </button>
            <button
              onClick={addAtTail}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition shadow-lg"
            >
              Add Tail
            </button>
          </div>

          {/* Insert at index */}
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="number"
              value={insertIndex}
              onChange={(e) => setInsertIndex(e.target.value)}
              placeholder="Index"
              className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-sky-500 w-20"
              min="0"
              max={nodes.length}
            />
            <button
              onClick={insertAtIndex}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition shadow-lg"
            >
              Insert at Index
            </button>
          </div>

          {/* Delete by value */}
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              value={deleteValue}
              onChange={(e) => setDeleteValue(e.target.value)}
              placeholder="Delete value"
              className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 w-32 sm:w-40"
            />
            <button
              onClick={deleteByValue}
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:opacity-90 transition shadow-lg"
            >
              Delete by Value
            </button>
          </div>
        </div>

        {/* Second row controls */}
        <div className="flex flex-wrap gap-4 justify-center items-center mb-8">
          {/* Search */}
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search data"
              className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 w-32 sm:w-40"
            />
            <span className="text-sm text-gray-400">
              {highlightedIndices.length > 0 ? `${highlightedIndices.length} match(es)` : ""}
            </span>
          </div>

          {/* Utility buttons */}
          <button
            onClick={generateRandom}
            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg hover:opacity-90 transition shadow-lg"
          >
            Random 5
          </button>
          <button
            onClick={clearList}
            className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:opacity-90 transition shadow-lg"
          >
            Clear All
          </button>
        </div>

        {/* Visualization Area */}
        <div className="flex-1 bg-gray-900/50 rounded-2xl border border-gray-700 p-6 overflow-x-auto">
          <div className="flex items-start justify-start min-h-[280px] gap-2">
            {nodes.length === 0 ? (
              <p className="text-gray-400 text-center w-full">Empty list. Add some nodes.</p>
            ) : (
              nodes.map((value, index) => {
                const nodeAddress = generateAddress(index);
                const nextAddress =
                  index < nodes.length - 1 ? generateAddress(index + 1) : "null";

                return (
                  <React.Fragment key={index}>
                    <Node
                      value={value}
                      index={index}
                      nodeAddress={nodeAddress}
                      nextAddress={nextAddress}
                      onDelete={deleteAtIndex}
                      isHighlighted={highlightedIndices.includes(index)}
                    />

                    {/* Arrow (except after last node) */}
                    {index < nodes.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex-shrink-0 self-center text-3xl text-gray-400 mx-1"
                      >
                        →
                      </motion.div>
                    )}
                  </React.Fragment>
                );
              })
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 text-center text-gray-400">
          <p>Head → {nodes.length > 0 ? generateAddress(0) : "null"}</p>
          <p>Tail → {nodes.length > 0 ? generateAddress(nodes.length - 1) : "null"}</p>
          <p>Size: {nodes.length}</p>
        </div>
      </div>
    </div>
  );
};

export default LinkedListVisualizer;