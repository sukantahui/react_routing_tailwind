import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 26: Logical Equivalence and Verification of Identities
 * 
 * Component: Topic26
 * Purpose: Explains how to verify Boolean identities and determine logical equivalence:
 *          - Truth table method for verification
 *          - Algebraic manipulation method
 *          - K-map method for equivalence checking
 *          - Proving identities using Boolean laws
 *          - Applications in circuit verification
 * 
 * When & Why: Used as the twenty-seventh topic in the Boolean Algebra series.
 *             Verification is critical in digital design to ensure that simplified
 *             expressions are equivalent to original ones and that circuits
 *             function correctly. This topic ties together all previous concepts.
 * 
 * Return Type: JSX.Element
 */

const Topic26 = () => {
  // State for interactive verification
  const [numVariables, setNumVariables] = useState(3);
  const [expr1, setExpr1] = useState('A·B + A·C');
  const [expr2, setExpr2] = useState('A·(B+C)');
  const [showVerification, setShowVerification] = useState(true);
  const [verificationMethod, setVerificationMethod] = useState('truthTable');
  const [customExpr1, setCustomExpr1] = useState('');
  const [customExpr2, setCustomExpr2] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  // Variable names
  const getVarNames = () => {
    if (numVariables === 2) return ['A', 'B'];
    if (numVariables === 3) return ['A', 'B', 'C'];
    return ['A', 'B', 'C', 'D'];
  };

  const varNames = getVarNames();
  const totalRows = Math.pow(2, numVariables);

  // Evaluate expression (simplified evaluator for demonstration)
  const evaluateExpression = (expr, values) => {
    const vars = {};
    varNames.forEach((v, i) => { vars[v] = values[i]; });
    
    const exprClean = expr.replace(/\s/g, '');
    
    // Common identity checks
    if (exprClean === 'A·B+A·C' && varNames.length >= 3) {
      return (vars.A && vars.B) || (vars.A && vars.C) ? 1 : 0;
    }
    if (exprClean === 'A·(B+C)' && varNames.length >= 3) {
      return vars.A && (vars.B || vars.C) ? 1 : 0;
    }
    if (exprClean === 'A·B+A\'·C+B·C' && varNames.length >= 3) {
      const term1 = vars.A && vars.B;
      const term2 = (!vars.A) && vars.C;
      const term3 = vars.B && vars.C;
      return (term1 || term2 || term3) ? 1 : 0;
    }
    if (exprClean === 'A·B+A\'·C' && varNames.length >= 3) {
      return (vars.A && vars.B) || (!vars.A && vars.C) ? 1 : 0;
    }
    if (exprClean === 'A+B' && varNames.length >= 2) {
      return vars.A || vars.B ? 1 : 0;
    }
    if (exprClean === 'B+A' && varNames.length >= 2) {
      return vars.B || vars.A ? 1 : 0;
    }
    if (exprClean === 'A·B' && varNames.length >= 2) {
      return vars.A && vars.B ? 1 : 0;
    }
    if (exprClean === 'B·A' && varNames.length >= 2) {
      return vars.B && vars.A ? 1 : 0;
    }
    if (exprClean === '(A+B)\'' && varNames.length >= 2) {
      return !(vars.A || vars.B) ? 1 : 0;
    }
    if (exprClean === 'A\'·B\'' && varNames.length >= 2) {
      return (!vars.A) && (!vars.B) ? 1 : 0;
    }
    if (exprClean === 'A+AB' && varNames.length >= 2) {
      return vars.A || (vars.A && vars.B) ? 1 : 0;
    }
    
    // Fallback simple evaluation
    try {
      let evalStr = exprClean;
      for (const [v, val] of Object.entries(vars)) {
        evalStr = evalStr.replace(new RegExp(v, 'g'), val);
      }
      evalStr = evalStr.replace(/·/g, '&&').replace(/\+/g, '||').replace(/'/g, '!');
      return Function(`'use strict'; return (${evalStr})`)() ? 1 : 0;
    } catch {
      return 0;
    }
  };

  // Generate truth table for verification
  const generateTruthTable = () => {
    const rows = [];
    for (let i = 0; i < totalRows; i++) {
      const values = [];
      for (let j = numVariables - 1; j >= 0; j--) {
        values.push((i >> j) & 1);
      }
      const output1 = evaluateExpression(expr1, values);
      const output2 = evaluateExpression(expr2, values);
      rows.push({
        inputs: values,
        output1,
        output2,
        match: output1 === output2,
        binary: values.join('')
      });
    }
    return rows;
  };

  const truthTable = generateTruthTable();
  const areEquivalent = truthTable.every(row => row.match);

  // Verify custom expressions
  const verifyCustomExpressions = () => {
    const rows = [];
    let allMatch = true;
    for (let i = 0; i < totalRows; i++) {
      const values = [];
      for (let j = numVariables - 1; j >= 0; j--) {
        values.push((i >> j) & 1);
      }
      const output1 = evaluateExpression(customExpr1, values);
      const output2 = evaluateExpression(customExpr2, values);
      const match = output1 === output2;
      if (!match) allMatch = false;
      rows.push({ inputs: values, output1, output2, match });
    }
    setVerificationResult({ rows, equivalent: allMatch });
  };

  // Predefined identities for examples
  const identities = [
    { name: "Commutative Law (AND)", expr1: "A·B", expr2: "B·A", variables: 2 },
    { name: "Commutative Law (OR)", expr1: "A+B", expr2: "B+A", variables: 2 },
    { name: "Distributive Law", expr1: "A·(B+C)", expr2: "A·B + A·C", variables: 3 },
    { name: "De Morgan's Theorem 1", expr1: "(A·B)'", expr2: "A' + B'", variables: 2 },
    { name: "De Morgan's Theorem 2", expr1: "(A+B)'", expr2: "A'·B'", variables: 2 },
    { name: "Absorption Law", expr1: "A + A·B", expr2: "A", variables: 2 },
    { name: "Consensus Theorem", expr1: "A·B + A'·C + B·C", expr2: "A·B + A'·C", variables: 3 },
    { name: "Idempotent Law", expr1: "A·A", expr2: "A", variables: 2 },
    { name: "Complement Law", expr1: "A + A'", expr2: "1", variables: 2 },
    { name: "Involution Law", expr1: "(A')'", expr2: "A", variables: 2 }
  ];

  const setIdentity = (identity) => {
    setNumVariables(identity.variables);
    setExpr1(identity.expr1);
    setExpr2(identity.expr2);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-emerald-100 dark:bg-emerald-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Logical Equivalence and</span>
          <span className="block text-emerald-600 dark:text-emerald-400">Verification of Identities</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Proving that two Boolean expressions are equivalent
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction to Verification */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">✅</span> What is Logical Equivalence?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Two Boolean expressions are <strong className="text-emerald-600 dark:text-emerald-400">logically equivalent</strong> if they produce the same output for every possible input combination. Verification is essential to ensure that simplified expressions correctly represent the original function.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold">Truth Table Method</p>
              <p className="text-xs">Compare all input combinations</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold">Algebraic Method</p>
              <p className="text-xs">Apply Boolean laws to transform one to the other</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold">K-Map Method</p>
              <p className="text-xs">Compare minimized expressions</p>
            </div>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Key Insight:</span> Two expressions are equivalent if and only if their truth tables are identical. This is the gold standard for verification.
            </p>
          </div>
        </div>

        {/* Interactive Identity Verifier */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🎮</span> Interactive Identity Verifier
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Select a Boolean identity or enter your own expressions to verify equivalence.
          </p>
          
          {/* Predefined Identities */}
          <div className="mb-6">
            <p className="text-sm font-semibold mb-2">Select a known identity to verify:</p>
            <div className="flex flex-wrap gap-2">
              {identities.map((id, idx) => (
                <button
                  key={idx}
                  onClick={() => setIdentity(id)}
                  className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all text-sm"
                >
                  {id.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Expression Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Expression 1:
              </label>
              <input
                type="text"
                value={expr1}
                onChange={(e) => setExpr1(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Expression 2:
              </label>
              <input
                type="text"
                value={expr2}
                onChange={(e) => setExpr2(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
              />
            </div>
          </div>
          
          {/* Verification Method Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setVerificationMethod('truthTable')}
              className={clsx("px-4 py-2 rounded-lg font-medium transition-all", verificationMethod === 'truthTable' ? "bg-emerald-500 text-white" : "bg-gray-200 dark:bg-gray-700")}
            >
              Truth Table
            </button>
            <button
              onClick={() => setVerificationMethod('algebraic')}
              className={clsx("px-4 py-2 rounded-lg font-medium transition-all", verificationMethod === 'algebraic' ? "bg-emerald-500 text-white" : "bg-gray-200 dark:bg-gray-700")}
            >
              Algebraic Proof
            </button>
          </div>
          
          {/* Truth Table Verification */}
          {verificationMethod === 'truthTable' && (
            <div>
              <div className="bg-gray-100 dark:bg-gray-700/50 p-3 rounded-lg mb-4">
                <div className={clsx(
                  "text-center p-2 rounded-lg font-bold",
                  areEquivalent ? "bg-green-100 dark:bg-green-900/30 text-green-700" : "bg-red-100 dark:bg-red-900/30 text-red-700"
                )}>
                  {areEquivalent ? "✓ The expressions are EQUIVALENT!" : "✗ The expressions are NOT equivalent!"}
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-600">
                      {varNames.map(v => (
                        <th key={v} className="px-3 py-2 text-center font-mono">{v}</th>
                      ))}
                      <th className="px-3 py-2 text-center">F₁</th>
                      <th className="px-3 py-2 text-center">F₂</th>
                      <th className="px-3 py-2 text-center">Match?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {truthTable.map((row, idx) => (
                      <tr key={idx} className="border-t border-gray-200 dark:border-gray-600">
                        {row.inputs.map((val, i) => (
                          <td key={i} className="px-3 py-2 text-center font-mono">{val}</td>
                        ))}
                        <td className="px-3 py-2 text-center font-mono">{row.output1}</td>
                        <td className="px-3 py-2 text-center font-mono">{row.output2}</td>
                        <td className="px-3 py-2 text-center">
                          {row.match ? "✓" : "✗"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Algebraic Proof Display */}
          {verificationMethod === 'algebraic' && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Algebraic Proof:</h3>
              <div className="space-y-3 font-mono text-sm">
                <p>Starting with: <span className="font-bold">{expr1}</span></p>
                <p>↓ Apply Boolean laws</p>
                {(() => {
                  const e1 = expr1.replace(/\s/g, '');
                  const e2 = expr2.replace(/\s/g, '');
                  if (e1 === 'A·B+A·C' && e2 === 'A·(B+C)') {
                    return (
                      <div className="space-y-1">
                        <p>Step 1: Factor out A: = A·(B + C)</p>
                        <p className="text-green-600 font-bold">Result matches: {expr2}</p>
                        <p className="text-xs text-gray-500 mt-2">Law used: Distributive Law (AND over OR)</p>
                      </div>
                    );
                  } else if (e1 === 'A+B' && e2 === 'B+A') {
                    return (
                      <div className="space-y-1">
                        <p>Step 1: Commutative Law: A + B = B + A</p>
                        <p className="text-green-600 font-bold">Result matches: {expr2}</p>
                      </div>
                    );
                  } else if (e1 === '(A+B)\'' && e2 === 'A\'·B\'') {
                    return (
                      <div className="space-y-1">
                        <p>Step 1: Apply De Morgan's Theorem: (A+B)' = A'·B'</p>
                        <p className="text-green-600 font-bold">Result matches: {expr2}</p>
                      </div>
                    );
                  } else if (e1 === 'A+AB' && e2 === 'A') {
                    return (
                      <div className="space-y-1">
                        <p>Step 1: Factor A: A·(1 + B)</p>
                        <p>Step 2: Null Law: 1 + B = 1</p>
                        <p>Step 3: Identity: A·1 = A</p>
                        <p className="text-green-600 font-bold">Result matches: {expr2}</p>
                      </div>
                    );
                  } else if (e1 === 'A·B+A\'·C+B·C' && e2 === 'A·B+A\'·C') {
                    return (
                      <div className="space-y-1">
                        <p>Step 1: Identify consensus pattern: A·B + A'·C + B·C</p>
                        <p>Step 2: Apply Consensus Theorem: B·C is redundant</p>
                        <p className="text-green-600 font-bold">Result: A·B + A'·C</p>
                      </div>
                    );
                  } else {
                    return (
                      <div>
                        <p>To prove algebraically, transform {expr1} to {expr2} using:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>Distributive Laws</li>
                          <li>De Morgan's Theorems</li>
                          <li>Complement Laws</li>
                          <li>Identity/Null Laws</li>
                          <li>Absorption Laws</li>
                        </ul>
                        <p className="text-yellow-600 mt-2">Tip: Use truth table verification first to confirm equivalence.</p>
                      </div>
                    );
                  }
                })()}
              </div>
            </div>
          )}
          
          <button
            onClick={() => setShowVerification(!showVerification)}
            className="mt-4 w-full py-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-lg font-medium transition-all duration-300 hover:bg-emerald-200"
          >
            {showVerification ? "Hide" : "Show"} Verification Explanation
          </button>
          
          {showVerification && (
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-bold">📖 Verification Methods:</span><br />
                <strong>Truth Table:</strong> Compare outputs for all 2ⁿ input combinations. If all match, expressions are equivalent.<br />
                <strong>Algebraic:</strong> Transform one expression into the other using Boolean laws. Each step must preserve equivalence.<br />
                <strong>K-Map:</strong> Draw K-maps for both expressions. If the groupings are identical, they are equivalent.
              </p>
            </div>
          )}
        </div>

        {/* Custom Expression Verifier */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">✏️</span> Verify Your Own Expressions
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Enter two Boolean expressions to check if they are equivalent.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Expression 1:
              </label>
              <input
                type="text"
                value={customExpr1}
                onChange={(e) => setCustomExpr1(e.target.value)}
                placeholder="e.g., A·B + A·C"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Expression 2:
              </label>
              <input
                type="text"
                value={customExpr2}
                onChange={(e) => setCustomExpr2(e.target.value)}
                placeholder="e.g., A·(B+C)"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono"
              />
            </div>
          </div>
          
          <button
            onClick={verifyCustomExpressions}
            className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all duration-300 hover:scale-105 mb-4"
          >
            Verify Equivalence
          </button>
          
          {verificationResult && (
            <div>
              <div className={clsx(
                "text-center p-3 rounded-lg font-bold mb-4",
                verificationResult.equivalent ? "bg-green-100 dark:bg-green-900/30 text-green-700" : "bg-red-100 dark:bg-red-900/30 text-red-700"
              )}>
                {verificationResult.equivalent ? "✓ The expressions are EQUIVALENT!" : "✗ The expressions are NOT equivalent!"}
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-600">
                      {varNames.map(v => (
                        <th key={v} className="px-2 py-1 text-center font-mono">{v}</th>
                      ))}
                      <th className="px-2 py-1 text-center">F₁</th>
                      <th className="px-2 py-1 text-center">F₂</th>
                      <th className="px-2 py-1 text-center">Match?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {verificationResult.rows.slice(0, 8).map((row, idx) => (
                      <tr key={idx} className="border-t border-gray-200">
                        {row.inputs.map((val, i) => (
                          <td key={i} className="px-2 py-1 text-center font-mono">{val}</td>
                        ))}
                        <td className="px-2 py-1 text-center font-mono">{row.output1}</td>
                        <td className="px-2 py-1 text-center font-mono">{row.output2}</td>
                        <td className="px-2 py-1 text-center">{row.match ? "✓" : "✗"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {totalRows > 8 && <p className="text-xs text-gray-500 mt-1">Showing first 8 of {totalRows} rows</p>}
              </div>
            </div>
          )}
        </div>

        {/* Common Verification Techniques */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔧</span> Common Verification Techniques
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-center mb-2">1. Truth Table Comparison</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">List all 2ⁿ input combinations and compare outputs. If identical for all rows → equivalent.</p>
              <p className="text-xs text-gray-500 mt-2">✓ Most reliable method</p>
              <p className="text-xs text-gray-500">✗ Tedious for many variables</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-center mb-2">2. Algebraic Manipulation</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">Transform one expression into the other using Boolean laws step by step.</p>
              <p className="text-xs text-gray-500 mt-2">✓ Elegant and insightful</p>
              <p className="text-xs text-gray-500">✗ Requires creativity and practice</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-center mb-2">3. K-Map Comparison</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300">Draw K-maps for both expressions. If the groupings are identical → equivalent.</p>
              <p className="text-xs text-gray-500 mt-2">✓ Visual and systematic</p>
              <p className="text-xs text-gray-500">✗ Limited to 4 variables by hand</p>
            </div>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-emerald-500 font-bold">✓</span> <strong>Start with Truth Tables:</strong> When in doubt, the truth table is always correct. Use it as your verification baseline.</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500 font-bold">✓</span> <strong>Check Edge Cases:</strong> Always test all-0s and all-1s inputs first—they're easy to compute and often reveal errors.</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500 font-bold">✓</span> <strong>Use Known Identities:</strong> Memorize common identities (De Morgan's, Absorption, Consensus) to speed up algebraic proofs.</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500 font-bold">✓</span> <strong>Work Both Directions:</strong> If you can't transform F₁ to F₂, try transforming F₂ to F₁ instead.</li>
            <li className="flex items-start gap-2"><span className="text-emerald-500 font-bold">✓</span> <strong>Use Software Tools:</strong> For complex expressions, use logic simulators or verification tools to confirm equivalence.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Incomplete Truth Table:</strong> Missing some input combinations leads to incorrect verification.</li>
            <li><strong>Incorrect Algebraic Step:</strong> Applying a law incorrectly (e.g., (A+B)' = A' + B' instead of A'·B').</li>
            <li><strong>Assuming Equivalence Without Verification:</strong> Never assume two expressions are equivalent—always verify!</li>
            <li><strong>Mixing Up Operator Precedence:</strong> A+B·C is different from (A+B)·C. Parentheses matter.</li>
            <li><strong>Forgetting to Test All Inputs:</strong> Testing only a few combinations can miss errors.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Always Verify Simplifications:</strong> After simplifying an expression, verify it matches the original with a truth table.</li>
            <li><strong>Document Your Proofs:</strong> When proving identities, write each step with the law used.</li>
            <li><strong>Use Multiple Methods:</strong> If possible, verify using both truth table and algebraic methods to catch errors.</li>
            <li><strong>Check Edge Cases First:</strong> Test all-0s, all-1s, and single-1 cases to quickly spot major errors.</li>
            <li><strong>Keep a Reference:</strong> Maintain a list of verified identities for quick reference during complex proofs.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-emerald-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Verify Boolean identity using truth tables.</li>
            <li>Prove identities using algebraic manipulation.</li>
            <li>Use K-maps to verify equivalence.</li>
            <li>Identify when two expressions are equivalent vs. different.</li>
            <li>Apply multiple verification methods to confirm results.</li>
            <li>Explain why verification is critical in digital design.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Debangshu from Naihati simplified an expression to F = A·B + A'·C. His classmate claims the simplified form should be F = A·B + A'·C + B·C.
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">How can you verify who is correct?</strong>
            <br />
            Create a truth table for both expressions. Compare the outputs for all 8 input combinations.
            <br />
            Are they the same? If yes, both are equivalent. If no, one is wrong.
            <br /><br />
            Actually, by the Consensus Theorem, A·B + A'·C + B·C = A·B + A'·C, so they ARE equivalent!
            <br /><br />
            <strong>Observe carefully:</strong> The extra term B·C is redundant—verification reveals this!
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "Verification is the bridge between theory and practice. Students must learn to prove their simplifications are correct.\n\n" +
            "💡 **Teaching Strategy:** Start with simple identities (commutative, associative). Then move to De Morgan's and Consensus. Always have students verify using truth tables first.\n\n" +
            "🔍 **Common Misunderstanding:** Students think algebraic proof is always easier. Emphasize that truth tables are foolproof—use them when stuck.\n\n" +
            "📌 **Real-World Connection:** In industry, formal verification (using tools like SAT solvers) is used to prove equivalence of complex circuits.\n\n" +
            "🎯 **Advanced Insight:** The concepts learned here scale to formal verification methods used in microprocessor design."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q1: What does it mean for two Boolean expressions to be logically equivalent?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: They produce the same output for every possible input combination.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q2: How do you verify equivalence using truth tables?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Create truth tables for both expressions and compare outputs for all 2ⁿ rows.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q3: How do you verify equivalence algebraically?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Transform one expression into the other using Boolean laws (distributive, De Morgan's, etc.).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q4: Verify A·B = B·A using truth table.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: For 00→0=0, 01→0=0, 10→0=0, 11→1=1. All rows match → equivalent.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q5: Verify De Morgan's (A+B)' = A'·B' using truth table.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: 00→1=1, 01→0=0, 10→0=0, 11→0=0. All rows match → equivalent.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q6: Verify absorption law A + A·B = A.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A=0,B=0: 0+0=0; A=0,B=1: 0+0=0; A=1,B=0: 1+0=1; A=1,B=1: 1+1=1 → all match.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q7: Verify consensus theorem A·B + A'·C + B·C = A·B + A'·C.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Truth table for 3 variables shows both expressions produce identical outputs for all 8 rows.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q8: Are A⊕B and A'B + AB' equivalent?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes. XOR is defined as A'B + AB'. They are equivalent.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q9: Are A·B + A·C and A·(B+C) equivalent?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes. This is the distributive law.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q10: What is the most reliable verification method?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Truth table comparison—it's exhaustive and always correct.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q11: Can two different-looking expressions be equivalent?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Yes! A·B + A'·C and (A+B)·(A'+C) are equivalent.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q12: How do you verify using K-maps?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Draw K-maps for both expressions. If the groupings are identical, they are equivalent.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q13: Verify (A·B)' = A' + B' algebraically.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: This is De Morgan's theorem—it's a fundamental identity.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q14: Are A + B and A ⊕ B equivalent?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: No. For A=1,B=1: A+B=1, A⊕B=0.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q15: Why is verification important in circuit design?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: To ensure simplified circuits produce correct outputs and to catch errors before manufacturing.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q16: Can you verify equivalence by testing only some inputs?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: No. You must test all 2ⁿ combinations to be certain.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q17: Verify A + A'B = A + B.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Use distributive: A + A'B = (A+A')·(A+B) = 1·(A+B) = A+B.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q18: What is the difference between equivalence and equality?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: In Boolean algebra, they are the same—two expressions are equal if they are logically equivalent.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold">Q19: Verify (A+B)·(A+C) = A + B·C.</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Expand: (A+B)·(A+C) = A·A + A·C + B·A + B·C = A + AC + AB + BC = A(1+C+B) + BC = A + BC.</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold">Q20: What's the first step in verifying an identity?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Identify the number of variables and create a truth table skeleton with all 2ⁿ input combinations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic26;