import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import perfectInductionData from './topic34_files/perfectInductionExamples.json';

/**
 * Component: PerfectInductionProof
 * Purpose: Demonstrates perfect induction proofs for Boolean identities
 *          - Loads examples from JSON file
 *          - Displays truth table verification
 *          - Shows step-by-step proof with laws used
 *          - Interactive example selection
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

  // Load examples from imported JSON file
  useEffect(() => {
    try {
      setExamples(perfectInductionData.examples);
      setFilteredExamples(perfectInductionData.examples);
      setLoading(false);
    } catch (error) {
      console.error('Error loading examples:', error);
      setLoading(false);
    }
  }, []);

  // Filter examples based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredExamples(examples);
    } else {
      const filtered = examples.filter(ex => 
        ex.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ex.leftExpression && ex.leftExpression.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (ex.expression && ex.expression.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredExamples(filtered);
      if (selectedExample >= filtered.length) {
        setSelectedExample(0);
      }
    }
  }, [searchTerm, examples, selectedExample]);

  const currentExample = filteredExamples[selectedExample];

  const nextExample = () => {
    setSelectedExample((prev) => (prev + 1) % filteredExamples.length);
  };

  const prevExample = () => {
    setSelectedExample((prev) => (prev - 1 + filteredExamples.length) % filteredExamples.length);
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
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
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
        {/* Search and Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <div className="mb-4">
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
              placeholder="Search by title or expression..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {filteredExamples.length} examples found
            </p>
            <div className="flex gap-2">
              <button onClick={prevExample} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 transition">← Previous</button>
              <button onClick={nextExample} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 transition">Next →</button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
            {filteredExamples.map((ex, idx) => (
              <button
                key={ex.id}
                onClick={() => setSelectedExample(idx)}
                className={clsx(
                  "px-3 py-2 rounded-lg text-sm text-left truncate transition-all",
                  selectedExample === idx
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                )}
                title={ex.title}
              >
                {ex.id}. {ex.title.substring(0, 60)}...
              </button>
            ))}
          </div>
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
                <h3 className="text-xl font-bold text-white">{currentExample.title}</h3>
                <span className={clsx(
                  "px-3 py-1 rounded-full text-sm font-medium",
                  currentExample.isCorrect === false 
                    ? "bg-red-800 text-white" 
                    : "bg-green-800 text-white"
                )}>
                  {currentExample.isCorrect === false ? "✗ Identity is FALSE" : "✓ Identity is TRUE"}
                </span>
              </div>
              <p className="text-indigo-100 text-sm mt-1">{currentExample.explanation}</p>
            </div>
            
            <div className="p-6 space-y-6">
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