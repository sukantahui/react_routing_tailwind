import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import perfectInductionData from './topic34_files/perfectInductionExamples.json';

/**
 * Component: PerfectInductionProof
 * Purpose: Demonstrates perfect induction proofs for Boolean identities
 *          - Loads examples from JSON file
 *          - Displays truth table verification
 *          - Shows step-by-step proof with laws used
 *          - Interactive example selection with detailed cards
 * 
 * When & Why: Used as a learning tool for understanding perfect induction
 *             method to prove Boolean identities.
 * 
 * Return Type: JSX.Element
 */

const PerfectInductionProof = () => {
  // State for examples data
  const [examples, setExamples] = useState([]);
  const [selectedExample, setSelectedExample] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showSteps, setShowSteps] = useState(true);
  const [showTruthTable, setShowTruthTable] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExamples, setFilteredExamples] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Extract unique categories and difficulties from examples
  const [categories, setCategories] = useState([]);
  const [difficulties, setDifficulties] = useState([]);

  // Load examples from imported JSON file
  useEffect(() => {
    try {
      const loadedExamples = perfectInductionData.examples;
      setExamples(loadedExamples);
      setFilteredExamples(loadedExamples);
      
      // Extract unique categories
      const uniqueCategories = ['all', ...new Set(loadedExamples.map(ex => ex.category).filter(Boolean))];
      setCategories(uniqueCategories);
      
      // Extract unique difficulties
      const uniqueDifficulties = ['all', ...new Set(loadedExamples.map(ex => ex.difficulty).filter(Boolean))];
      setDifficulties(uniqueDifficulties);
      
      setLoading(false);
    } catch (error) {
      console.error('Error loading examples:', error);
      setLoading(false);
    }
  }, []);

  // Filter examples based on search term, category, and difficulty
  useEffect(() => {
    let filtered = examples;
    
    // Apply search filter
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(ex => 
        ex.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ex.leftExpression && ex.leftExpression.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ex.rightExpression && ex.rightExpression.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ex.expression && ex.expression.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ex.description && ex.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(ex => ex.category === selectedCategory);
    }
    
    // Apply difficulty filter
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(ex => ex.difficulty === selectedDifficulty);
    }
    
    setFilteredExamples(filtered);
    if (selectedExample >= filtered.length) {
      setSelectedExample(0);
    }
  }, [searchTerm, examples, selectedExample, selectedCategory, selectedDifficulty]);

  const currentExample = filteredExamples[selectedExample];

  const nextExample = () => {
    setSelectedExample((prev) => (prev + 1) % filteredExamples.length);
  };

  const prevExample = () => {
    setSelectedExample((prev) => (prev - 1 + filteredExamples.length) % filteredExamples.length);
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty) => {
    switch(difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Render truth table for proof verification
  const renderTruthTable = (example) => {
    if (!example.truthTable) return null;
    
    const variables = example.variables;
    
    return (
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-600">
              {variables.map(v => (
                <th key={v} className="px-4 py-2 text-center font-mono">{v}</th>
              ))}
              <th className="px-4 py-2 text-center">Left Side</th>
              <th className="px-4 py-2 text-center">Right Side</th>
              <th className="px-4 py-2 text-center">Match?</th>
            </tr>
          </thead>
          <tbody>
            {example.truthTable.map((row, idx) => (
              <tr key={idx} className="border-t border-gray-200 dark:border-gray-600">
                {variables.map(v => (
                  <td key={v} className="px-4 py-2 text-center font-mono">{row[v]}</td>
                ))}
                <td className="px-4 py-2 text-center font-mono font-bold">{row.left !== undefined ? row.left : row.output}</td>
                <td className="px-4 py-2 text-center font-mono font-bold">{row.right !== undefined ? row.right : '-'}</td>
                <td className={clsx(
                  "px-4 py-2 text-center font-bold",
                  row.match ? "text-green-600" : "text-red-600"
                )}>
                  {row.match ? "✓" : "✗"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render example card for list view
  const renderExampleCard = (ex, idx) => (
    <div
      key={ex.id}
      onClick={() => setSelectedExample(idx)}
      className={clsx(
        "cursor-pointer transition-all duration-200 rounded-lg border-2 p-4",
        selectedExample === idx
          ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 shadow-md"
          : "border-gray-200 dark:border-gray-700 hover:border-indigo-300 hover:shadow-md bg-white dark:bg-gray-800"
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              #{ex.id}
            </span>
            {ex.category && (
              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full">
                {ex.category}
              </span>
            )}
            {ex.difficulty && (
              <span className={clsx("text-xs px-2 py-1 rounded-full", getDifficultyColor(ex.difficulty))}>
                {ex.difficulty}
              </span>
            )}
            {ex.isCorrect === false && (
              <span className="text-xs px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 rounded-full">
                ⚠️ Counterexample
              </span>
            )}
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">
            {ex.title}
          </h3>
          {ex.description && (
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
              {ex.description}
            </p>
          )}
          <div className="font-mono text-xs text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700/50 p-2 rounded mt-2">
            {ex.leftExpression ? (
              <>
                <div>{ex.leftExpression} = {ex.rightExpression}</div>
              </>
            ) : ex.expression && (
              <div>{ex.expression}</div>
            )}
          </div>
          {ex.variables && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Variables: {ex.variables.join(', ')} | Cases: {Math.pow(2, ex.variables.length)}²ⁿ
            </div>
          )}
        </div>
        {selectedExample === idx && (
          <div className="text-indigo-500 ml-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-8 text-center">
        <div className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 bg-indigo-500 rounded-full mb-3"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading perfect induction examples...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-indigo-100 dark:bg-indigo-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Perfect Induction Proof</span>
          <span className="block text-indigo-600 dark:text-indigo-400">Boolean Identity Verification</span>
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl">
          Verify Boolean identities using perfect induction (truth table method)
        </p>
      </div>

      <div className="space-y-8">
        {/* Search and Filters Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                🔍 Search Examples:
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedExample(0);
                }}
                placeholder="Search by title, expression, or description..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                📂 Category:
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ⭐ Difficulty:
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              >
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>
                    {diff === 'all' ? 'All Levels' : diff}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-between items-center flex-wrap gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              📊 Found <span className="font-bold text-indigo-600">{filteredExamples.length}</span> examples
              {examples.length !== filteredExamples.length && ` (filtered from ${examples.length} total)`}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={clsx(
                  "px-3 py-1 rounded-lg transition",
                  viewMode === 'grid' ? "bg-indigo-500 text-white" : "bg-gray-200 dark:bg-gray-700"
                )}
              >
                📱 Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={clsx(
                  "px-3 py-1 rounded-lg transition",
                  viewMode === 'list' ? "bg-indigo-500 text-white" : "bg-gray-200 dark:bg-gray-700"
                )}
              >
                📋 List
              </button>
            </div>
          </div>
        </div>

        {/* Example List Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>📚</span> Available Examples
            <span className="text-sm font-normal text-gray-500">(Click any example to view details)</span>
          </h2>
          
          <div className={clsx(
            "max-h-96 overflow-y-auto",
            viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-3" : "space-y-3"
          )}>
            {filteredExamples.map((ex, idx) => renderExampleCard(ex, idx))}
          </div>
          
          {filteredExamples.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No examples found matching your criteria. Try adjusting the filters.
            </div>
          )}
        </div>

        {/* Main Example Display */}
        {currentExample && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className={clsx(
              "px-6 py-4",
              currentExample.isCorrect === false 
                ? "bg-gradient-to-r from-red-500 to-orange-600" 
                : "bg-gradient-to-r from-indigo-500 to-purple-600"
            )}>
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">{currentExample.title}</h3>
                  <div className="flex gap-2 mt-1">
                    {currentExample.category && (
                      <span className="text-xs px-2 py-1 bg-white/20 rounded-full text-white">
                        {currentExample.category}
                      </span>
                    )}
                    {currentExample.difficulty && (
                      <span className="text-xs px-2 py-1 bg-white/20 rounded-full text-white">
                        {currentExample.difficulty}
                      </span>
                    )}
                  </div>
                </div>
                <span className={clsx(
                  "px-3 py-1 rounded-full text-sm font-medium",
                  currentExample.isCorrect === false 
                    ? "bg-red-800 text-white" 
                    : "bg-green-800 text-white"
                )}>
                  {currentExample.isCorrect === false ? "✗ Identity is FALSE" : "✓ Identity is TRUE"}
                </span>
              </div>
              <p className="text-indigo-100 text-sm mt-2">{currentExample.explanation}</p>
              {currentExample.description && (
                <p className="text-white/80 text-sm mt-1">{currentExample.description}</p>
              )}
            </div>
            
            <div className="p-6 space-y-6">
              {/* Navigation Buttons */}
              <div className="flex justify-between gap-3">
                <button onClick={prevExample} className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 transition font-medium">
                  ← Previous Example
                </button>
                <button onClick={nextExample} className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 transition font-medium">
                  Next Example →
                </button>
              </div>
              
              {/* Expression Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentExample.leftExpression && (
                  <>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 text-center">
                      <p className="text-sm text-blue-600">Left Side Expression</p>
                      <p className="font-mono text-lg break-all">{currentExample.leftExpression}</p>
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 text-center">
                      <p className="text-sm text-green-600">Right Side Expression</p>
                      <p className="font-mono text-lg break-all">{currentExample.rightExpression}</p>
                    </div>
                  </>
                )}
                {currentExample.expression && (
                  <div className="col-span-2 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 text-center">
                    <p className="text-sm text-amber-600">Original Expression</p>
                    <p className="font-mono text-lg break-all">{currentExample.expression}</p>
                    <p className="text-sm text-indigo-600 mt-2">Complement: <span className="font-mono">{currentExample.complement}</span></p>
                  </div>
                )}
              </div>
              
              {/* Truth Table Toggle */}
              {currentExample.truthTable && (
                <>
                  <button
                    onClick={() => setShowTruthTable(!showTruthTable)}
                    className="w-full py-2 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
                  >
                    {showTruthTable ? "Hide" : "Show"} Truth Table Verification
                  </button>
                  
                  {showTruthTable && renderTruthTable(currentExample)}
                </>
              )}
              
              {/* Steps Toggle */}
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="w-full py-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 rounded-lg font-medium hover:bg-indigo-200 transition"
              >
                {showSteps ? "Hide" : "Show"} Step-by-Step Proof
              </button>
              
              {showSteps && currentExample.steps && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-xl">📝</span> Perfect Induction Proof
                  </h4>
                  <div className="space-y-4">
                    {currentExample.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all">
                        <div className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{step.action}</p>
                          {step.leftCalculation && (
                            <p className="font-mono text-sm text-gray-700 dark:text-gray-300 mt-1">
                              Left: {step.leftCalculation}
                            </p>
                          )}
                          {step.rightCalculation && (
                            <p className="font-mono text-sm text-gray-700 dark:text-gray-300">
                              Right: {step.rightCalculation}
                            </p>
                          )}
                          {step.expression && (
                            <p className="font-mono text-sm text-gray-700 dark:text-gray-300 mt-1">
                              {step.expression}
                            </p>
                          )}
                          <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1">
                            📌 Result: {step.result} | Law: {step.law}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {currentExample.conclusion && (
                    <div className={clsx(
                      "mt-4 p-3 rounded-lg text-center font-medium",
                      currentExample.isCorrect === false 
                        ? "bg-red-100 dark:bg-red-900/30 text-red-700"
                        : "bg-green-100 dark:bg-green-900/30 text-green-700"
                    )}>
                      {currentExample.conclusion}
                    </div>
                  )}
                </div>
              )}
              
              {showSteps && currentExample.note && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4">
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    <span className="font-bold">📌 Note:</span> {currentExample.note}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Perfect Induction Method Explanation */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">🔬 Perfect Induction Method</h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
            Perfect induction is a method to prove Boolean identities by evaluating both sides of the equation 
            for all possible input combinations (2ⁿ cases) and verifying they produce identical outputs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p className="font-semibold text-indigo-600">Steps for Perfect Induction:</p>
              <ol className="list-decimal pl-5 mt-2 space-y-1 text-sm">
                <li>Identify the number of variables (n)</li>
                <li>List all 2ⁿ input combinations</li>
                <li>Evaluate left side for each combination</li>
                <li>Evaluate right side for each combination</li>
                <li>Compare results. If all match → identity is TRUE</li>
              </ol>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p className="font-semibold text-indigo-600">Why It Works:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
                <li>Exhaustive verification of all cases</li>
                <li>No assumptions about variable values</li>
                <li>Works for any number of variables (practically up to 4-5)</li>
                <li>Also called "Proof by Truth Table"</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Boolean Laws Reference */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">📚 Boolean Laws Used in Perfect Induction</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded"><span className="font-mono">De Morgan's Theorem</span></div>
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded"><span className="font-mono">Distributive Law</span></div>
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded"><span className="font-mono">Complement Law</span></div>
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded"><span className="font-mono">Identity Law</span></div>
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded"><span className="font-mono">Null Law</span></div>
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded"><span className="font-mono">Idempotent Law</span></div>
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded"><span className="font-mono">Absorption Law</span></div>
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded"><span className="font-mono">Consensus Theorem</span></div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            📊 Total Examples: {examples.length} | Currently viewing: {filteredExamples.length} | 
            <span className="ml-1">✓ Perfect induction verifies all 2ⁿ input combinations</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerfectInductionProof;