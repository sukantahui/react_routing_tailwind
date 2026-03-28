import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 24: Truth Tables: Construction from expressions
 * 
 * Component: Topic24
 * Purpose: Explains how to construct truth tables from Boolean expressions:
 *          - Systematic evaluation of all input combinations
 *          - Handling expressions with 2, 3, and 4 variables
 *          - Using intermediate columns for complex expressions
 *          - Verifying equivalence between expressions
 *          - Applications in circuit design and verification
 * 
 * When & Why: Used as the twenty-fifth topic in the Boolean Algebra series. Truth tables
 *             are fundamental for understanding Boolean functions and verifying
 *             simplifications. Learning to construct them systematically builds a
 *             strong foundation for digital logic design and testing.
 * 
 * Return Type: JSX.Element
 */

const Topic24 = () => {
  // State for interactive truth table builder
  const [numVariables, setNumVariables] = useState(3);
  const [expression, setExpression] = useState('A·B + A·C');
  const [showSteps, setShowSteps] = useState(true);
  const [customExpr, setCustomExpr] = useState('');
  const [buildResult, setBuildResult] = useState(null);

  // Variable names based on number of variables
  const getVarNames = () => {
    if (numVariables === 2) return ['A', 'B'];
    if (numVariables === 3) return ['A', 'B', 'C'];
    return ['A', 'B', 'C', 'D'];
  };

  const varNames = getVarNames();

  // Predefined expressions for examples
  const expressions = {
    2: {
      'A·B': 'A AND B',
      'A+B': 'A OR B',
      'A⊕B': 'A XOR B (A·B\' + A\'·B)',
      '(A+B)\'': 'NOR (A+B)\'',
      '(A·B)\'': 'NAND (A·B)\''
    },
    3: {
      'A·B + A·C': 'A·(B+C)',
      'A·B + B·C + A·C': 'Majority function',
      'A⊕B⊕C': 'XOR (odd parity)',
      'A·B·C': '3-input AND',
      'A+B+C': '3-input OR'
    },
    4: {
      'A·B + C·D': 'AND-OR combination',
      '(A+B)·(C+D)': 'OR-AND combination',
      'A⊕B⊕C⊕D': '4-input XOR (even parity)'
    }
  };

  // Evaluate expression for given input values (simplified evaluator)
  const evaluateExpression = (expr, values) => {
    // This is a simplified evaluator for demonstration
    // In practice, a full parser would be needed
    const vars = {};
    varNames.forEach((v, i) => {
      vars[v] = values[i];
    });

    // Handle common expressions
    const exprClean = expr.replace(/\s/g, '');
    
    // AND, OR, NOT operations
    const evalAndOr = (e) => {
      // Replace variable names with values
      let evalStr = e;
      for (const [v, val] of Object.entries(vars)) {
        evalStr = evalStr.replace(new RegExp(v, 'g'), val);
      }
      evalStr = evalStr.replace(/·/g, '&&').replace(/\+/g, '||').replace(/'/g, '!');
      try {
        // Safe evaluation for demo
        return Function(`'use strict'; return (${evalStr})`)();
      } catch {
        return 0;
      }
    };

    if (exprClean === 'A·B') return vars.A && vars.B ? 1 : 0;
    if (exprClean === 'A+B') return vars.A || vars.B ? 1 : 0;
    if (exprClean === 'A⊕B') return (vars.A !== vars.B) ? 1 : 0;
    if (exprClean === 'A·B+A·C') return (vars.A && vars.B) || (vars.A && vars.C) ? 1 : 0;
    if (exprClean === 'A·B+B·C+A·C') {
      let count = 0;
      if (vars.A) count++;
      if (vars.B) count++;
      if (vars.C) count++;
      return count >= 2 ? 1 : 0;
    }
    if (exprClean === 'A⊕B⊕C') {
      let count = 0;
      if (vars.A) count++;
      if (vars.B) count++;
      if (vars.C) count++;
      return count % 2 === 1 ? 1 : 0;
    }
    if (exprClean === 'A·B·C') return vars.A && vars.B && vars.C ? 1 : 0;
    if (exprClean === 'A+B+C') return vars.A || vars.B || vars.C ? 1 : 0;
    if (exprClean === '(A+B)\'') return !(vars.A || vars.B) ? 1 : 0;
    if (exprClean === '(A·B)\'') return !(vars.A && vars.B) ? 1 : 0;
    
    return evalAndOr(exprClean);
  };

  // Generate truth table
  const generateTruthTable = () => {
    const rows = [];
    const n = numVariables;
    const total = Math.pow(2, n);
    
    for (let i = 0; i < total; i++) {
      const values = [];
      for (let j = n - 1; j >= 0; j--) {
        values.push((i >> j) & 1);
      }
      const output = evaluateExpression(expression, values);
      rows.push({
        inputs: values,
        output,
        minterm: i,
        binary: values.join('')
      });
    }
    return rows;
  };

  const truthTable = generateTruthTable();

  // Build truth table from custom expression
  const buildCustomTruthTable = () => {
    const expr = customExpr;
    const rows = [];
    const n = numVariables;
    const total = Math.pow(2, n);
    
    for (let i = 0; i < total; i++) {
      const values = [];
      for (let j = n - 1; j >= 0; j--) {
        values.push((i >> j) & 1);
      }
      const output = evaluateExpression(expr, values);
      rows.push({
        inputs: values,
        output,
        binary: values.join('')
      });
    }
    setBuildResult(rows);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-teal-100 dark:bg-teal-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-teal-600 dark:text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Truth Tables:</span>
          <span className="block text-teal-600 dark:text-teal-400">Construction from Expressions</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Systematic method to compute truth tables from Boolean expressions
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction to Truth Table Construction */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📋</span> What is a Truth Table?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            A <strong className="text-teal-600 dark:text-teal-400">truth table</strong> is a systematic representation of a Boolean function that shows the output for every possible combination of inputs. For <strong className="text-teal-600">n inputs</strong>, there are <strong className="text-teal-600">2ⁿ rows</strong> in the truth table.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold">Complete</p>
              <p className="text-xs">Lists ALL input combinations</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold">Unambiguous</p>
              <p className="text-xs">One output per combination</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold">Verifiable</p>
              <p className="text-xs">Test any expression against it</p>
            </div>
          </div>
          <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Key Insight:</span> Truth tables provide a complete, unambiguous definition of a Boolean function. They are the gold standard for verifying logic circuit behavior.
            </p>
          </div>
        </div>

        {/* Step-by-Step Construction Method */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📐</span> Step-by-Step Construction Method
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-teal-600 dark:text-teal-400 mb-3">5-Step Process:</h3>
              <ol className="list-decimal pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Count the inputs</strong> — Determine number of variables (n)</li>
                <li><strong>Create input columns</strong> — List all 2ⁿ combinations in binary order</li>
                <li><strong>Add intermediate columns</strong> — For complex expressions, compute sub-expressions</li>
                <li><strong>Compute final output</strong> — Use Boolean operation rules</li>
                <li><strong>Verify completeness</strong> — Ensure all 2ⁿ rows are present</li>
              </ol>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📝 Example: F = A·B + C</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg text-sm">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-600">
                      <th className="px-2 py-1">A</th><th className="px-2 py-1">B</th><th className="px-2 py-1">C</th>
                      <th className="px-2 py-1">A·B</th><th className="px-2 py-1">F = A·B + C</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [0,0,0,0,0], [0,0,1,0,1], [0,1,0,0,0], [0,1,1,0,1],
                      [1,0,0,0,0], [1,0,1,0,1], [1,1,0,1,1], [1,1,1,1,1]
                    ].map((row, idx) => (
                      <tr key={idx} className="border-t border-gray-200">
                        {row.map((val, i) => (
                          <td key={i} className="px-2 py-1 text-center font-mono">{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-2">Note the intermediate column A·B helps organize computation</p>
            </div>
          </div>
        </div>

        {/* Interactive Truth Table Builder */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🎮</span> Interactive Truth Table Builder
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Select number of variables and expression to see its truth table.
          </p>
          
          {/* Variable Selector */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setNumVariables(2)}
              className={clsx("px-4 py-2 rounded-lg font-medium transition-all", numVariables === 2 ? "bg-teal-500 text-white" : "bg-gray-200 dark:bg-gray-700")}
            >2 Variables</button>
            <button
              onClick={() => setNumVariables(3)}
              className={clsx("px-4 py-2 rounded-lg font-medium transition-all", numVariables === 3 ? "bg-teal-500 text-white" : "bg-gray-200 dark:bg-gray-700")}
            >3 Variables</button>
            <button
              onClick={() => setNumVariables(4)}
              className={clsx("px-4 py-2 rounded-lg font-medium transition-all", numVariables === 4 ? "bg-teal-500 text-white" : "bg-gray-200 dark:bg-gray-700")}
            >4 Variables</button>
          </div>
          
          {/* Expression Selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(expressions[numVariables] || {}).map(([expr, desc]) => (
              <button
                key={expr}
                onClick={() => setExpression(expr)}
                className={clsx(
                  "px-3 py-1 rounded-lg text-sm transition-all hover:scale-105",
                  expression === expr 
                    ? "bg-teal-500 text-white" 
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300"
                )}
                title={desc}
              >
                {expr}
              </button>
            ))}
          </div>
          
          {/* Current Expression Display */}
          <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Expression:</p>
            <p className="font-mono text-lg font-bold text-teal-600 dark:text-teal-400">{expression}</p>
          </div>
          
          {/* Truth Table Display */}
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-600">
                  {varNames.map(v => (
                    <th key={v} className="px-3 py-2 text-center font-mono">{v}</th>
                  ))}
                  <th className="px-3 py-2 text-center font-mono">F</th>
                  <th className="px-3 py-2 text-center">Minterm</th>
                 </tr>
              </thead>
              <tbody>
                {truthTable.map((row, idx) => (
                  <tr key={idx} className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors">
                    {row.inputs.map((val, i) => (
                      <td key={i} className="px-3 py-2 text-center font-mono">{val}</td>
                    ))}
                    <td className={clsx(
                      "px-3 py-2 text-center font-mono font-bold",
                      row.output === 1 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    )}>
                      {row.output}
                    </td>
                    <td className="px-3 py-2 text-center font-mono">m{row.minterm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <button
            onClick={() => setShowSteps(!showSteps)}
            className="mt-2 w-full py-2 bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 rounded-lg font-medium transition-all duration-300 hover:bg-teal-200 dark:hover:bg-teal-900/60"
          >
            {showSteps ? "Hide" : "Show"} Construction Steps
          </button>
          
          {showSteps && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📝 Construction Steps for {expression}:</h3>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>Number of variables: {numVariables} → {Math.pow(2, numVariables)} rows</li>
                <li>Input columns: {varNames.join(', ')} in binary order (000, 001, ...)</li>
                <li>For each row, evaluate the expression: {expression}</li>
                <li>Compute output using Boolean rules</li>
                <li>Result shown in the F column above</li>
              </ol>
              <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                <p className="text-sm">
                  <span className="font-bold">💡 Tip:</span> For complex expressions, add intermediate columns to organize your work.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Build Your Own Truth Table */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">✏️</span> Build Your Own Truth Table
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Enter your own Boolean expression and see its truth table.
          </p>
          
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={customExpr}
              onChange={(e) => setCustomExpr(e.target.value)}
              placeholder="Enter expression (e.g., A·B + A·C, A⊕B, (A+B)' )"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={buildCustomTruthTable}
              className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-all duration-300 hover:scale-105"
            >
              Build
            </button>
          </div>
          
          {buildResult && (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-600">
                    {varNames.map(v => (
                      <th key={v} className="px-3 py-2 text-center font-mono">{v}</th>
                    ))}
                    <th className="px-3 py-2 text-center font-mono">F</th>
                  </tr>
                </thead>
                <tbody>
                  {buildResult.map((row, idx) => (
                    <tr key={idx} className="border-t border-gray-200 dark:border-gray-600">
                      {row.inputs.map((val, i) => (
                        <td key={i} className="px-3 py-2 text-center font-mono">{val}</td>
                      ))}
                      <td className={clsx(
                        "px-3 py-2 text-center font-mono font-bold",
                        row.output === 1 ? "text-green-600" : "text-red-600"
                      )}>
                        {row.output}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Try these:</span> A·B + A·C, A⊕B⊕C, (A+B)·(A+C), A·B·C + A·B·C'
            </p>
          </div>
        </div>

        {/* Verification Using Truth Tables */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">✅</span> Verification Using Truth Tables
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Truth tables are the ultimate verification tool. To verify if two expressions are equivalent, construct truth tables for both and compare:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-center mb-2">Verify: A·B + A·C = A·(B+C)</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr><th>A</th><th>B</th><th>C</th><th>A·B+A·C</th><th>A·(B+C)</th></tr>
                  </thead>
                  <tbody>
                    {[
                      [0,0,0,0,0], [0,0,1,0,0], [0,1,0,0,0], [0,1,1,0,0],
                      [1,0,0,0,0], [1,0,1,1,1], [1,1,0,1,1], [1,1,1,1,1]
                    ].map((row, idx) => (
                      <tr key={idx} className="border-t">
                        {row.map((val, i) => <td key={i} className="px-1 text-center">{val}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-center mt-2 text-green-600">✓ Columns match → Equivalent!</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-center mb-2">Verify: (A+B)' = A'·B'</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr><th>A</th><th>B</th><th>(A+B)'</th><th>A'·B'</th></tr>
                  </thead>
                  <tbody>
                    {[[0,0,1,1], [0,1,0,0], [1,0,0,0], [1,1,0,0]].map((row, idx) => (
                      <tr key={idx} className="border-t">
                        {row.map((val, i) => <td key={i} className="px-1 text-center">{val}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-center mt-2 text-green-600">✓ De Morgan's Law verified!</p>
            </div>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-teal-50 to-green-50 dark:from-teal-900/20 dark:to-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-teal-500 font-bold">✓</span> <strong>Binary Counting:</strong> List inputs in binary order (0 to 2ⁿ-1) to ensure no combinations are missed.</li>
            <li className="flex items-start gap-2"><span className="text-teal-500 font-bold">✓</span> <strong>Use Intermediate Columns:</strong> For complex expressions, add columns for sub-expressions to reduce errors.</li>
            <li className="flex items-start gap-2"><span className="text-teal-500 font-bold">✓</span> <strong>Check Edge Cases:</strong> Always test the all-0s and all-1s cases first—they're easy to verify.</li>
            <li className="flex items-start gap-2"><span className="text-teal-500 font-bold">✓</span> <strong>Verification Shortcut:</strong> If two expressions have the same truth table, they are logically equivalent.</li>
            <li className="flex items-start gap-2"><span className="text-teal-500 font-bold">✓</span> <strong>Use Software Tools:</strong> For large expressions, use logic simulators to generate truth tables automatically.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Missing Rows:</strong> For n inputs, there must be exactly 2ⁿ rows. Counting errors are common!</li>
            <li><strong>Incorrect Binary Order:</strong> Always list inputs in consistent binary order (000, 001, 010, ...).</li>
            <li><strong>Operator Precedence Errors:</strong> NOT has highest precedence, then AND, then OR. Use parentheses!</li>
            <li><strong>Forgetting Intermediate Columns:</strong> Jumping directly to final output increases error risk.</li>
            <li><strong>Misreading Expression:</strong> A+B·C means A OR (B AND C), not (A OR B) AND C.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Use Headers:</strong> Clearly label all columns (inputs, intermediate, output).</li>
            <li><strong>Systematic Input Order:</strong> List inputs in binary order to ensure completeness.</li>
            <li><strong>Add Intermediate Columns:</strong> Break complex expressions into manageable parts.</li>
            <li><strong>Verify Row Count:</strong> Always count rows to ensure you have 2ⁿ rows.</li>
            <li><strong>Double-Check Edge Cases:</strong> Test all-0s and all-1s inputs for sanity.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-teal-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Determine the number of rows needed for n inputs (2ⁿ).</li>
            <li>List all input combinations in binary order.</li>
            <li>Add intermediate columns for complex expressions.</li>
            <li>Evaluate Boolean expressions correctly using operator precedence.</li>
            <li>Construct complete truth tables from given expressions.</li>
            <li>Verify expression equivalence using truth tables.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Swadeep from Barrackpore has an expression: <span className="font-mono">F = A·B + A'·C + B·C</span>
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">Create a truth table for this expression. What pattern do you observe?</strong>
            <br />
            Hint: Add intermediate columns for A·B, A'·C, and B·C before computing the final output.
            <br />
            Compare with the truth table for <span className="font-mono">G = A·B + A'·C</span>. What do you notice?
            <br /><br />
            <strong>Observe carefully:</strong> This demonstrates the Consensus Theorem—the term B·C is redundant!
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "Truth tables are the most fundamental tool in digital logic. Students must master constructing them systematically.\n\n" +
            "💡 **Teaching Strategy:** Start with 2-input gates, then move to 3-input expressions. Emphasize adding intermediate columns for complex expressions.\n\n" +
            "🔍 **Common Misunderstanding:** Students often forget to include all input combinations. Drill the 2ⁿ rule.\n\n" +
            "📌 **Real-World Connection:** Truth tables are used in specification documents, test vector generation, and verification.\n\n" +
            "🎯 **Advanced Insight:** Truth tables form the basis for functional verification in hardware design."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q1: How many rows are in a truth table for n variables?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: 2ⁿ rows, one for each possible input combination.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q2: What order should inputs be listed in?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Binary order from 0 to 2ⁿ-1 (e.g., 000, 001, 010, 011, ...).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q3: Why add intermediate columns?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: They organize work, reduce errors, and make the truth table easier to understand.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q4: Construct truth table for F = A·B + C (3 variables).</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: 8 rows. Output is 1 when (A=1 AND B=1) OR (C=1).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q5: What is operator precedence in Boolean expressions?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: NOT (') highest, then AND (·), then OR (+). Use parentheses to override.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q6: How do you verify two expressions are equivalent?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Construct truth tables for both. If they match for all inputs, they're equivalent.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q7: Construct truth table for F = A⊕B (XOR).</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: 00→0, 01→1, 10→1, 11→0.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q8: What is a minterm in a truth table?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A minterm is a row where the output is 1. Each minterm corresponds to a product term.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q9: What is a maxterm in a truth table?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A maxterm is a row where the output is 0. Each maxterm corresponds to a sum term.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q10: Construct truth table for majority function of 3 variables.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Output is 1 when at least two inputs are 1: rows 011, 101, 110, 111.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q11: How do you handle parentheses in truth table construction?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Evaluate expressions inside parentheses first, then apply operators in precedence order.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q12: What is the truth table for A·B·C?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Only 1 when A=1, B=1, C=1 (row 111). All other rows are 0.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q13: What is the truth table for A+B+C?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Only 0 when A=0, B=0, C=0 (row 000). All other rows are 1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q14: How do you verify De Morgan's Law using truth tables?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Show (A·B)' and A'+B' have identical truth tables.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q15: Construct truth table for F = (A+B)·(A+C).</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: This simplifies to A + B·C. Verify by constructing both truth tables.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q16: What is the purpose of intermediate columns?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: They break complex expressions into manageable steps, reducing errors and showing the computation path.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q17: Construct truth table for F = (A·B' + A'·B) + C.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: First compute A·B' + A'·B (XOR), then OR with C. Output is 1 when XOR=1 or C=1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q18: How many rows for a 4-variable truth table?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: 2⁴ = 16 rows.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q19: Can two different expressions have the same truth table?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! That means they are logically equivalent (e.g., A·B + A·C and A·(B+C)).</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold">Q20: What is the first step in constructing a truth table?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Identify the number of input variables (n) and determine that you need 2ⁿ rows.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic24;