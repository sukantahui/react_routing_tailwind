import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import examplesData from './topic30_files/sopToPosExamples.json';

/**
 * Component: SopToPosConverter
 * Purpose: Demonstrates SOP to POS conversion using algebraic method
 *          - Loads 50 examples from JSON file in topic30_files folder
 *          - Displays step-by-step conversion with proper Boolean laws
 *          - Shows both SOP and POS forms
 *          - Interactive example selection with search functionality
 * 
 * When & Why: Used as a learning tool for understanding how to convert
 *             Sum of Products to Product of Sums using algebraic manipulation.
 * 
 * Return Type: JSX.Element
 */

const SopToPosConverter = () => {
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
      setExamples(examplesData.examples);
      setFilteredExamples(examplesData.examples);
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
        ex.sop.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ex.pos.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredExamples(filtered);
      // Reset selected example if current selection is out of range
      if (selectedExample >= filtered.length) {
        setSelectedExample(0);
      }
    }
  }, [searchTerm, examples, selectedExample]);

  const currentExample = filteredExamples[selectedExample];

  // Variable names based on number of variables
  const getVarNames = (variables) => {
    if (variables === 2) return ['A', 'B'];
    if (variables === 3) return ['A', 'B', 'C'];
    return ['A', 'B', 'C', 'D'];
  };

  // Generate truth table for current example
  const generateTruthTable = () => {
    if (!currentExample) return { rows: [], varNames: [] };
    
    const n = currentExample.variables;
    const totalRows = Math.pow(2, n);
    const varNames = getVarNames(n);
    
    // Parse SOP expression for evaluation (simplified for demo)
    const sopExpr = currentExample.sop;
    const rows = [];
    
    for (let i = 0; i < totalRows; i++) {
      const values = [];
      for (let j = n - 1; j >= 0; j--) {
        values.push((i >> j) & 1);
      }
      
      let output = 0;
      const a = values[0], b = values[1], c = values[2], d = values[3];
      
      // Evaluate based on SOP pattern
      if (sopExpr === 'A·B') output = (a && b) ? 1 : 0;
      else if (sopExpr === 'A+B') output = (a || b) ? 1 : 0;
      else if (sopExpr === 'A·B\' + A\'·B') output = (a !== b) ? 1 : 0;
      else if (sopExpr === 'A·B + A\'·B\'') output = (a === b) ? 1 : 0;
      else if (sopExpr === 'A·B + A·C + B·C') output = (a && b) || (a && c) || (b && c) ? 1 : 0;
      else if (sopExpr === 'A·(B+C)') output = a && (b || c) ? 1 : 0;
      else if (sopExpr === 'A·B + C·D') output = (a && b) || (c && d) ? 1 : 0;
      else if (sopExpr === '(A·B·C)\'') output = !(a && b && c) ? 1 : 0;
      else if (sopExpr === '(A+B+C)\'') output = !(a || b || c) ? 1 : 0;
      else if (sopExpr === 'A·B + A\'·C') output = (a && b) || (!a && c) ? 1 : 0;
      else if (sopExpr.includes('A⊕B⊕C') || sopExpr === 'A⊕B⊕C') {
        const sum = values.reduce((acc, v) => acc + v, 0);
        output = (sum % 2 === 1) ? 1 : 0;
      }
      else if (sopExpr.includes('A\'B\'C\' + A\'BC + AB\'C + ABC\'')) {
        const sum = values.reduce((acc, v) => acc + v, 0);
        output = (sum % 2 === 0) ? 1 : 0;
      }
      else {
        // Try to match common minterm patterns
        if (sopExpr.includes('A\'B\'C\'') && a===0 && b===0 && c===0) output = 1;
        else if (sopExpr.includes('A\'BC') && a===0 && b===1 && c===1) output = 1;
        else if (sopExpr.includes('AB\'C') && a===1 && b===0 && c===1) output = 1;
        else if (sopExpr.includes('ABC\'') && a===1 && b===1 && c===0) output = 1;
        else if (sopExpr.includes('ABC') && a===1 && b===1 && c===1) output = 1;
      }
      
      rows.push({ inputs: values, output, minterm: i });
    }
    return { rows, varNames };
  };

  const { rows, varNames } = currentExample ? generateTruthTable() : { rows: [], varNames: [] };

  // Handle previous/next navigation
  const prevExample = () => {
    setSelectedExample((prev) => (prev > 0 ? prev - 1 : filteredExamples.length - 1));
  };

  const nextExample = () => {
    setSelectedExample((prev) => (prev + 1) % filteredExamples.length);
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <div className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="animate-pulse flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-500 rounded-full mb-3"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading 50 examples from topic30_files...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-blue-100 dark:bg-blue-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">SOP to POS Conversion</span>
          <span className="block text-blue-600 dark:text-blue-400">Algebraic Method</span>
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl">
          50+ Examples with Step-by-Step Algebraic Conversion Using Boolean Laws
        </p>
        <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
          📁 Data loaded from: <span className="font-mono">topic30_files/sopToPosExamples.json</span>
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
              placeholder="Search by name, SOP, or POS expression..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
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
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
            {filteredExamples.map((ex, idx) => (
              <button
                key={ex.id}
                onClick={() => setSelectedExample(idx)}
                className={clsx(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 text-left truncate",
                  selectedExample === idx
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                )}
                title={ex.name}
              >
                {ex.id}. {ex.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Conversion Display */}
        {currentExample && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            {/* Header with Example Info */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <h3 className="text-xl font-bold text-white">Example {currentExample.id}: {currentExample.name}</h3>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                    {currentExample.variables} Variables
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                    Method: {currentExample.method}
                  </span>
                </div>
              </div>
              <p className="text-blue-100 text-sm mt-1">{currentExample.explanation}</p>
            </div>
            
            {/* SOP and POS Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide">Sum of Products (SOP)</h4>
                <p className="font-mono text-xl mt-2 break-all">{currentExample.sop}</p>
                <p className="text-xs text-gray-500 mt-2">Minterms: OR of AND terms</p>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-5 text-center transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <h4 className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wide">Product of Sums (POS)</h4>
                <p className="font-mono text-xl mt-2 break-all">{currentExample.pos}</p>
                <p className="text-xs text-gray-500 mt-2">Maxterms: AND of OR terms</p>
              </div>
            </div>
            
            {/* Truth Table Preview */}
            <div className="px-6 pb-2">
              <details className="cursor-pointer group">
                <summary className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  📊 View Truth Table
                </summary>
                <div className="mt-3 overflow-x-auto">
                  <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">
                    <thead>
                      <tr className="bg-gray-200 dark:bg-gray-600">
                        {varNames.map(v => (
                          <th key={v} className="px-3 py-2 text-center font-mono">{v}</th>
                        ))}
                        <th className="px-3 py-2 text-center">F (SOP)</th>
                        <th className="px-3 py-2 text-center">Minterm</th>
                        <th className="px-3 py-2 text-center">Maxterm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.slice(0, 12).map((row, idx) => (
                        <tr key={idx} className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors">
                          {row.inputs.map((val, i) => (
                            <td key={i} className="px-3 py-2 text-center font-mono">{val}</td>
                          ))}
                          <td className={clsx(
                            "px-3 py-2 text-center font-mono font-bold",
                            row.output === 1 ? "text-green-600" : "text-red-600"
                          )}>{row.output}</td>
                          <td className="px-3 py-2 text-center font-mono">
                            {row.output === 1 ? `m${row.minterm}` : '-'}
                          </td>
                          <td className="px-3 py-2 text-center font-mono">
                            {row.output === 0 ? `M${row.minterm}` : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {currentExample.variables === 4 && rows.length > 12 && (
                    <p className="text-xs text-gray-500 mt-1">Showing first 12 of {rows.length} rows</p>
                  )}
                </div>
              </details>
            </div>
            
            {/* Step-by-Step Conversion */}
            <div className="px-6 pb-6">
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="w-full py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg font-medium transition-all duration-300 hover:bg-blue-200 dark:hover:bg-blue-900/60 mb-4"
              >
                {showSteps ? "📖 Hide" : "📖 Show"} Step-by-Step Algebraic Conversion
              </button>
              
              {showSteps && (
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className="text-xl">📝</span> Algebraic Conversion Steps
                  </h4>
                  <div className="space-y-3">
                    {currentExample.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all">
                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold shrink-0">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 dark:text-white text-sm">{step.action}</p>
                          <p className="font-mono text-sm text-gray-700 dark:text-gray-300 mt-1">
                            {step.expression}
                          </p>
                          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                            📌 Law used: {step.law}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <p className="text-sm text-center">
                      <span className="font-bold text-green-700 dark:text-green-400">✓ Final POS Form:</span>{' '}
                      <span className="font-mono">{currentExample.pos}</span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Conversion Techniques Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔧 Key Algebraic Conversion Techniques</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
              <h3 className="font-semibold text-blue-600 mb-2">1. Maxterm Method</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Convert SOP to minterms, then complement to get maxterms, then write POS as product of maxterms.</p>
              <p className="font-mono text-xs mt-2 bg-gray-100 dark:bg-gray-700 p-1 rounded">F = Σ(mᵢ) → F = Π(Mⱼ) where j ≠ i</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
              <h3 className="font-semibold text-blue-600 mb-2">2. Distributive Law</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Use X·Y + Z = (X+Z)·(Y+Z) repeatedly to convert SOP to POS.</p>
              <p className="font-mono text-xs mt-2 bg-gray-100 dark:bg-gray-700 p-1 rounded">AB + CD = (A+C)·(A+D)·(B+C)·(B+D)</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-all">
              <h3 className="font-semibold text-blue-600 mb-2">3. De Morgan's Theorem</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Use complement method: F_POS = (F_SOP')' after applying De Morgan's.</p>
              <p className="font-mono text-xs mt-2 bg-gray-100 dark:bg-gray-700 p-1 rounded">(A·B)' = A' + B'</p>
            </div>
          </div>
        </div>

        {/* Law Reference Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 Boolean Laws Used in Conversion</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
              <p className="font-mono font-bold">De Morgan's Theorem</p>
              <p className="text-gray-600 dark:text-gray-400">(A·B)' = A' + B', (A+B)' = A'·B'</p>
            </div>
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
              <p className="font-mono font-bold">Distributive Law</p>
              <p className="text-gray-600 dark:text-gray-400">A·(B+C) = A·B + A·C, A + B·C = (A+B)·(A+C)</p>
            </div>
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
              <p className="font-mono font-bold">Complement Law</p>
              <p className="text-gray-600 dark:text-gray-400">A·A' = 0, A + A' = 1</p>
            </div>
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
              <p className="font-mono font-bold">Identity Law</p>
              <p className="text-gray-600 dark:text-gray-400">A·1 = A, A+0 = A</p>
            </div>
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
              <p className="font-mono font-bold">Idempotent Law</p>
              <p className="text-gray-600 dark:text-gray-400">A·A = A, A+A = A</p>
            </div>
            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-all">
              <p className="font-mono font-bold">Consensus Theorem</p>
              <p className="text-gray-600 dark:text-gray-400">A·B + A'·C + B·C = A·B + A'·C</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            📊 Total Examples: {examples.length} | Currently viewing: {filteredExamples.length} | 
            <span className="ml-1">✓ All examples include step-by-step algebraic conversion</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            📁 Data source: <span className="font-mono">src/topic30_files/sopToPosExamples.json</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SopToPosConverter;