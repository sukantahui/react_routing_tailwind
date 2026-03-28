import React, { useState } from 'react';
import clsx from 'clsx';
import Teacher from "../../../../../common/TeacherSukantaHui";

/**
 * Topic 33: Canonical (Cardinal) Form of a Maxterm
 * 
 * Component: Topic33
 * Purpose: Explains the Canonical (Cardinal) Form of Maxterms:
 *          - Definition of maxterms and canonical POS
 *          - Cardinal representation (Π notation)
 *          - Converting truth tables to maxterm lists
 *          - Converting expressions to canonical POS form
 *          - 20+ examples with step-by-step solutions
 * 
 * When & Why: Used as the thirty-third topic in the Boolean Algebra series.
 *             Understanding maxterms and their canonical form is the dual of minterms,
 *             essential for Product of Sums (POS) representations and logic minimization.
 * 
 * Return Type: JSX.Element
 */

const Topic33 = () => {
  // State for interactive example selection
  const [selectedExample, setSelectedExample] = useState(0);
  const [showTruthTable, setShowTruthTable] = useState(true);
  const [showSteps, setShowSteps] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // 20+ Examples of Canonical Maxterm Forms
  const examples = [
    {
      id: 1,
      name: "2-Variable AND",
      expression: "F = A·B",
      maxterms: [0, 1, 2],
      cardinal: "F = Π(0, 1, 2)",
      canonical: "F = (A+B)·(A+B')·(A'+B)",
      variables: 2,
      truthTable: [
        { A: 0, B: 0, F: 0, maxterm: 0 },
        { A: 0, B: 1, F: 0, maxterm: 1 },
        { A: 1, B: 0, F: 0, maxterm: 2 },
        { A: 1, B: 1, F: 1, maxterm: 3 }
      ],
      explanation: "AND function outputs 0 for maxterms m₀, m₁, m₂. POS is product of these maxterms."
    },
    {
      id: 2,
      name: "2-Variable OR",
      expression: "F = A + B",
      maxterms: [0],
      cardinal: "F = Π(0)",
      canonical: "F = A+B",
      variables: 2,
      truthTable: [
        { A: 0, B: 0, F: 0, maxterm: 0 },
        { A: 0, B: 1, F: 1, maxterm: 1 },
        { A: 1, B: 0, F: 1, maxterm: 2 },
        { A: 1, B: 1, F: 1, maxterm: 3 }
      ],
      explanation: "OR function outputs 0 only for m₀, so POS is a single maxterm (A+B)."
    },
    {
      id: 3,
      name: "2-Variable XOR",
      expression: "F = A⊕B",
      maxterms: [0, 3],
      cardinal: "F = Π(0, 3)",
      canonical: "F = (A+B)·(A'+B')",
      variables: 2,
      truthTable: [
        { A: 0, B: 0, F: 0, maxterm: 0 },
        { A: 0, B: 1, F: 1, maxterm: 1 },
        { A: 1, B: 0, F: 1, maxterm: 2 },
        { A: 1, B: 1, F: 0, maxterm: 3 }
      ],
      explanation: "XOR outputs 0 for m₀ and m₃. POS is product of these maxterms."
    },
    {
      id: 4,
      name: "2-Variable XNOR",
      expression: "F = A⊙B",
      maxterms: [1, 2],
      cardinal: "F = Π(1, 2)",
      canonical: "F = (A+B')·(A'+B)",
      variables: 2,
      truthTable: [
        { A: 0, B: 0, F: 1, maxterm: 0 },
        { A: 0, B: 1, F: 0, maxterm: 1 },
        { A: 1, B: 0, F: 0, maxterm: 2 },
        { A: 1, B: 1, F: 1, maxterm: 3 }
      ],
      explanation: "XNOR outputs 0 for m₁ and m₂. POS is product of these maxterms."
    },
    {
      id: 5,
      name: "3-Variable AND",
      expression: "F = A·B·C",
      maxterms: [0, 1, 2, 3, 4, 5, 6],
      cardinal: "F = Π(0, 1, 2, 3, 4, 5, 6)",
      canonical: "Product of all maxterms except m₇",
      variables: 3,
      truthTable: [
        { A: 0, B: 0, C: 0, F: 0, maxterm: 0 },
        { A: 0, B: 0, C: 1, F: 0, maxterm: 1 },
        { A: 0, B: 1, C: 0, F: 0, maxterm: 2 },
        { A: 0, B: 1, C: 1, F: 0, maxterm: 3 },
        { A: 1, B: 0, C: 0, F: 0, maxterm: 4 },
        { A: 1, B: 0, C: 1, F: 0, maxterm: 5 },
        { A: 1, B: 1, C: 0, F: 0, maxterm: 6 },
        { A: 1, B: 1, C: 1, F: 1, maxterm: 7 }
      ],
      explanation: "3-input AND outputs 0 for all maxterms except m₇."
    },
    {
      id: 6,
      name: "3-Variable OR",
      expression: "F = A + B + C",
      maxterms: [0],
      cardinal: "F = Π(0)",
      canonical: "F = A+B+C",
      variables: 3,
      truthTable: [
        { A: 0, B: 0, C: 0, F: 0, maxterm: 0 },
        { A: 0, B: 0, C: 1, F: 1, maxterm: 1 },
        { A: 0, B: 1, C: 0, F: 1, maxterm: 2 },
        { A: 0, B: 1, C: 1, F: 1, maxterm: 3 },
        { A: 1, B: 0, C: 0, F: 1, maxterm: 4 },
        { A: 1, B: 0, C: 1, F: 1, maxterm: 5 },
        { A: 1, B: 1, C: 0, F: 1, maxterm: 6 },
        { A: 1, B: 1, C: 1, F: 1, maxterm: 7 }
      ],
      explanation: "3-input OR outputs 0 only for m₀, so POS is a single maxterm."
    },
    {
      id: 7,
      name: "3-Variable Majority",
      expression: "F = AB + AC + BC",
      maxterms: [0, 1, 2, 4],
      cardinal: "F = Π(0, 1, 2, 4)",
      canonical: "F = (A+B+C)·(A+B+C')·(A+B'+C)·(A'+B+C)",
      variables: 3,
      truthTable: [
        { A: 0, B: 0, C: 0, F: 0, maxterm: 0 },
        { A: 0, B: 0, C: 1, F: 0, maxterm: 1 },
        { A: 0, B: 1, C: 0, F: 0, maxterm: 2 },
        { A: 0, B: 1, C: 1, F: 1, maxterm: 3 },
        { A: 1, B: 0, C: 0, F: 0, maxterm: 4 },
        { A: 1, B: 0, C: 1, F: 1, maxterm: 5 },
        { A: 1, B: 1, C: 0, F: 1, maxterm: 6 },
        { A: 1, B: 1, C: 1, F: 1, maxterm: 7 }
      ],
      explanation: "Majority function outputs 0 for m₀, m₁, m₂, m₄. POS is product of these maxterms."
    },
    {
      id: 8,
      name: "3-Variable XOR (Odd Parity)",
      expression: "F = A⊕B⊕C",
      maxterms: [0, 3, 5, 6],
      cardinal: "F = Π(0, 3, 5, 6)",
      canonical: "F = (A+B+C)·(A+B'+C')·(A'+B+C')·(A'+B'+C)",
      variables: 3,
      truthTable: [
        { A: 0, B: 0, C: 0, F: 0, maxterm: 0 },
        { A: 0, B: 0, C: 1, F: 1, maxterm: 1 },
        { A: 0, B: 1, C: 0, F: 1, maxterm: 2 },
        { A: 0, B: 1, C: 1, F: 0, maxterm: 3 },
        { A: 1, B: 0, C: 0, F: 1, maxterm: 4 },
        { A: 1, B: 0, C: 1, F: 0, maxterm: 5 },
        { A: 1, B: 1, C: 0, F: 0, maxterm: 6 },
        { A: 1, B: 1, C: 1, F: 1, maxterm: 7 }
      ],
      explanation: "XOR outputs 0 for even parity maxterms: m₀, m₃, m₅, m₆."
    },
    {
      id: 9,
      name: "3-Variable Even Parity",
      expression: "F = A⊙B⊙C",
      maxterms: [1, 2, 4, 7],
      cardinal: "F = Π(1, 2, 4, 7)",
      canonical: "F = (A+B+C')·(A+B'+C)·(A'+B+C)·(A'+B'+C')",
      variables: 3,
      truthTable: [
        { A: 0, B: 0, C: 0, F: 1, maxterm: 0 },
        { A: 0, B: 0, C: 1, F: 0, maxterm: 1 },
        { A: 0, B: 1, C: 0, F: 0, maxterm: 2 },
        { A: 0, B: 1, C: 1, F: 1, maxterm: 3 },
        { A: 1, B: 0, C: 0, F: 0, maxterm: 4 },
        { A: 1, B: 0, C: 1, F: 1, maxterm: 5 },
        { A: 1, B: 1, C: 0, F: 1, maxterm: 6 },
        { A: 1, B: 1, C: 1, F: 0, maxterm: 7 }
      ],
      explanation: "Even parity outputs 0 for odd parity maxterms: m₁, m₂, m₄, m₇."
    },
    {
      id: 10,
      name: "3-Variable NAND",
      expression: "F = (A·B·C)'",
      maxterms: [7],
      cardinal: "F = Π(7)",
      canonical: "F = A' + B' + C'",
      variables: 3,
      truthTable: [
        { A: 0, B: 0, C: 0, F: 1, maxterm: 0 },
        { A: 0, B: 0, C: 1, F: 1, maxterm: 1 },
        { A: 0, B: 1, C: 0, F: 1, maxterm: 2 },
        { A: 0, B: 1, C: 1, F: 1, maxterm: 3 },
        { A: 1, B: 0, C: 0, F: 1, maxterm: 4 },
        { A: 1, B: 0, C: 1, F: 1, maxterm: 5 },
        { A: 1, B: 1, C: 0, F: 1, maxterm: 6 },
        { A: 1, B: 1, C: 1, F: 0, maxterm: 7 }
      ],
      explanation: "NAND outputs 0 only for m₇, so POS is a single maxterm (A'+B'+C')."
    },
    {
      id: 11,
      name: "3-Variable NOR",
      expression: "F = (A+B+C)'",
      maxterms: [0, 1, 2, 3, 4, 5, 6],
      cardinal: "F = Π(0, 1, 2, 3, 4, 5, 6)",
      canonical: "Product of all maxterms except m₇",
      variables: 3,
      truthTable: [
        { A: 0, B: 0, C: 0, F: 1, maxterm: 0 },
        { A: 0, B: 0, C: 1, F: 0, maxterm: 1 },
        { A: 0, B: 1, C: 0, F: 0, maxterm: 2 },
        { A: 0, B: 1, C: 1, F: 0, maxterm: 3 },
        { A: 1, B: 0, C: 0, F: 0, maxterm: 4 },
        { A: 1, B: 0, C: 1, F: 0, maxterm: 5 },
        { A: 1, B: 1, C: 0, F: 0, maxterm: 6 },
        { A: 1, B: 1, C: 1, F: 0, maxterm: 7 }
      ],
      explanation: "NOR outputs 1 only for m₀, so maxterms are all others."
    },
    {
      id: 12,
      name: "4-Variable AND",
      expression: "F = A·B·C·D",
      maxterms: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      cardinal: "F = Π(0-14)",
      canonical: "Product of all maxterms except m₁₅",
      variables: 4,
      truthTable: null,
      explanation: "4-input AND outputs 0 for all maxterms except m₁₅."
    },
    {
      id: 13,
      name: "4-Variable OR",
      expression: "F = A+B+C+D",
      maxterms: [0],
      cardinal: "F = Π(0)",
      canonical: "F = A+B+C+D",
      variables: 4,
      truthTable: null,
      explanation: "4-input OR outputs 0 only for m₀."
    },
    {
      id: 14,
      name: "4-Variable XOR (Odd Parity)",
      expression: "F = A⊕B⊕C⊕D",
      maxterms: [0, 3, 5, 6, 9, 10, 12, 15],
      cardinal: "F = Π(0, 3, 5, 6, 9, 10, 12, 15)",
      canonical: "Maxterms with even number of 1s",
      variables: 4,
      truthTable: null,
      explanation: "Odd parity outputs 0 when number of 1s is even."
    },
    {
      id: 15,
      name: "4-Variable Even Parity",
      expression: "F = A⊙B⊙C⊙D",
      maxterms: [1, 2, 4, 7, 8, 11, 13, 14],
      cardinal: "F = Π(1, 2, 4, 7, 8, 11, 13, 14)",
      canonical: "Maxterms with odd number of 1s",
      variables: 4,
      truthTable: null,
      explanation: "Even parity outputs 0 when number of 1s is odd."
    },
    {
      id: 16,
      name: "Half Adder Sum",
      expression: "S = A⊕B",
      maxterms: [0, 3],
      cardinal: "S = Π(0, 3)",
      canonical: "S = (A+B)·(A'+B')",
      variables: 2,
      truthTable: [
        { A: 0, B: 0, S: 0, maxterm: 0 },
        { A: 0, B: 1, S: 1, maxterm: 1 },
        { A: 1, B: 0, S: 1, maxterm: 2 },
        { A: 1, B: 1, S: 0, maxterm: 3 }
      ],
      explanation: "Half adder sum outputs 0 for m₀ and m₃."
    },
    {
      id: 17,
      name: "Half Adder Carry",
      expression: "C = A·B",
      maxterms: [0, 1, 2],
      cardinal: "C = Π(0, 1, 2)",
      canonical: "C = (A+B)·(A+B')·(A'+B)",
      variables: 2,
      truthTable: [
        { A: 0, B: 0, C: 0, maxterm: 0 },
        { A: 0, B: 1, C: 0, maxterm: 1 },
        { A: 1, B: 0, C: 0, maxterm: 2 },
        { A: 1, B: 1, C: 1, maxterm: 3 }
      ],
      explanation: "Half adder carry outputs 0 for m₀, m₁, m₂."
    },
    {
      id: 18,
      name: "Full Adder Sum",
      expression: "S = A⊕B⊕Cin",
      maxterms: [0, 3, 5, 6],
      cardinal: "S = Π(0, 3, 5, 6)",
      canonical: "S = (A+B+Cin)·(A+B'+Cin')·(A'+B+Cin')·(A'+B'+Cin)",
      variables: 3,
      truthTable: [
        { A: 0, B: 0, Cin: 0, S: 0, maxterm: 0 },
        { A: 0, B: 0, Cin: 1, S: 1, maxterm: 1 },
        { A: 0, B: 1, Cin: 0, S: 1, maxterm: 2 },
        { A: 0, B: 1, Cin: 1, S: 0, maxterm: 3 },
        { A: 1, B: 0, Cin: 0, S: 1, maxterm: 4 },
        { A: 1, B: 0, Cin: 1, S: 0, maxterm: 5 },
        { A: 1, B: 1, Cin: 0, S: 0, maxterm: 6 },
        { A: 1, B: 1, Cin: 1, S: 1, maxterm: 7 }
      ],
      explanation: "Full adder sum outputs 0 for m₀, m₃, m₅, m₆."
    },
    {
      id: 19,
      name: "Full Adder Carry",
      expression: "Cout = AB + ACin + BCin",
      maxterms: [0, 1, 2, 4],
      cardinal: "Cout = Π(0, 1, 2, 4)",
      canonical: "Cout = (A+B+Cin)·(A+B+Cin')·(A+B'+Cin)·(A'+B+Cin)",
      variables: 3,
      truthTable: [
        { A: 0, B: 0, Cin: 0, Cout: 0, maxterm: 0 },
        { A: 0, B: 0, Cin: 1, Cout: 0, maxterm: 1 },
        { A: 0, B: 1, Cin: 0, Cout: 0, maxterm: 2 },
        { A: 0, B: 1, Cin: 1, Cout: 1, maxterm: 3 },
        { A: 1, B: 0, Cin: 0, Cout: 0, maxterm: 4 },
        { A: 1, B: 0, Cin: 1, Cout: 1, maxterm: 5 },
        { A: 1, B: 1, Cin: 0, Cout: 1, maxterm: 6 },
        { A: 1, B: 1, Cin: 1, Cout: 1, maxterm: 7 }
      ],
      explanation: "Full adder carry outputs 0 for m₀, m₁, m₂, m₄."
    },
    {
      id: 20,
      name: "BCD Invalid Code Detector",
      expression: "F = Σ(10-15)",
      maxterms: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      cardinal: "F = Π(0, 1, 2, 3, 4, 5, 6, 7, 8, 9)",
      canonical: "Product of all valid BCD maxterms",
      variables: 4,
      truthTable: null,
      explanation: "BCD invalid codes detector outputs 0 for valid codes (0-9), so maxterms are 0-9."
    }
  ];

  const filteredExamples = examples.filter(ex =>
    ex.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ex.cardinal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentExample = filteredExamples[selectedExample];

  const nextExample = () => {
    setSelectedExample((prev) => (prev + 1) % filteredExamples.length);
  };

  const prevExample = () => {
    setSelectedExample((prev) => (prev - 1 + filteredExamples.length) % filteredExamples.length);
  };

  // Generate maxterm expression
  const generateMaxtermExpression = (maxterms, variables) => {
    const varNames = variables === 2 ? ['A', 'B'] : variables === 3 ? ['A', 'B', 'C'] : ['A', 'B', 'C', 'D'];
    return maxterms.map(m => {
      const binary = m.toString(2).padStart(variables, '0');
      return '(' + binary.split('').map((bit, i) => bit === '0' ? varNames[i] : `${varNames[i]}'`).join('+') + ')';
    }).join(' · ');
  };

  // Render truth table
  const renderTruthTable = (example) => {
    if (!example.truthTable) {
      return (
        <div className="p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg text-center">
          <p className="text-sm text-gray-500">Truth table has 2^{example.variables} = {Math.pow(2, example.variables)} rows</p>
          <p className="text-sm text-gray-500 mt-1">Maxterms: {example.maxterms.join(', ')}</p>
        </div>
      );
    }

    const headers = Object.keys(example.truthTable[0]).filter(key => key !== 'maxterm');

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-600">
              {headers.map(h => (
                <th key={h} className="px-4 py-2 text-center font-mono uppercase">{h}</th>
              ))}
              <th className="px-4 py-2 text-center">Maxterm</th>
              <th className="px-4 py-2 text-center">Output</th>
              <th className="px-4 py-2 text-center">Sum Term</th>
             </tr>
          </thead>
          <tbody>
            {example.truthTable.map((row, idx) => {
              const binary = row.maxterm.toString(2).padStart(example.variables, '0');
              const sumTerm = binary.split('').map((bit, i) => {
                const vars = example.variables === 2 ? ['A', 'B'] : ['A', 'B', 'C'];
                return bit === '0' ? vars[i] : `${vars[i]}'`;
              }).join('+');
              
              return (
                <tr key={idx} className={clsx(
                  "border-t border-gray-200 dark:border-gray-600",
                  row.F === 0 ? "bg-red-50 dark:bg-red-900/20" : ""
                )}>
                  {headers.map(h => (
                    <td key={h} className="px-4 py-2 text-center font-mono">{row[h]}</td>
                  ))}
                  <td className="px-4 py-2 text-center font-mono">M{row.maxterm}</td>
                  <td className={clsx(
                    "px-4 py-2 text-center font-mono font-bold",
                    row.F === 1 ? "text-green-600" : "text-red-600"
                  )}>{row.F}</td>
                  <td className="px-4 py-2 text-center font-mono">{sumTerm}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-block p-3 mb-4 bg-rose-100 dark:bg-rose-900/40 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
          <svg className="w-12 h-12 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Canonical (Cardinal) Form</span>
          <span className="block text-rose-600 dark:text-rose-400">of a Maxterm</span>
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl">
          Understanding Maxterms and Π Notation for Boolean Functions
        </p>
      </div>

      <div className="space-y-8">
        {/* Introduction Section */}
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 transition-all duration-300 hover:shadow-xl border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <span className="text-3xl">📊</span> What is a Maxterm?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            A <strong className="text-rose-600">maxterm</strong> is a sum (OR) term that includes every variable exactly once, either in true or complemented form. 
            For <strong className="text-rose-600">n variables</strong>, there are <strong className="text-rose-600">2ⁿ possible maxterms</strong>, each corresponding to a unique input combination.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold">Canonical POS</p>
              <p className="text-xs">Product of all maxterms where output = 0</p>
              <p className="font-mono text-sm mt-1">F = Π(M₀, M₁, M₂)</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold">Cardinal Form</p>
              <p className="text-xs">Short notation using Π (pi)</p>
              <p className="font-mono text-sm mt-1">Π(0, 1, 2, 4)</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
              <p className="font-semibold">Maxterm Number</p>
              <p className="text-xs">Binary representation of inputs</p>
              <p className="font-mono text-sm mt-1">M₃ = A'+B'+C' (111)</p>
            </div>
          </div>
          <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Key Insight:</span> Maxterms are the dual of minterms. While minterms focus on where F=1, 
              maxterms focus on where F=0. The canonical POS form is the product of all maxterms where the output is 0.
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
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-rose-500"
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
                    ? "bg-rose-500 text-white"
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
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white">Example {currentExample.id}: {currentExample.name}</h3>
              <p className="text-rose-100 text-sm mt-1">{currentExample.explanation}</p>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Expression Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-100 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-500">Boolean Expression</p>
                  <p className="font-mono text-lg font-bold">{currentExample.expression}</p>
                </div>
                <div className="bg-rose-50 dark:bg-rose-900/20 rounded-xl p-4 text-center">
                  <p className="text-sm text-rose-600">Canonical (Cardinal) Form</p>
                  <p className="font-mono text-lg font-bold">{currentExample.cardinal}</p>
                </div>
              </div>
              
              {/* Maxterm Details */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <p className="font-semibold mb-2">📌 Maxterm Details:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Maxterms included:</p>
                    <p className="font-mono text-lg">{currentExample.maxterms.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Number of variables:</p>
                    <p className="font-mono text-lg">{currentExample.variables} variables</p>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Canonical POS Expression:</p>
                  <p className="font-mono text-sm break-all">
                    F = {generateMaxtermExpression(currentExample.maxterms, currentExample.variables)}
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
                className="w-full py-2 bg-rose-100 dark:bg-rose-900/40 text-rose-700 rounded-lg font-medium hover:bg-rose-200 transition"
              >
                {showSteps ? "Hide" : "Show"} Derivation Steps
              </button>
              
              {showSteps && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">📝 Derivation Steps:</h4>
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li>Identify all input combinations where output = 0</li>
                    <li>For each such combination, write the maxterm (OR of all variables, complemented if input = 1)</li>
                    <li>Assign maxterm numbers based on binary representation (variable=0 → true, variable=1 → complemented)</li>
                    <li>Write the canonical form as Π(maxterm numbers)</li>
                  </ol>
                  <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-sm">
                      <span className="font-bold">🎯 For this example:</span><br />
                      Output is 0 for maxterms: {currentExample.maxterms.join(', ')}<br />
                      Cardinal form: {currentExample.cardinal}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Maxterm Reference Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📚 Maxterm Reference (3 Variables)</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-600">
                  <th className="px-4 py-2">Maxterm</th>
                  <th className="px-4 py-2">Binary (A B C)</th>
                  <th className="px-4 py-2">Sum Term</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Evaluates to 0 when</th>
                  </tr>
              </thead>
              <tbody>
                {[
                  [0, "0 0 0", "A+B+C", "All inputs 0", "A=0,B=0,C=0"],
                  [1, "0 0 1", "A+B+C'", "Only C=1", "A=0,B=0,C=1"],
                  [2, "0 1 0", "A+B'+C", "Only B=1", "A=0,B=1,C=0"],
                  [3, "0 1 1", "A+B'+C'", "B=1,C=1", "A=0,B=1,C=1"],
                  [4, "1 0 0", "A'+B+C", "Only A=1", "A=1,B=0,C=0"],
                  [5, "1 0 1", "A'+B+C'", "A=1,C=1", "A=1,B=0,C=1"],
                  [6, "1 1 0", "A'+B'+C", "A=1,B=1", "A=1,B=1,C=0"],
                  [7, "1 1 1", "A'+B'+C'", "All inputs 1", "A=1,B=1,C=1"]
                ].map((row, idx) => (
                  <tr key={idx} className="border-t border-gray-200 dark:border-gray-600">
                    <td className="px-4 py-2 text-center font-mono">M{row[0]}</td>
                    <td className="px-4 py-2 text-center font-mono">{row[1]}</td>
                    <td className="px-4 py-2 text-center font-mono">{row[2]}</td>
                    <td className="px-4 py-2 text-center">{row[3]}</td>
                    <td className="px-4 py-2 text-center font-mono">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mintern vs Maxterm Comparison */}
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">🔄 Minterm vs Maxterm Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-600">Minterm (SOP)</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Focuses on output = <span className="font-bold text-green-600">1</span></li>
                <li>• AND of variables (product term)</li>
                <li>• Notation: <span className="font-mono">F = Σ(m₁, m₂, m₃)</span></li>
                <li>• Variable = 1 → true, 0 → complemented</li>
                <li>• m₀ = A'B'C'</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-rose-600">Maxterm (POS)</h3>
              <ul className="mt-2 space-y-1 text-sm">
                <li>• Focuses on output = <span className="font-bold text-red-600">0</span></li>
                <li>• OR of variables (sum term)</li>
                <li>• Notation: <span className="font-mono">F = Π(M₀, M₁, M₂)</span></li>
                <li>• Variable = 0 → true, 1 → complemented</li>
                <li>• M₀ = A+B+C</li>
              </ul>
            </div>
          </div>
          <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm text-center">
              <span className="font-bold">✨ Relationship:</span> Mᵢ = (mᵢ)' — Maxterm is the complement of the corresponding minterm.
            </p>
          </div>
        </div>

        {/* Key Formulas */}
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">✨ Key Formulas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p className="font-mono font-bold">Maxterm from Binary</p>
              <p className="text-sm">For maxterm Mₖ, binary = binary(k) with n bits</p>
              <p className="text-sm">Each 0 = variable, 1 = complemented variable</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p className="font-mono font-bold">Cardinal Form (POS)</p>
              <p className="text-sm">F = Π(maxterm numbers where F=0)</p>
              <p className="text-sm">Example: F = Π(0, 1, 2, 4)</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p className="font-mono font-bold">Minterm-Maxterm Relationship</p>
              <p className="text-sm">Mᵢ = (mᵢ)'</p>
              <p className="text-sm">mᵢ = (Mᵢ)'</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg">
              <p className="font-mono font-bold">Number of Maxterms</p>
              <p className="text-sm">For n variables: 2ⁿ possible maxterms</p>
              <p className="text-sm">Each maxterm is unique</p>
            </div>
          </div>
        </div>

        {/* Teacher's Note */}
        <Teacher note={
          "🎓 **Teaching This Topic**\n\n" +
          "Maxterms are the dual of minterms. Students must understand:\n\n" +
          "💡 Each maxterm corresponds to exactly one input combination where F=0\n" +
          "💡 The cardinal notation Π(M) is shorthand for the product of maxterms\n" +
          "💡 Canonical POS is the product of all maxterms where F=0\n\n" +
          "🔍 **Common Misunderstanding:** Students often confuse maxterm variable mapping. Emphasize:\n" +
          "   - For maxterm M₀ (000): A+B+C (variable=0 → true)\n" +
          "   - For maxterm M₇ (111): A'+B'+C' (variable=1 → complemented)\n\n" +
          "📌 **ISC Exam Tip:** Cardinal form questions often appear as 'Express F in Π notation' or 'Find the maxterms'."
        } />
      </div>
    </div>
  );
};

export default Topic33;