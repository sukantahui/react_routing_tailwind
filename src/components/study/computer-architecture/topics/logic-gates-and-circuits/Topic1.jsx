// Topic1.jsx - Truth tables & Boolean expressions
import React from 'react';
import clsx from 'clsx';

class Topic1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeExpression: 'basic',
      hoveredRow: null,
      selectedVariables: 3,
      currentTable: [],
      minimizedExpression: '',
      showKmap: false,
      reducedMotion: false,
      userInputExpression: 'A·B + Ā·B',
      userTruthTable: []
    };
    this.variables = ['A', 'B', 'C', 'D'];
    this.expressions = {
      basic: { expr: 'A·B + Ā·B', desc: 'Basic AND-OR expression' },
      complex: { expr: '(A+B)·(Ā+C)', desc: 'Complex factored expression' },
      xor: { expr: 'A⊕B = A·B̄ + Ā·B', desc: 'XOR equivalence' },
      universal: { expr: 'A·B = (A NAND B) NAND (A NAND B)', desc: 'NAND implementation' }
    };
  }

  componentDidMount() {
    this.checkReducedMotion();
    this.generateTruthTable();
    window.addEventListener('resize', this.checkReducedMotion);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkReducedMotion);
  }

  checkReducedMotion = () => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.setState({ reducedMotion: mediaQuery.matches });
  };

  generateTruthTable = () => {
    const { selectedVariables } = this.state;
    const rows = Math.pow(2, selectedVariables);
    const table = [];

    for (let i = 0; i < rows; i++) {
      const row = {};
      // Generate binary representation
      const binary = i.toString(2).padStart(selectedVariables, '0');
      
      // Set variable values
      for (let j = 0; j < selectedVariables; j++) {
        row[this.variables[j]] = parseInt(binary[j]);
      }

      // Calculate sample expression result
      if (selectedVariables >= 2) {
        const A = row['A'] || 0;
        const B = row['B'] || 0;
        const C = row['C'] || 0;
        
        // Example: F = A·B + Ā·C
        row['F'] = (A && B) || (!A && C) ? 1 : 0;
        
        // Additional expressions
        row['G'] = A ^ B; // XOR
        row['H'] = !(A && B) ? 1 : 0; // NAND
      }
      
      table.push(row);
    }

    this.setState({ 
      currentTable: table,
      minimizedExpression: this.minimizeExpression(table)
    });
  };

  minimizeExpression = (table) => {
    // Simple minimization for 2-3 variables
    const { selectedVariables } = this.state;
    
    if (selectedVariables === 2) {
      // Check for simple patterns
      const allOnes = table.every(row => row['F'] === 1);
      const allZeros = table.every(row => row['F'] === 0);
      
      if (allOnes) return '1';
      if (allZeros) return '0';
      
      // Look for A·B pattern
      const abTrue = table.find(row => row['A'] === 1 && row['B'] === 1 && row['F'] === 1);
      const aNotbTrue = table.find(row => row['A'] === 1 && row['B'] === 0 && row['F'] === 1);
      const notAbTrue = table.find(row => row['A'] === 0 && row['B'] === 1 && row['F'] === 1);
      
      if (abTrue && !aNotbTrue && !notAbTrue) return 'A·B';
      if (abTrue && aNotbTrue) return 'A';
      if (abTrue && notAbTrue) return 'B';
      
      return 'A·B + Ā·B̄'; // Default
    }
    
    return 'Simplified expression will appear here';
  };

  handleVariableChange = (count) => {
    this.setState({ selectedVariables: count }, () => {
      this.generateTruthTable();
    });
  };

  handleExpressionSelect = (exprType) => {
    this.setState({ activeExpression: exprType });
  };

  handleRowHover = (rowIndex) => {
    this.setState({ hoveredRow: rowIndex });
  };

  evaluateUserExpression = () => {
    const { userInputExpression, selectedVariables } = this.state;
    const rows = Math.pow(2, selectedVariables);
    const table = [];

    for (let i = 0; i < rows; i++) {
      const row = {};
      const binary = i.toString(2).padStart(selectedVariables, '0');
      
      for (let j = 0; j < selectedVariables; j++) {
        row[this.variables[j]] = parseInt(binary[j]);
      }

      // Simple expression evaluation
      try {
        const A = row['A'] || 0;
        const B = row['B'] || 0;
        const C = row['C'] || 0;
        
        // Replace operators for evaluation
        let expr = userInputExpression
          .replace(/·/g, '&&')
          .replace(/\+/g, '||')
          .replace(/Ā/g, '!A')
          .replace(/B̄/g, '!B')
          .replace(/C̄/g, '!C')
          .replace(/⊕/g, '^');
        
        // Evaluate the expression
        row['F'] = eval(expr) ? 1 : 0;
      } catch (e) {
        row['F'] = 0;
      }
      
      table.push(row);
    }

    this.setState({ userTruthTable: table });
  };

  renderKmap = () => {
    const { selectedVariables } = this.state;
    
    if (selectedVariables === 2) {
      return (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">2-Variable K-map:</h4>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center"></div>
            <div className="text-center font-bold">B=0</div>
            <div className="text-center font-bold">B=1</div>
            <div className="text-center font-bold">A=0</div>
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded border-2 border-blue-300 dark:border-blue-700">0</div>
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded border-2 border-green-300 dark:border-green-700">1</div>
            <div className="text-center font-bold">A=1</div>
            <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded border-2 border-yellow-300 dark:border-yellow-700">1</div>
            <div className="bg-red-100 dark:bg-red-900 p-3 rounded border-2 border-red-300 dark:border-red-700">0</div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          K-map visualization available for 2-4 variables. Try selecting fewer variables.
        </p>
      </div>
    );
  };

  render() {
    const { 
      activeExpression, 
      hoveredRow, 
      selectedVariables, 
      currentTable,
      minimizedExpression,
      showKmap,
      reducedMotion,
      userInputExpression,
      userTruthTable
    } = this.state;

    const animationClass = reducedMotion 
      ? "" 
      : "animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0";

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-emerald-900/20 p-4 md:p-8 transition-colors duration-300">
        <style>
          {`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.7; }
            }
            @media (prefers-reduced-motion: reduce) {
              * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
              }
            }
            .binary-digit {
              font-family: 'Courier New', monospace;
              font-weight: bold;
            }
          `}
        </style>

        {/* Header */}
        <header className={`max-w-6xl mx-auto mb-12 ${animationClass}`}>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 leading-relaxed">
            Truth Tables & Boolean Expressions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Mastering the mathematical foundation of digital logic - from truth tables to 
            simplified Boolean expressions using algebraic laws and Karnaugh maps.
          </p>
        </header>

        <main className="max-w-6xl mx-auto">
          {/* Fundamentals Section */}
          <section className={`mb-16 ${animationClass}`} style={{ animationDelay: "0.1s" }}>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-8 pb-2 border-b border-gray-200 dark:border-gray-700">
              Fundamentals of Boolean Algebra
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                  Boolean Laws & Theorems
                </h3>
                
                <div className="space-y-4">
                  {[
                    { law: "Identity", expr: "A + 0 = A, A · 1 = A" },
                    { law: "Domination", expr: "A + 1 = 1, A · 0 = 0" },
                    { law: "Idempotent", expr: "A + A = A, A · A = A" },
                    { law: "Complement", expr: "A + Ā = 1, A · Ā = 0" },
                    { law: "Commutative", expr: "A + B = B + A, AB = BA" },
                    { law: "Associative", expr: "(A+B)+C = A+(B+C), (AB)C = A(BC)" },
                    { law: "Distributive", expr: "A(B+C) = AB + AC, A+BC = (A+B)(A+C)" },
                    { law: "De Morgan's", expr: "(A+B)̄ = Ā·B̄, (AB)̄ = Ā+B̄" }
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      className={clsx(
                        "p-3 rounded-lg border transition-all duration-300",
                        idx % 2 === 0 
                          ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800" 
                          : "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800"
                      )}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-700 dark:text-gray-300">{item.law} Law:</span>
                        <code className="font-mono text-blue-600 dark:text-blue-400">{item.expr}</code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-6 border-2 border-emerald-200 dark:border-emerald-700">
                <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-300 mb-4">
                  Real-World Application
                </h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <h4 className="font-bold text-gray-700 dark:text-white mb-2">
                      Debangshu's Library System (Naihati)
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      System allows borrowing if: (Student AND Valid ID) OR (Faculty AND Department Approval)
                    </p>
                    <code className="block mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono text-emerald-600 dark:text-emerald-400">
                      B = (S·ID) + (F·DA)
                    </code>
                  </div>
                  
                  <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <h4 className="font-bold text-gray-700 dark:text-white mb-2">
                      Tuhina's Attendance System (Shyamnagar)
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Mark present if: (Morning Session OR Afternoon Session) AND NOT(Medical Leave)
                    </p>
                    <code className="block mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono text-emerald-600 dark:text-emerald-400">
                      P = (M + A)·ML̄
                    </code>
                  </div>
                  
                  <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                    <h4 className="font-bold text-gray-700 dark:text-white mb-2">
                      Abhronila's Security System (Ichapur)
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Alarm triggers if: (Motion XOR Door) AND (Night Mode OR Silent Mode)
                    </p>
                    <code className="block mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono text-emerald-600 dark:text-emerald-400">
                      A = (M⊕D)·(N + S)
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Truth Table Generator */}
          <section className={`mb-16 ${animationClass}`} style={{ animationDelay: "0.2s" }}>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-8 pb-2 border-b border-gray-200 dark:border-gray-700">
              Interactive Truth Table Generator
            </h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-4 mb-6">
                {[2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => this.handleVariableChange(num)}
                    className={clsx(
                      "px-6 py-3 rounded-lg font-bold transition-all duration-300",
                      selectedVariables === num
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                    )}
                  >
                    {num} Variables
                  </button>
                ))}
                <button
                  onClick={() => this.setState({ showKmap: !showKmap })}
                  className={clsx(
                    "px-6 py-3 rounded-lg font-bold transition-all duration-300 ml-auto",
                    showKmap
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                      : "bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300"
                  )}
                >
                  {showKmap ? "Hide" : "Show"} K-map
                </button>
              </div>
              
              {/* Truth Table Display */}
              <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                      {this.variables.slice(0, selectedVariables).map((varName) => (
                        <th key={varName} className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          {varName}
                        </th>
                      ))}
                      <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        F (Output)
                      </th>
                      {selectedVariables >= 2 && (
                        <>
                          <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                            G (XOR)
                          </th>
                          <th className="px-4 py-3 text-center text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                            H (NAND)
                          </th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {currentTable.map((row, rowIndex) => (
                      <tr 
                        key={rowIndex}
                        className={clsx(
                          "transition-all duration-200",
                          hoveredRow === rowIndex 
                            ? "bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20" 
                            : "hover:bg-gray-50 dark:hover:bg-gray-750"
                        )}
                        onMouseEnter={() => this.handleRowHover(rowIndex)}
                        onMouseLeave={() => this.handleRowHover(null)}
                      >
                        {this.variables.slice(0, selectedVariables).map((varName) => (
                          <td key={varName} className="px-4 py-3 text-center font-mono text-lg">
                            <span className={clsx(
                              "binary-digit px-2 py-1 rounded",
                              row[varName] === 1 
                                ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300" 
                                : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"
                            )}>
                              {row[varName]}
                            </span>
                          </td>
                        ))}
                        <td className="px-4 py-3 text-center">
                          <span className={clsx(
                            "binary-digit px-3 py-2 rounded-lg font-bold",
                            row['F'] === 1 
                              ? "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 animate-pulse" 
                              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                          )}>
                            {row['F']}
                          </span>
                        </td>
                        {selectedVariables >= 2 && (
                          <>
                            <td className="px-4 py-3 text-center">
                              <span className={clsx(
                                "binary-digit px-3 py-2 rounded-lg",
                                row['G'] === 1 
                                  ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300" 
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                              )}>
                                {row['G']}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span className={clsx(
                                "binary-digit px-3 py-2 rounded-lg",
                                row['H'] === 1 
                                  ? "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300" 
                                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                              )}>
                                {row['H']}
                              </span>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Minimized Expression */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-blue-800 dark:text-blue-300">Minimized Expression:</h4>
                    <code className="text-lg font-mono text-blue-600 dark:text-blue-400">
                      F = {minimizedExpression}
                    </code>
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    {selectedVariables} variables → {currentTable.length} rows
                  </div>
                </div>
              </div>
              
              {/* K-map Visualization */}
              {showKmap && this.renderKmap()}
            </div>
          </section>

          {/* Expression Examples */}
          <section className={`mb-16 ${animationClass}`} style={{ animationDelay: "0.3s" }}>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-8 pb-2 border-b border-gray-200 dark:border-gray-700">
              Boolean Expression Examples
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {Object.entries(this.expressions).map(([key, expr]) => (
                <div
                  key={key}
                  onClick={() => this.handleExpressionSelect(key)}
                  className={clsx(
                    "p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105",
                    activeExpression === key
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-xl scale-105 border-transparent"
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg"
                  )}
                >
                  <div className="text-center">
                    <code className={clsx(
                      "font-mono text-lg font-bold mb-2",
                      activeExpression === key ? "text-white" : "text-blue-600 dark:text-blue-400"
                    )}>
                      {expr.expr}
                    </code>
                    <p className={clsx(
                      "text-sm",
                      activeExpression === key ? "text-blue-100" : "text-gray-600 dark:text-gray-400"
                    )}>
                      {expr.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800">
              <h3 className="text-xl font-bold text-purple-800 dark:text-purple-300 mb-4">
                Working with {this.expressions[activeExpression].desc}
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-700 dark:text-white mb-3">Step-by-Step Evaluation</h4>
                  <div className="space-y-3">
                    {[
                      { step: "1", desc: "Write the expression", detail: this.expressions[activeExpression].expr },
                      { step: "2", desc: "Create truth table", detail: "List all input combinations" },
                      { step: "3", desc: "Evaluate for each row", detail: "Apply Boolean algebra rules" },
                      { step: "4", desc: "Simplify using laws", detail: "Apply De Morgan, distributive, etc." }
                    ].map((item) => (
                      <div key={item.step} className="flex items-start p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-purple-600 dark:text-purple-400 font-bold">{item.step}</span>
                        </div>
                        <div>
                          <div className="font-bold text-gray-700 dark:text-white">{item.desc}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{item.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-700 dark:text-white mb-3">Common Patterns</h4>
                  <div className="space-y-3">
                    {[
                      { pattern: "A + A·B = A", proof: "Absorption Law" },
                      { pattern: "A + Ā·B = A + B", proof: "Consensus Theorem" },
                      { pattern: "A·B + A·B̄ = A", proof: "Adjacency" },
                      { pattern: "(A+B)·(A+B̄) = A", proof: "Dual of Adjacency" }
                    ].map((item, idx) => (
                      <div key={idx} className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                        <div className="flex justify-between items-center mb-1">
                          <code className="font-mono text-purple-600 dark:text-purple-400">{item.pattern}</code>
                          <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 px-2 py-1 rounded">
                            Theorem
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{item.proof}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Expression Evaluator */}
          <section className={`mb-16 ${animationClass}`} style={{ animationDelay: "0.4s" }}>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-8 pb-2 border-b border-gray-200 dark:border-gray-700">
              Expression Evaluator Tool
            </h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 border-gray-200 dark:border-gray-700">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Enter Boolean Expression (Use: A, B, C, · for AND, + for OR, Ā for NOT, ⊕ for XOR)
                </label>
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={userInputExpression}
                    onChange={(e) => this.setState({ userInputExpression: e.target.value })}
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Example: A·B + Ā·C"
                  />
                  <button
                    onClick={this.evaluateUserExpression}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-bold hover:shadow-lg transition-all duration-300"
                  >
                    Evaluate
                  </button>
                </div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Examples: A·B, A+B, A⊕B, (A+B)·C, A·B̄ + Ā·B
                </div>
              </div>
              
              {userTruthTable.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-700 dark:text-white mb-3">Evaluation Result:</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-900">
                          <th className="px-4 py-2 text-left">Inputs</th>
                          <th className="px-4 py-2 text-left">Expression</th>
                          <th className="px-4 py-2 text-left">Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userTruthTable.slice(0, 4).map((row, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                            <td className="px-4 py-2">
                              {Object.entries(row)
                                .filter(([key]) => key !== 'F')
                                .map(([key, val]) => `${key}=${val}`)
                                .join(', ')}
                            </td>
                            <td className="px-4 py-2 font-mono">{userInputExpression}</td>
                            <td className="px-4 py-2">
                              <span className={clsx(
                                "px-3 py-1 rounded font-bold",
                                row['F'] === 1 
                                  ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300" 
                                  : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"
                              )}>
                                {row['F']}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Common Pitfalls */}
          <section className={`mb-16 ${animationClass}`} style={{ animationDelay: "0.5s" }}>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-8 pb-2 border-b border-gray-200 dark:border-gray-700">
              Common Pitfalls & Debugging
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-xl p-6 border-2 border-red-200 dark:border-red-800">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mr-3">
                    <span className="text-red-600 dark:text-red-400 text-xl">⚠️</span>
                  </div>
                  <h3 className="text-lg font-bold text-red-800 dark:text-red-300">Common Mistakes</h3>
                </div>
                
                <ul className="space-y-3">
                  {[
                    "Swadeep often forgets to list all 2ⁿ combinations in truth tables",
                    "Confusing AND (·) with OR (+) operator precedence",
                    "Missing parentheses in complex expressions",
                    "Forgetting that A·Ā = 0 and A + Ā = 1 (Complement Law)",
                    "Applying De Morgan's theorem incorrectly",
                    "Assuming A+B·C = (A+B)·(A+C) (wrong - distributive works differently for + over ·)"
                  ].map((mistake, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span className="text-red-700 dark:text-red-400">{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600 dark:text-blue-400 text-xl">✅</span>
                  </div>
                  <h3 className="text-lg font-bold text-blue-800 dark:text-blue-300">Debugging Checklist</h3>
                </div>
                
                <ol className="space-y-3 list-decimal pl-5">
                  {[
                    "Verify truth table has all 2ⁿ rows (n = number of variables)",
                    "Check operator precedence (NOT > AND > OR)",
                    "Test with known values (A=1,B=0, etc.)",
                    "Use Boolean laws to verify simplifications",
                    "Compare original and simplified truth tables",
                    "Try building circuit to verify physically"
                  ].map((step, idx) => (
                    <li key={idx} className="text-blue-700 dark:text-blue-400">
                      {step}
                    </li>
                  ))}
                </ol>
                
                <div className="mt-4 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    <strong>Pro Tip:</strong> When Tuhina designs circuits in Shyamnagar, she always 
                    writes intermediate steps for complex expressions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className={`mb-16 ${animationClass}`} style={{ animationDelay: "0.6s" }}>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-8 pb-2 border-b border-gray-200 dark:border-gray-700">
              Professional Best Practices
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Documentation Standards",
                  practices: [
                    "Always annotate truth tables with variable names",
                    "Use standard notation (· for AND, + for OR)",
                    "Include parentheses for clarity",
                    "Document simplification steps"
                  ]
                },
                {
                  title: "Verification Methods",
                  practices: [
                    "Compare truth tables before/after simplification",
                    "Use simulation tools for validation",
                    "Build prototype circuits for testing",
                    "Peer review complex expressions"
                  ]
                },
                {
                  title: "Industry Tips",
                  practices: [
                    "Use K-maps for up to 4 variables",
                    "Implement with NAND/NOR gates for efficiency",
                    "Consider propagation delays in real circuits",
                    "Use software tools for >4 variables"
                  ]
                }
              ].map((section, idx) => (
                <div 
                  key={idx}
                  className={clsx(
                    "p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-xl",
                    idx === 0 && "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800",
                    idx === 1 && "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800",
                    idx === 2 && "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800"
                  )}
                >
                  <h3 className="text-lg font-bold mb-4">
                    <span className={clsx(
                      "px-3 py-1 rounded-lg mr-2",
                      idx === 0 && "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300",
                      idx === 1 && "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300",
                      idx === 2 && "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300"
                    )}>
                      {idx + 1}
                    </span>
                    {section.title}
                  </h3>
                  
                  <ul className="space-y-2">
                    {section.practices.map((practice, pIdx) => (
                      <li key={pIdx} className="flex items-start">
                        <span className={clsx(
                          "mt-1 mr-2",
                          idx === 0 && "text-green-500",
                          idx === 1 && "text-blue-500",
                          idx === 2 && "text-purple-500"
                        )}>
                          ✓
                        </span>
                        <span className={clsx(
                          "text-sm",
                          idx === 0 && "text-green-700 dark:text-green-400",
                          idx === 1 && "text-blue-700 dark:text-blue-400",
                          idx === 2 && "text-purple-700 dark:text-purple-400"
                        )}>
                          {practice}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Hint Section */}
          <section className={`mb-16 ${animationClass}`} style={{ animationDelay: "0.7s" }}>
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl p-8 border-2 border-amber-200 dark:border-amber-800 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-white text-xl">💭</span>
                </div>
                <h3 className="text-xl font-bold text-amber-800 dark:text-amber-300">Critical Thinking Exercise</h3>
              </div>
              
              <p className="text-amber-700 dark:text-amber-400 mb-4 text-lg leading-relaxed">
                Abhronila needs to design a voting system for Ichapur Community Center where a proposal passes if:
              </p>
              
              <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 mb-4">
                <p className="text-amber-800 dark:text-amber-300 font-medium">
                  (Majority of 3 judges approve) OR (Director approves AND at least 1 judge approves)
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="text-sm text-amber-600 dark:text-amber-500">
                  <span className="font-bold">Think about:</span>
                  <ul className="mt-2 space-y-1 pl-5">
                    <li>• How many variables do you need?</li>
                    <li>• What would the truth table look like?</li>
                    <li>• Can you simplify the Boolean expression?</li>
                    <li>• How would Swadeep from Barrackpore verify it?</li>
                  </ul>
                </div>
                
                <div className="text-xs text-amber-500 dark:text-amber-600 italic">
                  Hint: Define variables J1, J2, J3 for judges (1=approve, 0=reject) and D for director.
                </div>
              </div>
            </div>
          </section>

          {/* Teacher's Note */}
          <section className={`${animationClass}`} style={{ animationDelay: "0.8s" }}>
            <div className={clsx(
              "bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-100 dark:from-emerald-900/30 dark:via-green-900/30 dark:to-emerald-900/20",
              "rounded-2xl p-8 border-2 border-emerald-300 dark:border-emerald-700",
              "transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] hover:border-emerald-400 dark:hover:border-emerald-600"
            )}>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white text-2xl font-bold">SH</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="text-2xl font-bold text-emerald-800 dark:text-emerald-300">Teacher's Note</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 rounded-full text-sm font-medium">
                        Sukanta Hui
                      </span>
                      <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-sm font-medium">
                        27 Years Experience
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-emerald-700 dark:text-emerald-400 text-lg leading-relaxed">
                      <strong>Essential Insight:</strong> Truth tables are your debugging tool. 
                      When Debangshu from Naihati designs circuits, I make him write the truth table 
                      <span className="font-bold text-emerald-800 dark:text-emerald-300"> BEFORE</span> writing any Boolean expression. 
                      This prevents logical errors that are hard to trace later.
                    </p>
                    
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl border border-green-200 dark:border-green-800">
                      <p className="text-green-800 dark:text-green-300 font-medium mb-2">🎯 Classroom Strategy:</p>
                      <p className="text-green-700 dark:text-green-400">
                        Teach students to first create truth tables for real-world problems from 
                        Shyamnagar and Barrackpore. Then derive expressions. This reverse engineering 
                        approach builds intuition for Boolean algebra.
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-emerald-200 dark:border-emerald-800">
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center">
                          <span className="text-emerald-600 dark:text-emerald-400 mr-2">💡</span>
                          <span className="text-emerald-700 dark:text-emerald-400">Always verify with truth tables</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-emerald-600 dark:text-emerald-400 mr-2">📚</span>
                          <span className="text-emerald-700 dark:text-emerald-400">Master De Morgan's Laws</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-emerald-600 dark:text-emerald-400 mr-2">⚡</span>
                          <span className="text-emerald-700 dark:text-emerald-400">Practice K-maps regularly</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Reference */}
          <div className={`mt-12 p-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl border-2 border-gray-300 dark:border-gray-700 shadow-lg ${animationClass}`} style={{ animationDelay: "0.9s" }}>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white text-xl">📋</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Quick Reference Checklist</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-gray-700 dark:text-white mb-3">Truth Table Creation</h4>
                <ul className="space-y-2">
                  {[
                    "✓ List all 2ⁿ input combinations",
                    "✓ Organize in binary order (00, 01, 10, 11)",
                    "✓ Calculate output for each row",
                    "✓ Verify completeness",
                    "✓ Label all columns clearly"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                      <span className="mr-2 text-green-500">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-gray-700 dark:text-white mb-3">Expression Simplification</h4>
                <ul className="space-y-2">
                  {[
                    "✓ Apply Boolean laws step-by-step",
                    "✓ Use De Morgan's for NAND/NOR",
                    "✓ Verify with original truth table",
                    "✓ Consider K-map for 2-4 variables",
                    "✓ Document each simplification"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                      <span className="mr-2 text-green-500">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm italic">
                Complete this checklist before moving to Karnaugh Maps. 
                Practice with examples from Naihati, Shyamnagar, and Ichapur.
              </p>
            </div>
          </div>
        </main>

        <footer className="max-w-6xl mx-auto mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            Topic 2: Truth Tables & Boolean Expressions • Next: Karnaugh Maps
          </p>
        </footer>
      </div>
    );
  }
}

export default Topic1;