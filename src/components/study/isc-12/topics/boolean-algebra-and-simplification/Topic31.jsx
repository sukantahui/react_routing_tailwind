import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import simplificationData from './topic31_files/simplificationExamples.json';

/**
 * Component: BooleanSimplification
 * Purpose: Demonstrates Boolean expression simplification using algebraic method
 *          - Loads 20 simplification examples from JSON file
 *          - Displays step-by-step simplification with proper Boolean laws
 *          - Shows original and simplified expressions
 *          - Interactive example selection with search functionality
 * 
 * When & Why: Used as a learning tool for understanding how to simplify
 *             Boolean expressions using algebraic manipulation and Boolean laws.
 * 
 * Return Type: JSX.Element
 */

const BooleanSimplification = () => {
  // State for examples data
  const [examples, setExamples] = useState([]);
  const [selectedExample, setSelectedExample] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showSteps, setShowSteps] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredExamples, setFilteredExamples] = useState([]);

  // Load examples from imported JSON file
  useEffect(() => {
    try {
      // Load data from the imported JSON
      setExamples(simplificationData.examples);
      setFilteredExamples(simplificationData.examples);
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
        ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.original.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.simplified.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredExamples(filtered);
      // Reset selected example if current selection is out of range
      if (selectedExample >= filtered.length) {
        setSelectedExample(0);
      }
    }
  }, [searchTerm, examples, selectedExample]);

  const currentExample = filteredExamples[selectedExample];

  // Handle previous/next navigation
  const prevExample = () => {
    setSelectedExample((prev) => (prev > 0 ? prev - 1 : filteredExamples.length - 1));
  };

  const nextExample = () => {
    setSelectedExample((prev) => (prev + 1) % filteredExamples.length);
  };

  // Generate truth table for current example (simplified evaluation)
  const generateTruthTable = () => {
    if (!currentExample) return { rows: [], varNames: [] };
    
    const varNames = currentExample.variables;
    const n = varNames.length;
    const totalRows = Math.pow(2, n);
    const rows = [];
    
    // Helper to evaluate expression (simplified for common patterns)
    const evaluate = (expr, values) => {
      const vars = {};
      varNames.forEach((v, i) => { vars[v] = values[i]; });
      
      // Replace variables with values
      let evalExpr = expr;
      for (const [v, val] of Object.entries(vars)) {
        evalExpr = evalExpr.replace(new RegExp(v, 'g'), val);
      }
      evalExpr = evalExpr.replace(/·/g, '&&').replace(/\+/g, '||').replace(/'/g, '!');
      
      try {
        return Function(`'use strict'; return (${evalExpr})`)() ? 1 : 0;
      } catch {
        return 0;
      }
    };
    
    for (let i = 0; i < totalRows; i++) {
      const values = [];
      for (let j = n - 1; j >= 0; j--) {
        values.push((i >> j) & 1);
      }
      const originalOutput = evaluate(currentExample.original, values);
      const simplifiedOutput = evaluate(currentExample.simplified, values);
      
      rows.push({
        inputs: values,
        original: originalOutput,
        simplified: simplifiedOutput,
        match: originalOutput === simplifiedOutput,
        minterm: i
      });
    }
    return { rows, varNames };
  };

  const { rows, varNames } = currentExample ? generateTruthTable() : { rows: [], varNames: [] };
  const allMatch = rows.every(row => row.match);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <div className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 bg-emerald-500 rounded-full mb-3"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading 20 simplification examples...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Boolean Expression</span>
          <span className="block text-emerald-600 dark:text-emerald-400">Simplification</span>
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl">
          20 Examples with Step-by-Step Algebraic Simplification Using Boolean Laws
        </p>
        <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
          📁 Data loaded from: <span className="font-mono">topic30_files/simplificationExamples.json</span>
        </p>
      </div>

      <div className="space-y-8">
        {/* Search and Example Selector */}
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
              placeholder="Search by name, original expression, or simplified expression..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          
          <div className="mb-2 flex justify-between items-center">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              📋 Select Example ({filteredExamples.length} of {examples.length}):
            </p>
            <div className="flex gap-2">
              <button
                onClick={prevExample}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                ← Prev
              </button>
              <button
                onClick={nextExample}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                Next →
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
            {filteredExamples.map((ex, idx) => (
              <button
                key={ex.id}
                onClick={() => setSelectedExample(idx)}
                className={clsx(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 text-left truncate",
                  selectedExample === idx
                    ? "bg-emerald-500 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                )}
                title={ex.name}
              >
                {ex.id}. {ex.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Simplification Display */}
        {currentExample && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            {/* Header with Example Info */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <h3 className="text-xl font-bold text-white">Example {currentExample.id}: {currentExample.name}</h3>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                    {currentExample.variables.length} Variables: {currentExample.variables.join(', ')}
                  </span>
                </div>
              </div>
              <p className="text-emerald-100 text-sm mt-1">{currentExample.explanation}</p>
            </div>
            
            {/* Original and Simplified Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-5 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <h4 className="text-sm font-semibold text-orange-600 dark:text-orange-400 uppercase tracking-wide">Original Expression</h4>
                <p className="font-mono text-xl mt-2 break-all">{currentExample.original}</p>
                <p className="text-xs text-gray-500 mt-2">Before simplification</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">Simplified Expression</h4>
                <p className="font-mono text-xl mt-2 break-all text-green-700 dark:text-green-300 font-bold">{currentExample.simplified}</p>
                <p className="text-xs text-gray-500 mt-2">After simplification</p>
              </div>
            </div>
            
            {/* Verification Badge */}
            <div className="px-6">
              <div className={clsx(
                "text-center p-2 rounded-lg text-sm font-medium",
                allMatch ? "bg-green-100 dark:bg-green-900/30 text-green-700" : "bg-red-100 dark:bg-red-900/30 text-red-700"
              )}>
                {allMatch ? "✓ Verification Passed: Original and simplified expressions are equivalent!" : "✗ Verification Failed: Please check the simplification steps."}
              </div>
            </div>
            
            {/* Truth Table Preview */}
            <div className="px-6 pt-4 pb-2">
              <details className="cursor-pointer group">
                <summary className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  📊 View Truth Table Verification
                </summary>
                <div className="mt-3 overflow-x-auto">
                  <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-600">
                        {varNames.map(v => (
                          <th key={v} className="px-3 py-2 text-center font-mono">{v}</th>
                        ))}
                        <th className="px-3 py-2 text-center">Original F</th>
                        <th className="px-3 py-2 text-center">Simplified F</th>
                        <th className="px-3 py-2 text-center">Match?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.slice(0, 12).map((row, idx) => (
                        <tr key={idx} className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors">
                          {row.inputs.map((val, i) => (
                            <td key={i} className="px-3 py-2 text-center font-mono">{val}</td>
                          ))}
                          <td className="px-3 py-2 text-center font-mono font-bold">
                            {row.original}
                          </td>
                          <td className="px-3 py-2 text-center font-mono font-bold">
                            {row.simplified}
                          </td>
                          <td className="px-3 py-2 text-center">
                            {row.match ? "✓" : "✗"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {currentExample.variables.length === 3 && rows.length > 8 && (
                    <p className="text-xs text-gray-500 mt-1">Showing first 8 of {rows.length} rows</p>
                  )}
                  {currentExample.variables.length === 4 && rows.length > 12 && (
                    <p className="text-xs text-gray-500 mt-1">Showing first 12 of {rows.length} rows</p>
                  )}
                </div>
              </details>
            </div>
            
            {/* Step-by-Step Simplification */}
            <div className="px-6 pb-6">
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="w-full py-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-lg font-medium transition-all duration-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 mb-4"
              >
                {showSteps ? "📖 Hide" : "📖 Show"} Step-by-Step Algebraic Simplification
              </button>
              
              {showSteps && (
                <div className="bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-800 dark:to-emerald-900/20 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-xl">🔧</span> Simplification Steps
                  </h4>
                  <div className="space-y-3">
                    {currentExample.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all">
                        <div className="w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{step.action}</p>
                          <p className="font-mono text-sm text-gray-700 dark:text-gray-300 mt-1">
                            {step.expression}
                          </p>
                          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                            📌 Law used: {step.law}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-center">
                      <span className="font-bold text-green-700 dark:text-green-400">✓ Final Simplified Expression:</span>{' '}
                      <span className="font-mono text-lg">{currentExample.simplified}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Boolean Laws Reference */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 Boolean Laws Used in Simplification</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 hover:shadow-md transition-all">
              <p className="font-mono font-bold text-emerald-600">Identity Law</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">A·1 = A, A+0 = A</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 hover:shadow-md transition-all">
              <p className="font-mono font-bold text-emerald-600">Null Law</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">A·0 = 0, A+1 = 1</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 hover:shadow-md transition-all">
              <p className="font-mono font-bold text-emerald-600">Idempotent Law</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">A·A = A, A+A = A</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 hover:shadow-md transition-all">
              <p className="font-mono font-bold text-emerald-600">Complement Law</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">A·A' = 0, A+A' = 1</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 hover:shadow-md transition-all">
              <p className="font-mono font-bold text-emerald-600">Distributive Law</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">A·(B+C) = A·B + A·C, A + B·C = (A+B)·(A+C)</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 hover:shadow-md transition-all">
              <p className="font-mono font-bold text-emerald-600">Absorption Law</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">A + A·B = A, A·(A+B) = A</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 hover:shadow-md transition-all">
              <p className="font-mono font-bold text-emerald-600">De Morgan's Theorem</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">(A·B)' = A' + B', (A+B)' = A'·B'</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 hover:shadow-md transition-all">
              <p className="font-mono font-bold text-emerald-600">Consensus Theorem</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">A·B + A'·C + B·C = A·B + A'·C</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 hover:shadow-md transition-all">
              <p className="font-mono font-bold text-emerald-600">Involution Law</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">(A')' = A</p>
            </div>
          </div>
        </div>

        {/* Simplification Tips */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">💡 Tips for Boolean Simplification</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <span className="text-emerald-500 text-xl">✓</span>
              <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Factor common terms</strong> - Look for variables that appear in multiple terms</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-500 text-xl">✓</span>
              <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Look for complement pairs</strong> - A and A' together simplify to 0 or 1</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-500 text-xl">✓</span>
              <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Apply absorption</strong> - A + AB = A, A(A+B) = A</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-500 text-xl">✓</span>
              <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Use De Morgan's</strong> - To push complements through AND/OR gates</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-500 text-xl">✓</span>
              <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Check for consensus</strong> - AB + A'C + BC = AB + A'C</p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-500 text-xl">✓</span>
              <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Verify with truth table</strong> - Always test your simplified expression</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            📊 Total Examples: {examples.length} | Currently viewing: {filteredExamples.length} | 
            <span className="ml-1">✓ All examples include step-by-step algebraic simplification</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            📁 Data source: <span className="font-mono">src/topic30_files/simplificationExamples.json</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BooleanSimplification;