import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 32: Canonical (Cardinal) Form of a Minterm
 * 
 * Component: Topic32
 * Purpose: Explains the Canonical (Cardinal) Form of Minterms:
 *          - Definition of minterms and canonical SOP
 *          - Cardinal representation (Σ notation)
 *          - Converting truth tables to minterm lists
 *          - Converting expressions to canonical form
 *          - 20+ examples with step-by-step solutions
 * 
 * When & Why: Used as the thirty-second topic in the Boolean Algebra series.
 *             Understanding minterms and their canonical form is essential for
 *             Karnaugh maps, logic minimization, and digital circuit design.
 * 
 * Return Type: JSX.Element
 */

const Topic32 = () => {
  // State for interactive example selection
  const [selectedExample, setSelectedExample] = useState(0);
  const [showTruthTable, setShowTruthTable] = useState(true);
  const [showSteps, setShowSteps] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // 20+ Examples of Canonical Minterm Forms
  const examples = [
    {
      id: 1,
      name: "2-Variable AND",
      expression: "F = A·B",
      minterms: [3],
      cardinal: "F = Σ(3)",
      canonical: "F = A·B",
      variables: 2,
      truthTable: [
        { A: 0, B: 0, F: 0, minterm: 0 },
        { A: 0, B: 1, F: 0, minterm: 1 },
        { A: 1, B: 0, F: 0, minterm: 2 },
        { A: 1, B: 1, F: 1, minterm: 3 }
      ],
      explanation: "AND function has only one minterm (m₃) where both inputs are 1."
    },
    {
      id: 2,
      name: "2-Variable OR",
      expression: "F = A + B",
      minterms: [1, 2, 3],
      cardinal: "F = Σ(1, 2, 3)",
      canonical: "F = A'B + AB' + AB",
      variables: 2,
      truthTable: [
        { A: 0, B: 0, F: 0, minterm: 0 },
        { A: 0, B: 1, F: 1, minterm: 1 },
        { A: 1, B: 0, F: 1, minterm: 2 },
        { A: 1, B: 1, F: 1, minterm: 3 }
      ],
      explanation: "OR function has three minterms: m₁, m₂, and m₃."
    },
    {
      id: 3,
      name: "2-Variable XOR",
      expression: "F = A⊕B",
      minterms: [1, 2],
      cardinal: "F = Σ(1, 2)",
      canonical: "F = A'B + AB'",
      variables: 2,
      truthTable: [
        { A: 0, B: 0, F: 0, minterm: 0 },
        { A: 0, B: 1, F: 1, minterm: 1 },
        { A: 1, B: 0, F: 1, minterm: 2 },
        { A: 1, B: 1, F: 0, minterm: 3 }
      ],
      explanation: "XOR function has minterms where inputs differ: m₁ and m₂."
    },
    {
      id: 4,
      name: "2-Variable XNOR",
      expression: "F = A⊙B",
      minterms: [0, 3],
      cardinal: "F = Σ(0, 3)",
      canonical: "F = A'B' + AB",
      variables: 2,
      truthTable: [
        { A: 0, B: 0, F: 1, minterm: 0 },
        { A: 0, B: 1, F: 0, minterm: 1 },
        { A: 1, B: 0, F: 0, minterm: 2 },
        { A: 1, B: 1, F: 1, minterm: 3 }
      ],
      explanation: "XNOR function has minterms where inputs are equal: m₀ and m₃."
    },
    {
      id: 5,
      name: "3-Variable AND",
      expression: "F = A·B·C",
      minterms: [7],
      cardinal: "F = Σ(7)",
      canonical: "F = ABC",
      variables: 3,
      truthTable: [
        { A: 0, B: 0, C: 0, F: 0, minterm: 0 },
        { A: 0, B: 0, C: 1, F: 0, minterm: 1 },
        { A: 0, B: 1, C: 0, F: 0, minterm: 2 },
        { A: 0, B: 1, C: 1, F: 0, minterm: 3 },
        { A: 1, B: 0, C: 0, F: 0, minterm: 4 },
        { A: 1, B: 0, C: 1, F: 0, minterm: 5 },
        { A: 1, B: 1, C: 0, F: 0, minterm: 6 },
        { A: 1, B: 1, C: 1, F: 1, minterm: 7 }
      ],
      explanation: "3-input AND has only one minterm (m₇) where all inputs are 1."
    },
    {
      id: 6,
      name: "3-Variable OR",
      expression: "F = A + B + C",
      minterms: [1, 2, 3, 4, 5, 6, 7],
      cardinal: "F = Σ(1, 2, 3, 4, 5, 6, 7)",
      canonical: "F = A'B'C + A'BC' + A'BC + AB'C' + AB'C + ABC' + ABC",
      variables: 3,
      truthTable: null,
      explanation: "3-input OR has all minterms except m₀."
    },
    {
      id: 7,
      name: "3-Variable Majority",
      expression: "F = AB + AC + BC",
      minterms: [3, 5, 6, 7],
      cardinal: "F = Σ(3, 5, 6, 7)",
      canonical: "F = A'BC + AB'C + ABC' + ABC",
      variables: 3,
      truthTable: [
        { A: 0, B: 0, C: 0, F: 0, minterm: 0 },
        { A: 0, B: 0, C: 1, F: 0, minterm: 1 },
        { A: 0, B: 1, C: 0, F: 0, minterm: 2 },
        { A: 0, B: 1, C: 1, F: 1, minterm: 3 },
        { A: 1, B: 0, C: 0, F: 0, minterm: 4 },
        { A: 1, B: 0, C: 1, F: 1, minterm: 5 },
        { A: 1, B: 1, C: 0, F: 1, minterm: 6 },
        { A: 1, B: 1, C: 1, F: 1, minterm: 7 }
      ],
      explanation: "Majority function outputs 1 when at least two inputs are 1. Minterms: m₃, m₅, m₆, m₇."
    },
    {
      id: 8,
      name: "3-Variable XOR (Odd Parity)",
      expression: "F = A⊕B⊕C",
      minterms: [1, 2, 4, 7],
      cardinal: "F = Σ(1, 2, 4, 7)",
      canonical: "F = A'B'C + A'BC' + AB'C' + ABC",
      variables: 3,
      truthTable: [
        { A: 0, B: 0, C: 0, F: 0, minterm: 0 },
        { A: 0, B: 0, C: 1, F: 1, minterm: 1 },
        { A: 0, B: 1, C: 0, F: 1, minterm: 2 },
        { A: 0, B: 1, C: 1, F: 0, minterm: 3 },
        { A: 1, B: 0, C: 0, F: 1, minterm: 4 },
        { A: 1, B: 0, C: 1, F: 0, minterm: 5 },
        { A: 1, B: 1, C: 0, F: 0, minterm: 6 },
        { A: 1, B: 1, C: 1, F: 1, minterm: 7 }
      ],
      explanation: "XOR (odd parity) has minterms with odd number of 1s: m₁, m₂, m₄, m₇."
    },
    {
      id: 9,
      name: "3-Variable Even Parity",
      expression: "F = A⊙B⊙C",
      minterms: [0, 3, 5, 6],
      cardinal: "F = Σ(0, 3, 5, 6)",
      canonical: "F = A'B'C' + A'BC + AB'C + ABC'",
      variables: 3,
      truthTable: [
        { A: 0, B: 0, C: 0, F: 1, minterm: 0 },
        { A: 0, B: 0, C: 1, F: 0, minterm: 1 },
        { A: 0, B: 1, C: 0, F: 0, minterm: 2 },
        { A: 0, B: 1, C: 1, F: 1, minterm: 3 },
        { A: 1, B: 0, C: 0, F: 0, minterm: 4 },
        { A: 1, B: 0, C: 1, F: 1, minterm: 5 },
        { A: 1, B: 1, C: 0, F: 1, minterm: 6 },
        { A: 1, B: 1, C: 1, F: 0, minterm: 7 }
      ],
      explanation: "Even parity has minterms with even number of 1s: m₀, m₃, m₅, m₆."
    },
    {
      id: 10,
      name: "3-Variable NAND",
      expression: "F = (A·B·C)'",
      minterms: [0, 1, 2, 3, 4, 5, 6],
      cardinal: "F = Σ(0, 1, 2, 3, 4, 5, 6)",
      canonical: "F = A'B'C' + A'B'C + A'BC' + A'BC + AB'C' + AB'C + ABC'",
      variables: 3,
      truthTable: null,
      explanation: "NAND outputs 0 only when all inputs are 1, so minterms are all except m₇."
    },
    {
      id: 11,
      name: "3-Variable NOR",
      expression: "F = (A+B+C)'",
      minterms: [0],
      cardinal: "F = Σ(0)",
      canonical: "F = A'B'C'",
      variables: 3,
      truthTable: null,
      explanation: "NOR outputs 1 only when all inputs are 0, so only minterm m₀."
    },
    {
      id: 12,
      name: "4-Variable AND",
      expression: "F = A·B·C·D",
      minterms: [15],
      cardinal: "F = Σ(15)",
      canonical: "F = ABCD",
      variables: 4,
      truthTable: null,
      explanation: "4-input AND has only one minterm (m₁₅) where all inputs are 1."
    },
    {
      id: 13,
      name: "4-Variable OR",
      expression: "F = A+B+C+D",
      minterms: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      cardinal: "F = Σ(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)",
      canonical: "All minterms except m₀",
      variables: 4,
      truthTable: null,
      explanation: "4-input OR has all minterms except m₀."
    },
    {
      id: 14,
      name: "4-Variable XOR (Odd Parity)",
      expression: "F = A⊕B⊕C⊕D",
      minterms: [1, 2, 4, 7, 8, 11, 13, 14],
      cardinal: "F = Σ(1, 2, 4, 7, 8, 11, 13, 14)",
      canonical: "Minterms with odd number of 1s",
      variables: 4,
      truthTable: null,
      explanation: "4-input XOR outputs 1 when the number of 1s is odd."
    },
    {
      id: 15,
      name: "4-Variable Even Parity",
      expression: "F = A⊙B⊙C⊙D",
      minterms: [0, 3, 5, 6, 9, 10, 12, 15],
      cardinal: "F = Σ(0, 3, 5, 6, 9, 10, 12, 15)",
      canonical: "Minterms with even number of 1s",
      variables: 4,
      truthTable: null,
      explanation: "4-input XNOR outputs 1 when the number of 1s is even."
    },
    {
      id: 16,
      name: "Half Adder Sum",
      expression: "S = A⊕B",
      minterms: [1, 2],
      cardinal: "S = Σ(1, 2)",
      canonical: "S = A'B + AB'",
      variables: 2,
      truthTable: [
        { A: 0, B: 0, S: 0, minterm: 0 },
        { A: 0, B: 1, S: 1, minterm: 1 },
        { A: 1, B: 0, S: 1, minterm: 2 },
        { A: 1, B: 1, S: 0, minterm: 3 }
      ],
      explanation: "Half adder sum is XOR function."
    },
    {
      id: 17,
      name: "Half Adder Carry",
      expression: "C = A·B",
      minterms: [3],
      cardinal: "C = Σ(3)",
      canonical: "C = AB",
      variables: 2,
      truthTable: [
        { A: 0, B: 0, C: 0, minterm: 0 },
        { A: 0, B: 1, C: 0, minterm: 1 },
        { A: 1, B: 0, C: 0, minterm: 2 },
        { A: 1, B: 1, C: 1, minterm: 3 }
      ],
      explanation: "Half adder carry is AND function."
    },
    {
      id: 18,
      name: "Full Adder Sum",
      expression: "S = A⊕B⊕Cin",
      minterms: [1, 2, 4, 7],
      cardinal: "S = Σ(1, 2, 4, 7)",
      canonical: "S = A'B'Cin + A'BCin' + AB'Cin' + ABCin",
      variables: 3,
      truthTable: [
        { A: 0, B: 0, Cin: 0, S: 0, minterm: 0 },
        { A: 0, B: 0, Cin: 1, S: 1, minterm: 1 },
        { A: 0, B: 1, Cin: 0, S: 1, minterm: 2 },
        { A: 0, B: 1, Cin: 1, S: 0, minterm: 3 },
        { A: 1, B: 0, Cin: 0, S: 1, minterm: 4 },
        { A: 1, B: 0, Cin: 1, S: 0, minterm: 5 },
        { A: 1, B: 1, Cin: 0, S: 0, minterm: 6 },
        { A: 1, B: 1, Cin: 1, S: 1, minterm: 7 }
      ],
      explanation: "Full adder sum is XOR of three inputs."
    },
    {
      id: 19,
      name: "Full Adder Carry",
      expression: "Cout = AB + ACin + BCin",
      minterms: [3, 5, 6, 7],
      cardinal: "Cout = Σ(3, 5, 6, 7)",
      canonical: "Cout = A'BCin + AB'Cin + ABCin' + ABCin",
      variables: 3,
      truthTable: [
        { A: 0, B: 0, Cin: 0, Cout: 0, minterm: 0 },
        { A: 0, B: 0, Cin: 1, Cout: 0, minterm: 1 },
        { A: 0, B: 1, Cin: 0, Cout: 0, minterm: 2 },
        { A: 0, B: 1, Cin: 1, Cout: 1, minterm: 3 },
        { A: 1, B: 0, Cin: 0, Cout: 0, minterm: 4 },
        { A: 1, B: 0, Cin: 1, Cout: 1, minterm: 5 },
        { A: 1, B: 1, Cin: 0, Cout: 1, minterm: 6 },
        { A: 1, B: 1, Cin: 1, Cout: 1, minterm: 7 }
      ],
      explanation: "Full adder carry is the majority function."
    },
    {
      id: 20,
      name: "BCD Invalid Code Detector",
      expression: "F = Σ(10, 11, 12, 13, 14, 15)",
      minterms: [10, 11, 12, 13, 14, 15],
      cardinal: "F = Σ(10, 11, 12, 13, 14, 15)",
      canonical: "Detects invalid BCD codes (10-15)",
      variables: 4,
      truthTable: null,
      explanation: "BCD uses minterms 0-9. Invalid codes 10-15 are detected."
    }
  ];

  const filteredExamples = examples.filter(ex =>
    ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ex.cardinal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentExample = filteredExamples[selectedExample];

  // Generate minterm table display
  const renderTruthTable = (example) => {
    if (!example.truthTable) {
      return (
        <div className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg text-center">
          <p className="text-sm text-gray-500">Truth table has 2^{example.variables} = {Math.pow(2, example.variables)} rows</p>
          <p className="text-sm text-gray-500 mt-1">Minterms: {example.minterms.join(', ')}</p>
        </div>
      );
    }

    const headers = Object.keys(example.truthTable[0]).filter(key => key !== 'minterm');

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-600">
              {headers.map(h => (
                <th key={h} className="px-4 py-2 text-center font-mono uppercase">{h}</th>
              ))}
              <th className="px-4 py-2 text-center">Minterm</th>
              <th className="px-4 py-2 text-center">Output</th>
             </tr>
          </thead>
          <tbody>
            {example.truthTable.map((row, idx) => (
              <tr key={idx} className={clsx(
                "border-t border-gray-200 dark:border-gray-600",
                row.F === 1 ? "bg-green-50 dark:bg-green-900/20" : ""
              )}>
                {headers.map(h => (
                  <td key={h} className="px-4 py-2 text-center font-mono">{row[h]}</td>
                ))}
                <td className="px-4 py-2 text-center font-mono">m{row.minterm}</td>
                <td className={clsx(
                  "px-4 py-2 text-center font-mono font-bold",
                  row.F === 1 ? "text-green-600" : "text-red-600"
                )}>{row.F}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const nextExample = () => {
    setSelectedExample((prev) => (prev + 1) % filteredExamples.length);
  };

  const prevExample = () => {
    setSelectedExample((prev) => (prev - 1 + filteredExamples.length) % filteredExamples.length);
  };

  // Generate minterm expression
  const generateMintermExpression = (minterms, variables) => {
    const varNames = variables === 2 ? ['A', 'B'] : variables === 3 ? ['A', 'B', 'C'] : ['A', 'B', 'C', 'D'];
    return minterms.map(m => {
      const binary = m.toString(2).padStart(variables, '0');
      return binary.split('').map((bit, i) => bit === '1' ? varNames[i] : `${varNames[i]}'`).join('·');
    }).join(' + ');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-purple-100 dark:bg-purple-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Canonical (Cardinal) Form</span>
          <span className="block text-purple-600 dark:text-purple-400">of a Minterm</span>
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl">
          Understanding Minterms and Σ Notation for Boolean Functions
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction Section */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📊</span> What is a Minterm?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            A <strong className="text-purple-600">minterm</strong> is a product (AND) term that includes every variable exactly once, either in true or complemented form. 
            For <strong className="text-purple-600">n variables</strong>, there are <strong className="text-purple-600">2ⁿ possible minterms</strong>, each corresponding to a unique input combination.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold">Canonical SOP</p>
              <p className="text-xs">Sum of all minterms where output = 1</p>
              <p className="font-mono text-sm mt-1">F = Σ(m₁, m₂, m₃)</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold">Cardinal Form</p>
              <p className="text-xs">Short notation using Σ (sigma)</p>
              <p className="font-mono text-sm mt-1">Σ(1, 2, 4, 7)</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold">Minterm Number</p>
              <p className="text-xs">Binary representation of inputs</p>
              <p className="font-mono text-sm mt-1">m₃ = A'BC (011)</p>
            </div>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Key Insight:</span> The canonical form Σ(minterms) is the most fundamental representation of a Boolean function, 
              directly derived from its truth table. Each minterm represents exactly one row where the output is 1.
            </p>
          </div>
        </div>

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
              placeholder="Search by function name or cardinal notation..."
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
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
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-40 overflow-y-auto p-2 border border-gray-200 dark:border-gray-700 rounded-lg">
            {filteredExamples.map((ex, idx) => (
              <button
                key={ex.id}
                onClick={() => setSelectedExample(idx)}
                className={clsx(
                  "px-2 py-1 rounded text-sm truncate transition-all",
                  selectedExample === idx
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200"
                )}
              >
                {ex.id}. {ex.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Example Display */}
        {currentExample && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white">Example {currentExample.id}: {currentExample.name}</h3>
              <p className="text-purple-100 text-sm mt-1">{currentExample.explanation}</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Expression Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-500">Boolean Expression</p>
                  <p className="font-mono text-lg font-bold">{currentExample.expression}</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-4 text-center">
                  <p className="text-sm text-purple-600">Canonical (Cardinal) Form</p>
                  <p className="font-mono text-lg font-bold">{currentExample.cardinal}</p>
                </div>
              </div>
              
              {/* Minterm Details */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <p className="font-semibold mb-2">📌 Minterm Details:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Minterms included:</p>
                    <p className="font-mono text-lg">{currentExample.minterms.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Number of variables:</p>
                    <p className="font-mono text-lg">{currentExample.variables} variables</p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Canonical SOP Expression:</p>
                  <p className="font-mono text-sm break-all">
                    F = {generateMintermExpression(currentExample.minterms, currentExample.variables)}
                  </p>
                </div>
              </div>
              
              {/* Truth Table Toggle */}
              <button
                onClick={() => setShowTruthTable(!showTruthTable)}
                className="w-full py-2 bg-gray-200 dark:bg-gray-700 rounded-lg font-medium hover:bg-gray-300 transition"
              >
                {showTruthTable ? "Hide" : "Show"} Truth Table
              </button>
              
              {showTruthTable && renderTruthTable(currentExample)}
              
              {/* Steps Toggle */}
              <button
                onClick={() => setShowSteps(!showSteps)}
                className="w-full py-2 bg-purple-100 dark:bg-purple-900/40 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition"
              >
                {showSteps ? "Hide" : "Show"} Derivation Steps
              </button>
              
              {showSteps && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">📝 Derivation Steps:</h4>
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>Identify all input combinations where output = 1</li>
                    <li>For each such combination, write the minterm (AND of all variables, complemented if input = 0)</li>
                    <li>Assign minterm numbers based on binary representation</li>
                    <li>Write the canonical form as Σ(minterm numbers)</li>
                  </ol>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-sm">
                      <span className="font-bold">🎯 For this example:</span><br />
                      Output is 1 for minterms: {currentExample.minterms.join(', ')}<br />
                      Cardinal form: {currentExample.cardinal}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Minterm Reference Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 Minterm Reference (3 Variables)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-600">
                  <th className="px-4 py-2">Minterm</th>
                  <th className="px-4 py-2">Binary (A B C)</th>
                  <th className="px-4 py-2">Product Term</th>
                  <th className="px-4 py-2">Description</th>
                 </tr>
              </thead>
              <tbody>
                {[
                  [0, "0 0 0", "A'B'C'", "All inputs 0"],
                  [1, "0 0 1", "A'B'C", "Only C=1"],
                  [2, "0 1 0", "A'BC'", "Only B=1"],
                  [3, "0 1 1", "A'BC", "B=1, C=1"],
                  [4, "1 0 0", "AB'C'", "Only A=1"],
                  [5, "1 0 1", "AB'C", "A=1, C=1"],
                  [6, "1 1 0", "ABC'", "A=1, B=1"],
                  [7, "1 1 1", "ABC", "All inputs 1"]
                ].map((row, idx) => (
                  <tr key={idx} className="border-t border-gray-200 dark:border-gray-600">
                    <td className="px-4 py-2 text-center font-mono">m{row[0]}</td>
                    <td className="px-4 py-2 text-center font-mono">{row[1]}</td>
                    <td className="px-4 py-2 text-center font-mono">{row[2]}</td>
                    <td className="px-4 py-2 text-center">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Formulas */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">✨ Key Formulas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p className="font-mono font-bold">Minterm from Binary</p>
              <p className="text-sm">For minterm mₖ, binary = binary(k) with n bits</p>
              <p className="text-sm">Each 1 = variable, 0 = complemented variable</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p className="font-mono font-bold">Cardinal Form</p>
              <p className="text-sm">F = Σ(minterm numbers where F=1)</p>
              <p className="text-sm">Example: F = Σ(1, 3, 5, 7)</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p className="font-mono font-bold">Canonical SOP</p>
              <p className="text-sm">F = m₁ + m₂ + m₃ + ...</p>
              <p className="text-sm">Sum of all minterms where output=1</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p className="font-mono font-bold">Number of Minterms</p>
              <p className="text-sm">For n variables: 2ⁿ possible minterms</p>
              <p className="text-sm">Each minterm is unique</p>
            </div>
          </div>
        </div>

        {/* Teacher's Note */}
        <Teacher note={
          "🎓 **Teaching This Topic**\n\n" +
          "Minterms are the building blocks of Boolean functions. Students must understand that:\n\n" +
          "💡 Each minterm corresponds to exactly one input combination\n" +
          "💡 The cardinal notation Σ(m) is shorthand for the sum of minterms\n" +
          "💡 Canonical SOP is the most basic representation of any Boolean function\n\n" +
          "🔍 **Common Misunderstanding:** Students often confuse minterm numbers. Emphasize that m₀ corresponds to all inputs 0 (A'B'C'), not (ABC).\n\n" +
          "📌 **ISC Exam Tip:** Cardinal form questions often appear as 'Express F in Σ notation' or 'Find the minterms'."
        } />
      </div>
    </div>
  );
};

export default Topic32;