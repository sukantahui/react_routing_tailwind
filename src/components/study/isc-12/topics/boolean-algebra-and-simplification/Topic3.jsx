import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 3: Truth tables for basic operations
 * 
 * Component: Topic3
 * Purpose: Explains truth tables as a systematic way to represent Boolean functions:
 *          - Definition and purpose of truth tables
 *          - Truth tables for AND, OR, NOT operations
 *          - How to construct and interpret truth tables
 *          - Relationship between truth tables and Boolean expressions
 * 
 * When & Why: Used as the fourth topic in the Boolean Algebra series. Truth tables are
 *             the universal language of digital logic. They provide an unambiguous
 *             way to define, verify, and debug Boolean functions. Every digital
 *             designer must master truth tables.
 * 
 * Return Type: JSX.Element
 */

const Topic3 = () => {
  // State for interactive truth table builder
  const [selectedOperation, setSelectedOperation] = useState('AND');
  const [customInputA, setCustomInputA] = useState(0);
  const [customInputB, setCustomInputB] = useState(0);
  
  // Custom truth table for selected operation
  const getTruthTable = (op) => {
    const tables = {
      AND: [
        { a: 0, b: 0, result: 0 },
        { a: 0, b: 1, result: 0 },
        { a: 1, b: 0, result: 0 },
        { a: 1, b: 1, result: 1 }
      ],
      OR: [
        { a: 0, b: 0, result: 0 },
        { a: 0, b: 1, result: 1 },
        { a: 1, b: 0, result: 1 },
        { a: 1, b: 1, result: 1 }
      ],
      NAND: [
        { a: 0, b: 0, result: 1 },
        { a: 0, b: 1, result: 1 },
        { a: 1, b: 0, result: 1 },
        { a: 1, b: 1, result: 0 }
      ],
      NOR: [
        { a: 0, b: 0, result: 1 },
        { a: 0, b: 1, result: 0 },
        { a: 1, b: 0, result: 0 },
        { a: 1, b: 1, result: 0 }
      ],
      XOR: [
        { a: 0, b: 0, result: 0 },
        { a: 0, b: 1, result: 1 },
        { a: 1, b: 0, result: 1 },
        { a: 1, b: 1, result: 0 }
      ]
    };
    return tables[op] || tables.AND;
  };

  const currentTruthTable = getTruthTable(selectedOperation);
  
  // Calculate output for custom inputs
  const getCustomOutput = () => {
    const match = currentTruthTable.find(row => row.a === customInputA && row.b === customInputB);
    return match ? match.result : 0;
  };

  const customOutput = getCustomOutput();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-amber-100 dark:bg-amber-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Truth Tables</span>
          <span className="block text-amber-600 dark:text-amber-400">for Basic Operations</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          The complete map of every possible input-output relationship
        </p>
      </div>

      <div className="space-y-8">
        {/* What is a Truth Table? */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📋</span> What is a Truth Table?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            A <strong className="text-amber-600 dark:text-amber-400">truth table</strong> is a mathematical table that shows all possible input combinations and their corresponding outputs for a Boolean function. It provides a complete, unambiguous definition of how a logic circuit behaves.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <p className="font-semibold text-sm">📊 Complete</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Lists EVERY possible input combination</p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
              <p className="font-semibold text-sm">✅ Unambiguous</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">One output for each input combination</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
              <p className="font-semibold text-sm">🔍 Verifiable</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">Can test any expression against the table</p>
            </div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Key Insight:</span> A truth table is like a "cheat sheet" for a logic gate. If you know the inputs, you can instantly look up the output. For <strong>n inputs</strong>, there are <strong>2ⁿ</strong> rows in the truth table.
            </p>
          </div>
        </div>

        {/* Truth Table for Basic Gates - Interactive */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🎮</span> Interactive Truth Table Explorer
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Select a logic operation to see its complete truth table. Observe how the output changes with different input combinations.
          </p>
          
          {/* Operation Selector */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['AND', 'OR', 'NAND', 'NOR', 'XOR'].map((op) => (
              <button
                key={op}
                onClick={() => setSelectedOperation(op)}
                className={clsx(
                  "px-4 py-2 rounded-lg font-mono font-semibold transition-all duration-300 hover:scale-105",
                  selectedOperation === op
                    ? "bg-amber-500 text-white shadow-md"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                )}
              >
                {op}
              </button>
            ))}
          </div>

          {/* Truth Table Display */}
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-600">
                  <th className="px-6 py-3 text-center font-mono font-bold">A</th>
                  <th className="px-6 py-3 text-center font-mono font-bold">B</th>
                  <th className="px-6 py-3 text-center font-mono font-bold">{selectedOperation}</th>
                </tr>
              </thead>
              <tbody>
                {currentTruthTable.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className={clsx(
                      "border-t border-gray-200 dark:border-gray-600 transition-all duration-200",
                      row.a === customInputA && row.b === customInputB && "bg-amber-100 dark:bg-amber-900/40"
                    )}
                  >
                    <td className="px-6 py-3 text-center font-mono text-lg">{row.a}</td>
                    <td className="px-6 py-3 text-center font-mono text-lg">{row.b}</td>
                    <td className={clsx(
                      "px-6 py-3 text-center font-mono text-lg font-bold",
                      row.result === 1 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    )}>
                      {row.result}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Custom Input Tester */}
          <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-center">🧪 Test Any Input Combination</h3>
            <div className="flex justify-center items-center gap-6 flex-wrap">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Input A</p>
                <button
                  onClick={() => setCustomInputA(customInputA === 0 ? 1 : 0)}
                  className={clsx(
                    "w-16 h-16 rounded-xl font-mono text-2xl font-bold transition-all duration-300 hover:scale-110",
                    customInputA === 1 
                      ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" 
                      : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                  )}
                >
                  {customInputA}
                </button>
              </div>
              <div className="text-2xl font-bold text-gray-400">{selectedOperation}</div>
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Input B</p>
                <button
                  onClick={() => setCustomInputB(customInputB === 0 ? 1 : 0)}
                  className={clsx(
                    "w-16 h-16 rounded-xl font-mono text-2xl font-bold transition-all duration-300 hover:scale-110",
                    customInputB === 1 
                      ? "bg-green-500 hover:bg-green-600 text-white shadow-lg" 
                      : "bg-red-500 hover:bg-red-600 text-white shadow-lg"
                  )}
                >
                  {customInputB}
                </button>
              </div>
              <div className="text-2xl font-bold text-gray-400">=</div>
              <div className={clsx(
                "w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold transition-all duration-300",
                customOutput === 1 
                  ? "bg-green-500 text-white shadow-lg" 
                  : "bg-red-500 text-white shadow-lg"
              )}>
                {customOutput}
              </div>
            </div>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
              💡 The highlighted row in the truth table above shows this input combination
            </p>
          </div>
        </div>

        {/* NOT Gate Truth Table */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔄</span> NOT Gate (Inverter) Truth Table
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-600">
                      <th className="px-6 py-3 text-center font-mono font-bold">A</th>
                      <th className="px-6 py-3 text-center font-mono font-bold">A' (NOT A)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200 dark:border-gray-600">
                      <td className="px-6 py-3 text-center font-mono text-lg">0</td>
                      <td className="px-6 py-3 text-center font-mono text-lg font-bold text-green-600 dark:text-green-400">1</td>
                    </tr>
                    <tr className="border-t border-gray-200 dark:border-gray-600">
                      <td className="px-6 py-3 text-center font-mono text-lg">1</td>
                      <td className="px-6 py-3 text-center font-mono text-lg font-bold text-red-600 dark:text-red-400">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">📝 Key Observations:</p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• Only <strong>1 input</strong> → 2¹ = <strong>2 rows</strong></li>
                <li>• Output is always the <strong>opposite</strong> of input</li>
                <li>• Also called <strong>complement</strong> or <strong>inversion</strong></li>
                <li>• Two NOT gates in series cancel: A'' = A</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How to Construct a Truth Table */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🔨</span> How to Construct a Truth Table
          </h2>
          
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Step-by-Step Process:</h3>
              <ol className="space-y-3 list-decimal pl-5 text-gray-700 dark:text-gray-300">
                <li><strong>Count the inputs:</strong> If there are n inputs, you'll have 2ⁿ rows.</li>
                <li><strong>List all input combinations:</strong> Start from 0...0 to 1...1 in binary counting order.</li>
                <li><strong>Calculate intermediate outputs:</strong> If the expression has sub-expressions, compute them column by column.</li>
                <li><strong>Compute final output:</strong> Use the basic operation rules (AND, OR, NOT).</li>
                <li><strong>Verify completeness:</strong> Ensure all 2ⁿ combinations are covered.</li>
              </ol>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">📐 Example: Construct truth table for F = A·B + C</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-gray-600">
                      <th className="px-3 py-2 text-center font-mono">A</th>
                      <th className="px-3 py-2 text-center font-mono">B</th>
                      <th className="px-3 py-2 text-center font-mono">C</th>
                      <th className="px-3 py-2 text-center font-mono">A·B</th>
                      <th className="px-3 py-2 text-center font-mono">F = (A·B) + C</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [0,0,0,0,0], [0,0,1,0,1], [0,1,0,0,0], [0,1,1,0,1],
                      [1,0,0,0,0], [1,0,1,0,1], [1,1,0,1,1], [1,1,1,1,1]
                    ].map((row, idx) => (
                      <tr key={idx} className="border-t border-gray-200 dark:border-gray-600">
                        {row.map((val, i) => (
                          <td key={i} className="px-3 py-2 text-center font-mono">{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Note: A·B is computed first (AND has higher precedence), then OR with C
              </p>
            </div>
          </div>
        </div>

        {/* Reading and Interpreting Truth Tables */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📖</span> Reading and Interpreting Truth Tables
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">✅ Minterms (Where Output = 1)</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Rows where output is 1 are called <strong className="text-green-600">minterms</strong>. They tell us when the function is TRUE.</p>
              <div className="bg-white dark:bg-gray-800 p-2 rounded font-mono text-sm">
                For AND: minterm is (A=1, B=1) → represented as AB or A·B
              </div>
            </div>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
              <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">❌ Maxterms (Where Output = 0)</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">Rows where output is 0 are called <strong className="text-red-600">maxterms</strong>. They tell us when the function is FALSE.</p>
              <div className="bg-white dark:bg-gray-800 p-2 rounded font-mono text-sm">
                For OR: maxterm is (A=0, B=0) → represented as A+B
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
            <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">🔍 Pro Tip: Pattern Recognition</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              When reading truth tables, look for patterns:
              • <strong>AND</strong>: Only ONE row has output 1 (all inputs = 1)
              • <strong>OR</strong>: Only ONE row has output 0 (all inputs = 0)
              • <strong>XOR</strong>: Output is 1 when inputs differ
              • <strong>XNOR</strong>: Output is 1 when inputs match
            </p>
          </div>
        </div>

        {/* Truth Tables in the Real World */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">🌍</span> Truth Tables in the Real World
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/30">
              <div className="text-2xl">🏭</div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Digital Circuit Design</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Engineers use truth tables to specify circuit behavior before building them. Every chip's functionality is documented with truth tables.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/30">
              <div className="text-2xl">💻</div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Programming Logic</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">When writing complex conditional statements, developers often create truth tables mentally to ensure all cases are covered.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700/30">
              <div className="text-2xl">🔍</div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Debugging</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">When a circuit doesn't work, engineers test each input combination against the truth table to find where it fails.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300 italic">
              <span className="font-bold">Student Story:</span> Tuhina from Shyamnagar was debugging her digital clock project. She created a truth table for the 7-segment display decoder and found that the "6" was displaying incorrectly. By comparing the actual outputs with the truth table, she quickly identified the faulty connection!
            </p>
          </div>
        </div>

        {/* Professional Tips & Tricks */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>💎</span> Tips & Tricks (Professional Level)
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">✓</span> <strong>Binary Counting:</strong> List input combinations in Gray code order? No! Use standard binary counting (00,01,10,11) to ensure no combinations are missed.</li>
            <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">✓</span> <strong>Column-by-Column:</strong> For complex expressions, add intermediate columns. This makes errors easier to spot and debugging faster.</li>
            <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">✓</span> <strong>Don't Skip Rows:</strong> Even if some input combinations seem "impossible" in your application, still include them. They might become possible due to faults or future changes.</li>
            <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">✓</span> <strong>Use Truth Tables for Verification:</strong> After simplifying an expression, always verify with a truth table. If the truth tables match, you're correct!</li>
            <li className="flex items-start gap-2"><span className="text-amber-500 font-bold">✓</span> <strong>Documentation Standard:</strong> In industry, truth tables are part of design specifications. They're often the first thing new engineers look at to understand a circuit's function.</li>
          </ul>
        </div>

        {/* Common Pitfalls */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>⚠️</span> Common Pitfalls
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Missing Input Combinations:</strong> For 3 inputs, there must be 8 rows. Missing even one row means an incomplete specification.</li>
            <li><strong>Wrong Order of Inputs:</strong> Changing the input order changes the interpretation. Be consistent (e.g., A as MSB, C as LSB).</li>
            <li><strong>Forgetting Intermediate Columns:</strong> Jumping directly to the final output without intermediate steps leads to calculation errors.</li>
            <li><strong>Confusing AND/OR Rules:</strong> Double-check: AND requires ALL 1s; OR requires AT LEAST ONE 1.</li>
            <li><strong>Overlooking NOT Operations:</strong> NOT applies to whatever follows it. In (AB)', NOT applies to the whole product, not just A or B individually.</li>
          </ul>
        </div>

        {/* Best Practices */}
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <span>✅</span> Best Practices
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><strong>Use Headers:</strong> Always label columns clearly. Include intermediate columns for complex expressions.</li>
            <li><strong>Systematic Input Order:</strong> List inputs in binary order (0 to 2ⁿ-1) to ensure completeness.</li>
            <li><strong>Verify Row Count:</strong> For n inputs, ensure you have exactly 2ⁿ rows. Count them before starting calculations.</li>
            <li><strong>Use Consistent Notation:</strong> Stick to one notation throughout (e.g., use ' for NOT, not bar).</li>
            <li><strong>Document Assumptions:</strong> If some input combinations are "don't care" states, document them explicitly.</li>
            <li><strong>Double-Check Edge Cases:</strong> Test the all-0s and all-1s cases first—they're often the easiest to get wrong.</li>
          </ul>
        </div>

        {/* Mini Checklist */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 border-l-8 border-amber-500">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">📋 Mini Checklist</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Before moving to the next topic, ensure you can:</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Define what a truth table is and why it's useful.</li>
            <li>Construct truth tables for AND, OR, NOT, NAND, NOR, and XOR operations.</li>
            <li>Determine the number of rows needed for a given number of inputs (2ⁿ).</li>
            <li>List all input combinations in binary order systematically.</li>
            <li>Compute outputs for Boolean expressions with 2-3 variables.</li>
            <li>Use truth tables to verify Boolean identities.</li>
            <li>Identify minterms and maxterms from a truth table.</li>
          </ul>
        </div>

        {/* Hint Section */}
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-2xl p-6 border border-yellow-300 dark:border-yellow-700">
          <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2 flex items-center gap-2">
            <span>💭</span> Think About...
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Abhronila from Barrackpore is designing a vending machine controller. The machine dispenses a drink if:
            <br /><br />
            - Enough money is inserted (M = 1) AND (Drink is available (D = 1) OR Maintenance mode is OFF (K = 0))
            <br /><br />
            <strong className="text-yellow-800 dark:text-yellow-300">Try creating a truth table for this logic.</strong>
            <br /><br />
            Questions to consider:
            <br />
            1. How many inputs are there? How many rows?
            <br />
            2. What are all possible input combinations?
            <br />
            3. For which combinations does the machine dispense?
            <br />
            4. What happens if Maintenance mode is ON (K=1)?
            <br /><br />
            <strong>Observe carefully:</strong> How does the OR inside the parentheses affect the output compared to a simple AND of all conditions?
          </p>
        </div>

        {/* Teacher's Note */}
        <div>
          <Teacher note={
            "🎓 **Teaching This Topic**\n\n" +
            "Truth tables are the most important verification tool in digital logic. Students often rush through them, but mastering truth tables pays dividends throughout the course.\n\n" +
            "💡 **Teaching Strategy:** Start with 2-input gates, then move to 3-input expressions. Have students physically write out truth tables—muscle memory helps!\n\n" +
            "🔍 **Common Misunderstanding:** Students sometimes think the order of inputs doesn't matter. Emphasize that consistent ordering (A as MSB, B as LSB) is crucial for communication.\n\n" +
            "📌 **Key Connection:** Truth tables are the bridge between English descriptions and Boolean expressions. Show how you can go from 'The light turns on if switch A is on AND switch B is on' to a truth table to an expression.\n\n" +
            "🎯 **Real-World Relevance:** In industry, truth tables are part of design specifications. They're not just homework—they're how engineers communicate circuit behavior."
          } />
        </div>

        {/* Questions and Answers Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">📝 Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q1: What is a truth table?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A truth table is a mathematical table that lists all possible input combinations to a logic circuit and the corresponding output for each combination.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q2: How many rows does a truth table have for n inputs?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: A truth table has 2ⁿ rows, where n is the number of input variables.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q3: What is the truth table for a 2-input AND gate?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: 00→0, 01→0, 10→0, 11→1. Output is 1 only when both inputs are 1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q4: What is the truth table for a 2-input OR gate?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: 00→0, 01→1, 10→1, 11→1. Output is 1 when at least one input is 1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q5: What is the truth table for a NOT gate?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: 0→1, 1→0. Output is the complement of the input.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q6: What is the truth table for a 2-input NAND gate?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: 00→1, 01→1, 10→1, 11→0. NAND is the complement of AND.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q7: What is the truth table for a 2-input NOR gate?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: 00→1, 01→0, 10→0, 11→0. NOR is the complement of OR.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q8: What is the truth table for a 2-input XOR gate?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: 00→0, 01→1, 10→1, 11→0. XOR outputs 1 when inputs differ.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q9: What is the truth table for a 2-input XNOR gate?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: 00→1, 01→0, 10→0, 11→1. XNOR outputs 1 when inputs match.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q10: How do you construct a truth table for a complex expression?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: List all input combinations, then add intermediate columns for sub-expressions, finally compute the final output column.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q11: What are minterms in a truth table?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Minterms are the rows where the output is 1. Each minterm represents a product term that makes the function TRUE.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q12: What are maxterms in a truth table?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Maxterms are the rows where the output is 0. Each maxterm represents a sum term that makes the function FALSE.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q13: Can two different Boolean expressions have the same truth table?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: No. If two expressions have identical truth tables for all inputs, they are logically equivalent. Truth tables uniquely define Boolean functions.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q14: How do you use a truth table to verify a Boolean identity?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Create truth tables for both sides of the identity. If they match for all input combinations, the identity is proven.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q15: What is the importance of the all-zeros input combination?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The all-zeros case is often a critical test. For AND, it's the only way to get 0; for OR, it's the only way to get 0; for NAND, it's the only way to get 1.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q16: What is the importance of the all-ones input combination?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: The all-ones case is also critical. For AND, it's the only way to get 1; for OR, it's one of the ways to get 1; for NOR, it's the only way to get 0.</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q17: How many possible Boolean functions are there with n inputs?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: There are 2^(2ⁿ) possible Boolean functions. For n=2, that's 16 possible functions (AND, OR, NAND, NOR, XOR, XNOR, etc.).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q18: How do you derive a Boolean expression from a truth table?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: For SOP form, OR together all minterms (rows with output 1). For POS form, AND together all maxterms (rows with output 0).</p>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q19: What is the difference between a truth table and a state table?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: Truth tables are for combinational logic (output depends only on current inputs). State tables are for sequential logic (output depends on current inputs and previous state).</p>
            </div>
            <div className="pb-4">
              <p className="font-semibold text-gray-900 dark:text-white">Q20: How do you verify that a truth table is correct?</p>
              <p className="text-gray-700 dark:text-gray-300 mt-1">A: First, check that you have 2ⁿ rows. Then, verify that the input combinations are listed in binary order with no duplicates. Finally, test a few combinations manually to ensure the outputs match the logic rules.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic3;